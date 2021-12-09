<?php

namespace App\Libraries;

use Input;
use DB;

class AutoNumber
{

	public function generate($tableName, $primary)
	{
		$query = DB::table($tableName)->select(DB::raw('MAX(RIGHT('.$primary.', 3)) as kode_max'));
		$date = date("ymdHis");
		if ($query->count()>0) {
			foreach ($query->get() as $value) {
				$kode = $date;
			}
		} else {
			$kode = $date;
		}

		return $kode;
	}
}
