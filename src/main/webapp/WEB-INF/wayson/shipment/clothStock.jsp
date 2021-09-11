<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<style>
  .k-confirm .k-window-titlebar::before {
    content: '提示';
  }
  .k-confirm .k-window-titlebar .k-dialog-title {
  display:none;
  }
</style>
  <%-- <script src="${webapps.contextPath}/scripts/shipment/warehousecate.js"></script> --%>
<script>
var selectedValue1 = null;
var selectedValue2 = null;
$(async function () {
$("#clothStock").kendoGrid(
      {
        dataSource: 
        {
            data: [
              {
                id:1,
                clothStock_no: "whs-20", 
                clothStock_name: "唯聖" ,
                clothStock_area: "唯聖出貨倉A區" ,
                clothStock_no: "ws-1234" ,
                clothStock_number: "ws-1234/甲1-1/丙2-3" ,
                clothStock_stock: "500" ,
                clothStock_order: "od-20191119-1" ,
                clothStock_order2: "Md-20191119-1" ,

              },
              {
                id:1,
                clothStock_no: "whs-30", 
                clothStock_name: "唯聖" ,
                clothStock_area: "唯聖出貨倉C區" ,
                clothStock_no: "ws-5678" ,
                clothStock_number: "ws-5678/甲1-1/丙2-3" ,
                clothStock_stock: "52" ,
                clothStock_order: "od-20191111-1" ,
                clothStock_order2: "Md-20191111-1" ,

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
            field: "clothStock_no",
            title: "倉庫編號"
          }, 
          {
            field: "clothStock_name",
            title: "隸屬公司" ,
          },
          {
             field: "clothStock_area",
            title: "所在區域"
            
          },
            {
             field: "clothStock_no",
            title: "布號"
            
          },
            {
             field: "clothStock_number",
            title: "批號"
            
          },
            {
             field: "clothStock_stock",
            title: "當前庫存"
            
          },
            {
             field: "clothStock_order",
            title: "所屬訂單"
            
          },
            {
             field: "clothStock_order2",
            title: "所屬工單"
            
          }],

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
    $("body").on("click", ".specification", function(){
        var row = $(this).closest("tr");
        var rowTd=$(this).closest("td");
         $("#clothStock").data("kendoGrid").editRow(row);
          row.find("input").css("width","90%");
          rowTd.find(".k-button").remove(".k-button");
          rowTd.append($("#saveBtn").html());
          rowTd.append($("#canBtn").html());
          $(".specification").addClass("waitEdit");
          $(".specification").removeClass("specification");
    });
    $('body').on('click', '.editing', function () {
        $(".waitEdit").addClass("specification");
        $(".waitEdit").removeClass("waitEdit");
    })//checkbox 
    
    $('body').on('click', '#addbtn', function () {

      $("#clothStock").data("kendoGrid").addRow();
       var row = $("#clothStock").find(".k-grid-edit-row");
        row.find("input").css("width","90%");
        row.find("td").siblings(".k-command-cell").find(".k-button").remove(".k-button");
        row.find("td").siblings(".k-command-cell").append($("#saveBtn").html())
        row.find("td").siblings(".k-command-cell").append($("#canBtn").html())
        $(".specification").addClass("waitEdit");
        $(".specification").removeClass("specification");
    })//checkbox 
    $('body').on('click', '#clothStock .k-checkbox', function () {
    $("#trashBin").hide();
    if($("#clothStock .k-grid-content tbody input:checkbox:checked").length){
      $("#trashBin").show();
    }
    
  })//checkbox 
  $("#trashBin").click(function(){
    if(!$("#inbound .k-grid-content tbody input:checkbox:checked").length){
      return false;
    }
    fw_confirmBox.show();
  })//trashBin
})
  function generateTemplate(ReportList,selected) {
    console.log(selected);
    if(selected) {
           $.each(ReportList,function(index,value){
            if(selected == value.value){
              result=value.text
            }
            })
            
      return result;
    }
    else {
      return ReportList[0].text;
    }
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
                <li class="active"><a href="/page/shipment/clothStock/"></a></li>
              </ol>
            </section>
            <div id="clothStock">
            </div> 
            
          </div><!-- box-body-->
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
