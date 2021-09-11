<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<script>
var titles = {}, columnItem;
var columnTemplate = {
  "yarnNo": function (d) {
    return "<a class='number_a' href='/page/yarn/ingredient/form/" + d.yarnCoreUuid + "'>" + d.yarnNo + "</a>";
  },
  "yarnCoreStatus": function (d) {
    switch (d.yarnCoreStatus) {
      case true:
        return `<img src="/images/ok.svg" style="width: 25px">`;
      case false:
        return `<i class="fa fa-ban color_pink"></i>`;
      default:
        return d.yarnCoreStatus;
    }
  }
}
var extraColumns = [
  {
    title: "詢價",
    width: "5%",
    template: function (d) {
      return `<a class="table_btn table_btn_pink" onclick="newInquiry('` + d.yarnCoreUuid + `')" href="javascript:void(0)">
                    <i class="fa fa-commenting-o"></i>
                  </a>`
    }
  }
]
var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: '/api/yarn/ingredient/grid',
      dataType: "json",
      type: "POST",
      processData: false,
      contentType: false
    }, parameterMap: function (data) {
      let postData = new FormData();
      postData.append("filter", new Blob([JSON.stringify({
        size: data.pageSize,
        page: data.page -= 1,
        filter: data.filter,
        sort: [
          {
            field: "updateDatea",
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
      id: "yarnCoreUuid"
    },
    total: function (data) {
      return data.response.totalElements
    },
    data: function (data) {
      columnItem = [];
      titles = data.response.header;
      for (i in titles) {
        if (titles[i].type.search(/(label|command)/) < 0) {
          continue;
        }
        var temp = {
          field: i,
          title: titles[i].title,
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
        if (columnTemplate[i]) {
          temp.template = columnTemplate[i];
        }
        columnItem.push(temp);
      }//loop
      columnItem = columnItem.concat(extraColumns);
      return data.response.contents;
    }
  },
  pageSize: 10,
  page: (sessionStorage.getItem("ingredientPage") == null) ? 1 : sessionStorage.getItem("ingredientPage")
});
$(async function () {
  await dataSource.fetch();
  var grid = $("#ingredient").kendoGrid(
    {
      dataSource: dataSource,
      toolbar: kendo.template($("#toolbar").html()),
      sortable: true,
      persistSelection: true,
      filterable: {
          mode: "row"
      },
      pageable: {
        input: true,
        numeric: true,
        messages: {
          display: "第 {0}-{1} 筆，共 {2} 筆",
          empty: " ",
          page: "第",
          of: "頁，共{0}頁"
        }
      },
      dataBound: function (e) {
        $(window).scrollTop(0);
        sessionStorage.setItem("ingredientPage", $("#ingredient").data("kendoGrid").dataSource.page());
        for (i in this.columns) {
          this.autoFitColumn(i);
        }
      },
      columns: columnItem
    });

  if (sessionStorage.getItem("ingredientSearch")) {
    var page = $('#ingredient').data('kendoGrid').dataSource.page();
    $(".search input").val(sessionStorage.getItem("ingredientSearch")).trigger("keyup");
    $('#ingredient').data('kendoGrid').dataSource.page(page);
  }
})//$(function ()
function newInquiry(Uuid) {
  sessionStorage.setItem("yarnUuid", Uuid);
  location = "/page/yarn/inquiry/form";
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
                <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"></li>
              </ol>
            </section>
            <section id="ingredient">
            </section>
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
      <div class="col-sm-4 col-xs-6 table_bar_box">	
        <a href="/page/yarn/ingredient/form" class="btn"><i class="fa fa-plus"></i></a>
      </div>
      <div class="col-sm-6 col-xs-6">
        <div class="input-group stylish-input-group search">
          <input type="text" class="form-control" placeholder="關鍵字搜尋" >
          <nav class="clear">&times;</nav>
          <span class="input-group-addon">
            <span class="glyphicon glyphicon-search"></span>
          </span>
        </div>
      </div>
  </div><!--toolbar-->
</body>
</html>
