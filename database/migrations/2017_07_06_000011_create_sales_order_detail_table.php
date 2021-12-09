<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalesOrderDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales_order_detail', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('price');
            $table->integer('qty');
            $table->decimal('discount');
            $table->bigInteger('subtotal');
            $table->string('product_type', 25);
            $table->string('product_size')->nullable();
            $table->unsignedInteger('sales_order_id')->nullable();
            $table->unsignedInteger('product_id')->nullable();
            $table->unsignedInteger('image_detail_id')->nullable();
            $table->foreign('sales_order_id')->references('id')->on('sales_order')->onUpdate('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales_order_detail');
    }
}
