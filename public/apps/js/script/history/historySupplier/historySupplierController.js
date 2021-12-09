var app = angular.module('historySupplierCtrl', ['factoryHistorySupplier']);

app.controller('historySupplierController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $state, toastr, hotkeys, historySupplierFactory) {
    //##############################//
    //      DEKLARASI VARIABLE      //
    //##############################//
    $rootScope.$state = $state;

    $scope.data = [];
    $scope.libraryTemp = {};
    $scope.totalSuppliersTemp = {};
    $scope.totalSuppliers = 0;
    $scope.pagination = {
        current: 1
    };

    //##############################//
    //  LIST, PAGINATION & SEARCH   //
    //##############################//
    $scope.getResultsPage = function(pageNumber) {
        $scope.loading = true;
        if (!$.isEmptyObject($scope.libraryTemp)) {
            historySupplierFactory.searchDataSupplier(pageNumber, $scope.searchText)
                .then(function() {
                    $scope.data = historySupplierFactory.resultData;
                    $scope.totalSuppliers = historySupplierFactory.totalSuppliers;
                    $scope.loading = false;
                });
        } else {
            historySupplierFactory.getDataSupplier(pageNumber)
                .then(function() {
                    $scope.data = historySupplierFactory.resultData;
                    $scope.totalSuppliers = historySupplierFactory.totalSuppliers;
                    $scope.loading = false;
                });
        }
    }

    $scope.pageChanged = function(newPage) {
        $scope.getResultsPage(newPage);
    };

    $scope.getResultsPage(1);

    $scope.searchData = function() {
        if ($scope.searchText.length >= 3) {
            if ($.isEmptyObject($scope.libraryTemp)) {
                $scope.libraryTemp = $scope.data;
                $scope.totalSuppliersTemp = $scope.totalSuppliers;
                $scope.data = {};
            }
            $scope.getResultsPage(1);
        } else {
            if (!$.isEmptyObject($scope.libraryTemp)) {
                $scope.data = $scope.libraryTemp;
                $scope.totalSuppliers = $scope.totalSuppliersTemp;
                $scope.libraryTemp = {};
                $scope.getResultsPage(1);
            }
        }
    }

    //##############################//
    //      FUNGSI DETAIL DATA      //
    //##############################//
    $scope.searchItem = function(supplier) {
        console.log("Ready");
        $scope.loadingDetail = true;
        historySupplierFactory.searchItem({
            supplier_id: supplier.id
        }).then(function() {
            $scope.data_item = historySupplierFactory.dataItem;
            $scope.loadingDetail = false;
        });
    }

    //##############################//
    //    HOTKEYS FORM PENJUALAN    //
    //##############################//
    if ($state.current.name == 'his-supplier') {
        $scope.helpShow = false;
        $scope.helpPanel = function(flag) {
            if (flag) {
                $scope.helpShow = false;
            } else {
                $scope.helpShow = true;
            }
        }
        angular.element('#inp-search').focus();
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
                angular.element('#inp-search').focus();
            }
        });

        return true;
    }
})
