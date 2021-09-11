<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%--
  ~ Copyright (c) 2019.
  ~ Create by Terry Huang (黃昭維)
  --%>

<!doctype html>
<html>

<head>
  <link rel="stylesheet" href="/styles/windowUI.css"/>
  <style>
    .accordion .card-header:after {
      font-family: 'FontAwesome';
      content: "\f068";
      float: right;
    }

    .accordion .card-header.collapsed:after {
      /* symbol for "collapsed" panels */
      content: "\f067";
    }

    #window {
      margin: 10px;
      padding-top: 30px;
    }

    #window .row > div {
      padding: 0px;
      text-align: center;
    }

    #window .title,
    #window .form-control {
      width: 100%;
    }

    #window .title {
      display: block;
      font-size: 20px;
    }

    #window .row > .confirmInfo {
      text-align: left;
    }
    /*btn桃紅圓角矩形 進貨*/
    a.table_btn_status {
      padding: .2em .6em;
      font-size: 13px;
      font-weight: bold;
      /*line-height: 27px;*/
      color: #fff;
      text-align: center;
      border-radius: 7px;
      min-width: 32px;
    }

    .header-input {
      padding: .2em .6em;

    }
  </style>
  <%--  <script src="${webapps.contextPath}/scripts/smb/smb/smb.js"></script>--%>
  <script src="${webapps.contextPath}/scripts/smb/smb/smbV2.js"></script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
</head>

<body class="hold-transition skin-green-light sidebar-mini">
<%--<span id="notification"></span>--%>
<%--<div id="window">--%>
<%--  <div class="container" style="width:auto">--%>
<%--    <div class="row">--%>
<%--      <div class="col-sm-12 confirmInfo">--%>
<%--        <div class="col-md-12 box_inputdata">--%>
<%--          <fieldset>--%>
<%--            <div class="form-group">--%>
<%--              <h4 class="title">--%>
<%--                織布機<span class="color_pink">*</span>--%>
<%--              </h4>--%>
<%--              <input type="text" name="weavingMachine" class="form-control" disabled/>--%>
<%--              <br>--%>
<%--              <h4 class="title">--%>
<%--                布種<span class="color_pink">*</span>--%>
<%--              </h4>--%>
<%--              <input type="text" name="clothCore" class="form-control"/>--%>
<%--              <br>--%>
<%--              <h4 class="title">--%>
<%--                工單號碼<span class="color_pink">*</span>--%>
<%--              </h4>--%>
<%--              <input type="text" name="manufactureOrderNo" class="form-control"/>--%>
<%--              <br>--%>
<%--              <h4 class="title">--%>
<%--                訂單號碼<span class="color_pink">*</span>--%>
<%--              </h4>--%>
<%--              <input type="text" name="clothOrderNo" class="form-control"/>--%>
<%--              <br>--%>
<%--              <h4 class="title">--%>
<%--                軸長<span class="color_pink">*</span>--%>
<%--              </h4>--%>
<%--              <input type="number" name="beamLength" class="form-control"/>--%>
<%--              <span class="errorMsg color_pink"></span>--%>
<%--            </div>--%>
<%--          </fieldset>--%>
<%--        </div>--%>
<%--      </div><!--col-->--%>
<%--    </div><!--row-->--%>
<%--    <div class="row">--%>
<%--      <div class="col-sm-6 confirmBtn">--%>
<%--        <button type="button" class="btn btn-success circleBtn white">--%>
<%--          <i class="fa fa-floppy-o"></i>--%>
<%--        </button>--%>
<%--      </div><!--col-->--%>
<%--      <div class="col-sm-6 cancelBtn">--%>
<%--        <button type="button" class="btn backBtn circleBtn white">--%>
<%--          <i class="fa fa-times"></i>--%>
<%--        </button>--%>
<%--      </div><!--col-->--%>
<%--    </div><!--row-->--%>
<%--  </div><!--container-->--%>
<%--</div>--%>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box-body no-padding">
          <section class="content-header">
            <input type="text" id="chatlink" style="display:none;">
            <ol id="breadcrumb" class="breadcrumb">
              <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
              <li><a href="javascript:void(0)"></a></li>
              <li class="active"></li>
            </ol>
          </section>
          <div id="smb">
            <ul class="nav nav-pills mb-3 pills-tab clothTab">
              <li class="nav-item active dan">
                <a href="#instrumentPanelPerMinContent" class="nav-link active in" id="instrumentPanelPerMin-tab"
                   data-toggle="pill" aria-selected="true">當班</a>
              </li>
              <li class="nav-item">
                <a href="#instrumentPanelPerShiftContent" class="nav-link" id="instrumentPanelPerShift-tab"
                   data-toggle="pill" aria-selected="false">三班</a>
              </li>
              <li class="nav-item">
                <a href="#instrumentPanelPerDayContent" class="nav-link" id="instrumentPanelPerDay-tab"
                   data-toggle="pill" aria-selected="false">當日</a>
              </li>
              <li class="nav-item">
                <a href="#smbOriginalContent" class="nav-link" id="smbOriginalContent-tab"
                   data-toggle="pill" aria-selected="false">SMB原始資料</a>
              </li>
            </ul>
            <div id="instrumentPanelPerMinContent">
              <div id="instrumentPanelPerMinFilter"></div>
              <div id="instrumentPanelPerMin"></div>
            </div>
            <div id="instrumentPanelPerShiftContent">
              <div id="instrumentPanelPerShift"></div>
            </div>
            <div id="instrumentPanelPerDayContent">
              <div id="instrumentPanelPerDay"></div>
            </div>
            <div id="smbOriginalContent">
              <div id="smbOriginal"></div>
            </div>
          </div>
        </div><!-- box-body-->
      </div><!-- col-->
    </div><!-- row-->
  </section><!-- content-->
</div><!-- content-wrapper-->
<div id="toolbar" style="display:none;">
</div>
<!--toolbar-->
<section id="confirmTemplate" style="display:none;">
  <section class="deleteIcon">
    <i class="fa fa-file-text-o">
      <i class="fa fa-times"></i>
    </i>
    <div>
      <i class="fa fa-trash"></i>
    </div>
  </section>
  <h2>確定刪除？</h2>
</section>
<%--<script type="text/x-kendo-template" id="PanelPerFilterTemplate">--%>
<%--  <div class="col-sm-2 col-xs-2">--%>
<%--    <div class="input-group stylish-input-group search">--%>
<%--      <input id="perShiftClothNo" type="text" class="form-control" placeholder="布號搜尋">--%>
<%--      <nav class="clear">×</nav>--%>
<%--      <span class="input-group-addon">--%>
<%--            <span class="glyphicon glyphicon-search"></span>--%>
<%--          </span>--%>
<%--    </div>--%>
<%--  </div>--%>
<%--  <div class="col-sm-2 col-xs-2">--%>
<%--    <div class="input-group stylish-input-group search">--%>
<%--      <input id="perShiftClothOrderNo" type="text" class="form-control" placeholder="訂單編號搜尋">--%>
<%--      <nav class="clear">×</nav>--%>
<%--      <span class="input-group-addon">--%>
<%--            <span class="glyphicon glyphicon-search"></span>--%>
<%--          </span>--%>
<%--    </div>--%>
<%--  </div>--%>
<%--  <div class="col-sm-2 col-xs-2">--%>
<%--    <div class="input-group stylish-input-group search">--%>
<%--      <input id="perShiftManufactureOrderNo" type="text" class="form-control" placeholder="工單單號搜尋">--%>
<%--      <nav class="clear">×</nav>--%>
<%--      <span class="input-group-addon">--%>
<%--            <span class="glyphicon glyphicon-search"></span>--%>
<%--          </span>--%>
<%--    </div>--%>
<%--  </div>--%>
<%--</script>--%>
<%--當班--%>
<script type="text/x-kendo-template" id="perMinDetailTemplate">
  <div class="panel panel-primary">
    <div class="panel-heading text-left" role="tab" id="minHeading_#= weavingMachineCoreNo #">
      布號
      <div style="display: inline-block">
        <input id="input_clothNo_#= weavingMachineCoreNo#" type="text" style="border-radius:7px;color:black;"
               value="#= clothNo #">
        <a id="submit_clothNo_#= weavingMachineCoreNo#" class="table_btn_status table_btn_warning submit_weaving_info_v2 submit_clothNo"
           href="javascript:void(0)" onclick="saveWeavingInfoV2(this.id)">更新</a>
      </div>
      目前緯密
      <div style="display: inline-block">
        <input id="input_weftDensity_#= weavingMachineCoreNo#" type="number" style="border-radius:7px;color:black;"
               value="#= weftDensity #">
        <a id="submit_weftDensity_#= weavingMachineCoreNo#" class="table_btn_status table_btn_warning submit_weaving_info_v2 submit_weftDensity"
           href="javascript:void(0)" onclick="saveWeavingInfoV2(this.id)">更新</a>
      </div>
      目前織縮
      <div style="display: inline-block">
        <input id="input_shrinkage_#= weavingMachineCoreNo#" type="number" style="border-radius:7px;color:black;"
               value="#= shrinkage #">
        <a id="submit_shrinkage_#= weavingMachineCoreNo#" class="table_btn_status table_btn_warning submit_weaving_info_v2 submit_shrinkage"
           href="javascript:void(0)" onclick="saveWeavingInfoV2(this.id)">更新</a>
      </div>
      上軸
      <div style="display: inline-block">
        <input id="input_beamLength_#= weavingMachineCoreNo#" type="number" style="border-radius:7px;color:black;"
               value="#= beamLength #">
        <a id="submit_beamLength_#= weavingMachineCoreNo#" class="table_btn_status table_btn_warning submit_weaving_info_v2 submit_beamLength"
           href="javascript:void(0)" onclick="saveWeavingInfoV2(this.id)">更新</a>
      </div>
    </div>
    <div class="minDetail"></div>
  </div>
</script>
<%--三班--%>
<script type="text/x-kendo-template" id="perShiftDetailTemplate">
  <div class="panel panel-primary">
    <div class="panel-heading text-left" role="tab" id="shiftHeading_#= weavingMachineCoreNo #">
      機台編號：#= weavingMachineCoreNo #
    </div>
    <div class="shiftDetail"></div>
  </div>
</script>
<%--當日--%>
<script type="text/x-kendo-template" id="perDayDetailTemplate">
  <div class="panel panel-primary">
    <div class="panel-heading text-left" role="tab" id="dayHeading_#= weavingMachineCoreNo #">
      機台編號：#= weavingMachineCoreNo #
    </div>
    <div class="dayDetail"></div>
  </div>
</script>
<%--SMB原始資料countDownBar--%>
<script type="text/x-kendo-template" id="countDownBarTemplate">
  <div>
    <span>下次資料更新：</span>
    <div class="progressbar"></div>
  </div>
</script>
</body>

</html>
