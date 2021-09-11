var filter, mainCore = {}, detailRequired = [];
var yarnCoreData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/inquiry/yarn/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
var yarnCompany = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/purchase/destinationCompany/list",
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
  $("#form").formWizard({
    id: "yarnPurchaseCoreUuid",
    url: "/api/yarn/purchase/template/",
    mainData: "response.yarnPurchaseCore",
    noData: "findnodata",
    noAddable: ["yarnInquirers", "supplier"],
    customizeForm: "customizeForm",
    fileUpload:{
      afterUpload:"afterUpload"
    }
  });//formWizard

  $(".box_features").draggable({
    axis: "y"
  });

  $(".box_features > .right").click(function () {
    $(this).parent().css("left", "auto").animate({ right: "-160px" }).delay(100).queue(function () {
      $(this).find(".left").fadeIn(100);
      $(this).dequeue();
    });
  })//right
  $(".box_features > .left").click(function () {
    $(this).hide().parent().css("left", "auto").animate({ right: "-10px" }).delay(100).queue(function () {
      $(this).find(".left").hide();
      $(this).dequeue();
    });
  })//left

  $("#addPurchase").click(function () {
    $("#purchase tbody").append($("#purchaseTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    setPurchaseDropdown();
    $("#purchase tbody tr:eq(0) .del").show();
  })// addPurchase  click

  var origin;
  $("body").on("focus keydown", "[name='purchaseAmount'],[name='purchasePrice']", function () {
    var amount = $(this).closest("tr").find("[name='purchaseAmount']").val().trim();
    var price = $(this).closest("tr").find("[name='purchasePrice']").val().trim();
    origin = amount * price;
  })

  $("body").on("input", "[name='purchaseAmount'],[name='purchasePrice']", function () {
    var amount = $(this).closest("tr").find("[name='purchaseAmount']").val().trim();
    var price = $(this).closest("tr").find("[name='purchasePrice']").val().trim();
    $(this).closest("tr").find("[name='amountPrice']").text((amount * price).toFixed(2));
    var subTotal = Number($("#total [name='subTotal']").text()) - origin + amount * price;
    $("#total [name='subTotal']").text((subTotal).toFixed(2));
    $("#total [name='tax']").text((subTotal * .05).toFixed(2));
    $("#total [name='total']").text((subTotal * 1.05).toFixed(2));
  })

  $("body").on("click", "#purchase .del", function () {
    var amount = $(this).closest("tr").find("[name='purchaseAmount']").val().trim();
    var price = $(this).closest("tr").find("[name='purchasePrice']").val().trim();
    var subTotal = Number($("#total [name='subTotal']").text()) - amount * price;
    $("#total [name='subTotal']").text((subTotal).toFixed(2));
    $("#total [name='tax']").text((subTotal * .05).toFixed(2));
    $("#total [name='total']").text((subTotal * 1.05).toFixed(2));
    $(this).closest("tr").remove();
    if ($("#purchase tbody tr").length <= 1) {
      $("#purchase tbody tr:eq(0) .del").hide();
    }
  })// purchase del click

  $("#save").click(function () {
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var postData = $("#form").formCheck({
      name: "yarnPurchaseCore",
      dataProccessing: "yarnPurchase",
      otherCheck: [
        "yarnPurchaseDetails"
      ]
    });
    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    $.ajax({
      url: "/api/yarn/purchase",
      data: postData,
      method: "PUT",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
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
  })//end of save
})//$(function ()

function findnodata() {
  $("html").remove();
  location.replace("/page/yarn/purchase");
}//findnodata

function customizeForm() {
  if (typeof (Storage) !== "undefined") {
    if (sessionStorage.getItem("purchaseCopy") != null) {
      var purchaseCopy = JSON.parse(sessionStorage.getItem("purchaseCopy"));
      mainCore = purchaseCopy.yarnPurchaseCore;
      for (i in mainCore) {
        if (mainCore[i + "Id"]) {
          $("#form [name='" + i + "']").val(mainCore[i + "Id"]);
        } else {
          $("#form [name='" + i + "']").val(mainCore[i].value);
        }
      }
      sessionStorage.removeItem("purchaseCopy");
    }//if
  }//if
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

  $("[name='companyEmails']").closest(".box_inputdata").hide();
  $("[name='companyEmails']").closest(".box_inputdata").after("<span id='emailContainer'></span>");
  $("[name='companyEmails']").prev().html($("[name='companyEmails']").prev().text() + "<span class='color_pink'>*</span>");
  var content = `
  <div class="col-md-12 box_inputdata">
      <label id="sendEmail" class="checkbox">
          <input type="checkbox">
          <span class="checkmark">&emsp;</span>
          </label><label>&emsp;${i18n.ui.btn.sendEmail}</label>
          <button class="addBtn" style="display:none;margin-bottom:10px;" title="新增Email"><i class="fa fa-plus"></i></button> 
  </div>`;
  $("[name='supplier']").closest(".box_inputdata").after(content);
  $(".addBtn").tooltip();
  $("[name='supplier']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/yarn/purchase/supplier/list",
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
    filter: "contains",
    change: function (e) {
      var companyNo = "";
      var email = "";
      if (this.value().length) {
        email = e.sender.dataItem(e.item).companyEmail;
        companyNo = e.sender.dataItem(e.item).companyNo;
      }
      $("[name='companyEmails']").val(email);
      $("[name='companyNo']").val(companyNo).prev().html((companyNo.length) ? companyNo : "&nbsp;");
    },
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//supplierDropDownList

  $("[name='shopper']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/yarn/purchase/shopper/list",
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
    filter: "contains",
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//shopperDropDownList

  $("body").on("click", "#sendEmail ~ .addBtn", function () {
    $("#emailContainer").append($("#emailTemplate").html());
  });//delete Email
  $("body").on("click", ".extraEmail > .delBtn ", function () {
    $(this).parent().remove();
  });//delete Email

  $("body").on("click", "#sendEmail", function () {
    if ($(this).children("input:checkbox").prop("checked")) {
      $("[name='companyEmails']").closest(".box_inputdata").show();
      $(this).parent().children(".addBtn").show();
    } else {
      $("[name='companyEmails']").closest(".box_inputdata").hide();
      $(this).parent().children(".addBtn").hide();
      $("#emailContainer").html("");
    }
  })

  if (Object.keys(mainCore).length) {
    if (mainCore.companyEmails.value.length) {
      $("#sendEmail").children("input:checkbox").prop("checked", true)
      $("#sendEmail").trigger("click");
      $("#sendEmail").children("input:checkbox").prop("checked", true)
      $("[name='companyEmails']").val(mainCore.companyEmails.value[0]);
      $("[name='companyNo']").val(mainCore.companyNo.value).prev().text(mainCore.companyNo.value);
      for (i in mainCore.companyEmails.value) {
        if (parseInt(i)) {
          $("#sendEmail ~ .addBtn").trigger("click");
          $("#emailContainer [name='extraEmail']:last").val(mainCore.companyEmails.value[i]);
        }//if
      }//loop
    }//if
  }//if

  //-------Purchase------
  var yarnPurchaseDetails = fw_formData.response.yarnPurchaseDetails;
  for (i in yarnPurchaseDetails.header) {
    var required = (yarnPurchaseDetails.header[i].required) ? "<span class='color_pink'>*</span>" : "";
    if (yarnPurchaseDetails.header[i].required) {
      detailRequired.push(`[name='${i}']`);
    }
    $("#purchase thead tr th ." + i + "Title").text(yarnPurchaseDetails.header[i].title).after(required);
  }//end of loop

  for (i of yarnPurchaseDetails.contents) {
    $("#addPurchase").trigger("click");
  }//end of loop
  if (yarnPurchaseDetails.contents.length <= 1) {
    $("#purchase tbody .del").hide();
  }
}//customizeForm

function yarnPurchase(obj, form) {
  var emailSet = [];
  obj.find("input[name*='Email']:not(:hidden)").each(function () {
    if (!$(this).val().trim().length) {
      $(this).errorMsg({
        message: "請輸入Email"
      });
    } else {
      emailSet.push($(this).val().trim())
    }
  })//check yarnPurchase

  form["companyEmails"] = emailSet;
  return form;
}//yarnPurchase

function setPurchaseDropdown() {
  $("#purchase [name='yarnCore']:last").kendoDropDownList({
    dataSource: yarnCoreData,
    filter: "contains",
    optionLabel: " ",
    dataTextField: "text",
    dataValueField: "value"
  });//yarnUuidDropDownList

  $("#purchase [name='destinationCompany']:last").kendoDropDownList({
    dataSource: yarnCompany,
    filter: "contains",
    optionLabel: " ",
    dataTextField: "text",
    dataValueField: "value"
  });//yarnUuidDropDownList

  $("#purchase [name='purchaseUnit']:last").kendoDropDownList({
    dataSource: fw_formData.response.yarnPurchaseDetails.header.purchaseUnit.keyValue,
    dataTextField: "text",
    dataValueField: "value"
  });//purchaseUnitDropDownList

  $("#purchase [name='warpWeft']:last").kendoDropDownList({
    dataSource: fw_formData.response.yarnPurchaseDetails.header.warpWeft.keyValue,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//warpWeftDropDownList
  $("#purchase [name='expectArrivalTime']:last").kendoDatePicker({
    culture: "zh-TW",
    value: fw_now,
    format: "yyyy/MM/dd"
  });
  $("#purchase [name='expectArrivalTime']:last").on('click', function () {
    $(this).data("kendoDatePicker").open();
  });
}//setInquiryDropdown

function yarnPurchaseDetails() {
  var purchase = new Object();
  purchase["yarnPurchaseCoreUuid"] = 0;
  purchase["yarnPurchaseDetails"] = [];
  var title = fw_formData.response.yarnPurchaseDetails.header;
  $("#purchase tbody tr").each(function () {
    purchase["yarnPurchaseDetails"].push({
      "yarnCore": $(this).find("[name='yarnCore']").val().trim(),
      "purchaseAmount": ($(this).find("[name='purchaseAmount']").val().trim().length) ? Number($(this).find("[name='purchaseAmount']").val()) : null,
      "purchaseUnit": ($(this).find("[name='purchaseUnit']").val().trim().length) ? Number($(this).find("[name='purchaseUnit']").val()) : null,
      "warpWeft": ($(this).find("[name='warpWeft']").val().trim().length) ? Number($(this).find("[name='warpWeft']").val()) : null,
      "destinationCompany": $(this).find("[name='destinationCompany']").val().trim(),
      "expectArrivalTime": ($(this).find("[name='expectArrivalTime']").val().trim().length) ? new Date($(this).find("[name='expectArrivalTime']").val().trim() + " 00:00:00") : null,
      "purchasePrice": ($(this).find("[name='purchasePrice']").val().trim().length) ? $(this).find("[name='purchasePrice']").val().trim() : null
    });
    $(this).find(detailRequired.join(",")).each(function () {
      if (!$(this).val().trim().length) {
        $(this).addClass("invalidInput");
        $(this).closest(".k-dropdown").addClass("invalidInput").find("input").removeClass("invalidInput");
        $(this).closest("td").find(".errorMsg").text("請輸入" + title[$(this).attr("name")].title);
      }
    })//endo fo each
  })//endo fo each
  return purchase;
}//yarnPurchaseDetails

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
