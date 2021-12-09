<?php

namespace App\Http\Controllers\Apps\Report;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\TransactionSales;
use App\Model\TransactionSalesDetail;
use App\Model\ReportTransSales;
use App\Model\User;
use Validator;
use DB;

class ReportTransSalesCtrl extends Controller
{
    public function filterReportTransSales(Request $request)
    {
        $model_report_trans_sales = new ReportTransSales();
        $datestart = $request->get('datestart');
        $dateend = $request->get('dateend');
        $userid = $request->get('user');
        if ($userid || $datestart || $dateend) {
            $report_trans_sales = $model_report_trans_sales->getReportTransSalesByFilter($userid, $datestart, $dateend);
            $return_trans_sales = $model_report_trans_sales->getReturnTransSalesByFilter($userid, $datestart, $dateend);
            $total_trans_sales = 0;
            foreach ($report_trans_sales as $key_report => $val_trans_sales) {
                $total_trans_sales += $val_trans_sales->grand_total;
            };

            $total_return_sales = 0;
            foreach ($return_trans_sales as $key_return => $val_return_sales) {
                $total_return_sales += $val_return_sales->subtotal;
            };

            $data_trans_sales = array(
                "report_trans_sales" => $report_trans_sales,
                "total_trans_sales" => $total_trans_sales,
                "total_return_sales" => $total_return_sales,
            );

            return response($data_trans_sales);
        }
    }

    public function getReportTransSalesDetail($id)
    {
        $model_trans_sales = new ReportTransSales();
        $data_trans_sales = $model_trans_sales->getReportTransSalesDetail($id);

        $trans_sales = array(
            "data_trans_sales_detail" => $data_trans_sales
        );

        return response()->json($trans_sales);
    }
}
