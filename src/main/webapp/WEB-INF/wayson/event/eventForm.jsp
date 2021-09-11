<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<link rel="stylesheet" href="/styles/windowUI.css"/>
<script>
  var uuid = "${uuid}";
  var categoryId = "${categoryId}";
  var section = "${section}";
</script>
<script src="${webapps.contextPath}/scripts/event/eventForm.js"></script>
<style>
#category th,
#category td{
  text-align:center;
  line-height:40px;
}
#category .errorMsg{
  float:left;
}
.table_bar_box{
  width:100%;
}
.table_bar_box > span{
  color:white;
}
</style>
</head>
<body class="hold-transition skin-green-light sidebar-mini">
  <span id="notification"></span>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box-body no-padding">
            <section class="content-header">
              <ol id="breadcrumb" class="breadcrumb">
                <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"></li> 
              </ol>
            </section><!-- content-header -->
            <section class="content">
              <div class="row">
                <div class="col-md-12">
                  <div class="box_features">
                    <i class="fa fa-angle-double-left left" style="display:none; margin-right: 20px;"></i>
                    <button type="button" onclick="location='/page/event/<c:out value='${section}'/>'"class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white">
                    <i class="fa fa-plus"></i></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                  <br>
                    <div id="form" class="box-body">
                    </div><!--#form-->
                    <div style="padding-bottom:40px">
                      <br>
                      <div class="table_bar">
                        <div class="col-sm-4 col-xs-6 table_bar_box">
                          <a href="javascript:void(0)" id="addItem" class="btn"><i class="fa fa-plus"></i></a>
                          <span>觸發子事件</span>
                        </div>
                      </div><!--table_bar-->
                      <table id="category" class="table bg_white table-striped table-bordered table-hover warp-tag">
                        <thead class="thead-light">
                            <tr>
                              <th scope="col"><span class="eventNo">觸發順序</span> 
                              </th>
                              <th scope="col"><span class="eventSort" >事件分類</span>
                              </th>
                              <th scope="col"><span class="eventName">事件名稱</span>
                              </th>
                              <th scope="col"><span >刪除</span>
                              </th>
                            </tr>
                        </thead>
                        <tbody class="thead-light">
                        </tbody>
                      </table><!--table-->
                    <div ><!--boxSuccess-->
                  </div><!--box-->
                </div><!--col-->
              </div><!--row-->
            </section><!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
<section id="cateTemplate" style="display:none;">
<table>
  <tr>
    <td class="eventNo">
      <span></span>
      <input type='hidden' name="eventRelateUuid">
      <input type='hidden' name="relateOrder">
    </td>
    <td>
      <input class="form-control" type='text' name="eventCategory">
    </td>
    <td>
      <input class="form-control" type='text' name="relateEvent">
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <a href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle">
        <i class="fa fa-times"></i>
      </a>
    </td>
  </tr>
</table>
</section>
</body>
</html>
