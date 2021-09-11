<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<script src="${webapps.contextPath}/scripts/yarn/yarnIngredientForm.js"></script>
<script>
var uuid = "${uuid}";
</script>
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
                    <button type="button" onclick="location='/page/yarn/ingredient/'"class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white"></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                  <br>
                    <c:if test="${uuid != ''}">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="col-md-12 text-right">
                            <a class="table_btn_status btn_lightblue" href="/page/yarn/ingredient/history/price/${uuid}">歷史紗價</a>
                            <a class="table_btn_status btn_lightyellow" href="/page/yarn/ingredient/history/knot/${uuid}">歷史噴節點</a>
                            <a class="table_btn_status btn_lightpurple" href="/page/yarn/ingredient/history/count/${uuid}">歷史丹/支數</a>
                            <a class="table_btn_status btn_lightgreen">使用此紗布種</a>
                          </div><!--col-->
                        </div><!--col-->
                      </div><!--row-->
                      </c:if>
                    <div id="form" class="box-body">
                    </div><!--#form-->
                    <div class="box-body">
                        <div class="row" >
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <div class="table_bar">
                              <div class="col-sm-4 col-xs-6 table_bar_box">
                                <a href="javascript:void(0)" id="addIngredient" class="btn"><i class="fa fa-plus"></i></a>
                              </div>
                            </div><!--table_bar-->
                            <table id="ingredient" class="table bg_white table-striped table-bordered table-hover">
                              <thead class="thead-light">
                              <tr>
                                <th scope="col" style="width:45%"><span class="yarnCellTitle"></span></th>
                                <th scope="col" style="width:45%"><span class="percentageTitle"></span>
                                <span id="percentageError" class="errorMsg color_pink" style="font-weight:normal"></span>
                                </th>
                                <th scope="col">刪除</th>
                              </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table><!--table-->
                            
                          </div><!--table-responsive-->
                        </div><!--col-->
                      </div><!--row-->
                    </div><!--box-body-->
                  </div><!--box-->
                </div><!--col-->
              </div><!--row-->
            </section><!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
<section id="ingreTemplate" style="display:none;">
<table>
<tr>
  <td>
    <input type="text" class="form-control pull-right" name="cellName">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="percentage">
    <span class="errorMsg color_pink"></span>
  </td>
  <td class="center">
    <a href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle">
      <i class="fa fa-times"></i>
    </a>
  </td>
</tr>
</table>
</section>
</body>
</html>
