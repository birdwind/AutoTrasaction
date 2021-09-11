<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!doctype html>
<html>
<head>
  <script>
    var target = "${target}";
  </script>
  <link rel="stylesheet" href="/styles/windowUI.css"/>
  <link rel="stylesheet" href="/styles/board.css"/>
  <script src="${webapps.contextPath}/scripts/board/boardDetail.js"></script>
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

    <div class="row" style="margin-bottom: 15px;">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <ul class="timeline board_timeline" id="detail">

        </ul>
      </div>
      <!--row end-->
    </div>

    <!--boardInfoTemplate-->

  </section><!-- content-->
</div><!-- content-wrapper-->

<script id="detailTimeLineTemplate" type="text/x-kendo-template">
  #let hourString = (data%10 !== 0 || data === 0) && data < 10 ? "0" + data : data;#
  <li class="time-label" style='display: none;'>
    <span class="bg-blue" name="timelineTime" collapse="false" >
      <i class="fa fa-minus" aria-hidden="true"></i> #=hourString#:00
    </span>
    <div>
      <ul class="timeline board_timeline_content" id="cart_#=data#"></ul>
    </div>
  </li>
</script>

<script id="detailCartTemplate" type="text/x-kendo-template">
  #
  let classString = "";
  data.ing ? classString += " board-ing" : classString += "board-prepare";
  data.error ? classString += " board-error" : classString += "";
  data.delay ? classString += " board-delay" : classString += "";
  #
  <li>
    <div class="timeline-item board_timeline_cart">
      <div class="col-md-6 col-sm-6 col-xs-6 board_timeline_cart_content_left #=classString#">
        #for(index in data.text){#
        <nav>#=data.text[index]#</nav>
        #}#
      </div>
      <div class="col-md-6 col-sm-6 col-xs-6 board_timeline_cart_content_right #=classString#">
        <nav>123456/123456</nav>
      </div>
    </div>
  </li>
</script>

<script id="boardInfoAllTemplate" type="text/x-kendo-template">
  <table class="table-content-center">
    <thead>
    <tr>
      <th name="prepare">準備</th>
      <th name="ing">進行</th>
      <th name="error">異常</th>
      <th name="delay">逾期</th>
    </tr>
    </thead>
    <tbody>
    <tr>
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
