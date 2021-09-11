$(function () {
  var backUrl = "/page/buckle/management";
  SetInitPage(false, backUrl);
  $("#form").formWizard({
    id: "buckleCoreUuid",
    // url: "/api/yarn/export/template/" + uuid,
    url: "/scripts/buckleManagement/formJson/" + uuid + ".json",
    mainData: "response.buckleCore",
    noData: "findnodata(backurl)",
    customizeForm: "customizeForm"
  }); //formWizard
});

function customizeForm() {
  kendo.ui.progress($("#grid"), true);

  var buckleInfo = fw_formData.response.buckleInfo;
  setTitleByName(buckleInfo.header);
  setContentByName(buckleInfo.contents);

  kendo.ui.progress($("#grid"), false);
} //customizeForm
