let baseUrl = "/board";
let rootApi = "/api" + baseUrl;

let boardInfoData = {};
let boardInfoWaitingData;
let boardInfoAllData;
let boardInfoAllTemplate;
let boardInfoTemplate;
let boardWaitingTemplate;

let infoStatusFilter = {
  prepare: null,
  ing: null,
  error: null,
  delay: null
};

$(async function () {
  // console.log($("#boardInfoAllTemplate").html());
  boardInfoAllTemplate = kendo.template($("#boardInfoAllTemplate").html());
  boardInfoTemplate = kendo.template($("#boardInfoTemplate").html());
  boardWaitingTemplate = kendo.template($('#boardWaitingTemplate').html());
  await setViewData();

  baseController();
});

function baseController() {
  /*工具列搜尋 輸入內容則顯示清除按鈕*/
  $('body').on('input onpropertychange', ".input-group.stylish-input-group.search > input", function () {
    if ($(this).val()) {
      $(this).next().find("nav").css("display", "contents");
    } else {
      $(this).next().find("nav").css("display", "none");
    }
  });

  /*工具列搜尋 點擊清除則刪除搜尋內容*/
  $('body').on('click', ".input-group.stylish-input-group.search > span > nav", async function () {
    $(this).parent().prev().val("");
    await setViewData();
    $(this).hide();
  });

  /*工具列搜尋 By Enter Key*/
  $('body').on('keypress', ".input-group.stylish-input-group.search > input", async function (e) {
    if (e.which === 13) {
      let searchBarValue = $(this).val();
      await setViewData(searchBarValue);
    }
  });

  /*工具列搜尋 By Click Search Icon*/
  $('body').on('click', ".input-group.stylish-input-group.search > span > button.glyphicon-search", async function (e) {
    let searchBarValue = $(this).parent().prevAll("input").val();
    await setViewData(searchBarValue);
  });

  /*工具列搜尋 By Click Search Button*/
  $('body').on('click', ".glyphicon.glyphicon-search", async function (e) {
    let searchBarValue = $(this).parents("tr").find("td[name='toolbar-searchInput']").find("input").val();
    await setViewData(searchBarValue);
  });

  $("#boardInfoAll").on("click", ".board-circle", async function () {
    let searchBarValue = $('body').find("td[name='toolbar-searchInput']").find("input").val();
    let status = $(this).parents("td").attr("name");
    switch (status) {
      case "prepare":
        if (infoStatusFilter.prepare === null) {
          infoStatusFilter.prepare = true;
          infoStatusFilter.ing = false;
          infoStatusFilter.error = false;
        } else if (infoStatusFilter.prepare === true) {
          infoStatusFilter.prepare = null;
          infoStatusFilter.ing = null;
          infoStatusFilter.error = null;
        }
        break;
      case "ing":
        if (infoStatusFilter.ing === null) {
          infoStatusFilter.ing = true;
        } else if (infoStatusFilter.ing === true) {
          infoStatusFilter.ing = null;
        } else if (infoStatusFilter.ing === false) {
          infoStatusFilter.ing = true;
          infoStatusFilter.prepare = null;
          infoStatusFilter.error = null;
        }
        break;
      default:
        if (infoStatusFilter[status] === null) {
          if (!infoStatusFilter.ing && status === "error") {
            infoStatusFilter.ing = null;
          }
          infoStatusFilter[status] = true;
        } else if (infoStatusFilter[status] === true) {
          infoStatusFilter[status] = null;
        }
        break;
    }

    await setViewData(searchBarValue);
  });
}

async function setViewData(searchBarValue) {
  let postData = new FormData();
  if (searchBarValue) {
    let filter = {
      logic: "or",
      filters: [
        {
          operator: "contains",
          value: searchBarValue,
          field: "manufactureOrderNo"
        },
        {
          operator: "contains",
          value: searchBarValue,
          field: "scheduleNo"
        },
        {
          operator: "contains",
          value: searchBarValue,
          field: "clothNo"
        }
      ]
    };

    postData.append("filter", new Blob([JSON.stringify({
      filter: filter,
    })], {
      type: "application/json"
    }));
  }
  await $.ajax({
    url: rootApi + "/wayson/waiting",
    data: postData,
    method: "POST",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      if (data.status) {
        $.each(data.response, function (index, value) {
          value.text = value.manufactureOrderNo;
        });
        boardInfoWaitingData = data.response;
      }
    } // end of ajax success
  }); //end of ajax
  await getBoardInformation("warping", "整經", postData);
  await getBoardInformation("drafting", "穿綜", postData);
  await getBoardInformation("weaving", "織布", postData);
  countBoardInfoTotal();
  $("#boardInfoAll").empty();
  $("#boardList").empty();
  $("#waitingOrderList").empty();
  $("#boardInfoAll").append(boardInfoAllTemplate(boardInfoAllData));
  $("#boardList").append(boardInfoTemplate(boardInfoData));
  $("#waitingOrderList").append(boardWaitingTemplate(boardInfoWaitingData));
  selectStatusView();
}

function selectStatusView() {
  let viewBody = {};
  let viewHeader = {};
  $.each(infoStatusFilter, function (key, value) {
    viewBody[key] = $("#boardInfoAll").find("td[name='" + key + "']");
    viewHeader[key] = $("#boardInfoAll").find("th[name='" + key + "']");
    if (value) {
      viewBody[key].addClass("board-circle-select");
      viewHeader[key].addClass("board-circle-title-select");
    } else {
      viewBody[key].removeClass("board-circle-select");
      viewHeader[key].removeClass("board-circle-title-select");
    }
  });
}

async function getBoardInformation(target, name, postData) {
  boardInfoData[target] = {};
  await $.ajax({
    url: rootApi + "/wayson/" + target,
    data: postData,
    method: "POST",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      let returnObject = [];
      if (data.status) {
        boardInfoData[target].name = name;
        boardInfoData[target].ing = 0;
        boardInfoData[target].prepare = 0;
        boardInfoData[target].error = 0;
        boardInfoData[target].delay = 0;
        $.each(data.response, function (index, value) {
          console.log(infoStatusFilter);
          let hasError = 0;
          value.text = value.manufactureOrderNo + "/" + value.scheduleNo;
          value.ing ? boardInfoData[target].ing++ : boardInfoData[target].prepare++;
          value.error ? boardInfoData[target].error++ : null;
          value.delay ? boardInfoData[target].delay++ : null;
          $.each(infoStatusFilter, function (k, v) {
            if (v !== null) {
              console.log(target);
              if (value[k] !== v && k !== "prepare") {
                console.log(k, value[k]);
                hasError = 1;
              }
            }
          });
          if (!hasError) {
            returnObject.push(value);
          }
        });

        boardInfoData[target].response = returnObject;
      }
    } // end of ajax success
  }); //end of ajax
}

function countBoardInfoTotal() {

  boardInfoAllData = {
    wait: boardInfoWaitingData.length,
    ing: 0,
    prepare: 0,
    error: 0,
    delay: 0,
  };

  $.each(boardInfoData, function (key, value) {
    boardInfoAllData.ing += value.ing;
    boardInfoAllData.prepare += value.prepare;
    boardInfoAllData.error += value.error;
    boardInfoAllData.delay += value.delay;
  })
}


