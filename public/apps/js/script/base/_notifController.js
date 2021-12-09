var app = angular.module('notifCtrl', []);

app.controller('notifController', function($scope, $timeout, $window, $location, $state, hotkeys, itemFactory) {
    $scope.notification = function() {
        itemFactory.getMinStockItem()
        .then(function() {
            $scope.min_stock = itemFactory.minStockItem;
        });
    }
    $scope.notification();
});
