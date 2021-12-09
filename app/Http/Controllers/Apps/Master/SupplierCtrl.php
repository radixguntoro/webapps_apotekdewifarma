<?php

namespace App\Http\Controllers\Apps\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Libraries\AutoNumber;
use App\Model\Supplier;
use Validator;
use Response;
use Input;
use DB;

class SupplierCtrl extends Controller
{
    public function index(Request $request)
    {
        $model_user = new Supplier();

        if ($request->get('search')) {
            $users = $model_user->getSupplierBySearch($request->get('search'));
        } else {
            $users = $model_user->getSupplierPagination();
        }
        return response($users);
    }

    public function insert(Request $request)
    {
        $tableName = "suppliers";
        $primary = "code";
        $autoNumber = new AutoNumber();
        $getCode = $autoNumber->generate($tableName, $primary);

        $model_user = new Supplier();
        $model_user->code = "SP".$getCode;
        $model_user->name = $request->name;
        $model_user->address = $request->address;
        $model_user->province = $request->province;
        $model_user->city = $request->city;
        $model_user->zip_code = $request->zip_code;
        $model_user->phone_1 = $request->phone_1;
        $model_user->phone_2 = $request->phone_2;
        $model_user->phone_3 = $request->phone_3;
        $model_user->email = $request->email;
        $model_user->active = $request->status;
        $model_user->user_id = Auth::id();
        $model_user->save();
        return response()->json($model_user);
    }

    public function edit($id)
    {
        $model_user = Supplier::find($id);

        return response()->json($model_user);
    }

    public function update(Request $request)
    {
        $model_user = Supplier::find($request->id);
        $model_user->name = $request->name;
        $model_user->address = $request->address;
        $model_user->province = $request->province;
        $model_user->city = $request->city;
        $model_user->zip_code = $request->zip_code;
        $model_user->phone_1 = $request->phone_1;
        $model_user->phone_2 = $request->phone_2;
        $model_user->phone_3 = $request->phone_3;
        $model_user->email = $request->email;
        $model_user->active = $request->status;
        $model_user->user_id = Auth::id();
        $model_user->save();
        return response()->json($model_user);
    }

    public function getSupplierDetail($id)
    {
        $data_supplier = Supplier::find($id);

        $supplier = array(
            "data_supplier" => $data_supplier
        );

        return response()->json($supplier);
    }

    public function searchSupplierPurchases(Request $request)
    {
        $model_supplier = new Supplier();
        $supplier = $model_supplier->searchSupplierPurchases($request->get('search'));
        return response($supplier);
    }

    public function recordItem($id)
    {
        $data_supplier = DB::table('transaction_purchases')
            ->select(
                'items.name as item_name'
                , 'suppliers.name as supplier_name'
            )
            ->join('transaction_purchases_detail', 'transaction_purchases_detail.transaction_purchases_id', '=', 'transaction_purchases.id')
            ->join('suppliers', 'suppliers.id', '=', 'transaction_purchases.supplier_id')
            ->join('items', 'items.id', '=', 'transaction_purchases_detail.item_id')
            ->where('transaction_purchases.supplier_id', $id)
            ->orderBy('items.name', 'asc')
            ->distinct()
            ->get();

        return response()->json($data_supplier);
    }
}
