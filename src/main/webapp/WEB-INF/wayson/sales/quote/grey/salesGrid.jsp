<%--
  Created by IntelliJ IDEA.
  User: birdwind
  Date: 2020/1/7
  Time: 11:55 上午
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <link rel="stylesheet" href="/styles/windowUI.css"/>
  <link rel="stylesheet" href="${webapps.contextPath}/styles/timeline_horizontal.css">
  <style>
    .fa.fa-star, .fa-star-o {
      display: inline;
      cursor: default;
    }
  </style>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <script src="${webapps.contextPath}/scripts/sales/quote/grey/salesGrid.js"></script>
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
              <li class="active"></li>
            </ol>
          </section>

          <div id="grid"></div>

        </div><!-- box-body-->
      </div><!-- col-->
    </div><!-- row-->
  </section><!-- content-->
</div><!-- content-wrapper-->
<div id="toolbar" style="display:none;">
  <div class="col-sm-4 col-xs-6 table_bar_box">
    <a href="/page/sales/quote/grey/form" class="btn"><i class="fa fa-plus"></i></a>
    <button id="trashBin" class="btn trashBin"><i class="fa fa-trash"></i></button>
  </div>
</div>
</div><!--toolbar-->
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


<script id="timelineTemplate" type="text/x-kendo-template">
  <div style="overflow: auto;">
    <div style="width: fit-content">
      <ul class="timeline" id="timeline"></ul>
    </div>
  </div>
</script>

<script id="timelineContentTemplate" type="text/x-kendo-template">
  #if(data.isPassed == null){#
  <li class="li">
    #}else{ if(data.isPassed) {#
  <li class="li complete">
    #}else{#
  <li class="li failed">
    #} }#

    <div class="status">
      <span class="title">#=data.title.value#</span>
    </div>
    <div class="timestamp">
      <span class="date bold" name="actualSignatureDate">#=data.actualSignatureDate.value#</span>
      <span name="content">#=data.content.value#</span>
      #if(data.clothYarns.value[0]){
      for(let index in data.clothYarns.value){#
      <span name="content" class="bold">#=data.clothYarns.value[index]#</span>
      #}#
      <span name="note">#=data.note.value#</span>
      #}else{#
      <span name="note" class="bold">#=data.note.value#</span>
      #}#
    </div>
  </li>
</script>

</body>
</html>
