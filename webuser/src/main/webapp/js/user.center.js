$(function () {
    getUser_center($("#user-table"));
});

function getUser_center(user_div) {
    $.ajax({
        type: "get",
        url: _settings.webUrl + _settings.url.ajaxGetUser,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.isLogin) { //登陆成功
                var user = data.user;
                user_div.find("#username").text(user.username);
                user_div.find("#phoneNum").text(user.phone)
                user_div.find("#email").text(user.email);
                user_div.find("#sign").text(user.sign);
                user_div.find("#reg_time").text(user.reg_time);
            } else {
                showMyModal("提示！", "自动登录失败，请先登录。", function () {
                    window.location.href = _settings.webUrl + _settings.url.htmlLogin;
                });
            }
        }
    });
}