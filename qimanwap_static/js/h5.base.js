!
    function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function (e) {
        function t(e) {
            return c.raw ? e : encodeURIComponent(e)
        }
        function n(e) {
            return c.raw ? e : decodeURIComponent(e)
        }
        function o(e) {
            return t(c.json ? JSON.stringify(e) : String(e))
        }
        function i(e) {
            0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return e = decodeURIComponent(e.replace(r, " ")), c.json ? JSON.parse(e) : e
            } catch (e) { }
        }
        function a(t, n) {
            var o = c.raw ? t : i(t);
            return e.isFunction(n) ? n(o) : o
        }
        var r = /\+/g,
            c = e.cookie = function (i, r, s) {
                if (arguments.length > 1 && !e.isFunction(r)) {
                    if (s = e.extend({}, c.defaults, s), "number" == typeof s.expires) {
                        var l = s.expires,
                            u = s.expires = new Date;
                        u.setMilliseconds(u.getMilliseconds() + 864e5 * l)
                    }
                    return document.cookie = [t(i), "=", o(r), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("")
                }
                for (var d = i ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], p = 0, f = m.length; p < f; p++) {
                    var h = m[p].split("="),
                        g = n(h.shift()),
                        k = h.join("=");
                    if (i === g) {
                        d = a(k, r);
                        break
                    }
                    i || void 0 === (k = a(k)) || (d[g] = k)
                }
                return d
            };
        c.defaults = {}, e.removeCookie = function (t, n) {
            return e.cookie(t, "", e.extend({}, n, {
                expires: -1
            })), !e.cookie(t)
        }
    }), function () {
        "use strict";

        function e(t, o) {
            var i;
            if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = t, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !e.notNeeded(t)) {
                for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], r = this, c = 0, s = a.length; c < s; c++) r[a[c]] = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                }(r[a[c]], r);
                n && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function (e, n, o) {
                    var i = Node.prototype.removeEventListener;
                    "click" === e ? i.call(t, e, n.hijacked || n, o) : i.call(t, e, n, o)
                }, t.addEventListener = function (e, n, o) {
                    var i = Node.prototype.addEventListener;
                    "click" === e ? i.call(t, e, n.hijacked || (n.hijacked = function (e) {
                        e.propagationStopped || n(e)
                    }), o) : i.call(t, e, n, o)
                }), "function" == typeof t.onclick && (i = t.onclick, t.addEventListener("click", function (e) {
                    i(e)
                }, !1), t.onclick = null)
            }
        }
        var t = navigator.userAgent.indexOf("Windows Phone") >= 0,
            n = navigator.userAgent.indexOf("Android") > 0 && !t,
            o = /iP(ad|hone|od)/.test(navigator.userAgent) && !t,
            i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
            a = o && /OS [6-7]_\d/.test(navigator.userAgent),
            r = navigator.userAgent.indexOf("BB10") > 0;
        e.prototype.needsClick = function (e) {
            switch (e.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (e.disabled) return !0;
                    break;
                case "input":
                    if (o && "file" === e.type || e.disabled) return !0;
                    break;
                case "label":
                case "iframe":
                case "video":
                    return !0
            }
            return /\bneedsclick\b/.test(e.className)
        }, e.prototype.needsFocus = function (e) {
            switch (e.nodeName.toLowerCase()) {
                case "textarea":
                    return !0;
                case "select":
                    return !n;
                case "input":
                    switch (e.type) {
                        case "button":
                        case "checkbox":
                        case "file":
                        case "image":
                        case "radio":
                        case "submit":
                            return !1
                    }
                    return !e.disabled && !e.readOnly;
                default:
                    return /\bneedsfocus\b/.test(e.className)
            }
        }, e.prototype.sendClick = function (e, t) {
            var n, o;
            document.activeElement && document.activeElement !== e && document.activeElement.blur(), o = t.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, e.dispatchEvent(n)
        }, e.prototype.determineEventType = function (e) {
            return n && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
        }, e.prototype.focus = function (e) {
            var t;
            o && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
        }, e.prototype.updateScrollParent = function (e) {
            var t, n;
            if (!(t = e.fastClickScrollParent) || !t.contains(e)) {
                n = e;
                do {
                    if (n.scrollHeight > n.offsetHeight) {
                        t = n, e.fastClickScrollParent = n;
                        break
                    }
                    n = n.parentElement
                } while (n)
            }
            t && (t.fastClickLastScrollTop = t.scrollTop)
        }, e.prototype.getTargetElementFromEventTarget = function (e) {
            return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
        }, e.prototype.onTouchStart = function (e) {
            var t, n, a;
            if (e.targetTouches.length > 1) return !0;
            if (t = this.getTargetElementFromEventTarget(e.target), n = e.targetTouches[0], o) {
                if (a = window.getSelection(), a.rangeCount && !a.isCollapsed) return !0;
                if (!i) {
                    if (n.identifier && n.identifier === this.lastTouchIdentifier) return e.preventDefault(), !1;
                    this.lastTouchIdentifier = n.identifier, this.updateScrollParent(t)
                }
            }
            return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = n.pageX, this.touchStartY = n.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
        }, e.prototype.touchHasMoved = function (e) {
            var t = e.changedTouches[0],
                n = this.touchBoundary;
            return Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n
        }, e.prototype.onTouchMove = function (e) {
            return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0)
        }, e.prototype.findControl = function (e) {
            return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        }, e.prototype.onTouchEnd = function (e) {
            var t, r, c, s, l, u = this.targetElement;
            if (!this.trackingClick) return !0;
            if (e.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
            if (e.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
            if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, r = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, a && (l = e.changedTouches[0], u = document.elementFromPoint(l.pageX - window.pageXOffset, l.pageY - window.pageYOffset) || u, u.fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (c = u.tagName.toLowerCase())) {
                if (t = this.findControl(u)) {
                    if (this.focus(u), n) return !1;
                    u = t
                }
            } else if (this.needsFocus(u)) return e.timeStamp - r > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, !1) : (this.focus(u), this.sendClick(u, e), o && "select" === c || (this.targetElement = null, e.preventDefault()), !1);
            return !(!o || i || !(s = u.fastClickScrollParent) || s.fastClickLastScrollTop === s.scrollTop) || (this.needsClick(u) || (e.preventDefault(), this.sendClick(u, e)), !1)
        }, e.prototype.onTouchCancel = function () {
            this.trackingClick = !1, this.targetElement = null
        }, e.prototype.onMouse = function (e) {
            return !this.targetElement || (!!e.forwardedTouchEvent || (!e.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1))))
        }, e.prototype.onClick = function (e) {
            var t;
            return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail || (t = this.onMouse(e), t || (this.targetElement = null), t)
        }, e.prototype.destroy = function () {
            var e = this.layer;
            n && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }, e.notNeeded = function (e) {
            var t, o, i;
            if (void 0 === window.ontouchstart) return !0;
            if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                if (!n) return !0;
                if (t = document.querySelector("meta[name=viewport]")) {
                    if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                    if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
                }
            }
            if (r && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (t = document.querySelector("meta[name=viewport]")))) {
                if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                if (document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
            return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction || (!!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] >= 27 && (t = document.querySelector("meta[name=viewport]")) && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || ("none" === e.style.touchAction || "manipulation" === e.style.touchAction))
        }, e.attach = function (t, n) {
            return new e(t, n)
        }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
            return e
        }) : "undefined" != typeof module && module.exports ? (module.exports = e.attach, module.exports.FastClick = e) : window.FastClick = e
    }();
var historyUtils = {
    add: function () {
        var e = window.location.href,
            t = this.getLocal() || [],
            n = t.pop(),
            o = $("a.go-back");
        if (n && n == e) return !1;
        n && (0 === o.length ? (t.pop(), t.push(n)) : t.push(n)), t.push(e), this.saveLocal(t)
    },
    back: function () {
        var e = this.getLocal(),
            t = e.pop(),
            n = e.pop();
        if (!n) return this.add(t), window.location.href = "/", !1;
        this.saveLocal(e), window.location.href = n
    },
    filter: function () {
        var e = window.location.href;
        return 1 !== $(".read-container").length && !/feedback/.test(e)
    },
    getComicId: function () {
        var e = location.pathname,
            t = e.split("/"),
            n = t[1];
        return parseInt(n)
    },
    getLocal: function () {
        var e = window.sessionStorage.getItem(this.key);
        return e ? JSON.parse(e) : null
    },
    saveLocal: function (e) {
        window.sessionStorage.setItem(historyUtils.key, JSON.stringify(e))
    },
    init: function () {
        historyUtils.saveLocal([])
    },
    key: "_history_"
};
!
    function () {
        var root = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || this || {};
        root.log = console.log.bind(console), root.local = window.localStorage;
        var previousMkz = root.mkz,
            mkz = function (e) {
                return e instanceof mkz ? e : this instanceof mkz ? void (this._wrapped = e) : new mkz(e)
            };
        "undefined" == typeof exports || exports.nodeType ? root.mkz = mkz : ("undefined" != typeof module && !module.nodeType && module.exports && (exports = module.exports = mkz), exports.mkz = mkz), Array.prototype.remove = function (e) {
            var t = this.indexOf(e);
            t > -1 && this.splice(t, 1)
        };
        var urlParams = function () {
            for (var e = {}, t = window.location, n = t.search.replace(/^\?/, "").split("&"), o = 0; o < n.length; o++) {
                var i = n[o],
                    a = i.split("=");
                e[a[0]] = decodeURI(a[1])
            }
            return e
        };
        mkz.createGuid = function () {
            var e = local.getItem("__GUID"),
                t = function () {
                    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
                };
            return !e && (e = t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t(), local.setItem("__GUID", e), e)
        }, mkz.getGuid = function () {
            var e = local.getItem("__GUID");
            return e || mkz.createGuid()
        }, mkz.getUid = function () {
            var e = $.cookie("LOGINSIGN");
            return e ? decodeURI(e).split(":")[0] : 0
        }, mkz.getSign = function () {
            var e = $.cookie("LOGINSIGN");
            return e ? decodeURI(e).split(":")[1] : 0
        };
        var mkzAjax = mkz.mkzAjax = function (e) {
            var t = $.Deferred(),
                n = function (e) {
                    var t = [];
                    for (var n in e) t.push(n);
                    return t
                };
            return e.data = function (e) {
                for (var t = n(e).sort(), o = {}, i = 0; i < t.length; i++) o[t[i]] = e[t[i]];
                return o
            }(e.data), $.ajax(e).done(function (e) {
                200 == e.code ? t.resolve(e) : t.reject(e)
            }).fail(function (e) {
                t.reject(e)
            }), t.promise()
        };
        mkz.createLoginSign = function (e) {
            var t = e.uid,
                n = e.sign,
                o = t + ":" + n;
            $.cookie("LOGINSIGN", encodeURI(o), {
                path: "/"
            })
        }, mkz.detectLogin = function () {
            return $.cookie("LOGINSIGN")
        }, mkz.userLogout = function () {
            mkz.detectLogin() && (mkz.clearReadHistory(), $.removeCookie("LOGINSIGN", {
                path: "/"
            }), window.location.reload())
        }, mkz.isWeChat = function () {
            return "micromessenger" == navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
        }, mkz.getTimeStamp = function () {
            return String(Math.floor((new Date).getTime() / 1e3))
        }, mkz.isOpenApp = function () {
            var e = urlParams(),
                t = Boolean(document.referrer.match(/sogou/gi));
            return !(1 !== e.open_app && "1" !== e.open_app || t)
        }, mkz.openApp = function (e) {
            layer.open({
                content: "是否在漫客栈app中浏览？",
                btn: ["确定", "取消"],
                yes: function (t) {
                    layer.close(t), window.location.href = e, setTimeout(function () {
                        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.xmtj.mkz"
                    }, 500)
                }
            })
        }, mkz.getLocalUread = function () {
            var e = local.getItem("uread");
            return e ? JSON.parse(e) : []
        }, mkz.clearReadHistory = function () {
            local.removeItem("uread")
        }, mkz.pullReadHistory = function () {
            var e = $.Deferred(),
                t = $.cookie("HISTORYPS"),
                n = local.getItem("uread");
            return t ? mkz.getReadHistoryList().then(mkz.mergeHistory) : n || mkz.getReadHistoryList().then(function (e) {
                200 == e.code && local.setItem("uread", JSON.stringify(e.data))
            }), e.promise()
        }, mkz.getReadHistoryList = function () {
            var e = $.Deferred();
            return mkz.mkzAjax({
                url: "//history.mkzcdn.com/history/",
                data: {
                    uid: mkz.getUid(),
                    sign: mkz.getSign(),
                    type: "101"
                },
                type: "GET"
            }).then(function (t) {
                "200" === t.code ? (mkz.readHistoryList = t.data, $.removeCookie("HISTORYPS", {
                    path: "/"
                }), e.resolve(t)) : e.reject()
            }), e.promise()
        }, mkz.mergeHistory = function () {
            for (var e = mkz.readHistoryList, t = mkz.getLocalUread(), n = 0; n < t.length; n++) for (var o = t[n].comic_id, i = t[n].read_time, a = 0; a < e.length; a++) e[a].comic_id == o && e[a].read_time >= i && (t.splice(n, 1), n -= 1);
            mkz.updateNewHistory(t), mkz.saveUread(e)
        }, mkz.updateNewHistory = function (e) {
            e.length > 0 && mkz.mkzAjax({
                url: "//history.mkzcdn.com/history/merge/",
                data: {
                    uid: mkz.getUid(),
                    sign: mkz.getSign(),
                    data: JSON.stringify(e)
                },
                type: "POST"
            })
        }, mkz.saveUread = function (e) {
            var e = e || mkz.readHistoryList;
            e.length > 0 ? $.each(e, function (e, t) {
                mkz.updateUread({
                    comic_id: t.comic_id,
                    chapter_id: t.chapter_id,
                    page_id: t.page_id,
                    read_time: t.read_time,
                    type: t.type,
                    status: "1"
                })
            }) : local.getItem("uread") || local.setItem("uread", "[]")
        }, mkz.updateUread = function (e) {
            for (var t = {
                comic_id: e.comic_id,
                chapter_id: e.chapter_id,
                read_time: e.read_time,
                page_id: e.page_id,
                type: e.type,
                status: e.status
            }, n = mkz.getLocalUread(), o = 0; o < n.length; o++) if (n[o].comic_id == e.comic_id) {
                n.splice(o, 1);
                break
            }
            n.push(t), local.setItem("uread", JSON.stringify(n))
        }, mkz.lazyLoad = function (e) {
            e = e || {};
            var t = e.time || 500,
                n = function (e) {
                    var t = ["webkit", "Moz", "ms", "o"],
                        n = document.documentElement.style,
                        o = [],
                        i = function (e) {
                            return e.replace(/-(\w)/g, function (e, t) {
                                return t.toUpperCase()
                            })
                        };
                    for (var a in t) o.push(i(t[a] + "-" + e));
                    o.push(i(e));
                    for (var a in o) if (o[a] in n) return !0;
                    return !1
                }("background-size"),
                o = setInterval(function () {
                    var t = !![].map && 0 == document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp");
                    $("img[data-src]:visible").each(function () {
                        var i = $(this),
                            a = $(window).scrollTop(),
                            r = $(window).height(),
                            c = i.offset().top,
                            s = parseInt(i.height(), 10),
                            l = e.loading || "",
                            u = e.space || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
                            d = e.error || "/Static/mobile/img/loadding-error.png",
                            m = i.data("dislazyload"),
                            p = t && !m ? i.data("src") : i.data("src");
                        if (l && i.css("background", "url(" + l + ") center center / 32px 32px no-repeat"), c < a + r && c + s > a) {
                            if (n) {
                                i.css({
                                    opacity: 0,
                                    background: "url(" + p + ") no-repeat center center",
                                    backgroundSize: "cover"
                                }).removeAttr("data-src").animate({
                                    opacity: 1
                                }, 300);
                                var f = $(new Image);
                                f.attr("src", p), f.error(function () {
                                    if (new RegExp(d).test(i.attr("style"))) return !1;
                                    i.attr("src", u).css({
                                        opacity: 0,
                                        background: "#eee url(" + d + ") no-repeat center center"
                                    }).animate({
                                        opacity: 1
                                    }, 300)
                                })
                            } else i.attr("src", p).removeAttr("data-src");
                            i.error(function () {
                                if (new RegExp(d).test(i.attr("style"))) return !1;
                                i.attr("src", u).css({
                                    opacity: 0,
                                    background: "#fff url(" + d + ") no-repeat center center"
                                }).animate({
                                    opacity: 1
                                }, 300)
                            })
                        }
                        $("img").length == $("img[data-src]:visible").length && clearInterval(o)
                    })
                }, t)
        }, mkz.getComicId = function () {
            var e = location.pathname,
                t = e.split("/"),
                n = t[1];
            return parseInt(n)
        }, mkz.getChapterId = function () {
            var e = location.pathname,
                t = e.split("/"),
                n = t[2];
            return parseInt(n)
        }, mkz.addCollect = function () {
            var e = this.getComicId();
            $("#collect, .collect").hasClass("collected") ? layer.open({
                content: "亲，确定要取消收藏吗？",
                btn: ["确定", "取消"],
                yes: function (t) {
                    layer.close(t), mkzAjax({
                        url: "//comic.mkzcdn.com/collection/delete/",
                        data: {
                            comic_id: e,
                            uid: mkz.getUid(),
                            sign: mkz.getSign()
                        },
                        type: "POST"
                    }).then(function (e) {
                        $("#collect, .collect").removeClass("collected").find("i").attr("class", "ift-detail_coll_off").next().text("收藏"), layer.open({
                            content: "已取消收藏",
                            skin: "msg",
                            time: 2
                        })
                    }).fail(function (e) {
                        layer.open({
                            content: e.message,
                            skin: "msg",
                            time: 2
                        })
                    })
                }
            }) : mkzAjax({
                url: "//comic.mkzcdn.com/collection/add/",
                data: {
                    comic_id: e,
                    uid: mkz.getUid(),
                    sign: mkz.getSign()
                },
                type: "POST"
            }).then(function (e) {
                $("#collect, .collect").addClass("collected").find("i").attr("class", "ift-detail_coll_hl").next().text("已收藏"), layer.open({
                    content: "收藏成功，请在书架中查看",
                    skin: "msg",
                    time: 2
                })
            }).fail(function (e) {
                layer.open({
                    content: e.message,
                    skin: "msg",
                    time: 2
                })
            })
        }, mkz.userFund = function () {
            if (!mkz.detectLogin()) return !1;
            mkzAjax({
                url: "//member.mkzcdn.com/user/funds/",
                type: "GET",
                data: {
                    uid: mkz.getUid(),
                    sign: mkz.getSign()
                }
            }).then(function (e) {
                var t = JSON.stringify(e.data);
                local.setItem("uFund", t)
            })
        }, mkz.updateFund = function (e, t, n) {
            "gold" == t ? e.gold = n : "ticket" == t && (e.ticket = n);
            var o = JSON.stringify(e);
            local.setItem("uFund", o)
        }, mkz.userInfo = function () {
            if (!mkz.detectLogin()) return !1;
            mkzAjax({
                url: "//member.mkzcdn.com/user/info/",
                type: "GET",
                data: {
                    uid: mkz.getUid(),
                    sign: mkz.getSign()
                }
            }).then(function (e) {
                var t = JSON.stringify(e.data);
                local.setItem("uInfo", t)
            })
        }, mkz.layShare = function () {
            var shareHtml = '<p class="title">分享给朋友</p><ul class="clearfix bdsharebuttonbox" data-tag="share_2"><li class="ctrl-item"><a class="btn qq" data-cmd="sqq"></a><p>QQ</p></li><li class="ctrl-item"><a class="btn qqkj" data-cmd="qzone"></a><p>qq空间</p></li><li class="ctrl-item"><a class="btn xl" data-cmd="tsina"></a><p>微博</p></li></ul>';
            layer.open({
                content: '<p class="title">分享给朋友</p><ul class="clearfix bdsharebuttonbox" data-tag="share_2"><li class="ctrl-item"><a class="btn qq" data-cmd="sqq"></a><p>QQ</p></li><li class="ctrl-item"><a class="btn qqkj" data-cmd="qzone"></a><p>qq空间</p></li><li class="ctrl-item"><a class="btn xl" data-cmd="tsina"></a><p>微博</p></li></ul>',
                btn: ["取消"],
                className: "share-ctrl",
                skin: "footer",
                yes: function (e) {
                    layer.close(e)
                },
                success: function () {
                    with (document) (getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "/Static/mobile/js/vendor/static/api/js/share.js"
                }
            })
        }, mkz.layTicket = function () {
            var e = this.getComicId();
            if (this.detectLogin()) {
                var t = this,
                    n = local.getItem("uFund") ? JSON.parse(local.getItem("uFund")) : {},
                    o = n.ticket || 0,
                    i = 1,
                    a = '<div class="reward-list"><ul class="clearfix"><li class="reward-item select" data-pay="1"><i class="ift-monthticket"></i><span>投1票</span></li><li class="reward-item" data-pay="2"><i class="ift-monthticket"></i><span>投2票</span></li><li class="reward-item" data-pay="5"><i class="ift-monthticket"></i><span>投5票</span></li></ul></div><p class="has">我的月票：<span class="num">' + o + "</span>张";
                mkz.isWeChat() ? (a += '<a class="buy-ticket" href="/order/wechat?oauth_id=203&order_type=102">购买</a></p>', 1 != n.is_vip && (a += '<p class="vip"><a href="/order/wechat?oauth_id=203&order_type=103">开通VIP获取更多月票></a></p>')) : (a += '<a class="buy-ticket" href="/order/ticket">购买</a></p>', 1 != n.is_vip && (a += '<p class="vip"><a href="/order/vip">开通VIP获取更多月票></a></p>')), layer.open({
                    content: a,
                    className: "reward-box",
                    title: ["为喜欢的漫画投上一票", "height: auto; line-height: 1rem"],
                    btn: ["确定", "取消"],
                    yes: function (o) {
                        mkzAjax({
                            url: "//comic.mkzcdn.com/vote/add/",
                            type: "POST",
                            data: {
                                uid: mkz.getUid(),
                                sign: mkz.getSign(),
                                amount: i,
                                comic_id: e
                            }
                        }).then(function (e) {
                            t.updateFund(n, "ticket", i), layer.open({
                                content: e.message,
                                skin: "msg",
                                time: 2,
                                end: function () {
                                    mkz.userFund()
                                }
                            })
                        }).fail(function (e) {
                            layer.open({
                                content: e.message,
                                skin: "msg",
                                time: 2
                            })
                        }), layer.close(o)
                    },
                    success: function () {
                        $(".reward-item").click(function () {
                            $(this).addClass("select").siblings().removeClass("select"), i = $(this).data("pay")
                        })
                    }
                })
            } else location.href = "/user/collection/"
        }, mkz.isIos = function () {
            return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        }, mkz.isAndroid = function () {
            var e = navigator.userAgent;
            return e.indexOf("Android") > -1 || e.indexOf("Adr") > -1
        }, mkz.isWechat = function () {
            return "micromessenger" == navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
        }, mkz.getAppDownloadUrl = function (e) {
            var t = $.Deferred(),
                n = {
                    app_id: "",
                    app_version: ""
                },
                o = $.extend(n, e);
            return mkz.mkzAjax({
                url: "",
                data: o,
                type: ""
            }).then(function (e) {
                "200" == e.code ? t.resolve(e) : t.reject()
            }), t.promise()
        }, mkz.bindDownloadAppEvent = function () {
            mkz.getAppDownloadUrl().then(function (e) {
                $(".downloadApp").on("click", function () {
                    mkz.isWechat() ? window.open("", "_blank") : mkz.isIos() ? window.open("", "_blank") : window.open(e.data.latest_data.download_link, "_blank")
                })
            })
        }, mkz.firstOpenApp = function () {
            function e() {
                mkz.openApp("mkzhan://center?link=app://" + o + "/" + i + "/"), mkz.setOpenAppTime()
            }
            var t = local.getItem("openAppTime"),
                n = utils.getPathArr(),
                o = n[0],
                i = n[1];
            if (t) {
                1 * dayjs().format("YYYYMMD") > 1 * t && e()
            } else e()
        }, mkz.setOpenAppTime = function () {
            local.setItem("openAppTime", dayjs().format("YYYYMMD"))
        }
    }(), $(function () {
        historyUtils.filter() && historyUtils.add(), $("a.go-back").click(function () {
            historyUtils.back()
        }), mkz.detectLogin() && mkz.pullReadHistory(), FastClick.attach(document.body), "addEventListener" in document && document.addEventListener("DOMContentLoaded", function () {
            FastClick.attach(document.body)
        }, !1)
    });


$(function () {


    //开始搜索
    $(".search_btn").click(function () {
        var search_fix_btn_span_name = $('.search_btn').text();
        if (search_fix_btn_span_name == "搜索") {
            $(".search_header").hide();
            $(".search_form").submit()
        } else if (search_fix_btn_span_name == "取消") {
            $(".search_header").hide();
        }
    })
    //清除input事件	
    $(".search_clear_cion").click(function () {

        $(".search_input").val("");
        $(".search_clear_cion").hide();
        $('.search_btn').text("取消");
    })
    //监听搜索input事件	
    $(".search_input").bind("input propertychange", function (event) {
        var remain = $(this).val().length;
        if (remain > 0) {
            var search_fix_btn_span_name = $('.search_btn').find("span").text();
            if (search_fix_btn_span_name != "搜索") {
                $('.search_btn').text("搜索");
                $(".search_clear_cion").css('display', 'block');
            }
        } else {
            $('.search_btn').text("取消");
            $(".search_clear_cion").hide();
        }
    });

    $('.ift-nav_search').click(function () {
        $(".search_header").show();
    })




    $("body").on('click','.pinglun-btn',function () {
        $(".comment-layout").css("display", "block");
    });

    function commentVerify() {
        if ($("#commentArea").val().length < 5) {
            return 1;
        } else if ($("#commentArea").val().length > 180) {
            return 2;
        } else {
            return 3;
        }
    }


    // $(".comment-sumit").click(function () {

    //     if (commentVerify() == 1) {
    //         alert("评论内容必须大于5个字");
    //     } else if (commentVerify() == 2) {
    //         alert("评论内容不能高于180字");
    //     } else if (commentVerify() == 3) {
    //         COMIC_MID_NUM++;
    //         $(".comment-sumit").html("正在评论");
    //         if (COMIC_MID_NUM > 1) { return; }
    //         var test = $("#commentArea").val()
    //         $.ajax({
    //             type: "Post",
    //             url: "/pinglun/pinglun_add.php",
    //             data: { "test": test, "pinglun_id": pinglun_id },
    //             dataType: 'json',
    //             success: function (res) {
    //                 if (res.Code == "1") {
    //                     $(".comment-layout").css("display", "none");
    //                     var pl_data = res.pl_data;
    //                     $("#last-read-pinglun").prepend(pl_data);
    //                     alert("评论成功，感谢您的评论。");
    //                     $('#des').val('');
    //                     $("#commentArea").val("");
    //                     COMIC_MID_NUM = 0;
    //                     return;
    //                 }
    //                 else if (res.Code == "2") {
    //                     alert("评论内容必须在2-200个字符之间");
    //                     $('#des').focus();
    //                     COMIC_MID_NUM = 0;
    //                     return;
    //                 }
    //                 else if (res.Code == "3") {
    //                     alert("昵称字符必须在2-15个字符之间");
    //                     $('#nick').focus();
    //                     COMIC_MID_NUM = 0;
    //                     return;
    //                 }
    //                 else {
    //                     alert("出错了，请重新尝试");
    //                     COMIC_MID_NUM = 0;
    //                     return;
    //                 }
    //             },
    //             error: function () {
    //                 alert("出错了，请重新尝试");
    //                 COMIC_MID_NUM = 0;
    //                 return;
    //             }
    //         });

    //         $(".comment-sumit").html("发布");
    //     } else {
    //         alert("系统出错了，再稍后再试");
    //         COMIC_MID_NUM = 0;
    //         return;
    //     }

    // });


    $(".getmore").click(function () {
        scroll_num = scroll_num + 1;
        if (scroll_num >= 5) { $(".getmore").text('没有更多了~'); return; }
        $('.getmore').hide();
        $('.log_div').show();
        getmore_btn(scroll_num, scroll_type);
    });
    function getmore_btn(page_num, type) {
        $.ajax({
            type: "GET",
            url: "/ajaxf/",
            data: { "page_num": page_num, "type": type },
            dataType: 'json',
            success: function (res) {
                for (var a = 0; a < res.length; a++) {
                    var mh_id = res[a].id;
                    var mh_name = res[a].name;
                    var mh_imgurl = res[a].imgurl;
                    var mh_author = res[a].author;
                    var mh_remarks = res[a].remarks;
                    var mh_tag = page_num * 20 + a + 1;
                    var b_sn = '<div class="rank-item clearfix"><a href="/' + mh_id + '/"><img class="cover" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="background-image: url(' + mh_imgurl + ')" alt="' + mh_name + '" data-src="' + mh_imgurl + '"></a><div class="comic-item-info"><a href="/' + mh_id + '/"><p class="comic-name">' + mh_name + '</p><p class="comic-author">' + mh_author + '</p><p class="comic-tip">' + mh_remarks + '</p></a><p class="comic-click-count"></p></div><div class="rank-tag" "="">' + mh_tag + '</div></div>';
                    $(".rank-list").append(b_sn);

                }
                if (page_num == 4) { $(".getmore").text('没有更多了~'); $('.getmore').show(); $('.log_div').hide(); return; }
                $('.getmore').show();
                $('.log_div').hide();
            }
        });
    }



    $(".getmore1").click(function () {
        scroll_num = scroll_num + 1;
        if (scroll_num >= 5) { $(".getmore1").text('没有更多了~'); return; }
        $('.getmore1').hide();
        $('.log_div').show();
        getmore_btn1(scroll_num, scroll_type);
    });
    function getmore_btn1(page_num, type) {
        $.ajax({
            type: "GET",
            url: "/ajaxf/sort/",
            data: { "page_num": page_num, "type": type },
            dataType: 'json',
            success: function (res) {
                for (var a = 0; a < res.length; a++) {
                    var mh_id = res[a].id;
                    var mh_name = res[a].name;
                    var mh_imgurl = res[a].imgurl;
                    var mh_author = res[a].author;
                    var mh_remarks = res[a].remarks;
                    var mh_tag = page_num * 20 + a + 1;
                    var b_sn = '<div class="rank-item clearfix"><a href="/' + mh_id + '/"><img class="cover" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="background-image: url(' + mh_imgurl + ')" alt="' + mh_name + '" data-src="' + mh_imgurl + '"></a><div class="comic-item-info"><a href="/' + mh_id + '/"><p class="comic-name">' + mh_name + '</p><p class="comic-author">' + mh_author + '</p><p class="comic-tip">' + mh_remarks + '</p></a><p class="comic-click-count"></p></div><div class="rank-tag" "="">' + mh_tag + '</div></div>';
                    $(".rank-list").append(b_sn);

                }

                if (page_num == 4) { $(".getmore1").text('没有更多了~'); $('.getmore1').show(); $('.log_div').hide(); return; }
                $('.getmore1').show();
                $('.log_div').hide();

            }
        });
    }


});
