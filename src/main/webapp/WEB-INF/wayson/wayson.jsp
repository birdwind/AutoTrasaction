<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<!DOCTYPE html>
<html>

<head>
  <title>SNBDC</title>
  <meta name="_csrf" content="${_csrf.token}"/>
  <meta name="_csrf_header" content="${_csrf.headerName}"/>

  <%-- 使用 template 的 css 與 js --%>
  <link rel="stylesheet" href="${webapps.contextPath}/styles/modules/home.css"/>
  <script type="text/javascript" src="${webapps.contextPath}/scripts/modules/home.js"></script>
  <%--  使用 wayson 的 css 與 js --%>
  <script type="text/javascript" src="${webapps.contextPath}/wayson/scripts/wayson.js"></script>
</head>

<body>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box-body no-padding">
          <div>資訊串流</div>
          <br>
          <br>
          <section id="grid">
          </section>
        </div><!-- box-body-->
      </div><!-- col-->
    </div><!-- row-->
  </section><!-- content-->
</div><!-- content-wrapper-->
</body>

</html>
