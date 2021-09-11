let changeClientNotification;
let cancelSignatureNotificationView;
let clothCostWindow;
let notification;
let deleteSalesQuoteGreyClothUuids = [];
let deleteContactUuids = [];
let salesCopyUuid;
let clothCostObject = {};

let rootApi = "/api/sales/quote/grey";
let backUrl = "/page/sales/quote/grey";

let signatureText = {
  0: "開始",
  1: "撤銷",
  2: "轉準訂單",
  3: "轉正式訂單"
};

let tableHeaderTemplate = `
<th scope="col" style="width:8%;">
    <span></span>
</th>`;

let tableColumnTemplate = `
<td>
  <input class="form-control" type='text'>
  <span class="errorMsg color_pink"></span>
</td>
`;

let ratingbarTemplate = `
<span class="rating" style="float: left">
    <input type="radio" id="star3" name="salesClosingConfidenceValue" value="3" />
    <label for="star3" title="text" style="float: right"></label>
    <input type="radio" id="star2" name="salesClosingConfidenceValue" value="2" />
    <label for="star2" title="text" style="float: right"></label>
    <input type="radio" id="star1" name="salesClosingConfidenceValue" value="1" />
    <label for="star1" title="text" style="float: right"></label>
</span>
`;

let contactHeaderTemplate = `
<div class="col-md-12 box_inputdata">
  <fieldset>
    <div class="form-group">
      <nav>聯絡人</nav>
      <input type="text" name="contact" class="form-control number integer" value="" disabled="disabled">
      <span class="errorMsg color_pink"></span>
    </div>
  </fieldset>
  <div id='contactsContainer'>
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>信箱</th>
          <th>電話</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
</div>
`;

let clothCoreData = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/cloth/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response;
    }
  }
});

$(function () {
  if (window.localStorage.salesCopy != null) {
    salesCopyUuid = window.localStorage.salesCopy;
    localStorage.removeItem("salesCopy");
    uuid = salesCopyUuid;
  }
  $("#form").formWizard({
    id: "salesQuoteCoreUuid",
    url: rootApi + "/template/" + uuid,
    mainData: "response.salesQuoteCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
    fileUpload: true
  }); // formWizard

  SetInitPage(false, backUrl);

  baseController();
  initNotification();
  createClientNotification();
  clientNotificationController();
  cancelSignatureNotification();
  createClothCostWindow();
  clothCostWindowController();
});

async function customizeForm() {
  kendo.ui.progress($("#form"), true);
  clothCostObject = {};
  // rating bar
  let ratingBar = $("input[name='salesClosingConfidence']");
  ratingBar.parent().find("nav").css("float", "left");
  ratingBar.before(ratingbarTemplate);
  ratingBar.remove();

  $("[name='client']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: rootApi + "/client/list",
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
  }); // clientDropDownList

  // contact
  $("input[name='client']").closest(".box_inputdata").after(contactHeaderTemplate);

  let clientDropDownList = $("input[name = 'client']").data('kendoDropDownList');
  clientDropDownList.bind("change", clientChanged);
  clientDropDownList.bind("open", clientOpened);

  for (let column in fw_formData.response.salesQuoteGreyClothes.header) {
    $("#detail thead tr").append(tableHeaderTemplate);
    let count = $("#detail thead tr th").length;
    let selector = $("#detail thead tr th")[count - 1];
    $(selector).prop("id", column);
    $(selector).find("span").append(fw_formData.response.salesQuoteGreyClothes.header[column].title);
    if (fw_formData.response.salesQuoteGreyClothes.header[column].required) {
      $(selector).find("span").after(`<span class="color_pink">*</span>`);
    }
    if ((salesCopyUuid || !uuid) && (column == "quoteStatus" || column == "signature")) {
      fw_formData.response.salesQuoteGreyClothes.header[column].type = "hidden";
    }
    // detail row
    let temp = initColumn(count, column);
    switch (fw_formData.response.salesQuoteGreyClothes.header[column].type) {
      case "float":
        temp.find("input").addClass("number");
        break;
      case "unsignedInteger":
        temp.find("input").addClass("number integer");
        break;
      case "text":
        temp.find("input").addClass("text");
        break;
      case "hidden":
        $(selector).css("display", "none");
        temp.css("display", "none");
        break;
      case "label":
        temp.find("input").hide();
        break;
      case "command":
        temp.find("input").hide();
        break;
    }
  }

  if (uuid) {
    $("#star" + fw_formData.response.salesQuoteCore.salesClosingConfidence.value).prop("checked", true);
    $("input[name='contact']").prop("disabled", false);
    let contactList = [];
    for (index in fw_formData.response.salesQuoteCore.contacts) {
      contactList.push(fw_formData.response.salesQuoteCore.contacts[index].contact.value);
    }
    // await initFormMultiSelect(getContactList($("[name='client']").val()), contactList);
    initFormMultiSelect(getContactList($("[name='client']").val()), contactList);

    for (let column in fw_formData.response.salesQuoteGreyClothes.contents) {
      await addRow(column);
    }
  } else {
    await addRow();
  }

  // 複製
  if (salesCopyUuid) {
    $("#detail tbody tr").find("input[name='salesQuoteGreyClothUuid']").val("");
    uuid = null;
  }

  kendo.ui.progress($("#form"), false);
}

/*初始化欄位*/
function initColumn(count, column) {
  let detailTemplate = $("#detailTemplate");
  detailTemplate.find("tr").append(tableColumnTemplate);
  let detailSelector = $("#detailTemplate tbody tr td")[count - 1];
  $(detailSelector).find("input").prop("name", column);
  if (column === "clothCost") {
    $(detailSelector).find("input[name=" + column + "]").after(`<a style="cursor: pointer" name="` + column + `"></a>`);
    $(detailSelector).find("input[name=" + column + "]").remove();
  }
  return $(detailSelector);
}

/*基本控制器*/
function baseController() {
  $('body').on('click', '#addItem', function () {
    addRow();
  });

  $('body').on('click', '.k-overlay', function () {
    clothCostWindow.close();
  });

  $('#detail').on('click', '.deleteDetail a', function () {
    if ($(this).parents('tr').find("input[name='salesQuoteGreyClothUuid']").val()) {
      deleteSalesQuoteGreyClothUuids.push($(this).parents('tr').find("input[name='salesQuoteGreyClothUuid']").val());
    }
    $(this).parents('tr').remove();
  });

  $('#detail').on('click', '.signature', function () {
    let buttonTypeValue = $(this).attr("type");
    if (buttonTypeValue === "1") {
      cancelSignatureNotificationController($(this), buttonTypeValue);
    } else {
      signatureStartEnd($(this), buttonTypeValue);
    }
  });

  $("#detail").on("input onpropertychange", "[name='profit']", function () {
    let selectorParent = $(this).parents("tr");
    let clothCost = selectorParent.find("[name='clothCost']").val() ? parseInt(selectorParent.find("[name='clothCost']").val()) : 0;
    let profit = parseInt($(this).val());
    if(clothCost > 0) {
      selectorParent.find("[name='clothQuote']").val(clothCost + profit);
    }
  });

  $('#detail').on('click', '.checkSignature', function () {
    let selector = $(this);
    let selctorIcon = $(this).find("i");
    let selectorParent = selector.parents("tr");
    let salesQuoteGreyClothUuid = selectorParent.find("input[name='salesQuoteGreyClothUuid']").siblings("span").text();

    let timelineTemplate = kendo.template($("#timelineContentTemplate").html());

    if (selector.attr("isexpand") === "true") {
      selector.attr("isExpand", false);
      selctorIcon.hide();
      selectorParent.next().hide();
      selectorParent.next()
    } else {
      $.ajax({
        url: rootApi + "/record/" + salesQuoteGreyClothUuid,
        method: "GET",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          kendo.ui.progress($("#detail"), true);
          if (data.status) {
            selector.attr("isExpand", true);
            selctorIcon.show();
            selectorParent.next().show();
            if (selectorParent.next().find("[name='timeline']").length === 0) {
              selectorParent.after(kendo.template($("#recordTimeline").html()));
            } else {
              selectorParent.next().find("[name='timeline']").empty();
            }
            $.each(data.response, function (index, value) {
              selectorParent.next().find("[name='timeline']").append(timelineTemplate(value));
            });

          } else {
            $("#save").removeClass("waitaSec");
            for (i of data.response) {
              $("#form [name='" + i.field + "']").errorMsg({
                message: i.defaultMessage
              });
            }
          }

          kendo.ui.progress($("#detail"), false);
        } // end of ajax success
      }); //end of ajax
    }
  });

  $("#save").click(function () {
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var postData = new FormData();
    if (verification() === 0) {
      postData = setSaveData();
      if (!postData) {
        $(this).removeClass("waitaSec");
        return;
      }
      $.ajax({
        url: rootApi,
        data: postData,
        method: uuid ? "POST" : "PUT",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.status) {
            fw_notification.show({}, "saveOrInsert");
            setNoificationPosition();
            setTimeout(function () {
              $(".drawCheck").hide().delay(460).queue(function () {
                location.replace("/page/sales/quote/grey");
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
    }
  });
}

/*設定提醒警報器*/
function initNotification() {
  let notificationData = [{
    type: "detailMin",
    template: "<div class='errorNotification zoominTrans'>報價詳情為空</span></div>"
  }
  ];
  notification = setNotification(null, null, notificationData);
}

/*初始化客戶名稱變更彈跳視窗*/
function createClientNotification() {
  changeClientNotification = $("#changeClientNotification").kendoWindow({
    modal: true,
    width: "auto",
    height: 'auto',
    resizable: false,
    visible: false,
    open: function () {
      $("body").addClass("overlay");
    },
    close: function () {
      $("body").removeClass("overlay");
    }
  }).data('kendoWindow');
}

/*客戶名稱變更彈跳視窗控制器*/
function clientNotificationController() {
  $('#changeClientNotification').on('click', '[name="cancel"]', function () {
    changeClientNotification.close();
  });

  $('#changeClientNotification').on('click', '[name="confirm"]', function () {
    resetContact();
    initFormMultiSelect(getContactList($("[name='client']").val()));
    changeClientNotification.close();
  });
}

/*初始化撤銷簽核彈跳視窗*/
function cancelSignatureNotification() {
  cancelSignatureNotificationView = $("#cancelSignatureNotification").kendoWindow({
    modal: true,
    width: "auto",
    height: 'auto',
    resizable: false,
    visible: false,
    open: function () {
      $("body").addClass("overlay");
    },
    close: function () {
      $("body").removeClass("overlay");
    }
  }).data('kendoWindow');
}

/*撤銷簽核彈跳視窗控制器*/
function cancelSignatureNotificationController(selector, buttonTypeValue) {
  $('#cancelSignatureNotification').on('click', '[name="cancel"]', function () {
    cancelSignatureNotificationView.close();
  });

  $('#cancelSignatureNotification').on('click', '[name="confirm"]', function () {
    signatureStartEnd(selector, buttonTypeValue);
    cancelSignatureNotificationView.close();
  });

  cancelSignatureNotificationView.open();
  cancelSignatureNotificationView.center();
}

/*新增detail行*/
async function addRow(column) {
  let detailRowElement = $("#detailTemplate tbody").html();
  $("#detail").find("tbody").append($(detailRowElement));
  let count = $("#detail tbody tr[name='detailList']").length;
  let clothCoreElement = $("#detail tbody td").find("input[name='clothCore']")[count - 1];
  if (!column) {
    await setClothDropdownList($(clothCoreElement), null, null)
  } else {
    for (item in fw_formData.response.salesQuoteGreyClothes.contents[column]) {

      if (item === "clothCore") {
        await setClothDropdownList($(clothCoreElement), fw_formData.response.salesQuoteGreyClothes.contents[column][item], null);
      }
      if (item === "clothCost") {
        $($("#detail tbody tr")[column]).find("[name=" + item + "]").text(fw_formData.response.salesQuoteGreyClothes.contents[column][item]);
      }

      if (item === "signature") {
        let typeValue = fw_formData.response.salesQuoteGreyClothes.contents[column].signature;
        if (typeValue !== 4) {
          let text = signatureText[typeValue];
          $($("#detail tbody tr")[column]).find("input[name='signature']").after(`<a href="javascript:void(0)" class="btn_upload table_btn_status signature" type="` + typeValue + `" >` + text + `</a>`);
        }
        $($("#detail tbody tr")[column]).find("input[name='signature']").remove()
      }

      if (fw_formData.response.salesQuoteGreyClothes.contents[column].editable || salesCopyUuid) {
        $($("#detail tbody tr")[column]).find("input[name=" + item + "]").val(fw_formData.response.salesQuoteGreyClothes.contents[column][item]);
        if (item === "quoteStatus") {
          $($("#detail tbody tr")[column]).find("input[name=" + item + "]").after("<span>" + fw_formData.response.salesQuoteGreyClothes.contents[column][item] + "</span>");
          $($("#detail tbody tr")[column]).find("input[name=" + item + "]").remove();
        }
      } else {
        if (item === "clothCore") {
          $(clothCoreElement).data("kendoDropDownList").enable(false);
          $($("#detail tbody tr")[column]).find("[name='clothCost']").attr("class", "disabled");
          $($("#detail tbody tr")[column]).find("[name='clothCost']").css("color", "unset");

        } else if (item === "quoteStatus") {
          $($("#detail tbody tr")[column]).find("input[name=" + item + "]").after(`
            <a href="javascript:void(0)" class="checkSignature">` + fw_formData.response.salesQuoteGreyClothes.contents[column][item] + `
            <br>
            <i class="fa fa-chevron-down" style="display: none; color: #337ab7;"></i></a>
          `);
          $($("#detail tbody tr")[column]).find("input[name=" + item + "]").hide();
          $($("#detail tbody tr")[column]).find(".deleteDetail").empty();
        } else {
          if (item === "salesQuoteGreyClothUuid") {
            $($("#detail tbody tr")[column]).find("input[name=" + item + "]").val(fw_formData.response.salesQuoteGreyClothes.contents[column][item]);
          }
          $($("#detail tbody tr")[column]).find("input[name=" + item + "]").after("<span>" + fw_formData.response.salesQuoteGreyClothes.contents[column][item] + "</span>");
          $($("#detail tbody tr")[column]).find("input[name=" + item + "]").hide();
          $($("#detail tbody tr")[column]).find(".deleteDetail").empty();
        }
      }
    }
  }
}

/*客戶名稱被更改*/
function clientChanged() {
  if ($("input[name='contact']").is('[disabled=disabled]')) {
    $("input[name='contact']").prop("disabled", false);
  } else {
    resetContact();
  }
  initFormMultiSelect(getContactList($("[name='client']").val()));
}

/*更換客戶名稱顯示彈跳示窗*/
function clientOpened() {
  if ($("#contactsContainer").find(".contactSection").length > 0) {
    changeClientNotification.center().open();
    // changeClientNotification;
  }
}

/*獲取聯絡人List*/
function getContactList(clientUuid) {
  if (clientUuid) {
    return new kendo.data.DataSource({
      transport: {
        read: {
          url: rootApi + "/contact/" + clientUuid + "/list",
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {
          return data.response;
        }
      }
    });
  } else {
    $("input[name='sales']").closest(".k-dropdown").after(`
    <input type="text" name="sales" class="form-control number integer" value="">
    `);
    $("input[name='sales']").closest(".k-dropdown").remove();
  }
}

/*初始化客戶多選*/
async function initFormMultiSelect(dataSourceData, value) {
  if (dataSourceData) {
    await dataSourceData.fetch();
    let contactMulti = $("[name='contact']").kendoMultiSelect({
      placeholder: "請先選擇客戶再選擇聯絡人",
      dataTextField: "text",
      dataValueField: "value",
      dataSource: dataSourceData,
      noDataTemplate: "<span class='nodata'>查無資料</span>",
      select: function (e) {
        let contactDetailTemplate = kendo.template($("#contactDetailTemplate").html());
        $("#contactsContainer table tbody").append(contactDetailTemplate(e.dataItem));
        $("#contactsContainer").css("display", "block");
      },
      deselect: function (e) {
        deleteContactUuids.push(e.dataItem.value);
        $(`.contactSection[data-id='${e.dataItem.value}']:not(:hidden)`).remove();
        let length = $(`#contactsContainer table tbody tr`).length;
        if (length <= 0) {
          $("#contactsContainer").css("display", "none");
        }
      }
    });

    if (value != null && value !== "") {
      contactMulti.data("kendoMultiSelect").value(value);
      let dataSourceDataList = dataSourceData.data();
      for (index in value) {
        for (dataSourceIndex in dataSourceDataList) {
          if (value[index] === dataSourceDataList[dataSourceIndex].value) {
            let contactDetailTemplate = kendo.template($("#contactDetailTemplate").html());
            $("#contactsContainer table tbody").append(contactDetailTemplate(dataSourceDataList[dataSourceIndex]));
          } else {
            $("#contactsContainer").css("display", "none");
          }
        }
      }
    }
  } else {
    $("input[name='contact']").prop("disabled", true);
  }

  let length = $(`#contactsContainer table tbody tr`).length;
  if (length > 0) {
    $("#contactsContainer").css("display", "block");
  }

}

/*新增/更新資料驗證*/
function verification() {
  let hasError = 0;
  let salesQuoteCore = fw_formData.response.salesQuoteCore;
  for (item in salesQuoteCore) {
    switch (item) {
      case "quoteValidDays":
        if (salesQuoteCore[item].required && $("[name='" + item + "']").val() == "") {
          $("[name='" + item + "']").errorMsg({
            message: "請輸入" + salesQuoteCore[item].title + "!"
          });
          hasError = 1;
        }
        break;
      case "client":
        if (dropDownListVerfication(salesQuoteCore, item) === 1) {
          hasError = 1;
        }
        break;
      case "sales":
        if (dropDownListVerfication(salesQuoteCore, item) === 1) {
          hasError = 1;
        }
        break;
    }
  }
  // TODO
  let header = fw_formData.response.salesQuoteGreyClothes.header;
  $("#detail tbody tr").each(function () {
    if ($(this).find("[name='editable']").siblings('span').first().html() === 'false') {
      return;
    }
    for (let item in header) {
      if (item === "clothCost" && $(this).find("[name='" + item + "']").text() === "--") {
        $(this).find("[name='" + item + "']").errorMsg({
          message: "請輸入" + header[item].title + "!"
        });
        hasError = 1;
      }
      if (header[item].required && $(this).find("[name='" + item + "']").val() == "" && item !== "clothCost") {
        $(this).find("[name='" + item + "']").errorMsg({
          message: "請輸入" + header[item].title + "!"
        });
        hasError = 1;
      }
    }
  });
  if ($("#detail tbody tr").length === 0) {
    notification.show({}, "detailMin");
    setNoificationPosition();
    hasError = 1
  }
  return hasError;
}

/*下拉式選單驗證*/
function dropDownListVerfication(salesQuoteCore, field) {
  if (salesQuoteCore[field].required && $("[name='" + field + "']").data("kendoDropDownList").value() == "") {
    $("[name='" + field + "']").errorMsg({
      message: "請輸入" + salesQuoteCore[field].title + "!"
    });
    return 1;
  }
}

/*創建/更新資料格式*/
function setSaveData() {
  let postData = new FormData();
  let salesQuoteCore = {};
  salesQuoteCore.salesQuoteCoreUuid = uuid ? uuid : 0;
  salesQuoteCore.closingConfidence = $("input[name='salesClosingConfidenceValue']:checked").val() ? $("input[name='salesClosingConfidenceValue']:checked").val() : 1;
  salesQuoteCore.quoteDate = moment($("[name='quoteDate']").val()).format("YYYY-MM-DDTHH:mm:ssZ");
  salesQuoteCore.quoteValidDays = $("[name='quoteValidDays']").val();
  salesQuoteCore.client = $("[name='client']").val();
  salesQuoteCore.contacts = $("[name='contact']").data("kendoMultiSelect").value();
  salesQuoteCore.sales = $("[name='sales']").val();
  salesQuoteCore.note = $("[name='note']").val().trim() ? $("[name='note']").val().trim() : null;

  postData.append("salesQuoteCore", new Blob([JSON.stringify(salesQuoteCore)], {
    type: "application/json"
  }));

  let salesQuoteGreyClothes = {};
  if (uuid) {
    salesQuoteGreyClothes.salesQuoteCoreUuid = uuid;
    salesQuoteGreyClothes.createSalesQuoteGreyClothes = [];
    salesQuoteGreyClothes.updateSalesQuoteGreyClothes = [];
    salesQuoteGreyClothes.deleteSalesQuoteGreyClothes = deleteSalesQuoteGreyClothUuids;
  } else {
    salesQuoteGreyClothes.salesQuoteGreyClothes = [];
  }

  $("#detail tbody tr[name='detailList']").each(function () {
    if ($(this).find("[name='editable']").siblings('span').first().html() === 'false') {
      return;
    }
    let obj = {};
    obj.clothCore = $(this).find("[name='clothCore']").val();
    obj.clothCost = $(this).find("[name='clothCost']").text();
    obj.profit = $(this).find("[name='profit']").val();
    obj.clothQuote = $(this).find("[name='clothQuote']").val();
    obj.expectDeliverDays = $(this).find("[name='expectDeliverDays']").val();
    obj.minimumOrderLength = $(this).find("[name='minimumOrderLength']").val();
    obj.note = $(this).find("[name='note']").val().trim() ? $(this).find("[name='note']").val().trim() : null;
    if (uuid) {
      obj.salesQuoteGreyClothUuid = $(this).find("[name='salesQuoteGreyClothUuid']").val();
      $(this).find("[name='salesQuoteGreyClothUuid']").val() ? salesQuoteGreyClothes.updateSalesQuoteGreyClothes.push(obj) : salesQuoteGreyClothes.createSalesQuoteGreyClothes.push(obj)
    } else {
      salesQuoteGreyClothes.salesQuoteGreyClothes.push(obj);
    }
  });

  postData.append("salesQuoteGreyClothes", new Blob([JSON.stringify(salesQuoteGreyClothes)], {
    type: "application/json"
  }));

  if (fw_FileUpload) {
    var attachDetail = fw_formData.response.attachment;
    var attachments = {
      "relateUuid": (uuid.length) ? uuid : "0",
      "attachmentCoreUuid": attachDetail.attachmentCoreUuid,
      "verifyToken": (attachDetail.verifyToken) ? attachDetail.verifyToken : "0",
      "deleteFiles": fw_deletedFiles
    }
    if (fw_uploadFiles.length) {
      $("#fileupload .theprogress > .progress").show();
      $(window).scrollTop($("#fileupload").offset().top - 100);
      postData.append("attachment", new Blob([JSON.stringify(attachments)], {
        type: "application/json"
      }));
      for (i in fw_uploadFiles) {
        postData.append("uploadFiles", fw_uploadFiles[i].file);
        showUploadProgress(fw_uploadFiles[i]);
      }
    } else {
      if (fw_FileUpload.afterUpload) {
        eval(fw_FileUpload.afterUpload + "()");
      }
    }
  } //fw_FileUpload

  return postData;
}

/*重置聯絡人*/
function resetContact() {
  $("input[name='contact']").closest(".box_inputdata").remove();
  $("input[name='client']").closest(".box_inputdata").after(contactHeaderTemplate);
  $("input[name='contact']").prop("disabled", false);
}

/*布號下拉式選單*/
async function setClothDropdownList(selector, value, text) {
  await setDropDownListUI(selector, clothCoreData, value, text);
  let clothUuid;
  selector.data("kendoDropDownList").bind("change", function (e) {
    clothUuid = this.value();
    getClothCost(clothUuid, selector);
  });
  if (value) {
    getClothCost(value);
  }
}

/*建立胚價成本彈跳視窗*/
function createClothCostWindow() {
  clothCostWindow = $("#clothCostWindow").kendoWindow({
    modal: true,
    width: "80%",
    height: 'auto',
    resizable: false,
    visible: false,
  }).data('kendoWindow');
  $("#clothCostWindow").before("<button class='close'><i class='fa fa-times'></i></button>");
}

/*胚價成本彈跳視窗控制器*/
function clothCostWindowController() {
  $('#detail').on('click', '[name="clothCost"]', function () {
    showClothCostWindow($(this).parents("tr").find("input[name='clothCore']").val());
  });

  $(".close").click(function () {
    clothCostWindow.close();
  });

  $('#clothCostWindow').on('click', "a[name='inquiryClothCost']", function () {
    let yarnInquiryObjects = [];
    let object = {};
    object.uuid = $(this).parents("tr").find("span[name='yarnCoreUuid']").text();
    object.warpWeft = $(this).parents("tr").find("span[name='warpWeft']").text();
    yarnInquiryObjects.push(object);
    openYarnInquiry(yarnInquiryObjects);
  });

  $('#clothCostWindow').on('click', "a[name='inquiryAll']", function () {
    let yarnInquiryObjects = [];
    $.each($(this).parents("tbody").find("a[name='inquiryClothCost']"), function (index, value) {
      let selector = $(value).parents("tr");
      let object = {};
      object.uuid = $(this).parents("tr").find("span[name='yarnCoreUuid']").text();
      object.warpWeft = selector.find("span[name='warpWeft']").text();
      yarnInquiryObjects.push(object);
    });
    openYarnInquiry(yarnInquiryObjects);
  });
}

/*顯示並設定胚價成本彈跳視窗*/
function showClothCostWindow(clothUuid) {
  let data = clothCostObject[clothUuid];
  let temp = kendo.template($("#clothCostTable").html());
  let isSalesPriceUnNull = true;
  let isNeedInquiryAll = 0;

  $("#clothCostWindow").find(".row").empty();
  $("#clothCostWindow").find(".row").append(temp(data));
  $.each(data.salesQuoteGreyClothGetClothYarnGrid.contents, function (index, item) {
    if (!item.salesPrice) {
      isNeedInquiryAll++;
      let salesPriceParentView = $("#clothCostWindow").find("#salesPrice_" + index).parent();
      salesPriceParentView.empty();
      salesPriceParentView.append(`<a href="javascript:void(0)" name="inquiryClothCost" class="btn_upload table_btn_status" style="width: 100%;padding: .2em 0em;">詢價</a>`);
      isSalesPriceUnNull = false;
    }
  });
  if (isNeedInquiryAll > 1) {
    $("#inquirtyAll").append(`<a href="javascript:void(0)" name="inquiryAll" class="btn_upload table_btn_status" style="margin-left:10px">詢價全部</a>`);
  }
  if (!isSalesPriceUnNull) {
    $("#clothCostWindow").find("span[name='totalCost']").before(`<i class="fa fa-question-circle-o" aria-hidden="true"></i> &nbsp`);
  }

  clothCostWindow.open();
  clothCostWindow.center();
}

function openYarnInquiry(yarnInquiryObject) {
  window.localStorage.setItem("yarnInquiry", JSON.stringify(yarnInquiryObject));
  window.open('/page/yarn/inquiry/form', '_blank');
}

function getClothCost(clothUuid, selector) {
  $.ajax({
    url: rootApi + "/cloth/cost/" + clothUuid,
    method: "GET",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      if (data.status) {
        let isComplete = true;
        clothCostObject[clothUuid] = data.response;
        $.each(data.response.salesQuoteGreyClothGetClothYarnGrid.contents, function (index, item) {
          if (!item["salesPrice"]) {
            isComplete = false;
          }
        });
        if (selector) {
          if (isComplete) {
            let clothCost = data.response.salesQuoteGreyClothGetClothCostView.totalCost.value;
            selector.parents("tr").find("a[name='clothCost']").text(clothCost);
          } else {
            selector.parents("tr").find("a[name='clothCost']").text("--");
          }
          selector.parents("tr").find("a[name='clothCost']").parent().css("vertical-align", "middle");
        }
      }
    } // end of ajax success
  }); //end of ajax
}

function signatureStartEnd(selector, buttonTypeValue) {
  let postData = new FormData();
  let signature = {};

  signature.salesQuoteGreyClothUuid = selector.parents("tr").find("input[name='salesQuoteGreyClothUuid']").val();
  signature.status = buttonTypeValue;

  postData.append("signature", new Blob([JSON.stringify(signature)], {
    type: "application/json"
  }));

  let method;
  switch (buttonTypeValue) {
    case "0":
      method = "PUT";
      break;
    case "1":
      method = "DELETE";
      break;
    case "2":
      method = "POST";
      break;
    case "3":
      method = "POST";
      break;
  }

  $.ajax({
    url: rootApi + "/signature",
    data: postData,
    method: method,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      if (data.status) {
        fw_notification.show({}, "saveOrInsert");

        setNoificationPosition();
        setTimeout(function () {
          $(".drawCheck").hide().delay(460).queue(function () {
            location.reload();
            $(this).dequeue();
          });
        }, 1000);
      }
    } // end of ajax success
  }); //end of ajax
}
