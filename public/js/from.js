/**
 * Created by Administrator on 2017/4/27.
 */
function fromLogin(obj) {
    var error=$("#error");
    var uname = $('form input[name=username]').val();
    var password=$('form input[name=password]').val();
    var verifyCode=$('form input[name=verify]').val();
    if(uname==""||password==""){
        error.css("display","block");
        error.html("用户名或密码不能为空");
        return false;
    }
    if(verifyCode==""){
        error.css("display","block");
        error.html("请填写验证码");
        return false;
    }
}
//tab栏
$(document).ready(function() {
    $(".panel-header span").eq(0).addClass('cur');
    $(".panel-header span").click(function() {
        $(this).addClass('cur').siblings('span').removeClass('cur');
        $(".tabDiv").hide().eq($(".panel-header span").index(this)).show();
    });
});

// 倒计时的处理
var mstime = 90;
function emailColok(obj){
    $(obj).css("disabled",true);
    $(obj).css("cursor", "not-allowed");
    var clock=setInterval(function(){
        console.log(obj);
        $(obj).attr("disabled", "disabled");
        $("#from_btn").attr({"disabled":"disabled"});
        $(obj).text(mstime+"s后重新获取");
        mstime--;
        if(mstime<=1){
            $(obj).css("disabled",false);
            $(obj).css("cursor", "default");
            clearInterval(clock);
            $(obj).text("获取验证码");
        }
    },1000);
}


