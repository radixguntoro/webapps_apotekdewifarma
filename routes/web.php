<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();
// Route::get('/', 'Apps\Transaction\TransactionSalesCtrl@index')->name('transactionSales.index');
Route::get('/', 'Apps\Transaction\TransactionSalesCtrl@index')->name('transactionSales.index')->middleware('auth');

// CATEGORY ROUTE
Route::get('/category', 'Apps\Master\CategoryCtrl@index')->name('category.index');
Route::get('/category/list', 'Apps\Master\CategoryCtrl@index')->name('category.index');
Route::post('/category/insert', 'Apps\Master\CategoryCtrl@insert')->name('category.insert');
Route::get('/category/edit/{id}', 'Apps\Master\CategoryCtrl@edit')->name('category.edit');
Route::post('/category/update/{id}', 'Apps\Master\CategoryCtrl@update')->name('category.update');
Route::post('/category/delete/{id}', 'Apps\Master\CategoryCtrl@delete')->name('category.delete');
Route::get('/category/all', 'Apps\Master\CategoryCtrl@getAll')->name('category.getAll');

// USER ROUTE
Route::get('/user', 'Apps\Master\UserCtrl@index')->name('user.index');
Route::get('/user/list', 'Apps\Master\UserCtrl@index')->name('user.index');
Route::post('/user/insert', 'Apps\Master\UserCtrl@insert')->name('user.insert');
Route::get('/user/edit/{id}', 'Apps\Master\UserCtrl@edit')->name('user.edit');
Route::post('/user/update/{id}', 'Apps\Master\UserCtrl@update')->name('user.update');
Route::post('/user/delete/{id}', 'Apps\Master\UserCtrl@delete')->name('user.delete');
Route::get('/user/detail/{id}', 'Apps\Master\UserCtrl@getUserDetail')->name('user.getUserDetail');
Route::get('/user/all', 'Apps\Master\UserCtrl@getAll')->name('user.getAll');

// SUPPLIER ROUTE
Route::get('/supplier', 'Apps\Master\SupplierCtrl@index')->name('supplier.index');
Route::get('/supplier/list', 'Apps\Master\SupplierCtrl@index')->name('supplier.index');
Route::post('/supplier/insert', 'Apps\Master\SupplierCtrl@insert')->name('supplier.insert');
Route::get('/supplier/edit/{id}', 'Apps\Master\SupplierCtrl@edit')->name('supplier.edit');
Route::get('/supplier/detail/{id}', 'Apps\Master\SupplierCtrl@getSupplierDetail')->name('supplier.getSupplierDetail');
Route::post('/supplier/update/{id}', 'Apps\Master\SupplierCtrl@update')->name('supplier.update');
Route::post('/supplier/delete/{id}', 'Apps\Master\SupplierCtrl@delete')->name('supplier.delete');
Route::get('/supplier/manual', 'Apps\Master\SupplierCtrl@searchSupplierPurchases')->name('supplier.searchItemSales');
Route::get('/supplier/recordItem/{id}', 'Apps\Master\SupplierCtrl@recordItem')->name('supplier.recordItem');

// ITEM ROUTE
Route::get('/item', 'Apps\Master\ItemCtrl@index')->name('item.index');
Route::get('/item/list', 'Apps\Master\ItemCtrl@index')->name('item.index');
Route::post('/item/insert', 'Apps\Master\ItemCtrl@insert')->name('item.insert');
Route::get('/item/edit/{id}', 'Apps\Master\ItemCtrl@edit')->name('item.edit');
Route::post('/item/update/{id}', 'Apps\Master\ItemCtrl@update')->name('item.update');
Route::post('/item/delete/{id}', 'Apps\Master\ItemCtrl@delete')->name('item.delete');
Route::get('/item/all', 'Apps\Master\ItemCtrl@getAll')->name('item.getAll');
Route::get('/item/min-stock', 'Apps\Master\ItemCtrl@minStock')->name('item.minStock');
Route::get('/item/manual', 'Apps\Master\ItemCtrl@searchItemSales')->name('item.searchItemSales');
Route::get('/item/detail/{id}', 'Apps\Master\ItemCtrl@getItemDetail')->name('item.getItemDetail');
Route::get('/item/recordSupplier/{id}', 'Apps\Master\ItemCtrl@recordSupplier')->name('item.recordSupplier');

// TRANSACTION SALES ROUTE
Route::get('/transactionSales/list', 'Apps\Transaction\TransactionSalesCtrl@data')->name('transactionSales.data');
Route::get('/transactionSales/getCart/{id}', 'Apps\Transaction\TransactionSalesCtrl@getDataCart')->name('transactionSales.getDataCart');
Route::post('/transactionSales/insert', 'Apps\Transaction\TransactionSalesCtrl@insert')->name('transactionSales.insert');
Route::post('/transactionSales/cartAdd', 'Apps\Transaction\TransactionSalesCtrl@cartAdd')->name('transactionSales.cartAdd');
Route::post('/transactionSales/cartRemove', 'Apps\Transaction\TransactionSalesCtrl@cartRemove')->name('transactionSales.cartRemove');
Route::get('/transactionSales/cartDestroy', 'Apps\Transaction\TransactionSalesCtrl@cartDestroy')->name('transactionSales.cartDestroy');
Route::get('/transactionSales/barcode/{id}', 'Apps\Transaction\TransactionSalesCtrl@searchItemBarcode')->name('transactionSales.searchItemBarcode');
Route::get('/transactionSales/insRandData', 'Apps\Transaction\TransactionSalesCtrl@insRandData')->name('transactionSales.insRandData');
Route::get('/transactionSales/searchItemManual/{id}', 'Apps\Transaction\TransactionSalesCtrl@searchItemManual')->name('transactionSales.searchItemManual');
Route::get('/transactionSales/printLastTrSales', 'Apps\Transaction\TransactionSalesCtrl@printLastTrSales')->name('transactionSales.printLastTrSales');

Route::get('/transactionPurchases/getCart', 'Apps\Transaction\TransactionPurchasesCtrl@getDataCart')->name('transactionPurchases.getDataCart');
Route::post('/transactionPurchases/cartAdd', 'Apps\Transaction\TransactionPurchasesCtrl@cartAdd')->name('transactionPurchases.cartAdd');
Route::get('/transactionPurchases/cartRemove/{id}', 'Apps\Transaction\TransactionPurchasesCtrl@cartRemove')->name('transactionPurchases.cartRemove');
Route::get('/transactionPurchases/cartEditRemove/{id}', 'Apps\Transaction\TransactionPurchasesCtrl@cartEditRemove')->name('transactionPurchases.cartEditRemove');
Route::get('/transactionPurchases/cartDestroy', 'Apps\Transaction\TransactionPurchasesCtrl@cartDestroy')->name('transactionPurchases.cartDestroy');
Route::post('/transactionPurchases/insert', 'Apps\Transaction\TransactionPurchasesCtrl@insert')->name('transactionPurchases.insert');
Route::get('/transactionPurchases/edit/{id}', 'Apps\Transaction\TransactionPurchasesCtrl@edit')->name('transactionPurchases.edit');
Route::post('/transactionPurchases/update/{id}', 'Apps\Transaction\TransactionPurchasesCtrl@update')->name('transactionPurchases.update');
Route::post('/transactionPurchases/delete/{id}', 'Apps\Transaction\TransactionPurchasesCtrl@delete')->name('transactionPurchases.delete');

Route::get('/closingCashier/getCashier', 'Apps\Transaction\ClosingCashierCtrl@getCashier')->name('closingCashier.getCashier');
Route::get('/closingCashier/getIncomePerDay', 'Apps\Transaction\ClosingCashierCtrl@getIncomePerDay')->name('closingCashier.getIncomePerDay');
Route::post('/closingCashier/insert', 'Apps\Transaction\ClosingCashierCtrl@insert')->name('closingCashier.insert');
Route::get('/closingCashier/review/{id}', 'Apps\Transaction\ClosingCashierCtrl@review')->name('ClosingCashierCtrl.review');
Route::post('/closingCashier/getIncomePerShift', 'Apps\Transaction\ClosingCashierCtrl@getIncomePerShift')->name('ClosingCashierCtrl.getIncomePerShift');

// INVENTORY ROUTE
Route::get('/stockOpname/list', 'Apps\Inventory\StockOpnameCtrl@index')->name('stockOpname.index');
Route::post('/stockOpname/insert', 'Apps\Inventory\StockOpnameCtrl@insert')->name('stockOpname.insert');
Route::post('/stockOpname/done', 'Apps\Inventory\StockOpnameCtrl@done')->name('stockOpname.done');
Route::post('/stockOpname/edit', 'Apps\Inventory\StockOpnameCtrl@edit')->name('stockOpname.edit');
Route::post('/stockOpname/delete', 'Apps\Inventory\StockOpnameCtrl@delete')->name('stockOpname.delete');

// HISTORY TRANSACTION SALES ROUTE
Route::get('/historyTransSales/list', 'Apps\History\HistoryTransSalesCtrl@index')->name('historyTransSales.index');
Route::get('/historyTransPurchases/list', 'Apps\History\HistoryTransPurchasesCtrl@index')->name('historyTransPurchases.index');
Route::get('/historyStockOpname/list', 'Apps\History\HistoryStockOpnameCtrl@index')->name('historyStockOpname.index');
Route::get('/historyLogin/list', 'Apps\History\HistoryLoginCtrl@index')->name('historyLogin.index');

// REPORT ROUTE
Route::get('/reportTransSales/filter', 'Apps\Report\ReportTransSalesCtrl@filterReportTransSales')->name('reportTransSales.filterReportTransSales');
Route::get('/reportTransSales/detail/{id}', 'Apps\Report\ReportTransSalesCtrl@getReportTransSalesDetail')->name('reportTransSales.getReportTransSalesDetail');
Route::get('/reportTransPurchases/filter', 'Apps\Report\ReportTransPurchasesCtrl@filterReportTransPurchases')->name('reportTransPurchases.filterReportTransPurchases');
Route::get('/reportTransPurchases/detail/{id}', 'Apps\Report\ReportTransPurchasesCtrl@getReportTransPurchasesDetail')->name('reportTransPurchases.getReportTransPurchasesDetail');
Route::get('/reportStockOpname/filter', 'Apps\Report\ReportStockOpnameCtrl@filter')->name('reportStockOpname.filter');
Route::get('/reportItemCard/filter', 'Apps\Report\ReportItemCardCtrl@filter')->name('reportItemCard.filter');
Route::get('/reportIncomeCashier/filter', 'Apps\Report\ReportIncomeCashierCtrl@filter')->name('reportIncomeCashier.filter');
Route::get('/reportIncomeShift/filter', 'Apps\Report\ReportIncomeShiftCtrl@filter')->name('reportIncomeShift.filter');

// RETURN TRANSACTION SALES ROUTE
Route::get('/returnTransSales/list', 'Apps\Retur\ReturnTransSalesCtrl@index')->name('returnTransSales.index');
Route::get('/returnTransSales/detail/{id}', 'Apps\Retur\ReturnTransSalesCtrl@getReturnTransSalesDetail')->name('returnTransSales.getReturnTransSalesDetail');
Route::get('/returnTransSales/getCart', 'Apps\Retur\ReturnTransSalesCtrl@getDataCart')->name('returnTransSales.getDataCart');
Route::post('/returnTransSales/insert', 'Apps\Retur\ReturnTransSalesCtrl@insert')->name('returnTransSales.insert');
Route::post('/returnTransSales/cartAdd', 'Apps\Retur\ReturnTransSalesCtrl@cartAdd')->name('returnTransSales.cartAdd');
Route::get('/returnTransSales/cartRemove/{id}', 'Apps\Retur\ReturnTransSalesCtrl@cartRemove')->name('returnTransSales.cartRemove');

// RETURN TRANSACTION PURCHASES ROUTE
Route::get('/returnTransPurchases/list', 'Apps\Retur\ReturnTransPurchasesCtrl@index')->name('returnTransPurchases.index');
Route::get('/returnTransPurchases/detail/{id}', 'Apps\Retur\ReturnTransPurchasesCtrl@getReturnTransPurchasesDetail')->name('returnTransPurchases.getReturnTransPurchasesDetail');
Route::get('/returnTransPurchases/getCart', 'Apps\Retur\ReturnTransPurchasesCtrl@getDataCart')->name('returnTransPurchases.getDataCart');
Route::post('/returnTransPurchases/insert', 'Apps\Retur\ReturnTransPurchasesCtrl@insert')->name('returnTransPurchases.insert');
Route::post('/returnTransPurchases/cartAdd', 'Apps\Retur\ReturnTransPurchasesCtrl@cartAdd')->name('returnTransPurchases.cartAdd');
Route::get('/returnTransPurchases/cartRemove/{id}', 'Apps\Retur\ReturnTransPurchasesCtrl@cartRemove')->name('returnTransPurchases.cartRemove');
