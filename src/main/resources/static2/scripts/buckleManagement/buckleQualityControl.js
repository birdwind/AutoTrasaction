var title = {};
var dataUuid = [];
window.localStorage.clear();
let searchKey = null;
$(async function () {
  var grid = new Grid("/buckle/quality/control/", "grid,copy", "buckleQualityControlCore", "buckleQualityControlCore");
  grid.setOtherFieldName("buckleQualityControlStatus");
  grid.setSortField("createDate");
  await grid.initDataSource();
  title = grid.getI18n()
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
        eq: "相等",
        between: "選擇間距"
      }
    }
  };
  await grid.creatKendGrid("#buckleQualityControlCore", filterable);
  copy()

}) //$(function ()

function copy() {
  $('body').on('click', '.copy', function () {
    let grid = $("#buckleQualityControlCore").data("kendoGrid");
    let dataItem = grid.dataItem($(event.target).closest("tr"));
    $.ajax({
      url: "/api/buckle/quality/control/template/" + dataItem.buckleQualityControlCoreUuid,
      method: "GET",
      success: function (data) {
        window.localStorage.setItem("buckleQualityCopy", JSON.stringify(data.response));
        if (data.status) {
          location.replace("/page/buckle/quality/control/form");
        }
      } // end of ajax success
    }); //end of ajax
  }) //end of copy click
}
