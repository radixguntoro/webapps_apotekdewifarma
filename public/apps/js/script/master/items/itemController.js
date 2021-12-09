var app = angular.module('itemCtrl', ['factoryItem']);

app.controller('itemController', function($rootScope, $scope, $stateParams, $window, $timeout, $location, $http, $state, toastr, hotkeys, itemFactory) {
    //##############################//
    //      DEKLARASI VARIABLE      //
    //##############################//
    $rootScope.$state = $state;

    $scope.data = [];
    $scope.libraryTemp = {};
    $scope.totalItemsTemp = {};
    $scope.totalItems = 0;
    $scope.pagination = {
        current: 1
    };

    $scope.item = {
        price_purchase_per_box : "0"
        , price_purchase_per_strip : "0"
        , price_purchase_per_tablet : "0"
        , price_purchase_per_bottle : "0"
        , percent_profit_per_box : "0"
        , percent_profit_per_strip : "0"
        , percent_profit_per_tablet : "0"
        , percent_profit_per_bottle : "0"
        , price_sell_per_box : "0"
        , price_sell_per_strip : "0"
        , price_sell_per_tablet : "0"
        , price_sell_per_bottle : "0"
        , qty_in_box : "0"
        , qty_in_strip : "0"
        , qty_in_tablet : "0"
        , qty_in_bottle : "0"
        , qty_total : "0"
        , qty_min : "10"
        , discount : "0"
    };
    $scope.status = "A";
    // $scope.category = {};
    // $scope.category.selected = {
    //     id: 1,
    //     name: 'Pilih kategori'
    // };

    //##############################//
    //    PERHITUNGAN KUANTITAS     //
    //##############################//
    $scope.calcPurchaseStripTablet = function(elm, event) {
        if (elm.item.price_purchase_per_box == null | elm.item.price_purchase_per_box == 0) {
            elm.item.price_purchase_per_box = 0;
        } else if ($scope.item.qty_in_box > 0 && $scope.item.qty_in_strip > 0 && $scope.item.qty_in_tablet > 0) {
            // Perhitungan Harga per Strip
            var price_purchase_per_box = $scope.item.price_purchase_per_box;
            var price_purchase_per_strip = $scope.item.price_purchase_per_strip;
            var qty_in_strip = $scope.item.qty_in_strip;
            $scope.item.price_purchase_per_strip = price_purchase_per_box / qty_in_strip;
            // Perhitungan Harga per Tablet
            var price_purchase_per_strip = $scope.item.price_purchase_per_strip;
            var qty_in_tablet = $scope.item.qty_in_tablet;
            $scope.item.price_purchase_per_tablet = price_purchase_per_strip / qty_in_tablet;
        } else if ($scope.item.qty_in_box > 0 && $scope.item.qty_in_strip < 1 && $scope.item.qty_in_tablet > 0) {
            // Perhitungan Harga per Tablet
            var price_purchase_per_box = $scope.item.price_purchase_per_box;
            var qty_in_tablet = $scope.item.qty_in_tablet;
            $scope.item.price_purchase_per_tablet = price_purchase_per_box / qty_in_tablet;
        }
    }

    $scope.calcSellStripTablet = function(elm, event) {
        if (elm.item.price_sell_per_box == null | elm.item.price_sell_per_box == 0) {
            elm.item.price_sell_per_box = 0;
        } else if ($scope.item.qty_in_box > 0 && $scope.item.qty_in_strip > 0 && $scope.item.qty_in_tablet > 0) {
            // Perhitungan Harga per Strip
            var price_sell_per_box = $scope.item.price_sell_per_box;
            var price_sell_per_strip = $scope.item.price_sell_per_strip;
            var qty_in_strip = $scope.item.qty_in_strip;
            $scope.item.price_sell_per_strip = price_sell_per_box / qty_in_strip;
            // Perhitungan Harga per Tablet
            var price_sell_per_strip = $scope.item.price_sell_per_strip;
            var qty_in_tablet = $scope.item.qty_in_tablet;
            $scope.item.price_sell_per_tablet = price_sell_per_strip / qty_in_tablet;
        }
    }

    $scope.calcQtyTotal = function(elm, event) {
        if (elm.item.qty_in_tablet == null | elm.item.qty_in_tablet == 0) {
            elm.item.qty_in_tablet = 0;
        }
        // Perhitungan Harga per Strip
        var qty_in_strip = $scope.item.qty_in_strip;
        var qty_in_tablet = $scope.item.qty_in_tablet;
        // $scope.item.qty_total = qty_in_strip * qty_in_tablet;
    }

    $scope.validQtyInBox = function(elm, event) {
        if (elm.item.qty_in_box == null | elm.item.qty_in_box == 0) {
            elm.item.qty_in_box = 0;
        }
    };

    $scope.validQtyInStrip = function(elm, event) {
        if (elm.item.qty_in_strip == null | elm.item.qty_in_strip == 0) {
            elm.item.qty_in_strip = 0;
        }
    };

    $scope.validQtyInBottle = function(elm, event) {
        if (elm.item.qty_in_bottle == null | elm.item.qty_in_bottle == 0) {
            elm.item.qty_in_bottle = 0;
        }
    };

    $scope.validPricePurchaseBox = function(elm, event) {
        if (elm.item.price_purchase_per_box == null | elm.item.price_purchase_per_box == 0) {
            elm.item.price_purchase_per_box = 0;
        }
    };

    $scope.validPricePurchaseStrip = function(elm, event) {
        if (elm.item.price_purchase_per_strip == null | elm.item.price_purchase_per_strip == 0) {
            elm.item.price_purchase_per_strip = 0;
        }
    };

    $scope.validPricePurchaseTablet = function(elm, event) {
        if (elm.item.price_purchase_per_tablet == null | elm.item.price_purchase_per_tablet == 0) {
            elm.item.price_purchase_per_tablet = 0;
        }
    };

    $scope.validPricePurchaseBottle = function(elm, event) {
        if (elm.item.price_purchase_per_bottle == null | elm.item.price_purchase_per_bottle == 0) {
            elm.item.price_purchase_per_bottle = 0;
        }
    };

    $scope.validPriceSellBox = function(elm, event) {
        if (elm.item.price_sell_per_box == null | elm.item.price_sell_per_box == 0) {
            elm.item.price_sell_per_box = 0;
        }
    };

    $scope.validPriceSellStrip = function(elm, event) {
        if (elm.item.price_sell_per_strip == null | elm.item.price_sell_per_strip == 0) {
            elm.item.price_sell_per_strip = 0;
        }
    };

    $scope.validPriceSellTablet = function(elm, event) {
        if (elm.item.price_sell_per_tablet == null | elm.item.price_sell_per_tablet == 0) {
            elm.item.price_sell_per_tablet = 0;
        }
    };

    $scope.validPriceSellBottle = function(elm, event) {
        if (elm.item.price_sell_per_bottle == null | elm.item.price_sell_per_bottle == 0) {
            elm.item.price_sell_per_bottle = 0;
        }
    };

    $scope.validQtyTotal = function(elm, event) {
        if (elm.item.qty_total == null | elm.item.qty_total == 0) {
            elm.item.qty_total = 0;
        }
    };

    $scope.calcProfitBox = function(elm, event) {
        if (elm.item.percent_profit_per_strip == null | elm.item.percent_profit_per_strip == 0) {
            elm.item.percent_profit_per_strip = 0;
        }
        $scope.item.percent_profit_per_strip = $scope.item.percent_profit_per_box;
        $scope.item.percent_profit_per_tablet = $scope.item.percent_profit_per_box;
        // Perhitungan Harga per Box
        var price_purchase_per_box = parseInt($scope.item.price_purchase_per_box);
        var price_purchase_per_strip = parseInt($scope.item.price_purchase_per_strip);
        var price_purchase_per_tablet = parseInt($scope.item.price_purchase_per_tablet);
        var percent_profit_per_box = $scope.item.percent_profit_per_box;
        $scope.item.price_sell_per_box = price_purchase_per_box + (price_purchase_per_box * percent_profit_per_box);
        // Perhitungan Harga per Strip
        $scope.item.price_sell_per_strip = price_purchase_per_strip + (price_purchase_per_strip * percent_profit_per_box);
        // Perhitungan Harga per Tablet
        $scope.item.price_sell_per_tablet = price_purchase_per_tablet + (price_purchase_per_tablet * percent_profit_per_box);
    }

    $scope.calcProfitStrip = function(elm, event) {
        if (elm.item.percent_profit_per_strip == null | elm.item.percent_profit_per_strip == 0) {
            elm.item.percent_profit_per_strip = 0;
        }
        // Perhitungan Harga per Strip
        var price_purchase_per_strip = parseInt($scope.item.price_purchase_per_strip);
        var percent_profit_per_strip = $scope.item.percent_profit_per_strip;
        $scope.item.price_sell_per_strip = price_purchase_per_strip + (price_purchase_per_strip * percent_profit_per_strip);
    }

    $scope.calcProfitTablet = function(elm, event) {
        if (elm.item.percent_profit_per_tablet == null | elm.item.percent_profit_per_tablet == 0) {
            elm.item.percent_profit_per_tablet = 0;
        }
        // Perhitungan Harga per Strip
        var price_purchase_per_tablet = parseInt($scope.item.price_purchase_per_tablet);
        var percent_profit_per_tablet = $scope.item.percent_profit_per_tablet;
        $scope.item.price_sell_per_tablet = price_purchase_per_tablet + (price_purchase_per_tablet * percent_profit_per_tablet);
    }

    $scope.calcProfitBottle = function(elm, event) {
        if (elm.item.percent_profit_per_bottle == null | elm.item.percent_profit_per_bottle == 0) {
            elm.item.percent_profit_per_bottle = 0;
        }
        // Perhitungan Harga per Strip
        var price_purchase_per_bottle = parseInt($scope.item.price_purchase_per_bottle);
        var percent_profit_per_bottle = $scope.item.percent_profit_per_bottle;
        $scope.item.price_sell_per_bottle = price_purchase_per_bottle + (price_purchase_per_bottle * percent_profit_per_bottle);
    }

    //##############################//
    //  LIST, PAGINATION & SEARCH   //
    //##############################//
    $scope.getResultsPage = function(pageNumber) {
        $scope.loading = true;
        if (!$.isEmptyObject($scope.libraryTemp)) {
            itemFactory.searchDataItem(pageNumber, $scope.searchText)
                .then(function() {
                    $scope.data = itemFactory.resultData;
                    $scope.totalItems = itemFactory.totalItems;
                    $scope.loading = false;
                });
        } else {
            itemFactory.getDataItem(pageNumber)
                .then(function() {
                    $scope.data = itemFactory.resultData;
                    $scope.totalItems = itemFactory.totalItems;
                    $scope.loading = false;
                });
        }
    }

    $scope.pageChanged = function(newPage) {
        $scope.getResultsPage(newPage);
    };

    $scope.getResultsPage(1);

    $scope.searchData = function() {
        if ($scope.searchText.length >= 3) {
            if ($.isEmptyObject($scope.libraryTemp)) {
                $scope.libraryTemp = $scope.data;
                $scope.totalItemsTemp = $scope.totalItems;
                $scope.data = {};
            }
            $scope.getResultsPage(1);
        } else {
            if (!$.isEmptyObject($scope.libraryTemp)) {
                $scope.data = $scope.libraryTemp;
                $scope.totalItems = $scope.totalItemsTemp;
                $scope.libraryTemp = {};
                $scope.getResultsPage(1);
            }
        }
    }

    //##############################//
    //      FUNGSI CREATE DATA      //
    //##############################//
    $scope.createData = function() {
        if ($scope.item.name == null) {
            return true;
        } else {
            angular.element('#btn-save').attr('disabled', true);
            itemFactory.insertDataItem({
                item: {
                    name: $scope.item.name,
                    barcode_box: $scope.item.barcode_box,
                    barcode_strip: $scope.item.barcode_strip,
                    note: $scope.item.note,
                    // category_id: $scope.category.selected.id,
                    price_purchase_per_box: $scope.item.price_purchase_per_box,
                    price_purchase_per_strip: $scope.item.price_purchase_per_strip,
                    price_purchase_per_tablet: $scope.item.price_purchase_per_tablet,
                    percent_profit_per_box: $scope.item.percent_profit_per_box,
                    percent_profit_per_strip: $scope.item.percent_profit_per_strip,
                    percent_profit_per_tablet: $scope.item.percent_profit_per_tablet,
                    price_sell_per_box: $scope.item.price_sell_per_box,
                    price_sell_per_strip: $scope.item.price_sell_per_strip,
                    price_sell_per_tablet: $scope.item.price_sell_per_tablet,
                    qty_in_box: $scope.item.qty_in_box,
                    qty_in_strip: $scope.item.qty_in_strip,
                    qty_in_tablet: $scope.item.qty_in_tablet,
                    qty_total: $scope.item.qty_total,
                    qty_min: $scope.item.qty_min,
                },
                status: $scope.status,
            }).then(function() {
                $state.go("item-list");
                angular.element('#btn-save').attr('disabled', false);
                angular.element('#inp-search').focus();
                $scope.notification();
            });
        }
    }

    //##############################//
    //       FUNGSI EDIT DATA       //
    //##############################//
    if ($state.current.name == "item-edit") {
        itemFactory.getDataEachItem($stateParams.id)
            .then(function() {
                $scope.item = itemFactory.eachDataItem;
                $scope.status = itemFactory.eachDataItem.active;
                // $scope.category.selected = {
                //     id: itemFactory.eachDataItem.category_id,
                //     name: itemFactory.eachDataItem.category_name,
                // };
            });
        $scope.updateData = function() {
            if ($scope.item.name == null) {
                return true;
            } else {
                angular.element('#btn-save').attr('disabled', true);
                itemFactory.updateDataItem({
                    id: $stateParams.id,
                    item: {
                        name: $scope.item.name,
                        barcode_box: $scope.item.barcode_box,
                        barcode_strip: $scope.item.barcode_strip,
                        note: $scope.item.note,
                        // category_id: $scope.category.selected.id,
                        price_purchase_per_box: $scope.item.price_purchase_per_box,
                        price_purchase_per_strip: $scope.item.price_purchase_per_strip,
                        price_purchase_per_tablet: $scope.item.price_purchase_per_tablet,
                        percent_profit_per_box: $scope.item.percent_profit_per_box,
                        percent_profit_per_strip: $scope.item.percent_profit_per_strip,
                        percent_profit_per_tablet: $scope.item.percent_profit_per_tablet,
                        price_sell_per_box: $scope.item.price_sell_per_box,
                        price_sell_per_strip: $scope.item.price_sell_per_strip,
                        price_sell_per_tablet: $scope.item.price_sell_per_tablet,
                        qty_in_box: $scope.item.qty_in_box,
                        qty_in_strip: $scope.item.qty_in_strip,
                        qty_in_tablet: $scope.item.qty_in_tablet,
                        qty_total: $scope.item.qty_total,
                        qty_min: $scope.item.qty_min,
                    },
                    status: $scope.status
                }).then(function() {
                    $state.go("item-list");
                    angular.element('#btn-save').attr('disabled', false);
                    angular.element('#inp-search').focus();
                    $scope.notification();
                });
            }
        }
    }

    //##############################//
    //       FUNGSI HAPUS DATA      //
    //##############################//
    $scope.deleteDataItem = function(data) {
        itemFactory.deleteDataItem({
            id: data.id
        }).then(function() {
            $state.go($state.current, {}, {
                reload: true
            });
        });
    }

    //##############################//
    //      FUNGSI DETAIL DATA      //
    //##############################//
    $scope.showItemDetail = function(item) {
        $scope.loadingDetail = true;
        itemFactory.showItemDetail({
            item_id: item.id
        }).then(function() {
            $scope.item_detail = itemFactory.dataItemDetail.data_item;
            $scope.loadingDetail = false;
        });
    }

    //##############################//
    //  MENAMPILKAN DATA KATEGORI   //
    //##############################//
    // categoryFactory.getAllDataCategory()
    //     .then(function() {
    //         $scope.data_category = categoryFactory.allDataCategory;
    //     });

    //##############################//
    //    HOTKEYS FORM PENJUALAN    //
    //##############################//
    if ($state.current.name == 'item-list') {
        $scope.helpShow = false;
        $scope.helpPanel = function(flag) {
            if (flag) {
                $scope.helpShow = false;
            } else {
                $scope.helpShow = true;
            }
        }
        angular.element('#inp-search').focus();
        hotkeys.add({
            combo: 'alt+h',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $timeout(function() {
                    angular.element('#btn-help').triggerHandler('click');
                }, 0);
            }
        });

        hotkeys.add({
            combo: 'alt+t',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $state.go('item-create');
            }
        });

        hotkeys.add({
            combo: 'alt+f',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                angular.element('#inp-search').focus();
            }
        });

        return true;
    }

    if ($state.current.name == 'item-create') {
        $scope.helpShow = false;
        $scope.helpPanel = function(flag) {
            if (flag) {
                $scope.helpShow = false;
            } else {
                $scope.helpShow = true;
            }
        }
        hotkeys.add({
            combo: 'alt+h',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $timeout(function() {
                    angular.element('#btn-help').triggerHandler('click');
                }, 0);
            }
        });
        angular.element('#barcode-box').focus();
        hotkeys.add({
            combo: 'ctrl+d',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                event.preventDefault();
                angular.element('#barcode-box').focus();
                return true;
            }
        });
        hotkeys.add({
            combo: 'alt+d',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                event.preventDefault();
                angular.element('#barcode-strip').focus();
                return true;
            }
        });
        hotkeys.add({
            combo: 'alt+s',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                event.preventDefault();
                if ($scope.loading == true) {
                    return true;
                } else {
                    $scope.createData();
                }
            }
        });
        hotkeys.add({
            combo: 'esc',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $state.go('item-list');
            }
        });
        return true;
    }

    if ($state.current.name == "item-edit") {
        angular.element('#barcode-box').focus();
        $scope.helpShow = false;
        $scope.helpPanel = function(flag) {
            if (flag) {
                $scope.helpShow = false;
            } else {
                $scope.helpShow = true;
            }
        }
        hotkeys.add({
            combo: 'alt+h',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $timeout(function() {
                    angular.element('#btn-help').triggerHandler('click');
                }, 0);
            }
        });
        hotkeys.add({
            combo: 'ctrl+d',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                event.preventDefault();
                angular.element('#barcode-box').focus();
                return true;
            }
        });
        hotkeys.add({
            combo: 'alt+d',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                event.preventDefault();
                angular.element('#barcode-strip').focus();
                return true;
            }
        });
        hotkeys.add({
            combo: 'alt+s',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                event.preventDefault();
                if ($scope.loading == true) {
                    return true;
                } else {
                    $scope.updateData();
                }
            }
        });
        hotkeys.add({
            combo: 'esc',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event, hotkey) {
                $state.go('item-list');
            }
        });
        return true;
    }
})
