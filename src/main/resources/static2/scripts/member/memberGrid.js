var title = {};
var dataUuid = [];
var currentList, availableList;
var listbox, listBoxAPI, listBoxUuid;
var modifiedNotification;
var rePasswordUuid = "";
var passwordBox;
window.localStorage.clear();
let searchKey = null;

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

  $("body").on("click", ".rePassword", function () {
    rePasswordUuid = $(this).val();
    passwordBox.open();
    passwordBox.center();
  });

  var modifiedNotification = $("#notification").kendoNotification({
    templates: [{
        type: "incerted",
        template: "<div class='saveOrInsert zoominTrans'>新增成功</span>" + fw_checkMrak + "</div>"
      },
      {
        type: "saved",
        template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
      }
    ],
    autoHideAfter: 1500
  }).data("kendoNotification");
  var grid = new Grid("/member/", "check", "memberCore", "member");

  currentList = $("#current").kendoListBox({
    dataSource: [],
    dataTextField: "text",
    dataValueField: "value",
    connectWith: "available",
    selectable: "multiple",
    draggable: true,
    dropSources: ["available"],
    toolbar: {
      tools: ["moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom"]
    },
    add: function (e) {
      for (item of e.dataItems) {
        delete deletedItem[item.value];
      }
    },
    remove: function (e) {
      for (item of e.dataItems) {
        if (originItem.find(kv => kv.value == item.value)) {
          deletedItem[item.value] = item.value;
        }
      }
    }
  }).data("kendoListBox");
  availableList = $("#available").kendoListBox({
    dataSource: [],
    dataTextField: "text",
    dataValueField: "value",
    selectable: "multiple",
    draggable: true,
    dropSources: ["current"],
  }).data("kendoListBox");

  listbox = $("#listbox").kendoWindow({
    modal: true,
    width: "40%",
    height: '550px',
    resizable: false,
    visible: false,
    open: function () {
      $("body").addClass("overlay");
    },
    close: function () {
      $("body").removeClass("overlay");
    }
  }).data('kendoWindow');
  $("#listbox").before("<button class='close'><i class='fa fa-times'></i></button>");
  $(".close").click(function () {
    listbox.close();
  }) //List Saving Canceled
  $("#listbox .confirmBtn button").click(function () {
    var type = (listBoxAPI.search("role") > -1) ? "Role" : "Group";
    var data = {
      "memberCoreUuid": listBoxUuid
    }
    data["current" + type] = currentList.dataItems().map(getValue);
    data["delete" + type] = Object.keys(deletedItem);
    var postData = new FormData();
    postData.append("member" + type, new Blob([JSON.stringify(data)], {
      type: "application/json"
    }));
    $.ajax({
      url: listBoxAPI,
      data: postData,
      method: "POST",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        modifiedNotification.show({}, "saved");
        setNoificationPosition();
        setTimeout(function () {
          $(".drawCheck").hide().delay(460).queue(function () {
            listbox.close();
            $(this).dequeue();
          });
        }, 1000);
      } // end of ajax success
    }); //end of ajax
  }) //List Saving Confirmed
  // await grid.initDataSource(aaa.responseJSON.response, aaa.responseJSON.response.contents);
  await grid.initDataSource();
  grid.addColumns("role", "所屬角色", "5%", function (d) {
    return "<a class='number_a' href='javascript:void(0)' onclick='openListBox(\"/api/member/role\",\"" + d.memberCoreUuid + "\",\"" + d.username + "\")'><i class='fa fa-pencil'></i></a>";
  }, );

  grid.addColumns("group", "所屬帳號群組", "10%", function (d) {
    return "<a class='number_a' href='javascript:void(0)' onclick='openListBox(\"/api/member/group\",\"" + d.memberCoreUuid + "\",\"" + d.username + "\")'><i class='fa fa-pencil'></i></a>";
  });

  grid.addColumns("password", "修改密碼", "5%", function (d) {
    return "<button type='button' class='btn btn-success white rePassword' value=" + d.memberCoreUuid + ">修改</button>";
  });

  title = grid.getI18n()
  let filterable = {
    mode: "row",
    messages: {
      info: ""
    },
    operators: {
      string: {
        eq: "完全一致",
        contains: "包含",
      },
      number: {
        lte: "小於等於",
        eq: "等於",
        gte: "大於等於",
      },
      date: {
        gte: "之後",
        lte: "之前",
        eq: "相等",
        between: "選擇間距"
      }
    }
  };

  var kendoData = {
    id: "memberNo",
    fields: {
      memberNo: {
        type: "string",
      },
      name: {
        type: "string",
      },
      username: {
        type: "string",
      }
    }

  }

  await grid.creatKendGrid("#member", filterable);

  $('body').on('click', '.k-checkbox', function () {
    if ($(this).attr('aria-label') == 'Select all rows') {
      var checkStatus = $("#member .k-grid-header .k-checkbox").prop("checked");
      $("#member .k-grid-content .k-checkbox").prop("checked", checkStatus);
      var grid = $("#member").data("kendoGrid");
      var row = $("#member .k-grid-content .k-checkbox")

    }

    $("#trashBin").hide();
    if ($("#member .k-grid-content tbody input:checkbox:checked").length) {
      $("#member .k-grid-header .k-checkbox").prop("checked")
      $("#trashBin").show();
    }

  }) //k-checkbox click
  $("body").append("<span id='notification'></span>");
  notification = $("#notification").kendoNotification({
    templates: [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>" + "刪除成功" + "</span></div>"
    }],
    autoHideAfter: 1500
  }).data("kendoNotification");



  $('body').on('click', '#trashBin', function () {
    fw_confirmBox.init({
      content: $("#confirmTemplate").html(),
      confirmEvent: "confirmDel"
    });
    $("#fw_confirmBox").find(".confirmBtn").find(".circleBtn").text("是");
    $("#fw_confirmBox").find(".cancelBtn").find(".circleBtn").text("否");
    if (!$("#member .k-grid-content tbody input:checkbox:checked").length) {
      return false;
    }
    $(".errorMsg").text("");
    $(".invalidInput").removeClass("invalidInput");
    fw_confirmBox.show();
  })
  // $('body').on('click', "#fw_confirmBox .confirmBtn button", function () {
  //   $(".errorMsg").text("");
  // }) //comfirm delete

  $('body').on('click', "#fw_confirmBox .cancelBtn button", function () {
    $(".errorMsg").text("");
    $(".invalidInput").removeClass("invalidInput");
    $("#fw_confirmBox").data("kendoWindow").close();
    $(this).dequeue();
    // $(this).delay(1500);

  }) //cancel

  // $('body').on('click', '.search > .clear', function () {
  //   $(".search input").val("").trigger("input");
  // })
}) //$(function ()
function getValue(obj) {
  return obj.value
}

function openListBox(api, uuid, username) {
  let listUsername = username;
  listBoxAPI = api;
  listBoxUuid = uuid;
  deletedItem = {};
  var type = (listBoxAPI.search("role") > -1) ? "角色" : "群組";
  $("#listbox .row.title > div:eq(0) > b").text("所屬" + type);
  $("#listbox .userName > b").text("編輯帳號: " + listUsername);
  if ($("#currentSearch").length == 0) {

    $("#current").siblings(".k-list-scroller").before('<div class="form-label-group"><input id="currentSearch" class="form-control" autocomplete="off" placeholder="尋找.." style="width:70%;height:5%" class="k-textbox" /> <label class="k-icon k-i-search"></label> </div>');
    $("#available").siblings(".k-list-scroller").before(' <div class="form-label-group"><input id="availableSearch" class="form-control" autocomplete="off" placeholder="尋找.."  style="width:85%;height:5%" class="k-textbox" /> <label class="k-icon k-i-search"></label> </div>');
  }
  $("#listbox .row.title > div:eq(1) > b").text("非所屬" + type);

  $("#currentSearch").on("input", function (e) {
    currentList.dataSource.filter({
      field: "text",
      value: $(e.target).val(),
      operator: "contains"
    });

  })
  $("#availableSearch").on("input", function (e) {
    availableList.dataSource.filter({
      field: "text",
      value: $(e.target).val(),
      operator: "contains"
    });

  })
  $.ajax({
    url: api + "/template/" + uuid,
    method: 'GET',
    success: function (data) {
      if (data.status) {
        originItem = data.response.current
        var dataSource = new kendo.data.DataSource({
          data: data.response.current
        });
        currentList.setDataSource(dataSource);
        dataSource = new kendo.data.DataSource({
          data: data.response.available
        });
        availableList.setDataSource(dataSource);
        listbox.open();
        listbox.center();
      }
    } //end of success
  }); //end of ajax
}

function confirmDel() {
  var postData = new FormData();
  var dataUuid = [];
  var theGrid = $('#member').data("kendoGrid");
  $("#member .k-grid-content .k-checkbox ").each(function (index, element) {
    if ($(element).prop('checked')) {
      console.log($(element).closest("tr").find("td:nth-child(2)").text());
      dataUuid.push($(element).closest("tr").find("td:nth-child(2)").text());
      theGrid.removeRow($(element).closest("tr"));
    };

  });
  var page = theGrid.dataSource.page();
  theGrid.dataSource.page(-1);
  theGrid.dataSource.page(page);
  postData.append("memberCore", new Blob([JSON.stringify({
    "memberCoreUuids": dataUuid
  })], {
    type: "application/json"
  }));
  $.ajax({
    url: "/api/member/",
    data: postData,
    method: "DELETE",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      fw_confirmBox.box.find("button, h2, .fa-times").addClass("invisible");
      fw_confirmBox.box.find(".fa-trash").show();
      fw_confirmBox.box.find(".fa-file-text-o").addClass("throwIn").delay(2000).queue(function () {
        fw_confirmBox.box.find(".fa-trash").hide();
        fw_confirmBox.box.find(".fa-file-text-o").removeClass("throwIn");
        fw_confirmBox.box.find(".invisible").removeClass("invisible");
        $(this).dequeue();
      });
    } // end of ajax success
  }); //end of ajax
} //confirmDel
function confirmRePassWord() {
  var modifiedNotification = $("#notification").kendoNotification({
    templates: [{
        type: "incerted",
        template: "<div class='saveOrInsert zoominTrans'>新增成功</span>" + fw_checkMrak + "</div>"
      },
      {
        type: "saved",
        template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
      }
    ],
    autoHideAfter: 1500
  }).data("kendoNotification");
  var postData = new FormData();
  postData.append("password", new Blob([JSON.stringify({
    "memberCoreUuid": rePasswordUuid,
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
