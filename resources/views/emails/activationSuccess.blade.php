@extends('layouts.layout')

@section('content')
<div class="vs-page vs-registration-page">
    <div class="grid-container">
        <div class="grid-x grid-padding-x align-center">
            <div class="large-12 cell text-center">
                <h5 class="font-bold">Akun anda telah aktif!</h5>
                <h6>Silahkan melakukan <a href="{{ route('login') }}" style="color: #ed2b33; font-weight: bold;">Login</a> untuk melanjutkan pembelanjaan</h6>
            </div>
            <div class="large-12 cell text-center">
                <br>
                <h5 class="font-bold">Selamat Berbelanja</h5>
            </div>
            <div class="medium-10 large-8 cell">
                <br><br>
                <div class="callout secondary">
                  <h6 class="text-center">Silahkan hubungi <span class="font-italic">Customer Service</span> kami apabila masih tidak bisa <span class="font-italic">login</span>, Terima Kasih</h6>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
