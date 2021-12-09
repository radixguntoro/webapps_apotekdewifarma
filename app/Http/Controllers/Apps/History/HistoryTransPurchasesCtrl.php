<?php

namespace App\Http\Controllers\Apps\History;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\TransactionPurchases;
use App\Model\TransactionPurchasesDetail;
use App\Model\HistoryTransPurchases;
use App\Model\User;
use Validator;
use DB;

class HistoryTransPurchasesCtrl extends Controller
{
    public function index(Request $request)
    {
        $model_history_trans_sales = new HistoryTransPurchases();
        $datestart = $request->get('datestart');
        $dateend = $request->get('dateend');
        if ($datestart || $dateend) {
            $hitory_trans_sales = $model_history_trans_sales->getHistoryTransPurchasesByFilter($datestart, $dateend);
            return response($hitory_trans_sales);
        } else {
            $hitory_trans_sales = $model_history_trans_sales->getHistoryTransPurchasesPagination();
            return response($hitory_trans_sales);
        }
    }
}
