var filter, mainCore = {},
  detailRequired = [];
var deleteMemberDetails = [];
var departmentData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/member/department/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
var companyData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/member/company/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
var jobTitleCompany = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/member/job/title/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
$(async function () {
  passwordBox = $("#password_confirmBox").kendoWindow({
    modal: true,
    width: "32%",
    height: '320px',
    resizable: false,
    visible: false,
    open: function () {
      $("body").addClass("overlay");
    },
    close: function () {
      $("body").removeClass("overlay");
    }
  }).data('kendoWindow'); //kendoWidow

  $("#password_confirmBox .confirmBtn button").click(function () {
    $(".errorMsg").text("");
    $(".invalidInput").removeClass("invalidInput");
    $(this).delay(0).queue(function () {
      confirmRePassWord();
      $(this).dequeue();
    }).delay(1500).queue(function () {
      passwordBox.close();
      $(this).dequeue();
    })
  }) //comfirm delete

  $("#password_confirmBox .cancelBtn button").click(function () {
    $(this).delay(100).queue(function () {
      $(".errorMsg").text("");
      $(".invalidInput").removeClass("invalidInput");
      passwordBox.close();
      $(this).dequeue();
    })
  }) //cancel

  await $("#form").formWizard({
    id: "memberCoreUuid",
    url: "/api/member/template/" + uuid,
    mainData: "response.memberCore",
    noData: "findnodata",
    customizeForm: "customizeForm",
    fileUpload: true
    // {
    //   afterUpload: "afterUpload"
    // }
  }); //formWizard

  $(".box_features").draggable({
    axis: "y"
  });

  $(".box_features > .right").click(function () {
    $(this).parent().css("left", "auto").animate({
      right: "-160px"
    }).delay(100).queue(function () {
      $(this).find(".left").fadeIn(100);
      $(this).dequeue();
    });
  })
  $("body").on("click", ".rePassword", function () {
    rePasswordUuid = $(this).val();
    passwordBox.open();
    passwordBox.center();
  });

  $("body").on("click", "#addBtn", function () {

    if ($(".detailBox").length > 1) {
      $("#form").find(".detailTreeview").append(' <div class="box box-success" style="border-top-color: #337ab7;"></div>')
    }
    $("#form").find(".detailTreeview").append($("#details").find(".detailTreeview").html());
    if ($(".detailBox").length > 2) {
      $(".delDetialBtn").show();
    }
    $("input[name='companyCore']").kendoDropDownList({
      dataSource: companyData,
      dataTextField: "text",
      dataValueField: "value",
      filter: "contains",
      optionLabel: " ",
      noDataTemplate: "<span class='nodata'>查無資料</span>"
    }); //companyCoreDropDownList

    $("input[name='department']").kendoDropDownList({
      dataSource: departmentData,
      dataTextField: "text",
      dataValueField: "value",
      filter: "contains",
      optionLabel: " ",
      noDataTemplate: "<span class='nodata'>查無資料</span>"
    }); //departmentDropDownList
    $("input[name='jobTitle']").kendoDropDownList({
      dataSource: jobTitleCompany,
      dataTextField: "text",
      dataValueField: "value",
      filter: "contains",
      optionLabel: " ",
      noDataTemplate: "<span class='nodata'>查無資料</span>"
    }); //jobTitleDropDownList
    // $(".memberDetails").addClass("box-body");
  });
  $("body").on("click", ".delDetialBtn", function () {
    deleteMemberDetails.push($(this).closest(".deleteBtnDiv").next().find("input[name='memberDetailUuid']").val());
    console.log($(this).closest(".deleteBtnDiv").next().find("input[name='memberDetailUuid']").val());
    $(this).closest(".treeview").find(".box-success").first().remove();
    $(this).closest(".deleteBtnDiv").next().remove();
    $(this).closest(".deleteBtnDiv").remove();
    if ($(".detailBox").length < 3) {
      $(".delDetialBtn").hide();
    }

    // $(".memberDetails").addClass("box-body");
  });
  $(".box_features > .left").click(function () {
    $(this).hide().parent().css("left", "auto").animate({
      right: "-10px"
    }).delay(100).queue(function () {
      $(this).find(".left").hide();
      $(this).dequeue();
    });
  }) //left
  $("body").on("click", ".loginCheck", function () {

    if ($(this).val() == 0) {
      $(this).val(1);
    } else {
      $(this).val(0);
    }

    // $(".memberDetails").addClass("box-body");
  });

  $("#save").click(function () {

    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var postData = $("#form").formCheck({
      name: "memberCore",
      dataProccessing: "memberCore",
      otherCheck: [
        "memberDetails"
      ]
    });

    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    var attachDetail = fw_formData.response.attachment;
    var attachments = {
      "relateUuid": (uuid.length) ? uuid : "0",
      "attachmentCoreUuid": attachDetail.attachmentCoreUuid,
      "verifyToken": (attachDetail.verifyToken) ? attachDetail.verifyToken : "0",
      "deleteFiles": fw_deletedFiles
    }
    postData.append("attachment", new Blob([JSON.stringify(attachments)], {
      type: "application/json"
    }));
    $.ajax({
      url: "/api/member/",
      data: postData,
      method: (uuid.length) ? "POST" : "PUT",
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
            if (verification() != 0) {
              return;
            }
          }
        } else {
          fw_notification.show({}, "saveOrInsert");
          setNoificationPosition();
          setTimeout(function () {
            $(".drawCheck").hide().delay(460).queue(function () {
              // location = "/page/member/";
              $(this).dequeue();
            });
          }, 1000);
        }
      } // end of ajax success
    }); //end of ajax
  }) //end of save
}) //$(function ()

function findnodata() {
  $("html").remove();
  location.replace("/page/member/");
} //findnodata

async function customizeForm() {
  if (uuid) {
    $("#form").find("input[name='password']").remove();
    $("#form").find("input[name='confirmPassword']").remove();
  }
  if (fw_formData.response.memberCore.memberNo.value == "") {
    $("input[name='memberNo']").val(0);
  }
  if (fw_formData.response.memberCore.isMember.value == true) {
    $("[name='isMember']").attr("checked", "checked")
    $("[name='isMember']").val(0);
  }


  if (uuid) {
    $("input[name='username']").siblings(".labelText").css("width", "75%");
    $("input[name='memberNo']").siblings(".labelText").css("width", "75%");
    $("input[name='memberNo']").css("width", "75%");
    $("input[name='memberNo']").after($("#passWordBtnTemplate").html());
  }


  $("input[name='username']").css("width", "75%");
  $("input[name='username']").after($("#checkboxTemplate").html());
  // $("textarea[name='note']").closest(".box_inputdata").before('<div id="memberDetails" class="box-Details"></div>')

  $(".memberDetails").createForm({
    data: fw_formData.response.memberDetails[0]
  });
  $(".memberDetails").append("<input type='text' name='memberDetailUuid' class='form-control' style='display: none' value='" + fw_formData.response.memberDetails[0].memberDetailUuid + "'>");

  $("textarea[name='note']").closest(".box_inputdata").before($("#details").html());

  for (memberDetailsIndex in fw_formData.response.memberDetails) {
    if (memberDetailsIndex == 0) continue;
    $("#details .memberDetails").createForm({
      data: fw_formData.response.memberDetails[memberDetailsIndex]
    });
    $("#details .memberDetails").append("<input type='text' name='memberDetailUuid' class='form-control' style='display: none'>");
    $("#details .memberDetails").find("input[name='memberDetailUuid']").attr("value", fw_formData.response.memberDetails[memberDetailsIndex].memberDetailUuid);
    console.log($("#details .memberDetails").find("input[name='memberDetailUuid']").val());
    if ($(".detailBox").length > 1) {
      $("#form").find(".detailTreeview").append(' <div class="box box-success" style="border-top-color: #337ab7;"></div>')
    }
    $("#form").find(".detailTreeview").append($("#details").find(".detailTreeview").html());
    if ($(".detailBox").length > 2) {
      $(".delDetialBtn").show();
    }
    $("#details .memberDetails").find("input").attr("value", "");
  }

  $("input[name='companyCore']").kendoDropDownList({
    dataSource: companyData,
    dataTextField: "text",
    dataValueField: "value",
    filter: "contains",
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  }); //companyCoreDropDownList

  $("input[name='department']").kendoDropDownList({
    dataSource: departmentData,
    dataTextField: "text",
    dataValueField: "value",
    filter: "contains",
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  }); //departmentDropDownList
  $("input[name='jobTitle']").kendoDropDownList({
    dataSource: jobTitleCompany,
    dataTextField: "text",
    dataValueField: "value",
    filter: "contains",
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  }); //jobTitleDropDownList
  $(".box-success>.box_inputdata").parent().css("margin-bottom", "40px");
  $(".box-success>.box_inputdata").wrap("<div class='box-body'></div>");
} //customizeForm

function memberCore(obj, form) {
  if ($("#form").find(".loginCheck").val() == 0) {
    form["isMember"] = true;
  } else {
    form["isMember"] = false;
  }
  // form["memberNo"] = (fw_formData.response.memberCore.memberNo.value != "") ? fw_formData.response.memberCore.memberNo.value : 0;
  return form;

} //yarnPurchase

function memberDetails() {
  var memberDetails = new Object();
  let counter = 0;
  memberDetails["memberCoreUuid"] = (fw_formData.response.memberCore.memberCoreUuid) ? fw_formData.response.memberCore.memberCoreUuid : 0;
  memberDetails["memberDetails"] = [];
  memberDetails["memberDetailsUpdate"] = [];
  memberDetails["memberDetailsDelete"] = deleteMemberDetails;

  $("#form").find(".detailTreeview").find(".memberDetails").each(function () {
    let obj = {};
    obj.memberDetailUuid = $(this).find("[name='memberDetailUuid']").val().trim() ? $(this).find("[name='memberDetailUuid']").val().trim() : "0";
    obj.emailAddition = $(this).find("[name='emailAddition']").val().trim();
    obj.phone = ($(this).find("[name='phone']").val().trim().length) ? Number($(this).find("[name='phone']").val()) : null;
    obj.mobile = ($(this).find("[name='mobile']").val().trim().length) ? Number($(this).find("[name='mobile']").val()) : null;
    obj.fax = ($(this).find("[name='fax']").val().trim().length) ? Number($(this).find("[name='fax']").val()) : null;
    obj.address = ($(this).find("[name='address']").val().trim().length) ? ($(this).find("[name='address']").val()) : null;
    obj.companyCore = ($(this).find("[name='companyCore']").val()) ? ($(this).find("[name='companyCore']").val()) : null;
    obj.department = ($(this).find("[name='department']").val()) ? ($(this).find("[name='department']").val()) : null;
    obj.jobTitle = ($(this).find("[name='jobTitle']").val().trim().length) ? $(this).find("[name='jobTitle']").val().trim() : null;
    obj.contact = ($(this).find("[name='contact']").val().trim().length) ? $(this).find("[name='contact']").val().trim() : null;
    obj.contactPhone = ($(this).find("[name='contactPhone']").val().trim().length) ? Number($(this).find("[name='contactPhone']").val().trim()) : null;
    obj.contactEmail = ($(this).find("[name='contactEmail']").val().trim().length) ? $(this).find("[name='contactEmail']").val().trim() : null;
    obj.memberDetailUuid == "0" ? memberDetails["memberDetails"].push(obj) : memberDetails["memberDetailsUpdate"].push(obj);
  }); //endo fo each
  return memberDetails;
} //yarnPurchaseDetails

function verification() {
  var hasError = 0;
  var detail = fw_formData.response.memberDetails[0];

  // 寄送Email驗證
  $("[name='emailAddition']").each(function () {
    if ($(this).val() == "") {
      $(this).errorMsg({
        message: "請輸入" + detail.emailAddition.title + "!"
      });
      hasError = 1;
    } else if ($(this).val() != "" && !checkEmail($(this).val())) {
      $(this).errorMsg({
        message: "Email格式不正確!"
      });
      hasError = 1;
    }
  });
  $("[name='contactEmail']").each(function () {
    if ($(this).val() == "") {
      $(this).errorMsg({
        message: "請輸入" + detail.contactEmail.title + "!"
      });
      hasError = 1;
    } else if ($(this).val() != "" && !checkEmail($(this).val())) {
      $(this).errorMsg({
        message: "Email格式不正確!"
      });
      hasError = 1;
    }
  });

  return hasError;
}

// function afterUpload() {}

function confirmRePassWord() {
  var postData = new FormData();
  postData.append("password", new Blob([JSON.stringify({
    "memberCoreUuid": uuid,
    "password": ($("#password_confirmBox").find("[name='password']").val().trim().length) ? ($("#password_confirmBox").find("[name='password']").val()) : null,
    "confirmPassword": ($("#password_confirmBox").find("[name='confirmPassword']").val().trim().length) ? ($("#password_confirmBox").find("[name='confirmPassword']").val()) : null,
  })], {
    type: "application/json"
  }));

  $.ajax({
    url: "/api/member/password/",
    data: postData,
    method: "POST",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      if (!data.status) {
        $("#save").removeClass("waitaSec");
        for (i of data.response) {
          $("input[name='" + i.field + "']").errorMsg({
            message: i.defaultMessage
          });
        }
        $("#password_confirmBox").data("kendoWindow").bind("close", function (e) {
          if ($(".errorMsg").text() != "") {
            e.preventDefault();
          } else {
            $(".errorMsg").text("");
            $(".invalidInput").removeClass("invalidInput");
          }
        });
      } else {
        modifiedNotification.show({}, "saved");
        setNoificationPosition();
        setTimeout(function () {
          $(".drawCheck").hide().delay(460).queue(function () {
            location = "/page/member/";
            $("#password_confirmBox").find("[name='password']").val("");
            $("#password_confirmBox").find("[name='confirmPassword']").val("");
            $(this).dequeue();
          });
        }, 1000);
      }
    } // end of ajax success
  }); //end of ajax
} //confirmDel
