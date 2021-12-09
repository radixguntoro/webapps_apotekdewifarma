<?php

namespace App\Http\Controllers\Apps\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Libraries\AutoNumber;
use Illuminate\Support\Facades\Auth;
use App\Model\Item;
use Validator;
use Response;
use Input;
use DB;

class ItemCtrl extends Controller
{
    public function index(Request $request)
    {
        $model_item = new Item();

        if ($request->get('search')) {
            $item = $model_item->getItemBySearch($request->get('search'));
        } else {
            $item = $model_item->getItemPagination();
        }
        return response($item);
    }

    public function insert(Request $request)
    {
        $tableName = "items";
        $primary = "sku";
        $autoNumber = new AutoNumber();
        $getCode = $autoNumber->generate($tableName, $primary);

        $model_item = new Item();
        $model_item->sku = "BR".$getCode;
        $model_item->name = $request->name;
        $model_item->barcode_box = $request->barcode_box;
        $model_item->barcode_strip = $request->barcode_strip;
        $model_item->note = $request->note;
        $model_item->price_purchase_per_box = $request->price_purchase_per_box;
        $model_item->price_purchase_per_strip = $request->price_purchase_per_strip;
        $model_item->price_purchase_per_tablet = $request->price_purchase_per_tablet;
        // $model_item->price_purchase_per_bottle = $request->price_purchase_per_bottle;
        $model_item->percent_profit_per_box = $request->percent_profit_per_box;
        $model_item->percent_profit_per_strip = $request->percent_profit_per_strip;
        $model_item->percent_profit_per_tablet = $request->percent_profit_per_tablet;
        // $model_item->percent_profit_per_bottle = $request->percent_profit_per_bottle;
        $model_item->price_sell_per_box = $request->price_sell_per_box;
        $model_item->price_sell_per_strip = $request->price_sell_per_strip;
        $model_item->price_sell_per_tablet = $request->price_sell_per_tablet;
        // $model_item->price_sell_per_bottle = $request->price_sell_per_bottle;
        $model_item->qty_in_box = $request->qty_in_box;
        $model_item->qty_in_strip = $request->qty_in_strip;
        $model_item->qty_in_tablet = $request->qty_in_tablet;
        // $model_item->qty_in_bottle = $request->qty_in_bottle;
        $model_item->qty_total = $request->qty_total;
        $model_item->qty_min = $request->qty_min;
        $model_item->active = $request->status;
        // $model_item->category_id = $request->category_id;
        $model_item->user_id = Auth::id();
        $model_item->save();
        return response()->json($model_item);
    }

    public function edit($id)
    {
        $model_item = new Item();
        $data_item = $model_item->getItemById($id)->first();

        return response()->json($data_item);
    }

    public function update(Request $request)
    {
        $model_item = Item::find($request->id);
        $model_item->name = $request->name;
        $model_item->barcode_box = $request->barcode_box;
        $model_item->barcode_strip = $request->barcode_strip;
        $model_item->note = $request->note;
        $model_item->price_purchase_per_box = $request->price_purchase_per_box;
        $model_item->price_purchase_per_strip = $request->price_purchase_per_strip;
        $model_item->price_purchase_per_tablet = $request->price_purchase_per_tablet;
        // $model_item->price_purchase_per_bottle = $request->price_purchase_per_bottle;
        $model_item->percent_profit_per_box = $request->percent_profit_per_box;
        $model_item->percent_profit_per_strip = $request->percent_profit_per_strip;
        $model_item->percent_profit_per_tablet = $request->percent_profit_per_tablet;
        // $model_item->percent_profit_per_bottle = $request->percent_profit_per_bottle;
        $model_item->price_sell_per_box = $request->price_sell_per_box;
        $model_item->price_sell_per_strip = $request->price_sell_per_strip;
        $model_item->price_sell_per_tablet = $request->price_sell_per_tablet;
        // $model_item->price_sell_per_bottle = $request->price_sell_per_bottle;
        $model_item->qty_in_box = $request->qty_in_box;
        $model_item->qty_in_strip = $request->qty_in_strip;
        $model_item->qty_in_tablet = $request->qty_in_tablet;
        // $model_item->qty_in_bottle = $request->qty_in_bottle;
        $model_item->qty_total = $request->qty_total;
        $model_item->qty_min = $request->qty_min;
        $model_item->active = $request->status;
        // $model_item->category_id = $request->category_id;
        $model_item->save();
        return response()->json($model_item);
    }

    public function searchItemSales(Request $request)
    {
        $model_item = new Item();
        $item = $model_item->searchItemSales($request->get('search'));
        return response($item);
    }

    public function getAll()
    {
        $model_item = new Item();
        $data_item = Item::all();

        return response()->json($data_item);
    }

    public function getItemDetail($id)
    {
        $data_item = Item::find($id);

        $item = array(
            "data_item" => $data_item
        );

        return response()->json($item);
    }

    public function minStock()
    {
        $model_item = new Item();
        $data_item = $model_item->getMinStockItem();
        // cetak_r($data_item);
        return response()->json($data_item);
    }

    public function recordSupplier($id)
    {
        $data_item = DB::table('transaction_purchases')
            ->select(
                'items.name as item_name'
                , 'suppliers.name as supplier_name'
            )
            ->join('transaction_purchases_detail', 'transaction_purchases_detail.transaction_purchases_id', '=', 'transaction_purchases.id')
            ->join('suppliers', 'suppliers.id', '=', 'transaction_purchases.supplier_id')
            ->join('items', 'items.id', '=', 'transaction_purchases_detail.item_id')
            ->where('transaction_purchases_detail.item_id', $id)
            ->orderBy('suppliers.name', 'asc')
            ->distinct()
            ->get();

        return response()->json($data_item);
    }
}
