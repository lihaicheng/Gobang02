var classes = "", oldClasses = "";


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

function loginFrom(from, submit) {
    $(submit).click(function () {
        event.preventDefault();
        submit_disenable(this);
        ajaxLogin($(from), $(submit));
    });
}

function ajaxLogin(from, submit) {
    $.ajax({
        type: "post",
        url: _settings.webUrl + _settings.url.ajaxLogin,
        data: from.serialize(),
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.isLogin) {//登陆成功
                showLogin_success(from);
                setCookie("username", data.user.username);
                setCookie("SID", data.SID);
                window.location.href = _settings.webUrl + _settings.url.htmlUserCenter;
            } else {
                showLogin_error(from);
            }
        },
        error: function (data) {
            showNet_error(from);
        },
        complete: function () {
            // Handle the complete event
            submit_enable(submit);
        }
    });
}

function submit_disenable(submit) {
    oldClasses = submit.getAttribute("class");
    classes = oldClasses + " disabled";
    submit.setAttribute("class", classes);
    submit.innerHTML = "<i class='icon-refresh icon-spin'></i> 正在登陆...";
}

function submit_enable(submit) {
    //  submit.setAttribute("class", oldClasses);
    submit.removeClass("disabled");
    submit.html("登录");
}

function showNet_error(parent) {
    var tips = "登录失败，请检查网络！";
    alertBox(parent, tips, "warning")
}

function showLogin_error(parent) {
    var tips = "密码错误，请重新输入！";
    alertBox(parent, tips, "warning")
}

function showLogin_success(parent) {
    var tips = "登录成功，欢迎回来！";
    alertBox(parent, tips, "success")
}

//JS操作cookies方法!

//写cookies
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() + ";path=/";
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


function autoLogin() {
    $.ajax({
        type: "post",
        url: _settings.webUrl + _settings.url.ajaxGetUser,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.isLogin) {//登陆成功
                document.title = document.title + " - " + data.user.username;
                window.location.href = _settings.webUrl + _settings.url.htmlUserCenter;
            } else {
                window.location.href = _settings.webUrl + _settings.url.htmlLogin;
            }
        }
    });
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