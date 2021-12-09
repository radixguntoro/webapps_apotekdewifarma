<?php

namespace App\Libraries;

use Input;
use DB;

class RajaOngkir
{

	public function getProvinceAll()
	{
		$curl = curl_init();

        curl_setopt_array($curl, array(
          	CURLOPT_URL => "https://pro.rajaongkir.com/api/province",
          	CURLOPT_RETURNTRANSFER => true,
          	CURLOPT_ENCODING => "",
          	CURLOPT_MAXREDIRS => 10,
          	CURLOPT_TIMEOUT => 30,
          	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          	CURLOPT_CUSTOMREQUEST => "GET",
          	CURLOPT_FOLLOWLOCATION => true,
          	CURLOPT_SSL_VERIFYPEER => false,
          	CURLOPT_HTTPHEADER => array(
            	"content-type: application/x-www-form-urlencoded",
              // "key: 47b10e583de1b92d8134228fe6eed6dd" 
            	"key: 47b10e583de1b92d8134228fe6eed6dd"
            ),
        ));

        $result = curl_exec($curl);
        $err = curl_error($curl);

        $response = array(
        	"result" => $result,
        	"err" => $err,
        );

        curl_close($curl);

		return $response;
	}

	public function getCityByProvince($province_id)
    {
        $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "http://pro.rajaongkir.com/api/city?province=$province_id",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "GET",
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_HTTPHEADER => array(
                  "content-type: application/x-www-form-urlencoded",
                  "key: 47b10e583de1b92d8134228fe6eed6dd"
                ),
            ));

            $result = curl_exec($curl);
            $err = curl_error($curl);

            $response = array(
              "result" => $result,
              "err" => $err,
            );

            curl_close($curl);

        return $response;
    }

    public function getSubdistrictByCity($city_id)
	{
		$curl = curl_init();

        curl_setopt_array($curl, array(
          	CURLOPT_URL => "http://pro.rajaongkir.com/api/subdistrict?city=$city_id",
          	CURLOPT_RETURNTRANSFER => true,
          	CURLOPT_ENCODING => "",
          	CURLOPT_MAXREDIRS => 10,
          	CURLOPT_TIMEOUT => 30,
          	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          	CURLOPT_CUSTOMREQUEST => "GET",
          	CURLOPT_FOLLOWLOCATION => true,
          	CURLOPT_SSL_VERIFYPEER => false,
          	CURLOPT_HTTPHEADER => array(
            	"content-type: application/x-www-form-urlencoded",
            	"key: 47b10e583de1b92d8134228fe6eed6dd"
            ),
        ));

        $result = curl_exec($curl);
        $err = curl_error($curl);

        $response = array(
        	"result" => $result,
        	"err" => $err,
        );

        curl_close($curl);

		return $response;
	}

	public function getCost($origin, $destination, $weight, $courier)
	{
		$curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "http://pro.rajaongkir.com/api/cost",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => "origin=$origin&originType=city&destination=$destination&destinationType=subdistrict&weight=$weight&courier=$courier",
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_HTTPHEADER => array(
                "content-type: application/x-www-form-urlencoded",
                "key: 47b10e583de1b92d8134228fe6eed6dd"
          	),
        ));

        $result = curl_exec($curl);
        $err = curl_error($curl);

        $response = array(
        	"result" => $result,
        	"err" => $err,
        );

        curl_close($curl);

		return $response;
	}
}
