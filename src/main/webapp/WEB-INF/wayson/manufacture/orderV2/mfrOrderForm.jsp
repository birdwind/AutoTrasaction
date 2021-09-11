<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <link rel="stylesheet" href="/styles/windowUI.css" />
  <script src="${webapps.contextPath}/scripts/manufacture/orderV2/mfrOrderFormV2.js"></script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <style>
    .btn-success.circleBtn {
      font-size: 15px
    }
    #grid .errorMsg{
      margin-left:0px;
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
                    <button id="temp" type="button" class="btn btn-success circleBtn white">織布<br>規範</button>
                    <button id="save" type="button" class="btn btn-success circleBtn white">
                      <i class="fa fa-plus"></i></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div>
                  <!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <br>
                    <div id="form" class="box-body">
                    </div>
                    <!--#form-->
                  </div>
                </div>
              </div>
            </section>
            <!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
</body>

</html>
