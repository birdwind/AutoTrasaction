var filter, mainCore = {}, detailRequired = [], saveBtn;
var mafrOrderUuid, weavingsop,weavingStatus;
$(function () {
  $("#form").formWizard({
    id: "clothOrderDetailUuid",
    url: "/api/manufacture/order/template/" + uuid,
    mainData: "response.manufactureOrderCore",
    noData: "findnodata",
    customizeForm: "customizeForm",
    fileUpload: {
      afterUpload: "afterUpload"
    },
  });//formWizard

  $(".box_features").draggable({
    axis: "y"
  });

  $(".box_features > .right").click(function () {
    $(this).parent().css("left", "auto").animate({ right: "-210px" }).delay(100).queue(function () {
      $(this).find(".left").fadeIn(100);
      $(this).dequeue();
    });
  })//right
  $(".box_features > .left").click(function () {
    $(this).hide().parent().css("left", "auto").animate({ right: "-10px" }).delay(100).queue(function () {
      $(this).find(".left").hide();
      $(this).dequeue();
    });
  })//left
  $("body").on("click", ".addItemBtn", function () {
    $(this).closest("tr").after($(this).closest("tr").clone());
    $(this).closest("tr").next().find("input").val("");
    $(this).closest("tr").next().find("p > span").html(` <a href="javascript:void(0)" class="delItemBtn color_pink"><i class="fa fa-close"></i></a></span>`);
  })

  $("body").on("click", ".delItemBtn", function () {
    $(this).closest("tr").remove();
  })
  $("#temp, #finish").click(function () {
      if ($(this).hasClass("waitaSec")) {
        return;
      }
      $(this).addClass("waitaSec");
      saveBtn = $(this).attr("id");
      var postData = $("#form").formCheck({
        name: "manufactureOrderCore",
        dataProccessing: "manufactureData",
        otherCheck: [
          "manufactureOrderDetails",
          "attachment"
        ]
      });
      if (!postData) {
        $(this).removeClass("waitaSec");
        return;
      }
      $.ajax({
        url: "/api/manufacture/order",
        data: postData,
        method: (mafrOrderUuid) ? "POST" : "PUT",
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          if (!data.status) {
            if(weavingStatus){
              updateWeaving()
            }
          } else {
            $("#save").removeClass("waitaSec");
            for (i of data.response) {
              $("#form [name='" + i.field + "']").errorMsg({
                message: i.defaultMessage
              });
            }
          }//if/else
        } // end of ajax success
      }); //end of ajax
  })//end of save
})//$(function ()

function findnodata() {
  $("html").remove();
  location.replace("/page/manufacture/order");
}//findnodata

function customizeForm() {
  var order = fw_formData.response.manufactureOrderDetail
  mafrOrderUuid = fw_formData.response.manufactureOrderCore.manufactureOrderCoreUuid;
  for (i in order.header) {
    $(`#ordertable thead .${i}Title`).text(order.header[i].title)
  }
  for (row of order.contents) {
    $("#ordertable tbody").append($("#orderTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    for (i in row) {
      $(`#ordertable tbody [name="${i}"]:last`).val(row[i]);
      $(`#ordertable tbody [name="${i}"]:last`).text(row[i]);
    }
  }
  if (!order.contents.length) {
    $("#ordertable tbody").append($("#orderTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
  }
  $("#ordertable [name='clothYarnUnit']").kendoDropDownList({
    dataSource: fw_formData.response.manufactureOrderDetail.header.clothYarnUnit.keyValue,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//spunFilamentDropDownList
  $.ajax({
    url: "/api/manufacture/order/weaving/sop/template/" + fw_formData.response.manufactureOrderCore.manufactureOrderCoreUuid,
    method: "GET",
    dataType: "json",
    success: function (data) {
      weavingStatus = data.status
      if (data.status) {
        weavingsop = data;
        var content = "";
        var cloth = data.response.clothCoreWeavingSopCore;
        for (i in cloth) {
          if (!cloth[i].title) {
            continue;
          }
          var clothValue = (cloth[i].value) ? cloth[i].value : "";
          var field = "";
          switch (cloth[i].type) {
            case "float":
              field = `<input type="text" class="form-control number" name="${i}" value="${clothValue}">`;
              break;
            case "textarea":
              field = `<textarea class="form-control" rows="5" name="${i}">${clothValue}</textarea>`;
              break;
            default:
              field = `<input type="text" class="form-control" name="${i}" value="${clothValue}">`;
          }
          content += `<div class="col-md-12">
            <div class="box_inputdata">
              <div class="form-group">
                <label class="col-xs-12 col-md-4 col-form-label">
                ${cloth[i].title}
                </label>
                <div class="col-xs-12 col-sm-8 ">
                  ${field}
                </div>

              </div>
            </div>
          </div>`;
        }
        $("#weavingForm").html(content);
        weavingFormAdjustment();
        var detail = data.response.clothCoreWeavingSopDetails[0];
        content = `<tbody>
        <input type="hidden" name="clothCoreWeavingSopDetailUuid" value="${detail["clothCoreWeavingSopDetailUuid"]}">
        <input type="hidden" name="clothYarnUuid" value="${detail["clothYarnUuid"]}">
        `;
        for (i in detail) {
          if (!detail[i].title) {
            continue;
          }
          var detailValue = (detail[i].value) ? detail[i].value : "";
          var field = "";
          switch (detail[i].type) {
            case "float":
              field = `<input type="text" class="form-control number" name="${i}" value="${detailValue}">`;
              break;
          case "textarea":
                field = `<textarea class="form-control" rows="5" name="${i}">${detailValue}</textarea>`;
                break;
            case "label":
              field = detailValue;
              break;
            default:
              field = `<input type="text" class="form-control" name="${i}" value="${detailValue}">`;
          }
          content += `
          <tr>
            <td><p>${detail[i].title}</p></td>
            <td>`
          content += field;
          content += `
            </td>
          </tr>`;
        }// loop
        content += `</tbody>`
        $("#weavingTable").html(content);
        $("[name='suckYarnAngle']").closest("tr").after($("[name='suckYarnAngle']").closest("tr").clone());
        $("[name='suckYarnAngle']:last").attr("name", "spray");
        $("[name='spray']").closest("tr").find("p").html(`副噴<span> <a href="javascript:void(0)" class="addItemBtn"><i class="fa fa-plus"></i></a></span>`);
        $("[name='putWeftStartAngle']").closest("tr").after($("[name='putWeftStartAngle']").closest("tr").clone());
        $("[name='putWeftStartAngle']:last").attr("name", "weftRing");
        $("[name='weftRing']").closest("tr").find("p").html(`投緯<span> <a href="javascript:void(0)" class="addItemBtn"><i class="fa fa-plus"></i></a></span>`);
        $("[name='clothCoreWeavingSopWeftSwitchControlMethodUuid']").kendoDropDownList({
          dataSource: {
            transport: {
              read: {
                type: "GET",
                url: "/api/cloth/weaving/sop/weftSwitchControlMethods/list",
                dataType: "json"
              }
            },
            schema: {
              data: function (data) {
                return data.response
              }
            }
          },
          dataTextField: "text",
          dataValueField: "value",
          optionLabel: " "
        });//dsUnitDropDownList
      }else{
        $("#weaving").remove();
      }//if-else
    } // end of ajax success
  }); //end of ajax

}//customizeForm

function manufactureData(obj, form) {
  form["manufactureOrderCoreStatus"] = (saveBtn == "temp") ? 0 : 1;
  form["manufactureOrderCoreUuid"] = (mafrOrderUuid) ? mafrOrderUuid : "0";
  return form;
}//mfrStatus

function manufactureOrderDetails() {
  var manufacture = new Object();
  manufacture["clothOrderDetailUuid"] = (uuid.length) ? uuid : 0;
  manufacture["manufactureOrderCoreUuid"] = (mafrOrderUuid) ? mafrOrderUuid : "0"
  manufacture["manufactureOrderDetails"] = [];
  $("#ordertable tbody tr").each(function () {
    var temp = {};
    $(this).find("input").each(function () {
      temp[$(this).attr("name")] = ($(this).val().trim()) ? $(this).val().trim() : null;
    })
    manufacture["manufactureOrderDetails"].push(temp);
  })
  return manufacture;
}//manufactureOrderDetails
function attachment() {
  var attachDetail = fw_formData.response.attachment;
  var attachments = {
    "relateUuid": (mafrOrderUuid) ? mafrOrderUuid : "0",
    "attachmentCoreUuid": attachDetail.attachmentCoreUuid,
    "verifyToken": (attachDetail.verifyToken) ? attachDetail.verifyToken : "0",
    "deleteFiles": fw_deletedFiles
  }
  return attachments
}
function afterUpload() {
  fw_notification.show({}, "saveOrInsert");
  setNoificationPosition();
  setTimeout(function () {
    $(".drawCheck").hide().delay(460).queue(function () {
      // location = "/page/manufacture/order";
      $(this).dequeue();
    });
  }, 1000);
}
function updateWeaving() {
  var weavingForm = {};
  var weavingDetails = {};
  var postData = new FormData();
  weavingForm["clothCoreUuid"] = fw_formData.response.manufactureOrderCore.clothCoreUuid;
  $("#weavingForm input,#weavingForm textarea,#weaving table:eq(0) tbody input").each(function () {
    var value = ($(this).val().trim()) ? $(this).val().trim() : null;
    if ($(this).hasClass("number") && $(this).val().trim()) {
      value = Number(value);
    }
    weavingForm[$(this).attr("name")] = value;
  })
  var details = {};
  $("#weavingTable").find("input:not([name='spray'],[name='weftRing']),textarea").each(function () {
    var value = ($(this).val().trim()) ? $(this).val().trim() : null;
    if ($(this).hasClass("number") && $(this).val().trim()) {
      value = Number(value);
    }
    details[$(this).attr("name")] = value;
  })
  details["clothCoreWeavingSopPutWeftRoundAngleRelateForms"] = [];
  var i = 1;
  $("#weavingTable [name='spray']").each(function () {
    details["clothCoreWeavingSopPutWeftRoundAngleRelateForms"].push({
      "roundOrder": i,
      "angle": Number($(this).val().trim()),
    })
    i++;
  })

  i = 1;
  details["clothCoreWeavingSopSubSprayAngleForms"] = [];
  $("#weavingTable [name='weftRing']").each(function () {
    details["clothCoreWeavingSopSubSprayAngleForms"].push({
      "subSprayOrder": i,
      "subSprayAngle": Number($(this).val().trim()),
    })
    i++;
  })
  weavingDetails["clothCoreUuid"] = fw_formData.response.manufactureOrderCore.clothCoreUuid;
  weavingDetails["clothCoreWeavingSopDetailForms"] = [];
  weavingDetails["clothCoreWeavingSopDetailForms"].push(details);
  postData.append("clothCoreWeavingSopCore", new Blob([JSON.stringify(weavingForm)], {
    type: "application/json"
  }));
  postData.append("clothCoreWeavingSopDetails", new Blob([JSON.stringify(weavingDetails)], {
    type: "application/json"
  }));
  $.ajax({
    url: "/api/manufacture/order/weaving/sop/" + fw_formData.response.manufactureOrderCore.manufactureOrderCoreUuid,
    data: postData,
    method: "PUT",
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      fw_notification.show({}, "saveOrInsert");
      setNoificationPosition();
      setTimeout(function () {
        $(".drawCheck").hide().delay(460).queue(function () {
          // location = "/page/manufacture/order";
          $(this).dequeue();
        });
      }, 1000);
    } // end of ajax success
  }); //end of ajax
}

function weavingFormAdjustment() {
  var max = $("[name='requireWarpTensionMaximum']");
  $("[name='requireWarpTensionMaximum']").closest(".box_inputdata").remove();
  $("[name='requireWarpTensionMinimum']").after(max)
  $("[name='requireWarpTensionMinimum']").after(" ~ ")
  $("[name^='requireWarpTension']").css("width", "41%")
  var i = 1;
  $("#weavingForm").find("[name*='WarpCut']").each(function () {
    $("#weaving table tbody td").eq(i).html($(this).clone());
    i++;
  })
  i++;
  $("#weavingForm").find("[name*='WarpCut']").each(function () {
    $("#weaving table:eq(0) tbody td").eq(i).html($(this).clone());
    i++;
  })
  $("#weavingForm").find("[name*='WarpCut'],[name*='WarpCut']").closest(".box_inputdata").remove();
}

