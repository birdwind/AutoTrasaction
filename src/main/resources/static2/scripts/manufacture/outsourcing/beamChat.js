var apiUrl = "/api/manufacture/outsourcing/beam/guest/template/" + infoStream.token;
var noti;

$(function () {
  $("#chatroom").chatroom({
    dataUrl: `/api/manufacture/outsourcing/beam/guest/chat/history/${infoStream.token}`,
    eventOverride: {
      "CLOSE": "closeInfoStream", //set false not to run the default function 
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

  $.ajax({
    url: apiUrl,
    method: 'GET',
    success: function (data) {
      createTable(data.response.outsourcingBeamInquiryDetails)
    }
  }); //end of ajax

  $("#savePrice").click(function () {
    var postData = new FormData();
    postData = setSaveData();
    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    $.ajax({
      url: "/api/manufacture/outsourcing/beam/guest/price/",
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
});

function createTable(data) {
  kendo.ui.progress($("#grid"), true);
  var saveRecordInfoTemplate = kendo.template($("#saveRecordInfoTemplate").html());
  $("#saveRecord").append(saveRecordInfoTemplate(data.contents));
  var tableTheadTemplate = kendo.template($("#tableTheadTemplate").html());
  $("#table thead").append(tableTheadTemplate(data.header));
  var tableTbodyTemplate = kendo.template($("#tableTbodyTemplate").html());
  $("#table tbody").append(tableTbodyTemplate(data.contents));
  $("#detailGrid").show();
  $("#chatroom").show();
  setTimeout(function () {
    kendo.ui.progress($("#grid"), false);
  }, 2000);
}

function initExpectDate(expectDate) {
  return moment(expectDate).format("YYYY-MM-DD");
}

function setSaveData() {
  var postData = new FormData();
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

  outsourcingBeamInquiryDetails.outsourcingBeamInquiryCoreUuid = infoStream.uuid;
  outsourcingBeamInquiryDetails.token = infoStream.token;
  outsourcingBeamInquiryDetails.outsourcingBeamInquiryDetails = details;
  postData.append("outsourcingBeamInquiryGuestDetails", new Blob([JSON.stringify(outsourcingBeamInquiryDetails)], {
    type: "application/json"
  }));

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

function closeInfoStream() {
  chatNoti.show({}, "caseClosed");
  setChatNotiPosition();
  $("#savePrice").remove();
  $("[name='price']").attr("disabled", true);
  $("[name='extraFee']").attr("disabled", true);
  $(".message_sendbox").remove();
  setTimeout(function () {
    $(".drawCheck").hide().delay(600).queue(function () {
      $(this).dequeue();
    });
  }, 1000);
}
