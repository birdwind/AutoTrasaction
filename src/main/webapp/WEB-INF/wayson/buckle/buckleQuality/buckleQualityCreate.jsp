<%--
  Created by IntelliJ IDEA.
  User: birdwind
  Date: 2019/11/19
  Time: 1:13 下午
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <link rel="stylesheet" href="/styles/windowUI.css" />
  <style>
    .k-grid-content {
      position: initial !important;
    }

  </style>
  <script>
    uuid = "${uuid}";

  </script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <script src="${webapps.contextPath}/scripts/buckleManagement/buckleQualityCreate.js"></script>

</head>

<body class="hold-transition skin-green-light sidebar-mini">
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box-body no-padding">
            <%--階層目錄--%>
            <section class="content-header">
              <input type="text" id="chatlink" style="display:none;">
              <ol id="breadcrumb" class="breadcrumb">
                <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"></li>
              </ol>
            </section>
            <%--階層目錄--%>
            <section class="content">
              <div class="row">
                <div class="col-md-12">
                  <%--懸浮按鈕--%>
                  <div class="box_features">
                    <i class="fa fa-angle-double-left left" style="display:none; margin-right: 20px;"></i>
                    <button type="button" onclick="window.history.back()" class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white">
                      <i class='fa fa-plus'></i>
                    </button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div>
                  <%--懸浮按鈕--%>
                  <div class="box box-success" style="padding-bottom:40px">
                    <br>
                    <div id="form" class="box-body"></div>
                    <!--#form-->
                  </div>
                  <!--box-->
                </div>
                <!--col-->
              </div>
              <!--row-->
            </section>
            <!--content-->
            <%-- When using Checkbox selection of kendo grid,
                     "div" is the only tag that triggers default effects well.  --%>
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->


  <script type="text/x-kendo-template" id="subForm">
    <div class="box-body">
    <div class="row">
      <div class="col-md-12">
        <div class="boxline mt--s">
          <div class="table-responsive">
            <div class="table_bar">
              <div class="col-sm-4 col-xs-6 table_bar_box">
                <a href="#" class="btn addbtn"><i class="fa fa-plus"></i></a>
              </div>
            </div>
            <table id="table" class="table bg_white table-striped table-bordered table-hover">
              <thead class="thead-light"></thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>

</body>

</html>
