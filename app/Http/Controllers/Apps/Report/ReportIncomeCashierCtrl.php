<?php

namespace App\Http\Controllers\Apps\Report;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\ReportIncomeCashier;
use App\Model\User;
use Validator;
use DB;

class ReportIncomeCashierCtrl extends Controller
{
    public function filter(Request $request)
    {
        $datestart = $request->get('datestart');
        $dateend = $request->get('dateend');
        if ($datestart || $dateend) {
            $report_closing_cashier = ReportIncomeCashier::select(DB::raw('date as date, SUM(income_app) AS total_sales, SUM(income_real) AS total_real, SUM(income_diff) AS total_diff'))->whereBetween('date', [$datestart, $dateend])->groupBy('date')->get();

            $app_closing_cashier = 0;
            $real_closing_cashier = 0;
            foreach ($report_closing_cashier as $key_report => $val_closing_cashier) {
                $app_closing_cashier += $val_closing_cashier->total_sales;
                $real_closing_cashier += $val_closing_cashier->total_real;
            };
            $data_closing_cashier = array(
                "report_closing_cashier" => $report_closing_cashier,
                "app_closing_cashier" => $app_closing_cashier,
                "real_closing_cashier" => $real_closing_cashier,
            );
            return response($data_closing_cashier);
        }
    }
}
