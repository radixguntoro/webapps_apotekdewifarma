var app = angular.module('reportItemCardCtrl', ['factoryReportItemCard']);

app.controller('reportItemCardController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $state, $filter, toastr, hotkeys, reportItemCardFactory, itemFactory) {
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

    $scope.reportItemCard = {};
    $scope.report = {};

    $scope.dateReportOptions = {
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true
    };

    $scope.item = {};

    //##############################//
    //   MENAMPILKAN DATA BARANG    //
    //##############################//
    itemFactory.getAllDataItem()
        .then(function() {
            $scope.data_item = itemFactory.allDataItem;
            $scope.item.selected = {
                id: $scope.data_item[0].id,
                name: $scope.data_item[0].name
            };
        });

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

    $scope.cartSelect = function(input) {
        $scope.item_id = input.id;
    }

    //##############################//
    //      FUNGSI FILTER DATA      //
    //##############################//
    $scope.filterData = function(elm, report) {
        var params = {
            item_id: $scope.item_id,
            datestart: $filter('date')(report.datestart, 'yyyy-MM-dd'),
            dateend: $filter('date')(report.dateend, 'yyyy-MM-dd'),
        }

        if (params.item_id == '' && params.datestart == null | params.dateend == null) {
            toastr.error('Pilihan Barang dan Tanggal masih kosong', 'Pencarian Gagal!');
            return true;
        } else if (params.item_id == '' && (params.datestart != null | params.dateend != null)) {
            toastr.error('Pilihan Barang masih kosong', 'Pencarian Gagal!');
            return true;
        } else if (params.item_id !== '' && params.datestart == null | params.dateend == null) {
            toastr.error('Pilihan Tanggal masih kosong', 'Pencarian Gagal!');
            return true;
        } else {
            $scope.loading = true;
            reportItemCardFactory.filterDataReportItemCard(params).then(function() {
                $scope.data = reportItemCardFactory.resultData;
                $scope.totalSaldo = reportItemCardFactory.totalSaldo;
                $scope.totalIn = reportItemCardFactory.totalIn;
                $scope.totalOut = reportItemCardFactory.totalOut;
                $scope.loading = false;
                console.log($scope.data);
            });
        }
    }

    //##############################//
    //       FUNGSI HAPUS DATA      //
    //##############################//
    $scope.deleteDataReportItemCard = function(data) {
        reportItemCardFactory.deleteDataReportItemCard({
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
