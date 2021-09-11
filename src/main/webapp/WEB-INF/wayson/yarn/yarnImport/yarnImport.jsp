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
        "yarnImportCoreNo": function (d) {
          return "<a class='number_a' href='/page/yarn/import/form/" + d.yarnImportCoreUuid + "'>" + d.yarnImportCoreNo + "</a>";
        },
        "yarnCores": function (d) {
          return d.yarnCores.join(", ");
        },
        "copy": function(d) {
          return `<a class="table_btn table_btn_purple" onclick="copyInbound('`+d.yarnImportCoreUuid+`')" href='javascript:void(0)' data-uid="`+d.yarnPurchaseCoreUuid+`">
                    <i class="fa fa-files-o"></i>
                  </a>`
        }
}
var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: '/api/yarn/import/grid',
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
            field: "yarnImportCoreNo",
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
      id: 'yarnImportCoreUuid'
    },
    total : function(data){
      return data.response.totalElements
    },
    data: function (data) {
      titles = data.response.header;
      columnItem = [
          {
            selectable : true
          }
      ];

      for(i in titles){
        if(titles[i].type.search(/(label|command)/) < 0){
          continue;
        }
        var temp={
          field : i,
          title : titles[i].title
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
  page:(sessionStorage.getItem("inboundPage")==null)?1:sessionStorage.getItem("inboundPage")
});
$(async function () {
  fw_confirmBox.init({
    content:$("#confirmTemplate").html(),
    confirmEvent:"confirmDel"
  });
  await dataSource.fetch();
  var grid = $("#inbound").kendoGrid(
    {
      dataSource : dataSource,
      toolbar : kendo.template($("#toolbar").html()),
      sortable : true,
      persistSelection : true,
      pageable : {
        input : true,
        numeric : true
      },
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
        sessionStorage.setItem("inboundPage", $("#inbound").data("kendoGrid").dataSource.page());
        for (i in this.columns) {
            this.autoFitColumn(i);
        }
        $("#inbound .k-grid-header thead .k-checkbox").prop("checked",true).trigger("click");
      },
      columns : columnItem
  });

  $('body').on('click', '#inbound .k-checkbox', function () {
    $("#trashBin").hide();
    if($("#inbound .k-grid-content tbody input:checkbox:checked").length){
      $("#trashBin").show();
    }
    
  })//checkbox 
  $("#trashBin").click(function(){
    if(!$("#inbound .k-grid-content tbody input:checkbox:checked").length){
      return false;
    }
    fw_confirmBox.show();
  })//trashBin  
})//$(function ()
function confirmDel(){
    var uuidSet=[];
    var theGrid = $('#inbound').data("kendoGrid");
    theGrid.select().each(function(){
      uuidSet.push(theGrid.dataItem(this).yarnImportCoreUuid);
    });
    theGrid.select().each(function(){ 
      theGrid.removeRow(this);
    });
    var page = theGrid.dataSource.page();
    theGrid.dataSource.page(-1);
    theGrid.dataSource.page(page);
    var postData = new FormData();
    postData.append("yarnImportCore", new Blob([JSON.stringify({"deleteYarnImportCores":uuidSet})], {
      type: "application/json"
    }));
    
    $.ajax({
      url: "/api/yarn/import",
      data: postData,
      method: "DELETE",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        fw_confirmBox.box.find("button, h2, .fa-times").addClass("invisible");
        fw_confirmBox.box.find(".fa-trash").show();
        fw_confirmBox.box.find(".fa-file-text-o").addClass("throwIn").delay(2000).queue(function () {
          fw_confirmBox.box.find(".fa-trash").hide();
          fw_confirmBox.box.find(".fa-file-text-o").removeClass("throwIn");
          fw_confirmBox.box.find(".invisible").removeClass("invisible");
          $(this).dequeue();
        });
      } // end of ajax success
    }); //end of ajax
}//confirmDel
function copyInbound(Uuid){
  $.ajax({
    url: "/api/yarn/import/template/"+Uuid,
    method: 'GET',
    success: function (data) {
      if (data.status) {
        sessionStorage.setItem("inboundCopy", JSON.stringify(data.response));
        location="/page/yarn/import/form";
      }
    }//end of success
  });//end of ajax
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
            <input type="text" id="chatlink" style="display:none;" >
              <ol id="breadcrumb" class="breadcrumb">
                <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"></li>
              </ol>
            </section>
            <div id="inbound">
            </div> <%-- When using Checkbox selection of kendo grid, 
            "div" is the only tag that triggers default effects well.  --%>
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
      <div class="col-sm-4 col-xs-6 table_bar_box">
        <a href="/page/yarn/import/form" class="btn"><i class="fa fa-plus"></i></a>
        <button id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></button>
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
</body>
</html>
