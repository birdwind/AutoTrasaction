<!--

ProjectName: spring-boot_i

User: BirdW

Date: 4/8/2

Time: 5:34

-->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<html>
<head>
    <title>登入</title>
    <script src="${webapps.contextPath}/scripts/modules/module/login/login.js"></script>
</head>
<body>
<div class="login-box">
    <div class="login-logo">
        <img class="mb-4" src="/images/ECR_logo.png" alt="" width="72" height="72">
        <h1 class="h2 mb-3 color_lightblue">EasyCryptoRecord</h1>
        <h1 class="h2 mb-3 font-weight-normal" style="font-size: 20px;">簡易虛擬幣記帳</h1>
    </div>
    <form>
        <div class="card-body login-card-body">
            <p class="login-box-msg"></p>
            <div class="form-group">
                <label for="username">帳號</label>
                <input type="text" class="form-control" id="username" name="username" placeholder="請輸入帳號" required="" autofocus="">
                <span class="errorMsg color_pink"></span>
            </div>
            <div class="form-group">
                <label for="password">密碼</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="請輸入密碼">
                <span class="errorMsg color_pink"></span>
            </div>
            <div class="row">
                <div class="col-12">
                    <button type="submit" class="btn btn-primary btn-block">登入</button>
                </div>
                <!-- /.col -->
            </div>
        </div>
    </form>
</div>
</body>
</html>
