<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<script src="${webapps.contextPath}/scripts/yarn/yarnQualityCreate.js"></script>
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
