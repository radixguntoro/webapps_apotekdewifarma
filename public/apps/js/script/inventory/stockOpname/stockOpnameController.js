var app = angular.module('stockOpnameCtrl', ['factoryStockOpname']);

app.controller('stockOpnameController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $filter, $parse, $state, $compile, toastr, hotkeys, stockOpnameFactory, itemFactory) {
    //##############################//
    //      DEKLARASI VARIABLE      //
    //##############################//
    $rootScope.$state = $state;
    // Deklarasi StockOpname List
    $scope.data = [];
    $scope.libraryTemp = {};
    $scope.totalItemsTemp = {};
    $scope.totalItems = 0;
    $scope.pagination = {
        current: 1
    };

    $scope.stock_opname = {};
    $scope.stock_opname = {
        date: $filter('date')(new Date(), 'dd MMM yyyy'),
        price_sell_phx: 0,
        price_sell_difference: 0,
        stock_difference: 0,
        stock_in_physic: 0,
    }

    $scope.stock_opname.price_sell_physic = 0;

    $scope.generateId = function() {
        $scope.stock_opname.code= $filter('date')(new Date(), 'yy') + $filter('date')(new Date(), 'MM') + $filter('date')(new Date(), 'yy') + $filter('date')(new Date(), 'dd') + $filter('date')(new Date(), 'hh')+$filter('date')(new Date(), 'mm') + $filter('date')(new Date(), 'ss');
    }

    $scope.generateId();

    //############################## //
    //  PERHITUNGAN PENYAMAAN STOCK  //
    //############################## //
    $scope.validQty = function(elm) {
        if (elm.stock_opname.stock_in_physic == null) {
            elm.stock_opname.stock_in_physic = '';
        }

        elm.stock_opname.stock_difference = elm.stock_opname.stock_in_physic - elm.stock_opname.stock_in_system;
        elm.stock_opname.price_sell_difference = (elm.stock_opname.stock_in_physic * (elm.stock_opname.price_sell_per_tablet > 0 ? elm.stock_opname.price_sell_per_tablet : elm.stock_opname.price_sell_per_bottle)) - elm.stock_opname.price_sell_app;
        elm.stock_opname.price_sell_phx = elm.stock_opname.stock_in_physic * (elm.stock_opname.price_sell_per_tablet > 0 ? elm.stock_opname.price_sell_per_tablet : elm.stock_opname.price_sell_per_bottle);
    };

    //##############################//
    //  LIST, PAGINATION & SEARCH   //
    //##############################//
    $scope.getResultsPage = function(pageNumber) {
        $scope.loading = true;
        if (!$.isEmptyObject($scope.libraryTemp)) {
            stockOpnameFactory.searchDataStockOpname(pageNumber, $scope.searchText)
                .then(function() {
                    $scope.data = stockOpnameFactory.resultData;
                    $scope.totalItems = stockOpnameFactory.totalItems;
                    $scope.loading = false;
                });
        } else {
            stockOpnameFactory.getDataStockOpname(pageNumber)
                .then(function() {
                    $scope.data = stockOpnameFactory.resultData;
                    $scope.totalItems = stockOpnameFactory.totalItems;
                    $scope.loading = false;
                });
        }
    }

    $scope.pageChanged = function(newPage) {
        $scope.getResultsPage(newPage);
    };

    $scope.getResultsPage(1);

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
    //       ADD STOCK OPNAME       //
    //##############################//
    $scope.stockOpnameAdd = function(input) {
        $scope.loading = true;
        angular.element('#search-tablet').val('');
        stockOpnameFactory.insertDataStockOpname({
            stock_opname: input
        }).then(function() {
            $scope.getResultsPage(1);
            $scope.generateId();
        });
    }

    //##############################//
    //      UPDATE STOCK OPNAME     //
    //##############################//
    $scope.updateStockOpname = function(data) {
        console.log(data);
        var temp = [];
        angular.forEach(data, function(val, key) {
            if (val.stock_in_physic == null) {
                temp[key] = val.stock_in_physic;
            }
        });
        if (data == '') {
            return true;
        } else if(angular.fromJson(temp).length > 0) {
            toastr.error('Maaf, data belum lengkap.', 'Gagal Proses!');
            return true;
        } else {
            $scope.loading = true;
            stockOpnameFactory.stockOpnameDone({
                stock_opname: data
            }).then(function() {
                $scope.getResultsPage(1);
            });
        }
    }

    $scope.editStockOpname = function(data) {
        $scope.loading = true;
        stockOpnameFactory.editDataStockOpname({
            stock_opname: data
        }).then(function() {
            $scope.getResultsPage(1);
            $scope.generateId();
        });
    }

    //##############################//
    //      DELETE STOCK OPNAME     //
    //##############################//
    $scope.deleteStockOpname = function(data) {
        $scope.loading = true;
        stockOpnameFactory.deleteDataStockOpname({
            stock_opname: data
        }).then(function() {
            $scope.getResultsPage(1);
            $scope.generateId();
        });
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

    if ($state.current.name == 'stock-opname') {
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
                    $timeout(function() {
                        angular.element('#btn-process').triggerHandler('click');
                    }, 0);
                }
            }
        });
    }
})
