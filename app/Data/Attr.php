<?php 
    namespace App\Data;
    use App\Model\Wishlist;
    
    class Attr 
    {
        public function wishlist($id)
        {
            $data = Wishlist::where('user_id', $id)->get();
            return $data;
        }
    }