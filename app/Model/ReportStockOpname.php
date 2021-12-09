<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class ReportStockOpname extends Model
{
    protected $table = 'stock_opname';
    public function getReportStockOpnameByFilter($datestart, $dateend, $stockmin, $stockplus)
    {

        if ($stockmin == "min" && $stockplus == "plus") {
            $data = DB::table('stock_opname')
                ->select(
                    'stock_opname.id as id'
                    , 'stock_opname.code as code'
                    , 'stock_opname.price_sell_app as price_sell_app'
                    , 'stock_opname.price_sell_phx as price_sell_phx'
                    , 'stock_opname.price_sell_difference as price_sell_difference'
                    , 'stock_opname.stock_in_system as stock_in_system'
                    , 'stock_opname.stock_in_physic as stock_in_physic'
                    , 'stock_opname.stock_difference as stock_difference'
                    , 'stock_opname.unit as unit'
                    , 'stock_opname.status as status'
                    , 'stock_opname.date as date'
                    , 'stock_opname.time as time'
                    , 'users.first_name as first_name'
                    , 'users.last_name as last_name'
                    , 'users.nik as nik'
					, 'items.id as item_id'
					, 'items.name as name'
                )
                ->join('users', 'users.id', '=', 'stock_opname.user_id')
				->join('items', 'items.id', '=', 'stock_opname.item_id')
                ->whereBetween('stock_opname.date', [$datestart, $dateend])
                ->where('stock_opname.stock_difference', '>', 0)
                ->orWhere('stock_opname.stock_difference', '<', 0)
                ->where('stock_opname.status', 'selesai')
                ->orderBy('stock_opname.id', 'desc')
                ->get();
            return $data;
        } else if ($stockmin == "min" && !isset($stockplus)) {
            $data = DB::table('stock_opname')
                ->select(
                    'stock_opname.id as id'
                    , 'stock_opname.code as code'
                    , 'stock_opname.price_sell_app as price_sell_app'
                    , 'stock_opname.price_sell_phx as price_sell_phx'
                    , 'stock_opname.price_sell_difference as price_sell_difference'
                    , 'stock_opname.stock_in_system as stock_in_system'
                    , 'stock_opname.stock_in_physic as stock_in_physic'
                    , 'stock_opname.stock_difference as stock_difference'
                    , 'stock_opname.unit as unit'
                    , 'stock_opname.status as status'
                    , 'stock_opname.date as date'
                    , 'stock_opname.time as time'
                    , 'users.first_name as first_name'
                    , 'users.last_name as last_name'
                    , 'users.nik as nik'
					, 'items.id as item_id'
					, 'items.name as name'
                )
                ->join('users', 'users.id', '=', 'stock_opname.user_id')
				->join('items', 'items.id', '=', 'stock_opname.item_id')
                ->whereBetween('stock_opname.date', [$datestart, $dateend])
                ->where('stock_opname.stock_difference', '<', 0)
                ->where('stock_opname.status', 'selesai')
                ->orderBy('stock_opname.id', 'desc')
                ->get();
            return $data;
        } else if ($stockplus == "plus" && !isset($stockmin)) {
            $data = DB::table('stock_opname')
                ->select(
                    'stock_opname.id as id'
                    , 'stock_opname.code as code'
                    , 'stock_opname.price_sell_app as price_sell_app'
                    , 'stock_opname.price_sell_phx as price_sell_phx'
                    , 'stock_opname.price_sell_difference as price_sell_difference'
                    , 'stock_opname.stock_in_system as stock_in_system'
                    , 'stock_opname.stock_in_physic as stock_in_physic'
                    , 'stock_opname.stock_difference as stock_difference'
                    , 'stock_opname.unit as unit'
                    , 'stock_opname.status as status'
                    , 'stock_opname.date as date'
                    , 'stock_opname.time as time'
                    , 'users.first_name as first_name'
                    , 'users.last_name as last_name'
                    , 'users.nik as nik'
					, 'items.id as item_id'
					, 'items.name as name'
                )
                ->join('users', 'users.id', '=', 'stock_opname.user_id')
				->join('items', 'items.id', '=', 'stock_opname.item_id')
                ->whereBetween('stock_opname.date', [$datestart, $dateend])
                ->where('stock_opname.stock_difference', '>', 0)
                ->where('stock_opname.status', 'selesai')
                ->orderBy('stock_opname.id', 'desc')
                ->get();
            return $data;
        } else {
            $data = DB::table('stock_opname')
            ->select(
                'stock_opname.id as id'
                , 'stock_opname.code as code'
                , 'stock_opname.price_sell_app as price_sell_app'
                , 'stock_opname.price_sell_phx as price_sell_phx'
                , 'stock_opname.price_sell_difference as price_sell_difference'
                , 'stock_opname.stock_in_system as stock_in_system'
                , 'stock_opname.stock_in_physic as stock_in_physic'
                , 'stock_opname.stock_difference as stock_difference'
                , 'stock_opname.unit as unit'
                , 'stock_opname.status as status'
                , 'stock_opname.date as date'
                , 'stock_opname.time as time'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
				, 'items.id as item_id'
				, 'items.name as name'
                )
                ->join('users', 'users.id', '=', 'stock_opname.user_id')
				->join('items', 'items.id', '=', 'stock_opname.item_id')
                ->whereBetween('stock_opname.date', [$datestart, $dateend])
                ->where('stock_opname.status', 'selesai')
                ->orderBy('stock_opname.id', 'desc')
                ->get();
                return $data;
        }
    }
}
