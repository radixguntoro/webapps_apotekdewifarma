var app = angular.module('factoryReportTransSales', []);
app.factory('reportTransSalesFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataReportTransSales = [];
    init.totalItems = [];
    init.eachDataReportTransSales = [];
    var input = {};

    init.filterDataReportTransSales = function(dateStart, dateEnd, userId) {
        console.log("User", dateStart);
        return $http({
            method: 'GET',
            url: 'reportTransSales/filter?user=' + userId + '&datestart=' + dateStart + '&dateend=' + dateEnd
        }).then(function(response) {
            init.resultData = response.data.report_trans_sales;
            init.totalItems = response.data.total_items;
            init.totalTransSales = response.data.total_trans_sales;
            init.totalReturnSales = response.data.total_return_sales;
            console.log(response);
        }, function(response) {});
    };

    // Get Transaction Sales Detail
    init.showTransSalesDetail = function(input) {
        return $http({
            method: 'GET',
            url: 'reportTransSales/detail/' + input.trans_sales_id
        }).then(function(response) {
            init.dataTransSalesDetail = response.data;
        }, function(response) {
            console.log("Error");
        });
    }

    return init;
})
