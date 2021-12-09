<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class ReturnTransPurchases extends Model
{
    protected $table = 'return_purchases';
    public function getReturnTransSalesBySearch($typing)
    {
        $data = DB::table('transaction_purchases')
            ->select(
                'transaction_purchases.id as id'
                , 'transaction_purchases.code as code'
                , 'transaction_purchases.total_price as total_price'
                , 'transaction_purchases.discount_price as discount_price'
                , 'transaction_purchases.discount as discount'
                , 'transaction_purchases.grand_total as grand_total'
                , 'transaction_purchases.payment as payment'
                , 'transaction_purchases.balance as balance'
                , 'transaction_purchases.date as date'
                , 'transaction_purchases.time as time'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
            )
            ->join('users', 'users.id', '=', 'transaction_purchases.user_id')
            ->where("users.first_name", "LIKE", "%{$typing}%")
            ->orWhere("users.last_name", "LIKE", "%{$typing}%")
            ->orderBy('transaction_purchases.id', 'desc')
            ->paginate(25);

        return $data;
    }

    public function getReturnTransSalesByFilter($code)
    {
        $data = DB::table('transaction_purchases')
            ->select(
                'transaction_purchases.id as id'
                , 'transaction_purchases.code as code'
                , 'transaction_purchases.total_price as total_price'
                , 'transaction_purchases.discount_price as discount_price'
                , 'transaction_purchases.discount as discount'
                , 'transaction_purchases.grand_total as grand_total'
                , 'transaction_purchases.payment as payment'
                , 'transaction_purchases.balance as balance'
                , 'transaction_purchases.date as date'
                , 'transaction_purchases.time as time'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
            )
            ->join('users', 'users.id', '=', 'transaction_purchases.user_id')
            ->where('transaction_purchases.code', $code)
            ->orderBy('transaction_purchases.id', 'desc')
            ->paginate(25);
        return $data;
    }

    public function getReturnTransSalesPagination()
    {
        $data = DB::table('transaction_purchases')
            ->select(
                'transaction_purchases.id as id'
                , 'transaction_purchases.code as code'
                , 'transaction_purchases.total_price as total_price'
                , 'transaction_purchases.discount_price as discount_price'
                , 'transaction_purchases.discount as discount'
                , 'transaction_purchases.grand_total as grand_total'
                , 'transaction_purchases.payment as payment'
                , 'transaction_purchases.balance as balance'
                , 'transaction_purchases.date as date'
                , 'transaction_purchases.time as time'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
            )
            ->join('users', 'users.id', '=', 'transaction_purchases.user_id')
            ->orderBy('transaction_purchases.id', 'desc')
            ->paginate(25);
        return $data;
    }

    public function getReturnTransSalesDetail($id)
    {
        $data = DB::table('transaction_purchases_detail')
            ->select(
                'transaction_purchases_detail.id as id'
                , 'transaction_purchases_detail.item_id as item_id'
                , 'transaction_purchases_detail.price as price'
                , 'transaction_purchases_detail.qty as qty'
                , 'transaction_purchases_detail.qty_in_tablet as qty_in_tablet'
                , 'transaction_purchases_detail.discount as discount'
                , 'transaction_purchases_detail.subtotal as subtotal'
                , 'transaction_purchases_detail.unit as unit'
                , 'items.name as name'
            )
            ->join('items', 'items.id', '=', 'transaction_purchases_detail.item_id')
            ->where('transaction_purchases_detail.transaction_purchases_id', $id)
            ->get();
        return $data;
    }
}
