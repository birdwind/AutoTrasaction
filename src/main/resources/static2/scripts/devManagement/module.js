var rootApi = "/api/module";
var grid;
var gridDataSourceHeader;
var listbox, listBoxAPI, listBoxUuid, listBoxType;
var currentList, availableList;
var errorTemplate = `<span class="errorMsg color_pink"></span>`;
var notification;

var columnTemplate = {
  "edit": function (d) {
    return "<a class='number_a' href='javascript:void(0)'><i class='fa fa-pencil editGroup'></i></a>";
  },
  "role": function (d) {
    return "<a class='number_a' href='javascript:void(0)' onclick='openListBox(rootApi + \"/role\",\"" + d.moduleUuid + "\", \"Role\")'><i class='fa fa-pencil'></i></a>";
  },
  "memberGroup": function (d) {
    return "<a class='number_a' href='javascript:void(0)' onclick='openListBox(rootApi + \"/group\",\"" + d.moduleUuid + "\", \"Group\")'><i class='fa fa-pencil'></i></a>";
  },
  "function": function (d) {
    return "<a class='number_a' href='javascript:void(0)' onclick='openListBox(rootApi + \"/function\",\"" + d.moduleUuid + "\", \"Function\")'><i class='fa fa-pencil'></i></a>";
  },
  "status": function (d) {
    return d.status ? "<a class='number_a' href='javascript:void(0)' style='pointer-events:none;'><i class='fa fa-check-circle-o fa-2x'></i></a>" : "<a class='number_a' href='javascript:void(0)' style='pointer-events:none; color: #000000;'><i class='fa fa-check-circle-o fa-2x'></i></a>";
  }
};

var apiType = {
  "Role": "角色",
  "Group": "群組",
  "Function": "功能"
};

var saveTemplate = `
<a class='number_a' href='javascript:void(0)'><i class='fa fa-floppy-o saveGroup fa-2x'></i></a>
<a style="color: #ac2925" href='javascript:void(0)'><i class='fa fa-ban cancelGroup fa-2x'></i></a>`;

var checkTemplate = `<input type="checkbox" name="status" data-type="boolean" data-bind="checked:status">`;

var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/grid",
      dataType: "json",
      type: "POST",
      processData: false,
      contentType: false
    }, parameterMap: function (data) {
      console.log(data.sort);
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
  schema: {
    total: function (data) {
      return data.response.totalElements
    },
    data: function (data) {
      titles = data.response.header;
      columnItem = [];
      titles = data.response.header;
      let temp = {};
      // columnItem.push({selectable: true, width: "50px"});
      for (i in titles) {
        if (titles[i].type == "hidden") {
          temp = {
            field: i,
            title: titles[i].title,
            hidden: true,
            filterable: false,
          }
        } else {
          temp = {
            field: i,
            title: titles[i].title,
            filterable: false,
          };
        }
        if (titles[i].search) {
          temp.filterable = {
            cell: {
              // showOperators: false,
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
      gridDataSourceHeader = data.response.header;
      return data.response.contents;
    },
    moduel: {
      id: 'moduleUuid',
      fields: {
        moduleUuid: {
          type: "string"
        },
        moduleNo: {
          type: "string"
        },
        moduleKey: {
          type: "string"
        },
        moduleValue: {
          type: "string"
        },
        moduleIcon: {
          type: "string"
        },
        status: {
          type: "string"
        },
        creator: {
          type: "string"
        },
        modify: {
          type: "string"
        }
      }
    }
  },
  pageSize: 10,
});

// --------主要流程--------

$(async function () {
  await createGrid();

  await createWindow();

  initListBox();

  initNotification();

  listBoxController();

  gridController();

  baseController();
});

// --------主要流程--------

async function createGrid() {
  await dataSource.fetch();
  let filterable = {
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
      }
    }
  };
  $("#grid").kendoGrid({
    dataSource: dataSource,
    toolbar: kendo.template($("#toolbar").html()),
    sortable: true,
    editable: {
      mode: "inline",
      createAt: "top"
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
    filterable: filterable,
    columns: columnItem
  });
  grid = $("#grid").data("kendoGrid");
}

function createWindow() {
  listbox = $("#listbox").kendoWindow({
    modal: true,
    width: "40%",
    height: '510px',
    resizable: false,
    visible: false,
    open: function () {
      $("body").addClass("overlay");
    },
    close: function () {
      $("body").removeClass("overlay");
    }
  }).data('kendoWindow');

  //添加listbox關閉按鈕
  $("#listbox").before("<button class='close'><i class='fa fa-times'></i></button>");
}

function initNotification() {
  notification = $("#notification").kendoNotification({
    templates: [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>" + "儲存成功" + "</span></div>"
    }, {
      type: "delete",
      template: "<div class='saveOrInsert zoominTrans'>" + "刪除成功" + "</span></div>"
    }, {
      type: "error",
      template: "<div class='saveOrInsert zoominTrans'>" + "儲存失敗" + "</span></div>"
    }],
    autoHideAfter: 1500
  }).data("kendoNotification");
}

function initListBox() {
  currentList = $("#current").kendoListBox({
    dataSource: [],
    dataTextField: "text",
    dataValueField: "value",
    connectWith: "available",
    selectable: "multiple",
    draggable: true,
    dropSources: ["available"],
    toolbar: {
      tools: ["moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom"]
    },
    add: function (e) {
      for (item of e.dataItems) {
        delete deletedItem[item.value];
      }
    },
    remove: function (e) {
      for (item of e.dataItems) {
        if (originItem.find(kv => kv.value == item.value)) {
          deletedItem[item.value] = item.value;
        }
      }
    }
  }).data("kendoListBox");

  availableList = $("#available").kendoListBox({
    dataSource: [],
    dataTextField: "text",
    dataValueField: "value",
    selectable: "multiple",
    draggable: true,
    dropSources: ["current"],
  }).data("kendoListBox");
}

function listBoxController() {
  $(".close").click(function () {
    listbox.close();
  });

  $(document).on('click', '.k-overlay', function () {
    var kendoWindow = $('.k-window-content.k-content', $(this).next('div.k-widget.k-window'));
    if (kendoWindow == null || kendoWindow.length == 0) {
      return;
    }
    kendoWindow.data('kendoWindow').close();
  });

  $("#listbox .confirmBtn button").click(function () {
    var type = listBoxType;
    var data = {
      "moduleUuid": listBoxUuid
    };
    data["current" + type] = currentList.dataItems().map(getValue);
    data["delete" + type] = Object.keys(deletedItem);
    var postData = new FormData();
    postData.append("module" + type, new Blob([JSON.stringify(data)], {
      type: "application/json"
    }));
    $.ajax({
      url: listBoxAPI,
      data: postData,
      method: "POST",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          notification.show({}, "saveOrInsert");
          setNoificationPosition();
          listbox.close();
        } else {
          notification.show({}, "error");
          setNoificationPosition();
        }
      } // end of ajax success
    }); //end of ajax
  }) //List Saving Confirmed
}

function gridController() {
  $("#grid").on("click", ".editGroup", function () {
    var row = $(this).closest("tr");
    $("#grid").data("kendoGrid").editRow(row);
    initEditMode();
  });

  $("#grid").on("click", ".saveGroup", function () {
    saveModule($("input[name='moduleNo']").val() != "");
  });

  $("#grid").on("click", ".cancelGroup", function () {
    $("#grid").data("kendoGrid").cancelChanges();
  });

  $('#grid').on('click', '.delete', function () {
    deleteGroup();
  });

  $('#grid').on('click', '.k-checkbox', function () {
    $("#delete").hide();
    if ($(this).parent().attr("class") == 'k-header') {
      var checkStatus = $("#grid .k-grid-header .k-checkbox").prop("checked");
      $("#grid .k-grid-content .k-checkbox").prop("checked", checkStatus);
    }
    if ($("#grid .k-grid-content tbody input:checkbox:checked").length) {
      $("#delete").show();
    }
  });
}

function baseController() {
  $("#addRow").click(function () {
    $("#grid").data("kendoGrid").addRow();
    initEditMode(true);
  });

}

function initEditMode(isAdd) {
  $("input[name='moduleNo']").parent().append($("input[name='moduleNo']").val());
  $("input[name='moduleNo']").hide();
  $("input[name='creator']").parent().append($("input[name='admin']").val());
  $("input[name='creator']").hide();
  $("input[name='modify']").parent().append($("input[name='admin']").val());
  $("input[name='modify']").hide();
  $("input[name='edit']").parent().append(saveTemplate);
  $("input[name='edit']").remove();
  $("input[name='role']").remove();
  $("input[name='memberGroup']").remove();
  $("input[name='function']").remove();
  $("input[name='moduleValue']").parent().append(errorTemplate);
  $("input[name='moduleKey']").parent().append(errorTemplate);
  $("input[name='moduleIcon']").parent().append(errorTemplate);
  if (isAdd) {
    let statusParent = $("input[name='status']").parent();
    statusParent.empty();
    statusParent.append(checkTemplate);
  }
}

function openListBox(api, uuid, target) {
  listBoxAPI = api;
  listBoxUuid = uuid;
  deletedItem = {};
  listBoxType = target;
  let type = apiType[listBoxType];
  $("#listbox .row.title > div:eq(0) > b").text("所屬" + type);
  $("#listbox .row.title > div:eq(1) > b").text("非所屬" + type);
  $.ajax({
    url: api + "/template/" + uuid,
    method: 'GET',
    success: function (data) {
      if (data.status) {
        originItem = data.response.current;
        var dataSource = new kendo.data.DataSource({
          data: data.response.current
        });
        currentList.setDataSource(dataSource);
        dataSource = new kendo.data.DataSource({
          data: data.response.available
        });
        availableList.setDataSource(dataSource);
        listbox.open();
        listbox.center();
      }
    }//end of success
  });//end of ajax
}

function saveModule(isUpdate) {
  if (verificationModule() == 0) {
    postData = setSaveData();
    if (!postData) {
      return;
    }
    $.ajax({
      url: rootApi,
      data: postData,
      method: isUpdate ? "POST" : "PUT",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          notification.show({}, "saveOrInsert");
          setNoificationPosition();
          dataSource.read();
          grid.refresh();
        } else {
          for (i of data.response) {
            $("input[name='" + i.field + "']").errorMsg({
              message: i.defaultMessage
            });
          }
        }
      } // end of ajax success
    }); //end of ajax
  }
}

function verificationModule() {
  let hasError = 0;
  let moduleKeyColumn = $("input[name='moduleKey']");
  let moduleValueColumn = $("input[name='moduleValue']");
  let moduleIconColumn = $("input[name='moduleIcon']");
  if (moduleKeyColumn.val() == "" && gridDataSourceHeader.moduleKey.required) {
    moduleKeyColumn.errorMsg({
      message: "請輸入" + gridDataSourceHeader.moduleKey.title + "!"
    });
    hasError = 1;
  }

  if (moduleValueColumn.val() == "" && gridDataSourceHeader.moduleValue.required) {
    moduleValueColumn.errorMsg({
      message: "請輸入" + gridDataSourceHeader.moduleValue.title + "!"
    });
    hasError = 1;
  }

  if (moduleIconColumn.val() == "" && gridDataSourceHeader.moduleIcon.required) {
    moduleIconColumn.errorMsg({
      message: "請輸入" + gridDataSourceHeader.moduleIcon.title + "!"
    });
    hasError = 1;
  }
  return hasError;
}

function setSaveData() {
  var postData = new FormData();
  var module = new Object();

  module.moduleUuid = $("input[name='moduleUuid']").val() ? $("input[name='moduleUuid']").val() : "0";
  module.moduleKey = $("input[name='moduleKey']").val().trim();
  module.moduleValue = $("input[name='moduleValue']").val().trim();
  module.moduleIcon = $("input[name='moduleIcon']").val().trim();
  module.status = $("input[name='status']").prop("checked");
  console.log(module.status);
  postData.append("module", new Blob([JSON.stringify(module)], {
    type: "application/json"
  }));

  return postData;
}

function getValue(obj) {
  return obj.value
}

// function deleteGroup() {
//   let postData = new FormData();
//   let memberGroup = new Object();
//   let memberGroupUuids = [];
//   let select = grid.select();
//   $.each(select, function (i, row) {
//     memberGroupUuids.push(grid.dataItem(row).moduleUuid);
//   });
//
//   memberGroup.memberGroupUuids = memberGroupUuids;
//   postData.append("memberGroup", new Blob([JSON.stringify(memberGroup)], {
//     type: "application/json"
//   }));
//
//   $.ajax({
//     url: rootApi,
//     data: postData,
//     method: "DELETE",
//     contentType: false,
//     processData: false,
//     dataType: "json",
//     success: function (data) {
//       if (data.status) {
//         notification.show({}, "delete");
//         setNoificationPosition();
//         dataSource.read();
//         grid.refresh();
//       } else {
//         for (i of data.response) {
//           $("input[name='" + i.field + "']").errorMsg({
//             message: i.defaultMessage
//           });
//         }
//       }
//     } // end of ajax success
//   }); //end of ajax
// }
