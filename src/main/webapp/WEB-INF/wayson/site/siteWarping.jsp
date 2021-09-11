<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<link rel="stylesheet" href="/styles/windowUI.css"/>
<style>
.k-grid-content{
  position:initial!important;
}
</style>
<script>
var titles = {}, columnItem;
var columnTemplate= {
        "No": function (d) {
          return "<a class='number_a' href='/page/site/warping/form/" + d.uuid+ "'>" + d.No + "</a>";
        }
}
var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: '/scripts/json/siteWarping.json',
      dataType: "json",
      type: "GET",
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
            field: "No",
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
      id: 'uuid'
    },
    total : function(data){
      return data.response.totalElements
    },
    data: function (data) {
      titles = data.response.header;
      columnItem = [];
      for(i in titles){
        if (titles[i].search) {
          searchCondition.push({
            field: i,
            operator: 'contains'
          })
        }//if
        if(titles[i].type.search(/(label|command)/) < 0){
          continue;
        }
        var temp={
          field : i,
          title : titles[i].title
        }
        if(columnTemplate[i]){
          temp.template=columnTemplate[i];
        }
        columnItem.push(temp);
      }//loop
      
      return data.response.contents;
    }
  },
  pageSize: 10,
  page:(sessionStorage.getItem("inboundPage")==null)?1:sessionStorage.getItem("inboundPage")
});
$(async function () {
  await dataSource.fetch();
  var grid = $("#schedule").kendoGrid(
    {
      dataSource : dataSource,
      toolbar : kendo.template($("#toolbar").html()),
      sortable : true,
      persistSelection : true,
      pageable : {
        input : true,
        numeric : true
      },
      dataBound: function(e) {
        $(window).scrollTop(0);
        sessionStorage.setItem("inboundPage", $("#schedule").data("kendoGrid").dataSource.page());
        for (i in this.columns) {
            this.autoFitColumn(i);
        }
        $("#schedule .k-grid-header thead .k-checkbox").prop("checked",true).trigger("click");
      },
      columns : columnItem
  });
  
  $('body').on('input keyup', '.search input', function () {
    var key = $(this).val().trim();
    for (i in searchCondition) {
      searchCondition[i].value = key
    }
    sessionStorage.setItem("inboundSearch", key);
    $(".search > .clear").hide();
    if (key.length) {
      $(".search > .clear").show();
    }
    $('#schedule').data('kendoGrid').dataSource.filter({
      logic: 'or',
      filters: searchCondition
    });
  });//end of search

  $('body').on('click', '#schedule .k-checkbox', function () {
    $("#trashBin").hide();
    if($("#schedule .k-grid-content tbody input:checkbox:checked").length){
      $("#trashBin").show();
    }
    
  })//checkbox 
  $("#trashBin").click(function(){
    if(!$("#schedule .k-grid-content tbody input:checkbox:checked").length){
      return false;
    }
    fw_confirmBox.show();
  })//trashBin

  $('body').on('click', '.search > .clear', function () {
    sessionStorage.removeItem("inboundSearch");
    $(".search input").val("").trigger("input");
  })//searchClear

  if (sessionStorage.getItem("inboundSearch") != null) {
    var page = $('#schedule').data('kendoGrid').dataSource.page();
    $(".search input").val(sessionStorage.getItem("inboundSearch")).trigger("keyup");
    $('#schedule').data('kendoGrid').dataSource.page(page)
  }
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
            <input type="text" id="chatlink" style="display:none;" >
              <ol id="breadcrumb" class="breadcrumb">
                <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"></li>
              </ol>
            </section>
            <div id="schedule">
            </div> <%-- When using Checkbox selection of kendo grid, 
            "div" is the only tag that triggers default effects well.  --%>
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
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
