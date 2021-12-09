<?php

// namespace App\Http\Controllers\Apps\Print;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Model\SalesOrder;
use App\Model\SalesOrderDetail;
use App\Model\ProductDetail;
use App\Model\Product;
use App\Model\HistoryUser;
use App\Model\PaymentConfirmation;
use App\User;
use PDF;
use DB;


class PrintCtrl extends Controller
{
    public function printOrder($id)
    {
        $model_sales_order = new SalesOrder();
        $data_sales_order = SalesOrder::find($id);
        $data_sales_order_detail = DB::table('sales_order_detail')->where('sales_order_id', $data_sales_order->id)->get();
        // cetak_r($data_sales_order_detail);die;
        $data_product = Product::all();
        $data_customer = User::find($data_sales_order->user_id);
        $pdf = PDF::loadView('templates.backend.print.printOrder', compact(
            'data_sales_order'
            , 'data_sales_order_detail'
            , 'data_product'
            , 'data_customer'
        ));
        return $pdf->stream();
    }
}
