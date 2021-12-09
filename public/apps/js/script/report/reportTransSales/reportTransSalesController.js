var app = angular.module('reportTransSalesCtrl', ['factoryReportTransSales']);

app.controller('reportTransSalesController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $state, $filter, toastr, hotkeys, reportTransSalesFactory, userFactory) {
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

    $scope.reportTransSales = {};
    $scope.report = {};

    $scope.dateReportOptions = {
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true
    };

    $scope.report.user = {
        id: 0,
        first_name: 'Pilih Kasir'
    };

    //##############################//
    //      MENAMPILKAN KASIR       //
    //##############################//
    userFactory.getAllDataUser()
        .then(function() {
            $scope.data_user = userFactory.allDataUser;
        });

    //##############################//
    //      FUNGSI FILTER DATA      //
    //##############################//
    $scope.filterData = function() {
        if ($scope.report.datestart == null || $scope.report.dateend == null) {
            toastr.error('Pilihan Tanggal masih kosong', 'Pencarian Gagal!');
            return true;
        } else {
            $scope.loading = true;
            var dateStart = $scope.report.datestart != null ? $filter('date')($scope.report.datestart, 'yyyy-MM-dd') : '';
            var dateEnd = $scope.report.dateend != null ? $filter('date')($scope.report.dateend, 'yyyy-MM-dd') : '';
            var userId = $scope.report.user.id > 0 ? $scope.report.user.id : '';
            reportTransSalesFactory.filterDataReportTransSales(dateStart, dateEnd, userId)
            .then(function() {
                $scope.data = reportTransSalesFactory.resultData;
                $scope.totalItems = reportTransSalesFactory.totalItems;
                $scope.totalTransSales = reportTransSalesFactory.totalTransSales;
                $scope.totalReturnSales = reportTransSalesFactory.totalReturnSales;
                console.log($scope.data);
                $scope.loading = false;
            });
        }
    }

    $scope.resetData = function() {
        $scope.getResultsPage(1);
        $scope.report = {
            code: '',
            datestart: '',
            dateend: ''
        };
    }

    //##############################//
    //       FUNGSI HAPUS DATA      //
    //##############################//
    $scope.deleteDataReportTransSales = function(data) {
        reportTransSalesFactory.deleteDataReportTransSales({
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
    $scope.showTransSalesDetail = function(trans_sales) {
        $scope.loadingDetail = true;
        reportTransSalesFactory.showTransSalesDetail({
            trans_sales_id: trans_sales.id
        }).then(function() {
            $scope.trans_sales_detail = reportTransSalesFactory.dataTransSalesDetail.data_trans_sales_detail;
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
