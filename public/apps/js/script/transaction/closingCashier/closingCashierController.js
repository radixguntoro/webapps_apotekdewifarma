var app = angular.module('closingCashierCtrl', ['factoryClosingCashier']);

app.controller('closingCashierController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $state, $filter, toastr, hotkeys, closingCashierFactory, userFactory) {
    //##############################//
    //      DEKLARASI VARIABLE      //
    //##############################//
    $rootScope.$state = $state;

    //##############################//
    //        GENERATE CODE         //
    //##############################//
    $scope.genderateinvoice = function () {
        $scope.code = "CC" + $filter('date')(new Date(), 'yy') + $filter('date')(new Date(), 'MM') + $filter('date')(new Date(), 'dd') + $filter('date')(new Date(), 'hh') + $filter('date')(new Date(), 'mm') + $filter('date')(new Date(), 'ss');
    }

    $scope.genderateinvoice();

    //##############################//
    //      MENAMPILKAN KASIR       //
    //##############################//
    userFactory.getAllDataUser()
        .then(function() {
            $scope.data_user = userFactory.allDataUser;
        });

    //##############################//
    //    MENAMPILKAN DATA KASIR    //
    //##############################//
    $scope.dataCashier = function() {
        closingCashierFactory.getCashier()
            .then(function() {
                $scope.data_cashier = closingCashierFactory.dataCashier;
                $scope.cashier = {
                    cashier_id: 0,
                    date: '',
                    shift: 'pagi',
                    income_app: $scope.data_cashier.total_sales,
                    income_real: 0,
                    income_diff: 0
                };
            });
    }

    $scope.dataCashier();

    //##############################//
    //   PERHITUNGAN TUTUP KASIR    //
    //##############################//
    $scope.calcIncome = function(elm, event) {
        if (elm.cashier.income_real == null) {
            elm.cashier.income_real = 0;
            elm.cashier.income_diff = 0;
        } else {
            elm.cashier.income_diff = elm.cashier.income_real - elm.cashier.income_app;
            console.log(elm.cashier.income_real - elm.cashier.income_app);
        }
    }

    //##############################//
    //      FUNGSI CREATE DATA      //
    //##############################//
    $scope.checkDate = function() {
        var date = $scope.cashier.date;
        if (typeof(date) == 'undefined' || date == '') {
            angular.element('select#select-shift').prop("disabled", true);
            angular.element('select#select-cashier').prop("disabled", true);
        } else {
            angular.element('select#select-shift').prop("disabled", false);
            angular.element('select#select-cashier').prop("disabled", false);
        }
    }

    $scope.getIncomePerShift = function(elm, event, user_id) {
        closingCashierFactory.getIncomePerShift({
            date: elm.cashier.date,
            user_id: user_id
        }).then(function() {
            $scope.cashier.income_app = closingCashierFactory.dataIncomePerShift;
        });
        // if (elm.cashier.time == '14:59:59') {
        //     var shift_start = '08:00:00';
        //     var shift_end = '14:59:59';
        //     closingCashierFactory.getIncomePerShift({
        //         date: elm.cashier.date,
        //         shift_start: shift_start,
        //         shift_end: shift_end
        //     }).then(function() {
        //         $scope.cashier.income_app = closingCashierFactory.dataIncomePerShift;
        //         console.log($scope.cashier.income_app);
        //     });
        //     return true;
        // } else if (elm.cashier.time == '20:59:59') {
        //     var shift_start = '15:00:00';
        //     var shift_end = '20:59:59';
        //     closingCashierFactory.getIncomePerShift({
        //         date: elm.cashier.date,
        //         shift_start: shift_start,
        //         shift_end: shift_end
        //     }).then(function() {
        //         $scope.cashier.income_app = closingCashierFactory.dataIncomePerShift;
        //         console.log($scope.cashier.income_app);
        //     });
        //     return true;
        // } else if (elm.cashier.time == '22:00:00') {
        //     var shift_start = '21:00:00';
        //     var shift_end = '23:59:59';
        //     closingCashierFactory.getIncomePerShift({
        //         date: elm.cashier.date,
        //         shift_start: shift_start,
        //         shift_end: shift_end
        //     }).then(function() {
        //         $scope.cashier.income_app = closingCashierFactory.dataIncomePerShift;
        //         console.log($scope.cashier.income_app);
        //     });
        //     return true;
        // }
    }

    $scope.createData = function() {
        if ($scope.cashier.income_real == null | $scope.cashier.income_real == 0) {
            return true;
        } else {
            angular.element('#btn-save').attr('disabled', true);
            closingCashierFactory.insertDataClosingCashier({
                cashier: $scope.cashier,
                code: $scope.code
            }).then(function() {
                angular.element('#btn-save').attr('disabled', false);
                $scope.dataCashier();
                $state.go('closing-cashier-review', {id: $scope.code});
                $scope.genderateinvoice();
            });
        }
    }

    //##############################//
    //  MENAMPILKAN PENUTUPAN KASIR //
    //##############################//
    if ($state.current.name == "closing-cashier-review") {
        closingCashierFactory.getReviewClosing($stateParams.id)
            .then(function() {
                $scope.review_closing = closingCashierFactory.reviewDataClosing;
                console.log($scope.review_closing);
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
    angular.element('#select-cashier').focus();
    hotkeys.add({
        combo: 'alt+s',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function(event, hotkey) {
            $scope.createData();
        }
    });

    hotkeys.add({
        combo: 'alt+c',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function(event, hotkey) {
            angular.element('#select-cashier').focus();
        }
    });

    hotkeys.add({
        combo: 'alt+d',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function(event, hotkey) {
            angular.element('#inp-date').focus();
        }
    });

    hotkeys.add({
        combo: 'alt+w',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function(event, hotkey) {
            angular.element('#select-shift').focus();
        }
    });

    hotkeys.add({
        combo: 'alt+f',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function(event, hotkey) {
            angular.element('#cashier-income-real').focus();
        }
    });
})
