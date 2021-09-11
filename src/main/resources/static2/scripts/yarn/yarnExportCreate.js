var filter;
var outboundCopy
if (typeof (Storage) !== "undefined") {
  if (sessionStorage.getItem("outboundCopy") != null) {
    outboundCopy = JSON.parse(sessionStorage.getItem("outboundCopy"));
    sessionStorage.removeItem("outboundCopy");
  }//if
}//if

var warehouseData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/export/warehouse/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});

var gridWarehouseData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/export/warehouse/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
var applierData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/export/applier/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
var exporterData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/export/exporter/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
var YarnImportDetail;

let validatedFiles = [];
$(function () {
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
    $(this).hide().parent().css("left", "auto").animate({ right: "-10px" }).delay(100).queue(function () {
      $(this).find(".left").hide();
      $(this).dequeue();
    });
  })//left
  $("#form").formWizard({
    id: "yarnExportCoreUuid",
    url: "/api/yarn/export/template/" + uuid,
    mainData: "response.yarnExportCore",
    noData: "findnodata",
    customizeForm: "customizeForm",
    fileUpload:{
      afterUpload:"afterUpload"
    },
  });//formWizard
  $("#addOutbound").click(function () {
    $("#outbound tbody").append($("#outboundTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    $("#outbound tbody tr:eq(0) .del").show();
    initGridDropDownList();
  });// addOutbound  click
  $("body").on("click", "#outbound .del", function () {
    $(this).closest("tr").remove();
    if ($("#outbound tbody tr").length <= 1) {
      $("#outbound tbody tr:eq(0) .del").hide();
    }
  });// outbound del click
  $("#save").click(function () {
    if (verification() == 0) {
      var postData = new FormData();
      if ($(this).hasClass("waitaSec")) {
        return;
      }
      $(this).addClass("waitaSec");
      var yarnExportCore = new Object();
      yarnExportCore.yarnExportCoreUuid = "0";
      var yarnExportDetails = new Object();
      $("#form").find("input,select,textarea").each(function () {
        switch ($(this).attr("name")) {
          case "warehouse":
            yarnExportCore.warehouse = $(this).val();
            break;
          case "exportActualDate":
            yarnExportCore.exportActualDate = new Date($(this).val());
            break;
          case "exporter":
            yarnExportCore.exporter = $(this).val();
            break;
          case "applier":
            yarnExportCore.applier = $(this).val();
            break;
          case "note":
            if ($(this).val() != "") {
              yarnExportCore.note = $(this).val();
            }
            break;
          default:
            break;
        }

      });
      postData.append("yarnExportCore", new Blob([JSON.stringify(yarnExportCore)], {
        type: "application/json"
      }));
      var yarnExportDetails = new Array();
      $("#outbound tbody tr").each(function () {
        var yarnExportDetail = new Object();
        yarnExportDetail.yarnExportDetailUuid = "0";
        $(this).find("input,select,textarea,checkbox").each(function () {
          switch ($(this).attr("name")) {
            case "gridYarnImportDetail":
              yarnExportDetail.yarnImportDetail = $(this).val();
            case "gridAmount":
              yarnExportDetail.exportAmount = Number($(this).val());
            case "gridUnit":
              yarnExportDetail.exportUnit = Number($(this).val());
              break;
            case "transferWarehouse":
              yarnExportDetail.isTransfer = $(this).prop("checked");
              break;
            case "gridWarehouse":
              if ($(this).val() != "") {
                yarnExportDetail.warehouse = $(this).val();
              }
              break;
            case "gridWarpWeft":
              yarnExportDetail.warpWeft = Number($(this).val());
              break;
            default:
              break;
          }
        });
        yarnExportDetails.push(yarnExportDetail);
      });
      var Obj = new Object();
      Obj.yarnExportCoreUuid = "0";
      Obj.yarnExportDetails = yarnExportDetails
      postData.yarnExportDetails = Obj;
      postData.append("yarnExportDetails", new Blob([JSON.stringify(Obj)], {
        type: "application/json"
      }));
      if (!postData) {
        $(this).removeClass("waitaSec");
        return;
      }
      $.ajax({
        url: "/api/yarn/export",
        data: postData,
        method: "PUT",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (!data.status) {
            $("#save").removeClass("waitaSec");
            for (i of data.response) {
              switch (i.field) {
                case "warehouseUuid":
                  $("#form [name='warehouse']").errorMsg({
                    message: i.defaultMessage
                  });
                  break;
                case "exportActualDate":
                  $("#form [name='exportActualDate']").errorMsg({
                    message: i.defaultMessage
                  });
                  break;
                case "applierMemberCoreUuid":
                  $("#form [name='applier']").errorMsg({
                    message: i.defaultMessage
                  });
                  break;
                case "exporterMemberCoreUuid":
                  $("#form [name='exporter']").errorMsg({
                    message: i.defaultMessage
                  });
                  break;
              }
              var yarnExportDetailsField = i.field.split('.');
              if (yarnExportDetailsField.length == 2) {
                var row = (Number(yarnExportDetailsField[0].replace("yarnExportDetails[", "").replace("]", "")) + 1).toString();
                switch (yarnExportDetailsField[1]) {
                  case "exportAmount":
                    $("#gridUnit_" + row).errorMsg({
                      message: i.defaultMessage
                    });
                    break;
                  case "exportUnit":
                    $("#gridUnit_" + row).errorMsg({
                      message: i.defaultMessage
                    });
                    break;
                  case "warehouseTransfer":
                    $("#gridWarehouse_" + row).errorMsg({
                      message: i.defaultMessage
                    });
                    break;
                  case "yarnImportDetail":
                    $("#gridYarnImportDetail_" + row).errorMsg({
                      message: i.defaultMessage
                    });
                    break;
                }
              }
            }
          }
        } // end of ajax success
      }); //end of ajax
    }//end of verification
  })//end of save  
});

function findnodata() {
  $("html").remove();
  location.replace("/page/yarn/export");
}//findnodata

function customizeForm() {
  kendo.ui.progress($("#grid"), true);
  var yarnExportDetails = fw_formData.response.yarnExportDetails.header;
  //Set #outbound coloum title
  for (prop in yarnExportDetails) {
    switch (yarnExportDetails[prop].required) {
      case true:
        $("#outbound thead ." + prop + "Title").text(yarnExportDetails[prop].title)
          .append("<span class='color_pink'>*</span>");
        break;
      case false:
        $("#outbound thead ." + prop + "Title").text(yarnExportDetails[prop].title);
        break;
    }
  }
  $(async function () {
    await warehouseData.fetch();
    await exporterData.fetch();
    await applierData.fetch();
    await gridWarehouseData.fetch();
    initFormDropDownList();

    if (outboundCopy != null) {
      var mainCore = outboundCopy.yarnExportCore;
      var details = outboundCopy.yarnExportDetails.contents;
      for (i of outboundCopy.yarnExportDetails.contents) {
        $("#addOutbound").trigger("click");
      }//end of loop
      if (outboundCopy.yarnExportDetails.contents.length <= 1) {
        $("#outbound tbody .del").hide();
      }

      $("#form [name='warehouse']").data("kendoDropDownList")
        .text(mainCore.warehouse.value);

      $("#form [name='exporter']").data("kendoDropDownList")
        .text(mainCore.exporter.value);

      $("#form [name='applier']").data("kendoDropDownList")
        .text(mainCore.applier.value);

      for (i in mainCore) {
        switch (i) {
          case "exportActualDate":
            $("#form [name='exportActualDate']").val(mainCore[i].value);
            break;
          case "note":
            $("#form [name='note']").val(mainCore[i].value);
            break;
        }
      }

      initGridDropDownList();
      YarnImportDetail = getYarnImportDetail();


      for (var i = 0; i < details.length; i++) {
        var row = (i + 1).toString();
        await YarnImportDetail.fetch();
        var ddlData = $("#gridYarnImportDetail_" + row).data("kendoDropDownList");
        ddlData.setDataSource(YarnImportDetail);
        $("#gridYarnImportDetail_" + row).data("kendoDropDownList").text(details[i].yarnImportDetail);
        $("#gridAmount_" + row).val(details[i].exportAmount);
        $("#gridUnit_" + row).data("kendoDropDownList").value(details[i].exportUnit.toString());
        if (details[i].warehouseTransfer != "") {
          $("#transferWarehouse_" + row).attr("checked", true);
          warehouseControl("transferWarehouse_" + row);
          $("#gridWarehouse_" + row).data("kendoDropDownList").text(details[i].warehouseTransfer);
        }
        $("#gridWarpWeft_" + row).data("kendoDropDownList").value(details[i].warpWeft.toString());
      }
    }
    else {
      $("#addOutbound").trigger("click");
      $("#outbound tbody .del").hide();
      initGridDropDownList();
    }
    kendo.ui.progress($("#grid"), false);
  });
}

function initFormDropDownList() {
  //下拉式選單初始化
  function onSelect(e) {
    if ($("#form [name='warehouse']").val() != "") {
      if (!confirm("更改「出庫倉庫將會異動「紗種批號」，先前的編輯將會遺失，您確定要進行此異動？」")) {
        e.preventDefault();
      }
      else {
        $("#outbound tbody tr").remove();
        $("#addOutbound").trigger("click");
        $("#outbound tbody .del").hide();
        initGridDropDownList();
      }
    }
  }
  function onChange() {
    YarnImportDetail = getYarnImportDetail();
    for (var i = 0; i < $("[name='gridYarnImportDetail']").length; i++) {
      var row = (i + 1).toString();
      var ddlData = $("#gridYarnImportDetail_" + row).data("kendoDropDownList");
      ddlData.setDataSource(YarnImportDetail);
    }
  }
  $("#form [name='warehouse']").kendoDropDownList({
    dataSource: warehouseData,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    filter: "contains",
    select: onSelect,
    change: onChange
  });
  $("[name='exporter']").kendoDropDownList({
    dataSource: exporterData,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
    filter: "contains",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });
  $("[name='applier']").kendoDropDownList({
    dataSource: applierData,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
    filter: "contains",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });

}

function initGridDropDownList() {
  function onChange(e) {
    var currentId = e.sender.element.attr('id');
    //alert(currentId);
    $("#" + currentId).errorMsg({ message: "" });
    $("#" + currentId).closest(".box_inputdata,td").find(".invalidInput").removeClass("invalidInput");
  }
  var row = $("#outbound tbody tr").length;
  $("#outbound [name='gridYarnImportDetail']:last").attr("id", "gridYarnImportDetail_" + row.toString());

  $("#outbound [name='gridYarnImportDetail']:last").kendoDropDownList({
    dataSource: YarnImportDetail,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
    filter: "contains",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    change: onChange,
    select: function (e) {
      if (e.dataItem.noInventory) {
        alert("所選紗種批號已無庫存可提！");
        e.preventDefault();
      }
    }
  });
  $("#outbound [name='gridAmount']:last").attr("id", "gridAmount_" + row.toString());
  $("#outbound [name='gridUnit']:last").attr("id", "gridUnit_" + row.toString());
  $("#outbound [name='gridUnit']:last").kendoDropDownList({
    dataSource: fw_formData.response.yarnExportDetails.header.exportUnit.keyValue,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
    filter: "contains",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    change: onChange
  });

  $("#outbound [name='transferWarehouse']:last").attr("id", "transferWarehouse_" + row.toString());
  $("#outbound [name='gridWarehouse']:last").attr("id", "gridWarehouse_" + row.toString());
  $("#outbound [name='gridWarehouse']:last").kendoDropDownList({
    dataSource: gridWarehouseData,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
    filter: "contains",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    change: onChange
  }).closest(".k-widget").hide();

  $("#outbound [name='gridWarpWeft']:last").attr("id", "gridWarpWeft_" + row.toString());
  $("#outbound [name='gridWarpWeft']:last").kendoDropDownList({
    dataSource: fw_formData.response.yarnExportDetails.header.warpWeft.keyValue,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
    filter: "contains",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    change: onChange
  });

  $("#outbound [name='gridTargetStation']:last").kendoDropDownList({
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
    filter: "contains",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    change: onChange
  });

  $("#outbound [name='gridTargetOrder']:last").kendoDropDownList({
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
    filter: "contains",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    change: onChange
  });
}

function warehouseControl(id) {
  if ($("#" + id).prop("checked")) {
    $("#" + id).siblings(".k-widget").show();
  }
  else {
    var ddl = $("#" + id).siblings(".k-widget").find("[name='gridWarehouse']").data("kendoDropDownList");
    ddl.select(-1);
    $("#" + id).siblings(".k-widget").hide();
  }
}

function removeOutbound() {
  $("#outbound tbody tr").remove();
}

function verification() {
  var hasError = 0;
  if ($("[name='warehouse']").val() == "") {
    $("[name='warehouse']").errorMsg({
      message: "請選擇出庫倉庫!"
    });
    hasError = 1;
  }
  if ($("[name='exportActualDate']").val() == "") {
    $("[name='exportActualDate']").errorMsg({
      message: "請選擇出庫時間!"
    });
    hasError = 1;
  }
  if ($("[name='exporter']").val() == "") {
    $("[name='exporter']").errorMsg({
      message: "請選擇處理人員!"
    });
    hasError = 1;
  }
  if ($("[name='applier']").val() == "") {
    $("[name='applier']").errorMsg({
      message: "請選擇領料人員!"
    });
    hasError = 1;
  }
  $("#outbound tbody [name='gridYarnImportDetail']").each(function () {
    if ($(this).val() == "") {
      $(this).errorMsg({
        message: "請選擇紗種批號!"
      });
      hasError = 1;
    }
  });
  $("#outbound tbody [name='gridAmount']").each(function () {
    if ($(this).val() == "") {
      $(this).errorMsg({
        message: "請填寫數量!"
      });
      hasError = 1;
    }
  });
  $("#outbound tbody [name='gridUnit']").each(function () {
    if ($(this).val() == "") {
      $(this).errorMsg({
        message: "請選擇數量單位!"
      });
      hasError = 1;
    }
  });
  $("#outbound tbody [name='gridWarpWeft']").each(function () {
    if ($(this).val() == "") {
      $(this).errorMsg({
        message: "請選擇經/緯!"
      });
      hasError = 1;
    }
  });
  return hasError;
}

function getYarnImportDetail() {
  YarnImportDetail = new kendo.data.DataSource({
    transport: {
      read: {
        url: "/api/yarn/export/import/" + $("#form [name='warehouse']").val() + "/list",
        dataType: "json"
      }
    },
    schema: {
      data: function (data) {
        return data.response
      }
    }
  });
  return YarnImportDetail;
}
function afterUpload(){
  fw_notification.show({}, "saveOrInsert");
  setNoificationPosition();
  setTimeout(function () {
    $(".drawCheck").hide().delay(460).queue(function () {
      location = "/page/yarn/export";
      $(this).dequeue();
    });
  }, 1000);
}
