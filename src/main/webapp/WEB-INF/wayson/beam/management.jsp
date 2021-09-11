<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<style>
  .k-confirm .k-window-titlebar::before {
    content: '提示';
  }
  .k-confirm .k-window-titlebar .k-dialog-title {
  display:none;
  }
</style>
  <script src="${webapps.contextPath}/scripts/beam/beamGrid.js"></script>
 
</head>
<body class="hold-transition skin-green-light sidebar-mini">
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
                <li class="active"><a href="/page/beam/management"></a></li>
              </ol>
            </section>
            <section id="beam">
            </section>
            
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
      <div class="col-sm-4 col-xs-6 table_bar_box">
        <a href="/page/beam/management/form" class="btn"><i class="fa fa-plus"></i></a>
        <a href="javascript:void(0)" id="trashCan" class="btn" style="display:none"><i class="fa fa-trash-o"></i></a>
      </div>
      </div>
  </div><!--toolbar-->
<section id="confirmTemplate" style="display:none;">
  <section class="deleteIcon">
    <i class="fa fa-file-text-o">
      <i class="fa fa-times" ></i>
    </i>
    <div>
    <i class="fa fa-trash" ></i>
    </div>
  </section>
  <h2>確定刪除？</h2>
</section>
</body>
</html>
