/************ This javascript created by author:xiexikang on 2017-05.16 Start************/
$(document).ready(function () {
    // banner轮播图
    +function () {
        var banner = ".banner",    //banner区
            bImg = ".bImg",         //图片区域
            img = ".bImg a",        //图片
            bList = ".bList",       //底部小圆点区
            imgNum = $(img).length,  //图片数量
            ctWid = imgNum*100,      //图片区域总宽度
            imgWid = 1/imgNum*100,   //单个图片宽度
            s ="cur",               //当前显示类
            n=0;                    //n变量值
        $(bImg).width(ctWid+"%");
        $(img).width(imgWid+"%");
        $(bList).width(imgNum*30);
        //底部小圆点添加
        for(var i=0;i<imgNum;i++) {
            $(bList).append("<span></span>");
        }
        //点击小圆点触发
        $(bList+' span').eq(0).addClass(s).siblings("span").removeClass(s);
        $(bList+' span').on("click",function () {
            var lsIndex=$(this).index();
            n=lsIndex;
            var ctPosit=n*100;
            $(bImg).animate({"left":"-"+ctPosit+"%"},1e3);
            $(this).addClass(s).siblings("span").removeClass(s);
        });
        //自动播放
        function rollEnvent(){
            if(n==imgNum-1){
                var ctPosit=(n+1)*100;
                $(banner).append($(bImg).clone());
                $(bImg+':last').css("left","100%");
                $(bImg+':first').animate({"left":"-"+ctPosit+"%"},1e3);
                $(bImg+':last').animate({"left":"0"},1e3);
                var setTime0=setTimeout(function () {
                    $(bImg+':first').remove();
                }, 1e3);
                n=0;
                $(bList+' span').eq(0).addClass(s).siblings("span").removeClass(s);
            } else {
                n++;
                var ctPosit=n*100;
                $(bImg).animate({"left":"-"+ctPosit+"%"},1e3);
                $(bList+' span').eq(n).addClass(s).siblings("span").removeClass(s);
            }
        }
        var slidesetInterval=setInterval(rollEnvent,4e3);
        $(banner).hover(function(){
            clearInterval(slidesetInterval);
        },function(){
            slidesetInterval=setInterval(rollEnvent,4e3);
        });
    }();

    //课程推荐
    ~function () {
        function selFn(o) {
            $(o).on("hover",function (e) {
                var $e = $(this);
                $e.toggleClass('cur');
            });
        }
        selFn(".kcList li");
    }();

    //平台公告
    +function () {
        function tabChg(parm1, parm2) {
            $(parm1).eq(0).addClass('cur');
            $(parm2).eq(0).show().siblings().hide();
            var s = 'cur';
            $(parm1).hover(function () {
                var index = $(this).index();
                $(this).addClass(s).siblings().removeClass(s);
                $(parm2).eq(index).show().siblings().hide();
            })
        }
        tabChg(".notTab ol li",".notList ul li");
    }();

    //热门视频
    +function () {
        var $bd      = $('.courIn'),                                        //主区域
            $ulBox  = $bd.find('ul'),                                        //ul区
            $lis    = $ulBox.find('li'),                                     //每个li区
            len      = $lis.length,                                          //li个数
            $lBtn    = $bd.find('.prev'),                                    //上一页
            $rBtn    = $bd.find('.next'),                                    //下一页
            imgWidth = $lis.eq(len - 1).width(),                             //li的宽
            ml       = parseFloat($lis.eq(len - 1).css('margin-left')),   //li的ml
            w        = imgWidth * len + ml * (len-1),                       //计算ul的总宽度
            i        = 0;

        $ulBox.css({width: w});
        $lBtn.click(function () {
            clickBtn('prev');
        });
        $rBtn.click(function () {
            clickBtn('next');
        });
        //点击执行方法
        function clickBtn(dir) {
            switch (dir) {
                case 'prev':
                    i = i - 1 < 0 ? 0 : i - 1;
                    break;
                case 'next':
                    i = i + 1 > len - 4 ? len - 4 : i + 1;
                    break;
            }
            var ua = navigator.userAgent;      //userAgent 属性是一个只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值。.
            if ((ua.indexOf('compatible') > -1 && (ua.indexOf('MSIE 8') > -1 || ua.indexOf('MSIE 9') > -1))) {
                $ulBox.css({left: -(imgWidth + ml) * i});
            } else {
                $ulBox.stop().animate({left: -(imgWidth + ml) * i}, 0.25e3);
            }
        }
    }();

});
/************ This javascript created by author:xiexikang on 2017-05 end************/


/************ author:hehuihua 2017-5-17************/
//courseContent.html页面
$(document).ready(function () {
    +function () {
        $('.cLeft ul li').click(function () {
              var c="curC",            //字体的颜色
                  activeH="activeH",  // 右边块div的显示
                  rightDiv=$(this).parents(".cLeft").siblings(".cRigth");    //右边对应的div块
              $(this).find("a").addClass(c).parents("li").siblings("").find("a").removeClass(c);
              rightDiv.eq($(this).index()).addClass(activeH).siblings(".cRigth").removeClass(activeH);
        })
    }();
});


