<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<link rel="stylesheet" href="/styles/windowUI.css"/>
<script src="${webapps.contextPath}/scripts/yarn/yarnInventoryGrid.js"></script>
<style>
.k-grid-content{
  position:initial!important;
}
.k-grid {
  border-top: 0px solid transparent;
}
.table_bar_box .btn.export {
    margin-left: 50px;
}
.table_bar_box .btn.trashBin{
    margin-left: 30px;
}
#exportTemplate{
  margin:10px;
  padding-top:30px; 
}
#exportTemplate .row > div{
  padding:0px;
  text-align:center;
}
#exportTemplate .title,
#exportTemplate .form-control{
  width:100%;
}
#exportTemplate .title{
  display:block;
  font-size:20px;
}
#exportTemplate .row >.confirmInfo{ 
  text-align:left; 
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
            <input type="text" id="chatlink" style="display:none;" >
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
                    <li data-section="inventTotal" class="active">
                      <a href="javascript:void(0)">盤點總表</a>
                    </li>
                    <li data-section="inventory">
                      <a href="javascript:void(0)">盤點單</a>
                    </li>
                  </ol>
                </div><!-- col-->
                </div><!-- row-->
            </section><!-- content-->
            <div id="inventTotal">
            </div>
            <div id="inventory" style="display:none;">
            </div> <%-- When using Checkbox selection of kendo grid, 
            "div" is the only tag that triggers default effects well.  --%>
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
      <div class="col-sm-4 col-xs-6 table_bar_box">
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
<div id="exportTemplate">
      <div class="container" style="width:auto">
        <div class="row">
          <div class="col-sm-12 confirmInfo">
            <div class="col-md-12 box_inputdata">
              <fieldset>
                <div class="form-group">
                  <nav class="title">
                    盤點表名稱<span class="color_pink">*</span>
                  </nav>
                  <input type="text" name="inventoryName" class="form-control" >
                  <span class="errorMsg color_pink"></span>
                </div>
              </fieldset>
            </div>
          </div><!--col-->
        </div><!--row-->
        <div class="row">
          <div class="col-sm-6 confirmBtn">
            <button type="button" class="btn btn-success circleBtn white" >
              <i class="fa fa-floppy-o"></i>
            </button>
          </div><!--col-->
          <div class="col-sm-6 cancelBtn">
            <button type="button" class="btn backBtn circleBtn white" >
              <i class="fa fa-times"></i>
            </button>
          </div><!--col-->
        </div><!--row-->
      </div><!--container-->
</div>
</body>
</html>
