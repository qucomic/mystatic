var Index = function () {
    var t = {
        showFlag: 1,
        floatNav: $(".float-nav"),
        djItem: $(".dj .comic-item")
    };
    return t.init = function () {
        t.initBanner(), t.initChange(), t.initFloatNav(), mkz.bindDownloadAppEvent(), mkz.isOpenApp() && mkz.openApp("mkzhan://center")
    }, t.initBanner = function () {
        new Swiper(".banner", {
            autoplay: 5e3,
            pagination: ".swiper-pagination"
        })
    }, t.initChange = function () {
        $(".change").click(function () {
            var e = t.djItem.length;
            if (e / 6 === t.showFlag) t.showFlag = 0;
            else if (e < 6) return !1;
            t.djItem.each(function (e, i) {
                e >= 6 * t.showFlag && e < 6 * (t.showFlag + 1) ? $(i).show() : $(i).hide()
            }), t.showFlag += 1
        })
    }, t.initFloatNav = function () {
        $(window).scroll(function (e) {
            $(this).scrollTop() > 300 ? t.floatNav.fadeIn() : t.floatNav.fadeOut()
        })
    }, t
},
    Catagory = function () {
        var t = {
            underline: $(".catalog-nav .underline"),
            navItem: $(".catalog-nav .nav-item")
        };
        return t.init = function () {
            t.bindEvent()
        }, t.initSwiper = function () {
            return new Swiper("#catagoryCon", {
                watchSlidesVisibility: !0,
                onSlideChangeStart: function (e) {
                    switch (e.activeIndex) {
                        case 0:
                            t.underline.animate({
                                left: "10%"
                            }, 300), t.navItem.eq(0).addClass("active").siblings().removeClass("active");
                            break;
                        case 1:
                            t.underline.animate({
                                left: "35%"
                            }, 300), t.navItem.eq(1).addClass("active").siblings().removeClass("active");
                            break;
                        case 2:
                            t.underline.animate({
                                left: "60%"
                            }, 300), t.navItem.eq(2).addClass("active").siblings().removeClass("active");
                            break;
                        case 3:
                            t.underline.animate({
                                left: "85%"
                            }, 300), t.navItem.eq(3).addClass("active").siblings().removeClass("active")
                    }
                }
            })
        }, t.bindEvent = function () {
            var e = this.initSwiper();
            t.navItem.click(function () {
                var t = $(this).index();
                e.slideTo(t)
            })
        }, t
    },
    Top = function () {
        var t = {
            pn: 1,
            ps: 20,
            index: 21,
            topType: $(".main").data("name"),
            type: $(".main").data("type"),
            moreBtn: $(".getmore"),
            swicher: $(".rank-nav-item"),
            container: $(".rank-list")
        };
        return t.init = function () {
            t.detectLoading(), t.bindMore()
        }, t.renderList = function (e) {
            t.loading();
            var i = t.ps,
                n = $.Deferred(),
                a = t.type,
                c = t.topType;

            return mkz.mkzAjax({
                url: "//comic.mkzcdn.com/top/" + c + "/",
                type: "GET",
                data: {
                    page_num: e,
                    page_size: i,
                    type: a
                }
            }).then(function (e) {
                var i = e.data.list,
                    n = "";
                0 == i.length ? t.lock() : t.unlock();
                for (var a = 0; a < i.length; a++) n = '<div class="rank-item clearfix"><a href="/' + i[a].comic_id + '"><img class="cover" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="' + i[a].cover + '!cover-200" alt="' + i[a].title + '"><div class="comic-item-info"><p class="comic-name">' + i[a].title + '</p><p class="comic-author">' + i[a].author_title + '</p><p class="comic-tip">' + i[a].feature + "</p></a>", i[a].amount ? n += '<p class="comic-click-count">月票：' + i[a].amount + "</p></div>" : i[a].read_count ? n += "ascension" == c || "latest" == c || "popular" == c ? '<p class="comic-click-count">周点击：' + i[a].read_count + "</p></div>" : '<p class="comic-click-count">总点击：' + i[a].read_count + "</p></div>" : i[a].collection_count && (n += '<p class="comic-click-count">总收藏：' + i[a].collection_count + "</p></div>"), n += '<div class="rank-tag">' + t.index++ + "</div>", t.container.append($(n))
            }).fail(function () {
                t.lock()
            }), t.loading(), n
        }, t.lock = function () {
            t.destoryLoading(), t.moreBtn.text("没有更多了~").addClass("lock")
        }, t.loading = function () {
            t.destoryLoading(), t.moreBtn.text("正在加载...").addClass("lock")
        }, t.unlock = function () {
            t.moreBtn.text("点击加载更多").removeClass("lock"), t.detectLoading()
        }, t.detectLoading = function () {
            $(window).scroll(function () {
                var e = $(this);
                t.moreBtn.offset().top - e.scrollTop() < e.height() && t.moreBtn.click()
            })
        }, t.destoryLoading = function () {
            $(window).scroll = null
        }, t.bindMore = function () {
            t.moreBtn.click(function () {
                $(this).hasClass("lock") || (t.pn += 1, t.renderList(t.pn))
            })
        }, t
    },
    Update = function () {
        var t = {
            swicher: $(".update-nav-item"),
            tab: $(".update-list .tab")
        };
        return t.init = function () {
            t.bindSwith(), mkz.isOpenApp() && mkz.openApp("mkzhan://center?link=app://daily/")
        }, t.bindSwith = function () {
            t.swicher.click(function () {
                var e = $(this),
                    i = e.index();
                e.hasClass("active") || (t.tab.eq(i).show().siblings().hide(), e.find("span").addClass("active").parent().siblings().find("span").removeClass("active"), e.addClass("active").siblings().removeClass("active"))
            })
        }, t
    },
    Lists = function () {
        var t = {
            pn: 2,
            ps: 12,
            moreBtn: $(".getmore"),
            container: $(".catagory-list")
        };
        return t.init = function () {
            t.detectLoading(), t.bindMore()
        }, t.renderList = function (e) {
            t.loading();
            var i = $.Deferred(),
                n = t.ps,
                a = $.extend({
                    page_num: e,
                    page_size: n
                }, t.getReqData());
            return mkz.mkzAjax({
                url: "//comic.mkzcdn.com/search/filter/",
                type: "GET",
                data: a
            }).then(function (e) {
                var n = e.data.list,
                    a = "";
                0 === n.length ? t.lock() : t.unlock();
                for (var c = 0; c < n.length; c++) a = '<li class="comic-item">          <a href="/' + n[c].comic_id + '/"><img class="cover" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="' + n[c].title + '" data-src="' + n[c].cover + '!cover-200"></a>          <div class="comic-info-box">          <p class="comic-name">' + n[c].title + '</p>          <p class="comic-tip">更新至' + n[c].chapter_num + "话</p>          </div>          </li>", t.container.append($(a));
                i.resolve(e)
            }).fail(function () {
                t.lock(), i.reject(res)
            }), t.loading(), i.promise()
        }, t.lock = function () {
            t.destoryLoading(), t.moreBtn.text("没有更多了~").addClass("lock")
        }, t.loading = function () {
            t.destoryLoading(), t.moreBtn.text("正在加载...").addClass("lock")
        }, t.unlock = function () {
            t.moreBtn.text("点击加载更多").removeClass("lock"), t.detectLoading()
        }, t.detectLoading = function () {
            $(window).scroll(function () {
                var e = $(this);
                t.moreBtn.offset().top - e.scrollTop() < e.height() && t.moreBtn.click()
            })
        }, t.destoryLoading = function () {
            $(window).scroll = null
        }, t.bindMore = function () {
            t.moreBtn.click(function () {
                $(this).hasClass("lock") || (t.pn += 1, t.renderList(t.pn))
            })
        }, t.getReqData = function () {
            var t = window.location.search.substr(1).split("&")[0],
                e = t.split("="),
                i = e[0],
                n = e[1],
                a = new Object;
            return a[i] = n, a
        }, t
    },
    SearchCount = function () {
        var t = {
            app_id: 1000103,
            app_secret: "462b72ef4f04679f29caba877738589e",
            result: []
        };
        return t.createUnique = function () {
            var t = function () {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            };
            return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
        }, t.searchCount = function (e, i) {
            return $.ajax({
                url: "https://action.mkzcdn.com/keyword/add/",
                type: "GET",
                dataType: "jsonp",
                crossDomain: !0,
                data: {
                    app_id: t.app_id,
                    app_secret: t.app_secret,
                    unique_id: t.createUnique(),
                    action_type: e,
                    comic_id: i.comic_id || "",
                    keyword: i.keyword || "",
                    result: i.result || "",
                    udid: mkz.getGuid()
                }
            })
        }, t.blurCount = function (e) {
            var i = e.list,
                n = [];
            return $.each(i, function (t, e) {
                n.push(e.comic_id)
            }), t.searchCount(1, {
                comic_id: e.cid,
                keyword: e.keyword,
                result: n.join()
            })
        }, t.clickCount = function (e) {
            var i = e.list,
                n = [];
            return void 0 !== i && "undefined" !== i && i ? $.each(i, function (t, e) {
                n.push(e.comic_id)
            }) : $(".search-result .comic-list-item").each(function (t, e) {
                n.push($(e).data("cid"))
            }), t.searchCount(2, {
                keyword: e.keyword,
                result: n.join()
            })
        }, t.spotlightCount = function (e) {
            var i = [];
            return $(".search-result .comic-list-item").each(function (t, e) {
                i.push($(e).data("cid"))
            }), t.searchCount(3, {
                comic_id: e.comic_id,
                keyword: e.keyword,
                result: i.join()
            })
        }, t
    },
    Search = function () {
        function t(t, e) {
            var i = null;
            return function () {
                var n = this,
                    a = arguments;
                clearTimeout(i), i = setTimeout(function () {
                    t.apply(n, a)
                }, e)
            }
        }
        var e = {
            input: $("#searchInput"),
            historyBox: $(".search-history"),
            hot: $(".hot-search"),
            active: $(".search-active"),
            historyList: $(".search-history-list"),
            clearBtn: $(".clear-all"),
            searchList: []
        },
            i = SearchCount();
        return e.init = function () {
            var t = $.Deferred();
            e.initInput(), e.bindSearch(), e.renderList(t).done(function () {
                e.bindSigleDel()
            }), e.bindDelAll()
        }, e.keywordSearch = function (t) {
            return $(".search-active").off("click"), mkz.mkzAjax({
                url: "//comic.mkzcdn.com/search/keyword/",
                type: "GET",
                data: {
                    keyword: t,
                    page_num: 1,
                    page_size: 50
                }
            })
        }, e.rendActiveCon = function (t, i) {
            var n = new RegExp(i, "ig"),
                a = t.length,
                c = "";
            if (a > 0) {
                e.hot.hide();
                for (var o = 0; o < a; o++) c += '<div class="search-active-item" data-keyword="' + i + '" data-cid="' + t[o].comic_id + '"><p class="comic-name">' + t[o].title.replace(n, function (t) {
                    return '<span style="color:red">' + t + "</span>"
                }) + '</p><p class="comic-author">' + t[o].author_title.replace(n, function (t) {
                    return '<span style="color:red">' + t + "</span>"
                }) + "</p></div>";
                0 != $(".search-result").length && $(".search-result").hide(), e.active.html(c)
            }
        }, e.initInput = function () {
            e.input.focus(function () {
                e.historyBox.hide()
            }).blur(function () {
                $.trim($(this).val()) || (e.hot.show(), e.historyBox.show(), e.active.hide())
            }), e.input.on("input", t(function () {
                e.active.empty();
                var t = $.trim($(this).val());
                if (!t) return 0 != $(".search-result").length && $(".search-result").show(), !1;
                e.keywordSearch(t).then(function (n) {
                    e.searchList = n.data.list, e.rendActiveCon(e.searchList, t), $(".search-active").on("click", ".search-active-item", function () {
                        var t = $(this).data();
                        t.list = e.searchList, i.blurCount(t), window.location.href = "/" + t.cid + "/"
                    })
                })
            }, 200))
        }, e.bindSearch = function () {
            $(".search-btn").click(function () {
                var t = e.input.val();
                t || (t = e.input.data("holder")), e.save(t), i.clickCount({
                    keyword: t,
                    list: e.searchList
                }), location.href = "/spotlight?keyword=" + t
            })
        }, e.renderList = function (t) {
            for (var i = e.getHistory(), n = "", a = 0; a < i.length; a++) n = '<p class="search-history-item clearfix"><a href="/spotlight?keyword=' + i[a] + '"><span class="search-his-txt">' + i[a] + '</span></a><span class="del-btn"><i class="ift-searchlist_clearo"></i></span></p>', e.historyList.append($(n));
            return t.resolve(), t.promise()
        }, e.bindSigleDel = function () {
            $(".del-btn").click(function () {
                for (var t = $(this), i = e.getHistory(), n = t.prev().find(".search-his-txt").text(), a = 0; a < i.length; a++) if (i[a] === n) {
                    i.splice(a, 1);
                    break
                }
                t.parents(".search-history-item").remove(), $.cookie("search_history", JSON.stringify(i), {
                    path: "/"
                })
            })
        }, e.bindDelAll = function () {
            e.clearBtn.click(function () {
                layer.open({
                    content: "亲，确定要删除历史吗？",
                    btn: ["确定", "取消"],
                    yes: function (t) {
                        layer.close(t), e.clear()
                    }
                })
            })
        }, e.getHistory = function () {
            return $.cookie("search_history") ? JSON.parse($.cookie("search_history")) : []
        }, e.save = function (t) {
            var e = $.cookie("search_history"),
                i = [],
                n = $.trim(t);
            if (e) {
                i = JSON.parse(e);
                for (var a = i.length, c = 0; c < a; c++) if (i[c] === n) {
                    i.splice(c, 1);
                    break
                }
            }
            "" != n && i.push(n), i.length > 10 && i.splice(0, 1), $.cookie("search_history", JSON.stringify(i), {
                path: "/"
            })
        }, e.clear = function () {
            $.removeCookie("search_history"), e.historyList.empty()
        }, e
    },
    Spotlight = function () {
        var t = {
            input: $("#searchInput"),
            pn: 1,
            ps: 20,
            moreBtn: $(".getmore"),
            container: $(".search-result")
        };
        t.init = function () {
            t.detectLoading(), t.bindMore(), t.bindSearch(), t.bindItemClick()
        };
        var e = SearchCount();
        return t.bindItemClick = function () {
            var i = t.getReqData();
            $(".search-result").on("click", ".comic-list-item", function () {
                e.spotlightCount({
                    comic_id: $(this).data("cid") || "",
                    keyword: i.keyword
                })
            })
        }, t.bindSearch = function () {
            $(".search-btn").click(function () {
                var i = t.input.val();
                i || (i = t.input.data("holder")), t.save(i), e.clickCount({
                    keyword: i
                }), location.href = "/spotlight?keyword=" + i
            })
        }, t.save = function (t) {
            var e = $.cookie("search_history"),
                i = [],
                n = $.trim(t);
            if (e) {
                i = JSON.parse(e);
                for (var a = i.length, c = 0; c < a; c++) if (i[c] === n) {
                    i.splice(c, 1);
                    break
                }
            }
            "" != n && i.push(n), i.length > 10 && i.splice(0, 1), $.cookie("search_history", JSON.stringify(i), {
                path: "/"
            })
        }, t.renderList = function (e) {
            t.loading();
            var i = t.ps,
                n = $.Deferred(),
                a = $.extend({
                    page_num: e,
                    page_size: i
                }, t.getReqData());
            return mkz.mkzAjax({
                url: "//comic.mkzcdn.com/search/keyword/",
                type: "GET",
                data: a
            }).then(function (e) {
                var i = e.data.list;
                0 === i.length ? t.lock() : t.unlock();
                for (var a = 0; a < i.length; a++) {
                    var c = $('<div class="comic-list-item clearfix" data-cid="' + i[a].comic_id + '"><a class="cover" href="/94316/"><img src="' + i[a].cover + '!cover-400" alt="斗破苍穹小说连载漫画"></a><div class="comic-item-info"><p class="comic-name"><a href="/' + i[a].comic_id + '/">' + i[a].title + '</a></p><p class="comic-author">' + i[a].author_title + '</p><p class="comic-tags">' + i[a].theme + '</p><p class="comic-update-at">更新至' + i[a].chapter_num + '话</p></div><a class="fast-read-btn" href="/' + i[a].comic_id + "/" + i[a].chpater_id + '"><i class="ift-searchlist_read1"></i><span>速看</span></a></div>');
                    t.container.append(c)
                }
                n.resolve(e)
            }).fail(function (e) {
                t.lock(), n.reject(e)
            }), t.loading(), n
        }, t.lock = function () {
            t.destoryLoading(), t.moreBtn.text("没有更多了~").addClass("lock")
        }, t.loading = function () {
            t.destoryLoading(), t.moreBtn.text("正在加载...").addClass("lock")
        }, t.unlock = function () {
            t.moreBtn.text("点击加载更多").removeClass("lock"), t.detectLoading()
        }, t.detectLoading = function () {
            $(window).scroll(function () {
                var e = $(this);
                t.moreBtn.offset().top - e.scrollTop() < e.height() && t.moreBtn.click()
            })
        }, t.destoryLoading = function () {
            $(window).scroll = null
        }, t.bindMore = function () {
            t.moreBtn.click(function () {
                $(this).hasClass("lock") || (t.pn += 1, t.renderList(t.pn))
            })
        }, t.getReqData = function () {
            var t = window.location.search.substr(1).split("&")[0],
                e = t.split("="),
                i = e[0],
                n = decodeURI(e[1]),
                a = new Object;
            return a[i] = n, a
        }, t
    },
    __main = function () {
        mkz.lazyLoad(), function () {
            var t = window.location.href;
            return /category\/\?/.test(t) ? Lists() : /top/.test(t) ? Top() : /update/.test(t) ? Update() : /category\//.test(t) ? Catagory() : /search/.test(t) ? Search() : /spotlight/.test(t) ? Spotlight() : Index()
        }().init()
    };
__main();
$("#mainView").click(function () {
    if ($(".bottom-tool-bar").css("bottom") == "0px") {
        $(".bottom-tool-bar").css("bottom", "-1.6rem");
    } else { $(".bottom-tool-bar").css("bottom", "0px"); }

    if ($(".top-tool-bar").css("top") == "0px") {
        $(".top-tool-bar").css("top", "-1.33333rem");
    } else { $(".top-tool-bar").css("top", "0px"); }

});

$(".ift-nav_close").click(function () {
    $(".comment-layout").css("display", "none");
});

$('#commentArea').keyup(function () {
    var remain = $(this).val().length;
    if (remain > 0) {
        $(".comment-sumit").css("background", "rgb(255, 120, 48)");
    } else {
        $(".comment-sumit").css("background", "rgb(204, 204, 204)");
    }
});




function firstLoad() {
    var imgsLen = newImgs.length;
    var b_sn = "";
    for (var i = 0; i < imgsLen; i++) {
        if (i == 0) {
            b_sn = b_sn + '<li class="comic-page" ><img class="lazy" src="' + newImgs[i] + '"></li>';
        } else {
            b_sn = b_sn + '<li class="comic-page" ><img class="lazy" data-original="' + newImgs[i] + '"></li>';
        }


    }
    $(".comic-list").append(b_sn);

}

