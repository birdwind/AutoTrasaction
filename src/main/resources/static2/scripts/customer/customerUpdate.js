let inChargeTemplate = `
<a href="javascript:void(0)" id="modifyInCharge" class="btn_upload table_btn_status" style="margin-left:10px">修改名稱
</a>
<a href="javascript:void(0)" id="cancelModify" class="btn_upload table_btn_status" style="margin-left:10px; background-color:palevioletred; display: none">取消修改名稱
</a>

<a href="javascript:void(0)" id="changeInCharge" class="btn_upload table_btn_status" style="margin-left:10px">更換負責人
</a>
<a href="javascript:void(0)" id="cancelChange" class="btn_upload table_btn_status" style="margin-left:10px; background-color:palevioletred; display: none">取消更換負責人
</a>`

let oldInChargeName;

function customizeUpdateForm() {
  // //廠商分類
  initMultiSelect($("[name='customerSupplyChains']"), "/supply/chain/list", companyManagementCoreView.customerSupplyChains.value);

  //付款方式
  setDropDownListUI("[name='tradeMethod']", tradeMethodData, null, companyManagementCoreView.tradeMethod.value);

  //票期
  setDropDownListUI("[name='checkValid']", checkValidData, null, companyManagementCoreView.checkValid.value);

  $("[name='inCharge']").parent().find(".labelText").css("width","63%");
  $("[name='inCharge']").css("width","63%");
  $("[name='inCharge']").after(inChargeTemplate);

  //設置isMember是否勾選
  let isMemberCheckbox = $("#form").find("#isMember");
  if (companyManagementCoreView.isMember.value == "true") {
    isMemberCheckbox.prop("checked", true);
    let account = companyManagementCoreView.inChargeAccount.value;
    let password = companyManagementCoreView.inChargePassword.value;
    $("#account").append(account + "/" + password);
  }

  $("#modifyInCharge").click(function () {
    inChargeEdit(true);
    $("#cancelModify").css("display","");
  });

  $("#changeInCharge").click(function () {
    inChargeEdit(true);
    $("#cancelChange").css("display","");
    isChang = true;
  });

  $("#cancelModify").click(function () {
    inChargeEdit(false);
    $("#cancelModify").css("display","none");
  });

  $("#cancelChange").click(function () {
    inChargeEdit(false);
    $("#cancelChange").css("display","none");
    isChang = false;
  });
}

function inChargeEdit(isEdit){
  if(isEdit){
    $("[name='inCharge']").parent().find(".labelText").css("display","none");
    $("[name='inCharge']").parents("fieldset").prop("class","");
    $("[name='inCharge']").prop("type","text");
    $("[name='inCharge']").prop("class","form-control");
    $("#modifyInCharge").css("display","none");
    $("#changeInCharge").css("display","none");
    oldInChargeName = $("[name='inCharge']").val();
  }else{
    $("[name='inCharge']").parent().find(".labelText").css("display","");
    $("[name='inCharge']").parents("fieldset").prop("class","disabled");
    $("[name='inCharge']").prop("type","hidden");
    $("[name='inCharge']").prop("class","");
    $("#modifyInCharge").css("display","");
    $("#changeInCharge").css("display","");
    $("[name='inCharge']").val(oldInChargeName);
  }
}

async function customizeUpdateGrid() {
  if (companyManagementDetailGrid.contents.length > 0) {
    panelbar.expand($("#detailBar"));
    for (i in companyManagementDetailGrid.contents) {
      addDetailRow(i);
      $("#companyDetailUuid_" + i).val(companyManagementDetailGrid.contents[i].companyDetailUuid.value);
      $("#phone_" + i).val(companyManagementDetailGrid.contents[i].phone.value);
      $("#fax_" + i).val(companyManagementDetailGrid.contents[i].fax.value);
      $("#address_" + i).val(companyManagementDetailGrid.contents[i].address.value);
      $("#receiptAddress_" + i).val(companyManagementDetailGrid.contents[i].receiptAddress.value);
      $("#email_" + i).val(companyManagementDetailGrid.contents[i].email.value);
    }
  }

  if (companyManagementSalesGrid.contents.length > 0) {
    panelbar.expand($("#salesBar"));
    for (i in companyManagementSalesGrid.contents) {
      addSalelRow(i);
      // console.log(companyManagementSalesGrid.contents[i].name);
      $("#memberCoreUuid_" + i).val(companyManagementSalesGrid.contents[i].memberCoreUuid);
      $("#name_" + i).val(companyManagementSalesGrid.contents[i].name);
      await setDepartmentDropDownList(companyManagementSalesGrid.contents[i].department, $("#department_" + i));
      await setJobTitleDropDownList(companyManagementSalesGrid.contents[i].jobTitle, $("#jobTitle_" + i));
      $("#sale_phone_" + i).val(companyManagementSalesGrid.contents[i].phone);
      $("#extension_" + i).val(companyManagementSalesGrid.contents[i].extension);
      $("#sale_email_" + i).val(companyManagementSalesGrid.contents[i].email);
      $("#note_" + i).val(companyManagementSalesGrid.contents[i].note);
      if (companyManagementSalesGrid.contents[i].isMember == "true") {

        $("#isMember_" + i).prop("checked", true);
        let account = companyManagementSalesGrid.contents[i].inChargeAccount;
        let password = companyManagementSalesGrid.contents[i].inChargePassword;
        $("#account_" + i).append(account + "/" + password);
      } else {
        $("#isMember_" + i).prop("checked", false);
        $("#account_" + i).empty();
      }
    }
  }
}
