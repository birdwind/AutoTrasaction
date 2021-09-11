<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<link rel="stylesheet" href="/styles/windowUI.css"/>
<script>
var categoryId = "${categoryId}";
var section = "${section}";
var titles = {}, columnItem;
var columnTemplate= {
        "eventNo": function (d) {
          return "<a class='number_a' href='/page/event/"+section+"/form/" + d.eventCoreUuid + "'>" + d.eventNo + "</a>";
        },
        "copy": function(d) {
          return `<a class="table_btn table_btn_purple" onclick="copyEvent('`+d.eventCoreUuid+`')" href='javascript:void(0)'>
                    <i class="fa fa-files-o"></i>
                  </a>`
        }
}
var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/event/"+section+"/grid/category/"+categoryId,
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
      id: 'eventCoreUuid'
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
  page:(sessionStorage.getItem("eventPage")==null)?1:sessionStorage.getItem("eventPage")
});
$(async function () {
  
  fw_confirmBox.init({
    content:$("#confirmTemplate").html(),
    confirmEvent:"confirmDel"
  });
  await dataSource.fetch();
  var grid = $("#event").kendoGrid(
    {
      dataSource : dataSource,
      toolbar : kendo.template($("#toolbar").html()),
      sortable : true,
      persistSelection : true,
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
        sessionStorage.setItem("eventPage", $("#event").data("kendoGrid").dataSource.page());
        for (i in this.columns) {
            this.autoFitColumn(i);
        }
        $("#event .k-grid-header thead .k-checkbox").prop("checked",true).trigger("click");
      },
      columns : columnItem
  });

  $('body').on('click', '#event .k-checkbox', function () {
    $("#trashBin").hide();
    if($("#event .k-grid-content tbody input:checkbox:checked").length){
      $("#trashBin").show();
    }
    
  })//checkbox 
  $("#trashBin").click(function(){
    if(!$("#event .k-grid-content tbody input:checkbox:checked").length){
      return false;
    }
    fw_confirmBox.show();
  })//trashBin

  if (sessionStorage.getItem("inboundSearch") != null) {
    var page = $('#event').data('kendoGrid').dataSource.page();
    $(".search input").val(sessionStorage.getItem("inboundSearch")).trigger("keyup");
    $('#event').data('kendoGrid').dataSource.page(page)
  }
})//$(function ()
function confirmDel(){
    var uuidSet=[];
    var theGrid = $('#event').data("kendoGrid");
    theGrid.select().each(function(){
      uuidSet.push(theGrid.dataItem(this).eventCoreUuid);
    });
    theGrid.select().each(function(){ 
      theGrid.removeRow(this);
    });
    var page = theGrid.dataSource.page();
    theGrid.dataSource.page(-1);
    theGrid.dataSource.page(page);
    var postData = new FormData();
    postData.append("eventCore", new Blob([JSON.stringify({"deleteEventCores":uuidSet})], {
      type: "application/json"
    }));
    
    $.ajax({
      url: "/api/event/"+section,
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
function copyEvent(Uuid){
  $.ajax({
    url: "/api/event/"+section+"/template/"+Uuid,
    method: 'GET',
    success: function (data) {
      if (data.status) {
        sessionStorage.setItem("eventCopy", JSON.stringify(data.response));
        location="/page/event/"+section+"/form";
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
            <ol id="breadcrumb" class="breadcrumb">
              <li><a href="/"><i class="fa fa-home"></i> Home</a></li>
              <li><a href="javascript:void(0)"></a></li>
              <li class="active"></li>
            </ol>
          </section>
          <div id="event">
          </div> 
          
        </div><!-- box-body-->
      </div><!-- col-->
    </div><!-- row-->
  </section><!-- content-->
</div><!-- content-wrapper-->
<div id="toolbar" style="display:none;">
    <div class="col-sm-4 col-xs-6 table_bar_box">
      <a href="/page/event/<c:out value='${section}'/>/form" class="btn"><i class="fa fa-plus"></i></a>
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
