/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v4.1.6
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("whatInput", [], t) : "object" == typeof exports ? exports.whatInput = t() : e.whatInput = t()
}(this, function() {
    return function(e) {
        function t(o) {
            if (n[o]) return n[o].exports;
            var i = n[o] = {
                exports: {},
                id: o,
                loaded: !1
            };
            return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function(e, t) {
        "use strict";
        e.exports = function() {
            var e = "initial",
                t = null,
                n = document.documentElement,
                o = ["input", "select", "textarea"],
                i = [],
                r = [16, 17, 18, 91, 93],
                u = {
                    keydown: "keyboard",
                    mousedown: "mouse",
                    mousemove: "mouse",
                    MSPointerDown: "pointer",
                    MSPointerMove: "pointer",
                    pointerdown: "pointer",
                    pointermove: "pointer",
                    touchstart: "touch"
                },
                d = [],
                s = !1,
                a = !1,
                c = {
                    x: null,
                    y: null
                },
                p = {
                    2: "touch",
                    3: "touch",
                    4: "mouse"
                },
                f = !1;
            try {
                var v = Object.defineProperty({}, "passive", {
                    get: function() {
                        f = !0
                    }
                });
                window.addEventListener("test", null, v)
            } catch (e) {}
            var m = function() {
                    window.PointerEvent ? (n.addEventListener("pointerdown", w), n.addEventListener("pointermove", h)) : window.MSPointerEvent ? (n.addEventListener("MSPointerDown", w), n.addEventListener("MSPointerMove", h)) : (n.addEventListener("mousedown", w), n.addEventListener("mousemove", h), "ontouchstart" in window && (n.addEventListener("touchstart", y), n.addEventListener("touchend", y))), n.addEventListener(L(), h, !!f && {
                        passive: !0
                    }), n.addEventListener("keydown", w)
                },
                w = function(n) {
                    if (!s) {
                        var i = n.which,
                            d = u[n.type];
                        if ("pointer" === d && (d = E(n)), e !== d || t !== d) {
                            var a = document.activeElement,
                                c = !1;
                            a && a.nodeName && -1 === o.indexOf(a.nodeName.toLowerCase()) && (c = !0), ("touch" === d || "mouse" === d || "keyboard" === d && i && c && -1 === r.indexOf(i)) && (e = t = d, l())
                        }
                    }
                },
                l = function() {
                    n.setAttribute("data-whatinput", e), n.setAttribute("data-whatintent", e), -1 === d.indexOf(e) && (d.push(e), n.className += " whatinput-types-" + e), x("input")
                },
                h = function(e) {
                    if (c.x !== e.screenX || c.y !== e.screenY ? (a = !1, c.x = e.screenX, c.y = e.screenY) : a = !0, !s && !a) {
                        var o = u[e.type];
                        "pointer" === o && (o = E(e)), t !== o && (t = o, n.setAttribute("data-whatintent", t), x("intent"))
                    }
                },
                y = function(e) {
                    "touchstart" === e.type ? (s = !1, w(e)) : s = !0
                },
                x = function(e) {
                    for (var n = 0, o = i.length; n < o; n++) i[n].type === e && i[n].function.call(void 0, t)
                },
                E = function(e) {
                    return "number" == typeof e.pointerType ? p[e.pointerType] : "pen" === e.pointerType ? "touch" : e.pointerType
                },
                L = function() {
                    return "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll"
                };
            return "addEventListener" in window && Array.prototype.indexOf && function() {
                u[L()] = "mouse", m(), l()
            }(), {
                ask: function(n) {
                    return "loose" === n ? t : e
                },
                types: function() {
                    return d
                },
                ignoreKeys: function(e) {
                    r = e
                },
                onChange: function(e, t) {
                    i.push({
                        function: e,
                        type: t
                    })
                }
            }
        }()
    }])
});
! function(t) {
    function e(n) {
        if (i[n]) return i[n].exports;
        var s = i[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(s.exports, s, s.exports, e), s.l = !0, s.exports
    }
    var i = {};
    e.m = t, e.c = i, e.i = function(t) {
        return t
    }, e.d = function(t, i, n) {
        e.o(t, i) || Object.defineProperty(t, i, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }, e.n = function(t) {
        var i = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return e.d(i, "a", i), i
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 36)
}([function(t, e) {
    t.exports = jQuery
}, function(t, e, i) {
    "use strict";

    function n() {
        return "rtl" === r()("html").attr("dir")
    }

    function s(t, e) {
        return t = t || 6, Math.round(Math.pow(36, t + 1) - Math.random() * Math.pow(36, t)).toString(36).slice(1) + (e ? "-" + e : "")
    }

    function o(t) {
        var e, i = {
                transition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend"
            },
            n = document.createElement("div");
        for (var s in i) void 0 !== n.style[s] && (e = i[s]);
        return e || (e = setTimeout(function() {
            t.triggerHandler("transitionend", [t])
        }, 1), "transitionend")
    }
    i.d(e, "a", function() {
        return n
    }), i.d(e, "b", function() {
        return s
    }), i.d(e, "c", function() {
        return o
    });
    var a = i(0),
        r = i.n(a)
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t) {
        return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }

    function o(t) {
        return s(void 0 !== t.constructor.name ? t.constructor.name : t.className)
    }
    i.d(e, "a", function() {
        return u
    });
    var a = i(0),
        r = (i.n(a), i(1)),
        l = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        u = function() {
            function t(e, s) {
                n(this, t), this._setup(e, s);
                var a = o(this);
                this.uuid = i.i(r.b)(6, a), this.$element.attr("data-" + a) || this.$element.attr("data-" + a, this.uuid), this.$element.data("zfPlugin") || this.$element.data("zfPlugin", this), this.$element.trigger("init.zf." + a)
            }
            return l(t, [{
                key: "destroy",
                value: function() {
                    this._destroy();
                    var t = o(this);
                    this.$element.removeAttr("data-" + t).removeData("zfPlugin").trigger("destroyed.zf." + t);
                    for (var e in this) this[e] = null
                }
            }]), t
        }()
}, function(t, e, i) {
    "use strict";

    function n(t) {
        return !!t && t.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function() {
            return !(!a()(this).is(":visible") || a()(this).attr("tabindex") < 0)
        })
    }

    function s(t) {
        var e = l[t.which || t.keyCode] || String.fromCharCode(t.which).toUpperCase();
        return e = e.replace(/\W+/, ""), t.shiftKey && (e = "SHIFT_" + e), t.ctrlKey && (e = "CTRL_" + e), t.altKey && (e = "ALT_" + e), e = e.replace(/_$/, "")
    }
    i.d(e, "a", function() {
        return c
    });
    var o = i(0),
        a = i.n(o),
        r = i(1),
        l = {
            9: "TAB",
            13: "ENTER",
            27: "ESCAPE",
            32: "SPACE",
            35: "END",
            36: "HOME",
            37: "ARROW_LEFT",
            38: "ARROW_UP",
            39: "ARROW_RIGHT",
            40: "ARROW_DOWN"
        },
        u = {},
        c = {
            keys: function(t) {
                var e = {};
                for (var i in t) e[t[i]] = t[i];
                return e
            }(l),
            parseKey: s,
            handleKey: function(t, e, n) {
                var s, o, l, c = u[e],
                    h = this.parseKey(t);
                if (!c) return console.warn("Component not defined!");
                if (s = void 0 === c.ltr ? c : i.i(r.a)() ? a.a.extend({}, c.ltr, c.rtl) : a.a.extend({}, c.rtl, c.ltr), o = s[h], (l = n[o]) && "function" == typeof l) {
                    var d = l.apply();
                    (n.handled || "function" == typeof n.handled) && n.handled(d)
                } else(n.unhandled || "function" == typeof n.unhandled) && n.unhandled()
            },
            findFocusable: n,
            register: function(t, e) {
                u[t] = e
            },
            trapFocus: function(t) {
                var e = n(t),
                    i = e.eq(0),
                    o = e.eq(-1);
                t.on("keydown.zf.trapfocus", function(t) {
                    t.target === o[0] && "TAB" === s(t) ? (t.preventDefault(), i.focus()) : t.target === i[0] && "SHIFT_TAB" === s(t) && (t.preventDefault(), o.focus())
                })
            },
            releaseFocus: function(t) {
                t.off("keydown.zf.trapfocus")
            }
        }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        var e = {};
        return "string" != typeof t ? e : (t = t.trim().slice(1, -1)) ? e = t.split("&").reduce(function(t, e) {
            var i = e.replace(/\+/g, " ").split("="),
                n = i[0],
                s = i[1];
            return n = decodeURIComponent(n), s = void 0 === s ? null : decodeURIComponent(s), t.hasOwnProperty(n) ? Array.isArray(t[n]) ? t[n].push(s) : t[n] = [t[n], s] : t[n] = s, t
        }, {}) : e
    }
    i.d(e, "a", function() {
        return r
    });
    var s = i(0),
        o = i.n(s),
        a = window.matchMedia || function() {
            var t = window.styleMedia || window.media;
            if (!t) {
                var e = document.createElement("style"),
                    i = document.getElementsByTagName("script")[0],
                    n = null;
                e.type = "text/css", e.id = "matchmediajs-test", i && i.parentNode && i.parentNode.insertBefore(e, i), n = "getComputedStyle" in window && window.getComputedStyle(e, null) || e.currentStyle, t = {
                    matchMedium: function(t) {
                        var i = "@media " + t + "{ #matchmediajs-test { width: 1px; } }";
                        return e.styleSheet ? e.styleSheet.cssText = i : e.textContent = i, "1px" === n.width
                    }
                }
            }
            return function(e) {
                return {
                    matches: t.matchMedium(e || "all"),
                    media: e || "all"
                }
            }
        }(),
        r = {
            queries: [],
            current: "",
            _init: function() {
                var t = this;
                o()("meta.foundation-mq").length || o()('<meta class="foundation-mq">').appendTo(document.head);
                var e, i = o()(".foundation-mq").css("font-family");
                e = n(i);
                for (var s in e) e.hasOwnProperty(s) && t.queries.push({
                    name: s,
                    value: "only screen and (min-width: " + e[s] + ")"
                });
                this.current = this._getCurrentSize(), this._watcher()
            },
            atLeast: function(t) {
                var e = this.get(t);
                return !!e && a(e).matches
            },
            is: function(t) {
                return t = t.trim().split(" "), t.length > 1 && "only" === t[1] ? t[0] === this._getCurrentSize() : this.atLeast(t[0])
            },
            get: function(t) {
                for (var e in this.queries)
                    if (this.queries.hasOwnProperty(e)) {
                        var i = this.queries[e];
                        if (t === i.name) return i.value
                    }
                return null
            },
            _getCurrentSize: function() {
                for (var t, e = 0; e < this.queries.length; e++) {
                    var i = this.queries[e];
                    a(i.value).matches && (t = i)
                }
                return "object" == typeof t ? t.name : t
            },
            _watcher: function() {
                var t = this;
                o()(window).off("resize.zf.mediaquery").on("resize.zf.mediaquery", function() {
                    var e = t._getCurrentSize(),
                        i = t.current;
                    e !== i && (t.current = e, o()(window).trigger("changed.zf.mediaquery", [e, i]))
                })
            }
        }
}, function(t, e, i) {
    "use strict";

    function n(t, e, i) {
        var n = void 0,
            s = Array.prototype.slice.call(arguments, 3);
        o()(window).off(e).on(e, function(e) {
            n && clearTimeout(n), n = setTimeout(function() {
                i.apply(null, s)
            }, t || 10)
        })
    }
    i.d(e, "a", function() {
        return u
    });
    var s = i(0),
        o = i.n(s),
        a = i(6),
        r = function() {
            for (var t = ["WebKit", "Moz", "O", "Ms", ""], e = 0; e < t.length; e++)
                if (t[e] + "MutationObserver" in window) return window[t[e] + "MutationObserver"];
            return !1
        }(),
        l = function(t, e) {
            t.data(e).split(" ").forEach(function(i) {
                o()("#" + i)["close" === e ? "trigger" : "triggerHandler"](e + ".zf.trigger", [t])
            })
        },
        u = {
            Listeners: {
                Basic: {},
                Global: {}
            },
            Initializers: {}
        };
    u.Listeners.Basic = {
        openListener: function() {
            l(o()(this), "open")
        },
        closeListener: function() {
            o()(this).data("close") ? l(o()(this), "close") : o()(this).trigger("close.zf.trigger")
        },
        toggleListener: function() {
            o()(this).data("toggle") ? l(o()(this), "toggle") : o()(this).trigger("toggle.zf.trigger")
        },
        closeableListener: function(t) {
            t.stopPropagation();
            var e = o()(this).data("closable");
            "" !== e ? a.a.animateOut(o()(this), e, function() {
                o()(this).trigger("closed.zf")
            }) : o()(this).fadeOut().trigger("closed.zf")
        },
        toggleFocusListener: function() {
            var t = o()(this).data("toggle-focus");
            o()("#" + t).triggerHandler("toggle.zf.trigger", [o()(this)])
        }
    }, u.Initializers.addOpenListener = function(t) {
        t.off("click.zf.trigger", u.Listeners.Basic.openListener), t.on("click.zf.trigger", "[data-open]", u.Listeners.Basic.openListener)
    }, u.Initializers.addCloseListener = function(t) {
        t.off("click.zf.trigger", u.Listeners.Basic.closeListener), t.on("click.zf.trigger", "[data-close]", u.Listeners.Basic.closeListener)
    }, u.Initializers.addToggleListener = function(t) {
        t.off("click.zf.trigger", u.Listeners.Basic.toggleListener), t.on("click.zf.trigger", "[data-toggle]", u.Listeners.Basic.toggleListener)
    }, u.Initializers.addCloseableListener = function(t) {
        t.off("close.zf.trigger", u.Listeners.Basic.closeableListener), t.on("close.zf.trigger", "[data-closeable], [data-closable]", u.Listeners.Basic.closeableListener)
    }, u.Initializers.addToggleFocusListener = function(t) {
        t.off("focus.zf.trigger blur.zf.trigger", u.Listeners.Basic.toggleFocusListener), t.on("focus.zf.trigger blur.zf.trigger", "[data-toggle-focus]", u.Listeners.Basic.toggleFocusListener)
    }, u.Listeners.Global = {
        resizeListener: function(t) {
            r || t.each(function() {
                o()(this).triggerHandler("resizeme.zf.trigger")
            }), t.attr("data-events", "resize")
        },
        scrollListener: function(t) {
            r || t.each(function() {
                o()(this).triggerHandler("scrollme.zf.trigger")
            }), t.attr("data-events", "scroll")
        },
        closeMeListener: function(t, e) {
            var i = t.namespace.split(".")[0];
            o()("[data-" + i + "]").not('[data-yeti-box="' + e + '"]').each(function() {
                var t = o()(this);
                t.triggerHandler("close.zf.trigger", [t])
            })
        }
    }, u.Initializers.addClosemeListener = function(t) {
        var e = o()("[data-yeti-box]"),
            i = ["dropdown", "tooltip", "reveal"];
        if (t && ("string" == typeof t ? i.push(t) : "object" == typeof t && "string" == typeof t[0] ? i.concat(t) : console.error("Plugin names must be strings")), e.length) {
            var n = i.map(function(t) {
                return "closeme.zf." + t
            }).join(" ");
            o()(window).off(n).on(n, u.Listeners.Global.closeMeListener)
        }
    }, u.Initializers.addResizeListener = function(t) {
        var e = o()("[data-resize]");
        e.length && n(t, "resize.zf.trigger", u.Listeners.Global.resizeListener, e)
    }, u.Initializers.addScrollListener = function(t) {
        var e = o()("[data-scroll]");
        e.length && n(t, "scroll.zf.trigger", u.Listeners.Global.scrollListener, e)
    }, u.Initializers.addMutationEventsListener = function(t) {
        if (!r) return !1;
        var e = t.find("[data-resize], [data-scroll], [data-mutate]"),
            i = function(t) {
                var e = o()(t[0].target);
                switch (t[0].type) {
                    case "attributes":
                        "scroll" === e.attr("data-events") && "data-events" === t[0].attributeName && e.triggerHandler("scrollme.zf.trigger", [e, window.pageYOffset]), "resize" === e.attr("data-events") && "data-events" === t[0].attributeName && e.triggerHandler("resizeme.zf.trigger", [e]), "style" === t[0].attributeName && (e.closest("[data-mutate]").attr("data-events", "mutate"), e.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger", [e.closest("[data-mutate]")]));
                        break;
                    case "childList":
                        e.closest("[data-mutate]").attr("data-events", "mutate"), e.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger", [e.closest("[data-mutate]")]);
                        break;
                    default:
                        return !1
                }
            };
        if (e.length)
            for (var n = 0; n <= e.length - 1; n++) {
                var s = new r(i);
                s.observe(e[n], {
                    attributes: !0,
                    childList: !0,
                    characterData: !1,
                    subtree: !0,
                    attributeFilter: ["data-events", "style"]
                })
            }
    }, u.Initializers.addSimpleListeners = function() {
        var t = o()(document);
        u.Initializers.addOpenListener(t), u.Initializers.addCloseListener(t), u.Initializers.addToggleListener(t), u.Initializers.addCloseableListener(t), u.Initializers.addToggleFocusListener(t)
    }, u.Initializers.addGlobalListeners = function() {
        var t = o()(document);
        u.Initializers.addMutationEventsListener(t), u.Initializers.addResizeListener(), u.Initializers.addScrollListener(), u.Initializers.addClosemeListener()
    }, u.init = function(t, e) {
        if (void 0 === t.triggersInitialized) {
            t(document);
            "complete" === document.readyState ? (u.Initializers.addSimpleListeners(), u.Initializers.addGlobalListeners()) : t(window).on("load", function() {
                u.Initializers.addSimpleListeners(), u.Initializers.addGlobalListeners()
            }), t.triggersInitialized = !0
        }
        e && (e.Triggers = u, e.IHearYou = u.Initializers.addGlobalListeners)
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e, i) {
        function n(r) {
            a || (a = r), o = r - a, i.apply(e), o < t ? s = window.requestAnimationFrame(n, e) : (window.cancelAnimationFrame(s), e.trigger("finished.zf.animate", [e]).triggerHandler("finished.zf.animate", [e]))
        }
        var s, o, a = null;
        if (0 === t) return i.apply(e), void e.trigger("finished.zf.animate", [e]).triggerHandler("finished.zf.animate", [e]);
        s = window.requestAnimationFrame(n)
    }

    function s(t, e, n, s) {
        function o() {
            t || e.hide(), c(), s && s.apply(e)
        }

        function c() {
            e[0].style.transitionDuration = 0, e.removeClass(h + " " + d + " " + n)
        }
        if (e = a()(e).eq(0), e.length) {
            var h = t ? l[0] : l[1],
                d = t ? u[0] : u[1];
            c(), e.addClass(n).css("transition", "none"), requestAnimationFrame(function() {
                e.addClass(h), t && e.show()
            }), requestAnimationFrame(function() {
                e[0].offsetWidth, e.css("transition", "").addClass(d)
            }), e.one(i.i(r.c)(e), o)
        }
    }
    i.d(e, "b", function() {
        return n
    }), i.d(e, "a", function() {
        return c
    });
    var o = i(0),
        a = i.n(o),
        r = i(1),
        l = ["mui-enter", "mui-leave"],
        u = ["mui-enter-active", "mui-leave-active"],
        c = {
            animateIn: function(t, e, i) {
                s(!0, t, e, i)
            },
            animateOut: function(t, e, i) {
                s(!1, t, e, i)
            }
        }
}, function(t, e, i) {
    "use strict";

    function n(t, e, i, n, o) {
        return 0 === s(t, e, i, n, o)
    }

    function s(t, e, i, n, s) {
        var a, r, l, u, c = o(t);
        if (e) {
            var h = o(e);
            r = h.height + h.offset.top - (c.offset.top + c.height), a = c.offset.top - h.offset.top, l = c.offset.left - h.offset.left, u = h.width + h.offset.left - (c.offset.left + c.width)
        } else r = c.windowDims.height + c.windowDims.offset.top - (c.offset.top + c.height), a = c.offset.top - c.windowDims.offset.top, l = c.offset.left - c.windowDims.offset.left, u = c.windowDims.width - (c.offset.left + c.width);
        return r = s ? 0 : Math.min(r, 0), a = Math.min(a, 0), l = Math.min(l, 0), u = Math.min(u, 0), i ? l + u : n ? a + r : Math.sqrt(a * a + r * r + l * l + u * u)
    }

    function o(t) {
        if ((t = t.length ? t[0] : t) === window || t === document) throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
        var e = t.getBoundingClientRect(),
            i = t.parentNode.getBoundingClientRect(),
            n = document.body.getBoundingClientRect(),
            s = window.pageYOffset,
            o = window.pageXOffset;
        return {
            width: e.width,
            height: e.height,
            offset: {
                top: e.top + s,
                left: e.left + o
            },
            parentDims: {
                width: i.width,
                height: i.height,
                offset: {
                    top: i.top + s,
                    left: i.left + o
                }
            },
            windowDims: {
                width: n.width,
                height: n.height,
                offset: {
                    top: s,
                    left: o
                }
            }
        }
    }

    function a(t, e, n, s, o, a) {
        switch (console.log("NOTE: GetOffsets is deprecated in favor of GetExplicitOffsets and will be removed in 6.5"), n) {
            case "top":
                return i.i(l.a)() ? r(t, e, "top", "left", s, o, a) : r(t, e, "top", "right", s, o, a);
            case "bottom":
                return i.i(l.a)() ? r(t, e, "bottom", "left", s, o, a) : r(t, e, "bottom", "right", s, o, a);
            case "center top":
                return r(t, e, "top", "center", s, o, a);
            case "center bottom":
                return r(t, e, "bottom", "center", s, o, a);
            case "center left":
                return r(t, e, "left", "center", s, o, a);
            case "center right":
                return r(t, e, "right", "center", s, o, a);
            case "left bottom":
                return r(t, e, "bottom", "left", s, o, a);
            case "right bottom":
                return r(t, e, "bottom", "right", s, o, a);
            case "center":
                return {
                    left: $eleDims.windowDims.offset.left + $eleDims.windowDims.width / 2 - $eleDims.width / 2 + o,
                    top: $eleDims.windowDims.offset.top + $eleDims.windowDims.height / 2 - ($eleDims.height / 2 + s)
                };
            case "reveal":
                return {
                    left: ($eleDims.windowDims.width - $eleDims.width) / 2 + o,
                    top: $eleDims.windowDims.offset.top + s
                };
            case "reveal full":
                return {
                    left: $eleDims.windowDims.offset.left,
                    top: $eleDims.windowDims.offset.top
                };
            default:
                return {
                    left: i.i(l.a)() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width - o : $anchorDims.offset.left + o,
                    top: $anchorDims.offset.top + $anchorDims.height + s
                }
        }
    }

    function r(t, e, i, n, s, a, r) {
        var l, u, c = o(t),
            h = e ? o(e) : null;
        switch (i) {
            case "top":
                l = h.offset.top - (c.height + s);
                break;
            case "bottom":
                l = h.offset.top + h.height + s;
                break;
            case "left":
                u = h.offset.left - (c.width + a);
                break;
            case "right":
                u = h.offset.left + h.width + a
        }
        switch (i) {
            case "top":
            case "bottom":
                switch (n) {
                    case "left":
                        u = h.offset.left + a;
                        break;
                    case "right":
                        u = h.offset.left - c.width + h.width - a;
                        break;
                    case "center":
                        u = r ? a : h.offset.left + h.width / 2 - c.width / 2 + a
                }
                break;
            case "right":
            case "left":
                switch (n) {
                    case "bottom":
                        l = h.offset.top - s + h.height - c.height;
                        break;
                    case "top":
                        l = h.offset.top + s;
                        break;
                    case "center":
                        l = h.offset.top + s + h.height / 2 - c.height / 2
                }
        }
        return {
            top: l,
            left: u
        }
    }
    i.d(e, "a", function() {
        return u
    });
    var l = i(1),
        u = {
            ImNotTouchingYou: n,
            OverlapArea: s,
            GetDimensions: o,
            GetOffsets: a,
            GetExplicitOffsets: r
        }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        function i() {
            0 === --n && e()
        }
        var n = t.length;
        0 === n && e(), t.each(function() {
            if (this.complete && void 0 !== this.naturalWidth) i();
            else {
                var t = new Image,
                    e = "load.zf.images error.zf.images";
                o()(t).one(e, function t(n) {
                    o()(this).off(e, t), i()
                }), t.src = o()(this).attr("src")
            }
        })
    }
    i.d(e, "a", function() {
        return n
    });
    var s = i(0),
        o = i.n(s)
}, function(t, e, i) {
    "use strict";
    i.d(e, "a", function() {
        return o
    });
    var n = i(0),
        s = i.n(n),
        o = {
            Feather: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "zf";
                t.attr("role", "menubar");
                var i = t.find("li").attr({
                        role: "menuitem"
                    }),
                    n = "is-" + e + "-submenu",
                    o = n + "-item",
                    a = "is-" + e + "-submenu-parent",
                    r = "accordion" !== e;
                i.each(function() {
                    var t = s()(this),
                        i = t.children("ul");
                    i.length && (t.addClass(a), i.addClass("submenu " + n).attr({
                        "data-submenu": ""
                    }), r && (t.attr({
                        "aria-haspopup": !0,
                        "aria-label": t.children("a:first").text()
                    }), "drilldown" === e && t.attr({
                        "aria-expanded": !1
                    })), i.addClass("submenu " + n).attr({
                        "data-submenu": "",
                        role: "menu"
                    }), "drilldown" === e && i.attr({
                        "aria-hidden": !0
                    })), t.parent("[data-submenu]").length && t.addClass("is-submenu-item " + o)
                })
            },
            Burn: function(t, e) {
                var i = "is-" + e + "-submenu",
                    n = i + "-item",
                    s = "is-" + e + "-submenu-parent";
                t.find(">li, .menu, .menu > li").removeClass(i + " " + n + " " + s + " is-submenu-item submenu is-active").removeAttr("data-submenu").css("display", "")
            }
        }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s() {
        this.removeEventListener("touchmove", o), this.removeEventListener("touchend", s), g = !1
    }

    function o(t) {
        if (f.a.spotSwipe.preventDefault && t.preventDefault(), g) {
            var e, i = t.touches[0].pageX,
                n = (t.touches[0].pageY, l - i);
            h = (new Date).getTime() - c, Math.abs(n) >= f.a.spotSwipe.moveThreshold && h <= f.a.spotSwipe.timeThreshold && (e = n > 0 ? "left" : "right"), e && (t.preventDefault(), s.call(this), f()(this).trigger("swipe", e).trigger("swipe" + e))
        }
    }

    function a(t) {
        1 == t.touches.length && (l = t.touches[0].pageX, u = t.touches[0].pageY, g = !0, c = (new Date).getTime(), this.addEventListener("touchmove", o, !1), this.addEventListener("touchend", s, !1))
    }

    function r() {
        this.addEventListener && this.addEventListener("touchstart", a, !1)
    }
    i.d(e, "a", function() {
        return m
    });
    var l, u, c, h, d = i(0),
        f = i.n(d),
        p = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        m = {},
        g = !1,
        v = function() {
            function t(e) {
                n(this, t), this.version = "1.0.0", this.enabled = "ontouchstart" in document.documentElement, this.preventDefault = !1, this.moveThreshold = 75, this.timeThreshold = 200, this.$ = e, this._init()
            }
            return p(t, [{
                key: "_init",
                value: function() {
                    var t = this.$;
                    t.event.special.swipe = {
                        setup: r
                    }, t.each(["left", "up", "down", "right"], function() {
                        t.event.special["swipe" + this] = {
                            setup: function() {
                                t(this).on("swipe", t.noop)
                            }
                        }
                    })
                }
            }]), t
        }();
    m.setupSpotSwipe = function(t) {
        t.spotSwipe = new v(t)
    }, m.setupTouchHandler = function(t) {
        t.fn.addTouch = function() {
            this.each(function(i, n) {
                t(n).bind("touchstart touchmove touchend touchcancel", function() {
                    e(event)
                })
            });
            var e = function(t) {
                var e, i = t.changedTouches,
                    n = i[0],
                    s = {
                        touchstart: "mousedown",
                        touchmove: "mousemove",
                        touchend: "mouseup"
                    },
                    o = s[t.type];
                "MouseEvent" in window && "function" == typeof window.MouseEvent ? e = new window.MouseEvent(o, {
                    bubbles: !0,
                    cancelable: !0,
                    screenX: n.screenX,
                    screenY: n.screenY,
                    clientX: n.clientX,
                    clientY: n.clientY
                }) : (e = document.createEvent("MouseEvent"), e.initMouseEvent(o, !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null)), n.target.dispatchEvent(e)
            }
        }
    }, m.init = function(t) {
        void 0 === t.spotSwipe && (m.setupSpotSwipe(t), m.setupTouchHandler(t))
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return d
    });
    var a = i(0),
        r = i.n(a),
        l = i(3),
        u = i(1),
        c = i(2),
        h = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        d = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), h(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.className = "Accordion", this._init(), l.a.register("Accordion", {
                        ENTER: "toggle",
                        SPACE: "toggle",
                        ARROW_DOWN: "next",
                        ARROW_UP: "previous"
                    })
                }
            }, {
                key: "_init",
                value: function() {
                    var t = this;
                    this.$element.attr("role", "tablist"), this.$tabs = this.$element.children("[data-accordion-item]"), this.$tabs.each(function(t, e) {
                        var n = r()(e),
                            s = n.children("[data-tab-content]"),
                            o = s[0].id || i.i(u.b)(6, "accordion"),
                            a = e.id || o + "-label";
                        n.find("a:first").attr({
                            "aria-controls": o,
                            role: "tab",
                            id: a,
                            "aria-expanded": !1,
                            "aria-selected": !1
                        }), s.attr({
                            role: "tabpanel",
                            "aria-labelledby": a,
                            "aria-hidden": !0,
                            id: o
                        })
                    });
                    var e = this.$element.find(".is-active").children("[data-tab-content]");
                    this.firstTimeInit = !0, e.length && (this.down(e, this.firstTimeInit), this.firstTimeInit = !1), this._checkDeepLink = function() {
                        var e = window.location.hash;
                        if (e.length) {
                            var i = t.$element.find('[href$="' + e + '"]'),
                                n = r()(e);
                            if (i.length && n) {
                                if (i.parent("[data-accordion-item]").hasClass("is-active") || (t.down(n, t.firstTimeInit), t.firstTimeInit = !1), t.options.deepLinkSmudge) {
                                    var s = t;
                                    r()(window).load(function() {
                                        var t = s.$element.offset();
                                        r()("html, body").animate({
                                            scrollTop: t.top
                                        }, s.options.deepLinkSmudgeDelay)
                                    })
                                }
                                t.$element.trigger("deeplink.zf.accordion", [i, n])
                            }
                        }
                    }, this.options.deepLink && this._checkDeepLink(), this._events()
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this;
                    this.$tabs.each(function() {
                        var e = r()(this),
                            i = e.children("[data-tab-content]");
                        i.length && e.children("a").off("click.zf.accordion keydown.zf.accordion").on("click.zf.accordion", function(e) {
                            e.preventDefault(), t.toggle(i)
                        }).on("keydown.zf.accordion", function(n) {
                            l.a.handleKey(n, "Accordion", {
                                toggle: function() {
                                    t.toggle(i)
                                },
                                next: function() {
                                    var i = e.next().find("a").focus();
                                    t.options.multiExpand || i.trigger("click.zf.accordion")
                                },
                                previous: function() {
                                    var i = e.prev().find("a").focus();
                                    t.options.multiExpand || i.trigger("click.zf.accordion")
                                },
                                handled: function() {
                                    n.preventDefault(), n.stopPropagation()
                                }
                            })
                        })
                    }), this.options.deepLink && r()(window).on("popstate", this._checkDeepLink)
                }
            }, {
                key: "toggle",
                value: function(t) {
                    if (t.closest("[data-accordion]").is("[disabled]")) return void console.info("Cannot toggle an accordion that is disabled.");
                    if (t.parent().hasClass("is-active") ? this.up(t) : this.down(t), this.options.deepLink) {
                        var e = t.prev("a").attr("href");
                        this.options.updateHistory ? history.pushState({}, "", e) : history.replaceState({}, "", e)
                    }
                }
            }, {
                key: "down",
                value: function(t, e) {
                    var i = this;
                    if (t.closest("[data-accordion]").is("[disabled]") && !e) return void console.info("Cannot call down on an accordion that is disabled.");
                    if (t.attr("aria-hidden", !1).parent("[data-tab-content]").addBack().parent().addClass("is-active"), !this.options.multiExpand && !e) {
                        var n = this.$element.children(".is-active").children("[data-tab-content]");
                        n.length && this.up(n.not(t))
                    }
                    t.slideDown(this.options.slideSpeed, function() {
                        i.$element.trigger("down.zf.accordion", [t])
                    }), r()("#" + t.attr("aria-labelledby")).attr({
                        "aria-expanded": !0,
                        "aria-selected": !0
                    })
                }
            }, {
                key: "up",
                value: function(t) {
                    if (t.closest("[data-accordion]").is("[disabled]")) return void console.info("Cannot call up on an accordion that is disabled.");
                    var e = t.parent().siblings(),
                        i = this;
                    (this.options.allowAllClosed || e.hasClass("is-active")) && t.parent().hasClass("is-active") && (t.slideUp(i.options.slideSpeed, function() {
                        i.$element.trigger("up.zf.accordion", [t])
                    }), t.attr("aria-hidden", !0).parent().removeClass("is-active"), r()("#" + t.attr("aria-labelledby")).attr({
                        "aria-expanded": !1,
                        "aria-selected": !1
                    }))
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$element.find("[data-tab-content]").stop(!0).slideUp(0).css("display", ""), this.$element.find("a").off(".zf.accordion"), this.options.deepLink && r()(window).off("popstate", this._checkDeepLink)
                }
            }]), e
        }(c.a);
    d.defaults = {
        slideSpeed: 250,
        multiExpand: !1,
        allowAllClosed: !1,
        deepLink: !1,
        deepLinkSmudge: !1,
        deepLinkSmudgeDelay: 300,
        updateHistory: !1
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return f
    });
    var a = i(0),
        r = i.n(a),
        l = i(3),
        u = i(9),
        c = i(1),
        h = i(2),
        d = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        f = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), d(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.className = "AccordionMenu", this._init(), l.a.register("AccordionMenu", {
                        ENTER: "toggle",
                        SPACE: "toggle",
                        ARROW_RIGHT: "open",
                        ARROW_UP: "up",
                        ARROW_DOWN: "down",
                        ARROW_LEFT: "close",
                        ESCAPE: "closeAll"
                    })
                }
            }, {
                key: "_init",
                value: function() {
                    u.a.Feather(this.$element, "accordion");
                    var t = this;
                    this.$element.find("[data-submenu]").not(".is-active").slideUp(0), this.$element.attr({
                        role: "tree",
                        "aria-multiselectable": this.options.multiOpen
                    }), this.$menuLinks = this.$element.find(".is-accordion-submenu-parent"), this.$menuLinks.each(function() {
                        var e = this.id || i.i(c.b)(6, "acc-menu-link"),
                            n = r()(this),
                            s = n.children("[data-submenu]"),
                            o = s[0].id || i.i(c.b)(6, "acc-menu"),
                            a = s.hasClass("is-active");
                        t.options.submenuToggle ? (n.addClass("has-submenu-toggle"), n.children("a").after('<button id="' + e + '" class="submenu-toggle" aria-controls="' + o + '" aria-expanded="' + a + '" title="' + t.options.submenuToggleText + '"><span class="submenu-toggle-text">' + t.options.submenuToggleText + "</span></button>")) : n.attr({
                            "aria-controls": o,
                            "aria-expanded": a,
                            id: e
                        }), s.attr({
                            "aria-labelledby": e,
                            "aria-hidden": !a,
                            role: "group",
                            id: o
                        })
                    }), this.$element.find("li").attr({
                        role: "treeitem"
                    });
                    var e = this.$element.find(".is-active");
                    if (e.length) {
                        var t = this;
                        e.each(function() {
                            t.down(r()(this))
                        })
                    }
                    this._events()
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this;
                    this.$element.find("li").each(function() {
                        var e = r()(this).children("[data-submenu]");
                        e.length && (t.options.submenuToggle ? r()(this).children(".submenu-toggle").off("click.zf.accordionMenu").on("click.zf.accordionMenu", function(i) {
                            t.toggle(e)
                        }) : r()(this).children("a").off("click.zf.accordionMenu").on("click.zf.accordionMenu", function(i) {
                            i.preventDefault(), t.toggle(e)
                        }))
                    }).on("keydown.zf.accordionmenu", function(e) {
                        var i, n, s = r()(this),
                            o = s.parent("ul").children("li"),
                            a = s.children("[data-submenu]");
                        o.each(function(t) {
                            if (r()(this).is(s)) return i = o.eq(Math.max(0, t - 1)).find("a").first(), n = o.eq(Math.min(t + 1, o.length - 1)).find("a").first(), r()(this).children("[data-submenu]:visible").length && (n = s.find("li:first-child").find("a").first()), r()(this).is(":first-child") ? i = s.parents("li").first().find("a").first() : i.parents("li").first().children("[data-submenu]:visible").length && (i = i.parents("li").find("li:last-child").find("a").first()), void(r()(this).is(":last-child") && (n = s.parents("li").first().next("li").find("a").first()))
                        }), l.a.handleKey(e, "AccordionMenu", {
                            open: function() {
                                a.is(":hidden") && (t.down(a), a.find("li").first().find("a").first().focus())
                            },
                            close: function() {
                                a.length && !a.is(":hidden") ? t.up(a) : s.parent("[data-submenu]").length && (t.up(s.parent("[data-submenu]")), s.parents("li").first().find("a").first().focus())
                            },
                            up: function() {
                                return i.focus(), !0
                            },
                            down: function() {
                                return n.focus(), !0
                            },
                            toggle: function() {
                                return !t.options.submenuToggle && (s.children("[data-submenu]").length ? (t.toggle(s.children("[data-submenu]")), !0) : void 0)
                            },
                            closeAll: function() {
                                t.hideAll()
                            },
                            handled: function(t) {
                                t && e.preventDefault(), e.stopImmediatePropagation()
                            }
                        })
                    })
                }
            }, {
                key: "hideAll",
                value: function() {
                    this.up(this.$element.find("[data-submenu]"))
                }
            }, {
                key: "showAll",
                value: function() {
                    this.down(this.$element.find("[data-submenu]"))
                }
            }, {
                key: "toggle",
                value: function(t) {
                    t.is(":animated") || (t.is(":hidden") ? this.down(t) : this.up(t))
                }
            }, {
                key: "down",
                value: function(t) {
                    var e = this;
                    this.options.multiOpen || this.up(this.$element.find(".is-active").not(t.parentsUntil(this.$element).add(t))), t.addClass("is-active").attr({
                        "aria-hidden": !1
                    }), this.options.submenuToggle ? t.prev(".submenu-toggle").attr({
                        "aria-expanded": !0
                    }) : t.parent(".is-accordion-submenu-parent").attr({
                        "aria-expanded": !0
                    }), t.slideDown(e.options.slideSpeed, function() {
                        e.$element.trigger("down.zf.accordionMenu", [t])
                    })
                }
            }, {
                key: "up",
                value: function(t) {
                    var e = this;
                    t.slideUp(e.options.slideSpeed, function() {
                        e.$element.trigger("up.zf.accordionMenu", [t])
                    });
                    var i = t.find("[data-submenu]").slideUp(0).addBack().attr("aria-hidden", !0);
                    this.options.submenuToggle ? i.prev(".submenu-toggle").attr("aria-expanded", !1) : i.parent(".is-accordion-submenu-parent").attr("aria-expanded", !1)
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$element.find("[data-submenu]").slideDown(0).css("display", ""), this.$element.find("a").off("click.zf.accordionMenu"), this.options.submenuToggle && (this.$element.find(".has-submenu-toggle").removeClass("has-submenu-toggle"), this.$element.find(".submenu-toggle").remove()), u.a.Burn(this.$element, "accordion")
                }
            }]), e
        }(h.a);
    f.defaults = {
        slideSpeed: 250,
        submenuToggle: !1,
        submenuToggleText: "Toggle menu",
        multiOpen: !0
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return p
    });
    var a = i(0),
        r = i.n(a),
        l = i(3),
        u = i(9),
        c = i(1),
        h = i(7),
        d = i(2),
        f = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        p = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), f(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.className = "Drilldown", this._init(), l.a.register("Drilldown", {
                        ENTER: "open",
                        SPACE: "open",
                        ARROW_RIGHT: "next",
                        ARROW_UP: "up",
                        ARROW_DOWN: "down",
                        ARROW_LEFT: "previous",
                        ESCAPE: "close",
                        TAB: "down",
                        SHIFT_TAB: "up"
                    })
                }
            }, {
                key: "_init",
                value: function() {
                    u.a.Feather(this.$element, "drilldown"), this.options.autoApplyClass && this.$element.addClass("drilldown"), this.$element.attr({
                        role: "tree",
                        "aria-multiselectable": !1
                    }), this.$submenuAnchors = this.$element.find("li.is-drilldown-submenu-parent").children("a"), this.$submenus = this.$submenuAnchors.parent("li").children("[data-submenu]").attr("role", "group"), this.$menuItems = this.$element.find("li").not(".js-drilldown-back").attr("role", "treeitem").find("a"), this.$element.attr("data-mutate", this.$element.attr("data-drilldown") || i.i(c.b)(6, "drilldown")), this._prepareMenu(), this._registerEvents(), this._keyboardEvents()
                }
            }, {
                key: "_prepareMenu",
                value: function() {
                    var t = this;
                    this.$submenuAnchors.each(function() {
                        var e = r()(this),
                            i = e.parent();
                        t.options.parentLink && e.clone().prependTo(i.children("[data-submenu]")).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menuitem"></li>'), e.data("savedHref", e.attr("href")).removeAttr("href").attr("tabindex", 0), e.children("[data-submenu]").attr({
                            "aria-hidden": !0,
                            tabindex: 0,
                            role: "group"
                        }), t._events(e)
                    }), this.$submenus.each(function() {
                        var e = r()(this);
                        if (!e.find(".js-drilldown-back").length) switch (t.options.backButtonPosition) {
                            case "bottom":
                                e.append(t.options.backButton);
                                break;
                            case "top":
                                e.prepend(t.options.backButton);
                                break;
                            default:
                                console.error("Unsupported backButtonPosition value '" + t.options.backButtonPosition + "'")
                        }
                        t._back(e)
                    }), this.$submenus.addClass("invisible"), this.options.autoHeight || this.$submenus.addClass("drilldown-submenu-cover-previous"), this.$element.parent().hasClass("is-drilldown") || (this.$wrapper = r()(this.options.wrapper).addClass("is-drilldown"), this.options.animateHeight && this.$wrapper.addClass("animate-height"), this.$element.wrap(this.$wrapper)), this.$wrapper = this.$element.parent(), this.$wrapper.css(this._getMaxDims())
                }
            }, {
                key: "_resize",
                value: function() {
                    this.$wrapper.css({
                        "max-width": "none",
                        "min-height": "none"
                    }), this.$wrapper.css(this._getMaxDims())
                }
            }, {
                key: "_events",
                value: function(t) {
                    var e = this;
                    t.off("click.zf.drilldown").on("click.zf.drilldown", function(i) {
                        if (r()(i.target).parentsUntil("ul", "li").hasClass("is-drilldown-submenu-parent") && (i.stopImmediatePropagation(), i.preventDefault()), e._show(t.parent("li")), e.options.closeOnClick) {
                            var n = r()("body");
                            n.off(".zf.drilldown").on("click.zf.drilldown", function(t) {
                                t.target === e.$element[0] || r.a.contains(e.$element[0], t.target) || (t.preventDefault(), e._hideAll(), n.off(".zf.drilldown"))
                            })
                        }
                    })
                }
            }, {
                key: "_registerEvents",
                value: function() {
                    this.options.scrollTop && (this._bindHandler = this._scrollTop.bind(this), this.$element.on("open.zf.drilldown hide.zf.drilldown closed.zf.drilldown", this._bindHandler)), this.$element.on("mutateme.zf.trigger", this._resize.bind(this))
                }
            }, {
                key: "_scrollTop",
                value: function() {
                    var t = this,
                        e = "" != t.options.scrollTopElement ? r()(t.options.scrollTopElement) : t.$element,
                        i = parseInt(e.offset().top + t.options.scrollTopOffset, 10);
                    r()("html, body").stop(!0).animate({
                        scrollTop: i
                    }, t.options.animationDuration, t.options.animationEasing, function() {
                        this === r()("html")[0] && t.$element.trigger("scrollme.zf.drilldown")
                    })
                }
            }, {
                key: "_keyboardEvents",
                value: function() {
                    var t = this;
                    this.$menuItems.add(this.$element.find(".js-drilldown-back > a, .is-submenu-parent-item > a")).on("keydown.zf.drilldown", function(e) {
                        var n, s, o = r()(this),
                            a = o.parent("li").parent("ul").children("li").children("a");
                        a.each(function(t) {
                            if (r()(this).is(o)) return n = a.eq(Math.max(0, t - 1)), void(s = a.eq(Math.min(t + 1, a.length - 1)))
                        }), l.a.handleKey(e, "Drilldown", {
                            next: function() {
                                if (o.is(t.$submenuAnchors)) return t._show(o.parent("li")), o.parent("li").one(i.i(c.c)(o), function() {
                                    o.parent("li").find("ul li a").filter(t.$menuItems).first().focus()
                                }), !0
                            },
                            previous: function() {
                                return t._hide(o.parent("li").parent("ul")), o.parent("li").parent("ul").one(i.i(c.c)(o), function() {
                                    setTimeout(function() {
                                        o.parent("li").parent("ul").parent("li").children("a").first().focus()
                                    }, 1)
                                }), !0
                            },
                            up: function() {
                                return n.focus(), !o.is(t.$element.find("> li:first-child > a"))
                            },
                            down: function() {
                                return s.focus(), !o.is(t.$element.find("> li:last-child > a"))
                            },
                            close: function() {
                                o.is(t.$element.find("> li > a")) || (t._hide(o.parent().parent()), o.parent().parent().siblings("a").focus())
                            },
                            open: function() {
                                return o.is(t.$menuItems) ? o.is(t.$submenuAnchors) ? (t._show(o.parent("li")), o.parent("li").one(i.i(c.c)(o), function() {
                                    o.parent("li").find("ul li a").filter(t.$menuItems).first().focus()
                                }), !0) : void 0 : (t._hide(o.parent("li").parent("ul")), o.parent("li").parent("ul").one(i.i(c.c)(o), function() {
                                    setTimeout(function() {
                                        o.parent("li").parent("ul").parent("li").children("a").first().focus()
                                    }, 1)
                                }), !0)
                            },
                            handled: function(t) {
                                t && e.preventDefault(), e.stopImmediatePropagation()
                            }
                        })
                    })
                }
            }, {
                key: "_hideAll",
                value: function() {
                    var t = this.$element.find(".is-drilldown-submenu.is-active").addClass("is-closing");
                    this.options.autoHeight && this.$wrapper.css({
                        height: t.parent().closest("ul").data("calcHeight")
                    }), t.one(i.i(c.c)(t), function(e) {
                        t.removeClass("is-active is-closing")
                    }), this.$element.trigger("closed.zf.drilldown")
                }
            }, {
                key: "_back",
                value: function(t) {
                    var e = this;
                    t.off("click.zf.drilldown"), t.children(".js-drilldown-back").on("click.zf.drilldown", function(i) {
                        i.stopImmediatePropagation(), e._hide(t);
                        var n = t.parent("li").parent("ul").parent("li");
                        n.length && e._show(n)
                    })
                }
            }, {
                key: "_menuLinkEvents",
                value: function() {
                    var t = this;
                    this.$menuItems.not(".is-drilldown-submenu-parent").off("click.zf.drilldown").on("click.zf.drilldown", function(e) {
                        setTimeout(function() {
                            t._hideAll()
                        }, 0)
                    })
                }
            }, {
                key: "_show",
                value: function(t) {
                    this.options.autoHeight && this.$wrapper.css({
                        height: t.children("[data-submenu]").data("calcHeight")
                    }), t.attr("aria-expanded", !0), t.children("[data-submenu]").addClass("is-active").removeClass("invisible").attr("aria-hidden", !1), this.$element.trigger("open.zf.drilldown", [t])
                }
            }, {
                key: "_hide",
                value: function(t) {
                    this.options.autoHeight && this.$wrapper.css({
                        height: t.parent().closest("ul").data("calcHeight")
                    });
                    t.parent("li").attr("aria-expanded", !1), t.attr("aria-hidden", !0).addClass("is-closing"), t.addClass("is-closing").one(i.i(c.c)(t), function() {
                        t.removeClass("is-active is-closing"), t.blur().addClass("invisible")
                    }), t.trigger("hide.zf.drilldown", [t])
                }
            }, {
                key: "_getMaxDims",
                value: function() {
                    var t = 0,
                        e = {},
                        i = this;
                    return this.$submenus.add(this.$element).each(function() {
                        var n = (r()(this).children("li").length, h.a.GetDimensions(this).height);
                        t = n > t ? n : t, i.options.autoHeight && (r()(this).data("calcHeight", n), r()(this).hasClass("is-drilldown-submenu") || (e.height = n))
                    }), this.options.autoHeight || (e["min-height"] = t + "px"), e["max-width"] = this.$element[0].getBoundingClientRect().width + "px", e
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.options.scrollTop && this.$element.off(".zf.drilldown", this._bindHandler), this._hideAll(), this.$element.off("mutateme.zf.trigger"), u.a.Burn(this.$element, "drilldown"), this.$element.unwrap().find(".js-drilldown-back, .is-submenu-parent-item").remove().end().find(".is-active, .is-closing, .is-drilldown-submenu").removeClass("is-active is-closing is-drilldown-submenu").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role"), this.$submenuAnchors.each(function() {
                        r()(this).off(".zf.drilldown")
                    }), this.$submenus.removeClass("drilldown-submenu-cover-previous invisible"), this.$element.find("a").each(function() {
                        var t = r()(this);
                        t.removeAttr("tabindex"), t.data("savedHref") && t.attr("href", t.data("savedHref")).removeData("savedHref")
                    })
                }
            }]), e
        }(d.a);
    p.defaults = {
        autoApplyClass: !0,
        backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
        backButtonPosition: "top",
        wrapper: "<div></div>",
        parentLink: !1,
        closeOnClick: !1,
        autoHeight: !1,
        animateHeight: !1,
        scrollTop: !1,
        scrollTopElement: "",
        scrollTopOffset: 0,
        animationDuration: 500,
        animationEasing: "swing"
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return p
    });
    var a = i(0),
        r = i.n(a),
        l = i(3),
        u = i(9),
        c = i(7),
        h = i(1),
        d = i(2),
        f = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        p = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), f(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.className = "DropdownMenu", this._init(), l.a.register("DropdownMenu", {
                        ENTER: "open",
                        SPACE: "open",
                        ARROW_RIGHT: "next",
                        ARROW_UP: "up",
                        ARROW_DOWN: "down",
                        ARROW_LEFT: "previous",
                        ESCAPE: "close"
                    })
                }
            }, {
                key: "_init",
                value: function() {
                    u.a.Feather(this.$element, "dropdown");
                    var t = this.$element.find("li.is-dropdown-submenu-parent");
                    this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub"), this.$menuItems = this.$element.find('[role="menuitem"]'), this.$tabs = this.$element.children('[role="menuitem"]'), this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass), "auto" === this.options.alignment ? this.$element.hasClass(this.options.rightClass) || i.i(h.a)() || this.$element.parents(".top-bar-right").is("*") ? (this.options.alignment = "right", t.addClass("opens-left")) : (this.options.alignment = "left", t.addClass("opens-right")) : "right" === this.options.alignment ? t.addClass("opens-left") : t.addClass("opens-right"), this.changed = !1, this._events()
                }
            }, {
                key: "_isVertical",
                value: function() {
                    return "block" === this.$tabs.css("display") || "column" === this.$element.css("flex-direction")
                }
            }, {
                key: "_isRtl",
                value: function() {
                    return this.$element.hasClass("align-right") || i.i(h.a)() && !this.$element.hasClass("align-left")
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this,
                        e = "ontouchstart" in window || void 0 !== window.ontouchstart,
                        i = "is-dropdown-submenu-parent",
                        n = function(n) {
                            var s = r()(n.target).parentsUntil("ul", "." + i),
                                o = s.hasClass(i),
                                a = "true" === s.attr("data-is-click"),
                                l = s.children(".is-dropdown-submenu");
                            if (o)
                                if (a) {
                                    if (!t.options.closeOnClick || !t.options.clickOpen && !e || t.options.forceFollow && e) return;
                                    n.stopImmediatePropagation(), n.preventDefault(), t._hide(s)
                                } else n.preventDefault(), n.stopImmediatePropagation(), t._show(l), s.add(s.parentsUntil(t.$element, "." + i)).attr("data-is-click", !0)
                        };
                    (this.options.clickOpen || e) && this.$menuItems.on("click.zf.dropdownmenu touchstart.zf.dropdownmenu", n), t.options.closeOnClickInside && this.$menuItems.on("click.zf.dropdownmenu", function(e) {
                        r()(this).hasClass(i) || t._hide()
                    }), this.options.disableHover || this.$menuItems.on("mouseenter.zf.dropdownmenu", function(e) {
                        var n = r()(this);
                        n.hasClass(i) && (clearTimeout(n.data("_delay")), n.data("_delay", setTimeout(function() {
                            t._show(n.children(".is-dropdown-submenu"))
                        }, t.options.hoverDelay)))
                    }).on("mouseleave.zf.dropdownmenu", function(e) {
                        var n = r()(this);
                        if (n.hasClass(i) && t.options.autoclose) {
                            if ("true" === n.attr("data-is-click") && t.options.clickOpen) return !1;
                            clearTimeout(n.data("_delay")), n.data("_delay", setTimeout(function() {
                                t._hide(n)
                            }, t.options.closingTime))
                        }
                    }), this.$menuItems.on("keydown.zf.dropdownmenu", function(e) {
                        var i, n, s = r()(e.target).parentsUntil("ul", '[role="menuitem"]'),
                            o = t.$tabs.index(s) > -1,
                            a = o ? t.$tabs : s.siblings("li").add(s);
                        a.each(function(t) {
                            if (r()(this).is(s)) return i = a.eq(t - 1), void(n = a.eq(t + 1))
                        });
                        var u = function() {
                                n.children("a:first").focus(), e.preventDefault()
                            },
                            c = function() {
                                i.children("a:first").focus(), e.preventDefault()
                            },
                            h = function() {
                                var i = s.children("ul.is-dropdown-submenu");
                                i.length && (t._show(i), s.find("li > a:first").focus(), e.preventDefault())
                            },
                            d = function() {
                                var i = s.parent("ul").parent("li");
                                i.children("a:first").focus(), t._hide(i), e.preventDefault()
                            },
                            f = {
                                open: h,
                                close: function() {
                                    t._hide(t.$element), t.$menuItems.eq(0).children("a").focus(), e.preventDefault()
                                },
                                handled: function() {
                                    e.stopImmediatePropagation()
                                }
                            };
                        o ? t._isVertical() ? t._isRtl() ? r.a.extend(f, {
                            down: u,
                            up: c,
                            next: d,
                            previous: h
                        }) : r.a.extend(f, {
                            down: u,
                            up: c,
                            next: h,
                            previous: d
                        }) : t._isRtl() ? r.a.extend(f, {
                            next: c,
                            previous: u,
                            down: h,
                            up: d
                        }) : r.a.extend(f, {
                            next: u,
                            previous: c,
                            down: h,
                            up: d
                        }) : t._isRtl() ? r.a.extend(f, {
                            next: d,
                            previous: h,
                            down: u,
                            up: c
                        }) : r.a.extend(f, {
                            next: h,
                            previous: d,
                            down: u,
                            up: c
                        }), l.a.handleKey(e, "DropdownMenu", f)
                    })
                }
            }, {
                key: "_addBodyHandler",
                value: function() {
                    var t = r()(document.body),
                        e = this;
                    t.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu").on("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu", function(i) {
                        e.$element.find(i.target).length || (e._hide(), t.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu"))
                    })
                }
            }, {
                key: "_show",
                value: function(t) {
                    var e = this.$tabs.index(this.$tabs.filter(function(e, i) {
                            return r()(i).find(t).length > 0
                        })),
                        i = t.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");
                    this._hide(i, e), t.css("visibility", "hidden").addClass("js-dropdown-active").parent("li.is-dropdown-submenu-parent").addClass("is-active");
                    var n = c.a.ImNotTouchingYou(t, null, !0);
                    if (!n) {
                        var s = "left" === this.options.alignment ? "-right" : "-left",
                            o = t.parent(".is-dropdown-submenu-parent");
                        o.removeClass("opens" + s).addClass("opens-" + this.options.alignment), n = c.a.ImNotTouchingYou(t, null, !0), n || o.removeClass("opens-" + this.options.alignment).addClass("opens-inner"), this.changed = !0
                    }
                    t.css("visibility", ""), this.options.closeOnClick && this._addBodyHandler(), this.$element.trigger("show.zf.dropdownmenu", [t])
                }
            }, {
                key: "_hide",
                value: function(t, e) {
                    var i;
                    if (i = t && t.length ? t : void 0 !== e ? this.$tabs.not(function(t, i) {
                            return t === e
                        }) : this.$element, i.hasClass("is-active") || i.find(".is-active").length > 0) {
                        if (i.find("li.is-active").add(i).attr({
                                "data-is-click": !1
                            }).removeClass("is-active"), i.find("ul.js-dropdown-active").removeClass("js-dropdown-active"), this.changed || i.find("opens-inner").length) {
                            var n = "left" === this.options.alignment ? "right" : "left";
                            i.find("li.is-dropdown-submenu-parent").add(i).removeClass("opens-inner opens-" + this.options.alignment).addClass("opens-" + n), this.changed = !1
                        }
                        this.$element.trigger("hide.zf.dropdownmenu", [i])
                    }
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$menuItems.off(".zf.dropdownmenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner"), r()(document.body).off(".zf.dropdownmenu"), u.a.Burn(this.$element, "dropdown")
                }
            }]), e
        }(d.a);
    p.defaults = {
        disableHover: !1,
        autoclose: !0,
        hoverDelay: 50,
        clickOpen: !1,
        closingTime: 500,
        alignment: "auto",
        closeOnClick: !0,
        closeOnClickInside: !0,
        verticalClass: "vertical",
        rightClass: "align-right",
        forceFollow: !0
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function a(t, e) {
        var i = e.indexOf(t);
        return i === e.length - 1 ? e[0] : e[i + 1]
    }
    i.d(e, "a", function() {
        return m
    });
    var r = i(7),
        l = i(2),
        u = i(1),
        c = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        h = ["left", "right", "top", "bottom"],
        d = ["top", "bottom", "center"],
        f = ["left", "right", "center"],
        p = {
            left: d,
            right: d,
            top: f,
            bottom: f
        },
        m = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), c(e, [{
                key: "_init",
                value: function() {
                    this.triedPositions = {}, this.position = "auto" === this.options.position ? this._getDefaultPosition() : this.options.position, this.alignment = "auto" === this.options.alignment ? this._getDefaultAlignment() : this.options.alignment
                }
            }, {
                key: "_getDefaultPosition",
                value: function() {
                    return "bottom"
                }
            }, {
                key: "_getDefaultAlignment",
                value: function() {
                    switch (this.position) {
                        case "bottom":
                        case "top":
                            return i.i(u.a)() ? "right" : "left";
                        case "left":
                        case "right":
                            return "bottom"
                    }
                }
            }, {
                key: "_reposition",
                value: function() {
                    this._alignmentsExhausted(this.position) ? (this.position = a(this.position, h), this.alignment = p[this.position][0]) : this._realign()
                }
            }, {
                key: "_realign",
                value: function() {
                    this._addTriedPosition(this.position, this.alignment), this.alignment = a(this.alignment, p[this.position])
                }
            }, {
                key: "_addTriedPosition",
                value: function(t, e) {
                    this.triedPositions[t] = this.triedPositions[t] || [], this.triedPositions[t].push(e)
                }
            }, {
                key: "_positionsExhausted",
                value: function() {
                    for (var t = !0, e = 0; e < h.length; e++) t = t && this._alignmentsExhausted(h[e]);
                    return t
                }
            }, {
                key: "_alignmentsExhausted",
                value: function(t) {
                    return this.triedPositions[t] && this.triedPositions[t].length == p[t].length
                }
            }, {
                key: "_getVOffset",
                value: function() {
                    return this.options.vOffset
                }
            }, {
                key: "_getHOffset",
                value: function() {
                    return this.options.hOffset
                }
            }, {
                key: "_setPosition",
                value: function(t, e, i) {
                    if ("false" === t.attr("aria-expanded")) return !1;
                    r.a.GetDimensions(e), r.a.GetDimensions(t);
                    if (e.offset(r.a.GetExplicitOffsets(e, t, this.position, this.alignment, this._getVOffset(), this._getHOffset())), !this.options.allowOverlap) {
                        for (var n = 1e8, s = {
                                position: this.position,
                                alignment: this.alignment
                            }; !this._positionsExhausted();) {
                            var o = r.a.OverlapArea(e, i, !1, !1, this.options.allowBottomOverlap);
                            if (0 === o) return;
                            o < n && (n = o, s = {
                                position: this.position,
                                alignment: this.alignment
                            }), this._reposition(), e.offset(r.a.GetExplicitOffsets(e, t, this.position, this.alignment, this._getVOffset(), this._getHOffset()))
                        }
                        this.position = s.position, this.alignment = s.alignment, e.offset(r.a.GetExplicitOffsets(e, t, this.position, this.alignment, this._getVOffset(), this._getHOffset()))
                    }
                }
            }]), e
        }(l.a);
    m.defaults = {
        position: "auto",
        alignment: "auto",
        allowOverlap: !1,
        allowBottomOverlap: !0,
        vOffset: 0,
        hOffset: 0
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return h
    });
    var a = i(0),
        r = i.n(a),
        l = i(1),
        u = i(2),
        c = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        h = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), c(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.className = "SmoothScroll", this._init()
                }
            }, {
                key: "_init",
                value: function() {
                    var t = this.$element[0].id || i.i(l.b)(6, "smooth-scroll");
                    this.$element.attr({
                        id: t
                    }), this._events()
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this,
                        i = function(i) {
                            if (!r()(this).is('a[href^="#"]')) return !1;
                            var n = this.getAttribute("href");
                            t._inTransition = !0, e.scrollToLoc(n, t.options, function() {
                                t._inTransition = !1
                            }), i.preventDefault()
                        };
                    this.$element.on("click.zf.smoothScroll", i), this.$element.on("click.zf.smoothScroll", 'a[href^="#"]', i)
                }
            }], [{
                key: "scrollToLoc",
                value: function(t) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.defaults,
                        n = arguments[2];
                    if (!r()(t).length) return !1;
                    var s = Math.round(r()(t).offset().top - i.threshold / 2 - i.offset);
                    r()("html, body").stop(!0).animate({
                        scrollTop: s
                    }, i.animationDuration, i.animationEasing, function() {
                        n && "function" == typeof n && n()
                    })
                }
            }]), e
        }(u.a);
    h.defaults = {
        animationDuration: 500,
        animationEasing: "linear",
        threshold: 50,
        offset: 0
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return d
    });
    var a = i(0),
        r = i.n(a),
        l = i(3),
        u = i(8),
        c = i(2),
        h = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        d = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), h(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.className = "Tabs", this._init(), l.a.register("Tabs", {
                        ENTER: "open",
                        SPACE: "open",
                        ARROW_RIGHT: "next",
                        ARROW_UP: "previous",
                        ARROW_DOWN: "next",
                        ARROW_LEFT: "previous"
                    })
                }
            }, {
                key: "_init",
                value: function() {
                    var t = this,
                        e = this;
                    if (this.$element.attr({
                            role: "tablist"
                        }), this.$tabTitles = this.$element.find("." + this.options.linkClass), this.$tabContent = r()('[data-tabs-content="' + this.$element[0].id + '"]'), this.$tabTitles.each(function() {
                            var t = r()(this),
                                i = t.find("a"),
                                n = t.hasClass("" + e.options.linkActiveClass),
                                s = i.attr("data-tabs-target") || i[0].hash.slice(1),
                                o = i[0].id ? i[0].id : s + "-label",
                                a = r()("#" + s);
                            t.attr({
                                role: "presentation"
                            }), i.attr({
                                role: "tab",
                                "aria-controls": s,
                                "aria-selected": n,
                                id: o,
                                tabindex: n ? "0" : "-1"
                            }), a.attr({
                                role: "tabpanel",
                                "aria-labelledby": o
                            }), n || a.attr("aria-hidden", "true"), n && e.options.autoFocus && r()(window).load(function() {
                                r()("html, body").animate({
                                    scrollTop: t.offset().top
                                }, e.options.deepLinkSmudgeDelay, function() {
                                    i.focus()
                                })
                            })
                        }), this.options.matchHeight) {
                        var n = this.$tabContent.find("img");
                        n.length ? i.i(u.a)(n, this._setHeight.bind(this)) : this._setHeight()
                    }
                    this._checkDeepLink = function() {
                        var e = window.location.hash;
                        if (e.length) {
                            var i = t.$element.find('[href$="' + e + '"]');
                            if (i.length) {
                                if (t.selectTab(r()(e), !0), t.options.deepLinkSmudge) {
                                    var n = t.$element.offset();
                                    r()("html, body").animate({
                                        scrollTop: n.top
                                    }, t.options.deepLinkSmudgeDelay)
                                }
                                t.$element.trigger("deeplink.zf.tabs", [i, r()(e)])
                            }
                        }
                    }, this.options.deepLink && this._checkDeepLink(), this._events()
                }
            }, {
                key: "_events",
                value: function() {
                    this._addKeyHandler(), this._addClickHandler(), this._setHeightMqHandler = null, this.options.matchHeight && (this._setHeightMqHandler = this._setHeight.bind(this), r()(window).on("changed.zf.mediaquery", this._setHeightMqHandler)), this.options.deepLink && r()(window).on("popstate", this._checkDeepLink)
                }
            }, {
                key: "_addClickHandler",
                value: function() {
                    var t = this;
                    this.$element.off("click.zf.tabs").on("click.zf.tabs", "." + this.options.linkClass, function(e) {
                        e.preventDefault(), e.stopPropagation(), t._handleTabChange(r()(this))
                    })
                }
            }, {
                key: "_addKeyHandler",
                value: function() {
                    var t = this;
                    this.$tabTitles.off("keydown.zf.tabs").on("keydown.zf.tabs", function(e) {
                        if (9 !== e.which) {
                            var i, n, s = r()(this),
                                o = s.parent("ul").children("li");
                            o.each(function(e) {
                                if (r()(this).is(s)) return void(t.options.wrapOnKeys ? (i = 0 === e ? o.last() : o.eq(e - 1), n = e === o.length - 1 ? o.first() : o.eq(e + 1)) : (i = o.eq(Math.max(0, e - 1)), n = o.eq(Math.min(e + 1, o.length - 1))))
                            }), l.a.handleKey(e, "Tabs", {
                                open: function() {
                                    s.find('[role="tab"]').focus(), t._handleTabChange(s)
                                },
                                previous: function() {
                                    i.find('[role="tab"]').focus(), t._handleTabChange(i)
                                },
                                next: function() {
                                    n.find('[role="tab"]').focus(), t._handleTabChange(n)
                                },
                                handled: function() {
                                    e.stopPropagation(), e.preventDefault()
                                }
                            })
                        }
                    })
                }
            }, {
                key: "_handleTabChange",
                value: function(t, e) {
                    if (t.hasClass("" + this.options.linkActiveClass)) return void(this.options.activeCollapse && (this._collapseTab(t), this.$element.trigger("collapse.zf.tabs", [t])));
                    var i = this.$element.find("." + this.options.linkClass + "." + this.options.linkActiveClass),
                        n = t.find('[role="tab"]'),
                        s = n.attr("data-tabs-target") || n[0].hash.slice(1),
                        o = this.$tabContent.find("#" + s);
                    if (this._collapseTab(i), this._openTab(t), this.options.deepLink && !e) {
                        var a = t.find("a").attr("href");
                        this.options.updateHistory ? history.pushState({}, "", a) : history.replaceState({}, "", a)
                    }
                    this.$element.trigger("change.zf.tabs", [t, o]), o.find("[data-mutate]").trigger("mutateme.zf.trigger")
                }
            }, {
                key: "_openTab",
                value: function(t) {
                    var e = t.find('[role="tab"]'),
                        i = e.attr("data-tabs-target") || e[0].hash.slice(1),
                        n = this.$tabContent.find("#" + i);
                    t.addClass("" + this.options.linkActiveClass), e.attr({
                        "aria-selected": "true",
                        tabindex: "0"
                    }), n.addClass("" + this.options.panelActiveClass).removeAttr("aria-hidden")
                }
            }, {
                key: "_collapseTab",
                value: function(t) {
                    var e = t.removeClass("" + this.options.linkActiveClass).find('[role="tab"]').attr({
                        "aria-selected": "false",
                        tabindex: -1
                    });
                    r()("#" + e.attr("aria-controls")).removeClass("" + this.options.panelActiveClass).attr({
                        "aria-hidden": "true"
                    })
                }
            }, {
                key: "selectTab",
                value: function(t, e) {
                    var i;
                    i = "object" == typeof t ? t[0].id : t, i.indexOf("#") < 0 && (i = "#" + i);
                    var n = this.$tabTitles.find('[href$="' + i + '"]').parent("." + this.options.linkClass);
                    this._handleTabChange(n, e)
                }
            }, {
                key: "_setHeight",
                value: function() {
                    var t = 0,
                        e = this;
                    this.$tabContent.find("." + this.options.panelClass).css("height", "").each(function() {
                        var i = r()(this),
                            n = i.hasClass("" + e.options.panelActiveClass);
                        n || i.css({
                            visibility: "hidden",
                            display: "block"
                        });
                        var s = this.getBoundingClientRect().height;
                        n || i.css({
                            visibility: "",
                            display: ""
                        }), t = s > t ? s : t
                    }).css("height", t + "px")
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$element.find("." + this.options.linkClass).off(".zf.tabs").hide().end().find("." + this.options.panelClass).hide(), this.options.matchHeight && null != this._setHeightMqHandler && r()(window).off("changed.zf.mediaquery", this._setHeightMqHandler), this.options.deepLink && r()(window).off("popstate", this._checkDeepLink)
                }
            }]), e
        }(c.a);
    d.defaults = {
        deepLink: !1,
        deepLinkSmudge: !1,
        deepLinkSmudgeDelay: 300,
        updateHistory: !1,
        autoFocus: !1,
        wrapOnKeys: !0,
        matchHeight: !1,
        activeCollapse: !1,
        linkClass: "tabs-title",
        linkActiveClass: "is-active",
        panelClass: "tabs-panel",
        panelActiveClass: "is-active"
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e, i) {
        var n, s, o = this,
            a = e.duration,
            r = Object.keys(t.data())[0] || "timer",
            l = -1;
        this.isPaused = !1, this.restart = function() {
            l = -1, clearTimeout(s), this.start()
        }, this.start = function() {
            this.isPaused = !1, clearTimeout(s), l = l <= 0 ? a : l, t.data("paused", !1), n = Date.now(), s = setTimeout(function() {
                e.infinite && o.restart(), i && "function" == typeof i && i()
            }, l), t.trigger("timerstart.zf." + r)
        }, this.pause = function() {
            this.isPaused = !0, clearTimeout(s), t.data("paused", !0);
            var e = Date.now();
            l -= e - n, t.trigger("timerpaused.zf." + r)
        }
    }
    i.d(e, "a", function() {
        return n
    });
    var s = i(0);
    i.n(s)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = i(0),
        s = i.n(n),
        o = i(21),
        a = i(1),
        r = i(7),
        l = i(8),
        u = i(3),
        c = i(4),
        h = i(6),
        d = i(9),
        f = i(18),
        p = i(10),
        m = i(5),
        g = i(20),
        v = i(11),
        b = i(12),
        y = i(13),
        w = i(22),
        _ = i(14),
        $ = i(23),
        k = i(24),
        C = i(25),
        z = i(26),
        O = i(27),
        T = i(29),
        E = i(30),
        P = i(31),
        A = i(32),
        F = i(16),
        x = i(33),
        D = i(17),
        S = i(34),
        R = i(35),
        H = i(28);
    o.a.addToJquery(s.a), o.a.rtl = a.a, o.a.GetYoDigits = a.b, o.a.transitionend = a.c, o.a.Box = r.a, o.a.onImagesLoaded = l.a, o.a.Keyboard = u.a, o.a.MediaQuery = c.a, o.a.Motion = h.a, o.a.Move = h.b, o.a.Nest = d.a, o.a.Timer = f.a, p.a.init(s.a), m.a.init(s.a, o.a), o.a.plugin(g.a, "Abide"), o.a.plugin(v.a, "Accordion"), o.a.plugin(b.a, "AccordionMenu"), o.a.plugin(y.a, "Drilldown"), o.a.plugin(w.a, "Dropdown"), o.a.plugin(_.a, "DropdownMenu"), o.a.plugin($.a, "Equalizer"), o.a.plugin(k.a, "Interchange"), o.a.plugin(C.a, "Magellan"), o.a.plugin(z.a, "OffCanvas"), o.a.plugin(O.a, "Orbit"), o.a.plugin(T.a, "ResponsiveMenu"), o.a.plugin(E.a, "ResponsiveToggle"), o.a.plugin(P.a, "Reveal"), o.a.plugin(A.a, "Slider"), o.a.plugin(F.a, "SmoothScroll"), o.a.plugin(x.a, "Sticky"), o.a.plugin(D.a, "Tabs"), o.a.plugin(S.a, "Toggler"), o.a.plugin(R.a, "Tooltip"), o.a.plugin(H.a, "ResponsiveAccordionTabs")
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return c
    });
    var a = i(0),
        r = i.n(a),
        l = i(2),
        u = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        c = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), u(e, [{
                key: "_setup",
                value: function(t) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    this.$element = t, this.options = r.a.extend(!0, {}, e.defaults, this.$element.data(), i), this.className = "Abide", this._init()
                }
            }, {
                key: "_init",
                value: function() {
                    this.$inputs = this.$element.find("input, textarea, select"), this._events()
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this;
                    this.$element.off(".abide").on("reset.zf.abide", function() {
                        t.resetForm()
                    }).on("submit.zf.abide", function() {
                        return t.validateForm()
                    }), "fieldChange" === this.options.validateOn && this.$inputs.off("change.zf.abide").on("change.zf.abide", function(e) {
                        t.validateInput(r()(e.target))
                    }), this.options.liveValidate && this.$inputs.off("input.zf.abide").on("input.zf.abide", function(e) {
                        t.validateInput(r()(e.target))
                    }), this.options.validateOnBlur && this.$inputs.off("blur.zf.abide").on("blur.zf.abide", function(e) {
                        t.validateInput(r()(e.target))
                    })
                }
            }, {
                key: "_reflow",
                value: function() {
                    this._init()
                }
            }, {
                key: "requiredCheck",
                value: function(t) {
                    if (!t.attr("required")) return !0;
                    var e = !0;
                    switch (t[0].type) {
                        case "checkbox":
                            e = t[0].checked;
                            break;
                        case "select":
                        case "select-one":
                        case "select-multiple":
                            var i = t.find("option:selected");
                            i.length && i.val() || (e = !1);
                            break;
                        default:
                            t.val() && t.val().length || (e = !1)
                    }
                    return e
                }
            }, {
                key: "findFormError",
                value: function(t) {
                    var e = t[0].id,
                        i = t.siblings(this.options.formErrorSelector);
                    return i.length || (i = t.parent().find(this.options.formErrorSelector)), i = i.add(this.$element.find('[data-form-error-for="' + e + '"]'))
                }
            }, {
                key: "findLabel",
                value: function(t) {
                    var e = t[0].id,
                        i = this.$element.find('label[for="' + e + '"]');
                    return i.length ? i : t.closest("label")
                }
            }, {
                key: "findRadioLabels",
                value: function(t) {
                    var e = this,
                        i = t.map(function(t, i) {
                            var n = i.id,
                                s = e.$element.find('label[for="' + n + '"]');
                            return s.length || (s = r()(i).closest("label")), s[0]
                        });
                    return r()(i)
                }
            }, {
                key: "addErrorClasses",
                value: function(t) {
                    var e = this.findLabel(t),
                        i = this.findFormError(t);
                    e.length && e.addClass(this.options.labelErrorClass), i.length && i.addClass(this.options.formErrorClass), t.addClass(this.options.inputErrorClass).attr("data-invalid", "")
                }
            }, {
                key: "removeRadioErrorClasses",
                value: function(t) {
                    var e = this.$element.find(':radio[name="' + t + '"]'),
                        i = this.findRadioLabels(e),
                        n = this.findFormError(e);
                    i.length && i.removeClass(this.options.labelErrorClass), n.length && n.removeClass(this.options.formErrorClass), e.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")
                }
            }, {
                key: "removeErrorClasses",
                value: function(t) {
                    if ("radio" == t[0].type) return this.removeRadioErrorClasses(t.attr("name"));
                    var e = this.findLabel(t),
                        i = this.findFormError(t);
                    e.length && e.removeClass(this.options.labelErrorClass), i.length && i.removeClass(this.options.formErrorClass), t.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")
                }
            }, {
                key: "validateInput",
                value: function(t) {
                    var e = this.requiredCheck(t),
                        i = !1,
                        n = !0,
                        s = t.attr("data-validator"),
                        o = !0;
                    if (t.is("[data-abide-ignore]") || t.is('[type="hidden"]') || t.is("[disabled]")) return !0;
                    switch (t[0].type) {
                        case "radio":
                            i = this.validateRadio(t.attr("name"));
                            break;
                        case "checkbox":
                            i = e;
                            break;
                        case "select":
                        case "select-one":
                        case "select-multiple":
                            i = e;
                            break;
                        default:
                            i = this.validateText(t)
                    }
                    s && (n = this.matchValidation(t, s, t.attr("required"))), t.attr("data-equalto") && (o = this.options.validators.equalTo(t));
                    var a = -1 === [e, i, n, o].indexOf(!1),
                        l = (a ? "valid" : "invalid") + ".zf.abide";
                    if (a) {
                        var u = this.$element.find('[data-equalto="' + t.attr("id") + '"]');
                        if (u.length) {
                            var c = this;
                            u.each(function() {
                                r()(this).val() && c.validateInput(r()(this))
                            })
                        }
                    }
                    return this[a ? "removeErrorClasses" : "addErrorClasses"](t), t.trigger(l, [t]), a
                }
            }, {
                key: "validateForm",
                value: function() {
                    var t = [],
                        e = this;
                    this.$inputs.each(function() {
                        t.push(e.validateInput(r()(this)))
                    });
                    var i = -1 === t.indexOf(!1);
                    return this.$element.find("[data-abide-error]").css("display", i ? "none" : "block"), this.$element.trigger((i ? "formvalid" : "forminvalid") + ".zf.abide", [this.$element]), i
                }
            }, {
                key: "validateText",
                value: function(t, e) {
                    e = e || t.attr("pattern") || t.attr("type");
                    var i = t.val(),
                        n = !1;
                    return i.length ? n = this.options.patterns.hasOwnProperty(e) ? this.options.patterns[e].test(i) : e === t.attr("type") || new RegExp(e).test(i) : t.prop("required") || (n = !0), n
                }
            }, {
                key: "validateRadio",
                value: function(t) {
                    var e = this.$element.find(':radio[name="' + t + '"]'),
                        i = !1,
                        n = !1;
                    return e.each(function(t, e) {
                        r()(e).attr("required") && (n = !0)
                    }), n || (i = !0), i || e.each(function(t, e) {
                        r()(e).prop("checked") && (i = !0)
                    }), i
                }
            }, {
                key: "matchValidation",
                value: function(t, e, i) {
                    var n = this;
                    return i = !!i, -1 === e.split(" ").map(function(e) {
                        return n.options.validators[e](t, i, t.parent())
                    }).indexOf(!1)
                }
            }, {
                key: "resetForm",
                value: function() {
                    var t = this.$element,
                        e = this.options;
                    r()("." + e.labelErrorClass, t).not("small").removeClass(e.labelErrorClass), r()("." + e.inputErrorClass, t).not("small").removeClass(e.inputErrorClass), r()(e.formErrorSelector + "." + e.formErrorClass).removeClass(e.formErrorClass), t.find("[data-abide-error]").css("display", "none"), r()(":input", t).not(":button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]").val("").removeAttr("data-invalid"), r()(":input:radio", t).not("[data-abide-ignore]").prop("checked", !1).removeAttr("data-invalid"), r()(":input:checkbox", t).not("[data-abide-ignore]").prop("checked", !1).removeAttr("data-invalid"), t.trigger("formreset.zf.abide", [t])
                }
            }, {
                key: "_destroy",
                value: function() {
                    var t = this;
                    this.$element.off(".abide").find("[data-abide-error]").css("display", "none"), this.$inputs.off(".abide").each(function() {
                        t.removeErrorClasses(r()(this))
                    })
                }
            }]), e
        }(l.a);
    c.defaults = {
        validateOn: "fieldChange",
        labelErrorClass: "is-invalid-label",
        inputErrorClass: "is-invalid-input",
        formErrorSelector: ".form-error",
        formErrorClass: "is-visible",
        liveValidate: !1,
        validateOnBlur: !1,
        patterns: {
            alpha: /^[a-zA-Z]+$/,
            alpha_numeric: /^[a-zA-Z0-9]+$/,
            integer: /^[-+]?\d+$/,
            number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
            card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(?:222[1-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
            cvv: /^([0-9]){3,4}$/,
            email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
            url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
            domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
            datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
            date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
            time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
            dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
            month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
            day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
            color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
            website: {
                test: function(t) {
                    return c.defaults.patterns.domain.test(t) || c.defaults.patterns.url.test(t)
                }
            }
        },
        validators: {
            equalTo: function(t, e, i) {
                return r()("#" + t.attr("data-equalto")).val() === t.val()
            }
        }
    }
}, function(t, e, i) {
    "use strict";

    function n(t) {
        if (void 0 === Function.prototype.name) {
            var e = /function\s([^(]{1,})\(/,
                i = e.exec(t.toString());
            return i && i.length > 1 ? i[1].trim() : ""
        }
        return void 0 === t.prototype ? t.constructor.name : t.prototype.constructor.name
    }

    function s(t) {
        return "true" === t || "false" !== t && (isNaN(1 * t) ? t : parseFloat(t))
    }

    function o(t) {
        return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }
    i.d(e, "a", function() {
        return c
    });
    var a = i(0),
        r = i.n(a),
        l = i(1),
        u = i(4),
        c = {
            version: "6.4.3",
            _plugins: {},
            _uuids: [],
            plugin: function(t, e) {
                var i = e || n(t),
                    s = o(i);
                this._plugins[s] = this[i] = t
            },
            registerPlugin: function(t, e) {
                var s = e ? o(e) : n(t.constructor).toLowerCase();
                t.uuid = i.i(l.b)(6, s), t.$element.attr("data-" + s) || t.$element.attr("data-" + s, t.uuid), t.$element.data("zfPlugin") || t.$element.data("zfPlugin", t), t.$element.trigger("init.zf." + s), this._uuids.push(t.uuid)
            },
            unregisterPlugin: function(t) {
                var e = o(n(t.$element.data("zfPlugin").constructor));
                this._uuids.splice(this._uuids.indexOf(t.uuid), 1), t.$element.removeAttr("data-" + e).removeData("zfPlugin").trigger("destroyed.zf." + e);
                for (var i in t) t[i] = null
            },
            reInit: function(t) {
                var e = t instanceof r.a;
                try {
                    if (e) t.each(function() {
                        r()(this).data("zfPlugin")._init()
                    });
                    else {
                        var i = typeof t,
                            n = this;
                        ({
                            object: function(t) {
                                t.forEach(function(t) {
                                    t = o(t), r()("[data-" + t + "]").foundation("_init")
                                })
                            },
                            string: function() {
                                t = o(t), r()("[data-" + t + "]").foundation("_init")
                            },
                            undefined: function() {
                                this.object(Object.keys(n._plugins))
                            }
                        })[i](t)
                    }
                } catch (t) {
                    console.error(t)
                } finally {
                    return t
                }
            },
            reflow: function(t, e) {
                void 0 === e ? e = Object.keys(this._plugins) : "string" == typeof e && (e = [e]);
                var i = this;
                r.a.each(e, function(e, n) {
                    var o = i._plugins[n];
                    r()(t).find("[data-" + n + "]").addBack("[data-" + n + "]").each(function() {
                        var t = r()(this),
                            e = {};
                        if (t.data("zfPlugin")) return void console.warn("Tried to initialize " + n + " on an element that already has a Foundation plugin.");
                        t.attr("data-options") && t.attr("data-options").split(";").forEach(function(t, i) {
                            var n = t.split(":").map(function(t) {
                                return t.trim()
                            });
                            n[0] && (e[n[0]] = s(n[1]))
                        });
                        try {
                            t.data("zfPlugin", new o(r()(this), e))
                        } catch (t) {
                            console.error(t)
                        } finally {
                            return
                        }
                    })
                })
            },
            getFnName: n,
            addToJquery: function(t) {
                var e = function(e) {
                    var i = typeof e,
                        s = t(".no-js");
                    if (s.length && s.removeClass("no-js"), "undefined" === i) u.a._init(), c.reflow(this);
                    else {
                        if ("string" !== i) throw new TypeError("We're sorry, " + i + " is not a valid parameter. You must use a string representing the method you wish to invoke.");
                        var o = Array.prototype.slice.call(arguments, 1),
                            a = this.data("zfPlugin");
                        if (void 0 === a || void 0 === a[e]) throw new ReferenceError("We're sorry, '" + e + "' is not an available method for " + (a ? n(a) : "this element") + ".");
                        1 === this.length ? a[e].apply(a, o) : this.each(function(i, n) {
                            a[e].apply(t(n).data("zfPlugin"), o)
                        })
                    }
                    return this
                };
                return t.fn.foundation = e, t
            }
        };
    c.util = {
            throttle: function(t, e) {
                var i = null;
                return function() {
                    var n = this,
                        s = arguments;
                    null === i && (i = setTimeout(function() {
                        t.apply(n, s), i = null
                    }, e))
                }
            }
        }, window.Foundation = c,
        function() {
            Date.now && window.Date.now || (window.Date.now = Date.now = function() {
                return (new Date).getTime()
            });
            for (var t = ["webkit", "moz"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) {
                var i = t[e];
                window.requestAnimationFrame = window[i + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
            }
            if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
                var n = 0;
                window.requestAnimationFrame = function(t) {
                    var e = Date.now(),
                        i = Math.max(n + 16, e);
                    return setTimeout(function() {
                        t(n = i)
                    }, i - e)
                }, window.cancelAnimationFrame = clearTimeout
            }
            window.performance && window.performance.now || (window.performance = {
                start: Date.now(),
                now: function() {
                    return Date.now() - this.start
                }
            })
        }(), Function.prototype.bind || (Function.prototype.bind = function(t) {
            if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var e = Array.prototype.slice.call(arguments, 1),
                i = this,
                n = function() {},
                s = function() {
                    return i.apply(this instanceof n ? this : t, e.concat(Array.prototype.slice.call(arguments)))
                };
            return this.prototype && (n.prototype = this.prototype), s.prototype = new n, s
        })
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return p
    });
    var a = i(0),
        r = i.n(a),
        l = i(3),
        u = i(1),
        c = i(15),
        h = i(5),
        d = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        f = function t(e, i, n) {
            null === e && (e = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(e, i);
            if (void 0 === s) {
                var o = Object.getPrototypeOf(e);
                return null === o ? void 0 : t(o, i, n)
            }
            if ("value" in s) return s.value;
            var a = s.get;
            if (void 0 !== a) return a.call(n)
        },
        p = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), d(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.className = "Dropdown", h.a.init(r.a), this._init(), l.a.register("Dropdown", {
                        ENTER: "open",
                        SPACE: "open",
                        ESCAPE: "close"
                    })
                }
            }, {
                key: "_init",
                value: function() {
                    var t = this.$element.attr("id");
                    this.$anchors = r()('[data-toggle="' + t + '"]').length ? r()('[data-toggle="' + t + '"]') : r()('[data-open="' + t + '"]'), this.$anchors.attr({
                        "aria-controls": t,
                        "data-is-focus": !1,
                        "data-yeti-box": t,
                        "aria-haspopup": !0,
                        "aria-expanded": !1
                    }), this._setCurrentAnchor(this.$anchors.first()), this.options.parentClass ? this.$parent = this.$element.parents("." + this.options.parentClass) : this.$parent = null, this.$element.attr({
                        "aria-hidden": "true",
                        "data-yeti-box": t,
                        "data-resize": t,
                        "aria-labelledby": this.$currentAnchor.id || i.i(u.b)(6, "dd-anchor")
                    }), f(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_init", this).call(this), this._events()
                }
            }, {
                key: "_getDefaultPosition",
                value: function() {
                    var t = this.$element[0].className.match(/(top|left|right|bottom)/g);
                    return t ? t[0] : "bottom"
                }
            }, {
                key: "_getDefaultAlignment",
                value: function() {
                    var t = /float-(\S+)/.exec(this.$currentAnchor.className);
                    return t ? t[1] : f(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_getDefaultAlignment", this).call(this)
                }
            }, {
                key: "_setPosition",
                value: function() {
                    f(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_setPosition", this).call(this, this.$currentAnchor, this.$element, this.$parent)
                }
            }, {
                key: "_setCurrentAnchor",
                value: function(t) {
                    this.$currentAnchor = r()(t)
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this;
                    this.$element.on({
                        "open.zf.trigger": this.open.bind(this),
                        "close.zf.trigger": this.close.bind(this),
                        "toggle.zf.trigger": this.toggle.bind(this),
                        "resizeme.zf.trigger": this._setPosition.bind(this)
                    }), this.$anchors.off("click.zf.trigger").on("click.zf.trigger", function() {
                        t._setCurrentAnchor(this)
                    }), this.options.hover && (this.$anchors.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function() {
                        t._setCurrentAnchor(this);
                        var e = r()("body").data();
                        void 0 !== e.whatinput && "mouse" !== e.whatinput || (clearTimeout(t.timeout), t.timeout = setTimeout(function() {
                            t.open(), t.$anchors.data("hover", !0)
                        }, t.options.hoverDelay))
                    }).on("mouseleave.zf.dropdown", function() {
                        clearTimeout(t.timeout), t.timeout = setTimeout(function() {
                            t.close(), t.$anchors.data("hover", !1)
                        }, t.options.hoverDelay)
                    }), this.options.hoverPane && this.$element.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function() {
                        clearTimeout(t.timeout)
                    }).on("mouseleave.zf.dropdown", function() {
                        clearTimeout(t.timeout), t.timeout = setTimeout(function() {
                            t.close(), t.$anchors.data("hover", !1)
                        }, t.options.hoverDelay)
                    })), this.$anchors.add(this.$element).on("keydown.zf.dropdown", function(e) {
                        var i = r()(this);
                        l.a.findFocusable(t.$element);
                        l.a.handleKey(e, "Dropdown", {
                            open: function() {
                                i.is(t.$anchors) && (t.open(), t.$element.attr("tabindex", -1).focus(), e.preventDefault())
                            },
                            close: function() {
                                t.close(), t.$anchors.focus()
                            }
                        })
                    })
                }
            }, {
                key: "_addBodyHandler",
                value: function() {
                    var t = r()(document.body).not(this.$element),
                        e = this;
                    t.off("click.zf.dropdown").on("click.zf.dropdown", function(i) {
                        e.$anchors.is(i.target) || e.$anchors.find(i.target).length || e.$element.find(i.target).length || (e.close(), t.off("click.zf.dropdown"))
                    })
                }
            }, {
                key: "open",
                value: function() {
                    if (this.$element.trigger("closeme.zf.dropdown", this.$element.attr("id")), this.$anchors.addClass("hover").attr({
                            "aria-expanded": !0
                        }), this.$element.addClass("is-opening"), this._setPosition(), this.$element.removeClass("is-opening").addClass("is-open").attr({
                            "aria-hidden": !1
                        }), this.options.autoFocus) {
                        var t = l.a.findFocusable(this.$element);
                        t.length && t.eq(0).focus()
                    }
                    this.options.closeOnClick && this._addBodyHandler(), this.options.trapFocus && l.a.trapFocus(this.$element), this.$element.trigger("show.zf.dropdown", [this.$element])
                }
            }, {
                key: "close",
                value: function() {
                    if (!this.$element.hasClass("is-open")) return !1;
                    this.$element.removeClass("is-open").attr({
                        "aria-hidden": !0
                    }), this.$anchors.removeClass("hover").attr("aria-expanded", !1), this.$element.trigger("hide.zf.dropdown", [this.$element]), this.options.trapFocus && l.a.releaseFocus(this.$element)
                }
            }, {
                key: "toggle",
                value: function() {
                    if (this.$element.hasClass("is-open")) {
                        if (this.$anchors.data("hover")) return;
                        this.close()
                    } else this.open()
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$element.off(".zf.trigger").hide(), this.$anchors.off(".zf.dropdown"), r()(document.body).off("click.zf.dropdown")
                }
            }]), e
        }(c.a);
    p.defaults = {
        parentClass: null,
        hoverDelay: 250,
        hover: !1,
        hoverPane: !1,
        vOffset: 0,
        hOffset: 0,
        positionClass: "",
        position: "auto",
        alignment: "auto",
        allowOverlap: !1,
        allowBottomOverlap: !0,
        trapFocus: !1,
        autoFocus: !1,
        closeOnClick: !1
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return f
    });
    var a = i(0),
        r = i.n(a),
        l = i(4),
        u = i(8),
        c = i(1),
        h = i(2),
        d = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        f = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), d(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.className = "Equalizer", this._init()
                }
            }, {
                key: "_init",
                value: function() {
                    var t = this.$element.attr("data-equalizer") || "",
                        e = this.$element.find('[data-equalizer-watch="' + t + '"]');
                    l.a._init(), this.$watched = e.length ? e : this.$element.find("[data-equalizer-watch]"), this.$element.attr("data-resize", t || i.i(c.b)(6, "eq")), this.$element.attr("data-mutate", t || i.i(c.b)(6, "eq")), this.hasNested = this.$element.find("[data-equalizer]").length > 0, this.isNested = this.$element.parentsUntil(document.body, "[data-equalizer]").length > 0, this.isOn = !1, this._bindHandler = {
                        onResizeMeBound: this._onResizeMe.bind(this),
                        onPostEqualizedBound: this._onPostEqualized.bind(this)
                    };
                    var n, s = this.$element.find("img");
                    this.options.equalizeOn ? (n = this._checkMQ(), r()(window).on("changed.zf.mediaquery", this._checkMQ.bind(this))) : this._events(), (void 0 !== n && !1 === n || void 0 === n) && (s.length ? i.i(u.a)(s, this._reflow.bind(this)) : this._reflow())
                }
            }, {
                key: "_pauseEvents",
                value: function() {
                    this.isOn = !1, this.$element.off({
                        ".zf.equalizer": this._bindHandler.onPostEqualizedBound,
                        "resizeme.zf.trigger": this._bindHandler.onResizeMeBound,
                        "mutateme.zf.trigger": this._bindHandler.onResizeMeBound
                    })
                }
            }, {
                key: "_onResizeMe",
                value: function(t) {
                    this._reflow()
                }
            }, {
                key: "_onPostEqualized",
                value: function(t) {
                    t.target !== this.$element[0] && this._reflow()
                }
            }, {
                key: "_events",
                value: function() {
                    this._pauseEvents(), this.hasNested ? this.$element.on("postequalized.zf.equalizer", this._bindHandler.onPostEqualizedBound) : (this.$element.on("resizeme.zf.trigger", this._bindHandler.onResizeMeBound), this.$element.on("mutateme.zf.trigger", this._bindHandler.onResizeMeBound)), this.isOn = !0
                }
            }, {
                key: "_checkMQ",
                value: function() {
                    var t = !l.a.is(this.options.equalizeOn);
                    return t ? this.isOn && (this._pauseEvents(), this.$watched.css("height", "auto")) : this.isOn || this._events(), t
                }
            }, {
                key: "_killswitch",
                value: function() {}
            }, {
                key: "_reflow",
                value: function() {
                    if (!this.options.equalizeOnStack && this._isStacked()) return this.$watched.css("height", "auto"), !1;
                    this.options.equalizeByRow ? this.getHeightsByRow(this.applyHeightByRow.bind(this)) : this.getHeights(this.applyHeight.bind(this))
                }
            }, {
                key: "_isStacked",
                value: function() {
                    return !this.$watched[0] || !this.$watched[1] || this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top
                }
            }, {
                key: "getHeights",
                value: function(t) {
                    for (var e = [], i = 0, n = this.$watched.length; i < n; i++) this.$watched[i].style.height = "auto", e.push(this.$watched[i].offsetHeight);
                    t(e)
                }
            }, {
                key: "getHeightsByRow",
                value: function(t) {
                    var e = this.$watched.length ? this.$watched.first().offset().top : 0,
                        i = [],
                        n = 0;
                    i[n] = [];
                    for (var s = 0, o = this.$watched.length; s < o; s++) {
                        this.$watched[s].style.height = "auto";
                        var a = r()(this.$watched[s]).offset().top;
                        a != e && (n++, i[n] = [], e = a), i[n].push([this.$watched[s], this.$watched[s].offsetHeight])
                    }
                    for (var l = 0, u = i.length; l < u; l++) {
                        var c = r()(i[l]).map(function() {
                                return this[1]
                            }).get(),
                            h = Math.max.apply(null, c);
                        i[l].push(h)
                    }
                    t(i)
                }
            }, {
                key: "applyHeight",
                value: function(t) {
                    var e = Math.max.apply(null, t);
                    this.$element.trigger("preequalized.zf.equalizer"), this.$watched.css("height", e), this.$element.trigger("postequalized.zf.equalizer")
                }
            }, {
                key: "applyHeightByRow",
                value: function(t) {
                    this.$element.trigger("preequalized.zf.equalizer");
                    for (var e = 0, i = t.length; e < i; e++) {
                        var n = t[e].length,
                            s = t[e][n - 1];
                        if (n <= 2) r()(t[e][0][0]).css({
                            height: "auto"
                        });
                        else {
                            this.$element.trigger("preequalizedrow.zf.equalizer");
                            for (var o = 0, a = n - 1; o < a; o++) r()(t[e][o][0]).css({
                                height: s
                            });
                            this.$element.trigger("postequalizedrow.zf.equalizer")
                        }
                    }
                    this.$element.trigger("postequalized.zf.equalizer")
                }
            }, {
                key: "_destroy",
                value: function() {
                    this._pauseEvents(), this.$watched.css("height", "auto")
                }
            }]), e
        }(h.a);
    f.defaults = {
        equalizeOnStack: !1,
        equalizeByRow: !1,
        equalizeOn: ""
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return d
    });
    var a = i(0),
        r = i.n(a),
        l = i(4),
        u = i(2),
        c = i(1),
        h = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        d = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), h(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, i), this.rules = [], this.currentPath = "", this.className = "Interchange", this._init(), this._events()
                }
            }, {
                key: "_init",
                value: function() {
                    l.a._init();
                    var t = this.$element[0].id || i.i(c.b)(6, "interchange");
                    this.$element.attr({
                        "data-resize": t,
                        id: t
                    }), this._addBreakpoints(), this._generateRules(), this._reflow()
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this;
                    this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", function() {
                        return t._reflow()
                    })
                }
            }, {
                key: "_reflow",
                value: function() {
                    var t;
                    for (var e in this.rules)
                        if (this.rules.hasOwnProperty(e)) {
                            var i = this.rules[e];
                            window.matchMedia(i.query).matches && (t = i)
                        }
                    t && this.replace(t.path)
                }
            }, {
                key: "_addBreakpoints",
                value: function() {
                    for (var t in l.a.queries)
                        if (l.a.queries.hasOwnProperty(t)) {
                            var i = l.a.queries[t];
                            e.SPECIAL_QUERIES[i.name] = i.value
                        }
                }
            }, {
                key: "_generateRules",
                value: function(t) {
                    var i, n = [];
                    i = this.options.rules ? this.options.rules : this.$element.data("interchange"), i = "string" == typeof i ? i.match(/\[.*?\]/g) : i;
                    for (var s in i)
                        if (i.hasOwnProperty(s)) {
                            var o = i[s].slice(1, -1).split(", "),
                                a = o.slice(0, -1).join(""),
                                r = o[o.length - 1];
                            e.SPECIAL_QUERIES[r] && (r = e.SPECIAL_QUERIES[r]), n.push({
                                path: a,
                                query: r
                            })
                        }
                    this.rules = n
                }
            }, {
                key: "replace",
                value: function(t) {
                    if (this.currentPath !== t) {
                        var e = this,
                            i = "replaced.zf.interchange";
                        "IMG" === this.$element[0].nodeName ? this.$element.attr("src", t).on("load", function() {
                            e.currentPath = t
                        }).trigger(i) : t.match(/\.(gif|jpg|jpeg|png|svg|tiff)([?#].*)?/i) ? (t = t.replace(/\(/g, "%28").replace(/\)/g, "%29"), this.$element.css({
                            "background-image": "url(" + t + ")"
                        }).trigger(i)) : r.a.get(t, function(n) {
                            e.$element.html(n).trigger(i), r()(n).foundation(), e.currentPath = t
                        })
                    }
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$element.off("resizeme.zf.trigger")
                }
            }]), e
        }(u.a);
    d.defaults = {
        rules: null
    }, d.SPECIAL_QUERIES = {
        landscape: "screen and (orientation: landscape)",
        portrait: "screen and (orientation: portrait)",
        retina: "only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)"
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return d
    });
    var a = i(0),
        r = i.n(a),
        l = i(1),
        u = i(2),
        c = i(16),
        h = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        d = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), h(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.className = "Magellan", this._init(), this.calcPoints()
                }
            }, {
                key: "_init",
                value: function() {
                    var t = this.$element[0].id || i.i(l.b)(6, "magellan");
                    this.$targets = r()("[data-magellan-target]"), this.$links = this.$element.find("a"), this.$element.attr({
                        "data-resize": t,
                        "data-scroll": t,
                        id: t
                    }), this.$active = r()(), this.scrollPos = parseInt(window.pageYOffset, 10), this._events()
                }
            }, {
                key: "calcPoints",
                value: function() {
                    var t = this,
                        e = document.body,
                        i = document.documentElement;
                    this.points = [], this.winHeight = Math.round(Math.max(window.innerHeight, i.clientHeight)), this.docHeight = Math.round(Math.max(e.scrollHeight, e.offsetHeight, i.clientHeight, i.scrollHeight, i.offsetHeight)), this.$targets.each(function() {
                        var e = r()(this),
                            i = Math.round(e.offset().top - t.options.threshold);
                        e.targetPoint = i, t.points.push(i)
                    })
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this;
                    r()("html, body"), t.options.animationDuration, t.options.animationEasing;
                    r()(window).one("load", function() {
                        t.options.deepLinking && location.hash && t.scrollToLoc(location.hash), t.calcPoints(), t._updateActive()
                    }), this.$element.on({
                        "resizeme.zf.trigger": this.reflow.bind(this),
                        "scrollme.zf.trigger": this._updateActive.bind(this)
                    }).on("click.zf.magellan", 'a[href^="#"]', function(e) {
                        e.preventDefault();
                        var i = this.getAttribute("href");
                        t.scrollToLoc(i)
                    }), this._deepLinkScroll = function(e) {
                        t.options.deepLinking && t.scrollToLoc(window.location.hash)
                    }, r()(window).on("popstate", this._deepLinkScroll)
                }
            }, {
                key: "scrollToLoc",
                value: function(t) {
                    this._inTransition = !0;
                    var e = this,
                        i = {
                            animationEasing: this.options.animationEasing,
                            animationDuration: this.options.animationDuration,
                            threshold: this.options.threshold,
                            offset: this.options.offset
                        };
                    c.a.scrollToLoc(t, i, function() {
                        e._inTransition = !1, e._updateActive()
                    })
                }
            }, {
                key: "reflow",
                value: function() {
                    this.calcPoints(), this._updateActive()
                }
            }, {
                key: "_updateActive",
                value: function() {
                    if (!this._inTransition) {
                        var t, e = parseInt(window.pageYOffset, 10);
                        if (e + this.winHeight === this.docHeight) t = this.points.length - 1;
                        else if (e < this.points[0]) t = void 0;
                        else {
                            var i = this.scrollPos < e,
                                n = this,
                                s = this.points.filter(function(t, s) {
                                    return i ? t - n.options.offset <= e : t - n.options.offset - n.options.threshold <= e
                                });
                            t = s.length ? s.length - 1 : 0
                        }
                        if (this.$active.removeClass(this.options.activeClass), this.$active = this.$links.filter('[href="#' + this.$targets.eq(t).data("magellan-target") + '"]').addClass(this.options.activeClass), this.options.deepLinking) {
                            var o = "";
                            void 0 != t && (o = this.$active[0].getAttribute("href")), o !== window.location.hash && (window.history.pushState ? window.history.pushState(null, null, o) : window.location.hash = o)
                        }
                        this.scrollPos = e, this.$element.trigger("update.zf.magellan", [this.$active])
                    }
                }
            }, {
                key: "_destroy",
                value: function() {
                    if (this.$element.off(".zf.trigger .zf.magellan").find("." + this.options.activeClass).removeClass(this.options.activeClass), this.options.deepLinking) {
                        var t = this.$active[0].getAttribute("href");
                        window.location.hash.replace(t, "")
                    }
                    r()(window).off("popstate", this._deepLinkScroll)
                }
            }]), e
        }(u.a);
    d.defaults = {
        animationDuration: 500,
        animationEasing: "linear",
        threshold: 50,
        activeClass: "is-active",
        deepLinking: !1,
        offset: 0
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return p
    });
    var a = i(0),
        r = i.n(a),
        l = i(3),
        u = i(4),
        c = i(1),
        h = i(2),
        d = i(5),
        f = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        p = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), f(e, [{
                key: "_setup",
                value: function(t, i) {
                    var n = this;
                    this.className = "OffCanvas", this.$element = t, this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.contentClasses = {
                        base: [],
                        reveal: []
                    }, this.$lastTrigger = r()(), this.$triggers = r()(), this.position = "left", this.$content = r()(), this.nested = !!this.options.nested, r()(["push", "overlap"]).each(function(t, e) {
                        n.contentClasses.base.push("has-transition-" + e)
                    }), r()(["left", "right", "top", "bottom"]).each(function(t, e) {
                        n.contentClasses.base.push("has-position-" + e), n.contentClasses.reveal.push("has-reveal-" + e)
                    }), d.a.init(r.a), u.a._init(), this._init(), this._events(), l.a.register("OffCanvas", {
                        ESCAPE: "close"
                    })
                }
            }, {
                key: "_init",
                value: function() {
                    var t = this.$element.attr("id");
                    if (this.$element.attr("aria-hidden", "true"), this.options.contentId ? this.$content = r()("#" + this.options.contentId) : this.$element.siblings("[data-off-canvas-content]").length ? this.$content = this.$element.siblings("[data-off-canvas-content]").first() : this.$content = this.$element.closest("[data-off-canvas-content]").first(), this.options.contentId ? this.options.contentId && null === this.options.nested && console.warn("Remember to use the nested option if using the content ID option!") : this.nested = 0 === this.$element.siblings("[data-off-canvas-content]").length, !0 === this.nested && (this.options.transition = "overlap", this.$element.removeClass("is-transition-push")), this.$element.addClass("is-transition-" + this.options.transition + " is-closed"), this.$triggers = r()(document).find('[data-open="' + t + '"], [data-close="' + t + '"], [data-toggle="' + t + '"]').attr("aria-expanded", "false").attr("aria-controls", t), this.position = this.$element.is(".position-left, .position-top, .position-right, .position-bottom") ? this.$element.attr("class").match(/position\-(left|top|right|bottom)/)[1] : this.position, !0 === this.options.contentOverlay) {
                        var e = document.createElement("div"),
                            i = "fixed" === r()(this.$element).css("position") ? "is-overlay-fixed" : "is-overlay-absolute";
                        e.setAttribute("class", "js-off-canvas-overlay " + i), this.$overlay = r()(e), "is-overlay-fixed" === i ? r()(this.$overlay).insertAfter(this.$element) : this.$content.append(this.$overlay)
                    }
                    this.options.isRevealed = this.options.isRevealed || new RegExp(this.options.revealClass, "g").test(this.$element[0].className), !0 === this.options.isRevealed && (this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split("-")[2], this._setMQChecker()), this.options.transitionTime && this.$element.css("transition-duration", this.options.transitionTime), this._removeContentClasses()
                }
            }, {
                key: "_events",
                value: function() {
                    if (this.$element.off(".zf.trigger .zf.offcanvas").on({
                            "open.zf.trigger": this.open.bind(this),
                            "close.zf.trigger": this.close.bind(this),
                            "toggle.zf.trigger": this.toggle.bind(this),
                            "keydown.zf.offcanvas": this._handleKeyboard.bind(this)
                        }), !0 === this.options.closeOnClick) {
                        (this.options.contentOverlay ? this.$overlay : this.$content).on({
                            "click.zf.offcanvas": this.close.bind(this)
                        })
                    }
                }
            }, {
                key: "_setMQChecker",
                value: function() {
                    var t = this;
                    r()(window).on("changed.zf.mediaquery", function() {
                        u.a.atLeast(t.options.revealOn) ? t.reveal(!0) : t.reveal(!1)
                    }).one("load.zf.offcanvas", function() {
                        u.a.atLeast(t.options.revealOn) && t.reveal(!0)
                    })
                }
            }, {
                key: "_removeContentClasses",
                value: function(t) {
                    "boolean" != typeof t ? this.$content.removeClass(this.contentClasses.base.join(" ")) : !1 === t && this.$content.removeClass("has-reveal-" + this.position)
                }
            }, {
                key: "_addContentClasses",
                value: function(t) {
                    this._removeContentClasses(t), "boolean" != typeof t ? this.$content.addClass("has-transition-" + this.options.transition + " has-position-" + this.position) : !0 === t && this.$content.addClass("has-reveal-" + this.position)
                }
            }, {
                key: "reveal",
                value: function(t) {
                    t ? (this.close(), this.isRevealed = !0, this.$element.attr("aria-hidden", "false"), this.$element.off("open.zf.trigger toggle.zf.trigger"), this.$element.removeClass("is-closed")) : (this.isRevealed = !1, this.$element.attr("aria-hidden", "true"), this.$element.off("open.zf.trigger toggle.zf.trigger").on({
                        "open.zf.trigger": this.open.bind(this),
                        "toggle.zf.trigger": this.toggle.bind(this)
                    }), this.$element.addClass("is-closed")), this._addContentClasses(t)
                }
            }, {
                key: "_stopScrolling",
                value: function(t) {
                    return !1
                }
            }, {
                key: "_recordScrollable",
                value: function(t) {
                    var e = this;
                    e.scrollHeight !== e.clientHeight && (0 === e.scrollTop && (e.scrollTop = 1), e.scrollTop === e.scrollHeight - e.clientHeight && (e.scrollTop = e.scrollHeight - e.clientHeight - 1)), e.allowUp = e.scrollTop > 0, e.allowDown = e.scrollTop < e.scrollHeight - e.clientHeight, e.lastY = t.originalEvent.pageY
                }
            }, {
                key: "_stopScrollPropagation",
                value: function(t) {
                    var e = this,
                        i = t.pageY < e.lastY,
                        n = !i;
                    e.lastY = t.pageY, i && e.allowUp || n && e.allowDown ? t.stopPropagation() : t.preventDefault()
                }
            }, {
                key: "open",
                value: function(t, e) {
                    if (!this.$element.hasClass("is-open") && !this.isRevealed) {
                        var n = this;
                        e && (this.$lastTrigger = e), "top" === this.options.forceTo ? window.scrollTo(0, 0) : "bottom" === this.options.forceTo && window.scrollTo(0, document.body.scrollHeight), this.options.transitionTime && "overlap" !== this.options.transition ? this.$element.siblings("[data-off-canvas-content]").css("transition-duration", this.options.transitionTime) : this.$element.siblings("[data-off-canvas-content]").css("transition-duration", ""), this.$element.addClass("is-open").removeClass("is-closed"), this.$triggers.attr("aria-expanded", "true"), this.$element.attr("aria-hidden", "false").trigger("opened.zf.offcanvas"), this.$content.addClass("is-open-" + this.position), !1 === this.options.contentScroll && (r()("body").addClass("is-off-canvas-open").on("touchmove", this._stopScrolling), this.$element.on("touchstart", this._recordScrollable), this.$element.on("touchmove", this._stopScrollPropagation)), !0 === this.options.contentOverlay && this.$overlay.addClass("is-visible"), !0 === this.options.closeOnClick && !0 === this.options.contentOverlay && this.$overlay.addClass("is-closable"), !0 === this.options.autoFocus && this.$element.one(i.i(c.c)(this.$element), function() {
                            if (n.$element.hasClass("is-open")) {
                                var t = n.$element.find("[data-autofocus]");
                                t.length ? t.eq(0).focus() : n.$element.find("a, button").eq(0).focus()
                            }
                        }), !0 === this.options.trapFocus && (this.$content.attr("tabindex", "-1"), l.a.trapFocus(this.$element)), this._addContentClasses()
                    }
                }
            }, {
                key: "close",
                value: function(t) {
                    if (this.$element.hasClass("is-open") && !this.isRevealed) {
                        var e = this;
                        this.$element.removeClass("is-open"), this.$element.attr("aria-hidden", "true").trigger("closed.zf.offcanvas"), this.$content.removeClass("is-open-left is-open-top is-open-right is-open-bottom"), !1 === this.options.contentScroll && (r()("body").removeClass("is-off-canvas-open").off("touchmove", this._stopScrolling), this.$element.off("touchstart", this._recordScrollable), this.$element.off("touchmove", this._stopScrollPropagation)), !0 === this.options.contentOverlay && this.$overlay.removeClass("is-visible"), !0 === this.options.closeOnClick && !0 === this.options.contentOverlay && this.$overlay.removeClass("is-closable"), this.$triggers.attr("aria-expanded", "false"), !0 === this.options.trapFocus && (this.$content.removeAttr("tabindex"), l.a.releaseFocus(this.$element)), this.$element.one(i.i(c.c)(this.$element), function(t) {
                            e.$element.addClass("is-closed"), e._removeContentClasses()
                        })
                    }
                }
            }, {
                key: "toggle",
                value: function(t, e) {
                    this.$element.hasClass("is-open") ? this.close(t, e) : this.open(t, e)
                }
            }, {
                key: "_handleKeyboard",
                value: function(t) {
                    var e = this;
                    l.a.handleKey(t, "OffCanvas", {
                        close: function() {
                            return e.close(), e.$lastTrigger.focus(), !0
                        },
                        handled: function() {
                            t.stopPropagation(), t.preventDefault()
                        }
                    })
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.close(), this.$element.off(".zf.trigger .zf.offcanvas"), this.$overlay.off(".zf.offcanvas")
                }
            }]), e
        }(h.a);
    p.defaults = {
        closeOnClick: !0,
        contentOverlay: !0,
        contentId: null,
        nested: null,
        contentScroll: !0,
        transitionTime: null,
        transition: "push",
        forceTo: null,
        isRevealed: !1,
        revealOn: null,
        autoFocus: !0,
        revealClass: "reveal-for-",
        trapFocus: !1
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return g
    });
    var a = i(0),
        r = i.n(a),
        l = i(3),
        u = i(6),
        c = i(18),
        h = i(8),
        d = i(1),
        f = i(2),
        p = i(10),
        m = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        g = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), m(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.className = "Orbit", p.a.init(r.a), this._init(), l.a.register("Orbit", {
                        ltr: {
                            ARROW_RIGHT: "next",
                            ARROW_LEFT: "previous"
                        },
                        rtl: {
                            ARROW_LEFT: "next",
                            ARROW_RIGHT: "previous"
                        }
                    })
                }
            }, {
                key: "_init",
                value: function() {
                    this._reset(), this.$wrapper = this.$element.find("." + this.options.containerClass), this.$slides = this.$element.find("." + this.options.slideClass);
                    var t = this.$element.find("img"),
                        e = this.$slides.filter(".is-active"),
                        n = this.$element[0].id || i.i(d.b)(6, "orbit");
                    this.$element.attr({
                        "data-resize": n,
                        id: n
                    }), e.length || this.$slides.eq(0).addClass("is-active"), this.options.useMUI || this.$slides.addClass("no-motionui"), t.length ? i.i(h.a)(t, this._prepareForOrbit.bind(this)) : this._prepareForOrbit(), this.options.bullets && this._loadBullets(), this._events(), this.options.autoPlay && this.$slides.length > 1 && this.geoSync(), this.options.accessible && this.$wrapper.attr("tabindex", 0)
                }
            }, {
                key: "_loadBullets",
                value: function() {
                    this.$bullets = this.$element.find("." + this.options.boxOfBullets).find("button")
                }
            }, {
                key: "geoSync",
                value: function() {
                    var t = this;
                    this.timer = new c.a(this.$element, {
                        duration: this.options.timerDelay,
                        infinite: !1
                    }, function() {
                        t.changeSlide(!0)
                    }), this.timer.start()
                }
            }, {
                key: "_prepareForOrbit",
                value: function() {
                    this._setWrapperHeight()
                }
            }, {
                key: "_setWrapperHeight",
                value: function(t) {
                    var e, i = 0,
                        n = 0,
                        s = this;
                    this.$slides.each(function() {
                        e = this.getBoundingClientRect().height, r()(this).attr("data-slide", n), /mui/g.test(r()(this)[0].className) || s.$slides.filter(".is-active")[0] === s.$slides.eq(n)[0] || r()(this).css({
                            position: "relative",
                            display: "none"
                        }), i = e > i ? e : i, n++
                    }), n === this.$slides.length && (this.$wrapper.css({
                        height: i
                    }), t && t(i))
                }
            }, {
                key: "_setSlideHeight",
                value: function(t) {
                    this.$slides.each(function() {
                        r()(this).css("max-height", t)
                    })
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this;
                    if (this.$element.off(".resizeme.zf.trigger").on({
                            "resizeme.zf.trigger": this._prepareForOrbit.bind(this)
                        }), this.$slides.length > 1) {
                        if (this.options.swipe && this.$slides.off("swipeleft.zf.orbit swiperight.zf.orbit").on("swipeleft.zf.orbit", function(e) {
                                e.preventDefault(), t.changeSlide(!0)
                            }).on("swiperight.zf.orbit", function(e) {
                                e.preventDefault(), t.changeSlide(!1)
                            }), this.options.autoPlay && (this.$slides.on("click.zf.orbit", function() {
                                t.$element.data("clickedOn", !t.$element.data("clickedOn")), t.timer[t.$element.data("clickedOn") ? "pause" : "start"]()
                            }), this.options.pauseOnHover && this.$element.on("mouseenter.zf.orbit", function() {
                                t.timer.pause()
                            }).on("mouseleave.zf.orbit", function() {
                                t.$element.data("clickedOn") || t.timer.start()
                            })), this.options.navButtons) {
                            this.$element.find("." + this.options.nextClass + ", ." + this.options.prevClass).attr("tabindex", 0).on("click.zf.orbit touchend.zf.orbit", function(e) {
                                e.preventDefault(), t.changeSlide(r()(this).hasClass(t.options.nextClass))
                            })
                        }
                        this.options.bullets && this.$bullets.on("click.zf.orbit touchend.zf.orbit", function() {
                            if (/is-active/g.test(this.className)) return !1;
                            var e = r()(this).data("slide"),
                                i = e > t.$slides.filter(".is-active").data("slide"),
                                n = t.$slides.eq(e);
                            t.changeSlide(i, n, e)
                        }), this.options.accessible && this.$wrapper.add(this.$bullets).on("keydown.zf.orbit", function(e) {
                            l.a.handleKey(e, "Orbit", {
                                next: function() {
                                    t.changeSlide(!0)
                                },
                                previous: function() {
                                    t.changeSlide(!1)
                                },
                                handled: function() {
                                    r()(e.target).is(t.$bullets) && t.$bullets.filter(".is-active").focus()
                                }
                            })
                        })
                    }
                }
            }, {
                key: "_reset",
                value: function() {
                    void 0 !== this.$slides && this.$slides.length > 1 && (this.$element.off(".zf.orbit").find("*").off(".zf.orbit"), this.options.autoPlay && this.timer.restart(), this.$slides.each(function(t) {
                        r()(t).removeClass("is-active is-active is-in").removeAttr("aria-live").hide()
                    }), this.$slides.first().addClass("is-active").show(), this.$element.trigger("slidechange.zf.orbit", [this.$slides.first()]), this.options.bullets && this._updateBullets(0))
                }
            }, {
                key: "changeSlide",
                value: function(t, e, i) {
                    if (this.$slides) {
                        var n = this.$slides.filter(".is-active").eq(0);
                        if (/mui/g.test(n[0].className)) return !1;
                        var s, o = this.$slides.first(),
                            a = this.$slides.last(),
                            r = t ? "Right" : "Left",
                            l = t ? "Left" : "Right",
                            c = this;
                        s = e || (t ? this.options.infiniteWrap ? n.next("." + this.options.slideClass).length ? n.next("." + this.options.slideClass) : o : n.next("." + this.options.slideClass) : this.options.infiniteWrap ? n.prev("." + this.options.slideClass).length ? n.prev("." + this.options.slideClass) : a : n.prev("." + this.options.slideClass)), s.length && (this.$element.trigger("beforeslidechange.zf.orbit", [n, s]), this.options.bullets && (i = i || this.$slides.index(s), this._updateBullets(i)), this.options.useMUI && !this.$element.is(":hidden") ? (u.a.animateIn(s.addClass("is-active").css({
                            position: "absolute",
                            top: 0
                        }), this.options["animInFrom" + r], function() {
                            s.css({
                                position: "relative",
                                display: "block"
                            }).attr("aria-live", "polite")
                        }), u.a.animateOut(n.removeClass("is-active"), this.options["animOutTo" + l], function() {
                            n.removeAttr("aria-live"), c.options.autoPlay && !c.timer.isPaused && c.timer.restart()
                        })) : (n.removeClass("is-active is-in").removeAttr("aria-live").hide(), s.addClass("is-active is-in").attr("aria-live", "polite").show(), this.options.autoPlay && !this.timer.isPaused && this.timer.restart()), this.$element.trigger("slidechange.zf.orbit", [s]))
                    }
                }
            }, {
                key: "_updateBullets",
                value: function(t) {
                    var e = this.$element.find("." + this.options.boxOfBullets).find(".is-active").removeClass("is-active").blur(),
                        i = e.find("span:last").detach();
                    this.$bullets.eq(t).addClass("is-active").append(i)
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$element.off(".zf.orbit").find("*").off(".zf.orbit").end().hide()
                }
            }]), e
        }(f.a);
    g.defaults = {
        bullets: !0,
        navButtons: !0,
        animInFromRight: "slide-in-right",
        animOutToRight: "slide-out-right",
        animInFromLeft: "slide-in-left",
        animOutToLeft: "slide-out-left",
        autoPlay: !0,
        timerDelay: 5e3,
        infiniteWrap: !0,
        swipe: !0,
        pauseOnHover: !0,
        accessible: !0,
        containerClass: "orbit-container",
        slideClass: "orbit-slide",
        boxOfBullets: "orbit-bullets",
        nextClass: "orbit-next",
        prevClass: "orbit-previous",
        useMUI: !0
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return m
    });
    var a = i(0),
        r = i.n(a),
        l = i(4),
        u = i(1),
        c = i(2),
        h = i(11),
        d = i(17),
        f = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        p = {
            tabs: {
                cssClass: "tabs",
                plugin: d.a
            },
            accordion: {
                cssClass: "accordion",
                plugin: h.a
            }
        },
        m = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), f(e, [{
                key: "_setup",
                value: function(t, e) {
                    this.$element = r()(t), this.options = r.a.extend({}, this.$element.data(), e), this.rules = this.$element.data("responsive-accordion-tabs"), this.currentMq = null, this.currentPlugin = null, this.className = "ResponsiveAccordionTabs", this.$element.attr("id") || this.$element.attr("id", i.i(u.b)(6, "responsiveaccordiontabs")), this._init(), this._events()
                }
            }, {
                key: "_init",
                value: function() {
                    if (l.a._init(), "string" == typeof this.rules) {
                        for (var t = {}, e = this.rules.split(" "), i = 0; i < e.length; i++) {
                            var n = e[i].split("-"),
                                s = n.length > 1 ? n[0] : "small",
                                o = n.length > 1 ? n[1] : n[0];
                            null !== p[o] && (t[s] = p[o])
                        }
                        this.rules = t
                    }
                    this._getAllOptions(), r.a.isEmptyObject(this.rules) || this._checkMediaQueries()
                }
            }, {
                key: "_getAllOptions",
                value: function() {
                    var t = this;
                    t.allOptions = {};
                    for (var e in p)
                        if (p.hasOwnProperty(e)) {
                            var i = p[e];
                            try {
                                var n = r()("<ul></ul>"),
                                    s = new i.plugin(n, t.options);
                                for (var o in s.options)
                                    if (s.options.hasOwnProperty(o) && "zfPlugin" !== o) {
                                        var a = s.options[o];
                                        t.allOptions[o] = a
                                    }
                                s.destroy()
                            } catch (t) {}
                        }
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this;
                    r()(window).on("changed.zf.mediaquery", function() {
                        t._checkMediaQueries()
                    })
                }
            }, {
                key: "_checkMediaQueries",
                value: function() {
                    var t, e = this;
                    r.a.each(this.rules, function(e) {
                        l.a.atLeast(e) && (t = e)
                    }), t && (this.currentPlugin instanceof this.rules[t].plugin || (r.a.each(p, function(t, i) {
                        e.$element.removeClass(i.cssClass)
                    }), this.$element.addClass(this.rules[t].cssClass), this.currentPlugin && (!this.currentPlugin.$element.data("zfPlugin") && this.storezfData && this.currentPlugin.$element.data("zfPlugin", this.storezfData), this.currentPlugin.destroy()), this._handleMarkup(this.rules[t].cssClass), this.currentPlugin = new this.rules[t].plugin(this.$element, {}), this.storezfData = this.currentPlugin.$element.data("zfPlugin")))
                }
            }, {
                key: "_handleMarkup",
                value: function(t) {
                    var e = this,
                        n = "accordion",
                        s = r()("[data-tabs-content=" + this.$element.attr("id") + "]");
                    if (s.length && (n = "tabs"), n !== t) {
                        var o = e.allOptions.linkClass ? e.allOptions.linkClass : "tabs-title",
                            a = e.allOptions.panelClass ? e.allOptions.panelClass : "tabs-panel";
                        this.$element.removeAttr("role");
                        var l = this.$element.children("." + o + ",[data-accordion-item]").removeClass(o).removeClass("accordion-item").removeAttr("data-accordion-item"),
                            c = l.children("a").removeClass("accordion-title");
                        if ("tabs" === n ? (s = s.children("." + a).removeClass(a).removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby"), s.children("a").removeAttr("role").removeAttr("aria-controls").removeAttr("aria-selected")) : s = l.children("[data-tab-content]").removeClass("accordion-content"), s.css({
                                display: "",
                                visibility: ""
                            }), l.css({
                                display: "",
                                visibility: ""
                            }), "accordion" === t) s.each(function(t, i) {
                            r()(i).appendTo(l.get(t)).addClass("accordion-content").attr("data-tab-content", "").removeClass("is-active").css({
                                height: ""
                            }), r()("[data-tabs-content=" + e.$element.attr("id") + "]").after('<div id="tabs-placeholder-' + e.$element.attr("id") + '"></div>').detach(), l.addClass("accordion-item").attr("data-accordion-item", ""), c.addClass("accordion-title")
                        });
                        else if ("tabs" === t) {
                            var h = r()("[data-tabs-content=" + e.$element.attr("id") + "]"),
                                d = r()("#tabs-placeholder-" + e.$element.attr("id"));
                            d.length ? (h = r()('<div class="tabs-content"></div>').insertAfter(d).attr("data-tabs-content", e.$element.attr("id")), d.remove()) : h = r()('<div class="tabs-content"></div>').insertAfter(e.$element).attr("data-tabs-content", e.$element.attr("id")), s.each(function(t, e) {
                                var n = r()(e).appendTo(h).addClass(a),
                                    s = c.get(t).hash.slice(1),
                                    o = r()(e).attr("id") || i.i(u.b)(6, "accordion");
                                s !== o && ("" !== s ? r()(e).attr("id", s) : (s = o, r()(e).attr("id", s), r()(c.get(t)).attr("href", r()(c.get(t)).attr("href").replace("#", "") + "#" + s))), r()(l.get(t)).hasClass("is-active") && n.addClass("is-active")
                            }), l.addClass(o)
                        }
                    }
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.currentPlugin && this.currentPlugin.destroy(), r()(window).off(".zf.ResponsiveAccordionTabs")
                }
            }]), e
        }(c.a);
    m.defaults = {}
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return g
    });
    var a = i(0),
        r = i.n(a),
        l = i(4),
        u = i(1),
        c = i(2),
        h = i(14),
        d = i(13),
        f = i(12),
        p = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        m = {
            dropdown: {
                cssClass: "dropdown",
                plugin: h.a
            },
            drilldown: {
                cssClass: "drilldown",
                plugin: d.a
            },
            accordion: {
                cssClass: "accordion-menu",
                plugin: f.a
            }
        },
        g = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), p(e, [{
                key: "_setup",
                value: function(t, e) {
                    this.$element = r()(t), this.rules = this.$element.data("responsive-menu"), this.currentMq = null, this.currentPlugin = null, this.className = "ResponsiveMenu", this._init(), this._events()
                }
            }, {
                key: "_init",
                value: function() {
                    if (l.a._init(), "string" == typeof this.rules) {
                        for (var t = {}, e = this.rules.split(" "), n = 0; n < e.length; n++) {
                            var s = e[n].split("-"),
                                o = s.length > 1 ? s[0] : "small",
                                a = s.length > 1 ? s[1] : s[0];
                            null !== m[a] && (t[o] = m[a])
                        }
                        this.rules = t
                    }
                    r.a.isEmptyObject(this.rules) || this._checkMediaQueries(), this.$element.attr("data-mutate", this.$element.attr("data-mutate") || i.i(u.b)(6, "responsive-menu"))
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this;
                    r()(window).on("changed.zf.mediaquery", function() {
                        t._checkMediaQueries()
                    })
                }
            }, {
                key: "_checkMediaQueries",
                value: function() {
                    var t, e = this;
                    r.a.each(this.rules, function(e) {
                        l.a.atLeast(e) && (t = e)
                    }), t && (this.currentPlugin instanceof this.rules[t].plugin || (r.a.each(m, function(t, i) {
                        e.$element.removeClass(i.cssClass)
                    }), this.$element.addClass(this.rules[t].cssClass), this.currentPlugin && this.currentPlugin.destroy(), this.currentPlugin = new this.rules[t].plugin(this.$element, {})))
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.currentPlugin.destroy(), r()(window).off(".zf.ResponsiveMenu")
                }
            }]), e
        }(c.a);
    g.defaults = {}
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return d
    });
    var a = i(0),
        r = i.n(a),
        l = i(4),
        u = i(6),
        c = i(2),
        h = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        d = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), h(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = r()(t), this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.className = "ResponsiveToggle", this._init(), this._events()
                }
            }, {
                key: "_init",
                value: function() {
                    l.a._init();
                    var t = this.$element.data("responsive-toggle");
                    if (t || console.error("Your tab bar needs an ID of a Menu as the value of data-tab-bar."), this.$targetMenu = r()("#" + t), this.$toggler = this.$element.find("[data-toggle]").filter(function() {
                            var e = r()(this).data("toggle");
                            return e === t || "" === e
                        }), this.options = r.a.extend({}, this.options, this.$targetMenu.data()), this.options.animate) {
                        var e = this.options.animate.split(" ");
                        this.animationIn = e[0], this.animationOut = e[1] || null
                    }
                    this._update()
                }
            }, {
                key: "_events",
                value: function() {
                    this._updateMqHandler = this._update.bind(this), r()(window).on("changed.zf.mediaquery", this._updateMqHandler), this.$toggler.on("click.zf.responsiveToggle", this.toggleMenu.bind(this))
                }
            }, {
                key: "_update",
                value: function() {
                    l.a.atLeast(this.options.hideFor) ? (this.$element.hide(), this.$targetMenu.show()) : (this.$element.show(), this.$targetMenu.hide())
                }
            }, {
                key: "toggleMenu",
                value: function() {
                    var t = this;
                    l.a.atLeast(this.options.hideFor) || (this.options.animate ? this.$targetMenu.is(":hidden") ? u.a.animateIn(this.$targetMenu, this.animationIn, function() {
                        t.$element.trigger("toggled.zf.responsiveToggle"), t.$targetMenu.find("[data-mutate]").triggerHandler("mutateme.zf.trigger")
                    }) : u.a.animateOut(this.$targetMenu, this.animationOut, function() {
                        t.$element.trigger("toggled.zf.responsiveToggle")
                    }) : (this.$targetMenu.toggle(0), this.$targetMenu.find("[data-mutate]").trigger("mutateme.zf.trigger"), this.$element.trigger("toggled.zf.responsiveToggle")))
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$element.off(".zf.responsiveToggle"), this.$toggler.off(".zf.responsiveToggle"), r()(window).off("changed.zf.mediaquery", this._updateMqHandler)
                }
            }]), e
        }(c.a);
    d.defaults = {
        hideFor: "medium",
        animate: !1
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function a() {
        return /iP(ad|hone|od).*OS/.test(window.navigator.userAgent)
    }

    function r() {
        return /Android/.test(window.navigator.userAgent)
    }

    function l() {
        return a() || r()
    }
    i.d(e, "a", function() {
        return v
    });
    var u = i(0),
        c = i.n(u),
        h = i(3),
        d = i(4),
        f = i(6),
        p = i(2),
        m = i(5),
        g = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        v = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), g(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = c.a.extend({}, e.defaults, this.$element.data(), i), this.className = "Reveal", this._init(), m.a.init(c.a), h.a.register("Reveal", {
                        ESCAPE: "close"
                    })
                }
            }, {
                key: "_init",
                value: function() {
                    d.a._init(), this.id = this.$element.attr("id"), this.isActive = !1, this.cached = {
                        mq: d.a.current
                    }, this.isMobile = l(), this.$anchor = c()('[data-open="' + this.id + '"]').length ? c()('[data-open="' + this.id + '"]') : c()('[data-toggle="' + this.id + '"]'), this.$anchor.attr({
                        "aria-controls": this.id,
                        "aria-haspopup": !0,
                        tabindex: 0
                    }), (this.options.fullScreen || this.$element.hasClass("full")) && (this.options.fullScreen = !0, this.options.overlay = !1), this.options.overlay && !this.$overlay && (this.$overlay = this._makeOverlay(this.id)), this.$element.attr({
                        role: "dialog",
                        "aria-hidden": !0,
                        "data-yeti-box": this.id,
                        "data-resize": this.id
                    }), this.$overlay ? this.$element.detach().appendTo(this.$overlay) : (this.$element.detach().appendTo(c()(this.options.appendTo)), this.$element.addClass("without-overlay")), this._events(), this.options.deepLink && window.location.hash === "#" + this.id && c()(window).one("load.zf.reveal", this.open.bind(this))
                }
            }, {
                key: "_makeOverlay",
                value: function() {
                    var t = "";
                    return this.options.additionalOverlayClasses && (t = " " + this.options.additionalOverlayClasses), c()("<div></div>").addClass("reveal-overlay" + t).appendTo(this.options.appendTo)
                }
            }, {
                key: "_updatePosition",
                value: function() {
                    var t, e, i = this.$element.outerWidth(),
                        n = c()(window).width(),
                        s = this.$element.outerHeight(),
                        o = c()(window).height();
                    t = "auto" === this.options.hOffset ? parseInt((n - i) / 2, 10) : parseInt(this.options.hOffset, 10), e = "auto" === this.options.vOffset ? s > o ? parseInt(Math.min(100, o / 10), 10) : parseInt((o - s) / 4, 10) : parseInt(this.options.vOffset, 10), this.$element.css({
                        top: e + "px"
                    }), this.$overlay && "auto" === this.options.hOffset || (this.$element.css({
                        left: t + "px"
                    }), this.$element.css({
                        margin: "0px"
                    }))
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this,
                        e = this;
                    this.$element.on({
                        "open.zf.trigger": this.open.bind(this),
                        "close.zf.trigger": function(i, n) {
                            if (i.target === e.$element[0] || c()(i.target).parents("[data-closable]")[0] === n) return t.close.apply(t)
                        },
                        "toggle.zf.trigger": this.toggle.bind(this),
                        "resizeme.zf.trigger": function() {
                            e._updatePosition()
                        }
                    }), this.options.closeOnClick && this.options.overlay && this.$overlay.off(".zf.reveal").on("click.zf.reveal", function(t) {
                        t.target !== e.$element[0] && !c.a.contains(e.$element[0], t.target) && c.a.contains(document, t.target) && e.close()
                    }), this.options.deepLink && c()(window).on("popstate.zf.reveal:" + this.id, this._handleState.bind(this))
                }
            }, {
                key: "_handleState",
                value: function(t) {
                    window.location.hash !== "#" + this.id || this.isActive ? this.close() : this.open()
                }
            }, {
                key: "open",
                value: function() {
                    function t() {
                        n.isMobile ? (n.originalScrollPos || (n.originalScrollPos = window.pageYOffset), c()("html, body").addClass("is-reveal-open")) : c()("body").addClass("is-reveal-open")
                    }
                    var e = this;
                    if (this.options.deepLink) {
                        var i = "#" + this.id;
                        window.history.pushState ? this.options.updateHistory ? window.history.pushState({}, "", i) : window.history.replaceState({}, "", i) : window.location.hash = i
                    }
                    this.isActive = !0, this.$element.css({
                        visibility: "hidden"
                    }).show().scrollTop(0), this.options.overlay && this.$overlay.css({
                        visibility: "hidden"
                    }).show(), this._updatePosition(), this.$element.hide().css({
                        visibility: ""
                    }), this.$overlay && (this.$overlay.css({
                        visibility: ""
                    }).hide(), this.$element.hasClass("fast") ? this.$overlay.addClass("fast") : this.$element.hasClass("slow") && this.$overlay.addClass("slow")), this.options.multipleOpened || this.$element.trigger("closeme.zf.reveal", this.id);
                    var n = this;
                    if (this.options.animationIn) {
                        var s = function() {
                            n.$element.attr({
                                "aria-hidden": !1,
                                tabindex: -1
                            }).focus(), t(), h.a.trapFocus(n.$element)
                        };
                        this.options.overlay && f.a.animateIn(this.$overlay, "fade-in"), f.a.animateIn(this.$element, this.options.animationIn, function() {
                            e.$element && (e.focusableElements = h.a.findFocusable(e.$element), s())
                        })
                    } else this.options.overlay && this.$overlay.show(0), this.$element.show(this.options.showDelay);
                    this.$element.attr({
                        "aria-hidden": !1,
                        tabindex: -1
                    }).focus(), h.a.trapFocus(this.$element), t(), this._extraHandlers(), this.$element.trigger("open.zf.reveal")
                }
            }, {
                key: "_extraHandlers",
                value: function() {
                    var t = this;
                    this.$element && (this.focusableElements = h.a.findFocusable(this.$element), this.options.overlay || !this.options.closeOnClick || this.options.fullScreen || c()("body").on("click.zf.reveal", function(e) {
                        e.target !== t.$element[0] && !c.a.contains(t.$element[0], e.target) && c.a.contains(document, e.target) && t.close()
                    }), this.options.closeOnEsc && c()(window).on("keydown.zf.reveal", function(e) {
                        h.a.handleKey(e, "Reveal", {
                            close: function() {
                                t.options.closeOnEsc && t.close()
                            }
                        })
                    }))
                }
            }, {
                key: "close",
                value: function() {
                    function t() {
                        e.isMobile ? (0 === c()(".reveal:visible").length && c()("html, body").removeClass("is-reveal-open"), e.originalScrollPos && (c()("body").scrollTop(e.originalScrollPos), e.originalScrollPos = null)) : 0 === c()(".reveal:visible").length && c()("body").removeClass("is-reveal-open"), h.a.releaseFocus(e.$element), e.$element.attr("aria-hidden", !0), e.$element.trigger("closed.zf.reveal")
                    }
                    if (!this.isActive || !this.$element.is(":visible")) return !1;
                    var e = this;
                    this.options.animationOut ? (this.options.overlay && f.a.animateOut(this.$overlay, "fade-out"), f.a.animateOut(this.$element, this.options.animationOut, t)) : (this.$element.hide(this.options.hideDelay), this.options.overlay ? this.$overlay.hide(0, t) : t()), this.options.closeOnEsc && c()(window).off("keydown.zf.reveal"), !this.options.overlay && this.options.closeOnClick && c()("body").off("click.zf.reveal"), this.$element.off("keydown.zf.reveal"), this.options.resetOnClose && this.$element.html(this.$element.html()), this.isActive = !1, e.options.deepLink && (window.history.replaceState ? window.history.replaceState("", document.title, window.location.href.replace("#" + this.id, "")) : window.location.hash = ""), this.$anchor.focus()
                }
            }, {
                key: "toggle",
                value: function() {
                    this.isActive ? this.close() : this.open()
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.options.overlay && (this.$element.appendTo(c()(this.options.appendTo)), this.$overlay.hide().off().remove()), this.$element.hide().off(), this.$anchor.off(".zf"), c()(window).off(".zf.reveal:" + this.id)
                }
            }]), e
        }(p.a);
    v.defaults = {
        animationIn: "",
        animationOut: "",
        showDelay: 0,
        hideDelay: 0,
        closeOnClick: !0,
        closeOnEsc: !0,
        multipleOpened: !1,
        vOffset: "auto",
        hOffset: "auto",
        fullScreen: !1,
        btmOffsetPct: 10,
        overlay: !0,
        resetOnClose: !1,
        deepLink: !1,
        updateHistory: !1,
        appendTo: "body",
        additionalOverlayClasses: ""
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function a(t, e) {
        return t / e
    }

    function r(t, e, i, n) {
        return Math.abs(t.position()[e] + t[n]() / 2 - i)
    }

    function l(t, e) {
        return Math.log(e) / Math.log(t)
    }
    i.d(e, "a", function() {
        return b
    });
    var u = i(0),
        c = i.n(u),
        h = i(3),
        d = i(6),
        f = i(1),
        p = i(2),
        m = i(10),
        g = i(5),
        v = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        b = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), v(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = c.a.extend({}, e.defaults, this.$element.data(), i), this.className = "Slider", m.a.init(c.a), g.a.init(c.a), this._init(), h.a.register("Slider", {
                        ltr: {
                            ARROW_RIGHT: "increase",
                            ARROW_UP: "increase",
                            ARROW_DOWN: "decrease",
                            ARROW_LEFT: "decrease",
                            SHIFT_ARROW_RIGHT: "increase_fast",
                            SHIFT_ARROW_UP: "increase_fast",
                            SHIFT_ARROW_DOWN: "decrease_fast",
                            SHIFT_ARROW_LEFT: "decrease_fast",
                            HOME: "min",
                            END: "max"
                        },
                        rtl: {
                            ARROW_LEFT: "increase",
                            ARROW_RIGHT: "decrease",
                            SHIFT_ARROW_LEFT: "increase_fast",
                            SHIFT_ARROW_RIGHT: "decrease_fast"
                        }
                    })
                }
            }, {
                key: "_init",
                value: function() {
                    this.inputs = this.$element.find("input"), this.handles = this.$element.find("[data-slider-handle]"), this.$handle = this.handles.eq(0), this.$input = this.inputs.length ? this.inputs.eq(0) : c()("#" + this.$handle.attr("aria-controls")), this.$fill = this.$element.find("[data-slider-fill]").css(this.options.vertical ? "height" : "width", 0);
                    (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) && (this.options.disabled = !0, this.$element.addClass(this.options.disabledClass)), this.inputs.length || (this.inputs = c()().add(this.$input), this.options.binding = !0), this._setInitAttr(0), this.handles[1] && (this.options.doubleSided = !0, this.$handle2 = this.handles.eq(1), this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : c()("#" + this.$handle2.attr("aria-controls")), this.inputs[1] || (this.inputs = this.inputs.add(this.$input2)), !0, this._setInitAttr(1)), this.setHandles(), this._events()
                }
            }, {
                key: "setHandles",
                value: function() {
                    var t = this;
                    this.handles[1] ? this._setHandlePos(this.$handle, this.inputs.eq(0).val(), !0, function() {
                        t._setHandlePos(t.$handle2, t.inputs.eq(1).val(), !0)
                    }) : this._setHandlePos(this.$handle, this.inputs.eq(0).val(), !0)
                }
            }, {
                key: "_reflow",
                value: function() {
                    this.setHandles()
                }
            }, {
                key: "_pctOfBar",
                value: function(t) {
                    var e = a(t - this.options.start, this.options.end - this.options.start);
                    switch (this.options.positionValueFunction) {
                        case "pow":
                            e = this._logTransform(e);
                            break;
                        case "log":
                            e = this._powTransform(e)
                    }
                    return e.toFixed(2)
                }
            }, {
                key: "_value",
                value: function(t) {
                    switch (this.options.positionValueFunction) {
                        case "pow":
                            t = this._powTransform(t);
                            break;
                        case "log":
                            t = this._logTransform(t)
                    }
                    return (this.options.end - this.options.start) * t + this.options.start
                }
            }, {
                key: "_logTransform",
                value: function(t) {
                    return l(this.options.nonLinearBase, t * (this.options.nonLinearBase - 1) + 1)
                }
            }, {
                key: "_powTransform",
                value: function(t) {
                    return (Math.pow(this.options.nonLinearBase, t) - 1) / (this.options.nonLinearBase - 1)
                }
            }, {
                key: "_setHandlePos",
                value: function(t, e, n, s) {
                    if (!this.$element.hasClass(this.options.disabledClass)) {
                        e = parseFloat(e), e < this.options.start ? e = this.options.start : e > this.options.end && (e = this.options.end);
                        var o = this.options.doubleSided;
                        if (this.options.vertical && !n && (e = this.options.end - e), o)
                            if (0 === this.handles.index(t)) {
                                var r = parseFloat(this.$handle2.attr("aria-valuenow"));
                                e = e >= r ? r - this.options.step : e
                            } else {
                                var l = parseFloat(this.$handle.attr("aria-valuenow"));
                                e = e <= l ? l + this.options.step : e
                            }
                        var u = this,
                            c = this.options.vertical,
                            h = c ? "height" : "width",
                            f = c ? "top" : "left",
                            p = t[0].getBoundingClientRect()[h],
                            m = this.$element[0].getBoundingClientRect()[h],
                            g = this._pctOfBar(e),
                            v = (m - p) * g,
                            b = (100 * a(v, m)).toFixed(this.options.decimal);
                        e = parseFloat(e.toFixed(this.options.decimal));
                        var y = {};
                        if (this._setValues(t, e), o) {
                            var w, _ = 0 === this.handles.index(t),
                                $ = ~~(100 * a(p, m));
                            if (_) y[f] = b + "%", w = parseFloat(this.$handle2[0].style[f]) - b + $, s && "function" == typeof s && s();
                            else {
                                var k = parseFloat(this.$handle[0].style[f]);
                                w = b - (isNaN(k) ? (this.options.initialStart - this.options.start) / ((this.options.end - this.options.start) / 100) : k) + $
                            }
                            y["min-" + h] = w + "%"
                        }
                        this.$element.one("finished.zf.animate", function() {
                            u.$element.trigger("moved.zf.slider", [t])
                        });
                        var C = this.$element.data("dragging") ? 1e3 / 60 : this.options.moveTime;
                        i.i(d.b)(C, t, function() {
                            isNaN(b) ? t.css(f, 100 * g + "%") : t.css(f, b + "%"), u.options.doubleSided ? u.$fill.css(y) : u.$fill.css(h, 100 * g + "%")
                        }), clearTimeout(u.timeout), u.timeout = setTimeout(function() {
                            u.$element.trigger("changed.zf.slider", [t])
                        }, u.options.changedDelay)
                    }
                }
            }, {
                key: "_setInitAttr",
                value: function(t) {
                    var e = 0 === t ? this.options.initialStart : this.options.initialEnd,
                        n = this.inputs.eq(t).attr("id") || i.i(f.b)(6, "slider");
                    this.inputs.eq(t).attr({
                        id: n,
                        max: this.options.end,
                        min: this.options.start,
                        step: this.options.step
                    }), this.inputs.eq(t).val(e), this.handles.eq(t).attr({
                        role: "slider",
                        "aria-controls": n,
                        "aria-valuemax": this.options.end,
                        "aria-valuemin": this.options.start,
                        "aria-valuenow": e,
                        "aria-orientation": this.options.vertical ? "vertical" : "horizontal",
                        tabindex: 0
                    })
                }
            }, {
                key: "_setValues",
                value: function(t, e) {
                    var i = this.options.doubleSided ? this.handles.index(t) : 0;
                    this.inputs.eq(i).val(e), t.attr("aria-valuenow", e)
                }
            }, {
                key: "_handleEvent",
                value: function(t, e, n) {
                    var s, o;
                    if (n) s = this._adjustValue(null, n), o = !0;
                    else {
                        t.preventDefault();
                        var l = this,
                            u = this.options.vertical,
                            h = u ? "height" : "width",
                            d = u ? "top" : "left",
                            p = u ? t.pageY : t.pageX,
                            m = (this.$handle[0].getBoundingClientRect()[h], this.$element[0].getBoundingClientRect()[h]),
                            g = u ? c()(window).scrollTop() : c()(window).scrollLeft(),
                            v = this.$element.offset()[d];
                        t.clientY === t.pageY && (p += g);
                        var b, y = p - v;
                        b = y < 0 ? 0 : y > m ? m : y;
                        var w = a(b, m);
                        if (s = this._value(w), i.i(f.a)() && !this.options.vertical && (s = this.options.end - s), s = l._adjustValue(null, s), o = !1, !e) {
                            e = r(this.$handle, d, b, h) <= r(this.$handle2, d, b, h) ? this.$handle : this.$handle2
                        }
                    }
                    this._setHandlePos(e, s, o)
                }
            }, {
                key: "_adjustValue",
                value: function(t, e) {
                    var i, n, s, o, a = this.options.step,
                        r = parseFloat(a / 2);
                    return i = t ? parseFloat(t.attr("aria-valuenow")) : e, n = i % a, s = i - n, o = s + a, 0 === n ? i : i = i >= s + r ? o : s
                }
            }, {
                key: "_events",
                value: function() {
                    this._eventsForHandle(this.$handle), this.handles[1] && this._eventsForHandle(this.$handle2)
                }
            }, {
                key: "_eventsForHandle",
                value: function(t) {
                    var e, i = this;
                    if (this.inputs.off("change.zf.slider").on("change.zf.slider", function(t) {
                            var e = i.inputs.index(c()(this));
                            i._handleEvent(t, i.handles.eq(e), c()(this).val())
                        }), this.options.clickSelect && this.$element.off("click.zf.slider").on("click.zf.slider", function(t) {
                            if (i.$element.data("dragging")) return !1;
                            c()(t.target).is("[data-slider-handle]") || (i.options.doubleSided ? i._handleEvent(t) : i._handleEvent(t, i.$handle))
                        }), this.options.draggable) {
                        this.handles.addTouch();
                        var n = c()("body");
                        t.off("mousedown.zf.slider").on("mousedown.zf.slider", function(s) {
                            t.addClass("is-dragging"), i.$fill.addClass("is-dragging"), i.$element.data("dragging", !0), e = c()(s.currentTarget), n.on("mousemove.zf.slider", function(t) {
                                t.preventDefault(), i._handleEvent(t, e)
                            }).on("mouseup.zf.slider", function(s) {
                                i._handleEvent(s, e), t.removeClass("is-dragging"), i.$fill.removeClass("is-dragging"), i.$element.data("dragging", !1), n.off("mousemove.zf.slider mouseup.zf.slider")
                            })
                        }).on("selectstart.zf.slider touchmove.zf.slider", function(t) {
                            t.preventDefault()
                        })
                    }
                    t.off("keydown.zf.slider").on("keydown.zf.slider", function(t) {
                        var e, n = c()(this),
                            s = i.options.doubleSided ? i.handles.index(n) : 0,
                            o = parseFloat(i.inputs.eq(s).val());
                        h.a.handleKey(t, "Slider", {
                            decrease: function() {
                                e = o - i.options.step
                            },
                            increase: function() {
                                e = o + i.options.step
                            },
                            decrease_fast: function() {
                                e = o - 10 * i.options.step
                            },
                            increase_fast: function() {
                                e = o + 10 * i.options.step
                            },
                            min: function() {
                                e = i.options.start
                            },
                            max: function() {
                                e = i.options.end
                            },
                            handled: function() {
                                t.preventDefault(), i._setHandlePos(n, e, !0)
                            }
                        })
                    })
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.handles.off(".zf.slider"), this.inputs.off(".zf.slider"), this.$element.off(".zf.slider"), clearTimeout(this.timeout)
                }
            }]), e
        }(p.a);
    b.defaults = {
        start: 0,
        end: 100,
        step: 1,
        initialStart: 0,
        initialEnd: 100,
        binding: !1,
        clickSelect: !0,
        vertical: !1,
        draggable: !0,
        disabled: !1,
        doubleSided: !1,
        decimal: 2,
        moveTime: 200,
        disabledClass: "disabled",
        invertVertical: !1,
        changedDelay: 500,
        nonLinearBase: 5,
        positionValueFunction: "linear"
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function a(t) {
        return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * t
    }
    i.d(e, "a", function() {
        return p
    });
    var r = i(0),
        l = i.n(r),
        u = i(1),
        c = i(4),
        h = i(2),
        d = i(5),
        f = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        p = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), f(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = l.a.extend({}, e.defaults, this.$element.data(), i), this.className = "Sticky", d.a.init(l.a), this._init()
                }
            }, {
                key: "_init",
                value: function() {
                    c.a._init();
                    var t = this.$element.parent("[data-sticky-container]"),
                        e = this.$element[0].id || i.i(u.b)(6, "sticky"),
                        n = this;
                    t.length ? this.$container = t : (this.wasWrapped = !0, this.$element.wrap(this.options.container), this.$container = this.$element.parent()), this.$container.addClass(this.options.containerClass), this.$element.addClass(this.options.stickyClass).attr({
                        "data-resize": e,
                        "data-mutate": e
                    }), "" !== this.options.anchor && l()("#" + n.options.anchor).attr({
                        "data-mutate": e
                    }), this.scrollCount = this.options.checkEvery, this.isStuck = !1, l()(window).one("load.zf.sticky", function() {
                        n.containerHeight = "none" == n.$element.css("display") ? 0 : n.$element[0].getBoundingClientRect().height, n.$container.css("height", n.containerHeight), n.elemHeight = n.containerHeight, "" !== n.options.anchor ? n.$anchor = l()("#" + n.options.anchor) : n._parsePoints(), n._setSizes(function() {
                            var t = window.pageYOffset;
                            n._calc(!1, t), n.isStuck || n._removeSticky(!(t >= n.topPoint))
                        }), n._events(e.split("-").reverse().join("-"))
                    })
                }
            }, {
                key: "_parsePoints",
                value: function() {
                    for (var t = "" == this.options.topAnchor ? 1 : this.options.topAnchor, e = "" == this.options.btmAnchor ? document.documentElement.scrollHeight : this.options.btmAnchor, i = [t, e], n = {}, s = 0, o = i.length; s < o && i[s]; s++) {
                        var a;
                        if ("number" == typeof i[s]) a = i[s];
                        else {
                            var r = i[s].split(":"),
                                u = l()("#" + r[0]);
                            a = u.offset().top, r[1] && "bottom" === r[1].toLowerCase() && (a += u[0].getBoundingClientRect().height)
                        }
                        n[s] = a
                    }
                    this.points = n
                }
            }, {
                key: "_events",
                value: function(t) {
                    var e = this,
                        i = this.scrollListener = "scroll.zf." + t;
                    this.isOn || (this.canStick && (this.isOn = !0, l()(window).off(i).on(i, function(t) {
                        0 === e.scrollCount ? (e.scrollCount = e.options.checkEvery, e._setSizes(function() {
                            e._calc(!1, window.pageYOffset)
                        })) : (e.scrollCount--, e._calc(!1, window.pageYOffset))
                    })), this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", function(i, n) {
                        e._eventsHandler(t)
                    }), this.$element.on("mutateme.zf.trigger", function(i, n) {
                        e._eventsHandler(t)
                    }), this.$anchor && this.$anchor.on("mutateme.zf.trigger", function(i, n) {
                        e._eventsHandler(t)
                    }))
                }
            }, {
                key: "_eventsHandler",
                value: function(t) {
                    var e = this,
                        i = this.scrollListener = "scroll.zf." + t;
                    e._setSizes(function() {
                        e._calc(!1), e.canStick ? e.isOn || e._events(t) : e.isOn && e._pauseListeners(i)
                    })
                }
            }, {
                key: "_pauseListeners",
                value: function(t) {
                    this.isOn = !1, l()(window).off(t), this.$element.trigger("pause.zf.sticky")
                }
            }, {
                key: "_calc",
                value: function(t, e) {
                    if (t && this._setSizes(), !this.canStick) return this.isStuck && this._removeSticky(!0), !1;
                    e || (e = window.pageYOffset), e >= this.topPoint ? e <= this.bottomPoint ? this.isStuck || this._setSticky() : this.isStuck && this._removeSticky(!1) : this.isStuck && this._removeSticky(!0)
                }
            }, {
                key: "_setSticky",
                value: function() {
                    var t = this,
                        e = this.options.stickTo,
                        i = "top" === e ? "marginTop" : "marginBottom",
                        n = "top" === e ? "bottom" : "top",
                        s = {};
                    s[i] = this.options[i] + "em", s[e] = 0, s[n] = "auto", this.isStuck = !0, this.$element.removeClass("is-anchored is-at-" + n).addClass("is-stuck is-at-" + e).css(s).trigger("sticky.zf.stuckto:" + e), this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                        t._setSizes()
                    })
                }
            }, {
                key: "_removeSticky",
                value: function(t) {
                    var e = this.options.stickTo,
                        i = "top" === e,
                        n = {},
                        s = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
                        o = i ? "marginTop" : "marginBottom",
                        a = t ? "top" : "bottom";
                    n[o] = 0, n.bottom = "auto", n.top = t ? 0 : s, this.isStuck = !1, this.$element.removeClass("is-stuck is-at-" + e).addClass("is-anchored is-at-" + a).css(n).trigger("sticky.zf.unstuckfrom:" + a)
                }
            }, {
                key: "_setSizes",
                value: function(t) {
                    this.canStick = c.a.is(this.options.stickyOn), this.canStick || t && "function" == typeof t && t();
                    var e = this.$container[0].getBoundingClientRect().width,
                        i = window.getComputedStyle(this.$container[0]),
                        n = parseInt(i["padding-left"], 10),
                        s = parseInt(i["padding-right"], 10);
                    this.$anchor && this.$anchor.length ? this.anchorHeight = this.$anchor[0].getBoundingClientRect().height : this._parsePoints(), this.$element.css({
                        "max-width": e - n - s + "px"
                    });
                    var o = this.$element[0].getBoundingClientRect().height || this.containerHeight;
                    if ("none" == this.$element.css("display") && (o = 0), this.containerHeight = o, this.$container.css({
                            height: o
                        }), this.elemHeight = o, !this.isStuck && this.$element.hasClass("is-at-bottom")) {
                        var a = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
                        this.$element.css("top", a)
                    }
                    this._setBreakPoints(o, function() {
                        t && "function" == typeof t && t()
                    })
                }
            }, {
                key: "_setBreakPoints",
                value: function(t, e) {
                    if (!this.canStick) {
                        if (!e || "function" != typeof e) return !1;
                        e()
                    }
                    var i = a(this.options.marginTop),
                        n = a(this.options.marginBottom),
                        s = this.points ? this.points[0] : this.$anchor.offset().top,
                        o = this.points ? this.points[1] : s + this.anchorHeight,
                        r = window.innerHeight;
                    "top" === this.options.stickTo ? (s -= i, o -= t + i) : "bottom" === this.options.stickTo && (s -= r - (t + n), o -= r - n), this.topPoint = s, this.bottomPoint = o, e && "function" == typeof e && e()
                }
            }, {
                key: "_destroy",
                value: function() {
                    this._removeSticky(!0), this.$element.removeClass(this.options.stickyClass + " is-anchored is-at-top").css({
                        height: "",
                        top: "",
                        bottom: "",
                        "max-width": ""
                    }).off("resizeme.zf.trigger").off("mutateme.zf.trigger"), this.$anchor && this.$anchor.length && this.$anchor.off("change.zf.sticky"), l()(window).off(this.scrollListener), this.wasWrapped ? this.$element.unwrap() : this.$container.removeClass(this.options.containerClass).css({
                        height: ""
                    })
                }
            }]), e
        }(h.a);
    p.defaults = {
        container: "<div data-sticky-container></div>",
        stickTo: "top",
        anchor: "",
        topAnchor: "",
        btmAnchor: "",
        marginTop: 1,
        marginBottom: 1,
        stickyOn: "medium",
        stickyClass: "sticky",
        containerClass: "sticky-container",
        checkEvery: -1
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return d
    });
    var a = i(0),
        r = i.n(a),
        l = i(6),
        u = i(2),
        c = i(5),
        h = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        d = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), h(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, t.data(), i), this.className = "", this.className = "Toggler", c.a.init(r.a), this._init(), this._events()
                }
            }, {
                key: "_init",
                value: function() {
                    var t;
                    this.options.animate ? (t = this.options.animate.split(" "), this.animationIn = t[0], this.animationOut = t[1] || null) : (t = this.$element.data("toggler"), this.className = "." === t[0] ? t.slice(1) : t);
                    var e = this.$element[0].id;
                    r()('[data-open="' + e + '"], [data-close="' + e + '"], [data-toggle="' + e + '"]').attr("aria-controls", e), this.$element.attr("aria-expanded", !this.$element.is(":hidden"))
                }
            }, {
                key: "_events",
                value: function() {
                    this.$element.off("toggle.zf.trigger").on("toggle.zf.trigger", this.toggle.bind(this))
                }
            }, {
                key: "toggle",
                value: function() {
                    this[this.options.animate ? "_toggleAnimate" : "_toggleClass"]()
                }
            }, {
                key: "_toggleClass",
                value: function() {
                    this.$element.toggleClass(this.className);
                    var t = this.$element.hasClass(this.className);
                    t ? this.$element.trigger("on.zf.toggler") : this.$element.trigger("off.zf.toggler"), this._updateARIA(t), this.$element.find("[data-mutate]").trigger("mutateme.zf.trigger")
                }
            }, {
                key: "_toggleAnimate",
                value: function() {
                    var t = this;
                    this.$element.is(":hidden") ? l.a.animateIn(this.$element, this.animationIn, function() {
                        t._updateARIA(!0), this.trigger("on.zf.toggler"), this.find("[data-mutate]").trigger("mutateme.zf.trigger")
                    }) : l.a.animateOut(this.$element, this.animationOut, function() {
                        t._updateARIA(!1), this.trigger("off.zf.toggler"), this.find("[data-mutate]").trigger("mutateme.zf.trigger")
                    })
                }
            }, {
                key: "_updateARIA",
                value: function(t) {
                    this.$element.attr("aria-expanded", !!t)
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$element.off(".zf.toggler")
                }
            }]), e
        }(u.a);
    d.defaults = {
        animate: !1
    }
}, function(t, e, i) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    i.d(e, "a", function() {
        return p
    });
    var a = i(0),
        r = i.n(a),
        l = i(1),
        u = i(4),
        c = i(5),
        h = i(15),
        d = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(),
        f = function t(e, i, n) {
            null === e && (e = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(e, i);
            if (void 0 === s) {
                var o = Object.getPrototypeOf(e);
                return null === o ? void 0 : t(o, i, n)
            }
            if ("value" in s) return s.value;
            var a = s.get;
            if (void 0 !== a) return a.call(n)
        },
        p = function(t) {
            function e() {
                return n(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return o(e, t), d(e, [{
                key: "_setup",
                value: function(t, i) {
                    this.$element = t, this.options = r.a.extend({}, e.defaults, this.$element.data(), i), this.className = "Tooltip", this.isActive = !1, this.isClick = !1, c.a.init(r.a), this._init()
                }
            }, {
                key: "_init",
                value: function() {
                    u.a._init();
                    var t = this.$element.attr("aria-describedby") || i.i(l.b)(6, "tooltip");
                    this.options.tipText = this.options.tipText || this.$element.attr("title"), this.template = this.options.template ? r()(this.options.template) : this._buildTemplate(t), this.options.allowHtml ? this.template.appendTo(document.body).html(this.options.tipText).hide() : this.template.appendTo(document.body).text(this.options.tipText).hide(), this.$element.attr({
                        title: "",
                        "aria-describedby": t,
                        "data-yeti-box": t,
                        "data-toggle": t,
                        "data-resize": t
                    }).addClass(this.options.triggerClass), f(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_init", this).call(this), this._events()
                }
            }, {
                key: "_getDefaultPosition",
                value: function() {
                    var t = this.$element[0].className.match(/\b(top|left|right|bottom)\b/g);
                    return t ? t[0] : "top"
                }
            }, {
                key: "_getDefaultAlignment",
                value: function() {
                    return "center"
                }
            }, {
                key: "_getHOffset",
                value: function() {
                    return "left" === this.position || "right" === this.position ? this.options.hOffset + this.options.tooltipWidth : this.options.hOffset
                }
            }, {
                key: "_getVOffset",
                value: function() {
                    return "top" === this.position || "bottom" === this.position ? this.options.vOffset + this.options.tooltipHeight : this.options.vOffset
                }
            }, {
                key: "_buildTemplate",
                value: function(t) {
                    var e = (this.options.tooltipClass + " " + this.options.positionClass + " " + this.options.templateClasses).trim();
                    return r()("<div></div>").addClass(e).attr({
                        role: "tooltip",
                        "aria-hidden": !0,
                        "data-is-active": !1,
                        "data-is-focus": !1,
                        id: t
                    })
                }
            }, {
                key: "_setPosition",
                value: function() {
                    f(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_setPosition", this).call(this, this.$element, this.template)
                }
            }, {
                key: "show",
                value: function() {
                    if ("all" !== this.options.showOn && !u.a.is(this.options.showOn)) return !1;
                    var t = this;
                    this.template.css("visibility", "hidden").show(), this._setPosition(), this.template.removeClass("top bottom left right").addClass(this.position), this.template.removeClass("align-top align-bottom align-left align-right align-center").addClass("align-" + this.alignment), this.$element.trigger("closeme.zf.tooltip", this.template.attr("id")), this.template.attr({
                        "data-is-active": !0,
                        "aria-hidden": !1
                    }), t.isActive = !0, this.template.stop().hide().css("visibility", "").fadeIn(this.options.fadeInDuration, function() {}), this.$element.trigger("show.zf.tooltip")
                }
            }, {
                key: "hide",
                value: function() {
                    var t = this;
                    this.template.stop().attr({
                        "aria-hidden": !0,
                        "data-is-active": !1
                    }).fadeOut(this.options.fadeOutDuration, function() {
                        t.isActive = !1, t.isClick = !1
                    }), this.$element.trigger("hide.zf.tooltip")
                }
            }, {
                key: "_events",
                value: function() {
                    var t = this,
                        e = (this.template, !1);
                    this.options.disableHover || this.$element.on("mouseenter.zf.tooltip", function(e) {
                        t.isActive || (t.timeout = setTimeout(function() {
                            t.show()
                        }, t.options.hoverDelay))
                    }).on("mouseleave.zf.tooltip", function(i) {
                        clearTimeout(t.timeout), (!e || t.isClick && !t.options.clickOpen) && t.hide()
                    }), this.options.clickOpen ? this.$element.on("mousedown.zf.tooltip", function(e) {
                        e.stopImmediatePropagation(), t.isClick || (t.isClick = !0, !t.options.disableHover && t.$element.attr("tabindex") || t.isActive || t.show())
                    }) : this.$element.on("mousedown.zf.tooltip", function(e) {
                        e.stopImmediatePropagation(), t.isClick = !0
                    }), this.options.disableForTouch || this.$element.on("tap.zf.tooltip touchend.zf.tooltip", function(e) {
                        t.isActive ? t.hide() : t.show()
                    }), this.$element.on({
                        "close.zf.trigger": this.hide.bind(this)
                    }), this.$element.on("focus.zf.tooltip", function(i) {
                        if (e = !0, t.isClick) return t.options.clickOpen || (e = !1), !1;
                        t.show()
                    }).on("focusout.zf.tooltip", function(i) {
                        e = !1, t.isClick = !1, t.hide()
                    }).on("resizeme.zf.trigger", function() {
                        t.isActive && t._setPosition()
                    })
                }
            }, {
                key: "toggle",
                value: function() {
                    this.isActive ? this.hide() : this.show()
                }
            }, {
                key: "_destroy",
                value: function() {
                    this.$element.attr("title", this.template.text()).off(".zf.trigger .zf.tooltip").removeClass("has-tip top right left").removeAttr("aria-describedby aria-haspopup data-disable-hover data-resize data-toggle data-tooltip data-yeti-box"), this.template.remove()
                }
            }]), e
        }(h.a);
    p.defaults = {
        disableForTouch: !1,
        hoverDelay: 200,
        fadeInDuration: 150,
        fadeOutDuration: 150,
        disableHover: !1,
        templateClasses: "",
        tooltipClass: "tooltip",
        triggerClass: "has-tip",
        showOn: "small",
        template: "",
        tipText: "",
        touchCloseText: "Tap to close.",
        clickOpen: !0,
        positionClass: "",
        position: "auto",
        alignment: "auto",
        allowOverlap: !1,
        allowBottomOverlap: !1,
        vOffset: 0,
        hOffset: 0,
        tooltipHeight: 14,
        tooltipWidth: 12,
        allowHtml: !1
    }
}, function(t, e, i) {
    t.exports = i(19)
}]);

/*!
 * imagesLoaded PACKAGED v4.1.2
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

! function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0,
                o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                var s = r && r[o];
                s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
            }
            return this
        }
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, function(t, e) {
    function i(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function n(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if ("number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }

    function o(t, e, r) {
        return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function() {
            this.check()
        }.bind(this))) : new o(t, e, r)
    }

    function r(t) {
        this.img = t
    }

    function s(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    var h = t.jQuery,
        a = t.console;
    o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && d[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var d = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
            }
    }, o.prototype.addImage = function(t) {
        var e = new r(t);
        this.images.push(e)
    }, o.prototype.addBackground = function(t, e) {
        var i = new s(t, e);
        this.images.push(i)
    }, o.prototype.check = function() {
        function t(t, i, n) {
            setTimeout(function() {
                e.progress(t, i, n)
            })
        }
        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
            e.once("progress", t), e.check()
        }) : void this.complete()
    }, o.prototype.progress = function(t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
    }, o.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, r.prototype = Object.create(e.prototype), r.prototype.check = function() {
        var t = this.getIsImageComplete();
        return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function() {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, r.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, r.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, r.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, o.makeJQueryPlugin = function(e) {
        e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function(t, e) {
            var i = new o(this, t, e);
            return i.jqDeferred.promise(h(this))
        })
    }, o.makeJQueryPlugin(), o
});

/*! VelocityJS.org (1.5.0). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
! function(a) {
    "use strict";

    function b(a) {
        var b = a.length,
            d = c.type(a);
        return "function" !== d && !c.isWindow(a) && (!(1 !== a.nodeType || !b) || ("array" === d || 0 === b || "number" == typeof b && b > 0 && b - 1 in a))
    }
    if (!a.jQuery) {
        var c = function(a, b) {
            return new c.fn.init(a, b)
        };
        c.isWindow = function(a) {
            return a && a === a.window
        }, c.type = function(a) {
            return a ? "object" == typeof a || "function" == typeof a ? e[g.call(a)] || "object" : typeof a : a + ""
        }, c.isArray = Array.isArray || function(a) {
            return "array" === c.type(a)
        }, c.isPlainObject = function(a) {
            var b;
            if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;
            try {
                if (a.constructor && !f.call(a, "constructor") && !f.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (d) {
                return !1
            }
            for (b in a);
            return b === undefined || f.call(a, b)
        }, c.each = function(a, c, d) {
            var e = 0,
                f = a.length,
                g = b(a);
            if (d) {
                if (g)
                    for (; e < f && c.apply(a[e], d) !== !1; e++);
                else
                    for (e in a)
                        if (a.hasOwnProperty(e) && c.apply(a[e], d) === !1) break
            } else if (g)
                for (; e < f && c.call(a[e], e, a[e]) !== !1; e++);
            else
                for (e in a)
                    if (a.hasOwnProperty(e) && c.call(a[e], e, a[e]) === !1) break;
            return a
        }, c.data = function(a, b, e) {
            if (e === undefined) {
                var f = a[c.expando],
                    g = f && d[f];
                if (b === undefined) return g;
                if (g && b in g) return g[b]
            } else if (b !== undefined) {
                var h = a[c.expando] || (a[c.expando] = ++c.uuid);
                return d[h] = d[h] || {}, d[h][b] = e, e
            }
        }, c.removeData = function(a, b) {
            var e = a[c.expando],
                f = e && d[e];
            f && (b ? c.each(b, function(a, b) {
                delete f[b]
            }) : delete d[e])
        }, c.extend = function() {
            var a, b, d, e, f, g, h = arguments[0] || {},
                i = 1,
                j = arguments.length,
                k = !1;
            for ("boolean" == typeof h && (k = h, h = arguments[i] || {}, i++), "object" != typeof h && "function" !== c.type(h) && (h = {}), i === j && (h = this, i--); i < j; i++)
                if (f = arguments[i])
                    for (e in f) f.hasOwnProperty(e) && (a = h[e], d = f[e], h !== d && (k && d && (c.isPlainObject(d) || (b = c.isArray(d))) ? (b ? (b = !1, g = a && c.isArray(a) ? a : []) : g = a && c.isPlainObject(a) ? a : {}, h[e] = c.extend(k, g, d)) : d !== undefined && (h[e] = d)));
            return h
        }, c.queue = function(a, d, e) {
            if (a) {
                d = (d || "fx") + "queue";
                var f = c.data(a, d);
                return e ? (!f || c.isArray(e) ? f = c.data(a, d, function(a, c) {
                    var d = c || [];
                    return a && (b(Object(a)) ? function(a, b) {
                        for (var c = +b.length, d = 0, e = a.length; d < c;) a[e++] = b[d++];
                        if (c !== c)
                            for (; b[d] !== undefined;) a[e++] = b[d++];
                        a.length = e, a
                    }(d, "string" == typeof a ? [a] : a) : [].push.call(d, a)), d
                }(e)) : f.push(e), f) : f || []
            }
        }, c.dequeue = function(a, b) {
            c.each(a.nodeType ? [a] : a, function(a, d) {
                b = b || "fx";
                var e = c.queue(d, b),
                    f = e.shift();
                "inprogress" === f && (f = e.shift()), f && ("fx" === b && e.unshift("inprogress"), f.call(d, function() {
                    c.dequeue(d, b)
                }))
            })
        }, c.fn = c.prototype = {
            init: function(a) {
                if (a.nodeType) return this[0] = a, this;
                throw new Error("Not a DOM node.")
            },
            offset: function() {
                var b = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: b.top + (a.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: b.left + (a.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            },
            position: function() {
                var a = this[0],
                    b = function(a) {
                        for (var b = a.offsetParent; b && "html" !== b.nodeName.toLowerCase() && b.style && "static" === b.style.position;) b = b.offsetParent;
                        return b || document
                    }(a),
                    d = this.offset(),
                    e = /^(?:body|html)$/i.test(b.nodeName) ? {
                        top: 0,
                        left: 0
                    } : c(b).offset();
                return d.top -= parseFloat(a.style.marginTop) || 0, d.left -= parseFloat(a.style.marginLeft) || 0, b.style && (e.top += parseFloat(b.style.borderTopWidth) || 0, e.left += parseFloat(b.style.borderLeftWidth) || 0), {
                    top: d.top - e.top,
                    left: d.left - e.left
                }
            }
        };
        var d = {};
        c.expando = "velocity" + (new Date).getTime(), c.uuid = 0;
        for (var e = {}, f = e.hasOwnProperty, g = e.toString, h = "Boolean Number String Function Array Date RegExp Object Error".split(" "), i = 0; i < h.length; i++) e["[object " + h[i] + "]"] = h[i].toLowerCase();
        c.fn.init.prototype = c.fn, a.Velocity = {
            Utilities: c
        }
    }
}(window),
function(a) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a() : "function" == typeof define && define.amd ? define(a) : a()
}(function() {
    "use strict";
    return function(a, b, c, d) {
        function e(a) {
            for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
                var e = a[b];
                e && d.push(e)
            }
            return d
        }

        function f(a) {
            return u.isWrapped(a) ? a = s.call(a) : u.isNode(a) && (a = [a]), a
        }

        function g(a) {
            var b = o.data(a, "velocity");
            return null === b ? d : b
        }

        function h(a, b) {
            var c = g(a);
            c && c.delayTimer && !c.delayPaused && (c.delayRemaining = c.delay - b + c.delayBegin, c.delayPaused = !0, clearTimeout(c.delayTimer.setTimeout))
        }

        function i(a, b) {
            var c = g(a);
            c && c.delayTimer && c.delayPaused && (c.delayPaused = !1, c.delayTimer.setTimeout = setTimeout(c.delayTimer.next, c.delayRemaining))
        }

        function j(a) {
            return function(b) {
                return Math.round(b * a) * (1 / a)
            }
        }

        function k(a, c, d, e) {
            function f(a, b) {
                return 1 - 3 * b + 3 * a
            }

            function g(a, b) {
                return 3 * b - 6 * a
            }

            function h(a) {
                return 3 * a
            }

            function i(a, b, c) {
                return ((f(b, c) * a + g(b, c)) * a + h(b)) * a
            }

            function j(a, b, c) {
                return 3 * f(b, c) * a * a + 2 * g(b, c) * a + h(b)
            }

            function k(b, c) {
                for (var e = 0; e < p; ++e) {
                    var f = j(c, a, d);
                    if (0 === f) return c;
                    c -= (i(c, a, d) - b) / f
                }
                return c
            }

            function l() {
                for (var b = 0; b < t; ++b) x[b] = i(b * u, a, d)
            }

            function m(b, c, e) {
                var f, g, h = 0;
                do {
                    g = c + (e - c) / 2, f = i(g, a, d) - b, f > 0 ? e = g : c = g
                } while (Math.abs(f) > r && ++h < s);
                return g
            }

            function n(b) {
                for (var c = 0, e = 1, f = t - 1; e !== f && x[e] <= b; ++e) c += u;
                --e;
                var g = (b - x[e]) / (x[e + 1] - x[e]),
                    h = c + g * u,
                    i = j(h, a, d);
                return i >= q ? k(b, h) : 0 === i ? h : m(b, c, c + u)
            }

            function o() {
                y = !0, a === c && d === e || l()
            }
            var p = 4,
                q = .001,
                r = 1e-7,
                s = 10,
                t = 11,
                u = 1 / (t - 1),
                v = "Float32Array" in b;
            if (4 !== arguments.length) return !1;
            for (var w = 0; w < 4; ++w)
                if ("number" != typeof arguments[w] || isNaN(arguments[w]) || !isFinite(arguments[w])) return !1;
            a = Math.min(a, 1), d = Math.min(d, 1), a = Math.max(a, 0), d = Math.max(d, 0);
            var x = v ? new Float32Array(t) : new Array(t),
                y = !1,
                z = function(b) {
                    return y || o(), a === c && d === e ? b : 0 === b ? 0 : 1 === b ? 1 : i(n(b), c, e)
                };
            z.getControlPoints = function() {
                return [{
                    x: a,
                    y: c
                }, {
                    x: d,
                    y: e
                }]
            };
            var A = "generateBezier(" + [a, c, d, e] + ")";
            return z.toString = function() {
                return A
            }, z
        }

        function l(a, b) {
            var c = a;
            return u.isString(a) ? y.Easings[a] || (c = !1) : c = u.isArray(a) && 1 === a.length ? j.apply(null, a) : u.isArray(a) && 2 === a.length ? z.apply(null, a.concat([b])) : !(!u.isArray(a) || 4 !== a.length) && k.apply(null, a), c === !1 && (c = y.Easings[y.defaults.easing] ? y.defaults.easing : x), c
        }

        function m(a) {
            if (a) {
                var b = y.timestamp && a !== !0 ? a : r.now(),
                    c = y.State.calls.length;
                c > 1e4 && (y.State.calls = e(y.State.calls), c = y.State.calls.length);
                for (var f = 0; f < c; f++)
                    if (y.State.calls[f]) {
                        var h = y.State.calls[f],
                            i = h[0],
                            j = h[2],
                            k = h[3],
                            l = !!k,
                            q = null,
                            s = h[5],
                            t = h[6];
                        if (k || (k = y.State.calls[f][3] = b - 16), s) {
                            if (s.resume !== !0) continue;
                            k = h[3] = Math.round(b - t - 16), h[5] = null
                        }
                        t = h[6] = b - k;
                        for (var v = Math.min(t / j.duration, 1), w = 0, x = i.length; w < x; w++) {
                            var z = i[w],
                                B = z.element;
                            if (g(B)) {
                                var D = !1;
                                if (j.display !== d && null !== j.display && "none" !== j.display) {
                                    if ("flex" === j.display) {
                                        var E = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                        o.each(E, function(a, b) {
                                            A.setPropertyValue(B, "display", b)
                                        })
                                    }
                                    A.setPropertyValue(B, "display", j.display)
                                }
                                j.visibility !== d && "hidden" !== j.visibility && A.setPropertyValue(B, "visibility", j.visibility);
                                for (var F in z)
                                    if (z.hasOwnProperty(F) && "element" !== F) {
                                        var G, H = z[F],
                                            I = u.isString(H.easing) ? y.Easings[H.easing] : H.easing;
                                        if (u.isString(H.pattern)) {
                                            var J = 1 === v ? function(a, b, c) {
                                                var d = H.endValue[b];
                                                return c ? Math.round(d) : d
                                            } : function(a, b, c) {
                                                var d = H.startValue[b],
                                                    e = H.endValue[b] - d,
                                                    f = d + e * I(v, j, e);
                                                return c ? Math.round(f) : f
                                            };
                                            G = H.pattern.replace(/{(\d+)(!)?}/g, J)
                                        } else if (1 === v) G = H.endValue;
                                        else {
                                            var K = H.endValue - H.startValue;
                                            G = H.startValue + K * I(v, j, K)
                                        }
                                        if (!l && G === H.currentValue) continue;
                                        if (H.currentValue = G, "tween" === F) q = G;
                                        else {
                                            var L;
                                            if (A.Hooks.registered[F]) {
                                                L = A.Hooks.getRoot(F);
                                                var M = g(B).rootPropertyValueCache[L];
                                                M && (H.rootPropertyValue = M)
                                            }
                                            var N = A.setPropertyValue(B, F, H.currentValue + (p < 9 && 0 === parseFloat(G) ? "" : H.unitType), H.rootPropertyValue, H.scrollData);
                                            A.Hooks.registered[F] && (A.Normalizations.registered[L] ? g(B).rootPropertyValueCache[L] = A.Normalizations.registered[L]("extract", null, N[1]) : g(B).rootPropertyValueCache[L] = N[1]), "transform" === N[0] && (D = !0)
                                        }
                                    }
                                j.mobileHA && g(B).transformCache.translate3d === d && (g(B).transformCache.translate3d = "(0px, 0px, 0px)", D = !0), D && A.flushTransformCache(B)
                            }
                        }
                        j.display !== d && "none" !== j.display && (y.State.calls[f][2].display = !1), j.visibility !== d && "hidden" !== j.visibility && (y.State.calls[f][2].visibility = !1), j.progress && j.progress.call(h[1], h[1], v, Math.max(0, k + j.duration - b), k, q), 1 === v && n(f)
                    }
            }
            y.State.isTicking && C(m)
        }

        function n(a, b) {
            if (!y.State.calls[a]) return !1;
            for (var c = y.State.calls[a][0], e = y.State.calls[a][1], f = y.State.calls[a][2], h = y.State.calls[a][4], i = !1, j = 0, k = c.length; j < k; j++) {
                var l = c[j].element;
                b || f.loop || ("none" === f.display && A.setPropertyValue(l, "display", f.display), "hidden" === f.visibility && A.setPropertyValue(l, "visibility", f.visibility));
                var m = g(l);
                if (f.loop !== !0 && (o.queue(l)[1] === d || !/\.velocityQueueEntryFlag/i.test(o.queue(l)[1])) && m) {
                    m.isAnimating = !1, m.rootPropertyValueCache = {};
                    var n = !1;
                    o.each(A.Lists.transforms3D, function(a, b) {
                        var c = /^scale/.test(b) ? 1 : 0,
                            e = m.transformCache[b];
                        m.transformCache[b] !== d && new RegExp("^\\(" + c + "[^.]").test(e) && (n = !0, delete m.transformCache[b])
                    }), f.mobileHA && (n = !0, delete m.transformCache.translate3d), n && A.flushTransformCache(l), A.Values.removeClass(l, "velocity-animating")
                }
                if (!b && f.complete && !f.loop && j === k - 1) try {
                    f.complete.call(e, e)
                } catch (r) {
                    setTimeout(function() {
                        throw r
                    }, 1)
                }
                h && f.loop !== !0 && h(e), m && f.loop === !0 && !b && (o.each(m.tweensContainer, function(a, b) {
                    if (/^rotate/.test(a) && (parseFloat(b.startValue) - parseFloat(b.endValue)) % 360 == 0) {
                        var c = b.startValue;
                        b.startValue = b.endValue, b.endValue = c
                    }
                    /^backgroundPosition/.test(a) && 100 === parseFloat(b.endValue) && "%" === b.unitType && (b.endValue = 0, b.startValue = 100)
                }), y(l, "reverse", {
                    loop: !0,
                    delay: f.delay
                })), f.queue !== !1 && o.dequeue(l, f.queue)
            }
            y.State.calls[a] = !1;
            for (var p = 0, q = y.State.calls.length; p < q; p++)
                if (y.State.calls[p] !== !1) {
                    i = !0;
                    break
                }
            i === !1 && (y.State.isTicking = !1, delete y.State.calls, y.State.calls = [])
        }
        var o, p = function() {
                if (c.documentMode) return c.documentMode;
                for (var a = 7; a > 4; a--) {
                    var b = c.createElement("div");
                    if (b.innerHTML = "<!--[if IE " + a + "]><span></span><![endif]-->", b.getElementsByTagName("span").length) return b = null, a
                }
                return d
            }(),
            q = function() {
                var a = 0;
                return b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || function(b) {
                    var c, d = (new Date).getTime();
                    return c = Math.max(0, 16 - (d - a)), a = d + c, setTimeout(function() {
                        b(d + c)
                    }, c)
                }
            }(),
            r = function() {
                var a = b.performance || {};
                if ("function" != typeof a.now) {
                    var c = a.timing && a.timing.navigationStart ? a.timing.navigationStart : (new Date).getTime();
                    a.now = function() {
                        return (new Date).getTime() - c
                    }
                }
                return a
            }(),
            s = function() {
                var a = Array.prototype.slice;
                try {
                    return a.call(c.documentElement), a
                } catch (b) {
                    return function(b, c) {
                        var d = this.length;
                        if ("number" != typeof b && (b = 0), "number" != typeof c && (c = d), this.slice) return a.call(this, b, c);
                        var e, f = [],
                            g = b >= 0 ? b : Math.max(0, d + b),
                            h = c < 0 ? d + c : Math.min(c, d),
                            i = h - g;
                        if (i > 0)
                            if (f = new Array(i), this.charAt)
                                for (e = 0; e < i; e++) f[e] = this.charAt(g + e);
                            else
                                for (e = 0; e < i; e++) f[e] = this[g + e];
                        return f
                    }
                }
            }(),
            t = function() {
                return Array.prototype.includes ? function(a, b) {
                    return a.includes(b)
                } : Array.prototype.indexOf ? function(a, b) {
                    return a.indexOf(b) >= 0
                } : function(a, b) {
                    for (var c = 0; c < a.length; c++)
                        if (a[c] === b) return !0;
                    return !1
                }
            },
            u = {
                isNumber: function(a) {
                    return "number" == typeof a
                },
                isString: function(a) {
                    return "string" == typeof a
                },
                isArray: Array.isArray || function(a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                },
                isFunction: function(a) {
                    return "[object Function]" === Object.prototype.toString.call(a)
                },
                isNode: function(a) {
                    return a && a.nodeType
                },
                isWrapped: function(a) {
                    return a && a !== b && u.isNumber(a.length) && !u.isString(a) && !u.isFunction(a) && !u.isNode(a) && (0 === a.length || u.isNode(a[0]))
                },
                isSVG: function(a) {
                    return b.SVGElement && a instanceof b.SVGElement
                },
                isEmptyObject: function(a) {
                    for (var b in a)
                        if (a.hasOwnProperty(b)) return !1;
                    return !0
                }
            },
            v = !1;
        if (a.fn && a.fn.jquery ? (o = a, v = !0) : o = b.Velocity.Utilities, p <= 8 && !v) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (p <= 7) return void(jQuery.fn.velocity = jQuery.fn.animate);
        var w = 400,
            x = "swing",
            y = {
                State: {
                    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                    isAndroid: /Android/i.test(navigator.userAgent),
                    isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                    isChrome: b.chrome,
                    isFirefox: /Firefox/i.test(navigator.userAgent),
                    prefixElement: c.createElement("div"),
                    prefixMatches: {},
                    scrollAnchor: null,
                    scrollPropertyLeft: null,
                    scrollPropertyTop: null,
                    isTicking: !1,
                    calls: [],
                    delayedElements: {
                        count: 0
                    }
                },
                CSS: {},
                Utilities: o,
                Redirects: {},
                Easings: {},
                Promise: b.Promise,
                defaults: {
                    queue: "",
                    duration: w,
                    easing: x,
                    begin: d,
                    complete: d,
                    progress: d,
                    display: d,
                    visibility: d,
                    loop: !1,
                    delay: !1,
                    mobileHA: !0,
                    _cacheValues: !0,
                    promiseRejectEmpty: !0
                },
                init: function(a) {
                    o.data(a, "velocity", {
                        isSVG: u.isSVG(a),
                        isAnimating: !1,
                        computedStyle: null,
                        tweensContainer: null,
                        rootPropertyValueCache: {},
                        transformCache: {}
                    })
                },
                hook: null,
                mock: !1,
                version: {
                    major: 1,
                    minor: 5,
                    patch: 0
                },
                debug: !1,
                timestamp: !0,
                pauseAll: function(a) {
                    var b = (new Date).getTime();
                    o.each(y.State.calls, function(b, c) {
                        if (c) {
                            if (a !== d && (c[2].queue !== a || c[2].queue === !1)) return !0;
                            c[5] = {
                                resume: !1
                            }
                        }
                    }), o.each(y.State.delayedElements, function(a, c) {
                        c && h(c, b)
                    })
                },
                resumeAll: function(a) {
                    var b = (new Date).getTime();
                    o.each(y.State.calls, function(b, c) {
                        if (c) {
                            if (a !== d && (c[2].queue !== a || c[2].queue === !1)) return !0;
                            c[5] && (c[5].resume = !0)
                        }
                    }), o.each(y.State.delayedElements, function(a, c) {
                        c && i(c, b)
                    })
                }
            };
        b.pageYOffset !== d ? (y.State.scrollAnchor = b, y.State.scrollPropertyLeft = "pageXOffset", y.State.scrollPropertyTop = "pageYOffset") : (y.State.scrollAnchor = c.documentElement || c.body.parentNode || c.body, y.State.scrollPropertyLeft = "scrollLeft", y.State.scrollPropertyTop = "scrollTop");
        var z = function() {
            function a(a) {
                return -a.tension * a.x - a.friction * a.v
            }

            function b(b, c, d) {
                var e = {
                    x: b.x + d.dx * c,
                    v: b.v + d.dv * c,
                    tension: b.tension,
                    friction: b.friction
                };
                return {
                    dx: e.v,
                    dv: a(e)
                }
            }

            function c(c, d) {
                var e = {
                        dx: c.v,
                        dv: a(c)
                    },
                    f = b(c, .5 * d, e),
                    g = b(c, .5 * d, f),
                    h = b(c, d, g),
                    i = 1 / 6 * (e.dx + 2 * (f.dx + g.dx) + h.dx),
                    j = 1 / 6 * (e.dv + 2 * (f.dv + g.dv) + h.dv);
                return c.x = c.x + i * d, c.v = c.v + j * d, c
            }
            return function d(a, b, e) {
                var f, g, h, i = {
                        x: -1,
                        v: 0,
                        tension: null,
                        friction: null
                    },
                    j = [0],
                    k = 0;
                for (a = parseFloat(a) || 500, b = parseFloat(b) || 20, e = e || null, i.tension = a, i.friction = b, f = null !== e, f ? (k = d(a, b), g = k / e * .016) : g = .016;;)
                    if (h = c(h || i, g), j.push(1 + h.x), k += 16, !(Math.abs(h.x) > 1e-4 && Math.abs(h.v) > 1e-4)) break;
                return f ? function(a) {
                    return j[a * (j.length - 1) | 0]
                } : k
            }
        }();
        y.Easings = {
            linear: function(a) {
                return a
            },
            swing: function(a) {
                return .5 - Math.cos(a * Math.PI) / 2
            },
            spring: function(a) {
                return 1 - Math.cos(4.5 * a * Math.PI) * Math.exp(6 * -a)
            }
        }, o.each([
            ["ease", [.25, .1, .25, 1]],
            ["ease-in", [.42, 0, 1, 1]],
            ["ease-out", [0, 0, .58, 1]],
            ["ease-in-out", [.42, 0, .58, 1]],
            ["easeInSine", [.47, 0, .745, .715]],
            ["easeOutSine", [.39, .575, .565, 1]],
            ["easeInOutSine", [.445, .05, .55, .95]],
            ["easeInQuad", [.55, .085, .68, .53]],
            ["easeOutQuad", [.25, .46, .45, .94]],
            ["easeInOutQuad", [.455, .03, .515, .955]],
            ["easeInCubic", [.55, .055, .675, .19]],
            ["easeOutCubic", [.215, .61, .355, 1]],
            ["easeInOutCubic", [.645, .045, .355, 1]],
            ["easeInQuart", [.895, .03, .685, .22]],
            ["easeOutQuart", [.165, .84, .44, 1]],
            ["easeInOutQuart", [.77, 0, .175, 1]],
            ["easeInQuint", [.755, .05, .855, .06]],
            ["easeOutQuint", [.23, 1, .32, 1]],
            ["easeInOutQuint", [.86, 0, .07, 1]],
            ["easeInExpo", [.95, .05, .795, .035]],
            ["easeOutExpo", [.19, 1, .22, 1]],
            ["easeInOutExpo", [1, 0, 0, 1]],
            ["easeInCirc", [.6, .04, .98, .335]],
            ["easeOutCirc", [.075, .82, .165, 1]],
            ["easeInOutCirc", [.785, .135, .15, .86]]
        ], function(a, b) {
            y.Easings[b[0]] = k.apply(null, b[1])
        });
        var A = y.CSS = {
            RegEx: {
                isHex: /^#([A-f\d]{3}){1,2}$/i,
                valueUnwrap: /^[A-z]+\((.*)\)$/i,
                wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
            },
            Lists: {
                colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"],
                units: ["%", "em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax", "cm", "mm", "Q", "in", "pc", "pt", "px", "deg", "grad", "rad", "turn", "s", "ms"],
                colorNames: {
                    aliceblue: "240,248,255",
                    antiquewhite: "250,235,215",
                    aquamarine: "127,255,212",
                    aqua: "0,255,255",
                    azure: "240,255,255",
                    beige: "245,245,220",
                    bisque: "255,228,196",
                    black: "0,0,0",
                    blanchedalmond: "255,235,205",
                    blueviolet: "138,43,226",
                    blue: "0,0,255",
                    brown: "165,42,42",
                    burlywood: "222,184,135",
                    cadetblue: "95,158,160",
                    chartreuse: "127,255,0",
                    chocolate: "210,105,30",
                    coral: "255,127,80",
                    cornflowerblue: "100,149,237",
                    cornsilk: "255,248,220",
                    crimson: "220,20,60",
                    cyan: "0,255,255",
                    darkblue: "0,0,139",
                    darkcyan: "0,139,139",
                    darkgoldenrod: "184,134,11",
                    darkgray: "169,169,169",
                    darkgrey: "169,169,169",
                    darkgreen: "0,100,0",
                    darkkhaki: "189,183,107",
                    darkmagenta: "139,0,139",
                    darkolivegreen: "85,107,47",
                    darkorange: "255,140,0",
                    darkorchid: "153,50,204",
                    darkred: "139,0,0",
                    darksalmon: "233,150,122",
                    darkseagreen: "143,188,143",
                    darkslateblue: "72,61,139",
                    darkslategray: "47,79,79",
                    darkturquoise: "0,206,209",
                    darkviolet: "148,0,211",
                    deeppink: "255,20,147",
                    deepskyblue: "0,191,255",
                    dimgray: "105,105,105",
                    dimgrey: "105,105,105",
                    dodgerblue: "30,144,255",
                    firebrick: "178,34,34",
                    floralwhite: "255,250,240",
                    forestgreen: "34,139,34",
                    fuchsia: "255,0,255",
                    gainsboro: "220,220,220",
                    ghostwhite: "248,248,255",
                    gold: "255,215,0",
                    goldenrod: "218,165,32",
                    gray: "128,128,128",
                    grey: "128,128,128",
                    greenyellow: "173,255,47",
                    green: "0,128,0",
                    honeydew: "240,255,240",
                    hotpink: "255,105,180",
                    indianred: "205,92,92",
                    indigo: "75,0,130",
                    ivory: "255,255,240",
                    khaki: "240,230,140",
                    lavenderblush: "255,240,245",
                    lavender: "230,230,250",
                    lawngreen: "124,252,0",
                    lemonchiffon: "255,250,205",
                    lightblue: "173,216,230",
                    lightcoral: "240,128,128",
                    lightcyan: "224,255,255",
                    lightgoldenrodyellow: "250,250,210",
                    lightgray: "211,211,211",
                    lightgrey: "211,211,211",
                    lightgreen: "144,238,144",
                    lightpink: "255,182,193",
                    lightsalmon: "255,160,122",
                    lightseagreen: "32,178,170",
                    lightskyblue: "135,206,250",
                    lightslategray: "119,136,153",
                    lightsteelblue: "176,196,222",
                    lightyellow: "255,255,224",
                    limegreen: "50,205,50",
                    lime: "0,255,0",
                    linen: "250,240,230",
                    magenta: "255,0,255",
                    maroon: "128,0,0",
                    mediumaquamarine: "102,205,170",
                    mediumblue: "0,0,205",
                    mediumorchid: "186,85,211",
                    mediumpurple: "147,112,219",
                    mediumseagreen: "60,179,113",
                    mediumslateblue: "123,104,238",
                    mediumspringgreen: "0,250,154",
                    mediumturquoise: "72,209,204",
                    mediumvioletred: "199,21,133",
                    midnightblue: "25,25,112",
                    mintcream: "245,255,250",
                    mistyrose: "255,228,225",
                    moccasin: "255,228,181",
                    navajowhite: "255,222,173",
                    navy: "0,0,128",
                    oldlace: "253,245,230",
                    olivedrab: "107,142,35",
                    olive: "128,128,0",
                    orangered: "255,69,0",
                    orange: "255,165,0",
                    orchid: "218,112,214",
                    palegoldenrod: "238,232,170",
                    palegreen: "152,251,152",
                    paleturquoise: "175,238,238",
                    palevioletred: "219,112,147",
                    papayawhip: "255,239,213",
                    peachpuff: "255,218,185",
                    peru: "205,133,63",
                    pink: "255,192,203",
                    plum: "221,160,221",
                    powderblue: "176,224,230",
                    purple: "128,0,128",
                    red: "255,0,0",
                    rosybrown: "188,143,143",
                    royalblue: "65,105,225",
                    saddlebrown: "139,69,19",
                    salmon: "250,128,114",
                    sandybrown: "244,164,96",
                    seagreen: "46,139,87",
                    seashell: "255,245,238",
                    sienna: "160,82,45",
                    silver: "192,192,192",
                    skyblue: "135,206,235",
                    slateblue: "106,90,205",
                    slategray: "112,128,144",
                    snow: "255,250,250",
                    springgreen: "0,255,127",
                    steelblue: "70,130,180",
                    tan: "210,180,140",
                    teal: "0,128,128",
                    thistle: "216,191,216",
                    tomato: "255,99,71",
                    turquoise: "64,224,208",
                    violet: "238,130,238",
                    wheat: "245,222,179",
                    whitesmoke: "245,245,245",
                    white: "255,255,255",
                    yellowgreen: "154,205,50",
                    yellow: "255,255,0"
                }
            },
            Hooks: {
                templates: {
                    textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                    boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                    clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                    backgroundPosition: ["X Y", "0% 0%"],
                    transformOrigin: ["X Y Z", "50% 50% 0px"],
                    perspectiveOrigin: ["X Y", "50% 50%"]
                },
                registered: {},
                register: function() {
                    for (var a = 0; a < A.Lists.colors.length; a++) {
                        var b = "color" === A.Lists.colors[a] ? "0 0 0 1" : "255 255 255 1";
                        A.Hooks.templates[A.Lists.colors[a]] = ["Red Green Blue Alpha", b]
                    }
                    var c, d, e;
                    if (p)
                        for (c in A.Hooks.templates)
                            if (A.Hooks.templates.hasOwnProperty(c)) {
                                d = A.Hooks.templates[c], e = d[0].split(" ");
                                var f = d[1].match(A.RegEx.valueSplit);
                                "Color" === e[0] && (e.push(e.shift()), f.push(f.shift()), A.Hooks.templates[c] = [e.join(" "), f.join(" ")])
                            }
                    for (c in A.Hooks.templates)
                        if (A.Hooks.templates.hasOwnProperty(c)) {
                            d = A.Hooks.templates[c], e = d[0].split(" ");
                            for (var g in e)
                                if (e.hasOwnProperty(g)) {
                                    var h = c + e[g],
                                        i = g;
                                    A.Hooks.registered[h] = [c, i]
                                }
                        }
                },
                getRoot: function(a) {
                    var b = A.Hooks.registered[a];
                    return b ? b[0] : a
                },
                getUnit: function(a, b) {
                    var c = (a.substr(b || 0, 5).match(/^[a-z%]+/) || [])[0] || "";
                    return c && t(A.Lists.units, c) ? c : ""
                },
                fixColors: function(a) {
                    return a.replace(/(rgba?\(\s*)?(\b[a-z]+\b)/g, function(a, b, c) {
                        return A.Lists.colorNames.hasOwnProperty(c) ? (b ? b : "rgba(") + A.Lists.colorNames[c] + (b ? "" : ",1)") : b + c
                    })
                },
                cleanRootPropertyValue: function(a, b) {
                    return A.RegEx.valueUnwrap.test(b) && (b = b.match(A.RegEx.valueUnwrap)[1]), A.Values.isCSSNullValue(b) && (b = A.Hooks.templates[a][1]), b
                },
                extractValue: function(a, b) {
                    var c = A.Hooks.registered[a];
                    if (c) {
                        var d = c[0],
                            e = c[1];
                        return b = A.Hooks.cleanRootPropertyValue(d, b), b.toString().match(A.RegEx.valueSplit)[e]
                    }
                    return b
                },
                injectValue: function(a, b, c) {
                    var d = A.Hooks.registered[a];
                    if (d) {
                        var e, f = d[0],
                            g = d[1];
                        return c = A.Hooks.cleanRootPropertyValue(f, c), e = c.toString().match(A.RegEx.valueSplit), e[g] = b, e.join(" ")
                    }
                    return c
                }
            },
            Normalizations: {
                registered: {
                    clip: function(a, b, c) {
                        switch (a) {
                            case "name":
                                return "clip";
                            case "extract":
                                var d;
                                return A.RegEx.wrappedValueAlreadyExtracted.test(c) ? d = c : (d = c.toString().match(A.RegEx.valueUnwrap), d = d ? d[1].replace(/,(\s+)?/g, " ") : c), d;
                            case "inject":
                                return "rect(" + c + ")"
                        }
                    },
                    blur: function(a, b, c) {
                        switch (a) {
                            case "name":
                                return y.State.isFirefox ? "filter" : "-webkit-filter";
                            case "extract":
                                var d = parseFloat(c);
                                if (!d && 0 !== d) {
                                    var e = c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                    d = e ? e[1] : 0
                                }
                                return d;
                            case "inject":
                                return parseFloat(c) ? "blur(" + c + ")" : "none"
                        }
                    },
                    opacity: function(a, b, c) {
                        if (p <= 8) switch (a) {
                            case "name":
                                return "filter";
                            case "extract":
                                var d = c.toString().match(/alpha\(opacity=(.*)\)/i);
                                return c = d ? d[1] / 100 : 1;
                            case "inject":
                                return b.style.zoom = 1, parseFloat(c) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(c), 10) + ")"
                        } else switch (a) {
                            case "name":
                                return "opacity";
                            case "extract":
                                return c;
                            case "inject":
                                return c
                        }
                    }
                },
                register: function() {
                    function a(a, b, c) {
                        if ("border-box" === A.getPropertyValue(b, "boxSizing").toString().toLowerCase() === (c || !1)) {
                            var d, e, f = 0,
                                g = "width" === a ? ["Left", "Right"] : ["Top", "Bottom"],
                                h = ["padding" + g[0], "padding" + g[1], "border" + g[0] + "Width", "border" + g[1] + "Width"];
                            for (d = 0; d < h.length; d++) e = parseFloat(A.getPropertyValue(b, h[d])), isNaN(e) || (f += e);
                            return c ? -f : f
                        }
                        return 0
                    }

                    function b(b, c) {
                        return function(d, e, f) {
                            switch (d) {
                                case "name":
                                    return b;
                                case "extract":
                                    return parseFloat(f) + a(b, e, c);
                                case "inject":
                                    return parseFloat(f) - a(b, e, c) + "px"
                            }
                        }
                    }
                    p && !(p > 9) || y.State.isGingerbread || (A.Lists.transformsBase = A.Lists.transformsBase.concat(A.Lists.transforms3D));
                    for (var c = 0; c < A.Lists.transformsBase.length; c++) ! function() {
                        var a = A.Lists.transformsBase[c];
                        A.Normalizations.registered[a] = function(b, c, e) {
                            switch (b) {
                                case "name":
                                    return "transform";
                                case "extract":
                                    return g(c) === d || g(c).transformCache[a] === d ? /^scale/i.test(a) ? 1 : 0 : g(c).transformCache[a].replace(/[()]/g, "");
                                case "inject":
                                    var f = !1;
                                    switch (a.substr(0, a.length - 1)) {
                                        case "translate":
                                            f = !/(%|px|em|rem|vw|vh|\d)$/i.test(e);
                                            break;
                                        case "scal":
                                        case "scale":
                                            y.State.isAndroid && g(c).transformCache[a] === d && e < 1 && (e = 1), f = !/(\d)$/i.test(e);
                                            break;
                                        case "skew":
                                            f = !/(deg|\d)$/i.test(e);
                                            break;
                                        case "rotate":
                                            f = !/(deg|\d)$/i.test(e)
                                    }
                                    return f || (g(c).transformCache[a] = "(" + e + ")"), g(c).transformCache[a]
                            }
                        }
                    }();
                    for (var e = 0; e < A.Lists.colors.length; e++) ! function() {
                        var a = A.Lists.colors[e];
                        A.Normalizations.registered[a] = function(b, c, e) {
                            switch (b) {
                                case "name":
                                    return a;
                                case "extract":
                                    var f;
                                    if (A.RegEx.wrappedValueAlreadyExtracted.test(e)) f = e;
                                    else {
                                        var g, h = {
                                            black: "rgb(0, 0, 0)",
                                            blue: "rgb(0, 0, 255)",
                                            gray: "rgb(128, 128, 128)",
                                            green: "rgb(0, 128, 0)",
                                            red: "rgb(255, 0, 0)",
                                            white: "rgb(255, 255, 255)"
                                        };
                                        /^[A-z]+$/i.test(e) ? g = h[e] !== d ? h[e] : h.black : A.RegEx.isHex.test(e) ? g = "rgb(" + A.Values.hexToRgb(e).join(" ") + ")" : /^rgba?\(/i.test(e) || (g = h.black), f = (g || e).toString().match(A.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                    }
                                    return (!p || p > 8) && 3 === f.split(" ").length && (f += " 1"), f;
                                case "inject":
                                    return /^rgb/.test(e) ? e : (p <= 8 ? 4 === e.split(" ").length && (e = e.split(/\s+/).slice(0, 3).join(" ")) : 3 === e.split(" ").length && (e += " 1"), (p <= 8 ? "rgb" : "rgba") + "(" + e.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")")
                            }
                        }
                    }();
                    A.Normalizations.registered.innerWidth = b("width", !0), A.Normalizations.registered.innerHeight = b("height", !0), A.Normalizations.registered.outerWidth = b("width"), A.Normalizations.registered.outerHeight = b("height")
                }
            },
            Names: {
                camelCase: function(a) {
                    return a.replace(/-(\w)/g, function(a, b) {
                        return b.toUpperCase()
                    })
                },
                SVGAttribute: function(a) {
                    var b = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                    return (p || y.State.isAndroid && !y.State.isChrome) && (b += "|transform"), new RegExp("^(" + b + ")$", "i").test(a)
                },
                prefixCheck: function(a) {
                    if (y.State.prefixMatches[a]) return [y.State.prefixMatches[a], !0];
                    for (var b = ["", "Webkit", "Moz", "ms", "O"], c = 0, d = b.length; c < d; c++) {
                        var e;
                        if (e = 0 === c ? a : b[c] + a.replace(/^\w/, function(a) {
                                return a.toUpperCase()
                            }), u.isString(y.State.prefixElement.style[e])) return y.State.prefixMatches[a] = e, [e, !0]
                    }
                    return [a, !1]
                }
            },
            Values: {
                hexToRgb: function(a) {
                    var b, c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                    return a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(a, b, c, d) {
                        return b + b + c + c + d + d
                    }), b = c.exec(a), b ? [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)] : [0, 0, 0]
                },
                isCSSNullValue: function(a) {
                    return !a || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)
                },
                getUnitType: function(a) {
                    return /^(rotate|skew)/i.test(a) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a) ? "" : "px"
                },
                getDisplayType: function(a) {
                    var b = a && a.tagName.toString().toLowerCase();
                    return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b) ? "inline" : /^(li)$/i.test(b) ? "list-item" : /^(tr)$/i.test(b) ? "table-row" : /^(table)$/i.test(b) ? "table" : /^(tbody)$/i.test(b) ? "table-row-group" : "block"
                },
                addClass: function(a, b) {
                    if (a)
                        if (a.classList) a.classList.add(b);
                        else if (u.isString(a.className)) a.className += (a.className.length ? " " : "") + b;
                    else {
                        var c = a.getAttribute(p <= 7 ? "className" : "class") || "";
                        a.setAttribute("class", c + (c ? " " : "") + b)
                    }
                },
                removeClass: function(a, b) {
                    if (a)
                        if (a.classList) a.classList.remove(b);
                        else if (u.isString(a.className)) a.className = a.className.toString().replace(new RegExp("(^|\\s)" + b.split(" ").join("|") + "(\\s|$)", "gi"), " ");
                    else {
                        var c = a.getAttribute(p <= 7 ? "className" : "class") || "";
                        a.setAttribute("class", c.replace(new RegExp("(^|s)" + b.split(" ").join("|") + "(s|$)", "gi"), " "))
                    }
                }
            },
            getPropertyValue: function(a, c, e, f) {
                function h(a, c) {
                    var e = 0;
                    if (p <= 8) e = o.css(a, c);
                    else {
                        var i = !1;
                        /^(width|height)$/.test(c) && 0 === A.getPropertyValue(a, "display") && (i = !0, A.setPropertyValue(a, "display", A.Values.getDisplayType(a)));
                        var j = function() {
                            i && A.setPropertyValue(a, "display", "none")
                        };
                        if (!f) {
                            if ("height" === c && "border-box" !== A.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
                                var k = a.offsetHeight - (parseFloat(A.getPropertyValue(a, "borderTopWidth")) || 0) - (parseFloat(A.getPropertyValue(a, "borderBottomWidth")) || 0) - (parseFloat(A.getPropertyValue(a, "paddingTop")) || 0) - (parseFloat(A.getPropertyValue(a, "paddingBottom")) || 0);
                                return j(), k
                            }
                            if ("width" === c && "border-box" !== A.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
                                var l = a.offsetWidth - (parseFloat(A.getPropertyValue(a, "borderLeftWidth")) || 0) - (parseFloat(A.getPropertyValue(a, "borderRightWidth")) || 0) - (parseFloat(A.getPropertyValue(a, "paddingLeft")) || 0) - (parseFloat(A.getPropertyValue(a, "paddingRight")) || 0);
                                return j(), l
                            }
                        }
                        var m;
                        m = g(a) === d ? b.getComputedStyle(a, null) : g(a).computedStyle ? g(a).computedStyle : g(a).computedStyle = b.getComputedStyle(a, null), "borderColor" === c && (c = "borderTopColor"), e = 9 === p && "filter" === c ? m.getPropertyValue(c) : m[c], "" !== e && null !== e || (e = a.style[c]), j()
                    }
                    if ("auto" === e && /^(top|right|bottom|left)$/i.test(c)) {
                        var n = h(a, "position");
                        ("fixed" === n || "absolute" === n && /top|left/i.test(c)) && (e = o(a).position()[c] + "px")
                    }
                    return e
                }
                var i;
                if (A.Hooks.registered[c]) {
                    var j = c,
                        k = A.Hooks.getRoot(j);
                    e === d && (e = A.getPropertyValue(a, A.Names.prefixCheck(k)[0])), A.Normalizations.registered[k] && (e = A.Normalizations.registered[k]("extract", a, e)), i = A.Hooks.extractValue(j, e)
                } else if (A.Normalizations.registered[c]) {
                    var l, m;
                    l = A.Normalizations.registered[c]("name", a), "transform" !== l && (m = h(a, A.Names.prefixCheck(l)[0]), A.Values.isCSSNullValue(m) && A.Hooks.templates[c] && (m = A.Hooks.templates[c][1])), i = A.Normalizations.registered[c]("extract", a, m)
                }
                if (!/^[\d-]/.test(i)) {
                    var n = g(a);
                    if (n && n.isSVG && A.Names.SVGAttribute(c))
                        if (/^(height|width)$/i.test(c)) try {
                            i = a.getBBox()[c]
                        } catch (q) {
                            i = 0
                        } else i = a.getAttribute(c);
                        else i = h(a, A.Names.prefixCheck(c)[0])
                }
                return A.Values.isCSSNullValue(i) && (i = 0), y.debug >= 2 && console.log("Get " + c + ": " + i), i
            },
            setPropertyValue: function(a, c, d, e, f) {
                var h = c;
                if ("scroll" === c) f.container ? f.container["scroll" + f.direction] = d : "Left" === f.direction ? b.scrollTo(d, f.alternateValue) : b.scrollTo(f.alternateValue, d);
                else if (A.Normalizations.registered[c] && "transform" === A.Normalizations.registered[c]("name", a)) A.Normalizations.registered[c]("inject", a, d), h = "transform", d = g(a).transformCache[c];
                else {
                    if (A.Hooks.registered[c]) {
                        var i = c,
                            j = A.Hooks.getRoot(c);
                        e = e || A.getPropertyValue(a, j), d = A.Hooks.injectValue(i, d, e), c = j
                    }
                    if (A.Normalizations.registered[c] && (d = A.Normalizations.registered[c]("inject", a, d), c = A.Normalizations.registered[c]("name", a)), h = A.Names.prefixCheck(c)[0], p <= 8) try {
                        a.style[h] = d
                    } catch (l) {
                        y.debug && console.log("Browser does not support [" + d + "] for [" + h + "]")
                    } else {
                        var k = g(a);
                        k && k.isSVG && A.Names.SVGAttribute(c) ? a.setAttribute(c, d) : a.style[h] = d
                    }
                    y.debug >= 2 && console.log("Set " + c + " (" + h + "): " + d)
                }
                return [h, d]
            },
            flushTransformCache: function(a) {
                var b = "",
                    c = g(a);
                if ((p || y.State.isAndroid && !y.State.isChrome) && c && c.isSVG) {
                    var d = function(b) {
                            return parseFloat(A.getPropertyValue(a, b))
                        },
                        e = {
                            translate: [d("translateX"), d("translateY")],
                            skewX: [d("skewX")],
                            skewY: [d("skewY")],
                            scale: 1 !== d("scale") ? [d("scale"), d("scale")] : [d("scaleX"), d("scaleY")],
                            rotate: [d("rotateZ"), 0, 0]
                        };
                    o.each(g(a).transformCache, function(a) {
                        /^translate/i.test(a) ? a = "translate" : /^scale/i.test(a) ? a = "scale" : /^rotate/i.test(a) && (a = "rotate"), e[a] && (b += a + "(" + e[a].join(" ") + ") ", delete e[a])
                    })
                } else {
                    var f, h;
                    o.each(g(a).transformCache, function(c) {
                        if (f = g(a).transformCache[c], "transformPerspective" === c) return h = f, !0;
                        9 === p && "rotateZ" === c && (c = "rotate"), b += c + f + " "
                    }), h && (b = "perspective" + h + " " + b)
                }
                A.setPropertyValue(a, "transform", b)
            }
        };
        A.Hooks.register(), A.Normalizations.register(), y.hook = function(a, b, c) {
            var e;
            return a = f(a), o.each(a, function(a, f) {
                if (g(f) === d && y.init(f), c === d) e === d && (e = A.getPropertyValue(f, b));
                else {
                    var h = A.setPropertyValue(f, b, c);
                    "transform" === h[0] && y.CSS.flushTransformCache(f), e = h
                }
            }), e
        };
        var B = function() {
            function a() {
                return k ? z.promise || null : p
            }

            function e(a, e) {
                function f(f) {
                    var k, n;
                    if (i.begin && 0 === D) try {
                        i.begin.call(r, r)
                    } catch (V) {
                        setTimeout(function() {
                            throw V
                        }, 1)
                    }
                    if ("scroll" === G) {
                        var p, q, w, x = /^x$/i.test(i.axis) ? "Left" : "Top",
                            B = parseFloat(i.offset) || 0;
                        i.container ? u.isWrapped(i.container) || u.isNode(i.container) ? (i.container = i.container[0] || i.container, p = i.container["scroll" + x], w = p + o(a).position()[x.toLowerCase()] + B) : i.container = null : (p = y.State.scrollAnchor[y.State["scrollProperty" + x]], q = y.State.scrollAnchor[y.State["scrollProperty" + ("Left" === x ? "Top" : "Left")]], w = o(a).offset()[x.toLowerCase()] + B), j = {
                            scroll: {
                                rootPropertyValue: !1,
                                startValue: p,
                                currentValue: p,
                                endValue: w,
                                unitType: "",
                                easing: i.easing,
                                scrollData: {
                                    container: i.container,
                                    direction: x,
                                    alternateValue: q
                                }
                            },
                            element: a
                        }, y.debug && console.log("tweensContainer (scroll): ", j.scroll, a)
                    } else if ("reverse" === G) {
                        if (!(k = g(a))) return;
                        if (!k.tweensContainer) return void o.dequeue(a, i.queue);
                        "none" === k.opts.display && (k.opts.display = "auto"), "hidden" === k.opts.visibility && (k.opts.visibility = "visible"), k.opts.loop = !1, k.opts.begin = null, k.opts.complete = null, v.easing || delete i.easing, v.duration || delete i.duration, i = o.extend({}, k.opts, i), n = o.extend(!0, {}, k ? k.tweensContainer : null);
                        for (var E in n)
                            if (n.hasOwnProperty(E) && "element" !== E) {
                                var F = n[E].startValue;
                                n[E].startValue = n[E].currentValue = n[E].endValue, n[E].endValue = F, u.isEmptyObject(v) || (n[E].easing = i.easing), y.debug && console.log("reverse tweensContainer (" + E + "): " + JSON.stringify(n[E]), a)
                            }
                        j = n
                    } else if ("start" === G) {
                        k = g(a), k && k.tweensContainer && k.isAnimating === !0 && (n = k.tweensContainer);
                        var H = function(e, f) {
                            var g, l = A.Hooks.getRoot(e),
                                m = !1,
                                p = f[0],
                                q = f[1],
                                r = f[2];
                            if (!(k && k.isSVG || "tween" === l || A.Names.prefixCheck(l)[1] !== !1 || A.Normalizations.registered[l] !== d)) return void(y.debug && console.log("Skipping [" + l + "] due to a lack of browser support."));
                            (i.display !== d && null !== i.display && "none" !== i.display || i.visibility !== d && "hidden" !== i.visibility) && /opacity|filter/.test(e) && !r && 0 !== p && (r = 0), i._cacheValues && n && n[e] ? (r === d && (r = n[e].endValue + n[e].unitType), m = k.rootPropertyValueCache[l]) : A.Hooks.registered[e] ? r === d ? (m = A.getPropertyValue(a, l), r = A.getPropertyValue(a, e, m)) : m = A.Hooks.templates[l][1] : r === d && (r = A.getPropertyValue(a, e));
                            var s, t, v, w = !1,
                                x = function(a, b) {
                                    var c, d;
                                    return d = (b || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(a) {
                                        return c = a, ""
                                    }), c || (c = A.Values.getUnitType(a)), [d, c]
                                };
                            if (r !== p && u.isString(r) && u.isString(p)) {
                                g = "";
                                var z = 0,
                                    B = 0,
                                    C = [],
                                    D = [],
                                    E = 0,
                                    F = 0,
                                    G = 0;
                                for (r = A.Hooks.fixColors(r), p = A.Hooks.fixColors(p); z < r.length && B < p.length;) {
                                    var H = r[z],
                                        I = p[B];
                                    if (/[\d\.-]/.test(H) && /[\d\.-]/.test(I)) {
                                        for (var J = H, K = I, L = ".", N = "."; ++z < r.length;) {
                                            if ((H = r[z]) === L) L = "..";
                                            else if (!/\d/.test(H)) break;
                                            J += H
                                        }
                                        for (; ++B < p.length;) {
                                            if ((I = p[B]) === N) N = "..";
                                            else if (!/\d/.test(I)) break;
                                            K += I
                                        }
                                        var O = A.Hooks.getUnit(r, z),
                                            P = A.Hooks.getUnit(p, B);
                                        if (z += O.length, B += P.length, O === P) J === K ? g += J + O : (g += "{" + C.length + (F ? "!" : "") + "}" + O, C.push(parseFloat(J)), D.push(parseFloat(K)));
                                        else {
                                            var Q = parseFloat(J),
                                                R = parseFloat(K);
                                            g += (E < 5 ? "calc" : "") + "(" + (Q ? "{" + C.length + (F ? "!" : "") + "}" : "0") + O + " + " + (R ? "{" + (C.length + (Q ? 1 : 0)) + (F ? "!" : "") + "}" : "0") + P + ")", Q && (C.push(Q), D.push(0)), R && (C.push(0), D.push(R))
                                        }
                                    } else {
                                        if (H !== I) {
                                            E = 0;
                                            break
                                        }
                                        g += H, z++, B++, 0 === E && "c" === H || 1 === E && "a" === H || 2 === E && "l" === H || 3 === E && "c" === H || E >= 4 && "(" === H ? E++ : (E && E < 5 || E >= 4 && ")" === H && --E < 5) && (E = 0), 0 === F && "r" === H || 1 === F && "g" === H || 2 === F && "b" === H || 3 === F && "a" === H || F >= 3 && "(" === H ? (3 === F && "a" === H && (G = 1), F++) : G && "," === H ? ++G > 3 && (F = G = 0) : (G && F < (G ? 5 : 4) || F >= (G ? 4 : 3) && ")" === H && --F < (G ? 5 : 4)) && (F = G = 0)
                                    }
                                }
                                z === r.length && B === p.length || (y.debug && console.error('Trying to pattern match mis-matched strings ["' + p + '", "' + r + '"]'), g = d), g && (C.length ? (y.debug && console.log('Pattern found "' + g + '" -> ', C, D, "[" + r + "," + p + "]"), r = C, p = D, t = v = "") : g = d)
                            }
                            g || (s = x(e, r), r = s[0], v = s[1], s = x(e, p), p = s[0].replace(/^([+-\/*])=/, function(a, b) {
                                return w = b, ""
                            }), t = s[1], r = parseFloat(r) || 0, p = parseFloat(p) || 0, "%" === t && (/^(fontSize|lineHeight)$/.test(e) ? (p /= 100, t = "em") : /^scale/.test(e) ? (p /= 100, t = "") : /(Red|Green|Blue)$/i.test(e) && (p = p / 100 * 255, t = "")));
                            if (/[\/*]/.test(w)) t = v;
                            else if (v !== t && 0 !== r)
                                if (0 === p) t = v;
                                else {
                                    h = h || function() {
                                        var d = {
                                                myParent: a.parentNode || c.body,
                                                position: A.getPropertyValue(a, "position"),
                                                fontSize: A.getPropertyValue(a, "fontSize")
                                            },
                                            e = d.position === M.lastPosition && d.myParent === M.lastParent,
                                            f = d.fontSize === M.lastFontSize;
                                        M.lastParent = d.myParent, M.lastPosition = d.position, M.lastFontSize = d.fontSize;
                                        var g = {};
                                        if (f && e) g.emToPx = M.lastEmToPx, g.percentToPxWidth = M.lastPercentToPxWidth, g.percentToPxHeight = M.lastPercentToPxHeight;
                                        else {
                                            var h = k && k.isSVG ? c.createElementNS("http://www.w3.org/2000/svg", "rect") : c.createElement("div");
                                            y.init(h), d.myParent.appendChild(h), o.each(["overflow", "overflowX", "overflowY"], function(a, b) {
                                                y.CSS.setPropertyValue(h, b, "hidden")
                                            }), y.CSS.setPropertyValue(h, "position", d.position), y.CSS.setPropertyValue(h, "fontSize", d.fontSize), y.CSS.setPropertyValue(h, "boxSizing", "content-box"), o.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(a, b) {
                                                y.CSS.setPropertyValue(h, b, "100%")
                                            }), y.CSS.setPropertyValue(h, "paddingLeft", "100em"), g.percentToPxWidth = M.lastPercentToPxWidth = (parseFloat(A.getPropertyValue(h, "width", null, !0)) || 1) / 100, g.percentToPxHeight = M.lastPercentToPxHeight = (parseFloat(A.getPropertyValue(h, "height", null, !0)) || 1) / 100, g.emToPx = M.lastEmToPx = (parseFloat(A.getPropertyValue(h, "paddingLeft")) || 1) / 100, d.myParent.removeChild(h)
                                        }
                                        return null === M.remToPx && (M.remToPx = parseFloat(A.getPropertyValue(c.body, "fontSize")) || 16), null === M.vwToPx && (M.vwToPx = parseFloat(b.innerWidth) / 100, M.vhToPx = parseFloat(b.innerHeight) / 100), g.remToPx = M.remToPx, g.vwToPx = M.vwToPx, g.vhToPx = M.vhToPx, y.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(g), a), g
                                    }();
                                    var S = /margin|padding|left|right|width|text|word|letter/i.test(e) || /X$/.test(e) || "x" === e ? "x" : "y";
                                    switch (v) {
                                        case "%":
                                            r *= "x" === S ? h.percentToPxWidth : h.percentToPxHeight;
                                            break;
                                        case "px":
                                            break;
                                        default:
                                            r *= h[v + "ToPx"]
                                    }
                                    switch (t) {
                                        case "%":
                                            r *= 1 / ("x" === S ? h.percentToPxWidth : h.percentToPxHeight);
                                            break;
                                        case "px":
                                            break;
                                        default:
                                            r *= 1 / h[t + "ToPx"]
                                    }
                                }
                            switch (w) {
                                case "+":
                                    p = r + p;
                                    break;
                                case "-":
                                    p = r - p;
                                    break;
                                case "*":
                                    p *= r;
                                    break;
                                case "/":
                                    p = r / p
                            }
                            j[e] = {
                                rootPropertyValue: m,
                                startValue: r,
                                currentValue: r,
                                endValue: p,
                                unitType: t,
                                easing: q
                            }, g && (j[e].pattern = g), y.debug && console.log("tweensContainer (" + e + "): " + JSON.stringify(j[e]), a)
                        };
                        for (var I in s)
                            if (s.hasOwnProperty(I)) {
                                var J = A.Names.camelCase(I),
                                    K = function(b, c) {
                                        var d, f, g;
                                        return u.isFunction(b) && (b = b.call(a, e, C)), u.isArray(b) ? (d = b[0], !u.isArray(b[1]) && /^[\d-]/.test(b[1]) || u.isFunction(b[1]) || A.RegEx.isHex.test(b[1]) ? g = b[1] : u.isString(b[1]) && !A.RegEx.isHex.test(b[1]) && y.Easings[b[1]] || u.isArray(b[1]) ? (f = c ? b[1] : l(b[1], i.duration), g = b[2]) : g = b[1] || b[2]) : d = b, c || (f = f || i.easing), u.isFunction(d) && (d = d.call(a, e, C)), u.isFunction(g) && (g = g.call(a, e, C)), [d || 0, f, g]
                                    }(s[I]);
                                if (t(A.Lists.colors, J)) {
                                    var L = K[0],
                                        O = K[1],
                                        P = K[2];
                                    if (A.RegEx.isHex.test(L)) {
                                        for (var Q = ["Red", "Green", "Blue"], R = A.Values.hexToRgb(L), S = P ? A.Values.hexToRgb(P) : d, T = 0; T < Q.length; T++) {
                                            var U = [R[T]];
                                            O && U.push(O), S !== d && U.push(S[T]), H(J + Q[T], U)
                                        }
                                        continue
                                    }
                                }
                                H(J, K)
                            }
                        j.element = a
                    }
                    j.element && (A.Values.addClass(a, "velocity-animating"), N.push(j), k = g(a), k && ("" === i.queue && (k.tweensContainer = j, k.opts = i), k.isAnimating = !0), D === C - 1 ? (y.State.calls.push([N, r, i, null, z.resolver, null, 0]), y.State.isTicking === !1 && (y.State.isTicking = !0, m())) : D++)
                }
                var h, i = o.extend({}, y.defaults, v),
                    j = {};
                switch (g(a) === d && y.init(a), parseFloat(i.delay) && i.queue !== !1 && o.queue(a, i.queue, function(b) {
                    y.velocityQueueEntryFlag = !0;
                    var c = y.State.delayedElements.count++;
                    y.State.delayedElements[c] = a;
                    var d = function(a) {
                        return function() {
                            y.State.delayedElements[a] = !1, b()
                        }
                    }(c);
                    g(a).delayBegin = (new Date).getTime(), g(a).delay = parseFloat(i.delay), g(a).delayTimer = {
                        setTimeout: setTimeout(b, parseFloat(i.delay)),
                        next: d
                    }
                }), i.duration.toString().toLowerCase()) {
                    case "fast":
                        i.duration = 200;
                        break;
                    case "normal":
                        i.duration = w;
                        break;
                    case "slow":
                        i.duration = 600;
                        break;
                    default:
                        i.duration = parseFloat(i.duration) || 1
                }
                if (y.mock !== !1 && (y.mock === !0 ? i.duration = i.delay = 1 : (i.duration *= parseFloat(y.mock) || 1, i.delay *= parseFloat(y.mock) || 1)), i.easing = l(i.easing, i.duration), i.begin && !u.isFunction(i.begin) && (i.begin = null), i.progress && !u.isFunction(i.progress) && (i.progress = null), i.complete && !u.isFunction(i.complete) && (i.complete = null), i.display !== d && null !== i.display && (i.display = i.display.toString().toLowerCase(), "auto" === i.display && (i.display = y.CSS.Values.getDisplayType(a))), i.visibility !== d && null !== i.visibility && (i.visibility = i.visibility.toString().toLowerCase()), i.mobileHA = i.mobileHA && y.State.isMobile && !y.State.isGingerbread, i.queue === !1)
                    if (i.delay) {
                        var k = y.State.delayedElements.count++;
                        y.State.delayedElements[k] = a;
                        var n = function(a) {
                            return function() {
                                y.State.delayedElements[a] = !1, f()
                            }
                        }(k);
                        g(a).delayBegin = (new Date).getTime(), g(a).delay = parseFloat(i.delay), g(a).delayTimer = {
                            setTimeout: setTimeout(f, parseFloat(i.delay)),
                            next: n
                        }
                    } else f();
                else o.queue(a, i.queue, function(a, b) {
                    if (b === !0) return z.promise && z.resolver(r), !0;
                    y.velocityQueueEntryFlag = !0, f(a)
                });
                "" !== i.queue && "fx" !== i.queue || "inprogress" === o.queue(a)[0] || o.dequeue(a)
            }
            var j, k, p, q, r, s, v, x = arguments[0] && (arguments[0].p || o.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || u.isString(arguments[0].properties));
            u.isWrapped(this) ? (k = !1, q = 0, r = this, p = this) : (k = !0, q = 1, r = x ? arguments[0].elements || arguments[0].e : arguments[0]);
            var z = {
                promise: null,
                resolver: null,
                rejecter: null
            };
            if (k && y.Promise && (z.promise = new y.Promise(function(a, b) {
                    z.resolver = a, z.rejecter = b
                })), x ? (s = arguments[0].properties || arguments[0].p, v = arguments[0].options || arguments[0].o) : (s = arguments[q], v = arguments[q + 1]), !(r = f(r))) return void(z.promise && (s && v && v.promiseRejectEmpty === !1 ? z.resolver() : z.rejecter()));
            var C = r.length,
                D = 0;
            if (!/^(stop|finish|finishAll|pause|resume)$/i.test(s) && !o.isPlainObject(v)) {
                var E = q + 1;
                v = {};
                for (var F = E; F < arguments.length; F++) u.isArray(arguments[F]) || !/^(fast|normal|slow)$/i.test(arguments[F]) && !/^\d/.test(arguments[F]) ? u.isString(arguments[F]) || u.isArray(arguments[F]) ? v.easing = arguments[F] : u.isFunction(arguments[F]) && (v.complete = arguments[F]) : v.duration = arguments[F]
            }
            var G;
            switch (s) {
                case "scroll":
                    G = "scroll";
                    break;
                case "reverse":
                    G = "reverse";
                    break;
                case "pause":
                    var H = (new Date).getTime();
                    return o.each(r, function(a, b) {
                        h(b, H)
                    }), o.each(y.State.calls, function(a, b) {
                        var c = !1;
                        b && o.each(b[1], function(a, e) {
                            var f = v === d ? "" : v;
                            return f !== !0 && b[2].queue !== f && (v !== d || b[2].queue !== !1) || (o.each(r, function(a, d) {
                                if (d === e) return b[5] = {
                                    resume: !1
                                }, c = !0, !1
                            }), !c && void 0)
                        })
                    }), a();
                case "resume":
                    return o.each(r, function(a, b) {
                        i(b, H)
                    }), o.each(y.State.calls, function(a, b) {
                        var c = !1;
                        b && o.each(b[1], function(a, e) {
                            var f = v === d ? "" : v;
                            return f !== !0 && b[2].queue !== f && (v !== d || b[2].queue !== !1) || (!b[5] || (o.each(r, function(a, d) {
                                if (d === e) return b[5].resume = !0, c = !0, !1
                            }), !c && void 0))
                        })
                    }), a();
                case "finish":
                case "finishAll":
                case "stop":
                    o.each(r, function(a, b) {
                        g(b) && g(b).delayTimer && (clearTimeout(g(b).delayTimer.setTimeout), g(b).delayTimer.next && g(b).delayTimer.next(), delete g(b).delayTimer), "finishAll" !== s || v !== !0 && !u.isString(v) || (o.each(o.queue(b, u.isString(v) ? v : ""), function(a, b) {
                            u.isFunction(b) && b()
                        }), o.queue(b, u.isString(v) ? v : "", []))
                    });
                    var I = [];
                    return o.each(y.State.calls, function(a, b) {
                        b && o.each(b[1], function(c, e) {
                            var f = v === d ? "" : v;
                            if (f !== !0 && b[2].queue !== f && (v !== d || b[2].queue !== !1)) return !0;
                            o.each(r, function(c, d) {
                                if (d === e)
                                    if ((v === !0 || u.isString(v)) && (o.each(o.queue(d, u.isString(v) ? v : ""), function(a, b) {
                                            u.isFunction(b) && b(null, !0)
                                        }), o.queue(d, u.isString(v) ? v : "", [])), "stop" === s) {
                                        var h = g(d);
                                        h && h.tweensContainer && f !== !1 && o.each(h.tweensContainer, function(a, b) {
                                            b.endValue = b.currentValue
                                        }), I.push(a)
                                    } else "finish" !== s && "finishAll" !== s || (b[2].duration = 1)
                            })
                        })
                    }), "stop" === s && (o.each(I, function(a, b) {
                        n(b, !0)
                    }), z.promise && z.resolver(r)), a();
                default:
                    if (!o.isPlainObject(s) || u.isEmptyObject(s)) {
                        if (u.isString(s) && y.Redirects[s]) {
                            j = o.extend({}, v);
                            var J = j.duration,
                                K = j.delay || 0;
                            return j.backwards === !0 && (r = o.extend(!0, [], r).reverse()), o.each(r, function(a, b) {
                                parseFloat(j.stagger) ? j.delay = K + parseFloat(j.stagger) * a : u.isFunction(j.stagger) && (j.delay = K + j.stagger.call(b, a, C)), j.drag && (j.duration = parseFloat(J) || (/^(callout|transition)/.test(s) ? 1e3 : w), j.duration = Math.max(j.duration * (j.backwards ? 1 - a / C : (a + 1) / C), .75 * j.duration, 200)), y.Redirects[s].call(b, b, j || {}, a, C, r, z.promise ? z : d)
                            }), a()
                        }
                        var L = "Velocity: First argument (" + s + ") was not a property map, a known action, or a registered redirect. Aborting.";
                        return z.promise ? z.rejecter(new Error(L)) : b.console && console.log(L), a()
                    }
                    G = "start"
            }
            var M = {
                    lastParent: null,
                    lastPosition: null,
                    lastFontSize: null,
                    lastPercentToPxWidth: null,
                    lastPercentToPxHeight: null,
                    lastEmToPx: null,
                    remToPx: null,
                    vwToPx: null,
                    vhToPx: null
                },
                N = [];
            o.each(r, function(a, b) {
                u.isNode(b) && e(b, a)
            }), j = o.extend({}, y.defaults, v), j.loop = parseInt(j.loop, 10);
            var O = 2 * j.loop - 1;
            if (j.loop)
                for (var P = 0; P < O; P++) {
                    var Q = {
                        delay: j.delay,
                        progress: j.progress
                    };
                    P === O - 1 && (Q.display = j.display, Q.visibility = j.visibility, Q.complete = j.complete), B(r, "reverse", Q)
                }
            return a()
        };
        y = o.extend(B, y), y.animate = B;
        var C = b.requestAnimationFrame || q;
        if (!y.State.isMobile && c.hidden !== d) {
            var D = function() {
                c.hidden ? (C = function(a) {
                    return setTimeout(function() {
                        a(!0)
                    }, 16)
                }, m()) : C = b.requestAnimationFrame || q
            };
            D(), c.addEventListener("visibilitychange", D)
        }
        return a.Velocity = y, a !== b && (a.fn.velocity = B, a.fn.velocity.defaults = y.defaults), o.each(["Down", "Up"], function(a, b) {
            y.Redirects["slide" + b] = function(a, c, e, f, g, h) {
                var i = o.extend({}, c),
                    j = i.begin,
                    k = i.complete,
                    l = {},
                    m = {
                        height: "",
                        marginTop: "",
                        marginBottom: "",
                        paddingTop: "",
                        paddingBottom: ""
                    };
                i.display === d && (i.display = "Down" === b ? "inline" === y.CSS.Values.getDisplayType(a) ? "inline-block" : "block" : "none"), i.begin = function() {
                    0 === e && j && j.call(g, g);
                    for (var c in m)
                        if (m.hasOwnProperty(c)) {
                            l[c] = a.style[c];
                            var d = A.getPropertyValue(a, c);
                            m[c] = "Down" === b ? [d, 0] : [0, d]
                        }
                    l.overflow = a.style.overflow, a.style.overflow = "hidden"
                }, i.complete = function() {
                    for (var b in l) l.hasOwnProperty(b) && (a.style[b] = l[b]);
                    e === f - 1 && (k && k.call(g, g), h && h.resolver(g))
                }, y(a, m, i)
            }
        }), o.each(["In", "Out"], function(a, b) {
            y.Redirects["fade" + b] = function(a, c, e, f, g, h) {
                var i = o.extend({}, c),
                    j = i.complete,
                    k = {
                        opacity: "In" === b ? 1 : 0
                    };
                0 !== e && (i.begin = null), i.complete = e !== f - 1 ? null : function() {
                    j && j.call(g, g), h && h.resolver(g)
                }, i.display === d && (i.display = "In" === b ? "auto" : "none"), y(this, k, i)
            }
        }), y
    }(window.jQuery || window.Zepto || window, window, window ? window.document : undefined)
});

! function(a) {
    "use strict";
    "function" == typeof require && "object" == typeof exports ? module.exports = a() : "function" == typeof define && define.amd ? define(["velocity"], a) : a()
}(function() {
    "use strict";
    return function(a, b, c, d) {
        var e = a.Velocity;
        if (!e || !e.Utilities) return void(b.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));
        var f = e.Utilities,
            g = e.version,
            h = {
                major: 1,
                minor: 1,
                patch: 0
            };
        if (function(a, b) {
                var c = [];
                return !(!a || !b) && (f.each([a, b], function(a, b) {
                    var d = [];
                    f.each(b, function(a, b) {
                        for (; b.toString().length < 5;) b = "0" + b;
                        d.push(b)
                    }), c.push(d.join(""))
                }), parseFloat(c[0]) > parseFloat(c[1]))
            }(h, g)) {
            var i = "Velocity UI Pack: You need to update Velocity (velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
            throw alert(i), new Error(i)
        }
        e.RegisterEffect = e.RegisterUI = function(a, b) {
            function c(a, b, c, d) {
                var g, h = 0;
                f.each(a.nodeType ? [a] : a, function(a, b) {
                    d && (c += a * d), g = b.parentNode;
                    var i = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"];
                    "border-box" === e.CSS.getPropertyValue(b, "boxSizing").toString().toLowerCase() && (i = ["height"]), f.each(i, function(a, c) {
                        h += parseFloat(e.CSS.getPropertyValue(b, c))
                    })
                }), e.animate(g, {
                    height: ("In" === b ? "+" : "-") + "=" + h
                }, {
                    queue: !1,
                    easing: "ease-in-out",
                    duration: c * ("In" === b ? .6 : 1)
                })
            }
            return e.Redirects[a] = function(d, g, h, i, j, k, l) {
                var m = h === i - 1,
                    n = 0;
                l = l || b.loop, "function" == typeof b.defaultDuration ? b.defaultDuration = b.defaultDuration.call(j, j) : b.defaultDuration = parseFloat(b.defaultDuration);
                for (var o = 0; o < b.calls.length; o++) "number" == typeof(t = b.calls[o][1]) && (n += t);
                var p = n >= 1 ? 0 : b.calls.length ? (1 - n) / b.calls.length : 1;
                for (o = 0; o < b.calls.length; o++) {
                    var q = b.calls[o],
                        r = q[0],
                        s = 1e3,
                        t = q[1],
                        u = q[2] || {},
                        v = {};
                    if (void 0 !== g.duration ? s = g.duration : void 0 !== b.defaultDuration && (s = b.defaultDuration), v.duration = s * ("number" == typeof t ? t : p), v.queue = g.queue || "", v.easing = u.easing || "ease", v.delay = parseFloat(u.delay) || 0, v.loop = !b.loop && u.loop, v._cacheValues = u._cacheValues || !0, 0 === o) {
                        if (v.delay += parseFloat(g.delay) || 0, 0 === h && (v.begin = function() {
                                g.begin && g.begin.call(j, j);
                                var b = a.match(/(In|Out)$/);
                                b && "In" === b[0] && void 0 !== r.opacity && f.each(j.nodeType ? [j] : j, function(a, b) {
                                    e.CSS.setPropertyValue(b, "opacity", 0)
                                }), g.animateParentHeight && b && c(j, b[0], s + v.delay, g.stagger)
                            }), null !== g.display)
                            if (void 0 !== g.display && "none" !== g.display) v.display = g.display;
                            else if (/In$/.test(a)) {
                            var w = e.CSS.Values.getDisplayType(d);
                            v.display = "inline" === w ? "inline-block" : w
                        }
                        g.visibility && "hidden" !== g.visibility && (v.visibility = g.visibility)
                    }
                    if (o === b.calls.length - 1) {
                        var x = function() {
                            void 0 !== g.display && "none" !== g.display || !/Out$/.test(a) || f.each(j.nodeType ? [j] : j, function(a, b) {
                                e.CSS.setPropertyValue(b, "display", "none")
                            }), g.complete && g.complete.call(j, j), k && k.resolver(j || d)
                        };
                        v.complete = function() {
                            if (l && e.Redirects[a](d, g, h, i, j, k, l === !0 || Math.max(0, l - 1)), b.reset) {
                                for (var c in b.reset)
                                    if (b.reset.hasOwnProperty(c)) {
                                        var f = b.reset[c];
                                        void 0 !== e.CSS.Hooks.registered[c] || "string" != typeof f && "number" != typeof f || (b.reset[c] = [b.reset[c], b.reset[c]])
                                    }
                                var n = {
                                    duration: 0,
                                    queue: !1
                                };
                                m && (n.complete = x), e.animate(d, b.reset, n)
                            } else m && x()
                        }, "hidden" === g.visibility && (v.visibility = g.visibility)
                    }
                    e.animate(d, r, v)
                }
            }, e
        }, e.RegisterEffect.packagedEffects = {
            "callout.bounce": {
                defaultDuration: 550,
                calls: [
                    [{
                        translateY: -30
                    }, .25],
                    [{
                        translateY: 0
                    }, .125],
                    [{
                        translateY: -15
                    }, .125],
                    [{
                        translateY: 0
                    }, .25]
                ]
            },
            "callout.shake": {
                defaultDuration: 800,
                calls: [
                    [{
                        translateX: -11
                    }],
                    [{
                        translateX: 11
                    }],
                    [{
                        translateX: -11
                    }],
                    [{
                        translateX: 11
                    }],
                    [{
                        translateX: -11
                    }],
                    [{
                        translateX: 11
                    }],
                    [{
                        translateX: -11
                    }],
                    [{
                        translateX: 0
                    }]
                ]
            },
            "callout.flash": {
                defaultDuration: 1100,
                calls: [
                    [{
                        opacity: [0, "easeInOutQuad", 1]
                    }],
                    [{
                        opacity: [1, "easeInOutQuad"]
                    }],
                    [{
                        opacity: [0, "easeInOutQuad"]
                    }],
                    [{
                        opacity: [1, "easeInOutQuad"]
                    }]
                ]
            },
            "callout.pulse": {
                defaultDuration: 825,
                calls: [
                    [{
                        scaleX: 1.1,
                        scaleY: 1.1
                    }, .5, {
                        easing: "easeInExpo"
                    }],
                    [{
                        scaleX: 1,
                        scaleY: 1
                    }, .5]
                ]
            },
            "callout.swing": {
                defaultDuration: 950,
                calls: [
                    [{
                        rotateZ: 15
                    }],
                    [{
                        rotateZ: -10
                    }],
                    [{
                        rotateZ: 5
                    }],
                    [{
                        rotateZ: -5
                    }],
                    [{
                        rotateZ: 0
                    }]
                ]
            },
            "callout.tada": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        scaleX: .9,
                        scaleY: .9,
                        rotateZ: -3
                    }, .1],
                    [{
                        scaleX: 1.1,
                        scaleY: 1.1,
                        rotateZ: 3
                    }, .1],
                    [{
                        scaleX: 1.1,
                        scaleY: 1.1,
                        rotateZ: -3
                    }, .1],
                    ["reverse", .125],
                    ["reverse", .125],
                    ["reverse", .125],
                    ["reverse", .125],
                    ["reverse", .125],
                    [{
                        scaleX: 1,
                        scaleY: 1,
                        rotateZ: 0
                    }, .2]
                ]
            },
            "transition.fadeIn": {
                defaultDuration: 500,
                calls: [
                    [{
                        opacity: [1, 0]
                    }]
                ]
            },
            "transition.fadeOut": {
                defaultDuration: 500,
                calls: [
                    [{
                        opacity: [0, 1]
                    }]
                ]
            },
            "transition.flipXIn": {
                defaultDuration: 700,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [800, 800],
                        rotateY: [0, -55]
                    }]
                ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipXOut": {
                defaultDuration: 700,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [800, 800],
                        rotateY: 55
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    rotateY: 0
                }
            },
            "transition.flipYIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [800, 800],
                        rotateX: [0, -45]
                    }]
                ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipYOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [800, 800],
                        rotateX: 25
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    rotateX: 0
                }
            },
            "transition.flipBounceXIn": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [.725, 0],
                        transformPerspective: [400, 400],
                        rotateY: [-10, 90]
                    }, .5],
                    [{
                        opacity: .8,
                        rotateY: 10
                    }, .25],
                    [{
                        opacity: 1,
                        rotateY: 0
                    }, .25]
                ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipBounceXOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [.9, 1],
                        transformPerspective: [400, 400],
                        rotateY: -10
                    }],
                    [{
                        opacity: 0,
                        rotateY: 90
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    rotateY: 0
                }
            },
            "transition.flipBounceYIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [.725, 0],
                        transformPerspective: [400, 400],
                        rotateX: [-10, 90]
                    }, .5],
                    [{
                        opacity: .8,
                        rotateX: 10
                    }, .25],
                    [{
                        opacity: 1,
                        rotateX: 0
                    }, .25]
                ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipBounceYOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [.9, 1],
                        transformPerspective: [400, 400],
                        rotateX: -15
                    }],
                    [{
                        opacity: 0,
                        rotateX: 90
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    rotateX: 0
                }
            },
            "transition.swoopIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformOriginX: ["100%", "50%"],
                        transformOriginY: ["100%", "100%"],
                        scaleX: [1, 0],
                        scaleY: [1, 0],
                        translateX: [0, -700],
                        translateZ: 0
                    }]
                ],
                reset: {
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.swoopOut": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformOriginX: ["50%", "100%"],
                        transformOriginY: ["100%", "100%"],
                        scaleX: 0,
                        scaleY: 0,
                        translateX: -700,
                        translateZ: 0
                    }]
                ],
                reset: {
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    scaleX: 1,
                    scaleY: 1,
                    translateX: 0
                }
            },
            "transition.whirlIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: [1, 0],
                        scaleY: [1, 0],
                        rotateY: [0, 160]
                    }, 1, {
                        easing: "easeInOutSine"
                    }]
                ]
            },
            "transition.whirlOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [0, "easeInOutQuint", 1],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: 0,
                        scaleY: 0,
                        rotateY: 160
                    }, 1, {
                        easing: "swing"
                    }]
                ],
                reset: {
                    scaleX: 1,
                    scaleY: 1,
                    rotateY: 0
                }
            },
            "transition.shrinkIn": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: [1, 1.5],
                        scaleY: [1, 1.5],
                        translateZ: 0
                    }]
                ]
            },
            "transition.shrinkOut": {
                defaultDuration: 600,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: 1.3,
                        scaleY: 1.3,
                        translateZ: 0
                    }]
                ],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.expandIn": {
                defaultDuration: 700,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: [1, .625],
                        scaleY: [1, .625],
                        translateZ: 0
                    }]
                ]
            },
            "transition.expandOut": {
                defaultDuration: 700,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: .5,
                        scaleY: .5,
                        translateZ: 0
                    }]
                ],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.bounceIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        scaleX: [1.05, .3],
                        scaleY: [1.05, .3]
                    }, .35],
                    [{
                        scaleX: .9,
                        scaleY: .9,
                        translateZ: 0
                    }, .2],
                    [{
                        scaleX: 1,
                        scaleY: 1
                    }, .45]
                ]
            },
            "transition.bounceOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        scaleX: .95,
                        scaleY: .95
                    }, .35],
                    [{
                        scaleX: 1.1,
                        scaleY: 1.1,
                        translateZ: 0
                    }, .35],
                    [{
                        opacity: [0, 1],
                        scaleX: .3,
                        scaleY: .3
                    }, .3]
                ],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.bounceUpIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [-30, 1e3]
                    }, .6, {
                        easing: "easeOutCirc"
                    }],
                    [{
                        translateY: 10
                    }, .2],
                    [{
                        translateY: 0
                    }, .2]
                ]
            },
            "transition.bounceUpOut": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        translateY: 20
                    }, .2],
                    [{
                        opacity: [0, "easeInCirc", 1],
                        translateY: -1e3
                    }, .8]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.bounceDownIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [30, -1e3]
                    }, .6, {
                        easing: "easeOutCirc"
                    }],
                    [{
                        translateY: -10
                    }, .2],
                    [{
                        translateY: 0
                    }, .2]
                ]
            },
            "transition.bounceDownOut": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        translateY: -20
                    }, .2],
                    [{
                        opacity: [0, "easeInCirc", 1],
                        translateY: 1e3
                    }, .8]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.bounceLeftIn": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [30, -1250]
                    }, .6, {
                        easing: "easeOutCirc"
                    }],
                    [{
                        translateX: -10
                    }, .2],
                    [{
                        translateX: 0
                    }, .2]
                ]
            },
            "transition.bounceLeftOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        translateX: 30
                    }, .2],
                    [{
                        opacity: [0, "easeInCirc", 1],
                        translateX: -1250
                    }, .8]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.bounceRightIn": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [-30, 1250]
                    }, .6, {
                        easing: "easeOutCirc"
                    }],
                    [{
                        translateX: 10
                    }, .2],
                    [{
                        translateX: 0
                    }, .2]
                ]
            },
            "transition.bounceRightOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        translateX: -30
                    }, .2],
                    [{
                        opacity: [0, "easeInCirc", 1],
                        translateX: 1250
                    }, .8]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideUpIn": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [0, 20],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideUpOut": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateY: -20,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideDownIn": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [0, -20],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideDownOut": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateY: 20,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideLeftIn": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [0, -20],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideLeftOut": {
                defaultDuration: 1050,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateX: -20,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideRightIn": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [0, 20],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideRightOut": {
                defaultDuration: 1050,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateX: 20,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideUpBigIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [0, 75],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideUpBigOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateY: -75,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideDownBigIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [0, -75],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideDownBigOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateY: 75,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideLeftBigIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [0, -75],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideLeftBigOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateX: -75,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideRightBigIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [0, 75],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideRightBigOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateX: 75,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.perspectiveUpIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [800, 800],
                        transformOriginX: [0, 0],
                        transformOriginY: ["100%", "100%"],
                        rotateX: [0, -180]
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveUpOut": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [800, 800],
                        transformOriginX: [0, 0],
                        transformOriginY: ["100%", "100%"],
                        rotateX: -180
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateX: 0
                }
            },
            "transition.perspectiveDownIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [800, 800],
                        transformOriginX: [0, 0],
                        transformOriginY: [0, 0],
                        rotateX: [0, 180]
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveDownOut": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [800, 800],
                        transformOriginX: [0, 0],
                        transformOriginY: [0, 0],
                        rotateX: 180
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateX: 0
                }
            },
            "transition.perspectiveLeftIn": {
                defaultDuration: 950,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [2e3, 2e3],
                        transformOriginX: [0, 0],
                        transformOriginY: [0, 0],
                        rotateY: [0, -180]
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveLeftOut": {
                defaultDuration: 950,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [2e3, 2e3],
                        transformOriginX: [0, 0],
                        transformOriginY: [0, 0],
                        rotateY: -180
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateY: 0
                }
            },
            "transition.perspectiveRightIn": {
                defaultDuration: 950,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [2e3, 2e3],
                        transformOriginX: ["100%", "100%"],
                        transformOriginY: [0, 0],
                        rotateY: [0, 180]
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveRightOut": {
                defaultDuration: 950,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [2e3, 2e3],
                        transformOriginX: ["100%", "100%"],
                        transformOriginY: [0, 0],
                        rotateY: 180
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateY: 0
                }
            }
        };
        for (var j in e.RegisterEffect.packagedEffects) e.RegisterEffect.packagedEffects.hasOwnProperty(j) && e.RegisterEffect(j, e.RegisterEffect.packagedEffects[j]);
        e.RunSequence = function(a) {
            var b = f.extend(!0, [], a);
            b.length > 1 && (f.each(b.reverse(), function(a, c) {
                var d = b[a + 1];
                if (d) {
                    var g = c.o || c.options,
                        h = d.o || d.options,
                        i = g && g.sequenceQueue === !1 ? "begin" : "complete",
                        j = h && h[i],
                        k = {};
                    k[i] = function() {
                        var a = d.e || d.elements,
                            b = a.nodeType ? [a] : a;
                        j && j.call(b, b), e(c)
                    }, d.o ? d.o = f.extend({}, h, k) : d.options = f.extend({}, h, k)
                }
            }), b.reverse()), e(b[0])
        }
    }(window.jQuery || window.Zepto || window, window, window ? window.document : undefined)
});

/*
 * jQuery Nivo Slider v3.2
 * http://nivo.dev7studios.com
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(e) {
    var t = function(t, n) {
        var r = e.extend({}, e.fn.nivoSlider.defaults, n);
        var i = {
            currentSlide: 0,
            currentImage: "",
            totalSlides: 0,
            running: false,
            paused: false,
            stop: false,
            controlNavEl: false
        };
        var s = e(t);
        s.data("nivo:vars", i).addClass("nivoSlider");
        var o = s.children();
        o.each(function() {
            var t = e(this);
            var n = "";
            if (!t.is("img")) {
                if (t.is("a")) {
                    t.addClass("nivo-imageLink");
                    n = t
                }
                t = t.find("img:first")
            }
            var r = r === 0 ? t.attr("width") : t.width(),
                s = s === 0 ? t.attr("height") : t.height();
            if (n !== "") {
                n.css("display", "none")
            }
            t.css("display", "none");
            i.totalSlides++
        });
        if (r.randomStart) {
            r.startSlide = Math.floor(Math.random() * i.totalSlides)
        }
        if (r.startSlide > 0) {
            if (r.startSlide >= i.totalSlides) {
                r.startSlide = i.totalSlides - 1
            }
            i.currentSlide = r.startSlide
        }
        if (e(o[i.currentSlide]).is("img")) {
            i.currentImage = e(o[i.currentSlide])
        } else {
            i.currentImage = e(o[i.currentSlide]).find("img:first")
        }
        if (e(o[i.currentSlide]).is("a")) {
            e(o[i.currentSlide]).css("display", "block")
        }
        var u = e("<img/>").addClass("nivo-main-image");
        u.attr("src", i.currentImage.attr("src")).show();
        s.append(u);
        e(window).resize(function() {
            s.children("img").width(s.width());
            u.attr("src", i.currentImage.attr("src"));
            u.stop().height("auto");
            e(".nivo-slice").remove();
            e(".nivo-box").remove()
        });
        s.append(e('<div class="nivo-caption"></div>'));
        var a = function(t) {
            var n = e(".nivo-caption", s);
            if (i.currentImage.attr("title") != "" && i.currentImage.attr("title") != undefined) {
                var r = i.currentImage.attr("title");
                if (r.substr(0, 1) == "#") r = e(r).html();
                if (n.css("display") == "block") {
                    setTimeout(function() {
                        n.html(r)
                    }, t.animSpeed)
                } else {
                    n.html(r);
                    n.stop().fadeIn(t.animSpeed)
                }
            } else {
                n.stop().fadeOut(t.animSpeed)
            }
        };
        a(r);
        var f = 0;
        if (!r.manualAdvance && o.length > 1) {
            f = setInterval(function() {
                d(s, o, r, false)
            }, r.pauseTime)
        }
        if (r.directionNav) {
            s.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + r.prevText + '</a><a class="nivo-nextNav">' + r.nextText + "</a></div>");
            e(s).on("click", "a.nivo-prevNav", function() {
                if (i.running) {
                    return false
                }
                clearInterval(f);
                f = "";
                i.currentSlide -= 2;
                d(s, o, r, "prev")
            });
            e(s).on("click", "a.nivo-nextNav", function() {
                if (i.running) {
                    return false
                }
                clearInterval(f);
                f = "";
                d(s, o, r, "next")
            })
        }
        if (r.controlNav) {
            i.controlNavEl = e('<div class="nivo-controlNav"></div>');
            s.after(i.controlNavEl);
            for (var l = 0; l < o.length; l++) {
                if (r.controlNavThumbs) {
                    i.controlNavEl.addClass("nivo-thumbs-enabled");
                    var c = o.eq(l);
                    if (!c.is("img")) {
                        c = c.find("img:first")
                    }
                    if (c.attr("data-thumb")) i.controlNavEl.append('<a class="nivo-control" rel="' + l + '"><img src="' + c.attr("data-thumb") + '" alt="" /></a>')
                } else {
                    i.controlNavEl.append('<a class="nivo-control" rel="' + l + '">' + (l + 1) + "</a>")
                }
            }
            e("a:eq(" + i.currentSlide + ")", i.controlNavEl).addClass("active");
            e("a", i.controlNavEl).bind("click", function() {
                if (i.running) return false;
                if (e(this).hasClass("active")) return false;
                clearInterval(f);
                f = "";
                u.attr("src", i.currentImage.attr("src"));
                i.currentSlide = e(this).attr("rel") - 1;
                d(s, o, r, "control")
            })
        }
        if (r.pauseOnHover) {
            s.hover(function() {
                i.paused = true;
                clearInterval(f);
                f = ""
            }, function() {
                i.paused = false;
                if (f === "" && !r.manualAdvance) {
                    f = setInterval(function() {
                        d(s, o, r, false)
                    }, r.pauseTime)
                }
            })
        }
        s.bind("nivo:animFinished", function() {
            u.attr("src", i.currentImage.attr("src"));
            i.running = false;
            e(o).each(function() {
                if (e(this).is("a")) {
                    e(this).css("display", "none")
                }
            });
            if (e(o[i.currentSlide]).is("a")) {
                e(o[i.currentSlide]).css("display", "block")
            }
            if (f === "" && !i.paused && !r.manualAdvance) {
                f = setInterval(function() {
                    d(s, o, r, false)
                }, r.pauseTime)
            }
            r.afterChange.call(this)
        });
        var h = function(t, n, r) {
            if (e(r.currentImage).parent().is("a")) e(r.currentImage).parent().css("display", "block");
            e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility", "hidden").show();
            var i = e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").parent().is("a") ? e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").parent().height() : e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").height();
            for (var s = 0; s < n.slices; s++) {
                var o = Math.round(t.width() / n.slices);
                if (s === n.slices - 1) {
                    t.append(e('<div class="nivo-slice" name="' + s + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block !important; top:0; left:-" + (o + s * o - o) + 'px;" /></div>').css({
                        left: o * s + "px",
                        width: t.width() - o * s + "px",
                        height: i + "px",
                        opacity: "0",
                        overflow: "hidden"
                    }))
                } else {
                    t.append(e('<div class="nivo-slice" name="' + s + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block !important; top:0; left:-" + (o + s * o - o) + 'px;" /></div>').css({
                        left: o * s + "px",
                        width: o + "px",
                        height: i + "px",
                        opacity: "0",
                        overflow: "hidden"
                    }))
                }
            }
            e(".nivo-slice", t).height(i);
            u.stop().animate({
                height: e(r.currentImage).height()
            }, n.animSpeed)
        };
        var p = function(t, n, r) {
            if (e(r.currentImage).parent().is("a")) e(r.currentImage).parent().css("display", "block");
            e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility", "hidden").show();
            var i = Math.round(t.width() / n.boxCols),
                s = Math.round(e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").height() / n.boxRows);
            for (var o = 0; o < n.boxRows; o++) {
                for (var a = 0; a < n.boxCols; a++) {
                    if (a === n.boxCols - 1) {
                        t.append(e('<div class="nivo-box" name="' + a + '" rel="' + o + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block; top:-" + s * o + "px; left:-" + i * a + 'px;" /></div>').css({
                            opacity: 0,
                            left: i * a + "px",
                            top: s * o + "px",
                            width: t.width() - i * a + "px"
                        }));
                        e('.nivo-box[name="' + a + '"]', t).height(e('.nivo-box[name="' + a + '"] img', t).height() + "px")
                    } else {
                        t.append(e('<div class="nivo-box" name="' + a + '" rel="' + o + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block; top:-" + s * o + "px; left:-" + i * a + 'px;" /></div>').css({
                            opacity: 0,
                            left: i * a + "px",
                            top: s * o + "px",
                            width: i + "px"
                        }));
                        e('.nivo-box[name="' + a + '"]', t).height(e('.nivo-box[name="' + a + '"] img', t).height() + "px")
                    }
                }
            }
            u.stop().animate({
                height: e(r.currentImage).height()
            }, n.animSpeed)
        };
        var d = function(t, n, r, i) {
            var s = t.data("nivo:vars");
            if (s && s.currentSlide === s.totalSlides - 1) {
                r.lastSlide.call(this)
            }
            if ((!s || s.stop) && !i) {
                return false
            }
            r.beforeChange.call(this);
            if (!i) {
                u.attr("src", s.currentImage.attr("src"))
            } else {
                if (i === "prev") {
                    u.attr("src", s.currentImage.attr("src"))
                }
                if (i === "next") {
                    u.attr("src", s.currentImage.attr("src"))
                }
            }
            s.currentSlide++;
            if (s.currentSlide === s.totalSlides) {
                s.currentSlide = 0;
                r.slideshowEnd.call(this)
            }
            if (s.currentSlide < 0) {
                s.currentSlide = s.totalSlides - 1
            }
            if (e(n[s.currentSlide]).is("img")) {
                s.currentImage = e(n[s.currentSlide])
            } else {
                s.currentImage = e(n[s.currentSlide]).find("img:first")
            }
            if (r.controlNav) {
                e("a", s.controlNavEl).removeClass("active");
                e("a:eq(" + s.currentSlide + ")", s.controlNavEl).addClass("active")
            }
            a(r);
            e(".nivo-slice", t).remove();
            e(".nivo-box", t).remove();
            var o = r.effect,
                f = "";
            if (r.effect === "random") {
                f = new Array("sliceDownRight", "sliceDownLeft", "sliceUpRight", "sliceUpLeft", "sliceUpDown", "sliceUpDownLeft", "fold", "fade", "boxRandom", "boxRain", "boxRainReverse", "boxRainGrow", "boxRainGrowReverse");
                o = f[Math.floor(Math.random() * (f.length + 1))];
                if (o === undefined) {
                    o = "fade"
                }
            }
            if (r.effect.indexOf(",") !== -1) {
                f = r.effect.split(",");
                o = f[Math.floor(Math.random() * f.length)];
                if (o === undefined) {
                    o = "fade"
                }
            }
            if (s.currentImage.attr("data-transition")) {
                o = s.currentImage.attr("data-transition")
            }
            s.running = true;
            var l = 0,
                c = 0,
                d = "",
                m = "",
                g = "",
                y = "";
            if (o === "sliceDown" || o === "sliceDownRight" || o === "sliceDownLeft") {
                h(t, r, s);
                l = 0;
                c = 0;
                d = e(".nivo-slice", t);
                if (o === "sliceDownLeft") {
                    d = e(".nivo-slice", t)._reverse()
                }
                d.each(function() {
                    var n = e(this);
                    n.css({
                        top: "0px"
                    });
                    if (c === r.slices - 1) {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1.0"
                            }, r.animSpeed, "", function() {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1.0"
                            }, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 50;
                    c++
                })
            } else if (o === "sliceUp" || o === "sliceUpRight" || o === "sliceUpLeft") {
                h(t, r, s);
                l = 0;
                c = 0;
                d = e(".nivo-slice", t);
                if (o === "sliceUpLeft") {
                    d = e(".nivo-slice", t)._reverse()
                }
                d.each(function() {
                    var n = e(this);
                    n.css({
                        bottom: "0px"
                    });
                    if (c === r.slices - 1) {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1.0"
                            }, r.animSpeed, "", function() {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1.0"
                            }, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 50;
                    c++
                })
            } else if (o === "sliceUpDown" || o === "sliceUpDownRight" || o === "sliceUpDownLeft") {
                h(t, r, s);
                l = 0;
                c = 0;
                var b = 0;
                d = e(".nivo-slice", t);
                if (o === "sliceUpDownLeft") {
                    d = e(".nivo-slice", t)._reverse()
                }
                d.each(function() {
                    var n = e(this);
                    if (c === 0) {
                        n.css("top", "0px");
                        c++
                    } else {
                        n.css("bottom", "0px");
                        c = 0
                    }
                    if (b === r.slices - 1) {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1.0"
                            }, r.animSpeed, "", function() {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1.0"
                            }, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 50;
                    b++
                })
            } else if (o === "fold") {
                h(t, r, s);
                l = 0;
                c = 0;
                e(".nivo-slice", t).each(function() {
                    var n = e(this);
                    var i = n.width();
                    n.css({
                        top: "0px",
                        width: "0px"
                    });
                    if (c === r.slices - 1) {
                        setTimeout(function() {
                            n.animate({
                                width: i,
                                opacity: "1.0"
                            }, r.animSpeed, "", function() {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function() {
                            n.animate({
                                width: i,
                                opacity: "1.0"
                            }, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 50;
                    c++
                })
            } else if (o === "fade") {
                h(t, r, s);
                m = e(".nivo-slice:first", t);
                m.css({
                    width: t.width() + "px"
                });
                m.animate({
                    opacity: "1.0"
                }, r.animSpeed * 2, "", function() {
                    t.trigger("nivo:animFinished")
                })
            } else if (o === "slideInRight") {
                h(t, r, s);
                m = e(".nivo-slice:first", t);
                m.css({
                    width: "0px",
                    opacity: "1"
                });
                m.animate({
                    width: t.width() + "px"
                }, r.animSpeed * 2, "", function() {
                    t.trigger("nivo:animFinished")
                })
            } else if (o === "slideInLeft") {
                h(t, r, s);
                m = e(".nivo-slice:first", t);
                m.css({
                    width: "0px",
                    opacity: "1",
                    left: "",
                    right: "0px"
                });
                m.animate({
                    width: t.width() + "px"
                }, r.animSpeed * 2, "", function() {
                    m.css({
                        left: "0px",
                        right: ""
                    });
                    t.trigger("nivo:animFinished")
                })
            } else if (o === "boxRandom") {
                p(t, r, s);
                g = r.boxCols * r.boxRows;
                c = 0;
                l = 0;
                y = v(e(".nivo-box", t));
                y.each(function() {
                    var n = e(this);
                    if (c === g - 1) {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1"
                            }, r.animSpeed, "", function() {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1"
                            }, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 20;
                    c++
                })
            } else if (o === "boxRain" || o === "boxRainReverse" || o === "boxRainGrow" || o === "boxRainGrowReverse") {
                p(t, r, s);
                g = r.boxCols * r.boxRows;
                c = 0;
                l = 0;
                var w = 0;
                var E = 0;
                var S = [];
                S[w] = [];
                y = e(".nivo-box", t);
                if (o === "boxRainReverse" || o === "boxRainGrowReverse") {
                    y = e(".nivo-box", t)._reverse()
                }
                y.each(function() {
                    S[w][E] = e(this);
                    E++;
                    if (E === r.boxCols) {
                        w++;
                        E = 0;
                        S[w] = []
                    }
                });
                for (var x = 0; x < r.boxCols * 2; x++) {
                    var T = x;
                    for (var N = 0; N < r.boxRows; N++) {
                        if (T >= 0 && T < r.boxCols) {
                            (function(n, i, s, u, a) {
                                var f = e(S[n][i]);
                                var l = f.width();
                                var c = f.height();
                                if (o === "boxRainGrow" || o === "boxRainGrowReverse") {
                                    f.width(0).height(0)
                                }
                                if (u === a - 1) {
                                    setTimeout(function() {
                                        f.animate({
                                            opacity: "1",
                                            width: l,
                                            height: c
                                        }, r.animSpeed / 1.3, "", function() {
                                            t.trigger("nivo:animFinished")
                                        })
                                    }, 100 + s)
                                } else {
                                    setTimeout(function() {
                                        f.animate({
                                            opacity: "1",
                                            width: l,
                                            height: c
                                        }, r.animSpeed / 1.3)
                                    }, 100 + s)
                                }
                            })(N, T, l, c, g);
                            c++
                        }
                        T--
                    }
                    l += 100
                }
            }
        };
        var v = function(e) {
            for (var t, n, r = e.length; r; t = parseInt(Math.random() * r, 10), n = e[--r], e[r] = e[t], e[t] = n);
            return e
        };
        var m = function(e) {
            if (this.console && typeof console.log !== "undefined") {
                console.log(e)
            }
        };
        this.stop = function() {
            if (!e(t).data("nivo:vars").stop) {
                e(t).data("nivo:vars").stop = true;
                m("Stop Slider")
            }
        };
        this.start = function() {
            if (e(t).data("nivo:vars").stop) {
                e(t).data("nivo:vars").stop = false;
                m("Start Slider")
            }
        };
        r.afterLoad.call(this);
        return this
    };
    e.fn.nivoSlider = function(n) {
        return this.each(function(r, i) {
            var s = e(this);
            if (s.data("nivoslider")) {
                return s.data("nivoslider")
            }
            var o = new t(this, n);
            s.data("nivoslider", o)
        })
    };
    e.fn.nivoSlider.defaults = {
        effect: "random",
        slices: 15,
        boxCols: 8,
        boxRows: 4,
        animSpeed: 500,
        pauseTime: 3e3,
        startSlide: 0,
        directionNav: true,
        controlNav: true,
        controlNavThumbs: false,
        pauseOnHover: true,
        manualAdvance: false,
        prevText: "Prev",
        nextText: "Next",
        randomStart: false,
        beforeChange: function() {},
        afterChange: function() {},
        slideshowEnd: function() {},
        lastSlide: function() {},
        afterLoad: function() {}
    };
    e.fn._reverse = [].reverse
})(jQuery)

! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }, e.prototype.animateSlide = function(e, t) {
        var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
            s.disableTransition(), t.call()
        }, s.options.speed))
    }, e.prototype.getNavTarget = function() {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function(i) {
        var e, t;
        if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function(i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function() {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, e.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
            }, 0)
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, e.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function(i) {
        var e, t, o, s = this,
            n = 0;
        return s.slideOffset = 0, t = s.$slides.first().outerHeight(!0), !0 === s.options.infinite ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1, n = t * s.options.slidesToShow * -1), s.slideCount % s.options.slidesToScroll != 0 && i + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (i > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (i - s.slideCount)) * s.slideWidth * -1, n = (s.options.slidesToShow - (i - s.slideCount)) * t * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1, n = s.slideCount % s.options.slidesToScroll * t * -1))) : i + s.options.slidesToShow > s.slideCount && (s.slideOffset = (i + s.options.slidesToShow - s.slideCount) * s.slideWidth, n = (i + s.options.slidesToShow - s.slideCount) * t), s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0, n = 0), !0 === s.options.centerMode && s.slideCount <= s.options.slidesToShow ? s.slideOffset = s.slideWidth * Math.floor(s.options.slidesToShow) / 2 - s.slideWidth * s.slideCount / 2 : !0 === s.options.centerMode && !0 === s.options.infinite ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : !0 === s.options.centerMode && (s.slideOffset = 0, s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)), e = !1 === s.options.vertical ? i * s.slideWidth * -1 + s.slideOffset : i * t * -1 + n, !0 === s.options.variableWidth && (o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(i) : s.$slideTrack.children(".slick-slide").eq(i + s.options.slidesToShow), e = !0 === s.options.rtl ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === s.options.centerMode && (o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(i) : s.$slideTrack.children(".slick-slide").eq(i + s.options.slidesToShow + 1), e = !0 === s.options.rtl ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (s.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        return this.options[i]
    }, e.prototype.getNavigableIndexes = function() {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function() {
        return this
    }, e.prototype.getSlideCount = function() {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1
        }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function() {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function(i) {
                return i >= 0 && i < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }), -1 !== s && i(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + s
            })
        }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA()
    }, e.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
    }, e.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), n.$slider.trigger("lazyLoaded", [n, e, t])
                    })
                }, r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t])
                }, r.src = t
            })
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
        e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }, e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.autoplay || i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function(i) {
        i.preventDefault()
    }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }, e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
            currentSlide: t
        }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                }
            s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
    }, e.prototype.setCSS = function(i) {
        var e, t, o = this,
            s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function(i, e) {
            r.options[i] = e
        });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t])
                }
        l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }, e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode ? (e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")) : i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function(e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
    }, e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
                a.postSlide(o)
            }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
            a.postSlide(o)
        }) : a.postSlide(o));
        else {
            if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
                a.postSlide(s)
            })) : a.postSlide(s), void a.animateHeight();
            !0 !== t ? a.animateSlide(d, function() {
                a.postSlide(s)
            }) : a.postSlide(s)
        }
    }, e.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
    }, e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function() {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        return o
    }
});

/*!
 * jQuery Birthday Picker: v1.4 - 10/16/2011
 * http://abecoffman.com/stuff/birthdaypicker
 *
 * Copyright (c) 2010 Abe Coffman
 * Dual licensed under the MIT and GPL licenses.
 *
 */

(function($) {

    // plugin variables
    var months = {
            "short": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "long": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "indonesia": ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
        },
        todayDate = new Date(),
        todayYear = todayDate.getFullYear(),
        todayMonth = todayDate.getMonth() + 1,
        todayDay = todayDate.getDate();


    $.fn.birthdaypicker = function(options) {

        var settings = {
            "maxAge": 120,
            "minAge": 0,
            "futureDates": false,
            "maxYear": todayYear,
            "dateFormat": "middleEndian",
            "monthFormat": "indonesia",
            "placeholder": true,
            "legend": "",
            "defaultDate": false,
            "fieldName": "birthdate",
            "fieldId": "birthdate",
            "hiddenDate": true,
            "onChange": null,
            "tabindex": null
        };

        return this.each(function() {

            if (options) {
                $.extend(settings, options);
            }

            // Create the html picker skeleton
            var $fieldset = $("<fieldset class='birthday-picker'></fieldset>"),
                $year = $("<select class='birth-year form-control ' name='birth[year]' class='bday-year'></select>"),
                $month = $("<select class='birth-month form-control ' name='birth[month]' class='bday-month'></select>"),
                $day = $("<select class='birth-day form-control ' name='birth[day]' class='bday-day'></select>");

            if (settings["legend"]) {
                $("<legend>" + settings["legend"] + "</legend>").appendTo($fieldset);
            }

            var tabindex = settings["tabindex"];

            // Deal with the various Date Formats
            if (settings["dateFormat"] == "bigEndian") {
                $fieldset.append($year).append($month).append($day);
                if (tabindex != null) {
                    $year.attr('tabindex', tabindex);
                    $month.attr('tabindex', tabindex++);
                    $day.attr('tabindex', tabindex++);
                }
            } else if (settings["dateFormat"] == "littleEndian") {
                $fieldset.append($day).append($month).append($year);
                if (tabindex != null) {
                    $day.attr('tabindex', tabindex);
                    $month.attr('tabindex', tabindex++);
                    $year.attr('tabindex', tabindex++);
                }
            } else {
                $fieldset.append($month).append($day).append($year);
                if (tabindex != null) {
                    $month.attr('tabindex', tabindex);
                    $day.attr('tabindex', tabindex++);
                    $year.attr('tabindex', tabindex++);
                }
            }

            // Add the option placeholders if specified
            if (settings["placeholder"]) {
                $("<option value='0'>Tahun</option>").appendTo($year);
                $("<option value='0'>Bulan</option>").appendTo($month);
                $("<option value='0'>Tanggal</option>").appendTo($day);
            }

            var hiddenDate;
            if (settings["defaultDate"]) {
                var defDate = new Date(settings["defaultDate"] + "T00:00:00"),
                    defYear = defDate.getFullYear(),
                    defMonth = defDate.getMonth() + 1,
                    defDay = defDate.getDate();
                if (defMonth < 10) defMonth = "0" + defMonth;
                if (defDay < 10) defDay = "0" + defDay;
                hiddenDate = defYear + "-" + defMonth + "-" + defDay;
            }

            // Create the hidden date markup
            if (settings["hiddenDate"]) {
                $("<input type='hidden' name='" + settings["fieldName"] + "'/>")
                    .attr("id", settings["fieldId"])
                    .val(hiddenDate)
                    .appendTo($fieldset);
            }

            // Build the initial option sets
            var startYear = todayYear - settings["minAge"];
            var endYear = todayYear - settings["maxAge"];
            if (settings["futureDates"] && settings["maxYear"] != todayYear) {
                if (settings["maxYear"] > 1000) {
                    startYear = settings["maxYear"];
                } else {
                    startYear = todayYear + settings["maxYear"];
                }
            }
            for (var i = startYear; i >= endYear; i--) {
                $("<option></option>").attr("value", i).text(i).appendTo($year);
            }
            for (var j = 0; j < 12; j++) {
                $("<option></option>").attr("value", j + 1).text(months[settings["monthFormat"]][j]).appendTo($month);
            }
            for (var k = 1; k < 32; k++) {
                $("<option></option>").attr("value", k).text(k).appendTo($day);
            }
            $(this).append($fieldset);

            // Set the default date if given
            if (settings["defaultDate"]) {
                var date = new Date(settings["defaultDate"] + "T00:00:00");
                $year.val(date.getFullYear());
                $month.val(date.getMonth() + 1);
                $day.val(date.getDate());
            }

            // Update the option sets according to options and user selections
            $fieldset.change(function() {
                // todays date values
                var todayDate = new Date(),
                    todayYear = todayDate.getFullYear(),
                    todayMonth = todayDate.getMonth() + 1,
                    todayDay = todayDate.getDate(),
                    // currently selected values
                    selectedYear = parseInt($year.val(), 10),
                    selectedMonth = parseInt($month.val(), 10),
                    selectedDay = parseInt($day.val(), 10),
                    // number of days in currently selected year/month
                    actMaxDay = (new Date(selectedYear, selectedMonth, 0)).getDate(),
                    // max values currently in the markup
                    curMaxMonth = parseInt($month.children(":last").val()),
                    curMaxDay = parseInt($day.children(":last").val());

                // Dealing with the number of days in a month
                // http://bugs.jquery.com/ticket/3041
                if (curMaxDay > actMaxDay) {
                    while (curMaxDay > actMaxDay) {
                        $day.children(":last").remove();
                        curMaxDay--;
                    }
                } else if (curMaxDay < actMaxDay) {
                    while (curMaxDay < actMaxDay) {
                        curMaxDay++;
                        $day.append("<option value=" + curMaxDay + ">" + curMaxDay + "</option>");
                    }
                }

                // Dealing with future months/days in current year
                // or months/days that fall after the minimum age
                if (!settings["futureDates"] && selectedYear == startYear) {
                    if (curMaxMonth > todayMonth) {
                        while (curMaxMonth > todayMonth) {
                            $month.children(":last").remove();
                            curMaxMonth--;
                        }
                        // reset the day selection
                        $day.children(":first").attr("selected", "selected");
                    }
                    if (selectedMonth === todayMonth) {
                        while (curMaxDay > todayDay) {
                            $day.children(":last").remove();
                            curMaxDay -= 1;
                        }
                    }
                }

                // Adding months back that may have been removed
                // http://bugs.jquery.com/ticket/3041
                if (selectedYear != startYear && curMaxMonth != 12) {
                    while (curMaxMonth < 12) {
                        $month.append("<option value=" + (curMaxMonth + 1) + ">" + months[settings["monthFormat"]][curMaxMonth] + "</option>");
                        curMaxMonth++;
                    }
                }

                // update the hidden date
                if ((selectedYear * selectedMonth * selectedDay) != 0) {
                    if (selectedMonth < 10) selectedMonth = "0" + selectedMonth;
                    if (selectedDay < 10) selectedDay = "0" + selectedDay;
                    hiddenDate = selectedYear + "-" + selectedMonth + "-" + selectedDay;
                    $(this).find('#' + settings["fieldId"]).val(hiddenDate);
                    if (settings["onChange"] != null) {
                        settings["onChange"](hiddenDate);
                    }
                }
            });
        });
    };
})(jQuery);

/*! selectize.js - v0.12.4 | https://github.com/selectize/selectize.js | Apache License (v2) */
! function(a, b) {
    "function" == typeof define && define.amd ? define("sifter", b) : "object" == typeof exports ? module.exports = b() : a.Sifter = b()
}(this, function() {
    var a = function(a, b) {
        this.items = a, this.settings = b || {
            diacritics: !0
        }
    };
    a.prototype.tokenize = function(a) {
        if (a = e(String(a || "").toLowerCase()), !a || !a.length) return [];
        var b, c, d, g, i = [],
            j = a.split(/ +/);
        for (b = 0, c = j.length; b < c; b++) {
            if (d = f(j[b]), this.settings.diacritics)
                for (g in h) h.hasOwnProperty(g) && (d = d.replace(new RegExp(g, "g"), h[g]));
            i.push({
                string: j[b],
                regex: new RegExp(d, "i")
            })
        }
        return i
    }, a.prototype.iterator = function(a, b) {
        var c;
        c = g(a) ? Array.prototype.forEach || function(a) {
            for (var b = 0, c = this.length; b < c; b++) a(this[b], b, this)
        } : function(a) {
            for (var b in this) this.hasOwnProperty(b) && a(this[b], b, this)
        }, c.apply(a, [b])
    }, a.prototype.getScoreFunction = function(a, b) {
        var c, e, f, g, h;
        c = this, a = c.prepareSearch(a, b), f = a.tokens, e = a.options.fields, g = f.length, h = a.options.nesting;
        var i = function(a, b) {
                var c, d;
                return a ? (a = String(a || ""), d = a.search(b.regex), d === -1 ? 0 : (c = b.string.length / a.length, 0 === d && (c += .5), c)) : 0
            },
            j = function() {
                var a = e.length;
                return a ? 1 === a ? function(a, b) {
                    return i(d(b, e[0], h), a)
                } : function(b, c) {
                    for (var f = 0, g = 0; f < a; f++) g += i(d(c, e[f], h), b);
                    return g / a
                } : function() {
                    return 0
                }
            }();
        return g ? 1 === g ? function(a) {
            return j(f[0], a)
        } : "and" === a.options.conjunction ? function(a) {
            for (var b, c = 0, d = 0; c < g; c++) {
                if (b = j(f[c], a), b <= 0) return 0;
                d += b
            }
            return d / g
        } : function(a) {
            for (var b = 0, c = 0; b < g; b++) c += j(f[b], a);
            return c / g
        } : function() {
            return 0
        }
    }, a.prototype.getSortFunction = function(a, c) {
        var e, f, g, h, i, j, k, l, m, n, o;
        if (g = this, a = g.prepareSearch(a, c), o = !a.query && c.sort_empty || c.sort, m = function(a, b) {
                return "$score" === a ? b.score : d(g.items[b.id], a, c.nesting)
            }, i = [], o)
            for (e = 0, f = o.length; e < f; e++)(a.query || "$score" !== o[e].field) && i.push(o[e]);
        if (a.query) {
            for (n = !0, e = 0, f = i.length; e < f; e++)
                if ("$score" === i[e].field) {
                    n = !1;
                    break
                }
            n && i.unshift({
                field: "$score",
                direction: "desc"
            })
        } else
            for (e = 0, f = i.length; e < f; e++)
                if ("$score" === i[e].field) {
                    i.splice(e, 1);
                    break
                } for (l = [], e = 0, f = i.length; e < f; e++) l.push("desc" === i[e].direction ? -1 : 1);
        return j = i.length, j ? 1 === j ? (h = i[0].field, k = l[0], function(a, c) {
            return k * b(m(h, a), m(h, c))
        }) : function(a, c) {
            var d, e, f;
            for (d = 0; d < j; d++)
                if (f = i[d].field, e = l[d] * b(m(f, a), m(f, c))) return e;
            return 0
        } : null
    }, a.prototype.prepareSearch = function(a, b) {
        if ("object" == typeof a) return a;
        b = c({}, b);
        var d = b.fields,
            e = b.sort,
            f = b.sort_empty;
        return d && !g(d) && (b.fields = [d]), e && !g(e) && (b.sort = [e]), f && !g(f) && (b.sort_empty = [f]), {
            options: b,
            query: String(a || "").toLowerCase(),
            tokens: this.tokenize(a),
            total: 0,
            items: []
        }
    }, a.prototype.search = function(a, b) {
        var c, d, e, f, g = this;
        return d = this.prepareSearch(a, b), b = d.options, a = d.query, f = b.score || g.getScoreFunction(d), a.length ? g.iterator(g.items, function(a, e) {
            c = f(a), (b.filter === !1 || c > 0) && d.items.push({
                score: c,
                id: e
            })
        }) : g.iterator(g.items, function(a, b) {
            d.items.push({
                score: 1,
                id: b
            })
        }), e = g.getSortFunction(d, b), e && d.items.sort(e), d.total = d.items.length, "number" == typeof b.limit && (d.items = d.items.slice(0, b.limit)), d
    };
    var b = function(a, b) {
            return "number" == typeof a && "number" == typeof b ? a > b ? 1 : a < b ? -1 : 0 : (a = i(String(a || "")), b = i(String(b || "")), a > b ? 1 : b > a ? -1 : 0)
        },
        c = function(a, b) {
            var c, d, e, f;
            for (c = 1, d = arguments.length; c < d; c++)
                if (f = arguments[c])
                    for (e in f) f.hasOwnProperty(e) && (a[e] = f[e]);
            return a
        },
        d = function(a, b, c) {
            if (a && b) {
                if (!c) return a[b];
                for (var d = b.split("."); d.length && (a = a[d.shift()]););
                return a
            }
        },
        e = function(a) {
            return (a + "").replace(/^\s+|\s+$|/g, "")
        },
        f = function(a) {
            return (a + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        },
        g = Array.isArray || "undefined" != typeof $ && $.isArray || function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        },
        h = {
            a: "[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]",
            b: "[b␢βΒB฿𐌁ᛒ]",
            c: "[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]",
            d: "[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]",
            e: "[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]",
            f: "[fƑƒḞḟ]",
            g: "[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]",
            h: "[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]",
            i: "[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]",
            j: "[jȷĴĵɈɉʝɟʲ]",
            k: "[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]",
            l: "[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]",
            n: "[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]",
            o: "[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]",
            p: "[pṔṕṖṗⱣᵽƤƥᵱ]",
            q: "[qꝖꝗʠɊɋꝘꝙq̃]",
            r: "[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]",
            s: "[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]",
            t: "[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]",
            u: "[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]",
            v: "[vṼṽṾṿƲʋꝞꝟⱱʋ]",
            w: "[wẂẃẀẁŴŵẄẅẆẇẈẉ]",
            x: "[xẌẍẊẋχ]",
            y: "[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]",
            z: "[zŹźẐẑŽžŻżẒẓẔẕƵƶ]"
        },
        i = function() {
            var a, b, c, d, e = "",
                f = {};
            for (c in h)
                if (h.hasOwnProperty(c))
                    for (d = h[c].substring(2, h[c].length - 1), e += d, a = 0, b = d.length; a < b; a++) f[d.charAt(a)] = c;
            var g = new RegExp("[" + e + "]", "g");
            return function(a) {
                return a.replace(g, function(a) {
                    return f[a]
                }).toLowerCase()
            }
        }();
    return a
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("microplugin", b) : "object" == typeof exports ? module.exports = b() : a.MicroPlugin = b()
}(this, function() {
    var a = {};
    a.mixin = function(a) {
        a.plugins = {}, a.prototype.initializePlugins = function(a) {
            var c, d, e, f = this,
                g = [];
            if (f.plugins = {
                    names: [],
                    settings: {},
                    requested: {},
                    loaded: {}
                }, b.isArray(a))
                for (c = 0, d = a.length; c < d; c++) "string" == typeof a[c] ? g.push(a[c]) : (f.plugins.settings[a[c].name] = a[c].options, g.push(a[c].name));
            else if (a)
                for (e in a) a.hasOwnProperty(e) && (f.plugins.settings[e] = a[e], g.push(e));
            for (; g.length;) f.require(g.shift())
        }, a.prototype.loadPlugin = function(b) {
            var c = this,
                d = c.plugins,
                e = a.plugins[b];
            if (!a.plugins.hasOwnProperty(b)) throw new Error('Unable to find "' + b + '" plugin');
            d.requested[b] = !0, d.loaded[b] = e.fn.apply(c, [c.plugins.settings[b] || {}]), d.names.push(b)
        }, a.prototype.require = function(a) {
            var b = this,
                c = b.plugins;
            if (!b.plugins.loaded.hasOwnProperty(a)) {
                if (c.requested[a]) throw new Error('Plugin has circular dependency ("' + a + '")');
                b.loadPlugin(a)
            }
            return c.loaded[a]
        }, a.define = function(b, c) {
            a.plugins[b] = {
                name: b,
                fn: c
            }
        }
    };
    var b = {
        isArray: Array.isArray || function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }
    };
    return a
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("selectize", ["jquery", "sifter", "microplugin"], b) : "object" == typeof exports ? module.exports = b(require("jquery"), require("sifter"), require("microplugin")) : a.Selectize = b(a.jQuery, a.Sifter, a.MicroPlugin)
}(this, function(a, b, c) {
    "use strict";
    var d = function(a, b) {
        if ("string" != typeof b || b.length) {
            var c = "string" == typeof b ? new RegExp(b, "i") : b,
                d = function(a) {
                    var b = 0;
                    if (3 === a.nodeType) {
                        var e = a.data.search(c);
                        if (e >= 0 && a.data.length > 0) {
                            var f = a.data.match(c),
                                g = document.createElement("span");
                            g.className = "highlight";
                            var h = a.splitText(e),
                                i = (h.splitText(f[0].length), h.cloneNode(!0));
                            g.appendChild(i), h.parentNode.replaceChild(g, h), b = 1
                        }
                    } else if (1 === a.nodeType && a.childNodes && !/(script|style)/i.test(a.tagName))
                        for (var j = 0; j < a.childNodes.length; ++j) j += d(a.childNodes[j]);
                    return b
                };
            return a.each(function() {
                d(this)
            })
        }
    };
    a.fn.removeHighlight = function() {
        return this.find("span.highlight").each(function() {
            this.parentNode.firstChild.nodeName;
            var a = this.parentNode;
            a.replaceChild(this.firstChild, this), a.normalize()
        }).end()
    };
    var e = function() {};
    e.prototype = {
        on: function(a, b) {
            this._events = this._events || {}, this._events[a] = this._events[a] || [], this._events[a].push(b)
        },
        off: function(a, b) {
            var c = arguments.length;
            return 0 === c ? delete this._events : 1 === c ? delete this._events[a] : (this._events = this._events || {}, void(a in this._events != !1 && this._events[a].splice(this._events[a].indexOf(b), 1)))
        },
        trigger: function(a) {
            if (this._events = this._events || {}, a in this._events != !1)
                for (var b = 0; b < this._events[a].length; b++) this._events[a][b].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    }, e.mixin = function(a) {
        for (var b = ["on", "off", "trigger"], c = 0; c < b.length; c++) a.prototype[b[c]] = e.prototype[b[c]]
    };
    var f = /Mac/.test(navigator.userAgent),
        g = 65,
        h = 13,
        i = 27,
        j = 37,
        k = 38,
        l = 80,
        m = 39,
        n = 40,
        o = 78,
        p = 8,
        q = 46,
        r = 16,
        s = f ? 91 : 17,
        t = f ? 18 : 17,
        u = 9,
        v = 1,
        w = 2,
        x = !/android/i.test(window.navigator.userAgent) && !!document.createElement("input").validity,
        y = function(a) {
            return "undefined" != typeof a
        },
        z = function(a) {
            return "undefined" == typeof a || null === a ? null : "boolean" == typeof a ? a ? "1" : "0" : a + ""
        },
        A = function(a) {
            return (a + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        },
        B = {};
    B.before = function(a, b, c) {
        var d = a[b];
        a[b] = function() {
            return c.apply(a, arguments), d.apply(a, arguments)
        }
    }, B.after = function(a, b, c) {
        var d = a[b];
        a[b] = function() {
            var b = d.apply(a, arguments);
            return c.apply(a, arguments), b
        }
    };
    var C = function(a) {
            var b = !1;
            return function() {
                b || (b = !0, a.apply(this, arguments))
            }
        },
        D = function(a, b) {
            var c;
            return function() {
                var d = this,
                    e = arguments;
                window.clearTimeout(c), c = window.setTimeout(function() {
                    a.apply(d, e)
                }, b)
            }
        },
        E = function(a, b, c) {
            var d, e = a.trigger,
                f = {};
            a.trigger = function() {
                var c = arguments[0];
                return b.indexOf(c) === -1 ? e.apply(a, arguments) : void(f[c] = arguments)
            }, c.apply(a, []), a.trigger = e;
            for (d in f) f.hasOwnProperty(d) && e.apply(a, f[d])
        },
        F = function(a, b, c, d) {
            a.on(b, c, function(b) {
                for (var c = b.target; c && c.parentNode !== a[0];) c = c.parentNode;
                return b.currentTarget = c, d.apply(this, [b])
            })
        },
        G = function(a) {
            var b = {};
            if ("selectionStart" in a) b.start = a.selectionStart, b.length = a.selectionEnd - b.start;
            else if (document.selection) {
                a.focus();
                var c = document.selection.createRange(),
                    d = document.selection.createRange().text.length;
                c.moveStart("character", -a.value.length), b.start = c.text.length - d, b.length = d
            }
            return b
        },
        H = function(a, b, c) {
            var d, e, f = {};
            if (c)
                for (d = 0, e = c.length; d < e; d++) f[c[d]] = a.css(c[d]);
            else f = a.css();
            b.css(f)
        },
        I = function(b, c) {
            if (!b) return 0;
            var d = a("<test>").css({
                position: "absolute",
                top: -99999,
                left: -99999,
                width: "auto",
                padding: 0,
                whiteSpace: "pre"
            }).text(b).appendTo("body");
            H(c, d, ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"]);
            var e = d.width();
            return d.remove(), e
        },
        J = function(a) {
            var b = null,
                c = function(c, d) {
                    var e, f, g, h, i, j, k, l;
                    c = c || window.event || {}, d = d || {}, c.metaKey || c.altKey || (d.force || a.data("grow") !== !1) && (e = a.val(), c.type && "keydown" === c.type.toLowerCase() && (f = c.keyCode, g = f >= 97 && f <= 122 || f >= 65 && f <= 90 || f >= 48 && f <= 57 || 32 === f, f === q || f === p ? (l = G(a[0]), l.length ? e = e.substring(0, l.start) + e.substring(l.start + l.length) : f === p && l.start ? e = e.substring(0, l.start - 1) + e.substring(l.start + 1) : f === q && "undefined" != typeof l.start && (e = e.substring(0, l.start) + e.substring(l.start + 1))) : g && (j = c.shiftKey, k = String.fromCharCode(c.keyCode), k = j ? k.toUpperCase() : k.toLowerCase(), e += k)), h = a.attr("placeholder"), !e && h && (e = h), i = I(e, a) + 4, i !== b && (b = i, a.width(i), a.triggerHandler("resize")))
                };
            a.on("keydown keyup update blur", c), c()
        },
        K = function(a) {
            var b = document.createElement("div");
            return b.appendChild(a.cloneNode(!0)), b.innerHTML
        },
        L = function(a, b) {
            b || (b = {});
            var c = "Selectize";
            console.error(c + ": " + a), b.explanation && (console.group && console.group(), console.error(b.explanation), console.group && console.groupEnd())
        },
        M = function(c, d) {
            var e, f, g, h, i = this;
            h = c[0], h.selectize = i;
            var j = window.getComputedStyle && window.getComputedStyle(h, null);
            if (g = j ? j.getPropertyValue("direction") : h.currentStyle && h.currentStyle.direction, g = g || c.parents("[dir]:first").attr("dir") || "", a.extend(i, {
                    order: 0,
                    settings: d,
                    $input: c,
                    tabIndex: c.attr("tabindex") || "",
                    tagType: "select" === h.tagName.toLowerCase() ? v : w,
                    rtl: /rtl/i.test(g),
                    eventNS: ".selectize" + ++M.count,
                    highlightedValue: null,
                    isOpen: !1,
                    isDisabled: !1,
                    isRequired: c.is("[required]"),
                    isInvalid: !1,
                    isLocked: !1,
                    isFocused: !1,
                    isInputHidden: !1,
                    isSetup: !1,
                    isShiftDown: !1,
                    isCmdDown: !1,
                    isCtrlDown: !1,
                    ignoreFocus: !1,
                    ignoreBlur: !1,
                    ignoreHover: !1,
                    hasOptions: !1,
                    currentResults: null,
                    lastValue: "",
                    caretPos: 0,
                    loading: 0,
                    loadedSearches: {},
                    $activeOption: null,
                    $activeItems: [],
                    optgroups: {},
                    options: {},
                    userOptions: {},
                    items: [],
                    renderCache: {},
                    onSearchChange: null === d.loadThrottle ? i.onSearchChange : D(i.onSearchChange, d.loadThrottle)
                }), i.sifter = new b(this.options, {
                    diacritics: d.diacritics
                }), i.settings.options) {
                for (e = 0, f = i.settings.options.length; e < f; e++) i.registerOption(i.settings.options[e]);
                delete i.settings.options
            }
            if (i.settings.optgroups) {
                for (e = 0, f = i.settings.optgroups.length; e < f; e++) i.registerOptionGroup(i.settings.optgroups[e]);
                delete i.settings.optgroups
            }
            i.settings.mode = i.settings.mode || (1 === i.settings.maxItems ? "single" : "multi"), "boolean" != typeof i.settings.hideSelected && (i.settings.hideSelected = "multi" === i.settings.mode), i.initializePlugins(i.settings.plugins), i.setupCallbacks(), i.setupTemplates(), i.setup()
        };
    return e.mixin(M), "undefined" != typeof c ? c.mixin(M) : L("Dependency MicroPlugin is missing", {
        explanation: 'Make sure you either: (1) are using the "standalone" version of Selectize, or (2) require MicroPlugin before you load Selectize.'
    }), a.extend(M.prototype, {
        setup: function() {
            var b, c, d, e, g, h, i, j, k, l, m = this,
                n = m.settings,
                o = m.eventNS,
                p = a(window),
                q = a(document),
                u = m.$input;
            if (i = m.settings.mode, j = u.attr("class") || "", b = a("<div>").addClass(n.wrapperClass).addClass(j).addClass(i), c = a("<div>").addClass(n.inputClass).addClass("items").appendTo(b), d = a('<input type="text" autocomplete="off" />').appendTo(c).attr("tabindex", u.is(":disabled") ? "-1" : m.tabIndex), h = a(n.dropdownParent || b), e = a("<div>").addClass(n.dropdownClass).addClass(i).hide().appendTo(h), g = a("<div>").addClass(n.dropdownContentClass).appendTo(e), (l = u.attr("id")) && (d.attr("id", l + "-selectized"), a("label[for='" + l + "']").attr("for", l + "-selectized")), m.settings.copyClassesToDropdown && e.addClass(j), b.css({
                    width: u[0].style.width
                }), m.plugins.names.length && (k = "plugin-" + m.plugins.names.join(" plugin-"), b.addClass(k), e.addClass(k)), (null === n.maxItems || n.maxItems > 1) && m.tagType === v && u.attr("multiple", "multiple"), m.settings.placeholder && d.attr("placeholder", n.placeholder), !m.settings.splitOn && m.settings.delimiter) {
                var w = m.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                m.settings.splitOn = new RegExp("\\s*" + w + "+\\s*")
            }
            u.attr("autocorrect") && d.attr("autocorrect", u.attr("autocorrect")), u.attr("autocapitalize") && d.attr("autocapitalize", u.attr("autocapitalize")), m.$wrapper = b, m.$control = c, m.$control_input = d, m.$dropdown = e, m.$dropdown_content = g, e.on("mouseenter", "[data-selectable]", function() {
                return m.onOptionHover.apply(m, arguments)
            }), e.on("mousedown click", "[data-selectable]", function() {
                return m.onOptionSelect.apply(m, arguments)
            }), F(c, "mousedown", "*:not(input)", function() {
                return m.onItemSelect.apply(m, arguments)
            }), J(d), c.on({
                mousedown: function() {
                    return m.onMouseDown.apply(m, arguments)
                },
                click: function() {
                    return m.onClick.apply(m, arguments)
                }
            }), d.on({
                mousedown: function(a) {
                    a.stopPropagation()
                },
                keydown: function() {
                    return m.onKeyDown.apply(m, arguments)
                },
                keyup: function() {
                    return m.onKeyUp.apply(m, arguments)
                },
                keypress: function() {
                    return m.onKeyPress.apply(m, arguments)
                },
                resize: function() {
                    m.positionDropdown.apply(m, [])
                },
                blur: function() {
                    return m.onBlur.apply(m, arguments)
                },
                focus: function() {
                    return m.ignoreBlur = !1, m.onFocus.apply(m, arguments)
                },
                paste: function() {
                    return m.onPaste.apply(m, arguments)
                }
            }), q.on("keydown" + o, function(a) {
                m.isCmdDown = a[f ? "metaKey" : "ctrlKey"], m.isCtrlDown = a[f ? "altKey" : "ctrlKey"], m.isShiftDown = a.shiftKey
            }), q.on("keyup" + o, function(a) {
                a.keyCode === t && (m.isCtrlDown = !1), a.keyCode === r && (m.isShiftDown = !1), a.keyCode === s && (m.isCmdDown = !1)
            }), q.on("mousedown" + o, function(a) {
                if (m.isFocused) {
                    if (a.target === m.$dropdown[0] || a.target.parentNode === m.$dropdown[0]) return !1;
                    m.$control.has(a.target).length || a.target === m.$control[0] || m.blur(a.target)
                }
            }), p.on(["scroll" + o, "resize" + o].join(" "), function() {
                m.isOpen && m.positionDropdown.apply(m, arguments)
            }), p.on("mousemove" + o, function() {
                m.ignoreHover = !1
            }), this.revertSettings = {
                $children: u.children().detach(),
                tabindex: u.attr("tabindex")
            }, u.attr("tabindex", -1).hide().after(m.$wrapper), a.isArray(n.items) && (m.setValue(n.items), delete n.items), x && u.on("invalid" + o, function(a) {
                a.preventDefault(), m.isInvalid = !0, m.refreshState()
            }), m.updateOriginalInput(), m.refreshItems(), m.refreshState(), m.updatePlaceholder(), m.isSetup = !0, u.is(":disabled") && m.disable(), m.on("change", this.onChange), u.data("selectize", m), u.addClass("selectized"), m.trigger("initialize"), n.preload === !0 && m.onSearchChange("")
        },
        setupTemplates: function() {
            var b = this,
                c = b.settings.labelField,
                d = b.settings.optgroupLabelField,
                e = {
                    optgroup: function(a) {
                        return '<div class="optgroup">' + a.html + "</div>"
                    },
                    optgroup_header: function(a, b) {
                        return '<div class="optgroup-header">' + b(a[d]) + "</div>"
                    },
                    option: function(a, b) {
                        return '<div class="option">' + b(a[c]) + "</div>"
                    },
                    item: function(a, b) {
                        return '<div class="item">' + b(a[c]) + "</div>"
                    },
                    option_create: function(a, b) {
                        return '<div class="create">Add <strong>' + b(a.input) + "</strong>&hellip;</div>"
                    }
                };
            b.settings.render = a.extend({}, e, b.settings.render)
        },
        setupCallbacks: function() {
            var a, b, c = {
                initialize: "onInitialize",
                change: "onChange",
                item_add: "onItemAdd",
                item_remove: "onItemRemove",
                clear: "onClear",
                option_add: "onOptionAdd",
                option_remove: "onOptionRemove",
                option_clear: "onOptionClear",
                optgroup_add: "onOptionGroupAdd",
                optgroup_remove: "onOptionGroupRemove",
                optgroup_clear: "onOptionGroupClear",
                dropdown_open: "onDropdownOpen",
                dropdown_close: "onDropdownClose",
                type: "onType",
                load: "onLoad",
                focus: "onFocus",
                blur: "onBlur"
            };
            for (a in c) c.hasOwnProperty(a) && (b = this.settings[c[a]], b && this.on(a, b))
        },
        onClick: function(a) {
            var b = this;
            b.isFocused || (b.focus(), a.preventDefault())
        },
        onMouseDown: function(b) {
            var c = this,
                d = b.isDefaultPrevented();
            a(b.target);
            if (c.isFocused) {
                if (b.target !== c.$control_input[0]) return "single" === c.settings.mode ? c.isOpen ? c.close() : c.open() : d || c.setActiveItem(null), !1
            } else d || window.setTimeout(function() {
                c.focus()
            }, 0)
        },
        onChange: function() {
            this.$input.trigger("change")
        },
        onPaste: function(b) {
            var c = this;
            return c.isFull() || c.isInputHidden || c.isLocked ? void b.preventDefault() : void(c.settings.splitOn && setTimeout(function() {
                var b = c.$control_input.val();
                if (b.match(c.settings.splitOn))
                    for (var d = a.trim(b).split(c.settings.splitOn), e = 0, f = d.length; e < f; e++) c.createItem(d[e])
            }, 0))
        },
        onKeyPress: function(a) {
            if (this.isLocked) return a && a.preventDefault();
            var b = String.fromCharCode(a.keyCode || a.which);
            return this.settings.create && "multi" === this.settings.mode && b === this.settings.delimiter ? (this.createItem(), a.preventDefault(), !1) : void 0
        },
        onKeyDown: function(a) {
            var b = (a.target === this.$control_input[0], this);
            if (b.isLocked) return void(a.keyCode !== u && a.preventDefault());
            switch (a.keyCode) {
                case g:
                    if (b.isCmdDown) return void b.selectAll();
                    break;
                case i:
                    return void(b.isOpen && (a.preventDefault(), a.stopPropagation(), b.close()));
                case o:
                    if (!a.ctrlKey || a.altKey) break;
                case n:
                    if (!b.isOpen && b.hasOptions) b.open();
                    else if (b.$activeOption) {
                        b.ignoreHover = !0;
                        var c = b.getAdjacentOption(b.$activeOption, 1);
                        c.length && b.setActiveOption(c, !0, !0)
                    }
                    return void a.preventDefault();
                case l:
                    if (!a.ctrlKey || a.altKey) break;
                case k:
                    if (b.$activeOption) {
                        b.ignoreHover = !0;
                        var d = b.getAdjacentOption(b.$activeOption, -1);
                        d.length && b.setActiveOption(d, !0, !0)
                    }
                    return void a.preventDefault();
                case h:
                    return void(b.isOpen && b.$activeOption && (b.onOptionSelect({
                        currentTarget: b.$activeOption
                    }), a.preventDefault()));
                case j:
                    return void b.advanceSelection(-1, a);
                case m:
                    return void b.advanceSelection(1, a);
                case u:
                    return b.settings.selectOnTab && b.isOpen && b.$activeOption && (b.onOptionSelect({
                        currentTarget: b.$activeOption
                    }), b.isFull() || a.preventDefault()), void(b.settings.create && b.createItem() && a.preventDefault());
                case p:
                case q:
                    return void b.deleteSelection(a)
            }
            return !b.isFull() && !b.isInputHidden || (f ? a.metaKey : a.ctrlKey) ? void 0 : void a.preventDefault()
        },
        onKeyUp: function(a) {
            var b = this;
            if (b.isLocked) return a && a.preventDefault();
            var c = b.$control_input.val() || "";
            b.lastValue !== c && (b.lastValue = c, b.onSearchChange(c), b.refreshOptions(), b.trigger("type", c))
        },
        onSearchChange: function(a) {
            var b = this,
                c = b.settings.load;
            c && (b.loadedSearches.hasOwnProperty(a) || (b.loadedSearches[a] = !0, b.load(function(d) {
                c.apply(b, [a, d])
            })))
        },
        onFocus: function(a) {
            var b = this,
                c = b.isFocused;
            return b.isDisabled ? (b.blur(), a && a.preventDefault(), !1) : void(b.ignoreFocus || (b.isFocused = !0, "focus" === b.settings.preload && b.onSearchChange(""), c || b.trigger("focus"), b.$activeItems.length || (b.showInput(), b.setActiveItem(null), b.refreshOptions(!!b.settings.openOnFocus)), b.refreshState()))
        },
        onBlur: function(a, b) {
            var c = this;
            if (c.isFocused && (c.isFocused = !1, !c.ignoreFocus)) {
                if (!c.ignoreBlur && document.activeElement === c.$dropdown_content[0]) return c.ignoreBlur = !0, void c.onFocus(a);
                var d = function() {
                    c.close(), c.setTextboxValue(""), c.setActiveItem(null), c.setActiveOption(null), c.setCaret(c.items.length), c.refreshState(), b && b.focus && b.focus(), c.ignoreFocus = !1, c.trigger("blur")
                };
                c.ignoreFocus = !0, c.settings.create && c.settings.createOnBlur ? c.createItem(null, !1, d) : d()
            }
        },
        onOptionHover: function(a) {
            this.ignoreHover || this.setActiveOption(a.currentTarget, !1)
        },
        onOptionSelect: function(b) {
            var c, d, e = this;
            b.preventDefault && (b.preventDefault(), b.stopPropagation()), d = a(b.currentTarget), d.hasClass("create") ? e.createItem(null, function() {
                e.settings.closeAfterSelect && e.close()
            }) : (c = d.attr("data-value"), "undefined" != typeof c && (e.lastQuery = null, e.setTextboxValue(""), e.addItem(c), e.settings.closeAfterSelect ? e.close() : !e.settings.hideSelected && b.type && /mouse/.test(b.type) && e.setActiveOption(e.getOption(c))))
        },
        onItemSelect: function(a) {
            var b = this;
            b.isLocked || "multi" === b.settings.mode && (a.preventDefault(), b.setActiveItem(a.currentTarget, a))
        },
        load: function(a) {
            var b = this,
                c = b.$wrapper.addClass(b.settings.loadingClass);
            b.loading++, a.apply(b, [function(a) {
                b.loading = Math.max(b.loading - 1, 0), a && a.length && (b.addOption(a), b.refreshOptions(b.isFocused && !b.isInputHidden)), b.loading || c.removeClass(b.settings.loadingClass), b.trigger("load", a)
            }])
        },
        setTextboxValue: function(a) {
            var b = this.$control_input,
                c = b.val() !== a;
            c && (b.val(a).triggerHandler("update"), this.lastValue = a)
        },
        getValue: function() {
            return this.tagType === v && this.$input.attr("multiple") ? this.items : this.items.join(this.settings.delimiter)
        },
        setValue: function(a, b) {
            var c = b ? [] : ["change"];
            E(this, c, function() {
                this.clear(b), this.addItems(a, b)
            })
        },
        setActiveItem: function(b, c) {
            var d, e, f, g, h, i, j, k, l = this;
            if ("single" !== l.settings.mode) {
                if (b = a(b), !b.length) return a(l.$activeItems).removeClass("active"), l.$activeItems = [], void(l.isFocused && l.showInput());
                if (d = c && c.type.toLowerCase(), "mousedown" === d && l.isShiftDown && l.$activeItems.length) {
                    for (k = l.$control.children(".active:last"), g = Array.prototype.indexOf.apply(l.$control[0].childNodes, [k[0]]), h = Array.prototype.indexOf.apply(l.$control[0].childNodes, [b[0]]), g > h && (j = g, g = h, h = j), e = g; e <= h; e++) i = l.$control[0].childNodes[e], l.$activeItems.indexOf(i) === -1 && (a(i).addClass("active"), l.$activeItems.push(i));
                    c.preventDefault()
                } else "mousedown" === d && l.isCtrlDown || "keydown" === d && this.isShiftDown ? b.hasClass("active") ? (f = l.$activeItems.indexOf(b[0]), l.$activeItems.splice(f, 1), b.removeClass("active")) : l.$activeItems.push(b.addClass("active")[0]) : (a(l.$activeItems).removeClass("active"), l.$activeItems = [b.addClass("active")[0]]);
                l.hideInput(), this.isFocused || l.focus()
            }
        },
        setActiveOption: function(b, c, d) {
            var e, f, g, h, i, j = this;
            j.$activeOption && j.$activeOption.removeClass("active"), j.$activeOption = null, b = a(b), b.length && (j.$activeOption = b.addClass("active"), !c && y(c) || (e = j.$dropdown_content.height(), f = j.$activeOption.outerHeight(!0), c = j.$dropdown_content.scrollTop() || 0, g = j.$activeOption.offset().top - j.$dropdown_content.offset().top + c, h = g, i = g - e + f, g + f > e + c ? j.$dropdown_content.stop().animate({
                scrollTop: i
            }, d ? j.settings.scrollDuration : 0) : g < c && j.$dropdown_content.stop().animate({
                scrollTop: h
            }, d ? j.settings.scrollDuration : 0)))
        },
        selectAll: function() {
            var a = this;
            "single" !== a.settings.mode && (a.$activeItems = Array.prototype.slice.apply(a.$control.children(":not(input)").addClass("active")), a.$activeItems.length && (a.hideInput(), a.close()), a.focus())
        },
        hideInput: function() {
            var a = this;
            a.setTextboxValue(""), a.$control_input.css({
                opacity: 0,
                position: "absolute",
                left: a.rtl ? 1e4 : -1e4
            }), a.isInputHidden = !0
        },
        showInput: function() {
            this.$control_input.css({
                opacity: 1,
                position: "relative",
                left: 0
            }), this.isInputHidden = !1
        },
        focus: function() {
            var a = this;
            a.isDisabled || (a.ignoreFocus = !0, a.$control_input[0].focus(), window.setTimeout(function() {
                a.ignoreFocus = !1, a.onFocus()
            }, 0))
        },
        blur: function(a) {
            this.$control_input[0].blur(), this.onBlur(null, a)
        },
        getScoreFunction: function(a) {
            return this.sifter.getScoreFunction(a, this.getSearchOptions())
        },
        getSearchOptions: function() {
            var a = this.settings,
                b = a.sortField;
            return "string" == typeof b && (b = [{
                field: b
            }]), {
                fields: a.searchField,
                conjunction: a.searchConjunction,
                sort: b
            }
        },
        search: function(b) {
            var c, d, e, f = this,
                g = f.settings,
                h = this.getSearchOptions();
            if (g.score && (e = f.settings.score.apply(this, [b]), "function" != typeof e)) throw new Error('Selectize "score" setting must be a function that returns a function');
            if (b !== f.lastQuery ? (f.lastQuery = b, d = f.sifter.search(b, a.extend(h, {
                    score: e
                })), f.currentResults = d) : d = a.extend(!0, {}, f.currentResults), g.hideSelected)
                for (c = d.items.length - 1; c >= 0; c--) f.items.indexOf(z(d.items[c].id)) !== -1 && d.items.splice(c, 1);
            return d
        },
        refreshOptions: function(b) {
            var c, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
            "undefined" == typeof b && (b = !0);
            var t = this,
                u = a.trim(t.$control_input.val()),
                v = t.search(u),
                w = t.$dropdown_content,
                x = t.$activeOption && z(t.$activeOption.attr("data-value"));
            for (g = v.items.length, "number" == typeof t.settings.maxOptions && (g = Math.min(g, t.settings.maxOptions)), h = {}, i = [], c = 0; c < g; c++)
                for (j = t.options[v.items[c].id], k = t.render("option", j), l = j[t.settings.optgroupField] || "", m = a.isArray(l) ? l : [l], e = 0, f = m && m.length; e < f; e++) l = m[e], t.optgroups.hasOwnProperty(l) || (l = ""), h.hasOwnProperty(l) || (h[l] = document.createDocumentFragment(), i.push(l)), h[l].appendChild(k);
            for (this.settings.lockOptgroupOrder && i.sort(function(a, b) {
                    var c = t.optgroups[a].$order || 0,
                        d = t.optgroups[b].$order || 0;
                    return c - d
                }), n = document.createDocumentFragment(), c = 0, g = i.length; c < g; c++) l = i[c], t.optgroups.hasOwnProperty(l) && h[l].childNodes.length ? (o = document.createDocumentFragment(), o.appendChild(t.render("optgroup_header", t.optgroups[l])), o.appendChild(h[l]), n.appendChild(t.render("optgroup", a.extend({}, t.optgroups[l], {
                html: K(o),
                dom: o
            })))) : n.appendChild(h[l]);
            if (w.html(n), t.settings.highlight && v.query.length && v.tokens.length)
                for (w.removeHighlight(), c = 0, g = v.tokens.length; c < g; c++) d(w, v.tokens[c].regex);
            if (!t.settings.hideSelected)
                for (c = 0, g = t.items.length; c < g; c++) t.getOption(t.items[c]).addClass("selected");
            p = t.canCreate(u), p && (w.prepend(t.render("option_create", {
                input: u
            })), s = a(w[0].childNodes[0])), t.hasOptions = v.items.length > 0 || p, t.hasOptions ? (v.items.length > 0 ? (r = x && t.getOption(x), r && r.length ? q = r : "single" === t.settings.mode && t.items.length && (q = t.getOption(t.items[0])), q && q.length || (q = s && !t.settings.addPrecedence ? t.getAdjacentOption(s, 1) : w.find("[data-selectable]:first"))) : q = s, t.setActiveOption(q), b && !t.isOpen && t.open()) : (t.setActiveOption(null), b && t.isOpen && t.close())
        },
        addOption: function(b) {
            var c, d, e, f = this;
            if (a.isArray(b))
                for (c = 0, d = b.length; c < d; c++) f.addOption(b[c]);
            else(e = f.registerOption(b)) && (f.userOptions[e] = !0, f.lastQuery = null, f.trigger("option_add", e, b))
        },
        registerOption: function(a) {
            var b = z(a[this.settings.valueField]);
            return "undefined" != typeof b && null !== b && !this.options.hasOwnProperty(b) && (a.$order = a.$order || ++this.order, this.options[b] = a, b)
        },
        registerOptionGroup: function(a) {
            var b = z(a[this.settings.optgroupValueField]);
            return !!b && (a.$order = a.$order || ++this.order, this.optgroups[b] = a, b)
        },
        addOptionGroup: function(a, b) {
            b[this.settings.optgroupValueField] = a, (a = this.registerOptionGroup(b)) && this.trigger("optgroup_add", a, b)
        },
        removeOptionGroup: function(a) {
            this.optgroups.hasOwnProperty(a) && (delete this.optgroups[a], this.renderCache = {}, this.trigger("optgroup_remove", a))
        },
        clearOptionGroups: function() {
            this.optgroups = {}, this.renderCache = {}, this.trigger("optgroup_clear")
        },
        updateOption: function(b, c) {
            var d, e, f, g, h, i, j, k = this;
            if (b = z(b), f = z(c[k.settings.valueField]), null !== b && k.options.hasOwnProperty(b)) {
                if ("string" != typeof f) throw new Error("Value must be set in option data");
                j = k.options[b].$order, f !== b && (delete k.options[b], g = k.items.indexOf(b), g !== -1 && k.items.splice(g, 1, f)), c.$order = c.$order || j, k.options[f] = c, h = k.renderCache.item, i = k.renderCache.option, h && (delete h[b], delete h[f]), i && (delete i[b], delete i[f]), k.items.indexOf(f) !== -1 && (d = k.getItem(b), e = a(k.render("item", c)), d.hasClass("active") && e.addClass("active"), d.replaceWith(e)), k.lastQuery = null, k.isOpen && k.refreshOptions(!1)
            }
        },
        removeOption: function(a, b) {
            var c = this;
            a = z(a);
            var d = c.renderCache.item,
                e = c.renderCache.option;
            d && delete d[a], e && delete e[a], delete c.userOptions[a], delete c.options[a], c.lastQuery = null, c.trigger("option_remove", a), c.removeItem(a, b)
        },
        clearOptions: function() {
            var a = this;
            a.loadedSearches = {}, a.userOptions = {}, a.renderCache = {}, a.options = a.sifter.items = {}, a.lastQuery = null, a.trigger("option_clear"), a.clear()
        },
        getOption: function(a) {
            return this.getElementWithValue(a, this.$dropdown_content.find("[data-selectable]"))
        },
        getAdjacentOption: function(b, c) {
            var d = this.$dropdown.find("[data-selectable]"),
                e = d.index(b) + c;
            return e >= 0 && e < d.length ? d.eq(e) : a()
        },
        getElementWithValue: function(b, c) {
            if (b = z(b), "undefined" != typeof b && null !== b)
                for (var d = 0, e = c.length; d < e; d++)
                    if (c[d].getAttribute("data-value") === b) return a(c[d]);
            return a()
        },
        getItem: function(a) {
            return this.getElementWithValue(a, this.$control.children())
        },
        addItems: function(b, c) {
            for (var d = a.isArray(b) ? b : [b], e = 0, f = d.length; e < f; e++) this.isPending = e < f - 1, this.addItem(d[e], c)
        },
        addItem: function(b, c) {
            var d = c ? [] : ["change"];
            E(this, d, function() {
                var d, e, f, g, h, i = this,
                    j = i.settings.mode;
                return b = z(b), i.items.indexOf(b) !== -1 ? void("single" === j && i.close()) : void(i.options.hasOwnProperty(b) && ("single" === j && i.clear(c), "multi" === j && i.isFull() || (d = a(i.render("item", i.options[b])), h = i.isFull(), i.items.splice(i.caretPos, 0, b), i.insertAtCaret(d), (!i.isPending || !h && i.isFull()) && i.refreshState(), i.isSetup && (f = i.$dropdown_content.find("[data-selectable]"), i.isPending || (e = i.getOption(b), g = i.getAdjacentOption(e, 1).attr("data-value"), i.refreshOptions(i.isFocused && "single" !== j), g && i.setActiveOption(i.getOption(g))), !f.length || i.isFull() ? i.close() : i.positionDropdown(), i.updatePlaceholder(), i.trigger("item_add", b, d), i.updateOriginalInput({
                    silent: c
                })))))
            })
        },
        removeItem: function(b, c) {
            var d, e, f, g = this;
            d = b instanceof a ? b : g.getItem(b), b = z(d.attr("data-value")), e = g.items.indexOf(b), e !== -1 && (d.remove(), d.hasClass("active") && (f = g.$activeItems.indexOf(d[0]), g.$activeItems.splice(f, 1)), g.items.splice(e, 1), g.lastQuery = null, !g.settings.persist && g.userOptions.hasOwnProperty(b) && g.removeOption(b, c), e < g.caretPos && g.setCaret(g.caretPos - 1), g.refreshState(), g.updatePlaceholder(), g.updateOriginalInput({
                silent: c
            }), g.positionDropdown(), g.trigger("item_remove", b, d))
        },
        createItem: function(b, c) {
            var d = this,
                e = d.caretPos;
            b = b || a.trim(d.$control_input.val() || "");
            var f = arguments[arguments.length - 1];
            if ("function" != typeof f && (f = function() {}), "boolean" != typeof c && (c = !0), !d.canCreate(b)) return f(), !1;
            d.lock();
            var g = "function" == typeof d.settings.create ? this.settings.create : function(a) {
                    var b = {};
                    return b[d.settings.labelField] = a, b[d.settings.valueField] = a, b
                },
                h = C(function(a) {
                    if (d.unlock(), !a || "object" != typeof a) return f();
                    var b = z(a[d.settings.valueField]);
                    return "string" != typeof b ? f() : (d.setTextboxValue(""), d.addOption(a), d.setCaret(e), d.addItem(b), d.refreshOptions(c && "single" !== d.settings.mode), void f(a))
                }),
                i = g.apply(this, [b, h]);
            return "undefined" != typeof i && h(i), !0
        },
        refreshItems: function() {
            this.lastQuery = null, this.isSetup && this.addItem(this.items), this.refreshState(), this.updateOriginalInput()
        },
        refreshState: function() {
            this.refreshValidityState(), this.refreshClasses()
        },
        refreshValidityState: function() {
            if (!this.isRequired) return !1;
            var a = !this.items.length;
            this.isInvalid = a, this.$control_input.prop("required", a), this.$input.prop("required", !a)
        },
        refreshClasses: function() {
            var b = this,
                c = b.isFull(),
                d = b.isLocked;
            b.$wrapper.toggleClass("rtl", b.rtl), b.$control.toggleClass("focus", b.isFocused).toggleClass("disabled", b.isDisabled).toggleClass("required", b.isRequired).toggleClass("invalid", b.isInvalid).toggleClass("locked", d).toggleClass("full", c).toggleClass("not-full", !c).toggleClass("input-active", b.isFocused && !b.isInputHidden).toggleClass("dropdown-active", b.isOpen).toggleClass("has-options", !a.isEmptyObject(b.options)).toggleClass("has-items", b.items.length > 0), b.$control_input.data("grow", !c && !d)
        },
        isFull: function() {
            return null !== this.settings.maxItems && this.items.length >= this.settings.maxItems
        },
        updateOriginalInput: function(a) {
            var b, c, d, e, f = this;
            if (a = a || {}, f.tagType === v) {
                for (d = [], b = 0, c = f.items.length; b < c; b++) e = f.options[f.items[b]][f.settings.labelField] || "", d.push('<option value="' + A(f.items[b]) + '" selected="selected">' + A(e) + "</option>");
                d.length || this.$input.attr("multiple") || d.push('<option value="" selected="selected"></option>'),
                    f.$input.html(d.join(""))
            } else f.$input.val(f.getValue()), f.$input.attr("value", f.$input.val());
            f.isSetup && (a.silent || f.trigger("change", f.$input.val()))
        },
        updatePlaceholder: function() {
            if (this.settings.placeholder) {
                var a = this.$control_input;
                this.items.length ? a.removeAttr("placeholder") : a.attr("placeholder", this.settings.placeholder), a.triggerHandler("update", {
                    force: !0
                })
            }
        },
        open: function() {
            var a = this;
            a.isLocked || a.isOpen || "multi" === a.settings.mode && a.isFull() || (a.focus(), a.isOpen = !0, a.refreshState(), a.$dropdown.css({
                visibility: "hidden",
                display: "block"
            }), a.positionDropdown(), a.$dropdown.css({
                visibility: "visible"
            }), a.trigger("dropdown_open", a.$dropdown))
        },
        close: function() {
            var a = this,
                b = a.isOpen;
            "single" === a.settings.mode && a.items.length && (a.hideInput(), a.$control_input.blur()), a.isOpen = !1, a.$dropdown.hide(), a.setActiveOption(null), a.refreshState(), b && a.trigger("dropdown_close", a.$dropdown)
        },
        positionDropdown: function() {
            var a = this.$control,
                b = "body" === this.settings.dropdownParent ? a.offset() : a.position();
            b.top += a.outerHeight(!0), this.$dropdown.css({
                width: a.outerWidth(),
                top: b.top,
                left: b.left
            })
        },
        clear: function(a) {
            var b = this;
            b.items.length && (b.$control.children(":not(input)").remove(), b.items = [], b.lastQuery = null, b.setCaret(0), b.setActiveItem(null), b.updatePlaceholder(), b.updateOriginalInput({
                silent: a
            }), b.refreshState(), b.showInput(), b.trigger("clear"))
        },
        insertAtCaret: function(b) {
            var c = Math.min(this.caretPos, this.items.length);
            0 === c ? this.$control.prepend(b) : a(this.$control[0].childNodes[c]).before(b), this.setCaret(c + 1)
        },
        deleteSelection: function(b) {
            var c, d, e, f, g, h, i, j, k, l = this;
            if (e = b && b.keyCode === p ? -1 : 1, f = G(l.$control_input[0]), l.$activeOption && !l.settings.hideSelected && (i = l.getAdjacentOption(l.$activeOption, -1).attr("data-value")), g = [], l.$activeItems.length) {
                for (k = l.$control.children(".active:" + (e > 0 ? "last" : "first")), h = l.$control.children(":not(input)").index(k), e > 0 && h++, c = 0, d = l.$activeItems.length; c < d; c++) g.push(a(l.$activeItems[c]).attr("data-value"));
                b && (b.preventDefault(), b.stopPropagation())
            } else(l.isFocused || "single" === l.settings.mode) && l.items.length && (e < 0 && 0 === f.start && 0 === f.length ? g.push(l.items[l.caretPos - 1]) : e > 0 && f.start === l.$control_input.val().length && g.push(l.items[l.caretPos]));
            if (!g.length || "function" == typeof l.settings.onDelete && l.settings.onDelete.apply(l, [g]) === !1) return !1;
            for ("undefined" != typeof h && l.setCaret(h); g.length;) l.removeItem(g.pop());
            return l.showInput(), l.positionDropdown(), l.refreshOptions(!0), i && (j = l.getOption(i), j.length && l.setActiveOption(j)), !0
        },
        advanceSelection: function(a, b) {
            var c, d, e, f, g, h, i = this;
            0 !== a && (i.rtl && (a *= -1), c = a > 0 ? "last" : "first", d = G(i.$control_input[0]), i.isFocused && !i.isInputHidden ? (f = i.$control_input.val().length, g = a < 0 ? 0 === d.start && 0 === d.length : d.start === f, g && !f && i.advanceCaret(a, b)) : (h = i.$control.children(".active:" + c), h.length && (e = i.$control.children(":not(input)").index(h), i.setActiveItem(null), i.setCaret(a > 0 ? e + 1 : e))))
        },
        advanceCaret: function(a, b) {
            var c, d, e = this;
            0 !== a && (c = a > 0 ? "next" : "prev", e.isShiftDown ? (d = e.$control_input[c](), d.length && (e.hideInput(), e.setActiveItem(d), b && b.preventDefault())) : e.setCaret(e.caretPos + a))
        },
        setCaret: function(b) {
            var c = this;
            if (b = "single" === c.settings.mode ? c.items.length : Math.max(0, Math.min(c.items.length, b)), !c.isPending) {
                var d, e, f, g;
                for (f = c.$control.children(":not(input)"), d = 0, e = f.length; d < e; d++) g = a(f[d]).detach(), d < b ? c.$control_input.before(g) : c.$control.append(g)
            }
            c.caretPos = b
        },
        lock: function() {
            this.close(), this.isLocked = !0, this.refreshState()
        },
        unlock: function() {
            this.isLocked = !1, this.refreshState()
        },
        disable: function() {
            var a = this;
            a.$input.prop("disabled", !0), a.$control_input.prop("disabled", !0).prop("tabindex", -1), a.isDisabled = !0, a.lock()
        },
        enable: function() {
            var a = this;
            a.$input.prop("disabled", !1), a.$control_input.prop("disabled", !1).prop("tabindex", a.tabIndex), a.isDisabled = !1, a.unlock()
        },
        destroy: function() {
            var b = this,
                c = b.eventNS,
                d = b.revertSettings;
            b.trigger("destroy"), b.off(), b.$wrapper.remove(), b.$dropdown.remove(), b.$input.html("").append(d.$children).removeAttr("tabindex").removeClass("selectized").attr({
                tabindex: d.tabindex
            }).show(), b.$control_input.removeData("grow"), b.$input.removeData("selectize"), a(window).off(c), a(document).off(c), a(document.body).off(c), delete b.$input[0].selectize
        },
        render: function(b, c) {
            var d, e, f = "",
                g = !1,
                h = this;
            return "option" !== b && "item" !== b || (d = z(c[h.settings.valueField]), g = !!d), g && (y(h.renderCache[b]) || (h.renderCache[b] = {}), h.renderCache[b].hasOwnProperty(d)) ? h.renderCache[b][d] : (f = a(h.settings.render[b].apply(this, [c, A])), "option" === b || "option_create" === b ? f.attr("data-selectable", "") : "optgroup" === b && (e = c[h.settings.optgroupValueField] || "", f.attr("data-group", e)), "option" !== b && "item" !== b || f.attr("data-value", d || ""), g && (h.renderCache[b][d] = f[0]), f[0])
        },
        clearCache: function(a) {
            var b = this;
            "undefined" == typeof a ? b.renderCache = {} : delete b.renderCache[a]
        },
        canCreate: function(a) {
            var b = this;
            if (!b.settings.create) return !1;
            var c = b.settings.createFilter;
            return a.length && ("function" != typeof c || c.apply(b, [a])) && ("string" != typeof c || new RegExp(c).test(a)) && (!(c instanceof RegExp) || c.test(a))
        }
    }), M.count = 0, M.defaults = {
        options: [],
        optgroups: [],
        plugins: [],
        delimiter: ",",
        splitOn: null,
        persist: !0,
        diacritics: !0,
        create: !1,
        createOnBlur: !1,
        createFilter: null,
        highlight: !0,
        openOnFocus: !0,
        maxOptions: 1e3,
        maxItems: null,
        hideSelected: null,
        addPrecedence: !1,
        selectOnTab: !1,
        preload: !1,
        allowEmptyOption: !1,
        closeAfterSelect: !1,
        scrollDuration: 60,
        loadThrottle: 300,
        loadingClass: "loading",
        dataAttr: "data-data",
        optgroupField: "optgroup",
        valueField: "value",
        labelField: "text",
        optgroupLabelField: "label",
        optgroupValueField: "value",
        lockOptgroupOrder: !1,
        sortField: "$order",
        searchField: ["text"],
        searchConjunction: "and",
        mode: null,
        wrapperClass: "selectize-control",
        inputClass: "selectize-input",
        dropdownClass: "selectize-dropdown",
        dropdownContentClass: "selectize-dropdown-content",
        dropdownParent: null,
        copyClassesToDropdown: !0,
        render: {}
    }, a.fn.selectize = function(b) {
        var c = a.fn.selectize.defaults,
            d = a.extend({}, c, b),
            e = d.dataAttr,
            f = d.labelField,
            g = d.valueField,
            h = d.optgroupField,
            i = d.optgroupLabelField,
            j = d.optgroupValueField,
            k = function(b, c) {
                var h, i, j, k, l = b.attr(e);
                if (l)
                    for (c.options = JSON.parse(l), h = 0, i = c.options.length; h < i; h++) c.items.push(c.options[h][g]);
                else {
                    var m = a.trim(b.val() || "");
                    if (!d.allowEmptyOption && !m.length) return;
                    for (j = m.split(d.delimiter), h = 0, i = j.length; h < i; h++) k = {}, k[f] = j[h], k[g] = j[h], c.options.push(k);
                    c.items = j
                }
            },
            l = function(b, c) {
                var k, l, m, n, o = c.options,
                    p = {},
                    q = function(a) {
                        var b = e && a.attr(e);
                        return "string" == typeof b && b.length ? JSON.parse(b) : null
                    },
                    r = function(b, e) {
                        b = a(b);
                        var i = z(b.val());
                        if (i || d.allowEmptyOption)
                            if (p.hasOwnProperty(i)) {
                                if (e) {
                                    var j = p[i][h];
                                    j ? a.isArray(j) ? j.push(e) : p[i][h] = [j, e] : p[i][h] = e
                                }
                            } else {
                                var k = q(b) || {};
                                k[f] = k[f] || b.text(), k[g] = k[g] || i, k[h] = k[h] || e, p[i] = k, o.push(k), b.is(":selected") && c.items.push(i)
                            }
                    },
                    s = function(b) {
                        var d, e, f, g, h;
                        for (b = a(b), f = b.attr("label"), f && (g = q(b) || {}, g[i] = f, g[j] = f, c.optgroups.push(g)), h = a("option", b), d = 0, e = h.length; d < e; d++) r(h[d], f)
                    };
                for (c.maxItems = b.attr("multiple") ? null : 1, n = b.children(), k = 0, l = n.length; k < l; k++) m = n[k].tagName.toLowerCase(), "optgroup" === m ? s(n[k]) : "option" === m && r(n[k])
            };
        return this.each(function() {
            if (!this.selectize) {
                var e, f = a(this),
                    g = this.tagName.toLowerCase(),
                    h = f.attr("placeholder") || f.attr("data-placeholder");
                h || d.allowEmptyOption || (h = f.children('option[value=""]').text());
                var i = {
                    placeholder: h,
                    options: [],
                    optgroups: [],
                    items: []
                };
                "select" === g ? l(f, i) : k(f, i), e = new M(f, a.extend(!0, {}, c, i, b))
            }
        })
    }, a.fn.selectize.defaults = M.defaults, a.fn.selectize.support = {
        validity: x
    }, M.define("drag_drop", function(b) {
        if (!a.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
        if ("multi" === this.settings.mode) {
            var c = this;
            c.lock = function() {
                var a = c.lock;
                return function() {
                    var b = c.$control.data("sortable");
                    return b && b.disable(), a.apply(c, arguments)
                }
            }(), c.unlock = function() {
                var a = c.unlock;
                return function() {
                    var b = c.$control.data("sortable");
                    return b && b.enable(), a.apply(c, arguments)
                }
            }(), c.setup = function() {
                var b = c.setup;
                return function() {
                    b.apply(this, arguments);
                    var d = c.$control.sortable({
                        items: "[data-value]",
                        forcePlaceholderSize: !0,
                        disabled: c.isLocked,
                        start: function(a, b) {
                            b.placeholder.css("width", b.helper.css("width")), d.css({
                                overflow: "visible"
                            })
                        },
                        stop: function() {
                            d.css({
                                overflow: "hidden"
                            });
                            var b = c.$activeItems ? c.$activeItems.slice() : null,
                                e = [];
                            d.children("[data-value]").each(function() {
                                e.push(a(this).attr("data-value"))
                            }), c.setValue(e), c.setActiveItem(b)
                        }
                    })
                }
            }()
        }
    }), M.define("dropdown_header", function(b) {
        var c = this;
        b = a.extend({
            title: "Untitled",
            headerClass: "selectize-dropdown-header",
            titleRowClass: "selectize-dropdown-header-title",
            labelClass: "selectize-dropdown-header-label",
            closeClass: "selectize-dropdown-header-close",
            html: function(a) {
                return '<div class="' + a.headerClass + '"><div class="' + a.titleRowClass + '"><span class="' + a.labelClass + '">' + a.title + '</span><a href="javascript:void(0)" class="' + a.closeClass + '">&times;</a></div></div>'
            }
        }, b), c.setup = function() {
            var d = c.setup;
            return function() {
                d.apply(c, arguments), c.$dropdown_header = a(b.html(b)), c.$dropdown.prepend(c.$dropdown_header)
            }
        }()
    }), M.define("optgroup_columns", function(b) {
        var c = this;
        b = a.extend({
            equalizeWidth: !0,
            equalizeHeight: !0
        }, b), this.getAdjacentOption = function(b, c) {
            var d = b.closest("[data-group]").find("[data-selectable]"),
                e = d.index(b) + c;
            return e >= 0 && e < d.length ? d.eq(e) : a()
        }, this.onKeyDown = function() {
            var a = c.onKeyDown;
            return function(b) {
                var d, e, f, g;
                return !this.isOpen || b.keyCode !== j && b.keyCode !== m ? a.apply(this, arguments) : (c.ignoreHover = !0, g = this.$activeOption.closest("[data-group]"), d = g.find("[data-selectable]").index(this.$activeOption), g = b.keyCode === j ? g.prev("[data-group]") : g.next("[data-group]"), f = g.find("[data-selectable]"), e = f.eq(Math.min(f.length - 1, d)), void(e.length && this.setActiveOption(e)))
            }
        }();
        var d = function() {
                var a, b = d.width,
                    c = document;
                return "undefined" == typeof b && (a = c.createElement("div"), a.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>', a = a.firstChild, c.body.appendChild(a), b = d.width = a.offsetWidth - a.clientWidth, c.body.removeChild(a)), b
            },
            e = function() {
                var e, f, g, h, i, j, k;
                if (k = a("[data-group]", c.$dropdown_content), f = k.length, f && c.$dropdown_content.width()) {
                    if (b.equalizeHeight) {
                        for (g = 0, e = 0; e < f; e++) g = Math.max(g, k.eq(e).height());
                        k.css({
                            height: g
                        })
                    }
                    b.equalizeWidth && (j = c.$dropdown_content.innerWidth() - d(), h = Math.round(j / f), k.css({
                        width: h
                    }), f > 1 && (i = j - h * (f - 1), k.eq(f - 1).css({
                        width: i
                    })))
                }
            };
        (b.equalizeHeight || b.equalizeWidth) && (B.after(this, "positionDropdown", e), B.after(this, "refreshOptions", e))
    }), M.define("remove_button", function(b) {
        b = a.extend({
            label: "&times;",
            title: "Remove",
            className: "remove",
            append: !0
        }, b);
        var c = function(b, c) {
                c.className = "remove-single";
                var d = b,
                    e = '<a href="javascript:void(0)" class="' + c.className + '" tabindex="-1" title="' + A(c.title) + '">' + c.label + "</a>",
                    f = function(a, b) {
                        return a + b
                    };
                b.setup = function() {
                    var g = d.setup;
                    return function() {
                        if (c.append) {
                            var h = a(d.$input.context).attr("id"),
                                i = (a("#" + h), d.settings.render.item);
                            d.settings.render.item = function(a) {
                                return f(i.apply(b, arguments), e)
                            }
                        }
                        g.apply(b, arguments), b.$control.on("click", "." + c.className, function(a) {
                            a.preventDefault(), d.isLocked || d.clear()
                        })
                    }
                }()
            },
            d = function(b, c) {
                var d = b,
                    e = '<a href="javascript:void(0)" class="' + c.className + '" tabindex="-1" title="' + A(c.title) + '">' + c.label + "</a>",
                    f = function(a, b) {
                        var c = a.search(/(<\/[^>]+>\s*)$/);
                        return a.substring(0, c) + b + a.substring(c)
                    };
                b.setup = function() {
                    var g = d.setup;
                    return function() {
                        if (c.append) {
                            var h = d.settings.render.item;
                            d.settings.render.item = function(a) {
                                return f(h.apply(b, arguments), e)
                            }
                        }
                        g.apply(b, arguments), b.$control.on("click", "." + c.className, function(b) {
                            if (b.preventDefault(), !d.isLocked) {
                                var c = a(b.currentTarget).parent();
                                d.setActiveItem(c), d.deleteSelection() && d.setCaret(d.items.length)
                            }
                        })
                    }
                }()
            };
        return "single" === this.settings.mode ? void c(this, b) : void d(this, b)
    }), M.define("restore_on_backspace", function(a) {
        var b = this;
        a.text = a.text || function(a) {
            return a[this.settings.labelField]
        }, this.onKeyDown = function() {
            var c = b.onKeyDown;
            return function(b) {
                var d, e;
                return b.keyCode === p && "" === this.$control_input.val() && !this.$activeItems.length && (d = this.caretPos - 1, d >= 0 && d < this.items.length) ? (e = this.options[this.items[d]], this.deleteSelection(b) && (this.setTextboxValue(a.text.apply(this, [e])), this.refreshOptions(!0)), void b.preventDefault()) : c.apply(this, arguments)
            }
        }()
    }), M
});

$(document).foundation();
$(document).ready(function() {
    $('#filter-category').selectize({
        create: true,
    });

    $('#filter-product').selectize({
        create: true,
    });

    if (window.matchMedia('(min-width: 64.333em)').matches) {
        $('#slider').nivoSlider({
            effect: "fade,sliceDown,fold",
            pauseTime: 5000,
            slices: 10,
            boxCols: 5,
            pauseOnHover: false,
            nextText: '<i class="ion-chevron-right"></i>',
            prevText: '<i class="ion-chevron-left"></i>',
            afterLoad: function() {
                $(".slide-text").velocity("transition.slideDownIn", {
                    stagger: 550
                });
            },
            beforeChange: function() {
                $(".slide-text").css("opacity", "0");
            },
            afterChange: function() {
                $(".slide-text").velocity("transition.slideDownIn", {
                    stagger: 550
                });
            },
        });
    } else {
        $('#slider-phone').nivoSlider({
            effect: "fade,sliceDown,fold",
            pauseTime: 8000,
            slices: 10,
            boxCols: 5,
            pauseOnHover: false,
            nextText: '<i class="ion-chevron-right"></i>',
            prevText: '<i class="ion-chevron-left"></i>',
            afterLoad: function() {
                $(".slide-text").velocity("transition.slideDownIn", {
                    stagger: 550
                });
            },
            beforeChange: function() {
                $(".slide-text").css("opacity", "0");
            },
            afterChange: function() {
                $(".slide-text").velocity("transition.slideDownIn", {
                    stagger: 550
                });
            },
        });
    }

    $('#vs-product-related').slick({
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: false,
        autoplaySpeed: 4000,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });

    $('#vs-testimonial').slick({
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: false,
        autoplaySpeed: 4000
    });

    $("#birthday-picker").birthdaypicker({
        dateFormat: "littleEndian",
        fieldName: "birthdate",
    });
});

$(document).ready(function() {
    var windowHeight = $(window).outerHeight();
    var headerHeight = $('header').outerHeight();
    var footerHeight = $('footer').outerHeight();
    var contentHeight = windowHeight - (headerHeight + footerHeight);
    $('.vs-content').css('min-height', contentHeight);

    $('#slide-product').slick({
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: false,
        autoplaySpeed: 4000,
    });
});

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$.ajax({
    url: '/cart/data',
    type: "GET",
    success: function(data) {
        $('#vs-cart-dropdown').html(data.cart_view);
        $('#vs-cart-total').html(data.cart_total);
    }
});

var filter = {
    productSort: function(elm, event) {
        var val = $(elm).val();
        $.ajax({
            url: '/product/index',
            type: "get",
            data: {
                val: val
            },
            success: function(data) {
                console.log("Result", data.data)
            }
        });
    }
};

var cartHeader = {
    removeCart: function(elm, event, inp_product_id) {
        $.ajax({
            url: '/cart/remove',
            type: "POST",
            data: {
                rowId: inp_product_id
            },
            beforeSend: function() {
                console.log('Send');
                $('#badge-cart').addClass('vs-flipY');
            },
            success: function(data) {
                setTimeout(function() {
                    $('#badge-cart').removeClass('vs-flipY');
                    $('#badge-cart').html(data.cart_count);
                    $('#vs-cart-dropdown').html(data.cart_view);
                    $('#vs-cart-total').html(data.cart_total);
                    $('#vs-cart-data').html(data.cart_checkout);
                    console.log('Data', data);
                }, 150);
            }
        });
    },
}
