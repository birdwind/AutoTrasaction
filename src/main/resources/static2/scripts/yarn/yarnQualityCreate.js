var filter, supplier;
var yarnQualityBatchesData = new kendo.data.DataSource();
let validatedFiles = [];
let attachmentsData = [];
let deleteFileData = [];
let totalSize = 0;
let allSize = [];
$(function () {
  let formData = $("#form").formWizard({
    id: "yarnQualityControlCoreUuid",
    url: "/api/yarn/quality/control/template/" + uuid,
    mainData: "response.yarnQualityControlCore",
    noData: "findnodata",
    listUrl:{
      "events":"/api/yarn/quality/control/events/list"
    },
    customizeForm: "customizeForm",
    fileUpload:{
      afterUpload:"afterUpload"
    },
  });//formWizard
  $(".box_features").draggable({
    axis: "y"
  });

  $(".box_features > .right").click(function () {
    $(this).parent().css("left", "auto").animate({ right: "-160px" }).delay(100).queue(function () {
      $(this).find(".left").fadeIn(100);
      $(this).dequeue();
    });
  })//right
  $(".box_features > .left").click(function () {
    $(this).hide().parent().css("left", "auto").animate({ right: "-10px" }).delay(100).queue(function () {
      $(this).find(".left").hide();
      $(this).dequeue();
    });
  })//left

  $("body").on("click", "#quality .del", function () {
    $(this).closest("tr").remove();
    if ($("#quality tbody tr").length <= 1) {
      $("#quality tbody tr:eq(0) .del").hide();
    }
  })// ingredient  del click

  $("#save").click(function () {
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var postData = $("#form").formCheck({
      name: "yarnQualityControlCore",
      dataProccessing: "yarnDataSet",
    });

    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    $.ajax({
      url: "/api/yarn/quality/control/",
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
          }
        }
      } // end of ajax success
    }); //end of ajax
  })//end of save
})//$(function ()

function findnodata() {
  $("html").remove();
  location.replace("/page/yarn/quality/control");
}//findnodata
function eventsBound() {
  let multiSelect = $("select[name = 'events']").data('kendoMultiSelect');
  let data = multiSelect.dataSource.data()
  let val = [];
  let selectedItems;
  let select = []
  if (window.localStorage.events != "") {
    selectedItems = window.localStorage.events.split(", ")
  }
  else {
    return false;
  }
  $.each(selectedItems, function (field, value) {
    select.push(value);
  })
  select.forEach(function (element) {
    if (data.find(x => x.text.includes(element))) {
      val.push(data.find(x => x.text.includes(element)).value);
    }
  })
  multiSelect.value(val);

}
function batchNoBound() {
  let dropDownList = $("input[name = 'importDetail']").data('kendoDropDownList');
  let data = dropDownList.dataSource.data()
  if (window.localStorage.importDetail == "") {
    return false;
  }
  if (data.find(x => x.text.includes(window.localStorage.importDetail))) {
    dropDownList.value(data.find(x => x.text.includes(window.localStorage.importDetail)).value);
  }
}
function supervisorBound() {
  let dropDownList = $("input[name = 'supervisor']").data('kendoDropDownList');
  let data = dropDownList.dataSource.data()
  if (window.localStorage.supervisor == "") {
    return false;
  }
  if (data.find(x => x.text.includes(window.localStorage.supervisor))) {
    dropDownList.value(data.find(x => x.text.includes(window.localStorage.supervisor)).value);
  }
}
function customizeForm() {
  var returnUnit = $("[name='returnUnit']").clone();
  $("[name='returnUnit']").closest(".box_inputdata").remove();
  $("[name='returnAmount']").css("width", " calc(85% - 90px)").after(returnUnit);
  $("[name='returnUnit']").css({ "width": "80px", "margin-left": "5px" });
  
  if ($("input[name = 'actualReturnDate']").val() && uuid) {
    $('fieldset').prop('disabled', true);
    $("[data-picker='datetime']").data("kendoDateTimePicker").readonly();
    $("select").data("kendoMultiSelect").readonly()
    $('#save,.fa-angle-double-right').remove();
  }

  $("[name='returnUnit']").kendoDropDownList({
    dataSource: fw_formData.response.yarnQualityControlCore.returnUnit.keyValue,
    dataTextField: "text",
    dataValueField: "value",
  });//dsUnitDropDownList
  $("input[name = 'returnAmount'],input[name = 'refoundPerUnit']").addClass("total")
  $(".total").keyup(function () {
    let total = $("input[name = 'refoundPerUnit']").val() * $("input[name = 'returnAmount']").val();
    $("input[name = 'refoundTotal']").val(Math.round(total));
  })

  $("input[name = 'importDetail']:not(:hidden)").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          url: "/api/yarn/quality/control/batches/list",
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {
          $.each(data.response, function (number, data) {
            if (number == 0) {
              $(".labelText").text(data.supplier);
            }
          })
          return data.response;
        }
      }
    },
    dataTextField: "text",
    dataValueField: "value",
    filter: "contains",
    change: function () {
      $("input[name = 'supplier']").val("supplier");
    },
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });
  $("input[name = 'yarnQualityControlCoreNo']").val("0")

  if (uuid === "") {
    $("input[name = 'expectedReturnDate").data("kendoDateTimePicker").value(new Date());
  }

  $(".k-datetimepicker").css("width", "85%");
  $(".k-multiselect").css("height", "auto");
  $("input[name = 'supervisor']:not(:hidden)").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          url: "/api/yarn/quality/control/supervisors/list",
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {

          $.each(data.response, function (number, data) {
            data.text = "(" + data.value + ") " + data.text;
          })

          return data.response;
        }
      }
    },
    dataTextField: "text",
    dataValueField: "value",
    filter: "contains",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    value: fw_formData.response.yarnQualityControlCore.currentUserMemberNo,
  });
  if (window.localStorage.length != 0) {
    let supervisor = $("input[name = 'supervisor']").data('kendoDropDownList');
    supervisor.bind("dataBound", supervisorBound);
    let batchNo = $("input[name = 'importDetail']").data('kendoDropDownList');
    batchNo.bind("dataBound", batchNoBound);
    let events = $("select[name = 'events']").data('kendoMultiSelect');
    events.bind("dataBound", eventsBound);
    $("input[name = 'actualReturnDate']").val(window.localStorage.actualReturnDate);
    $("input[name = 'expectedReturnDate']").val(window.localStorage.expectedReturnDate);
    if (window.localStorage.returnAmountKg != "") {
      $("input[name = 'returnAmount']").val(window.localStorage.returnAmountKg);
      $("input[name = 'returnUnit']").val(1);
    }
    if (window.localStorage.returnAmountPiece != "") {
      $("input[name = 'returnAmount']").val(window.localStorage.returnAmountPiece);
      $("input[name = 'returnUnit']").val(0);
    }
    $("input[name = 'refoundPerUnit']").val(window.localStorage.refoundPerUnit);
    $("input[name = 'refoundTotal']").val(window.localStorage.refoundTotal);
    $("textarea[name = 'qualityControlReason']").val(window.localStorage.qualityControlReason);

    $("input[name = 'supplier']").val(window.localStorage.supplier);
    $(".labelText").text(window.localStorage.supplier);
  }

};
function yarnDataSet(obj, form) {
  var returnAmount;
  var returnIsWeight;
  if (!$("input[name = 'returnAmount']").val().trim().length) {
    $("input[name = 'returnAmount']").errorMsg({
      message: "請輸入瑕疵數量"
    });
  }

  form["returnAmount"] = $("input[name = 'returnAmount']").val().trim();
  form["returnIsWeight"] = $("input[name = 'returnUnit']").val().trim();
  batchNo = $("input[name = 'importDetail']").val().split(" ");
  form["importDetail"] = batchNo[0];
  form["yarnQualityControlCoreUuid"] = 0;
  form["yarnQualityControlCoreUuid"] = 0;
  form["yarnQualityControlCoreNo"] = 0;
  return form;
}
function afterUpload(){
  fw_notification.show({}, "saveOrInsert");
  setNoificationPosition();
  setTimeout(function () {
    $(".drawCheck").hide().delay(460).queue(function () {
      location = "/page/yarn/quality/control/";
      $(this).dequeue();
    });
  }, 1000);
}
