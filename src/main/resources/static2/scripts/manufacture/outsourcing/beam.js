var titles = {}, columnItem;
var columnTemplate = {
  "outsourcingBeamInquiryCoreNo": function (d) {
    return "<a class='number_a' href='/page/manufacture/outsourcing/beam/form/" + d.outsourcingBeamInquiryCoreUuid + "'>" + d.outsourcingBeamInquiryCoreNo + "</a>";
  },
  "outsourcingBeamInquiryStatus": function (d) {
    return (d.outsourcingBeamInquiryStatus == '詢價成功') ? `<span class="color_green">詢價成功</span>` : d.outsourcingBeamInquiryStatus;
  },
  "getInfoStreamLink": function (d) {
    return (d.outsourcingBeamInquiryStatus == "詢價中") ? `<a class="infoStream table_btn table_btn_pink" 
                href='javascript:void(0)' title="已複製連結" data-uid="` + d.outsourcingBeamInquiryCoreUuid + `">
                <i class="fa fa-commenting-o"></i>
              </a>` : ""
  },
  "copy": function (d) {
    return `<a class="table_btn table_btn_purple" href='javascript:void(0)' onclick="copy('` + d.outsourcingBeamInquiryCoreUuid + `')">
            <i class="fa fa-files-o"></i>
          </a>`
  },
  "print": function (d) {
    return `<a class="table_btn table_btn_green" href='/page/manufacture/outsourcing/beam/form/` + d.outsourcingBeamInquiryCoreUuid + `'>
            <i class="fa fa-print"></i>
          </a>`
  }
}

var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: '/api/manufacture/outsourcing/beam/grid',
      dataType: "json",
      type: "POST",
      processData: false,
      contentType: false
    },
    parameterMap: function (data) {
      let postData = new FormData();
      let dataFilter = data.filter;
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
    field: "outsourcingBeamInquiryCoreNo",
    dir: "desc"
  },
  schema: {
    model: {
      id: 'outsourcingBeamInquiryCoreUuid',
      fields: {
        "outsourcingBeamInquiryCoreNo": {
          type: "string"
        },
        "outsourcingCompany": {
          type: "string"
        },
        "clothNo": {
          type: "string"
        },
        "outsourcingBeamInquiryStatus": {
          type: "string"
        },
        "getInfoStreamLink": {
          type: "string"
        },
        "expiredTime": {
          type: "date"
        },
        "copy": {
          type: "string"
        },
        "print": {
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
          case "outsourcingBeamInquiryCoreUuid":
            continue;
            break;
          case "expiredTime":
            var temp = {
              field: i,
              title: titles[i].title,
              format: "{0:yyyy/MM/dd HH:mm}",
              filterable: false
            }
            break;
          case "getInfoStreamLink":
          case "copy":
          case "print":
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
  page: (sessionStorage.getItem("outsourcingBeamInquiryPage") == null) ? 1 : sessionStorage.getItem("outsourcingBeamInquiryPage")
});

$(async function () {
  await dataSource.fetch();
  var grid = $("#beam").kendoGrid({
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
      sessionStorage.setItem("outsourcingBeamInquiryPage", $("#beam").data("kendoGrid").dataSource.page());
      for (i in this.columns) {
        this.autoFitColumn(i);
      }
      $("#beam .k-grid-header thead .k-checkbox").prop("checked", true).trigger("click");
    }
  });


  if (sessionStorage.getItem("outsourcingBeamInquiryPage") != null) {
    var page = $('#beam').data('kendoGrid').dataSource.page();
    $('#beam').data('kendoGrid').dataSource.page(page)
  }

  $('body').on('click', '.infoStream ', function () {
    var btn = $(this);
    var url = "/api/manufacture/outsourcing/beam/chat/link/" + $(this).attr("data-uid");
    btn.tooltip({
      trigger: "click"
    }).queue(function () {
      $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
          if (!data.status) {
            btn.attr("data-original-title", "連結失效");
            if (data.httpStatus == 401) {
              btn.attr("data-original-title", "請登入");
              setTimeout(function () {
                location = "/"
              }, 1000);
            }
            btn.tooltip("show");
            setTimeout(function () {
              btn.tooltip("destroy");
              btn.remove();
            }, 800);
          } else {
            btn.closest("td").next().text(data.response.expiredTime);
            btn.tooltip("show");
            $("#chatlink").val(data.response.link)
            setTimeout(function () {
              btn.tooltip("destroy")
            }, 800);
          }
        }
      }) //end of ajax
      $(this).dequeue();
    }).delay(500).queue(function () {
      $("#chatlink").show().select();
      document.execCommand("copy");
      $("#chatlink").hide();
      $(this).dequeue();
    });
  })
}) //$(function ()

function copy(Uuid) {
  $.ajax({
    url: "/api/manufacture/outsourcing/beam/template/" + Uuid,
    method: 'GET',
    success: function (data) {
      if (data.status) {
        sessionStorage.setItem("outsourcingBeamCopy", JSON.stringify(data.response));
        location = "/page/manufacture/outsourcing/beam/form/";
      }
    } //end of success
  }); //end of ajax
}
