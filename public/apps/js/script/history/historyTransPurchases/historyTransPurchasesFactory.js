var app = angular.module('factoryHistoryTransPurchases', []);
app.factory('historyTransPurchasesFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataHistoryTransPurchases = [];
    init.totalItems = [];
    init.eachDataHistoryTransPurchases = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataHistoryTransPurchases = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'historyTransPurchases/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataHistoryTransPurchases = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'historyTransPurchases/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    init.filterDataHistoryTransPurchases = function(pageNumber, dateStart, dateEnd) {
        // console.log("Date Start", dateStart);
        // console.log("Date End", dateEnd);
        return $http({
            method: 'GET',
            url: 'historyTransPurchases/list?page=' + pageNumber + '&datestart=' + dateStart + '&dateend=' + dateEnd
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    return init;
})
