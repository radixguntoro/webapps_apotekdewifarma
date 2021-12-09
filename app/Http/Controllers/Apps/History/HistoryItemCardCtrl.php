<?php

namespace App\Http\Controllers\Apps\History;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\TransactionSales;
use App\Model\TransactionSalesDetail;
use App\Model\HistoryTransSales;
use App\Model\User;
use Validator;
use DB;

class HistoryTransSalesCtrl extends Controller
{
    public function index(Request $request)
    {
        $model_history_trans_sales = new HistoryTransSales();
        $datestart = $request->get('datestart');
        $dateend = $request->get('dateend');
        if ($datestart || $dateend) {
            $hitory_trans_sales = $model_history_trans_sales->getHistoryTransSalesByFilter($datestart, $dateend);
            return response($hitory_trans_sales);
        } else {
            $hitory_trans_sales = $model_history_trans_sales->getHistoryTransSalesPagination();
            return response($hitory_trans_sales);
        }
    }
}
