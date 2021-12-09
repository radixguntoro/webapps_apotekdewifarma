<?php

namespace App\Http\Controllers\Apps\Transaction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Libraries\AutoNumber;
use App\Model\TransactionPurchases;
use App\Model\TransactionPurchasesDetail;
use App\Model\HistoryTransPurchases;
use App\Model\Item;
use App\Model\ItemCard;
use App\Model\Supplier;
use Cart;
use DB;

class TransactionPurchasesCtrl extends Controller
{
    public function index()
    {
        return view('layouts.base-layout');
    }

    public function getDataCart() {
        $data_cart = Cart::instance('cart_purchases')->content();
        // cetak_r($data_cart);
        return response()->json($data_cart);
    }

    public function cartAdd(Request $request) {
        $inp_cart = array(
            'id' => $request->id,
            'name' => $request->name,
            'qty' => $request->qty,
            'price' => 0,
            'options' => array(
                'discount' => 0,
                'price_first' => 0,
                'price_last' => 0,
                'ppn' => 0,
                'qty_in_box' => $request->qty_in_box,
                'qty_in_strip' => $request->qty_in_strip,
                'qty_in_tablet' => $request->qty_in_tablet,
                'unit' => $request->price_purchase_per_box > 0 ? "box" : "tablet",
                'percent_profit_per_box' => $request->percent_profit_per_box,
                'percent_profit_per_strip' => $request->percent_profit_per_strip,
                'percent_profit_per_tablet' => $request->percent_profit_per_tablet,
                'price_sell_per_strip' => $request->price_sell_per_strip,
                'price_sell_per_box' => $request->price_sell_per_box,
                'price_sell_per_tablet' => $request->price_sell_per_tablet,
                'price_purchase_per_strip' => $request->price_purchase_per_strip,
                'price_purchase_per_box' => $request->price_purchase_per_box,
                'price_purchase_per_tablet' => $request->price_purchase_per_tablet,
                'temp_percent_profit_per_box' => $request->percent_profit_per_box,
                'temp_percent_profit_per_strip' => $request->percent_profit_per_strip,
                'temp_percent_profit_per_tablet' => $request->percent_profit_per_tablet,
                'temp_price_sell_per_strip' => $request->price_sell_per_strip,
                'temp_price_sell_per_box' => $request->price_sell_per_box,
                'temp_price_sell_per_tablet' => $request->price_sell_per_tablet,
                'temp_price_purchase_per_strip' => $request->price_purchase_per_strip,
                'temp_price_purchase_per_box' => $request->price_purchase_per_box,
                'temp_price_purchase_per_tablet' => $request->price_purchase_per_tablet
                // 'subtotal' => $request->price * $request->qty
            )
        );

        $data_cart = Cart::instance('cart_purchases')->add($inp_cart);
        return response()->json($data_cart);
    }

    public function cartRemove($id)
    {
        $data_cart = Cart::instance('cart_purchases')->remove($id);
        return response()->json($data_cart);
    }

    public function cartDestroy(Request $request)
    {
    	Cart::instance('cart_purchases')->destroy();
    }

    public function insert(Request $request) {

        try{
            DB::beginTransaction();

            // Menyimpan Transaksi Penjualan
            $tableName = "transaction_purchases";
            $primary = "invoice";
            $autoNumber = new AutoNumber();
            $getCode = $autoNumber->generate($tableName, $primary);

            $model_trans_purchases = new TransactionPurchases();
            $model_trans_purchases->code = $request->code;
            $model_trans_purchases->invoice = "PC".$getCode;
            // $model_trans_purchases->invoice = $request->invoice;
            $model_trans_purchases->total_price = $request->total_price;
            $model_trans_purchases->disc_total = $request->disc_total;
            $model_trans_purchases->ppn = $request->ppn;
            $model_trans_purchases->grand_total = $request->grand_total;
            $model_trans_purchases->status = 'in_purchases';
            $model_trans_purchases->date_input = $request->date_input;
            $model_trans_purchases->date = date('Y-m-d');
            $model_trans_purchases->time = date("H:i:s");
            $model_trans_purchases->user_id = Auth::user()->id;
            $model_trans_purchases->supplier_id = $request->supplier_id;
            $model_trans_purchases->save();

            $data_cart = json_decode(json_encode($request->cart));
            // cetak_r($request->cart);

            // Menyimpan Transaksi Detil Penjualan
            foreach ($data_cart as $key => $value_cart) {
                $model_trans_purchases_detail = new TransactionPurchasesDetail();
                $model_trans_purchases_detail->price_sell = $value_cart->price;
                $model_trans_purchases_detail->discount = $value_cart->options->discount;
                $model_trans_purchases_detail->price_discount = $value_cart->options->price_first;
                $model_trans_purchases_detail->subtotal = $value_cart->options->price_last;
                $model_trans_purchases_detail->qty = $value_cart->qty;
                $model_trans_purchases_detail->ppn = $request->ppn > 0 ? 0.1 : 0;
                $model_trans_purchases_detail->price_purchase_per_box = $value_cart->options->price_purchase_per_box;
                $model_trans_purchases_detail->price_purchase_per_strip = $value_cart->options->price_purchase_per_strip;
                $model_trans_purchases_detail->price_purchase_per_tablet = $value_cart->options->price_purchase_per_tablet;
                $model_trans_purchases_detail->price_sell_per_box = $value_cart->options->price_sell_per_box;
                $model_trans_purchases_detail->price_sell_per_strip = $value_cart->options->price_sell_per_strip;
                $model_trans_purchases_detail->price_sell_per_tablet = $value_cart->options->price_sell_per_tablet;
                $model_trans_purchases_detail->percent_profit_per_box = $value_cart->options->percent_profit_per_box;
                $model_trans_purchases_detail->percent_profit_per_strip = $value_cart->options->percent_profit_per_strip;
                $model_trans_purchases_detail->percent_profit_per_tablet = $value_cart->options->percent_profit_per_tablet;
                $model_trans_purchases_detail->unit = $value_cart->options->unit;
                $model_trans_purchases_detail->transaction_purchases_id = $model_trans_purchases->id;
                $model_trans_purchases_detail->item_id = $value_cart->id;

                if ($value_cart->options->unit == 'box') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    Item::where('id', $value_cart->id)->increment('qty_total', ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet));
                    Item::where('id', $value_cart->id)->update([
                        'price_purchase_per_box' => $value_cart->options->price_purchase_per_box,
                        'price_purchase_per_strip' => $value_cart->options->price_purchase_per_strip,
                        'price_purchase_per_tablet' => $value_cart->options->price_purchase_per_tablet,
                        'price_sell_per_box' => $value_cart->options->price_sell_per_box,
                        'price_sell_per_strip' => $value_cart->options->price_sell_per_strip,
                        'price_sell_per_tablet' => $value_cart->options->price_sell_per_tablet,
                        'percent_profit_per_box' => $value_cart->options->percent_profit_per_box,
                        'percent_profit_per_strip' => $value_cart->options->percent_profit_per_strip,
                        'percent_profit_per_tablet' => $value_cart->options->percent_profit_per_tablet
                    ]);
                    $model_trans_purchases_detail->qty_in_tablet = ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet);
                } else if ($value_cart->options->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    Item::where('id', $value_cart->id)->increment('qty_total', $value_cart->qty);
                    Item::where('id', $value_cart->id)->update([
                        'price_purchase_per_tablet' => $value_cart->options->price_purchase_per_tablet,
                        'price_sell_per_tablet' => $value_cart->options->price_sell_per_tablet,
                        'percent_profit_per_tablet' =>$value_cart->options->percent_profit_per_tablet,
                    ]);
                    $model_trans_purchases_detail->qty_in_tablet = $value_cart->qty;
                }
                $model_trans_purchases_detail->save();

                $model_item_cards = new ItemCard();
                $model_item_cards->code = "IC".$getCode;
                $model_item_cards->price = $value_cart->price;
                $model_item_cards->qty = $value_cart->qty;
                if ($value_cart->options->unit == 'box') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    $model_item_cards->qty_in_tablet = ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet);
                } else if ($value_cart->options->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    $model_item_cards->qty_in_tablet = $value_cart->qty;
                }
                $model_item_cards->discount = $value_cart->options->discount;
                $model_item_cards->subtotal = $value_cart->options->price_last;
                $model_item_cards->unit = $value_cart->options->unit;
                $model_item_cards->status = "stock_in";
                $model_item_cards->item_id = $value_cart->id;
                $model_item_cards->trans_code = $model_trans_purchases->invoice;
                $model_item_cards->date = date("Y-m-d");
                $model_item_cards->time = $model_trans_purchases->time;
                $model_item_cards->save();
            }

            // Menyimpan Transaksi Penjualan di Histori Transaksi Penjualan
            $model_his_trans_purch = new HistoryTransPurchases();
            $model_his_trans_purch->user_id = Auth::user()->id;
            $model_his_trans_purch->action = "Membuat transaksi pembelian";
            $model_his_trans_purch->transaction_purchases_id = $model_trans_purchases->id;
            $model_his_trans_purch->date = date("Y-m-d");
            $model_his_trans_purch->time = $model_trans_purchases->time;
            $model_his_trans_purch->save();

            DB::commit();

            Cart::instance('cart_purchases')->destroy();

            return "Success";

        } catch(\Exception $e) {
            return "Error"." ".$e;
            DB::rollback();
        }
    }

    public function edit($id) {
        $model_trans_purchases_detail = new TransactionPurchasesDetail();
        $get_trans_purchase = TransactionPurchases::where('id', $id)->first();
        $get_supplier = Supplier::where('id', $get_trans_purchase->supplier_id)->first();
        $get_trans_purchase_detail = $model_trans_purchases_detail->getDataTransactionPurchasesDetail($id);
        $data_trans_purchase = array(
            "tr_purchases" => $get_trans_purchase
            , "supplier" => $get_supplier
            , "tr_purchases_detail" => $get_trans_purchase_detail
        );
        return response()->json($data_trans_purchase);
    }

    public function update(Request $request) {

        try{
            DB::beginTransaction();

            // Menyimpan Perubahan Transaksi Penjualan
            $model_trans_purchases = TransactionPurchases::find($request->id);
            $model_trans_purchases->total_price = $request->total_price;
            $model_trans_purchases->disc_total = $request->disc_total;
            $model_trans_purchases->ppn = $request->ppn;
            $model_trans_purchases->grand_total = $request->grand_total;
            $model_trans_purchases->save();

            $data_cart = json_decode(json_encode($request->cart));
            $data_cart_edit = json_decode(json_encode($request->tr_purchases_cart));

            $get_trans_purchase_detail = TransactionPurchasesDetail::where('transaction_purchases_id', $request->id)->get();

            foreach ($get_trans_purchase_detail as $key => $value) {
                Item::where('id', $value->item_id)->decrement('qty_total', $value->qty_in_tablet);
            }

            TransactionPurchasesDetail::where('transaction_purchases_id', $request->id)->delete();
            ItemCard::where('trans_code', $model_trans_purchases->invoice)->delete();
            // cetak_r($request->cart);

            // Menyimpan Transaksi Detil Penjualan
            foreach ($data_cart_edit as $key => $value_cart) {
                // Item::where('id', $value_cart->item_id)->decrement('qty_total', $value_cart->qty_total);
                $model_trans_purchases_detail = new TransactionPurchasesDetail();
                $model_trans_purchases_detail->price_sell = $value_cart->price;
                $model_trans_purchases_detail->discount = $value_cart->discount;
                $model_trans_purchases_detail->price_discount = $value_cart->price_first;
                $model_trans_purchases_detail->subtotal = $value_cart->price_last;
                $model_trans_purchases_detail->qty = $value_cart->qty;
                $model_trans_purchases_detail->ppn = $request->ppn > 0 ? 0.1 : 0;
                $model_trans_purchases_detail->price_purchase_per_box = $value_cart->price_purchase_per_box;
                $model_trans_purchases_detail->price_purchase_per_strip = $value_cart->price_purchase_per_strip;
                $model_trans_purchases_detail->price_purchase_per_tablet = $value_cart->price_purchase_per_tablet;
                $model_trans_purchases_detail->price_sell_per_box = $value_cart->price_sell_per_box;
                $model_trans_purchases_detail->price_sell_per_strip = $value_cart->price_sell_per_strip;
                $model_trans_purchases_detail->price_sell_per_tablet = $value_cart->price_sell_per_tablet;
                $model_trans_purchases_detail->percent_profit_per_box = $value_cart->percent_profit_per_box;
                $model_trans_purchases_detail->percent_profit_per_strip = $value_cart->percent_profit_per_strip;
                $model_trans_purchases_detail->percent_profit_per_tablet = $value_cart->percent_profit_per_tablet;
                $model_trans_purchases_detail->unit = $value_cart->unit;
                $model_trans_purchases_detail->transaction_purchases_id = $model_trans_purchases->id;
                $model_trans_purchases_detail->item_id = $value_cart->item_id;

                if ($value_cart->unit == 'box') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    Item::where('id', $value_cart->item_id)->increment('qty_total', ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet));
                    Item::where('id', $value_cart->item_id)->update([
                        'price_purchase_per_box' => $value_cart->price_purchase_per_box,
                        'price_purchase_per_strip' => $value_cart->price_purchase_per_strip,
                        'price_purchase_per_tablet' => $value_cart->price_purchase_per_tablet,
                        'price_sell_per_box' => $value_cart->price_sell_per_box,
                        'price_sell_per_strip' => $value_cart->price_sell_per_strip,
                        'price_sell_per_tablet' => $value_cart->price_sell_per_tablet,
                        'percent_profit_per_box' => $value_cart->percent_profit_per_box,
                        'percent_profit_per_strip' => $value_cart->percent_profit_per_strip,
                        'percent_profit_per_tablet' => $value_cart->percent_profit_per_tablet
                    ]);
                    $model_trans_purchases_detail->qty_in_tablet = ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet);
                } else if ($value_cart->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    Item::where('id', $value_cart->item_id)->increment('qty_total', $value_cart->qty);
                    Item::where('id', $value_cart->item_id)->update([
                        'price_purchase_per_tablet' => $value_cart->price_purchase_per_tablet,
                        'price_sell_per_tablet' => $value_cart->price_sell_per_tablet,
                        'percent_profit_per_tablet' =>$value_cart->percent_profit_per_tablet,
                    ]);
                    $model_trans_purchases_detail->qty_in_tablet = $value_cart->qty;
                }
                $model_trans_purchases_detail->save();

                $model_item_cards = new ItemCard();
                $model_item_cards->code = $model_trans_purchases->invoice;
                $model_item_cards->price = $value_cart->price;
                $model_item_cards->qty = $value_cart->qty;
                if ($value_cart->unit == 'box') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    $model_item_cards->qty_in_tablet = ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet);
                } else if ($value_cart->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    $model_item_cards->qty_in_tablet = $value_cart->qty;
                }
                $model_item_cards->discount = $value_cart->discount;
                $model_item_cards->subtotal = $value_cart->price_last;
                $model_item_cards->unit = $value_cart->unit;
                $model_item_cards->status = "stock_in";
                $model_item_cards->item_id = $value_cart->item_id;
                $model_item_cards->trans_code = $model_trans_purchases->invoice;
                $model_item_cards->date = date("Y-m-d");
                $model_item_cards->time = $model_trans_purchases->time;
                $model_item_cards->save();
            }

            foreach ($data_cart as $key => $value_cart) {
                $model_trans_purchases_detail = new TransactionPurchasesDetail();
                $model_trans_purchases_detail->price_sell = $value_cart->price;
                $model_trans_purchases_detail->discount = $value_cart->options->discount;
                $model_trans_purchases_detail->price_discount = $value_cart->options->price_first;
                $model_trans_purchases_detail->subtotal = $value_cart->options->price_last;
                $model_trans_purchases_detail->qty = $value_cart->qty;
                $model_trans_purchases_detail->ppn = $request->ppn > 0 ? 0.1 : 0;
                $model_trans_purchases_detail->price_purchase_per_box = $value_cart->options->price_purchase_per_box;
                $model_trans_purchases_detail->price_purchase_per_strip = $value_cart->options->price_purchase_per_strip;
                $model_trans_purchases_detail->price_purchase_per_tablet = $value_cart->options->price_purchase_per_tablet;
                $model_trans_purchases_detail->price_sell_per_box = $value_cart->options->price_sell_per_box;
                $model_trans_purchases_detail->price_sell_per_strip = $value_cart->options->price_sell_per_strip;
                $model_trans_purchases_detail->price_sell_per_tablet = $value_cart->options->price_sell_per_tablet;
                $model_trans_purchases_detail->percent_profit_per_box = $value_cart->options->percent_profit_per_box;
                $model_trans_purchases_detail->percent_profit_per_strip = $value_cart->options->percent_profit_per_strip;
                $model_trans_purchases_detail->percent_profit_per_tablet = $value_cart->options->percent_profit_per_tablet;
                $model_trans_purchases_detail->unit = $value_cart->options->unit;
                $model_trans_purchases_detail->transaction_purchases_id = $model_trans_purchases->id;
                $model_trans_purchases_detail->item_id = $value_cart->id;

                if ($value_cart->options->unit == 'box') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    Item::where('id', $value_cart->id)->increment('qty_total', ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet));
                    Item::where('id', $value_cart->id)->update([
                        'price_purchase_per_box' => $value_cart->options->price_purchase_per_box,
                        'price_purchase_per_strip' => $value_cart->options->price_purchase_per_strip,
                        'price_purchase_per_tablet' => $value_cart->options->price_purchase_per_tablet,
                        'price_sell_per_box' => $value_cart->options->price_sell_per_box,
                        'price_sell_per_strip' => $value_cart->options->price_sell_per_strip,
                        'price_sell_per_tablet' => $value_cart->options->price_sell_per_tablet,
                        'percent_profit_per_box' => $value_cart->options->percent_profit_per_box,
                        'percent_profit_per_strip' => $value_cart->options->percent_profit_per_strip,
                        'percent_profit_per_tablet' => $value_cart->options->percent_profit_per_tablet
                    ]);
                    $model_trans_purchases_detail->qty_in_tablet = ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet);
                } else if ($value_cart->options->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    Item::where('id', $value_cart->id)->increment('qty_total', $value_cart->qty);
                    Item::where('id', $value_cart->id)->update([
                        'price_purchase_per_tablet' => $value_cart->options->price_purchase_per_tablet,
                        'price_sell_per_tablet' => $value_cart->options->price_sell_per_tablet,
                        'percent_profit_per_tablet' =>$value_cart->options->percent_profit_per_tablet,
                    ]);
                    $model_trans_purchases_detail->qty_in_tablet = $value_cart->qty;
                }
                $model_trans_purchases_detail->save();

                $model_item_cards = new ItemCard();
                $model_item_cards->code = $model_trans_purchases->invoice;
                $model_item_cards->price = $value_cart->price;
                $model_item_cards->qty = $value_cart->qty;
                if ($value_cart->options->unit == 'box') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    $model_item_cards->qty_in_tablet = ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet);
                } else if ($value_cart->options->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    $model_item_cards->qty_in_tablet = $value_cart->qty;
                }
                $model_item_cards->discount = $value_cart->options->discount;
                $model_item_cards->subtotal = $value_cart->options->price_last;
                $model_item_cards->unit = $value_cart->options->unit;
                $model_item_cards->status = "stock_in";
                $model_item_cards->item_id = $value_cart->id;
                $model_item_cards->trans_code = $model_trans_purchases->invoice;
                $model_item_cards->date = date("Y-m-d");
                $model_item_cards->time = $model_trans_purchases->time;
                $model_item_cards->save();
            }

            // Menyimpan Transaksi Penjualan di Histori Transaksi Penjualan
            $model_his_trans_purch = new HistoryTransPurchases();
            $model_his_trans_purch->user_id = Auth::user()->id;
            $model_his_trans_purch->action = "Mengubah transaksi pembelian";
            $model_his_trans_purch->transaction_purchases_id = $model_trans_purchases->id;
            $model_his_trans_purch->date = date("Y-m-d");
            $model_his_trans_purch->time = $model_trans_purchases->time;
            $model_his_trans_purch->save();

            DB::commit();

            Cart::instance('cart_purchases')->destroy();

            return "Success";

        } catch(\Exception $e) {
            return "Error"." ".$e;
            DB::rollback();
        }
    }

    public function cartEditRemove($id)
    {
        try{
            DB::beginTransaction();

            $get_trans_purchase_detail = TransactionPurchasesDetail::where('id', $id)->first();
            $get_trans_purchase = TransactionPurchases::where('id', $get_trans_purchase_detail->transaction_purchases_id)->first();
            $get_item_card = ItemCard::where('item_id', $get_trans_purchase_detail->item_id)->where('trans_code', $get_trans_purchase->invoice)->first();

            Item::where('id', $get_trans_purchase_detail->item_id)->decrement('qty_total', $get_trans_purchase_detail->qty_in_tablet);

            $data_cart = TransactionPurchasesDetail::where('id', $id)->delete();
            ItemCard::where('id', $get_item_card->id)->delete();

            // Menyimpan Perubahan Transaksi Penjualan di Histori Transaksi Penjualan
            $model_his_trans_purch = new HistoryTransPurchases();
            $model_his_trans_purch->user_id = Auth::user()->id;
            $model_his_trans_purch->action = "Menghapus detil transaksi pembelian";
            $model_his_trans_purch->transaction_purchases_id = $get_trans_purchase->id;
            $model_his_trans_purch->date = date("Y-m-d");
            $model_his_trans_purch->time = date("H:i:s");
            $model_his_trans_purch->save();

            DB::commit();

            return "Success";

        } catch(\Exception $e) {
            return "Error"." ".$e;
            DB::rollback();
        }
    }

    public function delete(Request $request)
    {
        try{
            DB::beginTransaction();

            $model_trans_purchases = TransactionPurchases::where('id', $request->id)->first();

            $get_trans_purchase_detail = TransactionPurchasesDetail::where('transaction_purchases_id', $request->id)->get();

            foreach ($get_trans_purchase_detail as $key => $value) {
                Item::where('id', $value->item_id)->decrement('qty_total', $value->qty_in_tablet);
            }

            ItemCard::where('trans_code', $model_trans_purchases->invoice)->delete();
            TransactionPurchasesDetail::where('transaction_purchases_id', $request->id)->delete();
            TransactionPurchases::where('id', $request->id)->delete();

            // Menyimpan Perubahan Transaksi Penjualan di Histori Transaksi Penjualan
            $model_his_trans_purch = new HistoryTransPurchases();
            $model_his_trans_purch->user_id = Auth::user()->id;
            $model_his_trans_purch->action = "Menghapus transaksi pembelian";
            $model_his_trans_purch->transaction_purchases_id = $model_trans_purchases->id;
            $model_his_trans_purch->date = date("Y-m-d");
            $model_his_trans_purch->time = date("H:i:s");
            $model_his_trans_purch->save();

            DB::commit();

            return "Success";

        } catch(\Exception $e) {
            return "Error"." ".$e;
            DB::rollback();
        }
    }
}
