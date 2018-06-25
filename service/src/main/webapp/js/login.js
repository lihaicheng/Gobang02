/* 修改input样式 */
function loginStyle(idInput, passInput, loginBtn) {
    var classes = "", oldClasses = "";
    var userId = document.getElementById(idInput);
    var userPass = document.getElementById(passInput);
    var login = document.getElementById(loginBtn);
    login.addEventListener("click", function (event) {
        if (userId.value != "" && userPass.value != "") {
            oldClasses = this.getAttribute("class");
            classes = oldClasses + " disabled";
            this.setAttribute("class", classes);
            this.innerHTML = "<i class='icon-refresh icon-spin'></i> 正在登陆...";

            var idU = userId.value;
            var passU = userPass.value;

            event.preventDefault();
            ajaxLogin(idU, passU, oldClasses);

        } else {
            if (userId.value == "") {
                classes = userId.parentNode.getAttribute("class");
                userId.parentNode.setAttribute("class", classes + " has-error");
            }
            if (userPass.value == "") {
                classes = userPass.parentNode.getAttribute("class");
                userPass.parentNode.setAttribute("class", classes + " has-error");
            }
        }
    }, false);
    var focus = function () {
        this.parentNode.setAttribute("class", "input-group");
    };
    userId.addEventListener("focus", focus, false);
    userPass.addEventListener("focus", focus, false);
}

/* Ajax登录 */
function ajaxLogin(id, pass, classes) {
    var xmlhttp;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "pages/loginByNav.php?user_id=" + id + "&user_pass=" + pass, false);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText != 0) {
                var textArray = xmlhttp.responseText.split("|");
                document.getElementById("inputBox").innerHTML = "<h3>欢迎回来，" + textArray[1] + "</h3><img class='img-responsive img-circle' src='" + textArray[2] + "'>";
                document.getElementById("user_name_nav").innerHTML = " " + textArray[1] + "，欢迎你！";
                document.getElementById("user_img_nav").setAttribute("src", textArray[2]);
                document.getElementById("user_info_nav").style.visibility = "";
                document.getElementById("loginAndReg").style.visibility = "hidden";
                document.getElementById("loginAndReg1").style.visibility = "hidden";
            } else {
                var login = document.getElementById("login_to");
                login.setAttribute("class", classes);
                login.innerHTML = "<i class='glyphicon glyphicon-log-in'></i> 登 录";
                //removeElem("warningTip");
                var tips = "账号或密码错误！";
                var form = document.getElementById("form1");
                form.insertBefore(alertBox(tips, "warning"), form.childNodes[0]);
            }
        }else {
            var login = document.getElementById("login_to");
            login.setAttribute("class", classes);
            login.innerHTML = "<i class='glyphicon glyphicon-log-in'></i> 登 录";
           // removeElem("warningTip");
            var tips = "登录失败，请检查网络！";
            var form = document.getElementById("form1");
            form.insertBefore(alertBox(tips, "warning"), form.childNodes[0]);
        }
    };
    xmlhttp.send();
}

/* 新建提示框innerHTML */
function alertBox(tip, color) {
    var box = document.createElement("div");
    box.setAttribute("id", "warningTip");
    box.setAttribute("class", "alert alert-" + color + " alert-dismissible");
    box.setAttribute("role", "alert");
    box.innerHTML = "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><spanaria-hidden='true'>&times;</span></button>" + tip;
    return box;
}