<%--
  Created by IntelliJ IDEA.
  User: birdwind
  Date: 2019/11/19
  Time: 11:57 上午
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="/styles/windowUI.css"/>
  <style>
    .k-grid-content {
      position: initial !important;
    }
  </style>
  <script src="${webapps.contextPath}/scripts/vendor/company/companyGrid.js"></script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>

</head>
<body class="hold-transition skin-green-light sidebar-mini">
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box-body no-padding">
          <section class="content-header">
            <%--            <input type="text" id="chatlink" style="display:none;">--%>
            <ol id="breadcrumb" class="breadcrumb">
              <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
              <li><a href="javascript:void(0)"></a></li>
              <li class="active"></li>
            </ol>
          </section>

          <section class="content tabMenu">
            <div class="row">
              <div class="col-md-12">
                <ol class="monitormenu">
                  <li data-section="grid" class="active">
                    <a href="javascript:void(0)">全部</a>
                  </li>
                  <li data-section="usuallyGrid">
                    <a href="javascript:void(0)">常用</a>
                  </li>
                </ol>
              </div><!-- col-->
            </div><!-- row-->
          </section><!-- content-->

          <div id="grid"></div>
          <div id="usuallyGrid" style="display: none"></div>
          <%-- When using Checkbox selection of kendo grid,
                     "div" is the only tag that triggers default effects well.  --%>
        </div>
        <!-- box-body-->
      </div>
      <!-- col-->
    </div>
    <!-- row-->
  </section>
  <!-- content-->
</div>
<!-- content-wrapper-->

<div id="toolbar" style="display:none;">
  <div class="col-sm-4 col-xs-6 table_bar_box">
    <a href="/page/vendor/management/form" id="addRow" class="btn addbtn"><i class="fa fa-plus"></i></a>
    <a href="javascript:void(0)" id="addUsually" class="btn addusually" style="display: none"><i class="fa fa-star-o"></i></a>
    <a href="javascript:void(0)" id="deleteUsually" class="btn deleteusually" style="display: none"><i class="fa fa-trash"></i></a>
  </div>
</div>
</div><!--toolbar-->
</body>
</html>
