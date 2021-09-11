var filter, notification, originTotal = 0;
function setNoificationPosition() {
  var left = ($(window).width() - $(".k-notification").parent().width()) / 2;
  $(".k-notification").parent().css({ "top": "250px", "left": left + "px" })
}
$(function () {
  $(".box_features").draggable({
    axis: "y"
  });

  $("body").append("<span id='notification'></span>");
  $("ul.nav.navbar-nav > li:not(:first-child),#breadcrumb > *").remove();
  $("#leftPanel").text("GUEST");
  notification = $("#notification").kendoNotification({
    templates: [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
    }
    ],
    autoHideAfter: 1500
  }).data("kendoNotification");
  $.ajax({
    url: `/api/yarn/purchase/guest/template/${infoStream.token}`,
    method: 'GET',
    success: function (data) {
      createTable(data.response.yarnPurchaseDetails)
    }
  });//end of ajax

  $("#chatroom").chatroom({
    dataUrl: `/api/${infoStream.type.replace("-","/")}/guest/chat/history/${infoStream.token}`,
    eventOverride: {
      "UPDATE": "updateTable"
    }
  });

  $("body").on("focus keydown", "[name='amount'],[name='purchasePrice']", function () {
    var amount = $(this).closest("tr").find("[name='amount']").val().trim();
    var price = $(this).closest("tr").find("[name='purchasePrice']").val().trim();
    originTotal = amount * price;
  })

  $("body").on("input", "[name='amount'],[name='purchasePrice']", function () {
    var amount = $(this).closest("tr").find("[name='amount']").val().trim();
    var price = $(this).closest("tr").find("[name='purchasePrice']").val().trim();
    $(this).closest("tr").find("[name='amountPrice']").text((amount * price).toFixed(2));
    var subTotal = Number($("#total [name='subTotal']").text()) - originTotal + amount * price;
    $("#total [name='subTotal']").text((subTotal).toFixed(2));
    $("#total [name='tax']").text((subTotal * .05).toFixed(2));
    $("#total [name='total']").text((subTotal * 1.05).toFixed(0));
  })

  $("#savePrice").click(function () {
    $(".errorMsg").text("");
    $(".invalidInput").removeClass("invalidInput");
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var priceData = new FormData();
    var price = new Object();
    price["yarnPurchaseCoreUuid"] = infoStream.uuid;
    price["token"] = infoStream.token;
    price["yarnPurchaseItems"] = [];
    $("#purchase tbody tr").each(function () {
      price["yarnPurchaseItems"].push({
        "yarnPurchaseItemUuid": $(this).find("[name='yarnPurchaseItemUuid']").val(),
        "expectArrivalTime": ($(this).find("[name='expectArrivalTime']").val().trim().length) ? new Date($(this).find("[name='expectArrivalTime']").val() + " 00:00:00") : null,
        "purchasePrice": ($(this).find("[name='purchasePrice']").val().trim().length) ? Number($(this).find("[name='purchasePrice']").val()) : null
      })
    });//foreach
    priceData.append("yarnPurchaseItemGuestUpdates", new Blob([JSON.stringify(price)], {
      type: "application/json"
    }));
    $.ajax({
      url: "/api/yarn/purchase/guest/price",
      data: priceData,
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
          notification.show({}, "saveOrInsert");
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
  })//end of savePrice 
})//$(function ()

function createTable(data) {
  //-------Purchase------ 
  for (i in data.header) {
    $("#purchase thead tr th ." + i + "Title").text(data.header[i].title);
  }
  $(".responseData > .updateDate").text(data.contents[0].updateDate);
  $(".responseData > .modify").text(data.contents[0].modify.title);
  $(".responseData > .modifyIp").text(data.contents[0].modifyIp.title);
  var sum = 0;
  for (row of data.contents) {
    $("#purchase tbody").append($("#purchaseTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    for (j in row) {
      $("#purchase tbody tr td [name='" + j + "']:last").text(row[j]).val(row[j]);
    }//end of loop

    $("#purchase tbody tr td [name='warpWeft']:last").text(data.header.warpWeft.keyValue.find(item => item.value == row.warpWeft).text);
    $("#purchase tbody tr td [name='purchaseUnit']:last").text(data.header.purchaseUnit.keyValue.find(item => item.value == row.purchaseUnit).text);
    var amount = $("#purchase tbody tr [name='purchaseAmount']:last").val().trim();
    $("#purchase tbody tr [name='purchaseAmount']:last").after(amount);
    var price = $("#purchase tbody tr [name='purchasePrice']:last").val().trim();
    $("#purchase tbody tr [name='amountPrice']:last").text((amount * price).toFixed(2));
    sum += (amount * price);
  }//end of loop
  $("#total [name='subTotal']").text((sum).toFixed(2));
  $("#total [name='tax']").text((sum * .05).toFixed(2));
  $("#total [name='total']").text((sum * 1.05).toFixed(0));

  $("#purchase [name='expectArrivalTime']").kendoDatePicker({
    culture: "zh-TW",
    format: "yyyy/MM/dd"
  });
  $("#purchase [name='expectArrivalTime']").on('click', function () {
    $(this).data("kendoDatePicker").open();
  });
}//createTable

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
    sum += subTotal;
  }//loop
  $("#total [name='subTotal']").text(sum.toFixed(2));
  $("#total [name='tax']").text((sum * .05).toFixed(2));
  $("#total [name='total']").text((sum * 1.05).toFixed(0));
}//updateTable
