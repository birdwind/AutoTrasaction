<!--

ProjectName: spring-boot_i

User: BirdW

Date: 4/8/2

Time: 1:08

-->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>ECR - EasyCryptoRecord</title>
    <link rel="icon" href="/images/ECR_logo.png">

    <%-- kendo --%>
    <link rel="stylesheet" href="/styles/kendo.common-material.min.css?2019.1.220"/>
    <link rel="stylesheet" href="/styles/kendo.material.min.css?2019.1.220"/>
    <link rel="stylesheet" href="/styles/kendo.material.mobile.min.css?2019.1.220"/>
    <%--    <!-- Bootstrap 3.3.7 -->--%>
    <%--    <link rel="stylesheet" href="${webapps.contextPath}/styles/bootstrap/bootstrap.min.css">--%>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="/plugin/fontawesome-free/css/all.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="${webapps.contextPath}/plugin/Ionicons/ionicons.min.css">
    <!-- jvectormap -->
    <%--    <link rel="stylesheet" href="${webapps.contextPath}/styles/jvectormap/jquery-jvectormap.css">--%>
    <!-- Theme style -->
    <link rel="stylesheet" href="${webapps.contextPath}/styles/adminlte/adminlte.min.css">
    <!-- iCheck -->
    <link rel="stylesheet" href="${webapps.contextPath}/plugin/iCheck/all.css">
    <%--SweetAlert--%>
    <link rel="stylesheet" href="${webapps.contextPath}/plugin/sweetalert2/dist/sweetalert2.css">
    <link rel="stylesheet" href="${webapps.contextPath}/plugin/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css">
    <%-- Loading --%>
    <link rel="stylesheet" href="${webapps.contextPath}/styles/loading.css">

    <!-- AdminLTE Skins. Choose a skin from the css/skins folder instead of downloading all of them to reduce the load. -->
    <%--    <link rel="stylesheet" href="${webapps.contextPath}/styles/skins/_all-skins.min.css">--%>
    <%--    <link rel="stylesheet" href="${webapps.contextPath}/styles/template/faultRepair.css">--%>
    <%--    <link rel="stylesheet" href="${webapps.contextPath}/styles/template/template.css">--%>

    <link rel="stylesheet" href="${webapps.contextPath}/styles/page.css">
    <link rel="stylesheet" href="${webapps.contextPath}/styles/gridTemplate.css">

    <!-- calender -->
    <link rel="stylesheet" href="/styles/bootstrap-datetimepicker.min.css?4.17.43">

    <link rel="stylesheet" href="/styles/windowUI.css"/>

    <%--Custom Kendo Grid--%>
    <link rel="stylesheet" href="${webapps.contentPath}/styles/kendo/custom/kendoGrid.css">

    <script>
        baseUrl = "${webapps.contextPath}";
        breadcrumbContent = "";
        sideMenu = <%= (String) request.getAttribute("sideMenu")%>;
        nickName = <%= (String) request.getAttribute("nickName")%>;
        investTotal = <%= (String) request.getAttribute("investTotal")%>;
        xssValue = <%= (String) request.getAttribute("xssValue")%>;
        vaa = <%= (String) request.getAttribute("vaa")%>;
    </script>
    <!-- jQuery 3 -->
    <script src="${webapps.contextPath}/scripts/jquery/jquery.min.js"></script>
    <script src="${webapps.contextPath}/scripts/jquery/jquery.cookie.js"></script>
    <script src="${webapps.contextPath}/scripts/jquery/jquery.loading.js"></script>
    <script src="${webapps.contextPath}/scripts/jquery/jquery.nicescroll.min.js"></script>
    <script src="${webapps.contextPath}/scripts/jquery/jquery.slimscroll.min.js"></script>
    <script src="${webapps.contextPath}/scripts/jquery/jquery.sparkline.min.js"></script>
    <script src="${webapps.contextPath}/scripts/jquery/jquery-jvectormap-1.2.2.min.js"></script>
    <script src="${webapps.contextPath}/scripts/jquery/jquery-jvectormap-world-mill-en.js"></script>
    <%--    <script src="${webapps.contextPath}/scripts/jquery/jquery-ui.js"></script>--%>

    <script src="/scripts/kendo.all.min.js?2019.1.220"></script>
    <script src="/scripts/kendo.culture.zh-TW.min.js?2019.1.220"></script>
    <!-- Bootstrap -->
    <script src="${webapps.contextPath}/plugin/bootstrap/js/bootstrap.min.js"></script>
    <!-- FastClick -->
    <script src="${webapps.contextPath}/plugin/fastclick/fastclick.js"></script>
    <!-- AdminLTE App -->
    <script src="${webapps.contextPath}/plugin/adminlte/adminlte.min.js"></script>
    <!-- iCheck -->
    <script src="${webapps.contextPath}/plugin/iCheck/icheck.min.js"></script>
    <!-- calender -->
    <script language="javascript" src="/scripts/moment.js"></script>
    <script language="javascript" src="/scripts/bootstrap-datetimepicker.min.js?4.17.43"></script>
    <%--SweetAlert--%>
    <script language="javascript" src="/plugin/sweetalert2/dist/sweetalert2.all.min.js"></script>

    <script src="${webapps.contextPath}/scripts/template.js"></script>
    <script src="${webapps.contextPath}/scripts/form.wizard.js"></script>
    <%--        <script src="${webapps.contextPath}/scripts/gridTemplate.js"></script>--%>
    <script src="${webapps.contextPath}/scripts/gridTemplate2.js"></script>

    <sitemesh:write property='head'/>
    <jsp:include page="i18n_info.jsp"/>
    <%--    <script type="text/javascript">--%>
    <%--    </script>--%>
</head>
<c:choose>
    <c:when test="${sideMenu == null}">
        <body class="login-page">
        <div id="custom-overlay" class="loading-hidden"
             style="position: fixed; z-index: 2; top: 0; left: 0; width: 100%; height: 100%; display: none;">
            <div class="loading-spinner">
            </div>
        </div>

        <sitemesh:write property="body"/>

        </body>
    </c:when>
    <c:otherwise>
        <body class="sidebar-mini layout-fixed">

        <div id="custom-overlay" class="loading-hidden"
             style="position: fixed; z-index: 2; top: 0; left: 0; width: 100%; height: 100%; display: none;">
            <div class="loading-spinner">
            </div>
        </div>

        <div class="wrapper">
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="pushmenu" href="#" role="button">
                            <i class="fas fa-bars"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a id="calenderBtn" class="nav-link">
                    <span id="time">
                    <span id="todayDate"></span>
                    <span>&nbsp</span>
                    <span id="currentTime"></span>
                    </span>
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" style="cursor:default;">目前入金:
                            <text id="investTotal">0</text>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" data-toggle="dropdown" href="#">
                            <i class="fas fa-th-large"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span class="dropdown-item dropdown-header">工具</span>
                            <div class="dropdown-divider"></div>
                            <a href="/logout" class="dropdown-item" id="signOut">
                                <i class="fas fa-sign-out-alt mr-2"></i> 登出
                            </a>
                            <div class="dropdown-divider"></div>
                        </div>
                    </li>

                </ul>
            </nav>

            <aside class="main-sidebar sidebar-dark-primary color-bg-black-353A40">
                <a href="/" class="brand-link">
                    <img src="/images/ECR_logo.png" alt="ECR Logo" class="brand-image img-circle elevation-3"
                         style="opacity: .8">
                    <span class="brand-text font-weight-light">ECR</span>
                </a>
                <div class="sidebar">
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                            <%--                <div class="image">--%>
                            <%--                    <img src="../dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"> --%>
                            <%--                </div>--%>
                        <div class="info">
                            <a href="#" class="d-block" id="userNickName">Admin</a>
                        </div>
                    </div>
                    <nav class="mt-2">
                        <ul id="sidemenu-treeview" class="nav nav-pills nav-sidebar flex-column" data-widget="treeview"
                            role="menu" data-accordion="false">
                        </ul>
                    </nav>
                </div>
            </aside>

            <div class="content-wrapper">
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6 header-title">
                                <h1></h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item">
                                        <a href="/">Home</a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div><!-- /.container-fluid -->
                </section>
                <section class="content">
                    <sitemesh:write property="body"/>
                </section>
            </div>

            <footer class="main-footer">
                <strong>Copyright © <a href="#">BirdWind</a>.</strong>
                All rights reserved.
                <div class="float-right d-none d-sm-inline-block">
                    <b>Version</b> 1.0.0
                </div>
            </footer>
        </div>

        </body>
        <script>
            $('body').loading({
                overlay: $("#custom-overlay"),
            });
        </script>
    </c:otherwise>
</c:choose>
</html>
