(function () {
    //判断是否收藏此漫画
    if(MAC.User.IsLogin!=1){
        MAC.Ulog.Get($('.J_collect').data('mid'),$('.J_collect').data('id'),2,1,'',function(r){
            if(r.total==1){
                $('.J_collect').attr('data-ulog',r.list[0].ulog_id);
                $('.J_collect i').removeClass('i-dt-coll').addClass('i-dt-collon');
                $('.J_collect span').text('已收藏')
            }else{
                $('.J_collect').attr('data-ulog','')
            }  
        })
        //MAC.User.Login();
    }else{
        
    }

    $('.J_collect').click(function () {
        if($('.J_collect').attr('data-ulog')==''){
            MAC.Ajax(maccms.path+'/index.php/user/ajax_ulog/?ac=set&mid='+$(this).attr("data-mid")+'&id='+$(this).attr("data-id")+'&type='+$(this).attr("data-type"),'get','json','',function(r){
                if(r.code==1){
                    MAC.Ulog.Get($('.J_collect').data('mid'),$('.J_collect').data('id'),2,1,'',function(r){
                        $('.J_collect').attr('data-ulog',r.list[0].ulog_id);
                        $('.J_collect i').removeClass('i-dt-coll').addClass('i-dt-collon');
                        $('.J_collect span').text('已收藏')
                    }) 
                }
            })
        }
        else{
            $.post(maccms.path+"/index.php/user/ulog_del",{ids:$('.J_collect').attr('data-ulog'),type:2},function(data) {
                if (data.code == '1') {
                    $('.J_collect').attr('data-ulog','');
                    $('.J_collect i').removeClass('i-dt-collon').addClass('i-dt-coll');
                    $('.J_collect span').text('收藏')
                    //location.reload();
                }else {
                    //ShowDialog('删除失败：' + data.msg);
                    alert('删除失败：' + data.msg);
                }
            }, 'json')
        }
    })

    $(".chapter-item:gt(11)").hide(), 
    $(".chapter-item").length <= 12 && $(".show-more").hide(), 
    $(".show-more").click(function () {
        var e = $(this);
        "close" === (e.data("status") || "close") ? ($(".chapter-item").show(), $(".show-more i").attr("class", "ift-readlist_stop"), $(".show-more .txt").html("收起"), $(".catagory.active").removeClass("slide-up"), e.data("status", "open")) : ($(".chapter-item:gt(11)").hide(), $(".show-more i").attr("class", "ift-readlist_more"), $(".show-more .txt").html("大人，更多话在这里"), $(".catagory.active").addClass("slide-up"), e.data("status", "close"))
    })
})()
$('.go-back').on('click',function(){
    if(window.sessionStorage.getItem('back')){
        window.location.href = window.sessionStorage.getItem('back')
    }else{
        window.location.href = '/'
    }
})
//切换图标
function updateIcon(){
    var e = $(".catagory");
    "up" === (e.data("status") || "up") ? (e.find("i").attr("class", "ift-detail_sort_up"), e.data("status", "down")) : (e.find("i").attr("class", "ift-detail_sort_down"), e.data("status", "up"))
}

function reverseChapter () {
for(var e = $(".chapter-item"), t = [], i = 0; i < e.length; i++) 
    t.push(e[i]); 
    t.reverse(); 
    for (var i=0; i<t.length; i++) 
    $(".catalog-list> ul").append(t[i]);
    "close" === ($(".show-more").data("status") || "close") ? ($(".chapter-item:lt(12)").show(),
    $(".chapter-item:gt(12)").hide()) : $(".chapter-item").show(), updateIcon()
}

$('.catagory').on('click',function(){
    $(this).hasClass("active") && reverseChapter()
})

doms = {
    under: $(".detail-nav .underline"),
    nav: $(".detail-nav li"),
    showMore: $(".show-more"),
    cataBtn: $(".catagory"),
    cItem: $(".chapter-item")
}
doms.nav.click(function () {
    switch ($(this).index()) {
        case 0:
            doms.under.animate({
                left: "10%"
            }, 50), 
            doms.nav.eq(0).addClass("active").siblings().removeClass("active"), 
            $(".detail-intro-box").show().siblings().hide()
            // t.lock();
            break;
        case 1:
            doms.under.animate({
                left: "42.8%"
            }, 50), 
            doms.nav.eq(1).addClass("active").siblings().removeClass("active"), 
            $(".catalog-box").show().siblings().hide()
            //, t.lock();
            break;
        case 2:
            doms.under.animate({
                left: "76.5%"
            }, 50), 
            doms.nav.eq(2).addClass("active init").siblings().removeClass("active"), 
            $(".comment-box").show().siblings().hide()
            // , t.unlock()
    }
})
//评论
$("#commentArea").on("input", function () {
    "" !== $.trim($(this).val()) ? $(".comment-sumit").css({
        background: "#ff7830"
    }) : $(".comment-sumit").css({
        background: "#ccc"
    })
})

$(".header .ift-nav_close").click(function () {
    $("#commentArea").val(""), $(".comment-layout").hide()
})

$(".user_comment").on('click','.pinglun-btn',function () {
    $(".comment-layout").css("display", "block");
});
//提交评论
$(".comment-sumit").click(function () {
    var $that = $(this);
    MAC.Comment.Submit($that);
    $("#commentArea").val("")
    $(".comment-layout").hide()
})