<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="/styles/windowUI.css"/>
  <script>
    var uuid = "${uuid}";
    var type = "${type}";

  </script>
  <script src="${webapps.contextPath}/scripts/sales/signature/signatureForm.js"></script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <style>
    #detail th,
    #detail td {
      text-align: center;
    }

    #detail .errorMsg {
      float: left;
    }

    .window {
      margin: 10px;
      padding-top: 30px;
    }

    .window .form-control{
      text-align: left;
      width: 75%;
    }

    .window span::before{
      content:'';
      width:0;
      height:100%;
      display:inline-block;
      position:relative;
      vertical-align:middle;
      background:#f00;
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
                <div class="box box-success" style="padding-bottom:40px">
                  <br>
                  <div id="form" class="box-body">
                  </div><!--#form-->
                  <div style="padding-bottom:10px">
                    <br>
                    <div class="table_bar">
                      <div class="col-sm-4 col-xs-6 table_bar_box">
                      </div>
                    </div><!--table_bar-->
                    <table id="detail" class="table bg_white table-striped table-bordered table-hover warp-tag">
                      <thead class="thead-light">
                      <tr>
                      </tr>
                      </thead>
                      <tbody class="thead-light">
                      </tbody>
                    </table>
                    <!--table-->
                  </div>
                </div>
              </div>
            </div>
          </section><!--content-->
        </div><!-- box-body-->
      </div><!-- col-->
    </div><!-- row-->
  </section><!-- content-->
</div><!-- content-wrapper-->

<div id="signatureWindow" style="display: none" class="window">
  <div class="container" style="width:auto">
    <div class="row">
      <div class="col-sm-12 box_inputdata">
        <fieldset>
          <div class="form-group">
            <nav>是否通過<span class="color_pink">*</span></nav>
            <span>
              <input type="radio" id="star3" name="isPassed" value="1" checked="checked"/>
              <label for="star3" title="text">是</label>
              <input type="radio" id="star2" name="isPassed" value="0"/>
              <label for="star2" title="text">否</label>
            </span>
            <span class="errorMsg color_pink"></span>
          </div>
        </fieldset>
      </div>
      <div class="col-sm-12 box_inputdata">
        <fieldset>
          <div class="form-group">
            <nav style="vertical-align: top;">意見</nav>
            <textarea name="note" class="form-control textareaSize"></textarea>
            <span class="errorMsg color_pink"></span>
          </div>
        </fieldset>
      </div>
    </div><!--row-->
    <div class="row">
      <div class="col-sm-12" style="text-align: center">
        <a href="javascript:void(0)" id="cancelSignature" class="btn_upload table_btn_status"
           style="width: 20%; background-color: #ac2925; color: #FFFFFF">取消</a>
        <a href="javascript:void(0)" id="confirmSignature" class="btn_upload table_btn_status"
           style="margin-left:10px; width: 20%">確認</a>
      </div><!--col-->
    </div><!--row-->
  </div><!--container-->
</div>


<div id="checkSignatureWindow" class="window">
  <div class="container" style="width:auto">
    <div class="row">
      <ol class="monitormenu">
        <li data-section="pm" class="active">
          <a href="javascript:void(0)">生管</a>
        </li>
        <li data-section="shopper">
          <a href="javascript:void(0)">採購</a>
        </li>
        <li data-section="manager">
          <a href="javascript:void(0)">總經理/董事長</a>
        </li>
      </ol>
      <div id="pm" style="margin-top: 10px" class="tabDetail">
        <div class="col-md-12 box_inputdata">
          <fieldset class="disabled">
            <div class="form-group" name="role">
              <nav>簽核人</nav>
              <span class="form-control labelText"></span>
            </div>
            <div class="form-group">
              <nav>通過</nav>
              <span class="form-control labelText" name="isPassed"></span>
            </div>
            <div class="form-group">
              <nav style="vertical-align: top;">意見</nav>
              <textarea name="note" class="form-control textareaSize" disabled="disabled" ></textarea>
            </div>
          </fieldset>
        </div><!--box_inputdata-->
      </div>
      <div id="shopper" style="display: none; margin-top: 10px" class="tabDetail">
        <div class="col-md-12 box_inputdata">
          <fieldset class="disabled">
            <div class="form-group" name="role">
              <nav>簽核人</nav>
              <span class="form-control labelText"></span>
            </div>
            <div class="form-group">
              <nav>通過</nav>
              <span class="form-control labelText" name="isPassed"></span>
            </div>
            <div class="form-group">
              <nav style="vertical-align: top;">意見</nav>
              <textarea name="note" class="form-control textareaSize" disabled="disabled"></textarea>
            </div>
          </fieldset>
        </div><!--box_inputdata-->
      </div>
      <div id="manager" style="display: none; margin-top: 10px" class="tabDetail">
        <div class="col-md-12 box_inputdata">
          <fieldset class="disabled">
            <div class="form-group" name="role">
              <nav>簽核人</nav>
              <span class="form-control labelText"></span>
            </div>
            <div class="form-group">
              <nav>通過</nav>
              <span class="form-control labelText" name="isPassed"></span>
            </div>
            <div class="form-group">
              <nav style="vertical-align: top;">意見</nav>
              <textarea name="note" class="form-control textareaSize" disabled="disabled"></textarea>
            </div>
          </fieldset>
        </div><!--box_inputdata-->
      </div>
    </div><!--row-->
  </div><!--container-->
</div>

<section id="detailTemplate" style="display: none">
  <table>
    <tr>
    </tr>
  </table>
</section>

<script type="text/x-kendo-template" id="contactDetailTemplate">
  <div class="col-md-12 box_inputdata contacts">
    <fieldset class="disabled">
      <div class="form-group">
        <nav id="contactHeader">聯絡人</nav>
        <%--        <span class="form-control labelText">#=data.contact.value#</span>--%>
        <%--        <input type="hidden" name="quoteValidDays" value="12">--%>
      </div>
    </fieldset>
    <span id='contactsContainer'>
      <div class="row">
      <div class="col-md-12 box_inputdata">
        <nav class="title">#=data.contact.value#</nav>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 box_inputdata">
        <fieldset>
          <div class="form-group col-md-6">
            <nav class="text-nowrap">Email</nav>
            <input type="text" name="contactEmail" class="form-control" disabled="disabled" value="#=data.email.value#">
            <span class="errorMsg color_pink"></span>
          </div>
          <div class="form-group col-md-6">
            <nav class="contactEmailTitle text-nowrap">Phone</nav>
            <input type="text" name="contactPhone" class="form-control" disabled="disabled" value="#=data.phone.value#">
            <span class="errorMsg color_pink"></span>
          </div>
        </fieldset>
      </div><!---col-->
    </div>
    </span>
  </div>
</script>
</body>
</html>
