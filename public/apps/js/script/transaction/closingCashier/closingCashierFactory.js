var app = angular.module('factoryClosingCashier', []);
app.factory('closingCashierFactory', function($http, $filter, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataClosingCashier = [];
    init.totalItems = [];
    init.eachDataClosingCashier = [];
    init.dataIncomePerShift = [];
    var input = {};

    init.getCashier = function() {
        return $http({
            method: 'GET',
            url: 'closingCashier/getCashier'
        }).then(function(response) {
            init.dataCashier = response.data;
            console.log(init.dataCashier);
        }, function(response) {});
    };

    init.insertDataClosingCashier = function(input) {
        console.log(input);
        return $http({
            method: 'POST',
            url: 'closingCashier/insert',
            data: {
                code: input.code,
                income_app: input.cashier.income_app,
                income_real: input.cashier.income_real,
                income_diff: input.cashier.income_diff,
                user_id: input.cashier.cashier_id,
                date: input.cashier.date,
                shift: input.cashier.shift
            },
        }).then(function(response) {
            toastr.success('Data berhasil disimpan', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal disimpan', 'Gagal!');
        });
    }

    init.getReviewClosing = function(input) {
        return $http({
            method: 'GET',
            url: 'closingCashier/review/' + input,
        }).then(function(response) {
            init.reviewDataClosing = response.data;
            console.log(response);
        }, function(response) {});
    }

    init.getIncomePerShift = function(input) {
        console.log("Inputan", input);
        return $http({
            method: 'POST',
            url: 'closingCashier/getIncomePerShift',
            data: {
                date: $filter('date')(input.date, 'yyyy-MM-dd'),
                user_id: input.user_id,
            }
        }).then(function(response) {
            init.dataIncomePerShift = response.data;
            console.log("Data", init.dataIncomePerShift);
        }, function(response) {});
    }

    return init;
})
