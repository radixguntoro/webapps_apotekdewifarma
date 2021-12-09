var app = angular.module('reportTransPurchasesCtrl', ['factoryReportTransPurchases']);

app.controller('reportTransPurchasesController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $state, $filter, toastr, hotkeys, reportTransPurchasesFactory, transactionPurchasesFactory) {
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

    $scope.reportTransPurchases = {};
    $scope.report = {};

    $scope.dateReportOptions = {
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true
    };

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
            reportTransPurchasesFactory.filterDataReportTransPurchases(dateStart, dateEnd)
            .then(function() {
                $scope.data = reportTransPurchasesFactory.resultData;
                $scope.totalItems = reportTransPurchasesFactory.totalItems;
                $scope.totalTransPurchases = reportTransPurchasesFactory.totalTransPurchases;
                $scope.totalReturnPurchases = reportTransPurchasesFactory.totalReturnPurchases;
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
    $scope.deleteData = function(data) {
        transactionPurchasesFactory.deleteDataReportTransPurchases({
            id: data.id
        }).then(function() {
			$scope.filterData();
            $state.reload();
        });
    }

    //##############################//
    //    MENAMPILKAN DETIL DATA    //
    //##############################//
    $scope.showTransPurchasesDetail = function(trans_purchases) {
        $scope.loadingDetail = true;
        reportTransPurchasesFactory.showTransPurchasesDetail({
            trans_purchases_id: trans_purchases.id
        }).then(function() {
            $scope.trans_purchases_detail = reportTransPurchasesFactory.dataTransPurchasesDetail.data_trans_purchases_detail;
            console.log($scope.trans_purchases_detail);
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
