<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<script src="/scripts/site/warpingForm.js"></script>
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
                    <button id="save" type="button" class="btn btn-success circleBtn white" >
                    <i class="fa fa-floppy-o"></i>
                    </button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                  <br>
                    <div id="labelForm" class="box-body">
                    <div class="col-md-12 box_inputdata">
                      <fieldset class="disabled">
                        <div class="form-group">
                          <nav>工單編號</nav>
                          <span class="form-control labelText">beam-001</span>
                          <input type="hidden" name="yarnNo" value="N245">
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-md-12 box_inputdata">
                      <fieldset class="disabled">
                        <div class="form-group">
                          <nav>訂單編號</nav>
                          <span class="form-control labelText">ord-20190910</span>
                          <input type="hidden" name="yarnNo" value="N245">
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-md-12 box_inputdata">
                      <fieldset class="disabled">
                        <div class="form-group">
                          <nav>布號</nav>
                          <span class="form-control labelText">ws20191008-2</span>
                          <input type="hidden" name="yarnNo" value="N245">
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-md-12 box_inputdata">
                      <fieldset class="disabled">
                        <div class="form-group">
                          <nav>數量</nav>
                          <span class="form-control labelText">2000Y</span>
                          <input type="hidden" name="yarnNo" value="N245">
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-md-12 box_inputdata">
                      <fieldset class="disabled">
                        <div class="form-group">
                          <nav>預計進站時間</nav>
                          <span class="form-control labelText">2019/9/12</span>
                          <input type="hidden" name="yarnNo" value="N245">
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-md-12 box_inputdata">
                      <fieldset class="disabled">
                        <div class="form-group">
                          <nav>預計完成時間</nav>
                          <span class="form-control labelText">2019/9/13</span>
                          <input type="hidden" name="yarnNo" value="N245">
                        </div>
                      </fieldset>
                    </div>
                    <div class="col-md-12 box_inputdata">
                      <fieldset class="disabled">
                        <div class="form-group">
                          <nav style="vertical-align: top;">備註</nav>
                          <span class="form-control labelText textareaSize scrollbar">&nbsp;</span>
                        </div>
                      </fieldset>
                    </div>
                  </div><!--#labelForm-->
                  <div id="form" class="box-body">
                      <div class="col-md-12 box_inputdata">
                        <fieldset class="disabled">
                          <div class="form-group">
                            <nav>盤頭編號</nav>
                            <span class="form-control labelText">beam-001</span>
                            <input type="hidden" name="yarnNo" value="N245">
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>整經人員<span class="color_pink">*</span></nav>
                            <input type="text" name="importer" class="form-control">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                        <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>經紗批號<span class="color_pink">*</span></nav>
                            <input type="text" name="warpingNo" class="form-control">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                        <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>開始時間<span class="color_pink">*</span></nav>
                            <input type="text" name="satff" data-picker='datetime' class="form-control">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>完成時間<span class="color_pink">*</span></nav>
                            <input type="text" name="satff" data-picker='datetime' class="form-control">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>盤頭入倉<span class="color_pink">*</span></nav>
                            <input type="text" name="warehouse" class="form-control">
                            <span class="errorMsg color_pink"></span>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav>整經長度<span class="color_pink">*</span></nav>
                            <input type="text" name="satff" class="form-control number">
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
