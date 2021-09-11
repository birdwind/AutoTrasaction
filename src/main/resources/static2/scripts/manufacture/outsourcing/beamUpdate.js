var apiUrl = "/api/manufacture/outsourcing/beam/template/" + uuid;
var backUrl = "/page/manufacture/outsourcing/beam";
var noti;
var fw_deletedFiles = [];
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
  $("#chatroom").chatroom({
    dataUrl: `/api/manufacture/outsourcing/beam/chat/history/${infoStream.uuid}`,
    eventOverride: {
      "CLOSE": false, //set false not to run the default function 
      "UPDATE": "updateTable", //or input the name of your function and run it 
    }
  });

  $("body").append("<span id='noti'></span>");
  noti = $("#noti").kendoNotification({
    templates: [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
    }],
    autoHideAfter: 1500
  }).data("kendoNotification");

  // form.wizard
  $("#form").formWizard({
    url: apiUrl,
    mainData: "response.outsourcingBeamInquiryCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
  }); // formWizard

  // 金額計算
  $("body").on("keyup change", "#table input:not([name='expectDate'])", function () {
    var row = $(this).parents("tr");
    var sumPrice = 0;
    var sumExtraFee = 0;
    var sumTotalPrice = 0;
    // 小計計算
    var length = Number($(row).find("[name='length']").val()) ? Number($(row).find("[name='length']").val()) : 0;
    var amount = Number($(row).find("[name='amount']").val()) ? Number($(row).find("[name='amount']").val()) : 0;
    var price = Number($(row).find("[name='price']").val()) ? Number($(row).find("[name='price']").val()) : 0;
    var extraFee = Number($(row).find("[name='extraFee']").val()) ? Number($(row).find("[name='extraFee']").val()) : 0;
    $(row).find("[name='totalPrice']").text("$" + Number(length * amount * price + extraFee).toFixed(2)); // 小計計算

    // 合計、稅金、總計 計算
    $("#table tbody tr").each(function () {
      var length = Number($(this).find("[name='length']").val()) ? Number($(this).find("[name='length']").val()) : 0;
      var amount = Number($(this).find("[name='amount']").val()) ? Number($(this).find("[name='amount']").val()) : 0;
      var price = Number($(this).find("[name='price']").val()) ? Number($(this).find("[name='price']").val()) : 0;
      var extraFee = Number($(this).find("[name='extraFee']").val()) ? Number($(this).find("[name='extraFee']").val()) : 0;

      sumPrice += length * amount * price + extraFee;
      sumExtraFee = sumPrice * 0.05;
      sumTotalPrice = sumPrice + sumExtraFee;
    });

    $("#sumPrice").text("$" + Number(sumPrice).toFixed(2));
    $("#sumExtraFee").text("$" + Number(sumExtraFee).toFixed(2));
    $("#sumTotalPrice").text("$" + Number(sumTotalPrice).toFixed(2)); // 合計、稅金、總計 計算
  }); // 金額計算

  $("#save").click(function () {
    var postData = new FormData();
    if (verification() == 0) {
      postData = setSaveData("outsourcingBeamInquiryCore");
      if (!postData) {
        $(this).removeClass("waitaSec");
        return;
      }
      $.ajax({
        url: "/api/manufacture/outsourcing/beam/",
        data: postData,
        method: "POST",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.status) {
            noti.show({}, "saveOrInsert")
            setNoificationPosition();
            setTimeout(function () {
              $(".drawCheck").hide().delay(460).queue(function () {
                window.history.back();
                $(this).dequeue();
              });
            }, 1000);
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
    } else {
      $(this).removeClass("waitaSec");
      return;
    }
  });

  $("#savePrice").click(function () {
    var postData = new FormData();
    postData = setSaveData("outsourcingBeamInquiryDetails");
    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    $.ajax({
      url: "/api/manufacture/outsourcing/beam/price/",
      data: postData,
      method: "POST",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          var feedack = data.response.pop();
          for (i in feedack) {
            $("[class='" + i + "']").text(feedack[i]);
          }
          noti.show({}, "saveOrInsert")
          setNoificationPosition();
          setTimeout(function () {
            $(".drawCheck").hide().delay(500).queue(function () {
              $("#savePrice").removeClass("waitaSec");
              $(this).dequeue();
            });
          }, 1000);
        }
      } // end of ajax success
    }); //end of ajax
  });

  SetInitPage(false, backUrl);
});

async function getStatusName(value) {
  await statusData.fetch();
  var statusArray = statusData.data().toJSON();
  var statusName = "";
  for (var item in statusArray) {
    if (statusArray[item].value == value) {
      statusName = statusArray[item].text;
    }
  }
  $("[name='outsourcingBeamInquiryStatus']").val(value);
  $("[name='outsourcingBeamInquiryStatus']").siblings(".labelText").text(statusName)
}

// customizeForm
function customizeForm() {
  kendo.ui.progress($("#grid"), true);
  // 設定詢價 grid
  var saveRecordInfoTemplate = kendo.template($("#saveRecordInfoTemplate").html());
  $("#saveRecord").append(saveRecordInfoTemplate(fw_formData.response.outsourcingBeamInquiryDetails.contents));
  var tableTheadTemplate = kendo.template($("#tableTheadTemplate").html());
  $("#table thead").append(tableTheadTemplate(fw_formData.response.outsourcingBeamInquiryDetails.header));
  var tableTbodyTemplate = kendo.template($("#tableTbodyTemplate").html());
  $("#table tbody").append(tableTbodyTemplate(fw_formData.response.outsourcingBeamInquiryDetails.contents));
  var aggregateTemplate = kendo.template($("#aggregateTemplate").html());
  $("#aggregate").append(aggregateTemplate(fw_formData.response.outsourcingBeamInquiryDetails.contents));

  // 設定 詢價狀態選單
  if (fw_formData.response.outsourcingBeamInquiryCore.outsourcingBeamInquiryStatus.type != "label") {
    setDropDownListUI("[name='outsourcingBeamInquiryStatus']", statusData, $("[name='outsourcingBeamInquiryStatus']").val(), null);
  } else {
    getStatusName(fw_formData.response.outsourcingBeamInquiryCore.outsourcingBeamInquiryStatus.value);
    $("#savePrice").remove();
    $("[name='price']").attr("disabled", true);
    $("[name='extraFee']").attr("disabled", true);
    $(".message_sendbox").remove();
    SetInitPage(true, backUrl);
  }

  $("#detail").show();
  $("#detailGrid").show();
  $("#chatroom").show();
  setTimeout(function () {
    kendo.ui.progress($("#grid"), false);
  }, 2000);
} // customizeForm


function initExpectDate(expectDate) {
  return moment(expectDate).format("YYYY-MM-DD");
}

// 初始化：合計
function initSumPrice(data) {
  var sumPrice = 0
  for (var item in data) {
    sumPrice = sumPrice + data[item].totalPrice;
  }
  return Number(sumPrice).toFixed(2);
} // 初始化：合計

// 初始化：稅金
function initSumExtraFee(data) {
  var sumExtraFee = 0
  var sumPrice = 0
  for (var item in data) {
    sumPrice = sumPrice + data[item].totalPrice;
  }
  sumExtraFee = Number(sumPrice * 0.05).toFixed(2);
  return sumExtraFee;
} // 初始化：稅金

// 初始化：合計
function initSumTotalPrice(data) {
  var sumTotalPrice = 0;
  var sumPrice = 0
  for (var item in data) {
    sumPrice = sumPrice + data[item].totalPrice;
  }
  sumTotalPrice = Number((sumPrice * 0.05) + sumPrice).toFixed(2);
  return sumTotalPrice;
} // 初始化：合計

// 表單驗證
function verification() {
  var hasError = 0;
  var data = fw_formData.response.outsourcingBeamInquiryCore;
  for (item in data) {
    switch (item) {
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
  return hasError;
} // 表單驗證

// 設定儲存資料
function setSaveData(status) {
  var postData = new FormData();

  switch (status) {
    case 'outsourcingBeamInquiryCore':
      var outsourcingBeamInquiryCore = new Object();
      outsourcingBeamInquiryCore.outsourcingBeamInquiryCoreUuid = uuid;
      outsourcingBeamInquiryCore.outsourcingBeamInquiryStatus = $("[name='outsourcingBeamInquiryStatus']").val();
      outsourcingBeamInquiryCore.note = ($("[name='note']").val() != "") ? $("[name='note']").val() : null;
      postData.append("outsourcingBeamInquiryCore", new Blob([JSON.stringify(outsourcingBeamInquiryCore)], {
        type: "application/json"
      }));
      //處理檔案上傳
      //   var attachDetail = fw_formData.response.attachment;
      //   var attachments = {
      //     "relateUuid": uuid,
      //     "attachmentCoreUuid": attachDetail.attachmentCoreUuid,
      //     "verifyToken": (attachDetail.verifyToken) ? attachDetail.verifyToken : "0",
      //     "deleteFiles": fw_deletedFiles
      //   }
      //   postData.append("attachment", new Blob([JSON.stringify(attachments)], {
      //     type: "application/json"
      //   }));
      break;
    case "outsourcingBeamInquiryDetails":
      var outsourcingBeamInquiryDetails = new Object();

      var details = new Array();
      $("#table tbody tr").each(function () {
        var obj = new Object();
        obj.outsourcingBeamInquiryDetailUuid =
          $(this).find("[name='outsourcingBeamInquiryDetailUuid']").val();
        obj.price = (Number($(this).find("[name='price']").val())) ? $(this).find("[name='price']").val() : 0;
        obj.extraFee = (Number($(this).find("[name='extraFee']").val())) ? $(this).find("[name='extraFee']").val() : 0;
        details.push(obj);
      });

      outsourcingBeamInquiryDetails.outsourcingBeamInquiryCoreUuid = uuid;
      outsourcingBeamInquiryDetails.outsourcingBeamInquiryDetails = details;
      postData.append("outsourcingBeamInquiryDetails", new Blob([JSON.stringify(outsourcingBeamInquiryDetails)], {
        type: "application/json"
      }));
      break;
  }

  return postData;
} // 設定儲存資料

function updateTable() {
  var data = dialogueData.content;
  $(".updateDate").text(data[0].updateDate);
  $(".modify").text(data[0].modify);
  $(".modifyIp").text(data[0].modifyIp);
  for (i in data) {
    $("#price_" + data[i].outsourcingBeamInquiryDetailUuid).val(data[i].price);
    $("#extraFee_" + data[i].outsourcingBeamInquiryDetailUuid).val(data[i].extraFee);
    $("#totalPrice_" + data[i].outsourcingBeamInquiryDetailUuid).text(data[i].totalPrice);
  }
} //updateTable
