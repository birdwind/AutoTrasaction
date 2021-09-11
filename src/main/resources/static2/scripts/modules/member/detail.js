//宣告全域變數
var center = {
  "lng": memberUpdateView["lng"] ? memberUpdateView["lng"].value : 0,
  "lat": memberUpdateView["lat"] ? memberUpdateView["lat"].value : 0,
  "num": 15,
  "country": memberUpdateView["nation"] ? memberUpdateView["nation"].value : "",
  "countryCode": ""
};
var lastCenter = {};
var ipCenter = {};
var ipCenter2 = {};
var theMarker = {};
var markerMessage = "";

//  等document ready 完再做的事
window.onload = function () {
  // 設定左方選單目前開啟的頁面
  functionTreeExpand();
  lastCenter = Object.assign({}, center);
  lastCenter = lastCenterCheck(lastCenter, ipCenter, ipCenter2);
  if (center["nation"] !== undefined) {
    // 防止沒有nationCode
    if (!center["nation"].includes("(")) {
      center["nation"] = `${center["nation"]} (${center["countryCode"]})`
    }
    $("#nation").data("kendoComboBox").value(center["nation"]);
  }
  center["lat"] = center["lat"] === undefined ? null : center["lat"];
  center["lng"] = center["lng"] === undefined ? null : center["lng"];
};

$(function () {
  // 獲取現在位置
  [ipCenter, ipCenter2] = getCurrentPosition();

  //  瀏覽足跡
  breadcrumbContent = getBreadcrumbHTML();
  $("#breadcrumb").html(breadcrumbContent);

  //倒數三秒跳回前一頁秒數
  let countDown = 3;
  let backURL = '/member';
  $('#formTitle').text(i18n.ui.member.memberModifier);

  //設定modal 倒數秒數回前頁方塊
  $('.modal-body').html(getModalHTML(countDown, "update"));
  $('.modal-title').text(i18n.ui.member.memberModifier);
  $('#modal').on('hidden.bs.modal', function () {
    location.replace(backURL);
  });

  //  產生表格欄位
  let textFieldsHTML = '';
  let textFields = ['name', 'phone', 'mobile', "department", "subDepartment", "title", 'nation', 'fax', 'contact', 'contactPhone', 'contactMail', 'isPending', 'isMember', 'status'];
  let cannotModifiedFields = ['memberNo', 'username'];
  let emailFields = ['email'];
  let addressFields = ['address'];
  $.each(memberUpdateView, function (index, value) {
    if (value === null)
      return;
    // 判斷是否為必填欄位
    let required = (value.required) ? 'required' : '';
    value.value = undefined2null(value.value);
    if (emailFields.includes(index)) {
      textFieldsHTML += getTemplate(required, index, value, getEmailTemp())
    } else if (cannotModifiedFields.includes(index)) {
      textFieldsHTML += getCannotModifiedHTML(required, index, value);
    } else if (addressFields.includes(index)) {
      textFieldsHTML += getTemplate(required, index, value);
      textFieldsHTML += getLocationTemp();
    } else if (textFields.includes(index)) {
      textFieldsHTML += getTemplate(required, index, value)
    }
  }); // end of $.each(fields)

  //  上傳欄位
  textFieldsHTML += getFileuploadHTML();
  //  返回列表與儲存送出按鈕
  textFieldsHTML += getButtonTemp();

  // 將彙整好的HTML寫入表單
  $('#memberDetailForm').html(textFieldsHTML);
  $('.btn-back').on('click', function () {
    location.replace(backURL);
  });

  $("#isVerify").on("click", function () {
    let nearInput = $(this).parents('.form-group').find('input')[0];
    if (this.checked) {
      $(nearInput).attr("required", true).addClass("requiredBorderColor");
    } else {
      $(nearInput).attr("required", false).removeClass("requiredBorderColor");
    }
  });

  [nationDataSource, center] = getNationDataSource(center);
  $("#nation").kendoComboBox({
    filter: "contains",
    dataTextField: "name",
    dataValueField: "name",
    dataSource: nationDataSource,
  });

  $("#mapWindow").kendoWindow({
    width: "80vw",
    height: "80vh",
    title: "Address Map",
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
    center["lng"] = fields["lng"].value;
    center["lat"] = fields["lat"].value;

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
    value: memberUpdateView.isPending.value
  });

  $("#isMember").kendoDropDownList({
    filter: "",
    dataSource: [
      {text: i18n.memberAuth.member.isMember1, value: 1},
      {text: i18n.memberAuth.member.isMember0, value: 0},
    ],
    dataTextField: "text",
    dataValueField: "value",
    value: memberUpdateView.isMember.value
  });

  $("#status").kendoDropDownList({
    filter: "",
    dataSource: [
      {text: i18n.memberAuth.member.status1, value: 1},
      {text: i18n.memberAuth.member.status0, value: 0},
    ],
    dataTextField: "text",
    dataValueField: "value",
    value: memberUpdateView.status.value
  });

  $("#upload").click(function () {
    $("input[name='upload']").trigger("click");
  });

  $("input[name='upload']").change(function (e) {
    $(".fileInfo").htsml("")
    if ($(this)[0].files != undefined) {
      for (i in $(this)[0].files) {
        if (isNaN(i)) {
          continue;
        }
        $("#uploadTemplate .fileName").text($(this)[0].files[i]["name"])
        $("#uploadTemplate section").attr("data-upload", i);
        $(".fileInfo").append($("#uploadTemplate").html());
        fileupload($(this)[0].files[i], i)
      }
    }
  });

  // 按下送出按鈕後，表單會送至後台並作驗證
  $('#save').on("click", function (event) {
    event.preventDefault();
    let that = this;
    $(this).prop('disabled', true);

    let validator = $("#memberDetailForm").kendoValidator({
      errorTemplate: getErrorTemplate()
    }).data("kendoValidator");

    if (!validator.validate()) {
      $("form").effect("shake");
      $(that).prop('disabled', false);
      return;
    }
    let data = {
      "memberNo": memberUpdateView.memberNo.value,
      "lat": center['lat'],
      "lng": center['lng'],
      "isVerify": +$('#isVerify')[0].checked ? 0 : -1,
    };
    // 取得memberDetailForm表單中的所有欄位的值，放入detail物件中
    $('#memberDetailForm input[type="text"]').each(function () {
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
      url: '/member/update/',
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

function fileupload(file, i) {
  if (file["size"] < (1 * 1024 * 1024) && file["type"].search(/(pdf|image)/g) > -1) {
    $(".fileInfo .theprogress[data-upload='" + i + "'] .progress").show();
  } else {
    alert("error");
  }
  var formData = new window.FormData();
  formData.append('id', parseInt(1));
  formData.append('theFile', file);
  $.ajax({
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          percentComplete = parseInt(percentComplete * 100);
          $(".fileInfo .theprogress[data-upload='" + i + "'] .progress-bar").css("width", percentComplete + "%")
          if (percentComplete === 100) {
            $(".fileInfo .theprogress[data-upload='" + i + "'] .progress-bar").delay(700).fadeOut(300).queue(function () {
              $(".fileInfo .theprogress[data-upload='" + i + "']").remove();
              $("#scriptForm ul li[data-upload='" + i + "']").show();
              $(this).dequeue();
            })
          }
        }
      }, false);
      return xhr;
    },
    url: 'https://reqres.in/api/users',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (data) {
      $("input[name='upload']").val("");
      // if(!data["result"]){
      //   var text = $(".fileInfo .theprogress[data-upload='"+i+"']").text();
      //   $(".fileInfo .theprogress[data-upload='"+i+"']")
      //     .text(text + " - " +data["error"].join("嚗�"))
      //     .css("color","red")
      //     .show().delay(2000).fadeOut(1000);
      //   return false;
      // }
      if (data["type"] == "file") {
        $("#fileTemplate button span").text(data["fileName"]);
        $("#fileTemplate button").attr("onclick", "location='" + data["path"] + "'");
        $("#fileTemplate li").attr("data-upload", i)
        $("#files ul").append($("#fileTemplate").html());
        $("#files ul li[data-upload='" + i + "']").attr("data-id", data["id"]);
      } else {
        $("#imgTemplate li div").css("background-image", "url('" + data["path"] + "')");
        $("#imgTemplate li div").attr("href", data["path"]);
        $("#imgTemplate li").attr("data-upload", i);
        $("#images ul").append($("#imgTemplate").html());
        $("#images ul li[data-upload='" + i + "'] div").attr("data-fancybox", "images");
        $("#images ul li[data-upload='" + i + "']").attr("data-id", data["id"]);
      }

      if (!$(".fileInfo .theprogress[data-upload='" + i + "']").length) {
        $("#scriptForm ul li[data-upload='" + i + "']").show();
      }
    }
  });
}// end of fileupload
