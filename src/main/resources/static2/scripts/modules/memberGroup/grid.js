//  等document ready 完再展開左方選單
window.onload = function () {
  functionTreeExpand()
};
var title = {};
var rows = [];
var dataSource = "";
$(async function () {
  //  獲取欄位標題
  let response = await fetch("memberGroup/grid");
  let dataText = await response.text();
  title = JSON.parse(dataText).i18n;
  //  瀏覽足跡
  breadcrumbContent = getBreadcrumbHTML();
  $("#breadcrumb").html(breadcrumbContent);
  dataSource = new kendo.data.DataSource({
      transport: {
        read: function (e) {
          $.ajax({
            url: "memberGroup/grid",
            method: 'GET',
            dataType: "json",
            success: function (data) {
              rows = data.rows;
              e.success(rows);
            },
            error: function (result) {
              e.error("XHR response", "status code", "error message");
            }
          });
        },
        create: function (e) {
          $.ajax({
            url: "/memberGroup/create",
            data: JSON.stringify(e.data),
            method: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
              e.success(e.data);
              dataSource.read();
            },
            error: function (error) {
              e.error("XHR response", "status code", "error message");
            }
          });
        },
        update: function (e) {
          // 更新資料
          $.ajax({
            url: "/memberGroup/update",
            data: JSON.stringify(e.data),
            method: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
              e.success(e.data);
              dataSource.read();
            },
            error: function (error) {
              e.error("XHR response", "status code", "error message");
            }
          });
        },
      },
      schema: {
        model: {
          id: 'groupNo',
          fields: {
            groupNo: {editable: false},
            name: {validation: {required: true}},
            status: {defaultValue: 1, validation: {required: true}},
          }
        },
      },
      sort: {field: 'groupNo', dir: 'asc'},
      pageSize: 10,
    }
  );
  $('#memberGroup_data').kendoGrid({
    dataSource: dataSource,
    // kendoGrid上方新增和刪除按鈕以及搜尋輸入框
    toolbar: kendo.template(getMemberGroupToolBarHTML()),
    sortable: true,
    persistSelection: true,
    pageable: {
      input: true,
      numeric: true
    },
    // 當選擇kendoGrid中的項目時，觸發change事件
    change: function () {
      // 判斷顯在是否有勾選項目，有的話顯示刪除按鈕，否則隱藏
      if ($('#memberGroup_data .k-grid-content .k-checkbox:checked').length) {
        $('#delete').css('display', 'inline');
      } else {
        $('#delete').css('display', 'none');
      }
    },
    columns: [
      {selectable: true, width: '5%'},
      {
        field: 'groupNo',
        title: title.groupNo,
        width: '15%',
      },
      {
        field: 'name',
        title: title.name,
        width: '15%'
      },
      {
        field: 'status',
        title: title.status,
        width: '15%',
        editor: statusDropDownEditor,
        template: '#=SetStatusColor(status)#'
      },
      {
        field: 'editGroup',
        title: `${i18n.memberAuth.memberGroup.editGroup}`,
        width: '12.5%',
        command: [{
          name: 'edit',
          iconClass: "fa fa-pencil ",
          text: {edit: ``, update: `${i18n.ui.btn.update}`, cancel: `${i18n.ui.btn.cancel}`}
        }]
      },
      {
        field: 'selectMember',
        title: `${i18n.memberAuth.memberGroup.selectMember}`,
        width: '12.5%',
        command: [{
          name: 'selectMember',
          template: `<button class="btn btn-sm btn-select" onclick="replaceInputColumn(event)"><i class="fa fa-hand-pointer-o"></i></button>`
        }]
      }],
    editable: "inline"
  });

  // 搜尋功能
  $('body').on('input keyup', '.search input', function () {
    if ($(this).val().length) {
      $(this).next().show();
    } else {
      $(this).next().hide();
    }
    search($(this).val());
  });
  $('body').on('click', '.search nav', function () {
    $(this).prev().val('');
    $(this).hide();
    search('');
  }); // end of $('body').on('input keyup', '.search input')

  $("#memberGroup_data").on('click', ".k-grid-add,.k-grid-edit", function () {
    $(".k-grid-add").css("visibility", "hidden");
    $(".k-checkbox").parent().css("visibility", "hidden");
    // 因為kendogrid 每座動作會重新refresh 因此要重新bind element
    $(".k-grid-update").on('click', function () {
      $(".k-invalid-msg").remove();
      let validator = $("#memberGroup_data").kendoValidator({
        errorTemplate: getErrorTemplate()
      }).data("kendoValidator");
      if (!validator.validate()) {
        $(".k-invalid").effect("shake");
        return;
      }
      $(".k-grid-add").css("visibility", "visible");
      $(".k-checkbox").parent().css("visibility", "visible");
    });
    $(".k-grid-cancel").on('click', function () {
      $(".k-grid-add").css("visibility", "visible");
      $(".k-checkbox").parent().css("visibility", "visible");
    });
  });

  // 防止在編輯時，進行搜尋
  $(".k-grid").on("mousedown", ".k-grid-header th", function (e) {
    // prevent sorting/filtering for the current Grid only
    var grid = $(this).closest(".k-grid");
    var editRow = grid.find(".k-grid-edit-row");

    // prevent sorting/filtering while any Grid is being edited
    if (editRow.length > 0) {
      alert("Please complete the editing operation before sorting or filtering");
      e.preventDefault();
    }
  });
});

function search(key) {
  $('#memberGroup_data').data('kendoGrid').dataSource.filter({
    logic: 'or',
    filters: [{
      field: 'groupNo',
      operator: 'contains',
      value: key.trim()
    }, {
      field: 'name',
      operator: 'contains',
      value: key.trim()
    }, {
      field: 'status',
      operator: 'contains',
      value: key.trim()
    }]
  });
}

function SetStatusColor(status) {
  if (status === 1)
    return `<span>${i18n.memberAuth.memberGroup.status1}</span>`;
  else if (status === 0)
    return `<span>${i18n.memberAuth.memberGroup.status0}</span>`;
  else if (status === 9)
    return `<span>${i18n.memberAuth.member.status9}</span>`;
}

function turnPage(event, destination) {
  let target = $(event.target);
  let theGrid = $('#memberGroup_data').data('kendoGrid');
  let data = $('#memberGroup_data').data().kendoGrid.dataSource.data();
  let index = theGrid.dataSource.indexOf(theGrid.dataItem(target.closest('tr')));
  location = '/memberGroup/' + destination + '/' + data[index]['groupNo'];
}

function deleteRow() {
  // 刪除項目
  if ($('#memberGroup_data .k-grid-content .k-checkbox:checked').length) {
    let groupNos = [];
    if (confirm(i18n.ui.message.delConfirm)) {
      let theGrid = $('#memberGroup_data').data('kendoGrid');
      let data = $('#memberGroup_data').data().kendoGrid.dataSource.data();
      $('#memberGroup_data .k-grid-content .k-checkbox:checked').each(function () {
        let index = theGrid.dataSource.indexOf(theGrid.dataItem($(this).closest('tr')));
        groupNos.push(data[index]['groupNo']);
      });

      let update = {
        'groupNos': groupNos,
      };

      $.ajax({
        url: '/memberGroup/delete',
        data: JSON.stringify(update),
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function () {
          dataSource.read();
        }
      });
    }
  } else {
    alert(i18n.ui.message.chooseItem);
  }
}

function statusDropDownEditor(container, options) {
  $('<input required name="' + options.field + '"/>')
    .appendTo(container)
    .kendoDropDownList({
      autoBind: true,
      value: 1,
      dataTextField: "text",
      dataValueField: "value",
      dataSource: [
        {value: 1, text: "開啟"},
        {value: 0, text: "關閉"}
      ],
    });
}
