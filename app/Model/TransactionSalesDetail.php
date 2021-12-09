<?php

namespace App\Model;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;

class TransactionSalesDetail extends Model
{
    protected $table = 'transaction_sales_detail';
    public $timestamps = false;
}
