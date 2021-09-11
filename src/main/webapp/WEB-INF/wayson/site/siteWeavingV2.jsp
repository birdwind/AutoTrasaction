<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<style>
  .k-window  div.k-window-content
  {
    overflow: hidden;
  }
  .k-window-titlebar 
  {
    background-color:#3399ff;
  }
  .k-window-actions
  {
    background-color:#3399ff;
  }
  .k-button.k-state-active:hover
  {
    background-color:#3399ff;
  }
  .k-button-icon{
    width:50px;
    height:50px;
  }
  .k-i-close
  {
    font-size: 32px;
    position:absolute;
    right:px;
  }
  .k-i-save
  {
    font-size: 20px;
  }
   .k-i-cancel
  {
    font-size: 20px;
  }
  .k-i-track-changes-enable{
    font-size: 32px;
  }
  .k-i-hyperlink-open
  {
    font-size: 32px;
  }
  .order.k-button
  {
    font-size: 20px;
    border-color:#3399ff;
    boder:5px;
    width:250px;
    height:70px
  }
  .orderS.k-button
  {
    font-size: 20px;
    border-color:#3399ff;
    boder:5px;
    width:120px;
    height:45px
  }
</style>
  <%-- <script src="${webapps.contextPath}/scripts/shipment/warehousecate.js"></script> --%>
<script>
var selectedValue1 = null;
var selectedValue2 = null;
$(async function () {
$("#sitWeavingMachine").kendoGrid(
      {
        dataSource: 
        {
            data: [
              {
                id:1,
                sitWeavingMachine_MachineNo: "mo-201909011-31	",
                sitWeavingMachine_area: "唯聖出貨倉A區" ,
                sitWeavingMachine_order: "od-20191119-1" , 
                sitWeavingMachine_workNo: "Md-20191119-1" ,
                sitWeavingMachine_no: "ws-1220",
                sitWeavingMachine_beam: "beam-011" ,
                sitWeavingMachine_buckle: "buckle-011" ,
                sitWeavingMachine_blocker: "唯聖採購" ,
                sitWeavingMachine_supervisor: "唯聖採購" ,
              },
              {
                id:1,
                sitWeavingMachine_MachineNo: "mo-201909011-31	",
                sitWeavingMachine_area: "唯聖出貨倉A區" ,
                sitWeavingMachine_order: "od-20191119-1" , 
                sitWeavingMachine_workNo: "Md-20191119-1" ,
                sitWeavingMachine_no: "ws-1220",
                sitWeavingMachine_beam: "beam-011" ,
                sitWeavingMachine_buckle: "buckle-011" ,
                sitWeavingMachine_blocker: "唯聖採購" ,
                sitWeavingMachine_supervisor: "唯聖採購" ,

              }
            ],
              schema: {
              model: { 
                id:"id",
              }
            }
        },
        sortable: true,
        pageable: {
          input: true,
          numeric: true,
          pageSize: 5,
          messages: {
            display: "第 {0}-{1} 筆，共 {2} 筆",
            empty: " ",
            page: "第",
            of: "頁，共{0}頁"
          }
        },
        columns: [
          {
            field: "id",
            hidden: true,
          },
          {
            field: "sitWeavingMachine_MachineNo",
            title: "機台編號",
             template:function (d) {
              return "<a class='number_a openWindow' href='javaScript:void(0)'>"+d.sitWeavingMachine_MachineNo+"</a>"
            }
          }, 
          {
             field: "sitWeavingMachine_area",
            title: "所在區域"
            
          },
           {
             field: "sitWeavingMachine_order",
            title: "當前生產訂單"
            
          },
          {
             field: "sitWeavingMachine_workNo",
            title: "當前生產工單"
            
          },
            {
             field: "sitWeavingMachine_no",
            title: "當前生產布號"
            
          },
          {
             field: "sitWeavingMachine_beam",
            title: "當前盤頭"
          },
          {
             field: "sitWeavingMachine_buckle",
            title: "當前鋼筘"
          },
          {
             field: "sitWeavingMachine_blocker",
            title: "當前檔車人員"
          },
            {
             field: "sitWeavingMachine_supervisor",
            title: "當前主管"
            
          },
           
            ],

        noRecords: true,
        messages: {
          noRecords: "查無資料"
        },
        filterable:{
           mode: "row",
            messages: {
              info: ""
            },
            operators: {
              string: {
                eq: "完全一致",
                contains: "包含",
              },
              number: {
                lte: "小於等於",
                eq: "等於",
                gte: "大於等於",
              },
              date: {
                gte: "之後",
                lte: "之前",
                eq: "相等",
                between: "選擇間距"
              }
            }
        }
      }
    )
      $("#window").kendoWindow({
              width: "400px",
              title: " ",
              visible: false,
              actions: [
                        "Close"
                      ],
              close: onClose,
              modal: true,
              draggable: false,

      }).data("kendoWindow").center();
      $("#form").kendoWindow({
              width: "480px",
              height:"360px",
              title: " ",
              visible: false,
              actions: [
                        "Close"
                      ],
              close: onClose,
              modal: true,
              draggable: false,

      }).data("kendoWindow").center();
       $("#form2").kendoWindow({
              width: "480px",
              height:"160px",
              title: " ",
              visible: false,
              actions: [
                        "Close"
                      ],
              close: onClose,
              modal: true,
              draggable: false,

      }).data("kendoWindow").center();
      $("#button").kendoButton({
            icon: "k-icon k-i-track-changes-enable",
            click: function(e) {
              $("#form").data("kendoWindow").open();
               $("#window").data("kendoWindow").close();
          }
      });
      $("#button2").kendoButton({
            icon: "k-icon k-i-track-changes-enable",
              click: function(e) {
             $("#form2").data("kendoWindow").open();
               $("#window").data("kendoWindow").close();
          }
      });
      $("#button3").kendoButton({
            icon: "k-icon k-i-hyperlink-open",
            click: function(e) {
              location.replace("/page/cloth/weaving/sop/form/9abc0c21-22a5-4ae6-9f70-f25230278603");
            }
      });
      $("#button4").kendoButton({
            icon: "k-icon k-i-save",
             click: function(e) {
              $("#form").data("kendoWindow").close();
          }
      });
      $("#button5").kendoButton({
            icon: "k-icon k-i-cancel",
             click: function(e) {
              $("#form").data("kendoWindow").close();
          }
      });
      $("#button6").kendoButton({
            icon: "k-icon k-i-save",
             click: function(e) {
             $("#form2").data("kendoWindow").close();
          }
      });
      $("#button7").kendoButton({
            icon: "k-icon k-i-cancel",
             click: function(e) {
             $("#form2").data("kendoWindow").close();
          }
      });
    
    $("body").on("click", ".openWindow", function(){
        $("#window").data("kendoWindow").open();
         $("#window").focus();
        $("#formDiv").hide();
        $("#formDiv2").hide();
    });
  $("input[name='beamAmount']").kendoDropDownList({
      dataSource: [{text:"Md-20191119-1",value:1},{text:"Md-20191119-2",value:2},{text:"Md-20191119-3",value:3}],
      dataTextField: "text",
      dataValueField: "value",
      optionLabel: " ",
      change:function (e) {
        if(e.sender.dataItem().value) 
        {
          $(".labelText").show();
          $("#hiddenDiv").show();
        }
        else 
        {
          $(".labelText").hide();
          $("#hiddenDiv").hide();
        }
      }
  })
  $("input[name='position']").kendoDropDownList({
      dataSource: [{text:"A區",value:1},{text:"B區",value:2},{text:"C區",value:3}],
      dataTextField: "text",
      dataValueField: "value",
      optionLabel: " ",
   })
  $("#trashBin").click(function(){
    if(!$("#inbound .k-grid-content tbody input:checkbox:checked").length){
      return false;
    }
    fw_confirmBox.show();
  })//trashBin
})
  function onClose() {
      $(".openWindow").fadeIn();
}
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
                <li><a href="/"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"><a href="/page/shipment/sitWeavingMachine/"></a></li>
              </ol>
            </section>
            <div id="sitWeavingMachine">
            </div> 
            <div id="window" style="text-align:center">
              <button id="button" class="order" type="button">換工單</button>
              <br>
              <br>
              <button id="button2" class="order" type="button">落布</button>
              <br>
              <br>
              <button id="button3" class="order" type="button">機台參數</button>
            </div>
          </div><!-- box-body-->
              <div id="form" class="box-body" >
                    <div class="col-md-12 box_inputdata">
                      <fieldset>
                        <div class="form-group">
                          <nav class="col-md-4" style="width:30%;font-size: 18px;">工單編號</nav>
                            <input class="form-control" type='text' name="beamAmount" value="" style="width:50%">
                        </div>
                      </fieldset>
                      <div id="hiddenDiv" style="display:none">
                      <fieldset class="disabled">
                        <div class="form-group">
                          <nav class="col-md-4" style="width:30%;font-size: 18px;">訂單編號</nav>
                          <span class="form-control labelText" style="display:none;width:45%;height:80%">od-20191119-1</span>
                          <input type='hidden' name="manufactureOrderNo" value="">
                        </div>
                      </fieldset>
                      
                      <fieldset class="disabled">
                        <div class="form-group">
                          <nav  class="col-md-4" style="width:30%;font-size: 18px;">上軸盤頭編號</nav>
                          <span class="form-control labelText"  style="display:none;width:45%;height:80%">beam-011</span>
                          <input type='hidden' name="warpYarnBatchNo" value="">
                        </div>
                      </fieldset>
                      <fieldset class="disabled">
                        <div class="form-group">
                          <nav class="col-md-4" style="width:30%;font-size: 18px;">上軸鋼筘編號</nav>
                          <span class="form-control labelText" style="display:none;width:45%;height:80%">buckle-011</span>
                          <input type='hidden' name="beamAmount3" value="">
                        </div>
                      </fieldset>
                      <fieldset class="disabled">
                        <div class="form-group">
                          <nav class="col-md-4" style="width:30%;font-size: 18px;">生產布號</nav>
                          <span class="form-control labelText" style="display:none;width:45%;height:80%">ws-1220</span>
                          <input type='hidden' name="nowStation1" value="">
                        </div>
                      </fieldset>
                      <fieldset class="disabled">
                        <div class="form-group">
                          <nav class="col-md-4" style="width:30%;font-size: 18px;">使用緯紗</nav>
                          <span class="form-control labelText" style="display:none;width:45%;height:80%">N07(batch-1)</span>
                          <input type='hidden' name="nowStation" value="">
                        </div>
                      </fieldset>
                      <button id="button4" type="button" class="orderS" style="border-color:#3399ff;boder:5px;width:150px;position:absolute;right:85px;">儲存</button>
                      <button id="button5" type="button" class="orderS"  style="border-color:#3399ff;boder:5px;width:150px;position:absolute;right:285px;">取消</button>
                      </div>
                    </div>
                  </div><!--#form2-->
                    <div id="form2" class="box-body" style="">
                    <div class="col-md-12 box_inputdata">
                       <fieldset>
                        <div class="form-group">
                          <nav class="col-md-4" style="width:30%;font-size: 18px;">落布長度</nav>
                            <input class="form-control" type='text' name="long" value="" style="width:45%;height:100%">
                        </div>
                      </fieldset>
                       <fieldset>
                        <div class="form-group">
                          <nav class="col-md-4" style="width:30%;font-size: 18px;">入庫位置</nav>
                            <input class="form-control" type='text' name="position" value="" style="width:50%;">
                        </div>
                      </fieldset>
                      </fieldset>
                      <button id="button6" type="button" class="orderS" style="border-color:#3399ff;boder:5px;width:150px;position:absolute;right:85px;">儲存</button>
                      <button id="button7" type="button" class="orderS" style="border-color:#3399ff;boder:5px;width:150px;position:absolute;right:285px;">取消</button>
                    </div>
                  </div><!--#form2-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
      <div class="col-sm-4 col-xs-6 table_bar_box">
        <a href="javaScript:void(0)" class="btn" id="addbtn"><i class="fa fa-plus"></i></a>
        <button id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></button>
      </div>
      </div>
  </div><!--toolbar-->
<section id="confirmTemplate" style="display:none;">
  <section class="deleteIcon">
    <i class="fa fa-file-text-o">
      <i class="fa fa-times" ></i>
    </i>
    <div>
    <i class="fa fa-trash" ></i>
    </div>
  </section>
  <h2>確定刪除？</h2>
</section>
<div id="saveBtn" style="display:none;">
<a role="button" class="table_btn table_btn_purple k-grid-update editing" href="#"><img src="/images/icon_workflow/save.svg" height="50%" width="50%" ></a>
</div>
<div id="canBtn" style="display:none;">
<a role="button" class="table_btn table_btn_purple k-grid-cancel editing" href="#"><img src="/images/icon_workflow/cancel.svg" height="50%" width="50%" ></a>
</div>
</body>
</html>
