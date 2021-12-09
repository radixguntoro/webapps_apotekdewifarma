<?php

namespace Illuminate\Foundation\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use App\Model\Category;
use App\Model\Contact;

trait RegistersUsers
{
    use RedirectsUsers;

    /**
     * Show the application registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showRegistrationForm()
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

        return view('auth.register', compact(
            'category_id'
            ,'facebook'
			,'instagram'
			,'phone'
			,'whatsapp'
            ,'data_category'
        ));
    }

    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        event(new Registered($user = $this->create($request->all())));

        // $this->guard()->login($user); // auto login function

        return $this->registered($request, $user)
                        ?: redirect($this->redirectPath());
    }

    /**
     * Get the guard to be used during registration.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard();
    }

    /**
     * The user has been registered.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function registered(Request $request, $user)
    {
        //
    }
}
