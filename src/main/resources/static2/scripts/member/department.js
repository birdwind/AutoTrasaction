let rootApi = "/api/department";
let grid;
let gridDataSourceHeader;
let errorTemplate = `<span class="errorMsg color_pink"></span>`;
let notification;
let columnTemplate = {
  "edit": function (d) {
    return "<a class='number_a' href='javascript:void(0)'><i class='fa fa-pencil editGroup'></i></a>";
  },
  "deletable": function (d) {
    return d.deletable ?
      "<a class='number_a' href='javascript:void(0)'><i class='fa fa-trash deleteCheck' style='font-size: 20px'></i></a>" : "";
  }
};

let saveTemplate = `
<a class='number_a' href='javascript:void(0)'><i class='fa fa-floppy-o saveGroup fa-2x'></i></a>
<a style="color: #ac2925" href='javascript:void(0)'><i class='fa fa-ban cancelGroup fa-2x'></i></a>`;

let dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/grid",
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
      columnItem.push({selectable: true, width: "50px"});
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
      id: 'functionUuid',
      fields: {
        functionUuid: {
          type: "string"
        },
        functionNo: {
          type: "string"
        },
        functionKey: {
          type: "string"
        },
        functionValue: {
          type: "string"
        },
        frontUrl: {
          type: "string"
        },
        backUrl: {
          type: "string"
        },
        note: {
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

  initNotification();

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

function initNotification() {
  let notificationTemplate = [{
    type: "saveOrInsert",
    template: "<div class='saveOrInsert zoominTrans'>" + "儲存成功" + "</span></div>"
  }, {
    type: "delete",
    template: "<div class='saveOrInsert zoominTrans'>" + "刪除成功" + "</span></div>"
  }, {
    type: "error",
    template: "<div class='errorNotification zoominTrans'>" + "儲存失敗" + "</span></div>"
  },{
    type: "deleteError",
    template: "<div class='errorNotification zoominTrans'>" + "尚有子部門" + "</span></div>"
  }];
  notification = setNotification(null, null, notificationTemplate);
}

function gridController() {
  $("#grid").on("click", ".editGroup", function () {
    var row = $(this).closest("tr");
    $("#grid").data("kendoGrid").editRow(row);
    initEditMode();
  });

  $("#grid").on("click", ".saveGroup", function () {
    saveDepartment($("input[name='departmentNo']").val() != "");
  });

  $("#grid").on("click", ".cancelGroup", function () {
    $("#grid").data("kendoGrid").cancelChanges();
  });

  $('#grid').on('click', '.delete', function () {
    deleteDepartment();
  });

  $('#grid').on('click', '.k-checkbox', function () {
    $("#delete").hide();
    if ($(this).parent().attr("class") == 'k-header') {
      var checkStatus = $("#grid .k-grid-header .k-checkbox").prop("checked");
      $("#grid .k-grid-content .k-checkbox").prop("checked", checkStatus);
    }
    let items = grid.select();

    items.each(function (i, e) {
      let dataItem = grid.dataItem(e);
      if (dataItem.deletable === false) {
        $(e).removeClass("k-state-selected");
        notification.show({}, "deleteError");
        setNoificationPosition();
        $(e).find(".k-checkbox").prop("checked", "");
      }
    });
    if ($("#grid .k-grid-content tbody input:checkbox:checked").length) {
      $("#delete").show();
    }
  });

  $('#grid').on('click', '.deleteCheck', function () {
    $(this).parents('tr').find('.k-checkbox').click();
  });

  $('#grid').on('click', '.undeleteCheck', function () {
    notification.show({}, "deleteError");
    setNoificationPosition();
  });
}

function baseController() {
  $("#addRow").click(function () {
    $("#grid").data("kendoGrid").addRow();
    initEditMode();
  });
}

function initEditMode() {
  setDropDownListUI($("input[name='parentDepartmentName']"), setDataSource("/parent/list"), null, $("input[name='parentDepartmentName']").val());
  $("input[name='departmentNo']").parent().append($("input[name='departmentNo']").val());
  $("input[name='departmentNo']").hide();
  $("input[name='edit']").parent().append(saveTemplate);
  $("input[name='edit']").remove();
  $("input[name='deletable']").remove();
  $("input[name='parentDepartmentName']").parent().append(errorTemplate);
  $("input[name='departmentName']").parent().append(errorTemplate);
}

function saveDepartment(isUpdate) {
  if (verification() == 0) {
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
          notification.show({}, "error");
          setNoificationPosition();
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

function verification() {
  let hasError = 0;
  let departmentNameColumn = $("input[name='departmentName']");
  let parentDepartmentNameColumn = $("input[name='parentDepartmentName']");

  if (departmentNameColumn.val() == "" && gridDataSourceHeader.departmentName.required) {
    departmentNameColumn.errorMsg({
      message: "請輸入" + gridDataSourceHeader.departmentName.title + "!"
    });
    hasError = 1;
  }

  if (parentDepartmentNameColumn.val() == "" && gridDataSourceHeader.parentDepartmentName.required) {
    parentDepartmentNameColumn.errorMsg({
      message: "請輸入" + gridDataSourceHeader.parentDepartmentName.title + "!"
    });
    hasError = 1;
  }

  return hasError;
}

function setSaveData() {
  var postData = new FormData();
  var deparment = new Object();

  deparment.departmentUuid = $("input[name='departmentUuid']").val() ? $("input[name='departmentUuid']").val() : "0";
  deparment.parentDepartmentUuid = $("input[name='parentDepartmentName']").val().trim() ? $("input[name='parentDepartmentName']").val().trim() : null;
  deparment.departmentName = $("input[name='departmentName']").val().trim();
  postData.append("department", new Blob([JSON.stringify(deparment)], {
    type: "application/json"
  }));

  return postData;
}

function getValue(obj) {
  return obj.value
}

function deleteDepartment() {
  let postData = new FormData();
  let departmentDelete = new Object();
  let departmentUuids = [];
  let select = grid.select();
  $.each(select, function (i, row) {
    departmentUuids.push(grid.dataItem(row).departmentUuid);

  });

  departmentDelete.departmentUuids = departmentUuids;
  postData.append("departmentDelete", new Blob([JSON.stringify(departmentDelete)], {
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
        notification.show({}, "error");
        setNoificationPosition();
        for (i of data.response) {
          $("input[name='" + i.field + "']").errorMsg({
            message: i.defaultMessage
          });
        }
      }
    } // end of ajax success
  }); //end of ajax
}

function setDataSource(api) {
  return new kendo.data.DataSource({
    transport: {
      read: {
        url: rootApi + api,
        dataType: "json"
      }
    },
    schema: {
      data: function (data) {
        return data.response;
      }
    }
  });
}
