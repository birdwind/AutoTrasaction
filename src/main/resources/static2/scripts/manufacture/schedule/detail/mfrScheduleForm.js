var apiUrl = "";
var detailDataElement = "";
var fw_IsUploadFile, fw_uploadFiles = [],
  fw_deletedFiles = [];
var fw_fileId = 1,
  fw_totalFileSize = 0,
  fw_attachSize = 0,
  fw_now = new Date();
fw_now.setMinutes(parseInt(fw_now.getMinutes() / 5) * 5);
fw_now.setSeconds(0);
var update;
var statusData = [{
    text: "已完成",
    value: "true"
  },
  {
    text: "未完成",
    value: "false"
  }
];
var DataArray = [];
var backUrl = "/page/manufacture/detail/schedule";

var batchNolist = {};
var batchNolistAjAX = $.ajax({
  url: "/api/manufacture/schedule/detail/batchNo/list/" + uuid,
  method: "GET",
  success: function (data) {
    batchNolist = data.response;
  } // end of ajax success
});
var warehouselist = {};
var warehouseAjAX = $.ajax({
  url: "/api/manufacture/schedule/detail/beam/warehouse/list",
  method: "GET",
  success: function (data) {
    warehouselist = data.response;
  } // end of ajax success
}); //end of ajax
var beamlist = {};
var beamlistAjAX = $.ajax({
  url: "/api/manufacture/schedule/detail/beam/list",
  method: "GET",
  success: function (data) {
    beamlist = data.response;
  } // end of ajax success
}); //end of ajax
var warpingStaffList = {};
var warpingStaffListAjAX = $.ajax({
  url: "/api/manufacture/schedule/detail/warping/staff/list",
  method: "GET",
  success: function (data) {
    warpingStaffList = data.response;
  } // end of ajax success
}); //end of ajax
var selectedValue = {};


$(async function () {
  await warehouseAjAX;
  await beamlistAjAX;
  await warpingStaffListAjAX;
  await batchNolist;
  //根據站別設定api 
  switch (station) {
    case "warping":
      apiUrl = "/api/manufacture/schedule/detail/warping/template/" + uuid;
      detailDataElement = "response.scheduleWarpingCore";
      break;
      // case "drafting":
      //     apiUrl = "/api/manufacture/schedule/drafting/template/" + uuid;
      //     detailDataElement = "response.orderScheduleCore";
      //     break;
      // case "weaving":
      //     apiUrl = "/api/manufacture/schedule/weaving/template/" + uuid;
      //     detailDataElement = "response.orderScheduleCore";
      //     break;
      // case "inspection":
      //     apiUrl = "/api/manufacture/schedule/inspection/template/" + uuid;
      //     detailDataElement = "response.orderScheduleCore";
      //     break;
      // case "shipment":
      //     apiUrl = "/api/manufacture/schedule/shipment/template/" + uuid;
      //     detailDataElement = "response.scheduleShipmentCore";
      //     break;
  }
  //form.wizard

  $("#form").formWizard({
    id: "clothOrderDetailDeliverQuantityUuid",
    url: apiUrl,
    mainData: "response.orderScheduleCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
  }); //formWizard

  setUploadingEvent();

  $("body").append("<span id='update'></span>");
  update = $("#update").kendoNotification({
    templates: [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
    }],
    autoHideAfter: 1500
  }).data("kendoNotification");

  $("#saveBatch").click(function () {
    var method = "";
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");

    if (verification() == 0) {
      var postData = new FormData();
      //資料處理
      postData = setSaveBatch();

      if (!postData) {
        $(this).removeClass("waitaSec");
        return;
      }
      $.ajax({
        url: "/api/manufacture/schedule/detail/warping/batchNo",
        data: postData,
        method: "POST",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.status) {
            fw_notification.show({}, "saveOrInsert");
            setNoificationPosition();
            setTimeout(function () {
              $(".drawCheck").hide().delay(460).queue(function () {
                window.location.reload();
                $(this).dequeue();
              });
            }, 1000);
          } else {
            $("#saveBatch").removeClass("waitaSec");
            for (i of data.response) {
              $("#form [name='" + i.field + "']").errorMsg({
                message: i.defaultMessage
              });
              if (i.code == "Error.MultipartFile.MaxSizeExceeded") {
                $("#fileupload .fileError").addClass("color_pink");
              }
            }
          }
        } // end of ajax success
      }); //end of ajax
    } else {
      $(this).removeClass("waitaSec");
      return;
    }
  })

  $("body").on("click", "#save", function () {
    var method = "";
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");

    if (verification() == 0) {
      var postData = new FormData();
      //資料處理
      postData = setSaveData();

      if (!postData) {
        $(this).removeClass("waitaSec");
        return;
      }

      $.ajax({
        url: "/api/manufacture/schedule/detail/" + station,
        data: postData,
        method: "PUT",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.status) {
            fw_notification.show({}, "saveOrInsert");
            setNoificationPosition();
            setTimeout(function () {
              $(".drawCheck").hide().delay(460).queue(function () {
                window.location.reload();
                $(this).dequeue();
              });
            }, 1000);
          } else {
            $("#save").removeClass("waitaSec");
            for (i of data.response) {
              $("#form [name='" + i.field + "']").errorMsg({
                message: i.defaultMessage
              });
              if (i.code == "Error.MultipartFile.MaxSizeExceeded") {
                $("#fileupload .fileError").addClass("color_pink");
              }
            }
          }
        } // end of ajax success
      }); //end of ajax
    } else {
      $(this).removeClass("waitaSec");
      return;
    }
  })
  $('body').on('click', '#addbtn', function () {
    $("#formGrid").data("kendoGrid").addRow();
    var row = $("#formGrid").find(".k-grid-edit-row");
    row.find("input").addClass("form-control");
    row.find("input").addClass("number");
    row.find(".k-dropdown").addClass("form-control");
    row.find(".k-datetimepicker").addClass("form-control");
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
    $("#formGrid").data("kendoGrid").editRow(row);
    row.find("input").addClass("number");
    row.find("input").addClass("form-control");
    row.find(".k-dropdown").addClass("form-control");
    row.find(".k-datetimepicker").addClass("form-control");
    row.find("input").css("width", "90%");
    rowTd.find(".k-button").remove(".k-button");
    rowTd.append($("#saveBtn").html());
    rowTd.append($("#canBtn").html());
    $(".editColumns").addClass("waitEdit");
    $(".editColumns").removeClass("editColumns");
  });
  $('body').on('click', '.editing', function () {
    $(".waitEdit").addClass("editColumns");
    $(".waitEdit").removeClass("waitEdit");
  }) //checkbox 

})

async function customizeForm() {
  let existBarch = [];
  let multiselectData = [];
  let warpYarns = fw_formData.response.scheduleWarpingCore.warpYarns;
  $.each(warpYarns, function (i) {
    $('#warpYarnsTemplate').find("#name").text(warpYarns[i].yarnNo.value)
    $('#warpYarns').find(".box-body").append($("#warpYarnsTemplate").html());
    $.each(warpYarns[i].batchNoAmounts, function (j) {
      existBarch.push({
        text: "批號 : " + warpYarns[i].batchNoAmounts[j].batchNo.value + "/" + warpYarns[i].batchNoAmounts[j].exportAmount.value,
        value: warpYarns[i].batchNoAmounts[j].yarnExportDetailUuid
      })
      multiselectData.push(warpYarns[i].batchNoAmounts[j].yarnExportDetailUuid)
    });
  });

  var multiselect = $("[name='warpYarnsExist']").kendoMultiSelect({
    dataSource: existBarch,
    dataTextField: "text",
    dataValueField: "value",
    filter: "contains",
    filtering: function (e) {
      if (e.filter != undefined) {
        filter = e.filter;
      }
    },
    value: 1,
    noDataTemplate: "<span class='nodata'>查無資料 </span>"
  }).data("kendoMultiSelect"); // end of createMultiSelect
  multiselect.value(multiselectData);
  DataArray = multiselect.value();
  $("[name='warpYarns']").kendoMultiSelect({
    dataSource: batchNolist,
    dataTextField: "text",
    dataValueField: "value",
    filter: "contains",
    filtering: function (e) {
      if (e.filter != undefined) {
        filter = e.filter;
      }
    },
    value: 1,
    noDataTemplate: "<span class='nodata'>查無資料 </span>"
  }); // end of createMultiSelect
  kendo.ui.progress($("#grid"), true);
  var grid = new Grid("", "grid,editColumn,noToolbar");
  var kendoData = new kendo.data.DataSource({
    data: fw_formData.response.scheduleWarpingDetail.contents,
    schema: {
      model: {
        id:"beamCore",
        fields: {
          actualFinishDatetime: {
            type: "datetime",
            validation: {
              actualFinishDatetimeValidation: function () {
                if ($("input[name='actualFinishDatetime']").val() != "" && $("input[name='actualStartDatetime']").val() == "") {
                  $("input[name='actualStartDatetime']").closest(".k-datetimepicker").css("border-color", "#ff2b66");
                  return $("input[name='actualFinishDatetime']").val();
                } else {
                  $("input[name='actualStartDatetime']").closest(".k-datetimepicker").css("border-color", "#3399ff");
                  return true;
                }
              }
            }
          },
          actualStartDatetime: {
            type: "datetime",
            validation: {
              actualStartDatetimeValidation: function () {
                if ($("input[name='actualStartDatetime']").val() != "" && $("input[name='actualFinishDatetime']").val() == "") {
                  $("input[name='actualFinishDatetime']").closest(".k-datetimepicker").css("border-color", "#ff2b66");
                  return $("input[name='actualStartDatetime']").val();
                } else {
                  $("input[name='actualFinishDatetime']").closest(".k-datetimepicker").css("border-color", "#3399ff");
                  return true;
                }
              }
            }
          },
          beamCore: {
            type: "text",
            validation: {
              beamCoreValidation: function () {
                if ($("input[name='beamCore']").val() == "") {
                  $("input[name='beamCore']").closest(".k-dropdown").css("border-color", "#ff2b66");
                  return $("input[name='beamCore']").val();
                } else {
                  $("input[name='beamCore']").closest(".k-dropdown").css("border-color", "#3399ff");
                  return true;
                }
              }
            }
          },
          targetWarehouse: {
            type: "text",
            validation: {
              targetWarehouseValidation: function () {
                if ($("input[name='targetWarehouse']").val() != "" && $("input[name='warpingLength']").val() == "") {
                  $("input[name='warpingLength']").css("border-color", "#ff2b66");
                  return $("input[name='targetWarehouse']").val();
                } else {
                  $("input[name='targetWarehouse']").closest(".k-dropdown").css("border-color", "#3399ff");
                  $("input[name='warpingLength']").css("border-color", "#3399ff");
                  return true;
                }
              }
            }
          },
          warpingLength: {
            type: "float",
            validation: {
              warpingLengthValidation: function () {
                if ($("input[name='warpingLength']").val() != "" && $("input[name='targetWarehouse']").val() == "") {
                  $("input[name='targetWarehouse']").closest(".k-dropdown").css("border-color", "#ff2b66");
                  return $("input[name='warpingLength']").val();
                } else {
                  $("input[name='targetWarehouse']").closest(".k-dropdown").css("border-color", "#3399ff");
                  $("input[name='warpingLength']").css("border-color", "#3399ff");
                  return true;
                }
              }
            }
          },
          warpingStaff: {
            type: "text",
            validation: {
              warpingStaffValidation: function () {
                if ($("input[name='targetWarehouse']").val() != "" && $("input[name='warpingStaff']").val() == "" && $("input[name='warpingLength']").val() != "") {
                  $("input[name='targetWarehouse']").closest(".k-dropdown").css("border-color", "#3399ff");
                  $("input[name='warpingLength']").css("border-color", "#3399ff");
                  $("input[name='warpingStaff']").closest(".k-dropdown").css("border-color", "#ff2b66");
                  $(document.body).find("span.k-tooltip-validation").hide();
                  return $("input[name='warpingStaff']").val();
                  //
                } else {
                  $("input[name='warpingStaff']").closest(".k-dropdown").css("border-color", "#3399ff");
                  return true;
                }

              }
            }
          }
        }

      }
    }
  })

  await grid.initDataSource(fw_formData.response.scheduleWarpingDetail, kendoData);
  grid.setTemplate("beamCore", "gridEditDropDown", "", "", beamlist, "#=generateTemplate(beamlist,selectedValue.beamCore)#", );
  grid.setTemplate("targetWarehouse", "gridEditDropDown", "", "", warehouselist,"#=generateTemplate(warehouselist,selectedValue.targetWarehouse)#", );
  grid.setTemplate("warpingStaff", "gridEditDropDown", "", "", warpingStaffList, "#=generateTemplate(warpingStaffList,selectedValue.warpingStaff)#", );
  grid.setTemplate("actualStartDatetime", "date");
  grid.setTemplate("actualFinishDatetime", "date");
  let edit = {
    mode: "inline",
    createAt: "buttom",
    confirmation: false,
  };
  await grid.creatKendGrid("#formGrid", false, edit, true);
  $(".editColumns").click()
  var gridExist = new Grid("", "grid,noToolbar");
  kendoData = new kendo.data.DataSource({
    data: fw_formData.response.scheduleWarpingDetailExist.contents,
  })
  await gridExist.initDataSource(fw_formData.response.scheduleWarpingDetailExist, kendoData);
  await gridExist.creatKendGrid("#formGridExist", false, false, true);
  var detailTemplate = kendo.template($("#detail").html(), {
    useWithBlock: true
  });
  switch (station) {
    case "warping":
      $("#form").append(detailTemplate(fw_formData.response.scheduleWarpingCore));
      if ($("[name='warpingFactory']").attr("type") != "hidden") {
        //dataSource
        var warpingFactoryData = new kendo.data.DataSource({
          transport: {
            read: {
              url: "/api/manufacture/schedule/warping/factory/list",
              dataType: "json"
            }
          },
          schema: {
            data: function (data) {
              return data.response
            }
          }
        });
        setDropDownListUI("[name='warpingFactory']", warpingFactoryData, $("[name='warpingFactory']").val(), null);
      }
      if ($("[name='scheduleWarpingCoreStatus']").attr("type") != "hidden") {
        setDropDownListUIByJsonData("[name='scheduleWarpingCoreStatus']", statusData, $("[name='scheduleWarpingCoreStatus']").val(), null);
      } else {
        SetInitPage(true, backUrl);
      }
      break;
    case "drafting":
      $("#form").append(detailTemplate(fw_formData.response.scheduleDraftingCore));
      if ($("[name='draftingFactory']").attr("type") != "hidden") {
        //dataSource
        var draftingFactoryData = new kendo.data.DataSource({
          transport: {
            read: {
              url: "/api/manufacture/schedule/drafting/factory/list",
              dataType: "json"
            }
          },
          schema: {
            data: function (data) {
              return data.response
            }
          }
        });
        setDropDownListUI("[name='draftingFactory']", draftingFactoryData, $("[name='draftingFactory']").val(), null);
      }
      if ($("[name='scheduleDraftingCoreStatus']").attr("type") != "hidden") {
        setDropDownListUIByJsonData("[name='scheduleDraftingCoreStatus']", statusData, $("[name='scheduleDraftingCoreStatus']").val(), null);
      } else {
        SetInitPage(true, backUrl);
      }
      break;
    case "weaving":
      $("#form").append(detailTemplate(fw_formData.response.scheduleWeavingCore));
      if ($("[name='weavingFactory']").attr("type") != "hidden") {
        //dataSource
        var weavingFactoryData = new kendo.data.DataSource({
          transport: {
            read: {
              url: "/api/manufacture/schedule/weaving/factory/list",
              dataType: "json"
            }
          },
          schema: {
            data: function (data) {
              return data.response
            }
          }
        });
        setDropDownListUI("[name='weavingFactory']", weavingFactoryData, $("[name='weavingFactory']").val(), null);
      }
      if ($("[name='scheduleWeavingCoreStatus']").attr("type") != "hidden") {
        setDropDownListUIByJsonData("[name='scheduleWeavingCoreStatus']", statusData, $("[name='scheduleWeavingCoreStatus']").val(), null);
      } else {
        SetInitPage(true, backUrl);
      }
      break;
    case "inspection":
      $("#form").append(detailTemplate(fw_formData.response.scheduleInspectionCore));
      if ($("[name='scheduleInspectionCoreStatus']").attr("type") != "hidden") {
        setDropDownListUIByJsonData("[name='scheduleInspectionCoreStatus']", statusData, $("[name='scheduleInspectionCoreStatus']").val(), null);
      } else {
        SetInitPage(true, backUrl);
      }
      break;
    case "shipment":
      $("#form").append(detailTemplate(fw_formData.response.scheduleShipmentCore));
      if ($("[name='scheduleShipmentCoreStatus']").attr("type") != "hidden") {
        setDropDownListUIByJsonData("[name='scheduleShipmentCoreStatus']", statusData, $("[name='scheduleShipmentCoreStatus']").val(), null);
      } else {
        SetInitPage(true, backUrl);
      }
      break;
  }
  setDateTimeUI();
  kendo.ui.progress($("#grid"), false);
}

function generateTemplate(ReportList, selected) {
  if (selected) {
    $.each(ReportList, function (index, value) {
      if (selected == value.value) {
        console.log(selected);
        result = value.text
      }
    })

    return result;
  } else {
    return "";
  }
}

function verification() {
  console.log($("#formGrid").data().kendoGrid.dataSource)
  var hasError = 0;
  var data = [];
  // switch (station) {
  //   case "warping":
  //     data = fw_formData.response.scheduleWarpingCore;
  //     break;
  //   case "drafting":
  //     data = fw_formData.response.scheduleDraftingCore;
  //     break;
  //   case "weaving":
  //     data = fw_formData.response.scheduleWeavingCore;
  //     break;
  //   case "inspection":
  //     data = fw_formData.response.scheduleInspectionCore;
  //     break;
  //   case "shipment":
  //     data = fw_formData.response.scheduleShipmentCore;
  //     break;
  // }

  // for (item in data) {
  //   if (data[item] == null) {
  //     continue;
  //   }
  //   if (data[item].title == undefined) {
  //     continue;
  //   }
  //   if (data[item].required && $("[name='" + item + "']").val() == "") {
  //     $("[name='" + item + "']").errorMsg({
  //       message: "請輸入" + data[item].title + "!"
  //     });
  //     hasError = 1;
  //   }
  // }
  // if ($("[name='" + item + "']").val() == "") {
  //   $("[name='" + item + "']").errorMsg({
  //     message: "請輸入" + data[item].title + "!"
  //   });
  //   hasError = 1;
  // }
  return hasError;
}

function setSaveData() {
  var postData = new FormData();
  var relateUuid = "0";

  var scheduleWarpingDetailFormWrapper = new Object();

  scheduleWarpingDetailFormWrapper.scheduleWarpingCoreUuid = fw_formData.response.scheduleWarpingCore.scheduleWarpingCoreUuid;

  relateUuid = fw_formData.response.scheduleWarpingCore.scheduleWarpingCoreUuid;

  scheduleWarpingDetailFormWrapper.scheduleWarpingDetails = []
  $.each($("#formGrid").data().kendoGrid.dataSource.view(), function (i) {
    let data = $("#formGrid").data().kendoGrid.dataSource.view()[i];
    scheduleWarpingDetailFormWrapper.scheduleWarpingDetails.push({
      beamCore: data.beamCore,
      warpingStaff: data.warpingStaff,
      actualStartDatetime: moment($("#formGrid").data().kendoGrid.dataSource.view()[i].actualStartDatetime.value).format("YYYY-MM-DDTHH:mm:ssZ"),
      actualFinishDatetime: moment($("#formGrid").data().kendoGrid.dataSource.view()[i].actualFinishDatetime.value).format("YYYY-MM-DDTHH:mm:ssZ"),
      warpLength: data.warpingLength,
      targetWarehouse: data.targetWarehouse
    })
  })

  postData.append("scheduleWarpingDetails", new Blob([JSON.stringify(scheduleWarpingDetailFormWrapper)], {
    type: "application/json"
  }));
  return postData;
}

function setSaveBatch() {

  var multiselect1 = $("[name='warpYarns']").data("kendoMultiSelect"); // end of createMultiSelect
  var multiselect2 = $("[name='warpYarnsExist']").data("kendoMultiSelect"); // end of createMultiSelect
  var deleteArray = [];
  $.each(DataArray, function (index, value) {
    if (multiselect2.value()[index] != value) {
      deleteArray.push(value);
    }
  })
  var postData = new FormData();

  var scheduleWarpingDetailBatchNo = new Object();
  scheduleWarpingDetailBatchNo.scheduleWarpingCoreUuid = fw_formData.response.scheduleWarpingCore.scheduleWarpingCoreUuid;
  scheduleWarpingDetailBatchNo.yarnExportDetailUuids = multiselect1.value();
  scheduleWarpingDetailBatchNo.deleteYarnExportDetailUuids = deleteArray;


  postData.append("scheduleWarpingDetailBatchNo", new Blob([JSON.stringify(scheduleWarpingDetailBatchNo)], {
    type: "application/json"
  }));
  return postData;
}



function setUploadingEvent() {
  $("#selectFile").click(function () {
    $("input[name='upload']").trigger("click");
  })
  $("#removeAllFile").click(function () {
    fw_uploadFiles = [];
    fw_totalFileSize = 0;
    $("#fileInfo").find(".theprogress").each(function () {
      if ($(this).find(".fileName a").length > 0) {
        fw_deletedFiles.push($(this).attr("data-upload"));
      }
    });
    $("input[name='upload']").val("");
    $("#fileInfo").html("");
    $(this).hide();
    $("#fileupload .fileError").removeClass("color_pink");
  })
  $("body").on("click", ".delSingleFile", function () {
    var fId = $(this).closest(".theprogress").attr("data-upload");
    if ($(this).closest(".theprogress").find(".fileName a").length > 0) {
      fw_deletedFiles.push(fId);
    }
    $(this).closest(".theprogress").remove();
    var fileDetail = fw_uploadFiles.find(item => item.fileId == fId);
    if (fileDetail != undefined) {
      var index = fw_uploadFiles.indexOf(fileDetail);
      fw_uploadFiles.splice(index, 1);
      fw_totalFileSize -= (fileDetail.file.size / (1024 * 1024));
    }
    if (fw_totalFileSize < 10) {
      $("#fileupload .fileError").removeClass("color_pink");
      $(this).removeClass("waitaSec");
    }
    if ($("#fileInfo .theprogress").length <= 0) {
      $("#removeAllFile").hide();
    }
  }) //delSingleFile

  $("body").on("click", ".dlBtn .delFile", function () {
    fw_deletedFiles.push($(this).closest(".dlBtn").attr("fileId"));
    $(this).closest(".dlBtn").remove();
  }) //delFile

  $("input[name='upload']").change(function (e) {
    $("#removeAllFile").hide();
    if ($(this)[0].files) {
      $("#removeAllFile").css("display", "inline-block");
      for (i in $(this)[0].files) {
        if (isNaN(i)) {
          continue;
        }
        var fileSize = $(this)[0].files[i].size / (1024 * 1024);
        $("#fileSelectedTemplate .fileName").text($(this)[0].files[i].name);
        $("#fileSelectedTemplate .fileSize").text(`${fileSize.toFixed(3)} MB`)
        $("#fileSelectedTemplate section").attr("data-upload", fw_fileId)
        $("#fileInfo").append($("#fileSelectedTemplate").html());
        if ($(this)[0].files[i].type.search(/(pdf|image)/g) < 0) {
          $("#fileInfo > .theprogress:last .error").text("檔案類型不符");
          $("#fileInfo > .theprogress:last").delay(700).fadeOut(600).delay(500).queue(function () {
            if ($("#fileInfo .theprogress").length <= 1) {
              $("#removeAllFile").hide();
            }
            $(this).remove();
            $(this).dequeue();
          });
          continue;
        } //if
        fw_totalFileSize += fileSize;
        fw_uploadFiles.push({
          "fileId": fw_fileId,
          "file": $(this)[0].files[i]
        });
        fw_fileId++;
      } //loop
      if (fw_totalFileSize > 10) {
        $("#fileupload .fileError").addClass("color_pink");
        $(window).scrollTop($("#fileupload").offset().top - 10);
      }
    }
  });
} //setUploadingEvent
