var app = angular.module('factoryTransactionSales', []);
app.factory('transactionSalesFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataTransactionSales = [];
    init.totalItems = [];
    init.eachDataTransactionSales = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataTransactionSales = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'transactionSales/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataTransactionSales = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'transactionSales/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    init.filterDataTransactionSales = function(pageNumber, dateStart, dateEnd) {


        return $http({
            method: 'GET',
            url: 'transactionSales/list?page=' + pageNumber + '&datestart=' + dateStart + '&dateend=' + dateEnd
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.insertDataTransactionSales = function(input) {
        return $http({
            method: 'POST',
            url: 'transactionSales/insert',
            data: {
                total_price: input.transaction_sales.total_price,
                discount_price: input.transaction_sales.discprice,
                discount: input.transaction_sales.discount,
                grand_total: input.transaction_sales.grand_total,
                payment: input.transaction_sales.payment,
                balance: input.transaction_sales.balance,
                cart: input.cart,
                code: input.code
            },
        }).then(function(response) {
           toastr.success('Data berhasil disimpan', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal disimpan', 'Gagal!');
        });
    }

    init.getDataEachTransactionSales = function(input) {
        return $http({
            method: 'GET',
            url: 'transactionSales/edit/' + input,
        }).then(function(response) {
            init.eachDataTransactionSales = response.data;
        }, function(response) {});
    }

    init.updateDataTransactionSales = function(input) {
        return $http({
            method: 'POST',
            url: 'transactionSales/update/' + input.id,
            data: {
                name: input.transactionSales.name,
                parent_id: input.transactionSales_parent,
                status: input.transactionSales_status
            }
        }).then(function(response) {
            toastr.success('Data berhasil diubah', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal diubah', 'Gagal!');
        });
    }

    init.getAllDataTransactionSales = function() {
        return $http({
            method: 'GET',
            url: 'transactionSales/all',
        }).then(function(response) {
            init.allDataTransactionSales = response.data;
        }, function(response) {});
    }

    init.getDataCart = function(input) {
        return $http({
            method: 'GET',
            url: 'transactionSales/getCart/' + input.user_id
        }).then(function(response) {
            init.resDataCart = response.data;
        }, function(response) {});
    }

    init.addCart = function(input) {
        console.log("Inputan Penjualan", input);
        return $http({
            method: 'POST',
            url: 'transactionSales/cartAdd',
            data: {
                barcode_box: input.item.barcode_box
                , barcode_strip: input.item.barcode_strip
                , created_at: input.item.created_at
                , id: input.item.id
                , name: input.item.name
                , note: input.item.note
                , percent_profit_per_box: input.item.percent_profit_per_box
                , percent_profit_per_strip: input.item.percent_profit_per_strip
                , percent_profit_per_tablet: input.item.percent_profit_per_tablet
                , price_purchase_per_box: input.item.price_purchase_per_box
                , price_purchase_per_strip: input.item.price_purchase_per_strip
                , price_purchase_per_tablet: input.item.price_purchase_per_tablet
                , price_sell_per_box: input.item.price_sell_per_box
                , price_sell_per_strip: input.item.price_sell_per_strip
                , price_sell_per_tablet: input.item.price_sell_per_tablet
                , qty_in_bottle: input.item.qty_in_bottle
                , qty_in_box: input.item.qty_in_box
                , qty_in_strip: input.item.qty_in_strip
                , qty_in_tablet: input.item.qty_in_tablet
                , qty_min: input.item.qty_min
                , qty_total: input.item.qty_total
                , sku: input.item.sku
            },
        }).then(function(response) {
            init.resDataCart = response.data;
        }, function(response) {});
    }

    init.removeCart = function(input) {
        return $http({
            method: 'POST',
            url: 'transactionSales/cartRemove',
            data: {
                row_id: input.item_id,
                username: input.username,
                password: input.password
            },
        }).then(function(response) {
            if (response.data == 1) {
                toastr.success('Barang berhasil dihapus dari keranjang', 'Otorisasi Benar!');
                init.resCart = response.data;
            } else if (response.data == 500 || response.data == 404) {
                toastr.error('User anda tidak diijinkan', 'Otorisasi Gagal!');
                init.resCart = response.data;
            } else {
                toastr.error('Barang gagal dihapus dari keranjang', 'Otorisasi Salah!');
                init.resCart = response.data;
            }
        }, function(response) {});
    }

    init.destroyCart = function(input) {
        return $http({
            method: 'GET',
            url: 'transactionSales/cartDestroy'
        }).then(function(response) {
            init.resDataCart = response.data;
        }, function(response) {});
    }

    // Search Item
    init.getDataItem = function(input) {
        console.log("Barcode", input);
        return $http({
            method: 'GET',
            url: 'transactionSales/searchItemManual/' + input.item_id
        }).then(function(response) {
            init.resDataItem = response.data;
        }, function(response) {});
    }

    init.searchItemBarcode = function(input) {
        console.log("Barcode", input);
        return $http({
            method: 'GET',
            url: 'transactionSales/barcode/' + input.barcode
        }).then(function(response) {
            console.log(response.data);
            init.resSearchItem = response.data;
        }, function(response) {});
    }

    init.printLastTrSales = function() {
        return $http({
            method: 'GET',
            url: 'transactionSales/printLastTrSales'
        }).then(function(response) {
            console.log(response.data);
            init.resLastTrSales = response.data;
        }, function(response) {});
    }

    return init;
})
