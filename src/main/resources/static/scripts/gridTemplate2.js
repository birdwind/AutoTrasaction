/*
 * kgrid_baseUrl = function等級的Url
 * kgrid_url = grid Api Url
 * kgrid_datasource = dataSource
 * kgrid_grid = grid jquery selector
 * kgrid_kendoGrid = kendo grid
 * kgrid_titles = response.header
 * kgrid_totalElements = response.totalElements
 * kgrid_fieldType = dataSource model
 * kgrid_columns = grid 欄位格式物件
 * kgrid_linkField = 當成點擊的欄位
 * kgrid_linkUuid = 當成點擊欄位的參數
 * kgrid_searchWindow = 進階搜尋視窗
 * kgrid_searchField = 可搜尋的欄位物件
 * gridSearchWindow = 進階搜尋HTML
 * kgrid_gridTemplate = grid特殊欄位HTML
 */

let kgrid_baseUrl, kgrid_url, kgrid_datasource, kgrid_grid, kgrid_titles, kgrid_totalElements, kgrid_fieldType = {},
    kgrid_columns, kgrid_kendoGrid;

let kgrid_linkField, kgrid_linkUuid;

let kgrid_searchWindow, kgrid_searchField;

let kgrid_searchPanelBar;

let kgrid_toolbarSearchField;

let kgrid_selectUuid;

let gridSearchWindow =
    `<div id="searchWindow" class="card">
        <div class="card-body"></div>
    </div>`;

let searchPanelBar = function () {
    return `
  <div>
    <ul id="panel" class="search-panel">
      <li id="panel-search">
       <div id="searchRow"></div>
      </li>
    </ul>
  </div>
  `;
};

let toolbarInit =
    `<div id="toolbar">
        <nav class="navbar navbar-expand" id="toolbar">
            <ul class="navbar-nav col-md-11 col-sm-11 col-10 left">
                <li class="nav-item">
                    <div class="row" style="margin-top: 1rem;"></div>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto right"></ul>
        </nav>
    </div>`;

let toolbarSearchBar =
    `<div>
        <div class="form-group">
            <div class="input-group">
                <input type="search" class="form-control search-bar-input">
            </div>
        </div>
    </div>`;

let dateInput =
    `<div>
        <div class="form-group">
            <input class="form-control date" placeholder="年/月/日"/>
        </div>
     </div>`;

let kgrid_gridTemplate = {
    "none": function () {
        return ``;
    },
    "toolbar": function () {
        let addButton =
            `<a class="nav-link icon fa-stack"><i class="fa fa-circle fa-stack-2x icon-background"></i><i class="fas fa-plus fa-stack-1x icon"></i></a>`;
        addButton = $(addButton).attr('href', '/page' + kgrid_baseUrl + '/form');

        let toolbar = $(toolbarInit).find('.right').append(addButton).parents().last();
        return toolbar;
    },
    "toolbar-search": function () {
        let addButton =
            `<a class="nav-link icon fa-stack"><i class="fa fa-circle fa-stack-2x icon-background"></i><i class="fas fa-plus fa-stack-1x icon"></i></a>`;
        addButton = $(addButton).attr('href', '/page' + kgrid_baseUrl + '/form');
        console.log(addButton);

        let toolbar = $(toolbarInit).find('.right').append(addButton).parents().last();
        let searchBar = $(toolbarSearchBar).addClass("col-12").find('input').attr('placeholder', getSearchBarPlaceHolder()).parent().append(`
            <div class="input-group-append">
                <button type="submit" class="btn btn-default">
                    <i class="fa fa-search"></i>
                </button>
            </div>`).parents().last();

        toolbar = $(toolbar).find('.left .nav-item .row').append(searchBar).parents().last();

        return toolbar;
    },
    "toolbar-search-date": function () {
        let addButton =
            `<a class="nav-link icon fa-stack"><i class="fa fa-circle fa-stack-2x icon-background"></i><i class="fas fa-plus fa-stack-1x icon"></i></a>`;
        addButton = $(addButton).attr('href', '/page' + kgrid_baseUrl + '/form');

        let toolbar = $(toolbarInit).find('.right').append(addButton).parents().last();
        let searchBar = $(toolbarSearchBar).addClass("col-md-5 col-sm-12 col-12").find('input').attr('placeholder', getSearchBarPlaceHolder()).parents().last();
        let startDateInput = $(dateInput).addClass("col-md-2 col-sm-3 col-12").find('input').attr("name", "start-date").addClass("start-date").parents().last();
        let endDateInput = $(dateInput).addClass("col-md-2 col-sm-3 col-12").find('input').attr("name", "end-date").addClass("end-date").parents().last();

        toolbar = $(toolbar).find('.left .nav-item .row').append(searchBar).parents().last();
        toolbar = $(toolbar).find('.left .nav-item .row').append(startDateInput).parents().last();
        toolbar = $(toolbar).find('.left .nav-item .row').append(endDateInput).parents().last();
        toolbar = $(toolbar).find('.left .nav-item .row').append(`<div class="col-lg-1 col-md-1 col-sm-1 col-2" style="margin-right: 20px;"><button type="button" class="btn btn-block" name="searchBtn">搜尋</button></div>`).parents().last();

        return toolbar;
    },
    "toolbar-advancedSearch": function () {
        let addButton =
            `<a class="nav-link icon fa-stack"><i class="fa fa-circle fa-stack-2x icon-background"></i><i class="fas fa-plus fa-stack-1x icon"></i></a>`;
        addButton = $(addButton).attr('href', '/page' + kgrid_baseUrl + '/form');

        let toolbar = $(toolbarInit).find('.right').append(addButton).parents().last();
        let searchBar = $(toolbarSearchBar).addClass("col-md-9 col-sm-9 col-7").find('input').attr('placeholder', getSearchBarPlaceHolder()).parents().last();

        toolbar = $(toolbar).find('.left .nav-item .row').append(searchBar).parents().last();
        toolbar = $(toolbar).find('.left .nav-item .row').append(`<div class="col-lg-2 col-md-2 col-sm-2 col-3"><button type="button" id="more-search" class="btn btn-block">進階搜尋</button></div>`).parents().last();

        return toolbar;
    },
    "toolbar-all": function () {
        let addButton =
            `<a class="nav-link icon fa-stack"><i class="fa fa-circle fa-stack-2x icon-background"></i><i class="fas fa-plus fa-stack-1x icon"></i></a>`;
        addButton = $(addButton).attr('href', '/page' + kgrid_baseUrl + '/form');

        let toolbar = $(toolbarInit).find('.right').append(addButton).parents().last();
        let searchBar = $(toolbarSearchBar).addClass("col-md-3 col-sm-12 col-12").find('input').attr('placeholder', getSearchBarPlaceHolder()).parents().last();
        let startDateInput = $(dateInput).addClass("col-md-2 col-sm-3 col-12").find('input').attr("name", "start-date").addClass("start-date").parents().last();
        let endDateInput = $(dateInput).addClass("col-md-2 col-sm-3 col-12").find('input').attr("name", "end-date").addClass("end-date").parents().last();

        toolbar = $(toolbar).find('.left .nav-item .row').append(searchBar).parents().last();
        toolbar = $(toolbar).find('.left .nav-item .row').append(startDateInput).parents().last();
        toolbar = $(toolbar).find('.left .nav-item .row').append(endDateInput).parents().last();
        toolbar = $(toolbar).find('.left .nav-item .row').append(`<div class="col-lg-1 col-md-1 col-sm-1 col-2" style="margin-right: 20px;"><button type="button" class="btn btn-block" name="searchBtn">搜尋</button></div>`).parents().last();
        toolbar = $(toolbar).find('.left .nav-item .row').append(`<div class="col-lg-2 col-md-2 col-sm-2 col-3"><button type="button" id="more-search" class="btn btn-block">進階搜尋</button></div>`).parents().last();

        return toolbar;
    },
    "link": function (d) {
        return "<a class='number_a' href='/page" + kgrid_baseUrl + "/form/" + d[kgrid_linkUuid] + "'>" + d[kgrid_linkField] + "</a>";
    },
    "copy": function (d) {
        return "<a class='table_btn table_btn_pink copy' href='javascript:void(0)' uuid='" + d[kgrid_linkUuid] + "' style='border-color:#8658DD; border:5px'><img src='/images/icon_workflow/copy.svg' height='50%' width='50%'></a>"
    },
    "edit": function (d) {
        return "<a class='number_a' href='javascript:void(0)'><i class='fa fa-pencil editGroup' uuid='" + d[kgrid_linkUuid] + "'></i></a>";
    },
};

/* 初始化 Kendo Grid dataSource with grid
 *   linkField (string): 內頁連結欄位
 *   linkUuid (string): 內頁連結param
 *   url (string): API Url
 *   customerDataSource (Kendo DataSource): 外部DataSource
 *   fieldTemplate (object): 客製化欄位
 *     {
 *       欄位名稱: 欄位樣式(html 或 function return html)
 *     }
 *   toolbar (html 或 function return html): 工具列
 *   toolbarSearchField(list): 工具列搜尋特定之欄位配合上述toolbar欄除了客製化及toolbar = kgrid_gridTemplate["toolbar]
 *   advancedSearchWithPanel(boolean): 進階搜尋是否用panelBar
 *   toolbarWithAdvancedSearch(boolean): 客製化toolbar時是否加上進階搜尋
 *   detailTemplate(html 或 function return html): 細節的template
 *   detailInit(function): 細節的function
 *   dataBound(function): grid dataBound
 *   sort (object): 排序規則
 *     {
 *       field: "" (欄位名稱)
 *       dir: "" (排序方式)
 *     }
 *   page (number): 建立後顯示頁數
 *   pageSize (number): 一頁最大內容數
 */
$(function () {
    $.fn.initKendoGrid = async function (options) {
        let settings = $.extend({
            linkField: "",
            linkUuid: "",
            url: "",
            customerDataSource: "",
            fieldTemplate: {},
            toolbar: kgrid_gridTemplate["toolbar-all"],
            parameterMap: null,
            toolbarSearchField: "",
            advancedSearchWithPanel: false,
            toolbarWithAdvancedSearch: false,
            detailTemplate: null,
            detailInit: false,
            dataBound: null,
            sort: {
                field: "createDate",
                dir: "desc"
            },
            sortable: true,
            page: 1,
            pageSize: 5,
            columns: null,
            pageable: {
                input: true,
                numeric: true,
                messages: {
                    display: "第 {0}-{1} 筆，共 {2} 筆",
                    empty: " ",
                    page: "第",
                    of: "頁，共{0}頁"
                }
            }
        }, options);

        kgrid_grid = this;
        kgrid_baseUrl = settings.url;
        kgrid_url = "/api" + kgrid_baseUrl + "/grid";
        kgrid_linkField = settings.linkField;
        kgrid_linkUuid = settings.linkUuid;
        kgrid_toolbarSearchField = settings.toolbarSearchField;

        $.each(settings.fieldTemplate, function (field, html) {
            appendkgrid_GridTemplate(field, html);
        });

        if (settings.customerDataSource === "") {
            kgrid_datasource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: kgrid_url,
                        method: 'POST',
                        dataType: "json",
                        processData: false,
                        contentType: false,
                    },
                    update: {
                        url: kgrid_url,
                        method: 'POST',
                        dataType: "json",
                        processData: false,
                        contentType: false,
                    },
                    create: {
                        url: kgrid_url,
                        method: 'POST',
                        dataType: "json",
                        processData: false,
                        contentType: false,
                    },
                    destroy: {
                        url: kgrid_url,
                        method: 'POST',
                        dataType: "json",
                        processData: false,
                        contentType: false,
                    },
                    parameterMap: settings.parameterMap ? settings.parameterMap : function (data) { //搜尋相關設定
                        let dataFilter = data.filter;
                        if (dataFilter) {
                            $.each(dataFilter.filters, function (element, value) {
                                if (kgrid_titles[value.field].search == "date") { //轉換回傳時間格式
                                    let valueString = value.value.toISOString().split(".");
                                    value.value = valueString[0] + "+0800";
                                }
                                if (kgrid_titles[value.field].search == "number") { //轉換回傳數字格式
                                    let valueInt = parseInt(value.value);
                                    value.value = valueInt;
                                }
                            })
                        }

                        let postData = new FormData();
                        postData.append("filter", new Blob([JSON.stringify({
                            size: data.pageSize,
                            page: data.page -= 1,

                            filter: dataFilter,
                            sort: data.sort
                        })], {
                            type: "application/json"
                        }));
                        pageSizes = data.pageSize;
                        return postData;
                    }
                },
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                schema: {
                    total: function (data) {
                        return data.response.totalElements;
                    },
                    data: function (data) {
                        kgrid_searchField = {};
                        kgrid_columns = [];
                        kgrid_titles = data.response.header;
                        kgrid_totalElements = data.response.totalElements;
                        $.each(kgrid_titles, function (fields, value) {
                            if (value.search) {
                                kgrid_fieldType[fields] = {
                                    type: value.search
                                };
                                kgrid_searchField[fields] = {
                                    title: value.title,
                                    type: value.search,
                                    field: fields
                                };
                            }
                        });

                        $.each(kgrid_titles, function (field, value) {
                            kgrid_columns.push(setColumnView(field, value));
                        });

                        return data.response.contents;
                    },
                    model: {
                        fields: kgrid_fieldType
                    },
                },

                sort: settings.sort,
                pageSize: settings.pageSize
            });
        } else {
            kgrid_datasource = settings.customerDataSource;
        }
        await kgrid_grid.createGrid({
            toolbar: settings.toolbar,
            toolbarWithAdvancedSearch: settings.toolbarWithAdvancedSearch,
            advancedSearchWithPanel: settings.advancedSearchWithPanel,
            detailTemplate: settings.detailTemplate,
            detailInit: settings.detailInit,
            dataBound: settings.dataBound,
            autoBind: false,
            sortable: settings.sortable,
            pageable: settings.pageable,
            columns: settings.columns,
            datasource: kgrid_datasource
        });
    };

    /* 建立Kendo Grid
     * editable (object):
     */
    $.fn.createGrid = async function (options) {
        let settings = $.extend({
            editable: {
                mode: "inline",
                createAt: "top"
            },
            toolbar: kgrid_gridTemplate["toolbar"],
            toolbarSearchField: kgrid_toolbarSearchField,
            datasource: kgrid_datasource,
            toolbarWithAdvancedSearch: false,
            advancedSearchWithPanel: false,
            detailTemplate: null,
            detailInit: false,
            dataBound: null,
            sortable: true,
            autoBind: true,
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
            filterable: true,
            columns: null,
        }, options);

        if (!settings.autoBind) {
            await settings.datasource.fetch();
        }

        this.kendoGrid({
            autoBind: settings.autoBind,
            dataSource: settings.datasource,
            editable: settings.editable,
            toolbar: settings.toolbar,
            sortable: settings.sortable,
            detailTemplate: settings.detailTemplate,
            detailInit: settings.detailInit,
            // save: saveEvent ? saveEvent : false,
            // cancel: cancelEvent ? cancelEvent : false,
            persistSelection: true,
            pageable: settings.pageable,
            columns: (settings.columns) ? settings.columns : kgrid_columns,
            noRecords: true,
            messages: {
                noRecords: "查無資料"
            },
            filterable: settings.filterable,
            dataBound: settings.dataBound ? settings.dataBound : function (e) {
                $(this).find(".k-grid-header thead .k-checkbox").prop("checked", true).trigger("click");
            }
        });

        kgrid_kendoGrid = $(this).data("kendoGrid");
        kgrid_kendoGrid.refresh();

        if (settings.toolbarWithAdvancedSearch) {
            $("#toolbar").find("tr").append(advancedSearchButton);
            $("#toolbar").find("tbody").append(advancedSearchDetail);
        }

        if (settings.advancedSearchWithPanel) {
            $("#toolbar").append(searchPanelBar);
        }

        if (settings.toolbar === kgrid_gridTemplate["toolbar-all"] || settings.toolbar === kgrid_gridTemplate["toolbar-advancedSearch"] || settings.toolbarWithAdvancedSearch) {
            if (!settings.advancedSearchWithPanel) {
                // $('body').append(gridSearchWindow);
                initSearchWindow(kgrid_searchField);
            }else{
                initPanelBar();
            }
        }

        toolbarDateSearchController();
        kgridController(kgrid_grid);
    };
});

/*工具列 搜尋*/
function toolbarSearch(searchBarValue) {
    let filter = {
        logic: "or",
        filters: []
    };
    if (searchBarValue) {
        if (kgrid_toolbarSearchField) {
            $.each(kgrid_toolbarSearchField, function (index, value) {
                filter.filters.push(setSearchFilter(value, "contains", searchBarValue));
            });
        } else {
            $.each(kgrid_searchField, function (index, value) {
                console.log(index, value);
                if (value.type !== "date") {
                    filter.filters.push(setSearchFilter(value.field, "contains", searchBarValue));
                }
            });
        }
    }
    kgrid_datasource.filter(filter);
}

/*設定dataSource欄位顯示參數*/
function setColumnView(field, value) {
    let columnData;
    let selectorField;
    columnData = {
        field: field,
        filterable: false,
        title: value.title,
        width: "10%"
    };
    switch (value.type) {
        case "hidden":
            columnData.hidden = true;
            // console.log(columnData);
            break;
        case "date":
            columnData.format = "{0: yyyy-MM-dd}";
            columnData.width = "auto";
            break;
    }

    selectorField = kgrid_linkField === field ? "link" : field;

    if (kgrid_gridTemplate[selectorField]) {
        columnData.template = kgrid_gridTemplate[selectorField];
    }

    return columnData;
}

/*設定SearchBar預設提示字*/
function getSearchBarPlaceHolder() {
    let searchFieldTitle = [];
    $.each(kgrid_toolbarSearchField, function (index, value) {
        searchFieldTitle.push(kgrid_searchField[value].title);
    });
    return i18n.ui.message.search + searchFieldTitle.join(",");
}

/*工具列 日期搜尋控制器(未完成)*/
function toolbarDateSearchController() {
    // $('#reservationdate').datetimepicker({
    //     format: 'L'
    // });

    $("#toolbar").find("input[name='start-date']").kendoDatePicker({
        weekNumber: true,
        format: "yyyy/MM/dd",
        change: function () {
            let selectDate = new Date(this.value());
            let endDatePicker = $("#toolbar").find("input[name='end-date']").data("kendoDatePicker");
            endDatePicker.min(selectDate);
            if ((selectDate - new Date(endDatePicker.value())) > 0) {
                endDatePicker.value("");
            }
        }
    });
    $("#toolbar").find("input[name='end-date']").kendoDatePicker({
        weekNumber: true,
        format: "yyyy/MM/dd",
        change: function () {
            console.log(filter);
            kgrid_datasource.filter(filter);
        }
    });
}

/*grid 控制器*/
function kgridController(selector) {

    /*點擊grid獲得當下資料的uuid*/
    $(selector).on("click", "tbody", function () {
        // kgrid_selectUuid =
    });

    /*工具列搜尋 By Enter Key*/
    $(selector).on('keypress', ".search-bar-input", function (e) {
        if (e.which === 13) {
            let searchBarValue = $(this).val();
            toolbarSearch(searchBarValue);
        }
    });

    /*工具列搜尋 By Click Search Icon*/
    $(selector).on('click', "button[type='submit']", function (e) {
        let searchBarValue = $(this).parent().prevAll("input").val();
        toolbarSearch(searchBarValue);
        this.blur();
    });

    /*工具列搜尋 By Click Search Button*/
    $("#toolbar").on('click', "button[name='searchBtn']", function (e) {
        let searchBarValue = $(this).parents().find(".search-bar-input").val();
        toolbarSearch(searchBarValue);
        this.blur();
    });

    /*開啟進階搜尋視窗並置中*/
    $("#toolbar").on("click", "#more-search", function () {
        showSearchWindow();
    });

    /*關閉進階搜尋視窗*/
    // $("#searchWindow").on("click", "#cancelSearch", function () {
    //     kgrid_searchWindow.close();
    // });

    /*點擊開始日期欄位自動彈出DatePicker*/
    // $("#searchWindow").on("click", "input[name='start-date']", function () {
    //     $(this).data("kendoDatePicker").open()
    // });

    /*點擊結束日期欄位自動彈出DatePicker*/
    // $("#searchWindow").on("click", "input[name='end-date']", function () {
    //     $(this).data("kendoDatePicker").open()
    // });

    /*點擊boolean搜尋條件 true/false icon*/
    // $("#searchWindow").on("click", "span[name='searchField']", function () {
    //     setBoolean($(this), $(this).next().val() !== "true");
    // });

    /*進階搜尋列 顯示清除按鈕*/
    // $("#searchWindow").on("input onpropertychange", "input[name='searchField']", function () {
    //     $(this).val() ? $(this).next().text("x") : $(this).next().text("");
    // });

    /*進階搜尋列 點擊清除按鈕*/
    // $("#searchWindow").on("click", "nav[name='clear']", function () {
    //     $(this).text("");
    //     $(this).prev().val("");
    // });

    /*清除全部進階搜尋*/
    // $("#searchWindow").on("click", "#searchAllClear", function () {
    //     $.each($("#searchRow").find(".col-sm-12.box_inputdata"), function (index, selectorHtml) {
    //         let field = $(selectorHtml).find("fieldset").attr("name");
    //         // operator
    //         $(selectorHtml).find("input[name='search_operator']").val("eq");
    //
    //         // operatorView;
    //         changeOperatorView($(selectorHtml), "eq");
    //
    //         // valueInputView;
    //         $(selectorHtml).find("nav[name='clear']").text("");
    //         $(selectorHtml).find("input[name='searchField']").val("");
    //
    //         let endDateView = $(selectorHtml).find("input[name='end-date']").data("kendoDatePicker");
    //         if (endDateView) {
    //             $(selectorHtml).find("input[name='start-date']").val("");
    //             datebetweenOpen("#betweenDate_" + field, false);
    //             endDateView.value(new Date());
    //         }
    //     });
    //     appendSearchErrorMessage(null, null, true);
    // });

    /*更換搜尋方式*/
    // $("#searchRow").on("click", ".dropdown-menu li", function () {
    //     let betweenDateViewId = $(this).parents(".input-group").find(".dataRange").parent().attr("id");
    //     let selectHtml = $(this).parents(".col-sm-12.box_inputdata");
    //     changeOperatorView(selectHtml, $(this).find("input").attr("name"));
    //
    //     if ($(this).find("input").attr("name") === "between") {
    //         datebetweenOpen("#" + betweenDateViewId, true);
    //     } else {
    //         datebetweenOpen("#" + betweenDateViewId, false);
    //     }
    //
    //     $(this).parents(".input-group-btn.open").find('button').attr("aria-expanded", false);
    //     $(this).parents(".input-group-btn.open").removeClass("open");
    //     if (selectHtml.find("input[name='searchField']").hasClass("boolean")) {
    //         console.log(selectHtml.find("span[name='searchField']"));
    //         $(this).find(".active").attr("name") === "null" ? setBooleanVisible(selectHtml, false) : setBooleanVisible(selectHtml, true);
    //     }
    // });

    /*開始進階搜尋*/
    // $("#searchWindow").on("click", "#confirmSearch", function () {
    //     let hasError = 0;
    //     appendSearchErrorMessage(null, null, true);
    //     let filter = {
    //         logic: "and",
    //         filters: []
    //     };
    //     $.each($("#searchRow").find(".col-sm-12.box_inputdata"), function (index, selectorHtml) {
    //         let field = $(selectorHtml).find("fieldset").attr("name");
    //         let logic = $(selectorHtml).find("input[name='search_operator']").val();
    //         let value = $(selectorHtml).find("input[name='searchField']").val();
    //         let title = $(selectorHtml).find("nav").text();
    //         switch (kgrid_searchField[field].type) {
    //             case "string":
    //                 if (value) {
    //                     filter.filters.push(setSearchFilter(field, logic, value));
    //                 }
    //                 break;
    //             case "date":
    //                 let startDate = $(selectorHtml).find("input[name='start-date']").val();
    //                 let endDate = $(selectorHtml).find("input[name='end-date']").val();
    //                 if (logic === "between") {
    //                     if (checkDate(startDate) && checkDate(endDate)) {
    //                         filter.filters.push(setSearchFilter(field, "gte", new Date(startDate)));
    //                         filter.filters.push(setSearchFilter(field, "lte", new Date(endDate)));
    //                     } else {
    //                         hasError = appendSearchErrorMessage(title, "格式錯誤");
    //                     }
    //                 } else if (startDate) {
    //                     if (checkDate(startDate)) {
    //                         filter.filters.push(setSearchFilter(field, logic, new Date(startDate)));
    //                     } else {
    //                         hasError = appendSearchErrorMessage(title, "格式錯誤");
    //                     }
    //                 }
    //                 break;
    //             case "boolean":
    //                 if (logic !== "null") {
    //                     filter.filters.push(setSearchFilter(field, logic, value === "true"));
    //                 }
    //                 break;
    //             case "number":
    //                 if(value){
    //                     filter.filters.push(setSearchFilter(field, logic, value));
    //                 }
    //         }
    //
    //         // console.log(field, logic);
    //     });
    //
    //     if (!hasError) {
    //         dataSourceFilter(filter);
    //         kgrid_searchWindow.close();
    //     }
    // });
}

/*初始化進階搜尋各欄位*/
function initSearchColumnType(field, type, title) {
    let searchForm =
        `
            <div class="form-group">
                <p></p>
                <div class="row">
                    <div class="col-4">
                        <select class="form-control"></select>
                    </div>
                    <div class="col-8 input">
                    </div>
                </div>
            </div>
        `;

    let columnType = {
        "string": "text",
        "date": "",
        "boolean": "boolean",
        "number": "",
    };

    let typeOperator = {
        "string": `
                    <option value="eq" selected>完全一致</option>
                    <option value="contains">包含</option>
        `,
        "number": `
                    <option value="eq" selected>等於</option>
                    <option value="lte">小於等於</option>
                    <option value="gte">大於等於</option>
      `,
        "date": `
                    <option value="eq" selected>相等</option>
                    <option value="lte">之前</option>
                    <option value="gte">之後</option>
                    <option value="between">介於</option>
    `,
        "boolean": `
                    <option value="null" selected>不搜尋</option>
                    <option value="eq">搜尋</option>
    `
    };

    let fieldInput = {
        "string":
            `
            <input type="search" class="form-control text">
        `,
        "number":
            `
            <input type="search" class="form-control number">
        `,
        "date":
            `
        <div id="betweenDate_` + field + `" name="between">
          <span style="display:flex; justify-content:center;" class="dataRange">
            <input class="start-date form-control date" name="start-date" placeholder="年/月/日"/>
            <span class="between">&nbsp~&nbsp</span>
            <input class="end-date form-control between date" name="end-date" style="border-radius: 4px 4px 4px 4px" placeholder="年/月/日"/>
          </span>
        </div>
        `,
        "boolean":
            `
            <i class="fa fa-check-circle fa-2x"></i>
        `,
    }

    searchForm = $(searchForm).find("select").append(typeOperator[type]).parents().last();
    searchForm = $(searchForm).find("p").text(title).parents().last();
    searchForm = $(searchForm).find(".input").append(fieldInput[type]).parents().last();

    return searchForm;
}

/*設定搜尋方式文字*/
// function setOperatorText(selector, operator) {
//     selector.find("span[name='operator_text']").text(operator);
// }

/*日期進階搜尋啟動/關閉*/
function datebetweenOpen(id, isOpen) {
    if (isOpen) {
        $(id).find(".between").show();
    } else {
        $(id).find(".between").hide();
    }
}

/*初始化kendo PanelBar(css未完成)*/
function initPanelBar() {
    kgrid_searchPanelBar = $("#panel").kendoPanelBar({
        expandMode: "single"
    }).data("kendoPanelBar");
}

/*初始化SearchWindow*/
function initSearchWindow(searchField){
    $.each(searchField, function (field, value) {
        gridSearchWindow = $(gridSearchWindow).find('.card-body').append(initSearchColumnType(field, value.type, value.title)).parents().last();
    })

    // $.each(kgrid_searchField, function (field, value) {
    //     $('#searchRow').append(initSearchColumnType(field, value.type, value.title));
    //     let selectHtml = $("#searchRow").find("fieldset[name='" + field + "']");
    //     setOperatorText(selectHtml, selectHtml.find(".active").val());
    //
    //     if (value.type === "date") {
    //         datebetweenOpen("#betweenDate_" + field, false);
    //         $("#betweenDate_" + field).find(".start-date").kendoDatePicker({
    //             weekNumber: true,
    //             format: "yyyy/MM/dd",
    //             // value: new Date(),
    //             change: function () {
    //                 let selectDate = new Date(this.value());
    //                 let endDatePicker = $("#betweenDate_" + field).find(".end-date.form-control.between.k-input").data("kendoDatePicker");
    //                 endDatePicker.min(selectDate);
    //                 if ((selectDate - new Date(endDatePicker.value())) > 0) {
    //                     endDatePicker.value(selectDate);
    //                 }
    //             }
    //         });
    //         $("#betweenDate_" + field).find(".end-date").kendoDatePicker({
    //             weekNumber: true,
    //             format: "yyyy/MM/dd",
    //             value: new Date()
    //         });
    //     } else if (value.type === "boolean") {
    //         let booleanField = $("#searchRow").find("fieldset[name='" + field + "']");
    //         booleanField.find("input[name='search_operator']").val("null");
    //         setBoolean(booleanField.find("span[name='searchField']"), true);
    //         setBooleanVisible(booleanField, false);
    //     }
    // });
}

/*展示SearchWindow*/
function showSearchWindow() {
    swal.fire({
        title: '進階搜尋',
        html: gridSearchWindow,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: i18n.ui.message.search,
        cancelButtonText: i18n.ui.btn.cancel
    });
}

/*添加dataSource搜尋條件*/
function setSearchFilter(field, operator, value) {
    return {
        field: field,
        operator: operator,
        value: value
    };
}