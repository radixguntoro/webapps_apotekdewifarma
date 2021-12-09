<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Alexa Sport - Sepatu Roda dan Sandal Murah Surabaya</title>
    <!-- Angular Material style sheet -->
    {{-- <link href="https://fonts.googleapis.com/css?family=Marcellus+SC|Questrial" rel="stylesheet"> --}}
    {{-- <link rel="stylesheet" href="{{ asset('public/plugin/bower_components/foundation-sites/dist/css/foundation.min.css') }}"> --}}
    <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="stylesheet" href="{{ asset('public/plugin/bower_components/mdi/css/materialdesignicons.min.css') }}">
    <link rel="stylesheet" href="{{ asset('public/plugin/bower_components/nivoslider/nivo-slider.css') }}">
    <link rel="stylesheet" href="{{ asset('public/plugin/bower_components/slick-carousel/slick/slick.css') }}">
    <link rel="stylesheet" href="{{ asset('public/plugin/bower_components/slick-carousel/slick/slick-theme.css') }}">
    <link rel="stylesheet" href="{{ asset('public/plugin/bower_components/selectize/dist/css/selectize.css') }}" />
    <link rel="stylesheet" href="{{ asset('public/frontend/css/vs-style.css') }}">
    <link rel="shortcut icon" href="{{ asset('public/frontend/img/favicon.ico') }}">
    <script src="{{ asset('public/plugin/bower_components/jquery/dist/jquery.min.js') }}"></script>
</head>
<body>
    <header class="vs-header" id="header" data-sticky-container>
        <div class="sticky" data-sticky data-margin-top="0" data-sticky-on="small">
            {{-- DESKTOP MODE --}}
            <div class="top-header show-for-large">
                <div class="grid-x grid-padding-x">
                    <div class="medium-10 cell">
                        <div style="color: white;" class="middle-left">
                            <span><i class="mdi mdi-phone mdi-18px"></i></span>081-230-160-160
                        </div>
                    </div>
                    <div class="medium-2 cell text-right align-self-middle">
                        <div class="vs-box-login">
                            <a href="javascript:;" data-toggle="vs-login-dropdown">
                                @if (Auth::guest())
                                Masuk / Daftar
                                @else
                                {{ Auth::user()->first_name }}
                                @endif
                            </a>
                            <div class="dropdown-pane vs-login-dropdown-pane" id="vs-login-dropdown" data-dropdown data-hover="true" data-hover-pane="true">
                                <div class="vs-dropdown-arrow"></div>
                                <div class="vs-dropdown-pane-head text-left">Selamat Datang</div>
                                <div class="vs-dropdown-pane-body">
                                    <div class="grid-x grid-padding-x">
                                        <div class="large-12 cell text-center">
                                            <ul class="menu vertical align-right">
                                                @if (Auth::guest())
                                                <li><a href="{{ route('login') }}">Masuk</a></li>
                                                <li><a href="{{ route('register') }}">Buat Akun</a></li>
                                                @else
                                                <li><a href="{{ route('user.account') }}">Halaman Akun</a></li>
                                                <li><a href="{{ route('user.paymentConfirmation') }}">Konfirmasi Pembayaran</a></li>
                                                <li><a href="{{ route('user.order') }}">Order Saya</a></li>
                                                @endif
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                @if (Auth::guest())
                                @else
                                <div class="vs-dropdown-pane-foot">
                                    <div class="pane-foot-bottom text-left">
                                        <hr>
                                        <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                            Keluar
                                        </a>
                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>
                                    </div>
                                </div>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {{-- END DESKTOP MODE --}}
            <div class="mid-header">
                <div class="top-bar grid-x grid-padding-x" id="responsive-menu">
                    <div class="small-12 large-3 cell">
                        <div class="top-bar-left">
                            <a href="{{ route('home.index') }}"><img src="{{ asset('public/frontend/img/logo/logo.png') }}" class="vs-logo"></a>
                        </div>
                    </div>
                    {{-- DESKTOP MODE --}}
                    <div class="large-6 cell show-for-large">
                        <div class="top-bar-center">
                            <ul class="dropdown menu align-center vs-menu-nav">
                                @foreach ($data_category as $category_parent)
                                    @if ($category_parent->status == "parent")
                                        <li class="mega-menu">
                                            <a href="{{ url('product/category/'.$category_parent->slug) }}" class="parent {{ (Request::is('product/category/'.$category_parent->slug) || $category_id == $category_parent->id_induk ? 'active' : '') }}" data-toggle="{{ $category_parent->nama }}">{{ $category_parent->nama }}</a>
                                            <div class="dropdown-pane bottom" id="{{ $category_parent->nama }}" data-dropdown data-options="closeOnClick:true; hover: true; hoverPane: true;">
                                                <div class="grid-container">
                                                    <div class="grid-x grid-padding-x align-center">
                                                        <div class="large-10 cell">
                                                            <div class="grid-x">
                                                                @foreach ($data_category as $category_subparent)
                                                                    @if ($category_subparent->id_induk == $category_parent->id && $category_subparent->status == 'child')
                                                                        <div class="vs-menu-cell large-4 cell">
                                                                            <a href="{{ url('product/category/'.$category_parent->slug.'/'.$category_subparent->slug) }}" class="vs-title-subparent font-bold text-center">{{ $category_subparent->nama }}</a>
                                                                        </div>
                                                                    @endif
                                                                @endforeach
                                                                @if ($category_parent->slug == "alat-olah-raga")
                                                                    <div class="vs-menu-cell large-4 cell">
                                                                        <a href="{{ route('product.getDataByCategoryCustom', 'boots') }}" class="vs-title-subparent font-bold text-center">Kustom</a>
                                                                    </div>
                                                                @endif
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    @endif
                                @endforeach
                                <li><a href="{{ route('product.getProductSale') }}" class="parent">Sale</a></li>
                                {{--  <li><a href="#" class="parent">Blogs</a></li>  --}}
                            </ul>
                        </div>
                    </div>
                    <div class="large-3 cell show-for-large">
                        <div class="top-bar-right">
                            <ul class="menu align-right vs-menu-icon">
                                <li>
                                    <a href="{{ route('wishlist.list') }}"><i class="ion ion-android-favorite-outline"></i>
                                        @if(Auth::guest())
                                        @else
                                        <span class="badge" style="bottom: 22px;">{{ count(Attr::wishlist(Auth::user()->id)) }}</span>
                                        @endif
                                    </a>
                                </li>
                                <li class="li-menu-icon-search">
                                    <a href="#" id="vs-product-search">
                                        <i class="ion ion-ios-search"></i>
                                    </a>
                                    <div class="vs-box-search">
                                        <form action="{{ route('product.getProductSearch') }}" method="GET">
                                            <input type="text" placeholder="Cari produk anda..." name="search">
                                        </form>
                                    </div>
                                </li>
                                <li>
                                    <a href="{{ route('cart.cartCheckout') }}" data-toggle="vs-cart-dropdown">
                                        <i class="ion ion-bag"></i>
                                        <span class="badge" id="badge-cart">{{ count(Cart::instance('cart')->content()) }}</span>
                                    </a>
                                    <div class="dropdown-pane vs-cart-dropdown-pane" id="vs-cart-dropdown" data-dropdown data-hover="true" data-hover-pane="true"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {{-- END DESKTOP MODE --}}
                </div>
            </div>
            {{-- PHONE MODE --}}
            <div class="bottom-header show-for-small hide-for-large">
                <div class="vs-phone-menu">
                    <ul class="menu align-center expanded">
                        <li><a data-toggle="offCanvasMenu"><i class="mdi mdi-view-dashboard"></i></a></li>
                        <li><a href=""><i class="mdi mdi-magnify"></i></a></li>
                        <li>
                            <a href="{{ route('cart.cartCheckout') }}" class="vs-box-badge-phone">
                                <i class="mdi mdi-cart"></i>
                                <span class="badge vs-success" id="badge-cart-phone">{{ count(Cart::instance('cart')->content()) }}</span>
                            </a>
                        </li>
                        <li><a href=""><i class="mdi mdi-book"></i></a></li>
                        <li><a data-toggle="offCanvasAccount"><i class="mdi mdi-account-circle"></i></a></li>
                    </ul>
                </div>
            </div>
            {{-- END PHONE MODE --}}
        </div>
        <div class="off-canvas position-left is-closed" data-transition="overlap" id="offCanvasMenu" data-off-canvas>
            <div class="vs-offcanvas-head"><h6>Kategori</h6></div>
            <div class="vs-offcanvas-body">
                <ul class="menu vertical">
                    @foreach ($data_category as $category_parent)
                        @if ($category_parent->status == "parent")
                        <li><a href="{{ url('product/category/'.$category_parent->slug) }}">{{ $category_parent->nama }}</a></li>
                        @endif
                    @endforeach
                    <li><a href="{{ route('product.getProductSale') }}">Sale</a></li>
                    <li><hr></li>
                    <li><a href="{{ route('setting.about') }}">About Us</a></li>
                    <li><a href="{{ route('setting.contact') }}">Contact Us</a></li>
                </ul>
            </div>
            <div class="vs-offcanvas-foot"></div>
        </div>
        <div class="off-canvas position-right is-closed" data-transition="overlap" id="offCanvasAccount" data-off-canvas>
            <div class="vs-offcanvas-head"><h6>Masuk/Daftar</h6></div>
            <div class="vs-offcanvas-body">
                <ul class="menu vertical">
                    @if (Auth::guest())
                    <li><a href="{{ route('login') }}">Masuk</a></li>
                    <li><a href="{{ route('register') }}">Buat Akun</a></li>
                    @else
                    <li><a href="{{ route('user.account') }}">Halaman Akun</a></li>
                    <li><a href="{{ route('user.paymentConfirmation') }}">Konfirmasi Pembayaran</a></li>
                    <li><a href="{{ route('user.order') }}">Order Saya</a></li>
                    <li><hr></li>
                    <li><a href="{{ route('logout') }}">Keluar</a></li>
                    @endif
                </ul>
            </div>
            <div class="vs-offcanvas-foot"></div>
        </div>
    </header>
    {{-- END DESKTOP MODE --}}
    <section class="vs-content">
        @yield('content')
    </section>
    <footer class="vs-footer">
        <div class="vs-footer-top">
            <div class="grid-container">
                <div class="grid-x grid-padding-x">
                    <div class="small-6 medium-3 cell">
                        <h6 class="separator-left separator-black text-uppercase">Informasi</h6>
                        <ul class="menu vertical">
                            <li><a href="{{ route('setting.about') }}">Tentang Kami</a></li>
                            <li><a href="{{ route('setting.howToPay') }}">Cara Pembayaran</a></li>
                            {{--  <li><a href="">Syarat & Ketentuan</a></li>
                            <li><a href="">Kebijakan Privasi</a></li>  --}}
                            <li><a href="{{ route('setting.contact') }}">Kontak Kami</a></li>
                        </ul>
                    </div>
                    <div class="small-6 medium-3 cell">
                        <h6 class="separator-left separator-black text-uppercase">Cari Kami Di</h6>
                        <ul class="menu vertical vs-social-icon">
                            <li>
                                <a href="{{ $facebook }}" target="_blank" class="middle-left">
                                    <i class="mdi mdi-facebook-box mdi-lg mdi-36px mdi-right"></i>
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="{{ $instagram }}" target="_blank" class="middle-left">
                                    <i class="mdi mdi-instagram mdi-lg mdi-36px mdi-right"></i>
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="small-6 medium-3 cell show-for-medium">
                        <h6 class="separator-left separator-black text-uppercase">Pembayaran</h6>
                        <ul class="menu vertical">
                            <li>
                                <a href="javascript:;"><img src="{{ asset('public/frontend/img/icon/bca.png') }}" alt="" class="vs-icon-bank" width="72"></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="{{ asset('public/frontend/img/icon/mandiri.png') }}" alt="" class="vs-icon-bank"></a>
                            </li>
                        </ul>
                    </div>
                    <div class="small-6 medium-3 cell show-for-medium">
                        <h6 class="separator-left separator-black text-uppercase">Jasa Pengiriman</h6>
                        <ul class="menu vs-shipp-icon">
                            <li><img src="{{ asset('public/frontend/img/icon/jne.png') }}" alt="" class="vs-icon-bank" width="72"></li>
                            <li><img src="{{ asset('public/frontend/img/icon/pos.png') }}" alt="" class="vs-icon-bank" width="72"></li>
                            <li><img src="{{ asset('public/frontend/img/icon/tiki.png') }}" alt="" class="vs-icon-bank" width="72"></li>
                            <li><img src="{{ asset('public/frontend/img/icon/jet.png') }}" alt="" class="vs-icon-bank" width="72"></li>
                            <li><img src="{{ asset('public/frontend/img/icon/wahana.png') }}" alt="" class="vs-icon-bank" width="72"></li>
                            <li><img src="{{ asset('public/frontend/img/icon/jnt.png') }}" alt="" class="vs-icon-bank" width="72"></li>
                            <li><img src="{{ asset('public/frontend/img/icon/pahala.png') }}" alt="" class="vs-icon-bank" width="72"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="vs-footer-bottom">
            <div class="grid-x grid-padding-x align-middle">
                <div class="small-12 cell">
                    <div class="vs-copyright">
                        © {{ date("Y") }} <span class="font-bold">Alexa Sport</span>. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- Scripts -->
    <!-- Jquery Libraries -->
    <script src="{{ asset('public/plugin/bower_components/what-input/dist/what-input.min.js') }}"></script>
    <script src="{{ asset('public/plugin/bower_components/foundation-sites/dist/js/foundation.min.js') }}"></script>
    <script src="{{ asset('public/plugin/bower_components/imagesloaded/imagesloaded.pkgd.min.js') }}"></script>
    <script src="{{ asset('public/plugin/bower_components/velocity/velocity.min.js') }}"></script>
    <script src="{{ asset('public/plugin/bower_components/velocity/velocity.ui.min.js') }}"></script>
    <script src="{{ asset('public/plugin/bower_components/nivoslider/jquery.nivo.slider.pack.js') }}"></script>
    <script src="{{ asset('public/plugin/bower_components/slick-carousel/slick/slick.min.js') }}"></script>
    <script src="{{ asset('public/plugin/bower_components/birthday-picker/bday-picker.js') }}"></script>
    <script src="{{ asset('public/plugin/bower_components/selectize/dist/js/standalone/selectize.min.js') }}"></script>
    <!-- End Jquery Libraries -->
    <script src="{{ asset('public/frontend/js/script/global.js') }}"></script>
</body>
</html>
