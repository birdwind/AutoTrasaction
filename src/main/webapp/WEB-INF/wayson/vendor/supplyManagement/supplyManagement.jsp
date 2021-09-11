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
  <script src="${webapps.contextPath}/scripts/vendor/supplyChainMangement.js"></script>
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
                  <li data-section="parentGrid" class="active">
                    <a href="javascript:void(0)">主分類</a>
                  </li>
                  <li data-section="childGrid">
                    <a href="javascript:void(0)">子分類</a>
                  </li>
                </ol>
              </div><!-- col-->
            </div><!-- row-->
          </section><!-- content-->

          <div id="parentGrid"></div>
          <div id="childGrid" style="display: none"></div>
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
    <a href="javascript:void(0)" id="addRow" class="btn addbtn"><i class="fa fa-plus"></i></a>
  </div>
</div>
</div><!--toolbar-->

<script id="errorTemplate" type="text/x-kendo-template">
  <span class="errorMsg color_pink"></span>
</script>

<script id="addRowColumn" type="text/x-kendo-template">

  <a href="javascript:void(0)" id="save" class="table_btn table_btn_green"><i class="fa fa-floppy-o"></i></a>

  <a href="javascript:void(0)" id="cancel" class="table_btn table_btn_pink"><i class="fa fa-ban"></i></a>
</script>

<script id="addSupplyChainCode" type="text/x-kendo-template">
  <span>#=data#</span>
  <input type="text" class="k-input" name="chainCode" data-bind="value:chainCode" style="text-align: center;">
  <br>
  <span class="errorMsg color_pink"></span>
</script>
</body>
</html>
