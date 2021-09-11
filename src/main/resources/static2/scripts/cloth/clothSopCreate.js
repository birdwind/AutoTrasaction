var filter, supplier;
var yarnQualityBatchesData = new kendo.data.DataSource();
let validatedFiles = [];
let deleteFileData = [];
let totalSize = 0;
let allSize = [];
let weftRingAmount = 1;
let sprayAmount = 1;
var weftSwitchControlMethods = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/cloth/weaving/sop/weftSwitchControlMethods/list",
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

  let formData = $("#form").formWizard({
    id: "clothCoreWeavingSopCoreUuid",
    url: "/api/cloth/weaving/sop/template/" + uuid,
    mainData: "response.clothCoreWeavingSopCore",
    noData: "findnodata",
    customizeForm: "customizeForm"
  }); //formWizard

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

  $("body").on("click", ".delItem", function () {
    if ($(this).closest("tr").find("input").attr("name") == "spray") {
      sprayAmount--
      if (sprayAmount != 1) $(this).closest("tr").prev("tr").find("a").show();
    } else if ($(this).closest("tr").find("input").attr("name") == "weftRing") {
      weftRingAmount--
      if (weftRingAmount != 1) $(this).closest("tr").prev("tr").find("a").show();
    }
    $(this).closest("tr").remove();


  }) // ingredient  del click
  $("body").on("click", "#addWeftRingBtn", function () {

    // (weftRingAmount == 1) ? weftRingAmount = 2 : weftRingAmount;
    $("#addItem input[name='spray']").removeClass("spray");
    $("#addItem input[name='spray']").addClass("weftRing");
    $("#addItem input[name='spray']").attr("name", "weftRing");
    $("#addItem .title").attr("id", "weftRing" + (weftRingAmount + 1));
    $("#addItem .title").text("投緯第" + (weftRingAmount + 1) + "圈");
    $("#weftRing" + weftRingAmount).closest("tr").after($("#addItem").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    $("#weftRing" + weftRingAmount).closest("tr").find("a").hide();
    $("#weftRing" + (weftRingAmount + 1)).closest("tr").find("a").show();
    weftRingAmount++;
  }) // WeftRing  add click
  $("body").on("click", "#addSprayBtn", function () {
    $("#addItem input[name='weftRing']").removeClass("weftRing");
    $("#addItem input[name='weftRing']").addClass("spray");
    $("#addItem input[name='weftRing']").attr("name", "spray");
    //(sprayAmount == 1) ? sprayAmount = 2 : sprayAmount;
    $("#addItem .title").attr("id", "spray" + (sprayAmount + 1));
    $("#addItem .title").text("副噴" + (sprayAmount + 1));
    $("#spray" + sprayAmount).closest("tr").after($("#addItem").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    $("#spray" + sprayAmount).closest("tr").find("a").hide();
    $("#spray" + (sprayAmount + 1)).closest("tr").find("a").show();
    sprayAmount++;

  }) // Spray  add click
  $("#save").click(function () {

    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var postData = $("#form").formCheck({
      name: "clothCoreWeavingSopCore",
      dataProccessing: "secondTableSet",
      otherCheck: [
        "clothCoreWeavingSopDetails"
      ]
    });

    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    let uploadFilesData = new FormData();
    $.each(validatedFiles, function (index, value) {
      postData.append("uploadFiles", value);

    })
    postData.append("relateUuid", (uuid) ? uuid : 0);
    postData.append("deleteFiles", deleteFileData.join(", "));


    $.ajax({
      url: "/api/cloth/weaving/sop",
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
              location = "/page/cloth/weaving/sop";
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
  }) //end of save
}) //$(function ()

function findnodata() {
  $("html").remove();
  location.replace("/page/cloth/weaving/sop");
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
  for (let i = 1; i <= fw_formData.response.clothCoreWeavingSopDetails.length; i++) {
    $("#secondTable tr").append('<th scope="col" style="width:20%;text-align:left;line-height:40px"><span >' + i + '</span></th >');
    $("#sopTemplate tr").append('<td><input type="text" class="form-control number" name="onece"></input><span class="errorMsg color_pink"></span></td>');
    $("#labelTemplate tr").append('<td><input type="text" class="form-control number" name="clothNo" readonly="readonly"></input><span class="errorMsg color_pink"></span></td>');
    $("#textareaTemplate tr").append('<td><textarea type="text" class="form-control textareaSize" name="note"></textarea><span class="errorMsg color_pink"></span></td>');
    $("#addItem tr").append('<td><input type="text" class="form-control number spray" name="spray"><span class="errorMsg color_pink"></span></td>')
  }
  // for (let i = 0; i < fw_formData.response.clothCoreWeavingSopDetails.length; i++) {
  $.each(fw_formData.response.clothCoreWeavingSopDetails[0], function (index, value) {
    if (value.title) {
      if (value.type == "textarea") {
        $("#textareaTemplate .title").attr("id", index)
        $("#" + index).text(fw_formData.response.clothCoreWeavingSopDetails[0][index].title);
        $("#" + index).closest("tr").find("textarea").attr("name", index);
        $("#secondTable tbody").append($("#textareaTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
      } else if (value.type == "label") {
        $("#labelTemplate .title").attr("id", index)
        $("#" + index).text(fw_formData.response.clothCoreWeavingSopDetails[0][index].title);
        $("#" + index).closest("tr").find("input").attr("name", index);
        $("#secondTable tbody").append($("#labelTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
      } else {
        $("#sopTemplate .title").attr("id", index)
        $("#" + index).text(fw_formData.response.clothCoreWeavingSopDetails[0][index].title);
        $("#" + index).closest("tr").find("input").attr("name", index);
        $("#secondTable tbody").append($("#sopTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
      }
    }

  })
  // }
  $("#suckYarnAngle").closest("tr").after($("#addItem").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
  $("#spray1").closest("tr").after($("#addTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
  for (let i = 1; i <= fw_formData.response.clothCoreWeavingSopDetails.length; i++) {

    weftRingAmount = (fw_formData.response.clothCoreWeavingSopDetails[i - 1].clothCoreWeavingSopPutWeftRoundAngleRelates.length) ? fw_formData.response.clothCoreWeavingSopDetails[i - 1]
      .clothCoreWeavingSopPutWeftRoundAngleRelates.length : 1;
    sprayAmount = (fw_formData.response.clothCoreWeavingSopDetails[i - 1].clothCoreWeavingSopSubSprayAngles.length) ? fw_formData.response.clothCoreWeavingSopDetails[i - 1]
      .clothCoreWeavingSopSubSprayAngles.length : 1;
    for (let index = 2; index <= sprayAmount; index++) {
      if ($("#spray" + index).length > 0) {
        continue;
      }
      $("#addItem .title").attr("id", "spray" + index);
      $("#addItem .title").text("副噴" + index);
      $("#spray" + (index - 1)).closest("tr").after($("#addItem").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
      $("#spray" + (index - 1)).closest("tr").find("a").hide();
      $("#spray" + index).closest("tr").find("a").show();
    }

  }


  $("#addTemplate .title").attr("id", "addWeftRing");

  $("#addItem input[name='spray']").removeClass("spray");
  $("#addItem input[name='spray']").addClass("weftRing");
  $("#addItem input[name='spray']").attr("name", "weftRing");
  $("#addTemplate .title").siblings("a").attr("id", "addWeftRingBtn");
  $("#addTemplate .title").text("新增圈數");
  $("#addItem .title").attr("id", "weftRing1");
  $("#addItem .title").text("投緯第1圈");
  $("#putWeftStartAngle").closest("tr").after($("#addItem").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
  $("#weftRing1").closest("tr").after($("#addTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
  for (let i = 1; i <= fw_formData.response.clothCoreWeavingSopDetails.length; i++) {
    for (let index = 2; index <= weftRingAmount; index++) {
      if ($("#weftRing" + index).length > 0) {
        continue;
      }
      $("#addItem .title").attr("id", "weftRing" + index);
      $("#addItem .title").text("投緯第" + index + "圈");
      $("#weftRing" + (index - 1)).closest("tr").after($("#addItem").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
      $("#weftRing" + (index - 1)).closest("tr").find("a").hide();
      $("#weftRing" + index).closest("tr").find("a").show();
    }
  }


  $("input[name='requireWarpTensionMinimum']").css({
    "width": "15%",
    "margin-right": "5px "
  });
  $("input[name='requireWarpTensionMaximum']").css({
    "width": "15%",
    "margin-left": "5px "
  })
  $("input[name='requireWarpTensionMaximum']").siblings("nav").hide();
  $("input[name='requireWarpTensionMinimum']").after("<span>~</span>");
  $("input[name='requireWarpTensionMinimum']").siblings("span").first().after($("input[name='requireWarpTensionMaximum']"))
  $.each(fw_formData.response.clothCoreWeavingSopCore, function (index, value) {
    if (value.value == null) {
      $("input[name='" + index + "']").val("");
    }
  })
  // for (let i = 0; i < fw_formData.response.clothCoreWeavingSopDetails.clothCoreWeavingSopSubSprayAngles.length; i++) {
  //   $('#addSprayBtn').trigger('click');
  // }
  for (let i = 0; i < fw_formData.response.clothCoreWeavingSopDetails.length; i++) {
    $.each(fw_formData.response.clothCoreWeavingSopDetails[i], function (index, value) {
      if (value.value == null) {
        $("input[name='" + index + "']:eq(" + i + ")").val("");
      }
      else if (value.type == "textarea") {
        $("td textarea[name='" + index + "']:eq(" + i + ")").val(value.value);
      } else {
        $("input[name='" + index + "']:eq(" + i + ")").val(value.value);
      }
    })
    $.each(fw_formData.response.clothCoreWeavingSopDetails[i].clothCoreWeavingSopSubSprayAngles, function (index, value) {
      if (value.subSprayAngle.value != null) {
        $("#spray" + (index + 1)).closest("tr").find("[name='spray']:eq(" + i + ")").val(fw_formData.response.clothCoreWeavingSopDetails[i].clothCoreWeavingSopSubSprayAngles[index].subSprayAngle.value);
      }
    })
    $.each(fw_formData.response.clothCoreWeavingSopDetails[i].clothCoreWeavingSopPutWeftRoundAngleRelates, function (index, value) {
      if (value.angle.value != null) {
        $("#weftRing" + (index + 1)).closest("tr").find("[name='weftRing']:eq(" + i + ")").val(fw_formData.response.clothCoreWeavingSopDetails[i].clothCoreWeavingSopPutWeftRoundAngleRelates[index].angle.value);
      }
    })
  }


  // if (fw_formData.response.clothCore;
  $("#form").find(".box_inputdata").first().closest(".box_inputdata").before('<div><!--table_bar--><table id="clothSopFirstTable" class="table bg_white table-striped table-bordered table-hover"><thead class="thead-light"><tr><th scope="col" id="fliedTitle" style="width:15%;text-align:center;" ><span><th scope="col" style="width:25%;text-align:center;" ><span class="startCutAngle" ></span></th><th scope="col" style="width:25%;text-align:center;"><span class="stopCutAngle"></span><span id="percentageError" class="errorMsg color_pink" style="font-weight:normal"></span></th><th scope="col" style="width:25%;text-align:center;"><span class="strongStartCutTime" ></span></th></tr></thead><tbody></tbody></table><!--table--></div><!--table-responsive-->');
  $("#form thead tr th .startCutAngle ").closest("tr").after("<tr class='warp'><th style='text-align:center;line-height:50px'>斷經</th></tr>");
  $("#form thead tr th .stopCutAngle").closest("tr").after("<tr class='weft'><th style='text-align:center;line-height:50px'>斷緯</th></tr>");
  $(".startCutAngle").text("運轉啟動角");
  $(".stopCutAngle").text("運轉停止角");
  $(".strongStartCutTime").text("強力啟動時間");



  for (let index = 0; index < 2; index++) {

    let dataName = "";
    switch (index) {
      case 0:
        dataName = "arp";
        break;
      case 1:
        dataName = "eft";
        break;
    }
    $(".w" + dataName).closest("tr").append('<td style="text-align:center;line-height:50px" id="startW' + dataName + 'CutAngle"></td>')
    $(".w" + dataName).closest("tr").append('<td style="text-align:center;line-height:50px" id="stopW' + dataName + 'CutAngle"></td>')
    $(".w" + dataName).closest("tr").append('<td style="text-align:center;line-height:50px" id="strongW' + dataName + 'StartCutTime"></td>')
    $(".form-group input[name='startW" + dataName + "CutAngle']").closest(".box_inputdata").hide();
    $(".form-group input[name='stopW" + dataName + "CutAngle']").closest(".box_inputdata").hide();
    $(".form-group input[name='strongStartW" + dataName + "CutTime']").closest(".box_inputdata").hide();
    $(".form-group input[name='startW" + dataName + "CutAngle']").appendTo("#startW" + dataName + "CutAngle");
    $(".form-group input[name='stopW" + dataName + "CutAngle']").appendTo("#stopW" + dataName + "CutAngle");
    $(".form-group input[name='strongStartW" + dataName + "CutTime']").appendTo("#strongW" + dataName + "StartCutTime");

  }//loop
  $("input[name='clothCoreWeavingSopWeftSwitchControlMethodUuid']").kendoDropDownList({
    dataSource: weftSwitchControlMethods,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
  });//kendoDropDownList
}//customizeForm
function secondTableSet(obj, form) {
  form["clothCoreWeavingSopCoreUuid"] = "0";
  form["clothCoreUuid"] = uuid;

  $.each($("input[name='spray']"), function (index, value) {
    if ($("input[name='spray']:eq(" + index + ")").val() < 0 || $("input[name='spray']:eq(" + index + ")").val() > 360) {
      $("input[name='spray']:eq(" + index + ")").errorMsg()
      $("input[name='spray']:eq(" + index + ")").closest("td").find(".errorMsg").text("請輸入正確的角度(0~360)");
      // 
    };
    if ($("input[name='requireWarpTensionMinimum']").val() > $("input[name='requireWarpTensionMaximum']").val()) {
      $("input[name='requireWarpTensionMinimum']").errorMsg({
        message: "請輸入比最大值小的數"
      });
      $("input[name='requireWarpTensionMaximum']").errorMsg({
        message: "請輸入比最大值小的數"
      })
    }
    if ((index - 3) > 0 && $("input[name='spray']:eq(" + (index - 3) + ")").val() == "" && $("input[name='spray']:eq(" + index + ")").val() != "") {
      $("input[name='spray']:eq(" + (index - 3) + ")").errorMsg();
      $("input[name='spray']:eq(" + (index - 3) + ")").closest("td").find(".errorMsg").text("請輸入副噴");
    }
  })
  $.each($("input[name='weftRing']"), function (index, value) {
    if ((index - 3) > 0 && $("input[name='weftRing']:eq(" + (index - 3) + ")").val() == "" && $("input[name='weftRing']:eq(" + index + ")").val() != "") {
      $("input[name='weftRing']:eq(" + (index - 3) + ")").errorMsg();
      $("input[name='weftRing']:eq(" + (index - 3) + ")").closest("td").find(".errorMsg").text("請輸入圈數");
    }
  })
  // $("input[name='spray']:eq(" + (index - 3) + ")").closest("td").find(".errorMsg").text("請輸入副噴" + $("input[name='spray']:eq(" + index + ")"));

  // console.log("................" + value.val());

  return form;
}

function clothCoreWeavingSopDetails() {

  var clothCoreWeavingSopDetails = new Object();
  clothCoreWeavingSopDetails["clothCoreWeavingSopCoreUuid"] = fw_formData.response.clothCoreWeavingSopDetails[0].clothCoreWeavingSopDetailUuid
  clothCoreWeavingSopDetails["clothCoreUuid"] = uuid;
  clothCoreWeavingSopDetails["clothCoreWeavingSopDetailForms"] = [];
  let weftArray = [],
    sprayArray = [];

  for (let i = 0; i < $("#secondTable thead tr th").length - 1; i++) {
    weftArray = [];
    sprayArray = [];
    for (let index = 1; index <= weftRingAmount; index++) {
      if ($("#weftRing" + index).closest("tr").find("[name='weftRing']:eq(" + i + ")").val().trim().length) {
        weftArray.push({
          "roundOrder": index,
          "angle": ($("#weftRing" + index).closest("tr").find("[name='weftRing']:eq(" + i + ")").val().trim().length) ? Number($("#weftRing" + index).closest("tr").find("[name='weftRing']:eq(" + i + ")").val()) : " ",
        })
      }

    }
    for (let index = 1; index <= sprayAmount; index++) {
      if ($("#spray" + index).closest("tr").find("[name='spray']:eq(" + i + ")").val().trim().length) {
        sprayArray.push({
          "subSprayOrder": index,
          "subSprayAngle": ($("#spray" + index).closest("tr").find("[name='spray']:eq(" + i + ")").val().trim().length) ? Number($("#spray" + index).closest("tr").find("[name='spray']:eq(" + i + ")").val()) : " ",
        })
      }
    }
    clothCoreWeavingSopDetails["clothCoreWeavingSopDetailForms"].push({
      "clothYarnUuid": fw_formData.response.clothCoreWeavingSopDetails[i].clothYarnUuid,
      "coreSprayAngle": ($("#secondTable tbody tr").find("[name='coreSprayAngle']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='coreSprayAngle']:eq(" + i + ")").val()) : " ",
      "concatSprayAngle": ($("#secondTable tbody tr").find("[name='concatSprayAngle']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='concatSprayAngle']:eq(" + i + ")").val()) : " ",
      "leftScissorsAngle": ($("#secondTable tbody tr").find("[name='leftScissorsAngle']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='leftScissorsAngle']:eq(" + i + ")").val()) : " ",
      "weftScissorsBlowAngle": ($("#secondTable tbody tr").find("[name='weftScissorsBlowAngle']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='weftScissorsBlowAngle']:eq(" + i + ")").val()) : " ",
      "suckYarnAngle": ($("#secondTable tbody tr").find("[name='suckYarnAngle']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='suckYarnAngle']:eq(" + i + ")").val()) : " ",
      "weftPutAngle": ($("#secondTable tbody tr").find("[name='weftPutAngle']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='weftPutAngle']:eq(" + i + ")").val()) : " ",
      "benchmarkCloseAngle": ($("#secondTable tbody tr").find("[name='benchmarkCloseAngle']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='benchmarkCloseAngle']:eq(" + i + ")").val()) : " ",
      "delayCloseRate": ($("#secondTable tbody tr").find("[name='delayCloseRate']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='delayCloseRate']:eq(" + i + ")").val()) : " ",
      "clothCoreWeavingSopWeftSwitchControlMethodUuid": $("#secondTable tbody tr").find("[name='clothCoreWeavingSopWeftSwitchControlMethodUuid']:eq(" + i + ")").val(),
      "weftFeederRoundAmount": ($("#secondTable tbody tr").find("[name='weftFeederRoundAmount']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='weftFeederRoundAmount']:eq(" + i + ")").val()) : " ",
      "weftFeederPrepareRoundAmount": ($("#secondTable tbody tr").find("[name='weftFeederPrepareRoundAmount']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='weftFeederPrepareRoundAmount']:eq(" + i + ")").val()) : " ",
      "weftFeederTorqueMultiplier": ($("#secondTable tbody tr").find("[name='weftFeederTorqueMultiplier']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='weftFeederTorqueMultiplier']:eq(" + i + ")").val()) : " ",
      "weftFeederSensorSensitivityLevel": ($("#secondTable tbody tr").find("[name='weftFeederSensorSensitivityLevel']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='weftFeederSensorSensitivityLevel']:eq(" + i + ")").val()) : " ",
      "putWeftStartAngle": ($("#secondTable tbody tr").find("[name='putWeftStartAngle']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='putWeftStartAngle']:eq(" + i + ")").val()) : " ",
      "putWeftStopAngle": ($("#secondTable tbody tr").find("[name='putWeftStopAngle']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='putWeftStopAngle']:eq(" + i + ")").val()) : " ",
      "weftArriveAngle": ($("#secondTable tbody tr").find("[name='weftArriveAngle']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='weftArriveAngle']:eq(" + i + ")").val()) : " ",
      "putWeftSampleCount": ($("#secondTable tbody tr").find("[name='putWeftSampleCount']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='putWeftSampleCount']:eq(" + i + ")").val()) : " ",
      "coreSprayPressure": ($("#secondTable tbody tr").find("[name='coreSprayAngle']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='coreSprayAngle']:eq(" + i + ")").val()) : " ",
      "subSprayPressure": ($("#secondTable tbody tr").find("[name='subSprayPressure']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='subSprayPressure']:eq(" + i + ")").val()) : " ",
      "subSprayEndPressure": ($("#secondTable tbody tr").find("[name='subSprayEndPressure']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='subSprayEndPressure']:eq(" + i + ")").val()) : " ",
      "ogPressure": ($("#secondTable tbody tr").find("[name='ogPressure']:eq(" + i + ")").val().trim().length) ? Number($("#secondTable tbody tr").find("[name='ogPressure']:eq(" + i + ")").val()) : " ",
      "note": ($("#secondTable tbody tr").find("[name='note']:eq(" + i + ")").val().trim().length) ? $("#secondTable tbody tr").find("[name='note']:eq(" + i + ")").val() : " ",
      "clothCoreWeavingSopPutWeftRoundAngleRelateForms": weftArray,
      "clothCoreWeavingSopSubSprayAngleForms": sprayArray
    });
  }

  return clothCoreWeavingSopDetails;
}
