window.onload = function () {
  // 設定左方選單目前開啟的頁面
  functionTreeExpand();
};
$(function () {
  //瀏覽足跡
  breadcrumbContent = getBreadcrumbHTML();
  $("#breadcrumb").html(breadcrumbContent);

  //倒數三秒跳回前一頁秒數
  let countDown = 3;
  let backURL = '/member';
  $('#formTitle,.modal-title').text(i18n.memberAuth.member.changePassword);

  //設定modal 倒數秒數回前頁方塊
  $('.modal-body').html(getModalHTML(countDown));
  $('#modal').on('hidden.bs.modal', function () {
    location.replace(backURL);
  });
  let textFieldsHTML = '';
  let textFields = ["confirmPassword"];
  let systemGenerateFields = ["password"];
  let cannotModifiedFields = ["memberNo"];
  let emailFields = ["email"];

  $.each(changePasswordView, function (index, value) {
    if (value === null)
      return;
    // 判斷是否為必填欄位
    let required = (value.required) ? 'required' : '';
    value.value = undefined2null(value.value);
    if (textFields.includes(index)) {
      textFieldsHTML += getTemplate(required, index, value)
    } else if (cannotModifiedFields.includes(index)) {
      textFieldsHTML += getCannotModifiedHTML(required, index, value);
    } else if (systemGenerateFields.includes(index)) {
      textFieldsHTML += getTemplate(required, index, value, getSystemGenerateTemp())
    } else if (emailFields.includes(index)) {
      textFieldsHTML += getTemplate("", index, value, getSentPasswordTemp())
    }
  }); // end of $.each(fields)
  // 返回列表與儲存送出按鈕
  textFieldsHTML += getButtonTemp();

  // 將彙整好的HTML寫入表單
  $('#changePasswordForm').html(textFieldsHTML);

  $('.btn-back').on('click', function () {
    location.replace(backURL);
  });

  $("#password,#confirmPassword").on('input', function () {
    $("#password").parents('.form-group').find('.systemGenerateBtn')[0].checked = 0;
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
      nextNearInput.value = hash;
      $(nextNearInput).removeClass('k-invalid');
      $(nextNearInput).parent().find('.k-invalid-msg').css("display", "none");
    } else {
      nearInput.value = "";
      nextNearInput.value = "";
    }
  });

  $('#email').attr({disabled: "true", required: false}).val("");

  $("#sentPasswordBtn").on("click", function () {
    let nearInput = $(this).parents('.form-group').find('input')[0];
    if (this.checked) {
      $(nearInput).attr({disabled: false, required: true}).val(changePasswordView.email.value);
    } else {
      $(nearInput).attr({disabled: true, required: false}).val("");
    }
  });

  // 按下送出按鈕後，表單會送至後台並作驗證
  $('#save').on("click", function () {
    event.preventDefault();
    let that = this;
    $(this).prop('disabled', true);

    let validator = $("#changePasswordForm").kendoValidator({
      errorTemplate: getErrorTemplate()
    }).data("kendoValidator");

    if (!validator.validate()) {
      $("form").effect("shake");
      $(that).prop('disabled', false);
      return;
    }
    // 取得changePasswordForm表單中的所有欄位的值，放入data物件中
    let data = {"memberNo": $("#memberNo").text()};
    $('#changePasswordForm input[type="text"]').each(function () {
      let key = $(this).attr("name");
      let value = $(this).val();
      if (key !== undefined)
        data[key] = value.trim() === "" ? null : value.trim();
    });
    // 送出表單至server
    $.ajax({
      url: '/member/changePassword/',
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
});
