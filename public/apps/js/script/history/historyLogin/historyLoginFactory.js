var app = angular.module('factoryHistoryLogin', []);
app.factory('historyLoginFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataHistoryLogin = [];
    init.totalItems = [];
    init.eachDataHistoryLogin = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataHistoryLogin = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'historyLogin/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataHistoryLogin = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'historyLogin/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    init.filterDataHistoryLogin = function(pageNumber, dateStart, dateEnd) {
        // console.log("Date Start", dateStart);
        // console.log("Date End", dateEnd);
        return $http({
            method: 'GET',
            url: 'historyLogin/list?page=' + pageNumber + '&datestart=' + dateStart + '&dateend=' + dateEnd
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    return init;
})
