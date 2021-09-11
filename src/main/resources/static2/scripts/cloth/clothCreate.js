var filter, supplier;
var yarnQualityBatchesData = new kendo.data.DataSource();
let validatedFiles = [];
let attachmentsData = [];
let deleteFileData = [];
let totalSize = 0;
let allSize = [];
let yarnAmount = 2;
$(function () {
  let formData = $("#form").formWizard({
    id: "clothCoreUuid",
    url: "/api/cloth/specification/template/" + uuid,
    mainData: "response.clothCore",
    noData: "findnodata",
    customizeForm: "customizeForm",
    fileUpload:{
      afterUpload:"afterUpload"
    },
  });//formWizard

  $(".box_features").draggable({
    axis: "y"
  });

  $(".box_features > .right").click(function () {
    $(this).parent().css("left", "auto").animate({ right: "-160px" }).delay(100).queue(function () {
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

  $("body").on("click", "#quality .del", function () {
    $(this).closest("tr").remove();
    if ($("#quality tbody tr").length <= 1) {
      $("#quality tbody tr:eq(0) .del").hide();
    }
  })// ingredient  del click

  $("#warp-tab").click(function () {
    $(".warp-tag").show();
    $(".weft-tag").hide();
  })
  $("#weft-tab").click(function () {
    $(".weft-tag").show();
    $(".warp-tag").hide();
  })
  $(".addItem").click(function () {
    let table = $(this).closest("table");
    table.find("tbody").append('<tr><td style="text-align:center;line-height:40px;"><input type="text" name="yarnCore" class="form-control " value="" style="width:85%"></input></td><td style="text-align:center;line-height:40px" name="yarnSpec" class="yarnSpec"></td><td style="text-align:center;line-height:40px"><input type="text" name="yarnColors" class="form-control yarnColors" value="" ></input></td><td style="text-align:center;line-height:40px"><input type="text" name="yarnQuantity" class="form-control number interger yarnQuantity" value="" ></input></td><td style="text-align:center;line-height:40px"><input type="text" name="yardPerUnit" class="form-control yardPerUnit number" value="" ></input></td><td style="text-align:center;line-height:40px;"><a href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle" style="display:none"><i class="fa fa-times"></i></a></td></tr>');
    table.find("tbody tr:last [name='yarnCore']").kendoDropDownList({
      dataSource: {
        transport: {
          read: {
            type: "GET",
            url: "/api/cloth/specification/yarnCores/list",
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
      optionLabel: " ",
      change: function () {
        let dataValue = this.value();
        let dataElement = $(this.element[0]).closest("td").next()
        this.dataSource.data().map(function (element) {
          if (element.value == dataValue) {
            dataElement.text(element.yarnSpec);
            return false;
          }
          else if (dataValue == "") {
            dataElement.text(" ");
          }
        })
      }
    });
    table.find("tbody tr:last [name='yarnColors']").kendoDropDownList({
      dataSource: {
        transport: {
          read: {
            type: "GET",
            url: "/api/cloth/specification/yarnColors/list",
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
      optionLabel: " ",

    });
    table.find(".del").show();
    yarnAmount++;
  })
  $("body").on("click", ".del", async function () {
    let table = $(this).closest("table");
    if (table.find("tr").length > 2) {
      event.target.closest("tr").remove();
    }
    if (table.find("tr").length == 2) {
      table.find(".del").hide();
    }

  })
  $("#save").click(function () {

    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var postData = $("#form").formCheck({
      name: "clothCore",
      dataProccessing: "densitySet",
      otherCheck: [
        "clothYarns"
      ]
    });

    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }

    $.ajax({
      url: "/api/cloth/specification",
      data: postData,
      method: (uuid.length) ? "POST" : "PUT",
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
  location.replace("/page/cloth/specification");
}//findnodata
function eventsBound() {
  let multiSelect = $("select[name = 'events']").data('kendoMultiSelect');
  let data = multiSelect.dataSource.data()
  let val = [];
  let selectedItems;
  let select = []
  if (window.localStorage.events != "") {
    selectedItems = window.localStorage.events.split(", ")
  }
  else {
    return false;
  }
  $.each(selectedItems, function (field, value) {
    select.push(value);
  })
  select.forEach(function (element) {
    if (data.find(x => x.text.includes(element))) {
      val.push(data.find(x => x.text.includes(element)).value);
    }
  })
  multiSelect.value(val);

}
function batchNoBound() {
  let dropDownList = $("input[name = 'importDetail']").data('kendoDropDownList');
  let data = dropDownList.dataSource.data()
  if (window.localStorage.importDetail == "") {
    return false;
  }
  if (data.find(x => x.text.includes(window.localStorage.importDetail))) {
    dropDownList.value(data.find(x => x.text.includes(window.localStorage.importDetail)).value);
  }
}
function supervisorBound() {
  let dropDownList = $("input[name = 'supervisor']").data('kendoDropDownList');
  let data = dropDownList.dataSource.data()
  if (window.localStorage.supervisor == "") {
    return false;
  }
  if (data.find(x => x.text.includes(window.localStorage.supervisor))) {
    dropDownList.value(data.find(x => x.text.includes(window.localStorage.supervisor)).value);
  }
}

function customizeForm() {
  for (let i = 0; i < fw_formData.response.clothWarpYarns.length; i++) {
    $(".warp-tag").find("input[name='yarnCore']").eq(i).val(fw_formData.response.clothWarpYarns[i].yarnCore.value)
    $(".warp-tag").find("input[name='yarnColors']").eq(i).val(fw_formData.response.clothWarpYarns[i].yarnColor.value)
    $(".warp-tag").find("[name='yarnSpec']").eq(i).text(fw_formData.response.clothWarpYarns[i].yarnSpec.value)
    $(".warp-tag").find("input[name='yarnQuantity']").eq(i).val(fw_formData.response.clothWarpYarns[i].yarnQuantity.value)
    $(".warp-tag").find("input[name='yardPerUnit']").eq(i).val(fw_formData.response.clothWarpYarns[i].yardPerUnit.value)
    if (i < fw_formData.response.clothWarpYarns.length - 1) {
      $('.warp-tag').find(".addItem").trigger('click');
    }
  }
  for (let i = 0; i < fw_formData.response.clothWeftYarns.length; i++) {
    $(".weft-tag").find("input[name='yarnCore']").eq(i).val(fw_formData.response.clothWeftYarns[i].yarnCore.value)
    $(".weft-tag").find("input[name='yarnColors']").eq(i).val(fw_formData.response.clothWeftYarns[i].yarnColor.value)
    $(".weft-tag").find("[name='yarnSpec']").eq(i).text(fw_formData.response.clothWeftYarns[i].yarnSpec.value)
    $(".weft-tag").find("input[name='yarnQuantity']").eq(i).val(fw_formData.response.clothWeftYarns[i].yarnQuantity.value)
    $(".weft-tag").find("input[name='yardPerUnit']").eq(i).val(fw_formData.response.clothWeftYarns[i].yardPerUnit.value)
    if (i < fw_formData.response.clothWeftYarns.length - 1) {
      $('.weft-tag').find(".addItem").trigger('click');
    }
  }

  attachmentsData = fw_formData.response.attachments;
  $.each(fw_formData.response.clothCore, function (index, value) {
    if (value.value == null) {
      $("input[name='" + index + "']").val("");
    }
  })


  // if (fw_formData.response.clothCore;
  $("#cloth01 thead tr th .FinishedClothDensityWrap ").closest("tr").after("<tr class='FinishedClothDensity'><th style='text-align:center;line-height:50px'>成品</th></tr>");
  $("#cloth01 thead tr th .GreyClothDensityWrap ").closest("tr").after("<tr class='GreyClothDensity'><th style='text-align:center;line-height:50px'>胚布</th></tr>");
  $("#cloth01 thead tr th .MachineDensityWrap ").closest("tr").after("<tr class='MachineDensity'><th style='text-align:center;line-height:50px'>機上</th></tr>");
  $("#cloth01 thead tr th .MachineDensityWrap ").text("經密");
  $("#cloth01 thead tr th .GreyClothDensityWrap ").text("緯密");
  $("#cloth01 thead tr th .FinishedClothDensityWrap ").text("幅寬");
  for (let index = 0; index < 3; index++) {
    let dataName = "";
    switch (index) {
      case 0:
        dataName = "DensityWrap";
        break;
      case 1:
        dataName = "DensityWeft";
        break;
      case 2:
        dataName = "ClothWidth";
        break;
    }
    let finshedValue = (fw_formData.response.clothCore["finishedCloth" + dataName].value) ? fw_formData.response.clothCore["finishedCloth" + dataName].value : "";
    let machineValue = (fw_formData.response.clothCore["machine" + dataName].value) ? fw_formData.response.clothCore["machine" + dataName].value : "";
    let greyCloth = (fw_formData.response.clothCore["greyCloth" + dataName].value) ? fw_formData.response.clothCore["greyCloth" + dataName].value : "";
    $(".MachineDensity").closest("tr").append('<td style="text-align:center;line-height:50px"><input type="text" name="machine' + dataName + '"class="form-control number" value="' + machineValue + '" ></input></td>');
    $(".GreyClothDensity").closest("tr").append('<td style="text-align:center;line-height:50px"><input type="text" name="greyCloth' + dataName + '"class="form-control number" value="' + greyCloth + '" ></input></td>');
    $(".FinishedClothDensity").closest("tr").append('<td style="text-align:center;line-height:50px"><input type="text" name="finishedCloth' + dataName + '"class="form-control number" value="' + finshedValue + '" ></input></td>');
  }
  if (window.localStorage.clothCopy) {

    let copyData = JSON.parse(window.localStorage.clothCopy);
    $.each(copyData.clothCore, function (index, value) {
      $("input[name='" + index + "']").val(value.value);
    })
    for (let i = 0; i < copyData.clothWarpYarns.length; i++) {
      $(".warp-tag").find("input[name='yarnCore']").eq(i).val(copyData.clothWarpYarns[i].yarnCore.value)
      $(".warp-tag").find("input[name='yarnColors']").eq(i).val(copyData.clothWarpYarns[i].yarnColor.value)
      $(".warp-tag").find("[name='yarnSpec']").eq(i).text(copyData.clothWarpYarns[i].yarnSpec.value)
      $(".warp-tag").find("input[name='yarnQuantity']").eq(i).val(copyData.clothWarpYarns[i].yarnQuantity.value)
      $(".warp-tag").find("input[name='yardPerUnit']").eq(i).val(copyData.clothWarpYarns[i].yardPerUnit.value)
      if (i < fw_formData.response.clothWarpYarns.length - 1) {
        $('.warp-tag').find(".addItem").trigger('click');
      }
    }
    for (let i = 0; i < copyData.clothWeftYarns.length; i++) {
      $(".weft-tag").find("input[name='yarnCore']").eq(i).val(copyData.clothWeftYarns[i].yarnCore.value)
      $(".weft-tag").find("input[name='yarnColors']").eq(i).val(copyData.clothWeftYarns[i].yarnColor.value)
      $(".weft-tag").find("[name='yarnSpec']").eq(i).text(copyData.clothWeftYarns[i].yarnSpec.value)
      $(".weft-tag").find("input[name='yarnQuantity']").eq(i).val(copyData.clothWeftYarns[i].yarnQuantity.value)
      $(".weft-tag").find("input[name='yardPerUnit']").eq(i).val(copyData.clothWeftYarns[i].yardPerUnit.value)
      if (i < fw_formData.response.clothWeftYarns.length - 1) {
        $('.weft-tag').find(".addItem").trigger('click');
      }
    }
  }

  $.each(attachmentsData, function (index, value) {
    var clothPart2 = fw_formData.response.clothCore;

    // $("#ingriTemplate [name='percentage']").attr("data-name", percentage[0].percentage.title);
    let unit = unitCalulate(value.size)
    if (value.originalFileName) {
      $("#sizeLabel").show();
      $(".clearfix").after("<span class='btn_uploadfile divinlineblock' name='" + value.originalFileName + "' value='" + value.encodeName + "'>" + value.originalFileName + " (" + unit.size + unit.unit + ")" + "<a href='javascript:void(0)'><i name='" + value.originalFileName + "' class='fa fa-times deleteFile'></i></a></span>");
      totalSize += (value.size / (1024 * 1024));
      allSize.push({ "size": value.size, "name": value.originalFileName });
      $("#sizeTotal").text(totalSize.toFixed(3) + "MB");
    }
    else {
      return false;
    }
  });
  $("input[name='yarnColors']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/cloth/specification/yarnColors/list",
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
    optionLabel: " ",
  });
  $("input[name='yarnCore']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/cloth/specification/yarnCores/list",
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
    optionLabel: " ",
    change: function (e) {
      let dataValue = this.value();
      let dataElement = $(this.element[0]).closest("td").next()
      this.dataSource.data().map(function (element) {
        if (element.value == dataValue) {
          dataElement.text(element.yarnSpec);
          return false;
        }
        else if (dataValue == "") {
          dataElement.text(" ");
        }
      })
    },
    optionLabel: " ",
  });

  $("input[name='clothCoreStatus']").kendoDropDownList({
    dataSource: [
      { "value": true, "text": "使用" },
      { "value": false, "text": "未使用" }
    ],
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
  })
  $("input[name='clothEdgeTissueUuid']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/cloth/specification/clothEdgeTissues/list",
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
    optionLabel: " ",

  });//clothEdgeTissueDropDownList
  $("input[name='clothTissueUuid']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/cloth/specification/clothTissues/list",
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
    optionLabel: " ",
  });//clothTissueDropDownList
  $("input[name='designer']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/cloth/specification/designers/list",
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
    optionLabel: " ",
  });//designerDropDownList
  $("input[name='clothWeavingMethodUuid']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/cloth/specification/clothWeavingMethods/list",
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
  });//clothWeavingMethodDropDownList

  $("input[name='clothEdgeWeavingMethodUuid']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/cloth/specification/clothEdgeWeavingMethods/list",
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
    optionLabel: " ",
  });
}
function densitySet(obj, form) {

  for (let index = 0; index < 3; index++) {
    let dataName = "";
    switch (index) {
      case 0:
        dataName = "DensityWrap";
        break;
      case 1:
        dataName = "DensityWeft";
        break;
      case 2:
        dataName = "ClothWidth";
        break;
    }
    form["finishedCloth" + dataName] = ($(".FinishedClothDensity").find("[name='" + "finishedCloth" + dataName + "']").val()) ? Number($(".FinishedClothDensity").find("[name='" + "finishedCloth" + dataName + "']").val()) : null;
    form["machine" + dataName] = ($(".MachineDensity").find("[name='" + "machine" + dataName + "']").val()) ? Number($(".MachineDensity").find("[name='" + "machine" + dataName + "']").val()) : null;
    form["greyCloth" + dataName] = ($(".GreyClothDensity").find("[name='" + "greyCloth" + dataName + "']").val()) ? Number($(".GreyClothDensity").find("[name='" + "greyCloth" + dataName + "']").val()) : null;
  }
  return form;
}
function clothYarns() {
  var clothYarn = new Object();
  clothYarn["clothCoreUuid"] = (fw_formData.response.clothCore.clothCoreUuid) ? fw_formData.response.clothCore.clothCoreUuid : 0;
  clothYarn["clothWarpYarnForms"] = [];
  clothYarn["clothWeftYarnForms"] = [];
  $(".warp-tag tbody tr").each(function (d) {
    clothYarn["clothWarpYarnForms"].push({
      "clothYarnUuid": (fw_formData.response.clothWarpYarns[d].clothYarnUuid) ? fw_formData.response.clothWarpYarns[d].clothYarnUuid : 0,
      "yardPerUnit": ($(this).find("[name='yardPerUnit']").val().trim().length) ? Number($(this).find("[name='yardPerUnit']").val()) : " ",
      "yarnColorUuid": $(this).find("[name='yarnColors']").val().trim(),
      "yarnCoreUuid": $(this).find("[name='yarnCore']").val().trim(),
      "yarnQuantity": $(this).find("[name='yarnQuantity']").val().trim(),
      "yarnSpec": ($(this).find("[name='yarnSpec']").text().trim().length) ? $(this).find("[name='yarnSpec']").text() : "",
    });

  })//endo fo each
  $(".weft-tag tbody tr").each(function (d) {
    clothYarn["clothWeftYarnForms"].push({
      "clothYarnUuid": (fw_formData.response.clothWeftYarns[d].clothYarnUuid) ? fw_formData.response.clothWeftYarns[d].clothYarnUuid : 0,
      "yardPerUnit": ($(this).find("[name='yardPerUnit']").val().trim().length) ? Number($(this).find("[name='yardPerUnit']").val()) : "",
      "yarnColorUuid": $(this).find("[name='yarnColors']").val().trim(),
      "yarnCoreUuid": $(this).find("[name='yarnCore']").val().trim(),
      "yarnQuantity": $(this).find("[name='yarnQuantity']").val().trim(),
      "yarnSpec": ($(this).find("[name='yarnSpec']").text().trim().length) ? $(this).find("[name='yarnSpec']").text() : "",
    });

  })//endo fo each

  return clothYarn;
}
function clothYarns() {
  var clothYarn = new Object();
  clothYarn["clothCoreUuid"] = (fw_formData.response.clothCore.clothCoreUuid) ? fw_formData.response.clothCore.clothCoreUuid : 0;
  clothYarn["clothWarpYarnForms"] = [];
  clothYarn["clothWeftYarnForms"] = [];
  $(".warp-tag tbody tr").each(function (d) {
    clothYarn["clothWarpYarnForms"].push({
      "clothYarnUuid": (fw_formData.response.clothWarpYarns[d]) ? fw_formData.response.clothWarpYarns[d].clothYarnUuid : 0,
      "yardPerUnit": ($(this).find("[name='yardPerUnit']").val().trim().length) ? Number($(this).find("[name='yardPerUnit']").val()) : " ",
      "yarnColorUuid": $(this).find("[name='yarnColors']").val().trim(),
      "yarnCoreUuid": $(this).find("[name='yarnCore']").val().trim(),
      "yarnQuantity": $(this).find("[name='yarnQuantity']").val().trim(),
      "yarnSpec": ($(this).find("[name='yarnSpec']").text().trim().length) ? $(this).find("[name='yarnSpec']").text() : "",
    });

  })//endo fo each
  $(".weft-tag tbody tr").each(function (d) {
    clothYarn["clothWeftYarnForms"].push({
      "clothYarnUuid": (fw_formData.response.clothWeftYarns[d]) ? fw_formData.response.clothWeftYarns[d].clothYarnUuid : 0,
      "yardPerUnit": ($(this).find("[name='yardPerUnit']").val().trim().length) ? Number($(this).find("[name='yardPerUnit']").val()) : "",
      "yarnColorUuid": $(this).find("[name='yarnColors']").val().trim(),
      "yarnCoreUuid": $(this).find("[name='yarnCore']").val().trim(),
      "yarnQuantity": $(this).find("[name='yarnQuantity']").val().trim(),
      "yarnSpec": ($(this).find("[name='yarnSpec']").text().trim().length) ? $(this).find("[name='yarnSpec']").text() : "",
    });

  })//endo fo each

  return clothYarn;
}
function afterUpload(){
  fw_notification.show({}, "saveOrInsert");
  setNoificationPosition();
  setTimeout(function () {
    $(".drawCheck").hide().delay(460).queue(function () {
      location = "/page/yarn/ingredient";
      $(this).dequeue();
    });
  }, 1000);
}
