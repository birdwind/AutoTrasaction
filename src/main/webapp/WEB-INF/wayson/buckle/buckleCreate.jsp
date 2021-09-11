<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<style>

table tr:nth-child(odd){
  background-color: #f9f9f9!important;
}
table tr:nth-child(even){
  background-color: #ffffff!important;
}
</style>
<script src="${webapps.contextPath}/scripts/beam/beamCreate.js"></script>
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
                    <button type="button" onclick="location='/page/cloth/specification'"class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white"></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                  <br>
                    <div id="form" class="box-body">
                    </div><!--#form-->
                    <div class="box-body">
                      <div class="row">
                        <div class="col-md-6 box_inputdata">
                            <div class="form-group">
                            <label>檔案上傳</label>
                            <div class="uploadbox ">
                              <label for="upload" class="table_btn_status btn_upload inline ">
                                <a class="table_btn_status btn_upload inline" > 多檔案上傳</a>
                                <span class="inline"> 檔案累計勿超過10MB(單檔1MB)最多10個</span><br><div style="float:right;"><span id="sizeLabel">目前大小:</span><span id="sizeTotal">0.000MB</span></div>
                                <input id="upload" type="file" name="files" accept="image/gif, image/jpeg, image/png, application/pdf" multiple style="display:none" />
                              </label>
                              <div class="clearfix"></div>
                              
                            </div>
                          </div>
                        </div>
                    </div><!--box-body-->
                     <div class="box box-success" style="padding-bottom:40px">
                     <br>
                    <div id="form2" class="box-body" style="display:none">
                      <div class="col-md-12 box_inputdata">
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav></nav>
                           <span class="form-control labelText"></span>
                           <input type='hidden' name="manufactureOrderNo" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav></nav>
                           <span class="form-control labelText"></span>
                           <input type='hidden' name="clothOrderNo" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav></nav>
                           <span class="form-control labelText"></span>
                           <input type='hidden' name="warpYarnBatchNo" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav></nav>
                           <span class="form-control labelText"></span>
                           <input type='hidden' name="beamAmount" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav></nav>
                           <span class="form-control labelText"></span>
                           <input type='hidden' name="nowStation" value="">
                          </div>
                        </fieldset>
                      </div>
                    </div><!--#form-->
                  </div><!--box-->
                </div><!--col-->
              </div><!--row-->
            </section><!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
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
