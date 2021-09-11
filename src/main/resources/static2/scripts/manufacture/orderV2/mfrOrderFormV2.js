let rootApi = "/api/manufacture/order";
let backUrl = "/page/manufacture/order";
let clothNo = 0;

let clothOrderDataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/cloth/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response;
    }
  }
});

let unitDataSource = new kendo.data.DataSource({
  data: [{
    text: "件",
    value: "1"
  },
    {
      text: "公斤",
      value: "0"
    }
  ]
});

$(function () {
  $("#form").formWizard({
    id: "salesQuoteCoreUuid",
    url: rootApi + "/template" + "/" + uuid,
    mainData: "response",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
    fileUpload: false
  }); // formWizard

  SetInitPage(false, backUrl);

  $("#save").click(function () {
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    let postData = $("#form").formCheck({
      name: "manufactureOrder",
      otherCheck: [
        "manufactureOrderClothYarnFormWrapper"
      ]
    });

    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }

    $.ajax({
      url: "/api/manufacture/order/",
      data: postData,
      method: "PUT",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          fw_notification.show({}, "saveOrInsert");
          setNoificationPosition();
          setTimeout(function () {
            $(".drawCheck").hide().delay(460).queue(function () {
              window.history.back();
              $(this).dequeue();
            });
          }, 1000);
        } else {
          $("#save").removeClass("waitaSec");
          for (i of data.response) {
            $("#form [name='" + i.field + "']").errorMsg({
              message: i.defaultMessage
            });
          }
        }
      } // end of ajax success
    }); //end of ajax
  })//#save
});//$function

function customizeForm() {
  kendo.ui.progress($("#form"), true);

  let clothOrderCoreNo = $("[name='clothOrderCoreNo']");
  clothOrderCoreNo.createMultiSelect({
    url: rootApi + "/grey/cloth/list",
    value: "",
  });

  var multiselect = clothOrderCoreNo.data("kendoMultiSelect");
  multiselect.bind("change", multiselect_change);
  $("[name='clothCoreUuid']").kendoDropDownList({
    dataSource: clothOrderDataSource,
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    filter: "contains",
    dataTextField: "text",
    dataValueField: "value",
    valuePrimitive: true,
    change:clothCoreUuidChanged,
    dataBound:clothCoreUuidChanged
  });
  let clothCoreDropDown = $("input[name='clothCoreUuid']").data("kendoDropDownList");
  $("input[name='clothYarnView']").after(`<div id="grid" style="margin-top: 5px; margin-bottom: 5px; display: inline-grid; width: 85%"></div>`);
  $("input[name='clothYarnView']").hide();

  let header = fw_formData.response.manufactureOrderClothYarnGrid.header;
  $("#grid").kendoGrid({
    columns: [
      {
        field: "yarnNo",
        title: header.yarnNo.title,
        width: "10%"
      },
      {
        field: "warpWeft",
        title: header.warpWeft.title,
        width: "5%",
        template: function (d) {
          if (!d.warpWeft) {
            return "經紗";
          } else {
            return "緯紗";
          }
        }
      },
      {
        field: "quantity",
        headerTemplate: `<span class='color_pink'>*</span> ${header.quantity.title}`,
        width: "10%",
        template: function(d) {
          return `<input type="number" name="quantity" class="form-control" value="${d.quantity}" style="padding: 0px 4px;"><span class="errorMsg color_pink"></span>`;
        }
      },
      {
        field: "unit",
        width: "8%",
        headerTemplate: `<span class='color_pink'>*</span> ${header.unit.title}`,
        template: function(d) {
          return `<input type="number" name="unit" class="form-control" value="${d.unit}" style="padding: 0px 1px;"><span class="errorMsg color_pink"></span>`;
        }
      },
      {
        field: "buyRecord",
        title: header.buyRecord.title,
        width: "7%",
        template: `<a href="\\#" class="table_btn_status table_btn_creatForm">查看</a>`
      },
      {
        field: "importRecord",
        title: header.importRecord.title,
        width: "7%",
      },
      {
        field: "importBatch",
        title: header.importBatch.title,
        width: "7%",
      },
    ],
    dataSource: {}
  });

  let parent = $("input[name='clothYarnView']").parent();
  if (fw_formData.response.clothCoreUuid.value === "") {
    parent.css("display", "none");
  } else {
    parent.css("display", "block");
    $("#grid").data("kendoGrid").setDataSource(fw_formData.response.manufactureOrderClothYarnGrid.contents);
  }

  kendo.ui.progress($("#form"), false);
}

function multiselect_change(e) {
  var value = $("[name='clothOrderCoreNo']").data("kendoMultiSelect");
  $.each(value.dataSource.data(), function (i, v) {
    if (v.value == value.value()[value.value().length - 1]) {
      // $("[name='clothOrderCoreNo']").closest(".k-multiselect").css("border-color", "#3399ff")
      if (clothNo == 0) {
        clothNo = v.clothNo;
        $("input[name='clothCoreUuid']").data("kendoDropDownList").value(clothNo);
        $("input[name='clothCoreUuid']").data("kendoDropDownList").trigger("change");
        $("[name='clothOrderCoreNo']").data("kendoMultiSelect").value(v.value);
      } else if (v.clothNo != clothNo) {
        // $("[name='clothOrderCoreNo']").closest(".k-multiselect").css("border-color", "#ff2b66")
      }
    }
  })
}

function manufactureOrderClothYarnFormWrapper() {
  let data = 0;
  $.each($("input[name='clothCoreUuid']").data("kendoDropDownList").dataSource.data(), function (i, v) {
    if (v.value == $("[name='clothCoreUuid']").val()) {
      // $("[name='clothOrderCoreNo']").closest(".k-multiselect").css("border-color", "#3399ff")
      data = v.manufactureOrderClothYarnListItems;
    }
  });
  let manufactureOrderClothYarnFormWrapper = {};
  manufactureOrderClothYarnFormWrapper["manufactureOrderUuid"] = (uuid) ? uuid : 0
  manufactureOrderClothYarnFormWrapper["manufactureOrderClothYarnForms"] = [];
  var title = fw_formData.response.manufactureOrderClothYarnGrid.header;
  $.each(data, function (i, v) {
    
    $("#grid tbody tr").eq(i).find("input").each(function(){
      var msg = "請輸入"+title[$(this).attr("name")].title;
      if(!$(this).val().trim()){
        $(this).errorMsg({
            message: msg
          });
        }
    })
    manufactureOrderClothYarnFormWrapper["manufactureOrderClothYarnForms"].push({
      "clothYarnUuid": v.clothYarnUuid,
      "quantity": $("[name='quantity']").val(),
      "clothYarnUnit": $("[name='unit']").val(),
    });
  })
  return manufactureOrderClothYarnFormWrapper;
}

function clothCoreUuidChanged() {
  $("[name='clothOrderCoreNo']").data("kendoMultiSelect").value("");
  $("#grid").data("kendoGrid").setDataSource(this.dataItem().manufactureOrderClothYarnListItems);
  $("[name='unit']").kendoDropDownList({
    dataSource: unitDataSource,
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    filter: "contains",
    dataTextField: "text",
    dataValueField: "value",
    valuePrimitive: true,
  });
  let parent = $("input[name='clothYarnView']").parent();
  if (this.dataItem().value === "") {
    parent.css("display", "none");
  } else {
    parent.css("display", "block");
  }
}
