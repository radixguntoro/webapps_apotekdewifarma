<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class HistoryStockOpname extends Model
{
    protected $table = 'history_stock_opname';
    public function getHistoryStockOpnameBySearch($typing)
    {
        $data = DB::table('history_stock_opname')
            ->select(
                'history_stock_opname.id as id'
                , 'history_stock_opname.date as date'
                , 'history_stock_opname.time as time'
                , 'history_stock_opname.created_at as created_at'
                , 'history_stock_opname.action as action'
                , 'history_stock_opname.stock_opname_id as stock_opname_id'
                , 'history_stock_opname.user_id as user_id'
                , 'stock_opname.code as code'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
            )
            ->join('users', 'users.id', '=', 'history_stock_opname.user_id')
            ->join('stock_opname', 'stock_opname.id', '=', 'history_stock_opname.stock_opname_id')
            ->where("users.first_name", "LIKE", "%{$typing}%")
            ->orWhere("users.last_name", "LIKE", "%{$typing}%")
            ->orderBy('history_stock_opname.id', 'desc')
            ->paginate(25);

        return $data;
    }

    public function getHistoryStockOpnameByFilter($datestart, $dateend)
    {
        $data = DB::table('history_stock_opname')
            ->select(
                'history_stock_opname.id as id'
                , 'history_stock_opname.date as date'
                , 'history_stock_opname.time as time'
                , 'history_stock_opname.created_at as created_at'
                , 'history_stock_opname.action as action'
                , 'history_stock_opname.stock_opname_id as stock_opname_id'
                , 'history_stock_opname.user_id as user_id'
                , 'stock_opname.code as code'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
            )
            ->join('users', 'users.id', '=', 'history_stock_opname.user_id')
            ->join('stock_opname', 'stock_opname.id', '=', 'history_stock_opname.stock_opname_id')
            ->whereBetween('history_stock_opname.date', [$datestart, $dateend])
            ->orderBy('history_stock_opname.id', 'desc')
            ->paginate(25);
        return $data;
    }

    public function getHistoryStockOpnamePagination()
    {
        $data = DB::table('history_stock_opname')
            ->select(
                'history_stock_opname.id as id'
                , 'history_stock_opname.date as date'
                , 'history_stock_opname.time as time'
                , 'history_stock_opname.created_at as created_at'
                , 'history_stock_opname.action as action'
                , 'history_stock_opname.stock_opname_id as stock_opname_id'
                , 'history_stock_opname.user_id as user_id'
                , 'stock_opname.code as code'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
            )
            ->join('users', 'users.id', '=', 'history_stock_opname.user_id')
            ->join('stock_opname', 'stock_opname.id', '=', 'history_stock_opname.stock_opname_id')
            ->orderBy('history_stock_opname.id', 'desc')
            ->paginate(25);

        return $data;
    }
}
