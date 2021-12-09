<?php

namespace App\Http\Controllers\Apps\Retur;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Libraries\AutoNumber;
use App\Model\TransactionSales;
use App\Model\TransactionSalesDetail;
use App\Model\ReturnTransSales;
use App\Model\HistoryRetTransSales;
use App\Model\ItemCard;
use App\Model\Item;
use Cart;
use Validator;
use DB;

class ReturnTransSalesCtrl extends Controller
{
    public function index(Request $request)
    {
        $model_report_trans_sales = new ReturnTransSales();
        $code = $request->get('code');
        if ($code) {
            $report_trans_sales = $model_report_trans_sales->getReturnTransSalesByFilter($code);
            return response($report_trans_sales);
        } else {
            $report_trans_sales = $model_report_trans_sales->getReturnTransSalesPagination();
            return response($report_trans_sales);
        }
    }

    public function getReturnTransSalesDetail($id)
    {
        $model_trans_sales = new ReturnTransSales();
        $data_trans_sales = $model_trans_sales->getReturnTransSalesDetail($id);

        $trans_sales = array(
            "data_trans_sales_detail" => $data_trans_sales
        );

        return response()->json($trans_sales);
    }

    public function getDataCart() {
        $data_cart = Cart::instance('cart_ret_sales')->content();
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

        $data_cart = Cart::instance('cart_ret_sales')->add($inp_cart);
        return response()->json($data_cart);
    }

    public function cartRemove($id)
    {
        $data_cart = Cart::instance('cart_ret_sales')->remove($id);
        return response()->json($data_cart);
    }

    public function insert(Request $request) {

        try{
            DB::beginTransaction();

            $data_cart = json_decode(json_encode($request->cart));

            // Menyimpan Transaksi Detil Penjualan
            foreach ($data_cart as $key => $value_cart) {
                $tableName = "return_sales";
                $primary = "code";
                $autoNumber = new AutoNumber();
                $getCode = $autoNumber->generate($tableName, $primary);

                $model_ret_trans_sales = new ReturnTransSales();
                $model_ret_trans_sales->code = "RS".$getCode;
                $model_ret_trans_sales->qty = $value_cart->qty;
                if ($value_cart->options->unit == 'box') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    $model_ret_trans_sales->qty_total = ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet);
                } else if ($value_cart->options->unit == 'strip') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    $model_ret_trans_sales->qty_total = $value_cart->qty * $unit->qty_in_tablet;
                } else if ($value_cart->options->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    $model_ret_trans_sales->qty_total = $value_cart->qty;
                }
                $model_ret_trans_sales->unit = $value_cart->options->unit;
                $model_ret_trans_sales->price = $value_cart->price;
                $model_ret_trans_sales->subtotal = $value_cart->subtotal;
                $model_ret_trans_sales->date = date('Y-m-d');
                $model_ret_trans_sales->time = date("H:i:s");
                $model_ret_trans_sales->item_id = $value_cart->id;
                $model_ret_trans_sales->user_id = Auth::user()->id;

                if ($value_cart->options->unit == 'box') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    Item::where('id', $value_cart->id)->increment('qty_total', ($unit->qty_in_strip > 0 ? ($value_cart->qty * ($unit->qty_in_strip * $unit->qty_in_tablet)) : $value_cart->qty * $unit->qty_in_tablet));
                } else if ($value_cart->options->unit == 'strip') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    Item::where('id', $value_cart->id)->increment('qty_total', ($value_cart->qty * $unit->qty_in_tablet));
                } else if ($value_cart->options->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    Item::where('id', $value_cart->id)->increment('qty_total', $value_cart->qty);
                }

                $model_ret_trans_sales->save();


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
                } else if ($value_cart->options->unit == 'strip') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    $model_item_cards->qty_in_tablet = $value_cart->qty * $unit->qty_in_tablet;
                } else if ($value_cart->options->unit == 'tablet') {
                    $unit = Item::where('id', $value_cart->id)->get()->first();
                    $model_item_cards->qty_in_tablet = $value_cart->qty;
                }
                $model_item_cards->discount = $value_cart->options->discount;
                $model_item_cards->subtotal = $value_cart->subtotal;
                $model_item_cards->unit = $value_cart->options->unit;
                $model_item_cards->status = "stock_in";
                $model_item_cards->item_id = $value_cart->id;
                $model_item_cards->trans_code = "RS".$getCode;
                $model_item_cards->date = date("Y-m-d");
                $model_item_cards->time = $model_ret_trans_sales->time;
                $model_item_cards->save();

                // Menyimpan Transaksi Penjualan di Histori Transaksi Penjualan
                $model_his_trans_sales = new HistoryRetTransSales();
                $model_his_trans_sales->user_id = Auth::user()->id;
                $model_his_trans_sales->action = "Membuat retur transaksi penjualan";
                $model_his_trans_sales->return_sales_id = $model_ret_trans_sales->id;
                $model_his_trans_sales->date = date("Y-m-d");
                $model_his_trans_sales->time = $model_ret_trans_sales->time;
                $model_his_trans_sales->save();
            }


            DB::commit();

            Cart::instance('cart_ret_sales')->destroy();

            return "Success";

        } catch(\Exception $e) {
            return "Error"." ".$e;
            DB::rollback();
        }
    }
}
