<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class TransactionSales extends Model
{
    protected $table = 'transaction_sales';
    public function getTransactionSalesBySearch($typing)
    {
        $data = DB::table('transaction_sales')
            ->select(
                'transaction_sales.id as id'
                , 'transaction_sales.code as code'
                , 'transaction_sales.total_price as total_price'
                , 'transaction_sales.discount_price as discount_price'
                , 'transaction_sales.discount as discount'
                , 'transaction_sales.grand_total as grand_total'
                , 'transaction_sales.payment as payment'
                , 'transaction_sales.balance as balance'
                , 'transaction_sales.date as date'
                , 'transaction_sales.time as time'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
            )
            ->join('users', 'users.id', '=', 'transaction_sales.user_id')
            ->where("users.first_name", "LIKE", "%{$typing}%")
            ->orWhere("users.last_name", "LIKE", "%{$typing}%")
            ->orderBy('transaction_sales.id', 'desc')
            ->paginate(25);

        return $data;
    }

    public function getTransactionSalesByFilter($datestart, $dateend)
    {
        $data = DB::table('transaction_sales')
            ->select(
                'transaction_sales.id as id'
                , 'transaction_sales.code as code'
                , 'transaction_sales.total_price as total_price'
                , 'transaction_sales.discount_price as discount_price'
                , 'transaction_sales.discount as discount'
                , 'transaction_sales.grand_total as grand_total'
                , 'transaction_sales.payment as payment'
                , 'transaction_sales.balance as balance'
                , 'transaction_sales.date as date'
                , 'transaction_sales.time as time'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
            )
            ->join('users', 'users.id', '=', 'transaction_sales.user_id')
            ->whereBetween('transaction_sales.date', [$datestart, $dateend])
            ->orderBy('transaction_sales.id', 'desc')
            ->paginate(25);
        return $data;
    }

    public function getTransactionSalesPagination()
    {
        $data = DB::table('transaction_sales')
            ->select(
                'transaction_sales.id as id'
                , 'transaction_sales.code as code'
                , 'transaction_sales.total_price as total_price'
                , 'transaction_sales.discount_price as discount_price'
                , 'transaction_sales.discount as discount'
                , 'transaction_sales.grand_total as grand_total'
                , 'transaction_sales.payment as payment'
                , 'transaction_sales.balance as balance'
                , 'transaction_sales.date as date'
                , 'transaction_sales.time as time'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
            )
            ->join('users', 'users.id', '=', 'transaction_sales.user_id')
            ->orderBy('transaction_sales.id', 'desc')
            ->paginate(25);

        return $data;
    }

    public function printLastTrSales()
    {
        $get_last_id = DB::table('transaction_sales')->select('id')->orderBy('transaction_sales.id', 'desc')
        ->first();
        $data = DB::table('transaction_sales')
            ->select(
                'transaction_sales.id as id'
                , 'transaction_sales.code as code'
                , 'transaction_sales.total_price as total_price'
                , 'transaction_sales.discount_price as discount_price'
                , 'transaction_sales.discount as discount'
                , 'transaction_sales.grand_total as grand_total'
                , 'transaction_sales.payment as payment'
                , 'transaction_sales.balance as balance'
                , 'transaction_sales.date as date'
                , 'transaction_sales.time as time'
                , 'transaction_sales_detail.price as price'
                , 'transaction_sales_detail.qty as qty'
                , 'transaction_sales_detail.qty_in_tablet as qty_in_tablet'
                , 'transaction_sales_detail.discount as discount_item'
                , 'transaction_sales_detail.subtotal as subtotal'
                , 'transaction_sales_detail.unit as unit'
                , 'transaction_sales_detail.item_id as item_id'
                , 'items.name as name'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
            )
            ->join('users', 'users.id', '=', 'transaction_sales.user_id')
            ->join('transaction_sales_detail', 'transaction_sales_detail.transaction_sales_id', '=', 'transaction_sales.id')
            ->join('items', 'items.id', '=', 'transaction_sales_detail.item_id')
            ->where('transaction_sales.id', $get_last_id->id)
            ->orderBy('transaction_sales.id', 'desc')
            ->get();

        return $data;
    }
}
