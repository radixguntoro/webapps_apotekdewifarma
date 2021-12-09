<?php

namespace App\Http\Controllers\Apps\Transaction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Libraries\AutoNumber;
use App\Model\TransactionSales;
use App\Model\ReturnTransSales;
use App\Model\ClosingCashier;
use DB;

class ClosingCashierCtrl extends Controller
{
    public function getCashier()
    {
        $get_trans_sales = TransactionSales::select(DB::raw('SUM(grand_total) as total_sales'))->where('date', date('Y-m-d'))->groupBy('date')->get()->first();
        $get_retur_sales = ReturnTransSales::select(DB::raw('SUM(subtotal) as total_retur'))->where('date', date('Y-m-d'))->groupBy('date')->get()->first();
        $total_retur = (isset($get_retur_sales->total_retur) ? $get_retur_sales->total_retur : 0);
        $total_sales = (isset($get_trans_sales->total_sales) ? $get_trans_sales->total_sales : 0);
        $total_trans_sales = $total_sales - $total_retur;
        $data_cashier = array(
            "cashier_id" => Auth::user()->id,
            "cashier_name" => Auth::user()->first_name." ".Auth::user()->last_name,
            "total_sales" => $total_trans_sales
        );

        return response($data_cashier);
    }

    public function insert(Request $request)
    {
        try{
            DB::beginTransaction();

            $model_closing_cashier = new ClosingCashier();
            $model_closing_cashier->code = $request->code;
            $model_closing_cashier->income_app = $request->income_app;
            $model_closing_cashier->income_real = $request->income_real;
            $model_closing_cashier->income_diff = $request->income_diff;
            $model_closing_cashier->date = date('Y-m-d', strtotime($request->date));
            // $model_closing_cashier->time = $request->time;
            $model_closing_cashier->shift = $request->shift;
            $model_closing_cashier->user_id = $request->user_id;
            $model_closing_cashier->save();

            DB::commit();

            return "Success";

        } catch(\Exception $e) {
            return "Error"." ".$e;
            DB::rollback();
        }
    }

    public function getIncomePerShift(Request $request)
    {
        $get_trans_sales = TransactionSales::select(DB::raw('SUM(grand_total) as total_sales'))->where('date', $request->date)->where('user_id', $request->user_id)->groupBy('date')->get()->first();
        $get_retur_sales = ReturnTransSales::select(DB::raw('SUM(subtotal) as total_retur'))->where('date', $request->date)->where('user_id', $request->user_id)->groupBy('date')->get()->first();

        // $get_trans_sales = TransactionSales::select(DB::raw('SUM(grand_total) as total_sales'))->where('date', $request->date)->whereBetween('time', [$request->shift_start, $request->shift_end])->groupBy('date')->get()->first();
        // $get_retur_sales = ReturnTransSales::select(DB::raw('SUM(subtotal) as total_retur'))->where('date', $request->date)->whereBetween('time', [$request->shift_start, $request->shift_end])->groupBy('date')->get()->first();

        // echo "Hasil".' '.$get_trans_sales;
        $total_retur = (isset($get_retur_sales->total_retur) ? $get_retur_sales->total_retur : 0);
        $total_sales = (isset($get_trans_sales->total_sales) ? $get_trans_sales->total_sales : 0);
        $total_trans_sales = $total_sales - $total_retur;
        return response()->json($total_trans_sales);
    }

    public function review($id)
    {
        $data_closing = ClosingCashier::join('users', 'users.id', '=', 'user_id')->where('code', $id)->get()->first();

        return response()->json($data_closing);
    }
}
