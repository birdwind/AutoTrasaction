var filter;
let totalSize = 0;
let allSize = [];
let validatedFiles = [];
let attachmentsData = [];
let deleteFileData = [];
var detailRequired = [];
$(function () {
  $(".box_features").draggable({
    axis: "y"
  });

  $("#chatroom").chatroom({
    dataUrl: `/api/${infoStream.type.replace("-", "/")}/chat/history/${infoStream.uuid}`,
    eventOverride: {
      "CLOSE": false, //set false not to run the default function 
      "UPDATE": "updateTable",//or input the name of your function and run it 
    }
  });

  $("#form").formWizard({
    id: "yarnInquiryCoreUuid",
    url: "/api/yarn/inquiry/template/" + uuid,
    mainData: "response.yarnInquiryCore",
    noData: "findnodata",
    customizeForm: "customizeForm"
  });//formWizard


  $("[name='notifyInquirer']").kendoDropDownList({
    dataSource: [{ "value": 1, "text": "是" }, { "value": 0, "text": "否" }],
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//notifyInquirerDropDownList

  $("[name='yarnInquiryCoreClosedStatusUuid']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/yarn/inquiry/closed/status/list",
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

  $("#savePrice").click(function () {
    $(".errorMsg").text("");
    $(".invalidInput").removeClass("invalidInput");
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var postData = new FormData();
    var price = new Object();
    price["yarnInquiryCoreUuid"] = uuid;
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
      url: "/api/yarn/inquiry/response/price",
      data: postData,
      method: "POST",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          var feedack = data.response.pop();
          fw_notification.show({}, "saveOrInsert");
          setNoificationPosition();
          setTimeout(function () {
            $(".drawCheck").hide().delay(460).queue(function () {
              $("#savePrice").removeClass("waitaSec");
              $(this).dequeue();
            });
          }, 1000);
        }
      } // end of ajax success
    }); //end of ajax
  })//end of savePrice

  $("#save").click(function () {
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    $("#caseClosed").scrollTop(0);
    $(".errorMsg").text("");
    $(".invalidInput").removeClass("invalidInput");
    var temp = new Object();
    var detail = new Object();
    var inquiryItem = new Object();
    var closedStatus = new Object();
    $("#caseClosed").find("input:input,textarea").each(function () {
      if ($(this).attr("name") == undefined) {
        return;
      }
      temp[$(this).attr("name")] = $(this).val().trim()
      if (!temp[$(this).attr("name")].length && $(this).attr("name").search(/(note)/g) < 0) {
        $(this).errorMsg({
          message: "請輸入" + $(this).closest(".form-group").find("nav").text().replace("*", "")
        });
      }

    })//end of each
    if (!$("[name='inquirySatisfaction']:checked").length) {
      $("[name='inquirySatisfaction']:eq(0)").errorMsg({
        message: "請選擇詢價滿意度"
      });
    } else {
      temp["inquirySatisfaction"] = $("[name='inquirySatisfaction']:checked").val();
    }
    if ($(".invalidInput").length) {
      $("#caseClosed").scrollTop($(".invalidInput:eq(0)").closest(".box_inputdata").position().top);
      $(this).removeClass("waitaSec");
      return false;
    }
    detail["yarnInquiryCore"] = {};
    detail["updateSalesPrices"] = {};
    detail["yarnInquiryCore"]["yarnInquiryCoreUuid"] = detail["updateSalesPrices"]["yarnInquiryCoreUuid"] = (uuid.length) ? uuid : 0;
    for (i in temp) {
      if (!temp[i].length) {
        temp[i] = null;
      } else if ($("[name='" + i + "']").hasClass("number") && !isNaN(temp[i])) {
        temp[i] = parseInt(temp[i]);
      }
      if (i.search(/(ClosedStatusUuid|Satisfaction|note)/g) > -1) {
        detail["yarnInquiryCore"][i] = temp[i];
      } else if (i.search(/(notifyInquirer)/g) > -1) {
        detail["updateSalesPrices"][i] = temp[i];
      }
    }//end of loop
    detail["updateSalesPrices"]["updateSalesPriceForms"] = [];
    $("#priceFeedBack .box_inputdata").each(function () {
      detail["updateSalesPrices"]["updateSalesPriceForms"].push({
        "yarnInquiryDetailUuid": $(this).find("[name='yarnInquiryDetailUuid']").val(),
        "salesPrice": ($(this).find("[name='salesPrice']").val().trim().length) ? Number($(this).find("[name='salesPrice']").val()) : null
      })
    })//end of each
    var postData = new FormData();
    for (i in detail) {
      postData.append(i, new Blob([JSON.stringify(detail[i])], {
        type: "application/json"
      }));
    }
    $.ajax({
      url: "/api/yarn/inquiry/closed/status",
      data: postData,
      method: "POST",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          fw_notification.show({}, "saveOrInsert");
          setNoificationPosition();
          setTimeout(function () {
            $(".drawCheck").hide().delay(460).queue(function () {
              location = "/page/yarn/inquiry";
              $(this).dequeue();
            });
          }, 1000);
        }
      } // end of ajax success
    }); //end of ajax
  });//end of save

})//$(function ()

function findnodata() {
  $("html").remove();
  location.replace("/page/yarn/inquiry");
}//findnodata

function customizeForm() {
  var caseWindow = $("#caseClosed").kendoWindow({
    modal: true,
    width: "50%",
    height: '570px',
    resizable: false,
    visible: false,
    title: "Customer details",
    open: function () {
      $(window).scrollTop(0);
      $("body").addClass("overlay");
    },
    close: function () {
      $("body").removeClass("overlay");
    }
  }).data('kendoWindow');
  $("#caseClosed").before("<button class='close'><i class='fa fa-times'></i></button>");

  $(".close").click(function () {
    $("[name='inquiryStatus']").data("kendoDropDownList").value("未結案");
    caseWindow.close();
  });//caseClosed kendoWindow

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
      $(this).val(0)
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
  $("#form [name='inquirySatisfaction']").closest(".box_inputdata").remove();
  if (fw_formData.response.yarnInquiryCore.inquiryStatus.value == "未結案") {
    $("[name='inquiryStatus']").kendoDropDownList({
      dataSource: [{ "value": "未結案", "text": "未結案" }, { "value": "已結案", "text": "已結案" }],
      dataTextField: "text",
      dataValueField: "value",
      close: function (e) {
        $(".invalidInput").removeClass("invalidInput");
        $(".errorMsg").text("");
        if (this.value() == "已結案") {
          $("#inquiry [name='responsePrice']").each(function () {
            if (!$(this).val().trim().length) {
              $(this).addClass("invalidInput");
              $(this).next(".errorMsg").text("請輸入回覆單價");
            }
          })
          if ($(".invalidInput").length) {
            $("[name='inquiryStatus']").data("kendoDropDownList").value("未結案");
          } else {
            caseWindow.open();
            caseWindow.center();
            $("#caseClosed").find("input:text,textarea").val("");
            $("#caseClosed [name='notifyInquirer'] ").data("kendoDropDownList").value("");
            $("#caseClosed [name='yarnInquiryCoreClosedStatusUuid']").data("kendoDropDownList").value("");
            $("#caseClosed input:radio").prop("checked", false);
            $(".errorMsg").text("");
            $(".invalidInput").removeClass("invalidInput");
          }//if
        }//if
      }
    });//inquiryStatusDropDownList
    $("span[name='responsePrice']").remove();
  } else {
    $("[name='inquiryStatus']").after(`<span class="form-control labelText" disabled >` + $("[name='inquiryStatus']").val() + `</span>`);
    $("[name='inquiryStatus'], #savePrice, .message_sendbox, input[name='responsePrice'], #inquiry .color_pink").remove();
  }

  //-------Inquiry------
  var yarnInquiryDetails = fw_formData.response.yarnInquiryDetails;
  var warpWeftKV = yarnInquiryDetails[0].warpWeft.keyValue;
  for (i in yarnInquiryDetails[0]) {
    var isRequired = Boolean(yarnInquiryDetails[0][i].required && yarnInquiryDetails[0][i].type != "label");
    var required = (isRequired) ? "<span class='color_pink'>*</span>" : "";
    if (isRequired) {
      detailRequired.push(`[name='${i}']`);
    }
    $("#inquiry thead tr th ." + i + "Title").text(yarnInquiryDetails[0][i].title).after(required);
  }
  $(".responseData > .updateDate").text(yarnInquiryDetails[0].updateDate.value);
  $(".responseData > .modify").text(yarnInquiryDetails[0].modify.value);
  $(".responseData > .modifyIp").text(yarnInquiryDetails[0].modifyIp.value);
  var InquiryItemsTemplate = "#inquiryCloseTemplate";
  for (i of yarnInquiryDetails) {
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
    var feedack = `
      <div class="col-md-12 box_inputdata">
        <fieldset>
          <div class="form-group">
            <nav>[${i.yarnCore.value}]<span class="color_pink">*</span><br/>牌價回填</nav>
            <input type="hidden" name="yarnInquiryDetailUuid" class="form-control" value="${i.yarnInquiryDetailUuid}">
            <input type="text" name="salesPrice" class="form-control number">
            <span class="errorMsg color_pink"></span>
          </div>
        </fieldset>
      </div>
    `;
    $("#priceFeedBack").append(feedack);
  }//end of loop
  setInquiryDropdown();
}//customizeForm
function setInquiryDropdown() {
  $("input[name='isEqualLong']").kendoDropDownList({
    dataSource: fw_formData.response.yarnInquiryDetails[0].isEqualLong.keyValue,
    dataTextField: "text",
    dataValueField: "value",
  });//isEqualLongDropDownList

  $("[name='isInStock']").kendoDropDownList({
    dataSource: fw_formData.response.yarnInquiryDetails[0].isInStock.keyValue,
    dataTextField: "text",
    dataValueField: "value",
    change: function (e) {
      minimumOrderVisibility(parseInt(this.value()), e);
    },
    cascade: function (e) {
      minimumOrderVisibility(parseInt(this.value()), e);
    },
  });//isInStockDropDownList
  $("[name='minimumOrderUnit']").kendoDropDownList({
    dataSource: fw_formData.response.yarnInquiryDetails[0].minimumOrderUnit.keyValue,
    dataTextField: "text",
    dataValueField: "value",
  });//unitDropDownList
  if (fw_formData.response.yarnInquiryDetails[0].minimumOrderUnit.value != null) {
    $("[name='minimumOrderUnit']").data("kendoDropDownList").value(fw_formData.response.yarnInquiryDetails[0].minimumOrderUnit.value);
  }

  $("[name='expectDeliverDate']").kendoDateTimePicker({
    culture: "zh-TW",
    format: "yyyy/MM/dd",
    interval: 15
  });
}
function minimumOrderVisibility(num, e) {
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
