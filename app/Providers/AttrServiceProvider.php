<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Data\Attr;
use App;

class AttrServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('attr',function(){
            return new Attr;
        });
    }
}
