<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <script src="${webapps.contextPath}/scripts/orderManagement/orderSchedule.js"></script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <script>
    var uuid = "${uuid}";
    var clothOrderDetailDeliverQuantityUuid = "${clothOrderDetailDeliverQuantityUuid}";
    var status = "${status}";
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
                    <!--row-->
                    <hr>
                    <div class="box-body">
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav name="clothNoTitle"></nav>
                            <label name="clothNo"></label>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">
                            <nav name="clothCoreGreySpecTitle"></nav>
                            <label name="clothCoreGreySpec"></label>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="panel panel-primary">
                          <div class="panel-heading">採購</div>
                          <div class="table-responsive">
                            <table id="yarnPurchaseDetails"
                              class="table bg_white table-striped table-bordered table-hover">
                              <thead class="thead-light">
                                <tr>
                                  <th width="*%"><span class="yarnNoTitle"></span></th>
                                  <th width="*%"><span class="yarnPurchaseNoTitle"></span></th>
                                  <th width="*%"><span class="supplierTitle"></span></th>
                                  <th width="*%"><span class="purchaseAmountTitle"></span></th>
                                  <th width="*%"><span class="warpWeftTitle"></span></th>
                                  <th width="*%"><span class="stockTitle"></span></th>
                                </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                            <!--table-->
                          </div>
                          <!--table-responsive-->
                        </div>
                      </div>
                      <!--col-->
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="panel panel-primary">
                          <div class="panel-heading">整經</div>
                          <div class="table-responsive">
                            <table id="scheduleWarpingDetails"
                              class="table bg_white table-striped table-bordered table-hover">
                              <thead class="thead-light">
                                <tr>
                                  <th width="*%"><span class="beamCoreNoTitle"></span></th>
                                  <th width="*%"><span class="beamLengthTitle"></span></th>
                                  <th width="*%"><span class="warpingStaffTitle"></span></th>
                                  <th width="*%"><span class="warpingSupervisorTitle"></span></th>
                                  <th width="*%"><span class="warpingFinishShiftTitle"></span></th>
                                </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                            <!--table-->
                          </div>
                          <!--table-responsive-->
                        </div>
                      </div>
                      <!--col-->
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="panel panel-primary">
                          <div class="panel-heading">穿綜</div>
                          <div class="table-responsive">
                            <table id="scheduleDrafingDetails"
                              class="table bg_white table-striped table-bordered table-hover">
                              <thead class="thead-light">
                                <tr>
                                  <th width="*%"><span class="buckleCoreNoTitle"></span></th>
                                  <th width="*%"><span class="beamCoreNoTitle"></span></th>
                                  <th width="*%"><span class="beamLengthTitle"></span></th>
                                  <th width="*%"><span class="draftingDStaffTitle"></span></th>
                                  <th width="*%"><span class="draftingSupervisorTitle"></span></th>
                                  <th width="*%"><span class="draftingfinishShiftTitle"></span></th>
                                </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                            <!--table-->
                          </div>
                          <!--table-responsive-->
                        </div>
                      </div>
                      <!--col-->
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="panel panel-primary">
                          <div class="panel-heading">織布</div>
                          <div class="table-responsive">
                            <table id="scheduleWeavingDetails"
                              class="table bg_white table-striped table-bordered table-hover">
                              <thead class="thead-light">
                                <tr>
                                  <th width="*%"><span class="weavingMachineCoreNoTitle"></span></th>
                                  <th width="*%"><span class="buckleCoreNoTitle"></span></th>
                                  <th width="*%"><span class="beamCoreNoTitle"></span></th>
                                  <th width="*%"><span class="beamLengthTitle"></span></th>
                                  <th width="*%"><span class="doffingStaffTitle"></span></th>
                                  <th width="*%"><span class="doffingSupervisorTitle"></span></th>
                                  <th width="*%"><span class="doffingShiftTitle"></span></th>
                                </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                            <!--table-->
                          </div>
                          <!--table-responsive-->
                        </div>
                      </div>
                      <!--col-->
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="panel panel-primary">
                          <div class="panel-heading">驗布</div>
                          <div class="table-responsive">
                            <table id="scheduleInspectionDetails"
                              class="table bg_white table-striped table-bordered table-hover">
                              <thead class="thead-light">
                                <tr>
                                  <th width="*%"><span class="inspectionMachineCoreNoTitle"></span></th>
                                  <th width="*%"><span class="weavingMachineCoreNoTitle"></span></th>
                                  <th width="*%"><span class="finalYardTitle"></span></th>
                                  <th width="*%"><span class="inspectionStaffTitle"></span></th>
                                  <th width="*%"><span class="inspectionSupervisorTitle"></span></th>
                                  <th width="*%"><span class="inspectionShiftTitle"></span></th>
                                </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                            <!--table-->
                          </div>
                          <!--table-responsive-->
                        </div>

                      </div>
                      <!--col-->
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="panel panel-primary">
                          <div class="panel-heading">出貨</div>
                          <div class="table-responsive">
                            <!-- <div class="box box-success"> -->
                            <table id="scheduleShipmentDetails"
                              class="table bg_white table-striped table-bordered table-hover">
                              <thead class="thead-light">
                                <tr>
                                  <th width="*%"><span class="totalShipmentAmountTitle"></span></th>
                                  <th width="*%"><span class="actualShipmentDatetimeTitle"></span></th>
                                  <th width="*%"><span class="shipmentStaffTitle"></span></th>
                                  <th width="*%"><span class="shipmentSupervisorTitle"></span></th>
                                </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                            <!--table-->
                            <!-- </div> -->
                          </div>
                          <!--table-responsive-->
                        </div>
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
  <section id="yarnPurchaseDetailsTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <span name="yarnNo"></span>
        </td>
        <td>
          <span name="yarnPurchaseNo"></span>
        </td>
        <td>
          <span name="supplier"></span>
        </td>
        <td>
          <span name="purchaseAmount"></span>
        </td>
        <td>
          <span name="warpWeft"></span>
        </td>
        <td>
          <span name="stock"></span>
        </td>
      </tr>
    </table>
  </section>
  <section id="scheduleWarpingDetailsTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <span name="beamCoreNo"></span>
        </td>
        <td>
          <span name="beamLength"></span>
        </td>
        <td>
          <span name="warpingStaff"></span>
        </td>
        <td>
          <span name="warpingSupervisor"></span>
        </td>
        <td>
          <span name="warpingFinishShift"></span>
        </td>
      </tr>
    </table>
  </section>
  <section id="scheduleDrafingDetailsTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <span name="buckleCoreNo"></span>
        </td>
        <td>
          <span name="beamCoreNo"></span>
        </td>
        <td>
          <span name="beamLength"></span>
        </td>
        <td>
          <span name="draftingDStaff"></span>
        </td>
        <td>
          <span name="draftingSupervisor"></span>
        </td>
        <td>
          <span name="draftingfinishShift"></span>
        </td>
      </tr>
    </table>
  </section>
  <section id="scheduleWeavingDetailsTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <span name="weavingMachineCoreNo"></span>
        </td>
        <td>
          <span name="buckleCoreNo"></span>
        </td>
        <td>
          <span name="beamCoreNo"></span>
        </td>
        <td>
          <span name="beamLength"></span>
        </td>
        <td>
          <span name="doffingStaff"></span>
        </td>
        <td>
          <span name="doffingSupervisor"></span>
        </td>
        <td>
          <span name="doffingShift"></span>
        </td>
      </tr>
    </table>
  </section>
  <section id="scheduleInspectionDetailsTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <span name="inspectionMachineCoreNo"></span>
        </td>
        <td>
          <span name="weavingMachineCoreNo"></span>
        </td>
        <td>
          <span name="finalYard"></span>
        </td>
        <td>
          <span name="inspectionStaff"></span>
        </td>
        <td>
          <span name="inspectionSupervisor"></span>
        </td>
        <td>
          <span name="inspectionShift"></span>
        </td>
      </tr>
    </table>
  </section>
  <section id="scheduleShipmentDetailsTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <span name="totalShipmentAmount"></span>
        </td>
        <td>
          <span name="actualShipmentDatetime"></span>
        </td>
        <td>
          <span name="shipmentStaff"></span>
        </td>
        <td>
          <span name="shipmentSupervisor"></span>
        </td>
      </tr>
    </table>
  </section>
</body>

</html>
