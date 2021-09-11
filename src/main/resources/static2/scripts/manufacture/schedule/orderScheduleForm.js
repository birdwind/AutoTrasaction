let rootApi = "/api/manufacture/scheduleV2";
let backUrl = "/page/manufacture/scheduleV2";

let checkboxWithInputTemplate;

let beamCoreListDataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/beam/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response;
    }
  }
});

let buckleCoreListDataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/buckle/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response;
    }
  }
});

let weavingMachineCoreListDataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/weaving/machine/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response;
    }
  }
});

let warpingFactoryListDataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/warping/factory/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response;
    }
  }
});

let draftingFactoryListDataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/drafting/factory/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response;
    }
  }
});

let weavingFactoryListDataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/weaving/factory/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response;
    }
  }
});

$(function () {
  let createUrl = rootApi + "/" + manufactureOrderUuid + "/template";
  let updateUrl = rootApi + "/template/" + uuid;
  $("#form").formWizard({
    id: "salesQuoteCoreUuid",
    url: uuid ? updateUrl : createUrl,
    mainData: "response",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
    fileUpload: false
  });//formWizard

  SetInitPage(false, backUrl);

  baseController();
});

async function customizeForm() {
  kendo.ui.progress($("#form"), true);
  checkboxWithInputTemplate = kendo.template($("#chekboxWithInputTemplate").html());

  initView();

  if (fw_formData.response.beamLength.value) {
    setIsChecked("beamLength");
  }
  if (fw_formData.response.perClothOffLength.value) {
    setIsChecked("perClothOffLength");
  }

  await setDropDownListUI($("input[name='beamCore']"), beamCoreListDataSource, fw_formData.response.beamCore.value, null);
  $("input[name='beamCore']").data("kendoDropDownList").bind("change", function () {
    if ($("[name='beamCore']").val()) {
      setBeamViewable(true);
    } else {
      setBeamViewable(false);
    }
  });
  await setDropDownListUI($("input[name='buckleCore']"), buckleCoreListDataSource, fw_formData.response.buckleCore.value, null);
  $("input[name='buckleCore']").data("kendoDropDownList").bind("change", function () {
    if ($("[name='buckleCore']").val()) {
      setBuckleViewable(true);
    } else {
      setBuckleViewable(false);
    }
  });
  await setDropDownListUI($("input[name='weavingMachineCore']"), weavingMachineCoreListDataSource, fw_formData.response.weavingMachineCore.value, null);
  $("input[name='weavingMachineCore']").data("kendoDropDownList").bind("change", function () {
    if ($("[name='weavingMachineCore']").val()) {
      setWeavingViewable(true);
    } else {
      setWeavingViewable(false);
    }
  });
  await setDropDownListUI($("input[name='warpingCompany']"), warpingFactoryListDataSource, fw_formData.response.warpingCompany.value, null);
  if (!fw_formData.response.warpingCompany.value) {
    $("input[name='warpingCompany']").parent().hide();
  } else {
    $("[name='is_warpingCompany']").attr("checked", true);
  }
  await setDropDownListUI($("input[name='draftingCompany']"), draftingFactoryListDataSource, fw_formData.response.draftingCompany.value, null);
  if (!fw_formData.response.draftingCompany.value) {
    $("input[name='draftingCompany']").parent().hide();
  } else {
    $("[name='is_draftingCompany']").attr("checked", true);
  }
  await setDropDownListUI($("input[name='weavingCompany']"), weavingFactoryListDataSource, fw_formData.response.weavingCompany.value, null);
  if (!fw_formData.response.weavingCompany.value) {
    $("input[name='weavingCompany']").parent().hide();
  } else {
    $("[name='is_weavingCompany']").attr("checked", true);
  }

  kendo.ui.progress($("#form"), false);
}

function baseController() {
  $('#form').on('click', "input[name='is_beamLength']", function () {
    let selector = $("input[name='is_beamLength']");
    let selectorInput = selector.parents("div.form-group").find("input");
    if (selector.attr("checked")) {
      selector.attr("checked", false);
      selectorInput.hide();
    } else {
      selector.attr("checked", true);
      selectorInput.show();
    }
  });

  $('#form').on('click', "input[name='is_warpingCompany']", function () {
    let selector = $("input[name='is_warpingCompany']");
    let selectorDropDown = selector.parents("div.form-group").find("span.k-widget.k-dropdown.form-control.number");
    if (selector.attr("checked")) {
      selector.attr("checked", false);
      selectorDropDown.hide();
    } else {
      selector.attr("checked", true);
      selectorDropDown.show();
    }
  });

  $('#form').on('click', "input[name='is_draftingCompany']", function () {
    let selector = $("input[name='is_draftingCompany']");
    let selectorDropDown = selector.parents("div.form-group").find("span.k-widget.k-dropdown.form-control.number");
    if (selector.attr("checked")) {
      selector.attr("checked", false);
      selectorDropDown.hide();
    } else {
      selector.attr("checked", true);
      selectorDropDown.show();
    }
  });

  $('#form').on('click', "input[name='is_perClothOffLength']", function () {
    let selector = $("input[name='is_perClothOffLength']");
    let selectorInput = selector.parents("div.form-group").find("input");
    if (selector.attr("checked")) {
      selector.attr("checked", false);
      selectorInput.hide();
    } else {
      selector.attr("checked", true);
      selectorInput.show();
    }
  });

  $('#form').on('click', "input[name='is_weavingCompany']", function () {
    let selector = $("input[name='is_weavingCompany']");
    let selectorDropDown = selector.parents("div.form-group").find("span.k-widget.k-dropdown.form-control.number");
    if (selector.attr("checked")) {
      selector.attr("checked", false);
      selectorDropDown.hide();
    } else {
      selector.attr("checked", true);
      selectorDropDown.show();
    }
  });

  $("#save").click(function () {
    let postData;
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    postData = $("#form").formCheck({
      name: "orderScheduleForm",
    });
    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    } else {
      postData = setSaveData();
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
              location.replace(backUrl);
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
  });
}

function initView() {
  addCheckboxField("beamLength");
  addCheckboxField("warpingCompany");
  addCheckboxField("draftingCompany");
  addCheckboxField("perClothOffLength");
  addCheckboxField("weavingCompany");
  addLineBeforeField("buckleCore");
  addLineBeforeField("weavingMachineCore");
  setBeamViewable(false);
  setBuckleViewable(false);
  setWeavingViewable(false);
}

function setIsChecked(field) {
  $("[name='is_" + field + "']").attr("checked", true);
  $("input[name='" + field + "']").val(fw_formData.response[field].value);
  $("input[name='" + field + "']").show();
}

function addCheckboxField(field) {
  let beamLengthParent = $("input[name='" + field + "']").parent();
  $("input[name='" + field + "']").remove();
  beamLengthParent.find("span").remove();
  beamLengthParent.append(checkboxWithInputTemplate(field));
}

function addLineBeforeField(field) {
  let lineTemplate = `<div class="box box-success" style="margin-top: "></div>`;
  $("input[name='" + field + "']").parents("fieldset").before(lineTemplate);
}

function setSaveData() {
  let postData = new FormData();
  let orderScheduleForm = new Object();
  orderScheduleForm.orderScheduleUuid = uuid ? uuid : 0;
  orderScheduleForm.manufactureOrderNo = $("[name='manufactureOrderNo']").val();
  orderScheduleForm.manufactureOrderUuid = manufactureOrderUuid;
  orderScheduleForm.beamCore = $("[name='beamCore']").val() ? $("[name='beamCore']").val() : null;
  orderScheduleForm.isBeamLength = $("[name='is_beamLength']").attr("checked") ? true : false;
  orderScheduleForm.beamLength = $("[name='beamLength']").val();
  orderScheduleForm.warpingStartDatetime = moment($("[name='warpingStartDatetime']").val()).format("YYYY-MM-DDTHH:mm:ssZ");
  orderScheduleForm.isWarpingCompany = $("[name='is_warpingCompany']").attr("checked") ? true : false;
  orderScheduleForm.warpingCompany = $("[name='warpingCompany']").val() ? $("[name='warpingCompany']").val() : null;
  orderScheduleForm.buckleCore = $("[name='buckleCore']").val() ? $("[name='buckleCore']").val() : null;
  orderScheduleForm.draftingStartDatetime = moment($("[name='draftingStartDatetime']").val()).format("YYYY-MM-DDTHH:mm:ssZ");
  orderScheduleForm.isDraftingCompany = $("[name='is_draftingCompany']").attr("checked") ? true : false;
  orderScheduleForm.draftingCompany = $("[name='draftingCompany']").val() ? $("[name='draftingCompany']").val() : null;
  orderScheduleForm.weavingMachineCore = $("[name='weavingMachineCore']").val() ? $("[name='weavingMachineCore']").val() : null;
  orderScheduleForm.isPerClothOffLength = $("[name='is_perClothOffLength']").attr("checked") ? true : false;
  orderScheduleForm.perClothOffLength = $("[name='perClothOffLength']").val();
  orderScheduleForm.totalWeavingLength = $("[name='totalWeavingLength']").val();
  orderScheduleForm.weavingStartDatetime = moment($("[name='weavingStartDatetime']").val()).format("YYYY-MM-DDTHH:mm:ssZ");
  orderScheduleForm.isWeavingCompany = $("[name='is_weavingCompany']").attr("checked") ? true : false;
  orderScheduleForm.weavingCompany = $("[name='weavingCompany']").val() ? $("[name='weavingCompany']").val() : null;

  postData.append("orderScheduleForm", new Blob([JSON.stringify(orderScheduleForm)], {
    type: "application/json"
  }));
  return postData;
}

function setBeamViewable(isViewable) {
  if (!isViewable) {
    $("input[name='beamLength']").parents(".col-md-12 .box_inputdata").hide();
    $("input[name='warpingStartDatetime']").parents(".col-md-12 .box_inputdata").hide();
    $("input[name='warpingCompany']").parents(".col-md-12 .box_inputdata").hide();
  } else {
    $("input[name='beamLength']").parents(".col-md-12 .box_inputdata").show();
    $("input[name='warpingStartDatetime']").parents(".col-md-12 .box_inputdata").show();
    $("input[name='warpingCompany']").parents(".col-md-12 .box_inputdata").show();
  }
}

function setBuckleViewable(isViewable) {
  if (!isViewable) {
    $("input[name='draftingStartDatetime']").parents(".col-md-12 .box_inputdata").hide();
    $("input[name='draftingCompany']").parents(".col-md-12 .box_inputdata").hide();
  } else {
    $("input[name='draftingStartDatetime']").parents(".col-md-12 .box_inputdata").show();
    $("input[name='draftingCompany']").parents(".col-md-12 .box_inputdata").show();
  }
}

function setWeavingViewable(isViewable) {
  if (!isViewable) {
    $("input[name='perClothOffLength']").parents(".col-md-12 .box_inputdata").hide();
    $("input[name='totalWeavingLength']").parents(".col-md-12 .box_inputdata").hide();
    $("input[name='weavingStartDatetime']").parents(".col-md-12 .box_inputdata").hide();
    $("input[name='weavingCompany']").parents(".col-md-12 .box_inputdata").hide();
  } else {
    $("input[name='perClothOffLength']").parents(".col-md-12 .box_inputdata").show();
    $("input[name='totalWeavingLength']").parents(".col-md-12 .box_inputdata").show();
    $("input[name='weavingStartDatetime']").parents(".col-md-12 .box_inputdata").show();
    $("input[name='weavingCompany']").parents(".col-md-12 .box_inputdata").show();
  }
}
