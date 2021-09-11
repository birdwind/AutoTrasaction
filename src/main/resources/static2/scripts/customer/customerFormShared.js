var rootApi = "/api/customer/management";
var apiUrl = rootApi + "/template/";
var backUrl = "page/customer/management";
// var uuid = infoStream.uuid ? infoStream.uuid : "";
var panelbar;
var grid;
var supplyChainCategory;
var tradeMethod;
var detailTitleTemplate;
var detailBodyTemplate;
var salesTitleTemplate;
var salesBodyTemplate;
var tradeMethodData = setLocalDataSource("/trade/list");
var checkValidData = setLocalDataSource("/check/valid/list");
var departmentData = setLocalDataSource("/department/list");
var jobTitleData = setLocalDataSource("/job/title/list");
var isChang = false;

var companyManagementCoreView;
var companyManagementDetailGrid;
var companyManagementSalesGrid;

var delSales = [];

var isMemberCheckboxTemplate = `
</br>
</br>
<div class="form-group">
  <input type="checkbox" id="isMember" name="isMember" class="k-checkbox">
    <label id="account" class="k-checkbox-label" for="isMember">產生登入帳號密碼</label>
  </input>
</div>
`;

$(async function () {
  panelbar = $("#panelbar").kendoPanelBar().data("kendoPanelBar");
  await $("#form").formWizard({
    url: apiUrl + uuid,
    mainData: "response.companyManagementCoreView",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
    fileUpload: true,
  });//formWizard
  SetInitPage(false, backUrl);

  //-----聯絡資料Start-----
  detailTitleTemplate = kendo.template($("#detailTitleTemplate").html());
  detailBodyTemplate = kendo.template($("#detailBodyTemplate").html());
  //-----聯絡資料End-----

  //-----業務資料Start-----
  salesTitleTemplate = kendo.template($("#salesTitleTamplate").html());
  salesBodyTemplate = kendo.template($("#salesBodyTemplate").html());
  //-----業務資料End-----
  baseController();
});

function baseController() {

  //-----聯絡資料-------
  $("#detail .addbtn").click(function () {
    addDetailRow()
  });

  $("#detail").on("click", "[name='tableDel']", function () {
    $(this).parents("tr").remove();
  });// 刪除聯絡資訊
  //-----聯絡資料-------

  //-----業務資料-------
  $("#sales .addbtn").click(function () {
    addSalelRow();
  });

  $("#sales").on("click", "[name='tableDel']", function () {
    delSales.push($(this).parents("tr").find("[name='memberCoreUuid']").val());
    $(this).parents("tr").remove();
  });
  //-----業務資料-------


  $("#save").click(function () {
    var postData = new FormData();
    if (verification() == 0) {
      postData = setSaveData();
      if (!postData) {
        $(this).removeClass("waitSec");
        return;
      }
      $.ajax({
        url: rootApi,
        data: postData,
        method: uuid ? "POST" : "PUT",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.status) {
            fw_notification.show({}, "saveOrInsert");
            setNoificationPosition();
            setTimeout(function () {
              $(".drawCheck").hide().delay(460).queue(function () {
                location.replace("/page/customer/management");
                $(this).dequeue();
              });
            }, 1000);
          } else {
            $("#save").removeClass("waitaSec");
            for (i of data.response) {
              $("#form [name='" + i.field + "']").errorMsg({
                message: i.defaultMessage
              });
              if(i.field.indexOf("files") != -1){
                $('#fileInfo h4 span:contains(' + i.rejectedValue + ')').parent().find("span.error").append(i.code);
              }
            }
          }
        } // end of ajax success
      }); //end of ajax
    }
  });
}

async function customizeForm() {
  kendo.ui.progress($("#form"), true);

  companyManagementCoreView = fw_formData.response.companyManagementCoreView;
  companyManagementDetailGrid = fw_formData.response.companyManagementDetailGrid;
  companyManagementSalesGrid = fw_formData.response.companyManagementSalesGrid;

  //聯絡資訊title template
  $("#detail thead").append(detailTitleTemplate(companyManagementDetailGrid.header));

  //業務資料title template
  $("#sales thead").append(salesTitleTemplate(companyManagementSalesGrid.header));

  //設為會員checkbox
  let isMember = $("#form").find("input[name = 'inCharge']").parent();
  isMember.append(kendo.template(isMemberCheckboxTemplate));
  console.log("test")
  uuid === "" ? await customizeCreateForm() : await customizeUpdateForm();
  uuid === "" ? await customizeCreateGrid() : await customizeUpdateGrid();

  kendo.ui.progress($("#form"), false);
}

async function setDepartmentDropDownList(value, id) {
  let deparmentDataTemp = departmentData;
  let department = id ? id : $("#sales").find("input[name='department']");
  await setDropDownListUI(department, deparmentDataTemp, null, value);
}

async function setJobTitleDropDownList(value, id) {
  let jobTitleDataTemp = jobTitleData;
  let jobTitle = id ? id : $("#sales").find("input[name='jobTitle']");
  await setDropDownListUI(jobTitle, jobTitleDataTemp, null, value);
}

function initMultiSelect(selector, api, value) {
  selector.kendoMultiSelect({
    placeholder: "選擇廠商分類",
    dataTextField: "text",
    dataValueField: "value",
    dataSource: {
      dataType: "json",
      transport: {
        read: rootApi + api
      },
      schema: {
        data: function (data) {
          return data.response;
        }
      },
      group: {field: "parentSupplyChain"}
    }
  });
  if (value) {
    $("[name='customerSupplyChains']").data("kendoMultiSelect").value(value);
  }
}

function setLocalDataSource(api) {
  return new kendo.data.DataSource({
    transport: {
      read: {
        url: rootApi + api,
        dataType: "json"
      }
    },
    schema: {
      data: function (data) {
        return data.response;
      }
    }
  });
}

function addDetailRow(count) {
  let detailCount = count ? count : $("#detail tbody tr").length;
  $("#detail tbody").append(detailBodyTemplate(detailCount));
}

function addSalelRow(count) {
  let detailCount = count ? count : $("#sales tbody tr").length;
  $("#sales tbody").append(salesBodyTemplate(detailCount));
  if (!count) {
    setDepartmentDropDownList(null, $("#department_" + detailCount));
    setJobTitleDropDownList(null, $("#jobTitle_" + detailCount));
  }
}

function verification() {
  var hasError = 0;
  //主表單
  for (item in companyManagementCoreView) {
    switch (item) {
      case "customerSupplyChains":
        if (companyManagementCoreView[item].required && $("[name='" + item + "']").data("kendoMultiSelect").value().length == 0) {
          $("[name='" + item + "']").errorMsg({
            message: "請選擇" + companyManagementCoreView[item].title + "!"
          });
          hasError = 1;
        }
        break;
      case "founded":
        if ($("[name='" + item + "']").val() != "" && checkDate($("[name='" + item + "']").val()) == false) {
          $("[name='" + item + "']").errorMsg({
            message: companyManagementCoreView[item].title + "：非日期格式!"
          });
          hasError = 1;
        }
        break;
      default:
        if (companyManagementCoreView[item].required && $("[name='" + item + "']").val() == "") {
          $("[name='" + item + "']").errorMsg({
            message: "請輸入" + companyManagementCoreView[item].title + "!"
          });
          hasError = 1;
        }
        break;
    }
  }

  //detail表單
  for(let index = 0; index < $("#detail tbody tr").length; index++){
    for (item in companyManagementDetailGrid.header) {
      switch (item) {
        case "email":
          if(companyManagementDetailGrid.header[item].required || checkEmail($("#" + item + "_" + index).val()) == false) {
            $("#" + item + "_" + index).errorMsg({
              message: companyManagementDetailGrid.header[item].title + "：E-mail格式錯誤!"
            });
            hasError = 1;
          }
          break;
        default:
          if (companyManagementDetailGrid.header[item].required && $("#" + item + "_" + index).val() == "") {
            $("#" + item + "_" + index).errorMsg({
              message: "請輸入" + companyManagementDetailGrid.header[item].title + "!"
            });
            hasError = 1;
          }
          break;
      }
    }
  }

  //sales表單
  for(let index = 0; index < $("#sales tbody tr").length; index++){
    for (item in companyManagementSalesGrid.header) {
      switch (item) {
        case "email":
          if(companyManagementSalesGrid.header[item].required || checkEmail($("#sale_" + item + "_" + index).val()) == false) {
            $("#sale_" + item + "_" + index).errorMsg({
              message: companyManagementSalesGrid.header[item].title + "：E-mail格式錯誤!"
            });
            hasError = 1;
          }
          break;
        case "phone":
          if (companyManagementSalesGrid.header[item].required && $("#sale_" + item + "_" + index).val() == "") {
            $("#sale_" + item + "_" + index).errorMsg({
              message: "請輸入" + companyManagementSalesGrid.header[item].title + "!"
            });
            hasError = 1;
          }
          break;
        default:
          if (companyManagementSalesGrid.header[item].required && $("#" + item + "_" + index).val() == "") {
            $("#" + item + "_" + index).errorMsg({
              message: "請輸入" + companyManagementSalesGrid.header[item].title + "!"
            });
            hasError = 1;
          }
          break;
      }
    }
  }
  return hasError;
}


function setSaveData() {
  let postData = new FormData();
  let companyManagementCoreView = {};
  companyManagementCoreView.companyCoreUuid = uuid ? uuid : "0";
  companyManagementCoreView.supplyChains = $("[name='customerSupplyChains']").data("kendoMultiSelect").value();
  companyManagementCoreView.companyNo = $("[name='companyNo']").val();
  companyManagementCoreView.nameFull = $("[name='nameFull']").val();
  companyManagementCoreView.nameShort = $("[name='nameShort']").val();
  companyManagementCoreView.founded = moment($("[name='founded']").val()).format("YYYY-MM-DDTHH:mm:ssZ") ? moment($("[name='founded']").val()).format("YYYY-MM-DDTHH:mm:ssZ") : "";
  companyManagementCoreView.inChargeUuid = $("[name='inChargeUuid']").val() ? $("[name='inChargeUuid']").val() : 0;
  companyManagementCoreView.inCharge = $("[name='inCharge']").val();
  companyManagementCoreView.isChange = isChang;
  companyManagementCoreView.companyValue = $("[name='companyValue']").val().trim() ? $("[name='companyValue']").val().trim() : 0;
  companyManagementCoreView.credit = $("[name='credit']").val().trim() ? $("[name='credit']").val().trim() : 0;
  companyManagementCoreView.tradeMethod = $("[name='tradeMethod']").val() ? $("[name='tradeMethod']").val() : null;
  companyManagementCoreView.checkValid = $("[name='checkValid']").val() ? $("[name='checkValid']").val() : null;
  companyManagementCoreView.payRequest = $("[name='payRequest']").val().trim() ? $("[name='payRequest']").val().trim() : 0;
  companyManagementCoreView.website = $("[name='website']").val();
  companyManagementCoreView.note = $("[name='note']").val();
  if($("[name='isMember']:checked").length > 0){
    companyManagementCoreView.isMember = true;
  }else{
    companyManagementCoreView.isMember = false;
  }

  postData.append("companyManagementCoreForm", new Blob([JSON.stringify(companyManagementCoreView)], {
    type: "application/json"
  }));

  let companyManagementDetailGrid = {};
  companyManagementDetailGrid.companyManagementCoreUuid = uuid ? uuid : "0";
  companyManagementDetailGrid.companyDetails = [];
  $("#detail tbody tr").each(function () {
    let obj = {};
    obj.companyDetailUuid = $(this).find("[name='companyDetailUuid']").val() ? $(this).find("[name='companyDetailUuid']").val() : 0;
    obj.address = $(this).find("[name='address']").val();
    obj.email = $(this).find("[name='email']").val();
    obj.fax = $(this).find("[name='fax']").val();
    obj.phone = $(this).find("[name='phone']").val();
    obj.receiptAddress = $(this).find("[name='receiptAddress']").val();
    companyManagementDetailGrid.companyDetails.push(obj);
  });

  postData.append("companyManagementDetailForm", new Blob([JSON.stringify(companyManagementDetailGrid)], {
    type: "application/json"
  }));

  let companyManagementSalesGrid = {};
  companyManagementSalesGrid.companyManagementCoreUuid = uuid ? uuid : "0";
  companyManagementSalesGrid.companyManagementSalesForms = [];
  $("#sales tbody tr").each(function () {
    let obj = {};
    obj.memberCoreUuid = $(this).find("[name='memberCoreUuid']").val() ? $(this).find("[name='memberCoreUuid']").val() : 0;
    obj.name = $(this).find("[name='name']").val();
    obj.email = $(this).find("[name='email']").val();
    obj.department = $(this).find("[name='department']").val() ? $(this).find("[name='department']").val() : null;
    obj.extension = $(this).find("[name='extension']").val();
    obj.jobTitle = $(this).find("[name='jobTitle']").val() ? $(this).find("[name='jobTitle']").val() : null;
    obj.note = $(this).find("[name='note']").val();
    obj.phone = $(this).find("[name='phone']").val();

    if($(this).find("[name='isMember']:checked").length > 0){
      obj.isMember = true;
    }else{
      obj.isMember = false;
    }

    companyManagementSalesGrid.companyManagementSalesForms.push(obj);
  });

  postData.append("companyManagementSalesForm", new Blob([JSON.stringify(companyManagementSalesGrid)], {
    type: "application/json"
  }));

  let companyManagementSalesDelForm = {};
  companyManagementSalesDelForm.companyManagementCoreUuid = uuid ? uuid : "0";
  if(delSales.length > 0){
    companyManagementSalesDelForm.deleteSales = [];
    for(i in delSales){
      if(delSales[i] == ""){
        break;
      }
      let obj = {};
      obj.saleUuid = delSales[i];
      companyManagementSalesDelForm.deleteSales.push(obj);
    }
  }
  postData.append("companyManagementSalesDelForm", new Blob([JSON.stringify(companyManagementSalesDelForm)], {
    type: "application/json"
  }));

  //處理檔案上傳
  var attachDetail = fw_formData.response.attachment;
  var attachments = {
    "relateUuid": uuid ? uuid : "0",
    "attachmentCoreUuid": attachDetail.attachmentCoreUuid,
    "verifyToken": (attachDetail.verifyToken) ? attachDetail.verifyToken : "0",
    "deleteFiles": fw_deletedFiles
  };
  postData.append("attachment", new Blob([JSON.stringify(attachments)], {
    type: "application/json"
  }));
  if (fw_uploadFiles.length) {
    for (i in fw_uploadFiles) {
      postData.append('uploadFiles', fw_uploadFiles[i].file);
    }
  }

  return postData;
}

function dropDownListToText(dataSource, value) {
  let data = dataSource.data();
  for (index in data) {
    if (data[index].value == value) {
      return data[index].text;
    }
  }
  return "";
}

function dropDownListToValue(dataSource, text) {
  let data = dataSource.data()
  for (index in data) {
    if (data[index].text == text) {
      return data[index].value;
    }
  }
  return "";
}
