<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <style>
    .k-confirm .k-window-titlebar::before {
      content: '提示';
    }

    .k-confirm .k-window-titlebar .k-dialog-title {
      display: none;
    }

  </style>
  <%-- <script src="${webapps.contextPath}/scripts/shipment/warehousecate.js"></script> --%>
  <script>
    var selectedValue1 = null;
    var selectedValue2 = null;
    $(async function () {
      $("#facilityWarping").kendoGrid({
        dataSource: {
          data: [{
            id: 1,
            facilityWarping_no: "eve-29101105-3",
            classification: [{
              text: "唯聖",
              value: 1
            }, {
              text: "新光",
              value: 2
            }, {
              text: "台南",
              value: 3
            }],
            facilityWarping_Data: "2019/11/07",
            company: [{
              text: "唯聖",
              value: 1
            }, {
              text: "新光",
              value: 2
            }, {
              text: "台南",
              value: 3
            }],
          }],
          schema: {
            model: {
              id: "id",
              classification: [{
                text: "001",
                value: 1
              }, {
                text: "002",
                value: 2
              }, {
                text: "003",
                value: 3
              }],
              company: [{
                text: "唯聖",
                value: 1
              }, {
                text: "新光",
                value: 2
              }, {
                text: "台南",
                value: 3
              }],
            }
          }
        },
        editable: {
          mode: "inline",
          createAt: "bottom"
        },
        toolbar: kendo.template($("#toolbar").html()),
        sortable: true,
        pageable: {
          input: true,
          numeric: true,
          pageSize: 5,
          messages: {
            display: "第 {0}-{1} 筆，共 {2} 筆",
            empty: " ",
            page: "第",
            of: "頁，共{0}頁"
          }
        },
        columns: [{
            field: "id",
            hidden: true,
          },
          {
            field: "facilityWarping_no",
            title: "整經機編號"
          },
          {
            field: "facilityWarping_name",
            title: "隸屬公司",
            template: "#=generateTemplate(classification,selectedValue1)#",
            editor: function (container, options) {
              if (options.model.classification.length <= 1)
                return;
              var input = $(
                '<input id="classification" name="classification" data-text-field="text" data-value-field="value" data-bind="value:' +
                options.field + '">');
              input.appendTo(container);
              input.kendoDropDownList({
                dataSource: options.model.classification,
                dataTextField: "text",
                dataValueField: "value",
                change: function (e) {
                  selectedValue1 = e.sender.value();
                },
                value: 1
              });
            },
          },
          {
            field: "facilityWarping_Data",
            title: "購入日期"

          },
          {
            field: "facilityWarping_company",
            title: "購入廠商",
            template: "#=generateTemplate(company,selectedValue2)#",
            editor: function (container, options) {
              console.log(container);
              if (options.model.company.length <= 1)
                return;
              var input = $(
                '<input id="company" name="company" data-text-field="text" data-value-field="value" data-bind="value:' +
                options.field + '">');
              input.appendTo(container);
              input.kendoDropDownList({
                dataSource: options.model.company,
                dataTextField: "text",
                dataValueField: "value",
                change: function (e) {
                  selectedValue2 = e.sender.value();
                },

              });
            }

          },
          {
            command: [{
                name: "edit",
                template: function () {
                  return `<a class="table_btn table_btn_purple specification" href='javascript:void(0)'><img src="/images/icon_workflow/writing.svg" height="50%" width="50%" ></a>`
                }
              },

            ]
            // template:function () {
            //   return `<a class="table_btn table_btn_purple specification" href='javascript:void(0)' style="border-color:#8658DD;boder:5px"><img src="/images/icon_workflow/specification.svg" height="50%" width="50%" ></a>`
            // }
          },
        ],

        noRecords: true,
        messages: {
          noRecords: "查無資料"
        },
        filterable: {
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
        }
      })
      console.log($("#facilityWarping").data("kendoGrid").dataSource.data())
      $("body").on("click", ".specification", function () {
        var row = $(this).closest("tr");
        var rowTd = $(this).closest("td");
        $("#facilityWarping").data("kendoGrid").editRow(row);
        row.find("input").css("width", "90%");
        rowTd.find(".k-button").remove(".k-button");
        rowTd.append($("#saveBtn").html());
        rowTd.append($("#canBtn").html());
        $(".specification").addClass("waitEdit");
        $(".specification").removeClass("specification");
      });
      $('body').on('click', '.editing', function () {
        $(".waitEdit").addClass("specification");
        $(".waitEdit").removeClass("waitEdit");
      }) //checkbox 

      $('body').on('click', '#addbtn', function () {

        $("#facilityWarping").data("kendoGrid").addRow();
        var row = $("#facilityWarping").find(".k-grid-edit-row");
        row.find("input").css("width", "90%");
        row.find("td").siblings(".k-command-cell").find(".k-button").remove(".k-button");
        row.find("td").siblings(".k-command-cell").append($("#saveBtn").html())
        row.find("td").siblings(".k-command-cell").append($("#canBtn").html())
        $(".specification").addClass("waitEdit");
        $(".specification").removeClass("specification");
      }) //checkbox 
      $('body').on('click', '#facilityWarping .k-checkbox', function () {
        $("#trashBin").hide();
        if ($("#facilityWarping .k-grid-content tbody input:checkbox:checked").length) {
          $("#trashBin").show();
        }

      }) //checkbox 
      $("#trashBin").click(function () {
        if (!$("#inbound .k-grid-content tbody input:checkbox:checked").length) {
          return false;
        }
        fw_confirmBox.show();
      }) //trashBin
    })

    function generateTemplate(ReportList, selected) {
      console.log(selected);
      if (selected) {
        $.each(ReportList, function (index, value) {
          if (selected == value.value) {
            result = value.text
          }
        })

        return result;
      } else {
        return ReportList[0].text;
      }
    }

  </script>
</head>

<body class="hold-transition skin-green-light sidebar-mini">
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box-body no-padding">
            <section class="content-header">
              <ol id="breadcrumb" class="breadcrumb">
                <li><a href="/"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"><a href="/page/shipment/facilityWarping/"></a></li>
              </ol>
            </section>
            <div id="facilityWarping">
            </div>

          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
    <div class="col-sm-4 col-xs-6 table_bar_box">
      <a href="javaScript:void(0)" class="btn" id="addbtn"><i class="fa fa-plus"></i></a>
      <button id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></button>
    </div>
  </div>
  </div>
  <!--toolbar-->
  <section id="confirmTemplate" style="display:none;">
    <section class="deleteIcon">
      <i class="fa fa-file-text-o">
        <i class="fa fa-times"></i>
      </i>
      <div>
        <i class="fa fa-trash"></i>
      </div>
    </section>
    <h2>確定刪除？</h2>
  </section>
  <div id="saveBtn" style="display:none;">
    <a role="button" class="table_btn table_btn_purple k-grid-update editing" href="#"><img
        src="/images/icon_workflow/save.svg" height="50%" width="50%"></a>
  </div>
  <div id="canBtn" style="display:none;">
    <a role="button" class="table_btn table_btn_purple k-grid-cancel editing" href="#"><img
        src="/images/icon_workflow/cancel.svg" height="50%" width="50%"></a>
  </div>
</body>

</html>
