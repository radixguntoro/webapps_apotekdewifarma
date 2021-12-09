<?php

namespace App\Http\Controllers\Apps\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\Category;
use Validator;
use Response;
use Input;
use DB;

class CategoryCtrl extends Controller
{
    public function index(Request $request)
    {
        $model_category = new Category();

        if ($request->get('search')) {
            $categories = $model_category->getCategoryBySearch($request->get('search'));
        } else {
            $categories = $model_category->getCategoryPagination();
        }
        return response($categories);
    }

    public function insert(Request $request)
    {
        $model_category = new Category();
        $model_category->name = $request->name;
        $model_category->save();
        return response()->json($model_category);
    }

    public function edit($id)
    {
        $model_category = Category::find($id);

        return response()->json($model_category);
    }

    public function update(Request $request)
    {
        $model_category = Category::find($request->id);
        $model_category->name = $request->name;
        $model_category->save();
        return response()->json($model_category);
    }

    public function getAll()
    {
        $model_category = new Category();
        $data_category = Category::all();

        return response()->json($data_category);
    }
}
