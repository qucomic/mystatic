$(function () {

    //搜索页搜索
    $(".search-btn").click(function(){
        $(".search_form").submit()
    })
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


    $(".comment-sumit").click(function () {

        if (commentVerify() == 1) {
            alert("评论内容必须大于5个字");
        } else if (commentVerify() == 2) {
            alert("评论内容不能高于180字");
        } else if (commentVerify() == 3) {
            COMIC_MID_NUM++;
            $(".comment-sumit").html("正在评论");
            if (COMIC_MID_NUM > 1) { return; }
            var test = $("#commentArea").val()
            $.ajax({
                type: "Post",
                url: "/pinglun/pinglun_add.php",
                data: { "test": test, "pinglun_id": pinglun_id },
                dataType: 'json',
                success: function (res) {
                    if (res.Code == "1") {
                        $(".comment-layout").css("display", "none");
                        var pl_data = res.pl_data;
                        $("#last-read-pinglun").prepend(pl_data);
                        alert("评论成功，感谢您的评论。");
                        $('#des').val('');
                        $("#commentArea").val("");
                        COMIC_MID_NUM = 0;
                        return;
                    }
                    else if (res.Code == "2") {
                        alert("评论内容必须在2-200个字符之间");
                        $('#des').focus();
                        COMIC_MID_NUM = 0;
                        return;
                    }
                    else if (res.Code == "3") {
                        alert("昵称字符必须在2-15个字符之间");
                        $('#nick').focus();
                        COMIC_MID_NUM = 0;
                        return;
                    }
                    else {
                        alert("出错了，请重新尝试");
                        COMIC_MID_NUM = 0;
                        return;
                    }
                },
                error: function () {
                    alert("出错了，请重新尝试");
                    COMIC_MID_NUM = 0;
                    return;
                }
            });

            $(".comment-sumit").html("发布");
        } else {
            alert("系统出错了，再稍后再试");
            COMIC_MID_NUM = 0;
            return;
        }

    });


    


});
