<?php

namespace App\Libraries;

use App\Model\Customer;
use App\Model\Item;
use App\Model\Service;
use Input;
use DB;

class SearchData {
 
   	public function getCustomer($term)
    {
        $data = Customer::where('customer_name','LIKE','%'.$term.'%')
                            ->orWhere('customer_vehicle_license_plate','LIKE','%'.$term.'%')
                            ->take(10)
                            ->get();
        $results = array();
        foreach ($data as $key => $value) {
            $results[]=[
                'id'=>$value->id, 
                'value'=>$value->customer_name,
                'customer_name'=>$value->customer_name, 
                'customer_vehicle_license_plate'=>$value->customer_vehicle_license_plate,
            ];
        }
        if(count($results))
             return $results;
        else
            return ['value'=>'Data tidak ditemukan'];
    }

    public function getItem($term)
    {
        $data = Item::where('item_name','LIKE','%'.$term.'%')
                    ->where('item_status','=','Masih Dijual')
                    ->orWhere('item_code','LIKE','%'.$term.'%')
                    ->take(10)
                    ->get();
        $results = array();
        foreach ($data as $key => $value) {
            $results[]=[
                'id'=>$value->id, 
                'value'=>$value->item_name, 
                'item_code'=>$value->item_code, 
                'item_name'=>$value->item_name, 
                'item_cog_sold'=>$value->item_cog_sold,
                'item_cog_purchase'=>$value->item_cog_purchase,
                'item_qty'=>$value->item_qty,
            ];
        }
        if(count($results))
             return $results;
        else
            return ['value'=>'Data tidak ditemukan'];
    }

    public function getService($term)
    {
        $data = Service::where('service_name','LIKE','%'.$term.'%')
                        ->orWhere('service_code','LIKE','%'.$term.'%')
                        ->take(10)
                        ->get();
        $results = array();
        foreach ($data as $key => $value) {
            $results[]=[
                'id'=>$value->id, 
                'value'=>$value->service_name, 
                'service_code'=>$value->service_code, 
                'service_name'=>$value->service_name, 
                'service_price'=>$value->service_price,
            ];
        }
        if(count($results))
             return $results;
        else
            return ['value'=>'Data tidak ditemukan'];
    }
 
}
