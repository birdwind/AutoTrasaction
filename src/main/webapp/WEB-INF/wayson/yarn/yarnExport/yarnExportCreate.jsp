<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <script src="${webapps.contextPath}/scripts/yarn/yarnExportCreate.js"></script>
  <script>
    var uuid = "${uuid}";
  </script>
</head>

<body class="hold-transition skin-green-light sidebar-mini">
  <span id="notification"></span>
  <!-- Content Wrapper. Contains page content -->
  <div id="grid"></div>
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
                    <button type="button" onclick="location='/page/yarn/export/'" class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white"></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div>
                  <!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <div id="form" class="box-body">
                    </div>
                    <!--#form-->
                    <div id="fileupload" class="box-body" style="display:none;">
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">

                            <a href="javascript:void(0)" class="table_btn_status btn_upload inline">多檔上傳</a>
                            <span class="inline"> 檔案累計勿超過10MB</span>

                            <input type="file" name="" style="display:none;">
                          </div>
                          <!--form-group-->
                        </fieldset>
                      </div>
                    </div>
                    <!--#fileupload-->
                    <div class="box-body">
                      <div class="row">
                        <%-- <div class="col-md-6 box_inputdata">
                          <div class="form-group">
                            <label>檔案上傳</label>
                            <div class="uploadbox">
                              <a class="table_btn_status btn_upload inline" href="javascript:void(0)">多檔案上傳</a><span class="inline"> 檔案累計勿超過10MB</span>
                              <div class="clearfix"></div>
                              <span class="btn_uploadfile divinlineblock">原料紗圖片一(5kb)
                                <a href="javascript:void(0)"><i class="fa fa-times"></i></a>
                              </span>
                              <span class="btn_uploadfile divinlineblock">原料紗圖片二(5kb)
                                <a href="javascript:void(0)"><i class="fa fa-times"></i></a>
                              </span>
                            </div>
                          </div>
                        </div> --%>
                      </div>
                      <!--row-->
                      <div class="row">
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <div class="table_bar">
                              <div class="col-sm-4 col-xs-6 table_bar_box">
                                <a href="javascript:void(0)" id="addOutbound" class="btn"><i class="fa fa-plus"></i></a>
                              </div>
                            </div>
                            <!--table_bar-->
                            <script id="template" type="text/x-kendo-template">
                              <span class="#: noInventory ? 'k-state-disabled': ''#">
                                 #: name #
                              </span>
                              </script>
                            <table id="outbound" class="table bg_white table-striped table-bordered table-hover">
                              <thead class="thead-light">
                                <tr>
                                  <th width="10%"><span class="yarnImportDetailTitle"></span></th>
                                  <th width="5%"><span class="exportAmountTitle"></span></th>
                                  <th width="5%"><span></span></th>
                                  <th width="20%"><span class="isTransferTitle"></span></th>
                                  <th width="5%"><span class="warpWeftTitle"></span></th>
                                  <th width="*"><span class="targetStationTitle"></span></th>
                                  <th width="*"><span class="targetOrderTitle"></span></th>
                                  <th width="5%">刪除</th>
                                </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                            <!--table-->

                          </div>
                          <!--table-responsive-->
                        </div>
                        <!--col-->
                      </div>
                      <!--row-->
                    </div>
                    <!--box-body-->
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
  <section id="outboundTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <div class="form-group">
            <input type="text" class="form-control" name="gridYarnImportDetail" required>
            <span class="errorMsg color_pink"></span>
          </div>
        </td>
        <td class="form-inline">
          <div class="form-group">
            <input type="text" class="form-control number" name="gridAmount" required>
            <span class="errorMsg color_pink"></span>
          </div>
        </td>
        <td class="form-inline">
          <div class="form-group">
            <input type="text" class="form-control number" name="gridUnit" required>
            <span class="errorMsg color_pink"></span>
          </div>
        </td>
        <td class="form-inline">
          <div class="form-group">
            <input type="checkbox" name="transferWarehouse" onchange="warehouseControl(this.id);">
            <input type="text" class="form-control number" name="gridWarehouse">
            <span class="errorMsg color_pink"></span>
          </div>
        </td>
        <td>
          <div class="form-group">
            <input type="text" class="form-control number" name="gridWarpWeft" required>
            <span class="errorMsg color_pink"></span>
          </div>
        </td>
        <td>
          <div class="form-group">
            <input type="text" class="form-control number" name="gridTargetStation">
            <span class="errorMsg color_pink"></span>
          </div>
        </td>
        <td>
          <div class="form-group">
            <input type="text" class="form-control number" name="gridTargetOrder">
            <span class="errorMsg color_pink"></span>
          </div>
        </td>
        <td class="center">
          <a href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle">
            <i class="fa fa-times"></i>
          </a>
          <input type="hidden" class="form-control pull-right" name="gridyarnExportDetailUuid">
          <input type="hidden" class="form-control pull-right" name="gridyarnExportCore">
        </td>
      </tr>
    </table>
  </section>
</body>

</html>