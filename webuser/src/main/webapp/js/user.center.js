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
                alert("登录失败");
                window.location.href = _settings.webUrl + _settings.url.htmlLogin;
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