<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <link rel="stylesheet" href="/styles/windowUI.css" />
  <script src="${webapps.contextPath}/scripts/buckleManagement/buckleUpdate.js"></script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
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
                    <button id="replyPage" type="button" onclick="" class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white"></button>
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
                        <div class="col-md-6 box_inputdata">
                          <div class="form-group">
                            <label>檔案上傳</label>
                            <div class="uploadbox">
                              <a class="table_btn_status btn_upload inline" href="javascript:void(0)">多檔案上傳</a><span
                                class="inline"> 檔案累計勿超過10MB</span>
                              <div class="clearfix"></div>
                              <span class="btn_uploadfile divinlineblock">原料紗圖片一(5kb)
                                <a href="javascript:void(0)"><i class="fa fa-times"></i></a>
                              </span>
                              <span class="btn_uploadfile divinlineblock">原料紗圖片二(5kb)
                                <a href="javascript:void(0)"><i class="fa fa-times"></i></a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--row-->
                      <hr>
                      <div class="box-body">
                        <div class="col-md-12 box_inputdata">
                          <fieldset>
                            <div class="form-group">
                              <nav>盤頭現況</nav>
                            </div>
                          </fieldset>
                        </div>
                        <div class="col-md-12 box_inputdata">
                          <fieldset>
                            <div class="form-group">
                              <nav name="manufactureOrderCoreNoTitle"></nav>
                              <label name="manufactureOrderCoreNo"></label>
                            </div>
                          </fieldset>
                        </div>
                        <div class="col-md-12 box_inputdata">
                          <fieldset>
                            <div class="form-group">
                              <nav name="clothOrderCoreNoTitle"></nav>
                              <label name="clothOrderCoreNo"></label>
                            </div>
                          </fieldset>
                        </div>
                        <div class="col-md-12 box_inputdata">
                          <fieldset>
                            <div class="form-group">
                              <nav name="batchNoTitle"></nav>
                              <label name="batchNo"></label>
                            </div>
                          </fieldset>
                        </div>
                        <div class="col-md-12 box_inputdata">
                          <fieldset>
                            <div class="form-group">
                              <nav name="stockTitle"></nav>
                              <label name="stock"></label>
                            </div>
                          </fieldset>
                        </div>
                        <div class="col-md-12 box_inputdata">
                          <fieldset>
                            <div class="form-group">
                              <nav name="currentLocationTitle"></nav>
                              <label name="currentLocation"></label>
                            </div>
                          </fieldset>
                        </div>
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
</body>

</html>