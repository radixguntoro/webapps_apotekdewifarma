<?php

namespace App\Http\Controllers\Apps\Retur;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Libraries\AutoNumber;
use App\Model\TransactionPurchases;
use App\Model\TransactionPurchasesDetail;
use App\Model\ReturnTransPurchases;
use App\Model\HistoryRetTransPurchases;
use App\Model\ItemCard;
use App\Model\Item;
use Cart;
use Validator;
use DB;

class ReturnTransPurchasesCtrl extends Controller
{
    public function index(Request $request)
    {
        $model_report_trans_purchases = new ReturnTransPurchases();
        $code = $request->get('code');
        if ($code) {
            $report_trans_purchases = $model_report_trans_purchases->getReturnTransPurchasesByFilter($code);
            return response($report_trans_purchases);
        } else {
            $report_trans_purchases = $model_report_trans_purchases->getReturnTransPurchasesPagination();
            return response($report_trans_purchases);
        }
    }

    public function getReturnTransPurchasesDetail($id)
    {
        $model_trans_purchases = new ReturnTransPurchases();
        $data_trans_purchases = $model_trans_purchases->getReturnTransPurchasesDetail($id);

        $trans_purchases = array(
            "data_trans_purchases_detail" => $data_trans_purchases
        );

        return response()->json($trans_purchases);
    }

    public function getDataCart() {
        $data_cart = Cart::instance('cart_ret_purchases')->content();
        return response()->json($data_cart);
    }

    public function cartAdd(Request $request) {
        $inp_cart = array(
            'id' => $request->id,
            'name' => $request->name,
            'qty' => $request->qty,
            'price' => $request->price,
            'options' => array(
                'unit' => $request->unit,
                'discount' => 0,
                'price_sell_per_strip' => $request->price_sell_per_strip,
                'price_sell_per_box' => $request->price_sell_per_box,
                'price_sell_per_tablet' => $request->price_sell_per_tablet
                // 'subtotal' => $request->price * $request->qty
            )
        );

        $data_cart = Cart::instance('cart_ret_purchases')->add($inp_cart);
        return response()->json($data_cart);
    }

    public function cartRemove($id)
    {
        $data_cart = Cart::instance('cart_ret_purchases')->remove($id);
        return response()->json($data_cart);
    }

    public function insert(Request $request) {

        try{
            DB::beginTransaction();

            $data_cart = json_decode(json_encode($request->cart));

            // Menyimpan Transaksi Detil Penjualan
            foreach ($data_cart as $key => $value_cart) {
                $tableName = "return_purchases";
                $primary = "code";
                $autoNumber = new AutoNumber();
                $getCode = $autoNumber->generate($tableName, $primary);

                $model_ret_trans_purchases = new ReturnTransPurchases();
                $model_ret_trans_purchases->code = "RP".$getCode;
                $model_ret_trans_purchases->qty = $value_cart->qty;
                if ($value_cart->options->unit == 'box') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    $model_ret_trans_purchases->qty_total = ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet);
                } else if ($value_cart->options->unit == 'strip') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    $model_ret_trans_purchases->qty_total = $value_cart->qty * $unit->qty_in_tablet;
                } else if ($value_cart->options->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    $model_ret_trans_purchases->qty_total = $value_cart->qty;
                }
                $model_ret_trans_purchases->unit = $value_cart->options->unit;
                $model_ret_trans_purchases->price = $value_cart->price;
                $model_ret_trans_purchases->subtotal = $value_cart->subtotal;
                $model_ret_trans_purchases->date = date('Y-m-d');
                $model_ret_trans_purchases->time = date("H:i:s");
                $model_ret_trans_purchases->item_id = $value_cart->id;
                $model_ret_trans_purchases->user_id = Auth::user()->id;

                if ($value_cart->options->unit == 'box') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    Item::where('id', $value_cart->id)->decrement('qty_total', ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet));
                } else if ($value_cart->options->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    Item::where('id', $value_cart->id)->decrement('qty_total', $value_cart->qty);
                }

                $model_ret_trans_purchases->save();


                // Menyimpan Transaksi Penjualan di Kartu Barang
                $tableNameItemCard = "item_cards";
                $primaryItemCard = "code";
                $autoNumberItemCard = new AutoNumber();
                $getCodeItemCard = $autoNumberItemCard->generate($tableNameItemCard, $primaryItemCard);

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
                $model_item_cards->subtotal = $value_cart->subtotal;
                $model_item_cards->unit = $value_cart->options->unit;
                $model_item_cards->status = "stock_out";
                $model_item_cards->item_id = $value_cart->id;
                $model_item_cards->trans_code = "RP".$getCode;
                $model_item_cards->date = date("Y-m-d");
                $model_item_cards->time = $model_ret_trans_purchases->time;
                $model_item_cards->save();
            }

            // Menyimpan Transaksi Penjualan di Histori Transaksi Penjualan
            $model_his_trans_purchases = new HistoryRetTransPurchases();
            $model_his_trans_purchases->user_id = Auth::user()->id;
            $model_his_trans_purchases->action = "Membuat retur transaksi pembelian";
            $model_his_trans_purchases->return_purchases_id = $model_ret_trans_purchases->id;
            $model_his_trans_purchases->date = date("Y-m-d");
            $model_his_trans_purchases->time = $model_ret_trans_purchases->time;
            $model_his_trans_purchases->save();

            DB::commit();

            Cart::instance('cart_ret_purchases')->destroy();

            return "Success";

        } catch(\Exception $e) {
            return "Error"." ".$e;
            DB::rollback();
        }
    }
}
