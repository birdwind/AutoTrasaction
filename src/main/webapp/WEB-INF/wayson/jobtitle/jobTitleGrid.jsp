<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<link rel="stylesheet" href="/styles/windowUI.css"/>
<style>
.fa.fa-star,.fa-star-o {
  display: inline;
  cursor: default;
}
.fa-pencil,
.number_a.editBtn,
.number_a.addItemBtn,
.number_a.saveBtn,
.number_a.cancelBtn{
  font-size:20px;
}
.number_a.addItemBtn,
.number_a.saveBtn,
.number_a.cancelBtn{
  display: none;
}
.cancelBtn,
.cancelBtn:hover{
  color: #D75A4A;
}
</style>
<script>
var titles = {}, columnItem;
var modifiedNotification;
var columnTemplate = {
  "edit": function (d) {
    var btns = "<a class='number_a editBtn' href='javascript:void(0)'><i class='fa fa-pencil'></i></a>"
    btns += "<a class='number_a addItemBtn' href='javascript:void(0)'><i class='fa fa-plus'></i></a>"
    btns += "<a class='number_a saveBtn' href='javascript:void(0)'><i class='fa fa-check'></i></a>&emsp;"
    btns += "<a class='number_a cancelBtn' href='javascript:void(0)'><i class='fa fa-times'></i></a>"
    return btns;
  }
}

var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/job/title/grid",
      dataType: "json",
      type: "POST",
      processData: false,
      contentType: false
    },
    create: {
      url: "/api/job/title",
      dataType: "json",
      method: "PUT",
      contentType: false,
      processData: false
    },
    update: {
      url: "/api/job/title",
      dataType: "json",
      method: "POST",
      contentType: false,
      processData: false
    },
    parameterMap: function (data, operation) {
      var postData = new FormData();
      if ("update,create".search(operation) > -1) {
        postData.append("jobTitle", new Blob([JSON.stringify({
          jobTitleUuid: (data.jobTitleUuid) ? data.jobTitleUuid : "0",
          jobTitleValue: (data.jobTitleValue) ? data.jobTitleValue : null
        })], {
          type: "application/json"
        }));
        return postData;
      }
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
      id: 'jobTitleUuid',
      fields: {
        jobTitleNo: { editable: false },
        edit: { editable: false }
      }
    },
    total: function (data) {
      return data.response.totalElements
    },
    data: function (data) {
      titles = data.response.header;
      columnItem = [
        {
          selectable: true,
          width: "50px"
        }
      ];
      for (i in titles) {
        if (titles[i].type.search(/(label|command|text)/) < 0) {
          continue;
        }
        var temp = {
          field: i,
          title: titles[i].title,
          filterable: false
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
      return data.response.contents;
    }
  },
  pageSize: 10,
  page: (sessionStorage.getItem("jobTitlePage") == null) ? 1 : sessionStorage.getItem("jobTitlePage")
});
$(async function () {
  var modifiedNotification = $("#notification").kendoNotification({
    templates: [
      {
        type: "incerted",
        template: "<div class='saveOrInsert zoominTrans'>新增成功</span>" + fw_checkMrak + "</div>"
      },
      {
        type: "saved",
        template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
      }
    ],
    autoHideAfter: 1500
  }).data("kendoNotification");
  fw_confirmBox.init({
    content: $("#confirmTemplate").html(),
    confirmEvent: "confirmDel"
  });
  await dataSource.fetch();
  var grid = $("#jobtitle").kendoGrid(
    {
      dataSource: dataSource,
      toolbar: kendo.template($("#toolbar").html()),
      sortable: true,
      persistSelection: true,
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
      filterable: {
        mode: "row"
      },
      dataBound: function (e) {
        $(window).scrollTop(0);
        sessionStorage.setItem("jobTitlePage", $("#jobtitle").data("kendoGrid").dataSource.page());
        for (i in this.columns) {
          this.autoFitColumn(i);
        }
        $("#jobtitle .k-grid-header thead .k-checkbox").prop("checked", true).trigger("click");
      },
      columns: columnItem,
      editable: {
        mode: "inline",
        confirmation: false
      }
    });
  $("#jobtitle").on("click", ".editBtn", function () {
    var row = $(this).closest("tr");
    $(this).hide();
    $(this).nextAll(":not(.addItemBtn)").show();
    $("#jobtitle").data("kendoGrid").editRow(row);
  });
  $("#addItem").click(function () {
    $("#jobtitle").data("kendoGrid").addRow();
    $("#jobtitle tbody tr:eq(0) .editBtn").hide();
    $("#jobtitle tbody tr:eq(0)").find(".addItemBtn,.cancelBtn").show();
  })
  $("#jobtitle").on("click", ".addItemBtn", function () {
    var row = $(this).closest("tr");
    if (!row.find("[name='jobTitleValue']").val()) {
      row.find("[name='jobTitleValue']").addClass("invalidInput");
      row.find("[name='jobTitleValue']").after("<span class='color_pink'>請輸入職業名稱</span>");
      return false;
    }
    $(this).hide();
    $(this).siblings().hide();
    $(this).siblings(".editBtn").show();
    $("#jobtitle").data("kendoGrid").saveRow();
    modifiedNotification.show({}, "incerted");
    setNoificationPosition();
    setTimeout(function () {
      $(".drawCheck").hide().delay(460).queue(function () {
        var theGrid = $('#jobtitle').data("kendoGrid");
        var page = theGrid.dataSource.page();
        theGrid.dataSource.page(-1);
        theGrid.dataSource.page(page);
        $(this).dequeue();
      });
    }, 1000);
  }); // addItemBtn

  $("#jobtitle").on("click", ".saveBtn,.cancelBtn", function () {
    var row = $(this).closest("tr");
    if ($(this).hasClass("saveBtn") && !row.find("[name='jobTitleValue']").val()) {
      row.find("[name='jobTitleValue']").addClass("invalidInput");
      row.find("[name='jobTitleValue']").after("<span class='color_pink'>請輸入職業名稱</span>");
      return false;
    }
    $(this).hide();
    $(this).siblings().hide();
    $(this).siblings(".editBtn").show();
    if ($(this).hasClass("saveBtn")) {
      $("#jobtitle").data("kendoGrid").saveRow();
      modifiedNotification.show({}, "saved");
      setNoificationPosition();
      setTimeout(function () {
        $(".drawCheck").hide().delay(460).queue(function () {
          $(this).dequeue();
        });
      }, 1000);
    } else {
      $("#jobtitle").data("kendoGrid").cancelRow();
    }
  }); // saveBtn cancelBtn


  $('body').on('click', '#jobtitle .k-checkbox', function () {
    $("#trashBin").hide();
    if ($("#jobtitle .k-grid-content tbody input:checkbox:checked").length) {
      $("#trashBin").show();
    }
  })//checkbox
  $("#trashBin").click(function () {
    if (!$("#jobtitle .k-grid-content tbody input:checkbox:checked").length) {
      return false;
    }
    fw_confirmBox.show();
  })//trashBin
})//$(function ()
function confirmDel() {
  var uuidSet = [];
  var theGrid = $('#jobtitle').data("kendoGrid");
  theGrid.select().each(function () {
    uuidSet.push(theGrid.dataItem(this).jobTitleUuid);
  });
  var page = theGrid.dataSource.page();
  theGrid.dataSource.page(-1);
  theGrid.dataSource.page(page);
  var postData = new FormData();
  postData.append("jobTitleDelete", new Blob([JSON.stringify({ "jobTitleUuids": uuidSet })], {
    type: "application/json"
  }));

  $.ajax({
    url: "/api/job/title",
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
            <div id="jobtitle">
            </div>

          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
      <div class="col-sm-4 col-xs-6 table_bar_box">
        <a id="addItem" href="javascript:void(0)" class="btn"><i class="fa fa-plus"></i></a>
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
<span id="notification"></span>
</body>
</html>
