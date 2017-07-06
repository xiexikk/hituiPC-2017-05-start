/**
 * Created by hehuihua on 2017/5/4.
 */

//封装修改按钮出现的回复框
function xiugai(obj) {
    $.each(obj,function (i,value) {
        console.log(obj);
        var father=obj.parents("li"),
            p=father.find("p"),
            textarea=father.find("textarea"),
            msgFoot=father.find(".msgFoot");

        if(father.hasClass("active")){
            father.removeClass("active");
            p.html(textarea.val());
            msgFoot.show();
            p.show();
        }else{
            father.addClass("active");
            textarea.val(p.text());
            p.hide();
            msgFoot.hide();
        }
        return false;
    });
}


//videoNote.html
$(function(){
    //	播放区域效果
    $(".videoBody").hover(function(){
        $(this).find('.courList').css({'left':'0px'});
    },function(){
        $(this).find('.courList').css({'left':'-336px'});
    });

    setTimeout(function(){
        $('.courList').css({'left':'-336px'});
    },4000);


/*
    var liA="liA",     //没有时间时候的li的状态
        liC="liC";     //存在时间时候li的类

    $(".videoRight .courList .videoUl li").hover(function () {
       $(this).removeClass(liA).addClass(liC);
    },function () {
       $(this).removeClass(liC).addClass(liA);
    });
*/

    $('.courList .videoUl li').hover(function () {
       $(this).toggleClass('hover');
    });




    //问答内容部分 回复框默认有内容

    // 点击加载更多
    var more=$(".hhhhh");
    more.on("click",function () {
        $.ajax({
            type      : 'post',
            url       : '../../public/json/loadMore.json',
            data      : { },
            dataType  : 'json',
            success    :function (data) {

                var html='';
                $.each(data.coursesList.data,function (i,ele) {
                    html+='<li class="Hpd clearfix">'+
                        '<p class="fonts16 ft16Color" flag="true" style="display: block;">ele.tit</p>'+
                        '  <div class="source">来源: <a class="sorC" href="javascript;">ele.cost</a>/'+
                        '<a class="sorC" href="javascript;">代理分佣软件详情</a>'+
                        '  <div class="anArea mt0 bgColor">'+
                        '  <form action="" method="post" class="nice-validator n-simple" novalidate="novalidate">'+
                        '   <textarea placeholder="" class="pl15 pt15"></textarea>'+
                        '   <div class="bot mt20 mr42 mb25">'+
                        '  <a href="javascript:;" class="HcancleBtn subBtn1">取消</a>'+
                        '  <a href="javascript:;" class="HsubBtn subBtn1">提交</a>'+
                        '  </div>'+
                        '  </form>'+
                        '  </div>'+
                        '  <div class="msgFoot clearfix" style="display: block;">'+
                        '  <div class="timeL fl mb25 fonts14 mt10">2017-05-02  18:00</div>'+
                        '   <div class="fr mb25 fonts15">'+
                        ' <span  onclick="xiugai($(this));" class="mr25 revise bb" flag="true"><i class="iconfont icon-bianxie iconNote"></i>修改</span>'+
                        '  <span class="mr25 delete"><i class="iconfont icon-del iconNote"></i>删除</span>'+
                        ' <span class="HpdSpan"><i class="iconfont icon-shipin-copy"></i> <i class="Htime">00:00:00</i></span>'+
                        ' </div>'+
                        '</div>'+
                        '</li>'
                });

                $(".hpdUl").append(html);

            }
        })
    });


    ~function () {
        var  $revise=$('.hpdUl .revise'),              //修改按钮
            a = 'active',
           // bl=false,
            $btn01 = $(".hpdUl .subBtn"),             //确认按钮
            $btn02 = $(".hpdUl .cancleBtn");         // 取消按钮








        //点击修改按钮出现的回复框
        // for(var i=0;i<$revise.length;i++){
        //     (function () {
        //         $revise[i].onclick=function (e) {
        //             var fa=$(this).parents("li");
        //             var p=fa.find("p");
        //             var textarea=fa.find("textarea");
        //             var msgFoot=fa.find(".msgFoot");
        //             if(fa.hasClass(a)){
        //                 fa.removeClass(a);
        //                 p.html(textarea.val());
        //                 msgFoot.show();
        //                 p.show();
        //             }else{
        //                 fa.addClass(a);
        //                 textarea.val(p.text());
        //                 p.hide();
        //                 msgFoot.hide();
        //             }
        //             return false;
        //         }
        //     })(i)
        // }


        var bl = false;
        /*确认按钮*/
        $btn01.on("click",function () {
            var myLi = $(this).parents('li');
            var myP = $(this).parents('li').find('p');
            var myTxt = $(this).parents('li').find('textarea');
            var msgFoot=$(this).parents("li").find(".msgFoot");

             if(myLi.hasClass(a)){
                 myLi.removeClass('active');
                 myP.html(myTxt.val());
                 myP.show();
                 msgFoot.show();
             };
             if($.trim(myTxt.val())==" "){
                 $(this).parents(".anArea").find(".bot").append("<p>回复留言不能为空哦！</p>");
                 return false;
             }
        });


        /*取消按钮*/
        $btn02.on("click",function () {
            var bl = false;
            var myLi = $(this).parents('li');
            var myP = $(this).parents('li').find('p');
            var myTxt = $(this).parents('li').find('textarea');
            var msgFoot=$(this).parents("li").find(".msgFoot");

            if(myLi.hasClass(a)){
              //  console.log(myP.html());

                myLi.removeClass('active');
                myP.show();
                myP.html();
                msgFoot.show();
            }
        });
    }();


});

//发表笔记回复框事件
$("#layui-btn").on("click",function() {
    var myTimer = null,timeNum = 2;
    var textareaVal=$("#layui-form").find("textarea").html();
    console.log(textareaVal);
    $("#layui-form").find("p").remove();
    clearInterval(myTimer);
    if($.trim(textareaVal) ==''){
        $("#layui-form").find(".layui-form-item").append("<p style='color: red'>回复留言不能为空哦！</p>");
        myTimer = setInterval(function(){
            timeNum--;
            if(timeNum == 0){
                clearInterval(myTimer);
                $("#layui-form").find("p").remove();
            }
        },1000);
        timeNum = 2;
        return false;
    }
});

//videoWenda.html
$(document).ready(function () {
    ~function () {
        var handLi=$(".item .txt .txIn .handLi .videoEm");
        var handLiLength=handLi.length;
        s = 'active';
        for(var i= 0; i<handLiLength; i++){
            (function (num) {
                var bl = true;
                handLi[i].onclick=function () {
                    $(this).toggleClass(s);
                }
            })(i);
        }
    }();
});

//learnQuestions.html
$(document).ready(function() {
    //learnQuestions.html  点击切换tab栏出现上边框
    $(".layui-tab-title li").click(function() {
        // $(".tabDiv").hide().eq($(".panel-header span").index(this)).show();
        $(".layui-tab-title li").eq($(this).index()).addClass("learnAcitve").siblings().removeClass('learnAcitve');
    });


    //问答内容部分 回复框默认有内容
    ~function () {
        var  $Hrevise=$('.Hpd .revise'),
            a = 'active',
            $btn01 = $(".hpdUl .HsubBtn"),             //确认按钮
            $btn02 = $(".hpdUl .HcancleBtn");         // 取消按钮

        //点击修改按钮出现的回复框
        // $Hrevise.on('click',function(){
        //     var isThisli = $(this).parents('li'),
        //         isThisP = isThisli.find('p'),
        //         isThisTextarea = isThisli.find('textarea'),
        //         msgFoot=$(this).parents("li").find(".msgFoot"),
        //         source=$(this).parents("li").find(".source");      //笔记来源块
        //
        //     if(isThisli.hasClass(a)){
        //         isThisli.removeClass(a);
        //         isThisP.show();
        //         source.show();
        //     }else {
        //         isThisli.addClass(a).siblings('').removeClass(a);
        //         isThisTextarea.val(isThisP.html());
        //         msgFoot.hide();
        //         isThisP.hide();
        //         source.hide();
        //     }
        // });


        var bl = false;
        /*确认按钮*/
        $btn01.on("click",function () {
            var myLi = $(this).parents('li'),
                myP = $(this).parents('li').find('p'),
                myTxt = $(this).parents('li').find('textarea'),
                msgFoot=$(this).parents("li").find(".msgFoot"),
                source=$(this).parents("li").find(".source");      //笔记来源块

            if(myLi.hasClass(a)){
                myLi.removeClass(a);
                myP.html(myTxt.val())
                myP.show();
                msgFoot.show();
                source.show();
            }
        });


        /*取消按钮*/
        $btn02.on("click",function () {
            var bl = false,
                myLi = $(this).parents('li'),
                myP = $(this).parents('li').find('p'),
                msgFoot=$(this).parents("li").find(".msgFoot"),
                source=$(this).parents("li").find(".source");      //笔记来源块

           if(myLi.hasClass(a)){
               myLi.removeClass(a);
               myP.show();
               msgFoot.show();
               source.show();
           }
        });
    }();


    //删除回复的内容.
    ~function () {
        //回复框
        var deletea=$(".Hpd .fr .delete");
            dLength=deletea.length;
             Hmask=$(".Hmask");
        for(var i=0; i<dLength;i++){
            (function (num) {
                deletea[i].onclick = function () {
                    Hmask.show().find(".maskDel").addClass("delBoxAni");
                   // $(this).parents(".fr").siblings("p").remove();
                }
            })(i);
        }
        //取消删除
        $(".Hcancel").on("click",function () {
            $(this).parents(".Hmask").hide();
        });

         //确认删除
        function subDel(sObj,ele) {
            $(".Hsubmit").on("click",function () {
                var Hmask=$(".Hmask");
                Hmask.hide();
                $(this).parents(".Hmask").siblings(sObj).find(ele).eq($(this).index()-1).remove();
                return false;
            });
        }
       //我的笔记页面调用
        subDel("div.bgColor","p");

      //videoNote.html
        subDel("li.Hpd","p");
    }();


    //封装点击小心心改变文字
    ~function () {
       function xinxin(obj,father) {
           var handLi=$(obj);
           var handLiLength=handLi.length;
           s = 'active';
           for(var i= 0; i<handLiLength; i++){
               (function (num) {
                   handLi[i].onclick=function () {
                       var u=$(this).hasClass("active");
                       if(u===false){
                           $(this).addClass("active").parents(father).find("i").html('<i>收藏</i>');
                       }else{
                           $(this).removeClass("active").parents(father).find("i").html('<i>取消</i>');
                       }
                   }
               })(i);
           }
       }
       xinxin(".learnCourse .courList .learnItem .sc1 .videoEm",".sc1");

       xinxin(".newsAsk .txIn .handLi .changeIc .videoEm",".sc1");

       //videoNote.html
        xinxin(".newsAsk .item .handLi .videoEm",".sc1");

    }();


    //我的课程
    // (function () {
    //     var itemA=$(".courseItem .leftTab");
    //     itemA.hover(function () {
    //         $(this).parents(".courseItem").find(".courseUl").stop().slideDown();
    //         var hColor="icon-xiala-copy1";
    //         $(this).find("i").toggleClass(hColor);
    //         return false;
    //     },function () {
    //        $(this).parents(".courseItem").find(".courseUl").stop().slideUp(50);
    //         $(this).removeClass("itemActive");
    //         $(this).css({
    //             "borderTop":"none"
    //         });
    //         return false;
    //     });
    //
    //     $(".courseItem .courseUl").hover(function () {
    //         $(this).stop();
    //         $(this).show();
    //         var itemActive1="itemActive";
    //         $(this).parents(".courseItem").find(".leftTab").css({
    //             "color":"#76bdff"
    //         });
    //         //点击事件
    //         var dd=$(".courseUl dd");
    //             ddcur="ddcur";
    //         for(var i=0 ; i<dd.length ; i++){
    //             (function () {
    //                 dd[i].onclick=function () {
    //                      $(this).find("a").addClass(ddcur).parents("dd").siblings().find("a").removeClass(ddcur);
    //                 }
    //             })(i);
    //         }
    //     },function () {
    //         $(this).stop();
    //         $(this).hide();
    //         $(this).parents(".courseItem").find(".leftTab").css({
    //             "color":"#6f6f6f"
    //         });
    //     });
    //
    // })();


    //我的课程新版
     var down="icon-xiala-down",                  //向下的箭头
         up ="icon-xiala-c-tio-copy",            //向上的箭头
         $screenNone=$(".conditions .screenNone"),   //加载更多内容块
         $Amore=$(".condList .Amore"),              //点击加载更多按钮
         Hshow="Hshow",                           //控制下来内容显示的类
         $li=$(".condList .noon"),                 //每一个li
         curH="curH";                              //点击的span的状态

    $Amore.on("click",function () {
        if($screenNone.hasClass(Hshow)){
            $screenNone.removeClass(Hshow);
            $Amore.find("i").removeClass(up).addClass(down);
        }else{
            $screenNone.addClass(Hshow);
            $Amore.find("i").removeClass(down).addClass(up);
        }
    });





    //课程收藏页面
    var active="active";   //鼠标移上去a标签的颜色
    $(".learnCourse .courList .videoUl li").hover(function () {
        $(this).find(".fl").find("a").addClass(active).parents(".learnItem").siblings("").find(".fl").find("a").removeClass(active);
    },function () {
        $(this).find(".fl").find("a").removeClass(active);
    });


    //封装切换小心心
     function heart(obj,col1,col2) {
         $(obj).on('click', function() {
             var flag=$(this).hasClass(col1);
             if (flag=== true) {
                 $(this).removeClass(col1);
                 $(this).addClass(col2);
                 return false;
             } else {
                 $(this).removeClass(col2);
                 $(this).addClass(col1);
             }
             return false;
         });
     }

    //视频收藏小心心
    heart('.list .item i.iconfont',"icon-shoucang","icon-shoucang_sel");

    //视频问答
    heart(".videoUl li .fr .sc2 i","icon-shoucang","icon-shoucang_sel-copy");
});


//Notice.html  公告页面
$(document).ready(function () {
    +function () {
        var $notLi=$('.noticeLeft ul li');
        for (var i = 0; i < $notLi.length; i++) {
            $li=$notLi.eq(i),
                $a=$li.find('a');
            if (location.href.match($a.attr('href'))) {
                console.log($li);
                $li.addClass('cur').siblings().removeClass('cur');
                break;
            }
        }
    }();
});

//myRank.html
$(function(){
    $(".rFoot li").hover(
        function(){
            $(this).stop(true).animate({"margin-top":"-12px"},200);
        },function(){
            $(this).stop(true).animate({"margin-top":"0px"},200);
        }
    )
});





































