var rootApi = "/api/buckle/quality/control";
var apiUrl = rootApi + "/template/";
var backUrl = "/page/buckle/quality/control/";
var applierData = getApiData("/appliers/list");
var eventsData = getApiData("/events/list");
var clothOrderData = getApiData("/order/list");
var sourceStation;
var clothOrderStation;
var sourceStationData;
var buckleQualityControlStatusData;
var buckleQualityControlCore;
var buckleQualityCopy = "";
var clothOrderNoDropdownlist;

$(function () {
  if (window.localStorage.buckleQualityCopy != null) {
    buckleQualityCopy = JSON.parse(window.localStorage.buckleQualityCopy);
    localStorage.removeItem("buckleQualityCopy");
  }
  $("#form").formWizard({
    url: apiUrl + uuid,
    mainData: "response.buckleQualityControlCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
    fileUpload: true,
  }); //formWizard
  SetInitPage(false, backUrl);


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
  })
});

async function customizeForm() {
  kendo.ui.progress($("#form"), true);
  buckleQualityControlCore = buckleQualityCopy.buckleQualityControlCore ? buckleQualityCopy.buckleQualityControlCore : fw_formData.response.buckleQualityControlCore;
  sourceStation = buckleQualityControlCore.sourceStation.value ? buckleQualityControlCore.sourceStation.value : null;
  let applier = buckleQualityControlCore.applier.value ? buckleQualityControlCore.applier.value : null;
  let clothOrderNo = buckleQualityControlCore.clothOrderNo.value ? buckleQualityControlCore.clothOrderNo.value : null;
  let buckleQualityControlStatus = buckleQualityControlCore.buckleQualityControlStatus.value ? buckleQualityControlCore.buckleQualityControlStatus.value : null;
  let events = buckleQualityControlCore.events.value ? buckleQualityControlCore.events.value : null;
  let note = buckleQualityControlCore.note.value;
  let qualityControlReason = buckleQualityControlCore.qualityControlReason.value;
  $("[name='qualityControlReason']").val(qualityControlReason);
  $("[name='note']").val(note);

  sourceStationData = setData(buckleQualityControlCore.sourceStation.keyValue);
  buckleQualityControlStatusData = setData(buckleQualityControlCore.buckleQualityControlStatus.keyValue);

  setDropDownListUI("[name='applier']", applierData, applier, null);
  setDropDownListUI("[name='sourceStation']", sourceStationData, sourceStation, null);
  setDropDownListUI("[name='buckleQualityControlStatus']", buckleQualityControlStatusData, buckleQualityControlStatus, null);
  initFormMultiSelect(events);

  await setDropDownListUI("[name='clothOrderNo']", clothOrderData, null, clothOrderNo);

  //品管關聯訂單改變則改變來源工作站
  clothOrderNoDropdownlist = $("[name='clothOrderNo']").data("kendoDropDownList");
  clothOrderNoDropdownlist.bind("change", sourceStation_change);

  kendo.ui.progress($("#form"), false);
}

function sourceStation_change() {
  if (clothOrderNoDropdownlist.value() == "") {
    $("[name='sourceStation']").data("kendoDropDownList").setDataSource(sourceStationData);
  } else {
    clothOrderStation = clothOrderNoDropdownlist.dataSource._pristineData;

    for (i in clothOrderStation) {
      if (clothOrderStation[i].value === clothOrderNoDropdownlist.value()) {
        var data = new Array();
        for (index in clothOrderStation[i].sourceStations) {
          for (sourceStationIndex in buckleQualityControlCore.sourceStation.keyValue) {
            if (clothOrderStation[i].sourceStations[index] === buckleQualityControlCore.sourceStation.keyValue[sourceStationIndex].value) {
              let obj = {};
              obj.text = buckleQualityControlCore.sourceStation.keyValue[sourceStationIndex].text;
              obj.value = buckleQualityControlCore.sourceStation.keyValue[sourceStationIndex].value;
              data.push(obj);
              break;
            }
          }
        }

        $("[name='sourceStation']").data("kendoDropDownList").setDataSource(new kendo.data.DataSource({
          data: data
        }));
        break;
      }
    }
  }
}


function setSaveData() {
  var postData = new FormData();
  var buckleQualityControlCore = new Object();

  buckleQualityControlCore.buckleQualityControlCoreUuid = uuid ? uuid : "0";

  buckleQualityControlCore.qualityControlReason = $("[name='qualityControlReason']").val();

  let noteSelector = $("[name='note']");
  buckleQualityControlCore.note = noteSelector.val() ? noteSelector.val() : "";

  buckleQualityControlCore.events = $("[name='events']").data("kendoMultiSelect").value();

  buckleQualityControlCore.applier = $("[name='applier']").val();
  buckleQualityControlCore.clothOrderNo = $("[name='clothOrderNo']").val();
  buckleQualityControlCore.sourceStation = $("[name='sourceStation']").val();
  buckleQualityControlCore.buckleQualityControlStatusNo = $("[name='buckleQualityControlStatus']").val();

  postData.append("buckleQualityControlCore", new Blob([JSON.stringify(buckleQualityControlCore)], {
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
  for (item in buckleQualityControlCore) {
    switch (item) {
      case "applier":
        dropDownListVerfication(item);
        break;
      case "qualityControlReason":
        if (buckleQualityControlCore[item].required && $("[name='" + item + "']").val() == "") {
          $("[name='" + item + "']").errorMsg({
            message: "請輸入" + buckleQualityControlCore[item].title + "!"
          });
          hasError = 1;
        }
        break;
      case "events":
        if (buckleQualityControlCore[item].required && $("[name='" + item + "']").data("kendoMultiSelect").value().length == 0) {
          $("[name='" + item + "']").errorMsg({
            message: "請輸入" + buckleQualityControlCore[item].title + "!"
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
      case "buckleQualityControlStatus":
        dropDownListVerfication(item);
        break;
    }
  }
  return hasError;
}

function dropDownListVerfication(field) {
  if (buckleQualityControlCore[field].required && $("[name='" + field + "']").data("kendoDropDownList").value() == "") {
    $("[name='" + field + "']").errorMsg({
      message: "請輸入" + buckleQualityControlCore[field].title + "!"
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
          text: {
            type: "string"
          },
          value: {
            type: "string"
          },
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
