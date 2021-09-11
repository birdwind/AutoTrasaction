<%@ page language="java" pageEncoding="UTF-8"
         trimDirectiveWhitespaces="true" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<!DOCTYPE html>
<html>

<head>
  <title></title>
  <meta name="_csrf" content="${_csrf.token}"/>
  <meta name="_csrf_header" content="${_csrf.headerName}"/>

  <!-- css -->
  <link rel="stylesheet" href="${webapps.contextPath}/styles/modules/member/create.css"/>
  <!-- end css -->

  <!-- js -->
  <script type="text/javascript">
    // 將表單欄位讀入
    memberCreateView = ${ view };
    console.log(memberCreateView);
  </script>
  <!-- 用js產HTML -->
  <script type="text/javascript"
          src="${webapps.contextPath}/scripts/modules/member/memberHTML.js"></script>
  <script type="text/javascript"
          src="${webapps.contextPath}/scripts/modules/member/create.js"></script>
  <script type="text/javascript"
          src="${webapps.contextPath}/scripts/modules/member/subroutine.js"></script>
  <!-- end js -->
</head>

<body>
<main>
  <div class="box box-success">
    <div class="box-header with-border">
      <h3 id="formTitle" class="box-title col-md-6 font-normal"></h3>
    </div>
    <div class="box-body">
      <!-- 表單 -->
      <form id="memberCreateForm" method="POST" class="form-horizontal">
      </form>
    </div>
  </div>

  <!-- 提示框 -->
  <div id="modal" class="modal fade">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;
          </button>
          <h4 class="modal-title"></h4>
        </div>
        <div class="modal-body">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default btn-back" data-dismiss="modal">
            <spring:message code="UI.Message.Back"/>
          </button>
        </div>
      </div>
    </div>
  </div><!-- end of 提示框 -->

  <!-- map -->
  <div id="mapWindow"></div>
</main>
</body>

</html>
