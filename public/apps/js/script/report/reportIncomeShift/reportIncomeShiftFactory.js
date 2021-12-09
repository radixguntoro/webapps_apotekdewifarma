var app = angular.module('factoryReportIncomeShift', []);
app.factory('reportIncomeShiftFactory', function($http, toastr) {
    var init = {};
    init.data = {};
    init.resultData = [];
    init.totalItems = [];
    var input = {};

    init.filterDataReportIncomeShift = function(dateStart) {
        return $http({
            method: 'GET',
            url: 'reportIncomeShift/filter?datestart=' + dateStart
        }).then(function(response) {
            init.shift_morning = response.data.shift_morning;
            init.shift_evening = response.data.shift_evening;
            init.shift_night = response.data.shift_night;
            console.log(init.resultData);
        }, function(response) {});
    };

    return init;
})
