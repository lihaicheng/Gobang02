$(function () {
    getUserBar();
    $("#loginOut").click(function () {
        loginOut();
    });
});

//注销登录
function loginOut() {
    delCookie("username");
    delCookie("SID");
    console.log("注销用户");
    window.location.href = window.location.href;
}

//自动登录用户
function getUserBar() {
    $.ajax({
        type: "get",
        url: _settings.webUrl + _settings.url.ajaxGetUser,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.isLogin) { //登陆成功
                var user = data.user;
                $("#navbar-user").show();
                $("#navbar-user").find(".user-bar").text(user.username);
                $("#navbar-login").hide();
            } else {
                $("#navbar-user").hide();
                $("#navbar-login").show();
            }
        }
    });
}


function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}