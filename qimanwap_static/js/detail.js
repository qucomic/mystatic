!
    function () {
        var e = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || this || {};
        e.log = console.log.bind(console);
        var t = (e.utils, function (e) {
            return e instanceof t ? e : this instanceof t ? void (this._wrapped = e) : new t(e)
        });
        "undefined" == typeof exports || exports.nodeType ? e.utils = t : ("undefined" != typeof module && !module.nodeType && module.exports && (exports = module.exports = t), exports.utils = t), t.VERSION = "1.0", t.getPathArr = function () {
            var t = e.location.pathname,
                n = t.split("/");
            return n.shift(), n[n.length - 1] = n[n.length - 1].replace(/.html/, ""), n
        }, t.dataFromLocal = function (e) {
            if (local.getItem(e)) return JSON.parse(local.getItem(e));
            mkz.userFund(), mkz.userInfo()
        }, t.formatDateTime = function (e) {
            var t = new Date;
            t.setTime(1e3 * e);
            var n = t.getFullYear(),
                i = t.getMonth() + 1;
            i = i < 10 ? "0" + i : i;
            var a = t.getDate();
            a = a < 10 ? "0" + a : a;
            var o = t.getHours();
            o = o < 10 ? "0" + o : o;
            var c = t.getMinutes(),
                m = t.getSeconds();
            return c = c < 10 ? "0" + c : c, m = m < 10 ? "0" + m : m, n + "-" + i + "-" + a + " " + o + ":" + c + ":" + m
        }
    }();
var Comment = function (e) {
    var t = e,
        n = utils.dataFromLocal("uInfo"),
        i = {
            pn: 1,
            ps: 10,
            moreBtn: $(".getmore"),
            faceData: null,
            agreeList: [],
            commentList: [],
            replyList: [],
            newReply: {}
        };
    return i.initComment = function () {
        i.getFaceData().then(function () {
            return i.getCommentList(i.pn)
        }).then(i.rendComment).then(i.getCommentAgreeList).then(i.rendCommentAgree).then(i.getReplyList).then(i.rendGroup).then(i.detectLoading), i.registerComEvent(), i.bindZanBtn(), i.bindReply(), i.bindFaceBtn(), i.bindMore()
    }, i.getCommentList = function (e) {
        i.loading();
        var n = $.Deferred(),
            a = e;
        return mkz.mkzAjax({
            url: "",
            type: "",
            data: {
                comic_id: t,
                page_num: a,
                page_size: i.ps
            }
        }).then(function (e) {
            i.commentList = e.data.list, n.resolve()
        }).fail(function (e) {
            i.lock(), n.resolve()
        }), n.promise()
    }, i.rendComment = function () {
        var e = i.pn,
            t = i.commentList,
            n = t.length;
        0 == n && 1 == e ? i.hasNoComment() : 0 === n && 1 != e ? i.lock() : i.unlock(), $.each(t, function (e, t) {
            var n = $('<div class="comment-item ' + t.comment_id + '" data-id="' + t.comment_id + '"><div class="info"><span class="avatar"><img src="' + t.avatar + '!width-100" onerror="this.src=\'/Static/mobile/img/pic_default_avatar.png\'" alt=""></span><p class="name">' + t.username + '</p><p class="comment-time">' + utils.formatDateTime(t.create_time) + '</p><span class="zan-btn" data-ccid="' + t.comment_id + '"><i class="ift-coment_like_off"></i>&nbsp;<span class="num">' + t.like_count + '</span></span></div><div class="comment-content"><p class="main-comment">' + i.replaceEmoji(t.content) + '</p></div><div class="reply-box"></div>'),
                a = n.find(".name");
            1 == t.is_vip && a.addClass("vip").append($('<i class="i-com-vip"></i>')), 1 == t.role && a.addClass("role").append($('<i class="i-com-gf"></i>')), 1 == t.is_author && a.addClass("author").append($('<i class="i-com-zz"></i>')), 1 == t.is_stick && n.append($('<i class="i-com-jp"></i>')), t.reply_count > 0 && n.addClass("has-rep"), $(".comment-box .comment-wrap").append(n)
        })
    }, i.getCommentAgreeList = function () {
        var e = $.Deferred();
        return mkz.detectLogin() && mkz.mkzAjax({
            url: "//comment.mkzcdn.com/comic/comment/like_list/",
            type: "GET",
            data: {
                comic_id: t,
                uid: mkz.getUid(),
                sign: mkz.getSign()
            }
        }).then(function (t) {
            i.agreeList = t.data, e.resolve()
        }), e.promise()
    }, i.rendCommentAgree = function () {
        var e = i.agreeList;
        $.each(e, function (e, t) {
            var n = $("." + t.comment_id).find(".zan-btn");
            i.rendAgree(n)
        })
    }, i.rendAgree = function (e) {
        var t = e.find("i"),
            n = e.find(".num");
        e.addClass("zaned"), n.text(parseInt(n.text()) + 1), t.attr("class", "ift-coment_like_on")
    }, i.cancelAgree = function (e) {
        var t = e.find("i"),
            n = e.find(".num");
        e.removeClass("zaned"), n.text(parseInt(n.text()) - 1), t.attr("class", "ift-coment_like_off")
    }, i.getReplyList = function () {
        $(".comment-item.has-rep").each(function (e, t) {
            var e = $(t).data("id");
            i.getReplyData(e).then(function () {
                return i.rendReply($(t))
            })
        })
    }, i.getReplyData = function (e) {
        var n = $.Deferred(),
            a = e;
        return mkz.mkzAjax({
            url: "//comment.mkzcdn.com/comic/comment/reply_list/",
            type: "GET",
            data: {
                comment_id: a,
                page_num: 1,
                page_size: 10,
                comic_id: t
            }
        }).then(function (e) {
            e.data.count > 0 && (i.replyList = e.data.list, n.resolve())
        }), n.promise()
    }, i.rendReply = function (e) {
        var t = $(e),
            n = i.replyList;
        n.length > 0 && $.each(n, function (e, n) {
            $rpItem = $('<div class="reply-item"><span class="name">' + n.username + "：</span>" + i.replaceEmoji(n.content) + "</div>"), t.find(".reply-box").append($rpItem), t.removeClass("has-rep")
        })
    }, i.hasNoComment = function () {
        $(".no-comment").show(), i.moreBtn.hide(), i.destoryLoading()
    }, i.addCommentAgree = function (e) {
        var n = $.Deferred(),
            i = e;
        return mkz.mkzAjax({
            url: "//comment.mkzcdn.com/comic/comment/like_add/",
            type: "POST",
            data: {
                comic_id: t,
                comment_id: i,
                uid: mkz.getUid(),
                sign: mkz.getSign()
            }
        }).then(function (e) {
            n.resolve()
        }), n.promise()
    }, i.cancelCommentAgree = function (e) {
        var n = $.Deferred(),
            i = e;
        return mkz.mkzAjax({
            url: "//comment.mkzcdn.com/comic/comment/like_cancel/",
            type: "POST",
            data: {
                comic_id: t,
                comment_id: i,
                uid: mkz.getUid(),
                sign: mkz.getSign()
            }
        }).then(function (e) {
            n.resolve()
        }), n.promise()
    }, i.bindZanBtn = function () {
        $(".comment-box").on("click", ".zan-btn", function () {
            if (!mkz.detectLogin()) return layer.open({
                content: "请先登录~",
                skin: "msg",
                time: 2,
                end: function () {
                    //	window.location.href = "/login/"
                }
            }), !1;
            var e = $(this),
                t = e.data("ccid");
            e.hasClass("zaned") ? i.cancelCommentAgree(t).then(function () {
                i.cancelAgree(e)
            }) : i.addCommentAgree(t).then(function () {
                i.rendAgree(e)
            })
        })
    }, i.bindReply = function () {
        $(".comment-box").on("click", ".comment-content", function () {
            var e = $(this).parents(".comment-item"),
                t = e.data("id"),
                n = e.find(".info .name").text();
            $(".comment-btn").text("回复：" + n), $(".comment-sumit").data("type", "r"), $(".comment-sumit").data("id", t)
        })
    }, i.addComment = function (e) {
        var n = $.Deferred(),
            a = layer.open({
                type: 2,
                shadeClose: !1
            });
        return mkz.mkzAjax({
            url: "//comment.mkzcdn.com/comic/comment/add/",
            type: "POST",
            data: {
                comic_id: t,
                content: e,
                app_id: 101,
                uid: mkz.getUid(),
                sign: mkz.getSign()
            }
        }).then(function (t) {
            layer.close(a), $("#commentArea").val(""), $(".comment-layout").hide();
            var o = t.data;
            o.content = e, i.commentLocal = o, layer.open({
                content: t.message,
                skin: "msg",
                time: 1
            }), n.resolve()
        }).fail(function (e) {
            layer.close(a), layer.open({
                content: e.message,
                skin: "msg",
                time: 2
            }), n.reject(e)
        }), n.promise()
    }, i.addCommetLocal = function () {
        var e = i.commentLocal,
            t = utils.dataFromLocal("uInfo"),
            n = '<div class="comment-item ' + e.comment_id + '" data-id="' + e.comment_id + '"><div class="info"><span class="avatar"><img src="' + t.avatar + '!width-100" onerror="this.src=\'/Static/mobile/img/pic_default_avatar.png\'" alt=""></span><p class="name">' + t.nickname + '</p><p class="comment-time">' + utils.formatDateTime(e.create_time) + '</p><span class="zan-btn" data-ccid="' + e.comment_id + '"><i class="ift-coment_like_off"></i>&nbsp;<span class="num">0</span></span></div><div class="comment-content"><p class="main-comment">' + i.replaceEmoji(e.content) + '</p></div><div class="reply-box"></div></div>';
        $(".comment-box .comment-wrap").prepend($(n)), $(".no-comment").hide()
    }, i.addReply = function (e, n) {
        var a = $.Deferred();
        return mkz.mkzAjax({
            url: "//comment.mkzcdn.com/comic/comment/reply_add/",
            type: "POST",
            data: {
                comic_id: t,
                comment_id: n,
                content: e,
                app_id: 101,
                uid: mkz.getUid(),
                sign: mkz.getSign()
            }
        }).then(function (t) {
            t.code;
            i.newReply = t.data, i.newReply.content = e, i.newReply.wrap = $("." + n), layer.open({
                content: t.message,
                skin: "msg",
                time: 2,
                end: function () {
                    $("#commentArea").val(""), $(".comment-layout").hide()
                }
            }), a.resolve()
        }).fail(function (e) {
            layer.open({
                content: e.message,
                skin: "msg",
                time: 2
            }), a.resolve()
        }), a.promise()
    }, i.addReplyLocal = function () {
        var e = i.newReply,
            t = $('<div class="reply-item"><span class="name">' + n.nickname + "：</span>" + i.replaceEmoji(e.content) + "</div>");
        e.wrap.find(".reply-box").append(t)
    }, i.lock = function () {
        i.destoryLoading(), i.moreBtn.text("没有更多了~").addClass("lock")
    }, i.loading = function () {
        i.destoryLoading(), i.moreBtn.text("正在加载...").addClass("lock")
    }, i.unlock = function () {

    }, i.detectLoading = function () {
        $(window).scroll(function () {
            var e = $(this);
            i.moreBtn.offset().top - e.scrollTop() < e.height() && (i.moreBtn.click(), i.loading())
        })
    }, i.destoryLoading = function () {
        $(window).scroll = null
    }, i.registerComEvent = function () {
        $(".header .ift-nav_close").click(function () {
            $("#commentArea").val(""), $(".comment-layout").hide()
        }), $(".comment-btn").click(function () {
            return;
            mkz.detectLogin() ? $(".comment-layout").show() : window.location.href = "/login/"
        }), $("#commentArea").on("input", function () {
            "" !== $.trim($(this).val()) ? $(".comment-sumit").css({
                background: "#ff7830"
            }) : $(".comment-sumit").css({
                background: "#ccc"
            })
        }), $("#commentArea").focus(function () {
            i.hideFaceDialog()
        }), $(".comment-sumit").click(function () {
            var e = $("#commentArea").val(),
                t = $(this).data("type");
            if (!e) return void layer.open({
                content: "评论内容不能为空",
                skin: "msg",
                time: 1.5
            });
            if ("c" == t) i.addComment(e).then(i.addCommetLocal);
            else if ("r" == t) {
                var n = $(this).data("id");
                i.addReply(e, n).then(i.addReplyLocal)
            }
        })
    }, i.bindMore = function () {
        i.moreBtn.click(function () {
            $(this).hasClass("lock") || (i.pn += 1, i.getCommentList(i.pn).then(i.rendComment).then(i.getReplyList).then(i.rendCommentAgree))
        })
    }, i.getFaceData = function () {
        var e = $.Deferred();
        return mkz.mkzAjax({
            url: "",
            type: ""
        }).then(function (t) {
            i.faceData = t.data.list, i.faceGroup = t.data.group, e.resolve()
        }), e.promise()
    }, i.showFaceDialog = function () {
        $(".face-wrapper").show(), $("#commentArea").blur(), i.registerFaceItem()
    }, i.hideFaceDialog = function () {
        $(".face-wrapper").hide(), $(".face-list").off("click")
    }, i.rendGroup = function () {
        var e = "";
        $.each(i.faceGroup, function (t, n) {
            1 == n.is_show && (e += '<div class="group-item" data-id="' + n.id + '"><img class="pic" src="' + n.cover + '!width-100"></div>')
        }), $(".face-group").html(e), i.bindGroupItem()
    }, i.rendFaceById = function (e) {
        var t = "";
        $.each(i.faceData, function (n, i) {
            i.group_id == e && (t += '<div class="item" data-id="' + i.id + '"><img src="' + i.url + '!width-100" alt="" class="pic"><p>' + i.title + "</p></div>")
        }), $(".face-list").html(t)
    }, i.bindGroupItem = function () {
        $(".face-group").on("click", ".group-item", function () {
            var e = $(this).data("id");
            return $(this).addClass("active").siblings().removeClass("active"), i.rendFaceById(e), !1
        })
    }, i.bindFaceBtn = function () {
        $(".J_face_btn").click(function () {
            i.showFaceDialog(), $(".group-item").eq(0).click()
        })
    }, i.registerFaceItem = function () {
        $(".face-list").on("click", ".item", function () {
            var e = $(this).data("id"),
                t = $("#commentArea"),
                n = t.val(),
                i = n + "[#" + e + "]";
            t.val(i), $(".comment-sumit").css({
                background: "#ff7830"
            })
        })
    }, i.replaceEmoji = function (e) {
        var e = e || "";
        return e.replace(/\[#(\d+)\]/g, function (e, t, n, a) {
            var o = i.faceData[t].url;
            return t >= 98 ? '<img class="pic" data-id="' + t + '" src="' + o + '!width-100"></img>' : '<img src="' + o + '!width-100"></img>'
        })
    }, i.replaceArea = function () {
        $(".text-area").find(".pic").replaceWith(function () {
            return "[#" + $(this).data("id") + "]"
        })
    }, i
},
    Gift = function (e) {
        var t = {
            wrap: $(".m-gift-box"),
            btn: $(".J_gift")
        };
        return t.bindEvent = function () {
            var e = $(".gift-itm"),
                n = $(".gift-confirm .btn"),
                i = $(".m-gift-box .order-g--link");
            e.click(function () {
                $(this).addClass("z-select").siblings().removeClass("z-select")
            }), n.click(function () {
                t.sendGift()
            }), i.click(function () {
                var e = $(this),
                    t = e.data("href");
                mkz.isWeChat() ? window.location.href = "/order/wechat?oauth_id=203&order_type=101" : window.location.href = t
            })
        }, t.sendGift = function () {
            var t = $(".gift-itm.z-select"),
                n = t.data("gift_id"),
                i = t.data("gift_price");
            return n ? mkz.mkzAjax({
                url: "//comic.mkzcdn.com/gift/add/",
                type: "POST",
                data: {
                    uid: mkz.getUid(),
                    sign: mkz.getSign(),
                    amount: i,
                    comic_id: e,
                    gift_id: n,
                    gift_num: 1
                }
            }).then(function (e) {
                var t = utils.dataFromLocal("uFund"),
                    n = t.gold - parseInt(i);
                layer.open({
                    content: "感谢殿下支持",
                    btn: "关闭",
                    end: function () {
                        $(".gift-confirm .txt").text(n), mkz.updateFund(t, "gold", n)
                    }
                })
            }).fail(function (e) {
                layer.open({
                    content: e.message,
                    skin: "msg",
                    time: 2
                })
            }) : (layer.open({
                content: "您未选择礼物",
                skin: "msg",
                time: 2
            }), !1)
        }, t.pop = function () {
            var e = utils.dataFromLocal("uFund");
            $(".gift-confirm").find(".txt").html(e.gold), layer.open({
                type: 1,
                content: t.wrap.html(),
                anim: "up",
                className: "m-gift-box",
                style: "position: fixed; bottom: 0;",
                success: function () {
                    t.bindEvent()
                }
            })
        }, t.init = function () {
            t.btn.click(function () {
                return;
                mkz.detectLogin() ? t.pop() : location.href = "/login"
            })
        }, t
    },
    Detail = function () {
        var e = mkz.getComicId(),
            t = Comment(e),
            n = {};
        return n.doms = {
            under: $(".detail-nav .underline"),
            nav: $(".detail-nav li"),
            showMore: $(".show-more"),
            cataBtn: $(".catagory"),
            cItem: $(".chapter-item")
        }, n.initNavSlide = function () {
            n.doms.nav.click(function () {

                switch ($(this).index()) {

                    case 0:
                        n.doms.under.animate({
                            left: "10%"
                        }, 300), n.doms.nav.eq(0).addClass("active").siblings().removeClass("active"), $(".detail-intro-box").show().siblings().hide(), t.lock();
                        break;
                    case 1:
                        n.doms.under.animate({
                            left: "42.8%"
                        }, 300), n.doms.nav.eq(1).addClass("active").siblings().removeClass("active"), $(".catalog-box").show().siblings().hide(), t.lock();
                        break;
                    case 2:
                        if (pinglun_get_num == 1) {
                            $.get("/pinglun/?id=" + pinglun_id + "", function (data) {
                                data = JSON.parse(data);
                                pinglun_get_num = 2;
                                if (data.length <= 0) {
                                    $(".no-comment").css("display", "block");
                                } else {


                                    var pl_data_len = data.length;

                                    var pl_List = "";
                                    for (var pl_i = 0; pl_i < (pl_data_len - 1); pl_i++) {
                                        pl_List += '<div class="comment-item"><div class="info"><span class="avatar"><img src="' + data[pl_i]['touxiang'] + '"></span><p class="name vip">' + data[pl_i]['name'] + '<i class="i-com-vip"></i></p><p class="comment-time">' + data[pl_i]['addtime'] + '</p></div><div class="comment-content"><p class="main-comment">' + data[pl_i]['cont'] + '</p></div><div class="reply-box"></div></div>';
                                    }
                                    $("#last-read-pinglun").prepend(pl_List);

                                    if (pl_data_len > 20) {
                                        $(".long_pl").show();
                                    }

                                }
                            });
                        }


                        n.doms.nav.eq(2).hasClass("init") || t.initComment(), n.doms.under.animate({
                            left: "76.5%"
                        }, 300), n.doms.nav.eq(2).addClass("active init").siblings().removeClass("active"), $(".comment-box").show().siblings().hide(), t.unlock()
                }
            })
        }, n.updateIcon = function () {
            var e = n.doms.cataBtn;
            "up" === (e.data("status") || "up") ? (e.find("i").attr("class", "ift-detail_sort_up"), e.data("status", "down")) : (e.find("i").attr("class", "ift-detail_sort_down"), e.data("status", "up"))
        }, n.registerReverse = function () {
            n.doms.cataBtn.click(function () {
                $(this).hasClass("active") && n.reverseChapter()
            })
        }, n.reverseChapter = function () {
            for (var e = $(".chapter-item"), t = [], i = 0; i < e.length; i++) t.push(e[i]);
            t.reverse();
            for (var i = 0; i < t.length; i++) $(".catalog-list > ul").append(t[i]);
            "close" === (n.doms.showMore.data("status") || "close") ? ($(".chapter-item:lt(12)").show(), $(".chapter-item:gt(12)").hide()) : $(".chapter-item").show(), n.updateIcon()
        }, n.initCata = function () {
            $(".chapter-item:gt(11)").hide(), $(".chapter-item").length <= 12 && n.doms.showMore.hide(), n.doms.showMore.click(function () {
                var e = $(this);
                "close" === (e.data("status") || "close") ? ($(".chapter-item").show(), $(".show-more i").attr("class", "ift-readlist_stop"), $(".show-more .txt").html("收起"), $(".catagory.active").removeClass("slide-up"), e.data("status", "open")) : ($(".chapter-item:gt(11)").hide(), $(".show-more i").attr("class", "ift-readlist_more"), $(".show-more .txt").html("大人，更多话在这里"), $(".catagory.active").addClass("slide-up"), e.data("status", "close"))
            })
        }, n.readChapterAt = function () {
            var t = mkz.getLocalUread(),
                i = "0",
                a = null;
            if (0 == t.length) return !1;
            for (var o = 0; o < t.length; o++) t[o].comic_id == e && (i = t[o].chapter_id);
            return n.doms.cItem.each(function (e, t) {
                i == $(t).data("id") && (a = $(t))
            }), a
        }, n.detectCollect = function () {
            if (!mkz.detectLogin()) return !1;
            mkz.mkzAjax({
                url: "//comic.mkzcdn.com/user/info/",
                type: "GET",
                data: {
                    comic_id: e,
                    uid: mkz.getUid(),
                    sign: mkz.getSign()
                }
            }).then(function (e) {
                1 == e.data.is_collection && ($(".J_collect").addClass("collected").find("i").attr("class", "i-dt-collon").next().text("已收藏"), $(".btn.collect").addClass("collected"))
            })
        }, n.addCollect = function (e) {
            return;
            mkz.detectLogin() || (window.location.hrefs = "/"), $(".J_collect").hasClass("collected") ? layer.open({
                content: "亲，确定要取消收藏吗？",
                btn: ["确定", "取消"],
                yes: function (t) {
                    layer.close(t), mkz.mkzAjax({
                        url: "//comic.mkzcdn.com/collection/delete/",
                        data: {
                            comic_id: e,
                            uid: mkz.getUid(),
                            sign: mkz.getSign()
                        },
                        type: "POST"
                    }).then(function (e) {
                        $(".J_collect").removeClass("collected").find("i").attr("class", "i-dt-coll"), layer.open({
                            content: "已取消收藏",
                            skin: "msg",
                            time: 2
                        })
                    })
                }
            }) : mkz.mkzAjax({
                url: "//comic.mkzcdn.com/collection/add/",
                data: {
                    comic_id: e,
                    uid: mkz.getUid(),
                    sign: mkz.getSign()
                },
                type: "POST"
            }).then(function (e) {
                $(".J_collect").addClass("collected").find("i").attr("class", "i-dt-collon"), layer.open({
                    content: "收藏成功，请在书架中查看",
                    skin: "msg",
                    time: 2
                })
            })
        }, n.initReadAt = function () {
            var t = n.readChapterAt();

        }, n.rendBuyIcon = function () {
            if (!mkz.detectLogin()) return !1;
            mkz.mkzAjax({
                url: "//comic.mkzcdn.com/user/chapter/",
                type: "GET",
                data: {
                    uid: mkz.getUid(),
                    sign: mkz.getSign(),
                    comic_id: e
                }
            }).then(function (e) {
                var t = e.data;
                $.each(t, function (e, t) {
                    var i = t.chapter_id;
                    n.doms.cItem.each(function (e, t) {
                        $(t).data("id") == i && $(t).find("i").attr("class", "i-dt-unlock")
                    })
                })
            })
        }, n.initDownloader = function () {
            var e = $(".downloadApp");
            e.html('<a><img src="/Static/mobile/img/pic_floatimg.png" alt="下载app"></a><span class="close"></span>'), e.on("click", ".close", function (t) {
                e.empty(), $.cookie("app_expire", Math.random().toString(36).substr(2), {
                    expires: 2
                })
            })
        }, n.detectDownLoader = function () {
            return !$.cookie("app_expire")
        }, n.setReadTime = function () {
            if (!mkz.detectLogin()) return !1;
            mkz.mkzAjax({
                url: "//comic.mkzcdn.com/comic/look/set/",
                type: "POST",
                data: {
                    uid: mkz.getUid(),
                    sign: mkz.getSign(),
                    comic_id: e
                }
            })
        }, n.detectStatus = function () {
            mkz.mkzAjax({
                url: "//comic.mkzcdn.com/comic/info/",
                type: "",
                data: {
                    comic_id: e
                }
            }).then(function (e) {
                return 0 == e.data.status ? void $(".catalog-box .list-wrap").html('<div class="comic-remove"><div class="remove-bg"></div><p>该漫画已下架，再看看别的吧~</p></div>') : 0 == e.data.platform || 1 & e.data.platform ? void 0 : void $(".catalog-box .list-wrap").html('<div class="comic-only-app"><p>主人，该漫画仅在APP中阅读呦~</p><a class="btn" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.xmtj.mkz">立即下载APP</a></div>')
            })
        }, n.isSogou = function () {
            Boolean(document.referrer.match(/sogou/gi)) && $(".downloadApp").hide()
        }, n.init = function () {
            mkz.lazyLoad(), n.setReadTime(), mkz.isOpenApp() && mkz.openApp("mkzhan://center?link=app://" + e + "/"), n.detectCollect(), n.detectStatus(), n.initNavSlide(), n.initCata(), n.registerReverse(), n.initReadAt(), n.rendBuyIcon(), n.isSogou(), Gift(e).init(), n.detectDownLoader() && n.initDownloader(), $(".header, .header-clone").on("click", ".J_share", function () {
                mkz.layShare()
            }), $(".J_ticket").click(function () {
                mkz.layTicket()
            }), $(".J_collect").click(function () {
                n.addCollect(e)
            })
        }, n
    },
    __main = function () {
        Detail().init(), mkz.bindDownloadAppEvent()
    };
__main();
$(".long_pl").click(function () {

    var pl_id_num = $('.long_pl').data("id");
    var pl_page_num = $('.long_pl').data("page");

    $(".long_pl").hide();
    $(".log_pl").show();

    $.get("/pinglun/?id=" + pl_id_num + "&page=" + pl_page_num, function (data) {
        $('.long_pl').data("page", pl_page_num + 1);

        data = JSON.parse(data);
        pinglun_get_num = 2;
        if (data.length <= 0) {
            $(".no-comment").css("display", "block");
        } else {


            var pl_data_len = data.length;

            var pl_List = "";
            for (var pl_i = 0; pl_i < (pl_data_len - 1); pl_i++) {
                pl_List += '<div class="comment-item"><div class="info"><span class="avatar"><img src="' + data[pl_i]['touxiang'] + '"></span><p class="name vip">' + data[pl_i]['name'] + '<i class="i-com-vip"></i></p><p class="comment-time">' + data[pl_i]['addtime'] + '</p></div><div class="comment-content"><p class="main-comment">' + data[pl_i]['cont'] + '</p></div><div class="reply-box"></div></div>';
            }
            $("#last-read-pinglun").append(pl_List);

            if (pl_data_len > 20) {
                $(".long_pl").show();
                $(".log_pl").hide();
            } else {
                $(".log_pl .txt").html("主人还等什么，快畅聊一番吧～");
                $(".log_pl").show();
            }
        }
    });





})