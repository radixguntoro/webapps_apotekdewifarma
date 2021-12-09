@extends('layouts.layout')

@section('content')
<div class="vs-page vs-registration-page">
    <div class="grid-container">
        <div class="grid-x grid-padding-x align-center">
            <div class="large-12 cell text-center">
                <h6>Pendaftaran telah berhasil!<br> Silahkan periksa pesan email anda untuk melakukan aktifasi akun anda.</h6>
            </div>
            <div class="large-12 cell">
                <div class="vs-box-mail">
                    <div class="grid-x">
                        <div class="small-6 cell text-right">
                            <img src="{{ asset('public/frontend/img/icon/gmail.png') }}" alt="">
                        </div>
                        <div class="small-6 cell align-self-middle text-left">
                            <img src="{{ asset('public/frontend/img/icon/yahoo.png') }}" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="large-12 cell text-center">
                <h5 class="font-bold">Terima Kasih</h5>
            </div>
        </div>
    </div>
</div>
@endsection
