var titles = {}, columnItem;
var columnTemplate = {
  "manufactureOrderCoreNo": function (d) {
    return "<a class='number_a' href='/page/manufacture/schedule/form/" + d.clothOrderDetailDeliverQuantityUuid + "/overview'>" + d.manufactureOrderCoreNo + "</a>";
  },
  "yarnPurchase": function (d) {
    if (d.yarnPurchase.length == 0) {
      return "尚未採購";
    } else {
      var tmp = ""
      for (var i = 0; d.yarnPurchase.length > i; i++) {
        tmp += "<a class='yarnPurchase_a' href='/page/yarn/purchase/form/" + d.yarnPurchase[i].yarnPurchaseCoreUuid + "'>" + d.yarnPurchase[i].yarnPurchaseNo + "</a>"
      }
      return tmp;
    }
  },
  "warping": function (d) {
    if (d.warping == "") {
      return `<button class="btn grid" onclick="location='/page/manufacture/schedule/form/` + d.clothOrderDetailDeliverQuantityUuid + `/warping'">排程</button>`;
    } else {
      return `<a href='/page/manufacture/schedule/form/` + d.clothOrderDetailDeliverQuantityUuid + `/warping'">` + d.warping + `</a>`;
    }
  },
  "drafting": function (d) {
    if (d.drafting == "") {
      return `<button class="btn grid" onclick="location='/page/manufacture/schedule/form/` + d.clothOrderDetailDeliverQuantityUuid + `/drafting'">排程</button>`;
    } else {
      return `<a href='/page/manufacture/schedule/form/` + d.clothOrderDetailDeliverQuantityUuid + `/drafting'">` + d.drafting + `</a>`;
    }
  },
  "weaving": function (d) {
    if (d.weaving == "") {
      return `<button class="btn grid" onclick="location='/page/manufacture/schedule/form/` + d.clothOrderDetailDeliverQuantityUuid + `/weaving'">排程</button>`;
    } else {
      return `<a href='/page/manufacture/schedule/form/` + d.clothOrderDetailDeliverQuantityUuid + `/weaving'">` + d.weaving + `</a>`;
    }
  },
  "inspection": function (d) {
    if (d.inspection == "") {
      return `<button class="btn grid" onclick="location='/page/manufacture/schedule/form/` + d.clothOrderDetailDeliverQuantityUuid + `/inspection'">排程</button>`;
    } else {
      return `<a href='/page/manufacture/schedule/form/` + d.clothOrderDetailDeliverQuantityUuid + `/inspection'">` + d.inspection + `</a>`;
    }
  },
  "shipment": function (d) {
    if (d.shipment == "") {
      return `<button class="btn grid" onclick="location='/page/manufacture/schedule/form/` + d.clothOrderDetailDeliverQuantityUuid + `/shipment'">排程</button>`;
    } else {
      return `<a href='/page/manufacture/schedule/form/` + d.clothOrderDetailDeliverQuantityUuid + `/shipment'">` + d.shipment + `</a>`;
    }
  },
}

var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: '/api/manufacture/schedule/grid',
      dataType: "json",
      type: "POST",
      processData: false,
      contentType: false
    },
    parameterMap: function (data) {
      let postData = new FormData();
      let dataFilter = data.filter;
      if (dataFilter) {
        $.each(dataFilter.filters, function (element, value) {
          switch (value.field) {
            case "deliverDate":
              let setDate = new Date(value.value);
              let startOfFilterDate = setDate.getFullYear() + "-" + (setDate.getMonth() + 1) + "-" + setDate.getDate() + "T00:00:00+0800";
              let endOfFilterDate = setDate.getFullYear() + "-" + (setDate.getMonth() + 1) + "-" + setDate.getDate() + "T23:59:59+0800";
              switch (value.operator) {
                case "eq":
                  var obj = new Object();
                  value.operator = "gte";
                  value.value = startOfFilterDate;
                  obj.field = "deliverDate";
                  obj.operator = "lte";
                  obj.value = endOfFilterDate;
                  dataFilter.filters.push(obj);
                  break;
                case "gte":
                  value.value = startOfFilterDate;
                  break;
                case "lte":
                  value.value = endOfFilterDate;
                  break;
              }
              break;
          }
        })
      }
      postData.append("filter", new Blob([JSON.stringify({
        size: data.pageSize,
        page: data.page -= 1,
        filter: data.filter,
        sort: data.sort
      })], {
        type: "application/json"
      }));
      return postData;
    }
  },
  serverPaging: true,
  serverFiltering: true,
  serverSorting: true,
  sort: {
    field: "manufactureOrderCoreNo",
    dir: "desc"
  },
  schema: {
    model: {
      id: 'clothOrderDetailDeliverQuantityUuid',
      fields: {
        "manufactureOrderCoreNo": {
          type: "string"
        },
        "clothOrderCoreNo": {
          type: "string"
        },
        "clothNo": {
          type: "string"
        },
        "deliverDate": {
          type: "date"
        },
        "quantity": {
          type: "number"
        },
        "yarnPurchaseCoreNo": {
          type: "string"
        }
      }
    },
    total: function (data) {
      return data.response.totalElements
    },
    data: function (data) {
      titles = data.response.header;
      columnItem = [];
      for (i in titles) {
        switch (i) {
          case "clothOrderDetailDeliverQuantityUuid":
          case "yarnPurchaseCoreUuid":
            continue;
            break;
          case "deliverDate":
            var temp = {
              field: i,
              title: titles[i].title,
              format: "{0:yyyy/MM/dd HH:mm}",
              filterable: {
                cell: {
                  template: function (args) {
                    args.element.kendoDatePicker({
                      culture: "zh-TW",
                      format: "{0:yyyy/MM/dd}"
                    });
                  }
                },
                width: "ˋ40%"
              }
            }
            break;
          case "warping":
          case "drafting":
          case "weaving":
          case "inspection":
          case "shipment":
            var temp = {
              field: i,
              title: titles[i].title,
              filterable: false,
              width: "ˋ5%"
            }
            break;
          default:
            var temp = {
              field: i,
              title: titles[i].title,
              filterable: {
                cell: {
                  operator: "contains",
                  suggestionOperator: "contains"
                }
              }
            }
            break;
        }
        if (columnTemplate[i]) {
          temp.template = columnTemplate[i];
        }

        columnItem.push(temp);

      } //loop
      return data.response.contents;
    }
  },
  pageSize: 10,
  page: (sessionStorage.getItem("inboundPage") == null) ? 1 : sessionStorage.getItem("inboundPage")
});
$(async function () {
  await dataSource.fetch();
  var grid = $("#schedule").kendoGrid({
    dataSource: dataSource,
    sortable: true,
    persistSelection: true,
    pageable: {
      input: true,
      numeric: true
    },
    columns: columnItem,
    noRecords: true,
    messages: {
      noRecords: "查無資料"
    },
    filterable: {
      mode: "row",
      operators: {
        string: {
          contains: "包含",
          eq: "等於",
          neq: "不等於"
        },
        number: {
          eq: "等於",
          neq: "不等於",
          gte: "大於等於",
          gt: "大於",
          lte: "小於等於",
          lt: "小於"
        },
        date: {
          eq: "相等",
          gte: "之後",
          lte: "之前",
          between: "選擇間距"
        }
      }
    },
    dataBound: function (e) {
      $(window).scrollTop(0);
      sessionStorage.setItem("inboundPage", $("#schedule").data("kendoGrid").dataSource.page());
      for (i in this.columns) {
        this.autoFitColumn(i);
      }
      $("#schedule .k-grid-header thead .k-checkbox").prop("checked", true).trigger("click");
    }
  });
  if (sessionStorage.getItem("inboundSearch") != null) {
    var page = $('#schedule').data('kendoGrid').dataSource.page();
    $(".search input").val(sessionStorage.getItem("inboundSearch")).trigger("keyup");
    $('#schedule').data('kendoGrid').dataSource.page(page)
  }

  $('body').on('click', '[data-field ="deliverDate"] [title="Clear"]', async function () {
    var range = {
      start: "",
      end: ""
    };
    $("#betweenDate").data("kendoDateRangePicker").range(range);
  });
  $('body').on('change', '[data-field ="deliverDate"] .k-dropdown-operator input', async function () {
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
          format: "yyyy/MM/dd",
          change: function (e) {
            // console.log(this._range);
            let startDate = this._range.start,
              endDate = this._range.end,
              dataSource = $("#schedule").data("kendoGrid").dataSource;
            if (startDate & endDate) {
              let filter = {
                logic: "and",
                filters: []
              };
              filter.filters.push({
                field: "deliverDate",
                operator: "gte",
                value: startDate
              });
              filter.filters.push({
                field: "deliverDate",
                operator: "lte",
                value: endDate
              });
              dataSource.filter(filter);
              // console.log(dataSource);
            }

          }
        });
        $(".dataRange").next("span").remove();
        $(".dataRange").next("span").remove();
        $(".dataRange").next("span").remove();
      } else {
        $(".start-date").show()
        $(".end-date").show()
        $("#betweenDate").show();
      }
    } else {
      $(".k-widget .k-datepicker").show();
      var range = {
        start: "",
        end: ""
      };
      $("#betweenDate").data("kendoDateRangePicker").range(range);
      $("#betweenDate").hide();
    }
    //console.log(filterCell);

  })
}) //$(function ()
