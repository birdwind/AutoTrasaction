$(function () {
  // 設定左方選單目前開啟的頁面
  $('#sidemenu-treeview > li').addClass('treeview menu-open');
  $('#sidemenu-treeview > li> .treeview-menu').css('display', 'block');
  $('#sidemenu-treeview > li > ul > li:eq(2)').addClass('active');

  let index;
  let grid = $('#module_data').kendoGrid({
    dataSource: {
      // kendoGrid的資料來源
      data: [
        {moduleId: 1, moduleNo: "mod-001", moduleName: "原料倉", status: "開啟"},
        {moduleId: 2, moduleNo: "mod-002", moduleName: "盤頭倉", status: "關閉"}
      ],
      schema: {
        model: {
          groupId: 'moduleId'
        }
      },
      sort: {field: 'moduleId', dir: 'desc'},
      pageSize: 10,
    },
    // kendoGrid上方新增和刪除按鈕以及搜尋輸入框
    toolbar: kendo.template(`
            <div><span id="add">+</span>
                <span id="delete">
                    <i class="fa fa-trash"></i>
                </span>
                <span class="search">
                    <input class="form-control" placeholder="Search" type="text"><nav>&times;</nav>
                </span>
            </div>
        `),
    sortable: true,
    persistSelection: true,
    pageable: {
      input: true,
      numeric: true
    },
    // 當選擇kendoGrid中的項目時，觸發change事件
    change: function () {
      // 判斷顯在是否有勾選項目，有的話顯示刪除按鈕，否則隱藏
      if ($('#module_data .k-grid-content .k-checkbox:checked').length) {
        $('#delete').css('display', 'inline');
      } else {
        $('#delete').css('display', 'none');
      }
    },
    columns: [
      {
        selectable: true,
        width: '5%'
      },
      {
        field: 'moduleNo',
        title: i18n.moduleNo,
        width: '20%'
      },
      {
        field: 'moduleName',
        title: i18n.moduleName,
        width: '25%'
      },
      {
        field: 'status',
        title: i18n.status,
        width: '25%'
      },
      {
        field: 'moduleModify',
        title: i18n.moduleModify,
        width: '25%',
        command: [{
          name: 'detailslink',
          template: `<button class="btn btn-success btn-outline btn-sm btn-edit" onclick="editCompany(event)"><i class="fa fa-gear"></i> ${i18n.edit}</button>`
        }],
      },
      {
        field: 'functionSelect',
        title: i18n.functionSelect,
        width: '25%',
        command: [{
          name: 'detailslink',
          template: `<button class="btn btn-success btn-outline btn-sm btn-edit" onclick="editCompany(event)"><i class="fa fa-gear"></i> ${i18n.edit}</button>`
        }],
      }
    ]
  });

  $('body').on('click', '#add', function () {
    location = 'moduleGroupDetail/';
  });

  // 刪除項目
  $('#delete').on('click', function () {
    if ($('#module_data .k-grid-content .k-checkbox:checked').length) {
      let comId = [];
      if (confirm(i18n.delCmpConfirm)) {
        let theGrid = $('#module_data').data('kendoGrid');
        let data = $('#module_data').data().kendoGrid.dataSource.data();
        $('#module_data .k-grid-content .k-checkbox:checked').each(function () {
          index = theGrid.dataSource.indexOf(theGrid.dataItem($(this).closest('tr')));
          comId.push(data[index]['companyId']);
        });

        let update = {
          'comId': comId,
          'status': 9
        };

        let token = $('meta[name="_csrf"]').attr('content');

        $.ajax({
          url: '/AI/modifyComStatus',
          data: JSON.stringify(update),
          method: 'POST',
          // csrf保護，jQuery版本不一樣，無法使用xhr.setRequestHeader函式
          // 改用headers設定
          headers: {header: token},
          contentType: 'application/json; charset=utf-8',
          success: function () {
            $('#module_data .k-grid-content .k-checkbox:checked').each(function (e) {
              theGrid.removeRow($(this).closest('tr'));
            });
          }
        });
      }
    } else {
      alert(i18n.PlzSelectDelCmp);
    }
  }); // end of $('#delete').on('click')

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
});

function editCompany(event) {
  let target = $(event.target);
  let theGrid = $('#module_data').data('kendoGrid');
  let data = $('#module_data').data().kendoGrid.dataSource.data();
  index = theGrid.dataSource.indexOf(theGrid.dataItem(target.closest('tr')));
  location = '/AI/companyAiDetailPage/' + data[index]['companyId'];
}

function search(key) {
  $('#module_data').data('kendoGrid').dataSource.filter({
    logic: 'or',
    filters: [{
      field: 'groupNo',
      operator: 'contains',
      value: key.trim()
    }, {
      field: 'groupName',
      operator: 'contains',
      value: key.trim()
    }, {
      field: 'status.value',
      operator: 'contains',
      value: key.trim()
    }]
  });
}
