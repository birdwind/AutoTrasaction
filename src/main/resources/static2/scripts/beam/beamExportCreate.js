var backUrl = "/page/beam/beamExport";
var apiUrl = "/api/beam/beamExport/template/" + uuid;
$(function () {
    $("#form").formWizard({
        id: "beamExportUuid",
        url: apiUrl,
        mainData: "response.beamExport",
        noData: "findnodata(backUrl)",
        customizeForm: "customizeForm",
    });//formWizard
    SetInitPage(true, backUrl);
});

function customizeForm() {
    kendo.ui.progress($("#grid"), true);



    kendo.ui.progress($("#grid"), false);
}