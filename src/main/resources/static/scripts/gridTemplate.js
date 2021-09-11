class Grid {
  //一般呼叫順序為 new grid () → await grid.initDataSource() →  await grid.creatKendGrid()
  //設定各項資料 如 setSortField() 請在initDataSource()之前 
  //如要另外setTemplate 請在initDataSource()之後 creatKendGrid()之前呼叫

  // apiUrl: api網址(不須放api/) 例:/machine/weaving/   
  // gridType: grid上的template 例:grid,onlyEditColumn,check 
  // UuidName: 資料的UUid變數名稱 用來建立超連結的網址 如不需要可傳空值或布林值 例:weavingMachineCoreUuid的話就傳weavingMachineCore 
  // NoName: gird上超連結欄位的名稱 如不需要可傳空值或布林值 例:weavingMachineCoreNo的話就傳weavingMachineCore 
  // gridUuid: 若gird Api需要傳遞Uuid時使用 如不需要可傳空值或布林值
  constructor(apiUrl, gridType, UuidName, NoName, gridUuid) {
    this.rowData = {};
    this.dataSource = {};
    this.columns = [];
    this.toolbar = kendo.template($("#toolbar").html());
    this.title = {};
    this.customizeFunction = "";
    this.i18n = {};
    this.apiUrl = (apiUrl) ? apiUrl : "";
    this.pageSizes = 5;
    this.template = {};
    this.elementTotal = 0;
    this.gridType = (gridType) ? gridType : "";
    this.UuidName = (UuidName) ? UuidName : "";
    this.gridUuid = (gridUuid) ? gridUuid : "";
    this.NoName = (NoName) ? NoName : "";
  } //預設各項變數

  //初始化Grid資料
  // customize: 傳入已經接好或不需使用API取得的Json Data(response部分) 一般使用API時不須傳值
  // customizeData: 傳入已經接好或不需使用API取得的dataSouce 一般使用API時不須傳值  
  async initDataSource(customize, customizeData, toolbar) {
    let setFieldType = {};
    let rowData = {};
    let functionData = this.getCustomizeFunction(); //取得傳入的function
    let sortField = this.getSortField(); //取得排列依據的欄位
    let dir = this.getDir();
    let apiUrl = "/api" + this.getApiurl() + "grid";
    let titleI18n = this.getI18n();
    let model = this.getModel();
    let saveData = this.getSaveData()
    let dataFilter;
    let pageSizes;
    let elementTotal;
    if (this.gridUuid) {
      apiUrl += "/" + this.getGridUuid();
    } //如果 GRID 有UUid 則加入
    if (customize) { //如果已有傳入DATA
      titleI18n = customize.header;
      elementTotal = customize.totalElements;
      $.each(titleI18n, function (fields, value) {
        if (value.type == "dropDown") {
          setFieldType[fields] = {
            type: "text"
          }
        } else {
          setFieldType[fields] = {
            type: value.type
          }
        }
      });
      this.dataSource = customizeData;
      console.log(this.dataSource)
    } else {
      this.dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: apiUrl,
            method: 'POST',
            dataType: "json",
            processData: false,
            contentType: false,
          },
          update: saveData ? {
            url: apiUrl,
            method: 'POST',
            dataType: "json",
            processData: false,
            contentType: false,
          } : false,
          create: saveData ? {
            url: apiUrl,
            method: 'POST',
            dataType: "json",
            processData: false,
            contentType: false,
          } : false,
          destroy: saveData ? {
            url: apiUrl,
            method: 'POST',
            dataType: "json",
            processData: false,
            contentType: false,
          } : false,
          parameterMap: function (data) { //搜尋相關設定
            dataFilter = data.filter;
            if (dataFilter) {
              $.each(dataFilter.filters, function (element, value) {
                console.log(value.field);
                if (titleI18n[value.field].search == "date") { //轉換回傳時間格式
                  let valueString = value.value.toISOString().split(".");
                  value.value = valueString[0] + "+0800";
                }
                if (titleI18n[value.field].search == "number") { //轉換回傳數字格式
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
            let valueString;
            titleI18n = data.response.header;
            elementTotal = data.response.totalElements;
            $.each(titleI18n, function (fields, value) {
              if (value.search) {
                setFieldType[fields] = {
                  type: value.search
                }
              };
            })
            if (data.response.contents) {
              data.response.contents.map(function (element) {
                $.each(element, function (fields, value) {
                  if ($.isArray(value)) {
                    if ($.isPlainObject(value[0])) {
                      element[fields] = value;
                    } else {
                      // valueString = value.join(", ");

                      // element[fields] = valueString;
                    }
                  }
                })
              });
            };
            rowData = data.response.contents;
            if (functionData) {
              eval(functionData + "(data.response.contents);");
            }
            return data.response.contents;
          },
          model: model ? model : {
            fields: setFieldType
          },
        },

        sort: {
          field: sortField ? sortField : "updateDate",
          dir: dir ? dir : "asc"
        },
        pageSize: 5
      });
      await this.dataSource.fetch(); //等待資料傳輸完畢
    }
    this.setTotalElements(elementTotal);
    this.setI18n(titleI18n);
    this.setRowData(rowData);
    this.setColumns(titleI18n, true);
    this.setPageSize(pageSizes);
    //設定各資料的值
    let otherFieldName = this.getOtherFieldName();
    let Name = this.UuidName;
    let grid = this;
    let gridType = this.gridType.split(","); //將傳入的type變成陣列
    let baseUrl = "/page" + this.apiUrl;
    let url = baseUrl + "form/" + `\${d.${this.UuidName + "Uuid"}}`; //設定超連結的網址
    let copyUrl = baseUrl + "form/"; //複製鈕的轉跳網址
    let streamUrl = baseUrl + "chat/link/"; //資訊串流的轉跳網址
    this.toolbar = (toolbar) ? toolbar : kendo.template($("#toolbar").html());
    this.setTemplate(this.NoName + "No", "link", url); //設定超連結
    $.each(gridType, function (index, value) { //判斷type
      switch (value) {
        case "grid":
          break;
        case "noToolbar":
          grid.toolbar = "";
          break;
        case "check":
          grid.addCheckColumns();
          grid.sortColumns(grid.columns.length - 1, 0);
          break;
        case "copy":
          grid.setTemplate("複製", "copy", copyUrl)
          break;
        case "status":
          grid.setTemplate(Name + "Status", "status");
          break;
        case "createForm":
          grid.setTemplate("產生訂單", "create");
          break;
        case "analysis":
          grid.setTemplate("成本分析", "analysis");
          break;
        case "record":
          grid.setTemplate("訂單紀錄", "record");
          break;
        case "specification":
          grid.setTemplate("Sop", "specification", "javaScript:void(0)");
          grid.setTemplate("WeavingSop", "specification", url);
          break;
        case "print":
          grid.setTemplate("列印", "print");
          break;
        case "stream":
          grid.setTemplate("資訊串流", "stream", streamUrl, otherFieldName);
          break;
        case "purchase":
          grid.setTemplate("Purchase", "purchase", url);
          break;
        case "workStation":
          grid.setTemplate("drafting", "workStation", baseUrl);
          grid.setTemplate("inspection", "workStation", baseUrl);
          grid.setTemplate("shipment", "workStation", baseUrl);
          grid.setTemplate("warping", "workStation", baseUrl);
          grid.setTemplate("weaving", "workStation", baseUrl);
          break;
        case "editColumn":
          grid.addEditColumns()
          break;
        case "onlyEditColumn":
          grid.addOnlyEditColumns()
          break;
        case "all":
          grid.toolbar = "";
          grid.addCheckColumns();
          grid.setTemplate("複製", "copy", copyUrl);
          grid.setTemplate("產生訂單", "create");
          grid.setTemplate("成本分析", "analysis");
          grid.setTemplate("訂單紀錄", "record");
          break;
        default:
          break;
        case "other":
          grid.setTemplate("beamCore", "other", "");
          break;
      }
    })

  } //initialization datasoure

  //set function
  setRowData(data) {
    this.rowData = data;
  }

  setColumnData(columnData) {
    this.columnData = columnData;
  }

  setCustomizeFunction(customizeFunction) {
    this.customizeFunction = customizeFunction;
  }

  setSaveData(data) {
    this.saveData = data;
  }

  setDeleteData(data) {
    this.deleteData = data;
  }

  setCreateData(data) {
    this.createData = data;
  }

  setModel(model) {
    this.model = model;
  }

  setI18n(i18n) {
    this.i18n = i18n;
  }

  setApiurl(apiUrl) {
    this.apiUrl = apiUrl;
  }

  setPageSize(pageSize) {
    this.pageSizes = pageSize;
  }

  setTotalElements(elementTotal) {
    this.elementTotal = elementTotal;
  }

  setOtherFieldName(otherFieldName) {
    this.otherFieldName = otherFieldName;
  }

  setSortField(sortField, dir) {
    this.sortField = sortField;
    this.dir = dir ? dir : "asc";
  }

  setColumnTemplate(fieldName, templateWithFunction) {
    let data = this.columns;
    data.map(function (element) {
      if (element.field == fieldName || element.title == fieldName) {
        element.template = templateWithFunction;
      }
    });
  }

  //get function
  getSaveData() {
    return this.saveData;
  }

  getDeleteData() {
    return this.deleteData;
  }

  getCreateData() {
    return this.createData;
  }

  getRowData() {
    return this.rowData;
  }

  getGridUuid() {
    return this.gridUuid;
  }

  getCustomizeFunction() {
    return this.customizeFunction;
  }

  getI18n() {
    return this.i18n;
  }

  getModel() {
    return this.model;
  }

  getPageSize() {
    return this.pageSizes;
  }

  getApiurl() {
    return this.apiUrl;
  }

  getTotalElements() {
    return this.elementTotal;
  }

  getOtherFieldName() {
    return this.otherFieldName
  }

  getSortField() {
    return this.sortField;
  }

  getDir() {
    return this.dir;
  }

  //設定grid欄位 
  //title: 通常為後端傳過來的i18n資料
  //fillter:判斷搜尋
  async setColumns(title, fillter) {
    var columns = this.columns;
    var template = this.template;
    var columnData = {};
    var Object = this;
    $.each(title, function (field, value) {
      let fillterable = {};

      if (fillter) {
        switch (value.search) { //由search的type去判斷各fillterable的樣式
          case "string":
            if (value.keyValue) {
              fillterable = {
                cell: {
                  template: function (args) {
                    args.element.kendoDropDownList({
                      dataSource: value.keyValue,
                      dataTextField: "text",
                      dataValueField: "value",
                      valuePrimitive: true,
                    });
                  },
                  showOperators: false,
                }
              }
            } else {
              fillterable = {
                cell: {
                  operator: "contains",
                  enabled: true,
                  template: function (e) {
                    e.element.addClass("k-textbox")
                    e.element.css("width", "100%")
                  },
                  delay: 1500
                }
              }
            }
            break;
          case "boolean":
            fillterable = {
              cell: {
                template: function (args) {
                  args.element.kendoDropDownList({
                    dataSource: [{
                      text: "關閉",
                      value: false
                    }, {
                      text: "開啟",
                      value: true
                    }],
                    dataTextField: "text",
                    dataValueField: "value",
                    valuePrimitive: true,
                  });
                },
                showOperators: false,
              }
            }
            break;
          default:
            break;
        }
      }
      if (value.search != null) { //由type判斷各欄位的樣式
        if (value.type == "hidden") {
          columnData = {
            hidden: true,
            field: field,
            title: value.title,
            width: "auto"
          };
        } else if (value.type == "command") {
          columnData = {
            field: field,
            filterable: false,
            title: value.title,
            width: "10%"
          };
        } else if (value.type == "date") {
          columnData = {
            field: field,
            title: value.title,
            filterable: fillterable,
            format: "{0: yyyy-MM-dd}",
            width: "auto"
          };
        } else if (fillterable) {
          columnData = {
            field: field,
            filterable: fillterable,
            title: value.title,
            width: "10%"
          };
        }
      } else {
        if (value.type == "hidden") {
          columnData = {
            hidden: true,
            field: field,
            title: value.title,
            width: "auto"
          }
        } else {
          columnData = {
            field: field,
            filterable: false,
            title: value.title,
            width: "10%"
          };
        }
      }
      columns.push(columnData);
    });
  }

  async setTitle(title) {
    this.title = title;
  }

  async setWidth(field, width) {
    let data = this.columns;
    data.map(function (element) {
      if (element.field == field) {
        element.width = width;
      }
    });
  }

  async setTemplate(fieldName, type, url, otherFieldName, otherData, otherTemplate) {
    let dataName = this.UuidName;
    let data = this.columns;
    let titleData = this.getI18n();

    switch (type) {
      case "customer":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            element.template = otherTemplate;
          }
        });
        break;
      case "copy":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            element.template = function () {
              return `<a class="table_btn table_btn_pink copy" href='javascript:void(0)' style="border-color:#8658DD;boder:5px">
            <img src="/images/icon_workflow/copy.svg" height="50%" width="50%" >
          </a>`
            }
          }
        });
        break;
      case "print":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            element.template = function () {
              return `<a class="table_btn table_btn_green print" href='javascript:void(0)' ">
              <i class="fa fa-print"></i>
              </a>`
            }
          }
        })
        break;
      case "link":
        // url = url.replace(/{/g, "${");
        var title = `\${d.${fieldName}}`;
        // this.template[fieldName] = function (d) {
        //   return eval(`\`<a class='number_a' href='${url}'>${title}</a>\``)
        // };
        // fieldName.template = function (d) {
        //   return eval(`\`<a class='number_a' href='${url}'>${title}</a>\``)
        // }
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            element.template = function (d) {
              return eval(`\`<a class='number_a' href='${url}'>${title}</a>\``)
            }
          }
        });
        break;
      case "analysis":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            element.template = function () {
              return `<a class="table_btn table_btn_analysis analysis" href='javascript:void(0)'>
                      <img src="/images/analysis.svg" height="50%" width="50%" ></a>`
            };
          }
        });
        break;
      case "record":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            element.template = function (d) {
              return `<a class="table_btn table_btn_record" href='javascript:void(0)'>
                      <img src="/images/history.svg" height="50%" width="50%" ></a>`
            };
          }
        });
        break;
      case "create":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            element.template = function () {
              return `<a class="table_btn table_btn_creatForm " href='javascript:void(0)'>
                      <img src="/images/output.svg" height="50%" width="50%" ></a>`
            };
          }
        });
        break;
      case "status":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {

            element.template = function (d) {
              switch (d[dataName + "Status"]) {
                case true:
                  return `<img src="/images/ok.svg" style="width: 25px">`;
                case false:
                  return `<i class="fa fa-ban color_pink"></i>`;
                default:
                  return " ";
              }
            };
          }
        });
        break;
      case "specification":
        data.map(function (element) {
          console.log(element);
          if (element.field.indexOf(fieldName) != -1) {
            element.template = function (d) {
              return eval(`\`<a class="table_btn table_btn_purple specification" href='${url}' style="border-color:#8658DD;boder:5px"><img src="/images/icon_workflow/specification.svg" height="50%" width="50%" ></a>\``)
            }
          }
        });
        break;

      case "stream":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            element.template = function (d) {
              return d[otherFieldName].indexOf("中") != -1 ? `<a class="table_btn table_btn_pink stream" href='javascript:void(0)' title="已複製連結" style="border-color:#FF2B66;boder:5px">
              <i class="fa fa-commenting-o"></i>
              </a>` : "";
            }
          }
        });
        break;
      case "purchase":
        data.map(function (element) {
          if (element.field.indexOf(fieldName) != -1) {
            element.template = function (d) {
              if (d.yarnPurchase.length == 0) {
                return "尚未採購";
              } else {
                var tmp = ""
                for (var i = 0; d.yarnPurchase.length > i; i++) {
                  tmp += "<a class='yarnPurchase_a' href='/page/yarn/purchase/form/" + d.yarnPurchase[i].yarnPurchaseCoreUuid + "'>" + d.yarnPurchase[i].yarnPurchaseNo + "</a>"
                }
                return tmp;
              }
            }
          }
        });
        break;
      case "workStation":
        data.map(function (element) {
          if (element.field.indexOf(fieldName) != -1) {
            console.log(url);
            element.template = function (d) {
              if (d[fieldName].uuid == null && d[fieldName].date == null) {
                return `<button class="btn grid" onclick="location='${url}form/'">排程</button>`;
              } else if (d[fieldName].uuid != null) {
                return `<a href='${url}form/` + `${fieldName}/` + d[fieldName].uuid + `'">` + d[fieldName].date + `</a>`;
              } else {
                return d[fieldName].date;
              }
            }
          }
        });
        //drafting  inspection shipment warping weaving
        break;
      case "gridDropDown":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            if (otherTemplate) element.template = otherTemplate
            if (titleData[fieldName].keyValue) element.values = titleData[fieldName].keyValue
            else if (otherData) element.values = otherData;
          }
        });
        break;
      case "gridEditDropDown":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            if (otherTemplate) element.template = otherTemplate
            let dataSource, valueType;
            if (otherData) {
              dataSource = otherData;
              valueType = "value";
            } else {
              dataSource = titleData[fieldName].keyValue;
              valueType = "text";
            };
            element.editor = function (container, options) {
              var input = $(
                '<input name="' + fieldName + '" data-bind="value:' + options.field + '">');
              input.appendTo(container);
              input.kendoDropDownList({
                dataSource: dataSource,
                dataTextField: "text",
                dataValueField: valueType,
                change: function (e) {
                  selectedValue[fieldName] = e.sender.value();
                },
              })
            }

          }
        });
        break;
      case "gridMultiSelect":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            if (otherTemplate) element.template = otherTemplate
            element.editor = function (container, options) {
              var input = $(
                '<select name="' + fieldName + '" data-bind="value : ' + options.field + '">');
              input.appendTo(container);
              input.kendoMultiSelect({
                dataSource: otherData,
                dataTextField: "text",
                dataValueField: "text",
                change: function (e) {
                  selectedValue[fieldName] = e.sender.value();
                },
              })

              // input.data("kendoMultiSelect").value(options.model[fieldName].split(","));
            }

          }
        });
        break;
      case "checkColumn":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            element.template = function (items) {
              var guid = kendo.guid();
              var checked = '';
              if (items[fieldName]) {
                checked = ' checked="checked" ';
              }
              return '<input class="k-checkbox ingrid" id="' + guid + '" type="checkbox" ' + checked + ' disabled="disabled" />' +
                '<label class="k-checkbox-label" for="' + guid + '">&#8203;</label>';
            },

              element.editor = function (container, options) {

                var guid = kendo.guid();
                $('<input class="k-checkbox" id="' + guid + '" type="checkbox" data-bind="checked:' + fieldName + '" style="display:none" />' + '<label class="k-checkbox-label" for="' + guid + '">&#8203;</label>').appendTo(container);
              }
            // function (container, options) {
            //   var guid = kendo.guid();
            //   $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name=' + fieldName + ' data-type="boolean" data-bind="checked:' + fieldName + '">').appendTo(container);
            //   $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
            //   // $('  <input type="checkbox" id="checked" #= ' + fieldName + ' ? \'checked="checked"\' : "" # class="chkbx"  />').appendTo(container);
            //   // $('<label class="k-checkbox-label" for="checked">​</label>').appendTo(container);
            // }

            // element.editor = function (container, options) {
            //   // console.log(otherData);
            //   var input = $(
            //     '<input name="' + fieldName + '" data-text-field="text" data-value-field="value" data-bind="value:' +
            //     options.field + '">');
            //   input.appendTo(container);
            //   input.kendoDropDownList({
            //     dataSource: otherData,
            //     dataTextField: "text",
            //     dataValueField: "value",
            //     change: function (e) {
            //       selectedValue[fieldName] = e.sender.value();
            //     },
            //   })
            // }

          }
        });
        break;
      case "date":
        data.map(function (element) {
          if (element.field == fieldName || element.title == fieldName) {
            element.format = '{0:yyyy/MM/dd HH:mm}';
            element.editor = function (container, options) {
              var input = $(
                '<input name="' + fieldName + '" data-text-field="text" data-value-field="value" data-bind="value:' +
                options.field + '">');
              input.appendTo(container);
              input.kendoDateTimePicker({
                value: new Date(),
                format: "{0:yyyy/MM/dd HH:mm}",
                open: function (e) {
                  switch (options.field) {
                    case "actualStartDatetime":
                      if (options.model.actualFinishDatetime) {
                        datePicker.max(options.model.actualFinishDatetime);
                      }
                      break;
                    case "actualFinishDatetime":
                      if (options.model.actualStartDatetime) {
                        datePicker.min(options.model.actualStartDatetime);
                      }
                      break;
                    default:
                      break;
                  }
                }
              });
              var datePicker = input.data("kendoDateTimePicker");
            }
          }
        });
        //drafting  inspection shipment warping weaving
        break;
    } //switch
  }

  async setJudgeTemplate(fieldName, variableA, variableB) {
    let data = this.columns;
    data.map(function (element) {
      if (element.title == fieldName) {
        element.template = function (d) {
          return (d[variableA] == variableB) ? `<a class="table_btn table_btn_pink" href='javascript:void(0)'>
                              <i class="fa fa-commenting-o"></i>
                            </a>` : ""
        };
      }
    });
  }

  async setSwitchTemplate(fieldName, titleName, status) {
    let data = this.columns;

    // status = arguments[1];
    data.map(function (element) {
      if (element.field == fieldName || element.title == fieldName) {
        element.template = function (d) {
          switch (status) {
            case 1:
              return `<img src="/images/ok.svg" style="width: 25px">`;
            case 0:
              return `<i class="fa fa-ban color_pink"></i>`;
            default:
              return " ";
          }
        };
      }
    });
  }

  async addColumns(field, value, width, template) {
    var detail = {
      title: (value) ? value : field,
      width: (width) ? width : "auto",
      filterable: false
    }
    if (value) {
      detail.field = field;
    }
    if (template) {
      detail.template = template;

    }
    this.columns.push(detail);
  }

  async addCheckColumns() {
    this.columns.push({
      selectable: true,
      width: "5%"
    })
  }

  async addEditColumns() {
    this.columns.push({
      command: [{
        name: "edit",
        template: function () {
          return `<a class="table_btn table_btn_purple editColumns" href='javascript:void(0)' style="margin-right:5px"><img src="/images/icon_workflow/writing.svg" height="50%" width="50%"  ></a>`
        }
      }, {
        name: "destroy",
        template: function () {
          return `<a class="table_btn table_btn_pink deleteColumns k-grid-delete" href='javascript:void(0)'><i class="fa fa-times"></i></a>`
        }
      }],
      width: "90px"
    })
  }

  async addOnlyEditColumns() {
    this.columns.push({
      command: [{
        name: "edit",
        template: function () {
          return `<a class="table_btn table_btn_purple editColumns" href='javascript:void(0)' style="margin-right:5px"><img src="/images/icon_workflow/writing.svg" height="50%" width="50%"  ></a>`
        }
      }],
      width: "90px"
    })
  }

  async sortColumns(columnA, columnB) {
    let columnC = this.columns[columnA];
    this.columns.splice(columnA, 1);
    this.columns.splice(columnB, 0, columnC);
  }

  async swapColumns(columnA, columnB) {
    let columnC = this.columns[columnA];
    this.columns[columnA] = this.columns[columnB];
    this.columns[columnB] = columnC;
  }

  async creatKendGrid(selector, filterable, editable, noPageable, createAt) {
    //await this.initDataSource();
    // this.setColumns(this.title, true);
    let filter;
    (filterable) ? filter = filterable : filter = false;
    let edit = {
      mode: "inline",
      createAt: "bottom"

    };
    (editable) ? edit = editable : edit = false;
    let saveEvent = null;
    let cancelEvent = null;
    if (this.getSaveData()) {
      saveEvent = this.getSaveData().saveEvent;
      cancelEvent = this.getSaveData().cancelEvent;
    }
    let page = {
      input: true,
      numeric: true,
      messages: {
        display: "第 {0}-{1} 筆，共 {2} 筆",
        empty: " ",
        page: "第",
        of: "頁，共{0}頁"
      }
    };
    if (noPageable) page = false;
    $(selector).kendoGrid({
      autoBind: false,
      dataSource: this.dataSource,
      editable: edit,
      toolbar: this.toolbar,
      sortable: true,
      save: saveEvent ? saveEvent : false,
      cancel: cancelEvent ? cancelEvent : false,
      persistSelection: true,
      pageable: page,
      columns: this.columns,
      noRecords: true,
      messages: {
        noRecords: "查無資料"
      },
      filterable: filter,
      dataBound: function (e) {
        $(selector + " .k-grid-header thead .k-checkbox").prop("checked", true).trigger("click");
      }
    })
    $(selector).data("kendoGrid").refresh();
  };
};
