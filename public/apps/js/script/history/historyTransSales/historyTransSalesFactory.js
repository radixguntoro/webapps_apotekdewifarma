var app = angular.module('factoryHistoryTransSales', []);
app.factory('historyTransSalesFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataHistoryTransSales = [];
    init.totalItems = [];
    init.eachDataHistoryTransSales = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataHistoryTransSales = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'historyTransSales/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataHistoryTransSales = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'historyTransSales/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    init.filterDataHistoryTransSales = function(pageNumber, dateStart, dateEnd) {
        // console.log("Date Start", dateStart);
        // console.log("Date End", dateEnd);
        return $http({
            method: 'GET',
            url: 'historyTransSales/list?page=' + pageNumber + '&datestart=' + dateStart + '&dateend=' + dateEnd
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    return init;
})
