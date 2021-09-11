/*
 * Copyright (c) 2019.
 * Create by Terry Huang (黃昭維)
 */

let columnTemplate = {};
let columnItem;
let timer;

let dataSourceOption = function (url) {
  return {
    transport: {
      read: {
        url: url,
        dataType: "json",
        type: "POST",
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

let panelData = function (data, template, className) {
  return {
    dataSource: data,
    sortable: true,
    persistSelection: true,
    toolbar: kendo.template($("#PanelPerFilterTemplate").html()),
    pageable: {
      input: true,
      numeric: true
    },
    columns: columnItem,
    noRecords: true,
    messages: {
      noRecords: "查無資料"
    },
    detailTemplate: kendo.template(template.html()),
    detailInit: function (e) {
      if (className === undefined) {
        return null;
      }
      return detailInit(e, className)
    }
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

let panelPerMinData = new kendo.data.DataSource(dataSourceOption("/api/smb/smb/min/grid"));
let panelPerShiftData = new kendo.data.DataSource(dataSourceOption("/api/smb/smb/shift/grid"));
let panelPerDayData = new kendo.data.DataSource(dataSourceOption("/api/smb/smb/day/grid"));
let clothList = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/smb/smb/cloth/list",
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
  $("#smb").tabs();
  let perMin = false, perShift = false, perDay = false;
  $("#instrumentPanelPerMin-tab").on("click", async function (e) {
    if (!perMin) {
      perMin = true;
      await clothList.fetch();
      $("#window input[name='clothCore']").kendoDropDownList({
        dataSource: clothList,
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        filtering: function (e) {
          filter = e.filter;
        },
        optionLabel: " ",
        noDataTemplate: "<span class='nodata'>查無資料</span>"
      });
      await panelPerMinData.fetch();
      timer = window.setInterval(() => {
        console.log("refresh");
        panelPerMinData.fetch();
      }, 60 * 1000);
    }
    $("#instrumentPanelPerMin").kendoGrid(panelData(panelPerMinData, $("#perMinDetailTemplate"), "minDetail"));
  }).trigger("click");
  $("#instrumentPanelPerShift-tab").on("click", async function (e) {
    if (!perShift) {
      perShift = true;
      await panelPerShiftData.fetch();
    }
    $("#instrumentPanelPerShift").kendoGrid(panelData(panelPerShiftData, $("#perShiftDetailTemplate"), "shiftDetail"));
  });
  $("#instrumentPanelPerDay-tab").on("click", async function (e) {
    if (!perDay) {
      perDay = true;
      await panelPerDayData.fetch();
    }
    $("#instrumentPanelPerDay").kendoGrid(panelData(panelPerDayData, $("#perDayDetailTemplate"), "dayDetail"));
  });
  $(".clear").click(function () {
    $(this).hide();
    $(this).siblings("input").val("").trigger("keyup");
  });

  let popup = $("#window").kendoWindow({
    modal: true,
    width: "35%",
    height: "85%",
    resizable: false,
    visible: false,
    open: function () {
      $("body").addClass("overlay");
    },
    close: function () {
      $("body").removeClass("overlay");
      $("#window input").val(null);
    }
  }).data('kendoWindow');

  $("#window .confirmBtn button").on("click", function () {
    saveBeamOn();
    popup.close();
  });
  $("#window .cancelBtn button").on("click", function () {
    popup.close();
  });
});

function toggleIcon(e) {
  $(e.target)
    .prev('.panel-heading')
    .find(".more-less")
    .toggleClass('glyphicon-plus glyphicon-minus');
}

function beamOn(target) {
  let id = $(target).attr("id");
  let window = $("#window").data("kendoWindow");
  $("#window input[name='weavingMachine']").val(id);
  window.open();
  window.center();
}

function saveBeamOn() {
  let data = {};
  $("#window input").each(function (index, value) {
    let f = $(value);
    data[f.attr("name")] = f.val();
  });
  let postData = new FormData();
  postData.append("beamOn", new Blob([JSON.stringify(data)], {
    type: "application/json"
  }));
  $.ajax({
    url: "/api/smb/smb/beam/on",
    data: postData,
    method: "PUT",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      // success
    } // end of ajax success
  }); //end of ajax
}

$(document).on('hidden.bs.collapse', '.collapse', toggleIcon);
$(document).on('shown.bs.collapse', '.collapse', toggleIcon);
