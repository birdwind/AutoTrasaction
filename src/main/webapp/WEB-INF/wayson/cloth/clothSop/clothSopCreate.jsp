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
<script src="${webapps.contextPath}/scripts/cloth/clothSopCreate.js"></script>
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
                    <button type="button" onclick="location='/page/cloth/weaving/sop'"
                      class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white"></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div>
                  <!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <br>
                    <div id="form" class="box-body">
                    </div>
                    <!--#form-->
                    <div class="box-body">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <div class="box box-success">

                            </div>
                            <!--table_bar-->
                            <table id="secondTable" class="table bg_white table-striped table-bordered table-hover">
                              <thead class="thead-light">
                                <tr>
                                  <th scope="col" style="width:20%;line-height:40px"><span>梭別</span>
                                  </th>
                                  <%-- <th scope="col" style="width:20%;text-align:left;line-height:40px"><span >1</span>
                                  </th> --%>
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
<section id="addTemplate" style="display:none;">
<table>
  <tr>
    <th scope="col" style="width:20%;text-align:left;line-height:40px">
    <span class="title" id="addSpray">新增副噴</span>
    <a href="javascript:void(0)"  id="addSprayBtn" class="btn addItem"><i class="fa fa-plus"></i></a>
    </th>
  </tr>
</table>
</section>
<section id="addItem" style="display:none;">
<table>
    <tr>
    <th scope="col" style="width:20%;text-align:left;line-height:40px">
      <span  class="title" id="spray1">副噴1</span><a href="javascript:void(0)" class="btn delItem" style="display:none"><i class="fa fa-times"></i></a>
    </th>
  </tr>
</table>
</section>
<section id="sopTemplate" style="display:none;">
<table>
  <tr>
    <th scope="col" style="width:20%;text-align:left;line-height:40px">
      <span  class="title">梭別</span>
    </th>
  </tr>
</table>
</section>
<section id="labelTemplate" style="display:none;">
<table>
  <tr>
    <th scope="col" style="width:20%;text-align:left;line-height:40px">
      <span  class="title">梭別</span>
    </th>
  </tr>
</table>
</section>
<section id="textareaTemplate" style="display:none;">
<table>
  <tr>
    <th scope="col" style="width:20%;text-align:left;line-height:40px">
      <span  class="title"></span>
    </th>
  </tr>
</table>
</section>
</body>

</html>
