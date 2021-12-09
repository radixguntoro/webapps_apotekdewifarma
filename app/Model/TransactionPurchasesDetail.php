<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class TransactionPurchasesDetail extends Model
{
    protected $table = 'transaction_purchases_detail';

    public $timestamps = false;

    public function getDataTransactionPurchasesDetail($id) {
        $data = DB::table('transaction_purchases_detail')
        ->select(
            'transaction_purchases_detail.id as id'
            , 'transaction_purchases_detail.item_id as item_id'
            , 'transaction_purchases_detail.discount as discount'
            , 'transaction_purchases_detail.percent_profit_per_box as percent_profit_per_box'
            , 'transaction_purchases_detail.percent_profit_per_strip as percent_profit_per_strip'
            , 'transaction_purchases_detail.percent_profit_per_tablet as percent_profit_per_tablet'
            , 'transaction_purchases_detail.ppn as ppn'
            , 'transaction_purchases_detail.price_discount as price_discount'
            , 'transaction_purchases_detail.price_discount as price_first'
            , 'transaction_purchases_detail.price_purchase_per_box as price_purchase_per_box'
            , 'transaction_purchases_detail.price_purchase_per_strip as price_purchase_per_strip'
            , 'transaction_purchases_detail.price_purchase_per_tablet as price_purchase_per_tablet'
            , 'transaction_purchases_detail.price_sell as price_sell'
            , 'transaction_purchases_detail.price_sell as price'
            , 'transaction_purchases_detail.price_sell_per_box as price_sell_per_box'
            , 'transaction_purchases_detail.price_sell_per_strip as price_sell_per_strip'
            , 'transaction_purchases_detail.price_sell_per_tablet as price_sell_per_tablet'
            , 'transaction_purchases_detail.qty as qty'
            , 'transaction_purchases_detail.qty_in_tablet as qty_total'
            , 'transaction_purchases_detail.subtotal as subtotal'
            , 'transaction_purchases_detail.subtotal as price_last'
            , 'transaction_purchases_detail.transaction_purchases_id as transaction_purchases_id'
            , 'transaction_purchases_detail.unit as unit'
            , 'items.name as name'
            , 'items.price_sell_per_box as item_price_sell_per_box'
            , 'items.price_sell_per_strip as item_price_sell_per_strip'
            , 'items.price_sell_per_tablet as item_price_sell_per_tablet'
            , 'items.percent_profit_per_box as item_percent_profit_per_box'
            , 'items.percent_profit_per_strip as item_percent_profit_per_strip'
            , 'items.percent_profit_per_tablet as item_percent_profit_per_tablet'
            , 'items.price_purchase_per_box as item_price_purchase_per_box'
            , 'items.price_purchase_per_strip as item_price_purchase_per_strip'
            , 'items.price_purchase_per_tablet as item_price_purchase_per_tablet'
            , 'items.qty_in_box as qty_in_box'
            , 'items.qty_in_strip as qty_in_strip'
            , 'items.qty_in_tablet as qty_in_tablet'
        )
        ->join('items', 'items.id', '=', 'transaction_purchases_detail.item_id')
        ->where('transaction_purchases_detail.transaction_purchases_id', $id)
        ->get();

        return $data;
    }
}
