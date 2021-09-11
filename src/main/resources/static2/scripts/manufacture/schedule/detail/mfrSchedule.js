$(async function () {
  var grid = new Grid("/manufacture/schedule/detail/", "grid,noToolbar,purchase,workStation", "clothOrderDetailDeliverQuantity", "manufactureOrderCore");
  await grid.initDataSource();
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
  await grid.creatKendGrid("#detail", filterable);
  $('body').on('click', '[data-field ="deliverDate"] [title="Clear"]', async function () {
    var range = {
      start: "",
      end: ""
    };
    $("#betweenDate").data("kendoDateRangePicker").range(range);
  });
  $('body').on('change', '[data-field ="deliverDate"] .k-dropdown-operator input', async function () {
    await this;
    let html = '<div id="betweenDate"><span style="display:flex; justify-content:center;" class="dataRange"><input  class="start-date"/><span>&nbsp~&nbsp</span><input  class="end-date"/></span></div>';
    if ($(this).attr("aria-label") == "選擇間距") {
      kendo.culture("zh-TW");
      $(".k-widget .k-datepicker").hide();

      if ($("#betweenDate").length == 0) {
        let filterCell = $(this).parents(".k-filtercell");
        $(html).insertBefore($(".k-widget .k-datepicker"));

        $("#betweenDate").kendoDateRangePicker({
          culture: "zh-TW",
          format: "yyyy/MM/dd",
          change: function (e) {
            // console.log(this._range);
            let startDate = this._range.start,
              endDate = this._range.end,
              dataSource = $("#schedule").data("kendoGrid").dataSource;
            if (startDate & endDate) {
              let filter = {
                logic: "and",
                filters: []
              };
              filter.filters.push({
                field: "deliverDate",
                operator: "gte",
                value: startDate
              });
              filter.filters.push({
                field: "deliverDate",
                operator: "lte",
                value: endDate
              });
              dataSource.filter(filter);
              // console.log(dataSource);
            }

          }
        });
        $(".dataRange").next("span").remove();
        $(".dataRange").next("span").remove();
        $(".dataRange").next("span").remove();
      } else {
        $(".start-date").show()
        $(".end-date").show()
        $("#betweenDate").show();
      }
    } else {
      $(".k-widget .k-datepicker").show();
      var range = {
        start: "",
        end: ""
      };
      $("#betweenDate").data("kendoDateRangePicker").range(range);
      $("#betweenDate").hide();
    }
    //console.log(filterCell);

  })
}) //$(function ()
