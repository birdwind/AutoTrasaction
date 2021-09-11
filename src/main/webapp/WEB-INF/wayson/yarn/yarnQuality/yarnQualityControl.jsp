<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<script src="${webapps.contextPath}/scripts/yarn/yarnQualityGrid.js"></script>
<link rel="stylesheet" href="/styles/windowUI.css"/>
<style>
.k-confirm .k-window-titlebar::before {
  content: '提示';
}
.k-confirm .k-window-titlebar .k-dialog-title {
  display:none;
}
</style>
</head>
<body class="hold-transition skin-green-light sidebar-mini">
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box-body no-padding">
            <section class="content-header">
              <ol id="breadcrumb" class="breadcrumb">
                <li><a href="/"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"><a href="/page/yarn/quality/control"></a></li>
              </ol>
            </section>
            <div id="quality">
            </div><%-- When using Checkbox selection of kendo grid,
            "div" is the only tag that triggers default effects well.--%>
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
      <div class="col-sm-4 col-xs-6 table_bar_box">
        <a href="/page/yarn/quality/control/form" class="btn"><i class="fa fa-plus"></i></a>
        <button href="javascript:void(0)" id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></button>
      </div>
      <div class="col-sm-6 col-xs-6">
        <div class="input-group stylish-input-group search">
          <input type="text" class="form-control" placeholder="關鍵字搜尋" >
          <nav class="clear">&times;</nav>
          <span class="input-group-addon">
            <span class="glyphicon glyphicon-search"></span>
          </span>
        </div>
      </div>
  </div><!--toolbar-->
<section id="confirmTemplate" style="display:none;">
  <section class="deleteIcon">
    <i class="fa fa-file-text-o">
      <i class="fa fa-times" ></i>
    </i>
    <div>
    <i class="fa fa-trash" ></i>
    </div>
  </section>
  <h2>確定刪除？</h2>
</section>
</body>
</html>
