var companylist = {};
var companylistAjAX = $.ajax({
  url: "/api/warehouse/storage/company/list",
  method: "GET",
  success: function (data) {
    companylist = data.response;
  } // end of ajax success
});
var categorylist = {};
var categoryAjAX = $.ajax({
  url: "/api/warehouse/storage/category/list",
  method: "GET",
  success: function (data) {
    categorylist = data.response;
  } // end of ajax success
}); //end of ajax
var selectedValue = {};

$(async function () {
  await categoryAjAX;
  await companylistAjAX;

  console.log(companylist);
  fw_confirmBox.init({
    content: $("#confirmTemplate").html(),
    confirmEvent: "confirmDel"
  });
  var fw_checkMrak = `
    <svg width="80px" height="80px" class="checkMrak">
    <g transform="translate(10,70) scale(0.033,-0.03)" fill="none">
      <path d="M995 1305 c-62 -16 -96 -52 -189 -202 -85 -136 -244 -458 -287 -581
      -17 -51 -33 -91 -34 -90 -2 2 -23 33 -47 69 -69 103 -138 177 -175 190 -64 21
      -183 -28 -183 -75 0 -8 39 -58 86 -113 47 -54 117 -146 157 -205 81 -121 103
      -135 190 -125 78 10 89 22 142 159 102 263 249 542 422 801 51 77 93 146 93
      154 0 32 -88 42 -175 18z" fill="white"/>
    </g>
    <path d="M15 48 l9 11 q 2 5, 6 -3 l16 -27" class="drawCheck" stroke="\\#71ade9" stroke-width="10" fill="none"/>
    </svg>`
  $("body").append("<span id='notification'></span>");
  let fw_notification = $("#notification").kendoNotification({
    templates: [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
    }],
    autoHideAfter: 1500
  }).data("kendoNotification");


  var grid = new Grid("/warehouse/storage/", "grid,onlyEditColumn,check");
  grid.setSortField("warehouseNo");
  var kendoData = {
    id: "warehouseName",
    fields: {
      companyName: {
        nullable: false
      },
      warehouseCategory: {

        nullable: false,
        editable: true,
      },
      warehouseStorageName: {
        nullable: false
      },
      warehouseStorageNameEn: {
        nullable: false
      },
      warehouseStorageNo: {
        editable: false,
        nullable: true
      },
      warehouseUuid: {

        editable: false,
        nullable: false
      },

    }

  }

  let saveData = {
    url: "/api/warehouse/storage/",
    saveEvent: function (e) {
      e.preventDefault();
      let theGrid = $("#storageAreaManagement").data("kendoGrid");
      var postData = new FormData();
      var data = new Object();
      data.warehouseName = theGrid.dataItem(theGrid.select()).warehouseStorageName.trim();
      data.warehouseNameEn = theGrid.dataItem(theGrid.select()).warehouseStorageNameEn.trim();
      data.warehouseUuid = (theGrid.dataItem(theGrid.select()).warehouseUuid) ? theGrid.dataItem(theGrid.select()).warehouseUuid : 0;
      data.warehouseCategoryUuid = (theGrid.dataItem(theGrid.select()).warehouseCategory) ? theGrid.dataItem(theGrid.select()).warehouseCategory : null;
      data.companyCoreUuid = (theGrid.dataItem(theGrid.select()).companyName) ? theGrid.dataItem(theGrid.select()).companyName : null;

      postData.append("warehouse", new Blob([JSON.stringify(data)], {
        type: "application/json"
      }));
      $(".errorMsg").text("");
      $(".invalidInput").removeClass("invalidInput");

      $(".form-control").css("border-color", "#3399ff");
      $(".waitEdit").addClass("editColumns");
      $(".waitEdit").removeClass("waitEdit");
      $.ajax({
        url: "/api/warehouse/storage/",
        data: postData,
        method: (data.warehouseUuid) ? "POST" : "PUT",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.status) {
            fw_notification.show({}, "saveOrInsert");
            setNoificationPosition();
            setTimeout(function () {
              $(".drawCheck").hide().delay(460).queue(function () {
                var page = theGrid.dataSource.page();
                theGrid.dataSource.page(-1);
                theGrid.dataSource.page(page);
                theGrid.select().find(".k-checkbox-label").show();
                location.reload()
              });
            }, 1000);
          } else {

            $.each(data.response, function (index, value) {
              let fieldName = value.field;
              // switch (value.field) {
              //   case "warehouseNo":
              //     fieldName = "warehouseStorageNo"
              //     break;
              //   case "warehouseName":
              //     fieldName = "warehouseStorageName"
              //     break;
              //   case "warehouseNameEn":
              //     fieldName = "warehouseStorageNameEn"
              //     break;
              //   case "warehouseCategoryUuid":
              //     fieldName = "warehouseCategory"
              //     break;
              //   case "companyCoreUuid":
              //     fieldName = "companyName"
              //     break;
              //   default:
              //     fieldName = value.field;
              //     break;
              // }

              // $("[name='" + fieldName + "']").css("border-color", "#ff2b66");
              if ($("[name='" + fieldName + "']").siblings(".errorMsg").length == 0) {
                console.log(fieldName);
                // warehouseCategory
                if ($("[name='" + fieldName + "']").closest(".k-dropdown").length == 0) {
                  $("[name='" + fieldName + "']").after('<br><span class="errorMsg color_pink"></span>')
                } else if ($("[name='" + fieldName + "']").closest(".k-dropdown").siblings(".errorMsg").length == 0) {
                  $("[name='" + fieldName + "']").closest(".k-dropdown").after('<br><span class="errorMsg color_pink"></span>')
                }
              }
              $("[name='" + fieldName + "']").errorMsg({
                message: value.defaultMessage
              });
            });
          }
        } // end of ajax success
      }); //end of ajax


    },
    cancelEvent: function (e) {
      let theGrid = $("#storageAreaManagement").data("kendoGrid");
      theGrid.select().find(".k-checkbox-label").show();
      theGrid.clearSelection();
      $(".waitEdit").addClass("editColumns");
      $(".waitEdit").removeClass("waitEdit");
    },
  }
  grid.setModel(kendoData)
  grid.setSaveData(saveData)
  // grid.setSaveRowFunction()
  // companyName
  await grid.initDataSource();
  // warehouseCategory

  grid.setTemplate("warehouseCategory", "gridDropDown", "", "", categorylist, );
  grid.setTemplate("companyName", "gridDropDown", "", "", companylist, );
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
        eq: "相等",
        between: "選擇間距"
      }
    }
  };
  let edit = {
    mode: "inline",
    createAt: "top",
    confirmation: false,
  };
  await grid.creatKendGrid("#storageAreaManagement", filterable, edit, false);
  $(`[data-field='warehouseCategory']`).find(".k-dropdown-operator").remove();
  $(`[data-field='companyName']`).find(".k-dropdown-operator").remove();
  $('body').on('click', '#storageAreaManagement .k-checkbox', function () {
    $("#trashBin").hide();

    if ($("#storageAreaManagement .k-grid-content tbody input:checkbox:checked").length) {
      $("#trashBin").show();
    }

  }) //checkbox 
  $("#trashBin").click(function () {
    if (!$("#storageAreaManagement .k-grid-content tbody input:checkbox:checked").length) {
      return false;
    }
    fw_confirmBox.show();
  })

  $('body').on('click', '#addbtn', function () {
    var grid = $("#storageAreaManagement").data("kendoGrid");
    grid.addRow();
    var row = $("#storageAreaManagement").find(".k-grid-edit-row");
    grid.select(row);
    row.find("input").addClass("form-control");
    row.find(".k-dropdown").addClass("form-control");
    row.find(".k-datetimepicker").addClass("form-control");
    row.find(".k-checkbox-label").hide();
    row.find("input").css("width", "90%");
    if (row.find("td").siblings(".k-command-cell").find($(".editing")).length == 0) {
      row.find("td").siblings(".k-command-cell").find(".k-button").remove(".k-button");
      row.find("td").siblings(".k-command-cell").append($("#saveBtn").html());
      row.find("td").siblings(".k-command-cell").append($("#canBtn").html());
    }
    $(".editColumns").addClass("waitEdit");
    $(".editColumns").removeClass("editColumns");
  }) //checkbox 
  $("body").on("click", ".editColumns", function () {
    var row = $(this).closest("tr");
    var rowTd = $(this).closest("td");
    row.find(".k-checkbox-label").hide();
    var grid = $("#storageAreaManagement").data("kendoGrid");
    $(".form-control").css("border-color", "#3399ff");
    grid.select(row);
    grid.editRow(row);
    console.log(grid);
    row.find("input").addClass("form-control");
    row.find(".k-dropdown").addClass("form-control");
    row.find(".k-datetimepicker").addClass("form-control");
    row.find("input").css("width", "96%");
    row.find(".k-dropdown").css("width", "96%");
    rowTd.find(".k-button").remove(".k-button");
    rowTd.append($("#saveBtn").html());
    rowTd.append($("#canBtn").html());
    $(".editColumns").addClass("waitEdit");
    $(".editColumns").removeClass("editColumns");


  });
  $('body').on('click', '.deleteColumns', function () {
    var row = $(this).closest("tr");
    var grid = $("#storageAreaManagement").data("kendoGrid");
    grid.select(row);
    fw_confirmBox.show();
  })
  $('body').on('click', '.cancelBtn.circleBtn', function () {
    var grid = $("#storageAreaManagement").data("kendoGrid");
    grid.clearSelection();
  })

})

function confirmDel() {

  var uuidSet = [];
  var theGrid = $('#storageAreaManagement').data("kendoGrid");

  var postData = new FormData();
  theGrid.select().each(function () {
    uuidSet.push(theGrid.dataItem(this).warehouseUuid);
  });
  theGrid.select().each(function () {
    theGrid.removeRow(this);
  });
  postData.append("warehouseDelete", new Blob([JSON.stringify({
    "warehouseUuids": uuidSet
  })], {
    type: "application/json"
  }));
  theGrid.removeRow(theGrid.select());
  var page = theGrid.dataSource.page();
  theGrid.dataSource.page(-1);
  theGrid.dataSource.page(page);

  $.ajax({
    url: "/api/warehouse/storage/",
    data: postData,
    method: "DELETE",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      fw_confirmBox.box.find("button, h2, .fa-times").addClass("invisible");
      if (data.status) {
        fw_confirmBox.box.find(".fa-trash").show();
        fw_confirmBox.box.find(".fa-file-text-o").addClass("throwIn").delay(2000).queue(function () {
          fw_confirmBox.box.find(".fa-trash").hide();
          fw_confirmBox.box.find(".fa-file-text-o").removeClass("throwIn");
          fw_confirmBox.box.find(".invisible").removeClass("invisible");
        });
        location.reload()
      } else {
        fw_confirmBox.box.find("#errorMessage").show();
        fw_confirmBox.box.find(".fa-file-text-o").hide();
        fw_confirmBox.box.find("#errorMessage").removeClass("invisible").delay(2000).queue(function () {
          fw_confirmBox.box.find(".fa-trash").hide();
          fw_confirmBox.box.find(".fa-file-text-o").removeClass("throwIn");
          fw_confirmBox.box.find(".fa-file-text-o").show();
          fw_confirmBox.box.find(".invisible").removeClass("invisible");
          fw_confirmBox.box.find("#errorMessage").hide();
        });
      }
    } // end of ajax success
  }); //end of ajax

} //confirmDel
