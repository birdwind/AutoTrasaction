let grid;
let rootApi = "/sales/quote/grey";
let expandedItems = {};
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
  "print": function () {
    return `<a class="table_btn table_btn_green print" href='javascript:void(0)' ">
              <i class="fa fa-print"></i>
              </a>`;
  },
  "record": function (d) {
    return d["record"] ? `<a href="javascript:void(0)" name="record" uuid="` + d["salesQuoteGreyClothUuid"] + `" class="btn_upload table_btn_status" >查看紀錄</a>` : ``;
  }
};

$(async function () {
  await $("#grid").initKendoGrid({
    linkField: "salesQuoteCoreNo",
    linkUuid: "salesQuoteCoreUuid",
    url: rootApi,
    toolbar: kgrid_gridTemplate["toolbar-advancedSearch"],
    // toolbarWithAdvancedSearch: true,
    // advancedSearchWithPanel: true,
    fieldTemplate: fieldTemplate,
    toolbarSearchField: ['salesQuoteCoreNo', 'clothNo', 'client'],
    detailTemplate: kendo.template($("#timelineTemplate").html()),
    dataBound: function (e) {
      let items = e.sender.items();
      items.each(function () {
        let row = $(this);
        row.find(".k-hierarchy-cell").children("a").hide();
      });
    },
    sort: [
      {
        field: "quoteDate",
        dir: "desc"
      },
      {
        field: "createDate",
        dir: "desc"
      }
    ],
  });
  baseController();
});//$(function ()

function baseController() {
  $('#grid').on('click', '.copy', function () {
    let salesUuidSelector = $(this).parents("tr").find("td")[0];
    let salesUuid = $(salesUuidSelector).text();
    window.localStorage.setItem("salesCopy", salesUuid);
    location.href="/page/sales/quote/grey/form";
  });

  $("#grid").on("click", "[name='record']", function () {
    let salesQuoteGreyClothUuid = $(this).attr("uuid");
    let selectorParent = $(this).closest("tr.k-master-row");
    let selectorExpandIcon = selectorParent.find(".k-hierarchy-cell");
    if (selectorExpandIcon.attr("aria-expanded") === "false") {
      $.ajax({
        url: "/api" + rootApi + "/record/" + salesQuoteGreyClothUuid,
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

function setSignatureRecord(selector, data) {
  let detail = selector.next().children(".k-detail-cell");
  let timelineContentTemplate = kendo.template($("#timelineContentTemplate").html());
  detail.find("#timeline").empty();
  $.each(data, function (index, value) {
    detail.find("#timeline").append(timelineContentTemplate(value));
  })
}
