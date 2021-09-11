let rootApi = "/api/cloth/export";
let apiUrl = rootApi + "/template/";
let backUrl = "/page/cloth/export/";

let exportClothBatchDataSource;
let clothOrderDatasource = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/order/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response;
    }
  }
});

let exportStaffDatasource = new kendo.data.DataSource({
  transport: {
    read: {
      url: rootApi + "/exporter/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response;
    }
  }
});

$(function () {
  $("#form").formWizard({
    url: apiUrl + uuid,
    mainData: "response.greyClothExport",
    noData: "findnodata(backUrl)",
    customizeForm: "customizeForm",
    fileUpload: true,
  }); //formWizard
  uuid ? SetInitPage(true, backUrl): SetInitPage(false, backUrl);

  baseController();
});

function customizeForm() {
  kendo.ui.progress($("#form"), true);

  $("#form").find("[name='greyClothExportBatchView']").after(`<div id="grid" style="margin-top: 5px; margin-bottom: 5px; display: inline-grid; width: 85%"></div>`);
  $("#form").find("[name='greyClothExportBatchView']").hide();

  let greyClothExportBatchGridHeader = [];
  $.each(fw_formData.response.greyClothExport.greyClothExportBatchGrid.header, function (key, value) {
    let column = setColumnView(key, value);
    greyClothExportBatchGridHeader.push(column);
  });
  if (!uuid) {
    setViewable($("#form").find("input[name='clothNo']").parents(".col-md-12.box_inputdata"), false);
    setViewable($("#form").find("input[name='greyClothExportBatchView']").parents(".col-md-12.box_inputdata"), false);
    setDropDownListUI($("#form").find("[name='clothOrder']"), clothOrderDatasource, null, null);
    setDropDownListUI($("#form").find("[name='exportStaff']"), exportStaffDatasource, user, null);

    $("#form").find("[name='clothOrder']").data("kendoDropDownList").bind("change", function (e) {
      let exportClothUuid = this.dataItem().exportClothUuid;
      if(exportClothUuid) {
        setViewable($("#form").find("input[name='clothNo']").parents(".col-md-12.box_inputdata"), true);
        setViewable($("#form").find("input[name='greyClothExportBatchView']").parents(".col-md-12.box_inputdata"), true);
        $("#form").find("[name='clothNo']").prev().text(this.dataItem().exportClothNo);
        exportClothBatchDataSource = new kendo.data.DataSource({
          transport: {
            read: {
              url: rootApi + "/batch/" + exportClothUuid,
              dataType: "json"
            }
          },
          schema: {
            data: function (data) {
              $.each(data.response, function (index, value) {
                value.isDeleted = false;
              });
              return data.response;
            }
          }
        });

        $("#form").find(".btn").trigger("click");
      }else{
        setViewable($("#form").find("input[name='clothNo']").parents(".col-md-12.box_inputdata"), false);
        setViewable($("#form").find("input[name='greyClothExportBatchView']").parents(".col-md-12.box_inputdata"), false);
        $("#grid").find(".k-grid-content.k-auto-scrollable tbody").empty();
      }
    });

    greyClothExportBatchGridHeader.push({
      field: "del",
      filterable: false,
      title: "刪除",
      width: "5%"
    });
  }

  $("#grid").initKendoGrid({
    columns: greyClothExportBatchGridHeader,
    customerDataSource: new kendo.data.DataSource({
      data: fw_formData.response.greyClothExport.greyClothExportBatchGrid.contents,
    }),
    toolbar: uuid ? null : function () {
      return `
     <div id="toolbar">
       <table class="toolbar-search">
           <tbody>
             <tr>
               <td style="padding: 0px; text-align: left;" name="toolbar-button">
                 <div class="table_bar_box">
                   <a id="addBtn" class="btn"><i class="fa fa-plus"></i></a>
                 </div>
               </td>
             </tr>   
           </tbody>
       </table>
     </div>
     ` ;
    },
    pageable: false,
    sortable: false
  });

  kendo.ui.progress($("#form"), false);
}

function baseController() {

  $("#form").on("click", ".btn", async function () {
    if ($("#form").find("input[name='clothOrder']").val()) {
      if ($("#grid").find(".k-grid-norecords")) {
        $("#grid").find(".k-grid-norecords").remove();
      }
      $("#grid").find(".k-grid-content.k-auto-scrollable tbody").append(kendo.template($("#greyClothBatchRow").html()));
      let exportClothBatch = $("#grid").find("input[name='batch']:last");
      setDropDownListUI(exportClothBatch, exportClothBatchDataSource, null, null, true);
    }
  });

  $("#form").on("click", "a[name='tableDel']", function () {
    let parent = $(this).parents("tr");
    parent.find("input[name='batch']").data("kendoDropDownList").dataItem().isDeleted = false;
    parent.remove();
  });

  $("#save").click(function () {
    let postData = $("#form").formCheck({
      name: "clothExport",
      dataProccessing: "clothExportData",
      otherCheck: ["clothExportBatch"]
    });

    $.ajax({
      url: rootApi,
      data: postData,
      method: "PUT",
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        if (data.status) {
          fw_notification.show({}, "saveOrInsert");
          setNoificationPosition();
          setTimeout(function () {
            $(".drawCheck").hide().delay(460).queue(function () {
              location.replace("/page/cloth/export");
              $(this).dequeue();
            });
          }, 1000);
        } else {
          $("#save").removeClass("waitaSec");
          for (i of data.response) {
            if(i.field.indexOf("greyClothExportBatchForms") != -1){
              let index = i.field.substring(i.field.indexOf("[") + 1, i.field.indexOf("]"));
              console.log(index);
              if(i.field.indexOf("batchAmount") !== -1){
                $($("#grid [name='batchAmount']")[index]).errorMsg({
                  message: i.defaultMessage
                })
              }else if(i.field.indexOf("stockExportLength") !== -1) {
                $($("#grid [name='stockExportLength']")[index]).errorMsg({
                  message: i.defaultMessage
                })
              }else if(i.field.indexOf("batch") !== -1) {
                $($("#grid [name='batch']")[index]).errorMsg({
                  message: i.defaultMessage
                })
              }
            }
            $("#form [name='" + i.field + "']").errorMsg({
              message: i.defaultMessage
            });

          }
        }
      } // end of ajax success
    }); //end of ajax
  });
}

function clothExportData(obj, form) {
    form.greyClothExportUuid = 0;
    return form;
}

function clothExportBatch() {
  let clothExportBatch = {};
  clothExportBatch.greyClothExportUuid = 0;
  clothExportBatch.greyClothExportBatchForms = [];
  let greyClothExportBatchHeader = fw_formData.response.greyClothExport.greyClothExportBatchGrid.header;

  $.each($("#grid").find(".k-grid-content tr"), function () {
    let obj = {};
    $.each($(this).find("input"), function () {
      let field = $(this).attr("name");
      let msg = "請輸入" + greyClothExportBatchHeader[field].title;
      if (!$(this).val().trim()) {
        $(this).errorMsg({
          message: msg
        });
      }else{
        obj[field] = $(this).val().trim();
      }
    });
    clothExportBatch.greyClothExportBatchForms.push(obj)
  });

  return clothExportBatch;
}

function setViewable(selector, isViewable) {
  if(isViewable){
    selector.show();
  }else{
    selector.hide();
  }
}
