let grid;

$(async function () {
  grid = new Grid("/manufacture/order/", "grid", "manufactureOrder", "manufactureOrder");
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
        eq: "相等",
        between: "選擇間距"
      }
    }
  };
  await grid.creatKendGrid("#grid", filterable);
  baseController();
});//$(function ()


function baseController() {

}
