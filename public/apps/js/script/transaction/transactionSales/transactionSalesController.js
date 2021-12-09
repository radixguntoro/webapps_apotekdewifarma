var app = angular.module('transactionSalesCtrl', ['factoryTransactionSales']);

app.controller('transactionSalesController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $filter, $parse, $state, $compile, toastr, hotkeys, transactionSalesFactory, itemFactory, reportTransSalesFactory) {

    //##############################//
    //      DEKLARASI VARIABLE      //
    //##############################//
    $rootScope.$state = $state;

    $scope.data = [];
    $scope.libraryTemp = {};
    $scope.totalItemsTemp = {};
    $scope.totalItems = 0;
    $scope.pagination = {
        current: 1
    };

    $scope.typing = "I";
    $scope.transactionSales = {};
    $scope.cart = {};

    $scope.tr_sales = {
        total_price: 0,
        discount: 0,
        discprice: 0,
        grand_total: 0,
        payment: 0,
        balance: 0
    };

    //##############################//
    //   List, Pagination, Search   //
    //##############################//
    $scope.getResultsPage = function(pageNumber) {
        $scope.loading = true;
        if (!$.isEmptyObject($scope.libraryTemp)) {
            var dateStart = $scope.report.datestart != null ? $filter('date')($scope.report.datestart, 'yyyy-MM-dd') : '';
            var dateEnd = $scope.report.dateend != null ? $filter('date')($scope.report.dateend, 'yyyy-MM-dd') : '';
            transactionSalesFactory.filterDataTransactionSales(pageNumber, dateStart, dateEnd)
                .then(function() {
                    $scope.data = transactionSalesFactory.resultData;
                    $scope.totalItems = transactionSalesFactory.totalItems;
                    $scope.loading = false;
                });
        } else {
            transactionSalesFactory.getDataTransactionSales(pageNumber)
                .then(function() {
                    $scope.data = transactionSalesFactory.resultData;
                    $scope.totalItems = transactionSalesFactory.totalItems;
                    $scope.loading = false;
                });
        }
    }

    $scope.pageChanged = function(newPage) {
        $scope.getResultsPage(newPage);
    };

    $scope.getResultsPage(1);

    //##############################//
    //    MENAMPILKAN DETIL DATA    //
    //##############################//
    $scope.showTransSalesDetail = function(trans_sales) {
        $scope.loadingDetail = true;
        reportTransSalesFactory.showTransSalesDetail({
            trans_sales_id: trans_sales.id
        }).then(function() {
            $scope.trans_sales_detail = reportTransSalesFactory.dataTransSalesDetail.data_trans_sales_detail;
            $scope.loadingDetail = false;
        });
    }

    //##############################//
    //      FUNGSI FILTER DATA      //
    //##############################//
    $scope.filterData = function() {
        if ($.isEmptyObject($scope.libraryTemp)) {
            $scope.libraryTemp = $scope.data;
            $scope.totalItemsTemp = $scope.totalItems;
            $scope.data = {};
        }
        $scope.getResultsPage(1);
    }

    //##############################//
    //       GENERATE INVOICE       //
    //##############################//
    $scope.generateInvoice = function () {
        $scope.invoice = "SL" + $filter('date')(new Date(), 'yy') + $filter('date')(new Date(), 'MM') + $filter('date')(new Date(), 'dd') + $filter('date')(new Date(), 'hh') + $filter('date')(new Date(), 'mm') + $filter('date')(new Date(), 'ss');
    }

    $scope.generateInvoice();

    //##############################//
    //    PERHITUNGAN PENJUALAN     //
    //##############################//
    $scope.calcTotalPrice = function(elm) {
        var grand_total = 0;
        $scope.cart_sales = [];
        var index = 0;
        angular.forEach($scope.data_cart, function(val, key) {
            grand_total += parseInt(val.subtotal);
            $scope.cart_sales[index] = val;
            index += 1;
        });

        $scope.tr_sales.total_price = grand_total;
        $scope.tr_sales.grand_total = grand_total;
    }

    $scope.calcGrandTotal = function(elm) {
        $scope.tr_sales.discprice = 0;
        if ($scope.tr_sales.discount == null | $scope.tr_sales.discount == 0) {
            $scope.tr_sales.discount = 0;
            $scope.tr_sales.balance = 0;
        } else if ($scope.tr_sales.discount > 0.9) {
            $scope.tr_sales.discount = 0;
            $scope.tr_sales.balance = 0;
        }

        if ($scope.tr_sales.discount > 0) {
            $scope.tr_sales.payment = 0;
            $scope.tr_sales.grand_total = $scope.tr_sales.total_price - ($scope.tr_sales.total_price * $scope.tr_sales.discount);
            $scope.tr_sales.balance = 0
        } else {
            $scope.tr_sales.payment = 0;
            $scope.tr_sales.grand_total = $scope.tr_sales.total_price;
            $scope.tr_sales.balance = 0;
        }
    }

    $scope.calcDiscGrandTotal = function(elm) {
        $scope.tr_sales.discount = 0;
        if ($scope.tr_sales.discprice == null | $scope.tr_sales.discprice == 0) {
            $scope.tr_sales.discprice = 0;
            $scope.tr_sales.balance = 0;
        } else if ($scope.tr_sales.discprice > $scope.tr_sales.grand_total) {
            $scope.tr_sales.discprice = 0;
        }

        if ($scope.tr_sales.discprice > 0) {
            $scope.tr_sales.payment = 0;
            $scope.tr_sales.grand_total = $scope.tr_sales.total_price - $scope.tr_sales.discprice;
            $scope.tr_sales.balance = 0;
        } else {
            $scope.tr_sales.payment = 0;
            $scope.tr_sales.grand_total = $scope.tr_sales.total_price;
            $scope.tr_sales.balance = 0;
        }
    }

    $scope.calcBalanceTotal = function(elm) {
        if ($scope.tr_sales.payment == null | $scope.tr_sales.payment == 0) {
            $scope.tr_sales.payment = 0;
            $scope.tr_sales.balance = 0;
        }

        var grand_total = 0;
        angular.forEach($scope.data_cart, function(val, key) {
            grand_total += (val.price * val.qty);
        });

        if ($scope.tr_sales.payment > 0 && $scope.tr_sales.payment > $scope.tr_sales.grand_total) {
            $scope.tr_sales.balance = $scope.tr_sales.payment - $scope.tr_sales.grand_total;
        } else {
            $scope.tr_sales.balance = 0;
        }
    }

    // Kalkulasi kuantitas
    $scope.calcQty = function(elm) {
        if (elm.cart.qty == null | elm.cart.qty == 0) {
            elm.cart.qty = 1;
            elm.cart.subtotal = (parseInt(elm.cart.price) - parseInt(elm.cart.price * elm.cart.discount)) * elm.cart.qty;
            $scope.calcTotalPrice();
        } else if (elm.cart.unit == 'box') {
            // if (elm.cart.qty > elm.cart.qty_in_box) {
            //     elm.cart.qty = 1;
            //     elm.cart.subtotal = (parseInt(elm.cart.price) - parseInt(elm.cart.price * elm.cart.discount)) * elm.cart.qty;
            //     $scope.calcTotalPrice();
            // } else {
                elm.cart.subtotal = (parseInt(elm.cart.price) - parseInt(elm.cart.price * elm.cart.discount)) * elm.cart.qty;
                $scope.calcTotalPrice();
            // }
        } else if (elm.cart.unit == 'strip') {
            // if (elm.cart.qty > elm.cart.qty_in_strip) {
            //     elm.cart.qty = 1;
            //     elm.cart.subtotal = (parseInt(elm.cart.price) - parseInt(elm.cart.price * elm.cart.discount)) * elm.cart.qty;
            //     $scope.calcTotalPrice();
            // } else {
                elm.cart.subtotal = (parseInt(elm.cart.price) - parseInt(elm.cart.price * elm.cart.discount)) * elm.cart.qty;
                $scope.calcTotalPrice();
            // }
        } else if (elm.cart.unit == 'tablet') {
            // if (elm.cart.qty > elm.cart.qty_in_tablet) {
            //     elm.cart.qty = 1;
            //     elm.cart.subtotal = (parseInt(elm.cart.price) - parseInt(elm.cart.price * elm.cart.discount)) * elm.cart.qty;
            //     $scope.calcTotalPrice();
            // } else {
                elm.cart.subtotal = (parseInt(elm.cart.price) - parseInt(elm.cart.price * elm.cart.discount)) * elm.cart.qty;
                $scope.calcTotalPrice();
            // }
        }
        $scope.tr_sales.discount = 0;
        $scope.tr_sales.discprice = 0;
        $scope.tr_sales.payment = 0;
        $scope.tr_sales.balance = 0;
    };

    $scope.calcDiscItem = function(elm) {
        if (elm.cart.discount == null | elm.cart.discount == 0 | isNaN(elm.cart.discount)) {
            elm.cart.discount = 0;
            elm.cart.subtotal = (parseInt(elm.cart.price) - parseInt(elm.cart.price * elm.cart.discount)) * elm.cart.qty;
            $scope.calcTotalPrice();
        } else if (elm.cart.discount > 0.9) {
            elm.cart.discount = 0;
            $scope.tr_sales.discount = 0;
            $scope.tr_sales.balance = 0;
            $scope.tr_sales.discprice = 0;
            $scope.tr_sales.payment = 0;
            elm.cart.subtotal = (parseInt(elm.cart.price) - parseInt(elm.cart.price * elm.cart.discount)) * elm.cart.qty;
            $scope.calcTotalPrice();
        } else if (elm.cart.discount > 0) {
            elm.cart.subtotal = (parseInt(elm.cart.price) - parseInt(elm.cart.price * elm.cart.discount)) * elm.cart.qty;
            $scope.calcTotalPrice();
        }

        $scope.tr_sales.discount = 0;
        $scope.tr_sales.discprice = 0;
        $scope.tr_sales.payment = 0;
        $scope.tr_sales.balance = 0;
        $scope.calcTotalPrice();
    };

    //##############################//
    //     MEMANGGIL DATA CART      //
    //##############################//
    $scope.data_cart = [];
    $scope.loadCart = function() {
        transactionSalesFactory.getDataCart({
            user_id: angular.element('#user_app').val()
        }).then(function() {
            $scope.data_cart = transactionSalesFactory.resDataCart;
            $scope.calcTotalPrice();
            $scope.calcGrandTotal();
            $scope.calcBalanceTotal();
            console.log("Get Cart", $scope.data_cart);
        });
    }
    $scope.loadCart();
    //##############################//
    //      MENAMBAH DATA CART      //
    //##############################//
    $scope.cartAdd = function(input) {
        transactionSalesFactory.getDataItem({
            item_id: input.id
        }).then(function() {
            $scope.get_item = transactionSalesFactory.resDataItem;
            transactionSalesFactory.addCart({
                item: $scope.get_item
            }).then(function() {
                console.log("Data Saved");
            });
			console.log("data", $scope.get_item);
            $scope.data_cart.push({
                "barcode_box": $scope.get_item.barcode_box
                , "barcode_strip": $scope.get_item.barcode_strip
                , "created_at": $scope.get_item.created_at
                , "item_id": $scope.get_item.id
                , "name": $scope.get_item.name
                , "note": $scope.get_item.note
                , "percent_profit_per_box": $scope.get_item.percent_profit_per_box
                , "percent_profit_per_strip": $scope.get_item.percent_profit_per_strip
                , "percent_profit_per_tablet": $scope.get_item.percent_profit_per_tablet
                , "price_purchase_per_box": $scope.get_item.price_purchase_per_box
                , "price_purchase_per_strip": $scope.get_item.price_purchase_per_strip
                , "price_purchase_per_tablet": $scope.get_item.price_purchase_per_tablet
                , "price_sell_per_box": $scope.get_item.price_sell_per_box
                , "price_sell_per_strip": $scope.get_item.price_sell_per_strip
                , "price_sell_per_tablet": $scope.get_item.price_sell_per_tablet
                , "qty_in_bottle": $scope.get_item.qty_in_bottle
                , "qty_in_box": $scope.get_item.qty_in_box
                , "qty_in_strip": $scope.get_item.qty_in_strip
                , "qty_in_tablet": $scope.get_item.qty_in_tablet
                , "qty_min": $scope.get_item.qty_min
                , "qty_total": $scope.get_item.qty_total
                , "sku": $scope.get_item.sku
                , "unit": "tablet"
                , "price": $scope.get_item.price_sell_per_tablet
                , "subtotal": $scope.get_item.price_sell_per_tablet
                , "discount": 0
                , "qty": 1
            });
            $scope.calcTotalPrice();
            $scope.calcGrandTotal();
            $scope.calcBalanceTotal();
        });
    }

    //##############################//
    //     MENGHAPUS DATA CART      //
    //##############################//
    $scope.item_id = '';
    $scope.getItemId = function (elm, input) {
        $scope.item_id = input.row_id;
        angular.element('.vs-box-reveal').addClass('vs-show');
    }

    $scope.cartRemove = function(elm, input) {
        angular.element('.vs-box-reveal').removeClass('vs-show');
        $scope.loading = true;
        transactionSalesFactory.removeCart({
            item_id: $scope.item_id,
            username: input.username,
            password: input.password
        }).then(function() {
            $scope.tr_sales.username == '';
            $scope.tr_sales.password == '';
            $scope.data_cart.splice(elm.$index, 1);
            $scope.calcTotalPrice();
            $scope.calcGrandTotal();
            $scope.calcBalanceTotal();
            angular.element('#search-tablet').focus();
            angular.element('.inp-username').val('');
            angular.element('.inp-password').val('');
            $state.reload();
            $scope.loadCart();
            $state.go('transaction-sales-create');
            $scope.loading = false;
            $scope.check_delete = false;
        });
    }

    //##############################//
    //  PENCARIAN SCAN DATA BARANG  //
    //##############################//
    // Setting plugin scan barcode
    $scope.scan_options = {
        onComplete: function(event){
            transactionSalesFactory.searchItemBarcode({
                barcode: $scope.barcodeAdd
            }).then(function() {
                // $scope.dataCart();
                $scope.get_cart = transactionSalesFactory.resSearchItem;
				console.log('Scanning Item', $scope.get_cart);
                if ($scope.get_cart) {
                    $scope.data_cart.push($scope.get_cart);
                }
                $scope.calcTotalPrice();
                $scope.calcGrandTotal();
                $scope.calcBalanceTotal();
            });
            $scope.barcodeAdd = '';
        },
        timeBeforeScanTest: 100,
        avgTimeByChar: 30,
        minLength: 4,
        endChar: [9, 13],
        startChar: [],
        scanButtonKeyCode: false,
        scanButtonLongPressThreshold: 4,
        onScanButtonLongPressed: function(){

        }
    };

    // Fungsi scan barcode
    $scope.scanBarcode = function(elm, event, barcode) {
        var keyCode = event.which || event.keyCode;
        console.log(elm);
        if(keyCode == 13) {
            transactionSalesFactory.searchItemBarcode(elm, event, {
                barcode: barcode
            }).then(function() {
                // $scope.dataCart();
                $scope.get_cart = transactionSalesFactory.resSearchItem;
				console.log('Scanning', $scope.get_cart);
                if ($scope.get_cart) {
                    $scope.data_cart.push($scope.get_cart);
                }
                $scope.calcTotalPrice();
                $scope.calcGrandTotal();
                $scope.calcBalanceTotal();
            });
            angular.element('#search-tablet').val('');
            return true;
        }
    };

    //##############################//
    // PENCARIAN MANUAL DATA BARANG //
    //##############################//
    // Fungsi pencarian data barang manual
    $scope.searchItem = function(typo, response) {
        itemFactory.searchItemManual({
            typo: typo.term
        }).then(function() {
            $scope.data_item = itemFactory.resSearchItem;
            if ($scope.data_item.length > 0) {
                // angular.element('#search-tablet').val('');
                // $scope.barcodeAdd = '';
                response($scope.data_item);
            }
        });
    };

    //##############################//
    //      FUNGSI CREATE DATA      //
    //##############################//
    // Fungsi Cek dan Pemilihan Unit
    $scope.selectUnit = function(elm, index, unit, price_box, price_strip, price_tablet) {
        if (unit == 'box') {
            // this.cart.qty = 1;
            this.cart.price = price_box;
            this.cart.subtotal = (price_box * this.cart.qty) - ((price_box * this.cart.qty) * this.cart.discount);
            // $scope.tr_sales.discount = 0;
            // $scope.tr_sales.discprice = 0;
            // $scope.tr_sales.payment = 0;
            // $scope.tr_sales.balance = 0;
            $scope.calcTotalPrice();
            $scope.calcGrandTotal();
            $scope.calcBalanceTotal();
        } else if(unit == 'strip') {
            // this.cart.qty = 1;
            this.cart.price = price_strip;
            this.cart.subtotal = price_strip * this.cart.qty - ((price_strip * this.cart.qty) * this.cart.discount);
            // $scope.tr_sales.discount = 0;
            // $scope.tr_sales.discprice = 0;
            // $scope.tr_sales.payment = 0;
            // $scope.tr_sales.balance = 0;
            $scope.calcTotalPrice();
            $scope.calcGrandTotal();
            $scope.calcBalanceTotal();
        } else if(unit == 'tablet') {
            // this.cart.qty = 1;
            this.cart.price = price_tablet;
            this.cart.subtotal = price_tablet * this.cart.qty - ((price_tablet * this.cart.qty) * this.cart.discount);
            // $scope.tr_sales.discount = 0;
            // $scope.tr_sales.discprice = 0;
            // $scope.tr_sales.payment = 0;
            // $scope.tr_sales.balance = 0;
            $scope.calcTotalPrice();
            $scope.calcGrandTotal();
            $scope.calcBalanceTotal();
        }
    };

    // Fungsi Simpan data tanpa cetak
    $scope.process = false;
    $scope.createData = function() {
        $scope.loading = true;
        $scope.process = true;
        angular.element('#btn-save').attr('disabled', true);
        angular.element('#btn-save-print').attr('disabled', true);
        transactionSalesFactory.insertDataTransactionSales({
            transaction_sales: $scope.tr_sales,
            cart: $scope.cart_sales,
            code: $scope.invoice,
        }).then(function() {
            $state.reload();
            angular.element('#btn-save').attr('disabled', false);
            angular.element('#btn-save-print').attr('disabled', false);
            $scope.generateInvoice();
            $scope.barcode = "";
            $scope.tr_sales = {
                total_price: 0,
                discount: 0,
                discprice: 0,
                grand_total: 0,
                payment: 0,
                balance: 0
            };
            angular.element('#search-tablet').focus();
            $scope.notification();
            $scope.loading = false;
            $scope.process = false;
        });
    };

    // Fungsi Simpan data dengan cetak
    $scope.createPrintData = function() {
        $scope.loading = true;
        $scope.process = true;
        angular.element('#btn-save-print').attr('disabled', true);
        angular.element('#btn-save').attr('disabled', true);
        transactionSalesFactory.insertDataTransactionSales({
            transaction_sales: $scope.tr_sales,
            cart: $scope.cart_sales,
            code: $scope.invoice,
        }).then(function() {
            $window.print();
            angular.element('#btn-save-print').attr('disabled', false);
            angular.element('#btn-save').attr('disabled', false);
            $scope.generateInvoice();
            $scope.barcode = "";
            $scope.tr_sales = {
                total_price: 0,
                discount: 0,
                discprice: 0,
                grand_total: 0,
                payment: 0,
                balance: 0
            };
            angular.element('#search-tablet').focus();
            $scope.notification();
            $scope.loading = false;
            $scope.process = false;
            $state.reload();
        });
    };

    // Fungsi Cetak data terakhir
    $scope.show = false;
    $scope.printLastTrSales = function() {
        $scope.show = true;
        $scope.loading = true;
        transactionSalesFactory.printLastTrSales().then(function() {
            $scope.tr_sales_last = {
                invoice: transactionSalesFactory.resLastTrSales[0].code,
                date: $filter('date')(transactionSalesFactory.resLastTrSales[0].date, 'dd-MM-yy'),
                total_price: transactionSalesFactory.resLastTrSales[0].total_price,
                discount_item: transactionSalesFactory.resLastTrSales[0].discount_item,
                discount: transactionSalesFactory.resLastTrSales[0].discount,
                discprice: transactionSalesFactory.resLastTrSales[0].discount_price,
                grand_total: transactionSalesFactory.resLastTrSales[0].grand_total,
                payment: transactionSalesFactory.resLastTrSales[0].payment,
                balance: transactionSalesFactory.resLastTrSales[0].balance,
            };
            $scope.data_cart_last = transactionSalesFactory.resLastTrSales;
            $timeout(function() {
                $window.print();
                $scope.show = false;
                $scope.loading = false;
            }, 3000);
        });
    };

    //##############################//
    //       FUNGSI EDIT DATA       //
    //##############################//
    if ($state.current.name == "transactionSales-edit") {
        $scope.transactionSales = {};
        transactionSalesFactory.getDataEachTransactionSales($stateParams.id)
            .then(function() {
                $scope.transactionSales = transactionSalesFactory.eachDataTransactionSales;
            });

        $scope.updateData = function() {
            angular.element('#btn-save').attr('disabled', true);
            transactionSalesFactory.updateDataTransactionSales({
                id: $stateParams.id,
                transactionSales: $scope.transactionSales
            }).then(function() {
                $state.go("transactionSales-list");
                angular.element('#btn-save').attr('disabled', false);
            });
        }
    }

    //##############################//
    //    HOTKEYS FORM PENJUALAN    //
    //##############################//
    $scope.helpShow = false;
    $scope.helpPanel = function(flag) {
        if (flag) {
            $scope.helpShow = false;
        } else {
            $scope.helpShow = true;
        }
    }

    $scope.check_delete = false;
    $scope.checkDelete = function(flag) {
        if (flag) {
            $scope.check_delete = false;
            // angular.element('.box-delete').css('display', 'none');
        } else {
            $scope.check_delete = true;
            // angular.element('.box-delete').css('display', 'block');
        }
    }

    if ($state.current.name == 'transaction-sales-create' | $state.current.name == 'dashboard') {
        angular.element('#search-tablet').focus();
        hotkeys.add({
            combo: 'alt+h',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $timeout(function() {
                    angular.element('#btn-help').triggerHandler('click');
                }, 0);
            }
        });

        hotkeys.add({
            combo: 'ctrl+d',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                angular.element('#inp-disc-percent').focus();
            }
        });

        hotkeys.add({
            combo: 'alt+d',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                angular.element('#inp-disc-tunai').focus();
            }
        });

        hotkeys.add({
            combo: 'ctrl+b',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                angular.element('#inp-balance').focus();
            }
        });

        hotkeys.add({
            combo: 'alt+f',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                angular.element('#search-tablet').focus();
            }
        });

        hotkeys.add({
            combo: 'alt+c',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                if ($scope.process == false) {
                    if ($scope.tr_sales.grand_total <= 0) {
                        return true;
                    } else if (($scope.tr_sales.payment > $scope.tr_sales.grand_total) | ($scope.tr_sales.payment == $scope.tr_sales.grand_total)) {
                        $scope.createPrintData();
                        return true;
                    }
                } else {
                    return;
                    // toastr.info('Data sedang proses disimpan', 'Proses!');
                }
            }
        });

        hotkeys.add({
            combo: 'alt+s',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                if ($scope.process == false) {
                    if ($scope.tr_sales.grand_total <= 0) {
                        return true;
                    } else {
                        if (($scope.tr_sales.payment > $scope.tr_sales.grand_total) | ($scope.tr_sales.payment == $scope.tr_sales.grand_total)) {
                            $scope.createData();
                            angular.element('#search-tablet').focus();
                        } else {
                            return true;
                        }
                    }
                } else {
                    return;
                    // toastr.info('Data sedang proses disimpan', 'Proses!');
                }
            }
        });

        hotkeys.add({
            combo: 'alt+o',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $timeout(function() {
                    angular.element('#check-delete').triggerHandler('click');
                    angular.element('#check-delete').focus();
                }, 0);
            }
        });

        hotkeys.add({
            combo: 'alt+p',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $scope.printLastTrSales();
            }
        });
    }
})
