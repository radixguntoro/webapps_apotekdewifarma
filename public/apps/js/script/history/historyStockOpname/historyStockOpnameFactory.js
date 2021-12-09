var app = angular.module('factoryHistoryStockOpname', []);
app.factory('historyStockOpnameFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataHistoryStockOpname = [];
    init.totalItems = [];
    init.eachDataHistoryStockOpname = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataHistoryStockOpname = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'historyStockOpname/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataHistoryStockOpname = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'historyStockOpname/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    init.filterDataHistoryStockOpname = function(pageNumber, dateStart, dateEnd) {
        // console.log("Date Start", dateStart);
        // console.log("Date End", dateEnd);
        return $http({
            method: 'GET',
            url: 'historyStockOpname/list?page=' + pageNumber + '&datestart=' + dateStart + '&dateend=' + dateEnd
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    return init;
})
