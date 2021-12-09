<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use DB;

class User extends Model
{
    protected $table = "users";

    public function getUserBySearch($typing)
    {
        $data_user = DB::table('users')
            ->select(
                'users.id as id'
                , 'users.nik as nik'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.email as email'
                , 'users.gender as gender'
                , 'users.address as address'
                , 'users.active as active'
                , 'users.phone as phone'
                , 'users.city as city'
                , 'users.zip_code as zip_code'
                , 'users.ktp as ktp'
                , 'users.permission as permission'
                , 'users.active as status'
            )
            ->where("users.first_name", "LIKE", "%{$typing}%")
            ->orWhere("users.last_name", "LIKE", "%{$typing}%")
            ->orWhere("users.nik", "LIKE", "%{$typing}%")
            ->orWhere("users.ktp", "LIKE", "%{$typing}%")
            ->orWhere("users.email", "LIKE", "%{$typing}%")
            ->orWhere("users.address", "LIKE", "%{$typing}%")
            ->whereNotIn('users.permission', [0])
            ->orderBy('users.id', 'desc')
            ->paginate(25);

        return $data_user;
    }

    public function getUserPagination()
    {
        $data_user = DB::table('users')
            ->select(
                'users.id as id'
                , 'users.nik as nik'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.email as email'
                , 'users.gender as gender'
                , 'users.address as address'
                , 'users.active as active'
                , 'users.phone as phone'
                , 'users.city as city'
                , 'users.zip_code as zip_code'
                , 'users.ktp as ktp'
                , 'users.permission as permission'
                , 'users.active as status'
            )
            ->whereNotIn('users.permission', [0])
            ->orderBy('users.id', 'desc')
            ->paginate(25);

        return $data_user;
    }

    public function getUserById($id)
    {
        $data_user = DB::table('users')
            ->select(
                'users.id as id'
                , 'users.nik as nik'
                , 'users.first_name as first_name'
                , 'users.last_name as last_name'
                , 'users.email as email'
                , 'users.gender as gender'
                , 'users.address as address'
                , 'users.active as active'
                , 'users.phone as phone'
                , 'users.city as city'
                , 'users.zip_code as zip_code'
                , 'users.ktp as ktp'
                , 'users.permission as permission'
                , 'users.active as status'
            )
            ->where('users.id', $id)
            ->orderBy('users.id', 'desc')
            ->get();

        return $data_user;
    }
}
