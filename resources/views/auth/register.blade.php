@extends('layouts.layout')

@section('content')
<div class="vs-page vs-registration-page">
    <div class="grid-container">
        <div class="grid-x grid-padding-x align-center">
            <div class="large-12 cell">
                <div class="grid-x grid-padding-x align-center">
                    <div class="large-6 cell vs-outline-smoke show-for-large">
                        <img src="{{ asset('public/frontend/img/background/register.png') }}" class="vs-bg-regis">
                    </div>
                    <div class="medium-10 large-6 cell vs-bg-smoke">
                        <div class="vs-box-registration">
                            <form class="form-horizontal" id="register-form" role="form" method="POST" action="{{ route('register') }}">
                                {{ csrf_field() }}
                                <div class="grid-x grid-padding-x">
                                    <div class="medium-12 cell text-center">
                                        <div class="vs-section-title">
                                            <h3 class="vs-title">Akun Baru</h3>
                                            <div><img src="{{ asset('public/frontend/img/icon/icon-title.png') }}"></div>
                                        </div>
                                    </div>
                                    <div class="medium-6 cell">
                                        <label for="name">Nama Depan*
                                            <input id="name" type="text" name="name">
                                        </label>
                                        <p class="help-text text-red hidden" id="first-help-text">Nama depan tidak boleh kosong.</p>
                                    </div>
                                    <div class="medium-6 cell">
                                        <label for="last_name">Nama Belakang*
                                            <input id="last_name" type="text" name="last_name">
                                        </label>
                                        <p class="help-text text-red hidden" id="last-help-text">Nama belakang tidak boleh kosong.</p>
                                    </div>
                                    <div class="large-12 cell">
                                        <label for="email">Email*
                                            <input id="email" type="email" name="email">
                                        </label>
                                        <p class="help-text text-red hidden" id="email-help-text">Email tidak boleh kosong.</p>
                                        @if ($errors->has('email'))
                                            <p class="help-text text-red" id="shippcost-help-text">Email sudah terdaftar!</p>
                                        @endif
                                    </div>
                                    <div class="large-12 cell">
                                        <label for="password">Password*
                                            <input id="password" type="password" name="password">
                                        </label>
                                        <p class="help-text text-red hidden" id="password-help-text">Password tidak boleh kosong.</p>
                                    </div>
                                    <div class="large-12 cell">
                                        <label for="password-confirm">Konfirmasi Password*
                                            <input id="password-confirm" type="password" name="password_confirmation">
                                        </label>
                                        <p class="help-text text-red hidden" id="conf-password-help-text">Konfirmasi password tidak boleh kosong.</p>
                                    </div>
                                    <div class="large-12 cell">
                                        <label for="phone">Phone
                                            <input id="phone" type="text" name="phone">
                                        </label>
                                    </div>
                                    <div class="large-12 cell">
                                        <div class="grid-x">
                                            <div class="medium-6 cell">
                                                <label for="gender">Jenis Kelamin</label>
                                                <div class="grid-x">
                                                    <div class="small-6 large-6 cell align-self-middle">
                                                        <label class="radio vs-gender">
                                                        <input id="gender" type="radio" name="gender" value="male" ng-model="gender" hidden checked>
                                                        <span class="outer"><span class="inner"></span></span>Pria</label>
                                                    </div>
                                                    <div class="small-6 large-6 cell">
                                                        <label class="radio vs-gender">
                                                        <input id="gender" type="radio" name="gender" value="female" ng-model="gender" hidden>
                                                        <span class="outer"><span class="inner"></span></span>Wanita</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="medium-6 cell">
                                                <label for="dob">Tanggal Lahir</label>
                                                <div id="birthday-picker" class='birthday-picker'></div>
                                            </div>
                                            <div class="large-6 cell"></div>
                                            <div class="large-6 cell">
                                                <br>
                                                <a href="javascript:;" onclick="registerSave(this, event,
                                                    $('#name').val(),
                                                    $('#last_name').val(),
                                                    $('#email').val(),
                                                    $('#password').val(),
                                                    $('#password-confirm').val()
                                                )" class="button vs-btn-black expanded text-uppercase">Daftar</a>
                                                <button type="submit" id="btn-save" hidden>daftar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="reveal tiny text-center z-depth-1" id="modal-process" data-reveal data-close-on-click="false">
  <p class="lead">Proses Menyimpan</p>
  <i class="mdi mdi-loading mdi-spin"></i>
</div>
<script type="text/javascript">
    function registerSave(elm, event, first_name, last_name, email, password, password_confirm) {
        if(first_name == "") {
            $('#first-help-text').removeClass('hidden');
            $(elm).attr("disabled", false);
            return true;
        } else if (last_name == "") {
            $('#last-help-text').removeClass('hidden');
            $(elm).attr("disabled", false);
            return true;
        } else if (email == "") {
            $('#email-help-text').removeClass('hidden');
            $(elm).attr("disabled", false);
            return true;
        } else if (password == "") {
            $('#password-help-text').removeClass('hidden');
            $(elm).attr("disabled", false);
            return true;
        } else if (password_confirm == "") {
            $('#conf-password-help-text').removeClass('hidden');
            $(elm).attr("disabled", false);
            return true;
        } else {
            // $(elm).attr("disabled", false);
            $(elm).attr("disabled", false);
            $('#modal-process').foundation('open');
            $('#register-form').submit();
        }

    }
</script>
@endsection
