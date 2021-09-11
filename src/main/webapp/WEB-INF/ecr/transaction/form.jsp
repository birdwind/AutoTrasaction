<%--
  Created by IntelliJ IDEA.
  User: birdw
  Date: 4/13/2021
  Time: 12:18 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <script>
    var uuid = "${uuid}";
    let pageType = "form";
  </script>
  <script src="${webapps.contextPath}/scripts/formTemplate.js"></script>
  <script src="${webapps.contextPath}/scripts/modules/module/transaction/form.js"></script>
</head>
<body>
<div class="row">
  <div class="col-md-12">
    <%--懸浮按鈕--%>
    <div class="box_features">
      <button type="button" class="btn white left" style="display:none;">
        <i class="fa fa-angle-double-left"></i>
      </button>
      <button type="button" onclick="window.history.back()" class="btn circleBtn white">
                <span class="fa-stack">
                    <i class="fa fa-circle fa-stack-2x icon-background" style="color: #D75A4A;"></i>
                    <i class="fa fa-reply fa-stack-1x"></i>
                </span>
      </button>
      <button id="save" type="button" class="btn circleBtn white fa-stack">
                <span class="fa-stack">
                    <i class="fa fa-circle fa-stack-2x icon-background" style="color: #28a745;"></i>
                    <i class="fa fa-plus fa-stack-1x"></i>
                </span>
      </button>
      <button type="button" class="btn white right">
        <i class="fa fa-angle-double-right"></i>
      </button>
    </div>
    <%--懸浮按鈕--%>
    <div class="card">
      <div id="form" class="card-body"></div>
    </div>
  </div>
</div>
</body>
</html>
