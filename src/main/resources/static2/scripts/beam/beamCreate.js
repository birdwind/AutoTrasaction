var filter, supplier;
var yarnQualityBatchesData = new kendo.data.DataSource();
let validatedFiles = [];
let totalSize = 0;
let allSize = [];
let weftRingAmount = 1;
let sprayAmount = 1;
$(function () {

  let formData = $("#form").formWizard({
    id: "beamCoreUuid",
    url: "/api/beam/management/template/" + uuid,
    mainData: "response.beamCore",
    noData: "findnodata",
    listUrl: "/api/beam/management/purchaseCompanys/list",
    customizeForm: "customizeForm",
    fileUpload: {
      afterUpload: "afterUpload"
    },
  }); //formWizard
  setUploadingEvent();
  $(".box_features").draggable({
    axis: "y"
  });

  $(".box_features > .right").click(function () {
    $(this).parent().css("left", "auto").animate({
      right: "-160px"
    }).delay(100).queue(function () {
      $(this).find(".left").fadeIn(100);
      $(this).dequeue();
    });
  }) //right
  $(".box_features > .left").click(function () {
    $(this).hide().parent().css("left", "auto").animate({
      right: "-10px"
    }).delay(100).queue(function () {
      $(this).find(".left").hide();
      $(this).dequeue();
    });
  }) //left

  $("#save").click(function () {

    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var postData = $("#form").formCheck({
      name: "beamCore",
    });
    var attachDetail = fw_formData.response.attachment;
    var attachments = {
      "relateUuid": fw_formData.response.beamCore.beamCoreUuid,
      "attachmentCoreUuid": attachDetail.attachmentCoreUuid,
      "verifyToken": (attachDetail.verifyToken) ? attachDetail.verifyToken : "0",
      "deleteFiles": fw_deletedFiles
    }
    postData.append("attachment", new Blob([JSON.stringify(attachments)], {
      type: "application/json"
    }));
    if (fw_uploadFiles.length) {
      for (i in fw_uploadFiles) {
        postData.append('uploadFiles', fw_uploadFiles[i].file);
      }
    }
    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }


    $.ajax({
      url: "/api/beam/management",
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
  }) //end of save
}) //$(function ()
function findnodata() {
  //$("html").remove();
  //location.replace("/page/cloth/weaving/sop");
} //findnodata
function eventsBound() {
  let multiSelect = $("select[name = 'events']").data('kendoMultiSelect');
  let data = multiSelect.dataSource.data()
  let val = [];
  let selectedItems;
  let select = []
  if (window.localStorage.events != "") {
    selectedItems = window.localStorage.events.split(", ")
  } else {
    return false;
  }
  $.each(selectedItems, function (field, value) {
    select.push(value);
  })
  select.forEach(function (element) {
    if (data.find(x => x.text.includes(element))) {
      val.push(data.find(x => x.text.includes(element)).value);
    }
  })
  multiSelect.value(val);

}

function batchNoBound() {
  let dropDownList = $("input[name = 'importDetail']").data('kendoDropDownList');
  let data = dropDownList.dataSource.data()
  if (window.localStorage.importDetail == "") {
    return false;
  }
  if (data.find(x => x.text.includes(window.localStorage.importDetail))) {
    dropDownList.value(data.find(x => x.text.includes(window.localStorage.importDetail)).value);
  }
}

function supervisorBound() {
  let dropDownList = $("input[name = 'supervisor']").data('kendoDropDownList');
  let data = dropDownList.dataSource.data()
  if (window.localStorage.supervisor == "") {
    return false;
  }
  if (data.find(x => x.text.includes(window.localStorage.supervisor))) {
    dropDownList.value(data.find(x => x.text.includes(window.localStorage.supervisor)).value);
  }
}

function customizeForm() {

  $.each(fw_formData.response.beamCore, function (index, value) {
    if (value.value == null) {
      $("input[name='" + index + "']").val("");
    }
  })

  $("input[name='beamPurchaseCompanyUuid']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/beam/management/purchaseCompanys/list",
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
    optionLabel: " ",
  });
  $("input[name='warehouseUuid']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/beam/management/warehouses/list",
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
    optionLabel: " ",
  });
  $("input[name='beamStatus']").kendoDropDownList({
    dataSource: fw_formData.response.beamCore.beamStatus.keyValue,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
  });
  if (uuid != 0) {
    $("input[name='beamPurchaseCompanyUuid']").data("kendoDropDownList").enable(false);
    $("input[name='beamPurchaseCompanyUuid']").closest(".k-dropdown").css("border-style", "none");
    $("input[name='warehouseUuid']").data("kendoDropDownList").enable(false);
    $("input[name='warehouseUuid']").closest(".k-dropdown").css("border-style", "none");
    $("input[name='beamStatus']").data("kendoDropDownList").enable(false);
    $("input[name='beamStatus']").closest(".k-dropdown").css("border-style", "none");
    $("#form2").closest(".box-success").show();
    $("#form2").show();
    $.each(fw_formData.response.beamSituation, function (index, value) {
      $("input[name='" + index + "']").siblings("nav").text(value.title);

      $("input[name='" + index + "']").val(value.value);
    })

  }
  setFileList(fw_formData.response.attachment.attachmentDetails);
}

function setFileList(data) {
  if (data.length > 0) {
    $("#removeAllFile").css("display", "inline-block");
    for (item in data) {
      var fileSize = data[item].size / (1024 * 1024);
      $("#fileSelectedTemplate .fileName").html($("<a></a>").text(data[item].originalFileName).attr("href", data[item].link));
      $("#fileSelectedTemplate .fileSize").text(`${fileSize.toFixed(3)} MB`)
      $("#fileSelectedTemplate section").attr("data-upload", data[item].attachmentDetailUuid)
      $("#fileInfo").append($("#fileSelectedTemplate").html());
      fw_totalFileSize += fileSize;
    }
  }
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
function afterUpload() {
  fw_notification.show({}, "saveOrInsert");
  setNoificationPosition();
  setTimeout(function () {
    $(".drawCheck").hide().delay(460).queue(function () {
      // location = "/page/beam/management";
      $(this).dequeue();
    });
  }, 1000);
}
