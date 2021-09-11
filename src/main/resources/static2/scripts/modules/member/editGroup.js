var undoHTML = `
                 <li id='reset' class='k-button k-button-icon' onclick="resetListbox()">
                    <i class='fa fa-undo'></i>
                 </li>
                 `;

//  等document ready 完再做的事
window.onload = function () {
  // 設定左方選單目前開啟的頁面
  functionTreeExpand();
};
$(function () {
  console.log(editGroupView)
  //倒數三秒跳回前一頁秒數
  let countDown = 3;
  let backURL = '/member';
  $('#formTitle').text(i18n.memberAuth.member.editGroup);

  //設定modal 倒數秒數回前頁方塊
  $('.modal-body').html(getModalHTML(countDown));
  $('.modal-title').text(i18n.memberAuth.member.editGroup);
  $('#modal').on('hidden.bs.modal', function () {
    location.replace(backURL);
  });
  //  產生表格欄位
  let textFieldsHTML = '';
  let cannotModifiedFields = ['memberNo'];
  $.each(editGroupView, function (index, value) {
    if (value === null)
      return;
    // 判斷是否為必填欄位
    let required = (value.required) ? 'required' : '';
    value.value = undefined2null(value.value);
    if (cannotModifiedFields.includes(index)) {
      textFieldsHTML += getCannotModifiedHTML(required, index, value);
    }
  }); // end of $.each(memberCreateView)

  textFieldsHTML += getEditGroupTemp();
  // 返回列表與儲存送出按鈕
  textFieldsHTML += getButtonTemp();

  // 將彙整好的HTML寫入表單
  $('#editGroupForm').html(textFieldsHTML);

  $("#optionalSearchBox").on("input", function (e) {
    let optionalListBox = $("#optional").getKendoListBox();
    let optionalSarchString = $(this).val();
    optionalListBox.dataSource.filter({
      field: "groupName",
      operator: "contains",
      value: optionalSarchString
    });
  });

  $("#selectedSearchBox").on("input", function (e) {
    let selectedListBox = $("#selected").getKendoListBox();
    let selectedSearchString = $(this).val();
    selectedListBox.dataSource.filter({
      field: "groupName",
      operator: "contains",
      value: selectedSearchString
    });
  });

  $("#optional").kendoListBox({
    connectWith: "selected",
    draggable: true,
    dropSources: ["selected"],
    toolbar: {
      position: "right",
      tools: ["transferTo", "transferFrom", "transferAllTo", "transferAllFrom"]
    },
    selectable: "multiple",
    dataSource: editGroupView.notGroup,
    dataTextField: "name",
    dataValueField: "groupNo"
  });

  $("#selected").kendoListBox({
    connectWith: "optional",
    draggable: {
      placeholder: function (element) {
        return element.clone().css({
          "opacity": 0.3,
          "border": "1px dashed #000000"
        });
      }
    },
    dropSources: ["optional"],
    selectable: "multiple",
    dataSource: editGroupView.isGroup,
    dataTextField: "name",
    dataValueField: "groupNo"
  });

  $(".k-listbox-toolbar>.k-reset").append(undoHTML);


  $("#save").on("click", function () {
    let data = {
      memberNo: editGroupView.memberNos.value,
      notGroup: $("#optional").val(),
      isGroup: $("#selected").val()
    };
    // 送出表單至server
    $.ajax({
      url: '/member/editGroup/',
      data: JSON.stringify(data),
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      success: function (response) {
        console.log("success", response);
        if (!response) {
          //  新增成功跳出提示框，倒數3秒後跳轉回列表
          let i = countDown;
          setInterval(function () {
            (!i) ? (location.replace(backURL)) : ($('#countDown').text(--i));
          }, 975);
          $('#modal').modal('show');
        }
      }, // end of ajax success
      error: function (error) {
        console.log("error", error)
      }
    }); // end of ajax
  })
});

function resetListbox() {
  let iniOptional = new kendo.data.DataSource({
    data: editGroupView.notGroup
  });
  let iniSelected = new kendo.data.DataSource({
    data: editGroupView.isGroup
  });
  $("#optional").data("kendoListBox").setDataSource(iniOptional);
  $("#selected").data("kendoListBox").setDataSource(iniSelected);

  // 因為每次重新給予dataSource kendo 會重整，所以要重新appendHTML
  $(".k-listbox-toolbar>.k-reset").append(undoHTML);
}
