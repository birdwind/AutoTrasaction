var filter;
var yarnCellData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/ingredient/yarnCell/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
$(function () {
  $("#form").formWizard({
    id: "yarnImportCoreUuid",
    url: "/api/yarn/import/template/" + uuid,
    mainData: "response.yarnImportCore",
    noData: "findnodata",
    customizeForm: "customizeForm",
    fileUpload:{
      afterUpload:"afterUpload"
    },
  });//formWizard

  $(".box_features").draggable({
    axis: "y"
  });
  $("#save").click(function () {
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var ingredient = new Object();
    var postData = $("#form").formCheck({
      name: "yarnImportCore"
    });
    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    $.ajax({
      url: "/api/yarn/import",
      data: postData,
      method: "POST",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (!data.status) {
          $("#save").removeClass("waitaSec");
          for (i of data.response) {
            $("#form [name='" + i.field + "']").errorMsg({
              message: i.defaultMessage
            });
          }
        }
      } // end of ajax success
    }); //end of ajax
  })//end of save
})//$(function ()

function findnodata() {
  $("html").remove();
  location.replace("/page/yarn/import");
}//findnodata

function customizeForm() {
  var inboundDetails = fw_formData.response.yarnImportDetails;
  var warpWeftKV = inboundDetails.header.warpWeft.keyValue;
  var unitKV = inboundDetails.header.importUnit.keyValue;
  for (i in inboundDetails.header) {
    $("#inbound thead tr th ." + i + "Title").text(inboundDetails.header[i].title);
  }
  for (item of inboundDetails.contents) {
    $("#inbound tbody").append($("#inboundTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    for(i in item){
      $(`#inbound tbody tr:last [name='${i}']`).text(item[i]);
    }
    $("#inbound tbody tr:last [name='warpWeft']").text(warpWeftKV.find(kv => kv.value == item.warpWeft).text);
    $("#inbound tbody tr:last [name='importUnit']").text(unitKV.find(kv => kv.value == item.importUnit).text);
  }//end of loop

}//customizeForm

function afterUpload(){
  fw_notification.show({}, "saveOrInsert");
  setNoificationPosition();
  setTimeout(function () {
    $(".drawCheck").hide().delay(460).queue(function () {
      location = "/page/yarn/import";
      $(this).dequeue();
    });
  }, 1000);
}
