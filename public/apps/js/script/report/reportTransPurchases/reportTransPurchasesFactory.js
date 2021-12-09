var app = angular.module('factoryReportTransPurchases', []);
app.factory('reportTransPurchasesFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataReportTransPurchases = [];
    init.totalItems = [];
    init.eachDataReportTransPurchases = [];
    var input = {};

    // Pagination and Search Function
    // init.searchDataReportTransPurchases = function(pageNumber, searchText) {
    //     return $http({
    //         method: 'GET',
    //         url: 'reportTransPurchases/list?search=' + searchText + '&page=' + pageNumber
    //     }).then(function(response) {
    //         init.resultData = response.data.report_trans_purchases.data;
    //         init.totalItems = response.data.report_trans_purchases.total;
    //         init.totalTransPurchases = response.data.total_trans_purchases;
    //     }, function(response) {});
    // };
    //
    // init.getDataReportTransPurchases = function(pageNumber) {
    //     return $http({
    //         method: 'GET',
    //         url: 'reportTransPurchases/list?page=' + pageNumber
    //     }).then(function(response) {
    //         init.resultData = response.data.report_trans_purchases.data;
    //         init.totalItems = response.data.report_trans_purchases.total;
    //         init.totalTransPurchases = response.data.total_trans_purchases;
    //     }, function(response) {});
    // }
    //

    init.filterDataReportTransPurchases = function(dateStart, dateEnd) {
        console.log("Datestart", dateStart);
        console.log("Dateend", dateEnd);
        return $http({
            method: 'GET',
            url: 'reportTransPurchases/filter?datestart=' + dateStart + '&dateend=' + dateEnd
        }).then(function(response) {
            init.resultData = response.data.report_trans_purchases;
            init.totalItems = response.data.total_items;
            init.totalTransPurchases = response.data.total_trans_purchases;
            init.totalReturnPurchases = response.data.total_return_purchases;
        }, function(response) {});
    };

    // Get Transaction Purchases Detail
    init.showTransPurchasesDetail = function(input) {
        return $http({
            method: 'GET',
            url: 'reportTransPurchases/detail/' + input.trans_purchases_id
        }).then(function(response) {
            init.dataTransPurchasesDetail = response.data;
        }, function(response) {
            console.log("Error");
        });
    }

    return init;
})
