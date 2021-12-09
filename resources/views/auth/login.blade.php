@extends('layouts.layout')

@section('content')
<div class="vs-page vs-login-page z-depth-1">
    <div class="grid-container">
        <div class="grid-x grid-padding-x align-center">
            <div class="medium-12 cell">
                <div class="grid-x grid-padding-x align-center">
                    <div class="medium-12 cell padding-0">
                        <div class="grid-x align-center">
                            <div class="large-12 cell">
                                <div class="vs-box-login-form">
                                    <div class="vs-login-header text-center vs-bg-primary padding-1">
                                        <img src="{{ asset('apps/img/logo/logo.png') }}" width="100">
                                    </div>
                                    <div class="vs-login-body padding-2 padding-top-2">
                                        <form class="form-horizontal" role="form" method="POST" action="{{ route('login') }}">
                                            {{ csrf_field() }}
                                            <div class="grid-x grid-padding-x">
                                                <div class="large-12 cell text-center">
                                                    <img src="{{ asset('apps/img/icon/women.png') }}" class="margin-bottom-1 margin-top-1">
                                                </div>
                                                <div class="large-12 cell">
                                                    <label for="email">Username
                                                        <input id="email" type="text" class="form-control" name="email" value="{{ old('email') }}" required autofocus placeholder="Username...">
                                                    </label>
                                                    @if ($errors->has('email'))
                                                        <span class="help-block">
                                                            <strong>{{ $errors->first('email') }}</strong>
                                                        </span>
                                                    @endif
                                                </div>
                                            </div>
                                            <div class="grid-x grid-padding-x">
                                                <div class="large-12 cell">
                                                    <label for="password">Password
                                                        <input id="password" type="password" class="form-control" name="password" required placeholder="Password...">
                                                    </label>
                                                     @if ($errors->has('password'))
                                                        <span class="help-block">
                                                            <strong>{{ $errors->first('password') }}</strong>
                                                        </span>
                                                    @endif
                                                </div>
                                            </div>
                                            <div class="grid-x grid-padding-x">
                                                <div class="small-6 cell">
                                                    &nbsp;
                                                </div>
                                                <div class="small-6 cell text-right">
                                                    <button type="submit" class="button vs-flat-button btn-success margin-top-8px">
                                                        <div class="middle-center">
                                                            Masuk <i class="mdi mdi-login mdi-left"></i>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="vs-login-footer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
