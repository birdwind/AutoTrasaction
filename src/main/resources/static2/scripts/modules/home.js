$(function () {

  $("#user").text(sideMenu.name || "[null]");
  $("#home").css({
    'font-size': '100px',
    'color': '#23483C',
    'text-align': 'center',
    'padding-top': '80px'
  });

  initSiteMap();
  // $(".content-wrapper").css({'background-color': '#79BEA8'});

  $('#btn-save').on('click', function () {
    // 假裝填寫的memberCore 與 memberAddition 資料
    let core = {
      memberNo: "123124",
      username: "qqqq",
      password: $("#password-1").val(),
      confirmPassword: $("#password-2").val(),
      name: $("#name").val(),
      email: "mm@mail.com",
      isMember: 1,
      isPending: 1,
      isVerify: 1,
      status: 1,
      note: " note dfsdafsdf ",
      memberAdditions: [{
        memberAdditionUuid: "0",
        emailAddition: [
          "a1a2@mail.com",
          "w123w@mail.com",
          "wqwew@mail.com",
          "wqeww@mail.com",
          "waqwqhjw@mail.com",
          "awsadfw@mail.com",
          "asdfgqww@mail.com"
        ],
        contactEmail: [
          "gg@mail.com"
        ]
      }, {
        memberAdditionUuid: "0",
        emailAddition: [
          "a1wqefa2@mail.com",
          "wqqw@mail.com"
        ],
        contactEmail: [
          "gwqeg@mail.com",
          "wggggggefwqeqwerfwf@mail.com"
        ]
      }]
    };

    let formData = new FormData();
    formData.append("memberCoreForm", new Blob([JSON.stringify(core)], {
      type: "application/json"
    }));
    $('input[name=files]').each(function (index) {
      formData.append("uploadFiles", this.files[0]);
    });

    $.ajax({
      // Http 方法
      method: "PUT",
      // 忽略 contentType，formData 已經定義好
      contentType: false,
      // 取消序列化，formData 已經序列化
      processData: false,
      // 預期收到的回傳格式
      dataType: "json",
      data: formData,
      url: "/api/member/",
      success: function (response) {
        console.log("success");
        console.log(response);
      },
      error: function (jqXHR, exception) {
        console.log("error");
        console.log(jqXHR, exception);
      }
    });
  });

  function initSiteMap() {
    for (var i in sideMenu.modules) {
      var functions = sideMenu.modules[i].function;
      for (var item in functions) {
        $("[functionKey='" + functions[item].functionKey + "']").removeClass("btn_workflowNoAcl");
        $("[functionKey='" + functions[item].functionKey + "']").addClass("btn_workflow");
        $("[functionKey='" + functions[item].functionKey + "']").attr("href", functions[item].backUrl);
      }
    }
  }

  // $("#").onclick(function () {
  //   console.log(" submit");
  // $.ajax({
  //   method: "PUT",
  //   url: "/api/member/",
  //   contentType: "application/json",
  //   headers: {header: token},
  //   data: {},
  //   success: function (response) {
  //     console.log("success");
  //     console.log(response);
  //   },
  //   error: function (jqXHR, exception) {
  //     console.log("error");
  //     console.log(jqXHR, exception);
  //   }
  // });
  // });
});

//memberNo: "123124",
//         username: "qqqq",
//         password: "123",
//         confirmPassword: "123",
//         name: "usernnn<script>alert(1779)</script>",
//         email: "mm@mail.com",
//         isMember: 1,
//         isPending: 1,
//         isVerify: 1,
//         status: 1,
//         note: " note dfsdafsdf ",
//         memberAdditions: [
//           {
//             memberAdditionUuid: "0",
//             emailAddition: [
//               "a1a2@mail.com",
//               "ww@mail.com"
//             ],
//             contactEmail: [
//               "gg@mail.com",
//               "wefwqeqwerfwf@mail.com"
//             ]
//           }, {
//             memberAdditionUuid: "0",
//             emailAddition: [
//               "a1wqefa2@mail.com",
//               "wqqw@mail.com"
//             ],
//             contactEmail: [
//               "gwqeg@mail.com",
//               "wggggggefwqeqwerfwf@mail.com"
//             ]
//           }
//         ]
