var filter;
var editable;
var newDetail = [];
var deletedDetail = [];
var cloth = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/cloth/specification/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
$(function () {
  $("#form").formWizard({
    id: "clothOrderCoreUuid",
    url: "/api/orderManagement/clothOrder/template/" + uuid,
    mainData: "response.clothOrderCore",
    noData: "findnodata",
    customizeForm: "customizeForm"
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
  $("#save").click(function () {
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var postData = $("#form").formCheck({
      name: "clothOrder",
    });
    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    $.ajax({
      url: "/api/orderManagement/clothOrder",
      data: postData,
      method: (uuid.length) ? "POST" : "PUT",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          fw_notification.show({}, "saveOrInsert");
          setNoificationPosition();
          setTimeout(function () {
            $(".drawCheck").hide().delay(460).queue(function () {
              location = "/page/orderManagement/clothOrder";
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

  })//end of save
})//$(function ()

function findnodata() {
  $("html").remove();
  location.replace("/page/orderManagement/clothOrder");
}//findnodata

function customizeForm() {
  if (fw_formData.response.clothOrderCore.clothOrderStatusKey != "ordering") {
    $("#save,.fa.right").remove();
    return false;
  }
  $("[name='clothOrderStatus']").kendoDropDownList({
    dataSource: [{ "value": "69ac198a-f0bb-11e9-b359-06e6eae5789e", "text": "客訂減量" }, { "value": "69ac198a-f0bb-11e9-b359-06e6eae5789e", "text": "訂單取消" }],
    dataTextField: "text",
    dataValueField: "value",
    filter: "contains",
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//eventDropDownList

  $("[name='orderer']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/yarn/quality/control/supervisors/list",
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {
          return data.response
        }
      }
    },
    dataTextField: "text",
    dataValueField: "value",
    filter: "contains",
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//salesDownList

  $("[name='deliverLocation']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/orderManagement/clothOrder/list",
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {
          return data.response
        }
      }
    },
    dataTextField: "text",
    dataValueField: "value",
    filter: "contains",
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//deliverLocationDownList

}//customizeForm
