var apiUrl = "/api/manufacture/schedule/detail/drafting/template/" + uuid;
var backUrl = "/page/manufacture/schedule/detail/";

var buckleDataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/manufacture/schedule/detail/buckle/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});

var draftingStaffDataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/manufacture/schedule/detail/drafting/staff/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});

var beamWarehouseDataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/manufacture/schedule/detail/beam/warehouse/list",
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
  //form.wizard
  $("#form").formWizard({
    id: "clothOrderDetailDeliverQuantityUuid",
    url: apiUrl,
    mainData: "response.scheduleDraftingCore",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
  }); //formWizard

  SetInitPage(false, backUrl);

  $("#save").click(function () {
    if (verification() == 0) {
      var postData = new FormData();
      //資料處理
      postData = setSaveData();
      if (!postData) {
        $(this).removeClass("waitaSec");
        return;
      }
      $.ajax({
        url: "/api/manufacture/schedule/detail/drafting",
        data: postData,
        method: "Put",
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
          }
        } // end of ajax success
      }); //end of ajax
    } else {
      $(this).removeClass("waitaSec");
      return;
    }
  });

});

function customizeForm() {
  kendo.ui.progress($("#grid"), true);

  // 設定 已完成穿綜細部排程 Grid Thead 
  var tableExistTheadTemplate = kendo.template($("#tableExistTheadTemplate").html());
  $("#tableExist thead").append(tableExistTheadTemplate(fw_formData.response.scheduleDraftingDetailExist.header));

  // 設定 已完成穿綜細部排程 Grid Tbody
  var tableExistTbodyTemplate = kendo.template($("#tableExistTbodyTemplate").html());
  $("#tableExist tbody").append(tableExistTbodyTemplate(fw_formData.response.scheduleDraftingDetailExist.contents));

  // 設定 未完成穿綜細部排程 Grid Thead 
  var tableTheadTemplate = kendo.template($("#tableTheadTemplate").html());
  $("#table thead").append(tableTheadTemplate(fw_formData.response.scheduleDraftingDetail.header));

  // 設定 未完成穿綜細部排程 Grid Tbody
  var detailContent = fw_formData.response.scheduleDraftingDetail.contents;
  for (var item in detailContent) {
    var tableTbodyTemplate = kendo.template($("#tableTbodyTemplate").html());
    var row = getGuid();
    $("#table tbody").append(tableTbodyTemplate(row));

    $("#scheduleWarpingDetail_" + row).val(detailContent[item].scheduleWarpingDetail);
    $("#beamCore_" + row).val(detailContent[item].beamCore);

    var buckleData = buckleDataSource;
    setDropDownListUI("#buckleCore_" + row, buckleData, detailContent[item].buckleCore, null);

    var draftingStaffData = draftingStaffDataSource;
    setDropDownListUI("#draftingStaff_" + row, draftingStaffData, detailContent[item].draftingStaff, null);

    $("#actualStartDatetime_" + row).val(detailContent[item].actualStartDatetime);
    setDateTimeUIBySelect("#actualStartDatetime_" + row);

    $("#actualFinishDatetime_" + row).val(detailContent[item].actualFinishDatetime);
    setDateTimeUIBySelect("#actualFinishDatetime_" + row);

    var beamWarehouseData = beamWarehouseDataSource;
    setDropDownListUI("#targetWarehouse_" + row, beamWarehouseData, detailContent[item].targetWarehouse, null);

  }

  $("#tableExistArea").show();
  $("#tableArea").show();
  setTimeout(function () {
    kendo.ui.progress($("#grid"), false);
  }, 2000);
}

function verification() {
  // 1. 若「完成後入倉」有填，「鋼扣編號」、「穿綜人員」、「實際開始時間」、「實際完成時間」欄位皆為必填，且「實際完成時間」需大於等於「實際開始時間」
  // 2. 若「實際開始時間」有填則「實際完成時間」反之亦然，且「實際完成時間」需大於等於「實際開始時間」。
  // 3. 「鋼扣編號」欄位為必填
  // 4. 時間格式驗證
  var hasError = 0;
  var data = [];
  data = fw_formData.response.scheduleDraftingDetail.header;
  $(".errorMsg").text("");
  $(".invalidInput").removeClass("invalidInput");
  $("#table tbody tr").each(function () {
    if ($(this).find("[name='buckleCore']").val() == "") {
      $(this).find("[name='buckleCore']").errorMsg({
        message: "請輸入" + data["buckleCore"].title + "!"
      });
      hasError = 1;
    }
    if ($(this).find("[name='targetWarehouse']").val() != "") {

      if ($(this).find("[name='buckleCore']").val() == "") {
        $(this).find("[name='buckleCore']").errorMsg({
          message: "請輸入" + data["buckleCore"].title + "!"
        });
        hasError = 1;
      }

      if ($(this).find("[name='draftingStaff']").val() == "") {
        $(this).find("[name='draftingStaff']").errorMsg({
          message: "請輸入" + data["draftingStaff"].title + "!"
        });
        hasError = 1;
      }

      if ($(this).find("[name='actualStartDatetime']").val() == "") {
        $(this).find("[name='actualStartDatetime']").errorMsg({
          message: "請輸入" + data["actualStartDatetime"].title + "!"
        });
        hasError = 1;
      }

      if ($(this).find("[name='actualFinishDatetime']").val() == "") {
        $(this).find("[name='actualFinishDatetime']").errorMsg({
          message: "請輸入" + data["actualFinishDatetime"].title + "!"
        });
        hasError = 1;
      }

    }
    if ($(this).find("[name='actualStartDatetime']").val() != "") {
      if (!checkDate($(this).find("[name='actualStartDatetime']").val())) {
        $(this).find("[name='actualStartDatetime']").errorMsg({
          message: data["actualStartDatetime"].title + "時間格式不正確!"
        });
        hasError = 1;
      }
      if ($(this).find("[name='actualFinishDatetime']").val() == "") {
        $(this).find("[name='actualFinishDatetime']").errorMsg({
          message: "請輸入" + data["actualFinishDatetime"].title + "!"
        });
        hasError = 1;
      }
    }
    if ($(this).find("[name='actualFinishDatetime']").val() != "") {
      if (!checkDate($(this).find("[name='actualFinishDatetime']").val())) {
        $(this).find("[name='actualFinishDatetime']").errorMsg({
          message: data["actualFinishDatetime"].title + "時間格式不正確!"
        });
        hasError = 1;
      }
      if ($(this).find("[name='actualStartDatetime']").val() == "") {
        $(this).find("[name='actualStartDatetime']").errorMsg({
          message: "請輸入" + data["actualStartDatetime"].title + "!"
        });
        hasError = 1;
      }
    }
    if ($(this).find("[name='actualStartDatetime']").val() != "" && $(this).find("[name='actualFinishDatetime']").val() != "") {
      var startDatetime = Date.parse($(this).find("[name='actualStartDatetime']").val());
      var endDatetime = Date.parse($(this).find("[name='actualFinishDatetime']").val());
      if (endDatetime.valueOf() < startDatetime.valueOf()) {
        $(this).find("[name='actualStartDatetime']").errorMsg({
          message: data["actualStartDatetime"].title + "不得大於" + data["actualFinishDatetime"].title + "!"
        });

        $(this).find("[name='actualFinishDatetime']").errorMsg({
          message: data["actualFinishDatetime"].title + "不得小於" + data["actualStartDatetime"].title + "!"
        });
        hasError = 1;
      }
    }
  });
  return hasError;
}

function setSaveData() {
  var postData = new FormData();
  var scheduleDraftingDetails = new Object();
  scheduleDraftingDetails.scheduleDraftingCoreUuid = uuid;
  var DetailArr = [];
  $("#table tbody tr").each(function () {
    var obj = new Object();
    $(this).find("input,select,textarea").each(function () {
      switch ($(this).attr("name")) {
        case "scheduleWarpingDetail":
          obj.scheduleWarpingDetail = $(this).val();
          break;
        case "buckleCore":
          obj.buckleCore = $(this).val();
          break;
        case "draftingStaff":
          if ($(this).val() != "") {
            obj.draftingStaff = $(this).val();
          } else {
            obj.draftingStaff = null;
          }
          break;
        case "actualStartDatetime":
          if ($(this).val() != "") {
            obj.actualStartDatetime = moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
          } else {
            obj.actualStartDatetime = null;
          }
          break;
        case "actualFinishDatetime":
          if ($(this).val() != "") {
            obj.actualFinishDatetime = moment($(this).val()).format("YYYY-MM-DDTHH:mm:ssZ");
          } else {
            obj.actualFinishDatetime = null;
          }
          break;
        case "targetWarehouse":
          if ($(this).val() != "") {
            obj.targetWarehouse = $(this).val();
          } else {
            obj.targetWarehouse = null;
          }
          break;
      }
    });
    DetailArr.push(obj);
  });
  scheduleDraftingDetails.scheduleDraftingDetails = DetailArr;

  postData.append("scheduleDraftingDetails", new Blob([JSON.stringify(scheduleDraftingDetails)], {
    type: "application/json"
  }));

  return postData;
}
