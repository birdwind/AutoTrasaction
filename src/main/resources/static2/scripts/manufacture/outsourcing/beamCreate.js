var apiUrl = "/api/manufacture/outsourcing/beam/template";
var backUrl = "/page/manufacture/outsourcing/beam";
var fw_deletedFiles = [];

var outsourcingBeamCopy
if (typeof (Storage) !== "undefined") {
  if (sessionStorage.getItem("outsourcingBeamCopy") != null) {
    outsourcingBeamCopy = JSON.parse(sessionStorage.getItem("outsourcingBeamCopy"));
    sessionStorage.removeItem("outsourcingBeamCopy");
  } //if
} //if

var outSourcingCompanyData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/manufacture/outsourcing/beam/warping/factory/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});

var inquiryData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/manufacture/outsourcing/beam/product/manager/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});

var clothOrderDetailData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/manufacture/outsourcing/beam/cloth/order/list/",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});

var statusData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/manufacture/outsourcing/beam/status/list/",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});

$(function () {
  // form.wizard
  $("#form").formWizard({
    url: apiUrl,
    mainData: "response.outsourcingBeamInquiryCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
  }); // formWizard

  SetInitPage(false, backUrl);

  $("body").on("click", ".sendEmail ~ .addBtn ", function () {
    var emailTemplate = kendo.template($("#emailTemplate").html());
    $(this).nextAll(".contactsContainer").append(emailTemplate);
    $(".contactNameTitle").html(fw_formData.response.outsourcingBeamInquiryCore.contacts[0].contactName.title + "<span class='color_pink'>*</span>");
    $(".contactEmailTitle").html(fw_formData.response.outsourcingBeamInquiryCore.contacts[0].contactEmail.title + "<span class='color_pink'>*</span>");
  }); // Add Email

  $("body").on("click", ".extraEmail > .delBtn ", function () {
    $(this).parent().remove();
  }); // delete Email

  $("body").on("change", ".sendEmail", function () {
    if ($(this).children("input:checkbox").prop("checked")) {
      $(this).nextAll(".addBtn, .contacts").show();
    } else {
      // 取消寄送時，將輸入項目狀態復原
      $(this).parent().find("input:text").val("");
      $(this).parent().find("input:text").removeClass("invalidInput");
      $(this).parent().find(".errorMsg").text("");
      $(this).nextAll(".addBtn, .contacts").hide();
      $(this).parent().find(".contactsContainer").html("");
    }
  }); // 是否寄送Email

  $("body").on("click", "#addDetail", function () {
    var tableTbodyTemplate = kendo.template($("#tableTbodyTemplate").html());
    var row = getGuid();
    $("#table tbody").append(tableTbodyTemplate(row));
    setDateUIBySelect("#expectDate_" + row);
    var data = clothOrderDetailData;
    setDropDownListUI("#clothOrderDetail_" + row, data, null, null);
  }); // 新增詢價布種

  $("body").on("click", "[name='tableDel']", function () {
    $(this).parents("tr").remove();
  }); // 刪除詢價布種

  $("body").on("keyup change", ".emailSection input:text", function () {
    var value = $(this).val().trim();
    var name = $(this).attr("name");
    switch (name) {
      case "contactEmail":
        if (value.length > 0) {
          $(this).removeClass("invalidInput");
          $(this).siblings(".errorMsg").text("");
          if (!checkEmail(value)) {
            $(this).errorMsg({
              message: "Email格式不正確!"
            });
          }
        }
        break;
      default:
        if (value.length > 0) {
          $(this).removeClass("invalidInput");
          $(this).siblings(".errorMsg").text("");
        }
        break;
    }
  }); // 處理窗口輸入後error msg 清除事件

  $("body").on("keyup change", "#table input:text", function () {
    var value = $(this).val().trim();
    var name = $(this).attr("name");
    switch (name) {
      case "expectDate":
        if ($(this).val().length > 0) {
          $(this).closest("td").find(".invalidInput").removeClass("invalidInput");
          $(this).closest("td").find(".errorMsg").text("");
          if (!checkDate($(this).val())) {
            $(this).errorMsg({
              message: "日期格式不正確!"
            });
          }
        }
        break;
      default:
        if (value.length > 0) {
          $(this).closest("td").find(".invalidInput").removeClass("invalidInput");
          $(this).closest("td").find(".errorMsg").text("");
        }
        break;
    }
  }); // 處理盤頭詢價輸入後error msg 清除事件

  $("#save").click(function () {
    if (verification() == 0) {
      var company = $("[name='outsourcingCompany']").data("kendoMultiSelect").value();
      var run = 1
      for (var item in company) {
        var postData = new FormData();
        postData = setSaveData(company[item]);
        if (!postData) {
          $(this).removeClass("waitaSec");
          return;
        }
        $.ajax({
          url: "/api/manufacture/outsourcing/beam/",
          data: postData,
          method: "PUT",
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (data) {
            if (data.status) {
              if (run == company.length) {
                fw_notification.show({}, "saveOrInsert");
                setNoificationPosition();
                setTimeout(function () {
                  $(".drawCheck").hide().delay(460).queue(function () {
                    window.history.back();
                    $(this).dequeue();
                  });
                }, 1000);
              } else {
                run++;
              }
            } else {
              $("#save").removeClass("waitaSec");
              for (i of data.response) {
                $("#form [name='" + i.field + "']").errorMsg({
                  message: i.defaultMessage
                });
              }
            }
          } // end of ajax success
        }); //end of ajax
      }
    } else {
      $(this).removeClass("waitaSec");
      return;
    }
  });

});

function customizeForm() {
  kendo.ui.progress($("#grid"), true);

  // 詢價廠商
  $("[name='outsourcingCompany']").closest(".box_inputdata").after("<span id='contactsContainer'></span>");

  // 詢價項目 grid
  var tableTheadTemplate = kendo.template($("#tableTheadTemplate").html());
  $("#table thead").append(tableTheadTemplate(fw_formData.response.outsourcingBeamInquiryDetails.header));

  if (outsourcingBeamCopy != null) {
    var mainCore = outsourcingBeamCopy.outsourcingBeamInquiryCore;
    var details = outsourcingBeamCopy.outsourcingBeamInquiryDetails.contents;

    initFormMultiSelect(mainCore.outsourcingCompany.value, mainCore);
    setDropDownListUI("[name='inquirer']", inquiryData, null, mainCore.inquirer.value);
    setDropDownListUI("[name='outsourcingBeamInquiryStatus']", statusData, null, null);
    $("[name='note']").val(mainCore.note.value);

    for (i in details) {
      var tableTbodyTemplate = kendo.template($("#tableTbodyTemplate").html());
      var row = getGuid();
      $("#table tbody").append(tableTbodyTemplate(row));
      setDateUIBySelect("#expectDate_" + row);

      $("#length_" + row).val(details[i].length);
      $("#amount_" + row).val(details[i].amount);
      $("#expectDate_" + row).val(moment(details[i].expectDate).format("YYYY-MM-DD"));

      var data = clothOrderDetailData;
      setDropDownListUI("#clothOrderDetail_" + row, data, details[i].clothOrderDetailUuid, null);
    } //end of loop
    if (details.length <= 1) {
      $("#table tbody [name = 'tableDel']").hide();
    }
  } else {
    initFormMultiSelect(null);
    setDropDownListUI("[name='inquirer']", inquiryData, null, null);
    setDropDownListUI("[name='outsourcingBeamInquiryStatus']", statusData, null, null);
    $("#addDetail").trigger("click");
    if ($("#table tbody .tr").length <= 1) {
      $("#table tbody [name = 'tableDel']").hide();
    }
  }

  setTimeout(function () {
    kendo.ui.progress($("#grid"), false);
  }, 2000);
}

async function initFormMultiSelect(value, mainCore) {
  var tmpCompanyUuid = "";
  var tmpCompanyArr = [];
  await outSourcingCompanyData.fetch();
  if (value != null && value != "") {
    var companyArray = outSourcingCompanyData.data().toJSON();

    for (var item in companyArray) {
      if (companyArray[item].text == value) {
        tmpCompanyUuid = companyArray[item].value;
        tmpCompanyArr = companyArray[item];
      }
    }
  }
  var outSourcingCompanyObj = $("[name='outsourcingCompany']").kendoMultiSelect({
    placeholder: "請選擇詢價廠商",
    dataTextField: "text",
    dataValueField: "value",
    dataSource: outSourcingCompanyData,
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    select: function (e) {
      var emailsectionTemplate = kendo.template($("#emailsectionTemplate").html());
      $("#contactsContainer").append(emailsectionTemplate(e.dataItem));

      $(".contactNameTitle").html(fw_formData.response.outsourcingBeamInquiryCore.contacts[0].contactName.title + "<span class='color_pink'>*</span>");
      $(".contactEmailTitle").html(fw_formData.response.outsourcingBeamInquiryCore.contacts[0].contactEmail.title + "<span class='color_pink'>*</span>");
      $("[name='outsourcingCompany']").closest(".box_inputdata,td").find(".invalidInput").removeClass("invalidInput");
      $("[name='outsourcingCompany']").closest(".box_inputdata,td").find(".errorMsg").text("");
    },
    deselect: function (e) {
      $(`.emailSection[data-id='${e.dataItem.value}']:not(:hidden)`).remove();
    }
  }); // 詢價廠商

  // 複製處理
  if (value != null && value != "") {
    //增加寄送 Email Area
    outSourcingCompanyObj.data("kendoMultiSelect").value(tmpCompanyUuid);
    var emailsectionTemplate = kendo.template($("#emailsectionTemplate").html());
    $("#contactsContainer").append(emailsectionTemplate(tmpCompanyArr));

    $(".contactNameTitle").html(fw_formData.response.outsourcingBeamInquiryCore.contacts[0].contactName.title + "<span class='color_pink'>*</span>");
    $(".contactEmailTitle").html(fw_formData.response.outsourcingBeamInquiryCore.contacts[0].contactEmail.title + "<span class='color_pink'>*</span>");
    $("[name='outsourcingCompany']").closest(".box_inputdata,td").find(".invalidInput").removeClass("invalidInput");
    $("[name='outsourcingCompany']").closest(".box_inputdata,td").find(".errorMsg").text("");

    if (mainCore.contacts.length > 0) {
      $("[data-id='" + tmpCompanyUuid + "'] input:checkbox").prop("checked", true).trigger("change");

      $("[data-id='" + tmpCompanyUuid + "'] .contacts [name='contactName']").val(mainCore.contacts[0].contactName.value);

      $("[data-id='" + tmpCompanyUuid + "'] .contacts [name='contactEmail']").val(mainCore.contacts[0].contactEmail.value);

      if (mainCore.contacts.length > 1) {
        for (var i = 1; i < mainCore.contacts.length; i++) {
          $("[data-id='" + tmpCompanyUuid + "'] .addBtn").trigger("click");
          $("[data-id='" + tmpCompanyUuid + "'] .contactsContainer [name='contactName']:last").val(mainCore.contacts[i].contactName.value);

          $("[data-id='" + tmpCompanyUuid + "'] .contactsContainer [name='contactEmail']:last").val(mainCore.contacts[i].contactEmail.value);
        }
      }
    }
  }
}

function verification() {
  var hasError = 0;
  var data = fw_formData.response.outsourcingBeamInquiryCore;
  var detail = fw_formData.response.outsourcingBeamInquiryDetails.header;
  for (item in data) {
    switch (item) {
      case "inquiryDate":
        if ($("[name='" + item + "']").val() != "" && checkDate($("[name='" + item + "']").val()) == false) {
          $("[name='" + item + "']").errorMsg({
            message: data[item].title + "：非日期格式!"
          });
          hasError = 1;
        }
        case "outsourcingCompany":
          if (data[item].required && $("[name='" + item + "']").data("kendoMultiSelect").value().length == 0) {
            $("[name='" + item + "']").errorMsg({
              message: "請輸入" + data[item].title + "!"
            });
            hasError = 1;
          }
          break;
        case "inquirer":
          if (data[item].required && $("[name='" + item + "']").data("kendoDropDownList").value() == "") {
            $("[name='" + item + "']").errorMsg({
              message: "請輸入" + data[item].title + "!"
            });
            hasError = 1;
          }
          break;
        case "outsourcingBeamInquiryStatus":
          if (data[item].required && $("[name='" + item + "']").data("kendoDropDownList").value() == "") {
            $("[name='" + item + "']").errorMsg({
              message: "請輸入" + data[item].title + "!"
            });
            hasError = 1;
          }
          break;
    }
  } // 主表單驗證

  // 寄送Email驗證
  // 取得廠商
  var companyUuid = $("[name='outsourcingCompany']").data("kendoMultiSelect").value();
  for (var item in companyUuid) {
    if ($("[data-id='" + companyUuid[item] + "'] input:checkbox").prop("checked")) {
      $("[data-id='" + companyUuid[item] + "'] [name='contactName']").each(function () {
        if ($(this).val() == "") {
          $(this).errorMsg({
            message: "請輸入" + data["contacts"][0].contactName.title + "!"
          });
          hasError = 1;
        }
      });

      $("[data-id='" + companyUuid[item] + "'] [name='contactEmail']").each(function () {
        if ($(this).val() == "") {
          $(this).errorMsg({
            message: "請輸入" + data["contacts"][0].contactEmail.title + "!"
          });
          hasError = 1;
        } else if ($(this).val() != "" && !checkEmail($(this).val())) {
          $(this).errorMsg({
            message: "Email格式不正確!"
          });
          hasError = 1;
        }
      });
    }
  }

  //次表單驗證
  if ($("#table tbody tr").length == 0) {
    fw_confirmBox.init({
      content: "<h2>請設定詢價項目！</h2>"
    });
    fw_confirmBox.box.find("button").hide();
    fw_confirmBox.show();
    hasError = 1;
  } else {
    $("#table tbody tr").each(function () {
      $(this).find("input").each(function () {
        var name = $(this).attr("name")
        if ($(this).val().length == 0) {
          $(this).errorMsg({
            message: "請輸入" + detail[name].title + "!"
          });
          hasError = 1;
        } else {
          switch (name) {
            case "expectDate":
              if (!checkDate($(this).val())) {
                $(this).errorMsg({
                  message: "日期格式不正確!"
                });
                hasError = 1;
              }
              break;
          }
        }
      });
    });
  }

  return hasError;
}

function setSaveData(companyUuid) {
  var postData = new FormData();
  var outsourcingBeamInquiryCore = new Object();
  var outsourcingBeamInquiryDetails = new Object();


  outsourcingBeamInquiryCore.inquiryDate = moment($("[name='inquiryDate']").val()).format("YYYY-MM-DDTHH:mm:ssZ");
  outsourcingBeamInquiryCore.outsourcingCompany = companyUuid;
  outsourcingBeamInquiryCore.outsourcingBeamInquiryStatus = $("[name='outsourcingBeamInquiryStatus']").val();
  outsourcingBeamInquiryCore.note = ($("[name='note']").val() != "") ? $("[name='note']").val() : null;


  // 處理寄送Email
  var contacts = new Array();
  if ($("[data-id='" + companyUuid + "'] input:checkbox").prop("checked")) {
    $("[data-id='" + companyUuid + "'] .contacts").each(function () {
      var obj = new Object();
      obj.contactName = $(this).find("[name='contactName']").val();
      obj.contactEmail = $(this).find("[name='contactEmail']").val();
      contacts.push(obj);
    });
    $("[data-id='" + companyUuid + "'] .contactsContainer fieldset").each(function () {
      var obj = new Object();
      obj.contactName = $(this).find("[name='contactName']").val();
      obj.contactEmail = $(this).find("[name='contactEmail']").val();
      contacts.push(obj);
    });
  }
  if (contacts.length > 0) {
    outsourcingBeamInquiryCore.contacts = contacts;
  } else {
    outsourcingBeamInquiryCore.contacts = [];
  } // 處理寄送Email
  outsourcingBeamInquiryCore.inquirer = $("[name='inquirer']").val();

  postData.append("outsourcingBeamInquiryCore", new Blob([JSON.stringify(outsourcingBeamInquiryCore)], {
    type: "application/json"
  }));

  var details = new Array();
  $("#table tbody tr").each(function () {
    var obj = new Object();
    obj.clothOrderDetail =
      $(this).find("[name='clothOrderDetail']").val();
    obj.expectDate = moment($(this).find("[name='expectDate']").val()).format("YYYY-MM-DDTHH:mm:ssZ");
    obj.length = Number($(this).find("[name='length']").val());
    obj.amount = Number($(this).find("[name='amount']").val());
    obj.price = 0;
    obj.extraFee = 0;
    details.push(obj);
  });
  outsourcingBeamInquiryDetails.outsourcingBeamInquiryDetails = details;
  postData.append("outsourcingBeamInquiryDetails", new Blob([JSON.stringify(outsourcingBeamInquiryDetails)], {
    type: "application/json"
  }));

  // //處理檔案上傳
  // var relateUuid = "0";
  // var attachDetail = fw_formData.response.attachment;
  // var attachments = {
  //   "relateUuid": relateUuid,
  //   "attachmentCoreUuid": attachDetail.attachmentCoreUuid,
  //   "verifyToken": (attachDetail.verifyToken) ? attachDetail.verifyToken : "0",
  //   "deleteFiles": fw_deletedFiles
  // }
  // postData.append("attachment", new Blob([JSON.stringify(attachments)], {
  //   type: "application/json"
  // }));
  return postData;
}
