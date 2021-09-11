var filter, columnItem;
var columnTemplate = {
  "unit": function (d) {
    return titles.unit.keyValue.find(kv => kv.value == d.unit).text;
  },
  "photo": function (d) {
    return `<a><i class="fa fa-camera" aria-hidden="true"></i></a>`;
  }
}
$(function () {
  $("#form").formWizard({
    id: "yarnInventoryCoreUuid",
    url: (type == "subForm") ? "/api/yarn/inventory/template/" + uuid : "/api/yarn/inventory/total/detail/template/" + uuid,
    mainData: (type == "subForm") ? "response" : "response.warehouseStock",
    // noData: "findnodata",
    customizeForm: (type == "subForm") ? "customizeForm" : "totalcustomizeForm"
  });//formWizard

  $(".box_features").draggable({
    axis: "y"
  });

  $(".box_features > .right").click(function () {
    $(this).parent().css("left", "auto").animate({ right: "-160px" }).delay(100).queue(function () {
      $(this).find(".left").fadeIn(100);
      $(this).dequeue();
    });
  })//right
  $(".box_features > .left").click(function () {
    $(this).hide().parent().css("left", "auto").animate({ right: "-10px", left: "initial" }).delay(100).queue(function () {
      $(this).find(".left").hide();
      $(this).dequeue();
    });
  })//left

  $("#save").click(function () {
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var ingredient = new Object();
    var postData = $("#form").formCheck({
      name: "yarnInventoryCore",
      otherCheck: ["yarnInventoryDetail"]
    });
    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    $.ajax({
      url: (type == "subForm") ? "/api/yarn/inventory" : "/api/yarn/inventory/single",
      data: postData,
      method: (type == "subForm") ? "POST":"PUT",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          fw_notification.show({}, "saveOrInsert");
          setNoificationPosition();
          setTimeout(function () {
            $(".drawCheck").hide().delay(460).queue(function () {
              location = "/page/yarn/inventory";
              $(this).dequeue();
            });
          }, 1000);
        } else {
          $("#save").removeClass("waitaSec");
          for (i of data.response) {
            $("[name='" + i.field + "']").errorMsg({
              message: i.defaultMessage
            });
          }
        }
      } // end of ajax success
    }); //end of ajax
  })//end of save
})//$(function ()

function findnodata() {
  $("html").remove();
  location.replace("/page/yarn/inventory");
}//findnodata

function customizeForm() {
  if (typeof (Storage) !== "undefined") {
    if (sessionStorage.getItem("inventoryCopy") != null) {
      var inventoryCopy = JSON.parse(sessionStorage.getItem("inventoryCopy"));
      for (i in inventoryCopy) {
        $("#form [name='" + i + "']").val(inventoryCopy[i].value);
      }
      sessionStorage.removeItem("inventoryCopy");
    }//if
  }//if
  var inventoryStatus = fw_formData.response.inventoryStatus;
  if (inventoryStatus.value) {
    $("[name='inventoryStatus']").prev().text(inventoryStatus.keyValue.find(kv => kv.value == inventoryStatus.value).text);
  } else {
    $("[name='checker']").kendoDropDownList({
      dataSource: {
        transport: {
          read: {
            type: "GET",
            url: "/api/yarn/inventory/checker/list",
            dataType: "json"
          }
        },
        schema: {
          data: function (data) {
            return data.response
          }
        }
      },
      dataTextField: "text",
      dataValueField: "value",
      filter: "contains",
      optionLabel: " ",
      noDataTemplate: "<span class='nodata'>查無資料</span>"
    });//checkerDownList
    $("[name='inventoryStatus']").kendoDropDownList({
      dataSource: fw_formData.response.inventoryStatus.keyValue,
      optionLabel: " ",
      dataTextField: "text",
      dataValueField: "value"
    });//supplierDropDownList
  }//if-else

  //gird
  if (fw_formData.response.inventoryStatus.value) {
    $("#save,#btn-calculator,.fa-angle-double-right.right").remove();
  } else {
    $("#save,.fa-angle-double-right.right").show();
    columnTemplate.amount = function (d) {
      return `<input name = "amount" class="form-control number" value = " ${d.amount}"'><span class="errorMsg color_pink"></span>`;
    }

    columnTemplate.note = function (d) {
      return `<input name = "note" class="form-control" value = " ${d.note}"'><span class="errorMsg color_pink"></span>`;
    }
  }

  var dataSource = new kendo.data.DataSource({
    transport: {
      read: {
        type: "POST",
        url: '/api/yarn/inventory/detail/grid/' + uuid,
        dataType: "json",
        processData: false,
        contentType: false
      }, parameterMap: function (data) {
        let postData = new FormData();
        postData.append("filter", new Blob([JSON.stringify({
          size: data.pageSize,
          page: data.page -= 1,
          filter: data.filter,
          sort: [
            {
              field: "inquiryDatetime",
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
        id: 'yarnInventoryDetailUuid'
      },
      total: function (data) {
        return data.response.totalElements;
      },
      data: function (data) {
        titles = data.response.header;
        columnItem = [];
        for (i in titles) {
          if (i == "yarnPurchase") {
            continue;
          }
          if (titles[i].type.search(/(label|command|dropDown|float)/) < 0) {
            continue;
          }
          var temp = {
            field: i,
            headerTemplate: (titles[i].required)?titles[i].title +`<span class="color_pink">*</span>`:titles[i].title
          }
          if (columnTemplate[i]) {
            temp.template = columnTemplate[i];
          }
          columnItem.push(temp);
        }//loop
        return data.response.contents;
      }
    },
    pageSize: 10
  });
  $(async function () {
    await dataSource.fetch();
    var grid = $("#grid").kendoGrid(
      {
        dataSource: dataSource,
        persistSelection: true,
        filterable: {
          mode: "row"
        },
        pageable: {
          input: true,
          numeric: true
        },
        columns: columnItem
      });
  });
}//customizeForm

function totalcustomizeForm() {
  $("#save,.fa-angle-double-right.right").remove();
  var columns = [];
  var gridData = fw_formData.response.yarnInventoryTotalGridDetailGrid;
  for (i in gridData.header) {
    if (gridData.header[i].type.search(/(label|command)/) < 0) {
      continue;
    }
    var temp = {
      field: i,
      title: gridData.header[i].title
    }
    if (columnTemplate[i]) {
      temp.template = columnTemplate[i];
    }
    columns.push(temp);
  }
  $("#grid").kendoGrid(
    {
      dataSource: {
        data: gridData.contents,
        schema: {
          total: function (data) {
            return gridData.contents.length;
          },
        },
        pageSize: 120,
      },
      filterable: {
        mode: "row"
      },
      sortable: true,
      pageable: {
        input: true,
        numeric: true
      },
      dataBound: function (e) {
        for (i in this.columns) {
          this.autoFitColumn(i);
        }
      },
      columns: columns
    });
}//totalcustomizeForm

function yarnInventoryDetail() {
  var details = [];
  $("#grid tbody").find("tr").each(function () {
    var temp = {
      "yarnInventoryDetailUuid":$("#grid").data("kendoGrid").dataItem($(this)).yarnInventoryDetailUuid
    };
    $(this).find("input").each(function () {
      if(!$(this).attr("name")){
        return;
      }
      temp[$(this).attr("name")]=$(this).val().trim();
      if (titles[$(this).attr("name")].required && !$(this).val().trim()) {
        $(this).errorMsg({
          message: "請輸入" + titles[$(this).attr("name")].title
        });
      }
    })//input loop
    details.push(temp);
  })
  var warehouse = {
    "yarnInventoryCoreUuid":uuid,
    "yarnInventoryDetails":details,
  };
  return warehouse;
}//yarnInventoryDetail
