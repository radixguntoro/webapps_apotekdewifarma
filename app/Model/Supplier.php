<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use DB;

class Supplier extends Model
{
    protected $table = "suppliers";

    public function getSupplierBySearch($typing)
    {
        $data_user = DB::table('suppliers')
            ->select(
                'suppliers.id as id'
                , 'suppliers.code as code'
                , 'suppliers.name as name'
                , 'suppliers.email as email'
                , 'suppliers.address as address'
                , 'suppliers.active as active'
                , 'suppliers.phone_1 as phone_1'
                , 'suppliers.phone_2 as phone_2'
                , 'suppliers.phone_3 as phone_3'
                , 'suppliers.city as city'
                , 'suppliers.zip_code as zip_code'
                , 'suppliers.active as status'
            )
            ->where("suppliers.name", "LIKE", "%{$typing}%")
            ->orWhere("suppliers.code", "LIKE", "%{$typing}%")
            ->orWhere("suppliers.email", "LIKE", "%{$typing}%")
            ->orWhere("suppliers.address", "LIKE", "%{$typing}%")
            ->orderBy('suppliers.id', 'desc')
            ->paginate(25);

        return $data_user;
    }

    public function getSupplierPagination()
    {
        $data_user = DB::table('suppliers')
            ->select(
                'suppliers.id as id'
                , 'suppliers.code as code'
                , 'suppliers.name as name'
                , 'suppliers.email as email'
                , 'suppliers.address as address'
                , 'suppliers.active as active'
                , 'suppliers.phone_1 as phone_1'
                , 'suppliers.phone_2 as phone_2'
                , 'suppliers.phone_3 as phone_3'
                , 'suppliers.city as city'
                , 'suppliers.zip_code as zip_code'
                , 'suppliers.active as status'
            )
            ->orderBy('suppliers.id', 'desc')
            ->paginate(25);

        return $data_user;
    }

    public function getSupplierById($id)
    {
        $data = DB::table('suppliers')
            ->select(
                'suppliers.id as id'
                , 'suppliers.code as code'
                , 'suppliers.name as name'
                , 'suppliers.email as email'
                , 'suppliers.address as address'
                , 'suppliers.active as active'
                , 'suppliers.phone_1 as phone_1'
                , 'suppliers.phone_2 as phone_2'
                , 'suppliers.phone_3 as phone_3'
                , 'suppliers.city as city'
                , 'suppliers.zip_code as zip_code'
                , 'suppliers.active as status'
            )
            ->where('suppliers.id', $id)
            ->orderBy('suppliers.id', 'desc')
            ->get();

        return $data;
    }

    public function searchSupplierPurchases($typing)
    {
        $data = DB::table('suppliers')
        ->select(
            'suppliers.id as id'
            , 'suppliers.code as code'
            , 'suppliers.name as name'
            , 'suppliers.email as email'
            , 'suppliers.address as address'
            , 'suppliers.active as active'
            , 'suppliers.phone_1 as phone_1'
            , 'suppliers.phone_2 as phone_2'
            , 'suppliers.phone_3 as phone_3'
            , 'suppliers.city as city'
            , 'suppliers.zip_code as zip_code'
            , 'suppliers.active as status'
        )
        ->where("suppliers.name", "LIKE", "%{$typing}%")
        ->orWhere("suppliers.code", "LIKE", "%{$typing}%")
        ->orWhere("suppliers.email", "LIKE", "%{$typing}%")
        ->orWhere("suppliers.address", "LIKE", "%{$typing}%")
        ->orderBy('suppliers.id', 'desc')
        ->paginate(10);

        return $data;
    }
}
