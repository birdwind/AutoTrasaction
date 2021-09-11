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

  </style>
  <script src="${webapps.contextPath}/scripts/buckleManagement/buckleInventoryForm.js"></script>
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
                    <button type="button" onclick="location='/page/buckle/buckleInventory/'"
                      class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white">
                      <i class="fa fa-plus"></i></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div>
                  <!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <br>
                    <div id="form" class="box-body">
                      <div class="col-md-12 box_inputdata">
                        <%-- <fieldset class="disabled">
                          <div class="form-group">
                           <nav>軸號</nav>
                           <span class="form-control labelText">buckle-001</span>
                           <input type='hidden'name="manufactureOrderNo" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>目前所在倉庫</nav>
                            <span class="form-control labelText">唯聖盤頭倉</span>
                           <input type='hidden'name="manufactureOrderNo" value="">
                           </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>目前軸長</nav>
                            <span class="form-control labelText">123.4 Y</span>
                           <input type='hidden' name="warpYarnBatchNo" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>經紗批號</nav>
                           <span class="form-control labelText">batch-002</span>
                           <input type='hidden' name="nowStation3" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>關聯工單</nav>
                            <span class="form-control labelText">mo-20191119-2</span>
                           <input type='hidden' name="buckleAmount" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>關聯訂單</nav>
                          <span class="form-control labelText">ord-20190918-2</span>
                           <input type='hidden' name="nowStation1" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>最後經手人</nav>
                           <span class="form-control labelText">李廣為</span>
                           <input type='hidden' name="nowStation2" value="">
                          </div>
                        </fieldset>
                        
                         --%>
                      </div>
                    </div>
                    <!--#form-->
                    <div class="box box-success" style="padding-bottom:40px">
                      <br>
                      <section class="content tabMenu">
                        <div class="row">
                          <div class="col-md-12">
                            <ol class="monitormenu">
                              <li data-section="inventTotal" id="import" class="active">
                                <a href="javascript:void(0)">入庫紀錄</a>
                              </li>
                              <li data-section="inventory" id="export">
                                <a href="javascript:void(0)">出庫紀錄</a>
                              </li>
                            </ol>
                          </div><!-- col-->
                        </div><!-- row-->
                      </section><!-- content-->
                      <div id="importGrid">
                      </div>
                      <div id="exportGrid" style="display:none">
                      </div>
                      <!--#form-->
                      <%-- <table class="table bg_white table-striped table-bordered table-hover warp-tag">
                        <thead class="thead-light">
                          <ul class="nav nav-pills mb-3 pills-tab clothTab">
                            <li class="nav-item active dan">
                              <a href="javascript:void(0)" class="nav-link active in" id="warp-tab" data-toggle="pill"
                                aria-selected="true">歷史紀錄</a>
                            </li>
                          </ul>
                          <tr>
                            <th scope="col" style="width:10%;text-align:center;line-height:40px"><span
                                class="yarnNo">入/出庫</span>
                            </th>
                            <th scope="col" style="width:15%;text-align:center;line-height:40px"><span
                                class="yarnSpec">入/出庫倉庫</span>
                            </th>
                            <th scope="col" style="width:15%;text-align:center;line-height:40px"><span
                                class="yarnColors">入/出庫時間</span>
                            </th>
                            <th scope="col" style="width:8%;text-align:center;line-height:40px"><span
                                class="yarnColors">軸長</span>
                            </th>
                            <th scope="col" style="width:15%;text-align:center;line-height:40px"><span
                                class="yarnQuantity">經紗批號</span>
                            </th>
                            <th scope="col" style="width:15%;text-align:center;line-height:40px"><span
                                class="yardPerUnit">關聯工單</span>
                            </th>
                            <th scope="col" style="width:15%;text-align:center;line-height:40px"><span
                                class="yardPerUnit2">關聯訂單</span>
                            </th>
                            <th scope="col" style="text-align:center;line-height:40px;width:8%">經手人</th>
                          </tr>
                          <tr>
                            <td style="text-align:center;line-height:40px;">入庫</td>
                            <td style="text-align:center;line-height:40px" name="yarnSpec" class="yarnSpec">唯聖盤頭倉</td>
                            <td style="text-align:center;line-height:40px">2019/10/01 12:30</td>
                            <td style="text-align:center;line-height:40px">234.1</td>
                            <td style="text-align:center;line-height:40px">batch-002</td>
                            <td style="text-align:center;line-height:40px;">MO-20190811-2</td>
                            <td style="text-align:center;line-height:40px;">OD-20190811-2</td>
                            <td style="text-align:center;line-height:40px;">吳華民</td>
                          </tr>
                          <tr>
                            <td style="text-align:center;line-height:40px;">出庫</td>
                            <td style="text-align:center;line-height:40px" name="yarnSpec" class="yarnSpec">唯聖盤頭倉</td>
                            <td style="text-align:center;line-height:40px">2019/09/10 17:20</td>
                            <td style="text-align:center;line-height:40px">345.6</td>
                            <td style="text-align:center;line-height:40px">batch-234</td>
                            <td style="text-align:center;line-height:40px;">MO-20190706-1</td>
                            <td style="text-align:center;line-height:40px;">OD-20190706-1</td>
                            <td style="text-align:center;line-height:40px;">許麗生</td>
                          </tr>
                        </thead>
                      </table> --%>
                      <!--table-->
                    </div>
                    <!--box-->
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
    </div>
  </div>
  </div>
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
