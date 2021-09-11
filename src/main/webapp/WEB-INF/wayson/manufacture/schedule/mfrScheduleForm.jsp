<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <link rel="stylesheet" href="/styles/windowUI.css" />
  <script>
    var uuid = "${uuid}";
    var station = "${station}";
  </script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <script src="${webapps.contextPath}/scripts/manufacture/schedule/mfrScheduleForm.js"></script>

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
                    <button id="save" type="button" class="btn btn-success circleBtn white"><i
                        class="fa fa-floppy-o"></i></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div>
                  <!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <div id="form" class="box-body">
                      <!--#form-->
                    </div>
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