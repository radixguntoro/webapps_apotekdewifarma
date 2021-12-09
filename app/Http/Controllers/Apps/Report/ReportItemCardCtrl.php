<?php

namespace App\Http\Controllers\Apps\Report;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\TransactionSales;
use App\Model\TransactionSalesDetail;
use App\Model\ReportItemCard;
use App\Model\User;
use Validator;
use DB;

class ReportItemCardCtrl extends Controller
{
    public function filter(Request $request)
    {
        $model_report_item_card = new ReportItemCard();
        $item = $request->get('item');
        $datestart = $request->get('datestart');
        $dateend = $request->get('dateend');
        if ($item || $datestart || $dateend) {
            $report_item_card = $model_report_item_card->getReportItemCardByFilter($item, $datestart, $dateend);
  
            $total_saldo = 0;
            foreach ($report_item_card as $key_saldo => $val_item_card) {
                $total_saldo = $val_item_card->qty_available;
            };

            $total_in = 0;
            foreach ($report_item_card as $key_in => $val_item_card) {
                if ($val_item_card->status == 'stock_in') {
                    $total_in += $val_item_card->qty_in_tablet;
                }
            };

            $total_out = 0;
            foreach ($report_item_card as $key_out => $val_item_card) {
                if ($val_item_card->status == 'stock_out') {
                    $total_out += $val_item_card->qty_in_tablet;
                }
            };

            $data_item_card = array(
                "report_item_card" => $report_item_card,
                "total_saldo" => $total_saldo,
                "total_out" => $total_out,
                "total_in" => $total_in
            );
            return response($data_item_card);
        }
    }
}
