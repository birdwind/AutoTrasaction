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
<script src="${webapps.contextPath}/scripts/yarn/yarnInquiryGuest.js"></script>
<script>
  var infoStream = <%= request.getAttribute("infoStream").toString() %>;
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
                  <div class="box box-success" style="padding-bottom:20px">
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
                        <button id="savePrice" type="button" class="btn btn-success white" style='float:right'>儲存單價</button>
                    </div>
                    <table id="inquiry" class="table bg_white table-striped table-bordered table-hover">
                      <thead class="thead-light">
                      <tr>
                          <th style="width:13%"><span class="yarnCoreTitle"></th>
                          <th style="width:10%"><span class="isEqualLongTitle"></span></th>
                          <th style="width:10%"><span class="isInStockTitle"></span></th>
                          <th style="width:10%"colspan="2"><span class="minimumOrderQuantityTitle"></span></th>
                          <th style="width:10%"><span class="amountTitle"></span></th>
                          <th style="width:10%"><span class="extraFeeTitle"></span></th>
                          <th style="width:7%"><span class="warpWeftTitle"></span></th>
                          <th style="width:15%"><span class="expectDeliverDateTitle"></span></th>
                          <th style="width:10%"><span class="responsePriceTitle"></span></th>
                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div><!--box-->
                </div><!--col-->
              </div><!--row-->
            </section><!--content-->
            <section id="chatroom">
            </section><!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
<section id="inquiryTemplate" style="display:none;">
<table>
<tr>
  <td>
    <span name="yarnCore"></span>
    <input type="hidden" name="yarnInquiryDetailUuid">
  </td>
  <td>
    <input type="text" name="isEqualLong" class="form-control number">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" name="isInStock" class="form-control number">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
      <input type="text" name="minimumOrderQuantity" class="form-control number">
      <span class="errorMsg color_pink"></span>
  </td>
  <td>
      <input type="text" name="minimumOrderUnit" class="form-control number">
      <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <span name="amount"></span>&nbsp;
    <span name="unit"></span>
  </td>
  <td>
    <input type="text" name="extraFee" class="form-control number">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <span name="warpWeft"></span>
  </td>
  <td>
    <input type="text" name="expectDeliverDate" class="form-control">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
  <input type="text" name="responsePrice" class="form-control number"></span>
  <span class="errorMsg color_pink"></span>
</td>
</tr>
</table>
</section>
</body>
</html>
