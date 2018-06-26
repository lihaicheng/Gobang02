function getUser(user_div) {
    $.ajax({
        type: "get",
        url: _settings.webUrl + _settings.url.ajaxGetUser,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.isLogin) {//登陆成功
                var user = data.user;
                user_div.find("#username").val(user.username);
                user_div.find("#phoneNum").val(user.phone)
                user_div.find("#email").text(user.email);
                user_div.find("#sign").text(user.sign);
            } else {
                $('#myModal').find("#title").text("提示！");
                $('#myModal').find("#content").text("自动登录失败，请先登录。");
                $('#myModal').on('hide.bs.modal', function () {
                    window.location.href = _settings.webUrl + _settings.url.htmlLogin;
                });
                $('#myModal').modal('show');
            }
        }
    });
}

function showUser(user_div) {
    getUser($(user_div));
    $(user_div).find("#submit").click(function (e) {
        console.log("开始提交数据：" + _settings.webUrl + _settings.url.ajaxSaveUser)
        e.preventDefault();
        saveUser($(user_div));
    });
}

function saveUser(user_div) {
    $.ajax({
        type: "post",
        url: _settings.webUrl + _settings.url.ajaxSaveUser,
        dataType: "json",
        data: user_div.serialize(),
        success: function (data) {
            console.log(data);
            if (data.isSave) {//保存成功
                alertBox(user_div, "保存成功", "success");
            } else {
                alertBox(user_div, "服务拒绝保存", "warning");
            }
        }
    });
}

/* 提示框 */
function alertBox(parent, tip, color) {
    var box = document.createElement("div");
    box.setAttribute("id", "warningTip");
    box.setAttribute("class", "alert alert-" + color + " alert-dismissible");
    box.setAttribute("role", "alert");
    box.innerHTML = "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><spanaria-hidden='true'>&times;</span></button>" + tip;

    $("#warningTip").remove();
    parent.children(':first').before(box);
}

//自动登录用户
function getUserBar() {
    $.ajax({
        type: "get",
        url: _settings.webUrl + _settings.url.ajaxGetUser,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.isLogin) {//登陆成功
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

$(function () {
    getUserBar();
    loadMyModel();
    $("#loginOut").click(function () {
        delCookie("username");
        delCookie("SID");
        console.log("注销用户");
        window.location.href = window.location.href;
    });

});

function loadMyModel() {
    $.ajax({
        type: "get",
        url: "myModal.html",
        dataType: "text",
        success: function (data) {
            $("#myModel-div").html(data);
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

//全局Ajax错误处理
$(document).ajaxError(function (event, xhr, options, exc) {
    /*错误信息处理*/
    /*弹出jqXHR对象的信息*/
    console.log(xhr.status);
    console.log(xhr.readyState);
    console.log(xhr.statusText);
    console.log(exc);

});