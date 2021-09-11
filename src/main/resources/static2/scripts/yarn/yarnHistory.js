
let titleI18n = {};
var price;
var content = "", columnName, title, data, MultiSelectSet = [];
var section = window.location.pathname.split("/");
var subject = "history" + section[5];
let priceType;
let priceData = [];
let sortData = "";
let apiUrl = "";
let categoriesDate = [];
let pageSizes = "";
let chartText = "";
let companyType = "supplier";

switch (subject) {
  case "historyprice":
    title = "歷史紗價";
    columnName = "單價"
    break;
  case "historyknot":
    title = "歷史噴節點";
    columnName = "噴節點"
    break;
  case "historycount":
    title = "歷史丹/支數";
    columnName = "丹數"
    break;
  default:
    title = "歷史紗價";
    columnName = "單價"

}
$(function () {

  window.localStorage.clear();
  $(".box_features").draggable({
    axis: "y"
  });
  $("#breadcrumb > li.active").removeClass("active");
  $("#breadcrumb").append("<li class='active'>" + title + "</li>");
  $("." + subject).show()

  switch (section[5]) {
    case "price":
      apiUrl = '/yarn/ingredient/history/price/salesPrice/grid/' + uuid;
      priceType = "salesPrice";
      chartText = "詢價";
      companyType = "inquiryCompany"
      break;
    case "knot":
      apiUrl = '/yarn/ingredient/history/node/grid/' + uuid;
      priceType = "yarnNode";
      chartText = "噴節點";
      companyType = "supplier";
      break;
    case "count":
      apiUrl = '/yarn/ingredient/history/denier/grid/' + uuid;
      priceType = "denier";
      chartText = "丹數";
      companyType = "supplier";
      break;
    default:
      apiUrl = "";
  }
  createChart();
  $(".k-dropdown-wrap .k-state-default").remove();
  $(".pills-tab .nav-item").click(function () {
    if (subject == "historycount") {
      columnName = ($(this).hasClass("dan")) ? "丹數" : "支數";
      switch ($(this).text().trim()) {
        case "丹數":
          apiUrl = '/yarn/ingredient/history/denier/grid/' + uuid;
          priceType = "denier";
          chartText = "丹數";
          break;
        case "支數":
          apiUrl = '/yarn/ingredient/history/s/grid/' + uuid;
          priceType = "yarnS";
          chartText = "支數";
          break;
      }
    }
    if (subject == "historyprice") {
      switch ($(this).text().trim()) {
        case "詢價":
          apiUrl = '/yarn/ingredient/history/price/salesPrice/grid/' + uuid;
          priceType = "salesPrice";
          chartText = "詢價";
          companyType = "inquiryCompany"
          break;
        case "採購":
          apiUrl = '/yarn/ingredient/history/price/responsePrice/grid/' + uuid;
          priceType = "responsePrice";
          chartText = "採購";
          companyType = "inquiryCompany"
          break;
        case "進貨":
          apiUrl = '/yarn/ingredient/history/price/purchasePrice/grid/' + uuid;
          priceType = "purchasePrice";
          chartText = "進貨";
          companyType = "supplier";
          break;
        case "牌價":
          apiUrl = '/yarn/ingredient/history/price/actualPrice/grid/' + uuid;
          priceType = "actualPrice";
          chartText = "牌價";
          companyType = "supplier";
          break;
      }
    }

    // createTable();
    createChart();

  })
  $('body').on('change', '[data-field ="createDate"] .k-dropdown-operator input', async function () {
    await this;
    let html = '<div id="betweenDate"><span style="display:flex; justify-content:center;" class="dataRange"><input  class="start-date"/><span>&nbsp~&nbsp</span><input  class="end-date"/></span></div>';
    if ($(this).attr("aria-label") == "選擇間距") {
      kendo.culture("zh-TW");
      $(".k-widget .k-datepicker").hide();

      if ($("#betweenDate").length == 0) {
        let filterCell = $(this).parents(".k-filtercell");
        $(html).insertBefore($(".k-widget .k-datepicker"));

        $("#betweenDate").kendoDateRangePicker({
          culture: "zh-TW",
          format: "yyyy-MM-dd",
          change: function (e) {
            // console.log(this._range);
            let startDate = this._range.start,
              endDate = this._range.end,
              dataSource = $("#table").data("kendoGrid").dataSource;
            if (startDate & endDate) {
              let filter = { logic: "and", filters: [] };
              filter.filters.push({ field: "createDate", operator: "gte", value: startDate });
              filter.filters.push({ field: "createDate", operator: "lte", value: endDate });
              dataSource.filter(filter);
              // console.log(dataSource);
            }

          }
        });
        $(".dataRange").next("span").remove();
        $(".dataRange").next("span").remove();
        $(".dataRange").next("span").remove();
      }
      else {
        $(".start-date").show()
        $(".end-date").show()
        $("#betweenDate").show();
      }
    }
    else {
      $(".k-widget .k-datepicker").show();
      $("#betweenDate").hide();
    }
    //console.log(filterCell);

  })

})//end of $function  

async function createTable() {
  let grid = new Grid(apiUrl, "noToolbar");
  grid.setCustomizeFunction("setkendoChart");
  await grid.initDataSource();

  $("#table").html("")
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

  await grid.creatKendGrid("#table", filterable);

  $("#averageLabel").kendoDropDownList({
    dataTextField: "text",
    dataValueField: "value",
    dataSource: [
      { text: "1", value: 1 },
      { text: "3", value: 3 },
      { text: "5", value: 5 },
      { text: "10", value: 10 },
    ],
    index: 0,
    change: function (e) {
      // averageData.read();
    }
  })
  $("#gridPageSize").kendoDropDownList({
    dataTextField: "text",
    dataValueField: "value",
    dataSource: [
      { text: "5", value: 5 },
      { text: "10", value: 10 },
      { text: "15", value: 15 },
      { text: "20", value: 20 },
      { text: "30", value: 30 },
      { text: "50", value: 50 },
      { text: "All", value: grid.getTotalElements() }
    ],
    index: 0,
    change: function (e) {
      var grid = $("#table").data("kendoGrid");
      grid.dataSource.pageSize(this.value());
    }
  })
  let rowData = {};
  rowData = grid.getRowData();
  for (let index = 1; index <= 5; index++) {
    let averageData = new kendo.data.DataSource({
      transport: {
        read: {
          url: grid.getApiurl(),
          method: 'POST',
          dataType: "json",
          processData: false,
          contentType: false,
        },
        parameterMap: function (data) {
          console.log(data);
          let postData = new FormData();
          let today = new Date();
          let beforeYear = new Date().getFullYear() - index;
          let beforeDay = new Date();
          beforeDay.setFullYear(beforeYear);

          let valueString = today.toISOString().split(".");
          today = valueString[0] + "+0800";
          valueString = beforeDay.toISOString().split(".");
          beforeDay = valueString[0] + "+0800";

          postData.append("filter", new Blob([JSON.stringify({
            size: grid.getTotalElements(),
            page: "0",

            filter: { 'logic': 'and', 'filters': [{ "field": "createDate", "operator": "gte", "value": beforeDay }, { "field": "createDate", "operator": "lte", "value": today }] },
            sort: [{ 'field': 'createDate', 'dir': 'desc' }]
          })], {
            type: "application/json"
          }));

          return postData;
        }
      },
      serverPaging: true,
      serverFiltering: true,
      serverSorting: true,
      schema: {
        data: function (data) {
          let priceTotal = 0;
          data.response.rows.map(function (element) {
            if (element[priceType]) {
              priceTotal += element[priceType];
            }
          });
          if (priceTotal != 0 && !isNaN(priceTotal)) {
            $("#priceAverage" + index).text((priceTotal / data.response.totalElements).toFixed(1));
            $("#priceAverage" + index).css("color", "#D75A4A");
          }
          // else {
          //   $("#priceAverage").text("");
          // }
          return data.response.rows;
        },
      },

      sort: { field: "createDate", dir: "desc" },
      pageSize: 5
    });
    await averageData.read();
  }

  //averageData.read();
  // console.log(averageData);

  // rowData.map(function (element) {
  //   // priceData.push(element[priceType]);
  //   categoriesDate.push(element.createDate);
  // });

  if (!$('#yarnNo').val()) {
    $('#yarnNo').val(rowData[0].yarnCore);
  }

  $("thead  a.k-grid-filter").hide();
  $("thead th[data-field='createDate'] a.k-grid-filter").show();
  $(".k-filtercell .k-datepicker").css("background-color", "#ffffff");
}
function setkendoChart(rowData) {
  let supplierName = {};
  let supplierValue = [];
  priceData = {};
  $.each(rowData, function (text, element) {
    let dateData = element["createDate"].split("/");

    if (!supplierName[element[companyType]]) { supplierName[element[companyType]] = []; }
    supplierName[element[companyType]].push({ value: element[priceType], date: new Date(element["createDate"]) });
  })
  console.log(supplierName);
  priceData = supplierName;
  if (categoriesDate.length == 0) {
    rowData.map(function (element) {
      categoriesDate.push(element.createDate);
    });
  }
  if ($('#lineChart').data('kendoChart')) {
    let newData = [];
    let newDate = [];
    let time = categoriesDate.length;

    $.each(priceData, function (name, element) {
      newData.push({
        name: name,
        type: "line",
        categoryField: "date",
        data: element
      })
    })
    for (i = 0; i < time; i++) {

      // newData.push(priceData.pop())
      newDate.push(categoriesDate.pop())
    }

    $('#lineChart').data('kendoChart').options.series = newData;
    $('#lineChart').data('kendoChart').refresh()
  };
}
async function createChart() {
  await createTable();

  let series = []
  $.each(priceData, function (name, element) {
    series.push({
      name: name,
      type: "line",
      categoryField: "date",
      data: element,
    })
  })
  // $(".k-widget .k-state-default").addClass("form-control");
  $("#lineChart").kendoChart({
    legend: {
      visible: true,
    },
    chartArea: {
      height: 300,
      width: 900
    },
    seriesDefaults: {
      type: "line",
      style: "smooth"
    },
    series: series,
    valueAxis: {
      labels: {
        format: "{0}",
        step: 2
      },
      title: {
        text: chartText,
        rotation: 360
      },
      line: {
        visible: true
      },
      baseUnitStep: 10
    },
    categoryAxis: {
      name: "date",
      baseUnit: "fit",
      categories: categoriesDate,
      title: {
        text: "日期"
      },
      labels: {
        rotation: "auto",
        dateFormats: {
          days: "M/d",
          months: "yyyy/MM",
        }
      },
    },
    tooltip: {
      visible: true,
      format: "{0} NTD",
      template: "${value} NTD"
    }
    , transitions: false
  });
}
// function randomDate(start, end) {
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// }


