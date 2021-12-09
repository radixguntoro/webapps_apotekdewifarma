var app = angular.module('factoryReportItemCard', []);
app.factory('reportItemCardFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataReportItemCard = [];
    init.totalItems = [];
    init.eachDataReportItemCard = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataReportItemCard = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'reportItemCard/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataReportItemCard = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'reportItemCard/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    init.filterDataReportItemCard = function(params) {
        return $http({
            method: 'GET',
            url: 'reportItemCard/filter?item=' + params.item_id + '&datestart=' + params.datestart + '&dateend=' + params.dateend
        }).then(function(response) {
            init.resultData = response.data.report_item_card;
            init.totalSaldo = response.data.total_saldo;
            init.totalIn = response.data.total_in;
            init.totalOut = response.data.total_out;
        }, function(response) {});
    };

    return init;
})
