<?php

namespace App\Http\Controllers\Apps\Inventory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Libraries\AutoNumber;
use App\Model\Item;
use App\Model\StockOpname;
use App\Model\HistoryStockOpname;
use Cart;
use DB;

class StockOpnameCtrl extends Controller
{
    public function index(Request $request)
    {
        $model_stock_opname = new StockOpname();
        $search = $request->get('search');
        if ($search) {
            $stock_opname = $model_stock_opname->getStockOpnameBySearch($search);
            return response($stock_opname);
        } else {
            $stock_opname = $model_stock_opname->getStockOpnamePagination();
            return response($stock_opname);
        }
    }

    public function insert(Request $request) {

        try{
            DB::beginTransaction();

            // Menyimpan Transaksi Penjualan
            $tableName = "stock_opname";
            $primary = "code";
            $autoNumber = new AutoNumber();
            $getCode = $autoNumber->generate($tableName, $primary);

            $model_stock_opname = new StockOpname();
            $model_stock_opname->code = "SO".$request->code;
            $model_stock_opname->price_purchase_app = $request->price_purchase_app;
            $model_stock_opname->price_purchase_phx = $request->price_purchase_phx;
            $model_stock_opname->price_purchase_difference = $request->price_purchase_difference;
            $model_stock_opname->price_sell_app = $request->price_sell_app;
            $model_stock_opname->price_sell_phx = $request->price_sell_phx;
            $model_stock_opname->price_sell_difference = $request->price_sell_difference;
            $model_stock_opname->unit = $request->unit;
            $model_stock_opname->item_id = $request->item_id;
            $model_stock_opname->stock_in_system = $request->stock_in_system;
            $model_stock_opname->stock_in_physic = $request->stock_in_physic;
            $model_stock_opname->stock_difference = $request->stock_difference;
            $model_stock_opname->status = $request->status;
            $model_stock_opname->date = date('Y-m-d');
            $model_stock_opname->time = date("H:i:s");
            $model_stock_opname->user_id = 2;
            $model_stock_opname->save();

            // Menyimpan Transaksi Penjualan di Histori Transaksi Penjualan
            // $model_his_stock_opname = new HistoryStockOpname();
            // $model_his_stock_opname->user_id = 2;
            // $model_his_stock_opname->action = "Membuat stock opname";
            // $model_his_stock_opname->stock_opname_id = $model_stock_opname->id;
            // $model_his_stock_opname->date = date("Y-m-d");
            // $model_his_stock_opname->time = date("H:i:s");
            // $model_his_stock_opname->save();

            DB::commit();

            return "Success";

        } catch(\Exception $e) {
            return "Error"." ".$e;
            DB::rollback();
        }
    }

    public function done(Request $request) {

        try{
            DB::beginTransaction();

            $data_stock_opname = json_decode(json_encode($request->stock_opname));
            // dd($data_stock_opname);
            foreach ($data_stock_opname as $key => $val_stock_opname) {
                // if ($val_stock_opname->stock_in_physic != null) {
                    $model_stock_opname = StockOpname::find($val_stock_opname->id);
                    $model_stock_opname->price_purchase_phx = $val_stock_opname->price_purchase_phx;
                    $model_stock_opname->price_purchase_difference = $val_stock_opname->price_purchase_difference;
                    $model_stock_opname->price_sell_phx = $val_stock_opname->price_sell_phx;
                    $model_stock_opname->price_sell_difference = $val_stock_opname->price_sell_difference;
                    $model_stock_opname->stock_in_physic = $val_stock_opname->stock_in_physic;
                    $model_stock_opname->stock_difference = $val_stock_opname->stock_difference;
                    $model_stock_opname->status = "selesai";
                    $model_stock_opname->user_id = 2;
                    $model_stock_opname->save();
					
					// Mengupdate Jumlah barang sesuai stock opname fisik
					$model_item = Item::find($val_stock_opname->item_id);
					$model_item->qty_total = $val_stock_opname->stock_in_physic;
					$model_item->save();
					
                    // Menyimpan Transaksi Penjualan di Histori Transaksi Penjualan
                    $model_his_stock_opname = new HistoryStockOpname();
                    $model_his_stock_opname->user_id = 2;
                    $model_his_stock_opname->action = "Menyimpan stock opname";
                    $model_his_stock_opname->stock_opname_id = $model_stock_opname->id;
                    $model_his_stock_opname->date = date("Y-m-d");
                    $model_his_stock_opname->time = date("H:i:s");
                    $model_his_stock_opname->save();
                // }

            }


            DB::commit();

            return "Success";

        } catch(\Exception $e) {
            return "Error"." ".$e;
            DB::rollback();
        }
    }

    public function edit(Request $request) {

        try{
            DB::beginTransaction();

            $model_stock_opname = StockOpname::find($request->id);
            $model_stock_opname->status = $request->status;
            $model_stock_opname->save();

            DB::commit();

            return "Success";

        } catch(\Exception $e) {
            return "Error"." ".$e;
            DB::rollback();
        }
    }

    public function delete(Request $request) {
        HistoryStockOpname::where('stock_opname_id', '=', $request->id)->delete();
        StockOpname::where('id', '=', $request->id)->delete();
    }
}
