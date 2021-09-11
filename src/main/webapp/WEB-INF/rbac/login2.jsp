<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<html>

<head>
  <style>
    .loginNotification {
      position: absolute;
      left: 38%;
      top: 50%;
      width: 400px;
      height: 200px;
      color: white;
      text-align: center;
      font-size: 40px;
      background: #3498db;
      border-radius: 20px;
      line-height: 2.5;
    }

    .loadingIcon {
      display: none
    } 
    .lds-ellipsis {
      display: inline-block;
      position: absolute;
      left: 60%;
      top: 30%;
      width: 80px;
      height: 80px;
    }

    .lds-ellipsis div {
      position: absolute;
      left: 60%;
      top: 30%;
      top: 33px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #fff;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .lds-ellipsis div:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.6s infinite;
    }

    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0);
      }

      100% {
        transform: scale(1);
      }
    }

    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(1);
      }

      100% {
        transform: scale(0);
      }
    }

    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }

      100% {
        transform: translate(24px, 0);
      }
    }

    .loadingMessage {
      color: white;
      position: absolute;
      left: 50%;
      top: 65%;
      z-index: 1;
      margin: -75px 0 0 -75px;
    }

    /* Safari */
    @-webkit-keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(360deg);
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

  </style>
  <title>登入</title>
<%--  <link rel="stylesheet" href="/styles/modules/login.css" />--%>
<%--  <script src="${webapps.contextPath}/scripts/modules/login.js?${currentVersion}"></script>--%>
  <script src="${webapps.contextPath}/scripts/modules/module/login/login.js"></script>
</head>

<body class="hold-transition skin-green-light sidebar-mini">
  <div class="content-wrapper">
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <section class="form-signin">
            <div class="text-center mb-4">
              <img class="mb-4" src="/images/logo_lms.jpg" alt="" width="72" height="72">
              <h1 class="h2 mb-3 font-weight-normal color_lightblue">精實生產執行系統</h1>
            </div>

            <div class="form-label-group">
              <input id="username" type="text" class="form-control" placeholder="Email address" required=""
                autofocus="">
              <label class="bg_loginid">帳號</label>
              <span class="errorMsg color_pink"></span>
            </div>

            <div class="form-label-group">
              <input id="password" type="password" class="form-control" placeholder="Password">
              <label class="bg_loginipw">密碼</label>
              <span class="errorMsg color_pink"></span>
            </div>

            <div class="col-md-12 text-center mt--b mb--b">
              <button id="clear" type="button" class="padbigbtn btn btn-dark btn-lg white">清除</button>
              <button id="submit" type="button" class="padbigbtn btn btn-success btn-lg white">登入</button>
            </div>
            <div id="window">

            </div>

          </section><!-- col-->
          <!-- input nothing and press enter, present your the power of administrator-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div class="loadingIcon">

  </div>
</body>

</html>
