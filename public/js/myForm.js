/************ This javascript created by author:xiexikang on 2017-05-04. ************/
//全局配置
var Apis  = {
        main       : '',        //主链接
        register  : '',         //注册
        login   : '',           //登录
        outLogin:'',           //退出登录
        changePassword:'',     //修改密码
        bindPhone:'',           //绑定手机号
        bindEmail:'',           //绑定邮箱号
        success    : 1,         //返回成功标识
        timeCount  : 60        //倒计时
    },
    Regs  = {
        mobile      :   /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/,             //手机号
        email       :   /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,  //邮箱
        qq           :  /^[1-9][0-9]{4,}$/,         //qq号
        integer     :   /^[0-9]*[1-9][0-9]*$/,    //正整数
        intFloat    :   /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/,     //正浮点数
        password    :   /^[0-9a-zA-Z_#]{6,16}$/   //6-16位字符,数字字母符号都可以用
    };

// 定义变量
var myForm = ".myForm",  //表名
    sended = "sended",      //验证码 状态类
    $tip = $(".tip"),    //提示
    $tip2 = $(".tip2"),
    $tip3 = $(".tip3");

//提示文字
function fadeTip(o) {
    var speed =2e3;
    o.tipBox.html(o.tipText).fadeIn(speed, function () {
        o.tipBox.fadeOut(speed, function () {
            if (o.refresh) {
                location.href = o.href || location.href;    //判断页面跳转
            }
            if (o.closePage) {
                window.close();         //关闭窗口
            }
        });
    });
}

//验证码倒计时
function countTime($e,time) {
    $e.attr("data-send",0);
    $e.attr("disabled",true);
    var timer = setInterval(function () {
        time--;
        $e.html("" +time+ "s后重新发送");
        $e.addClass(sended);

        if (time < 0) {
            //倒计时完毕，可再次发送
            clearInterval(timer);
            timer = null;
            $e.html($e.data('html')).attr("disabled",false);  //恢复提示 可发送状态
            $e.removeClass(sended);
        }
    }, 1e3);
}

//json字符串处理
function parseData(d) {
    return typeof(d) == 'string' ? JSON.parse(d) : d;
}

//显示input输入为数字和小数
$.fn.clearNoNum = function () {
    this.bind("keyup", function () {
        this.value = this.value.replace(/[^\d.]/g, "");
        //必须保证第一个为数字而不是.
        this.value = this.value.replace(/^\./g, "");
        //保证只有出现一个.而没有多个.
        this.value = this.value.replace(/\.{2,}/g, ".");
        //保证.只出现一次，而不能出现两次以上
        this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    });
};
//使用佣金
$("#expRell").clearNoNum();
//充值金额
$("#accPayMoney").clearNoNum();

//myPhoneBind.html
+function () {
    // 控制手机号输入为正整数
    $(myForm).on("input","#phone",function (e) {
        var $e   = $(this),
            v = $e.val();
        if(!Regs.integer.test($.trim(v))){
            $e.val("");
            return false;
        }
    });
    //手机号验证
    $(myForm).on("click",'#subBtnPhone',function (e) {
        e.preventDefault();
        var $e   = $(this),
            v    = $('#phone').val();
        $.ajax({
            type      : 'post',
            url       : '../../public/json/phone.json',
            data      : {myPhone: v },
            dataType  : 'json',
            beforeSend: function () {
                if($.trim(v)==""){
                    fadeTip({tipBox:$tip,tipText:"请填写手机号"});
                    return false;
                }else if(!Regs.mobile.test(v)){
                    fadeTip({tipBox:$tip,tipText:"请填写正确的手机号"});
                    return false;
                }
            },
            success:function (data) {
                var d = parseData(data);
                console.log(d);
                if(d.ret==Apis.success){

                }else{
                    console.log("失败了");
                }
            }
        })
    });
    //发送验证码处理
    $(myForm).on("click",'#getCode',function (e) {
        var $e   = $(this),
            v    = $('#phone').val();
        var $tip = $(".tip");
        if($e.data('send')) {
            //send状态激活时才发送请求，正在倒计时状态不发送
            $.ajax({
                type      : 'get',
                url       : '../../public/json/yzm.json',   //短信验证码接口
                data      : {myPhone: v},
                dataType : 'json',       //jsonp格式
                beforeSend:function () {
                    if (!Regs.mobile.test(v)){
                        fadeTip({tipBox:$tip,tipText:"请填写正确的手机号"});
                        return false;
                    }
                },
                success  :function (data) {
                    var d = parseData(data);
                    console.log(d);
                    if(d.ret==Apis.success){
                        //发送成功，进入倒计时
                        countTime($e,Apis.timeCount);
                    }else{
                        console.log("失败了");
                    }
                }
            })
        }
    });
}();

//myEmailBin.html
+function () {
    //电子邮箱验证
    $(myForm).on("click",'#subBtnEmail',function (e) {
        e.preventDefault();
        var $e   = $(this),
            v    = $('#email').val();
        $.ajax({
            type      : 'post',
            url       : '../../public/json/email.json',
            data      : {myEmail: v },
            dataType  : 'json',
            beforeSend: function () {
                if($.trim(v)==""){
                    fadeTip({tipBox:$tip,tipText:"请填写电子邮箱"});
                    return false;
                }else if(!Regs.email.test(v)){
                    fadeTip({tipBox:$tip,tipText:"请填写正确的电子邮箱"});
                    return false;
                }
            },
            success:function (data) {
                var d = parseData(data);
                console.log(d);
                if(d.ret==Apis.success){

                }else{
                    console.log("失败了");
                }
            }
        })
    });
    //发送验证码处理
    $(myForm).on("click",'#getCode2',function (e) {
        var $e   = $(this),
            v    = $('#email').val();
        if($e.data('send')) {
            //send状态激活时才发送请求，正在倒计时状态不发送
            $.ajax({
                type      : 'get',
                url       : '../../public/json/yzm.json',   //短信验证码接口
                data      : {myEmail: v},
                dataType : 'json',       //jsonp格式
                beforeSend:function () {
                    if (!Regs.email.test(v)){
                        fadeTip({tipBox:$tip,tipText:"请填写正确的电子邮箱"});
                        return false;
                    }
                },
                success  :function (data) {
                    var d = parseData(data);
                    console.log(d);
                    if(d.ret==Apis.success){
                        //发送成功，进入倒计时
                        countTime($e,Apis.timeCount);
                    }else{
                        console.log("失败了");
                    }
                }
            })
        }
    });
}();

//myBankBind.html
+function () {
    // 控制银行卡号号输入为正整数
    $(myForm).on("input","#card",function (e) {
        var $e   = $(this),
            v = $e.val();
        if(!Regs.integer.test($.trim(v))){
            $e.val("");
            return false;
        }
    });
    // 发送到手机验证码
    $(myForm).on("click",'#getCode3',function (e) {
        var $e = $(this);
        if($e.data('send')) {
            //send状态激活时才发送请求，正在倒计时状态不发送
            $.ajax({
                type      : 'get',
                url       : '../../public/json/yzm2.json',   //短信验证码接口
                data      : {},
                dataType  : 'json',
                beforeSend :function () {
                    
                },
                success  :function (data) {
                    var d = parseData(data);
                    if(d.ret==Apis.success){
                        //发送成功，进入倒计时
                        countTime($e,Apis.timeCount);
                    }else{
                        console.log("失败了");
                    }
                }  
            })
        }
    });

    //银行卡验证
    $(myForm).on("click",'#subBtnBank',function (e) {
        var $e   = $(this),
            v1    = $('#name').val(),
            v2    = $('#card').val();
        $.ajax({
            type      : 'post',
            url       : '../../public/json/bankCard.json',
            data      : {name: v1,card:v2},
            dataType  : 'json',
            beforeSend  :function () {
                if($.trim(v1)==""){
                    fadeTip({tipBox:$tip,tipText:"请填写您的姓名"});
                    return false;
                }else if($.trim(v2)==""){
                    fadeTip({tipBox:$tip2,tipText:"请填写银行卡号"});
                    return false;
                }
            },
            success     :function (data) {
                var d = parseData(data);
                console.log(d);
                if(d.ret==Apis.success){

                }else{
                    console.log("失败了");
                }
            }
        })
    })
}();

// myBasicInf.html
+function () {
    //控制QQ输入为正整数
    $(myForm).on("input","#qq",function (e) {
       var $e   = $(this),
            v = $e.val();
       if(!Regs.integer.test($.trim(v))){
           $e.val("");
           return false;
       }
    });
    // QQ号，微信号验证
    $(myForm).on("click",'#subBtn3',function (e) {
        var $e   = $(this),
            qqV = $("#qq").val(),
            wxV = $("#wx").val();
        $.ajax({
            type        : 'post',
            url         : '../../public/json/qqWx.json',
            data        :{ myQQ:qqV , myWx:wxV },
            dataType    :'json',
            beforeSend   :function () {
                if($.trim(qqV)==""){
                    fadeTip({tipBox:$tip,tipText:"请填写QQ号码"});
                    return false;
                }else if(!Regs.qq.test(qqV)){
                    fadeTip({tipBox:$tip,tipText:"请填写正确的QQ号码"});
                    return false;
                }
                if($.trim(wxV)==""){
                    fadeTip({tipBox:$tip2,tipText:"请填写微信号"});
                    return false;
                }
            },
            success:    function (data) {
                var d = parseData(data);
                console.log(d);
                if(d.ret==Apis.success){

                }else{
                    console.log("失败了");
                }
            }
        })
    });
}();

// myPassword.html
+function () {
    //密码验证
    $(myForm).on("click",'#subBtn4',function (e) {
        var $e   = $(this),
            odlPwdV = $("#oldPwd").val(),
            newPwdV = $("#newPwd").val(),
            newPwdsV = $("#newPwds").val();
        $.ajax( {
            type        : 'get',
            url         :  '../../public/json/password.json',
            data        :'',
            dataType   :'json',
            beforeSend  :function () {
                if($.trim(odlPwdV)==""){
                    fadeTip({tipBox: $tip, tipText: '原密码不能为空'});
                    return false;
                }else if(!Regs.password.test(odlPwdV)){
                    fadeTip({tipBox:$tip,tipText:'原密码错误'});
                    return false;
                }else if(!Regs.password.test(newPwdV)){
                    fadeTip({tipBox:$tip2,tipText:'6-16位字符，不能包含空格'});
                    return false;
                }else if(newPwdV!==newPwdsV){
                    fadeTip({tipBox:$tip3,tipText:'两次输入的密码不一致'});
                    return false;
                }
            },
            success     :function (data) {
                var d = parseData(data);
                console.log(d);
                if(d.ret==Apis.success){
                    
                }else{
                    console.log(d.msg);
                }
            }
        })
    });
}();

// accountPay.html
+function () {
    //控制金额输入为正整数
   /* $(myForm).on("input","#accPayMoney",function (e) {
        var $e   = $(this),
            v = $e.val();
        if(!Regs.intFloat.test($.trim(v))){
            $e.val("");
            return false;
        }
    });*/
    //充值金额
    $("#rechargeBtn").on("click",function (e) {
        var $e   = $(this),
            v = $("#accPayMoney").val(),
            li = $(".selList ul li"),
            s = 'cur';
        $.ajax( {
            type        : 'post',
            url         :  '../../public/json/accPayMoney.json',
            data        :'',
            dataType   :'json',
            beforeSend   :function () {
                if($.trim(v)==""){
                    fadeTip({tipBox: $tip, tipText: '请输入充值金额'});
                    return false;
                }
                if(li.hasClass(s)){
                    return;
                }else{
                    fadeTip({tipBox: $tip2, tipText: '请选择支付选项'});
                    return false;
                }
            },
            success         :function (data) {
                var d = parseData(data);
                console.log(d);
                if(d.ret==Apis.success){

                }else{
                    console.log(d.msg);
                }
            }
        })
    });
}();
/************ This javascript created by author:xiexikang on 2017-05-04. End************/





















