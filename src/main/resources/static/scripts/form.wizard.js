/* formWizard 2.6 */
var fw_id, fw_formData = {},
  fw_isRequired = {},
  fw_noAddable = [],
  fw_listUrl,
  fw_notification,
  fw_confirmBox,
  fw_now = new Date();
var fw_FileUpload, fw_uploadFiles = [],
  fw_deletedFiles = [];
var fw_fileId = 1,
  fw_totalFileSize = 0,
  fw_attachSize = 0;
fw_now.setMinutes(parseInt(fw_now.getMinutes() / 5) * 5);
fw_now.setSeconds(0);

function setNoificationPosition() {
  var left = ($(window).width() - $(".k-notification").parent().width()) / 2;
  $(".k-notification").parent().css({
    "top": "250px",
    "left": left + "px"
  })
}
var fw_checkMrak = `
<svg width="80px" height="80px" class="checkMrak">
<g transform="translate(10,70) scale(0.033,-0.03)" fill="none">
  <path d="M995 1305 c-62 -16 -96 -52 -189 -202 -85 -136 -244 -458 -287 -581
  -17 -51 -33 -91 -34 -90 -2 2 -23 33 -47 69 -69 103 -138 177 -175 190 -64 21
  -183 -28 -183 -75 0 -8 39 -58 86 -113 47 -54 117 -146 157 -205 81 -121 103
  -135 190 -125 78 10 89 22 142 159 102 263 249 542 422 801 51 77 93 146 93
  154 0 32 -88 42 -175 18z" fill="white"/>
</g>
<path d="M15 48 l9 11 q 2 5, 6 -3 l16 -27" class="drawCheck" stroke="\\#71ade9" stroke-width="10" fill="none"/>
</svg>`
var fw_uploadPanel = `<div id="fileupload" class="box-body">
<div class="col-md-12 box_inputdata">
  <fieldset>
    <div class="form-group">
      <nav>檔案上傳</nav>
      <span>
        <a href="javascript:void(0)" id="selectFile" class="table_btn_status btn_upload inline">
          多檔選取 <i class="fa fa-folder-open-o"></i>
        </a>
        <span class="inlin fileError">&nbsp;檔案累計勿超過10MB</span>
      </span>
      <span>
        <a href="javascript:void(0)" id="removeAllFile" class="table_btn_status clear_upload inline">
          清除未上傳檔案 <i class="fa fa-trash"></i>
        </a>
      </span>
      <input type="file" name="upload" multiple style="display:none">
    </div>
  </fieldset>
</div>`
var fw_filelist = `<div class="box-body">
<div class="col-md-12 box_inputdata">
  <fieldset style="margin-left:15%;">
      <span id="fileInfo">
      </span>
      <span id="fileList">
      </span>
  <fieldset>
</div>
</div>
</div><!--#fileupload-->`
var fw_fileTemplate = `
<section id="fileSelectedTemplate" style="display:none;">
  <section class="theprogress">
    <h4>
      <span class="fileName"></span>&nbsp;
      <span class='color_pink error' style="font-weight:normal"></span>
    </h4>
    <div>
      <span class="fileSize"></span>
      <a href="javascript:void(0)" class="table_btn_status btn_download delSingleFile">
        清除 &times;
      </a>
    </div>
    </div>
    <div class="progress">
      <div class="progress-bar" role="progressbar">
    </div>
  </section>
</section>
<section id="fileDLtemplate" style="display:none;">
  <section class="dlBtn">
    <span>
      <a href="javascript:void(0)" class="table_btn_status btn_download">
        <span class="filenName"></span>
        &nbsp;<i class="fa fa-download"></i>
      </a>
      <button class='delFile'><i class='fa fa-times'></i></button>
    </span>
  </section>
</section>`

$(function () {
  $.fn.formWizard = function (options) {
    var action = (uuid.length) ? "儲存" : "新增";
    var formContainer = this;
    var settings = $.extend({
      id: "",
      url: "",
      mainData: "",
      listUrl: {},
      noData: "//", //If no function is declared ,it will become a line comment.
      noAddable: [],
      customizeForm: "//",
      notificationMsg: action + "成功",
      fileUpload: false
    }, options);
    fw_id = settings.id;
    fw_listUrl = settings.listUrl;

    fw_FileUpload = settings.fileUpload;
    if (typeof fw_FileUpload == "object") {
      fw_FileUpload = $.extend({
        showUploadBtn: true,
        showFileList: true,
        afterUpload: "//"
      }, fw_FileUpload);
    }

    if (fw_FileUpload) {
      $("body").append(fw_fileTemplate);
      if (typeof fw_FileUpload == "boolean" || fw_FileUpload.showFileList) {
        this.after(fw_filelist);
      }
      if (typeof fw_FileUpload == "boolean" || fw_FileUpload.showUploadBtn) {
        this.after(fw_uploadPanel);
        setUploadingEvent();
      }

    }

    $("body").append("<span id='notification'></span>");
    fw_notification = $("#notification").kendoNotification({
      templates: [{
        type: "saveOrInsert",
        template: "<div class='saveOrInsert zoominTrans'>" + settings.notificationMsg + "</span>" + fw_checkMrak + "</div>"
      }],
      autoHideAfter: 1500
    }).data("kendoNotification");
    $("#save").html((uuid.length) ? `
    <span class="fa-stack">
  <i class="fa fa-circle fa-stack-2x icon-background" style="color: #28a745;"></i>
  <i class="fa fa-save fa-stack-1x"></i>
</span>` : `<span class="fa-stack">
  <i class="fa fa-circle fa-stack-2x icon-background" style="color: #28a745;"></i>
  <i class="fa fa-plus fa-stack-1x"></i>
</span>`);

    $.ajax({
      url: settings.url,
      method: 'GET',
      success: function (data) {
        if (!data.status) {
          eval(settings.noData + "();");
        }
        fw_formData = data;
        fw_isRequired = eval("data" + ((settings.mainData.length) ? "." : "") + settings.mainData);
        fw_noAddable = settings.noAddable;

        if (fw_FileUpload) {
          if (typeof fw_FileUpload == "boolean" || fw_FileUpload.showFileList) {
            //file list ------
            for (file of data.response.attachment.attachmentDetails) {
              var fileSize = file.size / (1024 * 1024);
              fw_attachSize += fileSize;
              $("#fileDLtemplate .dlBtn").attr("fileId", file.attachmentDetailUuid);
              $("#fileDLtemplate .filenName").text(`${file.originalFileName} (${fileSize.toFixed(3)} MB)`)
              $("#fileDLtemplate a").attr("href", file.link);
              $("#fileList").append($("#fileDLtemplate").html());
            }
          } //if
        } //if
        formContainer.createForm({
          data: eval("data" + ((settings.mainData.length) ? "." : "") + settings.mainData)
        }); //createForm
        eval(settings.customizeForm + "();");
        checkEmpty();
      }, //end of success
      error: function (data) {
        eval(settings.noData + "();");
      }
    }); //end of ajax
  } //end of main formWizard
  $.fn.createForm = function (options) {
    var content = "",
      MultiSelectSet = {};
    var settings = $.extend({
      data: []
    }, options);
    for (i in settings.data) {
      if (settings.data[i] == null) {
        continue;
      } else if (settings.data[i].title == undefined) {
        continue;
      }
      var required = (settings.data[i].required) ? `<span class="color_pink">*</span>` : "";
      switch (settings.data[i].type) {
        case "hidden":
          content += `<input type="hidden" name="${i}" value="${settings.data[i].value}">`;
          break;
        case "text":
        case "multi_text":
        case "password":
          content += `<div class="col-md-12 box_inputdata">
                  <fieldset>
                    <div class="form-group">
                      <nav>${settings.data[i].title + required}</nav>
                      <input type="${settings.data[i].type.replace("multi_", "")}" name="${i}" class="form-control" value="${settings.data[i].value}">
                      <span class="errorMsg color_pink"></span>
                    </div>
                  </fieldset>
                </div>`;
          break;
        case "date":
        case "datetime":
          content += `<div class="col-md-12 box_inputdata">
                  <fieldset>
                    <div class="form-group">
                      <nav>${settings.data[i].title + required}</nav>
                      <input type="text" name="${i}" class="form-control" data-picker="${settings.data[i].type}" value="${settings.data[i].value}">
                      <span class="errorMsg color_pink"></span>
                    </div>
                  </fieldset>
                </div>`;
          break;
        case "dropDown":
        case "unsignedInteger":
        case "float":
          var integer = (settings.data[i].type == "float") ? "" : " integer";
          content += `<div class="col-md-12 box_inputdata">
                  <fieldset>
                    <div class="form-group">
                      <nav>${settings.data[i].title + required}</nav>
                      <input type="text" name="${i}" class="form-control number${integer}" value="${(settings.data[i].value == null) ? "" : settings.data[i].value}">
                      <span class="errorMsg color_pink"></span>
                    </div>
                  </fieldset>
                </div>`;
          break;
        case "multiSelect":
          MultiSelectSet[i] = {
            "addable": 1
          };
          content += `<div class="col-md-12 box_inputdata">
                  <fieldset>
                    <div class="form-group">
                      <nav>${settings.data[i].title + required}</nav>
                      <select name="${i}" class="form-control" multiple data-placeholder="(可複選)">
                      </select>
                      <span class="errorMsg color_pink"></span>
                    </div>
                  </fieldset>
                </div>`;
          break;
        case "label":
        case "textarea_label":
          var isTextarea = (settings.data[i].type == "textarea_label") ? " textareaSize scrollbar" : "";
          var navPosition = (settings.data[i].type == "textarea_label") ? " style='vertical-align: top;'" : "";
          var value = (settings.data[i].value) ? settings.data[i].value : "&nbsp;";
          if (Array.isArray(value)) {
            value = value.join(", ");
          }
          value = value.toString().replace(/\n/g, "<br/>");
          content += `<div class="col-md-12 box_inputdata">
                  <fieldset class="disabled">
                    <div class="form-group">
                      <nav${navPosition}>${settings.data[i].title}</nav>
                      <span class="form-control labelText${isTextarea}">${value}</span>
                      <input type='hidden' name="${i}" value="${settings.data[i].value}">
                    </div>
                  </fieldset>
                </div>`;
          break;
        case "textarea":
          content += `<div class="col-md-12 box_inputdata">
                <fieldset>
                  <div class="form-group">
                    <nav style="vertical-align: top;">${settings.data[i].title + required}</nav>
                    <textarea name="${i}" class="form-control textareaSize">${settings.data[i].value}</textarea>
                    <span class="errorMsg color_pink"></span>
                  </div>
                </fieldset>
              </div>`;
          break;
        case "boolean":
          content += `<div class="col-md-12 box_inputdata">
                            <fieldset>
                                <div class="form-group">
                                    <nav style="vertical-align: top;">${settings.data[i].title + required}</nav>
                                    <span><i class="fa fa-check-circle fa-2x"></i></span>
                                </div>
                            </fieldset>
                      </div>`
          break;
      } //switch
    } //for loop
    this.html(content);
    //---------------datepTimeicker
    if (this.find("[data-picker='datetime']").length) {
      var value = (uuid) ? $(this).val() : fw_now;
      this.find("[data-picker='datetime']").kendoDateTimePicker({
        culture: "zh-TW",
        format: "yyyy/MM/dd HH:mm",
        timeFormat: "HH:mm",
        value: value,
        interval: 5
      });
    } //end of if
    //---------------datepTimeicker
    //---------------datepicker
    if (this.find("[data-picker='date']").length) {
      var value = (uuid) ? $(this).val() : fw_now;
      this.find("[data-picker='date']").kendoDatePicker({
        culture: "zh-TW",
        format: "yyyy/MM/dd",
        value: value
      });
      this.find("[data-picker='date']").on('click', function () {
        $(this).data("kendoDatePicker").open();
      });
    } //end of if
    //---------------datepicker

    for (i of fw_noAddable) {
      if (MultiSelectSet[i] != undefined) {
        MultiSelectSet[i] = {
          "addable": 0
        };
      }
    }
    for (i in MultiSelectSet) {
      if (!fw_listUrl[i]) {
        continue;
      }
      $("[name='" + i + "']").createMultiSelect({
        url: fw_listUrl[i],
        value: settings.data[i].value,
        addable: MultiSelectSet[i].addable
      }); //createMultiSelect
    }
  }; //end of createForm

  $.fn.createMultiSelect = function (options) {
    var settings = $.extend({
      url: "",
      value: "",
      addable: 0,
    }, options);
    var addBtn = (settings.addable) ? "<br/>新增此選項&nbsp;<nav class='add  multiple' data-name='" + this.attr("name") + "'>+</nav> " : "";
    this.kendoMultiSelect({
      dataSource: {
        transport: {
          read: {
            type: "GET",
            url: settings.url,
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
      filtering: function (e) {
        if (e.filter != undefined) {
          filter = e.filter;
        }
      },
      value: settings.value,
      noDataTemplate: "<span class='nodata'>查無資料 " + addBtn + "</span>"
    });
  } // end of createMultiSelect

  $.fn.formCheck = function (options) {
    var settings = $.extend({
      name: "",
      dataProccessing: "formDetail;//",
      otherCheck: []
    }, options);
    var formDetail = new Object();
    var processedData = new Object();
    var postData = new FormData();
    $(window).scrollTop(0);
    $(".errorMsg").text("");
    $(".invalidInput").removeClass("invalidInput");
    this.find("input,select,textarea").each(function () {
      if ($(this).attr("name") == undefined) {
        return;
      }
      if (fw_isRequired[$(this).attr("name")] == undefined) {
        return;
      }
      formDetail[$(this).attr("name")] = $(this).val();
      if (fw_isRequired[$(this).attr("name")].type != "multiSelect") {
        formDetail[$(this).attr("name")] = $(this).val().trim();
      }
      if (!formDetail[$(this).attr("name")].length && fw_isRequired[$(this).attr("name")].required) {
        var action = (fw_isRequired[$(this).attr("name")].type.search(/(multiSelect|dropDown)/g) > -1) ? "請選擇" : "請輸入";
        $(this).errorMsg({
          message: action + fw_isRequired[$(this).attr("name")].title
        });
      }
    }) //enf of each
    this.find("input[name*='Email']").each(function () {
      if (!checkEmail($(this).val().trim())) {
        $(this).errorMsg({
          message: "請輸入正確Email"
        });
      }
    }) //check email
    this.find("input[data-picker^='date']").each(function () {
      if (!checkDate($(this).val().trim())) {
        $(this).errorMsg({
          message: "請輸入正確日期格式"
        });
      }
    }) //check date
    formDetail = eval(settings.dataProccessing + "(this,formDetail)");

    if (!$(".invalidInput").length) {
      formDetail[fw_id] = (uuid.length) ? uuid : 0;
      this.find("input:text,input:hidden,textarea").each(function () {
        if ($(this).attr("name") == undefined) {
          return;
        }
        if (!$(this).val().length && (typeof formDetail[$(this).attr("name")]) != "object") {
          formDetail[$(this).attr("name")] = null;
        } else if ($(this).attr("name").search(/(Date)/g) > -1) {
          formDetail[$(this).attr("name")] = new Date(formDetail[$(this).attr("name")]);
        } else if ($(this).is(".number.integer") && !isNaN(formDetail[$(this).attr("name")])) {
          formDetail[$(this).attr("name")] = parseInt(formDetail[$(this).attr("name")]);
        } else if ($(this).hasClass("number") && !isNaN(formDetail[$(this).attr("name")])) {
          formDetail[$(this).attr("name")] = Number(formDetail[$(this).attr("name")]);
        }
      })
    } // main data
    processedData[settings.name] = formDetail;

    // other data
    for (i of settings.otherCheck) {
      processedData[i] = eval(i + "();");
    }
    if ($(".invalidInput").length) {
      $(window).scrollTop($(".invalidInput:eq(0)").offset().top - 40);
      return false;
    }
    for (i in processedData) {
      postData.append(i, new Blob([JSON.stringify(processedData[i])], {
        type: "application/json"
      }));
    }
    if (fw_FileUpload) {
      var attachDetail = fw_formData.response.attachment;
      var attachments = {
        "relateUuid": (uuid.length) ? uuid : "0",
        "attachmentCoreUuid": attachDetail.attachmentCoreUuid,
        "verifyToken": (attachDetail.verifyToken) ? attachDetail.verifyToken : "0",
        "deleteFiles": fw_deletedFiles
      }
      if (fw_uploadFiles.length) {
        $("#fileupload .theprogress > .progress").show();
        $(window).scrollTop($("#fileupload").offset().top - 100);
        postData.append("attachment", new Blob([JSON.stringify(attachments)], {
          type: "application/json"
        }));
        for (i in fw_uploadFiles) {
          postData.append("uploadFiles", fw_uploadFiles[i].file);
          showUploadProgress(fw_uploadFiles[i]);
        }
      } else {
        if (fw_FileUpload.afterUpload) {
          eval(fw_FileUpload.afterUpload + "()");
        }
      }
    } //fw_FileUpload

    return postData;
  } //form checking

  $.fn.errorMsg = function (options) {
    var settings = $.extend({
      message: ""
    }, options);
    this.closest(".form-group,td").find(".errorMsg").text(settings.message)
    this.addClass("invalidInput");
    this.parent(".k-multiselect").addClass("invalidInput");
    this.closest(".k-datepicker").addClass("invalidInput").find("input").removeClass("invalidInput");
    this.closest(".k-datetimepicker").addClass("invalidInput").find("input").removeClass("invalidInput");
    this.closest(".k-dropdown").addClass("invalidInput").find("input").removeClass("invalidInput");
  } // end of errorMsg

  function fw_confirmBoxSetting() {
    var confirmBox;
    this.init = function (options) {
      var settings = $.extend({
        content: "",
        confirmBtnText: "",
        confirmBtn: "",
        cancelBtnText: "",
        cancelBtn: "",
        confirmEvent: "//",
        cancelEvent: "//"
      }, options);

      var template = `<div id="fw_confirmBox">
      <div class="container" style="width:auto">
        <div class="row">
          <div class="col-sm-12 confirmInfo">
          </div><!--col-->
        </div><!--row-->
        <div class="row">
          <div class="col-sm-6 confirmBtn">
            <button type="button" class="btn backBtn circleBtn white" >
              是
            </button>
          </div><!--col-->
            <div class="col-sm-6 cancelBtn">
              <button type="button" class="btn btn-success circleBtn white" >
                否
              </button>
            </div><!--col-->
          </div><!--row-->
      </div><!--container-->
      </div>`;
      $("body").append(template);
      $("#fw_confirmBox .confirmInfo").html(settings.content);
      this.box = $("#fw_confirmBox");
      confirmBox = $("#fw_confirmBox").kendoWindow({
        modal: true,
        width: "30%",
        height: '280px',
        resizable: false,
        visible: false,
        open: function () {
          $("body").addClass("overlay");
        },
        close: function () {
          $("body").removeClass("overlay");
        }
      }).data('kendoWindow');

      $("#fw_confirmBox .confirmBtn button").click(function () {
        $(this).delay(0).queue(function () {
          eval(settings.confirmEvent + "()");
          $(this).dequeue();
        }).delay(1500).queue(function () {
          confirmBox.close();
          $(this).dequeue();
        })
      }) //comfirm delete

      $("#fw_confirmBox .cancelBtn button").click(function () {
        $(this).delay(0).queue(function () {
          eval(settings.cancelEvent + "()");
          $(this).dequeue();
        }).delay(100).queue(function () {
          confirmBox.close();
          $(this).dequeue();
        })
      }) //cancel
    } //init

    this.show = function (options) {
      confirmBox.open();
      confirmBox.center();
    } //show
  }
  fw_confirmBox = new fw_confirmBoxSetting();

  //------input positive integer or number only
  var origin
  $("body").on("contextmenu keydown", ".number", function () {
    origin = $(this).val();
  });
  $("body").on("input", ".number", function () {
    if (!$(this).val().length) {
      $(this).val('');
    } else if ($(this).val() != Number($(this).val())) {
      $(this).errorMsg({
        message: "請輸入數字"
      });
      $(this).val(origin);
    } else if ($(this).val() != parseInt($(this).val()) && $(this).hasClass("integer")) {
      $(this).errorMsg({
        message: "請輸入數字"
      });
      $(this).val(origin);
    } else if (parseInt($(this).val()) < 0) {
      $(this).val(origin);
      $(this).errorMsg({
        message: "請輸入不小於0之整數"
      });
    }
    var obj = $(this)
    setTimeout(function () {
      obj.removeClass("invalidInput");
      obj.next(".errorMsg").text("");
    }, 2000);
  });
  //------input positive integer only

  $("body").on("click", ".k-nodata .add.multiple", function () {
    var MultiSelect = $("[name='" + $(this).attr("data-name") + "']").data("kendoMultiSelect");
    var dataSet = $("[name='" + $(this).attr("data-name") + "']").val();
    MultiSelect.dataSource.fetch(function () {
      dataSet.push(filter.value);
      MultiSelect.dataSource.add({
        "value": filter.value,
        "text": filter.value
      });
      MultiSelect.value(dataSet);
    });
  }) // add multipleSelect option

  $("body").on("click", ".k-nodata .add.single", function () {
    var cell = $(".k-dropdown-wrap.k-state-active + [name='" + $(this).attr("data-name") + "']").data("kendoDropDownList");
    cell.dataSource.fetch(function () {
      cell.dataSource.add({
        "value": filter.value,
        "text": filter.value
      });
      cell.select(1);
    });
  }) // add dropDown option
}) //$(function ()

function checkEmail(email) {
  return (!email.length || email.search(/^([A-Za-z0-9]).+@.+\..+/g) > -1) ? true : false;
}

function checkDate(date) {
  return (date.length && isNaN(Date.parse(date))) ? false : true;
}

function checkEmpty() {
  $("input, select, textarea").on("keyup change", function () {
    if ($(this).closest(".box_inputdata,td").find(".invalidInput")) {
      var value = (Array.isArray($(this).val())) ? $(this).val() : $(this).val().trim();
      if (value.length) {
        $(this).closest(".box_inputdata,td").find(".invalidInput").removeClass("invalidInput");
        $(this).closest(".box_inputdata,td").find(".errorMsg").text("");
      }
    }
  }) //keyup change
}

function setUploadingEvent() {
  $("#selectFile").click(function () {
    $("input[name='upload']").trigger("click");
  })
  $("#removeAllFile").click(function () {
    fw_uploadFiles = [];
    $("input[name='upload']").val("");
    $("#fileInfo").html("");
    $(this).hide();
    $("#fileupload .fileError").removeClass("color_pink");
  })
  $("body").on("click", ".delSingleFile", function () {
    var fId = $(this).closest(".theprogress").attr("data-upload");
    $(this).closest(".theprogress").remove();
    var fileDetail = fw_uploadFiles.find(item => item.fileId == fId);
    var index = fw_uploadFiles.indexOf(fileDetail);
    fw_uploadFiles.splice(index, 1);
    fw_totalFileSize -= (fileDetail.file.size / (1024 * 1024));
    if (fw_totalFileSize < 10) {
      $("#fileupload .fileError").removeClass("color_pink");
    }
    if ($("#fileInfo .theprogress").length <= 1) {
      $("#removeAllFile").hide();
    }
  }) //delSingleFile

  $("body").on("click", ".dlBtn .delFile", function () {
    fw_deletedFiles.push($(this).closest(".dlBtn").attr("fileId"));
    $(this).closest(".dlBtn").remove();
  }) //delFile
  $("input[name='upload']").change(function (e) {
    fw_totalFileSize = fw_attachSize;
    $("#removeAllFile").hide();
    if ($(this)[0].files) {
      $("#removeAllFile").css("display", "inline-block");
      for (i in $(this)[0].files) {
        if (isNaN(i)) {
          continue;
        }
        var fileSize = $(this)[0].files[i].size / (1024 * 1024);
        $("#fileSelectedTemplate .fileName").text($(this)[0].files[i].name);
        $("#fileSelectedTemplate .fileSize").text(`${fileSize.toFixed(3)} MB`)
        $("#fileSelectedTemplate section").attr("data-upload", fw_fileId)
        $("#fileInfo").append($("#fileSelectedTemplate").html());
        if ($(this)[0].files[i].type.search(/(pdf|image)/g) < 0) {
          $("#fileInfo > .theprogress:last .error").text("檔案類型不符");
          $("#fileInfo > .theprogress:last").delay(700).fadeOut(600).delay(500).queue(function () {
            if ($("#fileInfo .theprogress").length <= 1) {
              $("#removeAllFile").hide();
            }
            $(this).remove();
            $(this).dequeue();
          });
          continue;
        } //if
        fw_totalFileSize += fileSize;
        fw_uploadFiles.push({
          "fileId": fw_fileId,
          "file": $(this)[0].files[i]
        });
        fw_fileId++;
      } //loop
      if (fw_totalFileSize > 10) {
        $("#fileupload .fileError").addClass("color_pink");
        $(window).scrollTop($("#fileupload").offset().top - 10);
      }
    }
  });
} //setUploadingEvent

function showUploadProgress(file) {
  var formData = new window.FormData();
  formData.append('thefile', file.file);
  $.ajax({
    xhr: function () {
      $(`#fileInfo .theprogress[data-upload='${file.fileId}'] .progress`).show();
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          percentComplete = parseInt(percentComplete * 100);
          $(`#fileInfo .theprogress[data-upload='${file.fileId}'] .progress-bar`).css("width", percentComplete + "%")
          if (percentComplete === 100) {
            $(`#fileInfo .theprogress[data-upload='${file.fileId}']`).delay(800).fadeOut(300).delay(500).queue(function () {
              if ($("#fileInfo .theprogress").length <= 1) {
                if (fw_FileUpload.afterUpload) {
                  eval(fw_FileUpload.afterUpload + "()");
                }
              }
              $(this).remove();
              $(this).dequeue();
            })
          }
        }
      }, false);
      return xhr;
    },
    url: '/api/yarn/ingredient',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    method: (uuid.length) ? "POST" : "PUT",
    success: function (data) {}
  });
}
