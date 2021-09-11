var rootApi = "/api/group";
var grid;
var gridDataSourceHeader;
var listbox, listBoxAPI, listBoxUuid;
var currentList, availableList;
var errorTemplate = `<span class="errorMsg color_pink"></span>`;
var notification;

var columnTemplate = {
  "edit": function (d) {
    // return "<a class='number_a' href='/page/role/form/" + d.roleUuid + "'><i class='fa fa-pencil editGroup'></i></a>";
    return "<a class='number_a' href='javascript:void(0)'><i class='fa fa-pencil editGroup'></i></a>";
  },
  "member": function (d) {
    return "<a class='number_a' href='javascript:void(0)' onclick='openListBox(rootApi + \"/member\",\"" + d.memberGroupUuid + "\",\"" + d.name + "\")'><i class='fa fa-pencil'></i></a>";
  },
  "module": function (d) {
    return "<a class='number_a' href='javascript:void(0)' onclick='openListBox(rootApi + \"/module\",\"" + d.memberGroupUuid + "\",\"" + d.name + "\")'><i class='fa fa-pencil'></i></a>";
  }
};
var saveTemplate = `
<a class='number_a' href='javascript:void(0)'><i class='fa fa-floppy-o saveGroup fa-2x'></i></a>
<a style="color: #ac2925" href='javascript:void(0)'><i class='fa fa-ban cancelGroup fa-2x'></i></a>`;

var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/grid",
      dataType: "json",
      type: "POST",
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
  schema: {
    total: function (data) {
      return data.response.totalElements
    },
    data: function (data) {
      titles = data.response.header;
      columnItem = [];
      titles = data.response.header;
      let temp = {};
      columnItem.push({
        selectable: true,
        width: "50px"
      });
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
        } //if
        if (columnTemplate[i]) {
          temp.template = columnTemplate[i];
        }
        columnItem.push(temp);
      } //loop
      gridDataSourceHeader = data.response.header;
      return data.response.contents;
    },
    moduel: {
      id: 'memberGroupUuid',
      fields: {
        memberGroupUuid: {
          type: "string"
        },
        memberGroupNo: {
          type: "string"
        },
        memberGroupKey: {
          type: "string"
        },
        name: {
          type: "string"
        },
        admin: {
          type: "string"
        },

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
    // dataBound: function (e) {
    //   $(window).scrollTop(0);
    //   sessionStorage.setItem("salesPage", $("#sales").data("kendoGrid").dataSource.page());
    //   for (i in this.columns) {
    //     this.autoFitColumn(i);
    //   }
    //   $("#sales .k-grid-header thead .k-checkbox").prop("checked", true).trigger("click");
    // },
    columns: columnItem
  });
  grid = $("#grid").data("kendoGrid");
}

function createWindow() {
  listbox = $("#listbox").kendoWindow({
    modal: true,
    width: "40%",
    height: '550px',
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
    var type = (listBoxAPI.search("member") > -1) ? "Member" : "Module";
    var data = {
      "memberGroupUuid": listBoxUuid
    }
    data["current" + type] = currentList.dataItems().map(getValue);
    data["delete" + type] = Object.keys(deletedItem);
    var postData = new FormData();
    postData.append("group" + type, new Blob([JSON.stringify(data)], {
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
    saveGroup($("input[name='memberGroupNo']").val() != "");
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
    initEditMode();
  });
}

function initEditMode() {
  $("input[name='memberGroupNo']").parent().append($("input[name='memberGroupNo']").val());
  $("input[name='memberGroupNo']").hide();
  $("input[name='admin']").parent().append($("input[name='admin']").val());
  $("input[name='admin']").hide();
  $("input[name='edit']").parent().append(saveTemplate);
  $("input[name='edit']").remove();
  $("input[name='member']").remove();
  $("input[name='module']").remove();
  $("input[name='name']").parent().append(errorTemplate);
  $("input[name='memberGroupKey']").parent().append(errorTemplate);
}

function openListBox(api, uuid, username) {
  let listUsername = username;
  $("#currentSearch").remove();
  $("#availableSearch").remove();
  listBoxAPI = api;
  listBoxUuid = uuid;
  deletedItem = {};
  var type = (listBoxAPI.search("member") > -1) ? "帳號" : "模組";
  $("#listbox .userName > b").text("編輯名稱: " + listUsername);
  $("#listbox .row.title > div:eq(0) > b").text("所屬" + type);
  $("#listbox .row.title > div:eq(1) > b").text("非所屬" + type);
  $("#current").siblings(".k-list-scroller").before('<div class="form-label-group"><input id="currentSearch" class="form-control" autocomplete="off" placeholder="尋找.." style="width:70%;height:5%" class="k-textbox" /> <label class="k-icon k-i-search"></label> </div>');
  $("#available").siblings(".k-list-scroller").before(' <div class="form-label-group"><input id="availableSearch" class="form-control" autocomplete="off" placeholder="尋找.."  style="width:85%;height:5%" class="k-textbox" /> <label class="k-icon k-i-search"></label> </div>');
  $("#currentSearch").on("input", function (e) {
    currentList.dataSource.filter({
      field: "text",
      value: $(e.target).val(),
      operator: "contains"
    });

  });
  $("#availableSearch").on("input", function (e) {
    availableList.dataSource.filter({
      field: "text",
      value: $(e.target).val(),
      operator: "contains"
    });

  });

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
    } //end of success
  }); //end of ajax

}

function saveGroup(isUpdate) {
  if (verificationGroup() == 0) {
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

function verificationGroup() {
  let hasError = 0;
  let nameColumn = $("input[name='name']");
  let memberGroupKeyColumn = $("input[name='memberGroupKey']");
  if (nameColumn.val() == "" && gridDataSourceHeader.name.required) {
    $("input[name='name']").errorMsg({
      message: "請輸入" + gridDataSourceHeader.name.title + "!"
    });
    hasError = 1;
  }

  if (memberGroupKeyColumn.val() == "" && gridDataSourceHeader.memberGroupKey.required) {
    $("input[name='memberGroupKey']").errorMsg({
      message: "請輸入" + gridDataSourceHeader.memberGroupKey.title + "!"
    });
    hasError = 1;
  }
  return hasError;
}

function setSaveData() {
  var postData = new FormData();
  var memberGroupForm = new Object();

  memberGroupForm.memberGroupUuid = $("input[name='memberGroupUuid']").val() ? $("input[name='memberGroupUuid']").val() : "0";
  memberGroupForm.memberGroupKey = $("input[name='memberGroupKey']").val() ? $("input[name='memberGroupKey']").val() : null;
  memberGroupForm.name = $("input[name='name']").val();
  postData.append("memberGroup", new Blob([JSON.stringify(memberGroupForm)], {
    type: "application/json"
  }));

  return postData;
}

function getValue(obj) {
  return obj.value
}

function deleteGroup() {
  let postData = new FormData();
  let memberGroup = new Object();
  let memberGroupUuids = [];
  let select = grid.select();
  $.each(select, function (i, row) {
    memberGroupUuids.push(grid.dataItem(row).memberGroupUuid);
  });

  memberGroup.memberGroupUuids = memberGroupUuids;
  postData.append("memberGroup", new Blob([JSON.stringify(memberGroup)], {
    type: "application/json"
  }));

  $.ajax({
    url: rootApi,
    data: postData,
    method: "DELETE",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      if (data.status) {
        notification.show({}, "delete");
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
