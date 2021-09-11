var purchaselist = {};
var purchaselistAjAX = $.ajax({
  url: "/api/machine/inspection/purchase/company/list",
  method: "GET",
  success: function (data) {
    purchaselist = data.response;
  } // end of ajax success
});
var subordinatelist = {};
var subordinateAjAX = $.ajax({
  url: "/api/machine/inspection/subordinate/company/list",
  method: "GET",
  success: function (data) {
    subordinatelist = data.response;
  } // end of ajax success
}); //end of ajax
var warehouselist = {};
var warehouseAjAX = $.ajax({
  url: "/api/machine/inspection/warehouse/list",
  method: "GET",
  success: function (data) {
    warehouselist = data.response;
  } // end of ajax success
}); //end of ajax
var selectedValue = {};
var duplicateWarehouseInspectionMachineCore = null;

$(async function () {
  await purchaselistAjAX;
  await subordinateAjAX;
  await warehouseAjAX;


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



  var grid = new Grid("/machine/inspection/", "grid,onlyEditColumn,check");
  grid.setSortField("purchaseDate", "desc");
  var kendoData = {
    id: "inspectionMachineCoreNo",
    fields: {
      subordinateCompanyName: {
        nullable: false
      },
      purchaseDate: {
        nullable: false,
        editable: true,
      },
      inspectionMachineCoreNo: {
        nullable: false,
        editable: false
      },
      purchaseCompanyName: {
        nullable: false
      },
      warehouseName: {
        nullable: false
      },
      inspectionMachineCoreUuid: {
        editable: false,
        nullable: false
      },

    }

  }

  let saveData = {
    url: "/api/machine/inspection/",
    saveEvent: function (e) {
      let duplicate = false;
      console.log(e);
      fw_confirmBox.init({
        content: $("#confirmSave").html(),
        confirmEvent: "confirmSave"
      });
      $.each(warehouselist, function (index, value) {

        if (value.value == e.model.warehouseName && value.relateInspectionMachineCoreUuid && value.relateInspectionMachineCoreUuid != e.model.inspectionMachineCoreUuid) {
          duplicate = true;
          duplicateWarehouseInspectionMachineCore = value.relateInspectionMachineCoreUuid;
        }
      })
      if (duplicate) {
        fw_confirmBox.show();
      } else {
        confirmSave();
      }
      e.preventDefault();
    },
    cancelEvent: function (e) {
      let theGrid = $("#inspection").data("kendoGrid");
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
  grid.setTemplate("subordinateCompanyName", "gridDropDown", "", "", purchaselist, );
  grid.setTemplate("purchaseCompanyName", "gridDropDown", "", "", subordinatelist, );
  grid.setTemplate("warehouseName", "gridDropDown", "", "", warehouselist, );
  grid.setTemplate("purchaseDate", "date");
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
  await grid.creatKendGrid("#inspection", filterable, edit, false);
  $('body').on('click', '#inspection .k-checkbox', function () {
    $("#trashBin").hide();

    if ($("#inspection .k-grid-content tbody input:checkbox:checked").length) {
      $("#trashBin").show();
    }

  }) //checkbox 
  $("#trashBin").click(function () {
    if (!$("#inspection .k-grid-content tbody input:checkbox:checked").length) {
      return false;
    }
    fw_confirmBox.show();
  })

  $('body').on('click', '#addbtn', function () {
    var grid = $("#inspection").data("kendoGrid");
    grid.addRow();
    var row = $("#inspection").find(".k-grid-edit-row");
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
    var grid = $("#inspection").data("kendoGrid");
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
    fw_confirmBox.init({
      content: $("#confirmTemplate").html(),
      confirmEvent: "confirmDel"
    });
    var row = $(this).closest("tr");
    var grid = $("#inspection").data("kendoGrid");
    grid.select(row);
    fw_confirmBox.show();
  })
  $('body').on('click', '.cancelBtn.circleBtn', function () {
    var grid = $("#inspection").data("kendoGrid");
    grid.clearSelection();
  })

})
function confirmSave() {
  let theGrid = $("#inspection").data("kendoGrid");
  var postData = new FormData();
  var data = new Object();

  data.inspectionMachineCoreUuid = (theGrid.dataItem(theGrid.select()).inspectionMachineCoreUuid) ? theGrid.dataItem(theGrid.select()).inspectionMachineCoreUuid.trim() : 0;
  data.subordinateCompanyName = theGrid.dataItem(theGrid.select()).subordinateCompanyName.trim();
  data.purchaseDate = moment(theGrid.dataItem(theGrid.select()).purchaseDate.value).format("YYYY-MM-DD");
  data.purchaseCompanyName = (theGrid.dataItem(theGrid.select()).purchaseCompanyName) ? theGrid.dataItem(theGrid.select()).purchaseCompanyName.trim() : 0;
  data.warehouseName = (theGrid.dataItem(theGrid.select()).warehouseName) ? theGrid.dataItem(theGrid.select()).warehouseName.trim() : 0;
  data.duplicateWarehouseInspectionMachineCoreUuid = duplicateWarehouseInspectionMachineCore;

  postData.append("inspectionMachineCore", new Blob([JSON.stringify(data)], {
    type: "application/json"
  }));

  $(".waitEdit").addClass("editColumns");
  $(".waitEdit").removeClass("waitEdit");
  $.ajax({
    url: "/api/machine/inspection/",
    data: postData,
    method: (data.inspectionMachineCoreUuid) ? "POST" : "PUT",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      if (data.status) {
        fw_confirmBox.box.data("kendoWindow").close();
        let fw_notification = $("#notification").kendoNotification({
          templates: [{
            type: "saveOrInsert",
            template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
          }],
          autoHideAfter: 1000
        }).data("kendoNotification");
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
          $("input[name='" + value.field + "']").css("border-color", "#ff2b66");
        });
      }
    } // end of ajax success
  }); //end of ajax


}

function confirmDel() {

  var uuidSet = [];
  var theGrid = $('#inspection').data("kendoGrid");

  var postData = new FormData();
  theGrid.select().each(function () {
    uuidSet.push(theGrid.dataItem(this).inspectionMachineCoreUuid);
  });
  theGrid.select().each(function () {
    theGrid.removeRow(this);
  });
  postData.append("inspectionMachineCoreDelete", new Blob([JSON.stringify({
    "inspectionMachineCoreUuids": uuidSet
  })], {
    type: "application/json"
  }));
  theGrid.removeRow(theGrid.select());
  var page = theGrid.dataSource.page();
  theGrid.dataSource.page(-1);
  theGrid.dataSource.page(page);

  $.ajax({
    url: "/api/machine/inspection/",
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

        // fw_confirmBox.box.find("h2").text("確定刪除?");
        // fw_confirmBox.box.find(".fa-file-text-o").removeClass("throwIn");
        // fw_confirmBox.box.find(".invisible").removeClass("invisible");

      } else {
        // fw_confirmBox.box.find("#errorMessage")
        fw_confirmBox.box.find("#errorMessage").show();
        fw_confirmBox.box.find(".fa-file-text-o").hide();
        fw_confirmBox.box.find("#errorMessage").removeClass("invisible").delay(2000).queue(function () {
          fw_confirmBox.box.find(".fa-trash").hide();
          fw_confirmBox.box.find(".fa-file-text-o").removeClass("throwIn");
          fw_confirmBox.box.find(".fa-file-text-o").show();
          fw_confirmBox.box.find(".invisible").removeClass("invisible");
          fw_confirmBox.box.find("#errorMessage").hide();
        });
        // fw_confirmBox.box.find(".fa-trash").hide();
        // fw_confirmBox.box.find(".invisible").removeClass("invisible");
      }
    } // end of ajax success
  }); //end of ajax

} //confirmDel
