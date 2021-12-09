var app = angular.module('reportIncomeCashierCtrl', ['factoryReportIncomeCashier']);

app.controller('reportIncomeCashierController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $state, $filter, toastr, hotkeys, reportIncomeCashierFactory) {
    //##############################//
    //      DEKLARASI VARIABLE      //
    //##############################//
    $rootScope.$state = $state;

    $scope.data = [];
    $scope.reportIncomeCashier = {};
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
            reportIncomeCashierFactory.filterDataReportIncomeCashier(dateStart, dateEnd)
            .then(function() {
                $scope.data = reportIncomeCashierFactory.resultDataClosingCashier;
                $scope.totalApp = reportIncomeCashierFactory.resultAppClosingCashier;
                $scope.totalReal = reportIncomeCashierFactory.resultRealClosingCashier;
                $scope.loading = false;
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
