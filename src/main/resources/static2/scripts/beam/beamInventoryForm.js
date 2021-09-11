$(async function () {
  var backUrl = "/page/beam/beamInventory";
  var apiUrl = "/api/beam/beamInventory/template/" + uuid;
  var gridUrl = "/beam/beamInventory/beamExport/history/";
  $("#form").formWizard({
    id: "beamCoreUuid",
    url: apiUrl,
    mainData: "response.beamInventory",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
  }); //formWizard
  //   SetInitPage(true, backUrl);
  gridUrl = "/beam/beamInventory/beamImport/history/";
  creatGrid(gridUrl, "importGrid");
  gridUrl = "/beam/beamInventory/beamExport/history/"
  creatGrid(gridUrl, "exportGrid");
  $("body").on("click", ".monitormenu > li", function () {
    $(this).parent().children().removeClass("active");
    $(this).addClass("active");
    console.log(this);
    if ($(this).attr("id") == "import") {
      $("#importGrid").show();
      $("#exportGrid").hide();
    } else {
      $("#importGrid").hide();
      $("#exportGrid").show();
    };

  }) //tab click event
});
async function creatGrid(gridUrl, id) {
  var grid = new Grid(gridUrl, "grid,noToolbar", "beamCore", "beamCore", uuid);
  await grid.initDataSource();
  await grid.creatKendGrid($("#" + id), false);
}

function customizeForm() {
  kendo.ui.progress($("#grid"), true);



  kendo.ui.progress($("#grid"), false);
}
