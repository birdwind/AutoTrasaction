var titles = {}, searchCondition;
var inventory = {}, inventTotal = {};
var columnTemplate = {
  "yarnInventoryCoreNo": function (d) {
    return "<a class='number_a' href='/page/yarn/inventory/form/" + d.yarnInventoryCoreUuid + "'>" + d.yarnInventoryCoreNo + "</a>";
  },
  "export": function (d) {
    return `<a class="table_btn table_btn_green">
                    <i class="fa fa-external-link"></i>
                  </a>`
  },
  "totalStock": function (d) {
    if (d.totalStock < 0) {
      return `<span class="color_pink">${d.totalStock}</span>`;
    }
    return d.totalStock;
  },
  "status": function (d) {
    switch (d.status) {
      case true:
        return `<img src="/images/ok.svg" style="width: 25px">`;
      case false:
        return `<i class="fa fa-ban color_pink"></i>`;
      default:
        return "";
    }
  },
  "inventoryStatus": function (d) {
    switch (d.inventoryStatus) {
      case 1:
        return `<i class="fa fa-check-circle status"></i>`;
      case 0:
        return `<i class="fa fa-exclamation-circle color_pink"></i>`;
      default:
        return "";
    }
  },
  "copy": function (d) {
    return `<a class="table_btn table_btn_purple" onclick="copyInventory('` + d.yarnInventoryCoreUuid + `')" href='javascript:void(0)' data-uid="` + d.yarnPurchaseCoreUuid + `">
                    <i class="fa fa-files-o"></i>
                  </a>`
  },
  "yarnNo": function (d) {
    return "<a class='number_a' href='/page/yarn/inventory/form/" + d.warehouseStockCoreUuid + "'>" + d.yarnNo + "</a>";
  },
  "stockUnit": function (d) {
    return titles.inventTotal.stockUnit.keyValue.find(item => item.value == d.stockUnit).text
  }
}
dataSource("inventory", "/api/yarn/inventory/grid", [{ field: "yarnInventoryCoreNo", dir: "desc" }]);
dataSource("inventTotal", "/api/yarn/inventory/total/grid");

$(async function () {
  var exportTemplate = $("#exportTemplate").kendoWindow({
    modal: true,
    width: "30%",
    height: '250px',
    resizable: false,
    visible: false,
    open: function () {
      $("body").addClass("overlay");
    },
    close: function () {
      $("body").removeClass("overlay");
    }
  }).data('kendoWindow');

  $("#inventTotal").on("click", "#export", function () {
    exportTemplate.open();
    exportTemplate.center();
  })

  $("#exportTemplate .confirmBtn button").click(function () {
    $(".errorMsg").text("");
    $(".invalidInput").removeClass("invalidInput");
    if (!$("[name='inventoryName']").val().trim()) {
      $("[name='inventoryName']").addClass("invalidInput");
      $("[name='inventoryName']").next().text("請輸入盤點表名稱");
      return false;
    }
    saveInventoryName();
    $(".tabMenu [data-section='inventory'").trigger("click");
    exportTemplate.close();
  })

  $("#exportTemplate .cancelBtn button").click(function () {
    exportTemplate.close();
  })

  $(".monitormenu > li").click(function () {
    $(this).parent().children().removeClass("active");
    $(this).addClass("active");
    $(".k-grid").hide();
    $(`#${$(this).attr("data-section")}`).show();
  })

  fw_confirmBox.init({
    content: $("#confirmTemplate").html(),
    confirmEvent: "confirmDel"
  });
  await inventory.data.fetch();
  await inventTotal.data.fetch();
  creatGrid($("#inventory"), inventory);
  creatGrid($("#inventTotal"), inventTotal);

  $('body').on('input keyup', '.search input', function () {
    var key = $(this).val().trim();
    for (i in searchCondition) {
      searchCondition[i].value = key
    }
    sessionStorage.setItem("inventorySearch", key);
    $(".search > .clear").hide();
    if (key.length) {
      $(".search > .clear").show();
    }
    $('#inventory').data('kendoGrid').dataSource.filter({
      logic: 'or',
      filters: searchCondition
    });
  });//end of search

  $('body').on('click', '#inventory .k-checkbox', function () {
    $("#trashBin").hide();
    if ($("#inventory .k-grid-content tbody input:checkbox:checked").length) {
      $("#trashBin").show();
    }
  })//checkbox 
  $('body').on('click', '#inventTotal .k-checkbox', function () {
    $("#export").hide();
    if ($("#inventTotal .k-grid-content tbody input:checkbox:checked").length) {
      $("#export").show();
    }
  })//checkbox 
  $("#trashBin").click(function () {
    if (!$("#inventory .k-grid-content tbody input:checkbox:checked").length) {
      return false;
    }
    fw_confirmBox.show();
  })//trashBin

  $('body').on('click', '.search > .clear', function () {
    sessionStorage.removeItem("inventorySearch");
    $(".search input").val("").trigger("input");
  })//searchClear

  if (sessionStorage.getItem("inventorySearch") != null) {
    var page = $('#inventory').data('kendoGrid').dataSource.page();
    $(".search input").val(sessionStorage.getItem("inventorySearch")).trigger("keyup");
    $('#inventory').data('kendoGrid').dataSource.page(page)
  }
})//$(function ()
function confirmDel() {
  var uuidSet = [];
  var theGrid = $('#inventory').data("kendoGrid");
  theGrid.select().each(function () {
    uuidSet.push(theGrid.dataItem(this).yarnInventoryCoreUuid);
  });
  theGrid.select().each(function () {
    theGrid.removeRow(this);
  });
  var page = theGrid.dataSource.page();
  theGrid.dataSource.page(-1);
  theGrid.dataSource.page(page);
  var postData = new FormData();
  postData.append("yarnInventoryCore", new Blob([JSON.stringify({ "yarnInventoryCoreUuids": uuidSet })], {
    type: "application/json"
  }));

  $.ajax({
    url: "/api/yarn/inventory",
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
function copyInventory(Uuid) {
  $.ajax({
    url: "/api/yarn/inventory/template/" + Uuid,
    method: 'GET',
    success: function (data) {
      if (data.status) {
        sessionStorage.setItem("inventoryCopy", JSON.stringify(data.response));
        location = "/page/yarn/inventory/form";
      }
    }//end of success
  });//end of ajax
}
function dataSource(section, url, sort) {
  var obj = eval(section);
  obj.data = new kendo.data.DataSource({
    transport: {
      read: {
        url: url,
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
          sort: sort
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
        id: 'yarnInventoryCoreUuid'
      },
      total: function (data) {
        return data.response.totalElements
      },
      data: function (data) {
        titles[section] = data.response.header;
        obj.col = [
          {
            selectable: true
          }
        ];
        searchCondition = [];

        for (i in titles[section]) {
          if (titles[section][i].search) {
            searchCondition.push({
              field: i,
              operator: 'contains'
            })
          }//if
          if (titles[section][i].type.search(/(label|command|icon)/) < 0) {
            continue;
          }
          var temp = {
            field: i,
            title: titles[section][i].title
          }
          if (columnTemplate[i]) {
            temp.template = columnTemplate[i];
          }
          obj.col.push(temp);
        }//loop
        return data.response.contents;
      }
    },
    pageSize: 10,
    page: (sessionStorage.getItem("inventoryPage") == null) ? 1 : sessionStorage.getItem("inventoryPage")
  });
}
function creatGrid(selector, data) {
  if (selector.attr("id") == "inventTotal") {
    var btn = `<button id="export" class="btn export"><i class="fa fa-external-link"></i></button>`;
  } else {
    var btn = `<button id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></button>`;
  }
  $("#toolbar .table_bar_box").html(btn)
  selector.kendoGrid(
    {
      dataSource: data.data,
      toolbar: kendo.template($("#toolbar").html()),
      sortable: true,
      persistSelection: true,
      pageable: {
        input: true,
        numeric: true
      },
      dataBound: function (e) {
        $(window).scrollTop(0);
        sessionStorage.setItem("inventoryPage", selector.data("kendoGrid").dataSource.page());
        for (i in this.columns) {
          this.autoFitColumn(i);
        }
        selector.find(".k-grid-header thead .k-checkbox").prop("checked", true).trigger("click");
      },
      columns: data.col
    });
}
function saveInventoryName() {
  var postData = new FormData();
  var theGrid = $("#inventTotal").data("kendoGrid");
  var uuidSet = [];
  postData.append("yarnInventoryCore", new Blob([JSON.stringify({ "yarnInventoryCoreName": $("[name='inventoryName']").val().trim() })], {
    type: "application/json"
  }));
  theGrid.select().each(function () {
    uuidSet.push({ "warehouseStockCoreUuid": theGrid.dataItem(this).warehouseStockCoreUuid });
  });
  postData.append("yarnInventoryDetail", new Blob([JSON.stringify({ "yarnInventoryDetails": uuidSet })], {
    type: "application/json"
  }));
  $.ajax({
    url: "/api/yarn/inventory",
    data: postData,
    method: "PUT",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      $("#inventory").data("kendoGrid").dataSource.page(-1);
    } // end of ajax success
  }); //end of ajax
}
