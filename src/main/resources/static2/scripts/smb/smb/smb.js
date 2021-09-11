
var columnTemplate = {};
var columnItem;
var panelPerMinData = new kendo.data.DataSource({
    transport: {
        read: {
            url: "/scripts/smb/smb/gridJson/instrumentPanelPerMinGridJson.json",
            dataType: "json",
            // type: "POST",
            processData: false,
            contentType: false
        }, parameterMap: function (data) {
            let postData = new FormData();
            let dataFilter = data.filter;
            if (dataFilter) {
                $.each(dataFilter.filters, function (element, value) {
                    switch (value.field) {
                        default:
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
    // serverPaging: true,
    // serverFiltering: true,
    // serverSorting: true,
    schema: {
        total: function (data) {
            return data.response.totalElements
        },
        data: function (data) {
            titles = data.response.header;
            columnItem = [];
            for (i in titles) {
                switch (i) {
                    case "instrumentPanelPerMinUuid":
                    case "smbPerMinUuid":
                    case "weavingMachineCoreUuid":
                    case "manufactureOrderNo":
                    case "clothOrderNo":
                    case "clothNo":
                        continue;
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
            }//loop
            return data.response.contents;
        },
        model: {
            fields: {
                "instrumentPanelPerMinUuid": { type: "string" },
                "smbPerMinUuid": { type: "string" },
                "manufactureOrderNo": { type: "string" },
                "clothOrderNo": { type: "string" },
                "clothNo": { type: "string" },
                "weavingMachineCoreＵuid": { type: "string" },
                "weavingMachineCoreNo": { type: "string" },
                "rpm": { type: "string" },
                "warpstop": { type: "string" },
                "weftstop": { type: "string" },
                "lenostop": { type: "string" },
                "mchfail": { type: "string" },
                "manufactureEfficiency": { type: "string" }
            }
        }
    },
    pageSize: 10,
    page: 1
    // page: (sessionStorage.getItem("instrumentPanelPerMinPage") == null) ? 1 : sessionStorage.getItem("instrumentPanelPerMinPage")
});

var panelPerShiftData = new kendo.data.DataSource({
    transport: {
        read: {
            url: "/api/smb/smb/shift/grid",
            dataType: "json",
            type: "POST",
            processData: false,
            contentType: false
        }, parameterMap: function (data) {
            let postData = new FormData();
            let dataFilter = data.filter;
            if (dataFilter) {
                $.each(dataFilter.filters, function (element, value) {
                    switch (value.field) {
                        default:
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
    // serverPaging: true,
    // serverFiltering: true,
    // serverSorting: true,
    schema: {
        total: function (data) {
            return data.response.totalElements
        },
        data: function (data) {
            titles = data.response.header;
            columnItem = [];
            for (i in titles) {
                switch (i) {
                    case "instrumentPanelPerShiftUuid":
                    case "smbPerShiftUuid":
                    case "manufactureOrderNo":
                    case "clothOrderNo":
                    case "clothNo":
                        continue;
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
            }//loop
            return data.response.contents;
        },
        model: {
            fields: {
                "manufactureOrderNo": { type: "string" },
                "clothOrderNo": { type: "string" },
                "clothNo": { type: "string" },
                "weavingMachineCoreNo": { type: "string" },
                "rpm": { type: "string" },
                "warpstop": { type: "string" },
                "weftstop": { type: "string" },
                "lenostop": { type: "string" },
                "mchfail": { type: "string" },
                "manufactureEfficiency": { type: "string" }
            }
        }
    },
    pageSize: 10,
    page: 1
    // page: (sessionStorage.getItem("instrumentPanelPerMinPage") == null) ? 1 : sessionStorage.getItem("instrumentPanelPerMinPage")
});

var panelPerDayData = new kendo.data.DataSource({
    transport: {
        read: {
            url: "/scripts/smb/smb/gridJson/instrumentPanelPerDayGridJson.json",
            dataType: "json",
            // type: "POST",
            processData: false,
            contentType: false
        }, parameterMap: function (data) {
            let postData = new FormData();
            let dataFilter = data.filter;
            if (dataFilter) {
                $.each(dataFilter.filters, function (element, value) {
                    switch (value.field) {
                        default:
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
    // serverPaging: true,
    // serverFiltering: true,
    // serverSorting: true,
    schema: {
        total: function (data) {
            return data.response.totalElements
        },
        data: function (data) {
            titles = data.response.header;
            columnItem = [];
            for (i in titles) {
                switch (i) {
                    case "instrumentPanelPerDayUuid":
                    case "smbPerDayUuid":
                    case "manufactureOrderNo":
                    case "clothOrderNo":
                    case "clothNo":
                        continue;
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
            }//loop
            return data.response.contents;
        },
        model: {
            fields: {
                "manufactureOrderNo": { type: "string" },
                "clothOrderNo": { type: "string" },
                "clothNo": { type: "string" },
                "weavingMachineCoreNo": { type: "string" },
                "rpm": { type: "string" },
                "warpstop": { type: "string" },
                "weftstop": { type: "string" },
                "lenostop": { type: "string" },
                "mchfail": { type: "string" },
                "manufactureEfficiency": { type: "string" }
            }
        }
    },
    pageSize: 10,
    page: 1
    // page: (sessionStorage.getItem("instrumentPanelPerMinPage") == null) ? 1 : sessionStorage.getItem("instrumentPanelPerMinPage")
});

var clothCoreData = new kendo.data.DataSource({
    transport: {
        read: {
            url: "/scripts/smb/smb/gridJson/clothCoreData.json",
            dataType: "json"
        }
    },
    schema: {
        data: function (data) {
            return data.response
        }
    }
});
$(async function () {
    var dialog = new Object();
    $("#smb").tabs();
    //當班 Master Grid
    await panelPerMinData.fetch();
    var instrumentPanelPerMin = $("#instrumentPanelPerMin").kendoGrid(
        {
            dataSource: panelPerMinData,
            sortable: true,
            persistSelection: true,
            toolbar: kendo.template($("#PanelPerMinFilterTemplate").html()),
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
            detailTemplate: kendo.template($("#perMinDetailTemplate").html()),
            detailInit: perMinDetailInit
            // ,
            // dataBound: function (e) {
            //     $(window).scrollTop(0);
            //     sessionStorage.setItem("instrumentPanelPerMinPage", $("#instrumentPanelPerMin").data("kendoGrid").dataSource.page());
            //     for (i in this.columns) {
            //         this.autoFitColumn(i);
            //     }
            // }
        });
    //當班 Detail Grid 初始化
    async function perMinDetailInit(e) {
        var detailRow = e.detailRow;
        var panelPerMinDetailData = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/scripts/smb/smb/gridJson/perMinDetailGridJson.json",
                    dataType: "json",
                    // type: "POST",
                    processData: false,
                    contentType: false
                }, parameterMap: function (data) {
                    let postData = new FormData();
                    let dataFilter = data.filter;
                    if (dataFilter) {
                        $.each(dataFilter.filters, function (element, value) {
                            switch (value.field) {
                                default:
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
            // serverPaging: true,
            // serverFiltering: true,
            // serverSorting: true,
            schema: {
                total: function (data) {
                    return data.response.totalElements
                },
                data: function (data) {
                    titles = data.response.header;
                    columnItem = [];
                    for (i in titles) {
                        switch (i) {
                            case "smbPerMinUuid":
                                continue;
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
                    }//loop
                    return data.response.contents;
                },
                model: {
                    fields: {
                        "smbPerMinUuid": { type: "string" },
                        "weavingMachineCoreNo": { type: "string" },
                        "manufactureOrderNo": { type: "string" },
                        "clothOrderNo": { type: "string" },
                        "clothNo": { type: "string" },
                        "restBeamLength": { type: "string" },
                        "clothOffLength": { type: "string" },
                        "clothbeamPerMin": { type: "string" },
                        "expectClothOffDatetime": { type: "string" }
                    }
                }
            },
            pageSize: 10,
            filter: { field: "smbPerMinUuid", operator: "eq", value: e.data.smbPerMinUuid },
            page: (sessionStorage.getItem("instrumentPanelPerMinPage") == null) ? 1 : sessionStorage.getItem("instrumentPanelPerMinPage")
        });
        await panelPerMinDetailData.fetch();

        // 設定 布號 下拉式選單
        await clothCoreData.fetch();
        $("#clothCoreUuid_" + e.data.weavingMachineCoreUuid).kendoDropDownList({
            dataSource: clothCoreData,
            dataTextField: "text",
            dataValueField: "value",
            optionLabel: " ",
            noDataTemplate: "<span class='nodata'>查無資料</span>",
            filter: "contains",
            select: onSelect
        });
        function onSelect(e) {
            $("#machineDensityWeft_" + e.sender.element[0].id.replace("clothCoreUuid_", "")).val(e.dataItem.machineDensityWrap);
        }
        // 設定 「換布上軸」 Dialog
        var weavingMachineCoreUuid = e.data.weavingMachineCoreUuid;
        if (dialog[weavingMachineCoreUuid] != null) {
            dialog[weavingMachineCoreUuid].destroy();
            dialog[weavingMachineCoreUuid] = setDialog("#" + e.data.weavingMachineCoreUuid, "#showDialog_" + e.data.weavingMachineCoreUuid, e.data.weavingMachineCoreNo);
        }
        else {
            dialog[weavingMachineCoreUuid] = setDialog("#" + e.data.weavingMachineCoreUuid, "#showDialog_" + e.data.weavingMachineCoreUuid, e.data.weavingMachineCoreNo);
        }

        detailRow.find(".perMinDetail").kendoGrid({
            dataSource: panelPerMinDetailData,
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
            }
        });
    };
    //三班 Master Grid
    await panelPerShiftData.fetch();
    var instrumentPanelPerShift = $("#instrumentPanelPerShift").kendoGrid(
        {
            dataSource: panelPerShiftData,
            sortable: true,
            persistSelection: true,
            toolbar: kendo.template($("#PanelPerShiftFilterTemplate").html()),
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
            detailTemplate: kendo.template($("#perShiftDetailTemplate").html()),
            detailInit: perShiftDetailInit,
            // dataBound: function (e) {
            //     $(window).scrollTop(0);
            //     sessionStorage.setItem("instrumentPanelPerMin", $("#instrumentPanelPerMin").data("kendoGrid").dataSource.page());
            //     for (i in this.columns) {
            //         this.autoFitColumn(i);
            //     }
            // }
        });
    //三班 Detail Grid 初始化
    async function perShiftDetailInit(e) {
        var detailRow = e.detailRow;
        var morningShiftDetailData = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/scripts/smb/smb/gridJson/shiftDetailGridJson.json",
                    dataType: "json",
                    // type: "POST",
                    processData: false,
                    contentType: false
                }, parameterMap: function (data) {
                    let postData = new FormData();
                    let dataFilter = data.filter;
                    if (dataFilter) {
                        $.each(dataFilter.filters, function (element, value) {
                            switch (value.field) {
                                default:
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
            // serverPaging: true,
            // serverFiltering: true,
            // serverSorting: true,
            schema: {
                total: function (data) {
                    return data.response.totalElements
                },
                data: function (data) {
                    titles = data.response.header;
                    columnItem = [];
                    for (i in titles) {
                        switch (i) {
                            case "smbPerShiftUuid":
                            case "shiftArrangementUuid":
                                continue;
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
                    }//loop
                    return data.response.contents;
                },
                model: {
                    fields: {
                        "smbPerShiftUuid": { type: "string" },
                        "shiftArrangementUuid": { type: "string" },
                        "averageManufactureEfficiency": { type: "string" },
                        "picknoaPerShift": { type: "string" },
                        "warpstopPerShift": { type: "string" },
                        "weftstopPerShift": { type: "string" },
                        "lenostopPerShift": { type: "string" },
                        "totalstopPerShift": { type: "string" },
                        "averageRpmPerShift": { type: "string" },
                        "clothbeamPerShift": { type: "string" }
                    }
                }
            },
            pageSize: 10,
            filter: [
                { field: "smbPerShiftUuid", operator: "eq", value: e.data.smbPerShiftUuid },
                { field: "shiftArrangementUuid", operator: "eq", value: "37107bd7-423f-441f-b5d1-2335296da63f" }
            ],
            page: 1
            // page: (sessionStorage.getItem("instrumentPanelPerMinPage") == null) ? 1 : sessionStorage.getItem("instrumentPanelPerMinPage")
        });
        var lunchShiftDetailData = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/scripts/smb/smb/gridJson/shiftDetailGridJson.json",
                    dataType: "json",
                    // type: "POST",
                    processData: false,
                    contentType: false
                }, parameterMap: function (data) {
                    let postData = new FormData();
                    let dataFilter = data.filter;
                    if (dataFilter) {
                        $.each(dataFilter.filters, function (element, value) {
                            switch (value.field) {
                                default:
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
            // serverPaging: true,
            // serverFiltering: true,
            // serverSorting: true,
            schema: {
                total: function (data) {
                    return data.response.totalElements
                },
                data: function (data) {
                    titles = data.response.header;
                    columnItem = [];
                    for (i in titles) {
                        switch (i) {
                            case "smbPerShiftUuid":
                            case "shiftArrangementUuid":
                                continue;
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
                    }//loop
                    return data.response.contents;
                },
                model: {
                    fields: {
                        "smbPerShiftUuid": { type: "string" },
                        "shiftArrangementUuid": { type: "string" },
                        "averageManufactureEfficiency": { type: "string" },
                        "picknoaPerShift": { type: "string" },
                        "warpstopPerShift": { type: "string" },
                        "weftstopPerShift": { type: "string" },
                        "lenostopPerShift": { type: "string" },
                        "totalstopPerShift": { type: "string" },
                        "averageRpmPerShift": { type: "string" },
                        "clothbeamPerShift": { type: "string" }
                    }
                }
            },
            pageSize: 10,
            filter: [
                { field: "smbPerShiftUuid", operator: "eq", value: e.data.smbPerShiftUuid },
                { field: "shiftArrangementUuid", operator: "eq", value: "067a46f0-0b28-4c76-9bc7-cbab0d1d1b1e" }
            ],
            page: 1
            // page: (sessionStorage.getItem("instrumentPanelPerMinPage") == null) ? 1 : sessionStorage.getItem("instrumentPanelPerMinPage")
        });
        var nightShiftDetailData = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/scripts/smb/smb/gridJson/shiftDetailGridJson.json",
                    dataType: "json",
                    // type: "POST",
                    processData: false,
                    contentType: false
                }, parameterMap: function (data) {
                    let postData = new FormData();
                    let dataFilter = data.filter;
                    if (dataFilter) {
                        $.each(dataFilter.filters, function (element, value) {
                            switch (value.field) {
                                default:
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
            // serverPaging: true,
            // serverFiltering: true,
            // serverSorting: true,
            schema: {
                total: function (data) {
                    return data.response.totalElements
                },
                data: function (data) {
                    titles = data.response.header;
                    columnItem = [];
                    for (i in titles) {
                        switch (i) {
                            case "smbPerShiftUuid":
                            case "shiftArrangementUuid":
                                continue;
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
                    }//loop
                    return data.response.contents;
                },
                model: {
                    fields: {
                        "smbPerShiftUuid": { type: "string" },
                        "shiftArrangementUuid": { type: "string" },
                        "averageManufactureEfficiency": { type: "string" },
                        "picknoaPerShift": { type: "string" },
                        "warpstopPerShift": { type: "string" },
                        "weftstopPerShift": { type: "string" },
                        "lenostopPerShift": { type: "string" },
                        "totalstopPerShift": { type: "string" },
                        "averageRpmPerShift": { type: "string" },
                        "clothbeamPerShift": { type: "string" }
                    }
                }
            },
            pageSize: 10,
            filter: [
                { field: "smbPerShiftUuid", operator: "eq", value: e.data.smbPerShiftUuid },
                { field: "shiftArrangementUuid", operator: "eq", value: "0ff3a111-2966-42b6-912d-b904a5bf8ddf" }
            ],
            page: 1
            // page: (sessionStorage.getItem("instrumentPanelPerMinPage") == null) ? 1 : sessionStorage.getItem("instrumentPanelPerMinPage")
        });
        var shiftClothInfoDetailData = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/scripts/smb/smb/gridJson/shiftClothInfoDetailGridJson.json",
                    dataType: "json",
                    // type: "POST",
                    processData: false,
                    contentType: false
                }, parameterMap: function (data) {
                    let postData = new FormData();
                    let dataFilter = data.filter;
                    if (dataFilter) {
                        $.each(dataFilter.filters, function (element, value) {
                            switch (value.field) {
                                default:
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
            // serverPaging: true,
            // serverFiltering: true,
            // serverSorting: true,
            schema: {
                total: function (data) {
                    return data.response.totalElements
                },
                data: function (data) {
                    titles = data.response.header;
                    columnItem = [];
                    for (i in titles) {
                        switch (i) {
                            case "smbPerShiftUuid":
                            case "shiftArrangementUuid":
                                continue;
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
                    }//loop
                    return data.response.contents;
                },
                model: {
                    fields: {
                        "smbPerShiftUuid": { type: "string" },
                        "clothNo": { type: "string" },
                        "startDatetime": { type: "string" },
                        "endDatetime": { type: "string" },
                        "totalClothbeamPerShift": { type: "string" },
                        "manufactureOrderNo": { type: "string" },
                        "clothOrderNo": { type: "string" }
                    }
                }
            },
            pageSize: 10,
            filter: [
                { field: "smbPerShiftUuid", operator: "eq", value: e.data.smbPerShiftUuid }
            ],
            page: 1
            // page: (sessionStorage.getItem("instrumentPanelPerMinPage") == null) ? 1 : sessionStorage.getItem("instrumentPanelPerMinPage")
        });

        await morningShiftDetailData.fetch();
        detailRow.find(".morningShift").kendoGrid({
            dataSource: morningShiftDetailData,
            sortable: true,
            persistSelection: true,
            pageable: false,
            columns: columnItem,
            noRecords: true,
            messages: {
                noRecords: "查無資料"
            }
        });
        await lunchShiftDetailData.fetch();
        detailRow.find(".lunchShift").kendoGrid({
            dataSource: lunchShiftDetailData,
            sortable: true,
            persistSelection: true,
            pageable: false,
            columns: columnItem,
            noRecords: true,
            messages: {
                noRecords: "查無資料"
            }
        });
        await nightShiftDetailData.fetch();
        detailRow.find(".nightShift").kendoGrid({
            dataSource: nightShiftDetailData,
            sortable: true,
            persistSelection: true,
            pageable: false,
            columns: columnItem,
            noRecords: true,
            messages: {
                noRecords: "查無資料"
            }
        });
        await shiftClothInfoDetailData.fetch();
        detailRow.find(".detail").kendoGrid({
            dataSource: shiftClothInfoDetailData,
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
            }
        });
    }
    //當日 Detail Grid 初始化
    await panelPerDayData.fetch();
    var instrumentPanelPerDay = $("#instrumentPanelPerDay").kendoGrid(
        {
            dataSource: panelPerDayData,
            sortable: true,
            persistSelection: true,
            toolbar: kendo.template($("#PanelPerDayFilterTemplate").html()),
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
            detailTemplate: kendo.template($("#perDayDetailTemplate").html()),
            detailInit: perDayDetailInit
            // ,
            // dataBound: function (e) {
            //     $(window).scrollTop(0);
            //     sessionStorage.setItem("instrumentPanelPerMin", $("#instrumentPanelPerMin").data("kendoGrid").dataSource.page());
            //     for (i in this.columns) {
            //         this.autoFitColumn(i);
            //     }
            // }
        });
    //當日 Detail Grid 初始化
    async function perDayDetailInit(e) {
        var detailRow = e.detailRow;
        var perDayDetailData = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/scripts/smb/smb/gridJson/dayDetailGridJson.json",
                    dataType: "json",
                    // type: "POST",
                    processData: false,
                    contentType: false
                }, parameterMap: function (data) {
                    let postData = new FormData();
                    let dataFilter = data.filter;
                    if (dataFilter) {
                        $.each(dataFilter.filters, function (element, value) {
                            switch (value.field) {
                                default:
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
            // serverPaging: true,
            // serverFiltering: true,
            // serverSorting: true,
            schema: {
                total: function (data) {
                    return data.response.totalElements
                },
                data: function (data) {
                    titles = data.response.header;
                    columnItem = [];
                    for (i in titles) {
                        switch (i) {
                            case "smbPerDayUuid":
                                continue;
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
                    }//loop
                    return data.response.contents;
                },
                model: {
                    fields: {
                        "smbPerDayUuid": { type: "string" },
                        "averageManufactureEfficiency": { type: "string" },
                        "picknoaPerShift": { type: "string" },
                        "warpstopPerShift": { type: "string" },
                        "weftstopPerShift": { type: "string" },
                        "lenostopPerShift": { type: "string" },
                        "totalstopPerShift": { type: "string" },
                        "averageRpmPerShift": { type: "string" },
                        "clothbeamPerShift": { type: "string" }
                    }
                }
            },
            pageSize: 10,
            filter: [
                { field: "smbPerDayUuid", operator: "eq", value: e.data.smbPerDayUuid }
            ],
            page: 1
            // page: (sessionStorage.getItem("instrumentPanelPerMinPage") == null) ? 1 : sessionStorage.getItem("instrumentPanelPerMinPage")
        });
        var perDayclothInfoDetailData = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/scripts/smb/smb/gridJson/dayclothInfoDetailGridJson.json",
                    dataType: "json",
                    // type: "POST",
                    processData: false,
                    contentType: false
                }, parameterMap: function (data) {
                    let postData = new FormData();
                    let dataFilter = data.filter;
                    if (dataFilter) {
                        $.each(dataFilter.filters, function (element, value) {
                            switch (value.field) {
                                default:
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
            // serverPaging: true,
            // serverFiltering: true,
            // serverSorting: true,
            schema: {
                total: function (data) {
                    return data.response.totalElements
                },
                data: function (data) {
                    titles = data.response.header;
                    columnItem = [];
                    for (i in titles) {
                        switch (i) {
                            case "smbPerDayUuid":
                                continue;
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
                    }//loop
                    return data.response.contents;
                },
                model: {
                    fields: {
                        "smbPerDayUuid": { type: "string" },
                        "clothNo": { type: "string" },
                        "startDatetime": { type: "string" },
                        "endDatetime": { type: "string" },
                        "totalWeavingYard": { type: "string" },
                        "totalClothbeamPerShift": { type: "string" },
                        "manufactureOrderNo": { type: "string" },
                        "clothOrderNo": { type: "string" }
                    }
                }
            },
            pageSize: 10,
            filter: [
                { field: "smbPerDayUuid", operator: "eq", value: e.data.smbPerDayUuid }
            ],
            page: 1
            // page: (sessionStorage.getItem("instrumentPanelPerMinPage") == null) ? 1 : sessionStorage.getItem("instrumentPanelPerMinPage")
        });
        await perDayDetailData.fetch();
        detailRow.find(".detail").kendoGrid({
            dataSource: perDayDetailData,
            sortable: true,
            persistSelection: true,
            pageable: false,
            columns: columnItem,
            noRecords: true,
            messages: {
                noRecords: "查無資料"
            }
        });
        await perDayclothInfoDetailData.fetch();
        detailRow.find(".clothDetail").kendoGrid({
            dataSource: perDayclothInfoDetailData,
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
            }
        });
    }

    // 額外查詢
    $("#perMinClothNo").keyup(async function () {
        var item = $(this).val();
        var thisFilter = [];
        if (instrumentPanelPerMin.data('kendoGrid').dataSource.filter() != undefined) {
            thisFilter = instrumentPanelPerMin.data('kendoGrid').dataSource.filter().filters;
        }
        if (item != "") {
            $("#perMinClothNo").siblings(".clear").show();
            var hasClothNoFilter = false;
            if (thisFilter.length != 0) {
                for (filterItem in thisFilter) {
                    if (thisFilter[filterItem].field == "clothNo") {
                        thisFilter[filterItem].value = item;
                        hasClothNoFilter = true;
                    }
                }
            }
            if (hasClothNoFilter == false) {
                thisFilter.push({ field: "clothNo", operator: "contains", value: item });
            }
        }
        else {
            $("#perMinClothNo").siblings(".clear").hide();
            var tmpFilter = [];
            for (filterItem in thisFilter) {
                if (thisFilter[filterItem].field != "clothNo") {
                    tmpFilter.push(thisFilter[filterItem]);
                }
            }
            thisFilter = tmpFilter;
        }
        instrumentPanelPerMin.data('kendoGrid').dataSource.filter({
            logic: 'and',
            filters: thisFilter
        });
    });
    $("#perMinClothOrderNo").keyup(function () {
        var item = $(this).val();
        var thisFilter = [];
        if (instrumentPanelPerMin.data('kendoGrid').dataSource.filter() != undefined) {
            thisFilter = instrumentPanelPerMin.data('kendoGrid').dataSource.filter().filters;
        }
        if (item != "") {
            $("#perMinClothOrderNo").siblings(".clear").show();
            var hasClothOrderNoFilter = false;
            if (thisFilter.length != 0) {
                for (filterItem in thisFilter) {
                    if (thisFilter[filterItem].field == "clothOrderNo") {
                        thisFilter[filterItem].value = item;
                        hasClothOrderNoFilter = true;
                    }
                }
            }
            if (hasClothOrderNoFilter == false) {
                thisFilter.push({ field: "clothOrderNo", operator: "contains", value: item });
            }
        }
        else {
            $("#perMinClothOrderNo").siblings(".clear").hide();
            var tmpFilter = [];
            for (filterItem in thisFilter) {
                if (thisFilter[filterItem].field != "clothOrderNo") {
                    tmpFilter.push(thisFilter[filterItem]);
                }
            }
            thisFilter = tmpFilter;
        }
        instrumentPanelPerMin.data('kendoGrid').dataSource.filter({
            logic: 'and',
            filters: thisFilter
        });
    });
    $("#perMinManufactureOrderNo").keyup(function () {
        var item = $(this).val();
        var thisFilter = [];
        if (instrumentPanelPerMin.data('kendoGrid').dataSource.filter() != undefined) {
            thisFilter = instrumentPanelPerMin.data('kendoGrid').dataSource.filter().filters;
        }
        if (item != "") {
            $("#perMinManufactureOrderNo").siblings(".clear").show();
            var hasManufactureOrderNoFilter = false;
            if (thisFilter.length != 0) {
                for (filterItem in thisFilter) {
                    if (thisFilter[filterItem].field == "manufactureOrderNo") {
                        thisFilter[filterItem].value = item;
                        hasManufactureOrderNoFilter = true;
                    }
                }
            }
            if (hasManufactureOrderNoFilter == false) {
                thisFilter.push({ field: "manufactureOrderNo", operator: "contains", value: item });
            }
        }
        else {
            $("#perMinManufactureOrderNo").siblings(".clear").hide();
            var tmpFilter = [];
            for (filterItem in thisFilter) {
                if (thisFilter[filterItem].field != "manufactureOrderNo") {
                    tmpFilter.push(thisFilter[filterItem]);
                }
            }
            thisFilter = tmpFilter;
        }
        instrumentPanelPerMin.data('kendoGrid').dataSource.filter({
            logic: 'and',
            filters: thisFilter
        });
    });

    $("#perShiftClothNo").keyup(async function () {
        var item = $(this).val();
        var thisFilter = [];
        if (instrumentPanelPerShift.data('kendoGrid').dataSource.filter() != undefined) {
            thisFilter = instrumentPanelPerShift.data('kendoGrid').dataSource.filter().filters;
        }
        if (item != "") {
            $("#perShiftClothNo").siblings(".clear").show();
            var hasClothNoFilter = false;
            if (thisFilter.length != 0) {
                for (filterItem in thisFilter) {
                    if (thisFilter[filterItem].field == "clothNo") {
                        thisFilter[filterItem].value = item;
                        hasClothNoFilter = true;
                    }
                }
            }
            if (hasClothNoFilter == false) {
                thisFilter.push({ field: "clothNo", operator: "contains", value: item });
            }
        }
        else {
            $("#perShiftClothNo").siblings(".clear").hide();
            var tmpFilter = [];
            for (filterItem in thisFilter) {
                if (thisFilter[filterItem].field != "clothNo") {
                    tmpFilter.push(thisFilter[filterItem]);
                }
            }
            thisFilter = tmpFilter;
        }
        instrumentPanelPerShift.data('kendoGrid').dataSource.filter({
            logic: 'and',
            filters: thisFilter
        });
    });
    $("#perShiftClothOrderNo").keyup(function () {
        var item = $(this).val();
        var thisFilter = [];
        if (instrumentPanelPerShift.data('kendoGrid').dataSource.filter() != undefined) {
            thisFilter = instrumentPanelPerShift.data('kendoGrid').dataSource.filter().filters;
        }
        if (item != "") {
            $("#perShiftClothOrderNo").siblings(".clear").show();
            var hasClothOrderNoFilter = false;
            if (thisFilter.length != 0) {
                for (filterItem in thisFilter) {
                    if (thisFilter[filterItem].field == "clothOrderNo") {
                        thisFilter[filterItem].value = item;
                        hasClothOrderNoFilter = true;
                    }
                }
            }
            if (hasClothOrderNoFilter == false) {
                thisFilter.push({ field: "clothOrderNo", operator: "contains", value: item });
            }
        }
        else {
            $("#perShiftClothOrderNo").siblings(".clear").hide();
            var tmpFilter = [];
            for (filterItem in thisFilter) {
                if (thisFilter[filterItem].field != "clothOrderNo") {
                    tmpFilter.push(thisFilter[filterItem]);
                }
            }
            thisFilter = tmpFilter;
        }
        instrumentPanelPerShift.data('kendoGrid').dataSource.filter({
            logic: 'and',
            filters: thisFilter
        });
    });
    $("#perShiftManufactureOrderNo").keyup(function () {
        var item = $(this).val();
        var thisFilter = [];
        if (instrumentPanelPerShift.data('kendoGrid').dataSource.filter() != undefined) {
            thisFilter = instrumentPanelPerShift.data('kendoGrid').dataSource.filter().filters;
        }
        if (item != "") {
            $("#perShiftManufactureOrderNo").siblings(".clear").show();
            var hasManufactureOrderNoFilter = false;
            if (thisFilter.length != 0) {
                for (filterItem in thisFilter) {
                    if (thisFilter[filterItem].field == "manufactureOrderNo") {
                        thisFilter[filterItem].value = item;
                        hasManufactureOrderNoFilter = true;
                    }
                }
            }
            if (hasManufactureOrderNoFilter == false) {
                thisFilter.push({ field: "manufactureOrderNo", operator: "contains", value: item });
            }
        }
        else {
            $("#perShiftManufactureOrderNo").siblings(".clear").hide();
            var tmpFilter = [];
            for (filterItem in thisFilter) {
                if (thisFilter[filterItem].field != "manufactureOrderNo") {
                    tmpFilter.push(thisFilter[filterItem]);
                }
            }
            thisFilter = tmpFilter;
        }
        instrumentPanelPerShift.data('kendoGrid').dataSource.filter({
            logic: 'and',
            filters: thisFilter
        });
    });

    $("#perDayClothNo").keyup(async function () {
        var item = $(this).val();
        var thisFilter = [];
        if (instrumentPanelPerDay.data('kendoGrid').dataSource.filter() != undefined) {
            thisFilter = instrumentPanelPerDay.data('kendoGrid').dataSource.filter().filters;
        }
        if (item != "") {
            $("#perDayClothNo").siblings(".clear").show();
            var hasClothNoFilter = false;
            if (thisFilter.length != 0) {
                for (filterItem in thisFilter) {
                    if (thisFilter[filterItem].field == "clothNo") {
                        thisFilter[filterItem].value = item;
                        hasClothNoFilter = true;
                    }
                }
            }
            if (hasClothNoFilter == false) {
                thisFilter.push({ field: "clothNo", operator: "contains", value: item });
            }
        }
        else {
            $("#perDayClothNo").siblings(".clear").hide();
            var tmpFilter = [];
            for (filterItem in thisFilter) {
                if (thisFilter[filterItem].field != "clothNo") {
                    tmpFilter.push(thisFilter[filterItem]);
                }
            }
            thisFilter = tmpFilter;
        }
        instrumentPanelPerDay.data('kendoGrid').dataSource.filter({
            logic: 'and',
            filters: thisFilter
        });
    });
    $("#perDayClothOrderNo").keyup(function () {
        var item = $(this).val();
        var thisFilter = [];
        if (instrumentPanelPerDay.data('kendoGrid').dataSource.filter() != undefined) {
            thisFilter = instrumentPanelPerDay.data('kendoGrid').dataSource.filter().filters;
        }
        if (item != "") {
            $("#perDayClothOrderNo").siblings(".clear").show();
            var hasClothOrderNoFilter = false;
            if (thisFilter.length != 0) {
                for (filterItem in thisFilter) {
                    if (thisFilter[filterItem].field == "clothOrderNo") {
                        thisFilter[filterItem].value = item;
                        hasClothOrderNoFilter = true;
                    }
                }
            }
            if (hasClothOrderNoFilter == false) {
                thisFilter.push({ field: "clothOrderNo", operator: "contains", value: item });
            }
        }
        else {
            $("#perDayClothOrderNo").siblings(".clear").hide();
            var tmpFilter = [];
            for (filterItem in thisFilter) {
                if (thisFilter[filterItem].field != "clothOrderNo") {
                    tmpFilter.push(thisFilter[filterItem]);
                }
            }
            thisFilter = tmpFilter;
        }
        instrumentPanelPerDay.data('kendoGrid').dataSource.filter({
            logic: 'and',
            filters: thisFilter
        });
    });
    $("#perDayManufactureOrderNo").keyup(function () {
        var item = $(this).val();
        var thisFilter = [];
        if (instrumentPanelPerDay.data('kendoGrid').dataSource.filter() != undefined) {
            thisFilter = instrumentPanelPerDay.data('kendoGrid').dataSource.filter().filters;
        }
        if (item != "") {
            $("#perDayManufactureOrderNo").siblings(".clear").show();
            var hasManufactureOrderNoFilter = false;
            if (thisFilter.length != 0) {
                for (filterItem in thisFilter) {
                    if (thisFilter[filterItem].field == "manufactureOrderNo") {
                        thisFilter[filterItem].value = item;
                        hasManufactureOrderNoFilter = true;
                    }
                }
            }
            if (hasManufactureOrderNoFilter == false) {
                thisFilter.push({ field: "manufactureOrderNo", operator: "contains", value: item });
            }
        }
        else {
            $("#perDayManufactureOrderNo").siblings(".clear").hide();
            var tmpFilter = [];
            for (filterItem in thisFilter) {
                if (thisFilter[filterItem].field != "manufactureOrderNo") {
                    tmpFilter.push(thisFilter[filterItem]);
                }
            }
            thisFilter = tmpFilter;
        }
        instrumentPanelPerDay.data('kendoGrid').dataSource.filter({
            logic: 'and',
            filters: thisFilter
        });
    });

    $(".clear").click(function () {
        $(this).hide();
        $(this).siblings("input").val("").trigger("keyup");;
    });

});

function setDialog(select, openSelect, weavingMachineCoreNo) {
    var title = "換布上軸-機台編號" + weavingMachineCoreNo;
    var dialog = $(select).kendoDialog({
        width: "800px",
        title: title,
        actions: [
            { text: '取消' },
            { text: '儲存', primary: true, action: save }
        ],
        visible: false
    }).data("kendoDialog");
    $(openSelect).click(function () {
        dialog.open();
        dialog.toFront();
    });
    function save(e) {
        alert(e.sender.element[0].id);
    }
    return dialog;
}//end of setDialog

function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
}
$(document).on('hidden.bs.collapse', '.collapse', toggleIcon);
$(document).on('shown.bs.collapse', '.collapse', toggleIcon);
