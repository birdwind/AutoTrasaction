<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="/styles/windowUI.css"/>
  <link rel="stylesheet" href="${webapps.contextPath}/styles/timeline_horizontal.css">
  <script>
    var uuid = "${uuid}";
  </script>
  <script src="${webapps.contextPath}/scripts/sales/quote/grey/salesForm.js"></script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <style>
    #detail th,
    #detail td {
      text-align: center;
      vertical-align: middle;
    }

    #detail .errorMsg {
      float: left;
    }

    .window {
      margin: 10px;
      padding-top: 30px;
    }

    .window .title {
      text-align: center;
      margin-bottom: 10px;
    }

    .window .form-control {
      text-align: left;
      width: 75%;
    }

    .window span::before {
      content: '';
      width: 0;
      height: 100%;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      background: #f00;
    }

    .window .row > div {
      padding: 0px;
    }

    .window .k-listbox {
      width: 10px;
      height: 10px;
      margin-bottom: 30px;
    }

    .window .k-item {
      cursor: move;
    }

    .window .k-item:hover,
    .window .k-item.k-state-selected {
      color: white;
      background-color: #74b4f5;
    }

    .window .k-button {
      background-color: #3399ff;
      color: white;
    }

    .window .k-button.k-state-disabled {
      background-color: #74b0ec;
    }

    #contactsContainer {
      margin-left: 14%;
      margin-bottom: 20px;
      display: none;
    }

    #contactsContainer table th {
      height: 50px;
      vertical-align: bottom;
      text-align: center;
      padding: 15px;
      max-width: 500px;
      min-width: 100px;
    }

    #contactsContainer table td {
      height: 50px;
      vertical-align: bottom;
      text-align: left;
      padding: 15px;
      max-width: 1024px;
      min-width: 100px;
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
                  <button id="replyPage" type="button" class="btn backBtn circleBtn white">
                    <i class="fa fa-reply"></i>
                  </button>
                  <button id="save" type="button" class="btn btn-success circleBtn white">
                    <i class="fa fa-plus"></i></button>
                  <i class="fa fa-angle-double-right right"></i>
                </div><!--box_features-->
                <div class="box box-success">
                  <br>
                  <div id="form" class="box-body">
                  </div><!--#form-->
                </div><!--row-->
              </div>
            </div>
            <div class="row">
              <div style="padding-bottom:10px">
                <br>
                <div class="table_bar">
                  <div class="col-sm-4 col-xs-6 table_bar_box">
                    <a href="javascript:void(0)" id="addItem" class="btn"><i class="fa fa-plus"></i></a>
                  </div>
                </div><!--table_bar-->
                <table id="detail" class="table bg_white table-striped table-bordered table-hover warp-tag"
                       style="max-width: 100%">
                  <thead class="thead-light">
                  <tr>
                    <th scope="col" style="width:5%;">
                      <span>刪除</span>
                    </th>
                  </tr>
                  </thead>
                  <tbody class="thead-light">
                  </tbody>
                </table>
                <!--table-->
                <div><!--boxSuccess-->
                </div><!--box-->
              </div><!--col-->
            </div>
          </section><!--content-->
        </div><!-- box-body-->
      </div><!-- col-->
    </div><!-- row-->
  </section><!-- content-->
</div><!-- content-wrapper-->

<div id="changeClientNotification" class="window">
  <div class="container" style="width:auto">
    <div class="row title">
      <span>變更客戶將清除聯絡人</span>
    </div><!--row-->
    <div class="row">
      <div class="col-sm-12">
        <a href="javascript:void(0)" name="cancel" class="btn_upload table_btn_status"
           style="width: 20%; background-color: #ac2925; color: #FFFFFF">取消</a>
        <a href="javascript:void(0)" name="confirm" class="btn_upload table_btn_status"
           style="margin-left:10px; width: 20%">確認</a>
      </div><!--col-->
    </div><!--row-->
  </div><!--container-->
</div>

<div id="cancelSignatureNotification" class="window">
  <div class="container" style="width:auto">
    <div class="row title">
      <span>撤回簽核</span>
    </div><!--row-->
    <div class="row">
      <div class="col-sm-12">
        <a href="javascript:void(0)" name="cancel" class="btn_upload table_btn_status"
           style="width: 20%; background-color: #ac2925; color: #FFFFFF">取消</a>
        <a href="javascript:void(0)" name="confirm" class="btn_upload table_btn_status"
           style="margin-left:10px; width: 20%">確認</a>
      </div><!--col-->
    </div><!--row-->
  </div><!--container-->
</div>

<div id="clothCostWindow" class="window">
  <div class="container" style="width:auto">
    <div class="row"></div><!--row-->
  </div><!--container-->
</div>

<section id="detailTemplate" style="display: none">
  <table>
    <tr name="detailList">
      <td class="center deleteDetail">
        <a href="javascript:void(0)" class="table_btn table_btn_pink btn_circle" name="tableDel">
          <i class="fa fa-times"></i>
        </a>
      </td>
    </tr>
  </table>
</section>

<script type="text/x-kendo-template" id="contactDetailTemplate">
  <tr class="contactSection" data-id="#=data.value#">
    <td>#=data.text#</td>
    <td>#=data.email#</td>
    <td>#=data.phone#</td>
  </tr>
</script>

<script type="text/x-kendo-template" id="clothCostTable">
  <table class="table bg_white table-striped table-bordered table-hover warp-tag">
    <thead>
    <tr>
      #for(var item in data.salesQuoteGreyClothGetClothYarnGrid.header){#
      #if(item === "yarnCoreUuid"){#
      <th scope="col" style="width:5%; display: none;">
        #}else{#
      <th scope="col" style="width:5%; ">
        #}#
        <span>#=data.salesQuoteGreyClothGetClothYarnGrid.header[item].title#</span>
      </th>
      #}#
    </tr>
    </thead>
    <tbody>
    #for(var index in data.salesQuoteGreyClothGetClothYarnGrid.contents){#
    <tr>
      #for(var item in data.salesQuoteGreyClothGetClothYarnGrid.contents[index]){#
      #if(item === "yarnCoreUuid"){#
      <td style="display: none;">
        #}else{#
      <td>
        #}#
        <span id="#=item + '_' + index #" name="#=item#">#=data.salesQuoteGreyClothGetClothYarnGrid.contents[index][item] ? data.salesQuoteGreyClothGetClothYarnGrid.contents[index][item] : "--"#</span>
      </td>
      #}#
    </tr>
    #}#
    <tr>
      <td id="inquirtyAll" colspan="5" style="text-align: right"></td>
    </tr>
    </tbody>
    <thead>
    <tr style="height: 40px"></tr>
    <tr>
      <th scope="col" style="width:5%;">
        <span><spring:message code="ClothCore.WarpCost"/></span>
      </th>
      <th scope="col" style="width:5%;">
        <span><spring:message code="ClothCore.WeftCost"/></span>
      </th>
      <th scope="col" style="width:5%;">
        <span><spring:message code="ClothCore.ManufactureFee"/></span>
      </th>
      <th scope="col" style="width:5%;">
        <span><spring:message code="ClothCore.GreyClothDensityWeft"/></span>
      </th>
      <th scope="col" style="width:5%;">
        <span><spring:message code="ClothCore.TotalCost"/></span>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr>
      #for(var item in data.salesQuoteGreyClothGetClothCostView){#
      <td>
        <span name="#=item#">#=data.salesQuoteGreyClothGetClothCostView[item].value ? data.salesQuoteGreyClothGetClothCostView[item].value : "--"#</span>
      </td>
      #}#
    </tr>
    </tbody>
  </table>
</script>

<script id="recordTimeline" type="text/x-kendo-template">
  <tr name="record-timeline">
    <td colspan="11">
      <div class="horizontal-overflow">
        <div style="width: fit-content">
          <ul class="timeline" name="timeline"></ul>
        </div>
      </div>
    </td>
  </tr>
</script>

<script id="timelineContentTemplate" type="text/x-kendo-template">
  #if(data.isPassed == null){#
  <li class="li">
    #}else{ if(data.isPassed) {#
  <li class="li complete">
    #}else{#
  <li class="li failed">
    #} }#

    <div class="status">
      <span class="title">#=data.title.value#</span>
    </div>
    <div class="timestamp">
      <span class="date bold" name="actualSignatureDate">#=data.actualSignatureDate.value#</span>
      <span name="content">#=data.content.value#</span>
      #if(data.clothYarns.value[0]){
      for(let index in data.clothYarns.value){#
      <span name="content" class="bold">#=data.clothYarns.value[index]#</span>
      #}#
      <span name="note">#=data.note.value#</span>
      #}else{#
      <span name="note" class="bold">#=data.note.value#</span>
      #}#
    </div>
  </li>
</script>
</body>
</html>
