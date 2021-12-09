var app = angular.module('factoryHistoryItem', []);
app.factory('historyItemFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataItem = [];
    init.totalItems = [];
    init.eachDataItem = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataItem = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'item/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataItem = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'item/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    // Get Item Detail
    init.showItemDetail = function(input) {
        return $http({
            method: 'GET',
            url: 'item/detail/' + input.item_id
        }).then(function(response) {
            init.dataItemDetail = response.data;
        }, function(response) {
            console.log("Error");
        });
    }

    // Search Item Manual
    init.searchItemManual = function(searchText) {
        return $http({
            method: 'GET',
            url: 'item/manual?search=' + searchText.typo
        }).then(function(response) {
            init.resSearchItem = response.data.data;
        }, function(response) {});
    }

    init.getAllDataItem = function() {
        return $http({
            method: 'GET',
            url: 'item/all',
        }).then(function(response) {
            init.allDataItem = response.data;
        }, function(response) {});
    }

    // Get Supplier
    init.searchSupplier = function(input) {
        return $http({
            method: 'GET',
            url: 'item/recordSupplier/' + input.item_id
        }).then(function(response) {
            init.dataSupplier = response.data;
            console.log(init.dataSupplier);
        }, function(response) {
            console.log("Error");
        });
    }

    return init;
})
