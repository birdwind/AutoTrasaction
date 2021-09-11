var filter, originTotal = 0, detailRequired=[];
$(function () {
  $(".box_features").draggable({
    axis: "y"
  });
  // end of infoStream test
  $("#chatroom").chatroom({
    dataUrl: `/api/${infoStream.type.replace("-","/")}/chat/history/${infoStream.uuid}`,
    eventOverride: {
      "CLOSE": false, //set false not to run the default function 
      "UPDATE": "updateTable",//or input the name of your function and run it 
    }
  });
  $("#form").formWizard({
    id: "yarnPurchaseCoreUuid",
    url: "/api/yarn/purchase/template/" + uuid,
    mainData: "response.yarnPurchaseCore",
    noData: "findnodata",
    listUrl: "/api/yarn/purchase/*/list",
    customizeForm: "customizeForm",
    fileUpload:{
      afterUpload:"afterUpload"
    }
  });//formWizard

  $("[name='notifyInquirer']").kendoDropDownList({
    dataSource: [{ "value": 1, "text": "是" }, { "value": 0, "text": "否" }],
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//notifyInquirerDropDownList

  $("[name='yarnInquirerClosedStatusUuid']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "POST",
          url: "/api/yarn/inquiry/closedStatus/list",
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {
          return data.response
        }
      }
    },
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//ClosedStatusDropDownList

  $("body").on("focus keydown", "[name='purchaseAmount'],[name='purchasePrice']", function () {
    var amount = $(this).closest("tr").find("[name='purchaseAmount']").val().trim();
    var price = $(this).closest("tr").find("[name='purchasePrice']").val().trim();
    originTotal = amount * price;
  })

  $("body").on("input", "[name='purchaseAmount'],[name='purchasePrice']", function () {
    var amount = $(this).closest("tr").find("[name='purchaseAmount']").val().trim();
    var price = $(this).closest("tr").find("[name='purchasePrice']").val().trim();
    $(this).closest("tr").find("[name='amountPrice']").text((amount * price).toFixed(2));
    var subTotal = Number($("#total [name='subTotal']").text()) - originTotal + amount * price;
    $("#total [name='subTotal']").text((subTotal).toFixed(2));
    $("#total [name='tax']").text((subTotal * .05).toFixed(2));
    $("#total [name='total']").text((subTotal * 1.05).toFixed(0));
  })

  $("#save").click(function () {
    $(".errorMsg").text("");
    $(".invalidInput").removeClass("invalidInput");
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var bargain = fw_formData.response.yarnPurchaseCore.bargainStatus;
    if (!(bargain.value || $("#form [name='bargainStatus']").val().trim())) {
      $("#form [name='bargainStatus']").closest(".k-dropdown").addClass("invalidInput");
      $("#form [name='bargainStatus']").closest(".form-group").find(".errorMsg").text("請選擇" + bargain.title);
      $(window).scrollTop($(".invalidInput:eq(0)").offset().top - 40);
    }
    var priceData = new FormData();
    var price = new Object();
    price["yarnPurchaseCoreUuid"] = uuid;
    price["yarnPurchaseDetails"] = [];
    $("#purchase tbody tr").each(function () {
      $(this).find(detailRequired.join(",")).each(function () {
        if (!$(this).val().trim().length) {
          $(this).addClass("invalidInput");
          $(this).closest(".k-dropdown").addClass("invalidInput").find("input").removeClass("invalidInput");
          $(this).closest("td").find(".errorMsg").text("請輸入" + title[$(this).attr("name")].title);
        }
      })//endo fo each
      price["yarnPurchaseDetails"].push({
        "yarnPurchaseDetailUuid": $(this).find("[name='yarnPurchaseDetailUuid']").val(),
        "purchaseUnit": parseInt($(this).find("[name='purchaseUnit']").val()),
        "purchaseAmount": ($(this).find("[name='purchaseAmount']").val().trim().length) ? Number($(this).find("[name='purchaseAmount']").val()) : null,
        "expectArrivalTime": ($(this).find("[name='expectArrivalTime']").val().trim().length) ? new Date($(this).find("[name='expectArrivalTime']").val() + " 00:00:00") : null,
        "purchasePrice": ($(this).find("[name='purchasePrice']").val().trim().length) ? Number($(this).find("[name='purchasePrice']").val()) : null
      })
    });//foreach
    if ($(".invalidInput").length) {
      $(this).removeClass("waitaSec");
      return;
    }
    priceData.append("yarnPurchaseDetails", new Blob([JSON.stringify(price)], {
      type: "application/json"
    }));
    $.ajax({
      url: "/api/yarn/purchase/purchase/price",
      data: priceData,
      method: "POST",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (!bargain.value) {
          updateBargain();
        }
        if (!data.status) {
          $("#save").removeClass("waitaSec");
          for (i of data.response) {
            $("#form [name='" + i.field + "']").errorMsg({
              message: i.defaultMessage
            });
          }
        }
      } // end of ajax success
    }); //end of ajax
  })//end of savePrice

})//$(function ()
function updateBargain() {
  var postData = new FormData();
  var bargain = new Object();
  bargain["yarnPurchaseCoreUuid"] = uuid;
  form = ["bargainStatus", "note"];
  for (i of form) {
    var value = $(`[name='${i}']`).val().trim();
    bargain[i] = (value) ? value : null;
  }
  postData.append("yarnPurchaseCore", new Blob([JSON.stringify(bargain)], {
    type: "application/json"
  }));
  $.ajax({
    url: "/api/yarn/purchase",
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

      }
    } // end of ajax success
  }); //end of ajax
}
function findnodata() {
  $("html").remove();
  location.replace("/page/yarn/purchase");
}//findnodata

function customizeForm() {
  //------------ star section ⬇︎
  $("body").on("change", "label.star:not(disabled)", function () {
    var i = $(this).index();
    if ($(this).children("input:checkbox").prop("checked")) {
      $(this).closest("div").children("label:lt(" + i + ")").find("input:checkbox").prop("checked", true);
    } else {
      $(this).closest("div").children("label:gt(" + i + ")").find("input:checkbox").prop("checked", false);
    }
    var value = ($(this).closest("div").find("input:checked").length) ? $(this).closest("div").find("input:checked").length : "";
    $(this).closest("div").prev().val(value);
  })
  var starTemplate = `<div style="display:inline-block">`;
  for (i = 0; i < 5; i++) {
    starTemplate += `
        <label class="star">
          <input type="checkbox">
          <span class="starIcon">
            <i class="fa fa-star"></i>
            <i class="fa fa-star-o"></i>
          </span>
        </label>
    `;
  }
  starTemplate += `</div>`;
  $("[name='emergencyLevel']").each(function () {
    if (!$(this).val().trim().length) {
      $(this).val(0);
    }
    $(this).hide().prev(".labelText").remove();
    $(this).after(starTemplate);
    $(this).closest("fieldset").prop("disabled", false);

    var eq = $(this).val() - 1;
    if (eq >= 0) {
      $(this).next().find("label.star:eq(" + eq + ") > input:checkbox").prop("checked", true);
      $(this).next().find("label.star:eq(" + eq + ") > span").trigger("change");
    }
    if ($(this).is("[type='hidden']")) {
      $(this).next().find("input:checkbox,label.star").prop("disabled", true);
    }
  })
  //------------ star section ⬆︎
  var eamilSet = fw_formData.response.yarnPurchaseCore.companyEmails.value;
  $("[name='companyEmails']").prev().html((eamilSet.length) ? eamilSet.join(", ") : "&nbsp;");

  //-------Purchase------
  var yarnPurchaseDetails = fw_formData.response.yarnPurchaseDetails;
  var warpWeftKV = yarnPurchaseDetails.header.warpWeft.keyValue;
  var bargainValue = fw_formData.response.yarnPurchaseCore.bargainStatus.value;
  var bargainKV = fw_formData.response.yarnPurchaseCore.bargainStatus.keyValue;
  var sum = 0;

  for (i in yarnPurchaseDetails.header) {
    var isRequired = Boolean(yarnPurchaseDetails.header[i].required && yarnPurchaseDetails.header[i].type != "label");
    var required = (isRequired) ? "<span class='color_pink'>*</span>" : "";
    if(isRequired){
      detailRequired.push(`[name='${i}']`);
    }
    $("#purchase thead tr th ." + i + "Title").text(yarnPurchaseDetails.header[i].title).after(required);
  }
  $(".responseData > .updateDate").text(yarnPurchaseDetails.contents[0].updateDate);
  $(".responseData > .modify").text(yarnPurchaseDetails.contents[0].modify);
  $(".responseData > .modifyIp").text(yarnPurchaseDetails.contents[0].modifyIp);
  for (row of yarnPurchaseDetails.contents) {
    var purchaseTemplate = (bargainValue) ? "#purchaseLabelTemplate" : "#purchaseTemplate";
    $("#purchase tbody").append($(purchaseTemplate).html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    for (j in row) {
      $("#purchase tbody tr td [name='" + j + "']:last").text(row[j]).val(row[j]);
    }//end of loop
    $("#purchase tbody tr td [name='warpWeft']:last").text(warpWeftKV.find(item => item.value == row.warpWeft).text);
    var amount = $("#purchase tbody tr [name='purchaseAmount']:last").val().trim();
    var price = $("#purchase tbody tr [name='purchasePrice']:last").val().trim();
    $("#purchase tbody tr [name='amountPrice']:last").text((amount * price).toFixed(2));
    sum += (amount * price);
    if (bargainValue) {
      var KV = fw_formData.response.yarnPurchaseDetails.header.unit.keyValue;
      var value = $("#purchase [name='purchaseUnit']:last").val();
      $("#purchase [name='purchaseUnit']:last").text(KV.find(item => item.value == value).text);
    }
  }//end of loop
  $("#total [name='subTotal']").text((sum).toFixed(2));
  $("#total [name='tax']").text((sum * .05).toFixed(2));
  $("#total [name='total']").text((sum * 1.05).toFixed(0));
  if (bargainValue) {
    $("#save, .message_sendbox").remove();
    $("[name='bargainStatus']").prev().text(bargainKV.find(item => item.value == bargainValue).text)
  } else {
    $("[name='bargainStatus']").kendoDropDownList({
      dataSource: bargainKV,
      dataTextField: "text",
      dataValueField: "value",
      optionLabel: " "
    });//bargainStatusDropDownList
    $("#purchase [name='expectArrivalTime']").kendoDatePicker({
      culture: "zh-TW",
      format: "yyyy/MM/dd"
    });
    $("#purchase [name='expectArrivalTime']").on('click', function () {
      $(this).data("kendoDatePicker").open();
    });
    $("#purchase [name='purchaseUnit']").kendoDropDownList({
      dataSource: fw_formData.response.yarnPurchaseDetails.header.purchaseUnit.keyValue,
      dataTextField: "text",
      dataValueField: "value"
    });//purchaseUnitDropDownList
  }
}//customizeForm

function updateTable() {
  var data = dialogueData.message;
  $(".responseData > .updateDate").text(data[0].updateDate);
  $(".responseData > .modify").text(data[0].modify);
  $(".responseData > .modifyIp").text(data[0].modifyIp);
  sum = 0;
  for (i in data) {
    $("#purchase [name='expectArrivalTime']").eq(i).data("kendoDatePicker").value(new Date(data[i].updateDate));
    $("#purchase [name='purchasePrice']").eq(i).val(data[i].purchasePrice);
    $("#purchase [name='purchaseAmount']").eq(i).val(data[i].amount);
    var subTotal = data[i].amount * data[i].purchasePrice;
    $("#purchase [name='amountPrice']").eq(i).text(subTotal.toFixed(2));
    sum +=subTotal;
  }//loop
  $("#total [name='subTotal']").text(sum.toFixed(2));
  $("#total [name='tax']").text((sum * .05).toFixed(2));
  $("#total [name='total']").text((sum * 1.05).toFixed(0));
}//updateTable
function afterUpload(){
  fw_notification.show({}, "saveOrInsert");
  setNoificationPosition();
  setTimeout(function () {
    $(".drawCheck").hide().delay(460).queue(function () {
      location = "/page/yarn/purchase";
      $(this).dequeue();
    });
  }, 1000);
}
