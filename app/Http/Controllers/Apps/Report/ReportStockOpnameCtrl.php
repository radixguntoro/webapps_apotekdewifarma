<?php

namespace App\Http\Controllers\Apps\Report;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\TransactionSales;
use App\Model\TransactionSalesDetail;
use App\Model\ReportStockOpname;
use App\Model\User;
use Validator;
use DB;

class ReportStockOpnameCtrl extends Controller
{
    public function filter(Request $request)
    {
        $model_report_stock_opname = new ReportStockOpname();
        $item = $request->get('item');
        $datestart = $request->get('datestart');
        $dateend = $request->get('dateend');
        $stockmin = $request->get('stockmin');
        $stockplus = $request->get('stockplus');
        if ($datestart || $dateend) {
            $report_stock_opname = $model_report_stock_opname->getReportStockOpnameByFilter($datestart, $dateend, $stockmin, $stockplus);
            return response($report_stock_opname);
        }
    }
}
