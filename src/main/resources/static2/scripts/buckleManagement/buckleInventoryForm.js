$(async function () {
  var backUrl = "/page/buckle/buckleInventory";
  var apiUrl = "/api/buckle/buckleInventory/template/" + uuid;
  var gridUrl = "/buckle/buckleInventory/buckleExport/history/";
  $("#form").formWizard({
    id: "buckleCoreUuid",
    url: apiUrl,
    mainData: "response.buckleInventory",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
  }); //formWizard
  //   SetInitPage(true, backUrl);
  gridUrl = "/buckle/buckleInventory/buckleImport/history/";
  creatGrid(gridUrl, "importGrid");
  gridUrl = "/buckle/buckleInventory/buckleExport/history/"
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
  var grid = new Grid(gridUrl, "grid,noToolbar", "buckleCore", "buckleCore", uuid);
  await grid.initDataSource();
  await grid.creatKendGrid($("#" + id), false);
}

function customizeForm() {
  kendo.ui.progress($("#grid"), true);



  kendo.ui.progress($("#grid"), false);
}
