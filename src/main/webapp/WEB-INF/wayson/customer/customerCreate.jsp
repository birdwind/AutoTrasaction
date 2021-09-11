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
  <link rel="stylesheet" href="/styles/windowUI.css"/>
  <style>
    .k-grid-content {
      position: initial !important;
    }

    /*.table-striped{*/
    /*  overflow:auto;*/
    /*  white-space: nowrap;*/
    /*}*/
  </style>
  <script>
    var uuid = "${uuid}";

    $(async function () {
      $(".box_features").draggable({
        axis: "y"
      });

      $(".box_features > .right").click(function () {
        $(this).parent().css("left", "auto").animate({
          right: "-160px"
        }).delay(100).queue(function () {
          $(this).find(".left").fadeIn(100);
          $(this).dequeue();
        });
      }) //right
      $(".box_features > .left").click(function () {
        $(this).hide().parent().css("left", "auto").animate({
          right: "-10px"
        }).delay(100).queue(function () {
          $(this).find(".left").hide();
          $(this).dequeue();
        });
      }) //left
    })

  </script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <script src="${webapps.contextPath}/scripts/customer/customerCreate.js"></script>
  <script src="${webapps.contextPath}/scripts/customer/customerFormShared.js"></script>
  <script src="${webapps.contextPath}/scripts/customer/customerUpdate.js"></script>

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
                  <div class="box-body">
                    <div class="row">
                      <div class="col-md-12">
                        <ul id="panelbar">
                          <li id="detailBar">聯絡資訊
                            <div id="detail">
                              <div class="table-responsive">
                                <div class="table_bar">
                                  <div class="col-sm-4 col-xs-5 table_bar_box" style="margin-top: 5px;">
                                    <a href="javascript:void(0)" class="btn addbtn"><i class="fa fa-plus"></i></a>
                                  </div>
                                </div>

                                <div class="box box-success">
                                  <table id="table" class="table bg_white table-striped table-bordered table-hover">
                                    <thead class="thead-light"></thead>
                                    <tbody></tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li id="salesBar">窗口資訊
                            <div id="sales" class="box-body">
                              <div class="table_bar">
                                <div class="col-sm-4 col-xs-5 table_bar_box" style="margin-top: 5px;">
                                  <a href="javascript:void(0)" class="btn addbtn"><i class="fa fa-plus"></i></a>
                                </div>
                              </div>
                              <table id="salesTable" class="table bg_white table-striped table-bordered table-hover">
                                <thead class="thead-light"></thead>
                                <tbody></tbody>
                              </table>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
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

<div id="toolbar" style="display:none;">
  <div class="col-sm-4 col-xs-6 table_bar_box">
    <a href="javascript:void(0)" id="addRow" class="btn addbtn"><i class="fa fa-plus"></i></a>
    <a href="javascript:void(0)" id="deleteUsually" class="btn deleteusually" style="display: none"><i
      class="fa fa-trash"></i></a>
  </div>
</div>

<script id="errorTemplate" type="text/x-kendo-template">
  <span class="errorMsg color_pink"></span>
</script>

<script type="text/x-kendo-template" id="detailTitleTemplate">
  <tr>
    <th scope="col">#=data.address.title#<span class='color_pink'>*</span></th>
    <th scope="col">#=data.phone.title#<span class='color_pink'></span></th>
    <th scope="col">#=data.fax.title#<span class='color_pink'></span></th>
    <th scope="col">#=data.email.title#<span class='color_pink'></span></th>
    <th scope="col">#=data.receiptAddress.title#<span class='color_pink'></span></th>
    <th class="center" scope="col" width="5%">刪除</th>
  </tr>
</script>
<script type="text/x-kendo-template" id="detailBodyTemplate">
  <tr>
    <td style="display: none">
      <input id="companyDetailUuid_#=data#" type="text" class="form-control" name="companyDetailUuid" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="address_#=data#" type="text" class="form-control" name="address" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="phone_#=data#" type="text" class="form-control number" name="phone" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="fax_#=data#" type="text" class="form-control number" name="fax" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="email_#=data#" type="text" class="form-control" name="email" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="receiptAddress_#=data#" type="text" class="form-control" name="receiptAddress" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td class="center">
      <a href="javascript:void(0)" class="table_btn table_btn_pink btn_circle" name="tableDel">
        <i class="fa fa-times"></i>
      </a>
    </td>
  </tr>
</script>

<script type="text/x-kendo-template" id="salesTitleTamplate">
  <tr>
    <th scope="col" >#=data.name.title#<span class='color_pink'>*</span></th>
    <th scope="col" >#=data.department.title#<span class='color_pink'></span></th>
    <th scope="col" >#=data.jobTitle.title#<span class='color_pink'></span></th>
    <th scope="col" >#=data.phone.title#<span class='color_pink'></span></th>
    <th scope="col" >#=data.extension.title#<span class='color_pink'></span></th>
    <th scope="col" >#=data.email.title#<span class='color_pink'></span></th>
    <th scope="col" >#=data.note.title#<span class='color_pink'></span></th>
    <th scope="col" >#=data.isMember.title#</th>
    <th class="center" scope="col" width="5%">刪除</th>
  </tr>
</script>

<script type="text/x-kendo-template" id="salesBodyTemplate">
  <tr>
    <td style="display: none">
      <input id="memberCoreUuid_#=data#" type="text" class="form-control" name="memberCoreUuid" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="name_#=data#" type="text" class="form-control" name="name" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="department_#=data#" type="text" class="form-control" name="department" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="jobTitle_#=data#" type="text" class="form-control" name="jobTitle" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="sale_phone_#=data#" type="text" class="form-control number" name="phone" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="extension_#=data#" type="text" class="form-control number" name="extension" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="sale_email_#=data#" type="text" class="form-control text" name="email" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="note_#=data#" type="textarea" class="form-control text" name="note" value="" style="width: 85%;">
      </br>
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input type="checkbox" id="isMember_#=data#" class="k-checkbox" name="isMember">
      <label class="k-checkbox-label" for="isMember_#=data#">設為會員</label>
      </br>
      <span id="account_#=data#"></span>
      </input>
    </td>
    <td class="center">
      <a href="javascript:void(0)" class="table_btn table_btn_pink btn_circle" name="tableDel">
        <i class="fa fa-times"></i>
      </a>
    </td>
  </tr>
</script>

</body>
</html>
