var filter;
var supplierSet={};
var theSupplier;
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
let totalSize = 0;
let allSize = [];
let validatedFiles = [];
let attachmentsData = [];
let deleteFileData = [];
let salesQuoteYarnInquiry;
$(async function () {
  await yarnCoreData.fetch();
  /*業務報價傳入的紗資訊*/
  if (window.localStorage.yarnInquiry != null) {
    salesQuoteYarnInquiry = JSON.parse(window.localStorage.yarnInquiry);
    localStorage.removeItem("yarnInquiry");
  }
  $("#form").formWizard({
    id: "yarnInquiryCoreUuid",
    url: "/api/yarn/inquiry/template/" + uuid,
    mainData: "response.yarnInquiryCore",
    noData: "findnodata",
    noAddable: ["yarnInquirers","supplier"],
    listUrl: {
      "inquirer":"/api/yarn/inquiry/inquirer/list"
    },
    customizeForm: "customizeForm",
    uploadFile:true
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
  $("body").on("click", ".sendEmail ~ .addBtn ", function () {
    $(this).nextAll(".emailContainer").append($("#emailTemplate").html());
  });//delete Email
  $("body").on("click", ".extraEmail > .delBtn ", function () {
    $(this).parent().remove();
  });//delete Email

  $("body").on("change", ".sendEmail", function () {
    if ($(this).children("input:checkbox").prop("checked")) {
      $(this).nextAll(".addBtn, .companyEmail").show();
    } else {
      $(this).nextAll(".addBtn, .companyEmail").hide();
      $(".emailContainer").html("");
    }
  })

  $("#addInquiry").click(function () {
    $("#inquiry tbody").append($("#inquiryTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    setInquiryDropdown();
    setInquiryDatetime();
    $("#inquiry tbody tr:eq(0) .del").show();
  })// addInquiry  click

  $("body").on("click", "#inquiry .del", function () {
    $(this).closest("tr").remove();
    if ($("#inquiry tbody tr").length <= 1) {
      $("#inquiry tbody tr:eq(0) .del").hide();
    }
  })// inquiry   del click

  $("#save").click(function () {

    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    for(i of $("[name='supplier']").val()){
      supplierSet[i]=[];
      $(`.emailSection[data-id='${i}']:not(:hidden) [name='companyEmail']:not(:hidden)`).each(function(){
        supplierSet[i].push($(this).val());
      })
    }
    var insertCount=0;
    for(i in supplierSet){
      theSupplier=i;
      insertCount++;
      var postData = $("#form").formCheck({
        name: "yarnInquiryCore",
        dataProccessing: "yarnInquiry",
        otherCheck: [
          "yarnInquiryDetails"
        ]
      });
      if (!postData) {
        $(this).removeClass("waitaSec");
        return;
      }
      $.each(validatedFiles, function (index, value) {
        postData.append("uploadFiles", value);

      })
      postData.append("relateUuid", 0);

      postData.append("deleteFiles", deleteFileData.join(", "));
      $.ajax({
        url: "/api/yarn/inquiry",
        data: postData,
        method: "PUT",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.status) {
            if(insertCount == Object.keys(supplierSet).length){
              fw_notification.show({}, "saveOrInsert");
              setNoificationPosition();
              setTimeout(function () {
                $(".drawCheck").hide().delay(460).queue(function () {
                  location = "/page/yarn/inquiry";
                  $(this).dequeue();
                });
              }, 1000);
            }
          }else{
            $("#save").removeClass("waitaSec");
            for (i of data.response) {
              $("#form [name='" + i.field + "']").errorMsg({
                message: i.defaultMessage
              });
            }
          }
        } // end of ajax success
      }); //end of ajax
    }//loop
  })//end of save
  
})//$(function ()

function findnodata() {
  $("html").remove();
  location.replace("/page/yarn/inquiry");
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
  $("[name='emergencyLevel'],[name='inquirySatisfaction']").each(function () {
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

  $("[name='companyEmails'],[name='inquirySatisfaction']").closest(".box_inputdata").hide();
  $("[name='supplier']").closest(".box_inputdata").after("<span id='emailContainer'></span>");
  $("[name='supplier']:not(:hidden)").kendoMultiSelect({
      dataSource: {
        transport: {
          read: {
            type: "GET",
            url: "/api/yarn/inquiry/supplier/list",
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
      filtering: function (e) {
        if (e.filter != undefined) {
          filter = e.filter;
        }
      },
      select: function(e) { 
        $("#emailsectionTemplate nav.title").text(e.dataItem.text);
        $("#emailsectionTemplate > .emailSection").attr("data-id",e.dataItem.value);
        $("#emailsectionTemplate [name='companyEmail']").val(e.dataItem.email);
        $("#emailContainer").append($("#emailsectionTemplate > .emailSection").clone());
        $(".addBtn").tooltip();
      },
      
      deselect: function(e) {
  
        $(`.emailSection[data-id='${e.dataItem.value}']:not(:hidden)`).remove();
      },
      noDataTemplate: "<span class='nodata'>查無資料</span>"
    });
  // });//supplierDropDownList

  //-------Inquiry------
  var yarnInquiryItems = fw_formData.response.yarnInquiryDetails;
  $("#inquiry thead tr th .yarnUuidTitle").text(yarnInquiryItems[0].yarnCore.title);
  $("#inquiryTemplate [name='yarnUuid']").attr("data-name", yarnInquiryItems[0].yarnCore.title);

  $("#inquiry thead tr th .amountTitle").text(yarnInquiryItems[0].inquiryAmount.title + "/" + yarnInquiryItems[0].inquiryUnit.title);
  $("#inquiryTemplate [name='amount']").attr("data-name", "重量");

  $("#inquiryTemplate [name='isWeight']").attr("data-name", "單位");

  $("#inquiry thead tr th .warpWeftTitle").text(yarnInquiryItems[0].warpWeft.title);
  $("#inquiryTemplate [name='warpWeft']").attr("data-name", yarnInquiryItems[0].warpWeft.title);

  $("#inquiry thead tr th .minimumOrderQuantityTitle").text(yarnInquiryItems[0].minimumOrderQuantity.title);

  $("#inquiry thead tr th .extraFeeTitle").text(yarnInquiryItems[0].extraFee.title);
  $("#inquiryTemplate [name='extraFee']").attr("data-name", yarnInquiryItems[0].extraFee.title);

  $("#inquiry thead tr th .isInStockTitle").text(yarnInquiryItems[0].isInStock.title);
  $("#inquiryTemplate [name='isInStock']").attr("data-name", yarnInquiryItems[0].isInStock.title);

  $("#inquiry thead tr th .isEqualLongTitle").text(yarnInquiryItems[0].isEqualLong.title);
  $("#inquiryTemplate [name='isEqualLong']").attr("data-name", yarnInquiryItems[0].isEqualLong.title);

  $("#inquiry thead tr th .expectDeliverDateTitle").text(yarnInquiryItems[0].expectDeliverDate.title);
  $("#inquiryTemplate [name='expectDeliverDate']").attr("data-name", yarnInquiryItems[0].expectDeliverDate.title);


  for (i of yarnInquiryItems) {
    $("#addInquiry").trigger("click");
  }//end of loop
  if (typeof (Storage) !== "undefined") {
    if (sessionStorage.getItem("yarnUuid") != null) {
      $("[name='inquiryDatetime']").data("kendoDateTimePicker").value(fw_now);
      sessionStorage.getItem("yarnUuid");
      $("#inquiry tbody tr:last [name='yarnUuid']").data("kendoDropDownList").value(sessionStorage.getItem("yarnUuid"));
      sessionStorage.removeItem("yarnUuid");
    }
  }
  if (yarnInquiryItems.length <= 1) {
    $("#inquiry tbody .del").hide();
  }

  /*業務報價要求的詢價資訊*/
  if(salesQuoteYarnInquiry){
    $.each(salesQuoteYarnInquiry, function (index, item) {
      $("#inquiry tbody tr:last [name='yarnUuid']").data("kendoDropDownList").value(item.uuid);
      $("#inquiry tbody tr:last [name='yarnUuid']").data("kendoDropDownList").trigger("change");
      //TODO: 無法觸發change event
      $("#inquiry tbody tr:last [name='warpWeft']").data("kendoDropDownList").text(item.warpWeft);
      if(salesQuoteYarnInquiry.length - index > 1){
        $("#addInquiry").trigger("click")
      }
    });
  }
}//customizeForm

function yarnInquiry(obj, form) {
  var emailSet = [];
  obj.find("input[name*='Email']:not(:hidden)").each(function () {
    if (!$(this).val().trim().length) {
      $(this).errorMsg({
        message: "請輸入Email"
      });
    }
  })//check email
  form["supplier"]=theSupplier;
  form["companyEmails"]=supplierSet[theSupplier];
  return form;
}//yarnInquiry

function setInquiryDropdown() {
  $("#inquiry [name='yarnUuid']:last").kendoDropDownList({
    dataSource: yarnCoreData,
    filter: "contains",
    optionLabel: " ",
    dataTextField: "text",
    dataValueField: "value",
    change: function (e) {
      switch (e.sender.dataItem(e.item).isLong) {
        case false:
          $(e.sender.element).closest("tr").find("[name='isEqualLong']").closest("td").addClass("invisibled").find("input").val("123");
          break;
        case true:
          $(e.sender.element).closest("tr").find("[name='isEqualLong']").closest("td").removeClass("invisibled");
          break;
      }
    }
  });//yarnUuidDropDownList

  $("#inquiry [name='unit']:last").kendoDropDownList({
    dataSource: [{ "value": 1, "text": "件數" }, { "value": 2, "text": "公斤" }],
    dataTextField: "text",
    dataValueField: "value"
  });//unitDropDownList

  $("#inquiry [name='warpWeft']:last").kendoDropDownList({
    dataSource: fw_formData.response.yarnInquiryDetails[0].warpWeft.keyValue,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
  });//warpWeftDropDownList

  $("#inquiry [name='isInStock']:last").kendoDropDownList({
    dataSource: fw_formData.response.yarnInquiryDetails[0].isInStock.keyValue,
    dataTextField: "text",
    dataValueField: "value",
    change: function (e) {
      switch (parseInt(this.value())) {
        case 0:
          $(e.sender.element).closest("tr").find("[name='minimumOrderQuantity'],[name='minimumOrderUnit']")
            .closest("td").removeClass("invisibled");
          break;
        case 1:
          $(e.sender.element).closest("tr").find("[name='minimumOrderQuantity'],[name='minimumOrderUnit']")
            .closest("td").addClass("invisibled").find("input").val("");
          break;
      }
    }
  });//isInStockDropDownList

  $("#inquiry [name='minimumOrderUnit']:last").kendoDropDownList({
    dataSource: fw_formData.response.yarnInquiryDetails[0].minimumOrderUnit.keyValue,
    dataTextField: "text",
    dataValueField: "value"
  });//isInStockDropDownList

  $("#inquiry input[name='isEqualLong']").kendoDropDownList({
    dataSource: fw_formData.response.yarnInquiryDetails[0].isEqualLong.keyValue,
    dataTextField: "text",
    dataValueField: "value"
  });//isEqualLongDropDownList
}//setInquiryDropdown

function setInquiryDatetime() {
  $("#inquiry [name='expectDeliverDate']:last").kendoDateTimePicker({
    value: fw_now,
    culture: "zh-TW",
    format: "yyyy/MM/dd",
    timeFormat: "HH:mm",
    interval: 15
  });
}//setInquiryDatetime

function yarnInquiryDetails() {

  var inquiry = new Object();
  var yarnInquiryItem = new Object();
  inquiry["yarnInquiryCoreUuid"] = 0;
  inquiry["yarnInquiryDetails"] = [];
  $("#inquiry tbody tr").each(function () {
    yarnInquiryItem = {
      "yarnCoreUuid": $(this).find("[name='yarnUuid']").val().trim(),
      "inquiryAmount": ($(this).find("[name='amount']").val().trim().length) ? Number($(this).find("[name='amount']").val()) : null,
      "inquiryUnit": ($(this).find("[name='unit']").val().trim().length) ? Number($(this).find("[name='unit']").val()) : null,
      "warpWeft": ($(this).find("[name='warpWeft']").val().trim().length) ? Number($(this).find("[name='warpWeft']").val()) : null,
      "isInStock": Number($(this).find("[name='isInStock']").val()),
      "minimumOrderQuantity": ($(this).find("[name='minimumOrderQuantity']").closest("td").hasClass("invisibled")) ? null : Number($(this).find("[name='minimumOrderQuantity']").val()),
      "minimumOrderUnit": ($(this).find("[name='minimumOrderUnit']").closest("td").hasClass("invisibled")) ? null : Number($(this).find("[name='minimumOrderUnit']").val()),
      "isEqualLong": ($(this).find("[name='isEqualLong']").closest("td").hasClass("invisibled")) ? null : Number($(this).find("[name='isEqualLong']").val()),
      "expectDeliverDate": ($(this).find("[name='expectDeliverDate']").val().trim().length) ? Date.parse($(this).find("[name='expectDeliverDate']").val().trim()) : null,
      "extraFee": ($(this).find("[name='extraFee']").val().trim().length) ? parseFloat($(this).find("[name='extraFee']").val()) : null,
    }
    inquiry["yarnInquiryDetails"].push(yarnInquiryItem);
    requiredName = ["yarnUuid", "isInStock", "warpWeft","amount"];
    $(this).find("input").each(function () {
      if (requiredName.includes(this.name) && !$(this).val().trim().length) {
        $(this).addClass("invalidInput");
        $(this).closest(".k-dropdown").addClass("invalidInput").find("input").removeClass("invalidInput");
        $(this).closest("td").find(".errorMsg").text("請輸入" + $(this).attr("data-name"));
      }
    })//endo fo each
  })//endo fo each
  return inquiry;
}//yarnInquiryItems
