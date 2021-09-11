<%--
  Created by IntelliJ IDEA.
  User: birdwind
  Date: 2019/12/19
  Time: 3:01 下午
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
  <script src="${webapps.contextPath}/scripts/devManagement/module.js"></script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>

</head>
<body class="hold-transition skin-green-light sidebar-mini">
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box-body no-padding">
          <section class="content-header">
            <%--            <input type="text" id="chatlink" style="display:none;">--%>
            <ol id="breadcrumb" class="breadcrumb">
              <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
              <li><a href="javascript:void(0)"></a></li>
              <li class="active"></li>
            </ol>
          </section>

          <div id="grid"></div>
          <%-- When using Checkbox selection of kendo grid,
                     "div" is the only tag that triggers default effects well.  --%>
        </div>
        <!-- box-body-->
      </div>
      <!-- col-->
    </div>
    <!-- row-->
  </section>
  <!-- content-->
</div>
<!-- content-wrapper-->

<div id="toolbar" style="display:none;">
  <div class="col-sm-4 col-xs-6 table_bar_box">
    <a href="javascript:void(0)" id="addRow" class="btn addbtn"><i class="fa fa-plus"></i></a>
    <a href="javascript:void(0)" id="delete" class="btn delete" style="display: none"><i class="fa fa-trash"></i></a>
  </div>
</div>
</div><!--toolbar-->

<div id="listbox">
  <div class="container" style="width:auto">
    <div class="row title">
      <div class="col-sm-6">
        <b></b>
      </div><!--col-->
      <div class="col-sm-6">
        <b></b>
      </div><!--col-->
    </div><!--row-->
    <div class="row">
      <div class="col-sm-12 list">
        <select id="current">
        </select>
        <select id="available"></select>
      </div><!--col-->
    </div><!--row-->
    <div class="row">
      <div class="col-sm-12 confirmBtn">
        <button type="button" class="btn btn-success circleBtn white">
          <i class="fa fa-floppy-o"></i>
        </button>
      </div><!--col-->
      <%-- <div class="col-sm-6 cancelBtn">
        <button type="button" class="btn backBtn circleBtn white" >
          <i class="fa fa-times"></i>
        </button>
      </div><!--col--> --%>
    </div><!--row-->
  </div><!--container-->
</div>
<span id="notification"></span>
</body>
</html>
