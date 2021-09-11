//  等document ready 完再展開左方選單
window.onload = function () {
  functionTreeExpand()
};
let title = {};
let rows = [];
$(function () {
  //瀏覽足跡
  breadcrumbContent = getBreadcrumbHTML();
  $("#breadcrumb").html(breadcrumbContent);
  let dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          type: "GET",
          contentType: "application/json",
          url: "/api/member/grid",
          dataType: "json",
        }
      },
      schema: {
        data: function (data) {
          let response = data.response;

          title = response.i18n;
          $.each(data.rows, function (index, value) {
            rows.push(value);
          });

          return response.rows;
        },
        model: {
          memberNo: 'memberNo'
        },
      },
      sort: {field: 'memberNo', dir: 'desc'},
      pageSize: 10,
    }
  );
  dataSource.fetch(function () {
    let grid = $('#member_data').kendoGrid({
      dataSource: dataSource,
      // kendoGrid上方新增和刪除按鈕以及搜尋輸入框
      toolbar: kendo.template(getMemberToolBarHTML()),
      sortable: true,
      persistSelection: true,
      pageable: {
        input: true,
        numeric: true
      },
      // 當選擇kendoGrid中的項目時，觸發change事件
      change: function () {
        // 判斷顯在是否有勾選項目，有的話顯示刪除按鈕，否則隱藏
        if ($('#member_data .k-grid-content .k-checkbox:checked').length) {
          $('#delete').css('display', 'inline');
        } else {
          $('#delete').css('display', 'none');
        }
      },
      columns: [
        {selectable: true, width: '5%'},
        {
          field: 'memberNo',
          title: title.memberNo,
          width: '15%',
          template: `<a style="cursor: pointer" onclick="turnPage(event,'form')">#=memberNo#</a>`
        },
        {
          field: 'name',
          title: title.name,
          width: '15%'
        },
        // {
        //   field: 'isMember',
        //   title: title.isMember,
        //   width: '15%',
        //   template: '#=SetIsMemberColor(isMember)#'
        //
        // },
        {
          field: 'isPending',
          title: title.isPending,
          width: '15%',
          template: '#=SetPendingColor(isPending)#'
        },
        {
          field: 'status',
          title: title.status,
          width: '15%',
          template: '#=SetStatusColor(status)#'
        },
        {
          field: 'changePassword',
          title: i18n.memberAuth.member.changePassword,
          width: '12.5%',
          command: [{
            name: 'changePasswordButton',
            template: `<button class="btn btn-sm btn-key" onclick="turnPage(event,'changePassword')"><i class="fa fa-key"></i></button>`
          }],
        },
        {
          field: 'editGroup',
          title: i18n.memberAuth.member.editGroup,
          width: '12.5%',
          command: [{
            name: 'GroupManagerButton',
            template: `<button class="btn btn-sm btn-edit" onclick="turnPage(event,'editGroup')"><i class="fa fa-edit"></i></button>`
          }],
        },
      ]
    });
  });
  $("#member_data").css("font-style", "Arial,\"微軟正黑體\",sans-serif");

  $('body').on('click', '#add', function () {
    location = 'member/form/';
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
});

function search(key) {
  $('#member_data').data('kendoGrid').dataSource.filter({
    logic: 'or',
    filters: [{
      field: 'memberNo',
      operator: 'contains',
      value: key.trim()
    }, {
      field: 'name',
      operator: 'contains',
      value: key.trim()
    }, {
      field: 'isMember',
      operator: 'contains',
      value: key.trim()
    }, {
      field: 'isPending',
      operator: 'contains',
      value: key.trim()
    }, {
      field: 'status',
      operator: 'contains',
      value: key.trim()
    }]
  });
}

function SetIsMemberColor(isMember) {
  if (isMember === 1)
  // return `<span class=\"myBadge isMember1\">${i18n.memberAuth.member.isMember1}</span>`;
    return `<span class=\"isMember1 iconSize\"><i class="fa fa-user"></i></span>`;
  else
  // return `<span class=\"myBadge isMember0 \">${i18n.memberAuth.member.isMember0}</span>`;
    return `<span class=\"isMember0 iconSize \"><i class="fa fa-user-times"></i></span>`;
}

function SetPendingColor(isPending) {
  if (isPending === 1)
    return `<span>${i18n.memberAuth.member.isPending1}</span>`;
  else if (isPending === 0)
    return `<span>${i18n.memberAuth.member.isPending0}</span>`;
  else if (isPending === -1) {
    return `<span>${i18n.memberAuth.member.isPending_1}</span>`;
  }
}

function SetStatusColor(status) {
  if (status === 1)
    return `<span>${i18n.memberAuth.member.status1}</span>`;
  else if (status === 9)
    return `<span>${i18n.memberAuth.member.status9}</span>`;
  else if (status === 0) {
    return `<span>${i18n.memberAuth.member.status0}</span>`;
  }
}

function turnPage(event, destination) {
  let target = $(event.target);
  let theGrid = $('#member_data').data('kendoGrid');
  let data = $('#member_data').data().kendoGrid.dataSource.data();
  let index = theGrid.dataSource.indexOf(theGrid.dataItem(target.closest('tr')));
  location = '/page/member/' + destination + '/' + data[index]['memberNo'];
}

function deleteRow(e) {
  // 刪除項目
  if ($('#member_data .k-grid-content .k-checkbox:checked').length) {
    let memberNos = [];
    if (confirm(i18n.ui.message.delMemberConfirm)) {
      let theGrid = $('#member_data').data('kendoGrid');
      let data = $('#member_data').data().kendoGrid.dataSource.data();
      $('#member_data .k-grid-content .k-checkbox:checked').each(function () {
        let index = theGrid.dataSource.indexOf(theGrid.dataItem($(this).closest('tr')));
        memberNos.push(data[index]['memberNo']);
      });

      let update = {
        'memberNos': memberNos,
      };

      $.ajax({
        url: '/member/delete',
        data: JSON.stringify(update),
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function () {
          $('#member_data .k-grid-content .k-checkbox:checked').each(function (e) {
            theGrid.removeRow($(this).closest('tr'));
          });
        }
      });
    }
  } else {
    alert(i18n.ui.message.chooseItem);
  }
}
