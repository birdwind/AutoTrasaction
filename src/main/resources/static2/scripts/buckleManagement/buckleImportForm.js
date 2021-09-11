$(function () {
  var backUrl = "/page/buckle/buckleImport";
  // SetInitPage(false, backUrl);
  $("#form").formWizard({
    id: "buckleImportUuid",
    url: "/api/buckle/buckleImport/template/" + uuid,
    mainData: "response.buckleImport",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
  }); //formWizard
});


function customizeForm() {
  kendo.ui.progress($("#grid"), true);

  kendo.ui.progress($("#grid"), false);
} //customizeForm
