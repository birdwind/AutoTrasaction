var title = {};
window.localStorage.clear();
let searchKey = null;
$(async function () {

  var grid = new Grid("/yarn/quality/control/", "check,copy", "yarnQualityControlCore");
  await grid.initDataSource();
  title = grid.getI18n()
  await grid.creatKendGrid("#quality", false);
  $('body').on('input keydown', '.search input', function (event) {
    if (event.which == 13) {
      var key = $(this).val().trim();
      $(".search > .clear").hide();
      if (key.length) {
        $(".search > .clear").show();
        searchKey = key;
      } else {
        searchKey = null;
      }

      let filters = [];

      if (searchKey != null) {
        $.each(title, function (field, value) {
          if (value.search) {
            value.search.forEach(function () {
              filters.push({
                field: field,
                operator: "contains",
                value: searchKey
              })
            }
            );
          }
        });
      }
      $('#quality').data('kendoGrid').dataSource.filter({
        logic: 'or',
        filters: filters
      });

    }
  });//end of search

  $('body').on('click', '.search > .clear', function () {
    $(".search input").val("").trigger("input");
    let filters = [];
    $('#quality').data('kendoGrid').dataSource.filter({
      logic: 'or',
      filters: filters
    });
    $(".search > .clear").hide();
  })
  $('body').on('click', '.copy', function () {
    let grid = $("#quality").data("kendoGrid");
    let dataItem = grid.dataItem($(event.target).closest("tr"));
    let dataUuid = dataItem.yarnQualityControlCoreUuid;
    window.localStorage.setItem("events", dataItem.events);
    $.ajax({
      url: "/api/yarn/quality/control/template/" + dataUuid,
      method: "GET",
      success: function (data) {
        if (data.status) {
          $.each(data.response.yarnQualityControlCore, function (fields, value) {
            if (fields == "yarnQualityControlCoreUuid") {
              window.localStorage.setItem(fields, value);
              return;
            }
            if (fields == "events") {
              return;
            }
            window.localStorage.setItem(fields, value.value);
          })
          location.replace("/page/yarn/quality/control/form/");
        }
      } // end of ajax success
    }); //end of ajax
    //
  })
  $('body').on('click', '.k-checkbox', function () {
    if ($(this).attr('aria-label') == 'Select all rows') {
      var checkStatus = $("#quality .k-grid-header .k-checkbox").prop("checked");
      $("#quality .k-grid-content .k-checkbox").prop("checked", checkStatus);
    }
    $("#trashBin").hide();
    if ($("#quality .k-grid-content tbody input:checkbox:checked").length) {
      $("#trashBin").show();
    }

  })//k-checkbox click

  fw_confirmBox.init({
    content: $("#confirmTemplate").html(),
    confirmEvent: "confirmDel"
  });

  $('body').on('click', '#trashBin', function () {
    if (!$("#quality .k-grid-content tbody input:checkbox:checked").length) {
      return false;
    }
    fw_confirmBox.show();
  })

  $('body').on('click', '.search > .clear', function () {
    $(".search input").val("").trigger("input");
  })
})//$(function ()

function confirmDel() {
  var postData = new FormData();
  var dataUuid = [];
  var theGrid = $('#quality').data("kendoGrid");

  theGrid.select().each(function () {
    dataUuid.push(theGrid.dataItem(this).yarnQualityControlCoreUuid);
  });
  theGrid.select().each(function () {
    theGrid.removeRow(this);
  });
  var page = theGrid.dataSource.page();
  theGrid.dataSource.page(-1);
  theGrid.dataSource.page(page);
  postData.append("yarnQualityControlCoreDelete", new Blob([JSON.stringify({ "yarnQualityControlCoreUuids": dataUuid })], {
    type: "application/json"
  }));
  $.ajax({
    url: "/api/yarn/quality/control/",
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
