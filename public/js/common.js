/************ This javascript created by author:xiexikang on 2017-05. Start************/

$(document).ready(function () {
// 共用部分html
    +function() {
        //toolBar.html
        $.ajax({
            url: "../../public/common/toolBar.html",
            cache: false,
            async:false,
            success: function(html){
                $(html).insertAfter("#myToolBar");
                $("#myToolBar").remove();
            }
        });
        //header.html
        $.ajax({
            url: "../../public/common/header.html",
            cache: false,
            async:false,
            success: function(html){
                $(html).insertAfter("#myHeader");
                $("#myHeader").remove();
            }
        });
        // footer.html
        $.ajax({
            url: "../../public/common/footer.html",
            cache: false,
            async:false,
            success: function(html){
                $(html).insertAfter("#myFooter");
                $("#myFooter").remove();
            }
        });
        //整体右侧悬浮操作栏 sidebar.html
        $.ajax({
            url: "../../pages/loginAfter/comPage/sidebar.html",
            cache: false,
            async:false,
            success: function(html){
                $("#footer").after(html);
            }
        });

        //登录后的首页 左侧栏indexLeft.html
        $.ajax({
            url: "../../pages/loginAfter/comPage/indexLeft.html",
            cache: false,
            async:false,
            success: function(html){
                $(html).insertAfter("#indexLeft");
                $("#indexLeft").remove();
            }
        });

        //个人中心左侧myLeft.html
        $.ajax({
            url: "../../pages/loginAfter/comPage/myLeft.html",
            cache: false,
            async:false,
            success: function(html){
                $(html).insertAfter("#myLeft");
                $("#myLeft").remove();
            }
        });

        //公告块左侧
        $.ajax({
            url: "../../pages/loginAfter/comPage/noticeLeft.html",
            cache: false,
            async:false,
            success: function(html){
                $(html).insertAfter("#noticeLeft");
                $("#noticeLeft").remove();
            }
        });

    }();

    // 动态加载HTML后的处理方式：事件委托 document承载
    +function () {
        // header部位置 定位
        var header =  $('#header'),
            navTop = header.offset().top;
        $(window).scroll(function(e) {
            var scrTop = $(window).scrollTop();
            if( scrTop > navTop){
                header.addClass("headerDown");
            }else{
                header.removeClass("headerDown");
            }
        });
        //导航栏
        var navLi = '.nav li';
        $(document).on("mouseenter",navLi,function (e) {
            var $e = $(this);
            $e.addClass('cur');
        }).on("mouseleave",navLi,function (e) {
            var $e = $(this);
            $e.removeClass('cur');
        });
        //搜索框
        var $searchFrame = $(".header .rCon .sel input");
        $searchFrame.bind("focus",function (e) {
            var $e = $(this).parents('.sel');
            $e.addClass('cur');
        }).bind("blur",function (e) {
            var $e = $(this).parents('.sel');
            $e.removeClass('cur');
        });
        //显示与否showHide
        var showSpeed = 300;
        function  showHide(parm1,parm2) {
            $(parm1).hover(function () {
                $(parm2).stop().slideToggle(showSpeed);
            });
        }
        // toolbar栏微信公众号
         showHide(".toolBar .wx",".ewmPop");
        // header栏右侧个人头像
        showHide(".header .rCon .myTx",".header .myList");
    }();

    //右侧悬浮栏
    +function () {
        var barLi = '.sidebar li',
            h = 'hover',
            backTop ='.backTop',
            win_h = 300,
            speed = .1e3,
            fadeSpeed=.4e3,
            lePop ='.lePop';
        $(barLi).hover(function(e) {
            var $e = $(this);
            $e.addClass(h);
            $e.find(lePop).stop().animate({right:'62px',opacity:'1'}, speed);
        }, function() {
            var $e = $(this);
            $e.removeClass(h);
            $e.find(lePop).stop().animate({right:'100px',opacity:'0'}, speed);
        });
        //返回顶部
        $(backTop).hide();
        $(window).scroll(function(e) {
            var win_s = $(window).scrollTop();
            if(win_h<win_s){
                $(backTop).fadeIn( fadeSpeed);
            }else{
                $(backTop).fadeOut(fadeSpeed);
            }
        });
        $(backTop).on("click", function (e) {
            $('html,body').animate({scrollTop:0},.3e3);
        });
    }();

    // 跳转对应页面链接
    +function () {
        function linksFn(parm) {
            var $links = $(parm);
            for (var i = 0; i < $links.length; i++) {
                $li=$links.eq(i),
                    $a=$li.find('a');
                if (location.href.match($a.attr('href'))) {
                    $li.addClass('cur').siblings().removeClass('cur');
                    break;
                }
            }
        }
        //导航栏 跳转链接对应的页面
        linksFn('.header .nav li');
        // 个人中心左侧栏：跳转链接对应的页面
        linksFn('.myCom .myItem li');

    }();
});

// 公告文字滚动
function timer(opj){
    $(opj).find('ul').animate({
        marginTop : "-56px"
    },500,function(){
        $(this).css({marginTop : "0"}).find("li:first").appendTo(this);
    })
}
$(function(){
    var $gfNot = $('.gfNot'),
        num = $gfNot .find('li').length,
        speed = 3500; 
    if(num > 1){
        var time=setInterval('timer(".gfNot")',speed);
        $gfNot.mousemove(function(){
            clearInterval(time);
        }).mouseout(function(){
            time = setInterval('timer(".gfNot")',speed);
        });
    }
});


// 视频课程收藏  index.html, course.html
+function () {
    $(document).on("mouseenter",'.courLists li .item .tp i',function (e) {
        var ulLiXin = $(this),
            liXinNum = ulLiXin.length,
            s = 'icon-shoucang_sel-copy';   //字体图标实心型
        for (var x= 0; x< liXinNum; x++) {
            (function () {
                ulLiXin[x].onclick = function () {
                    $(this).toggleClass(s);
                }
            })(x);
        }
    });
}();

//imgLoad.js 函数封装图片懒加载
function imgLoad() {
    var jq=jQuery.noConflict();
    jq(function(){jq(".courLists img").lazyload({
        placeholder:"../../public/images/loading.gif",effect:"fadeIn"});
    });
}


// IE8兼容处理样式错乱及优化问题
+function () {
    var ua = navigator.userAgent;
    if ((ua.indexOf('compatible') > -1 && (ua.indexOf('MSIE 8') > -1 || ua.indexOf('MSIE 9') > -1))) {
        $('.regLogPop .in').css("background-image","url(public/images/regLogBg.png)");
        $('.webLogin').css("border","1px solid #E6E6E6");
        $(' .reList li').hover(function () {
            $(this).find('.num').css("color","#ff6610");
        },function(){
            $(this).find('.num').css("color","#666666");
        });
    }
}();

//input placeholder属性兼容
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css(
                {position:'absolute', left:pos.left, top:pos.top, height:h, lienHeight:h, paddingLeft:paddingleft, color:'#999',fontSize:'14px'}
            ).appendTo(self.parent());
            //2016.6.13 add xiexikang
            if(!$(this).val()==''){
                holder.hide();
            }
            //---
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
        });
    }
};
//执行
jQuery(function(){
    JPlaceHolder.init();
});


/************ This javascript created by author:xiexikang on 2017-05. End************/



//后台写的JS:
//弹出警告框
function show_msg(msg,type,times){
    if(!type) type = 'info';
    if(type=='info'){
        var background_color = 'rgba(89,170,224,0.9)';
        var font_color = '#fff';
    }else if(type=='success'){
        var background_color = 'rgba(183,229,167,0.9)';
        var font_color = '#5bb35b';
    }else if(type=='error'){
        var background_color = 'rgba(241,174,74,0.9)';
        var font_color = '#fff';
    }

    if(!msg) msg = '操作成功！';
    if(!times) times = 2000;

    var msgs = '<div class="myalert" style="position: fixed; left: 50%; top: -100px;background-color:'+background_color+';color:'+font_color+';padding: 5px 10px; z-index: 2147483647; min-width: 700px; max-width: 1000px; min-height: 40px;border-radius: 5px; line-height: 40px; font-size: 16px;font-weight: normal; text-align: center;">'+msg+'<em style="display:block;width: 20px;height: 20px;position:absolute;right:10px;top:50%;margin:-10px 0 0 0;background: url(/Public/Member/images/close.png) no-repeat 1px 50%;"></em></div>';

    if($('.myalert').length==0){
        $('body').append(msgs);
    }
    var width_  = $('.myalert').width();
    var width_s = width_/2;

    $('.myalert').css({'margin-left':'-'+width_s+'px'});
    $('.myalert').stop().animate({top:"1px"},500);

    setTimeout(function(){
        $('.myalert').stop().animate({top:"-100px"},500);
    },times);
    setTimeout(function(){
        $('.myalert').remove();
    },times+1);
}

//验证码倒计时
function daojishi(obj,times){
    if(!times) times=60;
    var obj = $(obj);
    var wait = times;
    function time_s(obj) {
        if (wait == 0) {
            clearInterval(InterValObj);
            obj.css({'color':'#555','background-color':'#fff','border':'1px solid #C9C9C9','cursor':'pointer'});
            obj.removeAttr("disabled");
            obj.val("* 重新获取");
            wait = times;
        } else {
            obj.css({'color':'#fff','background-color':'#ddd','border':'1px solid #ddd','cursor':'no-drop'});
            obj.attr("disabled", true);
            obj.val('重新获取' + wait + "s");
            wait--;
            setTimeout(function(){time_s(obj)} , 1000);
        }
    }
    var InterValObj = time_s(obj);
}
