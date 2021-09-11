var title = {};
var dataUuid = [];
window.localStorage.clear();
let searchKey = null;
$(async function () {
  window.localStorage.removeItem("clothCopy");
  var grid = new Grid("/cloth/specification/", "check,copy,status,createForm,analysis,record", "clothCore", "cloth");
  await grid.initDataSource();
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

  await grid.creatKendGrid("#cloth", filterable);

  // $('body').on('click', '.search > .clear', function () {
  //   $(".search input").val("").trigger("input");
  //   let filters = [];
  //   $('#cloth').data('kendoGrid').dataSource.filter({
  //     logic: 'or',
  //     filters: filters
  //   });
  //   $(".search > .clear").hide();
  // })
  $('body').on('click', '.copy', function () {
    let grid = $("#cloth").data("kendoGrid");
    let dataItem = grid.dataItem($(event.target).closest("tr"));
    $.ajax({
      url: "/api/cloth/specification/template/" + dataItem.clothCoreUuid,
      method: "GET",
      success: function (data) {
        window.localStorage.setItem("clothCopy", JSON.stringify(data.response));
        if (data.status) {
          location.replace("/page/cloth/specification/form/");
        }
      } // end of ajax success
    }); //end of ajax
    //
  })

  $('body').on('click', '.k-checkbox', function () {
    if ($(this).attr('aria-label') == 'Select all rows') {
      var checkStatus = $("#cloth .k-grid-header .k-checkbox").prop("checked");
      $("#cloth .k-grid-content .k-checkbox").prop("checked", checkStatus);

      // theGrid.select();
    }
    $("#trashCan").hide();
    if ($("#cloth .k-grid-content tbody input:checkbox:checked").length) {
      $("#trashCan").show();
    }

  })//k-checkbox click
  $("body").append("<span id='notification'></span>");
  notification = $("#notification").kendoNotification({
    templates: [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>" + "刪除成功" + "</span></div>"
    }
    ],
    autoHideAfter: 1500
  }).data("kendoNotification");

  fw_confirmBox.init({
    content: $("#confirmTemplate").html(),
    confirmEvent: "confirmDel"
  });

  $('body').on('click', '#trashCan', function () {


    if (!$("#cloth .k-grid-content tbody input:checkbox:checked").length) {
      return false;
    }
    fw_confirmBox.show();
  })

  // $('body').on('click', '.search > .clear', function () {
  //   $(".search input").val("").trigger("input");
  // })
})//$(function ()
function confirmDel() {
  var postData = new FormData();
  var dataUuid = [];
  var theGrid = $('#cloth').data("kendoGrid");
  $("#cloth .k-grid-content .k-checkbox ").each(function (index, element) {
    if ($(element).prop('checked')) {
      console.log($(element).closest("tr").find("td:nth-child(2)").text());
      dataUuid.push($(element).closest("tr").find("td:nth-child(2)").text());
      theGrid.removeRow($(element).closest("tr"));
    };

  });
  var page = theGrid.dataSource.page();
  theGrid.dataSource.page(-1);
  theGrid.dataSource.page(page);
  postData.append("clothCoreDelete", new Blob([JSON.stringify({ "clothCoreUuids": dataUuid })], {
    type: "application/json"
  }));
  $.ajax({
    url: "/api/cloth/specification/",
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
}//confirmDel
