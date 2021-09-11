var titles = {}, columnItem;
var columnTemplate = {
  "yarnExportCoreNo": function (d) {
    return "<a class='number_a' href='/page/yarn/export/form/" + d.yarnExportCoreUuid + "'>" + d.yarnExportCoreNo + "</a>";
  },
  "copy": function (d) {
    return `<a class="table_btn table_btn_purple" onclick="copyOutbound('` + d.yarnExportCoreUuid + `')" href='javascript:void(0)' data-uid="` + d.yarnExportCoreUuid + `">
                <i class="fa fa-files-o"></i>
              </a>`
  }
}
var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: '/api/yarn/export/grid',
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
            case "exportActualDate":
              let setDate = new Date(value.value);
              let startOfFilterDate = setDate.getFullYear() + "-" + (setDate.getMonth() + 1) + "-" + setDate.getDate() + "T00:00:00+0800";
              let endOfFilterDate = setDate.getFullYear() + "-" + (setDate.getMonth() + 1) + "-" + setDate.getDate() + "T23:59:59+0800";
              switch (value.operator) {
                case "eq":
                  var obj = new Object();
                  value.operator = "gte";
                  value.value = startOfFilterDate;
                  obj.field = "exportActualDate";
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
  sort: {
    field: "yarnExportCoreNo",
    dir: "desc"
  },
  schema: {
    total: function (data) {
      return data.response.totalElements
    },
    data: function (data) {
      titles = data.response.header;
      columnItem = [{
        selectable: true,
        width: "5%"
      }];

      for (i in titles) {
        switch (i) {
          case "yarnExportCoreUuid":
            continue;
            break;
          case "exporter":
            var temp = {
              field: i,
              title: titles[i].title,
              filterable: {
                cell: {
                  operator: "contains",
                  suggestionOperator: "contains"
                }
              },
              width: "20%"
            }
            break;
          case "yarnCores":
          case "warehouse":
          case "yarnExportCoreNo":
            var temp = {
              field: i,
              title: titles[i].title,
              filterable: {
                cell: {
                  operator: "contains",
                  suggestionOperator: "contains"
                }
              },
              width: "15%"
            }
            break;
          case "exportActualDate":
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
                },
                width: "25%"
              }
            }
            break;
          case "copy":
            var temp = {
              field: i,
              title: titles[i].title,
              filterable: false,
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
        "yarnExportCoreNo": {
          type: "string"
        },
        "exportActualDate": {
          type: "date"
        },
        "warehouse": {
          type: "string"
        },
        "yarnCores": {
          type: "string"
        },
        "exporter": {
          type: "string"
        },
        "copy": {
          type: "string"
        }
      }
    }
  },
  pageSize: 10,
  page: (sessionStorage.getItem("outboundPage") == null) ? 1 : sessionStorage.getItem("outboundPage")
});
$(function () {
  $('body').on('click', '[data-field ="exportActualDate"] [title="Clear"]', async function () {
    var range = {
      start: "",
      end: ""
    };
    $("#betweenDate").data("kendoDateRangePicker").range(range);
  });
  $('body').on('change', '[data-field ="exportActualDate"] .k-dropdown-operator input', async function () {
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
$(async function () {
  fw_confirmBox.init({
    content: $("#confirmTemplate").html(),
    confirmEvent: "confirmDel"
  });
  await dataSource.fetch();
  var grid = $("#outbound").kendoGrid({
    dataSource: dataSource,
    toolbar: kendo.template($("#toolbar").html()),
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
      sessionStorage.setItem("outboundPage", $("#outbound").data("kendoGrid").dataSource.page());
      for (i in this.columns) {
        this.autoFitColumn(i);
      }
      $("#outbound .k-grid-header thead .k-checkbox").prop("checked", true).trigger("click");
    }

  });

  $('body').on('click', '#outbound .k-checkbox', function () {
    $("#trashBin").hide();
    if ($("#outbound .k-grid-content tbody input:checkbox:checked").length) {
      $("#trashBin").show();
    }

  }) //checkbox 
  $("#trashBin").click(function () {
    if (!$("#outbound .k-grid-content tbody input:checkbox:checked").length) {
      return false;
    }
    fw_confirmBox.show();
  }) //trashBin

  // if (sessionStorage.getItem("outboundfilter") != null) {
  //   var page = $('#outbound').data('kendoGrid').dataSource.page();
  //   // var filter = sessionStorage.getItem("outboundfilter");
  //   // $('#outbound').data('kendoGrid').dataSource.filter(filter);
  //   $('#outbound').data('kendoGrid').dataSource.page(page);
  // }
}) //$(function ()
function confirmDel() {
  var uuidSet = [];
  var theGrid = $('#outbound').data("kendoGrid");
  theGrid.select().each(function () {
    uuidSet.push(theGrid.dataItem(this).yarnExportCoreUuid);
  });
  theGrid.select().each(function () {
    theGrid.removeRow(this);
  });
  var page = theGrid.dataSource.page();
  theGrid.dataSource.page(-1);
  theGrid.dataSource.page(page);
  var postData = new FormData();
  postData.append("yarnExportCoreDelete", new Blob([JSON.stringify({
    "yarnExportCoreUuids": uuidSet
  })], {
    type: "application/json"
  }));

  $.ajax({
    url: "/api/yarn/export",
    data: postData,
    method: "DELETE",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      fw_confirmBox.box.find("button, h2, .fa-times").addClass("invisible");
      fw_confirmBox.box.find(".fa-trash").show();
      fw_confirmBox.box.find(".fa-file-text-o").addClass("throwIn").delay(2000).queue(function () {
        fw_confirmBox.box.find(".fa-trash").hide();
        fw_confirmBox.box.find(".fa-file-text-o").removeClass("throwIn");
        fw_confirmBox.box.find(".invisible").removeClass("invisible");
        $(this).dequeue();
      });
    } // end of ajax success
  }); //end of ajax
} //confirmDel
function copyOutbound(Uuid) {
  $.ajax({
    url: "/api/yarn/export/template/" + Uuid,
    method: 'GET',
    success: function (data) {
      if (data.status) {
        sessionStorage.setItem("outboundCopy", JSON.stringify(data.response));
        location = "/page/yarn/export/form";
      }
    } //end of success
  }); //end of ajax
}
