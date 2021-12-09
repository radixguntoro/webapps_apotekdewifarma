var app = angular.module('factoryReportStockOpname', []);
app.factory('reportStockOpnameFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.dataReportStockOpname = [];
    init.totalItems = [];
    init.eachDataReportStockOpname = [];
    var input = {};

    init.filterDataReportStockOpname = function(dateStart, dateEnd, stockMin, stockPlus) {
        var stock_min = typeof(stockMin) == "undefined" ? '' : stockMin;
        var stock_plus = typeof(stockPlus) == "undefined" ? '' : stockPlus;
        console.log("Min", stock_min);
        console.log("Plus", stock_plus);
        return $http({
            method: 'GET',
            url: 'reportStockOpname/filter?datestart=' + dateStart + '&dateend=' + dateEnd + '&stockmin=' + stock_min + '&stockplus=' + stock_plus
        }).then(function(response) {
            init.resultData = response.data;
        }, function(response) {});
    };

    // Get Transaction Sales Detail
    init.showStockOpnameDetail = function(input) {
        return $http({
            method: 'GET',
            url: 'reportStockOpname/detail/' + input.stock_opname_id
        }).then(function(response) {
            init.dataStockOpnameDetail = response.data;
        }, function(response) {
            console.log("Error");
        });
    }

    return init;
})
