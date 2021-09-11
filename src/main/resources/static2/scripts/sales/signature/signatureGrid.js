let grid;
let signatureWindow;
let notification;
let signatureData;
let salesQuoteSignatureFlowRecordUuid;
let salesQuoteGreyClothUuid;
let baseUrl = type === "pm2" ? "/pm/re-signature/grey" : "/" + type + "/signature/grey";
let rootApi = "/api" + baseUrl;

let fieldTemplate = {
  "closingConfidence": function (d) {
    var stars = `<div style="display:inline-block">`;
    for (i = 0; i < 3; i++) {
      stars += (d.closingConfidence > i) ?
        `<label class="star"><i class="fa fa-star"></i></label>` : `<label class="star"><i class="fa fa-star-o"></i></label>`;
    }
    stars += `</div>`;
    return stars;
  },
  "isPassed": function (d) {
    return d["isPassed"] === "尚未簽核" ? `<a href="javascript:void(0)" name="signature" salesQuoteGreyClothUuid="` + d["salesQuoteGreyClothUuid"] + `" salesQuoteSignatureFlowRecordUuid="` + d["salesQuoteSignatureFlowRecordUuid"] + `" class="btn_upload table_btn_status" >簽核</a>` : d["isPassed"];
  },
  "record": function (d) {
    return `<a href="javascript:void(0)" name="record" uuid="` + d["salesQuoteGreyClothUuid"] + `" class="btn_upload table_btn_status" >查看紀錄</a>`;
  }
};

$(async function () {
  await $("#grid").initKendoGrid({
    linkUuid: "salesQuoteSignatureFlowRecordUuid",
    url: baseUrl,
    toolbar: kgrid_gridTemplate["toolbar-advancedSearch"],
    // advancedSearchWithPanel: true,
    // toolbarWithAdvancedSearch: true,
    fieldTemplate: fieldTemplate,
    toolbarSearchField: ['salesQuoteCoreNo', 'clothNo', 'client'],
    pageSize: 5,
    sortable: false,
    detailTemplate: kendo.template($("#timelineTemplate").html()),
    parameterMap: function (data) {
      let dataFilter = data.filter;
      if (dataFilter) {
        $.each(dataFilter.filters, function (element, value) {
          if (value.field === "isPassed") {
            value.field = value.field + type;
          } else if (kgrid_titles[value.field].search === "date") { //轉換回傳時間格式
            let valueString = value.value.toISOString().split(".");
            value.value = valueString[0] + "+0800";
          } else if (kgrid_titles[value.field].search === "number") { //轉換回傳數字格式
            let valueInt = parseInt(value.value);
            value.value = valueInt;
          }
        })
      }

      let postData = new FormData();
      postData.append("filter", new Blob([JSON.stringify({
        size: data.pageSize,
        page: data.page -= 1,

        filter: dataFilter,
        sort: data.sort
      })], {
        type: "application/json"
      }));
      pageSizes = data.pageSize;
      return postData;
    },
    dataBound: function (e) {
      var items = e.sender.items();
      items.each(function () {
        var row = $(this);
        row.find(".k-hierarchy-cell").children("a").hide();
      })
    },
    sort: [{
      field: "isPassed" + type,
      dir: "desc"
    },
      {
        field: "quoteDate",
        dir: "desc"
      }],
  });
  notification = setNotification("簽核", "簽核");
  $("#addBtn").hide();
  baseController();
  createSignatureWindow();
  signatureWindowController();
}); //$(function ()

function baseController() {
  $('#grid').on('click', "[name='signature']", async function () {
    salesQuoteSignatureFlowRecordUuid = $(this).attr("salesQuoteSignatureFlowRecordUuid");
    salesQuoteGreyClothUuid = $(this).attr("salesQuoteGreyClothUuid");
    switch (type) {
      case "pm":
        $("#windowTemplate").append($("#windowPmField").html());
        break;
      case "shopper":
        await $("#windowTemplate").append($("#windowShopperField").html());
        signatureData = $.ajax({
          url: rootApi + "/template/" + salesQuoteGreyClothUuid,
          method: "GET",
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (data) {
            if (data.status) {
              $("#windowDataField").createGrid({
                toolbar: null,
                toolbarSearchField: null,
                datasource: data.response.clothYarn.contents,
                page: false,
                filterable: false,
                columns: [{
                  field: "clothYarnUuid",
                  title: "ClothYarn.ClothYarnUuid",
                  hidden: true
                },
                  {
                    field: "clothYarn",
                    title: "紗種",
                  },
                  {
                    field: "stock",
                    title: "庫存量",
                  },
                  {
                    field: "expectPurchaseAmount",
                    title: "欲採購量",
                    template: function () {
                      return $("#inputDropDownTemplate").html();
                    }
                  },
                  {
                    field: "deliverDays",
                    title: "交期(天)",
                    template: function () {
                      return $("#inputTemplate").html();
                    }
                  }
                ],
              });
              $("input[name='purchaseUnit']").kendoDropDownList({
                dataSource: data.response.clothYarn.header.purchaseUnit.keyValue,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
              });
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
        $("#windowDataField").append($("#noteTemplate").html());
        break;
      case "pm2":
        $("#windowTemplate").append($("#windowPm2Field").html());
        break;
      case "manager":
        $("#windowTemplate").append($("#windowManagerField").html());
        break;
      case "president":
        $("#windowTemplate").append($("#windowManagerField").html());
        break;
    }

    signatureWindow.open();
    signatureWindow.center();
  });

  $("#grid").on("click", "[name='record']", function () {
    let salesQuoteGreyClothUuid = $(this).attr("uuid");
    let selectorParent = $(this).closest("tr.k-master-row");
    let selectorExpandIcon = selectorParent.find(".k-hierarchy-cell");
    if (selectorExpandIcon.attr("aria-expanded") === "false") {
      $.ajax({
        url: rootApi + "/record/" + salesQuoteGreyClothUuid,
        method: "GET",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (data.status) {
            kgrid_kendoGrid.expandRow(selectorParent);
            setSignatureRecord(selectorParent, data.response);
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
    } else {
      kgrid_kendoGrid.collapseRow(selectorParent);
      selectorExpandIcon.attr("aria-expanded", "false");
    }
  });
}

function createSignatureWindow() {
  signatureWindow = $("#signatureWindow").kendoWindow({
    modal: true,
    width: "70%",
    height: 'auto',
    resizable: false,
    visible: false,
    position: {
      top: 200
    },
  }).data('kendoWindow');
}

function signatureWindowController() {
  $('#signatureWindow').on('click', '#cancelSignature', function () {
    $("#windowTemplate").empty();
    signatureWindow.close();
  });

  $('#signatureWindow').on('click', '#confirmSignature', function () {
    let postData = new FormData();
    let signature = {};
    signature.salesQuoteSignatureFlowRecordUuid = salesQuoteSignatureFlowRecordUuid;
    signature.salesQuoteGreyClothUuid = salesQuoteGreyClothUuid;
    signature.isPassed = $("#signatureWindow").find("input[name='isPassed']:checked").val() == "1" ? true : false;
    signature.note = $("#signatureWindow").find("[name='note']").val() ? $("#signatureWindow").find("[name='note']").val() : null;
    switch (type) {
      case "pm":
        signature.beamLength = $("#signatureWindow").find("[name='beamLength']").val() ? $("#signatureWindow").find("[name='beamLength']").val() : 0;
        break;
      case "shopper":
        signature.clothYarns = [];
        for (let index = 0; index < $("#signatureWindow").find(".k-grid-content").find("tr").length; index++) {
          signature.clothYarns.push({
            clothYarnUuid: $("#signatureWindow").find(".k-grid-content").find("tr:eq(" + index + ")").find("td:eq(0)").text() ? $("#signatureWindow").find(".k-grid-content").find("tr:eq(" + index + ")").find("td:eq(0)").text() : 0,
            expectPurchaseAmount: $("#signatureWindow").find("[name='expectPurchaseAmount']").val() ? $("#signatureWindow").find("[name='expectPurchaseAmount']:eq(" + index + ")").val() : 0,
            purchaseUnit: $("#signatureWindow").find("[name='purchaseUnit']").val() ? $("#signatureWindow").find("[name='purchaseUnit']:eq(" + index + ")").val() : 0,
            deliverDays: $("#signatureWindow").find("[name='deliverDays']").val() ? $("#signatureWindow").find("[name='deliverDays']:eq(" + index + ")").val() : 0,
          })
        }
        break;
      case "pm2":
        signature.deliverDays = $("#signatureWindow").find("[name='deliverDays']").val() ? $("#signatureWindow").find("[name='deliverDays']").val() : 0;
        break;
    }

    postData.append("signature", new Blob([JSON.stringify(signature)], {
      type: "application/json"
    }));

    $.ajax({
      url: rootApi,
      data: postData,
      method: "PUT",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          notification.show({}, "saveOrInsert");
          setNoificationPosition();
          setTimeout(function () {
            $(".drawCheck").hide().delay(460).queue(function () {
              $(this).dequeue();
            });
          }, 1000);
          kgrid_datasource.fetch();
        } else {
          $("#save").removeClass("waitaSec");
          for (i of data.response) {
            $("#signatureWindow [name='" + i.field + "']").errorMsg({
              message: i.defaultMessage
            });
          }
        }
      } // end of ajax success
    }); //end of ajax
    $("#windowTemplate").empty();
    signatureWindow.close();
  });
}

function setSignatureRecord(selector, data) {
  let detail = selector.next().children(".k-detail-cell");
  let timelineContentTemplate = kendo.template($("#timelineContentTemplate").html());
  detail.find("#timeline").empty();
  $.each(data, function (index, value) {
    detail.find("#timeline").append(timelineContentTemplate(value));
  })
}
