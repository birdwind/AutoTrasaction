var noti, columnItem;
var columnTemplate = {
  "clothOrderCoreNo": function (d) {

    return "<a class='number_a' href='/page/orderManagement/clothOrder/form/" + d.statusKey + "/" + d.clothOrderCoreUuid + "'>" + d.clothOrderCoreNo + "</a>";
  },
  "clothOrderDetailDeliver": function (d) {
    var result = "";
    if (d.clothOrderDetailDeliver != "") {
      var arrParent = d.clothOrderDetailDeliver.split(',');

      for (e in arrParent) {
        var arr = arrParent[e].split(' / ');
        for (item in arr) {
          switch (item) {
            case "0":
              result += " <span class='label label-info'>" + arr[item] + "</span> / ";
              break;
            case "1":
              result += " <span class='label label label-success'>" + arr[item] + "</span> / ";
              break;
            case "2":
              result += " <span class='label label-warning'>" + arr[item] + "</span><br>";
              break;
          }
        }
      }
    }
    return result;
  },
  "cancel": function (d) {
    var template = `<a class="table_btn table_btn_purple" onclick="cancel('` + d.clothOrderCoreUuid + `','` + d.cancel + `')" href='javascript:void(0)' data-uid="` + d.clothOrderCoreUuid + `">
                <i class="fa fa-ban"></i>
              </a>`;
    switch (d.statusKey) {
      case "tmp":
      case "confirm":
        break;
      case "os_pending":
      case "生產中":
      case "ship_pending":
      case "shipped":
      case "cancel":
        template = "";
        break;
    }
    return template;
  }
}

var dataSource = new kendo.data.DataSource({
  // data: sampleData,
  transport: {
    read: {
      url: '/api/orderManagement/clothOrder/grid',
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
            case "createDate":
              let setDate = new Date(value.value);
              let startOfFilterDate = setDate.getFullYear() + "-" + (setDate.getMonth() + 1) + "-" + setDate.getDate() + "T00:00:00+0800";
              let endOfFilterDate = setDate.getFullYear() + "-" + (setDate.getMonth() + 1) + "-" + setDate.getDate() + "T23:59:59+0800";
              switch (value.operator) {
                case "eq":
                  var obj = new Object();
                  value.operator = "gte";
                  value.value = startOfFilterDate;
                  obj.field = "createDate";
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
        filter: dataFilter,
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
  schema: {
    total: function (data) {
      return data.response.totalElements
    },
    data: function (data) {
      titles = data.response.header;
      columnItem = [];
      for (i in titles) {
        switch (i) {
          case "clothOrderCoreUuid":
          case "statusKey":
            continue;
            break;
          case "clothOrderCoreNo":
          case "client":
          case "inChargeSales":
          case "quotationCoreNo":
          case "status":
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
          case "clothOrderDetailDeliver":
            var temp = {
              field: i,
              title: titles[i].title,
              filterable: {
                cell: {
                  operator: "contains",
                  suggestionOperator: "contains"
                }
              },
              width: "25%"
            }
            break;
          case "createDate":
            var temp = {
              field: i,
              title: titles[i].title,
              format: "{0:yyyy/MM/dd hh:mm}",
              filterable: {
                cell: {
                  template: function (args) {
                    args.element.kendoDatePicker({
                      culture: "zh-TW",
                      format: "{0:yyyy/MM/dd}"
                    });
                  }
                }
              }
            }
            break;
          case "cancel":
            var temp = {
              field: i,
              title: titles[i].title,
              filterable: false,
              sortable: false,
              width: "5%"
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
    },
    model: {
      fields: {
        "clothOrderCoreNo": {
          type: "string"
        },
        "client": {
          type: "string"
        },
        "inChargeSales": {
          type: "string"
        },
        "createDate": {
          type: "date"
        },
        "quotationCoreNo": {
          type: "string"
        },
        "clothOrderDetailDeliver": {
          type: "string"
        },
        "status": {
          type: "string"
        }
      }
    }
  },
  pageSize: 10,
  page: (sessionStorage.getItem("clothOrderPage") == null) ? 1 : sessionStorage.getItem("clothOrderPage")
});
$(async function () {
  await dataSource.fetch();
  var grid = $("#clothOrder").kendoGrid({
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
      sessionStorage.setItem("clothOrderPage", $("#clothOrder").data("kendoGrid").dataSource.page());
      for (i in this.columns) {
        this.autoFitColumn(i);
      }
      $("#clothOrder .k-grid-header thead .k-checkbox").prop("checked", true).trigger("click");
    }
  });
});
$(function () {
  $("body").append("<span id='noti'></span>");
  noti = $("#noti").kendoNotification({
    templates: [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>修改成功</span>" + fw_checkMrak + "</div>"
    }, {
      type: "saveFail",
      template: "<div class='saveOrInsert zoominTrans'>修改失敗</span>" + fw_checkMrak + "</div>"
    }],
    autoHideAfter: 1500
  }).data("kendoNotification");
  $('body').on('click', '[data-field ="createDate"] [title="Clear"]', async function () {
    var range = {
      start: "",
      end: ""
    };
    $("#betweenDate").data("kendoDateRangePicker").range(range);
  });
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
          format: "yyyy/MM/dd",
          change: function (e) {
            // console.log(this._range);
            let startDate = this._range.start,
              endDate = this._range.end,
              dataSource = $("#outbound").data("kendoGrid").dataSource;
            if (startDate & endDate) {
              let filter = {
                logic: "and",
                filters: []
              };
              filter.filters.push({
                field: "exportActualDate",
                operator: "gte",
                value: startDate
              });
              filter.filters.push({
                field: "exportActualDate",
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
});

function cancel(uuid, statusUuid) {
  var postData = new FormData();
  var obj = new Object();
  obj.clothOrderCore = uuid;
  obj.clothOrderStatus = statusUuid;

  postData.append("clothOrderCoreConfirm", new Blob([JSON.stringify(obj)], {
    type: "application/json"
  }));

  $.ajax({
    url: "/api/orderManagement/clothOrder/confirm/",
    data: postData,
    method: "POST",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      if (data.status) {
        noti.show({}, "saveOrInsert");
        setNoificationPosition();
        setTimeout(function () {
          dataSource.fetch();
        }, 1000);
      } else {
        noti.show({}, "saveFail");
        setNoificationPosition();
        setTimeout(function () {
          dataSource.fetch();
        }, 1000);
      }
    } // end of ajax success
  }); //end of ajax
}
