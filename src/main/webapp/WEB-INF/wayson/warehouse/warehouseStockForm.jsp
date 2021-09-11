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
  <script src="${webapps.contextPath}/scripts/warehouse/stockForm.js"></script>
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
                      <%-- <div class="col-md-12 box_inputdata">
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>倉庫編號</nav>
                           <span class="form-control labelText">war-001</span>
                           <input type='hidden'name="manufactureOrderNo" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>倉庫分類</nav>
                            <span class="form-control labelText">經紗倉</span>
                           <input type='hidden'name="manufactureOrderNo" value="">
                           </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>所在公司</nav>
                            <span class="form-control labelText">唯聖紡織</span>
                           <input type='hidden' name="warpYarnBatchNo" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>倉庫名稱</nav>
                           <span class="form-control labelText">二樓唯倉</span>
                           <input type='hidden' name="nowStation3" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>當前庫存</nav>
                            <span class="form-control labelText">234.5件</span>
                           <input type='hidden' name="beamAmount" value="">
                          </div>
                        </fieldset> --%>
                    </div>
                  </div>
                  <!--#form-->
                  <ul id="client-treeview" class="sidebar-menu tree" data-widget="tree">
                    <div id="warpYarns" class="panel panel-primary" style="padding-bottom:20px;">
                      <li class="treeview">
                        <a href="javascript:void(0)">
                          <div class="k-header k-grid-toolbar">
                            <div class="col-sm-z col-xs-6 table_bar_box ">歷史庫存紀錄
                            </div>
                            <i class="k-icon k-i-arrow-60-down"
                              style="float:right;margin-right:5px;height:25px ;width:50px"></i>
                          </div>
                        </a>
                        <ul class="treeview-menu">
                          <div class="box-body">
                            <ul class="nav nav-pills mb-3 pills-tab clothTab">
                              <li class="nav-item active dan">
                                <a href="javascript:void(0)" class="nav-link active in" id="yarn" data-toggle="pill"
                                  aria-selected="true">紗倉</a>
                              </li>
                              <li class="nav-item ">
                                <a href="javascript:void(0)" class="nav-link active in" id="beam" data-toggle="pill"
                                  aria-selected="true">盤頭倉</a>
                              </li>
                              <li class="nav-item ">
                                <a href="javascript:void(0)" class="nav-link active in" id="buckle" data-toggle="pill"
                                  aria-selected="true">鋼筘倉</a>
                              </li>
                              <li class="nav-item ">
                                <a href="javascript:void(0)" class="nav-link active in" id="cloth" data-toggle="pill"
                                  aria-selected="true">胚布倉</a>
                              </li>
                            </ul>
                            <!--box-body-->
                            <div class="box box-success" style="padding-bottom:40px">
                              <br>
                              <ul class="nav nav-pills mb-3 pills-tab clothTab">
                                <li class="nav-item " style="float:right;">
                                  <a href="javascript:void(0)" class="nav-link active in" id="export" data-toggle="pill"
                                    aria-selected="true">出庫</a>
                                </li>
                                <li class="nav-item active dan" style="float:right;">
                                  <a href="javascript:void(0)" class="nav-link active in" id="import" data-toggle="pill"
                                    aria-selected="true">入庫</a>
                                </li>
                              </ul>
                              <div id="form2" style="border-color: #3399ff;">

                              </div>
                              <!--#form-->



                              <%-- <tr>
                                <th scope="col" style="width:10%;text-align:center;line-height:40px"><span class="yarnNo">入/出庫時間</span> 
                                </th>
                                <th scope="col" style="width:15%;text-align:center;line-height:40px"><span class="yarnSpec" >入/出庫數量</span>
                                </th>                              
                                <th scope="col" style="width:8%;text-align:center;line-height:40px"><span class="yarnColors">經手人</span>
                                </th>
                                <th scope="col" style="width:15%;text-align:center;line-height:40px" ><span class="yardPerUnit">關聯工單</span>
                                </th>
                                <th scope="col" style="width:15%;text-align:center;line-height:40px" ><span class="yardPerUnit2">關聯訂單</span>
                                </th>
                                <th scope="col" style="width:15%;text-align:center;line-height:40px"><span class="yarnQuantity">來源工作站</span>
                                </th>
                                <th scope="col" style="width:15%;text-align:center;line-height:40px"><span class="yarnQuantity">入/出庫</span>
                                </th>
                                <th scope="col" style="width:15%;text-align:center;line-height:40px"><span class="yarnQuantity">紗號</span>
                                </th>
                                <th scope="col" style="width:15%;text-align:center;line-height:40px"><span class="yarnQuantity">紗批號</span>
                              </tr>
                               <tr>
                              <td style="text-align:center;line-height:40px">2019/10/01 12:30</td>
                                <td style="text-align:center;line-height:40px">234.1</td>
                                <td style="text-align:center;line-height:40px;">吳華民</td>
                                <td style="text-align:center;line-height:40px;">MO-20190811-2</td>
                                <td style="text-align:center;line-height:40px;">OD-20190811-2</td>
                                <td style="text-align:center;line-height:40px" name="yarnSpec" class="yarnSpec">wr-011</td>
                               <td style="text-align:center;line-height:40px;">入庫</td>
                                <td style="text-align:center;line-height:40px">batch111-0112</td>                                
                                <td style="text-align:center;line-height:40px">batch-002</td>
                              </tr> --%>

                              <!--table-->
                            </div>
                            <!--box-->


                          </div>
                        </ul>
                      </li>
                    </div>
                  </ul>


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
