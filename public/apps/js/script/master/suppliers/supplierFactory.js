var app = angular.module('factorySupplier', []);
app.factory('supplierFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataSupplier = [];
    init.totalItems = [];
    init.eachDataSupplier = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataSupplier = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'supplier/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataSupplier = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'supplier/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    init.insertDataSupplier = function(input) {
        console.log(input);
        return $http({
            method: 'POST',
            url: 'supplier/insert',
            data: {
                name: input.supplier.name,
                address: input.supplier.address,
                province: input.supplier.province,
                city: input.supplier.city,
                zip_code: input.supplier.zip_code,
                phone_1: input.supplier.phone_1,
                phone_2: input.supplier.phone_2,
                phone_3: input.supplier.phone_3,
                email: input.supplier.email,
                status: input.status
            },
        }).then(function(response) {
            toastr.success('Data berhasil disimpan', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal disimpan', 'Gagal!');
        });
    }

    init.getDataEachSupplier = function(input) {
        return $http({
            method: 'GET',
            url: 'supplier/edit/' + input,
        }).then(function(response) {
            init.eachDataSupplier = response.data;
        }, function(response) {});
    }

    init.updateDataSupplier = function(input) {
        console.log("Data Input", input);
        return $http({
            method: 'POST',
            url: 'supplier/update/' + input.id,
            data: {
                name: input.supplier.name,
                address: input.supplier.address,
                province: input.supplier.province,
                city: input.supplier.city,
                zip_code: input.supplier.zip_code,
                phone_1: input.supplier.phone_1,
                phone_2: input.supplier.phone_2,
                phone_3: input.supplier.phone_3,
                email: input.supplier.email,
                status: input.status
            }
        }).then(function(response) {
            toastr.success('Data berhasil diubah', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal diubah', 'Gagal!');
        });
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

    init.searchSupplierManual = function(searchText) {
        return $http({
            method: 'GET',
            url: 'supplier/manual?search=' + searchText.typo
        }).then(function(response) {
            init.resSearchSupplier = response.data.data;
        }, function(response) {});
    }

    return init;
})
