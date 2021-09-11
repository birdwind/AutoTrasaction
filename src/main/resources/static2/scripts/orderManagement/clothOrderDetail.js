var delDeliverArr = [];
var noti;
var fw_IsUploadFile, fw_uploadFiles = [],
  fw_deletedFiles = [];
var fw_fileId = 1,
  fw_totalFileSize = 0,
  fw_attachSize = 0,
  fw_now = new Date();
fw_now.setMinutes(parseInt(fw_now.getMinutes() / 5) * 5);
fw_now.setSeconds(0);
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
</div><!--#fileupload-->`;
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
</section>`;
//dataSource
var contacterData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/orderManagement/clothOrder/contacter/list/" + uuid,
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});

var statusData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/orderManagement/clothOrder/tmp/status/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
//end of dataSource

$(function () {
  $("body").append("<span id='noti'></span>");
  noti = $("#noti").kendoNotification({
    templates: [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
    }],
    autoHideAfter: 1500
  }).data("kendoNotification");
  var backUrl = "/page/orderManagement/clothOrder";
  SetInitPage(false, backUrl);
  $("#form").formWizard({
    id: "clothOrdrerCoreUuid",
    url: "/api/orderManagement/clothOrder/template/" + uuid,
    mainData: "response.clothOrderCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm"
  }); //formWizard

  $("#form").after(fw_uploadPanel);
  $("#fileupload").hide();
  $("body").append(fw_fileTemplate);
  setUploadingEvent();

  $("#save").click(function () {
    var postData = new FormData();
    if (verification() == 0) {
      postData = setSaveData();
      if (!postData) {
        $(this).removeClass("waitaSec");
        return;
      }
      $.ajax({
        url: "/api/orderManagement/clothOrder",
        data: postData,
        method: "POST",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.status) {
            noti.show({}, "saveOrInsert")
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
            }
          }
        } // end of ajax success
      }); //end of ajax
    } else {
      $(this).removeClass("waitaSec");
      return;
    }
  });
});

function customizeForm() {
  kendo.ui.progress($("#grid"), true);
  var clothOrderCoreDetails = fw_formData.response.clothOrderCoreDetails;
  var tableTheadTemplate = kendo.template($("#tableTheadTemplate").html());
  $("#clothOrderDetails thead").append(tableTheadTemplate(clothOrderCoreDetails.header));
  var tableTbodyTemplate = kendo.template($("#tableTbodyTemplate").html());
  $("#clothOrderDetails tbody").append(tableTbodyTemplate(clothOrderCoreDetails.contents));
  setGridContent(clothOrderCoreDetails.contents);
  setDateUI();
  setDropDownListUI("[name='contactName']", contacterData, fw_formData.response.clothOrderCore.contactName.value, null);
  setDropDownListUI("[name='clothOrderCoreStatus']", statusData, fw_formData.response.clothOrderCore.clothOrderCoreStatus.value, null);
  setFileList(fw_formData.response.attachment.attachmentDetails);
  $("#fileupload").show();
  // setquotationCoreNoLink();
  setTimeout(function () {
    kendo.ui.progress($("#grid"), false);
  }, 2000);

  if ($("#clothOrderDetails tbody tr").length <= 1) {
    $("#clothOrderDetails tbody tr [name='delDeliver']:last").remove();
  }
} //customizeForm

function setGridContent(contents) {
  for (item in contents) {
    var uuid = contents[item].clothOrderDetailUuid;
    setDialog("#editorDialog_" + uuid, "#showDialog_" + uuid, "#clothOrdrerDetailNote_" + uuid, "clothOrdrerDetailNote", contents[item].clothOrdrerDetailNote);
  } //end of loop
} //end of setGridContent

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

function setDialog(select, openSelect, contentSelect, label, text) {
  switch (label) {
    case "clothOrdrerDetailNote":
      var dialog = $(select).kendoDialog({
        width: "800px",
        title: "備註",
        visible: false
      }).data("kendoDialog");
      $(openSelect).click(function () {
        dialog.open();
      });
      $(contentSelect).val(text);
      break;
  }
} //end of setDialog

function addDeliver(oid) {
  //增加新一列
  var tableTbodyAddTemplate = kendo.template($("#tableTbodyAddTemplate").html());
  $("#clothOrderDetails tbody").append(tableTbodyAddTemplate);

  //取得當前列數
  let row = getGuid();
  //取得被複製列
  let copyRow = $("#" + oid).parents("tr").find("[name='clothOrderDetailUuid']").val();
  //取得複製資訊
  let clothNo = $("#clothNo_" + copyRow.toString()).text();
  let greySpecification = $("#greySpecification_" + copyRow.toString()).text();
  let header = fw_formData.response.clothOrderCoreDetails.header;
  for (var i in header) {
    switch (i) {
      case "clothNo":
        $(`#clothOrderDetails tbody tr:last [name='${i}']`)
          .text(clothNo)
          .attr("id", i + "_" + row.toString());
        break;
      case "greySpecification":
        $(`#clothOrderDetails tbody tr:last [name='${i}']`)
          .text(greySpecification)
          .attr("id", i + "_" + row.toString());
        break;
      case "clothOrderDetailUuid":
        $(`#clothOrderDetails tbody tr:last [name='${i}']`)
          .val(0)
          .attr("id", i + "_" + row.toString());
        break;
      case "clothOrderDetailDeliverQuantityUuid":
        $(`#clothOrderDetails tbody tr:last [name='${i}']`)
          .val(0)
          .attr("id", i + "_" + row.toString());
        break;
      case "deliverDate":
        $(`#clothOrderDetails tbody tr:last [name='${i}']`)
          .attr("id", i + "_" + row.toString());
        setDateUIBySelect("#" + i + "_" + row.toString());
        break;
      case "quantity":
      case "price":
      case "wage":
        $(`#clothOrderDetails tbody tr:last [name='${i}']`)
          .attr("id", i + "_" + row.toString());
        break;
      case "deliverLocation":
        var id = i.toString() + "_" + row.toString();
        $(`#clothOrderDetails tbody tr:last [name='${i}']`).attr("id", id);
        break;
      case "clothOrdrerDetailNote":
        var id = i.toString() + "_" + row.toString();
        var dialogId = "editorDialog_" + row.toString();
        var buttonId = "showDialog_" + row.toString();
        $(`#clothOrderDetails tbody tr:last .editorDialog`).attr("id", dialogId);
        $(`#clothOrderDetails tbody tr:last [name='showDialog']`).attr("id", buttonId);
        $(`#clothOrderDetails tbody tr:last [name='${i}']`).attr("id", id);
        setDialog("#" + dialogId, "#" + buttonId, "#" + id, "clothOrdrerDetailNote", item[i]);
        break;
      case "addDeliver":
      case "delDeliver":
        $(`#clothOrderDetails tbody tr:last [name='${i}']`).attr("id", i + "_" + row.toString());
        break;
    }
  }
  $(`#clothOrderDetails tbody tr:last [name='copyFromClothOrderDetailUuid']`).attr("id", i + "_" + row.toString()).val(copyRow);
}

function delDeliver(id) {
  var clothOrderDetailUuid = $("#" + id).parents("tr").find("[name='clothOrderDetailUuid']").val();
  $("#" + id).parents("tr").remove();
  if (clothOrderDetailUuid != "0") {
    delDeliverArr.push(clothOrderDetailUuid);
  }
  if ($("#clothOrderDetails tbody tr").length <= 1) {
    $("#clothOrderDetails tbody tr [name='delDeliver']:last").remove();
  }
}

function setquotationCoreNoLink() {
  var quotationCoreNo = $("[name='quotationCoreNo']").val();
  var quotationCoreUuid = $("[name='quotationCoreUuid']").val();
  $("[name='quotationCoreNo']")
    .siblings("span")
    .attr("class", "")
    .html(
      $("<a>")
      .text(quotationCoreNo)
      .attr("href", "/page/quotation/form/" + quotationCoreUuid)
    );;
}

function verification() {
  var hasError = 0;
  var core = fw_formData.response.clothOrderCore;
  var detail = fw_formData.response.clothOrderCoreDetails.header;

  for (var item in core) {
    if (core[item] == null) {
      continue;
    }
    if (core[item].title == undefined) {
      continue;
    }
    if (core[item].required && $("[name='" + item + "']").val() == "") {
      $("[name='" + item + "']").errorMsg({
        message: "請輸入" + core[item].title + "!"
      });
      hasError = 1;
    }
  }

  // 聯絡人 E-mail 格式驗證
  if ($("[name='ordererEmail']").val() != "" && !checkEmail($("[name='ordererEmail']").val())) {
    $("[name='ordererEmail']").errorMsg({
      message: "Email格式不正確!"
    });
    hasError = 1;
  }

  // 驗證交期列表是否至少有一筆
  if ($("#clothOrderDetails tbody tr").length == 0) {
    fw_confirmBox.init({
      content: "<h2>請設定交期項目！</h2>"
    });
    fw_confirmBox.box.find("button").hide();
    fw_confirmBox.show();
    hasError = 1;
  } else {
    $("#clothOrderDetails tbody tr").each(function () {
      $(this).find("input").each(function () {
        var name = $(this).attr("name");
        switch (name) {
          case "deliverDate":
            if ($(this).val() == "") {
              $(this).errorMsg({
                message: "請輸入" + detail[name].title + "!"
              });
              hasError = 1;
            } else if ($(this).val() != "" && !checkDate($(this).val())) {
              $(this).errorMsg({
                message: detail[name].title + "：格式不正確!"
              });
              hasError = 1;
            }
            break;
          case "quantity":
          case "price":
          case "wage":
          case "deliverLocation":
            if ($(this).val() == "") {
              $(this).errorMsg({
                message: "請輸入" + detail[name].title + "!"
              });
              hasError = 1;
            }
            break;
        }
      });
    });
  }
  return hasError;
}

function setSaveData() {
  var postData = new FormData();
  var clothOrderCore = new Object();
  var clothOrderDetails = new Object();
  var createClothOrderDetails = new Array();
  var updateClothOrderDetails = new Array();

  clothOrderCore.clothOrderCoreUuid = uuid;
  clothOrderCore.contactName = ($("[name='contactName']").val() != "") ? $("[name='contactName']").val() : null;
  clothOrderCore.ordererEmail = ($("[name='ordererEmail']").val() != "") ? $("[name='ordererEmail']").val() : null;
  clothOrderCore.clientOrderNo = ($("[name='clientOrderNo']").val() != "") ? $("[name='clientOrderNo']").val() : null;
  clothOrderCore.note = ($("[name='note']").val() != "") ? $("[name='note']").val() : null;
  clothOrderCore.clothOrderStatus = ($("[name='clothOrderCoreStatus']").val() != "") ? $("[name='clothOrderCoreStatus']").val() : null;

  postData.append("clothOrderCore", new Blob([JSON.stringify(clothOrderCore)], {
    type: "application/json"
  }));

  $("#clothOrderDetails tbody tr").each(function () {
    var Obj = new Object();

    $(this).find("input,textarea").each(function () {
      var name = $(this).attr("name");
      switch (name) {
        case "clothOrderDetailDeliverQuantityUuid":
          Obj.clothOrderDetailDeliverQuantity = $(this).val();
          break;
        case "quantity":
          Obj.quantity = $(this).val();
          break;
        case "deliverDate":
          Obj.deliverDate = moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
          break;
        case "price":
          Obj.price = $(this).val();
          break;
        case "wage":
          Obj.wage = $(this).val();
          break;
        case "deliverLocation":
          Obj.deliverLocation = $(this).val();
          break;
      }
    });
    if ($(this).find("[name='clothOrderDetailUuid']").val() == "0") {
      Obj.clothOrderDetail = $(this).find("[name='copyFromClothOrderDetailUuid']").val();

      var noteId = "#clothOrdrerDetailNote_" + $(this).find("[name='showDialog']").attr("id").replace("showDialog_", "");
      Obj.note = ($(noteId).val() != "") ? $(noteId).val() : null;
      createClothOrderDetails.push(Obj)
    } else {
      Obj.clothOrderDetail = $(this).find("[name='clothOrderDetailUuid']").val();
      var noteId = "#clothOrdrerDetailNote_" + $(this).find("[name='showDialog']").attr("id").replace("showDialog_", "");
      Obj.note = ($(noteId).val() != "") ? $(noteId).val() : null;
      updateClothOrderDetails.push(Obj);
    }
  });
  clothOrderDetails.clothOrderCoreUuid = uuid;
  clothOrderDetails.createClothOrderDetails = createClothOrderDetails;
  clothOrderDetails.updateClothOrderDetails = updateClothOrderDetails;
  clothOrderDetails.deleteClothOrderDetails = delDeliverArr;

  postData.append("clothOrderDetails", new Blob([JSON.stringify(clothOrderDetails)], {
    type: "application/json"
  }));

  //處理檔案上傳
  var attachDetail = fw_formData.response.attachment;
  var attachments = {
    "relateUuid": uuid,
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
