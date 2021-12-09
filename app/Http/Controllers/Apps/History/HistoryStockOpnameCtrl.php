<?php

namespace App\Http\Controllers\Apps\History;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\TransactionSales;
use App\Model\TransactionSalesDetail;
use App\Model\HistoryStockOpname;
use App\Model\User;
use Validator;
use DB;

class HistoryStockOpnameCtrl extends Controller
{
    public function index(Request $request)
    {
        $model_history_trans_sales = new HistoryStockOpname();
        $datestart = $request->get('datestart');
        $dateend = $request->get('dateend');
        if ($datestart || $dateend) {
            $hitory_trans_sales = $model_history_trans_sales->getHistoryStockOpnameByFilter($datestart, $dateend);
            return response($hitory_trans_sales);
        } else {
            $hitory_trans_sales = $model_history_trans_sales->getHistoryStockOpnamePagination();
            return response($hitory_trans_sales);
        }
    }
}
