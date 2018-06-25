<%--
  Created by IntelliJ IDEA.
  User: chao
  Date: 2018/6/21
  Time: 18:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/login.js"></script>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" type="text/css">
</head>
<body>
<div class="modal show" id="user_Login" tabindex="-1" role="dialog" aria-labelledby="user_Msg_to" aria-hidden="true">
    <div class="modal-dialog" id="userLoginBox">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="user_Msg_to">登 录</h4>
            </div>
            <div class="modal-body">
                <div id="inputBox" class="text-center">
                    <p>登录后在云端保存你的歌单!</p>
                    <form id="form1">
                        <p>
                        <div id="div-email_address" class="input-group">
                            <span class="input-group-addon"><i class="icon-envelope"></i></span>
                            <input id="user_id" class="form-control" type="text" placeholder="邮箱地址">
                        </div>
                        </p>
                        <p>
                        <div id="div-password" class="input-group">
                            <span class="input-group-addon"><i class="icon-key"></i></span>
                            <input id="user_pass" class="form-control" type="password" placeholder="密码">
                        </div>
                        </p>
                        <a id="login_to" class="btn btn-block btn-success">
                            <i class="glyphicon glyphicon-log-in"></i> 登 录</a>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">
                    关 闭
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script>
    $(function () {
        loginStyle("user_id","user_pass","login_to");
    });
</script>
</body>
</html>
