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
<%-- <script src="${webapps.contextPath}/scripts/beam/beamCreate.js"></script> --%>
<script>

var uuid = "${uuid}";
$(async function () {

   $(".box_features").draggable({
    axis: "y"
  });

  $(".box_features > .right").click(function () {
    $(this).parent().css("left", "auto").animate({ right: "-160px" }).delay(100).queue(function () {
      $(this).find(".left").fadeIn(100);
      $(this).dequeue();
    });
  })//right
  $(".box_features > .left").click(function () {
    $(this).hide().parent().css("left", "auto").animate({ right: "-10px" }).delay(100).queue(function () {
      $(this).find(".left").hide();
      $(this).dequeue();
    });
  })//left
  if (this.location.pathname.split("/form/")[1]) {
    $("#form").hide();
    $("#form2").show();
  }
  else{
  $("input[name='warpYarnBatchNo']").kendoDropDownList({
      dataSource: [{text:"王語臣",value:1},{text:"王宇臣",value:2},{text:"王羽臣",value:3}],
      dataTextField: "text",
      dataValueField: "value",
      optionLabel: " ",
  })
   $("input[name='dateAmount']").kendoDropDownList({
      dataSource: [{text:"2020/10/2 / 3000Y",value:1},{text:"2020/10/3 / 4000Y",value:2},{text:"2020/10/4 / 5000Y",value:3}],
      dataTextField: "text",
      dataValueField: "value",
      optionLabel: " ",
  })
  $("input[name='beamAmount']").kendoDropDownList({
      dataSource: [{text:"ce-20190811-1",value:1},{text:"ce-20190811-2",value:2},{text:"ce-20190811-3",value:3}],
      dataTextField: "text",
      dataValueField: "value",
      optionLabel: " ",
  })
  $("input[name='nowStation']").kendoDropDownList({
      dataSource: [{text:"im-001",value:1},{text:"im-002",value:2},{text:"im-003",value:3}],
      dataTextField: "text",
      dataValueField: "value",
      optionLabel: " ",
  })
  $("input[name='warehouse']").kendoDropDownList({
      dataSource: [{text:"唯聖出貨倉A區",value:1},{text:"唯聖出貨倉B區",value:2},{text:"唯聖出貨倉C區",value:3}],
      dataTextField: "text",
      dataValueField: "value",
      optionLabel: " ",
  })
  }
  
})
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
                    <button type="button" onclick="location='/page/shipment/clothImport/'"class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white">
                    <i class="fa fa-plus"></i></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                  <br>
                    <div id="form" class="box-body">
                     <div class="col-md-12 box_inputdata">
                        <fieldset >
                          <div class="form-group">
                           <nav>訂單編號</nav>
                            <input class="form-control" type='text' name="beamAmount" value="">
                          </div>
                        </fieldset>
                        <fieldset>
                          <div class="form-group">
                           <nav>交期/數量</nav>
                          <input class="form-control" type='text' name="dateAmount" value="">
                          </div>
                        </fieldset>
                         <fieldset class="disabled">
                          <div class="form-group">
                           <nav>工單編號</nav>
                          <span class="form-control labelText">mo-20191008-2</span>
                           <input type='hidden' name="nowStation1" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>布種</nav>
                            <span class="form-control labelText">ws-1234</span>
                            <input type='hidden' name="nowStation2" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>批號</nav>
                            <span class="form-control labelText">ws-1234/甲1-1/丙2-3</span>
                            <input type='hidden' type='text' name="nowStation3" value="">
                          </div>
                        </fieldset>
                        <fieldset >
                          <div class="form-group">
                           <nav>出貨碼總長</nav>
                           <input class="form-control" type='text' name="nowStation3" value="" style="width:82%"> Y
                          </div>
                        </fieldset>
                        <fieldset >
                          <div class="form-group">
                           <nav>出庫倉庫</nav>
                           <input class="form-control" type='text' name="warehouse" value="">
                          </div>
                        </fieldset>
                        <fieldset >
                          <div class="form-group">
                           <nav>出庫時間</nav>
                           <span class="k-widget k-datetimepicker form-control" style=""><span class="k-picker-wrap k-state-default"><input type="text" name="inquiryDatetime" class="form-control k-input" data-picker="datetime" value="" data-role="datetimepicker" role="combobox" aria-expanded="false" autocomplete="off" aria-disabled="false" style="width: 100%;"><span unselectable="on" class="k-select"><span class="k-link k-link-date" aria-label="Open the date view"><span unselectable="on" class="k-icon k-i-calendar"></span></span><span class="k-link k-link-time" aria-label="Open the time view"><span unselectable="on" class="k-icon k-i-clock"></span></span></span></span></span>
                          </div>
                        </fieldset>
                        <fieldset >
                          <div class="form-group">
                           <nav>出庫人員</nav>
                            <input class="form-control" type='text' name="warpYarnBatchNo" value="">
                          </div>
                        </fieldset>
                        <fieldset >
                          <div class="form-group">
                           <nav style="vertical-align: top;">備註</nav>
                           <textarea name="note" class="form-control textareaSize"></textarea>
                          </div>
                        </fieldset>
                      </div>
                      
                    </div><!--#form-->
                    <div id="form2" class="box-body" style="display:none">
                      <div class="col-md-12 box_inputdata">
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>訂單編號</nav>
                            <span class="form-control labelText">ci-20191009-1</span>
                           <input type='hidden' name="manufactureOrderNo" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>工單編號</nav>
                             <span class="form-control labelText">od-20191008-2</span>
                           <input type='hidden' name="date" value="">
                          </div>
                        </fieldset>
                         <fieldset class="disabled">
                          <div class="form-group">
                           <nav>交期/數量</nav>
                             <span class="form-control labelText">2020/10/2 / 3000Y</span>
                           <input type='hidden' name="date" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>布種</nav>
                            <span class="form-control labelText">ws-1234</span>
                           <input type='hidden' name="warpYarnBatchNo" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>批號</nav>
                            <span class="form-control labelText">ws-1234/甲1-1/丙3-2</span>
                           <input type='hidden' name="beamAmount" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>出貨碼總長</nav>
                          <span class="form-control labelText">3000Y</span>
                           <input type='hidden' name="nowStation1" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>出庫倉庫</nav>
                           <span class="form-control labelText">唯聖出貨倉B區</span>
                           <input type='hidden' name="nowStation" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>出庫時間</nav>
                           <span class="form-control labelText">2019/10/9 23:12</span>
                           <input type='hidden' name="warehouse" value="">
                          </div>
                        </fieldset>
                        <fieldset class="disabled">
                          <div class="form-group">
                           <nav>出庫人員</nav>
                           <span class="form-control labelText">王宇臣</span>
                           <input type='hidden' name="nowStation2" value="">
                          </div>
                        </fieldset>
                        <fieldset  class="disabled">
                          <div class="form-group">
                           <nav style="vertical-align: top;">備註</nav>
                           <textarea name="note" class="form-control textareaSize" readonly="readonly">Lorem ipsum dolor sit amet, sapien etiam, nunc amet dolor ac odio mauris justo. Luctus arcu, urna praesent at id quisque ac. Arcu es massa vestibulum malesuada, integer vivamus elit eu mauris eus, cum eros quis aliquam wisi. Nulla wisi laoreet suspendisse integer vivamus elit eu mauris hendrerit facilisi, mi mattis pariatur aliquam pharetra eget.</textarea>
                          </div>
                        </fieldset>
                      </div>
                    </div><!--#form2-->
                    <div class="box-body">
                       <div class="row">
                        <div class="col-md-6 box_inputdata">
                            <div class="form-group">
                            <label>檔案上傳</label>
                            <div class="uploadbox ">
                              <label for="upload" class="table_btn_status btn_upload inline ">
                                <a class="table_btn_status btn_upload inline" > 多檔案上傳</a>
                                <span class="inline"> 檔案累計勿超過10MB(單檔1MB)最多10個</span><br><div style="float:right;"><span id="sizeLabel">目前大小:</span><span id="sizeTotal">0.000MB</span></div>
                                <input id="upload" type="file" name="files" accept="image/gif, image/jpeg, image/png, application/pdf" multiple style="display:none" />
                              </label>
                              <div class="clearfix"></div>
                              
                            </div>
                          </div> 
                    </div><!--box-body-->
                  </div><!--box-->
                </div><!--col-->
              </div><!--row-->
            </section><!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
<section id="ingriTemplate" style="display:none;">
<table>
<tr>
  <td>
    <input type="text" class="form-control pull-right" name="cellName">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="percentage">
    <span class="errorMsg color_pink"></span>
  </td>
  <td class="center">
    <a href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle">
      <i class="fa fa-times"></i>
    </a>
  </td>
</tr>
</table>
</section>
</body>
</html>
