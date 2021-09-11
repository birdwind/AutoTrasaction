<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <link rel="stylesheet" href="/styles/windowUI.css" />
  <style>
    .k-edit-cell>.k-textbox,
    .k-edit-cell>.k-widget,
    .k-grid-edit-row>td>.k-textbox,
    .k-grid-edit-row>td>.k-widget,
    .k-grid-edit-row>td>.text-box {
      width: 90%;
    }

    .k-widget.k-tooltip-validation {
      border-color: #fafafa;
      background-color: #fafafa;
      color: #fafafa;
    }

    .table_bar_box {
      display: inline-block;
      width: 110px;
      margin: 0 -15px;
      line-height: 50px;
      font-size: larger;
    }

    .k-header.k-grid-toolbar {
      background-color: #337ab7;
      border-color: #337ab7;
      padding: 5px;
    }

    .box.box-success {
      border-top-color: #337ab7;
    }

    .btn-success {
      color: #fff;
      background-color: #3399ff;
    }

    .btn-success:hover,
    .btn-success:active,
    .btn-success.hover,
    .btn-success.active,
    .btn-success.focus,
    .btn-success:focus {
      background-color: #3343a4;
      border-color: #3343a4;
      color: #fff;
      color: #dad4d4;
    }

  </style>
  <script>
    var uuid = "${uuid}";
    var station = "${station}";

  </script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <script src="${webapps.contextPath}/scripts/manufacture/schedule/detail/mfrScheduleForm.js"></script>

</head>

<body class="hold-transition skin-green-light sidebar-mini">
  <div id="grid"></div>
  <div class="content-wrapper">
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box-body no-padding">
            <section class="content-header">
              <ol id="breadcrumb" class="breadcrumb">
                <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"></li>
              </ol>
            </section><!-- content-header -->
            <section class="content">
              <div class="row">
                <div class="col-md-12">
                  <div class="box_features">
                    <i class="fa fa-angle-double-left left" style="display:none; margin-right: 20px;"></i>
                    <button type="button" onclick="window.history.back()" class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                  </div>
                  <!--box_features-->
                  <div class="box box-success">
                    <div id="form" class="box-body">
                      <!--#form-->

                    </div>
                  </div>
                  <div>
                    <ul id="client-treeview" class="sidebar-menu tree" data-widget="tree">
                      <div id="warpYarns" class="panel panel-primary" style="padding-bottom:20px;">
                        <li class="treeview">
                          <a href="javascript:void(0)">
                            <div class="k-header k-grid-toolbar">
                              <div class="col-sm-4 col-xs-6 table_bar_box " style="margin-buttom:60px">經紗批號
                              </div>
                              <i class="k-icon k-i-arrow-60-down"
                                style="float:right;margin-right:5px;height:50px ;width:50px"></i>
                              <button id="saveBatch" type="button" class="btn btn-success circleBtn white"
                                style="float:right;margin-right:10px;height:50px ;width:50px"><i
                                  class="fa fa-floppy-o "></i></button>
                            </div>
                          </a>
                          <ul class="treeview-menu">
                            <div class="box-body">

                            </div>
                          </ul>
                        </li>
                      </div>
                    </ul>
                  </div>
                  <!--box-->
                  <div>
                    <ul id="client-treeview" class="sidebar-menu tree" data-widget="tree">
                      <div class="panel panel-primary" style="padding-bottom:20px;">
                        <li class="treeview">
                          <a href="javascript:void(0)">
                            <div class="k-header k-grid-toolbar ">
                              <div class="col-sm-4 col-xs-6 table_bar_box ">已有排程
                              </div>
                              <i class="k-icon k-i-arrow-60-down"
                                style="float:right;margin-right:5px;height:50px ;width:50px"></i>
                            </div>
                          </a>
                          <ul class="treeview-menu">
                            <div id="formGridExist">
                              <!--#grid-->
                            </div>
                          </ul>
                        </li>
                    </ul>
                  </div>
                  <!--col-->
                  <div>
                    <ul id="client-treeview" class="sidebar-menu tree" data-widget="tree">
                      <div class="panel panel-primary" style="padding-bottom:20px;">
                        <li class="treeview">
                          <a href="javascript:void(0)">
                            <div class="k-header k-grid-toolbar ">
                              <i class="k-icon k-i-arrow-60-down"
                                style="float:right;margin-right:5px;height:50px ;width:50px"></i>
                              <button id="save" type="button" class="btn btn-success circleBtn white"
                                style="float:right;margin-right:10px;height:50px ;width:50px"><i
                                  class="fa fa-floppy-o "></i></button>
                              <button id="addbtn" type="button" class="btn btn-success circleBtn white"
                                style="margin-right:50px;height:50px ;width:50px"><i class="fa fa-plus "></i></button>
                            </div>
                          </a>
                          <ul class="treeview-menu">
                            <div id="formGrid">
                              <!--#grid-->
                            </div>
                          </ul>
                        </li>
                    </ul>
                  </div>
                  <%-- <div class="box box-success">
                    <ul id="client-treeview" class="sidebar-menu tree" data-widget="tree">
                      <div>
                        <li class="treeview">
                          <a href="javascript:void(0)">
                            <div class="k-header k-grid-toolbar ">
                              <button id="save" type="button" class="btn btn-success circleBtn white"
                                style="float:right;margin-right:50px;height:50px ;width:50px"><i
                                  class="fa fa-floppy-o "></i></button>
                              <div class="col-sm-4 col-xs-6 table_bar_box">
                                <a href="javaScript:void(0)" class="btn" id="addbtn" style="height:50px;width:50px"><i
                                    class="fa fa-plus fa-2x" style="margin-top:3px"></i></a>
                              </div>
                              <i class="k-icon k-i-arrow-60-down"
                                style="float:right;margin-right:5px;height:50px ;width:50px"></i>
                            </div>
                          </a>
                          <ul class="treeview-menu">
                            <div id="formGridExist">
                              <!--#grid-->
                            </div>
                          </ul>
                        </li>
                    </ul>
                  </div> --%>
                  <div style="padding-bottom:100px;">

                    <!--box-->

                  </div>
                  <!--col-->
                </div>
                <!--row-->

            </section>
            <!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="saveBtn" style="display:none;">
    <a role="button" class="table_btn table_btn_blue k-grid-update editing" href="#"><i class="fa fa-floppy-o"></i></a>
  </div>
  <div id="canBtn" style="display:none;">
    <a role="button" class="table_btn table_btn_pink k-grid-cancel editing" href="#"><i class="fa fa-times"></i></a>
  </div>
  <div id="toolbar" style="display:none;">
    <button id="save" type="button" class="btn btn-success circleBtn white"
      style="float:right;margin-right:50px;height:50px ;width:50px"><i class="fa fa-floppy-o "></i></button>
    <div class="col-sm-4 col-xs-6 table_bar_box">
      <a href="javaScript:void(0)" class="btn" id="addbtn" style="height:50px;width:50px"><i class="fa fa-plus fa-2x"
          style="margin-top:3px"></i></a>
      <button id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></button>
    </div>
  </div>
  <div id="warpYarnsTemplate" style="display:none;">
    <div class="col-md-12 box_inputdata">
      <fieldset>
        <div class="form-group">
          <nav id="name">warpYarns</nav>
          <select name="warpYarnsExist" class="form-control" multiple data-placeholder="已有(可複選)">
          </select>
          <span class="errorMsg color_pink"></span>
        </div>
      </fieldset>
      <fieldset>
        <div class="form-group">
          <nav></nav>
          <select name="warpYarns" class="form-control" multiple data-placeholder="新增(可複選)">
          </select>
          <span class="errorMsg color_pink"></span>
        </div>
      </fieldset>
    </div>
  </div>
  <!--toolbar-->
  <script type="text/x-kendo-template" id="detail">
    #for(i in data){#
      #if (data[i] == null) {#
        #continue;#
      #} else if (data[i].title == undefined) {#
        #continue;#
      #}#
      <div class="col-md-12 box_inputdata">
        #if(data[i].type == "label" || data[i].type == "textarea_label"){#
          <fieldset class="disabled">
        #}else{#
          <fieldset>
        #}#
        <div class="form-group">
          #if(data[i].type == "textarea_label" || data[i].type == "textarea"){#
            <nav style="vertical-align: top;">#= data[i].title #
              #if(data[i].required == true){#
                <span class="color_pink">*</span>
              #}#
            </nav>
          #}else if(data[i].type =="hidden"){#
          #}else{#
            <nav>#= data[i].title #
              #if(data[i].required == true){#
                <span class="color_pink">*</span>
              #}#              
            </nav>
          #}#
          #switch(data[i].type){
            case "hidden":#
            <input type="hidden" name="#= i #" value="#=data[i].value#">
            #case "text":
            case "dropDown":
            case "date":
            case "datetime":#
            <input type="text" name="#= i #" class="form-control #=data[i].type#"  value="#=data[i].value#"
            #if(data[i].required == true){#
              required="required"
            #}#
            >
            <span class="errorMsg color_pink"></span>
            #break;
            case "textarea":#
            <textarea name="#= i #" class="form-control textareaSize"
            #if(data[i].required == true){#
              required="required"
            #}#
            >#=data[i].value#</textarea>
            <span class="errorMsg color_pink"></span>
            #break;
            case "label":#
            <span class="form-control labelText">#=data[i].value#</span>
            <input type="hidden" name="#= i #" value="#=data[i].value#"
            #if(data[i].required == true){#
              required="required"
            #}#
            >
            #break;
            case "textarea_label":#
            <span class="form-control labelText textareaSize scrollbar">#=data[i].value#<span>
            <input type="hidden" name="#= i #" value="#=data[i].value#"
            #if(data[i].required == true){#
              required="required"
            #}#
            >
            #break;
            }#
        </div>
        </fieldset>
      </div>
    #}#
  </script>
</body>

</html>
