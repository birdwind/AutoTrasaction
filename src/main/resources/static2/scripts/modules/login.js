$(function () {
  var Msg = $(".loadingIcon").kendoNotification({
    templates: [{
      type: "loginNotification",
      template: "<div class='loginNotification zoominTrans'><div class='loadingMessage'><h1>登入中</h1></div><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div>"
    }],
    appendTo: "#window",
    autoHideAfter: 10000000,
  }).data("kendoNotification");
  $(".nav.navbar-nav > li:not(:first-child)").remove();
  let token = $("meta[name='_csrf']").attr("content");

  let username, password;
  $("#clear").click(function () {
    $(".form-signin input").val("");
  }) //clear

  $("body").keydown(function (event) {
    var key = event.which || event.keyCode;
    if (key == 13) {
      $('#submit').trigger("click");
    }
  })
  $('#submit').click(function () {

    $(".loadingIcon").show();
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");

    username = 'wayson_admin';
    password = '123';

    if ($("#username").val().trim().length || $("#username").val().trim().length) {
      username = $("#username").val();
      password = $("#password").val();
    }
    login(username, password, token);
    $(".loadingIcon").data("kendoNotification").show({}, "loginNotification");
  }); //submit

}); //$(function

function login(username, password, token) {
  $.ajax({
    method: "POST",
    url: "/login",
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    headers: {
      header: token
    },
    data: {
      username: username,
      password: password
    },
    success: function (response) {
      $(".waitaSec").removeClass("waitaSec");
      if (!response.status) {
        $("#password").errorMsg({
          message: response.response
        });
        $("#username").errorMsg({
          message: response.response
        });
        $("#password").siblings(".errorMsg").text(response.response);
      } else {
        console.log("success");
        console.log(response);
        window.location.replace("/");
      }
    },
    error: function (jqXHR, exception) {
      $(".waitaSec").removeClass("waitaSec");
      console.log("error");
      console.log(jqXHR, exception);
      alert("帳號或密碼錯誤");
    }
  });
} //login
