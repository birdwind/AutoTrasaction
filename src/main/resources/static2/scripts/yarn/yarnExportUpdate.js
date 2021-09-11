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
    id: "yarnExportCoreUuid",
    url: "/api/yarn/export/template/" + uuid,
    mainData: "response.yarnExportCore",
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
    var postData = new FormData();
    var yarnExportCore = new Object();
    var attachment = new Object();
    yarnExportCore.yarnExportCoreUuid = uuid;
    attachment.relateUuid = uuid;
    attachment.attachmentCoreUuid = fw_formData.response.attachment.attachmentCoreUuid;
    attachment.verifyToken = fw_formData.response.attachment.verifyToken;
    $("#form").find("input,select,textarea").each(function () {
      switch ($(this).attr("name")) {
        case "note":
          if ($(this).val() != "") {
            yarnExportCore.note = $(this).val();
          }
          break;
        default:
          break;
      }
    });
    postData.append("yarnExportCore", new Blob([JSON.stringify(yarnExportCore)], {
      type: "application/json"
    }));
    postData.append("attachment", new Blob([JSON.stringify(attachment)], {
      type: "application/json"
    }));
    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    $.ajax({
      url: "/api/yarn/export",
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
  location.replace("/page/yarn/export");
}//findnodata

function customizeForm() {
  var outboundDetails = fw_formData.response.yarnExportDetails;
  var warpWeftKV = outboundDetails.header.warpWeft.keyValue;
  var unitKV = outboundDetails.header.exportUnit.keyValue;
  for (i in outboundDetails.header) {
    $("#outbound thead tr th ." + i + "Title").text(outboundDetails.header[i].title);
  }
  for (item of outboundDetails.contents) {
    $("#outbound tbody").append($("#outboundTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    for (i in item) {
      $(`#outbound tbody tr:last [name='${i}']`).text(item[i]);
    }
    //$("#outbound tbody tr:last [name='yarnImportDetail']").text(yarnCellData.find(kv => kv.value == item.yarnImportDetail).text);
    $("#outbound tbody tr:last [name='warpWeft']").text(warpWeftKV.find(kv => kv.value == item.warpWeft).text);
    $("#outbound tbody tr:last [name='exportUnit']").text(unitKV.find(kv => kv.value == item.exportUnit).text);
  }//end of loop

}//customizeForm
function afterUpload(){
  fw_notification.show({}, "saveOrInsert");
  setNoificationPosition();
  setTimeout(function () {
    $(".drawCheck").hide().delay(460).queue(function () {
      location = "/page/yarn/export";
      $(this).dequeue();
    });
  }, 1000);
}
