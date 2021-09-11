$(async function () {
  var backUrl = "/page/cloth/import/";
  var apiUrl = "/api/cloth/import/template/" + uuid;
  let baseUrl = "/cloth/import/"
  let activeType = "import/"
  $("#form").formWizard({
    id: "clothImportUuid",
    url: apiUrl,
    mainData: "response.clothImport",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
  }); //formWizard

});


function customizeForm() {
  kendo.ui.progress($("#grid"), true);
  $("input[name='stock']").siblings(".labelText").append("<nav>Y</nav>")


  kendo.ui.progress($("#grid"), false);
}
