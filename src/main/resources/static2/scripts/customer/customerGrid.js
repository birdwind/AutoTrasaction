var rootApi = "/api/customer/management";
var title = {};
var gridKendo;
var usuallyGridKendo;
var columnItem;
var dataSource;
var notification;

window.localStorage.clear();

var columnTemplate = {
  "customerCodeNo": function (d) {
    return "<a class='number_a' href='/page/customer/management/form/" + d.companyCoreUuid + "'>" + d.customerCodeNo + "</a>";
  },
};

$(async function () {
  await createGrid($("#grid"), true);
  gridKendo = $("#grid").data("kendoGrid");
  baseController();
});

function baseController() {
  $("body").append("<span id='notification'></span>");
  notification = $("#notification").kendoNotification({
    templates: [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>" + "成功" + "</span></div>"
    }],
    autoHideAfter: 1500
  }).data("kendoNotification");
  //tab控制
  $(".monitormenu > li").click(function () {
    $(this).parent().children().removeClass("active");
    $(this).addClass("active");
    createGrid($("#usuallyGrid"), false);
    $(".k-grid").hide();
    $(`#${$(this).attr("data-section")}`).show();
  });

  $('#grid').on('click', '.k-checkbox', function () {
    $("#grid .addusually").hide();
    if ($(this).parent().attr("class") == 'k-header') {
      var checkStatus = $("#grid .k-grid-header .k-checkbox").prop("checked");
      $("#grid .k-grid-content .k-checkbox").prop("checked", checkStatus);
    }
    if ($("#grid .k-grid-content tbody input:checkbox:checked").length) {
      $("#grid .addusually").show();
    }
  });

  $('#usuallyGrid').on('click', '.k-checkbox', function () {
    $("#usuallyGrid .deleteusually").hide();
    if ($(this).parent().attr("class") == 'k-header') {
      var checkStatus = $("#usuallyGrid .k-grid-header .k-checkbox").prop("checked");
      $("#usuallyGrid .k-grid-content .k-checkbox").prop("checked", checkStatus);
    }
    if ($("#usuallyGrid .k-grid-content tbody input:checkbox:checked").length) {
      $("#usuallyGrid .deleteusually").show();
    }
  });

  $('#grid').on('click', '.addusually', function () {
    console.log("Clicked");
    addUsually();
  });

  $('#usuallyGrid').on('click', '.deleteusually', function () {
    console.log("Clicked");
    deleteUsually();
  });
}

async function createGrid(gridDvi, isPOST) {
  await initGridDataSource(isPOST);
  await dataSource.fetch();
  gridDvi.kendoGrid({
    dataSource: dataSource,
    toolbar: kendo.template($("#toolbar").html()),
    sortable: true,
    persistSelection: true,
    pageable: {
      input: true,
      numeric: true
    },
    columns: columnItem,
    noRecords: true,
    messages: {
      noRecords: "查無資料"
    },
    filterable: isPOST ? {
      mode: "row",
      operators: {
        string: {
          contains: "包含",
          eq: "等於",
          neq: "不等於"
        },
        number: {
          eq: "等於",
          neq: "不等於",
          gte: "大於等於",
          gt: "大於",
          lte: "小於等於",
          lt: "小於"
        },
        date: {
          eq: "相等",
          gte: "之後",
          lte: "之前",
          between: "選擇間距"
        }
      }
    } : false
  });
}

function initGridDataSource(isPOST) {
  dataSource = new kendo.data.DataSource({
    transport: {
      read: {
        url: rootApi + "/grid",
        dataType: "json",
        type: isPOST ? "POST" : "GET",
        processData: false,
        contentType: false
      },
      parameterMap: function (data) {
        let postData = new FormData();
        postData.append("filter", new Blob([JSON.stringify({
          size: data.pageSize,
          page: data.page -= 1,
          filter: data.filter,
          sort: data.sort
        })], {
          type: "application/json"
        }));
        return postData;
      }
    },
    serverPaging: true,
    serverFiltering: true,
    serverSorting: true,
    sort: {
      field: "createDate",
      dir: "desc"
    },
    schema: {
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
        let temp;
        for (i in titles) {
          switch (i) {
            case "companyCoreUuid":
              temp = {
                hidden: true,
                field: i,
                title: titles[i].title,
                width: "auto"
              };
              break;
            case "createDate":
              temp = {
                hidden: true,
                field: i,
                title: titles[i].title,
                width: "auto"
              };
              break;
            default:
              temp = {
                field: i,
                title: titles[i].title,
                filterable: {
                  cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                  }
                }
              };
              break;
          }
          if (columnTemplate[i]) {
            temp.template = columnTemplate[i];
          }

          columnItem.push(temp);

        } //loop
        return data.response.contents;
      },
      model: {
        id: 'companyCoreUuid',
        fields: {
          "customerCodeNo": {
            type: "string"
          },
          "companyNo": {
            type: "string"
          },
          "nameFull": {
            type: "string"
          },
          "customerSupplyChains": {
            type: "string"
          },
          "tradeMethod": {
            type: "string"
          },
          "createDate": {
            type: "string"
          }
        }
      }
    },
    pageSize: 10,
  });
}

function deleteUsually() {
  var selected = [];
  var companyUsually = new Object();
  var postData = new FormData();
  usuallyGridKendo = $("#usuallyGrid").data("kendoGrid");
  usuallyGridKendo.select().each(function () {
    selected.push(usuallyGridKendo.dataItem(this).companyCoreUuid);
  });

  if (selected.length != 0) {
    companyUsually.companyCoreUuids = selected;
    postData.append("companyUsually", new Blob([JSON.stringify(companyUsually)], {type: "application/json"}));
    $.ajax({
      url: rootApi + "/usually",
      data: postData,
      method: "DELETE",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          notification.show({}, "saveOrInsert");
          setNoificationPosition();
          usuallyGridKendo.dataSource.read();
          usuallyGridKendo.refresh();
        } else {
          for (i of data.response) {
            console.log(data.response[i]);
          }
        }
      } // end of ajax success
    }); //end of ajax
  } else {
    $(this).removeClass("waitaSec");
    return;
  }
}

function addUsually() {
  var selected = [];
  var companyUsually = new Object();
  var postData = new FormData();
  gridKendo.select().each(function () {
    selected.push(gridKendo.dataItem(this).companyCoreUuid);
  });

  if (selected.length != 0) {
    companyUsually.companyCoreUuids = selected;
    postData.append("companyUsually", new Blob([JSON.stringify(companyUsually)], {type: "application/json"}));
    $.ajax({
      url: rootApi + "/usually",
      data: postData,
      method: "PUT",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          notification.show({}, "saveOrInsert");
          setNoificationPosition();
          //彈跳視窗 成功新增
        } else {
          for (i of data.response) {
            console.log(data.response[i]);
          }
        }
      } // end of ajax success
    }); //end of ajax
  } else {
    $(this).removeClass("waitaSec");
    return;
  }
}
