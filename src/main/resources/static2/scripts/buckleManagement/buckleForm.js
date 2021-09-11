$(function () {
  var backUrl = "/page/buckle/management";
  SetInitPage(false, backUrl);
  $("#form").formWizard({
    id: "buckleCoreUuid",
    url: "/api/buckle/management/template/" + uuid,
    mainData: "response.buckleCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
    fileUpload: {
      afterUpload: "afterUpload"
    },
  }); //formWizard
  $("#save").click(function () {

    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var postData = $("#form").formCheck({
      name: "buckleCore"
    });

    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }

    $.ajax({
      url: "/api/buckle/management",
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
  }) //end of save
});


function customizeForm() {
  kendo.ui.progress($("#grid"), true);

  $("input[name='warehouseUuid']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/buckle/management/warehouses/list",
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
    optionLabel: " ",
  });
  $("input[name='bucklePurchaseCompanyUuid']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/buckle/management/purchaseCompanys/list",
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
    optionLabel: " ",
  });
  $("input[ name='buckleStatus']").kendoDropDownList({
    dataSource: fw_formData.response.buckleCore.buckleStatus.keyValue,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
  });
  if (uuid) {
    $("#buckleSituation").show();
    $("#buckleSituationForm").show();
    $(".k-dropdown").closest("fieldset").addClass("disabled");;
    $("input[ name='buckleStatus']").data("kendoDropDownList").enable(false);
    $("input[ name='bucklePurchaseCompanyUuid']").data("kendoDropDownList").enable(false);
    $("input[ name='warehouseUuid']").data("kendoDropDownList").enable(false);
    $.each(fw_formData.response.buckleSituation, function (index, value) {
      if (!value.title) return;
      $("#buckleSituationTemplate").find("nav").text(value.title);
      $("#buckleSituationTemplate").find("span").text(value.value);
      $("#buckleSituationTemplate").find("input").attr("name", index);
      $("#buckleSituationTemplate").find("input").val(value.value);
      $("#buckleSituationForm").find(".box_inputdata").append($("#buckleSituationTemplate").html());
    })

  }
  //   setDropDownListUI("[name='bucklePurchaseCompany']", companyData, null, null);
  //   setDropDownListUI("[name='status']", statusData, null, null);

  kendo.ui.progress($("#grid"), false);
} //customizeForm

function afterUpload() {
  fw_notification.show({}, "saveOrInsert");
  setNoificationPosition();
  setTimeout(function () {
    $(".drawCheck").hide().delay(460).queue(function () {
      location = "/page/buckle/management/";
      $(this).dequeue();
    });
  }, 1000);
}
