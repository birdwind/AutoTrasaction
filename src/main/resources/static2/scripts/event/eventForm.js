var filter;
var newEvents=[];
var deletedEvents=[];
var category = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/event/" + section + "/category/list",
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
    id: "eventCoreUuid",
    url: "/api/event/" + section + "/template/" + uuid,
    mainData: "response.eventCore",
    noData: "findnodata",
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
    $(this).hide().parent().css("left", "auto").animate({ right: "-10px" }).delay(100).queue(function () {
      $(this).find(".left").hide();
      $(this).dequeue();
    });
  })//left

  $("#addItem").click(function () {
    var relateOrder = $("#category tbody tr").length + 1;
    $("#cateTemplate .eventNo span").text(relateOrder);
    $("#category tbody").append($("#cateTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    $("#category tbody .eventNo:last [name='relateOrder']").val(relateOrder);
    $("#category tbody .eventNo:last [name='eventRelateUuid']").val("0");
    setCategoryDropdown();
  })// addcategory click

  $("body").on("click", "#category .del", function () {
    var num = $(this).closest("tr").index();
    var delId = $(this).closest("tr").find("[name='eventRelateUuid']").val();
    if( delId !== "0"){
      deletedEvents.push($(this).closest("tr").find("[name='eventRelateUuid']").val());
    }
    $(`#category tbody tr:gt(${num})`).each(function () {
      $(this).find(".eventNo span").text($(this).index());
      $(this).find(".eventNo [name='relateOrder']").val($(this).index());
    })
    $(this).closest("tr").remove();
  })// category del click

  $("#save").click(function () {
    if ($(this).hasClass("waitaSec")) {
      return;
    }
    $(this).addClass("waitaSec");
    var otherCheck = ["relationEvents"];
    if(uuid){
      otherCheck = otherCheck.concat([
        "newrelationEvents",
        "deletedRelationEvents"
      ])
    }
    var postData = $("#form").formCheck({
      name: "eventCore",
      dataProccessing: "setCategoryId",
      otherCheck: otherCheck
    });
    if (!postData) {
      $(this).removeClass("waitaSec");
      return;
    }
    $.ajax({
      url: "/api/event/" + section,
      data: postData,
      method: (uuid.length) ? "POST" : "PUT",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          fw_notification.show({}, "saveOrInsert");
          setNoificationPosition();
          setTimeout(function () {
            $(".drawCheck").hide().delay(460).queue(function () {
              location = "/page/event/"+section;
              $(this).dequeue();
            });
          }, 1000);
        } else {
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
  location.replace("/page/event/" + section);
}//findnodata

function customizeForm() {
  if (typeof (Storage) !== "undefined") {
    if (sessionStorage.getItem("eventCopy") != null && !uuid) {
      var eventCopy = JSON.parse(sessionStorage.getItem("eventCopy"));
      mainCore = eventCopy.eventCore;
      for (i in mainCore) {
        if (mainCore[i + "Id"]) {
          $("#form [name='" + i + "']").val(mainCore[i + "Id"]);
        } else {
          $("#form [name='" + i + "']").val(mainCore[i].value);
        }
      }
      sessionStorage.removeItem("eventCopy");
    }//if
  }//if
  $("[name='modify']").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          url: "/api/yarn/quality/control/supervisors/list",
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
    filter: "contains",
    optionLabel: " ",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//modifyDownList

  var category = fw_formData.response.categoryGrid;
  for (i of category.contents) {
    $("#cateTemplate .eventNo span").text(i.relateOrder);
    $("#category tbody").append($("#cateTemplate").html().replace(/(<table>|<tbody>|<\/tbody>|<\/table>)/g, ""));
    $("#category tbody .eventNo:last [name='eventRelateUuid']").val((i.eventRelateUuid) ? i.eventRelateUuid : "0");
    $("#category tbody .eventNo:last [name='relateOrder']").val(i.relateOrder);
    $("#category tbody [name='eventCategory']:last").val(i.relateCategoryUuid);
    $("#category tbody [name='relateEvent']:last").val(i.relateEventUuid);
    setCategoryDropdown();
    setEventDropdown($("#category tbody [name='relateEvent']:last"), i.relateCategoryUuid);
  }
  relateItemDrag();
}//customizeForm

function yarnInquiry(obj, form) {
  var emailSet = [];
  obj.find("input[name*='Email']:not(:hidden)").each(function () {
    if (!$(this).val().trim().length) {
      $(this).errorMsg({
        message: "請輸入Email"
      });
    }
  })//check email
  form["supplier"] = theSupplier;
  form["companyEmails"] = supplierSet[theSupplier];
  return form;
}//yarnInquiry

function setCategoryDropdown() {
  $("#category [name='eventCategory']:last").kendoDropDownList({
    dataSource: category,
    change: function (e) {
      var eventName = $(e.sender.element).closest("tr").find("[name='relateEvent']");
      eventName.val("");
      setEventDropdown(eventName, this.value());
    },
    filter: "contains",
    optionLabel: " ",
    dataTextField: "text",
    dataValueField: "value",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//CategoryDropDownList
}//setCategoryDropdown

function setEventDropdown(obj, categoryUuid) {
  obj.kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          url: "/api/event/" + section + "/relationalEvent/list/" + categoryUuid,
          dataType: "json"
        }
      },
      schema: {
        data: function (data) {
          return data.response
        }
      }
    },
    filter: "contains",
    optionLabel: " ",
    dataTextField: "text",
    dataValueField: "value",
    noDataTemplate: "<span class='nodata'>查無資料</span>"
  });//EventDropDownList
}//setEventDropdown

function setCategoryId(obj, form) {
  form["eventCategory"] = categoryId;
  return form;
}//yarnInquiry

function relationEvents() {
  var relationEvents = new Object();
  relationEvents.relationEvents = [];
  $("#category tbody tr").each(function () {
    var item = {
      "eventCoreUuid":(uuid.length) ? uuid : "0"
    };
    var input = 0;
    
    if($(this).find("[name='eventCategory']").val().trim()){
      if(!$(this).find("[name='relateEvent']").val().trim()){
        $(this).find("[name='relateEvent']").errorMsg({
          message: "請選擇事件名稱"
        });
      }
      $(this).find("input").each(function () {
        item[$(this).attr("name")] = $(this).val();
      })
      item.relateOrder = parseInt(item.relateOrder);
      item.eventCore = (uuid.length) ? uuid : "0";
      if(uuid && item.eventRelateUuid == "0"){
        newEvents.push(item);
        return;
      }
      relationEvents.relationEvents.push(item)
    }
  })
  return relationEvents
}//relationEvents

function newrelationEvents() {
  var relationEvents ={
    "relationEvents":newEvents
  };
  return relationEvents;
}//newDetail

function deletedRelationEvents() {
  var relationEvents = new Object();
  relationEvents.relationEvents = deletedEvents;
  return relationEvents
}//deletedRelationEvents
