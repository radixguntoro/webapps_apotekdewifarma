var app = angular.module('factoryCategory', []);
app.factory('categoryFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataCategory = [];
    init.totalItems = [];
    init.eachDataCategory = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataCategory = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'category/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataCategory = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'category/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    init.insertDataCategory = function(input) {
        return $http({
            method: 'POST',
            url: 'category/insert',
            data: {
                name: input.category.name
            },
        }).then(function(response) {
            toastr.success('Data berhasil disimpan', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal disimpan', 'Gagal!');
        });
    }

    init.getDataEachCategory = function(input) {
        return $http({
            method: 'GET',
            url: 'category/edit/' + input,
        }).then(function(response) {
            init.eachDataCategory = response.data;
        }, function(response) {});
    }

    init.updateDataCategory = function(input) {
        console.log("Data Input", input);
        return $http({
            method: 'POST',
            url: 'category/update/' + input.id,
            data: {
                name: input.category.name,
                parent_id: input.category_parent,
                status: input.category_status
            }
        }).then(function(response) {
            toastr.success('Data berhasil diubah', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal diubah', 'Gagal!');
        });
    }

    init.getAllDataCategory = function() {
        return $http({
            method: 'GET',
            url: 'category/all',
        }).then(function(response) {
            init.allDataCategory = response.data;
            console.log("Tes", response.data);
        }, function(response) {});
    }

    return init;
})
