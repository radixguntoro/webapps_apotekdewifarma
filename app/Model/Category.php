<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class Category extends Model
{
    protected $table = 'categories';
    protected $fillable = [
        'name','parent_id'
   	];

    public function getCategoryBySearch($typing)
    {
        $data = DB::table('categories')
            ->select(
                'categories.id as id'
                , 'categories.name as name'
            )
            ->where("name", "LIKE", "%{$typing}%")
            ->orderBy('categories.id', 'desc')
            ->paginate(25);

        return $data;
    }

    public function getCategoryPagination()
    {
        $data = DB::table('categories')
            ->select(
                'categories.id as id'
                , 'categories.name as name'
            )
            ->orderBy('categories.id', 'desc')
            ->paginate(25);

        return $data;
    }
}
