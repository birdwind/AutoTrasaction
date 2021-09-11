var filter, supplier;
var yarnQualityBatchesData = new kendo.data.DataSource();
let validatedFiles = [];
let deleteFileData = [];
let totalSize = 0;
let allSize = [];
let weftRingAmount = 1;
let sprayAmount = 1;
$(function () {

  let formData = $("#form").formWizard({
    id: "beamImportUuid",
    url: "/api/beam/beamImport/template/" + uuid,
    mainData: "response.beamImport",
    noData: "findnodata",
    customizeForm: "customizeForm",
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
}) //$(function ()
function findnodata() {
  $("html").remove();
  location.replace("/page/beam/beamImport/");
} //findnodata

function customizeForm() {

  $.each(fw_formData.response.beamCore, function (index, value) {
    if (value.value == null) {
      $("input[name='" + index + "']").val("");
    }
  })
}
