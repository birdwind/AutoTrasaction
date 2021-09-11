<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <link rel="stylesheet" href="/styles/windowUI.css" />
  <style>
    .form-label-group>input,
    .form-label-group>label {
      padding: 0.75rem;
    }

    input {
      text-indent: 20px;
    }

    .bg_loginid {
      background: no-repeat url(/images/round-account-button-with-user-inside.png);
      background-size: 27px;
    }

    .form-label-group>label {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      margin-bottom: 0;
      line-height: 1.8;
      color: #3399ff;
      pointer-events: none;
      cursor: text;
      border: 1px solid transparent;
      border-radius: .25rem;
      transition: all .1s ease-in-out;
    }

    .k-confirm .k-window-titlebar::before {
      content: '提示';
    }

    .k-confirm .k-window-titlebar .k-dialog-title {
      display: none;
    }

    #password_confirmBox {
      margin: 10px;
      padding-top: 30px;
    }

    #password_confirmBox .row>div {
      padding: 0px;
      text-align: center;
    }

    #password_confirmBox .invisible {
      display: none;
    }


    .cancelBtn,
    .cancelBtn:hover {
      color: #D75A4A;
    }

    #listbox {
      margin: 10px;
      padding-top: 30px;
    }

    #listbox .row>div {
      padding: 0px;
      text-align: center;
    }

    #listbox .row>.confirmBtn {
      text-align: right;
    }

    #listbox .k-listbox {
      width: 236px;
      height: 310px;
      margin-bottom: 30px;
    }

    #listbox .k-item {
      cursor: move;
    }

    #listbox .k-item:hover,
    #listbox .k-item.k-state-selected {
      color: white;
      background-color: #74b4f5;
    }

    #listbox .k-button {
      background-color: #3399ff;
      color: white;
    }

    #listbox .k-button.k-state-disabled {
      background-color: #74b0ec;
    }

  </style>
  <script src="${webapps.contextPath}/scripts/member/memberGrid.js"></script>

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
                <li class="active"><a href="/page/cloth/weaving/sop"></a></li>
              </ol>
            </section>
            <section id="member">
            </section>
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
    <div class="col-sm-4 col-xs-6 table_bar_box">
      <a href="/page/member/form" class="btn" id="addbtn"><i class="fa fa-plus"></i></a>
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
  <div id="listbox">
    <div class="container" style="width:auto">
      <div class="userName col-sm-12">
        <b>當前帳號: SNBDC_ADMIN</b>
      </div>

      <div class="row title">
        <div class="col-sm-7">
          <br>
          <b></b>
        </div>
        <!--col-->
        <div class="col-sm-2">
          <br>
          <b></b>
        </div>
        <!--col-->
      </div>
      <!--row-->
      <div class="row">

        <div class="col-sm-12 list">

          <select id="current">
          </select>
          <select id="available"></select>
        </div>
        <!--col-->
      </div>
      <!--row-->
      <div class="row">
        <div class="col-sm-12 confirmBtn">
          <button type="button" class="btn btn-success circleBtn white">
            <i class="fa fa-floppy-o"></i>
          </button>
        </div>
        <!--col-->
      </div>
      <!--row-->
    </div>
    <!--container-->
  </div>
  <span id="notification"></span>
  <div id="password_confirmBox">
    <div class="container" style="width:auto">
      <div class="row">
        <div class="col-sm-12 confirmInfo">
          <section class="deleteIcon">
            <i class="fa fa-lock" style="font-size:30px">
            </i>
          </section>
          <br>
          <div class="col-md-12 box_inputdata">
            <fieldset>
              <div class="form-group">
                <nav>新密碼</nav>
                <input t type="password" name="password" class="form-control" style="height:50%;width:50%">
                <br>
                <span class="errorMsg color_pink"></span>
              </div>
            </fieldset>
          </div>
          <div class="col-md-12 box_inputdata">
            <fieldset>
              <div class="form-group">
                <nav>確認密碼</nav>
                <input t type="password" name="confirmPassword" class="form-control" style="height:50%;width:50%">
                <br>
                <span class="errorMsg color_pink"></span>
              </div>
            </fieldset>
            <span class="errorMsg color_pink" style="height:10%;width:10%"></span>
          </div>
        </div>
        <!--col-->
      </div>
      <!--row-->
      <div class="row">
        <div class="col-sm-6 confirmBtn">
          <button type="button" class="btn backBtn circleBtn white">
            OK
          </button>
        </div>
        <!--col-->
        <div class="col-sm-6 cancelBtn">
          <button type="button" class="btn btn-success circleBtn white">
            X
          </button>
        </div>
        <!--col-->
      </div>
      <!--row-->
    </div>
    <!--container-->
  </div>;
  <%-- passwordWidow --%>
</body>

</html>
