$(function () {
    var user_div = $("#user-info");
    getUser_alter(user_div);

    user_div.find("#submit").click(function (e) {
        console.log("开始提交数据：" + _settings.webUrl + _settings.url.ajaxSaveUser)
        e.preventDefault();
        saveUser(user_div);
    });

    alertBox("#user-info", "修改信息请输入原密码！<br/>留空则不修改原信息。","success");
});

function getUser_alter(user_div) {
    $.ajax({
        type: "get",
        url: _settings.webUrl + _settings.url.ajaxGetUser,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.isLogin) { //登陆成功
                var user = data.user;
                user_div.find("#username").val(user.username);
                user_div.find("#phoneNum").val(user.phone)
                user_div.find("#email").val(user.email);
                user_div.find("#sign").val(user.sign);
            } else {
                showMyModal("提示！", "自动登录失败，请先登录。", function () {
                    window.location.href = _settings.webUrl + _settings.url.htmlLogin;
                });
            }
        }
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
            if (data.isSave) { //保存成功
                alertBox(user_div, "保存成功", "success");
            } else {
                alertBox(user_div, "服务拒绝保存!<br/>修改信息请输入原密码！", "warning");
            }
        }
    });
}