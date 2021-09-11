<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!doctype html>
<html>

<head>
  <link rel="stylesheet" href="/styles/windowUI.css"/>
  <link rel="stylesheet" href="/styles/board.css"/>
  <script src="${webapps.contextPath}/scripts/board/board.js"></script>
</head>

<body class="hold-transition skin-green-light sidebar-mini">
<div class="content-wrapper">
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box-body no-padding">
          <section class="content-header">
            <input type="text" id="chatlink" style="display:none;">
            <ol id="breadcrumb" class="breadcrumb">
              <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
              <li><a href="javascript:void(0)"></a></li>
              <li class="active"></li>
            </ol>
          </section>
        </div>
      </div>
    </div><!-- row-->

    <div class="row" style="margin-bottom: 15px;">
      <div class="col-md-5 col-sm-5 col-xs-12">
        <div class="info-box bg-dark-gray board" style="margin-bottom: unset;">
          <div class="info-box-content" id="boardInfoAll">
            <!--boardInfoAllTemplate-->
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </div>

      <div class="col-md-7 col-sm-7 col-xs-12 div-center">
        <div class="input-group stylish-input-group search">
          <input type="text" class="form-control" placeholder="搜尋工單、布號">
          <span class="input-group-addon" style="padding: 6px 20px;">
                  <nav class="clear" style="top: unset;right: 45px;">×</nav>
                  <button class="glyphicon glyphicon-search"></button>
                </span>
        </div>
      </div>
    </div>

    <div class="row" style="padding: 0px 30px;">
      <div class="col-md-3 col-sm-12 col-xs-12" style="padding: 0px 10px;">
        <div class="box box-default box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">待排訂單</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="max-height: 60vh;overflow-y: auto;" id="waitingOrderList">
          <!--prepareOrderTemplate-->
          </div>
        </div>
        <!-- /.box -->
      </div>
      <div id="boardList"></div>
      <!--row end-->
    </div>

    <!--boardInfoTemplate-->

  </section><!-- content-->
</div><!-- content-wrapper-->

<script id="boardInfoTemplate" type="text/x-kendo-template">
  #for(key in data){
  let infoData = data[key];#
  <div class="col-md-3 col-sm-12 col-xs-12" style="padding: 0px 10px;">
    <div class="box box-warning box-solid">
      <div class="box-header with-border">
        <h3 class="box-title">#=infoData.name#</h3>

        <div class="box-tools pull-right">
          <a href="board/#=key#/detail" class="btn btn-box-tool board_more_btn"><i class="fa fa-ellipsis-h "></i>
          </a>
        </div>
        <!-- /.box-tools -->
      </div>
      <!-- /.box-header -->
      <div class="box-body" style="">
        <div class="info-box bg-dark-gray board">
          <div class="info-box-content">
            <!--kendo Template-->
            <table class="table-content-center">
              <thead>
              <tr>
                <th>準備</th>
                <th>進行</th>
                <th>異常</th>
                <th>逾期</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <span class="board-circle board-prepare" style="cursor: unset;">#=infoData.prepare#</span>
                </td>
                <td>
                  <span class="board-circle board-ing" style="cursor: unset;">#=infoData.ing#</span>
                </td>
                <td>
                  <span class="board-circle board-error" style="cursor: unset;">#=infoData.error#</span>
                </td>
                <td>
                  <span class="board-circle board-delay board-circle-delay" style="cursor: unset;">#=infoData.delay#</span>
                </td>
              </tr>
              </tbody>
            </table>
            <!--kendo Template-->
          </div>
          <!-- /.info-box-content -->
        </div>

        <div style="max-height: 45vh;overflow-y: auto;" id="boardOrderList">
          #
          let responseData = infoData.response;
          let responseDataLength = responseData.length;
          if(responseDataLength <= 0){#
          <div class="box board-order" style="text-align: center">
            <span>查無資料</span>
          </div>
          #}else{
          for(index in responseData){
          let classString = "";
          responseData[index].ing ? classString += " board-ing" : classString += "board-prepare";
          responseData[index].error ? classString += " board-error" : classString += "";
          responseData[index].delay ? classString += " board-delay" : classString += "";
          #
          <div class="box board-order #=classString#">
            <span>#=responseData[index].text#</span>
          </div>

          #}}#
        </div>
      </div>
      <!-- /.box-body -->
    </div>
    <!-- /.box -->
  </div>
  #}#
</script>

<script id="boardWaitingTemplate" type="text/x-kendo-template">
  #if(data.length <= 0){#
  <div class="box board-order" style="text-align: center">
    <span>查無資料</span>
  </div>
  #}else{
  for(index in data){#
  <div class="box board-order">
    <span>#=data[index].text#</span>
  </div>
  #}}#
</script>

<script id="boardInfoAllTemplate" type="text/x-kendo-template">
  <table class="table-content-center">
    <thead>
    <tr>
      <th name="wait">待排</th>
      <th name="prepare">準備</th>
      <th name="ing">進行</th>
      <th name="error">異常</th>
      <th name="delay">逾期</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td name="wait">
        <span class="board-circle" style="cursor: unset">#=data.wait#</span>
      </td>
      <td name="prepare">
        <span class="board-circle board-prepare">#=data.prepare#</span>
      </td>
      <td name="ing">
        <span class="board-circle board-ing">#=data.ing#</span>
      </td>
      <td name="error">
        <span class="board-circle board-error">#=data.error#</span>
      </td>
      <td name="delay">
        <span class="board-circle board-delay board-circle-delay">#=data.delay#</span>
      </td>
    </tr>
    </tbody>
  </table>
</script>

</body>
</html>
