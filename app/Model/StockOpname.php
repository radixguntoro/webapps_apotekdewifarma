<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class StockOpname extends Model
{
    protected $table = 'stock_opname';
    public function getStockOpnameBySearch($typing)
    {
        $data = DB::table('stock_opname')
            ->select(
                'stock_opname.id as id'
                , 'stock_opname.code as code'
                , 'stock_opname.price_purchase_app as price_purchase_app'
                , 'stock_opname.price_purchase_phx as price_purchase_phx'
                , 'stock_opname.price_purchase_difference as price_purchase_difference'
                , 'stock_opname.price_sell_app as price_sell_app'
                , 'stock_opname.price_sell_phx as price_sell_phx'
                , 'stock_opname.price_sell_difference as price_sell_difference'
                , 'stock_opname.stock_in_system as stock_in_system'
                , 'stock_opname.stock_in_physic as stock_in_physic'
                , 'stock_opname.stock_difference as stock_difference'
                , 'stock_opname.status as status'
                , 'stock_opname.unit as unit'
                , 'stock_opname.date as date'
                , 'stock_opname.created_at as created_at'
                , 'stock_opname.user_id as user_id'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
                , 'items.id as item_id'
				, 'items.name as name'
                , 'items.qty_total as qty_total'
                , 'items.price_sell_per_tablet as price_sell_per_tablet'
            )
            ->join('users', 'users.id', '=', 'stock_opname.user_id')
            ->join('items', 'items.id', '=', 'stock_opname.item_id')
            ->where("users.first_name", "LIKE", "%{$typing}%")
            ->orWhere("users.last_name", "LIKE", "%{$typing}%")
            ->orderBy('stock_opname.id', 'desc')
            ->paginate(25);

        return $data;
    }

    public function getStockOpnamePagination()
    {
        $data = DB::table('stock_opname')
            ->select(
                'stock_opname.id as id'
                , 'stock_opname.code as code'
                , 'stock_opname.price_purchase_app as price_purchase_app'
                , 'stock_opname.price_purchase_phx as price_purchase_phx'
                , 'stock_opname.price_purchase_difference as price_purchase_difference'
                , 'stock_opname.price_sell_app as price_sell_app'
                , 'stock_opname.price_sell_phx as price_sell_phx'
                , 'stock_opname.price_sell_difference as price_sell_difference'
                , 'stock_opname.stock_in_system as stock_in_system'
                , 'stock_opname.stock_in_physic as stock_in_physic'
                , 'stock_opname.stock_difference as stock_difference'
                , 'stock_opname.status as status'
                , 'stock_opname.unit as unit'
                , 'stock_opname.date as date'
                , 'stock_opname.created_at as created_at'
                , 'stock_opname.user_id as user_id'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
                , 'items.name as name'
				, 'items.id as item_id'
                , 'items.qty_total as qty_total'
                , 'items.price_sell_per_tablet as price_sell_per_tablet'
            )
            ->join('users', 'users.id', '=', 'stock_opname.user_id')
            ->join('items', 'items.id', '=', 'stock_opname.item_id')
            ->where('stock_opname.status', 'proses')
            ->orderBy('stock_opname.id', 'desc')
            ->paginate(25);

        return $data;
    }
}
