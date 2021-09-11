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

var kgrid_baseUrl, kgrid_url, kgrid_datasource, kgrid_grid, kgrid_titles, kgrid_totalElements, kgrid_fieldType = {},
  kgrid_columns, kgrid_kendoGrid;

var kgrid_linkField, kgrid_linkUuid;

let kgrid_searchWindow, kgrid_searchField;

let kgrid_searchPanelBar;

let kgrid_toolbarSearchField;

let kgrid_selectUuid;

let gridSearchWindow = function () {
  return `
    <div id="searchWindow" class="window">
      <div class="container" style="width:auto">
        <div class="row search-row" id="searchRow"></div><!--row-->
        <div class="row">
          <span class="errorMsg color_pink" name="searchError"></span>
        </div>
        <span id="searchAllClear" style="float: right;color: #3399ff;cursor: pointer;">${i18n.ui.btn.allClear}</span>
        <div class="row">
          <div class="col-sm-12" style="text-align: center">
            <a href="javascript:void(0)" id="cancelSearch" class="btn_upload table_btn_status"
               style="width: 20%; background-color: #ac2925; color: #FFFFFF">${i18n.ui.btn.cancel}</a>
            <a href="javascript:void(0)" id="confirmSearch" class="btn_upload table_btn_status"
               style="margin-left:10px; width: 20%">${i18n.ui.message.search}</a>
          </div><!--col-->
        </div><!--row-->
      </div><!--container-->
    </div>
    `;
};

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

let advancedSearchButton = function () {
  return `
    <td style="padding: 0px 17px 0px 0px; width: 10%;" name="toolbar-advancedSearch">
      <button id="more-search" style="width: 100%" class="search-btn">${i18n.ui.message.advancedSearch}</button>
    </td>
  `
};

let advancedSearchDetail = function () {
  return `
    <tr>
      <td colspan="10" style="display: none" class="search-detail">
        <span class="search-detail">進階搜尋條件:</span>
        <span name="advancedSearch-detail" class="search-detail"></span>
      </td>
    </tr>
  `
};

var kgrid_gridTemplate = {
  "toolbar": function () {
    return `
     <div id="toolbar">
       <table class="toolbar-search">
           <tbody>
             <tr>
               <td style="padding: 0px; text-align: left;" name="toolbar-button">
                 <div class="table_bar_box">
                   <a id="addBtn" href="/page` + kgrid_baseUrl + `/form" class="btn"><i class="fa fa-plus"></i></a>
                   <a id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></a>
                 </div>
               </td>
             </tr>   
           </tbody>
       </table>
     </div>
     `;
  },
  "toolbar-search": function () {
    let searchFieldTitle = [];
    $.each(kgrid_toolbarSearchField, function (index, value) {
      searchFieldTitle.push(kgrid_searchField[value].title);
    });
    let placeHolderText = i18n.ui.message.search + searchFieldTitle.join(",");

    return `
     <div id="toolbar">
       <table class="toolbar-search">
        <tbody>
          <tr>
            <td style="padding: 0px; width: 20px; text-align: left;" name="toolbar-button">
              <div class="table_bar_box">
                <a id="addBtn" href="/page` + kgrid_baseUrl + `/form" class="btn"><i class="fa fa-plus"></i></a>
                <a id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></a>
              </div>
            </td>
            <td name="toolbar-searchInput">
              <div class="input-group stylish-input-group search">
                <input type="text" class="form-control" placeholder=` + placeHolderText + `>
                <span class="input-group-addon">
                  <nav class="clear">×</nav>
                  <button class="glyphicon glyphicon-search"></button>
                </span>
              </div>
            </td>
          </tr>   
        </tbody>
      </table>
     </div>
    `;
  },
  "toolbar-search-date": function () {
    let searchFieldTitle = [];
    $.each(kgrid_toolbarSearchField, function (index, value) {
      searchFieldTitle.push(kgrid_searchField[value].title);
    });
    let placeHolderText = i18n.ui.message.search + searchFieldTitle.join(",");

    return `
     <div id="toolbar">
       <table class="toolbar-search">
        <tbody>
          <tr>
            <td style="padding: 0px; width: 20px; text-align: left;" name="toolbar-button">
              <div class="table_bar_box">
                <a id="addBtn" href="/page` + kgrid_baseUrl + `/form" class="btn"><i class="fa fa-plus"></i></a>
                <a id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></a>
              </div>
            </td>
            <td name="toolbar-searchInput">
              <div class="input-group stylish-input-group search">
                <input type="text" class="form-control" placeholder=` + placeHolderText + `>
                <span class="input-group-addon">
                  <nav class="clear">×</nav>
<!--                  <button class="glyphicon glyphicon-search"></button>-->
                </span>
              </div>
            </td>
            <td name="toolbar-startDate">
              <input class="form-control" name="start-date" placeholder="年/月/日">
            </td>
            <td style="padding: 0px;">
              <span>~</span>
            </td>
            <td name="toolbar-endDate">
              <input class="form-control" name="end-date" placeholder="年/月/日">
            </td>
            <td style="padding: 0px 17px 0px 0px; width: 10%;" name="toolbar-search">
                <button id="search" style="width: 100%;" class="search-btn">${i18n.ui.message.search}</button>
            </td>
          </tr>   
        </tbody>
      </table>
     </div>
    `;
  },
  "toolbar-advancedSearch": function () {
    let searchFieldTitle = [];
    $.each(kgrid_toolbarSearchField, function (index, value) {
      searchFieldTitle.push(kgrid_searchField[value].title);
    });
    let placeHolderText = i18n.ui.message.search + searchFieldTitle.join(",");
    return `
     <div id="toolbar">
       <table class="toolbar-search">
        <tbody>
          <tr>
            <td style="padding: 0px; width: 20px; text-align: left;" name="toolbar-button">
              <div class="table_bar_box">
                <a id="addBtn" href="/page` + kgrid_baseUrl + `/form" class="btn"><i class="fa fa-plus"></i></a>
                <a id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></a>
              </div>
            </td>
            <td name="toolbar-searchInput">
              <div class="input-group stylish-input-group search">
                <input type="text" class="form-control" placeholder=` + placeHolderText + `>
                <span class="input-group-addon">
                  <nav class="clear">×</nav>
                  <button class="glyphicon glyphicon-search"></button>
                </span>
              </div>
            </td>
            <td style="padding: 0px 17px 0px 0px; width: 10%;" name="toolbar-advancedSearch">
                <button id="more-search" style="width: 100%" class="search-btn">${i18n.ui.message.advancedSearch}</button>
            </td>
          </tr> 
          <tr>
            <td colspan="10" style="display: none" class="search-detail">
              <span class="search-detail">進階搜尋條件:</span>
              <span name="advancedSearch-detail" class="search-detail"></span>
            </td>
          </tr>   
        </tbody>
      </table>
     </div>
    `;
  },
  "toolbar-all": function () {
    let searchFieldTitle = [];
    $.each(kgrid_toolbarSearchField, function (index, value) {
      searchFieldTitle.push(kgrid_searchField[value].title);
    });
    let placeHolderText = i18n.ui.message.search + searchFieldTitle.join(",");
    return `
     <div id="toolbar">
       <table class="toolbar-search">
        <tbody>
          <tr>
            <td style="padding: 0px; width: 20px; text-align: left;" name="toolbar-button">
              <div class="table_bar_box">
                <a id="addBtn" href="/page` + kgrid_baseUrl + `/form" class="btn"><i class="fa fa-plus"></i></a>
                <a id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></a>
              </div>
            </td>
            <td name="toolbar-searchInput">
              <div class="input-group stylish-input-group search">
                <input type="text" class="form-control" placeholder=` + placeHolderText + `>
                <span class="input-group-addon">
                  <nav class="clear">×</nav>
<!--                  <button class="glyphicon glyphicon-search"></button>-->
                </span>
              </div>
            </td>
            <td name="toolbar-startDate">
              <input class="form-control" name="start-date" placeholder="年/月/日">
            </td>
            <td style="padding: 0px;">
              <span>~</span>
            </td>
            <td name="toolbar-endDate">
              <input class="form-control" name="end-date" placeholder="年/月/日">
            </td>
            <td style="padding: 0px 17px 0px 0px; width: 5%;" name="toolbar-search">
                <button id="search" style="width: 100%;" class="search-btn">${i18n.ui.message.search}</button>
            </td>
            <td style="padding: 0px 17px 0px 0px; width: 10%;" name="toolbar-advancedSearch">
                <button id="more-search" style="width: 100%" class="search-btn">${i18n.ui.message.advancedSearch}</button>
            </td>
          </tr> 
          <tr>
            <td colspan="10" style="display: none" class="search-detail">
              <span class="search-detail">進階搜尋條件:</span>
              <span name="advancedSearch-detail" class="search-detail"></span>
            </td>
          </tr>   
        </tbody>
      </table>
     </div>
    `;
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
        $('body').append(gridSearchWindow);
      }

      $.each(kgrid_searchField, function (field, value) {
        $('#searchRow').append(initSearchColumnType(field, value.type, value.title));
        let selectHtml = $("#searchRow").find("fieldset[name='" + field + "']");
        setOperatorText(selectHtml, selectHtml.find(".active").val());

        if (value.type === "date") {
          datebetweenOpen("#betweenDate_" + field, false);
          $("#betweenDate_" + field).find(".start-date").kendoDatePicker({
            weekNumber: true,
            format: "yyyy/MM/dd",
            // value: new Date(),
            change: function () {
              let selectDate = new Date(this.value());
              let endDatePicker = $("#betweenDate_" + field).find(".end-date.form-control.between.k-input").data("kendoDatePicker");
              endDatePicker.min(selectDate);
              if ((selectDate - new Date(endDatePicker.value())) > 0) {
                endDatePicker.value(selectDate);
              }
            }
          });
          $("#betweenDate_" + field).find(".end-date").kendoDatePicker({
            weekNumber: true,
            format: "yyyy/MM/dd",
            value: new Date()
          });
        } else if (value.type === "boolean") {
          let booleanField = $("#searchRow").find("fieldset[name='" + field + "']");
          booleanField.find("input[name='search_operator']").val("null");
          setBoolean(booleanField.find("span[name='searchField']"), true);
          setBooleanVisible(booleanField, false);
        }
      });
      if (settings.advancedSearchWithPanel) {
        initPanelBar();
      } else {
        initKGridSearchWindow();
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

/*工具列 日期搜尋控制器(未完成)*/
function toolbarDateSearchController() {
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
      kgrid_datasource.filter(filter);
    }
  });
}

/*工具列 日期搜尋(未完成)*/
function toolbarDateSearching() {
  let parentHtml = $("#toolbar");
  let searchBarValue = parentHtml.find("td[name='toolbar-searchInput']").find("input").val();
  let startDateValue = parentHtml.find("td[name='toolbar-startDate']").find("input").val();
  let endDateValue = parentHtml.find("td[name='toolbar-endDate']").find("input").val();

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
      //沒有特定搜尋欄位
    }
  }
  console.log(searchBarValue);
  console.log(new Date(startDateValue));
  console.log(new Date(endDateValue));
  toolbarSearch(searchBarValue);
}

/*grid 控制器*/
function kgridController(selector) {

  /*點擊grid獲得當下資料的uuid*/
  $(selector).on("click", "tbody", function () {
    // kgrid_selectUuid =
  });

  /*工具列搜尋 輸入內容則顯示清除按鈕*/
  $(selector).on('input onpropertychange', ".input-group.stylish-input-group.search > input", function () {
    if ($(this).val()) {
      $(this).next().find("nav").css("display", "contents");
    } else {
      $(this).next().find("nav").css("display", "none");
    }
  });

  /*工具列搜尋 點擊清除則刪除搜尋內容*/
  $(selector).on('click', ".input-group.stylish-input-group.search > span > nav", function () {
    $(this).parent().prev().val("");
    toolbarSearch("");
    $(this).hide();
  });

  /*工具列搜尋 By Enter Key*/
  $(selector).on('keypress', ".input-group.stylish-input-group.search > input", function (e) {
    if (e.which === 13) {
      let searchBarValue = $(this).val();
      toolbarSearch(searchBarValue);
    }
  });

  /*工具列搜尋 By Click Search Icon*/
  $(selector).on('click', ".input-group.stylish-input-group.search > span > button.glyphicon-search", function (e) {
    let searchBarValue = $(this).parent().prevAll("input").val();
    toolbarSearch(searchBarValue);
  });

  /*工具列搜尋 By Click Search Button*/
  $("#toolbar").on('click', ".glyphicon.glyphicon-search", function (e) {
    let searchBarValue = $(this).parents("tr").find("td[name='toolbar-searchInput']").find("input").val();
    console.log(searchBarValue);
    toolbarSearch(searchBarValue);
  });

  /*開啟進階搜尋視窗並置中*/
  $("#toolbar").on("click", "#more-search", function () {
    if (kgrid_searchWindow) {
      kgrid_searchWindow.open();
      kgrid_searchWindow.center();
    } else {
      $("#panel-search").hasClass("k-state-active") ? kgrid_searchPanelBar.collapse($("#panel-search")) : kgrid_searchPanelBar.expand($("#panel-search"));
    }
  });

  /*關閉進階搜尋視窗*/
  $("#searchWindow").on("click", "#cancelSearch", function () {
    kgrid_searchWindow.close();
  });

  /*點擊開始日期欄位自動彈出DatePicker*/
  $("#searchWindow").on("click", "input[name='start-date']", function () {
    $(this).data("kendoDatePicker").open()
  });

  /*點擊結束日期欄位自動彈出DatePicker*/
  $("#searchWindow").on("click", "input[name='end-date']", function () {
    $(this).data("kendoDatePicker").open()
  });

  /*點擊boolean搜尋條件 true/false icon*/
  $("#searchWindow").on("click", "span[name='searchField']", function () {
    setBoolean($(this), $(this).next().val() !== "true");
  });

  /*進階搜尋列 顯示清除按鈕*/
  $("#searchWindow").on("input onpropertychange", "input[name='searchField']", function () {
    $(this).val() ? $(this).next().text("x") : $(this).next().text("");
  });

  /*進階搜尋列 點擊清除按鈕*/
  $("#searchWindow").on("click", "nav[name='clear']", function () {
    $(this).text("");
    $(this).prev().val("");
  });

  /*清除全部進階搜尋*/
  $("#searchWindow").on("click", "#searchAllClear", function () {
    $.each($("#searchRow").find(".col-sm-12.box_inputdata"), function (index, selectorHtml) {
      let field = $(selectorHtml).find("fieldset").attr("name");
      // operator
      $(selectorHtml).find("input[name='search_operator']").val("eq");

      // operatorView;
      changeOperatorView($(selectorHtml), "eq");

      // valueInputView;
      $(selectorHtml).find("nav[name='clear']").text("");
      $(selectorHtml).find("input[name='searchField']").val("");

      let endDateView = $(selectorHtml).find("input[name='end-date']").data("kendoDatePicker");
      if (endDateView) {
        $(selectorHtml).find("input[name='start-date']").val("");
        datebetweenOpen("#betweenDate_" + field, false);
        endDateView.value(new Date());
      }
    });
    appendSearchErrorMessage(null, null, true);
  });

  /*更換搜尋方式*/
  $("#searchRow").on("click", ".dropdown-menu li", function () {
    let betweenDateViewId = $(this).parents(".input-group").find(".dataRange").parent().attr("id");
    let selectHtml = $(this).parents(".col-sm-12.box_inputdata");
    changeOperatorView(selectHtml, $(this).find("input").attr("name"));

    if ($(this).find("input").attr("name") === "between") {
      datebetweenOpen("#" + betweenDateViewId, true);
    } else {
      datebetweenOpen("#" + betweenDateViewId, false);
    }

    $(this).parents(".input-group-btn.open").find('button').attr("aria-expanded", false);
    $(this).parents(".input-group-btn.open").removeClass("open");
    if (selectHtml.find("input[name='searchField']").hasClass("boolean")) {
      console.log(selectHtml.find("span[name='searchField']"));
      $(this).find(".active").attr("name") === "null" ? setBooleanVisible(selectHtml, false) : setBooleanVisible(selectHtml, true);
    }
  });

  /*開始進階搜尋*/
  $("#searchWindow").on("click", "#confirmSearch", function () {
    let hasError = 0;
    appendSearchErrorMessage(null, null, true);
    let filter = {
      logic: "and",
      filters: []
    };
    $.each($("#searchRow").find(".col-sm-12.box_inputdata"), function (index, selectorHtml) {
      let field = $(selectorHtml).find("fieldset").attr("name");
      let logic = $(selectorHtml).find("input[name='search_operator']").val();
      let value = $(selectorHtml).find("input[name='searchField']").val();
      let title = $(selectorHtml).find("nav").text();
      switch (kgrid_searchField[field].type) {
        case "string":
          if (value) {
            filter.filters.push(setSearchFilter(field, logic, value));
          }
          break;
        case "date":
          let startDate = $(selectorHtml).find("input[name='start-date']").val();
          let endDate = $(selectorHtml).find("input[name='end-date']").val();
          if (logic === "between") {
            if (checkDate(startDate) && checkDate(endDate)) {
              filter.filters.push(setSearchFilter(field, "gte", new Date(startDate)));
              filter.filters.push(setSearchFilter(field, "lte", new Date(endDate)));
            } else {
              hasError = appendSearchErrorMessage(title, "格式錯誤");
            }
          } else if (startDate) {
            if (checkDate(startDate)) {
              filter.filters.push(setSearchFilter(field, logic, new Date(startDate)));
            } else {
              hasError = appendSearchErrorMessage(title, "格式錯誤");
            }
          }
          break;
        case "boolean":
          if (logic !== "null") {
            filter.filters.push(setSearchFilter(field, logic, value === "true"));
          }
          break;
        case "number":
          if(value){
            filter.filters.push(setSearchFilter(field, logic, value));
          }
      }

      // console.log(field, logic);
    });

    if (!hasError) {
      dataSourceFilter(filter);
      kgrid_searchWindow.close();
    }
  });

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

/*新增客製化欄位Template*/
function appendkgrid_GridTemplate(field, template) {
  kgrid_gridTemplate[field] = template;
}

/*初始化進階搜尋視窗*/
function initKGridSearchWindow() {
  kgrid_searchWindow = $("#searchWindow").kendoWindow({
    modal: true,
    width: "70%",
    height: 'auto',
    // resizable: false,
    visible: false,
  }).data('kendoWindow');
  $("#searchWindow").before("<button class='close' id='searchClose'><i class='fa fa-times'></i></button>");
  $("body").on("click", "#searchClose", function () {
    kgrid_searchWindow.close();
  });
  $("body").on("click", ".k-overlay", function () {
    kgrid_searchWindow.close();
  });
}

/*初始化kendo PanelBar(css未完成)*/
function initPanelBar() {
  kgrid_searchPanelBar = $("#panel").kendoPanelBar({
    expandMode: "single"
  }).data("kendoPanelBar");
}

/*日期進階搜尋啟動/關閉*/
function datebetweenOpen(id, isOpen) {
  if (isOpen) {
    $(id).find(".between").show();
  } else {
    $(id).find(".between").hide();
  }
}

/*初始化進階搜尋各欄位*/
function initSearchColumnType(field, type, title) {
  let fieldSearchView;
  let columnType = {
    "string": "text",
    "date": "",
    "boolean": "boolean",
    "number": "",
  };

  let typeOperator = {
    "string": `
      <li><input type="button" name="eq" class="active" value="完全一致" checked="checked"/></li>
      <li><input type="button" name="contains" value="包含"/></li>
    `,
    "number": `
      <li><input type="button" name="eq" class="active" value="等於" checked="checked"/></li>
      <li><input type="button" name="lte" value="小於等於"/></li>
      <li><input type="button" name="gte" value="大於等於"/></li>
<!--      <li><input type="button" name="string_eq" value="完全一致"/></li>-->
      `,
    "date": `
<!--      <li><input type="button" name="eq" class="active" value="相等" checked="checked"/></li>-->
      <li><input type="button" name="lte" value="之前"/></li>
      <li><input type="button" name="gte" value="之後"/></li>
      <li><input type="button" name="between" value="介於"/></li>
    `,
    "boolean": `
      <li><input type="button" name="null" class="active" value="不搜尋" checked="checked"/></li>
      <li><input type="button" name="eq" value="搜尋"/></li>
    `
  };

  let searchViewOutsideTop = `
  <div class="col-sm-12 box_inputdata">
    <fieldset name="` + field + `">
      <div class="form-group">
        <nav style="vertical-align: middle;">` + title + `</nav>
        <div class="advanced-search-detail">
          <div class="input-group">
            <div class="input-group-btn">
              <button type="button" class="btn search-filter dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <span class="k-icon k-i-filter"></span>
                <span name="operator_text" class="filter-text"></span>
                <input name="search_operator" hidden="hidden" value="eq"/>
               </button>
              <ul class="dropdown-menu">` + typeOperator[type] + ` </ul>
            </div>
  `;

  let searchViewOutsideBottom = `
   </div>
  </div>
      </div>
    </fieldset>
  </div>
  `;


  let fieldSearchDateView = `
   <div id="betweenDate_` + field + `" name="between">
     <span style="display:flex; justify-content:center;" class="dataRange">
         <input class="start-date form-control" name="start-date"/>
         <span class="between">&nbsp~&nbsp</span>
         <input class="end-date form-control between" name="end-date" style="border-radius: 4px 4px 4px 4px"/>
     </span>
   </div>
  `;

  switch (type) {
    case "date":
      fieldSearchView = `
        <div id="betweenDate_` + field + `" name="between">
          <span style="display:flex; justify-content:center;" class="dataRange">
            <input class="start-date form-control date" name="start-date" placeholder="年/月/日"/>
            <span class="between">&nbsp~&nbsp</span>
            <input class="end-date form-control between date" name="end-date" style="border-radius: 4px 4px 4px 4px" placeholder="年/月/日"/>
          </span>
        </div>
        `;
      break;
    case "string":
      fieldSearchView = `
        <input name="searchField" class="form-control ` + columnType[type] + `"/>
        <nav class="clear" name="clear"></nav>
      `;
      break;
    case "boolean":
      fieldSearchView = `
        <span class="number_a" style="cursor: pointer; margin-left: 5px;" name="searchField"><i class="fa fa-check-circle-o fa-2x"></i></span>
        <input name="searchField" class="form-control ` + columnType[type] + `" style="display: none"/>
        `;
      break;
    case "number":
      fieldSearchView = `
        <input name="searchField" class="form-control ` + columnType[type] + `"/>
        <nav class="clear" name="clear"></nav>
        `;
      break;
  }
  return searchViewOutsideTop + fieldSearchView + searchViewOutsideBottom;
}

/*新增搜尋錯誤訊息*/
function appendSearchErrorMessage(title, message, isReset) {
  let errorMessageView = $("#searchWindow").find("span[name='searchError']");
  if (!isReset) {
    let errorMessage = title + message;
    if (errorMessageView.text()) {
      errorMessageView.append(", ");
    }
    errorMessageView.append(errorMessage);
    return 1;
  } else {
    errorMessageView.empty();
    return 0;
  }
}

/*檢查日期格式*/
function checkDate(date) {
  return !!(date.length && !isNaN(Date.parse(date)));
}

/*設定boolean搜尋的介面及值*/
function setBoolean(selector, boolean) {
  selector.next().val(boolean);
  selector.css("color", boolean ? "" : "#000");
}

/*設定boolean搜尋的可視與否*/
function setBooleanVisible(selector, isVisible) {
  isVisible ? selector.find("span[name='searchField'] > i").show() : selector.find("span[name='searchField'] > i").hide();
}

/*添加dataSource搜尋條件*/
function setSearchFilter(field, operator, value) {
  return {
    field: field,
    operator: operator,
    value: value
  };
}

/*設定搜尋方式文字*/
function setOperatorText(selector, operator) {
  selector.find("span[name='operator_text']").text(operator);
}

/*變更搜尋方式顯示狀態*/
function changeOperatorView(selector, selectorOperator) {
  let selectorOperatorView = selector.find("input[name='" + selectorOperator + "']");
  selector.find(".active").attr("checked", false);
  selector.find(".active").prop("class", "");

  selectorOperatorView.prop("class", "active");
  selectorOperatorView.attr("checked", true);

  selector.find("input[name='search_operator']").val(selectorOperator);
  setOperatorText(selector, selectorOperatorView.val());
}

/*呼叫dataSource filter 並顯示進階搜尋細項在toolbar上*/
function dataSourceFilter(filter) {
  let searchParamsTextList = [];
  let dateBetweenField = [];
  let advancedSearchDetailView = $("#toolbar").find("span[name='advancedSearch-detail']");
  $.each(filter.filters, function (index, value) {
    let fieldSearchView = $("#searchRow").find("fieldset[name='" + value.field + "']");
    let operatorText = fieldSearchView.find("span[name='operator_text']").text();
    let fieldText = kgrid_searchField[value.field].title;
    let filterValue = fieldSearchView.find("input[name='searchField']").val();
    let searchParamsText = fieldText + "(" + operatorText + ") " + filterValue;
    if (kgrid_searchField[value.field].type === "date") {
      let endDateView = fieldSearchView.find("input[name='end-date']");
      let startDateValue = fieldSearchView.find("input[name='start-date']").val();
      let endDateValue = fieldSearchView.find("input[name='end-date']").val();
      if (endDateView.parents(".between").css("display") !== "none") {
        if (!dateBetweenField[value.field]) {
          searchParamsText = fieldText + "(" + "介於" + ") " + startDateValue + "~" + endDateValue;
          dateBetweenField[value.field] = true;
        } else {
          searchParamsText = null;
        }
      } else {
        searchParamsText = fieldText + "(" + operatorText + ") " + startDateValue;
      }
    }
    if (searchParamsText) {
      searchParamsTextList.push(searchParamsText);
    }
  });
  if (searchParamsTextList.length) {
    advancedSearchDetailView.text(searchParamsTextList.join(", "));
    advancedSearchDetailView.parent().show();
  } else {
    advancedSearchDetailView.parent().hide();
  }
  kgrid_datasource.filter(filter);
}
