<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <link rel="stylesheet" href="/styles/windowUI.css" />
  <script>
    var uuid = "${uuid}";
  </script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <script src="${webapps.contextPath}/scripts/manufacture/schedule/mfrScheduleTable.js"></script>
  <style>
    .table {
      margin: 10px 0;
    }

    .table>tbody>tr>td {
      vertical-align: middle;
    }
  </style>
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
                <li><a href="#"><i class="fas fa-tachometer-alt"></i> Home</a></li>
                <li><a href="javascript:void(0)">排程</a></li>
                <li class="active">總覽</li>
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
                    <i class="fa fa-angle-double-right right"></i>
                  </div>
                  <!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <div id="form" class="box-body">
                    </div>
                    <!--#form-->
                    <div class="row" id="yarnPurchaseDetails">
                    </div>
                    <div class="row" id="stationTable">
                    </div>
                    <!--#@table-->
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
  <script type="text/x-kendo-template" id="yarnPurchaseDetailsTemplate">
    <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">採購</div>
          <div class="table-responsive">
            <table class="table bg_white table-striped table-bordered table-hover">
              <thead class="thead-light">
                <tr>
                  <th width="*%"><span>#=data.header.yarnNo.title#</span></th>
                  <th width="*%"><span>#=data.header.yarnPurchaseNo.title#</span></th>
                  <th width="*%"><span>#=data.header.purchaseAmount.title#</span></th>
                  <th width="*%"><span>#=data.header.supplier.title#</span></th>
                  <th width="*%"><span>#=data.header.expectArrivalTime.title#</span></th>
                </tr>
              </thead>
              <tbody>
                #for(i in data.contents){#
                      <tr>
                          <td>#=data.contents[i].yarnNo#</td>
                          <td>#=data.contents[i].yarnPurchaseNo#</td>
                          <td>#=data.contents[i].purchaseAmount#</td>
                          <td>#=data.contents[i].supplier#</td>
                          <td>#=data.contents[i].expectArrivalTime#</td>
                      </tr>
                    #}#
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </script>
  <script type="text/x-kendo-template" id="stationTemplate">
    <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">各站排程</div>
          <div class="table-responsive">
            <table class="table bg_white table-striped  table-hover">
              <tbody>
                <tr>
                  <td class="text-center bg_blue-l " width="10%">
                    <img src="/images/stop1.png" width="25" alt=""><br>
                    整經
                    #if(data.scheduleWarpingCore != null &&
                    data.scheduleWarpingCore.scheduleWarpingCoreStatus.value == false){#
                          <br><a class="table_btn_status btn-statusmenu-2" href="/page/manufacture/schedule/form/#=data.orderScheduleCore.clothOrderDetailDeliverQuantityUuid#/warping"> 編輯排程 </a>
                        #}#
                  </td>
                  <td>
                    #if(data.scheduleWarpingCore == null){#
                          <a class="table_btn_status btn-statusmenu-2" href="/page/manufacture/schedule/form/#=data.orderScheduleCore.clothOrderDetailDeliverQuantityUuid#/warping"> 排程 </a>
                        #}else{#
                          <ul class="list-group">
                              <li class="list-group-item"><b>#=data.scheduleWarpingCore.warpingFactory.title#: </b> #=data.scheduleWarpingCore.warpingFactory.value#</li>
                              <li class="list-group-item"><b>#=data.scheduleWarpingCore.expectStartTime.title#: </b> #=data.scheduleWarpingCore.expectStartTime.value#</li>
                              <li class="list-group-item"><b>#=data.scheduleWarpingCore.expectFinishTime.title#: </b> #=data.scheduleWarpingCore.expectFinishTime.value#</li>
                            </ul>
                        #}#
                  </td>
                </tr>
                <td class="text-center  td-oy">
                  <img src="/images/stop2.png" width="25" alt=""><br>
                  穿綜
                  #if(data.scheduleDraftingCore != null &&
                  data.scheduleDraftingCore.scheduleDraftingCoreStatus.value == false){#
                        <br><a class="table_btn_status btn-statusmenu-2" href="/page/manufacture/schedule/form/#=data.orderScheduleCore.clothOrderDetailDeliverQuantityUuid#/drafting"> 編輯排程 </a>
                      #}#
                </td>
                <td>
                  #if(data.scheduleDraftingCore == null){#
                          <a class="table_btn_status btn-statusmenu-2" href="/page/manufacture/schedule/form/#=data.orderScheduleCore.clothOrderDetailDeliverQuantityUuid#/drafting"> 排程 </a>
                        #}else{#
                          <ul class="list-group">
                              <ul class="list-group">
                                  <li class="list-group-item"><b>#=data.scheduleDraftingCore.draftingFactory.title#: </b> #=data.scheduleDraftingCore.draftingFactory.value#</li>
                                  <li class="list-group-item"><b>#=data.scheduleDraftingCore.expectStartTime.title#: </b> #=data.scheduleDraftingCore.expectStartTime.value#</li>
                                  <li class="list-group-item"><b>#=data.scheduleDraftingCore.expectFinishTime.title#: </b> #=data.scheduleDraftingCore.expectFinishTime.value#</li>
                                </ul>
                            </ul>
                        #}#
                </td>
                </tr>
                <tr>
                  <td class="text-center td-lg"><img src="/images/stop3.png" width="25" alt=""><br>
                    織布
                    #if(data.scheduleWeavingCore != null &&
                    data.scheduleWeavingCore.scheduleWeavingCoreStatus.value == false){#
                          <br><a class="table_btn_status btn-statusmenu-2" href="/page/manufacture/schedule/form/#=data.orderScheduleCore.clothOrderDetailDeliverQuantityUuid#/weaving"> 編輯排程 </a>
                        #}#
                  </td>
                  <td>
                    #if(data.scheduleWeavingCore == null){#
                            <a class="table_btn_status btn-statusmenu-2" href="/page/manufacture/schedule/form/#=data.orderScheduleCore.clothOrderDetailDeliverQuantityUuid#/weaving"> 排程 </a>
                          #}else{#
                            <ul class="list-group">
                                <ul class="list-group">
                                    <li class="list-group-item"><b>#=data.scheduleWeavingCore.weavingFactory.title#: </b> #=data.scheduleWeavingCore.weavingFactory.value#</li>
                                    <li class="list-group-item"><b>#=data.scheduleWeavingCore.expectStartTime.title#: </b> #=data.scheduleWeavingCore.expectStartTime.value#</li>
                                    <li class="list-group-item"><b>#=data.scheduleWeavingCore.expectFinishTime.title#: </b> #=data.scheduleWeavingCore.expectFinishTime.value#</li>
                                  </ul>
                              </ul>
                          #}#
                    </ul>
                  </td>
                <tr>
                  <td class="text-center td-bp"><img src="/images/stop4.png" width="25" alt=""><br>
                    驗布
                    #if(data.scheduleInspectionCore != null &&
                    data.scheduleInspectionCore.scheduleInspectionCoreStatus.value == false){#
                          <br><a class="table_btn_status btn-statusmenu-2" href="/page/manufacture/schedule/form/#=data.orderScheduleCore.clothOrderDetailDeliverQuantityUuid#/inspection"> 編輯排程 </a>
                        #}#
                  </td>
                  <td>
                    #if(data.scheduleInspectionCore == null){#
                            <a class="table_btn_status btn-statusmenu-2" href="/page/manufacture/schedule/form/#=data.orderScheduleCore.clothOrderDetailDeliverQuantityUuid#/inspection"> 排程 </a>
                          #}else{#
                            <ul class="list-group">
                                <ul class="list-group">
                                    <li class="list-group-item"><b>#=data.scheduleInspectionCore.expectStartTime.title#: </b> #=data.scheduleInspectionCore.expectStartTime.value#</li>
                                    <li class="list-group-item"><b>#=data.scheduleInspectionCore.expectFinishTime.title#: </b> #=data.scheduleInspectionCore.expectFinishTime.value#</li>
                                  </ul>
                              </ul>
                          #}#
                  </td>
                </tr>
                <tr>
                <tr>
                  <td class="text-center td-dp"><img src="/images/stop5.png" width="25" alt=""> <br>
                    出貨
                    #if(data.scheduleShipmentCore != null &&
                    data.scheduleShipmentCore.scheduleShipmentCoreStatus.value == false){#
                          <br><a class="table_btn_status btn-statusmenu-2" href="/page/manufacture/schedule/form/#=data.orderScheduleCore.clothOrderDetailDeliverQuantityUuid#/shipment"> 編輯排程 </a>
                        #}#
                  </td>
                  <td>
                    #if(data.scheduleShipmentCore == null){#
                          <a class="table_btn_status btn-statusmenu-2" href="/page/manufacture/schedule/form/#=data.orderScheduleCore.clothOrderDetailDeliverQuantityUuid#/shipment"> 排程 </a>
                        #}else{#
                          <ul class="list-group">
                              <ul class="list-group">
                                  <li class="list-group-item"><b>#=data.scheduleShipmentCore.expectStartTime.title#: </b> #=data.scheduleShipmentCore.expectStartTime.value#</li>
                                  <li class="list-group-item"><b>#=data.scheduleShipmentCore.expectFinishTime.title#: </b> #=data.scheduleShipmentCore.expectFinishTime.value#</li>
                                </ul>
                            </ul>
                        #}#
                  </td>
                </tr>
                </tr>
              </tbody>
            </table>
          </div>
          <!--table-responsive-->
        </div>
      </div>
  </script>
</body>

</html>