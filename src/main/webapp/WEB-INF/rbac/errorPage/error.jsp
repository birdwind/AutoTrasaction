<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<!DOCTYPE html>

<html>

<head>
  <title>${error.statusCode}</title>
  <meta name="_csrf" content="${_csrf.token}"/>
  <meta name="_csrf_header" content="${_csrf.headerName}"/>

  <link rel="stylesheet" href="${webapps.contextPath}/styles/errorPage.css"/>
</head>

<body>

<div class="uk-container align-center">
  <div id="notfound">
    <div class="notfound-bg">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="notfound">
      <div class="notfound-404">
        <h1>${error.statusCode}</h1>
      </div>
      <h2>${error.errorMessage}</h2>
      <p>${error.requestUrl} </p>
      <button class="btn btn-success white" style="width:100px" onclick="location='/'"><i class="fa fa-home"></i> 首頁</button>&emsp;
      <button href="javascript:void(0)" onclick="window.history.back()" class="btn backBtn white color_white" style="width:100px">上一頁<i class="fa fa-reply"></i></button>
    </div>
  </div>
</div>

</body>

</html>
