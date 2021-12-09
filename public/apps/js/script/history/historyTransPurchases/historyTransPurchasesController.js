var app = angular.module('historyTransPurchasesCtrl', ['factoryHistoryTransPurchases']);

app.controller('historyTransPurchasesController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $state, $filter, toastr, hotkeys, historyTransPurchasesFactory) {
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

    $scope.historyTransPurchases = {};
    $scope.report = {};

    $scope.dateReportOptions = {
        dateFormat: "dd-mm-yy"
    };

    //##############################//
    //   List, Pagination, Search   //
    //##############################//
    $scope.getResultsPage = function(pageNumber) {
        $scope.loading = true;
        if (!$.isEmptyObject($scope.libraryTemp)) {
            var dateStart = $scope.report.datestart != null ? $filter('date')($scope.report.datestart, 'yyyy-MM-dd') : '';
            var dateEnd = $scope.report.dateend != null ? $filter('date')($scope.report.dateend, 'yyyy-MM-dd') : '';
            historyTransPurchasesFactory.filterDataHistoryTransPurchases(pageNumber, dateStart, dateEnd)
                .then(function() {
                    $scope.data = historyTransPurchasesFactory.resultData;
                    $scope.totalItems = historyTransPurchasesFactory.totalItems;
                    $scope.loading = false;
                });
        } else {
            historyTransPurchasesFactory.getDataHistoryTransPurchases(pageNumber)
                .then(function() {
                    $scope.data = historyTransPurchasesFactory.resultData;
                    $scope.totalItems = historyTransPurchasesFactory.totalItems;
                    $scope.loading = false;
                    console.log($scope.data);
                });
        }
    }

    $scope.pageChanged = function(newPage) {
        $scope.getResultsPage(newPage);
    };

    $scope.getResultsPage(1);

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
    //       FUNGSI HAPUS DATA      //
    //##############################//
    $scope.deleteDataHistoryTransPurchases = function(data) {
        historyTransPurchasesFactory.deleteDataHistoryTransPurchases({
            id: data.id
        }).then(function() {
            $state.go($state.current, {}, {
                reload: true
            });
        });
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
    hotkeys.add({
        combo: 'alt+h',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function(event, hotkey) {
            $timeout(function() {
                angular.element('#btn-help').triggerHandler('click');
            }, 0);
        }
    });
    angular.element('#inp-datestart').focus();
    hotkeys.add({
        combo: 'alt+s',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function(event, hotkey) {
            angular.element('#inp-datestart').focus();
        }
    });

    hotkeys.add({
        combo: 'alt+e',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function(event, hotkey) {
            angular.element('#inp-dateend').focus();
        }
    });

    hotkeys.add({
        combo: 'alt+f',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function(event, hotkey) {
            $scope.filterData();
        }
    });
})
