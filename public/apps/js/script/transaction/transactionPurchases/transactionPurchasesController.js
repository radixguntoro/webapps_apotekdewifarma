var app = angular.module('transactionPurchasesCtrl', ['factoryTransactionPurchases']);

app.controller('transactionPurchasesController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $filter, $parse, $state, $compile, toastr, hotkeys, transactionPurchasesFactory, supplierFactory, itemFactory) {
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
    $scope.cart = {};
    $scope.cart_purchases = {};
    $scope.cart_subtotal = 0;
    $scope.tr_purchases = {
        date_input: '',
        total_price: 0,
        disc_total: 0,
        price_disc: 0,
        ppn: 0,
        grand_total: 0
    };

    $scope.checkPpn = false;

    $scope.supplier = {
        id: '',
        name: ''
    };

    //##############################//
    //       GENERATE INVOICE       //
    //##############################//
    $scope.genderateinvoice = function () {
        $scope.tr_purchases.invoice = "PC" + $filter('date')(new Date(), 'yy') + $filter('date')(new Date(), 'MM') + $filter('date')(new Date(), 'dd') + $filter('date')(new Date(), 'hh') + $filter('date')(new Date(), 'mm') + $filter('date')(new Date(), 'ss');
    }

    $scope.genderateinvoice();

    $scope.dateReportOptions = {
        dateFormat: "dd-mm-yy"
    };

    //##############################//
    //     MEMANGGIL DATA CART      //
    //##############################//
    $scope.dataCart = function() {
        $scope.data_cart = {};
        transactionPurchasesFactory.getDataCart().then(function() {
            $scope.data_cart = transactionPurchasesFactory.resDataCart;
            $scope.calcGrandTotalEdit();
        });
    }

    $scope.dataCart();

    //##############################//
    //      MENAMBAH DATA CART      //
    //##############################//
    $scope.cartAdd = function(input) {
        angular.element('#search-item').val('');
        transactionPurchasesFactory.addCart({
            item: input
        }).then(function() {
            $scope.dataCart();
            $scope.tr_purchases.total_price= 0;
            $scope.tr_purchases.ppn= 0;
            $scope.tr_purchases.grand_total= 0;
        });
    }

    //##############################//
    //     MENGHAPUS DATA CART      //
    //##############################//
    $scope.cartRemove = function(input) {
        transactionPurchasesFactory.removeCart({
            item: input
        }).then(function() {
            $scope.dataCart();
            $scope.tr_purchases.total_price= 0;
            $scope.tr_purchases.ppn= 0;
            $scope.tr_purchases.grand_total= 0;
        });
    }

    //##############################//
    //   MENGHAPUS DATA CART EDIT   //
    //##############################//
    $scope.cartEditRemove = function(elm, input) {
        $scope.tr_purchases.total_price= 0;
        $scope.tr_purchases.ppn= 0;
        $scope.tr_purchases.grand_total= 0;
        $scope.tr_purchases_detail.splice(elm.$index, 1);
        $scope.calcGrandTotalEdit();
    }

    //##############################//
    //    PERHITUNGAN PEMBELIAN     //
    //##############################//
    $scope.calcQty = function(elm) {
        elm.cart.options.profit_percent = 0;
        elm.cart.options.profit = 0;
        $scope.tr_purchases.ppn = 0;
        $scope.check_ppn = false;
        if (elm.cart.qty == null | elm.cart.qty == 0) {
            elm.cart.qty = 1;
            elm.cart.options.price_last = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.qty;
            $scope.calcGrandTotalEdit();
            return true;
        } else if (elm.cart.qty > 0) {
            elm.cart.options.price_last = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.qty;
            $scope.calcGrandTotalEdit();
            return true;
        }
    };

    $scope.calcPriceItem = function(elm) {
        elm.cart.options.discount = 0;
        $scope.tr_purchases.ppn = 0;
        $scope.check_ppn = false;
        if (elm.cart.price == null | elm.cart.price == 0) {
            elm.cart.price = 0;
            // console.log(elm.cart.options.temp_price_purchase_per_tablet);
            elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
            elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
            elm.cart.options.percent_profit_per_box = elm.cart.options.temp_percent_profit_per_box;
            elm.cart.options.percent_profit_per_strip = elm.cart.options.temp_percent_profit_per_strip;
            elm.cart.options.percent_profit_per_tablet = elm.cart.options.temp_percent_profit_per_tablet;
            elm.cart.options.price_purchase_per_box = elm.cart.options.temp_price_purchase_per_box;
            elm.cart.options.price_purchase_per_strip = elm.cart.options.temp_price_purchase_per_strip;
            elm.cart.options.price_purchase_per_tablet = elm.cart.options.temp_price_purchase_per_tablet;
            //elm.cart.options.price_sell_per_box = elm.cart.options.temp_price_sell_per_box;
            //elm.cart.options.price_sell_per_strip = elm.cart.options.temp_price_sell_per_strip;
            //elm.cart.options.price_sell_per_tablet = elm.cart.options.temp_price_sell_per_tablet;
            $scope.calcGrandTotalEdit();
            return true;
            if (elm.cart.options.unit == 'box') {
                elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
                elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
                elm.cart.options.price_purchase_per_box = elm.cart.options.price_first;
                elm.cart.options.price_purchase_per_strip = elm.cart.options.qty_in_strip > 0 ? elm.cart.options.price_first / elm.cart.options.qty_in_strip : 0;
                elm.cart.options.price_purchase_per_tablet = elm.cart.options.qty_in_strip > 0 ? (elm.cart.options.price_first / elm.cart.options.qty_in_strip) / elm.cart.options.qty_in_tablet : elm.cart.options.price_first / elm.cart.options.qty_in_tablet;
                //elm.cart.options.price_sell_per_box = elm.cart.options.price_purchase_per_box + (elm.cart.options.price_purchase_per_box * elm.cart.options.percent_profit_per_box);
                //elm.cart.options.price_sell_per_strip = elm.cart.options.price_purchase_per_strip + (elm.cart.options.price_purchase_per_strip * elm.cart.options.percent_profit_per_strip);
                //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
                $scope.calcGrandTotalEdit();
                return true;
            } else if (elm.cart.options.unit == 'tablet') {
                elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
                elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
                elm.cart.options.price_purchase_per_tablet = elm.cart.options.price_first;
                //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
                $scope.calcGrandTotalEdit();
                return true;
            }
        } else if (elm.cart.price > 0) {
            if (elm.cart.options.unit == 'box') {
                elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
                elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
                elm.cart.options.price_purchase_per_box = elm.cart.options.price_first;
                elm.cart.options.price_purchase_per_strip = elm.cart.options.qty_in_strip > 0 ? elm.cart.options.price_first / elm.cart.options.qty_in_strip : 0;
                elm.cart.options.price_purchase_per_tablet = elm.cart.options.qty_in_strip > 0 ? (elm.cart.options.price_first / elm.cart.options.qty_in_strip) / elm.cart.options.qty_in_tablet : elm.cart.options.price_first / elm.cart.options.qty_in_tablet;
                //elm.cart.options.price_sell_per_box = elm.cart.options.price_purchase_per_box + (elm.cart.options.price_purchase_per_box * elm.cart.options.percent_profit_per_box);
                //elm.cart.options.price_sell_per_strip = elm.cart.options.price_purchase_per_strip + (elm.cart.options.price_purchase_per_strip * elm.cart.options.percent_profit_per_strip);
                //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
                $scope.calcGrandTotalEdit();
                return true;
            } else if (elm.cart.options.unit == 'tablet') {
                elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
                elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
                elm.cart.options.price_purchase_per_tablet = elm.cart.options.price_first;
                //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
                $scope.calcGrandTotalEdit();
                return true;
            }
        }
    };

    $scope.validPriceDiscount = function(elm) {
        if (elm.cart.options.price_discount == null | elm.cart.options.price_discount == 0) {
            elm.cart.options.price_discount = 0;
            return elm;
        }
    };

    $scope.validSubtotal = function(elm) {
        elm.cart.options.profit_percent = 0;
        elm.cart.options.profit = 0;
        if (elm.cart.subtotal == null | elm.cart.subtotal == 0) {
            elm.cart.subtotal = 0;
            return elm;
        }
    };

    $scope.calcDiscItem = function(elm) {
        elm.cart.options.profit_percent = 0;
        elm.cart.options.profit = 0;
        $scope.tr_purchases.ppn = 0;
        $scope.check_ppn = false;
        if (elm.cart.options.discount == null | elm.cart.options.discount == 0 | isNaN(elm.cart.options.discount)) {
            elm.cart.options.discount = 0;
            if (elm.cart.options.unit == 'box') {
                elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
                elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
                elm.cart.options.price_purchase_per_box = elm.cart.options.price_first;
                elm.cart.options.price_purchase_per_strip = elm.cart.options.qty_in_strip > 0 ? elm.cart.options.price_first / elm.cart.options.qty_in_strip : 0;
                elm.cart.options.price_purchase_per_tablet = elm.cart.options.qty_in_strip > 0 ? (elm.cart.options.price_first / elm.cart.options.qty_in_strip) / elm.cart.options.qty_in_tablet : elm.cart.options.price_first / elm.cart.options.qty_in_tablet;
                //elm.cart.options.price_sell_per_box = elm.cart.options.price_purchase_per_box + (elm.cart.options.price_purchase_per_box * elm.cart.options.percent_profit_per_box);
                //elm.cart.options.price_sell_per_strip = elm.cart.options.price_purchase_per_strip + (elm.cart.options.price_purchase_per_strip * elm.cart.options.percent_profit_per_strip);
                //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
                //$scope.calcGrandTotalEdit();
                return true;
            } else if (elm.cart.options.unit == 'tablet') {
                elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
                elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
                elm.cart.options.price_purchase_per_tablet = elm.cart.options.price_first;
                //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
                //$scope.calcGrandTotalEdit();
                return true;
            }
		} else if (elm.cart.options.discount == 1.0) {
            //elm.cart.options.discount = 0;
            if (elm.cart.options.unit == 'box') {
                elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * 0)) + ((elm.cart.price - (elm.cart.price * 0)) * elm.cart.options.ppn);
                elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
                elm.cart.options.price_purchase_per_box = elm.cart.options.price_first;
                elm.cart.options.price_purchase_per_strip = elm.cart.options.qty_in_strip > 0 ? elm.cart.options.price_first / elm.cart.options.qty_in_strip : 0;
                elm.cart.options.price_purchase_per_tablet = elm.cart.options.qty_in_strip > 0 ? (elm.cart.options.price_first / elm.cart.options.qty_in_strip) / elm.cart.options.qty_in_tablet : elm.cart.options.price_first / elm.cart.options.qty_in_tablet;
                //elm.cart.options.price_sell_per_box = elm.cart.options.price_purchase_per_box + (elm.cart.options.price_purchase_per_box * elm.cart.options.percent_profit_per_box);
                //elm.cart.options.price_sell_per_strip = elm.cart.options.price_purchase_per_strip + (elm.cart.options.price_purchase_per_strip * elm.cart.options.percent_profit_per_strip);
                //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
                $scope.calcGrandTotalEdit();
                return true;
            } else if (elm.cart.options.unit == 'tablet') {
                elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * 0)) + ((elm.cart.price - (elm.cart.price * 0)) * elm.cart.options.ppn);
                elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
                elm.cart.options.price_purchase_per_tablet = elm.cart.options.price_first;
                //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
                $scope.calcGrandTotalEdit();
                return true;
            }
        } else if (elm.cart.options.discount > 1.01) {
            elm.cart.options.discount = 0;
            if (elm.cart.options.unit == 'box') {
                elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
                elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
                elm.cart.options.price_purchase_per_box = elm.cart.options.price_first;
                elm.cart.options.price_purchase_per_strip = elm.cart.options.qty_in_strip > 0 ? elm.cart.options.price_first / elm.cart.options.qty_in_strip : 0;
                elm.cart.options.price_purchase_per_tablet = elm.cart.options.qty_in_strip > 0 ? (elm.cart.options.price_first / elm.cart.options.qty_in_strip) / elm.cart.options.qty_in_tablet : elm.cart.options.price_first / elm.cart.options.qty_in_tablet;
                //elm.cart.options.price_sell_per_box = elm.cart.options.price_purchase_per_box + (elm.cart.options.price_purchase_per_box * elm.cart.options.percent_profit_per_box);
                //elm.cart.options.price_sell_per_strip = elm.cart.options.price_purchase_per_strip + (elm.cart.options.price_purchase_per_strip * elm.cart.options.percent_profit_per_strip);
                //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
                $scope.calcGrandTotalEdit();
                return true;
            } else if (elm.cart.options.unit == 'tablet') {
                elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
                elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
                elm.cart.options.price_purchase_per_tablet = elm.cart.options.price_first;
                //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
                $scope.calcGrandTotalEdit();
                return true;
            }
        } else if (elm.cart.options.discount > 0) {
            if (elm.cart.options.unit == 'box') {
                elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
                elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
                elm.cart.options.price_purchase_per_box = elm.cart.options.price_first;
                elm.cart.options.price_purchase_per_strip = elm.cart.options.qty_in_strip > 0 ? elm.cart.options.price_first / elm.cart.options.qty_in_strip : 0;
                elm.cart.options.price_purchase_per_tablet = elm.cart.options.qty_in_strip > 0 ? (elm.cart.options.price_first / elm.cart.options.qty_in_strip) / elm.cart.options.qty_in_tablet : elm.cart.options.price_first / elm.cart.options.qty_in_tablet;
                //elm.cart.options.price_sell_per_box = elm.cart.options.price_purchase_per_box + (elm.cart.options.price_purchase_per_box * elm.cart.options.percent_profit_per_box);
                //elm.cart.options.price_sell_per_strip = elm.cart.options.price_purchase_per_strip + (elm.cart.options.price_purchase_per_strip * elm.cart.options.percent_profit_per_strip);
                //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
                $scope.calcGrandTotalEdit();
                return true;
            } else if (elm.cart.options.unit == 'tablet') {
                elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
                elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
                elm.cart.options.price_purchase_per_tablet = elm.cart.options.price_first;
                //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
                $scope.calcGrandTotalEdit();
                return true;
            }
        }
    };

    $scope.calcPricePpn = function(elm) {
        elm.cart.options.profit_percent = 0;
        elm.cart.options.profit = 0;
        if (elm.cart.options.ppn == null | elm.cart.options.ppn == 0 | isNaN(elm.cart.options.ppn)) {
            elm.cart.options.ppn = 0;
            $scope.tr_purchases.ppn = 0;
            elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
            elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
            elm.cart.options.price_purchase_per_box = elm.cart.options.price_first;
            elm.cart.options.price_purchase_per_strip = elm.cart.options.qty_in_strip > 0 ? elm.cart.options.price_first / elm.cart.options.qty_in_strip : 0;
            elm.cart.options.price_purchase_per_tablet = elm.cart.options.qty_in_strip > 0 ? (elm.cart.options.price_first / elm.cart.options.qty_in_strip) / elm.cart.options.qty_in_tablet : elm.cart.options.price_first / elm.cart.options.qty_in_tablet;
            //elm.cart.options.price_sell_per_box = elm.cart.options.price_purchase_per_box + (elm.cart.options.price_purchase_per_box * elm.cart.options.percent_profit_per_box);
            //elm.cart.options.price_sell_per_strip = elm.cart.options.price_purchase_per_strip + (elm.cart.options.price_purchase_per_strip * elm.cart.options.percent_profit_per_strip);
            //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
            $scope.calcGrandTotalEdit();
            return elm;
        } else if (elm.cart.options.ppn > 0.1) {
            elm.cart.options.ppn = 0;
            $scope.tr_purchases.ppn = 0;
            elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
            elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
            elm.cart.options.price_purchase_per_box = elm.cart.options.price_first;
            elm.cart.options.price_purchase_per_strip = elm.cart.options.qty_in_strip > 0 ? elm.cart.options.price_first / elm.cart.options.qty_in_strip : 0;
            elm.cart.options.price_purchase_per_tablet = elm.cart.options.qty_in_strip > 0 ? (elm.cart.options.price_first / elm.cart.options.qty_in_strip) / elm.cart.options.qty_in_tablet : elm.cart.options.price_first / elm.cart.options.qty_in_tablet;
            //elm.cart.options.price_sell_per_box = elm.cart.options.price_purchase_per_box + (elm.cart.options.price_purchase_per_box * elm.cart.options.percent_profit_per_box);
            //elm.cart.options.price_sell_per_strip = elm.cart.options.price_purchase_per_strip + (elm.cart.options.price_purchase_per_strip * elm.cart.options.percent_profit_per_strip);
            //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
            $scope.calcGrandTotalEdit();
        } else if (elm.cart.options.ppn > 0) {
            $scope.tr_purchases.ppn = elm.cart.options.ppn;
            elm.cart.options.price_first = (elm.cart.price - (elm.cart.price * elm.cart.options.discount)) + ((elm.cart.price - (elm.cart.price * elm.cart.options.discount)) * elm.cart.options.ppn);
            elm.cart.options.price_last = elm.cart.options.price_first * elm.cart.qty;
            elm.cart.options.price_purchase_per_box = elm.cart.options.price_first;
            elm.cart.options.price_purchase_per_strip = elm.cart.options.qty_in_strip > 0 ? elm.cart.options.price_first / elm.cart.options.qty_in_strip : 0;
            elm.cart.options.price_purchase_per_tablet = elm.cart.options.qty_in_strip > 0 ? (elm.cart.options.price_first / elm.cart.options.qty_in_strip) / elm.cart.options.qty_in_tablet : elm.cart.options.price_first / elm.cart.options.qty_in_tablet;
            //elm.cart.options.price_sell_per_box = elm.cart.options.price_purchase_per_box + (elm.cart.options.price_purchase_per_box * elm.cart.options.percent_profit_per_box);
            //elm.cart.options.price_sell_per_strip = elm.cart.options.price_purchase_per_strip + (elm.cart.options.price_purchase_per_strip * elm.cart.options.percent_profit_per_strip);
            //elm.cart.options.price_sell_per_tablet = elm.cart.options.price_purchase_per_tablet + (elm.cart.options.price_purchase_per_tablet * elm.cart.options.percent_profit_per_tablet);
            $scope.calcGrandTotalEdit();
        }
    };

    $scope.validPpn = function(elm) {
        if (elm.tr_purchases.ppn == null | elm.tr_purchases.ppn == 0 | isNaN(elm.tr_purchases.ppn)) {
            elm.tr_purchases.ppn = 0;
            $scope.tr_purchases.grand_total = $scope.tr_purchases.price_disc;
            return elm;
        } else {
            $scope.tr_purchases.grand_total = $scope.tr_purchases.price_disc + ($scope.tr_purchases.price_disc * elm.tr_purchases.ppn);
        }
    };

    $scope.validProfitPrice = function(elm) {
        if (elm.cart.options.profit == null | elm.cart.options.profit == 0) {
            elm.cart.options.profit = 0;
            return elm;
        }
    };

    $scope.validProfitPerc = function(elm) {
        if (elm.cart.options.profit_percent == null | elm.cart.options.profit_percent == 0) {
            elm.cart.options.profit_percent = 0;
            elm.cart.options.profit = 0;
            return elm;
        } else if (elm.cart.options.price_sell > 0 && elm.cart.qty > 0 && elm.cart.options.price_discount > 0) {
            elm.cart.options.profit = (elm.cart.subtotal * elm.cart.options.profit_percent) / elm.cart.qty;
            return elm;
        } else {
            toastr.warning('Kolom harga awal, harga akhir dan kuantitas tidak boleh 0', 'Catatan!');
            elm.cart.options.profit_percent = 0;
            elm.cart.options.profit = 0;
            return true;
        }
    };

    $scope.validDiscTotal = function(elm) {
        if (elm.tr_purchases.disc_total == null | elm.tr_purchases.disc_total == 0) {
            elm.tr_purchases.disc_total = 0;
            return elm;
        }
    };

    // Perhitungan QTY dan PRICE
    $scope.calcPurchaseStripTablet = function(elm, event) {
        if (elm.$parent.cart.options.price_purchase_per_box == null | elm.$parent.cart.options.price_purchase_per_box == 0) {
            elm.$parent.cart.options.price_purchase_per_box = 0;
            elm.$parent.cart.options.price_purchase_per_strip = 0;
            elm.$parent.cart.options.price_purchase_per_tablet = 0;

            elm.$parent.cart.options.price_purchase_per_box = parseInt(elm.$parent.cart.options.price_purchase_per_box / elm.$parent.cart.options.qty_in_box);
            // Perhitungan Harga per Strip
            elm.$parent.cart.options.price_purchase_per_strip = parseInt(elm.$parent.cart.options.price_purchase_per_box / elm.$parent.cart.options.qty_in_strip);
            // Perhitungan Harga per Tablet
            elm.$parent.cart.options.price_purchase_per_tablet = parseInt(elm.$parent.cart.options.price_purchase_per_strip / elm.$parent.cart.options.qty_in_tablet);

            //elm.$parent.cart.options.price_sell_per_box = parseInt(elm.$parent.cart.options.price_purchase_per_box) + (parseInt(elm.$parent.cart.options.price_purchase_per_box * elm.$parent.cart.options.percent_profit_per_box));
            //elm.$parent.cart.options.price_sell_per_strip = parseInt(elm.$parent.cart.options.price_purchase_per_strip) + (parseInt(elm.$parent.cart.options.price_purchase_per_strip * elm.$parent.cart.options.percent_profit_per_strip));
            //elm.$parent.cart.options.price_sell_per_tablet = parseInt(elm.$parent.cart.options.price_purchase_per_tablet) + (parseInt(elm.$parent.cart.options.price_purchase_per_tablet * elm.$parent.cart.options.percent_profit_per_tablet));
        } else if (elm.$parent.cart.options.qty_in_box > 0 && elm.$parent.cart.options.qty_in_strip > 0 && elm.$parent.cart.options.qty_in_tablet > 0) {
            // Perhitungan Harga per Box
            elm.$parent.cart.options.price_purchase_per_box = parseInt(elm.$parent.cart.options.price_purchase_per_box / elm.$parent.cart.options.qty_in_box);
            // Perhitungan Harga per Strip
            elm.$parent.cart.options.price_purchase_per_strip = parseInt(elm.$parent.cart.options.price_purchase_per_box / elm.$parent.cart.options.qty_in_strip);
            // Perhitungan Harga per Tablet
            elm.$parent.cart.options.price_purchase_per_tablet = parseInt(elm.$parent.cart.options.price_purchase_per_strip / elm.$parent.cart.options.qty_in_tablet);

            //elm.$parent.cart.options.price_sell_per_box = parseInt(elm.$parent.cart.options.price_purchase_per_box) + (parseInt(elm.$parent.cart.options.price_purchase_per_box * elm.$parent.cart.options.percent_profit_per_box));
            //elm.$parent.cart.options.price_sell_per_strip = parseInt(elm.$parent.cart.options.price_purchase_per_strip) + (parseInt(elm.$parent.cart.options.price_purchase_per_strip * elm.$parent.cart.options.percent_profit_per_strip));
            //elm.$parent.cart.options.price_sell_per_tablet = parseInt(elm.$parent.cart.options.price_purchase_per_tablet) + (parseInt(elm.$parent.cart.options.price_purchase_per_tablet * elm.$parent.cart.options.percent_profit_per_tablet));

        }
    }

    $scope.calcSellStripTablet = function(elm, event) {
        if (elm.$parent.cart.options.price_sell_per_box == null | elm.$parent.cart.options.price_sell_per_box == 0 | elm.$parent.cart.options.price_purchases_per_box > elm.$parent.cart.options.price_sell_per_box) {
            elm.$parent.cart.options.price_sell_per_box = parseInt(elm.$parent.cart.options.price_purchase_per_box) + (parseInt(elm.$parent.cart.options.price_purchase_per_box * elm.$parent.cart.options.percent_profit_per_box));
            elm.$parent.cart.options.price_sell_per_strip = parseInt(elm.$parent.cart.options.price_purchase_per_strip) + (parseInt(elm.$parent.cart.options.price_purchase_per_strip * elm.$parent.cart.options.percent_profit_per_strip));
            elm.$parent.cart.options.price_sell_per_tablet = parseInt(elm.$parent.cart.options.price_purchase_per_tablet) + (parseInt(elm.$parent.cart.options.price_purchase_per_tablet * elm.$parent.cart.options.percent_profit_per_tablet));
            return true;
        } else if (elm.$parent.cart.options.qty_in_box > 0 && elm.$parent.cart.options.qty_in_strip > 0 && elm.$parent.cart.options.qty_in_tablet > 0) {
            // Perhitungan Harga per Box
            //elm.$parent.cart.options.price_sell_per_box = parseInt(elm.$parent.cart.options.price_sell_per_box / elm.$parent.cart.options.qty_in_box);
            // Perhitungan Harga per Strip
            //elm.$parent.cart.options.price_sell_per_strip = parseInt(elm.$parent.cart.options.price_sell_per_box / elm.$parent.cart.options.qty_in_strip);
            // Perhitungan Harga per Tablet
            //elm.$parent.cart.options.price_sell_per_tablet = parseInt(elm.$parent.cart.options.price_sell_per_strip / elm.$parent.cart.options.qty_in_tablet);

            //elm.$parent.cart.options.price_sell_per_box = parseInt(elm.$parent.cart.options.price_sell_per_box) + (parseInt(elm.$parent.cart.options.price_sell_per_box * elm.$parent.cart.options.percent_profit_per_box));
            //elm.$parent.cart.options.price_sell_per_strip = parseInt(elm.$parent.cart.options.price_sell_per_strip) + (parseInt(elm.$parent.cart.options.price_sell_per_strip * elm.$parent.cart.options.percent_profit_per_strip));
            //elm.$parent.cart.options.price_sell_per_tablet = parseInt(elm.$parent.cart.options.price_sell_per_tablet) + (parseInt(elm.$parent.cart.options.price_sell_per_tablet * elm.$parent.cart.options.percent_profit_per_tablet));

        }
    }

    $scope.calcQtyTotal = function(elm, event) {
        if (elm.$parent.cart.options.qty_in_tablet == null | elm.$parent.cart.options.qty_in_tablet == 0) {
            elm.$parent.cart.options.qty_in_tablet = 0;
        }
        // Perhitungan Harga per Strip
        var qty_in_strip = elm.$parent.cart.options.qty_in_strip;
        var qty_in_tablet = elm.$parent.cart.options.qty_in_tablet;
        elm.$parent.cart.options.qty_total = qty_in_strip * qty_in_tablet;
    }

    $scope.validQtyInBox = function(elm, event) {
        if (elm.$parent.cart.options.qty_in_box == null | elm.$parent.cart.options.qty_in_box == 0) {
            elm.$parent.cart.options.qty_in_box = 0;
        }
    };

    $scope.validQtyInStrip = function(elm, event) {
        if (elm.$parent.cart.options.qty_in_strip == null | elm.$parent.cart.options.qty_in_strip == 0) {
            elm.$parent.cart.options.qty_in_strip = 0;
        }
    };

    $scope.validPricePurchaseBox = function(elm, event) {
        if (elm.$parent.cart.options.price_purchase_per_box == null | elm.$parent.cart.options.price_purchase_per_box == 0) {
            elm.$parent.cart.options.price_purchase_per_box = 0;
        }
    };

    $scope.validPricePurchaseStrip = function(elm, event) {
        if (elm.$parent.cart.options.price_purchase_per_strip == null | elm.$parent.cart.options.price_purchase_per_strip == 0) {
            elm.$parent.cart.options.price_purchase_per_strip = 0;
        }
    };

    $scope.validPricePurchaseTablet = function(elm, event) {
        if (elm.$parent.cart.options.price_purchase_per_tablet == null | elm.$parent.cart.options.price_purchase_per_tablet == 0) {
            elm.$parent.cart.options.price_purchase_per_tablet = 0;
        }
    };

    $scope.validPriceSellBox = function(elm, event) {
        if (elm.$parent.cart.options.price_sell_per_box == null | elm.$parent.cart.options.price_sell_per_box == 0) {
            elm.$parent.cart.options.price_sell_per_box = 0;
        }
    };

    $scope.validPriceSellStrip = function(elm, event) {
        if (elm.$parent.cart.options.price_sell_per_strip == null | elm.$parent.cart.options.price_sell_per_strip == 0) {
            elm.$parent.cart.options.price_sell_per_strip = 0;
        }
    };

    $scope.validPriceSellTablet = function(elm, event) {
        if (elm.$parent.cart.options.price_sell_per_tablet == null | elm.$parent.cart.options.price_sell_per_tablet == 0) {
            elm.$parent.cart.options.price_sell_per_tablet = 0;
        }
    };

    $scope.calcProfitBox = function(elm, event) {

        if (elm.$parent.cart.options.percent_profit_per_box == null | elm.$parent.cart.options.percent_profit_per_box == 0 | isNaN(elm.$parent.cart.options.percent_profit_per_box)) {
            elm.$parent.cart.options.percent_profit_per_box = 0;
            elm.$parent.cart.options.percent_profit_per_strip = 0;
            elm.$parent.cart.options.percent_profit_per_tablet = 0;
            //elm.$parent.cart.options.price_sell_per_box = parseInt(elm.$parent.cart.options.price_purchase_per_box) + (parseInt(elm.$parent.cart.options.price_purchase_per_box * elm.$parent.cart.options.percent_profit_per_box));
            //elm.$parent.cart.options.price_sell_per_strip = parseInt(elm.$parent.cart.options.price_purchase_per_strip) + (parseInt(elm.$parent.cart.options.price_purchase_per_strip * elm.$parent.cart.options.percent_profit_per_strip));
            //elm.$parent.cart.options.price_sell_per_tablet = parseInt(elm.$parent.cart.options.price_purchase_per_tablet) + (parseInt(elm.$parent.cart.options.price_purchase_per_tablet * elm.$parent.cart.options.percent_profit_per_tablet));
            return true;
        } else if (elm.$parent.cart.options.percent_profit_per_box > 0.00) {
            elm.$parent.cart.options.percent_profit_per_strip = elm.$parent.cart.options.percent_profit_per_box;
            elm.$parent.cart.options.percent_profit_per_tablet = elm.$parent.cart.options.percent_profit_per_box;
            //elm.$parent.cart.options.price_sell_per_box = parseInt(elm.$parent.cart.options.price_purchase_per_box) + (parseInt(elm.$parent.cart.options.price_purchase_per_box * elm.$parent.cart.options.percent_profit_per_box));
            //elm.$parent.cart.options.price_sell_per_strip = parseInt(elm.$parent.cart.options.price_purchase_per_strip) + (parseInt(elm.$parent.cart.options.price_purchase_per_strip * elm.$parent.cart.options.percent_profit_per_strip));
            //elm.$parent.cart.options.price_sell_per_tablet = parseInt(elm.$parent.cart.options.price_purchase_per_tablet) + (parseInt(elm.$parent.cart.options.price_purchase_per_tablet * elm.$parent.cart.options.percent_profit_per_tablet));
            return true;
        }
    }

    $scope.calcProfitStrip = function(elm, event) {
        if (elm.$parent.cart.options.percent_profit_per_strip == null | elm.$parent.cart.options.percent_profit_per_strip == 0 | isNaN(elm.$parent.cart.options.percent_profit_per_strip)) {
            elm.$parent.cart.options.percent_profit_per_strip = 0;
            //elm.$parent.cart.options.price_sell_per_strip = parseInt(elm.$parent.cart.options.price_purchase_per_strip) + (parseInt(elm.$parent.cart.options.price_purchase_per_strip * elm.$parent.cart.options.percent_profit_per_strip));
            return true;
        } else if (elm.$parent.cart.options.percent_profit_per_strip > 0.0) {
            //elm.$parent.cart.options.price_sell_per_strip = parseInt(elm.$parent.cart.options.price_purchase_per_strip) + (parseInt(elm.$parent.cart.options.price_purchase_per_strip * elm.$parent.cart.options.percent_profit_per_strip));
            return true;
        }
    }

    $scope.calcProfitTablet = function(elm, event) {
        if (elm.$parent.cart.options.percent_profit_per_tablet == null | elm.$parent.cart.options.percent_profit_per_tablet == 0 | isNaN(elm.$parent.cart.options.percent_profit_per_tablet)) {
            elm.$parent.cart.options.percent_profit_per_tablet = 0;
            //elm.$parent.cart.options.price_sell_per_tablet = parseInt(elm.$parent.cart.options.price_purchase_per_tablet) + (parseInt(elm.$parent.cart.options.price_purchase_per_tablet * elm.$parent.cart.options.percent_profit_per_tablet));
            return true;
        } else if (elm.$parent.cart.options.percent_profit_per_tablet > 0.0) {
            //elm.$parent.cart.options.price_sell_per_tablet = parseInt(elm.$parent.cart.options.price_purchase_per_tablet) + (parseInt(elm.$parent.cart.options.price_purchase_per_tablet * elm.$parent.cart.options.percent_profit_per_tablet));
            return true;
        }
    }

    $scope.calcDiscTotal = function(elm) {
        $scope.check_ppn = false;
        $scope.tr_purchases.ppn = 0;
        if (elm.tr_purchases.disc_total == null | elm.tr_purchases.disc_total == 0 | elm.tr_purchases.disc_total > elm.tr_purchases.grand_total) {
            elm.tr_purchases.disc_total = 0;
            $scope.calcGrandTotalEdit();
            return elm;
        } else if (elm.tr_purchases.disc_total > 0) {
            $scope.tr_purchases.price_disc = $scope.tr_purchases.total_price - elm.tr_purchases.disc_total;
            $scope.tr_purchases.grand_total = $scope.tr_purchases.total_price - elm.tr_purchases.disc_total;
        }
    }

    //##################################//
    //    PERHITUNGAN PEMBELIAN EDIT    //
    //##################################//
    $scope.calcQtyEdit = function(elm) {
        elm.tr_purchases_cart.profit_percent = 0;
        elm.tr_purchases_cart.profit = 0;
        $scope.tr_purchases.ppn = 0;
        $scope.check_ppn = false;
        if (elm.tr_purchases_cart.qty == null | elm.tr_purchases_cart.qty == 0) {
            elm.tr_purchases_cart.qty = 1;
            elm.tr_purchases_cart.price_last = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.qty;
            $scope.calcGrandTotalEdit();
            return true;
        } else if (elm.tr_purchases_cart.qty > 0) {
            elm.tr_purchases_cart.price_last = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.qty;
            $scope.calcGrandTotalEdit();
            return true;
        }
    };

    $scope.calcPriceItemEdit = function(elm) {
        elm.tr_purchases_cart.discount = 0;
        $scope.tr_purchases.ppn = 0;
        elm.tr_purchases_cart.ppn = $scope.tr_purchases.ppn;
        $scope.check_ppn = false;
        if (elm.tr_purchases_cart.price == null | elm.tr_purchases_cart.price == 0) {
            elm.tr_purchases_cart.price = 0;
            elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
            elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
            elm.tr_purchases_cart.percent_profit_per_box = elm.tr_purchases_cart.temp_percent_profit_per_box;
            elm.tr_purchases_cart.percent_profit_per_strip = elm.tr_purchases_cart.temp_percent_profit_per_strip;
            elm.tr_purchases_cart.percent_profit_per_tablet = elm.tr_purchases_cart.temp_percent_profit_per_tablet;
            elm.tr_purchases_cart.price_purchase_per_box = elm.tr_purchases_cart.temp_price_purchase_per_box;
            elm.tr_purchases_cart.price_purchase_per_strip = elm.tr_purchases_cart.temp_price_purchase_per_strip;
            elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.temp_price_purchase_per_tablet;
            $scope.calcGrandTotalEdit();
            return true;
            if (elm.tr_purchases_cart.unit == 'box') {
                elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
                elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
                elm.tr_purchases_cart.price_purchase_per_box = elm.tr_purchases_cart.price_first;
                elm.tr_purchases_cart.price_purchase_per_strip = elm.tr_purchases_cart.qty_in_strip > 0 ? elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip : 0;
                elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.qty_in_strip > 0 ? (elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip) / elm.tr_purchases_cart.qty_in_tablet : elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_tablet;
                $scope.calcGrandTotalEdit();
                return true;
            } else if (elm.tr_purchases_cart.unit == 'tablet') {
                elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
                elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
                elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.price_first;
                $scope.calcGrandTotalEdit();
                return true;
            }
        } else if (elm.tr_purchases_cart.price > 0) {
            if (elm.tr_purchases_cart.unit == 'box') {
                elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
                elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
                elm.tr_purchases_cart.price_purchase_per_box = elm.tr_purchases_cart.price_first;
                elm.tr_purchases_cart.price_purchase_per_strip = elm.tr_purchases_cart.qty_in_strip > 0 ? elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip : 0;
                elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.qty_in_strip > 0 ? (elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip) / elm.tr_purchases_cart.qty_in_tablet : elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_tablet;
                $scope.calcGrandTotalEdit();
                return true;
            } else if (elm.tr_purchases_cart.unit == 'tablet') {
                elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
                elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
                elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.price_first;
                $scope.calcGrandTotalEdit();
                return true;
            }
        }
    };

    $scope.validPriceDiscountEdit = function(elm) {
        if (elm.tr_purchases_cart.price_discount == null | elm.tr_purchases_cart.price_discount == 0) {
            elm.tr_purchases_cart.price_discount = 0;
            return elm;
        }
    };

    $scope.validSubtotalEdit = function(elm) {
        elm.tr_purchases_cart.profit_percent = 0;
        elm.tr_purchases_cart.profit = 0;
        if (elm.tr_purchases_cart.subtotal == null | elm.tr_purchases_cart.subtotal == 0) {
            elm.tr_purchases_cart.subtotal = 0;
            return elm;
        }
    };

    $scope.calcDiscItemEdit = function(elm) {
        elm.tr_purchases_cart.profit_percent = 0;
        elm.tr_purchases_cart.profit = 0;
        $scope.tr_purchases.ppn = 0;
        elm.tr_purchases_cart.ppn = $scope.tr_purchases.ppn;
        $scope.check_ppn = false;
        if (elm.tr_purchases_cart.discount == null | elm.tr_purchases_cart.discount == 0 | isNaN(elm.tr_purchases_cart.discount)) {
            elm.tr_purchases_cart.discount = 0;
            if (elm.tr_purchases_cart.unit == 'box') {
                elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
                elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
                elm.tr_purchases_cart.price_purchase_per_box = elm.tr_purchases_cart.price_first;
                elm.tr_purchases_cart.price_purchase_per_strip = elm.tr_purchases_cart.qty_in_strip > 0 ? elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip : 0;
                elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.qty_in_strip > 0 ? (elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip) / elm.tr_purchases_cart.qty_in_tablet : elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_tablet;
                return true;
            } else if (elm.tr_purchases_cart.unit == 'tablet') {
                elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
                elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
                elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.price_first;
                return true;
            }
        } else if (elm.tr_purchases_cart.discount == 1.0) {
            if (elm.tr_purchases_cart.unit == 'box') {
                elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * 0)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * 0)) * elm.tr_purchases_cart.ppn);
                elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
                elm.tr_purchases_cart.price_purchase_per_box = elm.tr_purchases_cart.price_first;
                elm.tr_purchases_cart.price_purchase_per_strip = elm.tr_purchases_cart.qty_in_strip > 0 ? elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip : 0;
                elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.qty_in_strip > 0 ? (elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip) / elm.tr_purchases_cart.qty_in_tablet : elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_tablet;
                $scope.calcGrandTotalEdit();
                return true;
            } else if (elm.tr_purchases_cart.unit == 'tablet') {
                elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * 0)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * 0)) * elm.tr_purchases_cart.ppn);
                elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
                elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.price_first;
                $scope.calcGrandTotalEdit();
                return true;
            }
        } else if (elm.tr_purchases_cart.discount > 1.01) {
            elm.tr_purchases_cart.discount = 0;
            if (elm.tr_purchases_cart.unit == 'box') {
                elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
                elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
                elm.tr_purchases_cart.price_purchase_per_box = elm.tr_purchases_cart.price_first;
                elm.tr_purchases_cart.price_purchase_per_strip = elm.tr_purchases_cart.qty_in_strip > 0 ? elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip : 0;
                elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.qty_in_strip > 0 ? (elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip) / elm.tr_purchases_cart.qty_in_tablet : elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_tablet;
                $scope.calcGrandTotalEdit();
                return true;
            } else if (elm.tr_purchases_cart.unit == 'tablet') {
                elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
                elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
                elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.price_first;
                $scope.calcGrandTotalEdit();
                return true;
            }
        } else if (elm.tr_purchases_cart.discount > 0) {
            if (elm.tr_purchases_cart.unit == 'box') {
                elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
                elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
                elm.tr_purchases_cart.price_purchase_per_box = elm.tr_purchases_cart.price_first;
                elm.tr_purchases_cart.price_purchase_per_strip = elm.tr_purchases_cart.qty_in_strip > 0 ? elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip : 0;
                elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.qty_in_strip > 0 ? (elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip) / elm.tr_purchases_cart.qty_in_tablet : elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_tablet;
                $scope.calcGrandTotalEdit();
                return true;
            } else if (elm.tr_purchases_cart.unit == 'tablet') {
                elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
                elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
                elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.price_first;
                $scope.calcGrandTotalEdit();
                return true;
            }
        }
    };

    $scope.calcPricePpnEdit = function(elm) {
        elm.tr_purchases_cart.profit_percent = 0;
        elm.tr_purchases_cart.profit = 0;
        if (elm.tr_purchases_cart.ppn == null | elm.tr_purchases_cart.ppn == 0 | isNaN(elm.tr_purchases_cart.ppn)) {
            elm.tr_purchases_cart.ppn = 0;
            $scope.tr_purchases.ppn = 0;
            elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
            elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
            elm.tr_purchases_cart.price_purchase_per_box = elm.tr_purchases_cart.price_first;
            elm.tr_purchases_cart.price_purchase_per_strip = elm.tr_purchases_cart.qty_in_strip > 0 ? elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip : 0;
            elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.qty_in_strip > 0 ? (elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip) / elm.tr_purchases_cart.qty_in_tablet : elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_tablet;
            $scope.calcGrandTotalEdit();
            return elm;
        } else if (elm.tr_purchases_cart.ppn > 0.1) {
            elm.tr_purchases_cart.ppn = 0;
            $scope.tr_purchases.ppn = 0;
            elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
            elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
            elm.tr_purchases_cart.price_purchase_per_box = elm.tr_purchases_cart.price_first;
            elm.tr_purchases_cart.price_purchase_per_strip = elm.tr_purchases_cart.qty_in_strip > 0 ? elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip : 0;
            elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.qty_in_strip > 0 ? (elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip) / elm.tr_purchases_cart.qty_in_tablet : elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_tablet;
            $scope.calcGrandTotalEdit();
        } else if (elm.tr_purchases_cart.ppn > 0) {
            $scope.tr_purchases.ppn = elm.tr_purchases_cart.ppn;
            elm.tr_purchases_cart.price_first = (elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) + ((elm.tr_purchases_cart.price - (elm.tr_purchases_cart.price * elm.tr_purchases_cart.discount)) * elm.tr_purchases_cart.ppn);
            elm.tr_purchases_cart.price_last = elm.tr_purchases_cart.price_first * elm.tr_purchases_cart.qty;
            elm.tr_purchases_cart.price_purchase_per_box = elm.tr_purchases_cart.price_first;
            elm.tr_purchases_cart.price_purchase_per_strip = elm.tr_purchases_cart.qty_in_strip > 0 ? elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip : 0;
            elm.tr_purchases_cart.price_purchase_per_tablet = elm.tr_purchases_cart.qty_in_strip > 0 ? (elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_strip) / elm.tr_purchases_cart.qty_in_tablet : elm.tr_purchases_cart.price_first / elm.tr_purchases_cart.qty_in_tablet;
            $scope.calcGrandTotalEdit();
        }
    };

    $scope.validPpnEdit = function(elm) {
        if (elm.tr_purchases.ppn == null | elm.tr_purchases.ppn == 0 | isNaN(elm.tr_purchases.ppn)) {
            elm.tr_purchases.ppn = 0;
            $scope.tr_purchases.grand_total = $scope.tr_purchases.price_disc;
            return elm;
        } else {
            $scope.tr_purchases.grand_total = $scope.tr_purchases.price_disc + ($scope.tr_purchases.price_disc * elm.tr_purchases.ppn);
        }
    };

    $scope.validProfitPriceEdit = function(elm) {
        if (elm.tr_purchases_cart.profit == null | elm.tr_purchases_cart.profit == 0) {
            elm.tr_purchases_cart.profit = 0;
            return elm;
        }
    };

    $scope.validProfitPercEdit = function(elm) {
        if (elm.tr_purchases_cart.profit_percent == null | elm.tr_purchases_cart.profit_percent == 0) {
            elm.tr_purchases_cart.profit_percent = 0;
            elm.tr_purchases_cart.profit = 0;
            return elm;
        } else if (elm.tr_purchases_cart.price_sell > 0 && elm.tr_purchases_cart.qty > 0 && elm.tr_purchases_cart.price_discount > 0) {
            elm.tr_purchases_cart.profit = (elm.tr_purchases_cart.subtotal * elm.tr_purchases_cart.profit_percent) / elm.tr_purchases_cart.qty;
            return elm;
        } else {
            toastr.warning('Kolom harga awal, harga akhir dan kuantitas tidak boleh 0', 'Catatan!');
            elm.tr_purchases_cart.profit_percent = 0;
            elm.tr_purchases_cart.profit = 0;
            return true;
        }
    };

    $scope.validDiscTotalEdit = function(elm) {
        if (elm.tr_purchases.disc_total == null | elm.tr_purchases.disc_total == 0) {
            elm.tr_purchases.disc_total = 0;
            return elm;
        }
    };

    // Perhitungan QTY dan PRICE
    $scope.calcPurchaseStripTabletEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.price_purchase_per_box == null | elm.$parent.tr_purchases_cart.price_purchase_per_box == 0) {
            elm.$parent.tr_purchases_cart.price_purchase_per_box = 0;
            elm.$parent.tr_purchases_cart.price_purchase_per_strip = 0;
            elm.$parent.tr_purchases_cart.price_purchase_per_tablet = 0;

            elm.$parent.tr_purchases_cart.price_purchase_per_box = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_box / elm.$parent.tr_purchases_cart.qty_in_box);
            // Perhitungan Harga per Strip
            elm.$parent.tr_purchases_cart.price_purchase_per_strip = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_box / elm.$parent.tr_purchases_cart.qty_in_strip);
            // Perhitungan Harga per Tablet
            elm.$parent.tr_purchases_cart.price_purchase_per_tablet = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_strip / elm.$parent.tr_purchases_cart.qty_in_tablet);
        } else if (elm.$parent.tr_purchases_cart.qty_in_box > 0 && elm.$parent.tr_purchases_cart.qty_in_strip > 0 && elm.$parent.tr_purchases_cart.qty_in_tablet > 0) {
            // Perhitungan Harga per Box
            elm.$parent.tr_purchases_cart.price_purchase_per_box = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_box / elm.$parent.tr_purchases_cart.qty_in_box);
            // Perhitungan Harga per Strip
            elm.$parent.tr_purchases_cart.price_purchase_per_strip = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_box / elm.$parent.tr_purchases_cart.qty_in_strip);
            // Perhitungan Harga per Tablet
            elm.$parent.tr_purchases_cart.price_purchase_per_tablet = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_strip / elm.$parent.tr_purchases_cart.qty_in_tablet);
        }
    }

    $scope.calcSellStripTabletEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.price_sell_per_box == null | elm.$parent.tr_purchases_cart.price_sell_per_box == 0 | elm.$parent.tr_purchases_cart.price_purchases_per_box > elm.$parent.tr_purchases_cart.price_sell_per_box) {
            elm.$parent.tr_purchases_cart.price_sell_per_box = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_box) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_box * elm.$parent.tr_purchases_cart.percent_profit_per_box));
            elm.$parent.tr_purchases_cart.price_sell_per_strip = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_strip) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_strip * elm.$parent.tr_purchases_cart.percent_profit_per_strip));
            elm.$parent.tr_purchases_cart.price_sell_per_tablet = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_tablet) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_tablet * elm.$parent.tr_purchases_cart.percent_profit_per_tablet));
            return true;
        } else if (elm.$parent.tr_purchases_cart.qty_in_box > 0 && elm.$parent.tr_purchases_cart.qty_in_strip > 0 && elm.$parent.tr_purchases_cart.qty_in_tablet > 0) {
            // Perhitungan Harga per Box
            //elm.$parent.tr_purchases_cart.price_sell_per_box = parseInt(elm.$parent.tr_purchases_cart.price_sell_per_box / elm.$parent.tr_purchases_cart.qty_in_box);
            // Perhitungan Harga per Strip
            //elm.$parent.tr_purchases_cart.price_sell_per_strip = parseInt(elm.$parent.tr_purchases_cart.price_sell_per_box / elm.$parent.tr_purchases_cart.qty_in_strip);
            // Perhitungan Harga per Tablet
            //elm.$parent.tr_purchases_cart.price_sell_per_tablet = parseInt(elm.$parent.tr_purchases_cart.price_sell_per_strip / elm.$parent.tr_purchases_cart.qty_in_tablet);
        }
    }

    $scope.calcQtyTotalEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.qty_in_tablet == null | elm.$parent.tr_purchases_cart.qty_in_tablet == 0) {
            elm.$parent.tr_purchases_cart.qty_in_tablet = 0;
        }
        // Perhitungan Harga per Strip
        var qty_in_strip = elm.$parent.tr_purchases_cart.qty_in_strip;
        var qty_in_tablet = elm.$parent.tr_purchases_cart.qty_in_tablet;
        elm.$parent.tr_purchases_cart.qty_total = qty_in_strip * qty_in_tablet;
    }

    $scope.validQtyInBoxEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.qty_in_box == null | elm.$parent.tr_purchases_cart.qty_in_box == 0) {
            elm.$parent.tr_purchases_cart.qty_in_box = 0;
        }
    };

    $scope.validQtyInStripEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.qty_in_strip == null | elm.$parent.tr_purchases_cart.qty_in_strip == 0) {
            elm.$parent.tr_purchases_cart.qty_in_strip = 0;
        }
    };

    $scope.validPricePurchaseBoxEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.price_purchase_per_box == null | elm.$parent.tr_purchases_cart.price_purchase_per_box == 0) {
            elm.$parent.tr_purchases_cart.price_purchase_per_box = 0;
        }
    };

    $scope.validPricePurchaseStripEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.price_purchase_per_strip == null | elm.$parent.tr_purchases_cart.price_purchase_per_strip == 0) {
            elm.$parent.tr_purchases_cart.price_purchase_per_strip = 0;
        }
    };

    $scope.validPricePurchaseTabletEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.price_purchase_per_tablet == null | elm.$parent.tr_purchases_cart.price_purchase_per_tablet == 0) {
            elm.$parent.tr_purchases_cart.price_purchase_per_tablet = 0;
        }
    };

    $scope.validPriceSellBoxEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.price_sell_per_box == null | elm.$parent.tr_purchases_cart.price_sell_per_box == 0) {
            elm.$parent.tr_purchases_cart.price_sell_per_box = 0;
        }
    };

    $scope.validPriceSellStripEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.price_sell_per_strip == null | elm.$parent.tr_purchases_cart.price_sell_per_strip == 0) {
            elm.$parent.tr_purchases_cart.price_sell_per_strip = 0;
        }
    };

    $scope.validPriceSellTabletEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.price_sell_per_tablet == null | elm.$parent.tr_purchases_cart.price_sell_per_tablet == 0) {
            elm.$parent.tr_purchases_cart.price_sell_per_tablet = 0;
        }
    };

    $scope.calcProfitBoxEdit = function(elm, event) {

        if (elm.$parent.tr_purchases_cart.percent_profit_per_box == null | elm.$parent.tr_purchases_cart.percent_profit_per_box == 0 | isNaN(elm.$parent.tr_purchases_cart.percent_profit_per_box)) {
            elm.$parent.tr_purchases_cart.percent_profit_per_box = 0;
            elm.$parent.tr_purchases_cart.percent_profit_per_strip = 0;
            elm.$parent.tr_purchases_cart.percent_profit_per_tablet = 0;
            //elm.$parent.tr_purchases_cart.price_sell_per_box = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_box) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_box * elm.$parent.tr_purchases_cart.percent_profit_per_box));
            //elm.$parent.tr_purchases_cart.price_sell_per_strip = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_strip) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_strip * elm.$parent.tr_purchases_cart.percent_profit_per_strip));
            //elm.$parent.tr_purchases_cart.price_sell_per_tablet = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_tablet) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_tablet * elm.$parent.tr_purchases_cart.percent_profit_per_tablet));
            return true;
        } else if (elm.$parent.tr_purchases_cart.percent_profit_per_box > 0.00) {
            elm.$parent.tr_purchases_cart.percent_profit_per_strip = elm.$parent.tr_purchases_cart.percent_profit_per_box;
            elm.$parent.tr_purchases_cart.percent_profit_per_tablet = elm.$parent.tr_purchases_cart.percent_profit_per_box;
            //elm.$parent.tr_purchases_cart.price_sell_per_box = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_box) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_box * elm.$parent.tr_purchases_cart.percent_profit_per_box));
            //elm.$parent.tr_purchases_cart.price_sell_per_strip = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_strip) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_strip * elm.$parent.tr_purchases_cart.percent_profit_per_strip));
            //elm.$parent.tr_purchases_cart.price_sell_per_tablet = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_tablet) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_tablet * elm.$parent.tr_purchases_cart.percent_profit_per_tablet));
            return true;
        }
    }

    $scope.calcProfitStripEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.percent_profit_per_strip == null | elm.$parent.tr_purchases_cart.percent_profit_per_strip == 0 | isNaN(elm.$parent.tr_purchases_cart.percent_profit_per_strip)) {
            elm.$parent.tr_purchases_cart.percent_profit_per_strip = 0;
            //elm.$parent.tr_purchases_cart.price_sell_per_strip = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_strip) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_strip * elm.$parent.tr_purchases_cart.percent_profit_per_strip));
            return true;
        } else if (elm.$parent.tr_purchases_cart.percent_profit_per_strip > 0.0) {
            //elm.$parent.tr_purchases_cart.price_sell_per_strip = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_strip) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_strip * elm.$parent.tr_purchases_cart.percent_profit_per_strip));
            return true;
        }
    }

    $scope.calcProfitTabletEdit = function(elm, event) {
        if (elm.$parent.tr_purchases_cart.percent_profit_per_tablet == null | elm.$parent.tr_purchases_cart.percent_profit_per_tablet == 0 | isNaN(elm.$parent.tr_purchases_cart.percent_profit_per_tablet)) {
            elm.$parent.tr_purchases_cart.percent_profit_per_tablet = 0;
            //elm.$parent.tr_purchases_cart.price_sell_per_tablet = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_tablet) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_tablet * elm.$parent.tr_purchases_cart.percent_profit_per_tablet));
            return true;
        } else if (elm.$parent.tr_purchases_cart.percent_profit_per_tablet > 0.0) {
            //elm.$parent.tr_purchases_cart.price_sell_per_tablet = parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_tablet) + (parseInt(elm.$parent.tr_purchases_cart.price_purchase_per_tablet * elm.$parent.tr_purchases_cart.percent_profit_per_tablet));
            return true;
        }
    }

    $scope.calcGrandTotalEdit = function(elm) {
        var total_price = 0;
        var total_price_cart = 0;
        var grand_total = 0;
        var grand_total_cart = 0;
        $scope.cart_sales = [];
        $scope.cart_edit = [];
        var index = 0;

        angular.forEach($scope.tr_purchases_detail, function(val, key) {
            total_price += (val.price - (val.price * val.discount)) * val.qty;
            grand_total += val.price_last;
            $scope.cart_edit[index] = val;
            index += 1;
        });

        angular.forEach($scope.data_cart, function(val, key) {
            total_price_cart += (val.price - (val.price * val.options.discount)) * val.qty;
            grand_total_cart += val.options.price_last;
            $scope.cart_sales[index] = val;
            index += 1;
        });

        if (total_price_cart > 0) {
            $scope.tr_purchases.total_price = total_price + total_price_cart;
            $scope.tr_purchases.price_disc = grand_total + grand_total_cart;
            $scope.tr_purchases.grand_total = ((total_price + total_price_cart) - $scope.tr_purchases.disc_total) + $scope.tr_purchases.ppn;
            return
        } else {
            var total_price_cart = 0;
            $scope.tr_purchases.total_price = total_price + total_price_cart;
            $scope.tr_purchases.price_disc = grand_total + grand_total_cart;
            $scope.tr_purchases.grand_total = ((total_price + total_price_cart) - $scope.tr_purchases.disc_total) + $scope.tr_purchases.ppn;
        }
    }

    $scope.calcDiscTotalEdit = function(elm) {
        $scope.check_ppn = false;
        $scope.tr_purchases.ppn = 0;
        elm.tr_purchases_cart.ppn = $scope.tr_purchases.ppn;
        if (elm.tr_purchases.disc_total == null | elm.tr_purchases.disc_total == 0 | elm.tr_purchases.disc_total > elm.tr_purchases.grand_total) {
            elm.tr_purchases.disc_total = 0;
            $scope.calcGrandTotalEdit();
            return elm;
        } else if (elm.tr_purchases.disc_total > 0) {
            $scope.tr_purchases.price_disc = $scope.tr_purchases.total_price - elm.tr_purchases.disc_total;
            $scope.tr_purchases.grand_total = $scope.tr_purchases.total_price - elm.tr_purchases.disc_total;
        }
    }
    //##############################//
    // PENCARIAN MANUAL DATA BARANG //
    //##############################//
    $scope.searchItem = function(typo, response) {
        itemFactory.searchItemManual({
            typo: typo.term
        }).then(function() {
            $scope.data_item = itemFactory.resSearchItem;
            if ($scope.data_item.length > 0) {
                response($scope.data_item);
            } else {
                response([{id: "0", name: "Maaf, data tidak ditemukan"}]);
            }
        });
    };

    //##############################//
    //      PENCARIAN SUPPLIER      //
    //##############################//
    $scope.searchSupplier = function(typo, response) {
        supplierFactory.searchSupplierManual({
            typo: typo.term
        }).then(function() {
            $scope.data_supplier = supplierFactory.resSearchSupplier;
            if ($scope.data_supplier.length > 0) {
                response($scope.data_supplier);
            } else {
                response([{id: "0", name: "Maaf, data tidak ditemukan"}]);
            }
        });
    };

    //##############################//
    //   MENGAMBIL DATA SUPPLIER    //
    //##############################//
    $scope.getSupplier = function(input) {
        $scope.loadingSupp = true;
        supplierFactory.showSupplierDetail({
            supplier_id: input.id
        }).then(function() {
            $scope.supplier = {
                active: supplierFactory.dataSupplierDetail.data_supplier.active
                , address: supplierFactory.dataSupplierDetail.data_supplier.address
                , city: supplierFactory.dataSupplierDetail.data_supplier.city
                , email: supplierFactory.dataSupplierDetail.data_supplier.email
                , id: supplierFactory.dataSupplierDetail.data_supplier.id
                , name : supplierFactory.dataSupplierDetail.data_supplier.name
                , phone_1 : supplierFactory.dataSupplierDetail.data_supplier.phone_1
            }
            $scope.loadingSupp = false;
            return $scope.supplier;
        });
    }

    //##############################//
    //       FUNGSI CREATE DATA       //
    //##############################//
    $scope.selectUnit = function(elm, index, unit, cart) {
        cart.price = 0;
        // console.log(cart.options.temp_price_purchase_per_tablet);
        cart.options.price_first = (cart.price - (cart.price * cart.options.discount)) + ((cart.price - (cart.price * cart.options.discount)) * cart.options.ppn);
        cart.options.price_last = cart.options.price_first * cart.qty;
        cart.options.percent_profit_per_box = cart.options.temp_percent_profit_per_box;
        cart.options.percent_profit_per_strip = cart.options.temp_percent_profit_per_strip;
        cart.options.percent_profit_per_tablet = cart.options.temp_percent_profit_per_tablet;
        cart.options.price_purchase_per_box = cart.options.temp_price_purchase_per_box;
        cart.options.price_purchase_per_strip = cart.options.temp_price_purchase_per_strip;
        cart.options.price_purchase_per_tablet = cart.options.temp_price_purchase_per_tablet;
        cart.options.price_sell_per_box = cart.options.temp_price_sell_per_box;
        cart.options.price_sell_per_strip = cart.options.temp_price_sell_per_strip;
        cart.options.price_sell_per_tablet = cart.options.temp_price_sell_per_tablet;
        $scope.calcGrandTotalEdit();
        return true;
    };

    $scope.createData = function(input) {
        if ($scope.tr_purchases.code == '' | $scope.tr_purchases.date_input == '' | $scope.supplier.id == '') {
            toastr.error('Maaf, data belum lengkap', 'Gagal!');
            return true;
        } else {
            angular.element('#btn-save').attr('disabled', true);
            transactionPurchasesFactory.insertDataTransactionPurchases({
                tr_purchases: $scope.tr_purchases,
                cart: $scope.data_cart,
                supplier: $scope.supplier,
            }).then(function() {
                $scope.check_ppn = false;
                angular.element('#search-item').val('');
                angular.element('#btn-save').attr('disabled', false);
                $scope.genderateinvoice();
                $scope.dataCart();
                $scope.tr_purchases = {
                    total_price: 0,
                    disc_total: 0,
                    price_disc: 0,
                    ppn: 0,
                    grand_total: 0
                };
                $scope.supplier = {
                    name: '',
                    address: '',
                    email: '',
                    phone_1: ''
                };
                $scope.notification();
				$state.reload();
				$state.go("transaction-purchases-create");
            });
        }
    }

    //##############################//
    //        FUNGSI EDIT DATA        //
    //##############################//
    if ($state.current.name == "transaction-purchases-edit") {
        // console.log($stateParams.id);
        $scope.tr_purchases = {};
        $scope.tr_purchases_cart = {};
        transactionPurchasesFactory.getDataEachTransactionPurchases($stateParams.id)
            .then(function() {
                $scope.tr_purchases = transactionPurchasesFactory.dataTransactionPurchases;
                $scope.supplier = transactionPurchasesFactory.dataSupplier;
                $scope.tr_purchases_detail = transactionPurchasesFactory.dataTransactionPurchasesDetail;
            });

        $scope.updateData = function() {
            $scope.loading = true;
            angular.element('#btn-save').attr('disabled', true);
            transactionPurchasesFactory.updateDataTransactionPurchases({
                id: $stateParams.id,
                tr_purchases: $scope.tr_purchases,
                tr_purchases_cart: $scope.tr_purchases_detail,
                cart: $scope.data_cart,
                supplier: $scope.supplier
            }).then(function() {
                angular.element('#btn-save').attr('disabled', false);
                $state.reload();
                $state.go("rep-trans-purchases");
                $scope.loading = false;
            });
        }
    }

    //##############################//
    //    HOTKEYS FORM PEMBELIAN    //
    //##############################//
    $scope.helpShow = false;
    $scope.helpPanel = function(flag) {
        if (flag) {
            $scope.helpShow = false;
        } else {
            $scope.helpShow = true;
        }
    }

    $scope.check_ppn = false;
    $scope.checkPpn = function(flag) {
        var ppn = 0;
        if (flag) {
            $scope.check_ppn = false;
            angular.forEach($scope.transaction_purchases_detail, function(val, key) {
                return val;
            });
            $scope.tr_purchases.ppn = 0;
            $scope.calcGrandTotalEdit();
        } else {
            $scope.check_ppn = true;
            angular.forEach($scope.transaction_purchases_detail, function(val, key) {
                return val;
            });
            $scope.tr_purchases.ppn =  ($scope.tr_purchases.total_price - $scope.tr_purchases.disc_total) * 0.1;
            $scope.calcGrandTotalEdit();
        }
    }

    if ($state.current.name == 'transaction-purchases-create') {
        angular.element('#search-supplier').focus();
        transactionPurchasesFactory.getDataCart().then(function() {
            $scope.data_cart = transactionPurchasesFactory.resDataCart;
            $scope.data = [];
            var index = 0;
            angular.forEach($scope.data_cart, function(val, key) {
                $scope.data[parseInt(index + 1)] =
                hotkeys.add({
                    combo: 'shift+alt+' + parseInt(index + 1),
                    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                    callback: function(event, hotkey) {
                        event.preventDefault();
                        console.log(index);
                    }
                });
                index += 1;
            });
        });

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
            combo: 'alt+a',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                if ($scope.tr_purchases.total_price > 0) {
                    $timeout(function() {
                        angular.element('#check-ppn').triggerHandler('click');
                        angular.element('#check-ppn').focus();
                    }, 0);
                } else {
                    return true;
                }
            }
        });

        hotkeys.add({
            combo: 'alt+f',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                angular.element('#search-item').focus();
            }
        });

        hotkeys.add({
            combo: 'alt+b',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                angular.element('#search-supplier').focus();
            }
        });

        hotkeys.add({
            combo: 'alt+d',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                angular.element('#inp-discprice').focus();
            }
        });

        hotkeys.add({
            combo: 'alt+s',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                event.preventDefault();
                event.stopPropagation();
                if ($scope.loading == true) {
                    return true;
                } else {
                    if ($scope.tr_purchases.grand_total > 0) {
                        // $scope.createData();
                        $timeout(function(){angular.element('#modal-confirm-save-purchases').trigger('click')});
                        // angular.element('#modal-confirm-save-purchases').triggerHandler('click');
                        return true;
                    } else {
                        return true;
                    }
                }
            }
        });
    }

    if ($state.current.name == 'transaction-purchases-edit') {
        angular.element('#search-supplier').focus();
        transactionPurchasesFactory.getDataCart().then(function() {
            $scope.data_cart = transactionPurchasesFactory.resDataCart;
            $scope.data = [];
            var index = 0;
            angular.forEach($scope.data_cart, function(val, key) {
                $scope.data[parseInt(index + 1)] =
                hotkeys.add({
                    combo: 'shift+alt+' + parseInt(index + 1),
                    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                    callback: function(event, hotkey) {
                        event.preventDefault();
                        console.log(index);
                    }
                });
                index += 1;
            });
        });

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
            combo: 'alt+a',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                if ($scope.tr_purchases.total_price > 0) {
                    $timeout(function() {
                        angular.element('#check-ppn').triggerHandler('click');
                        angular.element('#check-ppn').focus();
                    }, 0);
                } else {
                    return true;
                }
            }
        });

        hotkeys.add({
            combo: 'alt+f',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                angular.element('#search-item').focus();
            }
        });

        hotkeys.add({
            combo: 'alt+b',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                angular.element('#search-supplier').focus();
            }
        });

        hotkeys.add({
            combo: 'alt+d',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                angular.element('#inp-discprice').focus();
            }
        });

        hotkeys.add({
            combo: 'alt+s',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                event.preventDefault();
                event.stopPropagation();
                if ($scope.loading == true) {
                    return true;
                } else {
                    if ($scope.tr_purchases.grand_total > 0) {
                        $scope.updateData();
                        // $timeout(function(){angular.element('#modal-confirm-edit-purchases').trigger('click')});
                        // angular.element('#modal-confirm-save-purchases').triggerHandler('click');
                        return true;
                    } else {
                        return true;
                    }
                }
            }
        });
    }
})
