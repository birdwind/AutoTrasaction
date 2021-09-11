<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<style>
#gird .errorMsg {
    display: block;
    margin-left: 14.5%;
}
#grid .form-control {
    width:78%
}
.fa-camera{
  font-size:25px;
}
</style>
<script>
var uuid = "${uuid}";
var type = "${type}";
</script>
<c:if test="${type == 'subForm'}">
<link rel="stylesheet" href="${webapps.contextPath}/styles/calculator.css">
<script src="${webapps.contextPath}/scripts/calculator.js"></script>
</c:if>
<script src="${webapps.contextPath}/scripts/yarn/yarnInventoryForm.js"></script>
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
                    <button type="button" onclick="location='/page/yarn/inventory/'"class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white" style="display:none;"></button>
                    <i class="fa fa-angle-double-right right" style="display:none;"></i>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <div id="form" class="box-body">
                    </div><!--#form-->
                    <div id="grid" class="box-body">
                    </div><!--#warehouse-->
                  </div><!--box-->
                </div><!--col-->
              </div><!--row-->
            </section><!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
<section id="inboundTemplate" style="display:none;">
<table>
<tr>
  <td>
    <input type="text" class="form-control pull-right" name="yarnPurchase">
    <input type="hidden" name="yarnPurchaseDetail" >
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <span style="vertical-align:middle;"></span>
    <input type="text" class="form-control" name="batchNo" maxlength="45">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control" name="yarnCore" style="display:none">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="importAmount">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="importUnit">
  </td>
  <td>
    <input type="text" class="form-control number" name="yarnS">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="yarnD">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="warpWeft">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control" name="targetWarehouse">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="actualPrice">
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
