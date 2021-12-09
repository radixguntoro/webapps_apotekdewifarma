<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<!-- CSRF Token -->
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>Apotik Dewi Farma</title>
	<!-- Angular Material style sheet -->
	<link rel="stylesheet" href="{{ asset('plugin/bower_components/mdi/css/materialdesignicons.min.css') }}">
	{{-- <link rel="stylesheet" href="{{ asset('plugin/bower_components/angular-toastr/dist/toastr.min.css') }}" /> --}}
	<link rel="stylesheet" href="{{ asset('plugin/bower_components/angular-toastr/dist/angular-toastr.min.css') }}" />
	<link rel="stylesheet" href="{{ asset('plugin/bower_components/angular-loading-bar/build/loading-bar.min.css') }}" />
	<link rel="stylesheet" href="{{ asset('plugin/bower_components/angular-ui-select/dist/select.min.css') }}" />
	<link rel="stylesheet" href="{{ asset('plugin/bower_components/selectize/dist/css/selectize.css') }}" />
	<link rel="stylesheet" href="{{ asset('plugin/bower_components/angular-colorpicker-directive/css/color-picker.min.css') }}" />
	<link rel="stylesheet" href="{{ asset('plugin/bower_components/angular-tabs/angular-tabs.css') }}" />
	<link rel="stylesheet" href="{{ asset('plugin/bower_components/jquery-ui/themes/base/jquery-ui.min.css') }}"/>
	<link rel="stylesheet" href="{{ asset('plugin/bower_components/angular-hotkeys/build/hotkeys.min.css') }}"/>
	<link rel="stylesheet" href="{{ asset('plugin/bower_components/stickyTable/stickyTable.css') }}"/>
	<link rel="stylesheet" href="{{ asset('apps/css/vs-style.css') }}">
	<link rel="shortcut icon" href="{{ asset('apps/img/favicon-128.png') }}">
	{{-- <base href="{{ asset('/') }}"> --}}
</head>
<body ng-app="desktopApps" ng-cloak ng-controller="pluginController" zurbinit>
	<div style="width: 100%; height: 100%; background: #3c4ca2; position: absolute; z-index: 9999;" id="loading">
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
	<header data-sticky-container>
		<div class="sticky vs-header z-depth-1" data-sticky data-margin-top="0" data-sticky-on="small">
			<div class="grid-x grid-padding-x">
				<div class="large-2 cell vs-bg-primary padding-0">
					<div class="vs-logo">
						<a @if (Auth::user()->permission == 99 | Auth::user()->permission == 0 | Auth::user()->permission != 77) ui-sref="dashboard" @else href="javascript:;" @endif>
							<img src="{{ asset('apps/img/logo/square-logo.jpg') }}" alt="" width="56">
						</a>
						<h4 class="text-center" style="margin-left: 56px;"><span class="font-bold text-capitalize">{{ Auth::user()->first_name }}</span></h4>
						<input type="hidden" id="user_id" value="{{ Auth::user()->permission }}">
						<input type="hidden" id="user_app" value="{{ Auth::user()->id }}">
					</div>
				</div>
				<div class="large-9 cell middle-left">
					<ul class="menu vs-menu dropdown" data-dropdown-menu>
						@if (Auth::user()->permission == 99 | Auth::user()->permission == 0 | Auth::user()->permission == 2)
							<li class="is-dropdown-submenu-parent">
								<a href="" class="middle-left">
									<img src="{{ asset('apps/img/icon/folder.png') }}" class="mdi-right">
									<span class="font-medium">Data Master</span>
								</a>
								<ul class="menu vertical z-depth-1 vs-submenu vs-bg-smoke">
									@if (Auth::user()->permission == 99 | Auth::user()->permission == 0 | Auth::user()->permission == 2)
										<li><a ui-sref="item-list" ui-sref-opts="{reload: true}">Barang</a></li>
									@endif
									@if (Auth::user()->permission == 99 | Auth::user()->permission == 0)
										<li><a ui-sref="user-list" ui-sref-opts="{reload: true}">Pengguna</a></li>
									@endif
									@if (Auth::user()->permission == 99 | Auth::user()->permission == 0 | Auth::user()->permission == 2)
										<li><a ui-sref="supplier-list" ui-sref-opts="{reload: true}">Supplier</a></li>
									@endif
								</ul>
							</li>
						@endif
						@if (Auth::user()->permission != 77)
						<li>
							<a ui-sref="transaction-sales-create" class="middle-left" ui-sref-opts="{reload: true}">
								<img src="{{ asset('apps/img/icon/cashier.png') }}" class="mdi-right">
								<span class="font-medium">Penjualan</span>
							</a>
							{{-- <ul class="menu vertical z-depth-1 vs-submenu vs-bg-smoke">
								<li><a ui-sref="transaction-sales-list" ui-sref-opts="{reload: true}">Daftar Penjualan</a></li>
								<li><a ui-sref="transaction-sales-create" ui-sref-opts="{reload: true}">Transaksi Penjualan</a></li>
							</ul> --}}
						</li>
						@endif
						@if (Auth::user()->permission != 1 && Auth::user()->permission != 77)
							<li class="is-dropdown-submenu-parent">
								<a href="javascript:;" class="middle-left">
									<img src="{{ asset('apps/img/icon/antibiotic.png') }}" class="mdi-right">
									<span class="font-medium">Inventory</span>
								</a>
								<ul class="menu vertical z-depth-1 vs-submenu vs-bg-smoke">
									{{-- <li><a ui-sref="transaction-purchases-list" ui-sref-opts="{reload: true}">Daftar Pembelian</a></li> --}}
									<li><a ui-sref="transaction-purchases-create" ui-sref-opts="{reload: true}">Transaksi Pembelian</a></li>
									@if (Auth::user()->permission == 99 | Auth::user()->permission == 0)
										<li><a ui-sref="stock-opname" ui-sref-opts="{reload: true}">Stock Opname</a></li>
									@endif
								</ul>
							</li>
						@endif
						@if (Auth::user()->permission != 1 && Auth::user()->permission != 77)
						<li class="is-dropdown-submenu-parent">
							<a href="javascript:;" class="middle-left">
								<img src="{{ asset('apps/img/icon/box.png') }}" class="mdi-right">
								<span class="font-medium">Retur</span>
							</a>
							<ul class="menu vertical z-depth-1 vs-submenu vs-bg-smoke">
								<li><a ui-sref="ret-trans-sales-create" ui-sref-opts="{reload: true}">Retur Penjualan</a></li>
								@if (Auth::user()->permission != 1 )
									<li><a ui-sref="ret-trans-purchases-create" ui-sref-opts="{reload: true}">Retur Pembelian</a></li>
								@endif
							</ul>
						</li>
						@endif
						@if (Auth::user()->permission != 1 && Auth::user()->permission != 77)
							<li class="is-dropdown-submenu-parent">
								<a href="" class="middle-left">
									<img src="{{ asset('apps/img/icon/graph.png') }}" class="mdi-right">
									<span class="font-medium">Laporan</span>
								</a>
								<ul class="menu vertical z-depth-1 vs-submenu vs-bg-smoke">
									<li><a ui-sref="rep-item-card" ui-sref-opts="{reload: true}">Lap. Kartu Barang</a></li>
									<li><a ui-sref="rep-trans-purchases" ui-sref-opts="{reload: true}">Lap. Pembelian</a></li>
									@if (Auth::user()->permission == 99 | Auth::user()->permission == 0)
										<li><a ui-sref="rep-trans-sales" ui-sref-opts="{reload: true}">Lap. Penjualan</a></li>
										<li><a ui-sref="rep-stock-opname" ui-sref-opts="{reload: true}">Lap. Stock Opname</a></li>
										<li><a ui-sref="rep-income-cashier" ui-sref-opts="{reload: true}">Lap. Setoran Kasir</a></li>
										<li><a ui-sref="rep-income-shift" ui-sref-opts="{reload: true}">Lap. Setoran per Shift</a></li>
									@endif
									{{-- <li><a href="#" ui-sref-opts="{reload: true}">Lap. Pengguna</a></li> --}}
								</ul>
							</li>
						@endif
						@if (Auth::user()->permission == 99 | Auth::user()->permission == 0)
							<li class="is-dropdown-submenu-parent">
								<a href="" class="middle-left">
									<img src="{{ asset('apps/img/icon/log.png') }}" class="mdi-right">
									<span class="font-medium">Riwayat</span>
								</a>
								<ul class="menu vertical z-depth-1 vs-submenu vs-bg-smoke">
									<li><a ui-sref="his-trans-sales">Riwayat Penjualan</a></li>
									<li><a ui-sref="his-trans-purchases">Riwayat Pembelian</a></li>
									<li><a ui-sref="his-stock-opname">Riwayat Stock Opname</a></li>
									<li><a ui-sref="his-login">Riwayat Pengguna</a></li>
									<li><a ui-sref="his-item">Riwayat Barang</a></li>
									<li><a ui-sref="his-supplier">Riwayat Supplier</a></li>
								</ul>
							</li>
						@endif
						@if (Auth::user()->permission == 99 | Auth::user()->permission == 0)
							<li>
								<a ui-sref="closing-cashier" class="middle-left" ui-sref-opts="{reload: true}">
									<img src="{{ asset('apps/img/icon/door.png') }}" class="mdi-right">
									<span class="font-medium">Tutup Kasir</span>
								</a>
							</li>
						@endif
					</ul>
				</div>
				<div class="large-1 cell float-right padding-0">
					<ul class="menu vs-account align-right dropdown margin-top-0" data-dropdown-menu>
						<li ng-show="min_stock.length > 0">
							<a href="" class="middle-left" style="padding: 8px 10px;">
								<i class="mdi mdi-bell-ring mdi-36px" style="color: #e4c05c"></i>
							</a>
							<ul class="menu vertical z-depth-1 vs-submenu vs-bg-smoke submenu-account" style="width: 325px; height: 600px; overflow: auto" ng-show="min_stock.length > 0">
								<li ng-include="'/html/base/nav.html'"></li>
							</ul>
						</li>
						<li>
							<a href="" class="middle-left" style="padding: 4px 8px;">
								<img src="{{ asset('apps/img/icon/women.png') }}" class="mdi-right">
								{{-- <span class="font-bold account-title">{{ Auth::user()->first_name }}</span> --}}
							</a>
							<ul class="menu vertical z-depth-1 vs-submenu vs-bg-smoke submenu-account">
								{{-- <li style="border-bottom: 1px solid #ddd">
									<a href="javascript:;" class="middle-left"><i class="mdi mdi-account-circle mdi-right mdi-18px"></i> {{ Auth::user()->first_name }}</a>
								</li> --}}
								<li>
									<a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="middle-left" style="width: 100%" id="logout"><i class="mdi mdi-logout mdi-right mdi-18px"></i> Keluar</a>
									<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</header>
	<section class="vs-content" fullbody>
		<div class="vs-page">
			<div class="vs-loader"></div>
			<ui-view></ui-view>
		</div>
	</section>
	{{-- <footer class="vs-adm-footer">
		<div class="vs-copyright text-center">
			© 2017 <span class="text-medium">Vencel Studio</span> CMS. All rights reserved.
		</div>
	</footer> --}}
	{{-- Scripts --}}
	<script src="{{ asset('plugin/bower_components/jquery/dist/jquery.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/jquery-ui/jquery-ui.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/jquery.preload-master/jquery.preload.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/tinymce/tinymce.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/what-input/dist/what-input.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/foundation-sites/dist/js/foundation.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/stickyTable/stickyTable.min.js') }}"></script>
	{{-- Start Angular Libraries --}}
	<script src="{{ asset('plugin/bower_components/angular/angular.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/ui-autocomplete/autocomplete.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-ui-date/dist/date.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-sanitize/angular-sanitize.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-route/angular-route.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-ui-router/release/angular-ui-router.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-animate/angular-animate.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-aria/angular-aria.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-messages/angular-messages.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-sticky/dist/angular-sticky.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-toggle/angular-toggle.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-tabs/angular-tabs.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-filter/dist/angular-filter.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-ui-tinymce/src/tinymce.js') }}"></script>
	{{-- <script src="{{ asset('plugin/bower_components/angular-toastr/dist/toastr.min.js') }}"></script> --}}
	<script src="{{ asset('plugin/bower_components/angular-toastr/dist/angular-toastr.tpls.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-loading-bar/build/loading-bar.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-ui-select/dist/select.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-i18n/angular-i18n.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-file-upload/dist/angular-file-upload.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-input-masks/angular-input-masks-standalone.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-hotkeys/build/hotkeys.min.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/angular-barcode-scan/angular.scannerdetection.js') }}"></script>
	<script src="{{ asset('plugin/bower_components/birthday-picker/bday-picker.js') }}"></script>
	{{-- End Angular Libraries --}}
	{{-- Start Directive --}}
	<script src="{{ asset('plugin/bower_components/angularUtils-pagination/dirPagination.js') }}"></script>
	<script src="{{ asset('apps/js/script/base/pluginDirective.js') }}"></script>
	{{-- End Directive --}}

	{{-- Start Master Controller --}}
	<script src="{{ asset('apps/js/script/base/_pluginController.js') }}"></script>
	{{-- <script src="{{ asset('apps/js/script/base/_notifController.js') }}"></script> --}}
	<script src="{{ asset('apps/js/script/master/categories/categoryController.js') }}"></script>
	<script src="{{ asset('apps/js/script/master/users/userController.js') }}"></script>
	<script src="{{ asset('apps/js/script/master/suppliers/supplierController.js') }}"></script>
	<script src="{{ asset('apps/js/script/master/items/itemController.js') }}"></script>
	{{-- End Master Controller --}}

	{{-- Start Transaction Controller --}}
	<script src="{{ asset('apps/js/script/transaction/transactionPurchases/transactionPurchasesController.js') }}"></script>
	<script src="{{ asset('apps/js/script/transaction/transactionSales/transactionSalesController.js') }}"></script>
	<script src="{{ asset('apps/js/script/transaction/closingCashier/closingCashierController.js') }}"></script>
	{{-- End Transaction Controller --}}

	{{-- Start Inventory Factory --}}
	<script src="{{ asset('apps/js/script/inventory/stockOpname/stockOpnameController.js') }}"></script>
	{{-- End Transaction Factory --}}

	{{-- Start History Controller --}}
	<script src="{{ asset('apps/js/script/history/historyTransPurchases/historyTransPurchasesController.js') }}"></script>
	<script src="{{ asset('apps/js/script/history/historyTransSales/historyTransSalesController.js') }}"></script>
	<script src="{{ asset('apps/js/script/history/historyStockOpname/historyStockOpnameController.js') }}"></script>
	<script src="{{ asset('apps/js/script/history/historyLogin/historyLoginController.js') }}"></script>
	<script src="{{ asset('apps/js/script/history/historyItem/historyItemController.js') }}"></script>
	<script src="{{ asset('apps/js/script/history/historySupplier/historySupplierController.js') }}"></script>
	{{-- End History Controller --}}

	{{-- Start Report Controller --}}
	<script src="{{ asset('apps/js/script/report/reportTransPurchases/reportTransPurchasesController.js') }}"></script>
	<script src="{{ asset('apps/js/script/report/reportTransSales/reportTransSalesController.js') }}"></script>
	<script src="{{ asset('apps/js/script/report/reportStockOpname/reportStockOpnameController.js') }}"></script>
	<script src="{{ asset('apps/js/script/report/reportItemCard/reportItemCardController.js') }}"></script>
	<script src="{{ asset('apps/js/script/report/reportIncomeCashier/reportIncomeCashierController.js') }}"></script>
	<script src="{{ asset('apps/js/script/report/reportIncomeShift/reportIncomeShiftController.js') }}"></script>
	{{-- End Report Controller --}}

	{{-- Start Return Controller --}}
	<script src="{{ asset('apps/js/script/return/returnTransSales/returnTransSalesController.js') }}"></script>
	<script src="{{ asset('apps/js/script/return/returnTransPurchases/returnTransPurchasesController.js') }}"></script>
	{{-- End Return Controller --}}

	{{-- Start Master Factory --}}
	<script src="{{ asset('apps/js/script/master/categories/categoryFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/master/users/userFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/master/suppliers/supplierFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/master/items/itemFactory.js') }}"></script>
	{{-- End Master Factory --}}

	{{-- Start Transaction Factory --}}
	<script src="{{ asset('apps/js/script/transaction/transactionPurchases/transactionPurchasesFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/transaction/transactionSales/transactionSalesFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/transaction/closingCashier/closingCashierFactory.js') }}"></script>
	{{-- End Transaction Factory --}}

	{{-- Start Inventory Factory --}}
	<script src="{{ asset('apps/js/script/inventory/stockOpname/stockOpnameFactory.js') }}"></script>
	{{-- End Transaction Factory --}}

	{{-- Start History Factory --}}
	<script src="{{ asset('apps/js/script/history/historyTransPurchases/historyTransPurchasesFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/history/historyTransSales/historyTransSalesFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/history/historyStockOpname/historyStockOpnameFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/history/historyLogin/historyLoginFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/history/historyItem/historyItemFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/history/historySupplier/historySupplierFactory.js') }}"></script>
	{{-- End History Factory --}}

	{{-- Start Report Factory --}}
	<script src="{{ asset('apps/js/script/report/reportTransPurchases/reportTransPurchasesFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/report/reportTransSales/reportTransSalesFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/report/reportStockOpname/reportStockOpnameFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/report/reportItemCard/reportItemCardFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/report/reportIncomeCashier/reportIncomeCashierFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/report/reportIncomeShift/reportIncomeShiftFactory.js') }}"></script>
	{{-- End Report Factory --}}

	{{-- Start Return Factory --}}
	<script src="{{ asset('apps/js/script/return/returnTransSales/returnTransSalesFactory.js') }}"></script>
	<script src="{{ asset('apps/js/script/return/returnTransPurchases/returnTransPurchasesFactory.js') }}"></script>
	{{-- End Return Factory --}}

	{{-- Start Global --}}
	<script src="{{ asset('apps/js/script/global.js') }}"></script>
	<script src="{{ asset('apps/js/script/app.js') }}"></script>
	<script type="text/javascript">
        $.preload([
            "{{ asset('apps/css/vs-style.css') }}",
            "{{ asset('plugin/bower_components/foundation-sites/dist/js/foundation.min.js') }}"
        ]).then(function() {
            $("#loading").css("display", "none");
        }, function() {
            console.error("Something went wrong.")
        }, function(progress) {
            $("#loading").css("display", "block");
            console.debug(Math.round(progress * 100) + '%')
        })
	</script>
	{{-- End Global --}}
</body>
</html>
