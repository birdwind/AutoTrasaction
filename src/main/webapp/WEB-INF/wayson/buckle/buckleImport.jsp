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
  <script src="${webapps.contextPath}/scripts/buckleManagement/buckleImport.js"></script>
  <%-- <script>
$(async function () {
$("#beamImport").kendoGrid(
      {
        dataSource: [ { beam_import_no: "buckle-001", actual_import_datetime: "2019/10/11" ,importer:"許宜芳"
        ,order1:"mo-20191119-2",order:"od-20191119-1",workstation:"整經",warehouse_stock_detail_id:"唯聖盤頭倉",
        long:"1234.5",number:"beam-002"},],
        toolbar:kendo.template($("#toolbar").html()),
        sortable: true,
        persistSelection: true,
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
        columns: [{
            field: "beam_import_no",// create a column bound to the "name" field
            title: "鋼筘編號", // set its title to "Name"
            template:function (d) {
              return "<a class='number_a' href='/page/buckle/buckleImport/form/001'>"+d.beam_import_no+"</a>"
            }
          }, {
            field: "actual_import_datetime",// create a column bound to the "age" field
            title: "入庫時間" // set its title to "Age"
          },{
            field: "importer",// create a column bound to the "name" field
            title: "入庫經手人" // set its title to "Name"
          },{
            field: "order1",// create a column bound to the "name" field
            title: "關聯工單" // set its title to "Name"
          },{
            field: "order",// create a column bound to the "name" field
            title: "關聯訂單" // set its title to "Name"
          },{
            field: "workstation",// create a column bound to the "name" field
            title: "來源工作站" // set its title to "Name"
          },{
            field: "warehouse_stock_detail_id",// create a column bound to the "name" field
            title: "入庫倉庫" // set its title to "Name"
          },{
            field: "long",// create a column bound to the "name" field
            title: "軸長" // set its title to "Name"
          },{
            field: "number",// create a column bound to the "name" field
            title: "綁定盤頭編號" // set its title to "Name"
          },],
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
})
</script> --%>
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
                <li class="active"><a href="/page/buckle/buckleImport"></a></li>
              </ol>
            </section>
            <div id="beamImport">
            </div>

          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
    <div class="col-sm-4 col-xs-6 table_bar_box">
      <a href="/page/buckle/buckleImport/form" class="btn"><i class="fa fa-plus"></i></a>
      <a href="javascript:void(0)" id="trashCan" class="btn" style="display:none"><i class="fa fa-trash-o"></i></a>
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
