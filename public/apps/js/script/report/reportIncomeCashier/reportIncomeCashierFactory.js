var app = angular.module('factoryReportIncomeCashier', []);
app.factory('reportIncomeCashierFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.totalItems = [];
    var input = {};

    init.filterDataReportIncomeCashier = function(dateStart, dateEnd) {
        return $http({
            method: 'GET',
            url: 'reportIncomeCashier/filter?datestart=' + dateStart + '&dateend=' + dateEnd
        }).then(function(response) {
            init.resultDataClosingCashier = response.data.report_closing_cashier;
            init.resultAppClosingCashier = response.data.app_closing_cashier;
            init.resultRealClosingCashier = response.data.real_closing_cashier;
            console.log(response);
        }, function(response) {});
    };

    return init;
})
