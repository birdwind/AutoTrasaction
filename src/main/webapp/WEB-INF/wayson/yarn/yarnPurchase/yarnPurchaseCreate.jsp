<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<script src="${webapps.contextPath}/scripts/yarn/yarnPurchaseCreate.js"></script>
<style>
  #inquiry .form-control{
    display:inline-block;
  }
</style>
<script>
var uuid = "${uuid}";
</script>
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
                    <button type="button" onclick="location='/page/yarn/purchase/'"class="btn backBtn circleBtn white">
                        <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white"></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <div id="form" class="box-body">
                    </div><!--#form-->
                  </div><!--box-->
                  
                </div><!--col-->
              </div><!--row-->
              <div class="row">
                <div class="col-md-12"  style="padding-bottom:50px">
                  <div class="table_bar" >
                      <div class="col-sm-4 col-xs-6 table_bar_box">	
                      <a href="javascript:void(0)" id="addPurchase" class="btn"><i class="fa fa-plus"></i></a>
                      </div>
                  </div>
                  <table id="purchase" class="table bg_white table-striped table-bordered table-hover" style="margin-bottom:5px">
                        <thead class="thead-light">
                          <tr>
                            <th><span class="yarnCoreTitle"></span></th>
                            <th style="width:8%"><span class="purchaseAmountTitle"></span></th>
                            <th style="width:9%"></th>
                            <th style="width:8%"><span class="warpWeftTitle"></span></th>
                            <th class="center" style="width:5%"><span>關聯布號</span></th>
                            <th class="center" style="width:5%"><span>關聯訂單</span></th>
                            <th style="width:13%"><span class="destinationCompanyTitle"></span></th>
                            <th style="width:13%"><span class="expectArrivalTimeTitle"></span></th>
                            <th style="width:10%"><span class="purchasePriceTitle"></span></th>
                            <th style="width:10%"scope="col">小計</th>
                            <th class="center" style="width:6%"scope="col">刪除</th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                  </table>
                  <table id="total" class="table bg_white table-striped table-bordered table-hover" > 
                        <tbody>
                        <tr> 
                            <td style="text-align:right"><span>合計(NT)</span></td>
                            <td name="subTotal" style="width:15%"></td>
                        </tr>
                        <tr> 
                            <td style="text-align:right"><span>稅金(5%)</span></td>
                            <td name="tax" style="width:15%"></td>
                        </tr>
                        <tr> 
                            <td style="text-align:right"><span>總計(NT)</span></td>
                            <td name="total" style="width:15%"></td>
                        </tr>
                        </tbody>
                  </table>
                </div><!--col-->
              </div><!--row-->
            </section><!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
<section id="emailTemplate" style="display:none;">
<div class="col-md-12 box_inputdata extraEmail">
  <button class="delBtn"><i class="fa fa-times"></i></button>
    <fieldset>
      <div class="form-group">
        <nav>E-mail<span class="color_pink">*</span></nav>
        <input type="text" name="extraEmail" class="form-control">
        <span class="errorMsg color_pink"></span>
      </div>
    </fieldset>
</div>
</section>
<section id="purchaseTemplate" style="display:none;">
<table>
<tr>
  <td>
    <input type="text" class="form-control" name="yarnCore">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" name="purchaseAmount" class="form-control number" >
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" name="purchaseUnit" class="form-control number">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" name="warpWeft" class="form-control number" >
    <span class="errorMsg color_pink"></span>
  </td>
  <td class="center">
    <a href="javascript:void(0)" class="table_btn table_btn_purple">
      <i class="fa fa-pencil"></i>
    </a>
  </td>
  <td class="center">
      <a href="javascript:void(0)" class="table_btn table_btn_purple">
      <i class="fa fa-pencil"></i>
    </a>
  </td>
  <td class="center">
    <input type="text" name="destinationCompany" class="form-control" >
    <span class="errorMsg color_pink"></span>
  </td>
  <td class="center">
    <input type="text" name="expectArrivalTime" class="form-control" >
    <span class="errorMsg color_pink"></span>
  </td>
  <td class="center">
    <input type="text" name="purchasePrice" class="form-control number" >
    <span class="errorMsg color_pink"></span>
  </td>
  <td class="center">
    <span name="amountPrice"></span>
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
