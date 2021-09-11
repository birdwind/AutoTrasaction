<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <script src="${webapps.contextPath}/scripts/buckleManagement/buckleForm.js"></script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
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
                    <button id="replyPage" type="button" onclick="" class="btn backBtn circleBtn white">
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
                    <!--box-body-->
                  </div>
                  <div id="buckleSituation" style="display:none">
                    <table class="table bg_white table-striped table-bordered table-hover weft-tag">
                      <thead class="thead-light">
                        <ul class="nav nav-pills mb-3 pills-tab clothTab">
                          <li class="nav-item active dan">
                            <a href="javascript:void(0)" class="nav-link active in" data-toggle="pill"
                              aria-selected="true">鋼筘現況</a>
                          </li>
                        </ul>
                      </thead>
                      <div class="box box-success" style="padding-bottom:40px">
                        <div id="buckleSituationForm" class="box-body" style="display:none">
                          <div class="col-md-12 box_inputdata">
                          </div>
                          <!--#form-->
                          <!--box-body-->
                        </div>
                      </div>
                    </table>
                  </div>
                  <!--table-->
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
  <div id="buckleSituationTemplate" style="display:none;">
    <fieldset class="disabled">
      <div class="form-group">
        <nav>BuckleCore.BuckleCoreNo</nav>
        <span class="form-control labelText"></span>
        <input type="hidden" name="buckleCoreNo" value="">
      </div>
    </fieldset>
  </div>
</body>

</html>
