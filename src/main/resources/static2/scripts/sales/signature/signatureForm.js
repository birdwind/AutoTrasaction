//TODO: 確定沒用即可刪除(目前沒用到)
let rootApi = "/api/pm/signature/grey";
let backUrl = "/page/sales/signature/grey";

let signatureWindow;
let checkSignatureWindow;
let salesQuoteGreyClothUuid;

let tableHeaderTemplate = `
<th scope="col" style="width:10%;">
    <span></span>
</th>`;

let tableColumnTemplate = `
<td>
  <input class="form-control" type='text'>
  <span class="errorMsg color_pink"></span>
</td>
`;

$(function () {
  $("#form").formWizard({
    id: "salesQuoteCoreUuid",
    url: rootApi + "/template/" + uuid,
    mainData: "response.salesQuoteCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
    fileUpload: false
  });//formWizard
  SetInitPage(true, backUrl);

  baseController();
  createSignatureWindow();
  signatureWindowController();
  createCheckSignatureWindow();
  checkSignatureWindowController();
});

function customizeForm() {
  kendo.ui.progress($("#form"), true);
  let stars = `<div style="display:inline-block">`;
  for (let i = 0; i < 3; i++) {
    stars += (fw_formData.response.salesQuoteCore.closingConfidence.value > i) ?
      `<label class="star"><i class="fa fa-star" style="display: contents"></i></label>` : `<label class="star"><i class="fa fa-star-o" style="display: contents"></i></label>`;
  }
  stars += `</div>`;

  $("input[name='closingConfidence']").parents(".form-group").find("nav").after(stars);
  $("input[name='closingConfidence']").parents(".form-group").find(".labelText").remove();

  //contact
  for (index in fw_formData.response.salesQuoteCore.contacts) {
    let contactDetailTemplate = kendo.template($("#contactDetailTemplate").html());
    $("input[name='client']").closest(".box_inputdata").after(contactDetailTemplate(fw_formData.response.salesQuoteCore.contacts[index]));
    if (index > 0) {
      $($(".contacts")[index]).find("#contactHeader").empty();
    }
  }

  for (let column in fw_formData.response.salesQuoteGreyClothes.header) {
    $("#detail thead tr").append(tableHeaderTemplate);
    let count = $("#detail thead tr th").length;
    let selector = $("#detail thead tr th")[count - 1];
    $(selector).prop("id", column);
    $(selector).find("span").append(fw_formData.response.salesQuoteGreyClothes.header[column].title);
    //detail row
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

  for (let column in fw_formData.response.salesQuoteGreyClothes.contents) {
    addRow(column);
  }

  kendo.ui.progress($("#form"), false);
}

function initColumn(count, column) {
  let detailTemplate = $("#detailTemplate");
  detailTemplate.find("tr").append(tableColumnTemplate);
  let detailSelector = $("#detailTemplate tbody tr td")[count - 1];
  $(detailSelector).find("input").prop("name", column);
  return $(detailSelector);
}

function addRow(column) {
  let detailRowElement = $("#detailTemplate tbody").html();
  $("#detail").find("tbody").append($(detailRowElement));
  for (item in fw_formData.response.salesQuoteGreyClothes.contents[column]) {
    $($("#detail tbody tr")[column]).find("input[name=" + item + "]").after("<span name='" + item + "'>" + fw_formData.response.salesQuoteGreyClothes.contents[column][item] + "</span>");
    $($("#detail tbody tr")[column]).find("input[name=" + item + "]").remove();

    $($("#detail tbody tr")[column]).find("input[name='signatureRecord']").after(`<a href="javascript:void(0)" class="btn_upload table_btn_status checkSignature">查看</a>`);
    $($("#detail tbody tr")[column]).find("input[name='signatureRecord']").remove();

    $($("#detail tbody tr")[column]).find("input[name='signature']").after(`<a href="javascript:void(0)" class="btn_upload table_btn_status signature" >簽核</a>`);
    $($("#detail tbody tr")[column]).find("input[name='signature']").remove();
  }

}


function createSignatureWindow() {
  signatureWindow = $("#signatureWindow").kendoWindow({
    modal: true,
    width: "800px",
    height: 'auto',
    resizable: false,
    visible: false,
    position: {top: 200},
  }).data('kendoWindow');
}

function signatureWindowController() {
  $('#signatureWindow').on('click', '#cancelSignature', function () {
    signatureWindow.close();
  });

  $('#signatureWindow').on('click', '#confirmSignature', function () {
    let postData = new FormData();
    let signature = {};
    signature.salesQuoteSignatureFlowRecordUuid = salesQuoteGreyClothUuid;
    signature.type = type;
    signature.isPassed = $("#signatureWindow").find("input[name='isPassed']:checked").val() == "1" ? true : false;
    signature.note = $("#signatureWindow").find("[name='note']").val() ? $("#signatureWindow").find("[name='note']").val() : null;
    postData.append("signature", new Blob([JSON.stringify(signature)], {
      type: "application/json"
    }));

    $.ajax({
      url: rootApi,
      data: postData,
      method: "PUT",
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
        } else {
          $("#save").removeClass("waitaSec");
          for (i of data.response) {
            $("#signatureWindow [name='" + i.field + "']").errorMsg({
              message: i.defaultMessage
            });
          }
        }
      } // end of ajax success
    }); //end of ajax
    signatureWindow.close();
  });
}

function baseController() {
  $('#detail').on('click', '.signature', function () {
    salesQuoteGreyClothUuid = $(this).parents("tr").find("[name='salesQuoteGreyClothUuid']").text();
    signatureWindow.center();
    signatureWindow.open();
  });

  $('body').on('click', '.k-overlay', function () {
    checkSignatureWindow.close();
  });

  $('#detail').on('click', '.checkSignature', function () {
    let salesQuoteGreyClothUuid = $(this).parents("tr").find("span[name='salesQuoteGreyClothUuid']").text();
    $.ajax({
      url: rootApi + "/record/" + salesQuoteGreyClothUuid,
      method: "GET",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          $.each(data.response, function (index, response) {
            checkSignatureWindowData(index, response);
          });
          checkSignatureWindow.open();
          checkSignatureWindow.center();
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
  });
}

function checkSignatureWindowData(role, data) {
  console.log(role, data);
  let selector;
  switch (role) {
    case 0:
      selector = $("#pm");
      break;
    case 1:
      selector = $("#shopper");
      break;
    case 2:
      selector = $("#manager");
      break;
  }
  selector.find("[name='role'] span").empty();
  selector.find("[name='role'] span").append(data.actualSignaturePerson.value);
  let dateTemp = data.actualSignatureDate.value;
  let isPassed = "";
  if(data.isPassed.value !== null){
    isPassed  = data.isPassed.value ? "通過" : "未通過";
  }
  selector.find("[name='isPassed']").empty();
  selector.find("[name='isPassed']").append(dateTemp + " " + isPassed);
  selector.find("[name='note']").empty();
  selector.find("[name='note']").append(data.note.value);
}

function createCheckSignatureWindow() {
  checkSignatureWindow = $("#checkSignatureWindow").kendoWindow({
    modal: true,
    width: "500px",
    height: 'auto',
    resizable: false,
    visible: false,
  }).data('kendoWindow');
  $("#checkSignatureWindow").before("<button class='close'><i class='fa fa-times'></i></button>");
}

function checkSignatureWindowController() {
  //tab控制
  $(".monitormenu > li").click(function () {
    $(this).parent().children().removeClass("active");
    $(this).addClass("active");
    $(".tabDetail").hide();
    $(`#${$(this).attr("data-section")}`).show();
  });

  $(".close").click(function () {
    checkSignatureWindow.close();
  });
}
