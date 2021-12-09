var app = angular.module('factoryTransactionPurchases', []);
app.factory('transactionPurchasesFactory', function($http, $filter, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataTransactionPurchases = [];
    init.totalItems = [];
    init.eachDataTransactionPurchases = [];
    var input = {};

    // Pagination and Search Function
    init.searchDataTransactionPurchases = function(pageNumber, searchText) {
        return $http({
            method: 'GET',
            url: 'transactionPurchases/list?search=' + searchText + '&page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    };

    init.getDataTransactionPurchases = function(pageNumber) {
        return $http({
            method: 'GET',
            url: 'transactionPurchases/list?page=' + pageNumber
        }).then(function(response) {
            init.resultData = response.data.data;
            init.totalItems = response.data.total;
        }, function(response) {});
    }

    init.insertDataTransactionPurchases = function(input) {
        return $http({
            method: 'POST',
            url: 'transactionPurchases/insert',
            data: {
                code: input.tr_purchases.code,
                invoice: input.tr_purchases.invoice,
                date_input: $filter('date')(input.tr_purchases.date_input, 'yy-MM-dd'),
                cart: input.cart,
                total_price: input.tr_purchases.total_price,
                disc_total: input.tr_purchases.disc_total,
                ppn: input.tr_purchases.ppn,
                grand_total: input.tr_purchases.grand_total,
                supplier_id: input.supplier.id
            },
        }).then(function(response) {
            toastr.success('Data berhasil disimpan', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal disimpan', 'Gagal!');
        });
    }

    init.getDataEachTransactionPurchases = function(input) {
        return $http({
            method: 'GET',
            url: 'transactionPurchases/edit/' + input,
        }).then(function(response) {
            init.dataTransactionPurchases = response.data.tr_purchases;
            init.dataSupplier = response.data.supplier;
            init.dataTransactionPurchasesDetail = response.data.tr_purchases_detail;
            console.log("Resp", response);
        }, function(response) {});
    }

    init.updateDataTransactionPurchases = function(input) {
        console.log("Data Input", input);
        return $http({
            method: 'POST',
            url: 'transactionPurchases/update/' + input.id,
            data: {
                cart: input.cart,
                tr_purchases_cart: input.tr_purchases_cart,
                total_price: input.tr_purchases.total_price,
                disc_total: input.tr_purchases.disc_total,
                ppn: input.tr_purchases.ppn,
                grand_total: input.tr_purchases.grand_total,
                supplier_id: input.supplier.id
            }
        }).then(function(response) {
            toastr.success('Data berhasil diubah', 'Sukses!');
        }, function(response) {
            toastr.error('Data gagal diubah', 'Gagal!');
        });
    }

    init.getAllDataTransactionPurchases = function() {
        return $http({
            method: 'GET',
            url: 'transactionPurchases/all',
        }).then(function(response) {
            init.allDataTransactionPurchases = response.data;
        }, function(response) {});
    }

    init.getDataCart = function() {
        return $http({
            method: 'GET',
            url: 'transactionPurchases/getCart'
        }).then(function(response) {
            init.resDataCart = response.data;
        }, function(response) {});
    }

    init.addCart = function(input) {
        console.log("Ready", input);
        return $http({
            method: 'POST',
            url: 'transactionPurchases/cartAdd',
            data: {
                id: input.item.id,
                name: input.item.name,
                qty: input.item.qty,
                price: input.item.price,
                qty_in_box: input.item.qty_in_box,
                qty_in_strip: input.item.qty_in_strip,
                qty_in_tablet: input.item.qty_in_tablet,
                price_sell_per_box: input.item.price_sell_per_box,
                price_sell_per_strip: input.item.price_sell_per_strip,
                price_sell_per_tablet: input.item.price_sell_per_tablet,
                price_purchase_per_box: input.item.price_purchase_per_box,
                price_purchase_per_strip: input.item.price_purchase_per_strip,
                price_purchase_per_tablet: input.item.price_purchase_per_tablet,
                percent_profit_per_box: input.item.percent_profit_per_box,
                percent_profit_per_strip: input.item.percent_profit_per_strip,
                percent_profit_per_tablet: input.item.percent_profit_per_tablet
            },
        }).then(function(response) {
            init.resDataCart = response.data;
        }, function(response) {});
    }

    init.removeCart = function(input) {
        console.log("Ready", input);
        return $http({
            method: 'GET',
            url: 'transactionPurchases/cartRemove/' + input.item.rowId
        }).then(function(response) {
            console.log("Barang berhasil dihapus");
        }, function(response) {});
    }

    init.removeCartEdit = function(input) {
        console.log("Ready", input);
        return $http({
            method: 'GET',
            url: 'transactionPurchases/cartEditRemove/' + input.item.itemId
        }).then(function(response) {
            console.log("Barang berhasil dihapus");
        }, function(response) {});
    }

    init.deleteDataReportTransPurchases = function(input) {
        console.log(input.id);
        return $http({
            method: 'POST',
            url: 'transactionPurchases/delete/' + input.id
        }).then(function(response) {
            console.log("Barang berhasil dihapus");
			toastr.success('Data berhasil dihapus', 'Sukses!');
        }, function(response) {});
    }

    return init;
})
