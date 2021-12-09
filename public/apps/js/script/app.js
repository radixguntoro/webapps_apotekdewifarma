var app = angular.module('desktopApps', [
    // Inject Plugin
    'angularUtils.directives.dirPagination'
    , 'angular.filter'
    , 'pluginCtrl'
    // , 'notifCtrl'
    , 'pluginDrtv'
    , 'hl.sticky'
    , 'toastr'
    , 'ui.router'
    , 'ngAnimate'
    // , 'angular-loading-bar'
    , 'scanner.detection'
    , 'ui.select'
    , 'ngSanitize'
    , 'angularFileUpload'
    , 'ui.utils.masks'
    , 'toggles'
    , 'ui.autocomplete'
    , 'ui.tinymce'
    , 'ngTabs'
    , 'cfp.hotkeys'
    , 'ui.date'
    , 'categoryCtrl'
    , 'userCtrl'
    , 'supplierCtrl'
    , 'itemCtrl'
    , 'transactionPurchasesCtrl'
    , 'transactionSalesCtrl'
    , 'closingCashierCtrl'
    , 'stockOpnameCtrl'
    , 'historyTransSalesCtrl'
    , 'historyTransPurchasesCtrl'
    , 'historyStockOpnameCtrl'
    , 'historyLoginCtrl'
    , 'historyItemCtrl'
    , 'historySupplierCtrl'
    , 'reportTransPurchasesCtrl'
    , 'reportTransSalesCtrl'
    , 'reportStockOpnameCtrl'
    , 'reportIncomeCashierCtrl'
    , 'reportIncomeShiftCtrl'
    , 'reportItemCardCtrl'
    , 'returnTransSalesCtrl'
    , 'returnTransPurchasesCtrl'
]);

app.run(function($rootScope, $timeout, $window) {
    $rootScope
        .$on('$stateChangeStart',
            function(event, $scope, toState, toParams, fromState, fromParams) {
                // angular.element(".vs-box-page-content").css("display", "none");
                angular.element(".vs-adm-loader").css("display", "block");
                $window.scrollTo(0, 0);
            });

    $rootScope
        .$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                // angular.element(".vs-box-page-content").css("display", "block");
                angular.element(".vs-adm-loader").css("display", "none");
            });

    $rootScope.$apply($(document).foundation());

}).config(function($locationProvider, $urlRouterProvider, $stateProvider, $interpolateProvider, toastrConfig) {
    // Configuration Toastr
    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
    });

    // Configuration Routes
    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: '/html/apps/transaction/transactionSales/transactionSalesCreate.html',
            controller: 'transactionSalesController'
        }).state('item-list', {
            url: '/item-list',
            templateUrl: '/html/apps/master/items/itemList.html',
            controller: 'itemController'
        }).state('item-create', {
            url: '/item-create',
            templateUrl: '/html/apps/master/items/itemCreate.html',
            controller: 'itemController'
        }).state('item-edit', {
            url: '/item-edit/:id',
            templateUrl: '/html/apps/master/items/itemEdit.html',
            controller: 'itemController'
        }).state('category-list', {
            url: '/category-list',
            templateUrl: '/html/apps/master/categories/categoryList.html',
            controller: 'categoryController'
        }).state('category-create', {
            url: '/category-create',
            templateUrl: '/html/apps/master/categories/categoryCreate.html',
            controller: 'categoryController'
        }).state('category-edit', {
            url: '/category-edit/:id',
            templateUrl: '/html/apps/master/categories/categoryEdit.html',
            controller: 'categoryController'
        }).state('unit-list', {
            url: '/unit-list',
            templateUrl: '/html/apps/master/units/unitList.html'
        }).state('unit-create', {
            url: '/unit-create',
            templateUrl: '/html/apps/master/units/unitCreate.html'
        }).state('unit-edit', {
            url: '/unit-edit',
            templateUrl: '/html/apps/master/units/unitEdit.html'
        }).state('user-list', {
            url: '/user-list',
            templateUrl: '/html/apps/master/users/userList.html',
            controller: 'userController'
        }).state('user-create', {
            url: '/user-create',
            templateUrl: '/html/apps/master/users/userCreate.html',
            controller: 'userController'
        }).state('user-edit', {
            url: '/user-edit/:id',
            templateUrl: '/html/apps/master/users/userEdit.html',
            controller: 'userController'
        }).state('supplier-list', {
            url: '/supplier-list',
            templateUrl: '/html/apps/master/suppliers/supplierList.html',
            controller: 'supplierController'
        }).state('supplier-create', {
            url: '/supplier-create',
            templateUrl: '/html/apps/master/suppliers/supplierCreate.html',
            controller: 'supplierController'
        }).state('supplier-edit', {
            url: '/supplier-edit/:id',
            templateUrl: '/html/apps/master/suppliers/supplierEdit.html',
            controller: 'supplierController'
        }).state('transaction-sales-list', {
            url: '/transaction-sales-list',
            templateUrl: '/html/apps/transaction/transactionSales/transactionSalesList.html',
            controller: 'transactionSalesController'
        }).state('transaction-sales-create', {
            url: '/transaction-sales-create',
            templateUrl: '/html/apps/transaction/transactionSales/transactionSalesCreate.html',
            controller: 'transactionSalesController'
        }).state('transaction-purchases-create', {
            url: '/transaction-purchases-create',
            templateUrl: '/html/apps/transaction/transactionPurchases/transactionPurchasesCreate.html',
            controller: 'transactionPurchasesController'
        }).state('transaction-purchases-edit', {
            url: '/transaction-purchases-edit/:id',
            templateUrl: '/html/apps/transaction/transactionPurchases/transactionPurchasesEdit.html',
            controller: 'transactionPurchasesController'
        }).state('closing-cashier', {
            url: '/closing-cashier',
            templateUrl: '/html/apps/transaction/closingCashier/closingCashierCreate.html',
            controller: 'closingCashierController'
        }).state('closing-cashier-review', {
            url: '/closing-cashier/:id',
            templateUrl: '/html/apps/transaction/closingCashier/closingCashierReview.html',
            controller: 'closingCashierController'
        }).state('stock-in', {
            url: '/stock-in',
            templateUrl: '/html/apps/inventory/stockIn/stockIn.html'
        }).state('stock-out', {
            url: '/stock-out',
            templateUrl: '/html/apps/inventory/stockOut/stockOut.html'
        }).state('stock-opname', {
            url: '/stock-opname',
            templateUrl: '/html/apps/inventory/stockOpname/stockOpname.html',
            controller: 'stockOpnameController'
        }).state('his-trans-sales', {
            url: '/his-trans-sales',
            templateUrl: '/html/apps/history/hisTransSales/hisTransSalesList.html',
            controller: 'historyTransSalesController'
        }).state('his-trans-purchases', {
            url: '/his-trans-purchases',
            templateUrl: '/html/apps/history/hisTransPurchases/hisTransPurchasesList.html',
            controller: 'historyTransPurchasesController'
        }).state('his-users', {
            url: '/his-users',
            templateUrl: '/html/apps/history/hisUsers/hisUsersList.html'
        }).state('his-stock-in', {
            url: '/his-stock-in',
            templateUrl: '/html/apps/history/hisStockIn/hisStockInList.html'
        }).state('his-stock-out', {
            url: '/his-stock-out',
            templateUrl: '/html/apps/history/hisStockOut/hisStockOutList.html'
        }).state('his-stock-opname', {
            url: '/his-stock-opname',
            templateUrl: '/html/apps/history/hisStockOpname/hisStockOpnameList.html',
            controller: 'historyStockOpnameController'
        }).state('his-login', {
            url: '/his-login',
            templateUrl: '/html/apps/history/hisLogin/hisLoginList.html',
            controller: 'historyLoginController'
        }).state('his-item', {
            url: '/his-item',
            templateUrl: '/html/apps/history/hisItem/hisItemList.html',
            controller: 'historyItemController'
        }).state('his-supplier', {
            url: '/his-supplier',
            templateUrl: '/html/apps/history/hisSupplier/hisSupplierList.html',
            controller: 'historySupplierController'
        }).state('rep-trans-sales', {
            url: '/rep-trans-sales',
            templateUrl: '/html/apps/report/repTransSales/repTransSalesList.html',
            controller: 'reportTransSalesController'
        }).state('rep-trans-purchases', {
            url: '/rep-trans-purchases',
            templateUrl: '/html/apps/report/repTransPurchases/repTransPurchasesList.html',
            controller: 'reportTransPurchasesController'
        }).state('rep-item-card', {
            url: '/rep-item-card',
            templateUrl: '/html/apps/report/repItemCard/repItemCardList.html',
            controller: 'reportItemCardController'
        }).state('rep-stock-opname', {
            url: '/rep-stock-opname',
            templateUrl: '/html/apps/report/repStockOpname/repStockOpnameList.html',
            controller: 'reportStockOpnameController'
        }).state('rep-income-cashier', {
            url: '/rep-income-cashier',
            templateUrl: '/html/apps/report/repIncomeCashier/repIncomeCashierList.html',
            controller: 'reportIncomeCashierController'
        }).state('rep-income-shift', {
            url: '/rep-income-shift',
            templateUrl: '/html/apps/report/repIncomeShift/repIncomeShiftList.html',
            controller: 'reportIncomeShiftController'
        }).state('ret-trans-sales-list', {
            url: '/ret-trans-sales-list',
            templateUrl: '/html/apps/return/retTransSales/retTransSalesList.html',
            controller: 'returnTransSalesController'
        }).state('ret-trans-sales-create', {
            url: '/ret-trans-sales-create',
            templateUrl: '/html/apps/return/retTransSales/retTransSalesCreate.html',
            controller: 'returnTransSalesController'
        }).state('ret-trans-purchases-list', {
            url: '/ret-trans-purchases-list',
            templateUrl: '/html/apps/return/retTransPurchases/retTransPurchasesList.html',
            controller: 'returnTransPurchasesController'
        }).state('ret-trans-purchases-create', {
            url: '/ret-trans-purchases-create',
            templateUrl: '/html/apps/return/retTransPurchases/retTransPurchasesCreate.html',
            controller: 'returnTransPurchasesController'
        });
    $urlRouterProvider.otherwise('/');
});
