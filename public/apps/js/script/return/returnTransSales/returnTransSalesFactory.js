var app = angular.module('factoryReturnTransSales', []);
app.factory('returnTransSalesFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataReturnTransSales = [];
    init.totalItems = [];
    init.eachDataReturnTransSales = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataReturnTransSales = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'returnTransSales/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataReturnTransSales = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'returnTransSales/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    init.filterDataReturnTransSales = function(pageNumber, code) {
        // console.log("Date Start", dateStart);
        console.log("Code", code);
        return $http({
            method: 'GET',
            url: 'returnTransSales/list?page=' + pageNumber + '&code=' + code
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataCart = function() {
        return $http({
            method: 'GET',
            url: 'returnTransSales/getCart'
        }).then(function(response) {
            init.resDataCart = response.data;
        }, function(response) {});
    }

    init.addCart = function(input) {
        console.log("Ready", input);
        return $http({
            method: 'POST',
            url: 'returnTransSales/cartAdd',
            data: {
                id: input.item.id,
                name: input.item.name,
                qty: input.item.qty,
                price: input.item.price,
                unit: input.item.unit,
                price_sell_per_box: input.item.price_sell_per_box,
                price_sell_per_strip: input.item.price_sell_per_strip,
                price_sell_per_tablet: input.item.price_sell_per_tablet
            },
        }).then(function(response) {
            init.resDataCart = response.data;
        }, function(response) {});
    }

    init.removeCart = function(input) {
        console.log("Ready", input);
        return $http({
            method: 'GET',
            url: 'returnTransSales/cartRemove/' + input.item.rowId
        }).then(function(response) {
            console.log("Barang berhasil dihapus");
        }, function(response) {});
    }

    init.insertDataRetTransSales = function(input) {
        console.log('Ready', input);
        return $http({
            method: 'POST',
            url: 'returnTransSales/insert',
            data: {
                cart: input.cart,
            },
        }).then(function(response) {
            toastr.success('Data berhasil disimpan', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal disimpan', 'Gagal!');
        });
    }

    return init;
})
