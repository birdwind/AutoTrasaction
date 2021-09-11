<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<script src="${webapps.contextPath}/scripts/yarn/yarnQualityForm.js"></script>
<script>
var uuid = "${uuid}";
</script>
<style>
  input [name = 'returnAmountKg'] {
    width:77%
  }
</style>
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
                <li><a href="/"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"><a href="/page/yarn/quality/control"></a></li> 
              </ol>
            </section><!-- content-header -->
            <section class="content">
              <div class="row">
                <div class="col-md-12">
                <div class="box_features">
                    <i class="fa fa-angle-double-left left" style="display:none; margin-right: 20px;"></i>
                    <button type="button" onclick="location='/page/yarn/quality/control'"class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white"></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <div id="form" class="box-body">
                    </div><!--#form-->

                   <%-- <div id="fileupload" class="box-body" style="display:none;">
                        <div class="col-md-12 box_inputdata">
                          <fieldset>
                            <div class="form-group">
                              
                                <a href="javascript:void(0)" class="table_btn_status btn_upload inline">多檔上傳</a>
                                <span class="inline"> 檔案累計勿超過10MB</span>
                              
                              <input type="file" name="" style="display:none;">
                            </div><!--form-group-->
                          </fieldset>
                        </div>
                    </div><!--#fileupload--> --%>
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
                      </div><!--row-->
                      </div><!--box-body-->
                       <%-- <c:if test="${id != ''}">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="col-md-12 text-right">
                            <a class="table_btn_status btn_lightblue" href="/page/yarn/ingredient/historyPrice/${id}">歷史紗價</a>
                            <a class="table_btn_status btn_lightyellow" href="/page/yarn/ingredient/historyKnot/${id}">歷史噴節點</a>
                            <a class="table_btn_status btn_lightpurple" href="/page/yarn/ingredient/historyCount/${id}">歷史丹/支數</a>
                            <a class="table_btn_status btn_lightgreen">使用此紗布種</a>
                          </div><!--col-->
                        </div><!--col-->
                      </div><!--row-->
                      </c:if>
                      
                    </div><!--box-body-->
                    
                  </div><!--box--> --%>
                  
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
