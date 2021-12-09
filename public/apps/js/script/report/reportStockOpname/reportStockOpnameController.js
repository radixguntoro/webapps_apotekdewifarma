var app = angular.module('reportStockOpnameCtrl', ['factoryReportStockOpname']);

app.controller('reportStockOpnameController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $state, $filter, toastr, hotkeys, reportStockOpnameFactory) {
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

    $scope.reportStockOpname = {};
    $scope.report = {};

    $scope.dateReportOptions = {
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true
    };

    //##############################//
    //      FUNGSI FILTER DATA      //
    //##############################//
    $scope.report.stock_min = '';
    $scope.report.stock_plus = '';
    $scope.stockMin = function(flag) {
        if (flag) {
            $scope.stock_min = "min";
            console.log($scope.stock_min);
        } else {
            $scope.stock_min = '';
            console.log($scope.stock_min);
        }
    }
    $scope.stockPlus = function(flag) {
        if (flag) {
            $scope.stock_plus = "plus";
            console.log($scope.stock_plus);
        } else {
            $scope.stock_plus = '';
            console.log($scope.stock_plus);
        }
    }

    $scope.filterData = function() {
        if ($scope.report.datestart == null || $scope.report.dateend == null) {
            toastr.error('Pilihan Tanggal masih kosong', 'Pencarian Gagal!');
            return true;
        } else {
            $scope.loading = true;
            var dateStart = $scope.report.datestart != null ? $filter('date')($scope.report.datestart, 'yyyy-MM-dd') : '';
            var dateEnd = $scope.report.dateend != null ? $filter('date')($scope.report.dateend, 'yyyy-MM-dd') : '';
            var stockMin = $scope.stock_min;
            var stockPlus = $scope.stock_plus;
            reportStockOpnameFactory.filterDataReportStockOpname(dateStart, dateEnd, stockMin, stockPlus)
            .then(function() {
                $scope.data = reportStockOpnameFactory.resultData;
                $scope.loading = false;
            });
        }
    }

    //##############################//
    //       FUNGSI HAPUS DATA      //
    //##############################//
    $scope.deleteDataReportStockOpname = function(data) {
        reportStockOpnameFactory.deleteDataReportStockOpname({
            id: data.id
        }).then(function() {
            $state.go($state.current, {}, {
                reload: true
            });
        });
    }

    //##############################//
    //    MENAMPILKAN DETIL DATA    //
    //##############################//
    $scope.showStockOpnameDetail = function(trans_sales) {
        $scope.loadingDetail = true;
        reportStockOpnameFactory.showStockOpnameDetail({
            trans_sales_id: trans_sales.id
        }).then(function() {
            $scope.trans_sales_detail = reportStockOpnameFactory.dataStockOpnameDetail.data_trans_sales_detail;
            console.log($scope.trans_sales_detail);
            $scope.loadingDetail = false;
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
