<?php

namespace App\Http\Controllers\Auth;

use Mail;
use App\User;
use App\Mail\UserActivation;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Libraries\AutoNumber;
use App\Model\Category;
use App\Model\Contact;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        $tableName = "users";
        $primary = "code";
        $autoNumber = new AutoNumber();
        $getCode = $autoNumber->generate($tableName, $primary);

        $users = User::where('email', $data['email'])->get();

        if(sizeof($users) > 0) {
            return back();
        }

        return User::create([
            'code' => $getCode,
            'first_name' => $data['name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'gender' => $data['gender'],
            'phone' => $data['phone'],
            'birthdate' => $data['birthdate'],
            'permission' => 'member',
            'activation_code' => str_random(64),
        ]);
    }

    protected function registered($request, $user)
    {
        // Mengambil data kontak
		$contact = Contact::all();
		$facebook = $contact[0]->facebook;
		$instagram = $contact[0]->instagram;
		$whatsapp = $contact[0]->whatsapp;
		$phone = $contact[0]->phone;

		// Mengambil data kategori
        $model_category = new Category();
        $data_category = $model_category->getCategoryAll();
        $category_id = $data_category[0]->id;
        Mail::to($user)->send(new UserActivation($user));

        return view('auth.registerSuccess', compact(
            'category_id'
            ,'facebook'
			,'instagram'
			,'phone'
			,'whatsapp'
            ,'data_category'
        ));
    }

    public function userActivation($token) {
        // Mengambil data kontak
		$contact = Contact::all();
		$facebook = $contact[0]->facebook;
		$instagram = $contact[0]->instagram;
		$whatsapp = $contact[0]->whatsapp;
		$phone = $contact[0]->phone;

		// Mengambil data kategori
        $model_category = new Category();
        $data_category = $model_category->getCategoryAll();
        $category_id = $data_category[0]->id;

        $user = User::where('activation_code', $token)->first();

        if ($user) {
            $user->active = 1;
            $user->save();

            return view('emails.activationSuccess', compact(
                'category_id'
                ,'facebook'
                ,'instagram'
                ,'phone'
                ,'whatsapp'
                ,'data_category'
            ));
        }

        return view('emails.activationFailed', compact(
            'category_id'
            ,'facebook'
            ,'instagram'
            ,'phone'
            ,'whatsapp'
            ,'data_category'
        ));
    }
}
