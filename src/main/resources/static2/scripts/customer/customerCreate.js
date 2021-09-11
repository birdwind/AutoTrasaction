function customizeCreateForm() {

  //廠商分類
  initMultiSelect($("[name='customerSupplyChains']"), "/supply/chain/list");

  //付款方式
  setDropDownListUI("[name='tradeMethod']", tradeMethodData, null, null);

  //票期
  setDropDownListUI("[name='checkValid']", checkValidData, null, null);

  $("input[name='companyValue']").val(0);
  $("input[name='credit']").val(0);
  $("input[name='payRequest']").val(0);


  //添加聯絡資料空白列
  addDetailRow(0);
  //添加業務資料空白列
  addSalelRow();
}

function customizeCreateGrid() {

}



