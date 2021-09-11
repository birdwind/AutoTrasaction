var rootApi = "/api/vendor/supply/management";
var title = {};
var parentGrid;
var parentGridKendo;
var childGrid;
var childGridKendo;
var parentSupplyChain = getApiData("/supply/chain/list");
window.localStorage.clear();

$(async function () {
  await initGrid(parentGrid, parentGridKendo, "/vendor/supply/management/parent/", "#parentGrid");
  await initGrid(childGrid, childGridKendo, "/vendor/supply/management/", "#childGrid");
  parentGridKendo = $("#parentGrid").data("kendoGrid");
  childGridKendo = $("#childGrid").data("kendoGrid");

  baseController();
});

async function initGrid(saveGrid, gridKendo, api, template) {
  saveGrid = new Grid(api, "grid", "supplyChain", "");
  saveGrid.setSortField("createDate", "desc");
  await saveGrid.initDataSource();
  title = saveGrid.getI18n();
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
  saveGrid.columns.push({
    command: [{
      name: "edit",
      template: function () {
        return `<a ></a>`
      }
    }],
    width: "90px"
  });
  let edit = {
    mode: "inline",
    createAt: "top"

  };
  await saveGrid.creatKendGrid(template, filterable, edit, null, "top");
}

function baseController() {
  //tab控制
  $(".monitormenu > li").click(function () {
    $(this).parent().children().removeClass("active");
    $(this).addClass("active");
    $(".k-grid").hide();
    $(`#${$(this).attr("data-section")}`).show();
  });

  $("#parentGrid .addbtn").click(function () {
    addRow(parentGridKendo, "#parentGrid");
    //設定主分類歸屬為不可輸入
    $("#parentGrid .k-grid-edit-row td").find("input[name='parentSupplyChain']").remove();
  });

  $("#childGrid .addbtn").click(function () {
    addRow(childGridKendo, "#childGrid");
    //設定主分類歸屬下拉式選單
    let parentSupplyChainDropDownList = $("#childGrid .k-grid-edit-row td").find("input[name='parentSupplyChain']");
    setDropDownListUI(parentSupplyChainDropDownList, parentSupplyChain, null, null);

    //重設分類代碼列表
    parentSupplyChainDropDownList.data("kendoDropDownList").setDataSource(getApiData("/supply/chain/list"));
    
    //清空分類代碼欄
    $("#childGrid .k-grid-edit-row td").find("input[name='chainCode']").parent().empty();
  });

  $('#parentGrid').on('click', '#cancel', function () {
    parentGridKendo.cancelRow();
  });

  $('#childGrid').on('click', '#cancel', function () {
    childGridKendo.cancelRow();
  });

  $('#parentGrid').on('click', '#save', function () {
    saveToServer(parentGridKendo, "#parentGrid");
  });

  $('#childGrid').on('click', '#save', function () {
    saveToServer(childGridKendo, "#childGrid");
  });
}


function saveToServer(gridKendo, grid) {
  var postData = new FormData();
  if (verification(gridKendo, grid) == 0) {
    postData = setSaveData(grid);
    if (!postData) {
      return;
    }
    $.ajax({
      url: rootApi,
      data: postData,
      method: "PUT",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          gridKendo.dataSource.read();
          gridKendo.refresh();
        } else {
          for (i of data.response) {
            $(grid + " input[name='" + i.field + "']").errorMsg({
              message: i.defaultMessage
            });
          }
        }
      } // end of ajax success
    }); //end of ajax
  } else {
    $(this).removeClass("waitaSec");
    return;
  }
}

function addRow(grid, gridTemplate) {
  grid.addRow();
  editRow = $(gridTemplate + " .k-grid-edit-row td");
  columns = grid.columns;

  //設置輸入格文字置中
  for (i in columns) {
    editRow.find('input[name="' + columns[i].field + '"]').css("text-align", "center");
  }

  //添加錯誤訊息預留位
  let errorTemplate = kendo.template($("#errorTemplate").html(), {useWithBlock: true});
  $(gridTemplate + " .k-grid-edit-row td").append(errorTemplate);

  //編輯狀態欄位設定
  $(gridTemplate + " .k-grid-edit-row td.k-command-cell").empty();
  $(gridTemplate + " .k-grid-edit-row td.k-command-cell").append(kendo.template($("#addRowColumn").html(), {useWithBlock: true}));
  $(gridTemplate + " .k-grid-edit-row td.k-command-cell").find(".table_btn").css("display", "");
}


function setSaveData(grid) {
  var postData = new FormData();
  var supplyChainManagement = new Object();

  supplyChainManagement.supplyChainUuid = "0";
  supplyChainManagement.supplyChainNo = $(grid + " input[name='supplyChainNo']").val() ? $(grid + " input[name='supplyChainNo']").val() : null;
  supplyChainManagement.parentSupplyChain = $(grid + " input[name='parentSupplyChain']").val() ? $(grid + " input[name='parentSupplyChain']").val() : null;
  supplyChainManagement.chainCode = $(grid + " input[name='chainCode']").val() ? $(grid + " input[name='chainCode']").val() : null;
  supplyChainManagement.name = $(grid + " input[name='name']").val();
  postData.append("supplyChainManagement", new Blob([JSON.stringify(supplyChainManagement)], {
    type: "application/json"
  }));

  console.log(supplyChainManagement);
  return postData;
}

function verification(gridKendo, grid) {
  var hasError = 0;
  var columns = gridKendo.columns;

  for (i in columns) {
    switch (columns[i].field) {
      case "supplyChainNo":
        required = true;
        if (checkInputData(required, columns[i].field, columns[i].title, grid)) {
          hasError = 1;
        }
        break;
      case "parentSupplyChain":
        required = true;
        if (grid === "#parentGrid") {
          break;
        }
        if (required && $(grid + " [name='" + columns[i].field + "']").data("kendoDropDownList").value() == "") {
          $(grid + " [name='" + columns[i].field + "']").errorMsg({
            message: "請輸入" + columns[i].title + "!"
          });
          hasError = 1;
        } else {
          $(grid + " [name='" + columns[i].field + "']").errorMsg({
            message: ""
          });
          $(grid + " .k-dropdown").removeClass("invalidInput");
        }
        break;
      case "chainCode":
        required = true;
        if (grid === "#childGrid") {
          break;
        }
        if (checkInputData(required, columns[i].field, columns[i].title, grid)) {
          hasError = 1;
        }
        ;
        break;
      case "name":
        required = true;
        if (checkInputData(required, columns[i].field, columns[i].title, grid)) {
          hasError = 1;
        }
        ;
        break;
      default:
        break;
    }
  }
  // alert(hasError);
  return hasError;
}

//檢查輸入資料
function checkInputData(required, field, title, grid) {
  if (required && $(grid + " [name='" + field + "']").val() == "") {
    $(grid + " [name='" + field + "']").errorMsg({
      message: "請輸入" + title + "!"
    });
    return 1;
  } else {
    $(grid + " [name='" + field + "']").errorMsg({
      message: ""
    });
    $(grid + " [name='" + field + "']").removeClass("invalidInput");
    return;
  }
}

//獲取資料
function getApiData(api) {
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
