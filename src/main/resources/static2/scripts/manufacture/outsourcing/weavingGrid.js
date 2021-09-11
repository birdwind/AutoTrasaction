var title = {};
var dataUuid = [];
var grid;
window.localStorage.clear();
let searchKey = null;
$(async function () {
  grid = new Grid("/manufacture/outsourcing/weaving/", "grid,status,copy,print,stream", "outsourcingWeavingInquiryCore", "outsourcingWeavingInquiryCore");
  grid.setOtherFieldName("outsourcingWeavingInquiryStatus");
  grid.setSortField("outsourcingWeavingInquiryCoreNo", "desc");
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
  await grid.creatKendGrid("#schedule", filterable);
  baseController();

})//$(function ()


function baseController() {
  $('body').on('click', '.copy', function () {
    let grid = $("#schedule").data("kendoGrid");
    let dataItem = grid.dataItem($(event.target).closest("tr"));
    $.ajax({
      url: "/api/manufacture/outsourcing/weaving/template/" + dataItem.outsourcingWeavingInquiryCoreUuid,
      method: "GET",
      success: function (data) {
        window.localStorage.setItem("weavingCopy", JSON.stringify(data.response));
        if (data.status) {
          location.replace("/page/manufacture/outsourcing/weaving/form/");
        }
      } // end of ajax success
    }); //end of ajax
  })//end of copy click

  $('body').on('click', '.print', function () {
    let grid = $("#schedule").data("kendoGrid");
    let dataItem = grid.dataItem($(event.target).closest("tr"));

    location.replace("/page/manufacture/outsourcing/weaving/form/" + dataItem.outsourcingWeavingInquiryCoreUuid);

  })

  $('body').on('click', '.stream', function () {
    let grid = $("#schedule").data("kendoGrid");
    let dataItem = grid.dataItem($(event.target).closest("tr"));
    let btn = $(this);
    let url = "/api/manufacture/outsourcing/weaving/chat/link/" + dataItem.outsourcingWeavingInquiryCoreUuid;
    btn.tooltip({
      trigger: "click"
    }).queue(function () {
      $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
          if (!data.status) {
            btn.attr("data-original-title", "連結失效");
            if (data.httpStatus == 401) {
              btn.attr("data-original-title", "請登入");
              setTimeout(function () {
                location = "/"
              }, 1000);
            }
            btn.tooltip("show");
            setTimeout(function () {
              btn.tooltip("destroy");
              btn.remove();
            }, 800);
          } else {
            btn.closest("td").next().text(data.response.expiredTime);
            btn.tooltip("show");
            $("#chatlink").val(data.response.link);
            $("#chatlink").show().select();
            console.log($("#chatlink").val());
            document.execCommand("copy");
            $("#chatlink").hide();
            setTimeout(function () {
              btn.tooltip("destroy")
            }, 800);
          }
        }
      }) //end of ajax
      btn.dequeue();
    });
  })
}
