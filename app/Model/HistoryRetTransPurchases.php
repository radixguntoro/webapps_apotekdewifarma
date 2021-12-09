<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class HistoryRetTransPurchases extends Model
{
    protected $table = 'history_ret_trans_purchases';
    public function getHistoryTransPurchasesBySearch($typing)
    {
        $data = DB::table('history_trans_purchases')
            ->select(
                'history_trans_purchases.id as id'
                , 'history_trans_purchases.date as date'
                , 'history_trans_purchases.time as time'
                , 'history_trans_purchases.created_at as created_at'
                , 'history_trans_purchases.action as action'
                , 'history_trans_purchases.transaction_purchases_id as transaction_purchases_id'
                , 'history_trans_purchases.user_id as user_id'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
                , 'transaction_purchases.id as id'
                , 'transaction_purchases.code as code'
            )
            ->join('users', 'users.id', '=', 'history_trans_purchases.user_id')
            ->join('transaction_purchases', 'transaction_purchases.id', '=', 'history_trans_purchases.transaction_purchases_id')
            ->where("users.first_name", "LIKE", "%{$typing}%")
            ->orWhere("users.last_name", "LIKE", "%{$typing}%")
            ->orderBy('history_trans_purchases.id', 'desc')
            ->paginate(25);

        return $data;
    }

    public function getHistoryTransPurchasesByFilter($datestart, $dateend)
    {
        $data = DB::table('history_trans_purchases')
            ->select(
                'history_trans_purchases.id as id'
                , 'history_trans_purchases.date as date'
                , 'history_trans_purchases.time as time'
                , 'history_trans_purchases.created_at as created_at'
                , 'history_trans_purchases.action as action'
                , 'history_trans_purchases.transaction_purchases_id as transaction_purchases_id'
                , 'history_trans_purchases.user_id as user_id'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
                , 'transaction_purchases.id as id'
                , 'transaction_purchases.code as code'
            )
            ->join('users', 'users.id', '=', 'history_trans_purchases.user_id')
            ->join('transaction_purchases', 'transaction_purchases.id', '=', 'history_trans_purchases.transaction_purchases_id')
            ->whereBetween('history_trans_purchases.date', [$datestart, $dateend])
            ->orderBy('history_trans_purchases.id', 'desc')
            ->paginate(25);
        return $data;
    }

    public function getHistoryTransPurchasesPagination()
    {
        $data = DB::table('history_trans_purchases')
            ->select(
                'history_trans_purchases.id as id'
                , 'history_trans_purchases.date as date'
                , 'history_trans_purchases.time as time'
                , 'history_trans_purchases.created_at as created_at'
                , 'history_trans_purchases.action as action'
                , 'history_trans_purchases.transaction_purchases_id as transaction_purchases_id'
                , 'history_trans_purchases.user_id as user_id'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
                , 'transaction_purchases.id as id'
                , 'transaction_purchases.code as code'
            )
            ->join('users', 'users.id', '=', 'history_trans_purchases.user_id')
            ->join('transaction_purchases', 'transaction_purchases.id', '=', 'history_trans_purchases.transaction_purchases_id')
            ->orderBy('history_trans_purchases.id', 'desc')
            ->paginate(25);

        return $data;
    }
}
