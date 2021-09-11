<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<link rel="stylesheet" href="/styles/windowUI.css"/>
<style>
.fa-eye {
    font-size:20px;
}
</style>
<script>
var titles = {}, columnItem;
var columnTemplate= {
    "requestFormData": function (d) {
      return "<a class='number_a' href='javascript:void(0)'><i class='fa fa-eye'></i></a>";
    },
    "responseContent": function (d) {
      return "<a class='number_a' href='javascript:void(0)'><i class='fa fa-eye'></i></a>";
    }
}

var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/systemlog/grid",
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
      id: 'logUuid'
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
  page:(sessionStorage.getItem("salesPage")==null)?1:sessionStorage.getItem("salesPage")
});
$(async function () {
  await dataSource.fetch();
  var grid = $("#log").kendoGrid(
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
        sessionStorage.setItem("salesPage", $("#log").data("kendoGrid").dataSource.page());
        for (i in this.columns) {
            this.autoFitColumn(i);
        }
        $("#log .k-grid-header thead .k-checkbox").prop("checked",true).trigger("click");
      },
      columns : columnItem
  });
})//$(function ()

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
                <li class="active"></li>
              </ol>
            </section>
            <div id="log">
            </div> 
            
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
<div id="toolbar" style="display:none;">
    <div class="col-sm-4 col-xs-6 table_bar_box">
    </div>
</div><!--toolbar-->
</body>
</html>
