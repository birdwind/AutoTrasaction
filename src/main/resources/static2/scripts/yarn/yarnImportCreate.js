var filter;
var yarnPurchaseCore = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/import/purchase/detail/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
var yarnList = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/import/yarn/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
var warehouse = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/import/warehouse/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
$(function () {
  $("#form").formWizard({
    id: "yarnImportCoreUuid",
    url: "/api/yarn/import/template/",
    mainData: "response.yarnImportCore",
    noData: "findnodata",
    customizeForm: "customizeForm",
    fileUpload:{
      afterUpload:"afterUpload"
    },
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

  $("#addInbound").click(function () {
    $("#inbound tbody").append($("#inboundTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    setIboundDropdown();
    $("#inbound tbody tr:eq(0) .del").show();
  })// addinbound click

  $("body").on("click", "#inbound .del", function () {
    $(this).closest("tr").remove();
    if ($("#inbound tbody tr").length <= 1) {
      $("#inbound tbody tr:eq(0) .del").hide();
    }
  })// inbound del click
  $("#save").click(function () {
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var ingredient = new Object();
    var postData = $("#form").formCheck({
      name: "yarnImportCore",
      otherCheck: ["yarnImportDetails"]
    });
    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    $.ajax({
      url: "/api/yarn/import",
      data: postData,
      method: "PUT",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (!data.status) {
          $("#save").removeClass("waitaSec");
          for (i of data.response) {
            $("#form [name='" + i.field + "']").errorMsg({
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
  location.replace("/page/yarn/import");
}//findnodata

function customizeForm() {
  if (typeof (Storage) !== "undefined") {
    if (sessionStorage.getItem("inboundCopy") != null) {
      var inboundCopy = JSON.parse(sessionStorage.getItem("inboundCopy"));
      mainCore = inboundCopy.yarnImportCore;
      for (i in mainCore) {
        if (mainCore[i + "Id"]) {
          $("#form [name='" + i + "']").val(mainCore[i + "Id"]);
        } else {
          $("#form [name='" + i + "']").val(mainCore[i].value);
        }
      }
      sessionStorage.removeItem("inboundCopy");
    }//if
  }//if
  $("[name='supplier']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/yarn/import/supplier/list",
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {
          return data.response
        }
      }
    },
    optionLabel: " ",
    filter: "contains",
    dataTextField: "text",
    dataValueField: "value",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//supplierDropDownList

  $("[name='importer']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/yarn/import/importer/list",
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {
          return data.response
        }
      }
    },
    optionLabel: " ",
    filter: "contains",
    dataTextField: "text",
    dataValueField: "value",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//importerDropDownList

  var inboundDetails = fw_formData.response.yarnImportDetails;
  for (i in inboundDetails.header) {
    var required = (inboundDetails.header[i].required) ? "<span class='color_pink'>*</span>" : "";
    $("#inbound thead tr th ." + i + "Title").text(inboundDetails.header[i].title).after(required);
  }
  for (i of inboundDetails.contents) {
    $("#addInbound").trigger("click");
  }//end of loop
  if (inboundDetails.contents.length <= 1) {
    $("#inbound tbody .del").hide();
  }
}//customizeForm

function yarnImportDetails() {
  var inbound = new Object();
  var inboundDetails = fw_formData.response.yarnImportDetails.header;
  inboundDetails.yarnPurchase = inboundDetails.yarnPurchaseCore;
  inboundDetails.yarnPurchaseDetail = inboundDetails.yarnPurchaseCore; 
  inboundDetails.warehouseUuid = inboundDetails.targetWarehouse;
  inbound["yarnImportCoreUuid"] = 0;
  inbound["yarnImportDetails"] = [];
  $("#inbound tbody tr").each(function () {
    var detail = {};
    detail["yarnImportDetailUuid"] = 0;
    var emptyInput = 0;
    $(this).find("input").each(function () {
      if ($(this).attr("name") == "yarnPurchase") {
        return;
      }else if (!$(this).val().trim().length) {
        detail[$(this).attr("name")] = null;
      }
      else if ($(this).hasClass("number")) {
        detail[$(this).attr("name")] = Number($(this).val().trim());
      }
      detail[$(this).attr("name")] = $(this).val().trim();
      if (inboundDetails[$(this).attr("name")].required && !$(this).val().trim().length) {
        $(this).addClass("invalidInput");
        $(this).closest(".k-dropdown").addClass("invalidInput").find("input").removeClass("invalidInput");
        $(this).closest("td").find(".errorMsg").text("請輸入" + inboundDetails[$(this).attr("name")].title);
      } else {
        if (!$(this).val().trim().length) {
          detail[$(this).attr("name")] = null;
        }
        else if ($(this).hasClass("number")) {
          detail[$(this).attr("name")] = Number($(this).val().trim());
        }
      }
    })//endo fo each
    inbound["yarnImportDetails"].push(detail);
  })//endo fo each
  return inbound;
}//yarnCellPercentages

function setIboundDropdown() {
  $("#inbound [name='yarnPurchase']:last").kendoDropDownList({
    dataSource: yarnPurchaseCore,
    filter: "contains",
    optionLabel: " ",
    change: function (e) {
      this.element.closest("tr").find("[name='yarnCore']").hide();
      var purchaseDetails = [];
      var yarnPurchaseDetail = "";
      if (this.value().length) {
        purchaseDetails = e.sender.dataItem(e.item).yarnPurchaseDetails;
      }else{
        this.element.closest("tr").find("[name='batchNo']").val("").show().prev().text("");
      }
      this.element.closest("tr").find("[name='yarnPurchaseDetail']").val(yarnPurchaseDetail)
      setYarnCoreDropdown(this.element.closest("tr").find("[name='yarnCore']"), purchaseDetails);
    },
    dataTextField: "text",
    dataValueField: "value",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//yarnUuidDropDownList
  $("#inbound [name='importUnit']:last").kendoDropDownList({
    dataSource: fw_formData.response.yarnImportDetails.header.importUnit.keyValue,
    dataTextField: "text",
    dataValueField: "value"
  });//isWeightDropDownList

  $("#inbound [name='warpWeft']:last").kendoDropDownList({
    dataSource: fw_formData.response.yarnImportDetails.header.warpWeft.keyValue,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//warpWeftDropDownList
  $("#inbound [name='targetWarehouse']:last").kendoDropDownList({
    dataSource: warehouse,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
    filter: "contains",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//warpWeftDropDownList
  setDefaultYarnCoreDropdown();
}//setIboundDropdown
function setYarnCoreDropdown(obj, list) {
  obj.val("");
  if (!list.length) {
    setDefaultYarnCoreDropdown();
    return;
  }
  obj.kendoDropDownList({
    dataSource: list,
    filter: "contains",
    optionLabel: " ",
    change: function (e) {
      var yarnPurchaseDetail = "";
      var batchNo = "";
      if (this.value().length) {
        batchNo = e.sender.dataItem(e.item).batchNo;
        yarnPurchaseDetail = e.sender.dataItem(e.item).yarnPurchaseDetailUuid;
      }
      this.element.closest("tr").find("[name='batchNo']").val(batchNo).show();
      this.element.closest("tr").find("[name='batchNo']").prev().text(batchNo);
      if(batchNo.length){
        this.element.closest("tr").find("[name='batchNo']").hide();
      }
      this.element.closest("tr").find("[name='yarnPurchaseDetail']").val(yarnPurchaseDetail);
    },
    dataTextField: "text",
    dataValueField: "yarnCoreUuid",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//yarnUuidDropDownList
}
function setDefaultYarnCoreDropdown() {
  $("#inbound [name='yarnCore']:last").kendoDropDownList({
    dataSource: yarnList,
    filter: "contains",
    optionLabel: " ",
    dataTextField: "text",
    dataValueField: "value",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//yarnUuidDropDownList
}
function afterUpload(){
  fw_notification.show({}, "saveOrInsert");
  setNoificationPosition();
  setTimeout(function () {
    $(".drawCheck").hide().delay(460).queue(function () {
      location = "/page/yarn/import";
      $(this).dequeue();
    });
  }, 1000);
}

