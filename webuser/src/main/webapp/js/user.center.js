function getUser(user_div) {
    $.ajax({
        type: "get",
        url: _settings.webUrl + _settings.url.ajaxGetUser,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.isLogin) {//登陆成功
                var user = data.user;
                user_div.text(user.username);
            } else {
                alert("登录失败");
                window.location.href = _settings.webUrl + _settings.url.htmlLogin;
            }
        }
    });
}

function showUser(userId) {
    var user = getUser($(userId));
}