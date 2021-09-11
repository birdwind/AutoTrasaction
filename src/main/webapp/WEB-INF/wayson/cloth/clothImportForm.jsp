<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <style>
    table tr:nth-child(odd) {
      background-color: #f9f9f9 !important;
    }

    table tr:nth-child(even) {
      background-color: #ffffff !important;
    }

    .table_bar_box {
      display: inline-block;
      width: 110px;
      margin: 0 -15px;
      font-size: larger;
    }

    .k-header.k-grid-toolbar {
      background-color: #337ab7;
      border-color: #337ab7;
    }

  </style>
  <script src="${webapps.contextPath}/scripts/cloth/clothImportForm.js"></script>
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
                    <button type="button" onclick="location='/page/warehouse/Stock/'"
                      class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div>
                  <!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <br>

                    <div id="form" class="box-body">
                    </div>
                  </div>
                  <!--#form-->
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
  <div id="toolbar" style="display:none;">
    <div class="col-sm-4 col-xs-6 table_bar_box">
      <a href="/page/event/beamEvent/form" class="btn"><i class="fa fa-plus"></i></a>
      <button id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></button>
    </div>
  </div>
  </div>
  <!--toolbar-->
  <section id="ingriTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <input type="text" class="form-control pull-right" name="cellName">
          <span class="errorMsg color_pink"></span>
        </td>
        <td>
          <input type="text" class="form-control number" name="percentage">
          <span class="errorMsg color_pink"></span>
        </td>
        <td class="center">
          <a href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle">
            <i class="fa fa-times"></i>
          </a>
        </td>
      </tr>
    </table>
  </section>
</body>

</html>
