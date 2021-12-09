<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Model\Product;
use App\Model\ImageDetail;
use App\Model\ProductDetail;
use App\Model\Category;
use App\Model\Contact;

class BaseCtrl extends Controller
{
    public function index()
    {
        if (Auth::user()->permission == 'superadmin' || Auth::user()->permission == 'admin') {
            return view('layouts.admin-layout');
        } else {
            return redirect('/');
        }
    }
}
