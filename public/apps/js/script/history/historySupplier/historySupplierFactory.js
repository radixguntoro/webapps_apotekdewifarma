var app = angular.module('factoryHistorySupplier', []);
app.factory('historySupplierFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataSupplier = [];
    init.totalSuppliers = [];
    init.eachDataSupplier = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataSupplier = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'supplier/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalSuppliers = response.data.total;
        }, function(response) {});
    };

    init.getDataSupplier = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'supplier/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalSuppliers = response.data.total;
        }, function(response) {});
    }

    // Get Supplier Detail
    init.showSupplierDetail = function(input) {
        return $http({
            method: 'GET',
            url: 'supplier/detail/' + input.supplier_id
        }).then(function(response) {
            init.dataSupplierDetail = response.data;
        }, function(response) {
            console.log("Error");
        });
    }

    // Search Supplier Manual
    init.searchSupplierManual = function(searchText) {
        return $http({
            method: 'GET',
            url: 'supplier/manual?search=' + searchText.typo
        }).then(function(response) {
            init.resSearchSupplier = response.data.data;
        }, function(response) {});
    }

    init.getAllDataSupplier = function() {
        return $http({
            method: 'GET',
            url: 'supplier/all',
        }).then(function(response) {
            init.allDataSupplier = response.data;
        }, function(response) {});
    }

    // Get Supplier
    init.searchItem = function(input) {
        return $http({
            method: 'GET',
            url: 'supplier/recordItem/' + input.supplier_id
        }).then(function(response) {
            init.dataItem = response.data;
            console.log(init.dataItem);
        }, function(response) {
            console.log("Error");
        });
    }

    return init;
})
