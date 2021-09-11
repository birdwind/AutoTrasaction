var rootApi = "/api/beam/quality/control";
var apiUrl = rootApi + "/template/";
var backUrl = "/page/beam/quality/control/";
var applierData = getApiData("/appliers/list");
var eventsData = getApiData("/events/list");
var clothOrderData = getApiData("/clothOrderDetails/list");
var sourceStation;
var clothOrderStation;
var sourceStationData;
var beamQualityControlStatusData;
var beamQualityControlCore;
var beamQualityCopy = "";
var clothOrderNoDropdownlist;

$(function () {
  if (window.localStorage.beamQualityCopy != null) {
    beamQualityCopy = JSON.parse(window.localStorage.beamQualityCopy);
    localStorage.removeItem("beamQualityCopy");
  }
  $("#form").formWizard({
    url: apiUrl + uuid,
    mainData: "response.beamQualityControlCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
    fileUpload: true,
  });//formWizard
  SetInitPage(false, backUrl);

  baseController();
});

async function customizeForm() {
  kendo.ui.progress($("#form"), true);
  beamQualityControlCore = beamQualityCopy.beamQualityControlCore ? beamQualityCopy.beamQualityControlCore : fw_formData.response.beamQualityControlCore;
  sourceStation = beamQualityControlCore.sourceStation.value ? beamQualityControlCore.sourceStation.value : null;
  let applier = beamQualityControlCore.applier.value ? beamQualityControlCore.applier.value : null;
  let clothOrderNo = beamQualityControlCore.clothOrderNo.value ? beamQualityControlCore.clothOrderNo.value : null;
  let beamQualityControlStatus = beamQualityControlCore.beamQualityControlStatus.value ? beamQualityControlCore.beamQualityControlStatus.value : null;
  let events = beamQualityControlCore.events.value ? beamQualityControlCore.events.value : null;
  let note = beamQualityControlCore.note.value;
  let qualityControlReason = beamQualityControlCore.qualityControlReason.value;
  $("[name='qualityControlReason']").val(qualityControlReason);
  $("[name='note']").val(note);

  sourceStationData = setData(beamQualityControlCore.sourceStation.keyValue);
  beamQualityControlStatusData = setData(beamQualityControlCore.beamQualityControlStatus.keyValue);

  setDropDownListUI("[name='applier']", applierData, applier, null);
  setDropDownListUI("[name='sourceStation']", sourceStationData, sourceStation, null);
  setDropDownListUI("[name='beamQualityControlStatus']", beamQualityControlStatusData, beamQualityControlStatus, null);
  initFormMultiSelect(events);

  await setDropDownListUI("[name='clothOrderNo']", clothOrderData, null, clothOrderNo);

  //品管關聯訂單改變則改變來源工作站
  clothOrderNoDropdownlist = $("[name='clothOrderNo']").data("kendoDropDownList");
  clothOrderNoDropdownlist.bind("change", sourceStation_change);

  kendo.ui.progress($("#form"), false);
}

function sourceStation_change() {
  if(clothOrderNoDropdownlist.value() == ""){
    $("[name='sourceStation']").data("kendoDropDownList").setDataSource(sourceStationData);
  }else {
    clothOrderStation = clothOrderNoDropdownlist.dataSource._pristineData;

    for (i in clothOrderStation) {
      if (clothOrderStation[i].value === clothOrderNoDropdownlist.value()) {
        var data = new Array();
        for (index in clothOrderStation[i].sourceStations) {
          for (sourceStationIndex in beamQualityControlCore.sourceStation.keyValue) {
            if (clothOrderStation[i].sourceStations[index] === beamQualityControlCore.sourceStation.keyValue[sourceStationIndex].value) {
              let obj = {};
              obj.text = beamQualityControlCore.sourceStation.keyValue[sourceStationIndex].text;
              obj.value = beamQualityControlCore.sourceStation.keyValue[sourceStationIndex].value;
              data.push(obj);
              break;
            }
          }
        }

        $("[name='sourceStation']").data("kendoDropDownList").setDataSource(new kendo.data.DataSource({
            data: data
          })
        );
        break;
      }
    }
  }
}

function baseController() {
  $("#save").click(function () {
    var postData = new FormData();
    if (verification() == 0) {
      postData = setSaveData();
      if (!postData) {
        $(this).removeClass("waitaSec");
        return;
      }

      $.ajax({
        url: rootApi,
        data: postData,
        method: uuid ? "POST" : "PUT",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.status) {
            fw_notification.show({}, "saveOrInsert");
            setNoificationPosition();
            setTimeout(function () {
              $(".drawCheck").hide().delay(460).queue(function () {
                location.replace("/page/beam/quality/control");
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
  })
}

function setSaveData() {
  var postData = new FormData();
  var beamQualityControlCore = new Object();

  beamQualityControlCore.beamQualityControlCoreUuid = uuid ? uuid : "0";

  beamQualityControlCore.qualityControlReason = $("[name='qualityControlReason']").val();

  let noteSelector = $("[name='note']");
  beamQualityControlCore.note = noteSelector.val() ? noteSelector.val() : "";

  beamQualityControlCore.events = $("[name='events']").data("kendoMultiSelect").value();

  beamQualityControlCore.applier = $("[name='applier']").val();
  beamQualityControlCore.clothOrderNo = $("[name='clothOrderNo']").val();
  beamQualityControlCore.sourceStation = $("[name='sourceStation']").val();
  beamQualityControlCore.beamQualityControlStatusNo = $("[name='beamQualityControlStatus']").val();

  postData.append("beamQualityControlCore", new Blob([JSON.stringify(beamQualityControlCore)], {
    type: "application/json"
  }));

  var attachDetail = fw_formData.response.attachment;
  var attachments = {
    "relateUuid": uuid ? uuid : "0",
    "attachmentCoreUuid": attachDetail.attachmentCoreUuid,
    "verifyToken": (attachDetail.verifyToken) ? attachDetail.verifyToken : "0",
    "deleteFiles": fw_deletedFiles
  };
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

function verification() {
  var hasError = 0;
  for (item in beamQualityControlCore) {
    switch (item) {
      case "applier":
        dropDownListVerfication(item);
        break;
      case "qualityControlReason":
        if (beamQualityControlCore[item].required && $("[name='" + item + "']").val() == "") {
          $("[name='" + item + "']").errorMsg({
            message: "請輸入" + beamQualityControlCore[item].title + "!"
          });
          hasError = 1;
        }
        break;
      case "events":
        if (beamQualityControlCore[item].required && $("[name='" + item + "']").data("kendoMultiSelect").value().length == 0) {
          $("[name='" + item + "']").errorMsg({
            message: "請輸入" + beamQualityControlCore[item].title + "!"
          });
          hasError = 1;
        }
        break;
      case "clothOrderNo":
        dropDownListVerfication(item);
        break;
      case "sourceStation":
        dropDownListVerfication(item);
        break;
      case "beamQualityControlStatus":
        dropDownListVerfication(item);
        break;
    }
  }
  return hasError;
}

function dropDownListVerfication(field) {
  if (beamQualityControlCore[field].required && $("[name='" + field + "']").data("kendoDropDownList").value() == "") {
    $("[name='" + field + "']").errorMsg({
      message: "請輸入" + beamQualityControlCore[field].title + "!"
    });
    hasError = 1;
  }
}

function getApiData(api) {
  return new kendo.data.DataSource({
    transport: {
      read: {
        url: rootApi + api,
        dataType: "json"
      }
    },
    schema: {
      data: function (data) {
        return data.response;
      }
    }
  });
}

function setData(data) {
  return new kendo.data.DataSource({
    data: data,
    schema: {
      model: {
        fields: {
          text: {type: "string"},
          value: {type: "string"},
        }
      }
    }
  })
}

async function initFormMultiSelect(value) {
  await eventsData.fetch();

  var eventsObj = $("[name='events']").kendoMultiSelect({
    placeholder: "請選擇事件",
    dataTextField: "text",
    dataValueField: "value",
    dataSource: eventsData,
    noDataTemplate: "<span class='nodata'>查無資料</span>",
  });

  if (value != null && value != "") {
    eventsObj.data("kendoMultiSelect").value(value);
  }
}
