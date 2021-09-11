let timeout = 1000;
let generateNotificationItem = function (title, time, isRead, notificationUuid) {
  let template = kendo.template($("#notification-template").html());
  return template({"title": title, "time": time, "isRead": isRead, "notificationUuid": notificationUuid});
};

$(function () {
  if (sideMenu != null) {
    $("#identityBtn,#leftPanel").text(sideMenu.name);
  }
  creatFunctionTree();
  updateTime();

  let s = "";
  let counter = 0;
  for (let i in notifications) {
    let n = notifications[i];
    if (!n.isRead) {
      counter += 1;
    }
    s += generateNotificationItem(n.title, n.createDate, n.isRead, n.notificationUuid);
  }

  let label = $("#notification-counter-label");
  $("#notification-counter").html(counter);
  if (counter > 0) {
    label.css("display", "block");
    label.html(counter > 10 ? "10+" : counter);
  } else {
    label.css("display", "none");
  }
  $("#notification-menu").html(s);

  let notificationWindow = $("#notification-window").kendoWindow({
    modal: true,
    width: "80%",
    height: "85%",
    resizable: false,
    visible: false,
    open: function () {
      $("body").addClass("overlay");
      $("#notification-window .container").kendoGrid({
        dataSource: {
          transport: {
            read: {
              url: "/api/notification/grid",
              method: "POST",
              dataType: "json",
              processData: false,
              contentType: false
            },
            parameterMap: function (data) {
              let postData = new FormData();
              postData.append("filter", new Blob([JSON.stringify({
                size: data.pageSize,
                page: data.page -= 1,
                // filter: data.filter,
                sort: [
                  {
                    field: "isRead",
                    dir: "asc"
                  },
                  {
                    field: "createDate",
                    dir: "desc"
                  }
                ]
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
            model: {
              id: "notificationUuid",
              // fields: {
              //   check: {
              //     type: "string"
              //   },
              //   title: {
              //     type: "string"
              //   },
              //   createDate: {
              //     type: "string"
              //   },
              //   field: {
              //     type: "string"
              //   }
              // }
            },
            total: function (data) {
              return data.response.totalElements;
            },
            data: function (data) {
              return data.response.contents;
            }
          },
          pageSize: 10,
          page: 1
        },
        sortable: false,
        persistSelection: true,
        pageable: {
          input: true,
          numeric: true,
          messages: {
            display: "第 {0}-{1} 筆，共 {2} 筆",
            empty: " ",
            page: "第",
            of: "頁，共{0}頁"
          }
        },
        columns: [
          {selectable: true, width: "50px"},
          {
            field: "title", title: "通知內容", width: "40%",
            template: function (dataItem) {
              return `<a href="/page/notification/${dataItem.notificationUuid}">${dataItem.title}</a>`;
            }
          },
          {field: "createDate", title: "時間", width: "15%"},
          {
            field: "isRead", title: "已讀/未讀", width: "15%",
            template: function (dataItem) {
              if (dataItem.isRead) {
                return "<strong style='color: #00a65a'>已讀</strong>";
              }
              return "<strong style='color: #c23321'>未讀</strong>";
            }
          }
        ],
        noRecords: true,
        messages: {
          noRecords: "目前沒有通知"
        }
      });
    },
    close: function () {
      $("body").removeClass("overlay");
    }
  }).data('kendoWindow');

  $("#notification-window").before("<button class='close'><i class='fa fa-times'></i></button>");

  $("#notification-check-all").on("click", function () {
    notificationWindow.open();
    notificationWindow.center();
  });

  $(".close").on("click", function () {
    notificationWindow.close();
  });

  $(".caret").position({
    my: "left",
    at: "right",
    of: "#time",
    collision: "fit"
  });

  $('#calender').datetimepicker({
    inline: true,
  });

  $('#calenderBtn').on("click", function () {
    $("#calender").position({
      my: "left top ",
      at: "left bottom ",
      of: "#calenderBtn",
      collision: "fit"
    });
    $("#calender").slideToggle(300, function () {
      if ($("#calender").is(":hidden")) {
        $("#calender").css({
          top: 0,
          left: 0
        });
      }
    }); // end of slide toggle
  });
});

function updateTime() {
  $("#todayDate").text(getTodayDate(new Date()));
  $("#currentTime").text(getTodayTime(new Date()));
  let ss = new Date().getSeconds();
  //為了不要耗費背景資源，當秒數為整時，將時間調為1分鐘設定一次
  // if (ss === 0) {
  //   timeout = 60000;
  // }
  setTimeout(updateTime, timeout);
}

function getTodayDate(date) {
  let yyyy = date.getFullYear();
  let MM = date.getMonth() + 1;
  let dd = date.getDate();
  return (yyyy + '/' + addZeroBefore(MM) + '/' + addZeroBefore(dd));
}

function getTodayTime(date) {
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  return (addZeroBefore(hh) + ':' + addZeroBefore(mm) + ':' + addZeroBefore(ss));
  // let AMPM = hh >= 12 ? 'PM' : 'AM';
  // hh = hh % 12;
  // hh = hh ? hh : 12;
  //return (addZeroBefore(hh) + ':' + addZeroBefore(mm) + ' ' + AMPM);
}

function addZeroBefore(n) {
  return (n < 10 ? '0' : '') + n;
}
