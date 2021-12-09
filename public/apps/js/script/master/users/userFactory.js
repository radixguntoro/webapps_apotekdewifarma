var app = angular.module('factoryUser', []);
app.factory('userFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataUser = [];
    init.totalItems = [];
    init.eachDataUser = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataUser = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'user/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataUser = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'user/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    init.insertDataUser = function(input) {
        console.log(input);
        return $http({
            method: 'POST',
            url: 'user/insert',
            data: {
                first_name: input.user.first_name,
                last_name: input.user.last_name,
                ktp: input.user.ktp,
                birthdate: input.user.birthdate,
                address: input.user.address,
                province: input.user.province,
                city: input.user.city,
                zip_code: input.user.zip_code,
                phone: input.user.phone,
                email: input.user.email,
                permission: input.user.permission,
                password: input.user.password,
                gender: input.gender,
                status: input.status
            },
        }).then(function(response) {
            toastr.success('Data berhasil disimpan', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal disimpan', 'Gagal!');
        });
    }

    init.getDataEachUser = function(input) {
        return $http({
            method: 'GET',
            url: 'user/edit/' + input,
        }).then(function(response) {
            init.eachDataUser = response.data;
        }, function(response) {});
    }

    init.updateDataUser = function(input) {
        console.log("Data Input", input);
        return $http({
            method: 'POST',
            url: 'user/update/' + input.id,
            data: {
                first_name: input.user.first_name,
                last_name: input.user.last_name,
                ktp: input.user.ktp,
                birthdate: input.user.birthdate,
                address: input.user.address,
                province: input.user.province,
                city: input.user.city,
                zip_code: input.user.zip_code,
                phone: input.user.phone,
                email: input.user.email,
                permission: input.user.permission,
                password: input.user.password,
                gender: input.gender,
                status: input.status
            }
        }).then(function(response) {
            toastr.success('Data berhasil diubah', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal diubah', 'Gagal!');
        });
    }

    // Get User Detail
    init.showUserDetail = function(input) {
        return $http({
            method: 'GET',
            url: 'user/detail/' + input.user_id
        }).then(function(response) {
            init.dataUserDetail = response.data;
        }, function(response) {
            console.log("Error");
        });
    }

    init.getAllDataUser = function() {
        return $http({
            method: 'GET',
            url: 'user/all',
        }).then(function(response) {
            init.allDataUser = response.data;
            console.log("Tes", response.data);
        }, function(response) {});
    }

    return init;
})
