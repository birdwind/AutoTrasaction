<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <link rel="stylesheet" href="/styles/windowUI.css" />
  <style>
    .form-label-group>input,
    .form-label-group>label {
      padding: 0.75rem;
    }

    input {
      text-indent: 20px;
    }

    .bg_loginid {
      background: no-repeat url(/images/round-account-button-with-user-inside.png);
      background-size: 27px;
    }

    .form-label-group>label {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      margin-bottom: 0;
      line-height: 1.8;
      color: #3399ff;
      pointer-events: none;
      cursor: text;
      border: 1px solid transparent;
      border-radius: .25rem;
      transition: all .1s ease-in-out;
    }

    .fa.fa-star,
    .fa-star-o {
      display: inline;
      cursor: default;
    }

    .fa-pencil,
    .number_a.editBtn,
    .number_a.addItemBtn,
    .number_a.saveBtn,
    .number_a.cancelBtn {
      font-size: 20px;
    }

    .number_a.addItemBtn,
    .number_a.saveBtn,
    .number_a.cancelBtn {
      display: none;
    }

    .cancelBtn,
    .cancelBtn:hover {
      color: #D75A4A;
    }

    #listbox {
      margin: 10px;
      padding-top: 30px;
    }

    #listbox .row>div {
      padding: 0px;
      text-align: center;
    }

    #listbox .row>.confirmBtn {
      text-align: right;
    }

    #listbox .k-listbox {
      width: 236px;
      height: 310px;
      margin-bottom: 30px;
    }

    #listbox .k-item {
      cursor: move;
    }

    #listbox .k-item:hover,
    #listbox .k-item.k-state-selected {
      color: white;
      background-color: #74b4f5;
    }

    #listbox .k-button {
      background-color: #3399ff;
      color: white;
    }

    #listbox .k-button.k-state-disabled {
      background-color: #74b0ec;
    }

  </style>
  <script>
    var titles = {},
      columnItem;
    var deletedItem = {};
    var originItem = [];
    var listbox, listBoxAPI, listBoxUuid;
    var currentList, availableList;
    var uuid = "grid";
    var modifiedNotification;
    var columnTemplate = {
      "edit": function (d) {
        var btns = "<a class='number_a editBtn' href='javascript:void(0)'><i class='fa fa-pencil'></i></a>"
        btns += "<a class='number_a addItemBtn' href='javascript:void(0)'><i class='fa fa-plus'></i></a>"
        btns += "<a class='number_a saveBtn' href='javascript:void(0)'><i class='fa fa-check'></i></a>&emsp;"
        btns += "<a class='number_a cancelBtn' href='javascript:void(0)'><i class='fa fa-times'></i></a>"
        return btns;
      },
      "member": function (d) {
        return "<a class='number_a' href='javascript:void(0)' onclick='openListBox(\"/api/role/member\",\"" + d
          .roleUuid + "\",\"" + d.roleValue + "\")'><i class='fa fa-pencil'></i></a>";
      },
      "module": function (d) {
        return "<a class='number_a' href='javascript:void(0)'' onclick='openListBox(\"/api/role/module\",\"" + d
          .roleUuid + "\",\"" + d.roleValue + "\")'><i class='fa fa-pencil'></i></a>";
      }
    }

    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "/api/role/grid",
          dataType: "json",
          type: "POST",
          processData: false,
          contentType: false
        },
        create: {
          url: "/api/role",
          dataType: "json",
          method: "PUT",
          contentType: false,
          processData: false
        },
        update: {
          url: "/api/role",
          dataType: "json",
          method: "POST",
          contentType: false,
          processData: false
        },
        parameterMap: function (data, operation) {
          var postData = new FormData();
          if ("update,create".search(operation) > -1) {
            postData.append("role", new Blob([JSON.stringify({
              roleUuid: (data.roleUuid) ? data.roleUuid : "0",
              roleKey: (data.roleKey) ? data.roleKey : null,
              roleValue: (data.roleValue) ? data.roleValue : null
            })], {
              type: "application/json"
            }));
            return postData;
          }
          postData.append("filter", new Blob([JSON.stringify({
            size: data.pageSize,
            page: data.page -= 1,
            filter: data.filter,
            sort: [{
              field: "createDate",
              dir: "desc"
            }]
          })], {
            type: "application/json"
          }));
          return postData;
        }
      },
      serverPaging: true,
      serverFiltering: true,
      schema: {
        model: {
          id: 'roleUuid',
          fields: {
            roleNo: {
              editable: false
            },
            admin: {
              editable: false
            },
            member: {
              editable: false
            },
            module: {
              editable: false
            },
            edit: {
              editable: false
            },
          }
        },
        total: function (data) {
          return data.response.totalElements
        },
        data: function (data) {
          titles = data.response.header;
          columnItem = [{
            selectable: true,
            width: "50px"
          }];
          for (i in titles) {
            if (titles[i].type.search(/(label|command|text)/) < 0) {
              continue;
            }
            var temp = {
              field: i,
              title: titles[i].title,
              filterable: false
            }
            if (titles[i].search) {
              temp.filterable = {
                cell: {
                  showOperators: false,
                  operator: "contains",
                  suggestionOperator: "contains"
                }
              }
            } //if
            if (columnTemplate[i]) {
              temp.template = columnTemplate[i];
            }
            columnItem.push(temp);
          } //loop
          return data.response.contents;
        }
      },
      pageSize: 10,
      page: (sessionStorage.getItem("salesPage") == null) ? 1 : sessionStorage.getItem("salesPage")
    });
    $(async function () {
      var modifiedNotification = $("#notification").kendoNotification({
        templates: [{
            type: "incerted",
            template: "<div class='saveOrInsert zoominTrans'>新增成功</span>" + fw_checkMrak + "</div>"
          },
          {
            type: "saved",
            template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
          }
        ],
        autoHideAfter: 1500
      }).data("kendoNotification");
      fw_confirmBox.init({
        content: $("#confirmTemplate").html(),
        confirmEvent: "confirmDel"
      });
      await dataSource.fetch();
      var grid = $("#role").kendoGrid({
        dataSource: dataSource,
        toolbar: kendo.template($("#toolbar").html()),
        sortable: true,
        persistSelection: true,
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
        filterable: {
          mode: "row"
        },
        dataBound: function (e) {
          $(window).scrollTop(0);
          sessionStorage.setItem("salesPage", $("#role").data("kendoGrid").dataSource.page());
          for (i in this.columns) {
            this.autoFitColumn(i);
          }
          $("#role .k-grid-header thead .k-checkbox").prop("checked", true).trigger("click");
        },
        columns: columnItem,
        editable: {
          mode: "inline",
          confirmation: false
        }
      });
      $("#role").on("click", ".editBtn", function () {
        var row = $(this).closest("tr");
        $(this).hide();
        $(this).nextAll(":not(.addItemBtn)").show();
        $("#role").data("kendoGrid").editRow(row);
      });
      $("#addItem").click(function () {
        $("#role").data("kendoGrid").addRow();
        $("#role tbody tr:eq(0) .editBtn").hide();
        $("#role tbody tr:eq(0)").find(".addItemBtn,.cancelBtn").show();
      })
      $("#role").on("click", ".addItemBtn", function () {
        var row = $(this).closest("tr");
        if (!row.find("[name='roleValue']").val()) {
          row.find("[name='roleValue']").addClass("invalidInput");
          row.find("[name='roleValue']").after("<span class='color_pink'>請輸入角色名稱</span>");
          return false;
        }
        $(this).hide();
        $(this).siblings().hide();
        $(this).siblings(".editBtn").show();
        $("#role").data("kendoGrid").saveRow();
        modifiedNotification.show({}, "incerted");
        setNoificationPosition();
        setTimeout(function () {
          $(".drawCheck").hide().delay(460).queue(function () {
            var theGrid = $('#role').data("kendoGrid");
            var page = theGrid.dataSource.page();
            theGrid.dataSource.page(-1);
            theGrid.dataSource.page(page);
            $(this).dequeue();
          });
        }, 1000);
      }); // addItemBtn

      $("#role").on("click", ".saveBtn,.cancelBtn", function () {
        var row = $(this).closest("tr");
        if ($(this).hasClass("saveBtn") && !row.find("[name='roleValue']").val()) {
          row.find("[name='roleValue']").addClass("invalidInput");
          row.find("[name='roleValue']").after("<span class='color_pink'>請輸入角色名稱</span>");
          return false;
        }
        $(this).hide();
        $(this).siblings().hide();
        $(this).siblings(".editBtn").show();
        if ($(this).hasClass("saveBtn")) {
          $("#role").data("kendoGrid").saveRow();
          modifiedNotification.show({}, "saved");
          setNoificationPosition();
          setTimeout(function () {
            $(".drawCheck").hide().delay(460).queue(function () {
              $(this).dequeue();
            });
          }, 1000);
        } else {
          $("#role").data("kendoGrid").cancelRow();
        }
      }); // saveBtn cancelBtn

      listbox = $("#listbox").kendoWindow({
        modal: true,
        width: "40%",
        height: '550px',
        resizable: false,
        visible: false,
        open: function () {
          $("body").addClass("overlay");
        },
        close: function () {
          $("body").removeClass("overlay");
        }
      }).data('kendoWindow');
      $("#listbox").before("<button class='close'><i class='fa fa-times'></i></button>");
      currentList = $("#current").kendoListBox({
        dataSource: [],
        dataTextField: "text",
        dataValueField: "value",
        connectWith: "available",
        draggable: true,
        dropSources: ["available"],
        toolbar: {
          tools: ["moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom"]
        },
        add: function (e) {
          for (item of e.dataItems) {
            delete deletedItem[item.value];
          }
        },
        remove: function (e) {
          for (item of e.dataItems) {
            if (originItem.find(kv => kv.value == item.value)) {
              deletedItem[item.value] = item.value;
            }
          }
        }
      }).data("kendoListBox");

      availableList = $("#available").kendoListBox({
        dataSource: [],
        dataTextField: "text",
        dataValueField: "value",
        draggable: true,
        dropSources: ["current"],
      }).data("kendoListBox");

      $("#listbox .confirmBtn button").click(function () {
        var type = (listBoxAPI.search("member") > -1) ? "Member" : "Modules";
        var data = {
          "roleUuid": listBoxUuid
        }
        data["current" + type] = currentList.dataItems().map(getValue);
        data["delete" + type] = Object.keys(deletedItem);
        var postData = new FormData();
        postData.append("role" + type, new Blob([JSON.stringify(data)], {
          type: "application/json"
        }));
        $.ajax({
          url: listBoxAPI,
          data: postData,
          method: "POST",
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (data) {
            modifiedNotification.show({}, "saved");
            setNoificationPosition();
            setTimeout(function () {
              $(".drawCheck").hide().delay(460).queue(function () {
                listbox.close();
                $(this).dequeue();
              });
            }, 1000);
          } // end of ajax success
        }); //end of ajax
      }) //List Saving Confirmed

      $(".close").click(function () {
        listbox.close();
      }) //List Saving Canceled

      $('body').on('click', '#role .k-checkbox', function () {
        $("#trashBin").hide();
        if ($("#role .k-grid-content tbody input:checkbox:checked").length) {
          $("#trashBin").show();
        }
      }) //checkbox
      $("#trashBin").click(function () {
        if (!$("#role .k-grid-content tbody input:checkbox:checked").length) {
          return false;
        }
        fw_confirmBox.show();
      }) //trashBin
    }) //$(function ()
    function confirmDel() {
      var uuidSet = [];
      var theGrid = $('#role').data("kendoGrid");
      theGrid.select().each(function () {
        uuidSet.push(theGrid.dataItem(this).roleUuid);
      });
      var page = theGrid.dataSource.page();
      theGrid.dataSource.page(-1);
      theGrid.dataSource.page(page);
      var postData = new FormData();
      postData.append("role", new Blob([JSON.stringify({
        "roleUuids": uuidSet
      })], {
        type: "application/json"
      }));

      $.ajax({
        url: "/api/role",
        data: postData,
        method: "DELETE",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          fw_confirmBox.box.find("button, h2, .fa-times").addClass("invisible");
          fw_confirmBox.box.find(".fa-trash").show();
          fw_confirmBox.box.find(".fa-file-text-o").addClass("throwIn").delay(2000).queue(function () {
            fw_confirmBox.box.find(".fa-trash").hide();
            fw_confirmBox.box.find(".fa-file-text-o").removeClass("throwIn");
            fw_confirmBox.box.find(".invisible").removeClass("invisible");
            $(this).dequeue();
          });
        } // end of ajax success
      }); //end of ajax
    } //confirmDel

    function openListBox(api, uuid, username) {
      let listUsername = username;
      listBoxAPI = api;
      listBoxUuid = uuid;
      deletedItem = {};
      var type = (listBoxAPI.search("member") > -1) ? "帳號" : "模組";
      $("#listbox .row.title > div:eq(0) > b").text("所屬" + type);
      $("#listbox .userName > b").text("編輯角色: " + listUsername);
      if ($("#currentSearch").length == 0) {
        $("#current").siblings(".k-list-scroller").before(
          '<div class="form-label-group"><input id="currentSearch" class="form-control" autocomplete="off" placeholder="尋找.." style="width:70%;height:5%" class="k-textbox" /> <label class="k-icon k-i-search"></label> </div>'
        );
        $("#available").siblings(".k-list-scroller").before(
          ' <div class="form-label-group"><input id="availableSearch" class="form-control" autocomplete="off" placeholder="尋找.."  style="width:85%;height:5%" class="k-textbox" /> <label class="k-icon k-i-search"></label> </div>'
        );
      }
      $("#currentSearch").on("input", function (e) {
        currentList.dataSource.filter({
          field: "text",
          value: $(e.target).val(),
          operator: "contains"
        });

      })
      $("#availableSearch").on("input", function (e) {
        availableList.dataSource.filter({
          field: "text",
          value: $(e.target).val(),
          operator: "contains"
        });

      })
      $("#listbox .row.title > div:eq(1) > b").text("非所屬" + type);
      $.ajax({
        url: api + "/template/" + uuid,
        method: 'GET',
        success: function (data) {
          if (data.status) {
            originItem = data.response.current
            var dataSource = new kendo.data.DataSource({
              data: data.response.current
            });
            currentList.setDataSource(dataSource);
            dataSource = new kendo.data.DataSource({
              data: data.response.available
            });
            availableList.setDataSource(dataSource);
            listbox.open();
            listbox.center();
          }
        } //end of success
      }); //end of ajax
    }

    function getValue(obj) {
      return obj.value
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
                <li class="active"></li>
              </ol>
            </section>
            <div id="role">
            </div>

          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
    <div class="col-sm-4 col-xs-6 table_bar_box">
      <a id="addItem" href="javascript:void(0)" class="btn"><i class="fa fa-plus"></i></a>
      <button id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></button>
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
  <div id="listbox">
    <div class="container" style="width:auto">
      <div class="userName col-sm-12">
        <b>當前帳號: SNBDC_ADMIN</b>
      </div>
      <div class="row title">
        <div class="col-sm-7">
          <br>
          <b></b>
        </div>
        <!--col-->
        <div class="col-sm-2">
          <br>
          <b></b>
        </div>
        <!--col-->
      </div>
      <!--row-->
      <div class="row">
        <div class="col-sm-12 list">
          <select id="current">
          </select>
          <select id="available"></select>
        </div>
        <!--col-->
      </div>
      <!--row-->
      <div class="row">
        <div class="col-sm-12 confirmBtn">
          <button type="button" class="btn btn-success circleBtn white">
            <i class="fa fa-floppy-o"></i>
          </button>
        </div>
        <!--col-->
      </div>
      <!--row-->
    </div>
    <!--container-->
  </div>
  <!--#listbox-->
  <span id="notification"></span>
</body>

</html>
