<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class ReportItemCard extends Model
{
    public function getReportItemCardByFilter($item, $datestart, $dateend)
    {
        $data = DB::table('item_cards')
            ->select(
                'item_cards.id as id'
                , 'item_cards.item_id as item_id'
                , 'item_cards.price as price'
                , 'item_cards.qty as qty'
                , 'item_cards.qty_in_tablet as qty_in_tablet'
                , 'item_cards.discount as discount'
                , 'item_cards.subtotal as subtotal'
                , 'item_cards.unit as unit'
                , 'item_cards.date as date'
                , 'item_cards.time as time'
                , 'item_cards.status as status'
                , 'item_cards.trans_code as trans_code'
                , 'items.name as item_name'
                , 'items.price_sell_per_tablet as price_available'
                , 'items.qty_total as qty_available'
            )
            ->join('items', 'items.id', '=', 'item_cards.item_id')
            ->where('item_cards.item_id', $item)
            ->whereBetween('item_cards.date', [$datestart, $dateend])
            ->orderBy('item_cards.id', 'desc')
            ->get();
        return $data;
    }
}
