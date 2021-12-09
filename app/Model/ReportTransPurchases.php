<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class ReportTransPurchases extends Model
{
    protected $table = 'transaction_purchases';

    public function getReportTransPurchasesByFilter($datestart, $dateend)
    {
        $data = DB::table('transaction_purchases')
            ->select(
                'transaction_purchases.id as id'
                , 'transaction_purchases.code as code'
                , 'transaction_purchases.invoice as invoice'
                , 'transaction_purchases.total_price as total_price'
                , 'transaction_purchases.disc_total as disc_total'
                , 'transaction_purchases.ppn as ppn'
                , 'transaction_purchases.grand_total as grand_total'
                , 'transaction_purchases.date as date'
                , 'transaction_purchases.time as time'
                , 'transaction_purchases.date_input as date_input'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
                , 'suppliers.name as supplier_name'
            )
            ->join('users', 'users.id', '=', 'transaction_purchases.user_id')
            ->join('suppliers', 'suppliers.id', '=', 'transaction_purchases.supplier_id')
            ->whereBetween('transaction_purchases.date_input', [$datestart, $dateend])
            ->orderBy('transaction_purchases.id', 'desc')
            ->get();
        return $data;
    }

    public function getReturnTransPurchasesByFilter($datestart, $dateend)
    {
        $data = DB::table('return_purchases')
            ->select(
                'return_purchases.id as id'
                , 'return_purchases.subtotal as subtotal'
                , 'return_purchases.date as date'
                , 'return_purchases.time as time'
                , 'return_purchases.user_id as user_id'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.nik as nik'
            )
            ->join('users', 'users.id', '=', 'return_purchases.user_id')
            ->whereBetween('return_purchases.date', [$datestart, $dateend])
            ->orderBy('return_purchases.id', 'desc')
            ->get();
        return $data;
    }

    public function getReportTransPurchasesPagination()
    {
        $data = DB::table('transaction_purchases')
            ->select(
                'transaction_purchases.id as id'
                , 'transaction_purchases.code as code'
                , 'transaction_purchases.invoice as invoice'
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

    public function getReportTransPurchasesDetail($id)
    {
        $data = DB::table('transaction_purchases_detail')
            ->select(
                'transaction_purchases_detail.id as id'
                , 'transaction_purchases_detail.item_id as item_id'
                , 'transaction_purchases_detail.price_sell as price_sell'
                , 'transaction_purchases_detail.qty as qty'
                , 'transaction_purchases_detail.qty_in_tablet as qty_in_tablet'
                , 'transaction_purchases_detail.discount as discount'
                , 'transaction_purchases_detail.price_discount as price_discount'
                , 'transaction_purchases_detail.subtotal as subtotal'
                , 'transaction_purchases_detail.ppn as ppn'
                , 'transaction_purchases_detail.unit as unit'
                , 'transaction_purchases_detail.price_purchase_per_box as price_purchase_per_box'
                , 'transaction_purchases_detail.price_purchase_per_strip as price_purchase_per_strip'
                , 'transaction_purchases_detail.price_purchase_per_tablet as price_purchase_per_tablet'
                , 'transaction_purchases_detail.price_sell_per_box as price_sell_per_box'
                , 'transaction_purchases_detail.price_sell_per_strip as price_sell_per_strip'
                , 'transaction_purchases_detail.price_sell_per_tablet as price_sell_per_tablet'
                , 'transaction_purchases_detail.percent_profit_per_box as percent_profit_per_box'
                , 'transaction_purchases_detail.percent_profit_per_strip as percent_profit_per_strip'
                , 'transaction_purchases_detail.percent_profit_per_tablet as percent_profit_per_tablet'
                , 'transaction_purchases_detail.transaction_purchases_id as transaction_purchases_id'
                , 'items.name as name'
            )
            ->join('items', 'items.id', '=', 'transaction_purchases_detail.item_id')
            ->where('transaction_purchases_detail.transaction_purchases_id', $id)
            ->get();
        return $data;
    }
}
