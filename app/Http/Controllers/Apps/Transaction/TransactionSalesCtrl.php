<?php

namespace App\Http\Controllers\Apps\Transaction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Libraries\AutoNumber;
use App\Model\TransactionSales;
use App\Model\TransactionSalesDetail;
use App\Model\HistoryTransSales;
use App\Model\Item;
use App\Model\ItemCard;
use App\Model\User;
use Cart;
use DB;

class TransactionSalesCtrl extends Controller
{
    public function index()
    {
        return view('layouts.base-layout');
    }

    public function data(Request $request)
    {
        $model_transaction_sales = new TransactionSales();
        $datestart = $request->get('datestart');
        $dateend = $request->get('dateend');
        if ($datestart || $dateend) {
            $transaction_sales = $model_transaction_sales->getTransactionSalesByFilter($datestart, $dateend);
            return response($transaction_sales);
        } else {
            $transaction_sales = $model_transaction_sales->getTransactionSalesPagination();
            return response($transaction_sales);
        }
    }

    public function getDataCart($user_id) {
        $data_cart = DB::table('temp_transaction_sales')->where('user_id', $user_id)->get();
        return response()->json($data_cart);
    }

    public function cartAdd(Request $request) {
        $inp_cart = array(
            "item_id" => $request->id
            , "name" => $request->name
            , "qty" => 1
            , "price" => $request->price_sell_per_tablet
            , "unit" => "tablet"
            , "discount" => 0
            , "qty_total" => $request->qty_total
            , "qty_in_box" => $request->qty_in_box
            , "qty_in_strip" => $request->qty_in_strip
            , "qty_in_tablet" => $request->qty_in_tablet
            , "price_sell_per_box" => $request->price_sell_per_box
            , "price_sell_per_strip" => $request->price_sell_per_strip
            , "price_sell_per_tablet" => $request->price_sell_per_tablet
            , "subtotal" => $request->price_sell_per_tablet
            , "user_id" => Auth::user()->id
        );
        // echo "<pre>";print_r($inp_cart);die;
        DB::table('temp_transaction_sales')->insert($inp_cart);
        // $data_cart = Cart::instance('cart_sales')->add($inp_cart);
        return response()->json($inp_cart);
    }

    public function cartRemove(Request $request)
    {
        // print_r($request->row_id);die;
        if ($request->username == 'dewi' || $request->username == 'farida') {
            $data = User::where('email', $request->username)->first();
            if ($data->email == 'dewi' || $data->email == 'farida') {
                if (Hash::check($request->password, $data->password)) {
                    DB::table('temp_transaction_sales')->where('item_id', $request->row_id)->where('user_id', Auth::user()->id)->delete();
                    $data_cart = 1;
                } else {
                    $data_cart = 0;
                }
            } else {
                $data_cart = 500;
            }
        } else {
            $data_cart = 404;
        }

        return response()->json($data_cart);
    }

    public function cartDestroy(Request $request)
    {
    	Cart::instance('cart_sales')->destroy();
    }

    public function searchItemManual($id)
    {
        $data_cart = Item::where('id', $id)->get()->first();
        return response()->json($data_cart);
    }

    public function searchItemBarcode($code)
    {
        $model_scan_item_box = Item::where('barcode_box', $code)->get()->first();
        $model_scan_item_strip = Item::where('barcode_strip', $code)->get()->first();
        if (isset($model_scan_item_box)) {
            // Kondisi jika Barcode barang Satuan Tablet
            if ($model_scan_item_box == $model_scan_item_strip) {
                if (($model_scan_item_box->qty_in_box > 0 && $model_scan_item_box->qty_in_tablet > 0) || ($model_scan_item_box->qty_in_box < 1 && $model_scan_item_box->qty_in_tablet > 0)) {
                    $data_cart = array(
                        'item_id' => $model_scan_item_box->id
                        , 'name' => $model_scan_item_box->name
                        , 'qty' => 1
                        , 'price' => $model_scan_item_box->price_sell_per_tablet
                        , 'unit' => "tablet"
                        , 'discount' => 0
                        , 'qty_total' => $model_scan_item_box->qty_total
                        , 'qty_in_box' => $model_scan_item_box->qty_in_strip > 0 ? floor(($model_scan_item_box->qty_total / $model_scan_item_box->qty_in_tablet) / $model_scan_item_box->qty_in_strip) : floor($model_scan_item_box->qty_total / $model_scan_item_box->qty_in_tablet)
                        , 'qty_in_strip' => $model_scan_item_box->qty_in_strip > 0 ? floor($model_scan_item_box->qty_total / $model_scan_item_box->qty_in_tablet) : 0
                        , 'qty_in_tablet' => $model_scan_item_box->qty_total
                        , 'price_sell_per_strip' => $model_scan_item_box->price_sell_per_strip
                        , 'price_sell_per_box' => $model_scan_item_box->price_sell_per_box
                        , 'price_sell_per_tablet' => $model_scan_item_box->price_sell_per_tablet
						, 'subtotal' => $model_scan_item_box->price_sell_per_tablet
                        , 'user_id' => Auth::user()->id
                    );
                    DB::table('temp_transaction_sales')->insert($data_cart);
                    return response()->json($data_cart);
                }
            // Kondisi jika Barcode barang Satuan Box
            } else {
                $data_cart = array(
                    'item_id' => $model_scan_item_box->id
                    , 'name' => $model_scan_item_box->name
                    , 'qty' => 1
                    , 'price' => $model_scan_item_box->price_sell_per_box
                    , 'unit' => "box"
                    , 'discount' => 0
                    , 'qty_total' => $model_scan_item_box->qty_total
                    , 'qty_in_box' => $model_scan_item_box->qty_in_strip > 0 ? floor(($model_scan_item_box->qty_total / $model_scan_item_box->qty_in_tablet) / $model_scan_item_box->qty_in_strip) : floor($model_scan_item_box->qty_total / $model_scan_item_box->qty_in_tablet)
                    , 'qty_in_strip' => $model_scan_item_box->qty_in_strip > 0 ? floor($model_scan_item_box->qty_total / $model_scan_item_box->qty_in_tablet) : 0
                    , 'qty_in_tablet' => $model_scan_item_box->qty_total
                    , 'price_sell_per_strip' => $model_scan_item_box->price_sell_per_strip
                    , 'price_sell_per_box' => $model_scan_item_box->price_sell_per_box
                    , 'price_sell_per_tablet' => $model_scan_item_box->price_sell_per_tablet
					, 'subtotal' => $model_scan_item_box->price_sell_per_tablet
                    , 'user_id' => Auth::user()->id
                );
                DB::table('temp_transaction_sales')->insert($data_cart);
                return response()->json($data_cart);
            }
        // Kondisi jika Barcode barang Satuan Strip
        } else if (isset($model_scan_item_strip)) {
            $data_cart = array(
                'item_id' => $model_scan_item_strip->id
                , 'name' => $model_scan_item_strip->name
                , 'qty' => 1
                , 'price' => $model_scan_item_strip->price_sell_per_strip
                , 'unit' => "strip"
                , 'discount' => 0
                , 'qty_total' => $model_scan_item_strip->qty_total
                , 'qty_in_box' => $model_scan_item_strip->qty_in_strip > 0 ? floor(($model_scan_item_strip->qty_total / $model_scan_item_strip->qty_in_tablet) / $model_scan_item_strip->qty_in_strip) : floor($model_scan_item_strip->qty_total / $model_scan_item_strip->qty_in_tablet)
                , 'qty_in_strip' => $model_scan_item_strip->qty_in_strip > 0 ? floor($model_scan_item_strip->qty_total / $model_scan_item_strip->qty_in_tablet) : 0
                , 'qty_in_tablet' => $model_scan_item_strip->qty_total
                , 'price_sell_per_strip' => $model_scan_item_strip->price_sell_per_strip
                , 'price_sell_per_box' => $model_scan_item_strip->price_sell_per_box
                , 'price_sell_per_tablet' => $model_scan_item_strip->price_sell_per_tablet
				, 'subtotal' => $model_scan_item_box->price_sell_per_tablet
                , 'user_id' => Auth::user()->id
            );
            DB::table('temp_transaction_sales')->insert($data_cart);
            return response()->json($data_cart);
        }
    }

    public function insert(Request $request) {

        try{
            DB::beginTransaction();

            // Menyimpan Transaksi Penjualan
            $tableName = "transaction_sales";
            $primary = "code";
            $autoNumber = new AutoNumber();
            $getCode = $autoNumber->generate($tableName, $primary);

            $model_trans_sales = new TransactionSales();
            $model_trans_sales->code = $request->code;
            $model_trans_sales->total_price = $request->total_price;
            $model_trans_sales->discount_price = $request->discount_price;
            $model_trans_sales->discount = $request->discount;
            $model_trans_sales->grand_total = $request->grand_total;
            $model_trans_sales->payment = $request->payment;
            $model_trans_sales->balance = $request->balance;
            $model_trans_sales->date = date('Y-m-d');
            $model_trans_sales->time = date("H:i:s");
            $model_trans_sales->user_id = Auth::user()->id;
            $model_trans_sales->status = "in_sales";
            $model_trans_sales->save();

            $data_cart = json_decode(json_encode($request->cart));

            // Menyimpan Transaksi Detil Penjualan
            foreach ($data_cart as $key => $value_cart) {
                $model_trans_sales_detail = new TransactionSalesDetail();
                $model_trans_sales_detail->price = $value_cart->price;
                $model_trans_sales_detail->qty = $value_cart->qty;
                if ($value_cart->unit == 'box') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    $model_trans_sales_detail->qty_in_tablet = ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet);
                } else if ($value_cart->unit == 'strip') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    $model_trans_sales_detail->qty_in_tablet = $value_cart->qty * $unit->qty_in_tablet;
                } else if ($value_cart->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    $model_trans_sales_detail->qty_in_tablet = $value_cart->qty;
                }
                $model_trans_sales_detail->discount = $value_cart->discount;
                $model_trans_sales_detail->subtotal = $value_cart->price * $value_cart->qty - (($value_cart->price * $value_cart->qty) * $value_cart->discount);
                $model_trans_sales_detail->unit = $value_cart->unit;
                $model_trans_sales_detail->transaction_sales_id = $model_trans_sales->id;
                $model_trans_sales_detail->item_id = $value_cart->item_id;
                $model_trans_sales_detail->save();

                if ($value_cart->unit == 'box') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    Item::where('id', $value_cart->item_id)->decrement('qty_total', ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet));
                } else if ($value_cart->unit == 'strip') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    Item::where('id', $value_cart->item_id)->decrement('qty_total', ($value_cart->qty * $unit->qty_in_tablet));
                } else if ($value_cart->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    Item::where('id', $value_cart->item_id)->decrement('qty_total', $value_cart->qty);
                }

                // Menyimpan Transaksi Penjualan di Kartu Barang
                $tableNameItemCard = "item_cards";
                $primaryItemCard = "code";
                $autoNumberItemCard = new AutoNumber();
                $getCodeItemCard = $autoNumberItemCard->generate($tableNameItemCard, $primaryItemCard);

                $model_item_cards = new ItemCard();
                $model_item_cards->code = "IC".$getCode;
                $model_item_cards->price = $value_cart->price;
                $model_item_cards->qty = $value_cart->qty;
                if ($value_cart->unit == 'box') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    $model_item_cards->qty_in_tablet = ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet);
                } else if ($value_cart->unit == 'strip') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    $model_item_cards->qty_in_tablet = $value_cart->qty * $unit->qty_in_tablet;
                } else if ($value_cart->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->item_id)->get()->first();
                    $model_item_cards->qty_in_tablet = $value_cart->qty;
                }
                $model_item_cards->discount = $value_cart->discount;
                $model_item_cards->subtotal = $value_cart->price * $value_cart->qty - (($value_cart->price * $value_cart->qty) * $value_cart->discount);
                $model_item_cards->unit = $value_cart->unit;
                $model_item_cards->status = "stock_out";
                $model_item_cards->item_id = $value_cart->item_id;
                $model_item_cards->trans_code = $request->code;
                $model_item_cards->date = date("Y-m-d");
                $model_item_cards->time = $model_trans_sales->time;
                $model_item_cards->save();
            }

            // Menyimpan Transaksi Penjualan di Histori Transaksi Penjualan
            $model_his_trans_sales = new HistoryTransSales();
            $model_his_trans_sales->user_id = Auth::user()->id;
            $model_his_trans_sales->action = "Membuat transaksi penjualan";
            $model_his_trans_sales->transaction_sales_id = $model_trans_sales->id;
            $model_his_trans_sales->date = date("Y-m-d");
            $model_his_trans_sales->time = $model_trans_sales->time;
            $model_his_trans_sales->save();

            DB::commit();

            DB::table('temp_transaction_sales')->where('user_id', Auth::user()->id)->delete();

            return "Success";

        } catch(\Exception $e) {
            return "Error"." ".$e;
            DB::rollback();
        }
    }

    public function printLastTrSales()
    {
    	$model_trans_sales = new TransactionSales();
        $print_last_tr_sales = $model_trans_sales->printLastTrSales();
        return response()->json($print_last_tr_sales);
    }

    public function insRandData(Request $request) {
        // Last DB 33 Result
        for ($i=0; $i < 1000; $i++) {
            DB::table('transaction_sales')->insert([
                'code' => 'SL'.rand(180801000000, 180901000000)
                ,'total_price' => rand(10000, 100000)
                ,'discount_price' => 0
                ,'discount' => 0
                ,'grand_total' => rand(10000, 100000)
                ,'payment' => rand(10000, 100000)
                ,'balance' => rand(1000, 10000)
                ,'date' => date('Y-m-d')
                ,'time' => date("H:i:s")
                ,'status' => 'stock_out'
                ,'user_id' => rand(2,5)
            ]);
        }
        echo 'Selesai';
    }
}
