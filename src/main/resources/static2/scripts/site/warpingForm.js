var yarnList = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/import/yarn/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
var importer = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/import/importer/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});

var warehouse = new kendo.data.DataSource({
  transport: {
    read: {
      url: "/api/yarn/import/warehouse/list",
      dataType: "json"
    }
  },
  schema: {
    data: function (data) {
      return data.response
    }
  }
});
var fw_IsUploadFile, fw_uploadFiles = [], fw_deletedFiles = [];
var fw_fileId = 1, fw_totalFileSize = 0, fw_attachSize = 0;
var fw_uploadPanel=`
<div id="fileupload" class="box-body">
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
</div>
<div class="col-md-12 box_inputdata">
  <fieldset style="margin-left:15%;">
      <span id="fileInfo">
      </span>
      <span id="fileList">
      </span>
  <fieldset>
</div>
</div><!--#fileupload-->`
var fw_fileTemplate=`
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
$(function(){
  $("body").append("<span id='noti'></span>");
      noti = $("#noti").kendoNotification({
          templates: [{
            type: "saveOrInsert",
            template: "<div class='saveOrInsert zoominTrans'>儲存成功</span>" + fw_checkMrak + "</div>"
          }
          ],
          autoHideAfter: 1500
    }).data("kendoNotification");
    $("#save").click(function(){
      noti.show({}, "saveOrInsert")
      setNoificationPosition();
      setTimeout(function () {
        $(".drawCheck").hide().delay(460).queue(function () {
          window.history.back();
          $(this).dequeue();
        });
      }, 1000);
    })
  $("#form").after(fw_uploadPanel);
  $("body").append(fw_fileTemplate);
  setUploadingEvent();
  if ($("#form").find("[data-picker='datetime']").length) {
    $("#form").find("[data-picker='datetime']").kendoDateTimePicker({
      culture: "zh-TW",
      format: "yyyy/MM/dd HH:mm",
      timeFormat: "HH:mm",
      value: fw_now,
      interval: 5
    });
  }//end of if

  $("[name='warpingNo']").kendoDropDownList({
    dataSource: yarnList,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//warpingNoDropDownList

  $("[name='importer']").kendoDropDownList({
    dataSource: importer,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//importerDropDownList

  $("[name='warehouse']").kendoDropDownList({
    dataSource: warehouse,
    dataTextField: "text",
    dataValueField: "value",
    optionLabel: " "
  });//warehouseDropDownList
})//$ functon
function setUploadingEvent(){
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
  })//delSingleFile

  $("body").on("click", ".dlBtn .delFile", function () {
    fw_deletedFiles.push($(this).closest(".dlBtn").attr("fileId"));
    $(this).closest(".dlBtn").remove();
  })//delFile
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
        $("#fileSelectedTemplate .fileSize").text(fileSize.toFixed(3)+" MB");
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
        }//if
        fw_totalFileSize += fileSize;
        fw_uploadFiles.push({ "fileId": fw_fileId, "file": $(this)[0].files[i] });
        fw_fileId++;
      }//loop
      if (fw_totalFileSize > 10) {
        $("#fileupload .fileError").addClass("color_pink");
        $(window).scrollTop($("#fileupload").offset().top - 10);
      }
    }
  });
}//setUploadingEvent
