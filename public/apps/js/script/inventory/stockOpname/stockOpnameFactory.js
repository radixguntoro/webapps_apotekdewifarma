var app = angular.module('factoryStockOpname', []);
app.factory('stockOpnameFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataStockOpname = [];
    init.totalItems = [];
    init.eachDataStockOpname = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataStockOpname = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'stockOpname/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataStockOpname = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'stockOpname/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    init.insertDataStockOpname = function(input) {
        return $http({
            method: 'POST',
            url: 'stockOpname/insert',
            data: {
                price_purchase_app: input.stock_opname.price_purchase_app,
                price_purchase_phx: input.stock_opname.price_purchase_phx,
                price_purchase_difference: input.stock_opname.price_purchase_difference,
                price_sell_app: input.stock_opname.price_sell_app,
                price_sell_phx: input.stock_opname.price_sell_phx,
                price_sell_difference: input.stock_opname.price_sell_difference,
                unit: input.stock_opname.unit,
                item_id: input.stock_opname.item_id,
                stock_in_system: input.stock_opname.stock_in_system,
                stock_in_physic: input.stock_opname.stock_in_physic,
                stock_difference: input.stock_opname.stock_difference,
                code: input.stock_opname.code,
                status: "proses"
            },
        }).then(function(response) {
            toastr.success('Data berhasil disimpan', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal disimpan', 'Gagal!');
        });
    }

    init.stockOpnameDone = function(input) {
		return $http({
            method: 'POST',
            url: 'stockOpname/done',
            data: {
                stock_opname: input.stock_opname
            },
        }).then(function(response) {
            toastr.success('Data berhasil disimpan', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal disimpan', 'Gagal!');
        });
    }

    init.editDataStockOpname = function(input) {
        console.log('Done', input);
        return $http({
            method: 'POST',
            url: 'stockOpname/edit',
            data: {
                id: input.stock_opname.id,
                status: "proses"
            },
        }).then(function(response) {
            toastr.warning('Pengubahan data', 'Pengubahan!');
        }, function(response) {
            toastr.error('Data gagal disimpan', 'Gagal!');
        });
    }

    init.deleteDataStockOpname = function(input) {
        return $http({
            method: 'POST',
            url: 'stockOpname/delete',
            data: {
                id: input.stock_opname.id,
            },
        }).then(function(response) {
            toastr.success('Data berhasil dihapus', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal disimpan', 'Gagal!');
        });
    }

    return init;
})
