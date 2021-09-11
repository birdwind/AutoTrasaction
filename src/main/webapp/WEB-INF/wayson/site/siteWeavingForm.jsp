<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<script src="/scripts/site/weavingForm.js"></script>
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
                <li><a href="javascript:void(0)">委外詢價</a></li>
                <li class="active">委外詢價新增<</li> 
              </ol>
            </section><!-- content-header -->
            <section class="content">
              <div class="row">
                <div class="col-md-12">
                  <div class="box_features">
                    <i class="fa fa-angle-double-left left" style="display:none; margin-right: 20px;"></i>
                    <button type="button" onclick="window.history.back()"class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white">
                    <i class="fa fa-floppy-o"></i>
                    </button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                  <br>
                  <div id="form" class="box-body">
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>機台編號<span class="color_pink">*</span></nav>
                            <input type="text" name="machineNo" class="form-control">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>工單編號<span class="color_pink">*</span></nav>
                            <input type="text" name="workOrderNo" class="form-control">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>訂單編號<span class="color_pink">*</span></nav>
                            <input type="text" name="orderNo" class="form-control">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                        <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>擋車人員<span class="color_pink">*</span></nav>
                            <input type="text" name="blocker" class="form-control">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                        <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>當班主管<span class="color_pink">*</span></nav>
                            <input type="text" name="supervisor" class="form-control">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>盤頭編號<span class="color_pink">*</span></nav>
                            <input type="text" name="beamNo" class="form-control">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>上機時間<span class="color_pink">*</span></nav>
                            <input type="text" name="installingTime" data-picker='datetime' class="form-control">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>緯紗批號<span class="color_pink">*</span></nav>
                            <input type="text" name="warpWeftNo" class="form-control number">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-md-12 box_inputdata">
                      <fieldset>
                        <div class="form-group">
                          <nav style="vertical-align: top;">備註</nav>
                          <textarea class="form-control textareaSize "></textarea>
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

</body>
</html>
