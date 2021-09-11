<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<script src="${webapps.contextPath}/scripts/yarn/yarnImportCreate.js"></script>
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
                    <button type="button" onclick="location='/page/yarn/import/'"class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white"></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <div id="form" class="box-body">
                    </div><!--#form-->
                    <div id="fileupload" class="box-body" style="display:none;">
                        <div class="col-md-12 box_inputdata">
                          <fieldset>
                            <div class="form-group">
                              
                                <a href="javascript:void(0)" class="table_btn_status btn_upload inline">多檔上傳</a>
                                <span class="inline"> 檔案累計勿超過10MB</span>
                              
                              <input type="file" name="" style="display:none;">
                            </div><!--form-group-->
                          </fieldset>
                        </div>
                    </div><!--#fileupload-->
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
                      </div><!--row-->
                        <div class="row" >
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <div class="table_bar">
                              <div class="col-sm-4 col-xs-6 table_bar_box">	
                                <a href="javascript:void(0)" id="addInbound" class="btn"><i class="fa fa-plus"></i></a>
                              </div>
                            </div><!--table_bar-->
                            <table id="inbound" class="table bg_white table-striped table-bordered table-hover">
                              <thead class="thead-light">
                              <tr>
                                <th style="width:10%"><span class="yarnPurchaseCoreTitle"></span></th>
                                <th style="width:10%"><span class="batchNoTitle"></span></th>
                                <th style="width:150px"><span class="yarnCoreTitle"></span></th>
                                <th style="width:7%"><span class="importAmountTitle"></span></th>
                                <th style="width:5%"></th>
                                <th style="width:8%"><span class="yarnSTitle"></span></th>
                                <th style="width:8%"><span class="yarnDTitle"></span></th>
                                <th style="width:8%"><span class="warpWeftTitle"></span></th>
                                <th style="width:12%"><span class="targetWarehouseTitle"></span></th>
                                <th style="width:9%"><span class="actualPriceTitle"></span></th>
                                <th style="width:5%">刪除</th>
                              </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table><!--table-->
                            
                          </div><!--table-responsive-->
                        </div><!--col-->
                      </div><!--row-->
                    </div><!--box-body-->
                  </div><!--box-->
                </div><!--col-->
              </div><!--row-->
            </section><!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
<section id="inboundTemplate" style="display:none;">
<table>
<tr>
  <td>
    <input type="text" class="form-control pull-right" name="yarnPurchase">
    <input type="hidden" name="yarnPurchaseDetail" >
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <span style="vertical-align:middle;"></span>
    <input type="text" class="form-control" name="batchNo" maxlength="45">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control" name="yarnCore" style="display:none">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="importAmount">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="importUnit">
  </td>
  <td>
    <input type="text" class="form-control number" name="yarnS">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="yarnD">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="warpWeft">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control" name="targetWarehouse">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="actualPrice">
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
