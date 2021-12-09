<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('location_name', 150)->nullable();
            $table->string('lattitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('phone', 100)->nullable();
            $table->string('whatsapp', 100)->nullable();
            $table->string('blackberry', 100)->nullable();
            // $table->string('line', 100)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('facebook', 100)->nullable();
            $table->string('instagram', 100)->nullable();
            // $table->string('twitter', 100)->nullable();
            // $table->string('youtube', 100)->nullable();
            // $table->string('googleplus', 100)->nullable();
        });

        DB::table('contacts')->insert(
            array(
                array (
                    'location_name' => 'Alexa Sport',
                    'lattitude' => '-7.263800',
                    'longitude' => '112.795608',
                    'address' => 'Jl. Mulyosari No. 156',
                    'city' => 'Surabaya',
                    'phone' => '031-5934364',
                    'whatsapp' => '081-230-160-160',
                    'blackberry' => 'D7F8AF75',
                    'email' => 'alexasportindo@gmail.com',
                    'facebook' => 'https://www.facebook.com/alexa.malang.14',
                    'instagram' => 'https://www.instagram.com/yusnitapaula/'
                ),
                array (
                    'location_name' => 'Alexa Sport',
                    'lattitude' => '-7.952743',
                    'longitude' => '112.638527',
                    'address' => 'Jl. Kedawung Blok 4A',
                    'city' => 'Malang',
                    'phone' => '0341-474918',
                    'whatsapp' => '081-382-77-5676',
                    'blackberry' => 'D47EB90E',
                    'email' => 'alexasportindo@gmail.com',
                    'facebook' => 'https://www.facebook.com/alexa.malang.14',
                    'instagram' => 'https://www.instagram.com/yusnitapaula/'
                )
            )
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
