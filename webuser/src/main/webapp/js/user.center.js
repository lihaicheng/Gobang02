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
                var time=moment(user.regTime).format('YYYY-MM-DD HH:mm:ss');;
                user_div.find("#reg_time").text(time);
            } else {
                showMyModal("提示！", "您未登录，无法进行此操作，请先登录。", function () {
                    window.location.href = _settings.webUrl + _settings.url.htmlLogin;
                });
            }
        }
    });
}
