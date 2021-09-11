let rootApi = "/api/orderManagement/clothOrder";
let apiUrl = rootApi + "/finished/template/";
let backUrl = "/page/orderManagement/clothOrder";

let contactNameData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response;
    }
  }
});

$(function () {
  $("#form").formWizard({
    url: apiUrl + uuid,
    mainData: "response.clothOrderCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
    fileUpload: false,
  });//formWizard
  SetInitPage(false, backUrl);

  // baseController();
});

function customizeForm() {
  $("#form").find("input[name='outputRecord']").after(kendo.template($("#clothOrderToolsTemplate").html()));
  // setDropDownListUI($("#form").find("input[name='contactName']"), contactNameData, fw_formData.response.contactName.value, null);
}
