var app = angular.module('returnTransSalesCtrl', ['factoryReturnTransSales']);

app.controller('returnTransSalesController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $state, $filter, toastr, hotkeys, returnTransSalesFactory, itemFactory) {
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

    $scope.returnTransSales = {};
    $scope.return = {};

    $scope.dateReturnOptions = {
        dateFormat: "dd-mm-yy"
    };

    //##############################//
    //          DELETE DATA         //
    //##############################//
    $scope.deleteDataReturnTransSales = function(data) {
        returnTransSalesFactory.deleteDataReturnTransSales({
            id: data.id
        }).then(function() {
            $state.go($state.current, {}, {
                reload: true
            });
        });
    }

    //##############################//
    //      MENAMPILKAN DETAIL      //
    //##############################//
    $scope.showTransSalesDetail = function(trans_sales) {
        $scope.loadingDetail = true;
        returnTransSalesFactory.showTransSalesDetail({
            trans_sales_id: trans_sales.id
        }).then(function() {
            $scope.trans_sales_detail = returnTransSalesFactory.dataTransSalesDetail.data_trans_sales_detail;
            console.log($scope.trans_sales_detail);
            $scope.loadingDetail = false;
        });
    }

    //##############################//
    //    MENAMPILKAN DATA CART     //
    //##############################//
    $scope.dataCart = function() {
        $scope.data_cart = {};
        returnTransSalesFactory.getDataCart().then(function() {
            $scope.data_cart = returnTransSalesFactory.resDataCart;
        });
    }

    $scope.dataCart();

    //##############################//
    //    MENAMBAHKAN DATA CART     //
    //##############################//
    $scope.cartAdd = function(input) {
        angular.element('#search-tablet').val('');
        returnTransSalesFactory.addCart({
            item: input
        }).then(function() {
            $scope.dataCart();
        });
    }

    //##############################//
    //     MENGHAPUS DATA CART      //
    //##############################//
    $scope.cartRemove = function(input) {
        returnTransSalesFactory.removeCart({
            item: input
        }).then(function() {
            $scope.dataCart();
        });
    }

    //##############################//
    //     MENCARI DATA BARANG      //
    //##############################//
    $scope.scan_options = {
        onComplete: function(event){
            returnTransSalesFactory.searchItemBarcode({
                barcode: $scope.barcodeAdd
            }).then(function() {
                $scope.dataCart();
            });
            $scope.barcodeAdd = '';
            // angular.element('#barcode').val('');
        },
        timeBeforeScanTest: 100,
        avgTimeByChar: 30,
        minLength: 2,
        endChar: [9, 13],
        startChar: [],
        scanButtonKeyCode: false,
        scanButtonLongPressThreshold: 3,
        onScanButtonLongPressed: function(){

        }
    };

    $scope.searchItem = function(typo, response) {
        itemFactory.searchItemManual({
            typo: typo.term
        }).then(function() {
            $scope.data_item = itemFactory.resSearchItem;
            if ($scope.data_item.length > 0) {
                response($scope.data_item);
            }
        });
    };

    //############################## //
    //     PERHITUNGAN SUBTOTAL      //
    //############################## //
    $scope.calcSubtotal = function(elm) {
        console.log(elm);
        if (elm.cart.qty == null | elm.cart.qty == 0) {
            elm.cart.qty = 1;
            elm.cart.subtotal = elm.cart.price * elm.cart.qty;
        } else if (elm.cart.qty > 0) {
            elm.cart.subtotal = elm.cart.price * elm.cart.qty;
        }
    }

    //##############################//
    //       FORM CREATE DATA       //
    //##############################//
    $scope.selectUnit = function(elm, index, unit, price_box, price_strip, price_tablet) {
        if (unit == 'box') {
            this.cart.price = price_box;
            this.cart.subtotal = price_box * this.cart.qty;
            $scope.tr_sales.discount = 0;
            $scope.tr_sales.discprice = 0;
            $scope.tr_sales.payment = 0;
            $scope.tr_sales.balance = 0;
            $scope.calcTotalPrice();
        } else if(unit == 'strip') {
            this.cart.price = price_strip;
            this.cart.subtotal = price_strip * this.cart.qty;
            $scope.tr_sales.discount = 0;
            $scope.tr_sales.discprice = 0;
            $scope.tr_sales.payment = 0;
            $scope.tr_sales.balance = 0;
            $scope.calcTotalPrice();
        } else if(unit == 'tablet') {
            this.cart.price = price_tablet;
            this.cart.subtotal = price_tablet * this.cart.qty;
            $scope.tr_sales.discount = 0;
            $scope.tr_sales.discprice = 0;
            $scope.tr_sales.payment = 0;
            $scope.tr_sales.balance = 0;
            $scope.calcTotalPrice();
        }
    };

    $scope.createData = function() {
        if ($scope.data_cart == '') {
            toastr.error('Maaf, data masih kosong', 'Gagal Simpan!');
            return true;
        } else {
            $scope.loading = true;
            angular.element('#btn-save').attr('disabled', true);
            returnTransSalesFactory.insertDataRetTransSales({
                cart: $scope.data_cart,
            }).then(function() {
                $state.go("ret-trans-sales-create");
                angular.element('#btn-save').attr('disabled', false);
                $scope.dataCart();
                $scope.loading = false;
                $scope.notification();
            });
        }
    };

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

    if ($state.current.name == 'ret-trans-sales-create') {
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
            combo: 'alt+f',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                angular.element('#search-tablet').focus();
            }
        });

        hotkeys.add({
            combo: 'alt+s',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                event.preventDefault();
                if ($scope.loading == true) {
                    return true;
                } else {
                    $scope.createData();
                }
            }
        });
    }
})
