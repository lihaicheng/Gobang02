function fromVar(from) {
    $(from).validate({
        rules: {
            username: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            username: "请输入用户名",
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 5 个字母"
            }
        }
    });
}