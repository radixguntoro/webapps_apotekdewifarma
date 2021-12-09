<?php
    namespace App\Data;
    use Illuminate\Support\Facades\Facade;

    class AttrFacade extends Facade
    {
        protected static function getFacadeAccessor()
        {
            return 'attr';
        }
    }