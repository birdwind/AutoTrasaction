<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <link rel="stylesheet" href="/styles/windowUI.css" />
  <script>
    var uuid = "${uuid}";
    var station = "${station}";

  </script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <script src="${webapps.contextPath}/scripts/manufacture/schedule/detail/mfrDraftingScheduleForm.js"></script>

</head>

<body class="hold-transition skin-green-light sidebar-mini">
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
                    <button type="button" onclick="window.history.back()" class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white"><i
                        class="fa fa-floppy-o"></i></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div>
                  <!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <div id="form" class="box-body">
                      <!--#form-->
                    </div>
                    <div id="tableExistArea" class="box-body" style="display:none">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="panel panel-primary">
                            <div class="panel-heading">已完成穿綜細部排程</div>
                            <div class="table-responsive">
                              <table id="tableExist" class="table bg_white table-striped table-bordered table-hover">
                                <thead class="thead-light"></thead>
                                <tbody></tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="tableArea" class="box-body" style="display:none">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="panel panel-primary">
                            <div class="panel-heading">未完成穿綜細部排程</div>
                            <div class="table-responsive">
                              <table id="table" class="table bg_white table-striped table-bordered table-hover">
                                <thead class="thead-light"></thead>
                                <tbody></tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--#table-->
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
  <script type="text/x-kendo-template" id="tableExistTheadTemplate">
    <tr>
      <th scope="col">#=data.beamCoreNo.title#</th>
      <th scope="col">#=data.buckleCore.title#</th>
      <th scope="col">#=data.draftingStaff.title#</th>
      <th scope="col">#=data.actualStartDatetime.title#</th>
      <th scope="col">#=data.actualFinishDatetime.title#</th>
      <th scope="col">#=data.targetWarehouse.title#</th>
    </tr>
  </script>
  <script type="text/x-kendo-template" id="tableExistTbodyTemplate">
    #for(var item in data){#
    <tr>
      <td>
          <label>#=data[item].beamCoreNo#</label>
      </td>
      <td>
          <label>#=data[item].buckleCore#</label>
      </td>
      <td>
          <label>#=data[item].draftingStaff#</label>
      </td>
      <td>
          <label>#=data[item].actualStartDatetime#</label>          
      </td>
      <td>
          <label>#=data[item].actualFinishDatetime#</label>          
      </td>
      <td>
          <label>#=data[item].targetWarehouse#</label>          
      </td>      
    </tr>
  #}#
  </script>

  <script type="text/x-kendo-template" id="tableTheadTemplate">
    <tr>
      <th scope="col">#=data.beamCore.title#</th>
      <th scope="col">#=data.buckleCore.title#<span class="color_pink">*</span></th>
      <th scope="col">#=data.draftingStaff.title#</th>
      <th scope="col">#=data.actualStartDatetime.title#</th>
      <th scope="col">#=data.actualFinishDatetime.title#</th>
      <th scope="col">#=data.targetWarehouse.title#</th>
    </tr>
  </script>

  <script type="text/x-kendo-template" id="tableTbodyTemplate">
    <tr>
      <td>
            <input id="beamCore_#=data#" type="text" class="form-control" name="beamCore" value="" disabled="disabled">
            <input id="scheduleWarpingDetail_#=data#" type="hidden" name="scheduleWarpingDetail" value="">
            <span class="errorMsg color_pink"></span>
      </td>
      <td>
          <input id="buckleCore_#=data#" type="text" class="form-control" name="buckleCore" value="">
          <span class="errorMsg color_pink"></span>
      </td>
      <td>
          <input id="draftingStaff_#=data#" type="text" class="form-control" name="draftingStaff" value="">
          <span class="errorMsg color_pink"></span>
      </td>
      <td>
          <input id="actualStartDatetime_#=data#" type="text" class="form-control datetime" name="actualStartDatetime" value="">
          <span class="errorMsg color_pink"></span>          
      </td>
      <td>
          <input id="actualFinishDatetime_#=data#" type="text" class="form-control datetime" name="actualFinishDatetime" value="">
          <span class="errorMsg color_pink"></span>          
      </td>
      <td>
          <input id="targetWarehouse_#=data#" type="text" class="form-control" name="targetWarehouse" value="">
          <span class="errorMsg color_pink"></span>          
      </td>      
    </tr>
  </script>
</body>

</html>
