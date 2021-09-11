var filter, notification;
var detailRequired=[];
function setNoificationPosition() {
  var left = ($(window).width() - $(".k-notification").parent().width()) / 2;
  $(".k-notification").parent().css({ "top": "250px", "left": left + "px" })
}
$(function () {
  $( ".box_features" ).draggable({
    axis: "y"
  });

  $("body").append("<span id='notification'></span>");
  $("ul.nav.navbar-nav > li:not(:first-child),#breadcrumb > *").remove();
  $("#leftPanel").text("GUEST");
  notification = $("#notification").kendoNotification({
    templates: [{
        type: "saveOrInsert",
        template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>"+fw_checkMrak+"</div>"
      }
    ],
    autoHideAfter: 1500
  }).data("kendoNotification");
  $.ajax({
    url: `/api/yarn/inquiry/guest/template/${infoStream.token}`,
    method: 'GET',
    success: function (data) {
      createTable(data.response.yarnInquiryDetails)
    }
  });//end of ajax

  $("#chatroom").chatroom({
    dataUrl:`/api/${infoStream.type.replace("-","/")}/guest/chat/history/${infoStream.token}`,
    eventOverride:{
      "UPDATE":"updateTable"
    }
  });
  $("#savePrice").click(function () {
    $(".errorMsg").text("");
    $(".invalidInput").removeClass("invalidInput");
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var postData = new FormData();
    var price = new Object();
    price["yarnInquiryCoreUuid"] = infoStream.uuid;
    price["token"] = infoStream.token;
    price["updateResponsePriceForms"] = [];
    $("#inquiry tbody tr").each(function () {
      $(this).find(detailRequired.join(",")).each(function () {
        if (!$(this).val().trim().length) {
          $(this).addClass("invalidInput");
          $(this).closest(".k-dropdown").addClass("invalidInput").find("input").removeClass("invalidInput");
          $(this).closest("td").find(".errorMsg").text("請輸入" + title[$(this).attr("name")].title);
        }
      })//endo fo each
      price["updateResponsePriceForms"].push({
        "yarnInquiryDetailUuid": $(this).find("[name='yarnInquiryDetailUuid']").val(),
        "isEqualLong": Number($(this).find("[name='isEqualLong']").val()),
        "isInStock": Number($(this).find("[name='isInStock']").val()),
        "minimumOrderQuantity": (Number($(this).find("[name='isInStock']").val()) == 0) ? Number($(this).find("[name='minimumOrderQuantity']").val()) : null,
        "minimumOrderUnit": (Number($(this).find("[name='isInStock']").val()) == 0) ? Number($(this).find("[name='minimumOrderUnit']").val()) : null,
        "expectDeliverDate": ($(this).find("[name='expectDeliverDate']").val().trim().length) ? Date.parse($(this).find("[name='expectDeliverDate']").val().trim()) : null,
        "extraFee": parseFloat($(this).find("[name='extraFee']").val()),
        "responsePrice": ($(this).find("[name='responsePrice']").val().trim().length) ? Number($(this).find("[name='responsePrice']").val()) : null
      })
    });//foreach
    if ($(".invalidInput").length) {
      $(window).scrollTop($(".invalidInput:eq(0)").offset().top - 40);
      $("#savePrice").removeClass("waitaSec");
      return;
    }
    postData.append("yarnInquiryDetails", new Blob([JSON.stringify(price)], {
      type: "application/json"
    }));
    $.ajax({
      url: "/api/yarn/inquiry/guest/response/price",
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
          notification.show({}, "saveOrInsert");
          setNoificationPosition();
          setTimeout(function () {
            $(".drawCheck").hide().delay(500).queue(function(){
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
  //-------Inquiry------ 
  var warpWeftKV = data[0].warpWeft.keyValue;
  for(i in data[0]){
    var isRequired = Boolean(data[0][i].required && data[0][i].type != "label");
    var required = (isRequired) ? "<span class='color_pink'>*</span>" : "";
    if(isRequired){
      detailRequired.push(`[name='${i}']`);
    }
    $("#inquiry thead tr th ." + i + "Title").text(data[0][i].title).after(required);
  }
  $(".responseData > .updateDate").text(data[0].updateDate.value);
  $(".responseData > .modify").text(data[0].modify.value);
  $(".responseData > .modifyIp").text(data[0].modifyIp.value);
  for (i of data) {
    $("#inquiry tbody").append($("#inquiryTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    $("#inquiry [name='yarnInquiryDetailUuid']:last").val(i.yarnInquiryDetailUuid);
    $("#inquiry [name='yarnCore']:last").text(i.yarnCore.value);
    $("#inquiry [name='isInStock']:last").val(i.isInStock.value);
    $("#inquiry [name='isEqualLong']:last").val(i.isEqualLong.value);
    $("#inquiry [name='minimumOrderQuantity']:last").val(i.minimumOrderQuantity.value);
    $("#inquiry [name='minimumOrderUnit']:last").val(i.minimumOrderUnit.value);
    $("#inquiry [name='amount']:last").text(i.inquiryAmount.value);
    $("#inquiry [name='unit']:last").val((i.inquiryUnit.value == 1) ? "件" : "公斤");
    $("#inquiry [name='extraFee']:last").val(i.extraFee.value);
    $("#inquiry [name='warpWeft']:last").text(warpWeftKV.find(item => item.value == i.warpWeft.value).text);
    $("#inquiry [name='expectDeliverDate']:last").val(i.expectDeliverDate.value);
    $("#inquiry [name='responsePrice']:last").val(i.responsePrice.value);
  }//end of loop
  setInquiryDropdown(data[0]);
}//createTable
function setInquiryDropdown(data) {
  $("input[name='isEqualLong']").kendoDropDownList({
    dataSource: data.isEqualLong.keyValue,
    dataTextField: "text",
    dataValueField: "value",
  });//isEqualLongDropDownList

  $("[name='isInStock']").kendoDropDownList({
    dataSource: data.isInStock.keyValue,
    dataTextField: "text",
    dataValueField: "value",
    change: function (e) {
      minimumOrderVisibility(parseInt(this.value()),e);
    },
    cascade: function (e) {
      minimumOrderVisibility(parseInt(this.value()),e);
    },
  });//isInStockDropDownList
  $("[name='minimumOrderUnit']").kendoDropDownList({
    dataSource: data.minimumOrderUnit.keyValue,
    dataTextField: "text",
    dataValueField: "value",
  });//unitDropDownList
  if (data.minimumOrderUnit.value != null) {
    $("[name='minimumOrderUnit']").data("kendoDropDownList").value(data.minimumOrderUnit.value);
  }
  $("[name='expectDeliverDate']").kendoDateTimePicker({
    culture: "zh-TW",
    format: "yyyy/MM/dd",
    interval: 15
  });
}
function minimumOrderVisibility(num,e) {
  switch (num) {
    case 0:
      $(e.sender.element).closest("tr").find("[name='minimumOrderQuantity'],[name='minimumOrderUnit']")
        .closest("td").removeClass("invisibled");
      break;
    case 1:
      $(e.sender.element).closest("tr").find("[name='minimumOrderQuantity'],[name='minimumOrderUnit']")
        .closest("td").addClass("invisibled").find("input").val("");
      break;
  }
}//minimumOrderVisibility
function updateTable() {
  var data = dialogueData.content;
  $(".responseData > .updateDate").text(data[0].updateDate);
  $(".responseData > .modify").text(data[0].modify);
  $(".responseData > .modifyIp").text(data[0].modifyIp);
  for (i in data) {
    $("#inquiry [name='responsePrice']").eq(i).val(data[i].responsePrice);
  }
}//updateTable
