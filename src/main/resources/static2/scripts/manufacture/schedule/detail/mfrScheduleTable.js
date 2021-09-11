var backUrl = "/page/manufacture/schedule";
$(function () {
    $("#form").formWizard({
        id: "clothOrderDetailDeliverQuantityUuid",
        url: "/api/manufacture/schedule/overview/template/" + uuid,
        mainData: "response.orderScheduleCore",
        noData: "findnodata(backUrl)",
        customizeForm: "customizeForm"
    });//formWizard


});

function customizeForm() {
    kendo.ui.progress($("#grid"), true);

    var yarnPurchaseDetailsTemplate = kendo.template($("#yarnPurchaseDetailsTemplate").html(), { useWithBlock: true });
    $("#yarnPurchaseDetails").html(yarnPurchaseDetailsTemplate(fw_formData.response.yarnPurchaseDetails));

    var stationTemplate = kendo.template($("#stationTemplate").html(), { useWithBlock: true });
    $("#stationTable").html(stationTemplate(fw_formData.response));

    kendo.ui.progress($("#grid"), false);
}