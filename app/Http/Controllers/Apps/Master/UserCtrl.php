<?php

namespace App\Http\Controllers\Apps\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Libraries\AutoNumber;
use App\Model\User;
use Validator;
use Response;
use Input;
use DB;

class UserCtrl extends Controller
{
    public function index(Request $request)
    {
        $model_user = new User();

        if ($request->get('search')) {
            $users = $model_user->getUserBySearch($request->get('search'));
        } else {
            $users = $model_user->getUserPagination();
        }
        return response($users);
    }

    public function insert(Request $request)
    {
        $tableName = "transaction_sales";
        $primary = "code";
        $autoNumber = new AutoNumber();
        $getCode = $autoNumber->generate($tableName, $primary);

        $model_user = new User();
        $model_user->nik = $getCode;
        $model_user->first_name = $request->first_name;
        $model_user->last_name = $request->last_name;
        $model_user->ktp = $request->ktp;
        $model_user->birthdate = date("Y-m-d", strtotime($request->birthdate));
        $model_user->address = $request->address;
        $model_user->province = $request->province;
        $model_user->city = $request->city;
        $model_user->zip_code = $request->zip_code;
        $model_user->phone = $request->phone;
        $model_user->email = $request->email;
        $model_user->permission = $request->permission;
        $model_user->password = bcrypt($request->password);
        $model_user->gender = $request->gender;
        $model_user->active = $request->status;
        $model_user->save();
        return response()->json($model_user);
    }

    public function edit($id)
    {
        $model_user = User::where('id', $id)->get();
        $data_user = [];
        foreach ($model_user as $key => $value) {
            $data_user = array (
                "first_name" => $value->first_name,
                "last_name" => $value->last_name,
                "ktp" => $value->ktp,
                "birthdate" => date("d-m-Y", strtotime($value->birthdate)),
                "address" => $value->address,
                "province" => $value->province,
                "city" => $value->city,
                "zip_code" => $value->zip_code,
                "phone" => $value->phone,
                "email" => $value->email,
                "permission" => $value->permission,
                "gender" => $value->gender,
                "active" => $value->active
            );
        }

        return response()->json($data_user);
    }

    public function update(Request $request)
    {
        $model_user = User::find($request->id);
        $model_user->first_name = $request->first_name;
        $model_user->last_name = $request->last_name;
        $model_user->ktp = $request->ktp;
        $model_user->birthdate = date("Y-m-d", strtotime($request->birthdate));
        $model_user->address = $request->address;
        $model_user->province = $request->province;
        $model_user->city = $request->city;
        $model_user->zip_code = $request->zip_code;
        $model_user->phone = $request->phone;
        $model_user->email = $request->email;
        $model_user->permission = $request->permission;
        if (!empty($request->password)) {
            $model_user->password = bcrypt($request->password);
        }
        $model_user->gender = $request->gender;
        $model_user->active = $request->status;
        $model_user->save();
        return response()->json($model_user);
    }

    public function getUserDetail($id)
    {
        $data_user = User::find($id);

        $user = array(
            "data_user" => $data_user
        );

        return response()->json($user);
    }

    public function getAll()
    {
        $model_user = new User();
        $data_user = User::whereNotIn("users.permission", [0])->get();

        return response()->json($data_user);
    }
}
