<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 25)->nullable();
            $table->string('first_name', 150);
            $table->string('last_name', 150)->nullable();
            $table->date('birthdate')->nullable();
            $table->string('address', 300)->nullable();
            $table->string('province', 150)->nullable();
            $table->string('city', 150)->nullable();
            $table->string('subdistrict', 150)->nullable();
            $table->string('zip_code', 50)->nullable();
            $table->string('gender', 50)->nullable();
            $table->string('phone', 100)->nullable();
            $table->string('email');
            $table->string('permission', 100);
            $table->boolean('active')->default(0);
            $table->string('password');
            $table->string('activation_code')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        DB::table('users')->insert(
            array(
                array(
                    'code' => '001015001100',
                    'first_name' => 'Admin',
                    'last_name' => 'Manage',
                    'birthdate' => '2014-08-17',
                    'address' => 'Jl. XYZ No. 99',
                    'province' => 'Jawa Timur',
                    'city' => 'Surabaya',
                    'subdistrict' => 'Sawahan',
                    'zip_code' => '60255',
                    'gender' => 'male',
                    'phone' => '081333396400',
                    'email' => 'admin@gmail.com',
                    'permission' => 'superadmin',
                    'active' => 1,
                    'password' => bcrypt('superadmin'),
                    'activation_code' => '-',
                    'remember_token' => '-',
                    'created_at' => '2017-10-15 10:12:00',
                    'updated_at' => '2017-10-15 10:12:00',
                ),
                array(
                    'code' => '001017001100',
                    'first_name' => 'Admin',
                    'last_name' => 'Pegawai',
                    'birthdate' => '2014-08-17',
                    'address' => '-',
                    'province' => '-',
                    'city' => '-',
                    'subdistrict' => '-',
                    'zip_code' => '-',
                    'gender' => 'female',
                    'phone' => '-',
                    'email' => 'admin.alexasport@gmail.com',
                    'permission' => 'admin',
                    'active' => 1,
                    'password' => bcrypt('alexaadmin'),
                    'activation_code' => '-',
                    'remember_token' => '-',
                    'created_at' => '2017-10-15 10:12:00',
                    'updated_at' => '2017-10-15 10:12:00',
                ),
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
        Schema::dropIfExists('users');
    }
}
