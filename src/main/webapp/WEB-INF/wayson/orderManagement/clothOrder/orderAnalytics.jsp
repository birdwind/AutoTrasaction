<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <script src="${webapps.contextPath}/scripts/orderManagement/orderAnalytics.js"></script>
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
                                  <th width="*%"><span class="purchasePriceTitle"></span></th>
                                  <th width="*%"><span class="extraFeeTitle"></span></th>
                                  <th width="*%"><span class="subtotalTitle"></span></th>
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
                                  <th width="*%"><span class="warpingStaffTitle"></span></th>
                                  <th width="*%"><span class="timeConsumingTitle"></span></th>
                                  <th width="*%"><span class="yieldTitle"></span></th>
                                  <th width="*%"><span class="warpingFinishShiftTitle"></span></th>
                                  <th width="*%"><span class="warpingSupervisorTitle"></span></th>
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
                                  <th width="*%"><span class="draftingDStaffTitle"></span></th>
                                  <th width="*%"><span class="timeConsumingTitle"></span></th>
                                  <th width="*%"><span class="draftingfinishShiftTitle"></span></th>
                                  <th width="*%"><span class="draftingSupervisorTitle"></span></th>
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
                                  <th width="*%"><span class="doffingStaffTitle"></span></th>
                                  <th width="*%"><span class="timeConsumingTitle"></span></th>
                                  <th width="*%"><span class="weavingMachineCoreNoTitle"></span></th>
                                  <th width="*%"><span class="yieldTitle"></span></th>
                                  <th width="*%"><span class="doffingShiftTitle"></span></th>
                                  <th width="*%"><span class="doffingSupervisorTitle"></span></th>
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
                                  <th width="*%"><span class="inspectionStaffTitle"></span></th>
                                  <th width="*%"><span class="timeConsumingTitle"></span></th>
                                  <th width="*%"><span class="weavingMachineCoreNoTitle"></span></th>
                                  <th width="*%"><span class="yieldTitle"></span></th>
                                  <th width="*%"><span class="inspectionShiftTitle"></span></th>
                                  <th width="*%"><span class="inspectionSupervisorTitle"></span></th>
                                  <th width="*%"><span class="eventScoreTitle"></span></th>
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
          <span name="purchasePrice"></span>
        </td>
        <td>
          <span name="extraFee"></span>
        </td>
        <td>
          <span name="subtotal"></span>
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
          <span name="warpingStaff"></span>
        </td>
        <td>
          <span name="timeConsuming"></span>
        </td>
        <td>
          <span name="yield"></span>
        </td>
        <td>
          <span name="warpingFinishShift"></span>
        </td>
        <td>
          <span name="warpingSupervisor"></span>
        </td>
      </tr>
    </table>
  </section>
  <section id="scheduleDrafingDetailsTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <span name="draftingDStaff"></span>
        </td>
        <td>
          <span name="timeConsuming"></span>
        </td>
        <td>
          <span name="draftingfinishShift"></span>
        </td>
        <td>
          <span name="draftingSupervisor"></span>
        </td>
      </tr>
    </table>
  </section>
  <section id="scheduleWeavingDetailsTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <span name="doffingStaff"></span>
        </td>
        <td>
          <span name="timeConsuming"></span>
        </td>
        <td>
          <span name="weavingMachineCoreNo"></span>
        </td>
        <td>
          <span name="yield"></span>
        </td>
        <td>
          <span name="doffingShift"></span>
        </td>
        <td>
          <span name="doffingSupervisor"></span>
        </td>
      </tr>
    </table>
  </section>
  <section id="scheduleInspectionDetailsTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <span name="inspectionStaff"></span>
        </td>
        <td>
          <span name="timeConsuming"></span>
        </td>
        <td>
          <span name="weavingMachineCoreNo"></span>
        </td>
        <td>
          <span name="yield"></span>
        </td>
        <td>
          <span name="inspectionShift"></span>
        </td>
        <td>
          <span name="inspectionSupervisor"></span>
        </td>
        <td>
          <span name="eventScore"></span>
        </td>
      </tr>
    </table>
  </section>
</body>

</html>
