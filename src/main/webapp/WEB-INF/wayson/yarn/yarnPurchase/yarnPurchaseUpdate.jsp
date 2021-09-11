<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<link rel="stylesheet" href="/styles/windowUI.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.3.0/sockjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
<script src="${webapps.contextPath}/scripts/chatroom.js"></script>
<script src="${webapps.contextPath}/scripts/yarn/yarnPurchaseUpdate.js"></script>

<script>
  var infoStream = <%= request.getAttribute("infoStream").toString() %>;
  var uuid = infoStream == null ? "" : infoStream.uuid;
  // infoStream 中的 token 為 null (undefined) 代表使用者有登入
  // infoStream 中的 token 不為 null (undefined) 代表使用者未登入
  // console.log(id, infoStream);
</script>
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
                <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"></li> 
              </ol>
            </section><!-- content-header -->
            <section class="content">
              <div class="row">
                <div class="col-md-12">
                  <div class="box_features">
                    <button type="button" onclick="location='/page/yarn/purchase/'"class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white"></button>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <div id="form" class="box-body">
                    </div><!--#form-->
                  </div><!--box-->
                  
                </div><!--col-->
              </div><!--row-->
              <div class="row">
                <div class="col-md-12">
                  <div class="box box-success" style="padding-bottom:5px">
                  <div class="table_bar">
                      <div class="col-sm-4 col-xs-6 table_bar_box" style="display:none;">
                      <a href="javascript:void(0)" id="addInquiry" class="btn"><i class="fa fa-plus"></i></a>
                      </div>
                      <ul class="responseData">
                        <li>最後回覆時間：</li>
                        <li class="updateDate"></li>
                        <li>最後回覆報價者：</li>
                        <li class="modify"></li>
                        <li>最後回覆ip：</li>
                        <li class="modifyIp"></li>
                      </ul>
                      <button id="savePrice" type="button" class="btn btn-success white" style="display:none;">儲存</button>
                  </div>
                  <table id="purchase" class="table bg_white table-striped table-bordered table-hover" style="margin-bottom:5px">
                        <thead class="thead-light">
                        <tr>
                            <th><span class="yarnCoreTitle"></span></th>
                            <th style="width:10%"><span class="purchaseAmountTitle"></span></th>
                            <th style="width:9%"></th>
                            <th style="width:8%"><span class="warpWeftTitle"></span></th>
                            <th class="center" style="width:5%"><span>關聯布號</span></th>
                            <th class="center" style="width:5%"><span>關聯訂單</span></th>
                            <th style="width:13%"><span class="destinationCompanyTitle"></span></th>
                            <th style="width:13%"><span class="expectArrivalTimeTitle"></span></th>
                            <th style="width:10%"><span class="purchasePriceTitle"></span></th>
                            <th style="width:10%"scope="col">小計</th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                  </table>
                  <table id="total" class="table bg_white table-striped table-bordered table-hover" > 
                        <tbody>
                        <tr> 
                            <td style="text-align:right"><span>合計(NT)</span></td>
                            <td name="subTotal" style="width:15%"></td>
                        </tr>
                        <tr> 
                            <td style="text-align:right"><span>稅金(5%)</span></td>
                            <td name="tax" style="width:15%"></td>
                        </tr>
                        <tr> 
                            <td style="text-align:right"><span>總計(NT)</span></td>
                            <td name="total" style="width:15%"></td>
                        </tr>
                        </tbody>
                  </table>
                  </div><!--box-->
                </div><!--col-->
              </div><!--row-->
            </section><!--content-->
            <section id="chatroom">
            </section><!--#chatroom-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
<section id="purchaseTemplate" style="display:none;">
<table>
<tr>
  <td>
    <span name="yarnCore"></span>
    <input type="hidden" name="yarnPurchaseDetailUuid">
  </td>
  <td>
    <input type="text" name="purchaseAmount" class="form-control number" >
  </td>
  <td>
    <input type="text" name="purchaseUnit" class="form-control number">
  </td>
  <td class="center">
    <span name="warpWeft"></span>
  </td>
  <td >
  </td>
  <td>
  </td>
  <td>
    <span name="destinationCompany"></span>
  </td>
  <td>
    <input type="text" name="expectArrivalTime" class="form-control number" >
  </td>
  <td>
    <input type="text" name="purchasePrice" class="form-control number" >
  </td>
  <td>
    <span name="amountPrice"></span>
  </td>
</tr>
</table>
</section>
<section id="purchaseLabelTemplate" style="display:none;">
<table>
<tr>
  <td>
    <span name="yarnCore"></span>
    <input type="hidden" name="yarnPurchaseItemUuid">
  </td>
  <td>
    <span name="purchaseAmount"></span>
  </td>
  <td>
    <span name="purchaseUnit"></span>
  </td>
  <td class="center">
    <span name="warpWeft"></span>
  </td>
  <td >
  </td>
  <td>
  </td>
  <td>
    <span name="destinationCompany"></span>
  </td>
  <td>
    <span name="expectArrivalTime"></span>
  </td>
  <td>
    <span name="purchasePrice"></span>
  </td>
  <td>
    <span name="amountPrice"></span>
  </td>
</tr>
</table>
</section>
</body>
</html>
