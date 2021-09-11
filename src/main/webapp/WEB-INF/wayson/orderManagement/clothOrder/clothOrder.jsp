<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
<link rel="stylesheet" href="/styles/windowUI.css" />
<style>
  .k-grid-content {
    position: initial !important;
  }
  .k-grid {
    border-top: 0px solid transparent;
  }
  .table_bar_box .btn.export {
    margin-left: 50px;
  }
  .table_bar_box .btn.trashBin{
      margin-left: 30px;
  }
</style>
<script>
var titles = {},columnItem;
var columnTemplate= {
        "clothOrderCoreNo": function (d) {
          return "<a class='number_a' href='/page/orderManagement/clothOrder/form/" + d.clothOrderCoreUuid + "'>" + d.clothOrderCoreNo + "</a>";
        }
}
var dataSource = getDataSource((sessionStorage.getItem("clothOrderTab"))?sessionStorage.getItem("clothOrderTab"):12);
$(async function () {
  await dataSource.fetch();
  if(sessionStorage.getItem("clothOrderTab")){
    $(".monitormenu > li").removeClass("active");
    $("li[data-section='"+sessionStorage.getItem("clothOrderTab")+"']").addClass("active");
  }
  var grid = $("#clothOrder").kendoGrid(
    {
      dataSource : dataSource,
      toolbar : kendo.template($("#toolbar").html()),
      sortable : true,
      pageable : {
        input : true,
        numeric : true,
        messages: {
          display: "第 {0}-{1} 筆，共 {2} 筆",
          empty: " ",
          page: "第",
          of: "頁，共{0}頁"
        }
      },
      filterable: {
          mode: "row"
      },
      dataBound: function(e) {
        $(window).scrollTop(0);
        sessionStorage.setItem("clothOrderPage", $("#clothOrder").data("kendoGrid").dataSource.page());
        for (i in this.columns) {
            this.autoFitColumn(i);
        }
        $("#clothOrder .k-grid-header thead .k-checkbox").prop("checked",true).trigger("click");
      },
      columns : columnItem
  });

  $(".monitormenu > li").click(function () {
    sessionStorage.removeItem("clothOrderPage");
    $(this).parent().children().removeClass("active");
    $(this).addClass("active");
    sessionStorage.setItem("clothOrderTab", $(this).attr("data-section"));
    $("#clothOrder").data("kendoGrid").setDataSource( getDataSource($(this).attr("data-section")) );
  })
})//$(function ()
function getDataSource(category){
  var data = new kendo.data.DataSource({
    transport: {
      read: {
        url: "/api/orderManagement/clothOrder/grid/category/"+category,
        dataType: "json",
        type: "POST",
        processData: false,
        contentType: false
      },parameterMap: function (data) {
        let postData = new FormData();
        postData.append("filter", new Blob([JSON.stringify({
          size: data.pageSize,
          page: data.page -= 1,
          filter: data.filter,
          sort: [
            {
              field: "createDate",
              dir: "desc"
            }
          ]
        })], {
          type: "application/json"
        }));
        return postData;
      }
    },
    serverPaging: true,
    serverFiltering: true,
    schema: {
      model: {
        id: 'clothOrderCoreUuid'
      },
      total : function(data){
        return data.response.totalElements
      },
      data: function (data) {
        titles = data.response.header;
        columnItem = [];
        for(i in titles){
          if(titles[i].type.search(/(label|command)/) < 0){
            continue;
          }
          var temp={
            field : i,
            title : titles[i].title,
            filterable : false
          }
          if (titles[i].search) {
            temp.filterable = {
              cell: {
                      showOperators: false,
                      operator: "contains",
                      suggestionOperator: "contains"
                  }
            }
          }//if
          
          if(columnTemplate[i]){
            temp.template=columnTemplate[i];
          }
          columnItem.push(temp);
        }//loop
        return data.response.contents;
      }
    },
    pageSize: 10,
    page:(sessionStorage.getItem("clothOrderPage")==null)?1:sessionStorage.getItem("clothOrderPage")
  });
  return data;
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
            <input type="text" id="chatlink" style="display:none;">
            <ol id="breadcrumb" class="breadcrumb">
              <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
              <li><a href="javascript:void(0)"></a></li>
              <li class="active"></li>
            </ol>
          </section>
          <section class="content tabMenu">
            <div class="row">
              <div class="col-md-12">
                <ol class="monitormenu">
                  <li data-section="12" class="active">
                    <a href="javascript:void(0)">營業訂單</a>
                  </li>
                  <li data-section="6">
                    <a href="javascript:void(0)">出貨中</a>
                  </li>
                  <li data-section="13">
                    <a href="javascript:void(0)">已完成</a>
                  </li>
                  <li data-section="3">
                    <a href="javascript:void(0)">訂單取消</a>
                  </li>
                </ol>
              </div><!-- col-->
              </div><!-- row-->
          </section><!-- content-->
          <div id="clothOrder">
          </div> <%-- When using Checkbox selection of kendo grid, 
          "div" is the only tag that triggers default effects well.  --%>
        </div><!-- box-body-->
      </div><!-- col-->
    </div><!-- row-->
  </section><!-- content-->
</div><!-- content-wrapper-->
<div id="toolbar" style="display:none;">
  <div class="col-sm-4 col-xs-6 table_bar_box" style="height:35px">
    &emsp;
  </div>
</div><!--toolbar-->
</body>
</html>
