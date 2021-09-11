var title = {};
var grid;
window.localStorage.clear();

$(async function () {
  grid = new Grid("/beam/quality/control/", "grid,copy", "beamQualityControlCore", "beamQualityControlCore");
  grid.setSortField("beamQualityControlCoreNo", "desc");
  await grid.initDataSource();
  title = grid.getI18n();
  let filterable = {
    mode: "row",
    messages: {
      info: ""
    },
    operators: {
      string: {
        eq: "完全一致",
        contains: "包含",
      },
      number: {
        lte: "小於等於",
        eq: "等於",
        gte: "大於等於",
      },
      date: {
        gte: "之後",
        lte: "之前",
      }
    }
  };
  await grid.creatKendGrid("#grid", filterable);
  copy()

})//$(function ()

function copy() {
  $('body').on('click', '.copy', function () {
    let grid = $("#grid").data("kendoGrid");
    let dataItem = grid.dataItem($(event.target).closest("tr"));
    $.ajax({
      url: "/api/beam/quality/control/template/" + dataItem.beamQualityControlCoreUuid,
      method: "GET",
      success: function (data) {
        window.localStorage.setItem("beamQualityCopy", JSON.stringify(data.response));
        if (data.status) {
          location.replace("/page/beam/quality/control/form");
        }
      } // end of ajax success
    }); //end of ajax
  })//end of copy click
}
