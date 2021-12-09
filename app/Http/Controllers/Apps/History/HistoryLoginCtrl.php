<?php

namespace App\Http\Controllers\Apps\History;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\HistoryLogin;
use App\Model\User;
use Validator;
use DB;

class HistoryLoginCtrl extends Controller
{
    public function index(Request $request)
    {
        $model_history_login = new HistoryLogin();
        $datestart = $request->get('datestart');
        $dateend = $request->get('dateend');
        if ($datestart || $dateend) {
            $hitory_login = $model_history_login->getHistoryLoginByFilter($datestart, $dateend);
            return response($hitory_login);
        } else {
            $hitory_login = $model_history_login->getHistoryLoginPagination();
            return response($hitory_login);
        }
    }
}
