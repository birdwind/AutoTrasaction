<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <link rel="stylesheet" href="/styles/windowUI.css" />
  <style>
    .k-confirm .k-window-titlebar::before {
      content: '提示';
    }

    .k-confirm .k-window-titlebar .k-dialog-title {
      display: none;
    }

    span.k-widget.k-dropdown.k-header.k-dropdown-operator {
      display: none;
    }

    .k-edit-cell>.k-textbox,
    .k-edit-cell>.k-widget,
    .k-grid-edit-row>td>.k-textbox,
    .k-grid-edit-row>td>.k-widget,
    .k-grid-edit-row>td>.text-box {
      width: 96%;
    }

    .k-combobox,
    .k-combobox .k-input,
    .k-datepicker,
    .k-datepicker .k-input,
    .k-datetimepicker,
    .k-datetimepicker .k-input,
    .k-timepicker,
    .k-timepicker .k-input {
      background-color: #ffffff;
    }

  </style>
  <script src="${webapps.contextPath}/scripts/warehouse/StorageAreaManagement.js"></script>
  <script>
  </script>
</head>

<body class="hold-transition skin-green-light sidebar-mini">
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box-body no-padding">
            <section class="content-header">
              <ol id="breadcrumb" class="breadcrumb">
                <li><a href="/"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"><a href="/page/warehouse/storage"></a></li>
              </ol>
            </section>
            <div id="storageAreaManagement">
            </div>

          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
    <div class="col-sm-4 col-xs-6 table_bar_box">
      <a href="javaScript:void(0)" class="btn" id="addbtn"><i class="fa fa-plus"></i></a>
      <button id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></button>
    </div>
  </div>
  </div>
  <!--toolbar-->
  <section id="confirmTemplate" style="display:none;">
    <section class="deleteIcon">
      <i class="fa fa-file-text-o">
        <i class="fa fa-times"></i>
      </i>
      <div>
        <i class="fa fa-trash"></i>
      </div>
    </section>
    <h2>確定刪除？</h2>
  </section>
  <div id="saveBtn" style="display:none;">
    <a role="button" class="table_btn table_btn_purple k-grid-update editing" href="#"><img
        src="/images/icon_workflow/save.svg" height="50%" width="50%"></a>
  </div>
  <div id="canBtn" style="display:none;">
    <a role="button" class="table_btn table_btn_purple k-grid-cancel editing" href="#"><img
        src="/images/icon_workflow/cancel.svg" height="50%" width="50%"></a>
  </div>
</body>

</html>
