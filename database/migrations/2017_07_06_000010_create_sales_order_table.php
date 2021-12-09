<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalesOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales_order', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 25);
            // $table->string('recipient', 150);
            $table->string('courier', 150);
            $table->string('shipping_type', 100);
            $table->string('shipping_eta', 25);
            $table->string('dest_province', 150);
            $table->string('dest_city', 150);
            $table->string('dest_subdistrict', 150)->nullable();
            $table->string('dest_address', 300);
            $table->string('dest_zip_code', 50)->nullable();
            $table->integer('total_weight');
            $table->bigInteger('shipping_cost');
            $table->bigInteger('total_price');
            $table->bigInteger('grand_total');
            $table->string('status', 100);
            $table->date('date');
            $table->timestamps();
            $table->unsignedInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales_order');
    }
}
