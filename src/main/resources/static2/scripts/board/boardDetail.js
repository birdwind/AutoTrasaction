let baseUrl = "/board";
let rootApi = "/api" + baseUrl;

let boardInfoAllTemplate;
let detailTimeLineTemplate;
let detailCartTemplate;
let detailLastCartTemplate = `
<li>
  <i class="fa fa-clock-o bg-gray"></i>
</li>
`;
let boardInfoAllData = {};
let boardDetailData;
let selectDate;

let isWeek = false;
let startDate;
let endDate;
let searchBarValue;

let infoStatusFilter = {
    prepare: null,
    ing: null,
    error: null,
    delay: null
};

$(async function () {
    selectDate = new Date(moment());
    boardInfoAllTemplate = kendo.template($("#boardInfoAllTemplate").html());
    detailTimeLineTemplate = kendo.template($("#detailTimeLineTemplate").html());
    detailCartTemplate = kendo.template($("#detailCartTemplate").html());
    $("#detail").kendoScheduler({
        date: moment().format("YYYY/MM/DD"),
        height: 600,
        views: [
            {type: "day", selected: true, selectedDateFormat: "{0:yyyy/MM/dd}"},
            {type: "workWeek", selectedDateFormat: "{0:yyyy/MM/dd} - {1:yyyy/MM/dd}"}
        ],
        editable: false,
        allDaySlot: false,
        footer: false,
        messages: {
            today: "回到今天",
            views: {
                day: "天",
                workWeek: "周",
            }
        },
        dataBound: function (e) {
            /*change calendar footer*/
            this.element.find(".k-state-default.k-nav-current").trigger("click");
            $('body').find(".k-animation-container").find(".k-footer").hide();
            $('body').find(".k-animation-container").hide();

            /*change calendar footer*/
            var itemViews = this.items();
            var items = this.data();
            itemViews.each(function (index, value) {
                if (items[index].error) {
                    $(value).addClass("board-error");
                }
                if (items[index].delay) {
                    $(value).addClass("board-delay");
                }
                if (!items[index].ing) {
                    $(value).addClass("board-prepare");
                }
            })


        },
        navigate: function (e) {
            selectDate = e.date;
            console.log(e.action);
            if (e.action === "next" || e.action === "previous" || e.action === "changeDate" || e.action === "changeView" || e.action === "today") {
                if (e.view === "workWeek") {
                    isWeek = true;
                    setViewData();
                } else {
                    isWeek = false;
                    setViewData();
                }
            }
        }
    });
    await setViewData();
    setBreadcrumb();
    baseController();
});

function baseController() {
    /*工具列搜尋 輸入內容則顯示清除按鈕*/
    $('body').on('input onpropertychange', ".input-group.stylish-input-group.search > input", function () {
        if ($(this).val()) {
            $(this).next().find("nav").css("display", "contents");
            searchBarValue = $(this).val();
        } else {
            $(this).next().find("nav").css("display", "none");
        }
    });

    /*工具列搜尋 點擊清除則刪除搜尋內容*/
    $('body').on('click', ".input-group.stylish-input-group.search > span > nav", async function () {
        $(this).parent().prev().val("");
        await setViewData();
        searchBarValue = "";
        $(this).hide();
    });

    /*工具列搜尋 By Enter Key*/
    $('body').on('keypress', ".input-group.stylish-input-group.search > input", async function (e) {
        if (e.which === 13) {
            searchBarValue = $(this).val();
            await setViewData();
        }
    });

    /*工具列搜尋 By Click Search Icon*/
    $('body').on('click', ".input-group.stylish-input-group.search > span > button.glyphicon-search", async function (e) {
        searchBarValue = $(this).parent().prevAll("input").val();
        await setViewData();
    });

    /*工具列搜尋 By Click Search Button*/
    $('body').on('click', ".glyphicon.glyphicon-search", async function (e) {
        searchBarValue = $(this).parents("tr").find("td[name='toolbar-searchInput']").find("input").val();
        await setViewData();
    });

    $("#detail").on("click", "span[name='timelineTime']", function () {
        if ($(this).attr("collapse") === "false") {
            $(this).attr("collapse", "true");
            $(this).children().removeClass("fa-minus");
            $(this).children().addClass("fa-plus");
            $(this).next().find("li").hide();
        } else {
            $(this).attr("collapse", "false");
            $(this).children().removeClass("fa-plus");
            $(this).children().addClass("fa-minus");
            $(this).next().find("li").show();
        }
    });

    // $("#boardInfoAll").on("click", ".board-circle", async function () {
    //     searchBarValue = $('body').find("td[name='toolbar-searchInput']").find("input").val();
    //     let status = $(this).parents("td").attr("name");
    //     switch (status) {
    //         case "prepare":
    //             if (infoStatusFilter.prepare === null) {
    //                 infoStatusFilter.prepare = true;
    //                 infoStatusFilter.ing = false;
    //                 infoStatusFilter.error = false;
    //             } else if (infoStatusFilter.prepare === true) {
    //                 infoStatusFilter.prepare = null;
    //                 infoStatusFilter.ing = null;
    //                 infoStatusFilter.error = null;
    //             }
    //             break;
    //         case "ing":
    //             if (infoStatusFilter.ing === null) {
    //                 infoStatusFilter.ing = true;
    //             } else if (infoStatusFilter.ing === true) {
    //                 infoStatusFilter.ing = null;
    //             } else if (infoStatusFilter.ing === false) {
    //                 infoStatusFilter.ing = true;
    //                 infoStatusFilter.prepare = null;
    //                 infoStatusFilter.error = null;
    //             }
    //             break;
    //         default:
    //             if (infoStatusFilter[status] === null) {
    //                 if (!infoStatusFilter.ing && status === "error") {
    //                     infoStatusFilter.ing = null;
    //                 }
    //                 infoStatusFilter[status] = true;
    //             } else if (infoStatusFilter[status] === true) {
    //                 infoStatusFilter[status] = null;
    //             }
    //             break;
    //     }
    //
    //     await setViewData();
    // });
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

async function setViewData() {
    await getBoardInformation(target, searchBarValue, isWeek);
    $("#boardInfoAll").empty();
    $("#boardInfoAll").append(boardInfoAllTemplate(boardInfoAllData));
    $("#detail").data("kendoScheduler").setDataSource(getDataSource(boardDetailData));
    // $("#detail").empty();
    // for (let hour = 0; hour < 24; hour++) {
    //     $("#detail").append(detailTimeLineTemplate(hour));
    // }
    // $("#detail").append(detailLastCartTemplate);
    // $("#cart_0").parents("li.time-label").show();
    // $.each(boardDetailData, function (index, value) {
    //     let selectorId = "#cart_" + value.time;
    //     $(selectorId).parents("li.time-label").show();
    //     $(selectorId).parents("li.time-label").next().show();
    //     $(selectorId).append(detailCartTemplate(value));
    // });

    selectStatusView();
}

async function getBoardInformation(target, searchFilter, isWeek) {
    let postData = new FormData();
    if (searchFilter) {
        let filter = {
            logic: "or",
            filters: [
                {
                    operator: "contains",
                    value: searchFilter,
                    field: "manufactureOrderNo"
                },
                {
                    operator: "contains",
                    value: searchFilter,
                    field: "scheduleNo"
                },
                {
                    operator: "contains",
                    value: searchFilter,
                    field: "clothNo"
                },
            ]
        };

        postData.append("filter", new Blob([JSON.stringify({
            filter: filter,
        })], {
            type: "application/json"
        }));
    }
    let dateParam;
    if (isWeek) {
        startDate = moment(selectDate).startOf('week').format("YYYY/MM/DD");
        endDate = moment(selectDate).endOf('week').format("YYYY/MM/DD");
    } else {
        startDate = moment(selectDate).format("YYYY/MM/DD");
        endDate = moment(selectDate).add(1, "day").format("YYYY/MM/DD");
    }
    dateParam = "?start=" + startDate + "&end=" + endDate;
    await $.ajax({
        url: rootApi + "/wayson/" + target + dateParam,
        data: postData,
        method: "POST",
        contentType: false,
        processData: false,
        dataType: "json",
        success: async function (data) {
            let returnObject = [];
            if (data.status) {
                boardInfoAllData.ing = 0;
                boardInfoAllData.prepare = 0;
                boardInfoAllData.error = 0;
                boardInfoAllData.delay = 0;
                await $.each(data.response, function (index, value) {
                    let hasError = 0;
                    value.ing ? boardInfoAllData.ing++ : boardInfoAllData.prepare++;
                    value.error ? boardInfoAllData.error++ : null;
                    value.delay ? boardInfoAllData.delay++ : null;
                    value.time = new Date(value.startDatetime).getHours();
                    value.text = [];
                    value.text.push("工單:" + value.manufactureOrderNo);
                    value.text.push("排程:" + value.orderScheduleNo);
                    value.text.push("整經:" + value.scheduleNo);
                    value.text.push("盤頭:" + value.beamNo + "(" + value.yarnBatchNo + ")");
                    $.each(infoStatusFilter, function (k, v) {
                        if (v !== null) {
                            if (value[k] !== v) {
                                hasError = 1;
                            }
                        }
                    });
                    if (!hasError) {
                        returnObject.push(value);
                    }
                });
                boardDetailData = returnObject;
            }
        } // end of ajax success
    }); //end of ajax
}

function getDataSource(responseData) {
    let thisData = [];
    $.each(responseData, function (index, item) {
        let object = {};
        object.start = item.startDatetime;
        object.end = moment(item.startDatetime).add(1, "hour").format("YYYY/MM/DD HH:mm");
        object.title = item.text[0];
        object.ing = item.ing;
        object.error = item.error;
        object.delay = item.delay;
        thisData.push(object);
    });

    return new kendo.data.SchedulerDataSource({
        data: thisData
    });
}


function setBreadcrumb() {
    let breadCrumbNow = "";
    switch (target) {
        case "warping":
            breadCrumbNow = "整經";
            break;
        case "drafting":
            breadCrumbNow = "穿綜";
            break;
    }
    $("#breadcrumb > li.active").text(breadCrumbNow);
    $("#breadcrumb > li:eq(1) > a").text("電子看板");
    $("#breadcrumb > li:eq(1) > a").attr("onclick", "window.history.back()");
}
