var noti;
//dataSource
var statusData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/orderManagement/clothOrder/confirm/status/list",
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
  $("body").append("<span id='noti'></span>");
  noti = $("#noti").kendoNotification({
    templates: [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
    }],
    autoHideAfter: 1500
  }).data("kendoNotification");
  var backUrl = "/page/orderManagement/clothOrder";
  if (status == "confirm") {
    SetInitPage(false, backUrl);
  } else {
    SetInitPage(true, backUrl);
  }
  $("#form").formWizard({
    id: "clothOrdrerCoreUuid",
    url: "/api/orderManagement/clothOrder/template/" + uuid,
    mainData: "response.clothOrderCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm"
  }); //formWizard

  $("#save").click(function () {
    var postData = new FormData();
    if (verification() == 0) {
      postData = setSaveData();
      if (!postData) {
        $(this).removeClass("waitaSec");
        return;
      }
      $.ajax({
        url: "/api/orderManagement/clothOrder/confirm/",
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
});

function customizeForm() {
  kendo.ui.progress($("#grid"), true);
  var clothOrderCoreDetails = fw_formData.response.clothOrderCoreDetails;
  var tableTheadTemplate = kendo.template($("#tableTheadTemplate").html());
  $("#clothOrderDetails thead").append(tableTheadTemplate(clothOrderCoreDetails.header));
  var tableTbodyTemplate = kendo.template($("#tableTbodyTemplate").html());
  $("#clothOrderDetails tbody").append(tableTbodyTemplate(clothOrderCoreDetails.contents));
  setGridContent(clothOrderCoreDetails.contents);
  if (status == "confirm") {
    setDropDownListUI("[name='clothOrderCoreStatus']", statusData, fw_formData.response.clothOrderCore.clothOrderCoreStatus.value, null);
  }
  // setquotationCoreNoLink();
  setTimeout(function () {
    kendo.ui.progress($("#grid"), false);
  }, 2000);
} //customizeForm

function setGridContent(contents) {
  for (item in contents) {
    var uuid = contents[item].clothOrderDetailUuid;
    setDialog("#editorDialog_" + uuid, "備註", "#showDialog_" + uuid, "#clothOrdrerDetailNote_" + uuid, "clothOrdrerDetailNote", contents[item].clothOrdrerDetailNote);
    if (contents[item].manufactureStatus != "已出貨") {
      $('#orderSchedule_' + uuid).remove();
      $('#orderAnalytics_' + uuid).remove();
    }
  } //end of loop
} //end of setGridContent

function setDialog(select, dialogTitle, openSelect, contentSelect, label, text) {
  switch (label) {
    case "clothOrdrerDetailNote":
      var dialog = $(select).kendoDialog({
        width: "800px",
        title: dialogTitle,
        visible: false
      }).data("kendoDialog");
      $(openSelect).click(function () {
        dialog.open();
      });
      $(contentSelect).val(text);
      $(contentSelect).attr("readonly", true);
      break;
  }
} //end of setDialog

function orderSchedule(oid) {
  var guid = $("#" + oid).attr("guid");
  $("html").remove();
  location.replace("/page/orderManagement/clothOrder/orderSchedule/" + uuid + "/" + guid + "/" + status);
}

function orderAnalytics(oid) {
  var guid = $("#" + oid).attr("guid");
  $("html").remove();
  location.replace("/page/orderManagement/clothOrder/orderAnalytics/" + uuid + "/" + guid + "/" + status);
}

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

function verification() {
  var hasError = 0;
  var core = fw_formData.response.clothOrderCore;
  var detail = fw_formData.response.clothOrderCoreDetails.header;

  for (var item in core) {
    if (core[item] == null) {
      continue;
    }
    if (core[item].title == undefined) {
      continue;
    }
    if (core[item].required && $("[name='" + item + "']").val() == "") {
      $("[name='" + item + "']").errorMsg({
        message: "請輸入" + core[item].title + "!"
      });
      hasError = 1;
    }
  }

  return hasError;
}

function setSaveData() {
  var postData = new FormData();
  var clothOrderCore = new Object();
  var clothOrderDetails = new Object();
  var createClothOrderDetails = new Array();
  var updateClothOrderDetails = new Array();

  clothOrderCore.clothOrderCore = uuid;
  clothOrderCore.clothOrderStatus = ($("[name='clothOrderCoreStatus']").val() != "") ? $("[name='clothOrderCoreStatus']").val() : null;

  postData.append("clothOrderCoreConfirm", new Blob([JSON.stringify(clothOrderCore)], {
    type: "application/json"
  }));
  return postData;
}
