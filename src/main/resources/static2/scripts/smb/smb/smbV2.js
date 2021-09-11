/*
 * Copyright (c) 2019.
 * Create by Terry Huang (黃昭維)
 */

let columnTemplate = {};
let columnItem;
let timer;
let notification;

let dataSourceOption = function (url, isOriginal) {
  return {
    autoSync: true,
    transport: {
      read: {
        url: url,
        dataType: "json",
        type: isOriginal ? "GET" : "POST",
        processData: false,
        contentType: false
      },
      parameterMap: function (data) {
        let postData = new FormData();
        postData.append("filter", new Blob([JSON.stringify({
          size: data.pageSize,
          page: data.page -= 1,
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
        for (let i in titles) {
          if (titles[i].type === "hidden") {
            continue;
          }

          let temp = {
            field: i,
            title: titles[i].title
          };

          if (columnTemplate[i]) {
            temp.template = columnTemplate[i];
          }
          columnItem.push(temp);
        } // loop
        return data.response.contents;
      }
    },
    pageSize: 10,
    page: (sessionStorage.getItem("instrumentPanelPerMinPage") == null) ? 1 : sessionStorage.getItem("instrumentPanelPerMinPage")
  }
};

let panelData = function (data, template, className, detail = true, counter = false) {
  return {
    dataSource: data,
    sortable: true,
    persistSelection: true,
    toolbar: counter ? kendo.template($("#countDownBarTemplate").html()) : null,
    pageable: {
      input: true,
      numeric: true
    },
    columns: columnItem,
    noRecords: true,
    messages: {
      noRecords: "查無資料"
    },
    detailTemplate: !detail ? null : kendo.template(template.html()),
    detailInit: function (e) {
      if (className === undefined) {
        return null;
      }
      return detailInit(e, className)
    },
    dataBound: function (e) {
      if (!detail) {
        e.sender.pager.element.hide();
        this.wrapper.find(".k-hierarchy-col").remove(); // remove col elements for hierarchy column
        this.wrapper.find(".k-hierarchy-cell").hide(); // remove cell elements for hierarchy column
      }
    },
  };
};
let detailInit = async function (e, className) {
  let contents = e.data.detail.contents;
  let header = e.data.detail.header;
  let detailColumnItem = [];

  await $.each(header, function (key, value) {
    if (value.type === undefined || value.type === "hidden") {
      return;
    }
    let temp = {
      field: key,
      title: value.title,
      filterable: {
        cell: {
          operator: "contains",
          suggestionOperator: "contains"
        }
      }
    };
    detailColumnItem.push(temp);
  });

  e.detailRow.find("." + className).kendoGrid({
    dataSource: contents,
    sortable: true,
    persistSelection: true,
    pageable: false,
    columns: detailColumnItem,
    noRecords: true,
    messages: {
      noRecords: "查無資料"
    }
  });
};

let smbOriginalData = new kendo.data.DataSource(dataSourceOption("/api/smb/smb/raw/grid", true));
let panelPerMinData = new kendo.data.DataSource(dataSourceOption("/api/smb/smb/min/grid"));
let panelPerShiftData = new kendo.data.DataSource(dataSourceOption("/api/smb/smb/shift/grid"));
let panelPerDayData = new kendo.data.DataSource(dataSourceOption("/api/smb/smb/day/grid"));

$(function () {
  $("#smb").tabs();
  let perMin = false, perShift = false, perDay = false, original = false;
  // 原始資料
  $("#smbOriginalContent-tab").on("click", async function (e) {
    if (!original) {
      original = true;
      await smbOriginalData.fetch();
      $("#smbOriginal").kendoGrid(panelData(smbOriginalData, null, null, false, true));
      $("#smbOriginal").find(".progressbar").kendoProgressBar({
        min: 0,
        max: 60,
        value: 60,
        type: "value",
        reverse: true,
        animation: {
          duration: 200
        }
      });
      let pb = $("#smbOriginal").find(".progressbar").data("kendoProgressBar");
      oneMinuteCount(pb);
      setInterval(() => {
        oneMinuteCount(pb);
      }, 60000);
    }
  });
  // 當班
  $("#instrumentPanelPerMin-tab").on("click", async function (e) {
    if (!perMin) {
      perMin = true;
      await panelPerMinData.fetch();
      await $("#instrumentPanelPerMin").kendoGrid(panelData(panelPerMinData, $("#perMinDetailTemplate"), "minDetail", true, true));

      $("#instrumentPanelPerMin").find(".progressbar").kendoProgressBar({
        min: 0,
        max: 60,
        value: 60,
        type: "value",
        reverse: true,
        animation: {
          duration: 200
        }
      });
      let pb = $("#instrumentPanelPerMin").find(".progressbar").data("kendoProgressBar");
      oneMinuteCount(pb);
      setInterval(() => {
        oneMinuteCount(pb);
      }, 60000);
    }
  }).trigger("click");

  // 三班
  $("#instrumentPanelPerShift-tab").on("click", async function (e) {
    if (!perShift) {
      perShift = true;
      await panelPerShiftData.fetch();
      $("#instrumentPanelPerShift").kendoGrid(panelData(panelPerShiftData, $("#perShiftDetailTemplate"), "shiftDetail", true, false));
    } else {
      await panelPerShiftData.fetch();
    }
  });
  // 當日
  $("#instrumentPanelPerDay-tab").on("click", async function (e) {
    if (!perDay) {
      perDay = true;
      await panelPerDayData.fetch();
      $("#instrumentPanelPerDay").kendoGrid(panelData(panelPerDayData, $("#perDayDetailTemplate"), "dayDetail", true, true));
      $("#instrumentPanelPerDay").find(".progressbar").kendoProgressBar({
        min: 0,
        max: 60,
        value: 60,
        type: "value",
        reverse: true,
        animation: {
          duration: 200
        }
      });
      let pb = $("#instrumentPanelPerDay").find(".progressbar").data("kendoProgressBar");
      oneMinuteCount(pb);
      setInterval(() => {
        oneMinuteCount(pb);
      }, 60000);
    }
  });

  notification = setNotification("更新", "更新");
});

function saveWeavingInfoV2(id) {
  let t = $("#" + id);
  let weavingInfoType = null;
  let weavingMachineCoreNo = null;
  let value = t.parent("div").find("input").val();
  let strValue = null;

  if (t.hasClass("submit_weftDensity")) {
    weavingInfoType = 0;
    weavingMachineCoreNo = parseInt(id.replace("submit_weftDensity_", ""));
  } else if (t.hasClass("submit_shrinkage")) {
    weavingInfoType = 1;
    weavingMachineCoreNo = parseInt(id.replace("submit_shrinkage_", ""));
  } else if (t.hasClass("submit_beamLength")) {
    weavingInfoType = 2;
    weavingMachineCoreNo = parseInt(id.replace("submit_beamLength_", ""));
  } else if (t.hasClass("submit_clothNo")) {
    weavingInfoType = 3;
    strValue = value;
    value = 0;
    weavingMachineCoreNo = parseInt(id.replace("submit_clothNo_", ""));
  }

  let data = {
    "weavingMachineCoreNo": weavingMachineCoreNo,
    "weavingInfoType": weavingInfoType,
    "value": value === "" ? null : value,
    "strValue": strValue
  };
  let postData = new FormData();
  postData.append("weavingInfoV2", new Blob([JSON.stringify(data)], {
    type: "application/json"
  }));

  $.ajax({
    url: "/api/smb/smb/weavingInfoV2",
    data: postData,
    method: "PUT",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (response) {
      // success
      if (response.status) {
        setNotification()
        notification.show({}, "saveOrInsert");
        setNoificationPosition();
      } else {
        notification.show({}, "error");
        setNoificationPosition();
      }
    } // end of ajax success
  }); //end of ajax
}

function oneMinuteCount(pb) {
  let interval = window.setInterval(() => {
    let counts = pb.value();
    counts -= 1;
    if (counts === 0) {
      panelPerDayData.fetch();
      clearInterval(interval);
      pb.value(60);
    } else {
      pb.value(counts);
    }
  }, 1000);
}
// $(document).on('hidden.bs.collapse', '.collapse', toggleIcon);
// $(document).on('shown.bs.collapse', '.collapse', toggleIcon);
