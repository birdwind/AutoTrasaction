//宣告全域變數
var center = {};
var lastCenter = {};
var ipCenter = {"lng": 0, "lat": 0, "num": 15, "nation": "", "countryCode": ""};
var ipCenter2 = {};
var theMarker = {};
var markerMessage = "";

//  等document ready 完再做的事
window.onload = function () {
  // 設定左方選單目前開啟的頁面
  functionTreeExpand();
  center = Object.assign({}, ipCenter);
  lastCenter = Object.assign({}, ipCenter);
  lastCenter = lastCenterCheck(lastCenter, ipCenter, ipCenter2);
  // 防止沒有nationCode
  if (!lastCenter["nation"].includes("(")) {
    lastCenter["nation"] = `${lastCenter["nation"]} (${lastCenter["countryCode"]})`
  }
  $("#nation").data("kendoComboBox").value(lastCenter["nation"]);
};

$(function () {
  [ipCenter, ipCenter2] = getCurrentPosition();

  //  瀏覽足跡
  breadcrumbContent = getBreadcrumbHTML();
  $("#breadcrumb").html(breadcrumbContent);

  //倒數三秒跳回前一頁秒數
  let countDown = 3;
  let backURL = '/member';
  $('#formTitle,.modal-title').text(i18n.ui.member.memberCreator);

  //設定modal 倒數秒數回前頁方塊
  $('.modal-body').html(getModalHTML(countDown, "create"));
  $('#modal').on('hidden.bs.modal', function () {
    location.replace(backURL);
  });
  //  產生表格欄位
  let textFieldsHTML = '';
  let textFields = ["name", "confirmPassword", "phone", "mobile", "department", "subDepartment", "title", "nation", "fax", "contact", "contactPhone", "contactMail", "isPending", "isMember", "status"];
  let emailFields = ["email"];
  let systemGenerateFields = ["memberNo", "username", "password"];
  let addressFields = ["address"];

  $.each(memberCreateView, function (index, value) {
    if (value === null)
      return;
    // 判斷是否為必填欄位
    let required = (value.required) ? 'required' : '';
    value.value = undefined2null(value.value);
    if (emailFields.includes(index)) {
      textFieldsHTML += getTemplate(required, index, value, getEmailTemp())
    } else if (systemGenerateFields.includes(index)) {
      textFieldsHTML += getTemplate(required, index, value, getSystemGenerateTemp())
    } else if (addressFields.includes(index)) {
      textFieldsHTML += getTemplate(required, index, value);
      textFieldsHTML += getLocationTemp();
    } else if (textFields.includes(index)) {
      textFieldsHTML += getTemplate(required, index, value)
    }
  }); // end of $.each(memberCreateView)

  // 返回列表與儲存送出按鈕
  textFieldsHTML += getButtonTemp();

  // 將彙整好的HTML寫入表單
  $('#memberCreateForm').html(textFieldsHTML);
  $('.btn-back').on('click', function () {
    location.replace(backURL);
  });

  $(".systemGenerateBtn").on("click", async function () {
    let nearInput = $(this).parents('.form-group').find('input')[0];
    let nextNearInput = $(this).parents('.form-group').next().find('input')[0];
    let nearInputId = nearInput.id;

    $(nearInput).removeClass('k-invalid');
    $(nearInput).parent().find('.k-invalid-msg').css("display", "none");
    if (this.checked) {
      let hash = await systemGenerate(nearInputId);
      nearInput.value = hash;
      if (nearInputId === "password") {
        nextNearInput.value = hash;
        $(nextNearInput).removeClass('k-invalid');
        $(nextNearInput).parent().find('.k-invalid-msg').css("display", "none");
      }
    } else {
      nearInput.value = "";
      if (nearInputId === "password") {
        nextNearInput.value = "";
      }
    }
  });

  $("#memberNo,#username").on('input', function () {
    $(this).parents('.form-group').find('.systemGenerateBtn')[0].checked = 0;
  });

  $("#password,#confirmPassword").on('input', function () {
    $("#password").parents('.form-group').find('.systemGenerateBtn')[0].checked = 0;
  });

  $("#isVerify").on("click", function () {
    let nearInput = $(this).parents('.form-group').find('input')[0];
    if (this.checked) {
      $(nearInput).attr("required", true);
    } else {
      $(nearInput).attr("required", false);
    }
  });

  [nationDataSource, ipCenter] = getNationDataSource(ipCenter);
  $("#nation").kendoComboBox({
    filter: "contains",
    dataTextField: "name",
    dataValueField: "name",
    dataSource: nationDataSource,
  });

  $("#mapWindow").kendoWindow({
    width: "80vw",
    height: "80vh",
    title: "Address Location Map",
    visible: false,
  }).data("kendoWindow");

  $("#mapWindow").append($("<div/>").attr("id", "mapId"));
  let map = L.map('mapId');

  $("#addressBtn").on("click", function () {
    //  清除上次點擊時殘留的marker
    if (theMarker != undefined) {
      map.removeLayer(theMarker);
    }
    //  用kendo window 開啟視窗
    $("#mapWindow").data("kendoWindow").center().open();

    //  設定經緯度以及放大倍率
    map.setView([lastCenter["lat"], lastCenter["lng"]], lastCenter["num"]);
    //  設定圖資來源
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    //  將marker定位到地圖上
    theMarker = markerDisplay(map, lastCenter);
  });

  map.on('click', function (e) {
    //  清除上次點擊時的marker
    if (theMarker != undefined) {
      map.removeLayer(theMarker);
    }
    center["lat"] = Math.round(e.latlng.lat * 10000) / 10000;
    center["lng"] = Math.round(e.latlng.lng * 10000) / 10000;
    //  將marker定位到地圖上
    theMarker = markerDisplay(map, center);
  });//end of map.on('click')

  $("#locationDeleted").on("click", function () {
    $("#locationChecked")[0].hidden = 1;
    $("#locationField")[0].hidden = 1;
    $("#addressLocation").html("");
    center = Object.assign({}, ipCenter);
    lastCenter = Object.assign({}, ipCenter);
  });

  $("#isPending").kendoDropDownList({
    filter: "",
    dataSource: [
      {text: i18n.memberAuth.member.isPending1, value: 1},
      {text: i18n.memberAuth.member.isPending0, value: 0},
      {text: i18n.memberAuth.member.isPending_1, value: -1},
    ],
    dataTextField: "text",
    dataValueField: "value",
    value: 1
  });

  $("#isMember").kendoDropDownList({
    filter: "",
    dataSource: [
      {text: i18n.memberAuth.member.isMember1, value: 1},
      {text: i18n.memberAuth.member.isMember0, value: 0},
    ],
    dataTextField: "text",
    dataValueField: "value",
    value: 1
  });

  $("#status").kendoDropDownList({
    filter: "",
    dataSource: [
      {text: i18n.memberAuth.member.status1, value: 1},
      {text: i18n.memberAuth.member.status0, value: 0},
    ],
    dataTextField: "text",
    dataValueField: "value",
    value: 1
  });
  // 清除後端給的type error 
  $("input").on('input', function () {
    $('this').parent().find('.errorIcon').css('display', 'none');
    $('this').parent().find('.k-invalid-msg').css('display', 'none');
  });
  // 按下送出按鈕後，表單會送至後台並作驗證
  $('#save').on("click", function (event) {
    event.preventDefault();
    let that = this;
    $(this).prop('disabled', true);

    let validator = $("#memberCreateForm").kendoValidator({
      errorTemplate: getErrorTemplate()
    }).data("kendoValidator");

    if (!validator.validate()) {
      $("form").effect("shake");
      $(that).prop('disabled', false);
      return;
    }
    let data = {
      "lat": center['lat'] + "",
      "lng": center['lng'] + "",
      "isVerify": +$('#isVerify')[0].checked ? 0 : -1,
    };
    // 取得memberCreateForm表單中的所有欄位的值，放入detail物件中

    $('#memberCreateForm input[type="text"]').each(function () {
      let key = $(this).attr("name");
      let value = $(this).val();
      if (key !== undefined)
        data[key] = value.trim() == "" ? null : value.trim();
    });
    delete data.nation_input;
    data.isPending = parseInt(data.isPending);
    data.isMember = parseInt(data.isMember);
    data.status = parseInt(data.status);
    // 送出表單至server
    $.ajax({
      url: '/member/create/',
      data: JSON.stringify(data),
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      complete: function () {
        $(that).prop('disabled', false);
      },
      success: function (response) {
        console.log("success", response);
        if (!response) {
          //  新增成功跳出提示框，倒數3秒後跳轉回列表
          let i = countDown;
          setInterval(function () {
            (!i) ? (location.replace(backURL)) : ($('#countDown').text(--i));
          }, 975);
          $('#modal').modal('show');
        } else {
          // 若表單內容格是不正確則顯示錯誤提示
          $.each(response, function (index, value) {
            let currentFieldId = "#" + value.field;
            $(currentFieldId).removeClass('k-valid').addClass('k-invalid');
            $(currentFieldId).parent().append(getErrorTypeTemplate(value.field, value.message));
            $("form").effect("shake");
          });
          $(that).prop('disabled', false);
        }
      }, // end of ajax success
      error: function (error) {
        console.log("error", error)
      }
    }); // end of ajax
  }); // end of $('#save').click()
}); // end of document ready function

function markerDisplay(map, center) {
  markerMessage = getMarkerMessage(center);
  theMarker = L.marker([center["lat"], center["lng"]]).addTo(map)
    .bindPopup(markerMessage)
    .openPopup();
  return theMarker
}

function confirmLocation(event) {
  $("#locationField")[0].hidden = 0;
  $("#locationChecked")[0].hidden = 0;
  writeLocation();
  //  紀錄當前變更位置以便下次使用
  lastCenter = Object.assign({}, center);
  $("#mapWindow").data("kendoWindow").close();
}

function cancelLocation() {
  center = Object.assign({}, lastCenter);
  $("#mapWindow").data("kendoWindow").close();
}

function writeLocation() {
  let addressLocationHTML = getLatLngHTML(center);
  $("#addressLocation").html(addressLocationHTML);
  $("#addressLocation").position({
    my: "left",
    at: "right",
    of: "#addressBtn"
  });
}
