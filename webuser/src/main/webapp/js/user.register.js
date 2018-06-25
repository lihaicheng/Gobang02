var regUsername = /^[a-zA-Z_][a-zA-Z0-9_]{4,19}$/;
var regPasswordSpecial = /[~!@#%&=;':",./<>_\}\]\-\$\(\)\*\+\.\[\?\\\^\{\|]/;
var regPasswordAlpha = /[a-zA-Z]/;
var regPasswordNum = /[0-9]/;
var password;
var check = [false, false, false, false];

//提交注册
function regAjax(from) {
    $.ajax({
        type: "post",
        url: _settings.webUrl + _settings.url.ajaxReg,
        data: from.serialize(),
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.isReg) {//注册成功

            } else {

            }
        }
    });
}

//校验成功函数
function success(Obj, counter) {
    Obj.parent().parent().removeClass('has-error').addClass('has-success');
    $('.tips').eq(counter).hide();
    $('.glyphicon-ok').eq(counter).show();
    $('.glyphicon-remove').eq(counter).hide();
    check[counter] = true;

}

// 校验失败函数
function fail(Obj, counter, msg) {
    Obj.parent().parent().removeClass('has-success').addClass('has-error');
    $('.glyphicon-remove').eq(counter).show();
    $('.glyphicon-ok').eq(counter).hide();
    $('.tips').eq(counter).text(msg).show();
    check[counter] = false;
}

// 用户名匹配
$('.container').find('#username').change(function () {
    if (regUsername.test($(this).val())) {
        success($(this), 0);
    } else if ($(this).val().length < 5) {
        fail($(this), 0, '用户名太短，不能少于5个字符');
    } else {
        fail($(this), 0, '用户名只能为英文数字和下划线,且不能以数字开头')
    }

});

// 密码匹配

// 匹配字母、数字、特殊字符至少两种的函数
function atLeastTwo(password) {
    var a = regPasswordSpecial.test(password) ? 1 : 0;
    var b = regPasswordAlpha.test(password) ? 1 : 0;
    var c = regPasswordNum.test(password) ? 1 : 0;
    return a + b + c;

}

$('.container').find('#password').change(function () {

    password = $(this).val();

    if ($(this).val().length < 6) {
        fail($(this), 1, '密码太短，不能少于6个字符');
    } else {
        if (atLeastTwo($(this).val()) < 2) {
            fail($(this), 1, '密码中至少包含字母、数字、特殊字符的两种')
        } else {
            success($(this), 1);
        }
    }
});


// 再次输入密码校验
$('.container').find('#passwordConfirm').change(function () {

    if ($(this).val() == password) {
        success($(this), 2);
    } else {

        fail($(this), 2, '两次输入的密码不一致');
    }

});

// 手机号码
var regPhoneNum = /^[0-9]{11}$/
$('.container').find('#phoneNum').change(function () {
    if (regPhoneNum.test($(this).val())) {
        success($(this), 3);
    } else {
        fail($(this), 3, '手机号码只能为11位数字');
    }
});

$('#submit').click(function (e) {
    e.preventDefault();
    if (!check.every(function (value) {
        if (value == true) {
            regAjax($(_settings.regFrom));
        }
    })) {
        for (key in check) {
            if (!check[key]) {
                $('.container').find('input').eq(key).parent().parent().removeClass('has-success').addClass('has-error')
            }
        }
    }
});
//全局Ajax错误处理
$(document).ajaxError(function (event, xhr, options, exc) {
    /*错误信息处理*/
    /*弹出jqXHR对象的信息*/
    console.log(xhr.status);
    console.log(xhr.readyState);
    console.log(xhr.statusText);
    console.log(exc);

});