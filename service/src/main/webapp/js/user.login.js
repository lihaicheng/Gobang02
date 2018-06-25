var webUrl = "http://localhost:8080/gobang03/"
var classes = "", oldClasses = "";

/* 提示框 */
function alertBox(parent, tip, color) {
    var box = document.createElement("div");
    box.setAttribute("id", "warningTip");
    box.setAttribute("class", "alert alert-" + color + " alert-dismissible");
    box.setAttribute("role", "alert");
    box.innerHTML = "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><spanaria-hidden='true'>&times;</span></button>" + tip;

    $("#warningTip").remove();
    $(parent).children(':first').before(box);
}

function submitLogin(from, submit) {
    $(submit).click(function () {
        event.preventDefault();
        ajaxLogin(from);

        oldClasses = this.getAttribute("class");
        classes = oldClasses + " disabled";
        this.setAttribute("class", classes);
        this.innerHTML = "<i class='icon-refresh icon-spin'></i> 正在登陆...";

    });
}

function ajaxLogin(from, submit) {
    $.ajax({
        type: "post",
        url: webUrl + "webuser/login.action",
        data: $(from).serialize(),
        dataType: "text",
        success: function (data) {
            console.log(data);

            if (data.indexOf("uid") > 0) {//json数据中有uid，则表示登陆成功
                showLogin_success(from);
            } else {
                showLogin_error(from);
            }
        },
        error: function (data) {
            showNet_error(from);
        }
    });
}

function submit_enable(submit) {
    oldClasses = this.getAttribute("class");
    classes = oldClasses + " disabled";
    this.setAttribute("class", classes);
    this.innerHTML = "<i class='icon-refresh icon-spin'></i> 正在登陆...";
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