 <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Apotik Dewi Farma Apps</title>
    <link rel="stylesheet" href="{{ asset('plugin/bower_components/mdi/css/materialdesignicons.min.css') }}">
    <link rel="stylesheet" href="{{ asset('apps/css/vs-style.css') }}">
    <script src="{{ asset('plugin/bower_components/jquery/dist/jquery.min.js') }}"></script>
</head>
<body>
    <div style="width: 100%;height: 100%;background: #3c4ca2;position: absolute;" id="loading">
        <div class="middle-center" style="width: 100%; height: 100%">
            <div>
                <img src="{{ asset('apps/img/logo/square-logo.jpg') }}" alt="" width="150">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>
        </div>
    </div>
    <header></header>
    {{-- END DESKTOP MODE --}}
    <section class="vs-content middle-center" id="login-content">
        @yield('content')
    </section>
    <!-- Scripts -->
    <!-- Jquery Libraries -->
    <script src="{{ asset('plugin/bower_components/what-input/dist/what-input.min.js') }}"></script>
    <script src="{{ asset('plugin/bower_components/jquery.preload-master/jquery.preload.min.js') }}"></script>
    <script src="{{ asset('plugin/bower_components/foundation-sites/dist/js/foundation.min.js') }}"></script>
    <script src="{{ asset('plugin/bower_components/velocity/velocity.min.js') }}"></script>
    <script src="{{ asset('plugin/bower_components/velocity/velocity.ui.min.js') }}"></script>
    <script src="{{ asset('plugin/bower_components/birthday-picker/bday-picker.js') }}"></script>
    <script src="{{ asset('plugin/bower_components/selectize/dist/js/standalone/selectize.min.js') }}"></script>
    <!-- End Jquery Libraries -->
    <script src="{{ asset('apps/js/script/global.js') }}"></script>
    <script type="text/javascript">
        $.preload([
            'apps/css/vs-style.css'
        ]).then(function() {
            $("#loading").css("display", "none");
        }, function() {
            console.error("Something went wrong.")
        }, function(progress) {
            $("#loading").css("display", "block");
            console.debug(Math.round(progress * 100) + '%')
        })
	</script>
</body>
</html>
