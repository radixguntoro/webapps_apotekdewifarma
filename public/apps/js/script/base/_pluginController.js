var app = angular.module('pluginCtrl', []);

app.controller('pluginController', function($scope, $timeout, $window, $location, $state, hotkeys, itemFactory) {

    $scope.todayDate = new Date();
    $scope.countNotif = 1;
    $scope.user_id = angular.element('#user_id').val();
    $scope.notification = function() {
        itemFactory.getMinStockItem()
        .then(function() {
            //$scope.min_stock = itemFactory.minStockItem;
			$scope.min_stock = '';
        });
    }
    $scope.notification();

    if ($scope.user_id != 1) {
        // Key Master
        hotkeys.add({
            combo: 'ctrl+1',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $state.go('item-list');
            }
        });
        if ($scope.user_id == 99 || $scope.user_id == 0) {
            hotkeys.add({
                combo: 'ctrl+2',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: function(event, hotkey) {
                    $state.go('user-list');
                }
            });
        }
        if ($scope.user_id == 99 || $scope.user_id == 0 || $scope.user_id == 2) {
            hotkeys.add({
                combo: 'ctrl+3',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: function(event, hotkey) {
                    $state.go('supplier-list');
                }
            });
        }
    }

    // Key Transaction Sales
    hotkeys.add({
        combo: 'alt+1',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function(event, hotkey) {
            $state.go('transaction-sales-create');
        }
    });

    if ($scope.user_id != 1) {
        hotkeys.add({
            combo: 'alt+2',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $state.go('transaction-purchases-create');
            }
        });
        if ($scope.user_id == 99 || $scope.user_id == 0) {
            hotkeys.add({
                combo: 'alt+3',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: function(event, hotkey) {
                    $state.go('stock-opname');
                }
            });
        }
    }
    hotkeys.add({
        combo: 'alt+4',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function(event, hotkey) {
            $state.go('ret-trans-sales-create');
        }
    });

    if ($scope.user_id != 1) {
        hotkeys.add({
            combo: 'alt+5',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $state.go('ret-trans-purchases-create');
            }
        });
    }

    if ($scope.user_id == 99 || $scope.user_id == 0) {
        hotkeys.add({
            combo: 'alt+6',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $state.go('closing-cashier');
            }
        });
    }

    if ($scope.user_id != 1) {
        hotkeys.add({
            combo: 'ctrl+4',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $state.go('rep-trans-purchases');
            }
        });
        if ($scope.user_id == 99 || $scope.user_id == 0) {
            hotkeys.add({
                combo: 'ctrl+5',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: function(event, hotkey) {
                    $state.go('rep-trans-sales');
                }
            });
            hotkeys.add({
                combo: 'ctrl+6',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: function(event, hotkey) {
                    $state.go('rep-stock-opname');
                }
            });
            hotkeys.add({
                combo: 'ctrl+7',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: function(event, hotkey) {
                    $state.go('rep-item-card');
                }
            });
            hotkeys.add({
                combo: 'ctrl+8',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: function(event, hotkey) {
                    $state.go('rep-income-cashier');
                }
            });
            hotkeys.add({
                combo: 'ctrl+8',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: function(event, hotkey) {
                    $state.go('rep-income-shift');
                }
            });
        }
    }

    if ($scope.user_id == 99 || $scope.user_id == 0) {
        hotkeys.add({
            combo: 'ctrl+shift+1',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $state.go('his-trans-sales');
            }
        });
        hotkeys.add({
            combo: 'ctrl+shift+2',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $state.go('his-trans-purchases');
            }
        });
        hotkeys.add({
            combo: 'ctrl+shift+3',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $state.go('his-stock-opname');
            }
        });
        hotkeys.add({
            combo: 'ctrl+shift+4',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $state.go('his-login');
            }
        });
    }

    hotkeys.add({
        combo: 'alt+shift+q',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function(event, hotkey) {
            $timeout(function() {
                angular.element('#logout').triggerHandler('click');
            }, 0);
        }
    });
});
