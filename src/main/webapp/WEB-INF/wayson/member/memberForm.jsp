<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <script src="${webapps.contextPath}/scripts/member/memberForm.js"></script>
  <link rel="stylesheet" href="/styles/windowUI.css" />
  <style>
    .box {
      margin-bottom: 0px;
    }

    #inquiry .form-control {
      display: inline-block;
    }

    #addBtn.btn-success {
      color: #fff;
      background-color: #3399ff;
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


    .delDetialBtn.btn-success {
      color: #fff;
      background-color: #D75A4A;
    }

    .table_bar_box {
      display: inline-block;
      width: 110px;
      margin: 0 -15px;
      line-height: 35px;
      font-size: larger;
    }

    .k-header.k-grid-toolbar {
      background-color: #337ab7;
      border-color: #337ab7;
    }

    .box-body-detail {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
      padding: 10px;
    }

  </style>
  <script>
    var uuid = "${uuid}";

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
                    <button type="button" onclick="location='/page/member'" class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white"></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div>
                  <!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <div id="form" class="box-body">
                    </div>
                    <!--#form-->

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
  <section id="details" style="display:none;">
    <div class="col-md-12 box_inputdata">
      <ul id="details-treeview" class="sidebar-menu tree" data-widget="tree">
        <div class="panel panel-primary" style="padding-bottom:20px;">
          <li class="treeview">
            <a href="javascript:void(0)">
              <div class="k-header k-grid-toolbar">
                <div class="col-sm-z col-xs-6 table_bar_box " style="margin-buttom:60px">詳細資料
                </div>
                <%-- <i class="k-icon k-i-arrow-60-down" style="float:right;height:35px ;width:50px"></i> --%>
                <button id="addBtn" type="button" class="btn btn-success circleBtn white"
                  style="float:right;margin-right:60px;height:35px ;width:35px"><i class="fa fa-plus "></i></button>

              </div>
            </a>

            <%-- <button id="DelOneBtn" type="button" class="btn btn-success circleBtn white delDetialBtn"
              style="float:right;height:35px ;width:35px;display:none"><i class="fa fa-times "></i></button> --%>
            <ul class="detailTreeview">
              <div class="deleteBtnDiv" style="border-top-color: #337ab7;"><button type="button"
                  class="btn btn-success circleBtn white delDetialBtn"
                  style="float:right;margin-top:10px;margin-bottom:10px;margin-right:65px;height:35px ;width:35px;display:none"><i
                    class="fa fa-times"></i></button></div>
              <div class="box-body">
                <!--box-body-->

                <div class="detailBox" style="padding-bottom:40px">
                  <div class="memberDetails" style="border-color: #3399ff;">
                  </div>
                </div>

                <!--box-->
              </div>

            </ul>
          </li>
        </div>
      </ul>
    </div>
  </section>
  <section id="passWordBtnTemplate" style="display:none;">
    &emsp;
    <button type="button" class="btn btn-success white rePassword">修改密碼</button>
  </section>
  <section id="checkboxTemplate" style="display:none;">
    &emsp;
    <label id="loginCheckbox" class="checkbox">
      <input type="checkbox" name="isMember" class="loginCheck">
      <span class="checkmark"> </span>
    </label><label>&emsp;可登入</label>
  </section>
  <section id="purchaseTemplate" style="display:none;">
    <table>
      <tr>
        <td>
          <input type="text" class="form-control" name="yarnCore">
          <span class="errorMsg color_pink"></span>
        </td>
        <td>
          <input type="text" name="purchaseAmount" class="form-control number">
          <span class="errorMsg color_pink"></span>
        </td>
        <td>
          <input type="text" name="purchaseUnit" class="form-control number">
          <span class="errorMsg color_pink"></span>
        </td>
        <td>
          <input type="text" name="warpWeft" class="form-control number">
          <span class="errorMsg color_pink"></span>
        </td>
        <td class="center">
          <a href="javascript:void(0)" class="table_btn table_btn_purple">
            <i class="fa fa-pencil"></i>
          </a>
        </td>
        <td class="center">
          <a href="javascript:void(0)" class="table_btn table_btn_purple">
            <i class="fa fa-pencil"></i>
          </a>
        </td>
        <td class="center">
          <input type="text" name="destinationCompany" class="form-control">
          <span class="errorMsg color_pink"></span>
        </td>
        <td class="center">
          <input type="text" name="expectArrivalTime" class="form-control">
          <span class="errorMsg color_pink"></span>
        </td>
        <td class="center">
          <input type="text" name="purchasePrice" class="form-control number">
          <span class="errorMsg color_pink"></span>
        </td>
        <td class="center">
          <span name="amountPrice"></span>
        </td>
        <td class="center">
          <a href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle">
            <i class="fa fa-times"></i>
          </a>
        </td>
      </tr>
    </table>
  </section>
  <%-- <section id="confirmTemplate" style="display:none;">
    <section class="deleteIcon">
      <i class="fa fa-lock" style="font-size:30px">
      </i>
    </section>
    <br>
    <div class="col-md-12 box_inputdata">
      <fieldset>
        <div class="form-group">
          <nav>新密碼</nav>
          <input t type="password" name="newPassword" class="form-control" style="height:50%;width:50%">
        </div>
      </fieldset>
    </div>
    <div class="col-md-12 box_inputdata">
      <fieldset>
        <div class="form-group">
          <nav>確認密碼</nav>
          <input t type="password" name="checkNewPassword" class="form-control" style="height:50%;width:50%">
        </div>
      </fieldset>
      <span class="errorMsg color_pink" style="height:10%;width:10%"></span>
    </div>
  </section> --%>
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
