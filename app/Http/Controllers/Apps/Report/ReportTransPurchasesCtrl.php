<?php

namespace App\Http\Controllers\Apps\Report;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\TransactionPurchases;
use App\Model\TransactionPurchasesDetail;
use App\Model\ReportTransPurchases;
use App\Model\User;
use Validator;
use DB;

class ReportTransPurchasesCtrl extends Controller
{
    // public function index(Request $request)
    // {
    //     $model_report_trans_purchases = new ReportTransPurchases();
    //     $datestart = $request->get('datestart');
    //     $dateend = $request->get('dateend');
    //     $code = $request->get('code');
    //     if ($datestart || $dateend) {
    //         $report_trans_purchases = $model_report_trans_purchases->getReportTransPurchasesByFilter($datestart, $dateend);
    //         $total_trans_purchases = 0;
    //         foreach ($report_trans_purchases as $key => $val_trans_purchases) {
    //             $total_trans_purchases += $val_trans_purchases->grand_total;
    //         }
    //
    //         $data_trans_purchases = array(
    //             "report_trans_purchases" => $report_trans_purchases,
    //             "total_trans_purchases" => $total_trans_purchases,
    //         );
    //         return response($data_trans_purchases);
    //     } else {
    //         $report_trans_purchases = $model_report_trans_purchases->getReportTransPurchasesPagination();
    //         $data_trans_purchases = array(
    //             "report_trans_purchases" => array("data" => [], "total" => 0),
    //             "total_trans_purchases" => $total_trans_purchases,
    //         );
    //         return response($data_trans_purchases);
    //     }
    // }

    public function filterReportTransPurchases(Request $request)
    {
        $model_report_trans_purchases = new ReportTransPurchases();
        $datestart = $request->get('datestart');
        $dateend = $request->get('dateend');
        $code = $request->get('code');
        if ($datestart || $dateend) {
            $report_trans_purchases = $model_report_trans_purchases->getReportTransPurchasesByFilter($datestart, $dateend);
            // cetak_r($report_trans_purchases);
            $return_trans_purchases = $model_report_trans_purchases->getReturnTransPurchasesByFilter($datestart, $dateend);
            $total_trans_purchases = 0;
            foreach ($report_trans_purchases as $key_report => $val_trans_purchases) {
                $total_trans_purchases += $val_trans_purchases->grand_total;
            };

            $total_return_purchases = 0;
            foreach ($return_trans_purchases as $key_return => $val_return_purchases) {
                $total_return_purchases += $val_return_purchases->subtotal;
            };

            $data_trans_purchases = array(
                "report_trans_purchases" => $report_trans_purchases,
                "total_trans_purchases" => $total_trans_purchases,
                "total_return_purchases" => $total_return_purchases,
            );

            return response($data_trans_purchases);
        }
    }

    public function getReportTransPurchasesDetail($id)
    {
        $model_trans_purchases = new ReportTransPurchases();
        $data_trans_purchases = $model_trans_purchases->getReportTransPurchasesDetail($id);

        $trans_purchases = array(
            "data_trans_purchases_detail" => $data_trans_purchases
        );

        return response()->json($trans_purchases);
    }
}
