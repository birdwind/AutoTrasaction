function findnodata(url) {
  $("html").remove();
  location.replace(url);
} //findnodata

function SetInitPage(isOnlyBack, url) {
  $(".box_features").draggable({
    axis: "y"
  });
  if (isOnlyBack == false) {
    $(".box_features > .right").click(function () {
      $(this).parent().css("left", "auto").animate({
        right: "-160px"
      }).delay(100).queue(function () {
        $(this).find(".left").fadeIn(100);
        $(this).dequeue();
      });
    }) //right
    $(".box_features > .left").click(function () {
      $(this).hide().parent().css("left", "auto").animate({
        right: "-10px"
      }).delay(100).queue(function () {
        $(this).find(".left").hide();
        $(this).dequeue();
      });
    }) //left
  } else {
    $(".box_features").draggable({
      axis: "y"
    });
    $(".box_features > .right").click(function () {
      $(this).parent().css("left", "auto").animate({
        right: "-100px"
      }).delay(100).queue(function () {
        $(this).find(".left").fadeIn(100);
        $(this).dequeue();
      });
    }) //right
    $(".box_features > .left").click(function () {
      $(this).hide().parent().css("left", "auto").animate({
        right: "-10px"
      }).delay(100).queue(function () {
        $(this).find(".left").hide();
        $(this).dequeue();
      });
    }) //left
    $("#save").remove();
  }

  $("#replyPage").attr("onclick", "location='" + url + "'");

} //SetInitPage

function setDateUI() {
  $(".date").kendoDatePicker({
    culture: "zh-TW"
  });
} //end of setDateUI

function setDateUIBySelect(select) {
  $(select).kendoDatePicker({
    culture: "zh-TW"
  });
} //end of setDateUI

function setDateTimeUI() {
  $(".datetime").kendoDateTimePicker({
    culture: "zh-TW",
    format: "yyyy/MM/dd HH:mm",
    timeFormat: "HH:mm",
    interval: 15
  });
} //end of setDateUI

function setDateTimeUIBySelect(select) {
  $(select).kendoDateTimePicker({
    culture: "zh-TW",
    format: "yyyy/MM/dd HH:mm",
    timeFormat: "HH:mm",
    interval: 15
  });
} //end of setDateUI

async function setDropDownListUI(select, data, setValue, setText, isnotAgainable) {
  //set UI
  $(select).kendoDropDownList({
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    filter: "contains",
    select: isnotAgainable ? function (e) {
      if(e.dataItem.isDeleted){
        e.preventDefault();
      }
    } : null,
    change: isnotAgainable ? function () {
      this.dataItem().set("isDeleted", true);
    } : null
  });
  //set DataSource
  if (data != null) {
    await data.fetch();
    $(select).data("kendoDropDownList").setDataSource(data);
  }
  //set Value
  if (setText != null && setText != "") {
    $(select).data("kendoDropDownList").text(setText);
  }
  if (setValue != null && setValue != "") {
    $(select).data("kendoDropDownList").value(setValue);
  }
} //end of setDropDownListUI

async function setDropDownListUIByJsonData(select, data, setValue, setText) {
  //set UI
  $(select).kendoDropDownList({
    dataSource: data,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>",
    filter: "contains"
  });
  //set Value
  if (setText != null && setText != "") {
    $(select).data("kendoDropDownList").text(setText);
  }
  if (setValue != null && setValue != "") {
    $(select).data("kendoDropDownList").value(setValue);
  }
} //end of setDropDownListUIByJsonData


function setTitleByName(header) {
  for (var i in header) {
    $("[name='" + i + "Title" + "']").text(header[i].title);
  }
}

function setContentByName(contents) {
  for (item of contents) {
    for (i in item) {
      $("[name='" + i + "']").text(item[i]);
    }
  } //end of loop
}

function setTitleByTableId(targetId, header) {
  for (var i in header) {
    $("#" + targetId + " tr th ." + i + "Title").text(header[i].title);
  }
}

function setContentByTableId(targetId, contents) {
  for (item of contents) {
    addTemplateRow(targetId + "Template", targetId);
    for (i in item) {
      $(`#` + targetId + ` tbody tr:last [name='${i}']`)
        .text(item[i]);
    }
  } //end of loop
}

function addTemplateRow(sourceTemplateId, TargetTableId) {
  $("#" + TargetTableId + " tbody")
    .append($("#" + sourceTemplateId)
      .html()
      .replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
}

function getGuid() {
  return 'xxxxxxxx-xxxx-0xxx-yxyx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var string = Math.random() * 16 | 0,
      v = c === 'x' ? string : (string & 0x3 | 0x8);
    return string.toString(16);
  }).toUpperCase();
}

function setNotification(successText, errorText, customer) {
  if (!$('body').find("#notificationUi")[0]) {
    $('body').append(`<span id="notificationUi"></span>`);
  }
  return $("#notificationUi").kendoNotification({
    templates: customer ? customer : [{
      type: "saveOrInsert",
      template: "<div class='saveOrInsert zoominTrans'>" + successText + "成功" + "</span></div>"
    }, {
      type: "error",
      template: "<div class='errorNotification zoominTrans'>" + errorText + "失敗" + "</span></div>"
    }
    ],
    autoHideAfter: 1500
  }).data("kendoNotification");
}
