<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 25)->nullable();
            $table->string('name', 150);
            $table->string('slug');
            $table->text('excerpt', 150)->nullable();
            $table->text('description', 150)->nullable();
            $table->string('image_cover', 200)->nullable();
            $table->bigInteger('selling_price');
            $table->decimal('discount_selling_in_percent')->nullable();
            $table->bigInteger('discount_selling_price')->nullable();
            $table->string('status', 50)->nullable();
            $table->string('color_name', 300)->nullable();
            $table->unsignedInteger('color_relation')->unsigned()->nullable();
            $table->timestamps();
            $table->unsignedInteger('category_id')->unsigned()->nullable();
            $table->foreign('category_id')->references('id')->on('categories')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
