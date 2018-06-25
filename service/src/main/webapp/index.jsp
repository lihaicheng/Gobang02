<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<html>
<head>
    <title>Bootstrap+jsp开发案例</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/login.js"></script>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" type="text/css">
</head>
<body>
<div class="container">
    <form id="loginForm" action="webuser/login.action" method="post" class="form-horizontal">
        <fieldset>
            <legend>
                <label><span class="glyphicon glyphicon-user"></span>&nbsp;用户登录</label>
            </legend>

            <div class="form-group" id="midDiv">
                <label class="col-md-3 control-label" for="midDiv">用户名：</label>
                <div class="col-md-5">
                    <input type="text" id="account" name="account" class="form-control" placeholder="请输入登录名">
                </div>
                <div class="col-md-4" id="midSpan"></div>
            </div>

            <div class="form-group" id="passDiv">
                <label class="col-md-3 control-label" for="passDiv">密码：</label>
                <div class="col-md-5">
                    <input type="password" id="password" name="password" class="form-control" placeholder="请输入密码">
                </div>
                <div class="col-md-4" id="passSpan"></div>
            </div>

            <div class="form-group" id="butDiv">
                <div class="col-md-5 col-md-offset-3">
                    <button type="submit" id="subBtn" class="btn btn-xs btn-primary">提交</button>
                    <button type="reset" id="rstBtn" class="btn btn-xs btn-warning">重置</button>
                </div>
            </div>
        </fieldset>
    </form>
</div>
</body>
</html>
