var app = angular.module('factoryItem', []);
app.factory('itemFactory', function($http, toastr) {
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

    init.insertDataItem = function(input) {
        return $http({
            method: 'POST',
            url: 'item/insert',
            data: {
                name: input.item.name,
                barcode_box: input.item.barcode_box,
                barcode_strip: input.item.barcode_strip,
                note: input.item.note,
                // category_id: input.item.category_id,
                price_purchase_per_box: input.item.price_purchase_per_box,
                price_purchase_per_strip: input.item.price_purchase_per_strip,
                price_purchase_per_tablet: input.item.price_purchase_per_tablet,
                percent_profit_per_box: input.item.percent_profit_per_box,
                percent_profit_per_strip: input.item.percent_profit_per_strip,
                percent_profit_per_tablet: input.item.percent_profit_per_tablet,
                price_sell_per_box: input.item.price_sell_per_box,
                price_sell_per_strip: input.item.price_sell_per_strip,
                price_sell_per_tablet: input.item.price_sell_per_tablet,
                qty_in_box: input.item.qty_in_box,
                qty_in_strip: input.item.qty_in_strip,
                qty_in_tablet: input.item.qty_in_tablet,
                qty_total: input.item.qty_total,
                qty_min: input.item.qty_min,
                status: input.status
            },
        }).then(function(response) {
            toastr.success('Data berhasil disimpan', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal disimpan', 'Gagal!');
        });
    }

    init.getDataEachItem = function(input) {
        return $http({
            method: 'GET',
            url: 'item/edit/' + input,
        }).then(function(response) {
            init.eachDataItem = response.data;
        }, function(response) {});
    }

    init.updateDataItem = function(input) {
        return $http({
            method: 'POST',
            url: 'item/update/' + input.id,
            data: {
                name: input.item.name,
                barcode_box: input.item.barcode_box,
                barcode_strip: input.item.barcode_strip,
                note: input.item.note,
                // category_id: input.item.category_id,
                price_purchase_per_box: input.item.price_purchase_per_box,
                price_purchase_per_strip: input.item.price_purchase_per_strip,
                price_purchase_per_tablet: input.item.price_purchase_per_tablet,
                percent_profit_per_box: input.item.percent_profit_per_box,
                percent_profit_per_strip: input.item.percent_profit_per_strip,
                percent_profit_per_tablet: input.item.percent_profit_per_tablet,
                price_sell_per_box: input.item.price_sell_per_box,
                price_sell_per_strip: input.item.price_sell_per_strip,
                price_sell_per_tablet: input.item.price_sell_per_tablet,
                qty_in_box: input.item.qty_in_box,
                qty_in_strip: input.item.qty_in_strip,
                qty_in_tablet: input.item.qty_in_tablet,
                qty_total: input.item.qty_total,
                qty_min: input.item.qty_min,
                status: input.status
            }
        }).then(function(response) {
            toastr.success('Data berhasil diubah', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal diubah', 'Gagal!');
        });
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

    init.getMinStockItem = function() {
        return $http({
            method: 'GET',
            url: 'item/min-stock',
        }).then(function(response) {
            init.minStockItem = response.data;
        }, function(response) {});
    }

    return init;
})
