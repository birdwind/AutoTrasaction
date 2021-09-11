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
    .fa.fa-star, .fa-star-o {
      display: inline;
      cursor: default;
    }

    .fa-pencil {
      font-size: 20px;
    }

    #listbox {
      margin: 10px;
      padding-top: 30px;
    }

    #listbox .row > div {
      padding: 0px;
      text-align: center;
    }

    #listbox .row > .confirmBtn {
      text-align: right;
    }

    #listbox .k-listbox {
      width: 236px;
      height: 310px;
      margin-bottom: 30px;
    }

    #listbox .k-item {
      cursor: move;
    }

    #listbox .k-item:hover,
    #listbox .k-item.k-state-selected {
      color: white;
      background-color: #74b4f5;
    }

    #listbox .k-button {
      background-color: #3399ff;
      color: white;
    }

    #listbox .k-button.k-state-disabled {
      background-color: #74b0ec;
    }
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
  <script src="${webapps.contextPath}/scripts/orderManagement/clothOrderForm.js.js"></script>

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

<script id="clothOrderToolsTemplate" type="text/x-kendo-template">
  <div style="margin-top: 20px;">
    <a href="javascript:void(0)" id="resumeButton" class="btn_upload table_btn_status" style="margin-left:10px; float: right;">生產履歷</a>
    <a href="javascript:void(0)" id="analysisButton" class="btn_upload table_btn_status" style="margin-left:10px; float: right;">成本分析</a>
    <a href="javascript:void(0)" id="backButton" class="btn_upload table_btn_status" style="margin-left:10px; float: right;">返回</a>
    <div class="box box-success" style="margin-top: 20px; float: right;"></div>
  </div>

</script>
</body>
</html>
