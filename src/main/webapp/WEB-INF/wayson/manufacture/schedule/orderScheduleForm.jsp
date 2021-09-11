<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="/styles/windowUI.css"/>
  <script src="${webapps.contextPath}/scripts/manufacture/schedule/orderScheduleForm.js"></script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <style>
    .btn-success.circleBtn {
      font-size: 15px
    }

    .table {
      margin: 10px 0;
    }

    a.color_pink:hover,
    a.color_pink:focus {
      color: #ff2b66
    }
  </style>
  <script>
      var uuid = "${uuid}";
      var manufactureOrderUuid = "${manufactureOrderUuid}"
  </script>
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
                </div>
              </div>
            </div>
          </section><!--content-->
        </div><!-- box-body-->
      </div><!-- col-->
    </div><!-- row-->
  </section><!-- content-->
</div><!-- content-wrapper-->

<script type="text/x-kendo-template" id="chekboxWithInputTemplate">
  <label id=#=data#Checkbox" class="checkbox">
    <input type="checkbox" name="is_#=data#">
    <span class="checkmark"> </span>
  </label>
  <input type="text" name="#=data#" class="form-control number" value="" style="display: none; width: 82.5%;">

  <span class="errorMsg color_pink"></span>
</script>

</body>
</html>
