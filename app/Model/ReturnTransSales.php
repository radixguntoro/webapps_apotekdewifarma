<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class ReturnTransSales extends Model
{
    protected $table = 'return_sales';
    public function getReturnTransSalesBySearch($typing)
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

    public function getReturnTransSalesByFilter($code)
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
            ->where('transaction_sales.code', $code)
            ->orderBy('transaction_sales.id', 'desc')
            ->paginate(25);
        return $data;
    }

    public function getReturnTransSalesPagination()
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

    public function getReturnTransSalesDetail($id)
    {
        $data = DB::table('transaction_sales_detail')
            ->select(
                'transaction_sales_detail.id as id'
                , 'transaction_sales_detail.item_id as item_id'
                , 'transaction_sales_detail.price as price'
                , 'transaction_sales_detail.qty as qty'
                , 'transaction_sales_detail.qty_in_tablet as qty_in_tablet'
                , 'transaction_sales_detail.discount as discount'
                , 'transaction_sales_detail.subtotal as subtotal'
                , 'transaction_sales_detail.unit as unit'
                , 'items.name as name'
            )
            ->join('items', 'items.id', '=', 'transaction_sales_detail.item_id')
            ->where('transaction_sales_detail.transaction_sales_id', $id)
            ->get();
        return $data;
    }
}
