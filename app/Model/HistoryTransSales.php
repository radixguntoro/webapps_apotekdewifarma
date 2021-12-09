<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class HistoryTransSales extends Model
{
    protected $table = 'history_trans_sales';
    public function getHistoryTransSalesBySearch($typing)
    {
        $data = DB::table('history_trans_sales')
            ->select(
                'history_trans_sales.id as id'
                , 'history_trans_sales.date as date'
                , 'history_trans_sales.time as time'
                , 'history_trans_sales.created_at as created_at'
                , 'history_trans_sales.action as action'
                , 'history_trans_sales.transaction_sales_id as transaction_sales_id'
                , 'history_trans_sales.user_id as user_id'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
                , 'transaction_sales.id as id'
                , 'transaction_sales.code as code'
            )
            ->join('users', 'users.id', '=', 'history_trans_sales.user_id')
            ->join('transaction_sales', 'transaction_sales.id', '=', 'history_trans_sales.transaction_sales_id')
            ->where("users.first_name", "LIKE", "%{$typing}%")
            ->orWhere("users.last_name", "LIKE", "%{$typing}%")
            ->orderBy('history_trans_sales.id', 'desc')
            ->paginate(25);

        return $data;
    }

    public function getHistoryTransSalesByFilter($datestart, $dateend)
    {
        $data = DB::table('history_trans_sales')
            ->select(
                'history_trans_sales.id as id'
                , 'history_trans_sales.date as date'
                , 'history_trans_sales.time as time'
                , 'history_trans_sales.created_at as created_at'
                , 'history_trans_sales.action as action'
                , 'history_trans_sales.transaction_sales_id as transaction_sales_id'
                , 'history_trans_sales.user_id as user_id'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
                , 'transaction_sales.id as id'
                , 'transaction_sales.code as code'
            )
            ->join('users', 'users.id', '=', 'history_trans_sales.user_id')
            ->join('transaction_sales', 'transaction_sales.id', '=', 'history_trans_sales.transaction_sales_id')
            ->whereBetween('history_trans_sales.date', [$datestart, $dateend])
            ->orderBy('history_trans_sales.id', 'desc')
            ->paginate(25);
        return $data;
    }

    public function getHistoryTransSalesPagination()
    {
        $data = DB::table('history_trans_sales')
            ->select(
                'history_trans_sales.id as id'
                , 'history_trans_sales.date as date'
                , 'history_trans_sales.time as time'
                , 'history_trans_sales.created_at as created_at'
                , 'history_trans_sales.action as action'
                , 'history_trans_sales.transaction_sales_id as transaction_sales_id'
                , 'history_trans_sales.user_id as user_id'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
                , 'transaction_sales.id as id'
                , 'transaction_sales.code as code'
            )
            ->join('users', 'users.id', '=', 'history_trans_sales.user_id')
            ->join('transaction_sales', 'transaction_sales.id', '=', 'history_trans_sales.transaction_sales_id')
            ->orderBy('history_trans_sales.id', 'desc')
            ->paginate(25);

        return $data;
    }
}
