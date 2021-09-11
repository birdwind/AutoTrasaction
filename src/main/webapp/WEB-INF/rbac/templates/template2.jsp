<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>

<head>
  <c:set var="currentVersion" value="0.0.1"/>
  <title>
    LMS System
    <%-- <sitemesh:write property='title'/> --%>
  </title>
  <link rel="icon" href="/images/favicon.png">
  <!----------------------------------------------------  styles --------------------------------------------------------------->
  <!-- Font  -->
  <%-- <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC|Roboto+Slab" rel="stylesheet"> --%>
  <link rel="stylesheet" href="/styles/kendo.common-material.min.css?2019.1.220"/>
  <link rel="stylesheet" href="/styles/kendo.material.min.css?2019.1.220"/>
  <link rel="stylesheet" href="/styles/kendo.material.mobile.min.css?2019.1.220"/>
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="${webapps.contextPath}/styles/bootstrap/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="/styles/fa-css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="${webapps.contextPath}/styles/Ionicons/ionicons.min.css">
  <!-- jvectormap -->
  <link rel="stylesheet" href="${webapps.contextPath}/styles/jvectormap/jquery-jvectormap.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="${webapps.contextPath}/styles/template/AdminLTE.min.css">
  <link rel="stylesheet" href="${webapps.contextPath}/styles/iCheck/all.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="${webapps.contextPath}/styles/skins/_all-skins.min.css">
  <link rel="stylesheet" href="${webapps.contextPath}/styles/template/faultRepair.css">
  <link rel="stylesheet" href="${webapps.contextPath}/styles/template/template.css">
  <!-- color -->
  <link rel="stylesheet" href="${webapps.contextPath}/styles/yarn&foundry.css">
  <link rel="stylesheet" href="${webapps.contextPath}/styles/page.css">
  <link rel="stylesheet" href="${webapps.contextPath}/styles/gridTemplate.css">

  <!-- calender -->
  <link rel="stylesheet" href="/styles/bootstrap-datetimepicker.min.css?4.17.43">

  <link rel="stylesheet" href="/styles/windowUI.css"/>

  <style>
    .navbar-nav > .notifications-menu > .dropdown-menu,
    .navbar-nav > .messages-menu > .dropdown-menu,
    .navbar-nav > .tasks-menu > .dropdown-menu {
      width: 400px !important;
      padding: 0 0 0 0;
      margin: 0;
      top: 100%;
    }
  </style>
  <!----------------------------------------------------  scripts --------------------------------------------------------------->
  <script>
    baseUrl = "${webapps.contextPath}";
  </script>
  <!-- jQuery 3 -->
  <script src="${webapps.contextPath}/scripts/jquery/jquery.min.js"></script>
  <script src="${webapps.contextPath}/scripts/jquery/jquery.cookie.js"></script>
  <script src="${webapps.contextPath}/scripts/jquery/jquery.nicescroll.min.js"></script>
  <script src="${webapps.contextPath}/scripts/jquery/jquery.slimscroll.min.js"></script>
  <script src="${webapps.contextPath}/scripts/jquery/jquery.sparkline.min.js"></script>
  <script src="${webapps.contextPath}/scripts/jquery/jquery-jvectormap-1.2.2.min.js"></script>
  <script src="${webapps.contextPath}/scripts/jquery/jquery-jvectormap-world-mill-en.js"></script>
  <script src="${webapps.contextPath}/scripts/jquery/jquery-ui.js"></script>

  <script src="/scripts/kendo.all.min.js?2019.1.220"></script>
  <script src="/scripts/kendo.culture.zh-TW.min.js?2019.1.220"></script>
  <!-- Bootstrap 3.3.7 -->
  <script src="${webapps.contextPath}/scripts/bootstrap/bootstrap.min.js"></script>
  <!-- FastClick -->
  <script src="${webapps.contextPath}/scripts/fastclick/fastclick.js"></script>
  <!-- AdminLTE App -->
  <script src="${webapps.contextPath}/scripts/template/dist/js/adminlte.min.js"></script>
  <!-- icheck -->
  <script src="${webapps.contextPath}/scripts/iCheck/icheck.min.js"></script>
  <!-- calender -->
  <script language="javascript" src="/scripts/moment.js"></script>
  <script language="javascript" src="/scripts/bootstrap-datetimepicker.min.js?4.17.43"></script>
  <script src="${webapps.contextPath}/scripts/modules/functionTree.js"></script>
  <script src="${webapps.contextPath}/scripts/template.js"></script>
  <script src="${webapps.contextPath}/scripts/form.wizard.js"></script>
  <script src="${webapps.contextPath}/scripts/gridTemplate.js"></script>
  <script src="${webapps.contextPath}/scripts/gridTemplate2.js"></script>
  <sitemesh:write property='head'/>
  <jsp:include page="i18n_info.jsp"/>
  <script type="text/javascript">
    breadcrumbContent = "";
    sideMenu = <%= (String) request.getAttribute("sideMenu")%>;
    xssValue = <%= (String) request.getAttribute("xssValue")%>;
    vaa = <%= (String) request.getAttribute("vaa")%>;

    notifications = <%= request.getAttribute("notification") %>;
  </script>
</head>
<body class="hold-transition skin-green-light sidebar-mini">
<div class="wrapper">
  <header class="main-header">
    <!-- Logo -->
    <a href="/" class="logo">
      <!-- logo for regular state and mobile devices -->
      <img src="/images/logo.png" class="logo-img">
    </a>

    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="javascript:void(0)" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <a id="calenderBtn">
        <span id="time">
          <span id="todayDate"></span>
          <span>&nbsp</span>
          <span id="currentTime"></span>
        </span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown tasks-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell"></i>
              <span id="notification-counter-label" class="label label-danger" style="display: none;">0</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">您有 <span id="notification-counter">0</span> 個未讀通知</li>
              <li>
                <ul id="notification-menu" class="menu">
                </ul>
              </li>
              <li class="footer">
                <a id="notification-check-all" style="cursor: pointer;">查看所有通知</a>
              </li>
            </ul>
          </li>
          <li>
            <a id="identityBtn" href="javascript:void(0)">SNBDC_SYSTEM</a>
          </li>
          <li>
            <a href="${webapps.contextPath}/logout"><i class="fa fa-sign-out"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</div>
<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
  <!-- sidebar: style can be found in sidebar.less -->
  <section class="sidebar">
    <!-- Sidebar user panel -->
    <div class="user-panel">
      <div class="pull-left image">
        <img src="${webapps.contextPath}/images/sideMenu/worker.png" class="img-circle" alt="User Image">
      </div>
      <div class="pull-left info">
        <p id="leftPanel">SNBDC_SYSTEM</p>
        <a href="javascript:void(0)"><i class="fa fa-circle text-success"></i> Online</a>
      </div>
    </div>
    <ul id="sidemenu-treeview" class="sidebar-menu" data-widget="tree">
    </ul>
  </section>
  <!-- /.sidebar -->
</aside>
<span id="calender"></span>
<sitemesh:write property="body"/>
<script type="text/x-kendo-template" id="notification-template">
  <li>
    <a href="/page/notification/#= notificationUuid #">
      <h3 class="notification-title">
        #if(!isRead) {# <i class="fa fa-exclamation-circle" style="color: red;"></i> #}#
        #= title #
        <small class="pull-right">#= time #</small>
      </h3>
    </a>
  </li>
</script>
<div id="notification-window">
  <div class="container" style="width:auto">
  </div><!--container-->
</div>
</body>
</html>
