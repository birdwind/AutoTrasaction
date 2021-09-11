$(function () {
  var backUrl = "/page/orderManagement/clothOrder/form/" + uuid + "/" + status;
  SetInitPage(true, backUrl);
  $("#form").formWizard({
    id: "clothOrdrerCoreUuid",
    // url: "/api/yarn/export/template/" + uuid,
    url: "/scripts/orderManagement/orderAnalytics/" + clothOrderDetailDeliverQuantityUuid + ".json",
    mainData: "response.clothOrdrerCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm"
  }); //formWizard
});

function customizeForm() {
  kendo.ui.progress($("#grid"), true);
  var clothOrdrerDetails = fw_formData.response.clothOrdrerDetails;
  var yarnPurchaseDetails = fw_formData.response.yarnPurchaseDetails;
  var scheduleWarpingDetails = fw_formData.response.scheduleWarpingDetails;
  var scheduleDrafingDetails = fw_formData.response.scheduleDrafingDetails;
  var scheduleWeavingDetails = fw_formData.response.scheduleWeavingDetails;
  var scheduleInspectionDetails = fw_formData.response.scheduleInspectionDetails;

  setTitleByName(clothOrdrerDetails.header);
  setTitleByTableId("yarnPurchaseDetails", yarnPurchaseDetails.header);
  setTitleByTableId("scheduleWarpingDetails", scheduleWarpingDetails.header);
  setTitleByTableId("scheduleDrafingDetails", scheduleDrafingDetails.header);
  setTitleByTableId("scheduleWeavingDetails", scheduleWeavingDetails.header);
  setTitleByTableId("scheduleInspectionDetails", scheduleInspectionDetails.header);

  setContentByName(clothOrdrerDetails.contents);
  setContentByTableId("yarnPurchaseDetails", yarnPurchaseDetails.contents);
  setContentByTableId("scheduleWarpingDetails", scheduleWarpingDetails.contents);
  setContentByTableId("scheduleDrafingDetails", scheduleDrafingDetails.contents);
  setContentByTableId("scheduleWeavingDetails", scheduleWeavingDetails.contents);
  setContentByTableId("scheduleInspectionDetails", scheduleInspectionDetails.contents);

  setquotationCoreNoLink();

  setTimeout(function () {
    kendo.ui.progress($("#grid"), false);
  }, 2000);
} //customizeForm


function setquotationCoreNoLink() {
  var quotationCoreNo = $("[name='quotationCoreNo']").val();
  var quotationCoreUuid = $("[name='quotationCoreUuid']").val();
  $("[name='quotationCoreNo']")
    .siblings("span")
    .attr("class", "")
    .html(
      $("<a>")
      .text(quotationCoreNo)
      .attr("href", "/page/quotation/form/" + quotationCoreUuid)
    );;
}
