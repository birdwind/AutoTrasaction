$(function () {
  var backUrl = "/page/buckle/buckleExport";
  // SetInitPage(false, backUrl);
  $("#form").formWizard({
    id: "buckleExportUuid",
    url: "/api/buckle/buckleExport/template/" + uuid,
    mainData: "response.buckleExport",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
  }); //formWizard
});


function customizeForm() {
  kendo.ui.progress($("#grid"), true);

  kendo.ui.progress($("#grid"), false);
} //customizeForm
