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
      display: none;
    }

  </style>
  <script src="${webapps.contextPath}/scripts/beam/beamInventoryGrid.js"></script>
  <script>
    // $(async function () {
    // $("#beamInventory").kendoGrid(
    //       {
    //         dataSource: [ { beam_import_no: "beam-001",warehouse_stock_detail_id:"唯聖盤頭倉",
    //         long:"123.4 Y",number:"batch-002",order1:"mo-20191119-2",order:"od-20191119-1",importer:"李廣為"
    //         }],
    //         sortable: true,
    //         persistSelection: true,
    //         pageable: {
    //           input: true,
    //           numeric: true,
    //           pageSize: 5,
    //           messages: {
    //             display: "第 {0}-{1} 筆，共 {2} 筆",
    //             empty: " ",
    //             page: "第",
    //             of: "頁，共{0}頁"
    //           }
    //         },
    //         columns: [{
    //             field: "beam_import_no",// create a column bound to the "name" field
    //             title: "盤頭編號", // set its title to "Name"
    //             template:function (d) {
    //               return "<a class='number_a' href='/page/beam/beamInventory/form'>"+d.beam_import_no+"</a>"
    //             }
    //           },
    //           {
    //             field: "warehouse_stock_detail_id",// create a column bound to the "name" field
    //             title: "所在倉庫" // set its title to "Name"
    //           },{
    //             field: "long",// create a column bound to the "name" field
    //             title: "軸長" // set its title to "Name"
    //           },{
    //             field: "number",// create a column bound to the "name" field
    //             title: "經紗批號" // set its title to "Name"
    //           },{
    //             field: "order1",// create a column bound to the "name" field
    //             title: "關聯工單" // set its title to "Name"
    //           },{
    //             field: "order",// create a column bound to the "name" field
    //             title: "關聯訂單" // set its title to "Name"
    //           },{
    //             field: "importer",// create a column bound to the "name" field
    //             title: "最後經手人" // set its title to "Name"
    //           }],
    //         noRecords: true,
    //         messages: {
    //           noRecords: "查無資料"
    //         },
    //         filterable:{
    //            mode: "row",
    //             messages: {
    //               info: ""
    //             },
    //             operators: {
    //               string: {
    //                 eq: "完全一致",
    //                 contains: "包含",
    //               },
    //               number: {
    //                 lte: "小於等於",
    //                 eq: "等於",
    //                 gte: "大於等於",
    //               },
    //               date: {
    //                 gte: "之後",
    //                 lte: "之前",
    //                 eq: "相等",
    //                 between: "選擇間距"
    //               }
    //             }
    //         }
    //       }
    //     )
    // })

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
                <li class="active"><a href="/page/beam/beamInventory"></a></li>
              </ol>
            </section>
            <div id="beamInventory">
            </div>

          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
    <div class="col-sm-4 col-xs-6 table_bar_box">
    </div>
  </div>
  </div>
  <!--toolbar-->
  <section id="confirmTemplate" style="display:none;">
    <section class="deleteIcon">
      <i class="fa fa-file-text-o">
        <i class="fa fa-times"></i>
      </i>
      <div>
        <i class="fa fa-trash"></i>
      </div>
    </section>
    <h2>確定刪除？</h2>
  </section>
</body>

</html>
