var filter;
var yarneSpec = {
  "yarnCategory": "",
  "dsQuantity": "",
  "fiberAmount": "",
  "elasticity": "",
  "yarnLuster": "",
  "yarnCoreProcessingMethod": "",
}
var yarnCellData = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/ingredient/cell/list",
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
    id: "yarnCoreUuid",
    url: "/api/yarn/ingredient/template/" + uuid,
    mainData: "response.yarnCore",
    fileUpload:{
      afterUpload:"afterUpload",
    },
    //uploadFile:true //defult flase
    //By setting true files can be uploaded
    //But after uploading will execute nothing
    noData: "findnodata",
    listUrl: {
      "yarnTwist": "/api/yarn/ingredient/twist/list"
    },
    customizeForm: "customizeForm"
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
    $(this).hide().parent().css("left", "auto").animate({ right: "-10px", left: "initial" }).delay(100).queue(function () {
      $(this).find(".left").hide();
      $(this).dequeue();
    });
  })//left

  $("#addIngredient").click(function () {
    $("#ingredient tbody").append($("#ingreTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    $("#ingredient tbody tr:last [name='cellName']").kendoDropDownList({
      dataSource: yarnCellData,
      dataTextField: "text",
      dataValueField: "value",
      filter: "contains",
      filtering: function (e) {
        filter = e.filter;
      },
      optionLabel: " ",
      noDataTemplate: "<span class='nodata'>查無資料 <br/>新增此選項&emsp;<nav class='add single' data-name='cellName'>+</nav></span>"
    });//YarnCellDropDownList
    $("#ingredient tbody tr:eq(0) .del").show();
  })// addIngredient click

  $("body").on("click", "#ingredient .del", function () {
    $(this).closest("tr").remove();
    if ($("#ingredient tbody tr").length <= 1) {
      $("#ingredient tbody tr:eq(0) .del").hide();
    }
  })// ingredient  del click
  $("#save").click(function () {
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var ingredient = new Object();
    var postData = $("#form").formCheck({
      name: "yarnCore",
      otherCheck: ["yarnCellPercentages"]
    });
    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }

    $.ajax({
      url: "/api/yarn/ingredient",
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
  location.replace("/page/yarn/ingredient");
}//findnodata

function customizeForm() {
  var dsUnit = $("[name='dsUnit']").clone();
  $("[name='dsUnit']").closest(".box_inputdata").remove();
  $("[name='dsQuantity']").css("width", " calc(85% - 90px)").after(dsUnit);
  $("[name='dsUnit']").css({ "width": "80px", "margin-left": "5px" });

  $("[name='yarnCategory']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/yarn/ingredient/category/list",
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {
          return data.response
        }
      }
    },
    dataBound: function (e) {
      yarneSpec.yarnCategory = e.sender.dataItem(e.item).text;
    },
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//dsUnitDropDownList

  $("[name='yarnLuster']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/yarn/ingredient/luster/list",
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {
          return data.response
        }
      }
    },
    dataBound: function (e) {
      yarneSpec.yarnLuster = e.sender.dataItem(e.item).text;
    },
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//dsUnitDropDownList

  $("[name='dsUnit']").kendoDropDownList({
    dataSource: fw_formData.response.yarnCore.dsUnit.keyValue,
    dataTextField: "text",
    dataValueField: "value",
  });//dsUnitDropDownList

  $("[name='spunFilament']").kendoDropDownList({
    dataSource: fw_formData.response.yarnCore.spunFilament.keyValue,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//spunFilamentDropDownList

  var statusData = [
    { "value": false, "text": "未使用" },
    { "value": true, "text": "使用" }
  ]
  $("[name='yarnCoreStatus']").kendoDropDownList({
    dataSource: statusData,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//statusDropDownList

  for (i in yarneSpec) {
    if (i.search(/(yarnCategory|yarnLuster)/) < 0) {
      yarneSpec[i] = $("[name='" + i + "']").val();
    }
  }

  //-------percentage------
  var percentage = fw_formData.response.yarnCellPercentages;
  $("#ingreTemplate [name='cellName']").attr("data-name", percentage[0].yarnCell.title);
  $("#ingreTemplate [name='percentage']").attr("data-name", percentage[0].percentage.title);
  for (i in percentage[0]) {
    var required = (percentage[0][i].required) ? "<span class='color_pink'>*</span>" : "";
    $("#ingredient thead tr th ." + i + "Title").text(percentage[0][i].title).after(required);
  }

  $("#ingredient thead tr th .percentageTitle").text($("#ingredient thead tr th .percentageTitle").text() + "(%)");
  for (i of percentage) {
    $("#addIngredient").trigger("click");
    $("#ingredient tbody tr:last [name='cellName']").data("kendoDropDownList").value(i.yarnCell.value);
    $("#ingredient tbody tr:last [name='percentage']").val((i.percentage.value) ? (i.percentage.value * 100).toFixed(2) : "");
  }//end of loop
  if (percentage.length <= 1) {
    $("#ingredient tbody .del").hide();
  }

  $("[name='yarnCategory'],[name='dsQuantity'],[name='fiberAmount'],[name='elasticity'],[name='yarnLuster'],[name='yarnCoreProcessingMethod']")
    .on("input change blur", function () {
      yarneSpec[$(this).attr("name")] = $(this).val().trim();
      if ($(this).data("kendoDropDownList")) {
        yarneSpec[$(this).attr("name")] = $(this).data("kendoDropDownList").text();
      }
      var sepc = yarneSpec.yarnCategory + yarneSpec.dsQuantity
      sepc += (yarneSpec.fiberAmount) ? "/" + yarneSpec.fiberAmount + "F" : "";
      sepc += (yarneSpec.elasticity) ? "+" + yarneSpec.elasticity + "OP" : "";
      sepc += (yarneSpec.yarnLuster) ? "-" + yarneSpec.yarnLuster : "";
      sepc += (yarneSpec.yarnCoreProcessingMethod) ? "(" + yarneSpec.yarnCoreProcessingMethod + ")" : "";
      $("[name='yarnSpec']").prev().text(sepc);
    })//input change blur

}//customizeForm

function yarnCellPercentages() {
  var ingredient = new Object();
  var sum = 0;
  ingredient["yarnCoreUuid"] = (uuid.length) ? uuid : 0;
  ingredient["yarnCellPercentageForms"] = [];
  $("#ingredient tbody tr").each(function () {
    ingredient["yarnCellPercentageForms"].push({
      "cellName": ($(this).find("[name='cellName']").val().trim().length) ? $(this).find("[name='cellName']").val().trim() : null,
      "percentage": ($(this).find("[name='percentage']").val().trim().length) ? Number(($(this).find("[name='percentage']").val().trim() / 100).toFixed(4)) : null
    });
    var emptyInput = 0;
    if ($(this).find("[name='cellName']").val().trim() && !$(this).find("[name='percentage']").val().trim()) {
      $(this).find("[name='percentage']").addClass("invalidInput");
      $(this).find("[name='percentage']").closest("td").find(".errorMsg").text("請輸入百分比");
    }
    if ($(this).find("[name='percentage']").val().trim() <= 0 && $(this).find("[name='percentage']").val().trim()) {
      $(this).find("[name='percentage']").addClass("invalidInput");
      $(this).find("[name='percentage']").closest("td").find(".errorMsg").text("百分比不得為零");
    }
    if ($(this).find("input").length == emptyInput) {
      $(this).find(".invalidInput").removeClass("invalidInput");
      $(this).find(".errorMsg").text("");
    }
    sum += Number(($(this).find("[name='percentage']").val().trim() / 100).toFixed(4));
  })//endo fo each
  if (sum > 1) {
    $("#percentageError").text("占比超出100%").closest("th").addClass("invalidInput");
  }
  return ingredient;
}//yarnCellPercentages

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
