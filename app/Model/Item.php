<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class Item extends Model
{
    protected $table = 'items';
    protected $fillable = [
        'name','parent_id'
   	];

    public function getItemBySearch($typing)
    {
        $data = DB::table('items')
        ->select(
            'items.id as id'
            , 'items.barcode_box as barcode_box'
            , 'items.barcode_strip as barcode_strip'
            , 'items.sku as sku'
            , 'items.name as name'
            , 'items.note as note'
            , 'items.price_sell_per_box as price_sell_per_box'
            , 'items.price_sell_per_strip as price_sell_per_strip'
            , 'items.price_sell_per_tablet as price_sell_per_tablet'
            // , 'items.price_sell_per_bottle as price_sell_per_bottle'
            , 'items.percent_profit_per_box as percent_profit_per_box'
            , 'items.percent_profit_per_strip as percent_profit_per_strip'
            , 'items.percent_profit_per_tablet as percent_profit_per_tablet'
            // , 'items.percent_profit_per_bottle as percent_profit_per_bottle'
            , 'items.price_purchase_per_box as price_purchase_per_box'
            , 'items.price_purchase_per_strip as price_purchase_per_strip'
            , 'items.price_purchase_per_tablet as price_purchase_per_tablet'
            // , 'items.price_purchase_per_bottle as price_purchase_per_bottle'
            , 'items.qty_in_box as qty_in_box'
            , 'items.qty_in_strip as qty_in_strip'
            , 'items.qty_in_tablet as qty_in_tablet'
            // , 'items.qty_in_bottle as qty_in_bottle'
            , 'items.qty_total as qty_total'
            , 'items.qty_min as qty_min'
            , 'items.active as active'
            , 'users.id as user_id'
            , 'users.first_name as user_name'
        )
        ->join('users', 'users.id', '=', 'items.user_id')
        ->where("items.name", "LIKE", "%{$typing}%")
        ->orWhere("items.sku", "LIKE", "%{$typing}%")
        ->orWhere("items.barcode_box", "LIKE", "%{$typing}%")
        ->orderBy('items.id', 'desc')
        ->paginate(25);

        return $data;
    }

    public function getItemPagination()
    {
        $data = DB::table('items')
        ->select(
            'items.id as id'
            , 'items.barcode_box as barcode_box'
            , 'items.barcode_strip as barcode_strip'
            , 'items.sku as sku'
            , 'items.name as name'
            , 'items.note as note'
            , 'items.price_sell_per_box as price_sell_per_box'
            , 'items.price_sell_per_strip as price_sell_per_strip'
            , 'items.price_sell_per_tablet as price_sell_per_tablet'
            // , 'items.price_sell_per_bottle as price_sell_per_bottle'
            , 'items.percent_profit_per_box as percent_profit_per_box'
            , 'items.percent_profit_per_strip as percent_profit_per_strip'
            , 'items.percent_profit_per_tablet as percent_profit_per_tablet'
            // , 'items.percent_profit_per_bottle as percent_profit_per_bottle'
            , 'items.price_purchase_per_box as price_purchase_per_box'
            , 'items.price_purchase_per_strip as price_purchase_per_strip'
            , 'items.price_purchase_per_tablet as price_purchase_per_tablet'
            // , 'items.price_purchase_per_bottle as price_purchase_per_bottle'
            , 'items.qty_in_box as qty_in_box'
            , 'items.qty_in_strip as qty_in_strip'
            , 'items.qty_in_tablet as qty_in_tablet'
            // , 'items.qty_in_bottle as qty_in_bottle'
            , 'items.qty_total as qty_total'
            , 'items.qty_min as qty_min'
            , 'items.active as active'
            , 'users.id as user_id'
            , 'users.first_name as user_name'
        )
        ->join('users', 'users.id', '=', 'items.user_id')
        ->orderBy('items.id', 'desc')
        ->paginate(25);

        return $data;
    }

    public function getItemById($id)
    {
        $data = DB::table('items')
        ->select(
            'items.id as id'
            , 'items.barcode_box as barcode_box'
            , 'items.barcode_strip as barcode_strip'
            , 'items.sku as sku'
            , 'items.name as name'
            , 'items.note as note'
            , 'items.price_sell_per_box as price_sell_per_box'
            , 'items.price_sell_per_strip as price_sell_per_strip'
            , 'items.price_sell_per_tablet as price_sell_per_tablet'
            // , 'items.price_sell_per_bottle as price_sell_per_bottle'
            , 'items.percent_profit_per_box as percent_profit_per_box'
            , 'items.percent_profit_per_strip as percent_profit_per_strip'
            , 'items.percent_profit_per_tablet as percent_profit_per_tablet'
            // , 'items.percent_profit_per_bottle as percent_profit_per_bottle'
            , 'items.price_purchase_per_box as price_purchase_per_box'
            , 'items.price_purchase_per_strip as price_purchase_per_strip'
            , 'items.price_purchase_per_tablet as price_purchase_per_tablet'
            // , 'items.price_purchase_per_bottle as price_purchase_per_bottle'
            , 'items.qty_in_box as qty_in_box'
            , 'items.qty_in_strip as qty_in_strip'
            , 'items.qty_in_tablet as qty_in_tablet'
            // , 'items.qty_in_bottle as qty_in_bottle'
            , 'items.qty_total as qty_total'
            , 'items.qty_min as qty_min'
            , 'items.active as active'
            , 'users.id as user_id'
            , 'users.first_name as user_name'
        )
        ->join('users', 'users.id', '=', 'items.user_id')
        ->where('items.id', $id)
        ->get();

        return $data;
    }

    public function searchItemSales($typing)
    {
        $data = DB::table('items')
        ->select(
            'items.id as id'
            , 'items.barcode_box as barcode_box'
            , 'items.barcode_strip as barcode_strip'
            , 'items.sku as sku'
            , 'items.name as name'
            , 'items.note as note'
            , 'items.price_sell_per_box as price_sell_per_box'
            , 'items.price_sell_per_strip as price_sell_per_strip'
            , 'items.price_sell_per_tablet as price_sell_per_tablet'
            // , 'items.price_sell_per_bottle as price_sell_per_bottle'
            , 'items.percent_profit_per_box as percent_profit_per_box'
            , 'items.percent_profit_per_strip as percent_profit_per_strip'
            , 'items.percent_profit_per_tablet as percent_profit_per_tablet'
            // , 'items.percent_profit_per_bottle as percent_profit_per_bottle'
            , 'items.price_purchase_per_box as price_purchase_per_box'
            , 'items.price_purchase_per_strip as price_purchase_per_strip'
            , 'items.price_purchase_per_tablet as price_purchase_per_tablet'
            // , 'items.price_purchase_per_bottle as price_purchase_per_bottle'
            , 'items.qty_in_box as qty_in_box'
            , 'items.qty_in_strip as qty_in_strip'
            , 'items.qty_in_tablet as qty_in_tablet'
            // , 'items.qty_in_bottle as qty_in_bottle'
            , 'items.qty_total as qty_total'
            , 'items.qty_min as qty_min'
            , 'items.active as active'
            , 'users.id as user_id'
            , 'users.first_name as user_name'
        )
        ->join('users', 'users.id', '=', 'items.user_id')
        ->where("items.name", "LIKE", "%{$typing}%")
        ->orWhere("items.sku", "LIKE", "%{$typing}%")
        ->orWhere("items.barcode_box", "LIKE", "%{$typing}%")
        ->orWhere("items.barcode_strip", "LIKE", "%{$typing}%")
        ->orderBy('items.id', 'desc')
        ->paginate(10);

        return $data;
    }

    public function getMinStockItem()
    {
        $data = DB::table('items')
        ->select(
            'items.id as id'
            , 'items.barcode_box as barcode_box'
            , 'items.barcode_strip as barcode_strip'
            , 'items.sku as sku'
            , 'items.name as name'
            , 'items.note as note'
            , 'items.price_sell_per_box as price_sell_per_box'
            , 'items.price_sell_per_strip as price_sell_per_strip'
            , 'items.price_sell_per_tablet as price_sell_per_tablet'
            , 'items.percent_profit_per_box as percent_profit_per_box'
            , 'items.percent_profit_per_strip as percent_profit_per_strip'
            , 'items.percent_profit_per_tablet as percent_profit_per_tablet'
            , 'items.price_purchase_per_box as price_purchase_per_box'
            , 'items.price_purchase_per_strip as price_purchase_per_strip'
            , 'items.price_purchase_per_tablet as price_purchase_per_tablet'
            , 'items.qty_in_box as qty_in_box'
            , 'items.qty_in_strip as qty_in_strip'
            , 'items.qty_in_tablet as qty_in_tablet'
            , 'items.qty_total as qty_total'
            , 'items.qty_min as qty_min'
            , 'items.active as active'
        )
        ->whereColumn("items.qty_total", "<=", "items.qty_min")
        ->orderBy('items.id', 'desc')
        ->get();

        return $data;
    }
}
