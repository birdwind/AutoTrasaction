<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
  <script src="${webapps.contextPath}/scripts/yarn/yarnInquiryCreate.js"></script>
  <style>
    #inquiry .form-control {
      display: inline-block;
    }
    .invisibled .form-control{
      opacity:0;
      z-index:-99;
    }
    .emailSection{
      margin:30px 0px;
    }
    .delBtn{
      left: -30px; 
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
                    <button type="button" onclick="location='/page/yarn/inquiry/'" class="btn backBtn circleBtn white">
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
                <div class="col-md-12">
                  <div class="table_bar">
                    <div class="col-sm-4 col-xs-6 table_bar_box">
                      <a href="javascript:void(0)" id="addInquiry" class="btn"><i class="fa fa-plus"></i></a>
                    </div>
                  </div>
                  <table id="inquiry" class="table bg_white table-striped table-bordered table-hover">
                    <thead class="thead-light">
                      <tr>
                        <th style="width:13%">
                          <span class="yarnUuidTitle"></span>
                          <span class="color_pink">*</span>
                        </th>
                        <th style="width:10%">
                          <span class="isEqualLongTitle"></span>
                          <span class="color_pink"></span>
                        </th>
                        <th style="width:7%">
                          <span class="isInStockTitle"></span>
                          <span class="color_pink">*</span>
                        </th>
                        <th style="width:10%" colspan="2">
                          <span class="minimumOrderQuantityTitle"></span>
                          <span class="color_pink"></span>
                        </th>
                        <th style="width:10%" colspan="2">
                          <span class="amountTitle"></span>
                          <span class="color_pink">*</span>
                        </th>
                        <th style="width:10%">
                          <span class="extraFeeTitle"></span>
                          <span class="color_pink"></span>
                        </th>
                        <th style="width:7%">
                          <span class="warpWeftTitle"></span>
                          <span class="color_pink">*</span>
                        </th>
                        <th style="width:15%"><span class="expectDeliverDateTitle"></span>
                        </th>
                        <th class="center" style="width:5%">關聯布號</th>
                        <th class="center" style="width:5%">關聯訂單</th>
                        <th class="center" style="width:5%">刪除</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </div>
                <!--col-->
              </div>
              <!--row-->
            </section>
            <!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->

  <section id="inquiryTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <input type="text" class="form-control" name="yarnUuid">
          <span class="errorMsg color_pink"></span>
        </td>
        <td class="invisibled">
          <input type="text" name="isEqualLong" class="form-control number">
          <span class="errorMsg color_pink"></span>
        </td>
        <td>
          <input type="text" name="isInStock" class="form-control number">
          <span class="errorMsg color_pink"></span>
        </td>
        <td>
          <input type="text" name="minimumOrderQuantity" class="form-control number">
          <span class="errorMsg color_pink"></span>
        </td>
        <td>
          <input type="text" name="minimumOrderUnit" class="form-control number">
          <span class="errorMsg color_pink"></span>&nbsp;
        </td>
        <td>
          <input type="text" name="amount" class="form-control number">
          <span class="errorMsg color_pink"></span>
        </td>
        <td>
          <input type="text" name="unit" class="form-control number">
          <span class="errorMsg color_pink"></span>
        </td>
        <td>
          <input type="text" name="extraFee" class="form-control number">
          <span class="errorMsg color_pink"></span>
        </td>
        <td>
          <input type="text" name="warpWeft" class="form-control number">
          <span class="errorMsg color_pink"></span>
        </td>
        <td>
          <input type="text" name="expectDeliverDate" class="form-control">
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
          <a href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle">
            <i class="fa fa-times"></i>
          </a>
        </td>
      </tr>
    </table>
  </section>
  <section id="emailsectionTemplate" style="display:none;">
    <section class="emailSection">
      <div class="row">
        <div class="col-md-12 box_inputdata">
          <nav class="title">swswd</nav>
        </div><!---col-->
      </div><!---row-->
      <div class="row">
        <div class="col-md-12 box_inputdata">
            <label class="sendEmail checkbox">
              <input type="checkbox">
              <span class="checkmark">&emsp;</span>
            </label>
            <label>&emsp;<spring:message code="sendEmail"/></label>
            <button class="addBtn" style="display:none;margin-bottom:10px;" title="新增Email"><i class="fa fa-plus"></i>
            </button>
            <fieldset class="companyEmail" style="display:none;">
              <div class="form-group">
                <nav>E-mail<span class="color_pink">*</span></nav>
                <input type="text" name="companyEmail" class="form-control">
                <span class="errorMsg color_pink"></span>
              </div>
            </fieldset>
            <span class="emailContainer">
            </span>
        </div><!---col-->
      </div><!---row-->
      
    </section>
  </section>
  <section id="emailTemplate" style="display:none;">
    <div class=" box_inputdata extraEmail">
      <button class="delBtn"><i class="fa fa-times"></i></button>
      <fieldset>
        <div class="form-group">
          <nav>E-mail<span class="color_pink">*</span></nav>
          <input type="text" name="companyEmail" class="form-control">
          <span class="errorMsg color_pink"></span>
        </div>
      </fieldset>
    </div>
  </section>
</body>
</html>
