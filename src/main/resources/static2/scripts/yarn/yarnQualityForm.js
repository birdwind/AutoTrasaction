var filter, supplier;
var yarnQualityBatchesData = new kendo.data.DataSource();
let validatedFiles = [];
let attachmentsData = [];
let deleteFileData = [];
let totalSize = 0;
let allSize = [];
$(function () {
  let formData = $("#form").formWizard({
    id: "yarnQualityControlCoreUuid",
    url: "/api/yarn/quality/control/template/" + uuid,
    mainData: "response.yarnQualityControlCore",
    noData: "findnodata",
    listUrl: "/api/yarn/quality/control/events/list",
    customizeForm: "customizeForm"
  });//formWizard
  $("body").on("blur", "input,textarea", function () {
    let nowPosition = $(window).scrollTop();
    $("#form").formCheck({
      name: "yarnQualityControlCore",
      dataProccessing: "yarnDataSet",
    });
    $(window).scrollTop(nowPosition);
  })// ingredient  del click
  $("body").on("keyup", ".form-control", function () {
    let nowPosition = $(window).scrollTop();
    $("#form").formCheck({
      name: "yarnQualityControlCore",
      dataProccessing: "yarnDataSet",
    });
    $(window).scrollTop(nowPosition);
    return false;
  })// ingredient  del click

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

  $("body").on("click", "#quality .del", function () {
    $(this).closest("tr").remove();
    if ($("#quality tbody tr").length <= 1) {
      $("#quality tbody tr:eq(0) .del").hide();
    }
  })// ingredient  del click

  $("body").on("change", "#upload", function (event) {
    let files = this.files;
    $.each(files, function (field, value) {
      if (field > 9 || allSize.length == 10) {
        return false;
      }
      totalSize += (value.size / (1024 * 1024));

      allSize.push({ "size": value.size, "name": value.name });

      $("#sizeTotal").text(totalSize.toFixed(3) + "MB");

      let unit = unitCalulate(value.size);

      validatedFiles.push(value);


      $(".clearfix").after("<span class='btn_uploadfile divinlineblock' name='" + value.name + "' value=''>" + value.name + " (" + unit.size + unit.unit + ")" + "<a href='javascript:void(0)'><i name='" + value.name + "' class='fa fa-times deleteFile'></i></a></span>");
      if (value.size > 1 * 1024 * 1024) {
        $("[name='" + value.name + "']").css("color", "red");
      }
      $("#upload").value = "";

    })


    event.target.value = null;

    if (totalSize > 10) {
      $("#sizeTotal").css("color", "red");
    }
    else {
      $("#sizeTotal").css("color", "#333");
    }

  })//uploadFiles
  $("body").on("click", ".deleteFile", function () {
    let deleteName = $(this).attr("name");
    let deleteValue = -1;
    let deleteNumber = -1;
    let newTotalSize = 0;

    $.each(validatedFiles, function (field, value) {

      if (value.name == deleteName) {
        deleteValue = field;
      }
    })
    if (deleteValue != -1) {
      validatedFiles.splice(deleteValue, 1);
    }
    $.each(allSize, function (field, value) {

      if (!value.name.indexOf(deleteName)) {
        deleteNumber = field;
        return true;
      }
      else {
        newTotalSize += (value.size / (1024 * 1024));

      }

    })
    totalSize = newTotalSize;

    allSize.splice(deleteNumber, 1)
    $("#sizeTotal").text(totalSize.toFixed(3) + "MB");

    if (totalSize > 10) {
      $("#sizeTotal").css("color", "red");
    }
    else {
      $("#sizeTotal").css("color", "#333");
    }
    //console.log(allSize.splice(allSize[allSize.map(function (e) { return e.name; }).indexOf(deleteName)]), 1);

    if ($("[name='" + $(this).attr("name") + "']").attr("value")) {

      deleteFileData.push($("[name='" + $(this).attr("name") + "']").attr("value"));
    }
    console.log(deleteFileData);
    $("[name='" + $(this).attr("name") + "']").remove();


    //this.name;
    // files.filter(x => x.name === this.name)
  })
  $("#save").click(function () {

    let retrunName = "yarnQualityControlCore";
    if ($("#save").find(".fa-floppy-o").length != 0) {
      retrunName = "yarnQualityControlCoreUpdate";
    };
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var postData = $("#form").formCheck({
      name: retrunName,
      dataProccessing: "yarnDataSet",
    });

    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    //let uploadFilesData = new FormData();
    $.each(validatedFiles, function (index, value) {
      postData.append("uploadFiles", value);

    })
    postData.append("relateUuid", uuid);
    postData.append("deleteFiles", deleteFileData.join(", "));

    console.log(postData.getAll("relateUuid"));

    $.ajax({
      url: "/api/yarn/quality/control/",
      data: postData,
      method: (uuid.length) ? "POST" : "PUT",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {

          fw_notification.show({}, "saveOrInsert");

          setNoificationPosition();
          setTimeout(function () { location = "/page/yarn/quality/control/"; }, 1500);
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
  })//end of save
})//$(function ()

function findnodata() {
  $("html").remove();
  location.replace("/page/yarn/quality/control");
}//findnodata
function eventsBound() {
  let multiSelect = $("select[name = 'events']").data('kendoMultiSelect');
  let data = multiSelect.dataSource.data()
  let val = [];
  let selectedItems;
  let select = []
  if (window.localStorage.events != "") {
    selectedItems = window.localStorage.events.split(", ")
  }
  else {
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
function unitCalulate(size) {
  let dataSize = size;
  let unit = "B"
  if (size > 1024) {
    dataSize = Math.round(size / 1024);
    unit = "KB"
  }
  if (size > 1024 * 1024) {
    dataSize = Math.round(size / (1024 * 1024));
    unit = "MB"
  }
  return { "size": dataSize, "unit": unit };
}

function customizeForm() {
  attachmentsData = fw_formData.response.attachments;

  $.each(attachmentsData, function (index, value) {
    let unit = unitCalulate(value.size)
    if (value.originalFileName) {
      $("#sizeLabel").show();
      $(".clearfix").after("<span class='btn_uploadfile divinlineblock' name='" + value.originalFileName + "' value='" + value.encodeName + "'>" + value.originalFileName + " (" + unit.size + unit.unit + ")" + "<a href='javascript:void(0)'><i name='" + value.originalFileName + "' class='fa fa-times deleteFile'></i></a></span>");
      totalSize += (value.size / (1024 * 1024));
      allSize.push({ "size": value.size, "name": value.originalFileName });
      $("#sizeTotal").text(totalSize.toFixed(3) + "MB");
    }
    else {
      return false;
    }
  })
  $("input[name = 'returnAmountKg']").prev("nav").append("<span class='color_pink'>*</span>");

  if ($("input[name = 'actualReturnDate']").val() != "") {
    $('fieldset').prop('disabled', true);
    $('select').data("kendoMultiSelect").readonly(true);
    $('.k-multiselect-wrap').find("input").remove();
    $('.k-select').remove();
  }

  $("input[name = 'returnAmountPiece']").prev("nav").remove();
  $("input[name = 'returnAmountPiece']").remove();
  $("input[name = 'returnAmountKg']").css("width", "77%");
  $("input[name = 'returnAmountKg']").after("<select id='returnAmountUnit' name='returnAmountUnit' class='DropDownlist form-control' style='width: 70px; margin-left: 5px;'/></select>");
  var UnitData = [
    { "value": 1, "text": "kg" },
    { "value": 0, "text": "件" }
  ]
  $("#returnAmountUnit").kendoDropDownList({
    dataSource: UnitData,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: 0,
  });


  $("input[name = 'returnAmountKg']").attr('name', 'returnAmount');
  $("input[name = 'returnAmount']").addClass("form-control number float total")
  $("input[name = 'refoundPerUnit']").addClass("form-control number float total")
  $("input[name = 'refoundTotal']").addClass("form-control number")
  $(".total").keyup(function () {
    let total = $("input[name = 'refoundPerUnit']").val() * $("input[name = 'returnAmount']").val()
    if (total == 0) {
      total = " ";
    }
    $("input[name = 'refoundTotal']").val(Math.round(total));
  })

  $("input[name = 'importDetail']:not(:hidden)").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          url: "/api/yarn/quality/control/batches/list",
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {
          $.each(data.response, function (number, data) {
            if (number == 0) {
              $(".labelText").text(data.supplier);
            }
          })
          return data.response;
        }
      }
    },
    dataTextField: "text",
    dataValueField: "value",
    filter: "contains",
    change: function () {
      $("input[name = 'supplier']").val("supplier");
    },
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });
  $("input[name = 'yarnQualityControlCoreNo']").val("0")

  if (uuid === "") {
    $("input[name = 'expectedReturnDate").data("kendoDateTimePicker").value(new Date());
  }

  $(".k-datetimepicker").css("width", "85%");
  $(".k-multiselect").css("height", "auto");
  $("input[name = 'supervisor']:not(:hidden)").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          url: "/api/yarn/quality/control/supervisors/list",
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {

          $.each(data.response, function (number, data) {
            data.text = "(" + data.value + ") " + data.text;
          })

          return data.response;
        }
      }
    },
    dataTextField: "text",
    dataValueField: "value",
    filter: "contains",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    value: fw_formData.response.yarnQualityControlCore.currentUserMemberNo,
  });
  if (window.localStorage.length != 0) {
    let supervisor = $("input[name = 'supervisor']").data('kendoDropDownList');
    supervisor.bind("dataBound", supervisorBound);
    let batchNo = $("input[name = 'importDetail']").data('kendoDropDownList');
    batchNo.bind("dataBound", batchNoBound);
    let events = $("select[name = 'events']").data('kendoMultiSelect');
    events.bind("dataBound", eventsBound);
    $("input[name = 'actualReturnDate']").val(window.localStorage.actualReturnDate);
    $("input[name = 'expectedReturnDate']").val(window.localStorage.expectedReturnDate);
    if (window.localStorage.returnAmountKg != "") {
      $("input[name = 'returnAmount']").val(window.localStorage.returnAmountKg);
      $("#returnAmountUnit").data("kendoDropDownList").value(1);
    }
    if (window.localStorage.returnAmountPiece != "") {
      $("input[name = 'returnAmount']").val(window.localStorage.returnAmountPiece);
      $("#returnAmountUnit").data("kendoDropDownList").value(0);
    }
    $("input[name = 'refoundPerUnit']").val(window.localStorage.refoundPerUnit);
    $("input[name = 'refoundTotal']").val(window.localStorage.refoundTotal);
    $("textarea[name = 'qualityControlReason']").val(window.localStorage.qualityControlReason);

    $("input[name = 'supplier']").val(window.localStorage.supplier);
    $(".labelText").text(window.localStorage.supplier);
  }

};
function yarnDataSet(obj, form) {
  var returnAmount;
  var returnIsWeight;
  if (!$("input[name = 'returnAmount']").val().trim().length) {
    $("input[name = 'returnAmount']").errorMsg({
      message: "請輸入瑕疵數量"
    });
  } else {
    returnAmount = $("input[name = 'returnAmount']").val().trim();
  }
  returnIsWeight = $("#returnAmountUnit").data('kendoDropDownList').value()
  form["returnAmount"] = returnAmount;
  form["returnIsWeight"] = returnIsWeight;
  batchNo = $("input[name = 'importDetail']").val().split(" ");
  form["importDetail"] = batchNo[0];
  form["yarnQualityControlCoreUuid"] = 0;
  form["yarnQualityControlCoreUuid"] = 0;
  form["yarnQualityControlCoreNo"] = 0;
  return form;
}
