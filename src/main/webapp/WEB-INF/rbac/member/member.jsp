<%@ page language="java" pageEncoding="UTF-8"
         trimDirectiveWhitespaces="true" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<!DOCTYPE html>
<html>

<head>
  <meta name="_csrf" content="${_csrf.token}"/>
  <meta name="_csrf_header" content="${_csrf.headerName}"/>
  <title>
    <spring:message code="MemberAuth.Function.Member"/>
  </title>
  <link rel="stylesheet" href="${webapps.contextPath}/styles/modules/member/grid.css"/>
  <!-- 用js產HTML -->
  <script type="text/javascript"
          src="${webapps.contextPath}/scripts/modules/member/memberHTML.js"></script>
  <script type="text/javascript"
          src="${webapps.contextPath}/scripts/modules/member/grid.js"></script>
</head>

<body>
<main>
  <div id="member_data"></div>
</main>
</body>

</html>
