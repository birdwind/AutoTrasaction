<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <style>
    .box_inputdata .form-control {
      width: 100%;
    }
  </style>
  <script>
      uuid = "${uuid}";
  </script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <script src="${webapps.contextPath}/scripts/manufacture/outsourcing/weavingCreate.js"></script>
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
          </section> <!-- content-header -->
          <section class="content">
            <div class="row">
              <div class="col-md-12">
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
                <!--box_features-->
                <div class="box box-success" style="padding-bottom:40px">
                  <br>
                  <div id="form" class="box-body"></div>
                  <!--#form-->
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
                  <!--#table-->
                </div>
                <!--box-->
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
<script type="text/x-kendo-template" id="emailsectionTemplate">
  <section class="emailSection" data-id="#=data.value#">
    <div class="row">
      <div class="col-md-12 box_inputdata">
        <nav class="title">#=data.text#</nav>
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
        <fieldset class="contacts" style="display:none;">
          <div class="form-group col-md-6">
            <nav class="contactNameTitle text-nowrap"><span class="color_pink">*</span></nav>
            <input type="text" name="contactName" class="form-control">
            <span class="errorMsg color_pink"></span>
          </div>
          <div class="form-group col-md-6">
            <nav class="contactEmailTitle text-nowrap"></nav>
            <input type="text" name="contactEmail" class="form-control">
            <span class="errorMsg color_pink"></span>
          </div>
        </fieldset>
        <span class="contactsContainer">
            </span>
      </div><!---col-->
    </div><!---row-->

  </section>
</script>
<script type="text/x-kendo-template" id="emailTemplate">
  <div class=" box_inputdata extraEmail">
    <button class="delBtn"><i class="fa fa-times"></i></button>
    <fieldset>
      <div class="form-group col-md-6">
        <nav class="contactNameTitle text-nowrap"></nav>
        <input type="text" name="contactName" class="form-control">
        <span class="errorMsg color_pink"></span>
      </div>
      <div class="form-group col-md-6">
        <nav class="contactEmailTitle text-nowrap"></nav>
        <input type="text" name="contactEmail" class="form-control">
        <span class="errorMsg color_pink"></span>
      </div>
    </fieldset>
  </div>
</script>
<script type="text/x-kendo-template" id="tableTheadTemplate">
  <tr>
    <th scope="col">#=data.clothOrderDetail.title#<span class='color_pink'>*</span></th>
    <th scope="col">#=data.expectDate.title#<span class='color_pink'>*</span></th>
    <th scope="col">#=data.length.title#<span class='color_pink'>*</span></th>
    <th scope="col">#=data.price.title#<span class='color_pink'>*</span></th>
    <th scope="col">#=data.extraFee.title#<span class='color_pink'>*</span></th>
    <th class="center" scope="col" width="5%">刪除</th>
  </tr>
</script>
<script type="text/x-kendo-template" id="tableTbodyTemplate">
  <tr>
    <td>
      <input id="clothOrderDetail_#=data#" type="text" class="form-control" name="clothOrderDetail" value="" style="width: 100%">
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
        <input id="expectDate_#=data#" type="text" class="form-control date" name="expectDate" value="">
        <span class="errorMsg color_pink"></span>
    </td>
    <td>
        <input id="length_#=data#" type="text" class="form-control number" name="length" value="">
        <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="price_#=data#" type="text" class="form-control number" name="price" value="">
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="extraFee_#=data#" type="text" class="form-control number" name="extraFee" value="">
      <span class="errorMsg color_pink"></span>
    </td>
    <td class="center">
      <a href="\\#" class="table_btn table_btn_pink btn_circle" name="tableDel">
        <i class="fa fa-times"></i>
      </a>
    </td>
  </tr>
</script>
</body>

</html>
