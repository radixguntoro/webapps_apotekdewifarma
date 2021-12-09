<?php

namespace App\Http\Controllers\Apps\Report;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\ReportIncomeShift;
use App\Model\User;
use Validator;
use DB;

class ReportIncomeShiftCtrl extends Controller
{
    public function filter(Request $request)
    {
        $datestart = $request->get('datestart');
        if ($datestart || $dateend) {
            $shift_morning = ReportIncomeShift::join('users', 'users.id', '=', 'user_id')->where('date', $datestart)->where('shift', 'pagi')->get();
            $shift_evening = ReportIncomeShift::join('users', 'users.id', '=', 'user_id')->where('date', $datestart)->where('shift', 'sore')->get();
            $shift_night = ReportIncomeShift::join('users', 'users.id', '=', 'user_id')->where('date', $datestart)->where('shift', 'malam')->get();
            // cetak_r($shift_morning);
            $report_income_shift = array(
                "shift_morning" => $shift_morning,
                "shift_evening" => $shift_evening,
                "shift_night" => $shift_night,
            );

            return response($report_income_shift);
        }
    }
}
