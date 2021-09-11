<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.3.0/sockjs.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
  <script>
    var infoStream = <%= request.getAttribute("infoStream").toString() %> ;
    var uuid = infoStream == null ? "" : infoStream.uuid;

  </script>
  <script src="${webapps.contextPath}/scripts/chatroom.js"></script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <script src="${webapps.contextPath}/scripts/manufacture/outsourcing/beamUpdate.js"></script>
  <style>
    .box_inputdata .form-control {
      width: 100%;
    }

  </style>
</head>

<body class="hold-transition skin-green-light sidebar-mini">
  <input type="text" id="chatlink" style="display: none;">
  <div id="grid"></div>
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
                <li class="active">委外詢價新增<</li> </ol> </section> <!-- content-header -->
                    <section class="content">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="box_features">
                            <i class="fa fa-angle-double-left left" style="display:none; margin-right: 20px;"></i>
                            <button type="button" onclick="window.history.back()" class="btn backBtn circleBtn white">
                              <i class="fa fa-reply"></i>
                            </button>
                            <button id="save" type="button" class="btn btn-success circleBtn white">
                              <i class="fa fa-floppy-o"></i>
                            </button>
                            <i class="fa fa-angle-double-right right"></i>
                          </div>
                          <!--box_features-->
                          <div id="detail" class="box box-success" style="padding-bottom:40px;display:None">
                            <br>
                            <div id="form" class="box-body"></div>
                            <!--#form-->
                          </div>
                          <!--box-->
                        </div>
                        <!--col-->
                      </div>
                      <!--row-->
                    </section>
                    <section id="detailGrid" class="content" style="display:none">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="box box-success">
                            <div class="box-body">
                              <div class="col-md-12">
                                <div class="table_bar_title">
                                  往來資訊串流（供應商⇌本廠）
                                </div>
                                <div class="boxline mt--s">
                                  <p id="saveRecord" class="record">
                                    <button id="savePrice" type="button" class="btn btn-success floatr">儲存</button>
                                  </p>
                                  <div class="table-responsive">
                                    <table id="table" class="table bg_white table-striped table-bordered table-hover">
                                      <thead class="thead-light"></thead>
                                      <tbody></tbody>
                                    </table>
                                  </div>
                                  <!--end table-responsive-->
                                  <hr>
                                  <div id="aggregate" class="row">
                                  </div>
                                </div>
                                <!--end box-->
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <!--#table-->
                    <!--content-->
                    <section id="chatroom" style="display:none">
                    </section>
                    <!--#chatroom-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <script type="text/x-kendo-template" id="tableTheadTemplate">
    <tr>
      <th scope="col">#=data.clothOrderDetail.title#</th>
      <th scope="col">#=data.length.title#<span class='color_pink'>*</span></th>
      <th scope="col">#=data.amount.title#<span class='color_pink'>*</span></th>
      <th scope="col">#=data.expectDate.title#<span class='color_pink'>*</span></th>
      <th scope="col">#=data.price.title#<span class='color_pink'>*</span></th>
      <th scope="col">#=data.extraFee.title#<span class='color_pink'>*</span></th>
      <th scope="col" width="10%">#=data.totalPrice.title#</th>
    </tr>
  </script>
  <script type="text/x-kendo-template" id="tableTbodyTemplate">
    #for(var item in data){#
  <tr>
    <td>
      <label>#=data[item].clothOrderDetail#</label>
      <input type="hidden" class="form-control" name="outsourcingBeamInquiryDetailUuid"
        value="#=data[item].outsourcingBeamInquiryDetailUuid#" style="width: 100%">
    </td>
    <td>
      <input id="length_#=data[item].outsourcingBeamInquiryDetailUuid#" type="text" class="form-control number"
        name="length" value="#=data[item].length#" disabled="disabled">
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="amount_#=data[item].outsourcingBeamInquiryDetailUuid#" type="text" class="form-control number integer"
        name="amount" value="#=data[item].amount#"
        disabled="disabled">
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="expectDate_#=data[item].outsourcingBeamInquiryDetailUuid#" type="text" class="form-control date"
        name="expectDate" value="#=initExpectDate(data[item].expectDate)#"
        disabled="disabled">
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="price_#=data[item].outsourcingBeamInquiryDetailUuid#" type="text" class="form-control number"
        name="price" value="#=data[item].price#">
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <input id="extraFee_#=data[item].outsourcingBeamInquiryDetailUuid#" type="text" class="form-control number"
        name="extraFee" value="#=data[item].extraFee#">
      <span class="errorMsg color_pink"></span>
    </td>
    <td>
      <label id="totalPrice_#=data[item].outsourcingBeamInquiryDetailUuid#" name="totalPrice">
      #=data[item].totalPrice#
      </label>
    </td>
  </tr>    
  #}#
  </script>
  <script type="text/x-kendo-template" id="saveRecordInfoTemplate">
    最後回覆➝回覆時間：<label class="updateDate">#=data[0].updateDate#</label>│回覆報價者：<label class="modify">#=data[0].modify#</label><br>回覆IP：<label class="modifyIp">#=data[0].modifyIp#</label>
  </script>
  <script type="text/x-kendo-template" id="aggregateTemplate">
    <div class="col-sm-6 col-sm-offset-6">
      <div class="totalbox">
        <div class="divinlineblock w50 floatl textr">合計(NT)</div>
        <div id="sumPrice" class="divinlineblock w50 floatl textr">#=initSumPrice(data)#</div>
      </div>
      <div class="totalbox">
        <div class="divinlineblock w50 floatl textr">稅金(5%)</div>
        <div id="sumExtraFee" class="divinlineblock w50 floatl textr">#=initSumExtraFee(data)#</div>
      </div>
      <div class="totalbox">
        <div class="divinlineblock w50 floatl textr">總計(NT)</div>
        <div id="sumTotalPrice" class="divinlineblock w50 floatl textr">#=initSumTotalPrice(data)#</div>
      </div>
    </div>  
  </script>
</body>

</html>
