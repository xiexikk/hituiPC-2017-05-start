/************ This javascript created by author xiexkang 2017-05  Start************/
var Apis = {
    success    : 1         //返回成功标识
};

//json字符串处理
function parseData(d) {
    return typeof(d) == 'string' ? JSON.parse(d) : d;
}

$(document).ready(function () {
//~~ indexIn.html
    +function () {
    // 侧边栏Fn
        // 点击标题切换
        var hdTit = ".indexCom .inL .item .hdTit",    //标题栏
            hdTitNum = $(hdTit).length,                  //标题数
            li = ".indexCom .inL .list ul li",       //课程li
            it = ".item",                               //item块
            s = 'cur',                                  //li经过类
            c = 'close',                               //c类 切换标题栏箭头状态，item块展示状态
            proNum ='.proNum',                         //进度百分比
            curPro = '.curPro';                       //进度条百分比
        for(var i = 0; i<hdTitNum ;i++){
            (function () {
                var bl = true;
                $(hdTit)[i].onclick = function (e) {
                    var $e = $(this);
                    $e.parents(it).toggleClass(c);
                    bl ? $e.parents(it).addClass(c) : $e.parents(it).removeClass(c);
                    bl = !bl;
                }
            })(i);
        }
        //鼠标经过每个li
        $(li).hover(function () {
            $(this).toggleClass(s);
        });
        //当前进度条的值（百分比值）
        $(li).each(function (i,e) {
            var proWid =  parseFloat($(li).eq(i).find(proNum).text());
            $(li).eq(i).find(curPro).width(proWid+'%');
        });

    /*----------------------------------------------------------------------------------*/
    // 右边最新回答
        // 回复框操作    主人：一级留言 , 客人：二级留言
        var mesIcoT = ".mesIcoT",   //主人留言按钮
             mesIcoB = ".mesIcoB",  //客人回复按钮
            anAreaT = ".anAreaT",   //主人留言框
            anAreaB = ".anAreaB",   //客人留言框
            itemS  = ".itemX",      //客人列表
            anArea =".anArea";      //留言框
        $(mesIcoT).on("click",function (e) {
            var $e = $(this);
            $e.parents("li").find(anAreaT).toggle();
            $e.parents("li").siblings('li').find(anAreaT).hide();
            $(anAreaB).hide();
        });
        $(mesIcoB).on("click",function (e) {
            var $e = $(this);
            $e.parents(itemS).find(anAreaB).toggle();
            $e.parents(itemS).siblings(itemS).find(anAreaB).hide();
            $(anAreaT).hide();
        });
        //隐藏回复框
        function hideFn(parm) {
            $(parm + " .cancleBtn").on("click", function () {
                $(parm).hide();
            });
            var myTimer = null, timeNum = 2;
            $(parm + " .subBtn").on("click", function () {
                var txtVal = $(this).parents(parm).find('textarea').val();
                $(this).parents(parm).find("p").remove();
                clearInterval(myTimer);
                if ($.trim(txtVal) == "") {
                    $(this).parents(parm).find(".bot").append("<p>回复留言不能为空哦！</p>");
                    myTimer = setInterval(function () {
                        timeNum--;
                        if (timeNum == 0) {
                            clearInterval(myTimer);
                            $(parm).find("p").remove();
                        }
                    }, 1e3);
                    timeNum = 2;
                    return false;
                }
            });
        }
        hideFn(anArea);
    }();

//~~course.html
    ~function () {
        //旧版模块
        var ulLi = $(".courList ul li"),
            ol = $(".courList ol"),
            olLi = $(".courList ol li"),
            liNum = ulLi.length;
        s = 'cur';
        for (var i = 0; i < liNum; i++) {
            // 右侧收藏/取消
            (function () {
                var bl = true;
                ulLi[i].onclick = function () {
                    $(this).find('.sc').toggleClass(s);
                    bl ? $(this).find('.sc').html("<i></i>取消") : $(this).find('.sc').html("<i></i>收藏");
                    bl = !bl;
                };
            })(i);
            //左侧的线：动态处理
            var html = '<li class="ii' + i + '"></li>';
            ol.append(html);
            ol.css("height", i * 49 + 'px');
            ol.find('li').eq(i).css("top", i * 49 + 'px');
        }
    /*----------------------------------------------------------------------------------*/
        // 点击加载更多
        var pageNum = 0,
            totalPages = 0,
            $loadBtn = $('.loadBtn'),
            $courUl = $('.courLists ul');
        // 定时器
        var timer;
        function stFn() {
            $loadBtn.attr('data-staus',0);
        }
        timer = setTimeout(stFn,1e3);
        //按钮状态
        function loadBtnStaus(){
            var dataStuas;
            dataStuas =$loadBtn.attr('data-staus');
            //console.log(dataStuas);
            if(dataStuas=0){
                $loadBtn.html('<i></i>点击加载更多...');
            }else if(dataStuas=1){
                $loadBtn.addClass('loading').html('<i></i>数据加载中...');
            }else if(dataStuas=2){
                $loadBtn.find('i').remove();
                $loadBtn.html('没有更多了...');
            }
        }

        $loadBtn.on("click",function () {
            loadBtnStaus();
            $.ajax({
                type      : 'post',
                url       : '../../public/json/loadMore.json',
                data      : { pageNum: pageNum+1 },
                dataType  : 'json',
                beforeSend  :function () {
                    $loadBtn.attr('data-staus',1);
                    timer = setTimeout(stFn,1e3);
                },
                success   :function (data) {
                    var html='';
                    $.each(data.coursesList.data,function (i,myItem) {
                        //定义变量 标签赋值
                        var aX,stateX,spX,costX,labX;
                        //购买与播放
                        if(myItem.state==0){                            // myItem.state   状态0 购买  状态不为0 播放
                            aX = '<a href="javascript:;">';                     //购买时跳转地址
                            stateX = '<i class="iconfont icon-216"></i>';
                            spX = '<span class="ti00">购买</span>';
                            costX = '<div class="money fl">';
                        }else{
                            aX = '<a href="javascript:;">';                     //播放时跳转地址
                            stateX = '<i class="iconfont icon-bofang"></i>';
                            spX = '<span class="ti01">播放</span>';
                            costX = '<div class="money fl delNo">';
                        }
                        //顶部左侧标签
                        if(myItem.tag==0){                                  //myItem.tag   状态0 没有标签   状态1 最新视频标签  状态2 推荐标签
                            labX = '<span class="lab"></span>';
                        }else if(myItem.tag==1){
                            labX = '<span class="lab labNew"></span>';
                        }else if(myItem.tag==2){
                            labX = '<span class="lab labTj"></span>';
                        }
                        //加载结构html
                        html+='<li>' +
                            '<div class="item">' +
                            '<div class="tp">' +
                            '<a href="javascript:;">' +
                            '<img src="../../public/images/loading.gif" data-src="'+myItem.headImg+'" alt="" class="lazy">' +
                            ' </a>' +
                            '<i class="iconfont icon-shoucang"></i>' +
                            labX +
                            '</div>' +
                            '<div class="txt">' +
                            '<p class="tiName">' +
                            '<a href="javascript:;">'+myItem.tit+'</a> ' +
                            '</p>' +
                            '<div class="bot">' +
                            costX +
                            '<em>'+myItem.cost+'</em>学习币</div>' +
                            '<div class="handle fr">' +
                            aX+
                            stateX +
                            spX +
                            '</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</li>';
                    });
                    $courUl.append(html);

                    clearTimeout(timer);

                    pageNum = data.coursesList.pageNum;             //当前页数
                    totalPages = data.coursesList.totalPages;      //总页数
                    if(pageNum>=totalPages ){
                       $loadBtn.attr('data-staus',2);
                    }
                    imgLoad();    //图片懒加载方法
                }
            });
        });
    }();

//~~~my个人中心方法共用
    +function () {
      //Tab栏操作Fn
        function tabChg(parm1, parm2) {
            $(parm2).eq(0).show().siblings().hide();
            var s = 'cur';
            $(parm1).on("click", function () {
                var index = $(this).index();
                $(this).addClass(s).siblings().removeClass(s);
                $(parm2).eq(index).show().siblings().hide();
            })
        }
        //myAccount.html
        tabChg(".myCom .finance .finRecord ol li", ".myCom .finance .finRecord ul li");
        //myInfor.html
        tabChg(".infor .inforCom ol li", ".infor .inforCom ul li");
   /*----------------------------------------------------------------------------------*/
      //选择项操作Fn
        function mySel(o) {
            var s = 'cur';
            $(o+':eq(0)').addClass(s).siblings(o).removeClass(s);
            $(o).on("click",function (e) {
                var $e = $(this);
                $e.addClass(s).siblings(o).removeClass(s);
            });
            $(o+' i').on("click",function (e) {
                var $e = $(this).parents(e);
                $e.addClass(s).siblings(o).removeClass(s);
            })
        }
        // myPortrait.html 选择头像
        mySel(".portrait ul li");
        //accPayWap.html 充值方式
        mySel('.paySel li');
        //accountPay.html 支付选择项
        mySel('.selList li');
        //accUpSel.html 报名课程项
        mySel('.selCour li');
    }();

//~~myCourse.html
    ~function () {
        // 右侧小箭头内容操作
        var ulLi = $(".myCourse .accCom  ul li .jt"),
            liNum = ulLi.length,
            s = 'open';
        for (var i = 0; i < liNum; i++) {
            (function () {
                ulLi[i].onclick = function () {
                    $(this).parents('li').toggleClass(s);
                    $(this).parents('li').find('.xlItem').toggle();
                }
            })(i);
        }
    }();

//~~ myInfor.html
    // 消息操作功能
    +function () {
        //~~全局定义变量
        var itemX  =  ".js-item",                 //item块
            cheX = ".js-che",                    //单选
            delPop = ".delPop",                 //弹窗
            sureBtn = '.js-sureBtn',            //弹窗确定按钮
            canBtn  = ".js-canBtn",             //弹窗取消按钮
            close = ".js-close",                //关闭窗口
            allDel = "#allDel",                 //底部删除按钮
            allCheX = "#allChe",                //底部选择所有按钮
            txtTip = ".js-tip",                  //文字提示
            change = "change",                  //改变窗口高度 和 按钮区的显示
            h = "hover",                        //选中che的类
            stausArr = ['A','B','C','D'];        //弹窗状态：A:删除对应，B:删除所有，C:选中，D:没有选择
            /*备注：data-del 是删除对应的属性标识；data-staus:弹窗类型状态标识*/

        /*-------------------------------------------------动态生成提示窗Html------------------------------------------------------------------*/
            jQuery.fn.extend({
                //添加html：
                addPopHtml:function () {
                    var popDelHtml='';
                        popDelHtml ='<section class="delPop" data-staus="">' +
                        '<div class="in">' +
                        '<i class="close js-close"></i>' +
                        '<p class="js-tip">' +
                        '<span class="ico"></span>' +
                        '</p>' +
                        '<div class="han js-han">' +
                        '<a href="javascript:;" class="fl sureBtn js-sureBtn">确定</a>' +
                        '<a href="javascript:;" class="fr canBtn js-canBtn">取消</a> ' +
                        '</div>' +
                        '</div>' +
                        '</section>';
                    if($(itemX).length>0){
                        $(popDelHtml).insertAfter($("#footer"));
                        console.log('yes');
                    }else {
                        console.log('no');
                    }
                },
                // 删除html:
                delPopHtml:function () {
                    $(delPop).remove();
                }
            });

        /*-------------------------------------------------统计计算方法------------------------------------------------------------------*/
        //统计方法
        function setNumber(){
            //设置值
            var cheNum   = $(cheX).length,     //已有数量
                count = 0,                     //变量累加初始 0
                money = 0;                     //总额初始 0
            $.each($(cheX).closest('li').find(itemX), function (i, e) {
                //根据勾选中的数量计算总值
                if ($(e).find(cheX).hasClass(h)) {
                    count++;                                        //累加数
                    //console.log(count);
                }
            });
            count - cheNum ? $(allCheX).removeClass(h) : $(allCheX).addClass(h);       //个数对比   根据是否含类h 比较计算显示
        }

        /*--------------------------------------------------选择操作方法（单选，多选，全选）-------------------------------------------------------------------*/
        // 属性添加方法 判断                data-item属性值辨别，与data-id  一一对应，后台识别选中删除
        jQuery.fn.extend({
            //单一对应data-item属性
            dataItem:function () {
                var $e = $(this);
                $e.toggleClass(h);
                if($e.hasClass(h)){
                    var dataId =$e.parents(itemX).attr('data-id');
                    $e.parents(itemX).attr('data-item', dataId);
                }else{
                    $e.parents(itemX).attr('data-item', '');
                }
            },
            //所有data-item属性
            allDataItem:function () {
                var $e = $(this);
                $e.toggleClass(h);
                if($e.hasClass(h)){
                    $(cheX).addClass(h);
                    $(itemX).each(function (i,e) {
                        var  dataId = $(itemX).eq(i).attr("data-id");
                        $(itemX).eq(i).attr("data-item",dataId);
                    });
                }else{
                    $(cheX).removeClass(h);
                    $(cheX).parents(itemX).attr('data-item', '');
                }
            }
        });

        // ----------------------------
        //单选，多选方法
        $(cheX).on("click",function () {
            $(this).dataItem();
            setNumber();
        });
        // 全选方法
        $(allCheX).on("click",function (e) {
            $(this).allDataItem();
            setNumber();
        });
        /*--------------------------------------------------------窗口状态类型-------------------------------------------------------------*/
        var stausA =stausArr[0],
            stausB =stausArr[1],
            stausC =stausArr[2],
            stausD =stausArr[3];
        // 不同状态窗
        function stausPop() {
            var popStatus;
                popStatus = $(delPop).attr('data-staus');
            //不同状态添加属性标识
            if(popStatus==stausA){
                $(txtTip).html('您确定要删除此消息吗？');
            }else if(popStatus==stausB){
                $(txtTip).html('您确定要所有消息吗？');
            }else if(popStatus==stausC){
                $(txtTip).html('您确定要删除这些消息吗？');
            }else if(popStatus==stausD){
                $(txtTip).html('<span class="ico"></span>请选择要删除的消息！');
            }
            if(popStatus==stausD){
                $(delPop).addClass(change);
            }else {
                $(delPop).removeClass(change);
            }
        }

        /*-------------------------------------------------删除操作--------------------------------------------------------------------*/
        // 删除及弹窗操作:          备注：点击确定删除按钮，得把删除这个事件响应后台，后台先删除数据后，前端才进行操作，页面才得以显示正确的数值
        // 已选中的删除
        function  selectedDel(){
            var $selected=$(cheX+'.'+h);
            $selected.parents(itemX).remove();
        }
        //底部选中后删除的按钮 全选，选中，未选中
        $(allDel).on('click',function () {
            $(this).addPopHtml();
            $(itemX).each(function (i,e) {
                //全选的情况下：
                if($(allCheX).hasClass(h)){
                    $(delPop).attr('data-staus',stausB);
                    stausPop();
                    return false;
                }
                //选中的情况下：
                if($(cheX).hasClass(h)){
                    var cheXedNum = $(cheX+'.'+h).length;
                    if(cheXedNum==1){
                        $(delPop).attr('data-staus',stausA);
                        stausPop();
                        return false;
                    }else{
                        $(delPop).attr('data-staus',stausC);
                        stausPop();
                        return false;
                    }
                }
                //未选中的情况下：
                else{
                    $(delPop).attr('data-staus',stausD);
                    stausPop();
                    return false;
                }
            })
        });

        //确定按钮
        $(document).on('click',sureBtn,function () {
            var msgId= "";
           $.ajax({
                url: '../../public/json/msg.json',
                type: 'POST',
                data: {'msg_id':msgId},
                success: function(data){
                    var d = parseData(data);
                    if(d.ret==Apis.success){
                        $(this).dataItem();
                        selectedDel();
                        show_msg(d.msg);
                        return false;
                    }else{
                        show_msg(d.msg,'error');
                        return false;
                    }
                }
            });
        });
        //关闭窗口
        $(document).on('click',sureBtn+','+ canBtn +','+ close,function () {
            $(this).delPopHtml();
        });
    }();

//~~accountPay.html,orderInf.html
    // 充值进度，升级账号进度，购买订单进度
    +function () {
        function progressFn(payPlan,arrV) {
            var $inLine =  $(payPlan+' .inLine'),        //当前进度
                planLi = payPlan+ ' li',
                lineWid = $inLine.width(),
                arr=arrV,
                s='cur',
                x;
           // console.log(arr);
            for(x in arr){
                if (lineWid == arr[0]) {
                    $(planLi + ':lt(1)').addClass(s);
                    return;
                } else if (lineWid == arr[1]) {
                    $(planLi + ':lt(2)').addClass(s);
                    return;
                } else if (lineWid == arr[2]) {
                    $(planLi + ':lt(3)').addClass(s);
                    return;
                }
                else if (lineWid == arr[3]) {
                    $(planLi + ':lt(4)').addClass(s);
                    return;
                }
            }
        }
        //~~accountPay.html 充值进度：
        progressFn("#payPlan01",[120,360,480]);       //进度1：120；进度2：360；进度3：480   宽度px
        //~~accUpsel.html 升级账号进度；~~orderInf.html 购买订单进度
        progressFn("#payPlan02",[96,263,426,524]);    //进度1：96；进度2：263；进度3：426,进度4：524     宽度px

    }();

// ~~orderConfirm.html
    ~function () {
        //使用优惠卷，使用佣金
        var $ii = $(".js-switch"),
            iiNum = $ii.length,
            s = 'cur';
        for (var i = 0; i < iiNum; i++) {
            $ii.eq(i).on('click',{a:i},function (event) {
               // console.log(event.data.a);
                $(this).parents('.it').toggleClass(s);
            })
        }
/*        //控制佣金框输入为正浮点
        var regYj = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
        $("#expRell").on('input',function (e) {
            var $e   = $(this),
                v = $e.val();
            if(!regYj.test($.trim(v))){
                $e.val("");
                return false;
            }
        })*/
    }();

//~~orderInf.html
    /*--订单操作功能--*/
    +function () {
        //~~全局定义变量
        var itemK  =  ".o-item",                 //item块
            cheK = ".o-che",                    //单选
            cheNo ='.o-cheNo',                   //不可选中的che
            delK = ".o-del",                    //右侧对应删除按钮
            delPop = ".delPop",                 //弹窗
            sureBtnK = '.o-sureBtn',            //弹窗确定按钮
            canBtnK  = ".o-canBtn",             //弹窗取消按钮
            close = ".o-close",                //关闭窗口
            allDelK = "#o-allDel",              //底部删除按钮
            allCheK = "#o-allChe",             //底部选择所有按钮
            txtTip = ".o-tip",                  //文字提示
            change = "change",                  //改变窗口高度 和 按钮区的显示
            h = "hover",                        //选中che的类
            cost = ".cost",                     //单价
            orderNum = "#orderNum",             //个数
            orderCost = "#orderCost",           //总额
            shopCarNum ="#shopCarNum",           //右侧悬浮栏购物车
            stausArr = ['A','B','C','D','E'];    //弹窗状态：A:删除对应，B:删除所有，C:选中，D:没有选择  E为不可勾选

        /*备注：data-del 是删除对应的属性标识；data-staus:弹窗类型状态标识*/

        /*-------------------------------------------------动态生成提示窗Html------------------------------------------------------------------*/
        jQuery.fn.extend({
            //添加html：
            addPopHtmlFn:function () {
                var popDelHtml='';
                popDelHtml ='<section class="delPop" data-staus="">' +
                    '<div class="in">' +
                    '<i class="close o-close"></i>' +
                    '<p class="o-tip">' +
                    '<span class="ico"></span>' +
                    '</p>' +
                    '<div class="han o-han">' +
                    '<a href="javascript:;" class="fl sureBtn o-sureBtn">确定</a>' +
                    '<a href="javascript:;" class="fr canBtn o-canBtn">取消</a> ' +
                    '</div>' +
                    '</div>' +
                    '</section>';
                if($(itemK).length>0){
                    $(popDelHtml).insertAfter($("#footer"));
                    console.log('yes');
                }else {
                    console.log('no');
                }
            },
            // 删除html:
            delPopHtmlFn:function () {
                $(delPop).remove();
            }
        });

        /*-------------------------------------------------统计与购物车计算方法------------------------------------------------------------------*/
        //选中统计Fn：计算方法（个数，总额）
        $(orderNum+','+orderCost).text(0);         //个数，总额，初始化默认值为 0
        var oldCarNum =$(itemK).length;
        $(shopCarNum).text(oldCarNum);     //购物车数：初始化默认值为个数
        //统计方法
        function setNumberFn(){
            //设置值
            var cheNum   = $(cheK).length,     //已有数量
                count = 0,                     //变量累加初始 0
                money = 0;                     //总额初始 0
            $.each($(cheK).closest('li').find(itemK), function (i, e) {
                //根据勾选中的数量计算总值
                if ($(e).find(cheK).hasClass(h)) {
                    count++;                                        //累加数
                    //console.log(count);
                    money += parseInt($(cost).eq(i).text());       //累加价格
                }
            });
            $(orderNum).text(count);                           //计算后选中个数   选中数
            $(orderCost).text(money);                           //计算后总额
            count - cheNum ? $(allCheK).removeClass(h) : $(allCheK).addClass(h);       //个数对比   根据是否含类h 比较计算显示
        }

        /*--------------------------------------------------选择操作方法（单选，多选，全选）-------------------------------------------------------------------*/
        // 属性添加方法 判断                data-item属性值辨别，与data-id  一一对应，后台识别选中删除
        jQuery.fn.extend({
            //单一对应data-item属性
            dataItemFn:function () {
                var $e = $(this);
                $e.toggleClass(h);
                if($e.hasClass(h)){
                    var dataId =$e.parents(itemK).attr('data-id');
                    $e.parents(itemK).attr('data-item', dataId);
                }else{
                    $e.parents(itemK).attr('data-item', '');
                }
            },
            //所有data-item属性
            allDataItemFn:function () {
                var $e = $(this);
                $e.toggleClass(h);
                if($e.hasClass(h)){
                    $(cheK).addClass(h);
                    $(itemK).each(function (i,e) {
                        var  dataId = $(itemK).eq(i).attr("data-id");
                        $(itemK).eq(i).attr("data-item",dataId);
                    });
                }else{
                    $(cheK).removeClass(h);
                    $(cheK).parents(itemK).attr('data-item', '');
                }
            }
        });

        // ----------------------------------------------------------
        //单选，多选方法
        $(cheK).on("click",function () {
            $(this).dataItemFn();
            setNumberFn();
        });
        // 全选方法
        $(allCheK).on("click",function (e) {
            $(this).allDataItemFn();
            setNumberFn();
        });

        /*--------------------------------------------------------窗口状态类型-------------------------------------------------------------*/
        var stausA =stausArr[0],
            stausB =stausArr[1],
            stausC =stausArr[2],
            stausD =stausArr[3],
            stausE =stausArr[4];
        // 不同状态窗
        function stausPopFn() {
            var popStatus;
                popStatus = $(delPop).attr('data-staus');
            //可勾选的情况，不同状态添加属性标识
            if(popStatus==stausA){
                $(txtTip).html('您确定要删除此课程吗？');
            }else if(popStatus==stausB){
                $(txtTip).html('您确定要所有课程吗？');
            }else if(popStatus==stausC){
                $(txtTip).html('您确定要删除这些课程吗？');
            }else if(popStatus==stausD){
                $(txtTip).html('<span class="ico"></span>请选择要删除的课程！');
            }
            if(popStatus==stausD){              //D:此时没有按钮操作区域
                $(delPop).addClass(change);
            }else {
                $(delPop).removeClass(change);
            }
            //不可被勾选的情况
            if(popStatus==stausE){
                $(txtTip).html('您确定要删除此课程吗？');
            }
        }

        /*-------------------------------------------------删除操作--------------------------------------------------------------------*/
        // 删除及弹窗操作:          备注：点击确定删除按钮，得把删除这个事件响应后台，后台先删除数据后，前端才进行操作，页面才得以显示正确的数值
        // 删除方法：可被选的项，不可被选的选
        function selectDel(){
            var $selected;
            //可被选中
            if($(delPop).attr('data-staus',stausA)){
                $selected=$(cheK+'.'+h);
                $selected.parents(itemK).remove();
            }
            //不可被选中
            if($(delPop).attr('data-staus',stausE)){
                $selected=$(cheNo+'.'+h);
                $selected.parents(itemK).remove();
            }
        }
        //右侧对应单删的按钮
        $(delK).on('click',function (e) {
            $(this).addPopHtmlFn();
            var $theChk = $(this).parents(itemK).find(cheK),
                $theChkNo = $(this).parents(itemK).find(cheNo);
            $theChk.addClass(h);
            $theChkNo.addClass(h);
            //可被选的项
            if( $theChk.hasClass(h)){
                $(delPop).attr('data-staus',stausA);
            }
            //不可被选的项
            if($theChkNo.hasClass(h)){
                $(delPop).attr('data-staus',stausE);
            }
            stausPopFn();
        });
        //底部选中后删除的按钮 全选，选中，未选中
        $(allDelK).on('click',function () {
            $(this).addPopHtmlFn();
            $(itemK).each(function (i,e) {
                //全选的情况下：
                if($(allCheK).hasClass(h)){
                    $(delPop).attr('data-staus',stausB);
                    stausPopFn();
                    return false;
                }
                //选中的情况下：
                if($(cheK).hasClass(h)){
                    var cheKedNum = $(cheK+'.'+h).length;
                    if(cheKedNum==1){
                        $(delPop).attr('data-staus',stausA);
                        stausPopFn();
                        return false;
                    }else{
                        $(delPop).attr('data-staus',stausC);
                        stausPopFn();
                        return false;
                    }
                }
                //未选中的情况下：
                else{
                    $(delPop).attr('data-staus',stausD);
                    stausPopFn();
                    return false;
                }
            })
        });

        //确定按钮
        $(document).on('click',sureBtnK,function () {
            var msgId= "";
            $.ajax({
                url: '../../public/json/msg.json',
                type: 'POST',
                data: {'msg_id':msgId},
                success: function(data){
                    var d = parseData(data);
                    if(d.ret==Apis.success){
                        $(this).dataItemFn();
                        selectDel();
                        show_msg(d.msg);
                        return false;
                    }else{
                        show_msg(d.msg,'error');
                        return false;
                    }
                }
            });
        });
        //关闭窗口
        $(document).on('click',sureBtnK+','+ canBtnK +','+ close,function () {
            $(this).delPopHtmlFn();
        });
    }();

});
/************ This javascript created by author xiexkang 2017-05  End************/