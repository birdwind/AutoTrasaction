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
var backUrl = "/page/manufacture/schedule";
var fw_uploadPanel = `<div id="fileupload" class="box-body">
<div class="col-md-12 box_inputdata">
  <fieldset>
    <div class="form-group">
      <nav>檔案上傳</nav>
      <span>
        <a href="javascript:void(0)" id="selectFile" class="table_btn_status btn_upload inline">
          多檔選取 <i class="fa fa-folder-open-o"></i>
        </a>
        <span class="inlin fileError">&nbsp;檔案累計勿超過10MB</span>
      </span>
      <span>
        <a href="javascript:void(0)" id="removeAllFile" class="table_btn_status clear_upload inline">
          清除未上傳檔案 <i class="fa fa-trash"></i>
        </a>
      </span>
      <input type="file" name="upload" multiple style="display:none">
    </div>
  </fieldset>
</div>
<div class="col-md-12 box_inputdata">
  <fieldset style="margin-left:15%;">
      <span id="fileInfo">
      </span>
      <span id="fileList">
      </span>
  <fieldset>
</div>
</div><!--#fileupload-->`
var fw_fileTemplate = `
<section id="fileSelectedTemplate" style="display:none;">
  <section class="theprogress">
    <h4>
      <span class="fileName"></span>&nbsp;
      <span class='color_pink error' style="font-weight:normal"></span>
    </h4>
    <div>
      <span class="fileSize"></span>
      <a href="javascript:void(0)" class="table_btn_status btn_download delSingleFile">
        清除 &times;
      </a>
    </div>
    </div>
    <div class="progress">
      <div class="progress-bar" role="progressbar">
    </div>
  </section>
</section>
<section id="fileDLtemplate" style="display:none;">
  <section class="dlBtn">
    <span>
      <a href="javascript:void(0)" class="table_btn_status btn_download">
        <span class="filenName"></span>
        &nbsp;<i class="fa fa-download"></i>
      </a>
      <button class='delFile'><i class='fa fa-times'></i></button>
    </span>
  </section>
</section>`
$(function () {
  //根據站別設定api
  switch (station) {
    case "warping":
      apiUrl = "/api/manufacture/schedule/warping/template/" + uuid;
      detailDataElement = "response.scheduleWarpingCore";
      break;
    case "drafting":
      apiUrl = "/api/manufacture/schedule/drafting/template/" + uuid;
      detailDataElement = "response.orderScheduleCore";
      break;
    case "weaving":
      apiUrl = "/api/manufacture/schedule/weaving/template/" + uuid;
      detailDataElement = "response.orderScheduleCore";
      break;
    case "inspection":
      apiUrl = "/api/manufacture/schedule/inspection/template/" + uuid;
      detailDataElement = "response.orderScheduleCore";
      break;
    case "shipment":
      apiUrl = "/api/manufacture/schedule/shipment/template/" + uuid;
      detailDataElement = "response.scheduleShipmentCore";
      break;
  }
  //form.wizard
  $("#form").formWizard({
    id: "clothOrderDetailDeliverQuantityUuid",
    url: apiUrl,
    mainData: "response.orderScheduleCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
  }); //formWizard

  $("#form").after(fw_uploadPanel);
  $("#fileupload").hide();
  $("body").append(fw_fileTemplate);
  setUploadingEvent();

  $("body").append("<span id='update'></span>");
  update = $("#update").kendoNotification({
    templates: [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
    }],
    autoHideAfter: 1500
  }).data("kendoNotification");

  $("#save").click(function () {
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

      //判斷 API URL 與 傳輸方式
      switch (station) {
        case "warping":
          if (fw_formData.response.scheduleWarpingCore.scheduleWarpingCoreUuid == "0") {
            method = "PUT";
          } else {
            method = "POST";
          }
          break;
        case "drafting":
          if (fw_formData.response.scheduleDraftingCore.scheduleDraftingCoreUuid == "0") {
            method = "PUT";
          } else {
            method = "POST";
          }
          break;
        case "weaving":
          if (fw_formData.response.scheduleWeavingCore.scheduleWeavingCoreUuid == "0") {
            method = "PUT";
          } else {
            method = "POST";
          }
          break;
        case "inspection":
          if (fw_formData.response.scheduleInspectionCore.scheduleInspectionCoreUuid == "0") {
            method = "PUT";
          } else {
            method = "POST";
          }
          break;
        case "shipment":
          if (fw_formData.response.scheduleShipmentCore.scheduleShipmentCoreUuid == "0") {
            method = "PUT";
          } else {
            method = "POST";
          }
          break;
      }

      $.ajax({
        url: "/api/manufacture/schedule/" + station,
        data: postData,
        method: method,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.status) {
            fw_notification.show({}, "saveOrInsert");
            setNoificationPosition();
            setTimeout(function () {
              $(".drawCheck").hide().delay(460).queue(function () {
                window.history.back();
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
})

function customizeForm() {
  kendo.ui.progress($("#grid"), true);

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
  setFileList(fw_formData.response.attachment.attachmentDetails);
  $("#fileupload").show();
  setTimeout(function () {
    kendo.ui.progress($("#grid"), false);
  }, 2000);
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

function verification() {
  var hasError = 0;
  var data = [];
  switch (station) {
    case "warping":
      data = fw_formData.response.scheduleWarpingCore;
      break;
    case "drafting":
      data = fw_formData.response.scheduleDraftingCore;
      break;
    case "weaving":
      data = fw_formData.response.scheduleWeavingCore;
      break;
    case "inspection":
      data = fw_formData.response.scheduleInspectionCore;
      break;
    case "shipment":
      data = fw_formData.response.scheduleShipmentCore;
      break;
  }

  for (item in data) {
    if (data[item] == null) {
      continue;
    }
    if (data[item].title == undefined) {
      continue;
    }
    if (data[item].required && $("[name='" + item + "']").val() == "") {
      $("[name='" + item + "']").errorMsg({
        message: "請輸入" + data[item].title + "!"
      });
      hasError = 1;
    }
  }
  return hasError;
}

function setSaveData() {
  var postData = new FormData();
  var relateUuid = "0";
  switch (station) {
    case "warping":
      var scheduleWarpingCore = new Object();

      scheduleWarpingCore.scheduleWarpingCoreUuid = fw_formData.response.scheduleWarpingCore.scheduleWarpingCoreUuid;

      relateUuid = fw_formData.response.scheduleWarpingCore.scheduleWarpingCoreUuid;

      scheduleWarpingCore.clothOrderDetailDeliverQuantityUuid = fw_formData.response.orderScheduleCore.clothOrderDetailDeliverQuantityUuid;

      scheduleWarpingCore.orderScheduleCoreUuid = fw_formData.response.orderScheduleCore.orderScheduleCoreUuid;

      $("#form").find("input,select,textarea").each(function () {
        switch ($(this).attr("name")) {
          case "warpingFactory":
            scheduleWarpingCore.warpingFactory = $(this).val();
            break;
          case "scheduleWarpingCoreStatus":
            scheduleWarpingCore.scheduleWarpingCoreStatus = $(this).val();
            break;
          case "expectStartTime":
            scheduleWarpingCore.expectStartTime =
              moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
            break;
          case "expectFinishTime":
            scheduleWarpingCore.expectFinishTime = moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
            break;
          case "note":
            if ($(this).val() != "") {
              scheduleWarpingCore.note = $(this).val();
            } else {
              scheduleWarpingCore.note = null;
            }
            break;
        }
      });

      postData.append("scheduleWarpingCore", new Blob([JSON.stringify(scheduleWarpingCore)], {
        type: "application/json"
      }));
      break;
    case "drafting":
      var scheduleDraftingCore = new Object();

      scheduleDraftingCore.scheduleDraftingCoreUuid = fw_formData.response.scheduleDraftingCore.scheduleDraftingCoreUuid;

      relateUuid = fw_formData.response.scheduleDraftingCore.scheduleDraftingCoreUuid;

      scheduleDraftingCore.clothOrderDetailDeliverQuantityUuid = fw_formData.response.orderScheduleCore.clothOrderDetailDeliverQuantityUuid;

      scheduleDraftingCore.orderScheduleCoreUuid = fw_formData.response.orderScheduleCore.orderScheduleCoreUuid;

      $("#form").find("input,select,textarea").each(function () {
        switch ($(this).attr("name")) {
          case "draftingFactory":
            scheduleDraftingCore.draftingFactory = $(this).val();
            break;
          case "scheduleDraftingCoreStatus":
            scheduleDraftingCore.scheduleDraftingCoreStatus = $(this).val();
            break;
          case "expectStartTime":
            scheduleDraftingCore.expectStartTime = moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
            break;
          case "expectFinishTime":
            scheduleDraftingCore.expectFinishTime = moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
            break;
          case "note":
            if ($(this).val() != "") {
              scheduleDraftingCore.note = $(this).val();
            } else {
              scheduleDraftingCore.note = null;
            }
            break;
        }
      });

      postData.append("scheduleDraftingCore", new Blob([JSON.stringify(scheduleDraftingCore)], {
        type: "application/json"
      }));
      break;
    case "weaving":
      var scheduleWeavingCore = new Object();

      scheduleWeavingCore.scheduleWeavingCoreUuid = fw_formData.response.scheduleWeavingCore.scheduleWeavingCoreUuid;

      relateUuid = fw_formData.response.scheduleWeavingCore.scheduleWeavingCoreUuid;

      scheduleWeavingCore.clothOrderDetailDeliverQuantityUuid = fw_formData.response.orderScheduleCore.clothOrderDetailDeliverQuantityUuid;

      scheduleWeavingCore.orderScheduleCoreUuid = fw_formData.response.orderScheduleCore.orderScheduleCoreUuid;

      $("#form").find("input,select,textarea").each(function () {
        switch ($(this).attr("name")) {
          case "weavingFactory":
            scheduleWeavingCore.weavingFactory = $(this).val();
            break;
          case "scheduleWeavingCoreStatus":
            scheduleWeavingCore.scheduleWeavingCoreStatus = $(this).val();
            break;
          case "expectStartTime":
            scheduleWeavingCore.expectStartTime = moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
            break;
          case "expectFinishTime":
            scheduleWeavingCore.expectFinishTime = moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
            break;
          case "note":
            if ($(this).val() != "") {
              scheduleWeavingCore.note = $(this).val();
            } else {
              scheduleWeavingCore.note = null;
            }
            break;
        }
      });

      postData.append("scheduleWeavingCore", new Blob([JSON.stringify(scheduleWeavingCore)], {
        type: "application/json"
      }));
      break;
    case "inspection":
      var scheduleInspectionCore = new Object();

      scheduleInspectionCore.scheduleInspectionCoreUuid = fw_formData.response.scheduleInspectionCore.scheduleInspectionCoreUuid;

      relateUuid = fw_formData.response.scheduleInspectionCore.scheduleInspectionCoreUuid;

      scheduleInspectionCore.clothOrderDetailDeliverQuantityUuid = fw_formData.response.orderScheduleCore.clothOrderDetailDeliverQuantityUuid;

      scheduleInspectionCore.orderScheduleCoreUuid = fw_formData.response.orderScheduleCore.orderScheduleCoreUuid;

      $("#form").find("input,select,textarea").each(function () {
        switch ($(this).attr("name")) {
          case "scheduleInspectionCoreStatus":
            scheduleInspectionCore.scheduleInspectionCoreStatus = $(this).val();
            break;
          case "expectStartTime":
            scheduleInspectionCore.expectStartTime = moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
            break;
          case "expectFinishTime":
            scheduleInspectionCore.expectFinishTime = moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
            break;
          case "note":
            if ($(this).val() != "") {
              scheduleInspectionCore.note = $(this).val();
            } else {
              scheduleInspectionCore.note = null;
            }
            break;
        }
      });

      postData.append("scheduleInspectionCore", new Blob([JSON.stringify(scheduleInspectionCore)], {
        type: "application/json"
      }));
      break;
    case "shipment":
      var scheduleShipmentCore = new Object();
      scheduleShipmentCore.scheduleShipmentCoreUuid = fw_formData.response.scheduleShipmentCore.scheduleShipmentCoreUuid;

      relateUuid = fw_formData.response.scheduleShipmentCore.scheduleShipmentCoreUuid;

      scheduleShipmentCore.clothOrderDetailDeliverQuantityUuid = fw_formData.response.orderScheduleCore.clothOrderDetailDeliverQuantityUuid;

      scheduleShipmentCore.orderScheduleCoreUuid = fw_formData.response.orderScheduleCore.orderScheduleCoreUuid;

      $("#form").find("input,select,textarea").each(function () {
        switch ($(this).attr("name")) {
          case "scheduleShipmentCoreStatus":
            scheduleShipmentCore.scheduleShipmentCoreStatus = $(this).val();
            break;
          case "expectStartTime":
            scheduleShipmentCore.expectStartTime = moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
            break;
          case "expectFinishTime":
            scheduleShipmentCore.expectFinishTime = moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
            break;
          case "note":
            if ($(this).val() != "") {
              scheduleShipmentCore.note = $(this).val();
            } else {
              scheduleShipmentCore.note = null;
            }
            break;
        }
      });

      postData.append("scheduleShipmentCore", new Blob([JSON.stringify(scheduleShipmentCore)], {
        type: "application/json"
      }));
      break;
  }

  //處理檔案上傳
  var attachDetail = fw_formData.response.attachment;
  var attachments = {
    "relateUuid": relateUuid,
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
