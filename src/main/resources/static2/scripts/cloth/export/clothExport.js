let rootApi = "/cloth/export";

$(async function () {
  $("#grid").initKendoGrid({
    linkField: "greyClothExportNo",
    linkUuid: "greyClothExportUuid",
    url: rootApi,
    toolbar: kgrid_gridTemplate["toolbar-advancedSearch"],
    sort:{
      field: "exportDateTime",
      dir: "desc"
    },
    // toolbarWithAdvancedSearch: true,
    // advancedSearchWithPanel: true,
    toolbarSearchField: ['greyClothExportNo', 'targetClothOrder', 'clothNo', 'clothBatch', 'exportStaff'],
  });
  // grid = new Grid("/cloth/export/", "grid", "clothExport", "clothExport");
  // grid.setSortField("beamQualityControlCoreNo", "desc");
  // await grid.initDataSource();
  // title = grid.getI18n();
  // let filterable = {
  //   mode: "row",
  //   messages: {
  //     info: ""
  //   },
  //   operators: {
  //     string: {
  //       eq: "完全一致",
  //       contains: "包含",
  //     },
  //     number: {
  //       lte: "小於等於",
  //       eq: "等於",
  //       gte: "大於等於",
  //     },
  //     date: {
  //       gte: "之後",
  //       lte: "之前",
  //     }
  //   }
  // };
  // await grid.creatKendGrid("#grid", filterable);

})//$(function ()
