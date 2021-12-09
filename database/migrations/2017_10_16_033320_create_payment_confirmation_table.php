<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentConfirmationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_confirmation', function (Blueprint $table) {
            $table->increments('id');
            $table->string('order_invoice', 150);
            $table->string('account_name', 200);
            $table->string('bank_dest', 200);
            $table->string('bank_origin', 200);
            $table->string('transfer_method', 200);
            $table->integer('transfer_nominal');
            $table->string('transfer_date');
            $table->date('date');
            $table->timestamps();
            $table->unsignedInteger('user_id')->nullable();
            $table->unsignedInteger('sales_order_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade');
            $table->foreign('sales_order_id')->references('id')->on('sales_order')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_confirmation');
    }
}
