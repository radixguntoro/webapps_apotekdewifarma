var app = angular.module('pluginDrtv', []);
var windowHeight = $(window).outerHeight();
var headerHeight = $("header").outerHeight();

app.directive('zurbinit', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(document).foundation();
        }
    };
}]).directive('fullpage', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            windowHeight = $(window).outerHeight();
            headerHeight = $(".vs-header").height();
            contentHeight = windowHeight - headerHeight;
            $(".vs-box-page-content").css("min-height", contentHeight - 28);
        }
    };
}]).directive('fullbody', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            windowHeight = $(window).height();
            contentHeight = windowHeight - 56;
            $(".vs-content").css("height", contentHeight);
        }
    };
}]).directive('stickytable', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            theadWidth = $(".vs-table").outerWidth();
            $(".sticky-header").css("width", theadWidth);
        }
    };
}]).directive('fullheight', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var windowHeight = $(window).outerHeight();
            var sidebarHeight = $(".vs-adm-header").outerHeight();
            var footerHeight = $("footer").outerHeight();
            var contentHeight = windowHeight - sidebarHeight - footerHeight - 24;
            $(".vs-adm-page").css("min-height", contentHeight);
        }
    };
}]).directive('fullloader', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var windowHeight = $(window).outerHeight();
            var sidebarHeight = $(".vs-adm-header").outerHeight();
            var footerHeight = $("footer").outerHeight();
            var contentHeight = windowHeight - sidebarHeight - footerHeight - 24;
            $(".vs-adm-loader").css("min-height", contentHeight);
        }
    };
}]).directive('fulltable', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var windowHeight = $(window).outerHeight();
            var sidebarHeight = $(".vs-adm-header").outerHeight();
            var footerHeight = $("footer").outerHeight();
            var subHead = $(".vs-page-header").outerHeight();
            var subNeck = $(".vs-page-subheader").outerHeight();
            var subFoot = $(".vs-page-footer").outerHeight();
            var contentHeight = windowHeight - sidebarHeight - footerHeight - subHead - subNeck - subFoot - 60 - 24;
            $(".vs-box-table").css("min-height", contentHeight);
        }
    };
}]).directive('stickytable', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(document).trigger("stickyTable");
        }
    };
}]).directive('squarecol', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var widthCol = $(".vs-box-square").innerWidth();
            var contentHeight = widthCol;
            $(".vs-box-square").css("height", contentHeight);
            // $(".vs-box-square-get").css("height", contentHeight + 37);
        }
    };
}]).directive('selectedUser', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(val) {
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function(val) {
                return '' + val;
            });
        }
    };
}]).directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({
                    width: width,
                    height: height
                });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]).directive('autocompitem', [function($parse) {
    return {
        restrict: 'E',
        replace: true,
        template: '<input type="text" id="search-tablet" />',
        link: function(scope, element, attrs) {
            function rupiah(val) {
                // var number_string = val.toString();
                // var sisa = number_string.length % 3;
                // var rupiah = number_string.substr(0, sisa);
                // var ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                var number_string = val != null ? val.toString() : val;
                var sisa = number_string != null ? number_string.length % 3 : 0;
                var rupiah = number_string != null ? number_string.substr(0, sisa) : number_string;
                var ribuan 	= number_string != null ? number_string.substr(sisa).match(/\d{3}/g) : number_string;

                if (ribuan) {
                    separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                }

                return rupiah;
            }
            scope.$watch(attrs.selection, function(selection) {
                // event when select item
                element.on("autocompleteselect", function(e, ui) {
                    e.preventDefault(); // prevent the "value" being written back after we've done our own changes
                    this.value = ui.item.name;
                });

                element.autocomplete({
                    source: scope.searchItem,
                    minLength: 3,
                    select: function(event, ui) {
                        event.preventDefault();
                        scope.cartAdd({
                            id: ui.item.id,
                            name: ui.item.name,
                            qty: 1,
                            price: ui.item.price_sell_per_tablet,
                            unit: 'tablet',
                            qty_in_box: ui.item.qty_in_box,
                            qty_in_strip: ui.item.qty_in_strip,
                            qty_in_tablet: ui.item.qty_in_tablet,
                            qty_total: ui.item.qty_total,
                            price_sell_per_box: ui.item.price_sell_per_box,
                            price_sell_per_strip: ui.item.price_sell_per_strip,
                            price_sell_per_tablet: ui.item.price_sell_per_tablet
                        });
                        scope.barcodeAdd = '';
                    }
                })
                .focus(function () {
                    $(this).autocomplete("search");
                })
                .data("ui-autocomplete")._renderItem = function(ul, item) {
                    var regex = new RegExp(this.term, "gi");
                    if (item.id == 0) {
                        return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<div class='text-center'>" + item.name + "</div>")
                        .appendTo(ul);
                    } else {
                        return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append(
                            "<div>"
                                + "<a>" +
                                    "<div>" + item.name.replace(regex, "<span class='font-bold text-uppercase'>" + this.term + "</span>") + "<div><span class='text-capitalize'> Harga per Box "+ "<span class='font-bold'>Rp. " + rupiah(item.price_sell_per_box) + "</span>" +"</span> | <span class='text-capitalize'> Harga per Strip "+ "<span class='font-bold'>Rp. " + rupiah(item.price_sell_per_strip) + "</span>" +"</span> | <span class='text-capitalize'> Harga per Biji "+ "<span class='font-bold'>Rp. " + rupiah(item.price_sell_per_tablet) + "</span>" +"</span></div>"  + "</div>"
                                    + "<div class='text-capitalize'>" + "Stok Tersedia:&nbsp;"
                                        + rupiah(Math.floor(item.qty_in_strip > 0 ? ((item.qty_total / item.qty_in_tablet) / item.qty_in_strip) : (item.qty_total / item.qty_in_tablet))) + "<span class='font-bold'>&nbsp;Box&nbsp;|&nbsp;</span>"
                                        + rupiah(Math.floor(item.qty_in_strip > 0 ? (item.qty_total / item.qty_in_tablet) : 0)) + "<span class='font-bold'>&nbsp;Strip&nbsp;|&nbsp;</span>"
                                        + rupiah(item.qty_total) + "<span class='font-bold'>&nbsp;Biji</span>"
                                    + "</div>"
                                + "</a>" +
                            "</div>")
                        .appendTo(ul);
                    }
                };
            });
        }
    };
}]).directive('autocomppurch', [function($parse, toastr) {
    return {
        restrict: 'E',
        replace: true,
        template: '<input type="text" id="search-tablet" />',
        link: function(scope, element, attrs) {
            function rupiah(val) {
                // var number_string = val.toString();
                // var sisa = number_string.length % 3;
                // var rupiah = number_string.substr(0, sisa);
                // var ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                var number_string = val != null ? val.toString() : val;
                var sisa = number_string != null ? number_string.length % 3 : 0;
                var rupiah = number_string != null ? number_string.substr(0, sisa) : number_string;
                var ribuan 	= number_string != null ? number_string.substr(sisa).match(/\d{3}/g) : number_string;

                if (ribuan) {
                    separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                }

                return rupiah;
            }
            scope.$watch(attrs.selection, function(selection) {
                // event when select item
                element.on("autocompleteselect", function(e, ui) {
                    e.preventDefault(); // prevent the "value" being written back after we've done our own changes
                    this.value = ui.item.name;
                });

                element.autocomplete({
                    source: scope.searchItem,
                    minLength: 3,
                    select: function(event, ui) {
                        scope.cartAdd({
                            id: ui.item.id,
                            name: ui.item.name,
                            qty: 1,
                            price: ui.item.price_purchase_per_tablet,
                            unit: 'tablet',
                            price_sell_per_box: ui.item.price_purchase_per_box,
                            price_sell_per_strip: ui.item.price_purchase_per_strip,
                            price_sell_per_tablet: ui.item.price_purchase_per_tablet
                        });
                        scope.barcodeAdd = '';
                    }
                })
                .focus(function () {
                    $(this).autocomplete("search");
                })
                .data("ui-autocomplete")._renderItem = function(ul, item) {
                    var regex = new RegExp(this.term, "gi");
                    if (item.id == 0) {
                        return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<div class='text-center'>" + item.name + "</div>")
                        .appendTo(ul);
                    } else {
                        return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a>" + item.name.replace(regex, "<span class='font-bold'>" + this.term + "</span>") + "&nbsp;<span class='font-bold'>Stok:&nbsp;" + rupiah(item.qty_total) + "</span>" + "&nbsp;<span>-&nbsp;" + item.sku + "</span>" + "</a>")
                        .appendTo(ul);
                    }
                };
            });
        }
    };
}]).directive('autocompstock', [function($parse, $filter) {
    return {
        restrict: 'E',
        replace: true,
        template: '<input type="text" id="search-tablet" />',
        link: function(scope, element, attrs) {
            function rupiah(val) {
                var number_string = val != null ? val.toString() : val;
                var sisa = number_string != null ? number_string.length % 3 : 0;
                var rupiah = number_string != null ? number_string.substr(0, sisa) : number_string;
                var ribuan 	= number_string != null ? number_string.substr(sisa).match(/\d{3}/g) : number_string;

                if (ribuan) {
                    separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                }

                return rupiah;
            }
            scope.$watch(attrs.selection, function(selection) {
                // event when select item
                element.on("autocompleteselect", function(e, ui) {
                    e.preventDefault(); // prevent the "value" being written back after we've done our own changes
                    this.value = ui.item.name;
                });

                element.autocomplete({
                    source: scope.searchItem,
                    minLength: 0,
                    select: function(event, ui) {
                        scope.stockOpnameAdd({
                            code: scope.stock_opname.code,
                            // date: $filter('date')(new Date(), 'dd MMM yyyy'),
                            item_id: ui.item.id,
                            price_purchase_app: ui.item.price_purchase_per_tablet > 0 ? ui.item.price_purchase_per_tablet * ui.item.qty_total : ui.item.price_purchase_per_bottle * ui.item.qty_total,
                            price_purchase_phx: 0,
                            price_purchase_difference: 0,
                            price_sell_app: ui.item.price_sell_per_tablet > 0 ? ui.item.price_sell_per_tablet * ui.item.qty_total : ui.item.price_sell_per_bottle * ui.item.qty_total,
                            price_sell_phx: 0,
                            price_sell_difference: 0,
                            stock_in_system: ui.item.qty_total,
                            stock_in_phx: 0,
                            stock_difference: 0,
                            unit: "Tablet"
                        });
                    }
                })
                .focus(function () {
                    $(this).autocomplete("search");
                })
                .data("ui-autocomplete")._renderItem = function(ul, item) {
                    var regex = new RegExp(this.term, "gi");
                    if (item.id == 0) {
                        return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<div class='text-center'>" + item.name + "</div>")
                        .appendTo(ul);
                    } else {
                        return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a>" + item.name.replace(regex, "<span class='font-bold'>" + this.term + "</span>") + "&nbsp;<span class='font-bold'>Stok:&nbsp;" + rupiah(item.qty_total) + "</span>" + "</a>")
                        .appendTo(ul);
                    }
                };
            });
        }
    };
}]).directive('autocompsupp', [function($parse, $filter) {
    return {
        restrict: 'E',
        replace: true,
        template: '<input type="text" id="search-supplier" />',
        link: function(scope, element, attrs) {
            function rupiah(val) {
                // var number_string = val.toString();
                // var sisa = number_string.length % 3;
                // var rupiah = number_string.substr(0, sisa);
                // var ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                var number_string = val != null ? val.toString() : val;
                var sisa = number_string != null ? number_string.length % 3 : 0;
                var rupiah = number_string != null ? number_string.substr(0, sisa) : number_string;
                var ribuan 	= number_string != null ? number_string.substr(sisa).match(/\d{3}/g) : number_string;

                if (ribuan) {
                    separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                }

                return rupiah;
            }
            scope.$watch(attrs.selection, function(selection) {
                // event when select item
                element.on("autocompleteselect", function(e, ui) {
                    e.preventDefault(); // prevent the "value" being written back after we've done our own changes
                    this.value = ui.item.name;
                });

                element.autocomplete({
                    source: scope.searchSupplier,
                    minLength: 0,
                    select: function(event, ui) {
                        angular.element('#search-supplier').val('');
                        scope.getSupplier({id: ui.item.id});
                    }
                })
                .focus(function () {
                    $(this).autocomplete("search");
                })
                .data("ui-autocomplete")._renderItem = function(ul, item) {
                    var regex = new RegExp(this.term, "gi");
                    if (item.id == 0) {
                        return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<div class='text-center text-uppercase'>" + item.name + "</div>")
                        .appendTo(ul);
                    } else {
                        return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a>" + item.name.replace(regex, "<span class='font-bold'>" + this.term + "</span>") + "</a>")
                        .appendTo(ul);
                    }
                };
            });
        }
    };
}]).directive('autocompurch', [function($parse, $filter) {
    return {
        restrict: 'E',
        replace: true,
        template: '<input type="text" id="search-item" />',
        link: function(scope, element, attrs) {
            function rupiah(val) {
                // var number_string = val.toString();
                // var sisa = number_string.length % 3;
                // var rupiah = number_string.substr(0, sisa);
                // var ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                var number_string = val != null ? val.toString() : val;
                var sisa = number_string != null ? number_string.length % 3 : 0;
                var rupiah = number_string != null ? number_string.substr(0, sisa) : number_string;
                var ribuan 	= number_string != null ? number_string.substr(sisa).match(/\d{3}/g) : number_string;

                if (ribuan) {
                    separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                }

                return rupiah;
            }
            scope.$watch(attrs.selection, function(selection) {
                // event when select item
                element.on("autocompleteselect", function(e, ui) {
                    e.preventDefault(); // prevent the "value" being written back after we've done our own changes
                    this.value = ui.item.name;
                });

                element.autocomplete({
                    source: scope.searchItem,
                    minLength: 0,
                    select: function(event, ui) {
                        scope.cartAdd({
                            id: ui.item.id,
                            name: ui.item.name,
                            qty: 1,
                            price: ui.item.price_sell_per_tablet,
                            unit: 'box',
                            qty_in_box: ui.item.qty_in_box,
                            qty_in_strip: ui.item.qty_in_strip,
                            qty_in_tablet: ui.item.qty_in_tablet,
                            price_sell_per_box: ui.item.price_sell_per_box,
                            price_sell_per_strip: ui.item.price_sell_per_strip,
                            price_sell_per_tablet: ui.item.price_sell_per_tablet,
                            price_purchase_per_box: ui.item.price_purchase_per_box,
                            price_purchase_per_strip: ui.item.price_purchase_per_strip,
                            price_purchase_per_tablet: ui.item.price_purchase_per_tablet,
                            percent_profit_per_box: ui.item.percent_profit_per_box,
                            percent_profit_per_strip: ui.item.percent_profit_per_strip,
                            percent_profit_per_tablet: ui.item.percent_profit_per_tablet
                        });
                    }
                })
                .focus(function () {
                    $(this).autocomplete("search");
                })
                .data("ui-autocomplete")._renderItem = function(ul, item) {
                    var regex = new RegExp(this.term, "gi");
                    if (item.id == 0) {
                        return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<div class='text-center'>" + item.name + "</div>")
                        .appendTo(ul);
                    } else {
                        return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a>" + item.name.replace(regex, "<span class='font-bold'>" + this.term + "</span>") + "&nbsp;<span class='font-bold'>Stok:&nbsp;" + rupiah(item.qty_total) + "</span>" + "&nbsp;<span>-&nbsp;" + item.sku + "</span>" + "</a>")
                        .appendTo(ul);
                    }
                };
            });
        }
    };
}]).directive('autocompitemcard', [function($parse, $filter) {
    return {
        restrict: 'E',
        replace: true,
        template: '<input type="text" id="search-item" />',
        link: function(scope, element, attrs) {
            function rupiah(val) {
                // var number_string = val.toString();
                // var sisa = number_string.length % 3;
                // var rupiah = number_string.substr(0, sisa);
                // var ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                var number_string = val != null ? val.toString() : val;
                var sisa = number_string != null ? number_string.length % 3 : 0;
                var rupiah = number_string != null ? number_string.substr(0, sisa) : number_string;
                var ribuan 	= number_string != null ? number_string.substr(sisa).match(/\d{3}/g) : number_string;

                if (ribuan) {
                    separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                }

                return rupiah;
            }
            scope.$watch(attrs.selection, function(selection) {
                // event when select item
                element.on("autocompleteselect", function(e, ui) {
                    e.preventDefault(); // prevent the "value" being written back after we've done our own changes
                    this.value = ui.item.name;
                });

                element.autocomplete({
                    source: scope.searchItem,
                    minLength: 0,
                    select: function(event, ui) {
                        scope.cartSelect({
                            id: ui.item.id,
                            name: ui.item.name,
                        });
                    }
                })
                .focus(function () {
                    $(this).autocomplete("search");
                })
                .data("ui-autocomplete")._renderItem = function(ul, item) {
                    var regex = new RegExp(this.term, "gi");
                    if (item.id == 0) {
                        return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<div class='text-center'>" + item.name + "</div>")
                        .appendTo(ul);
                    } else {
                        return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a>" + item.name.replace(regex, "<span class='font-bold'>" + this.term + "</span>") + "</a>")
                        .appendTo(ul);
                    }
                };
            });
        }
    };
}]);
