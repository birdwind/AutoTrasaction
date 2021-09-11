<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
  <style>
    .pills-tab {
      display: none;
    }
  </style>

  <script src="https://kendo.cdn.telerik.com/2018.2.620/js/cultures/kendo.culture.zh-TW.min.js"></script>
  <script src="${webapps.contextPath}/scripts/yarn/yarnHistory.js"></script>
  <script>
    uuid = "${uuid}";
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
                    <button type="button" onclick="location='/page/yarn/ingredient/form/${uuid}'"
                      class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                  </div><!--box_features-->
                  <div class="box box-success">
                    <div class="box-body">
                      <div class="row">
                        <div class="col-md-12 box_inputdata">
                          <fieldset disabled>
                            <div class="form-group">
                              <nav>紗號</nav>
                              <input type="text" id="yarnNo" class="form-control noborder">
                            </div><!--form-group-->
                          </fieldset>
                          <div class="col-md-12 ">
                            <a class="table_btn_status btn_lightpink" src="javascript:void(0)">
                              近1年平均:<span id="priceAverage1"></span>
                            </a>
                            <a class="table_btn_status btn_lightyellow" src="javascript:void(0)">
                              近2年平均:<span id="priceAverage2"></span>
                            </a>
                            <a class="table_btn_status btn_lightgreen" src="javascript:void(0)">
                              近3年平均:<span id="priceAverage3"></span>
                            </a>
                            <a class="table_btn_status btn_lightblue" src="javascript:void(0)">
                              近4年平均:<span id="priceAverage4"></span>
                            </a>
                            <a class="table_btn_status btn_lightpurple" src="javascript:void(0)">
                              近5年平均:<span id="priceAverage5"></span>
                            </a>
                          </div><!--col-->
                          <div align="right">
                            <%-- <nav style="width:200px"><input id="averageLabel"style="width:70px" class="form-control">年平均:</nav> --%>
                            <%-- <nav align="left" id="priceAverage" style="width:200px"></nav> --%>
                            <nav>單頁顯示筆數</nav>
                            <input id="gridPageSize" style="width:70px" class="form-control">
                          </div><!--align right-->
                          <div class="col-md-12">
                            <ul class="nav nav-pills mb-3 pills-tab historyprice">
                              <li class="nav-item active">
                                <a href="javascript:void(0)" class="nav-link active in" id="pills-home-tab" data-toggle="pill" aria-selected="true">
                                詢價</a>
                              </li>
                              <li class="nav-item">
                                <a href="javascript:void(0)" class="nav-link" id="pills-profile-tab" data-toggle="pill" aria-selected="false">
                                採購</a>
                              </li>
                              <li class="nav-item">
                                <a href="javascript:void(0)" class="nav-link" id="pills-contact-tab" data-toggle="pill" aria-selected="false">
                                進貨</a>
                              </li>
                              <li class="nav-item">
                                <a href="javascript:void(0)" class="nav-link" id="pills-c-tab" data-toggle="pill" aria-selected="false">
                                牌價</a>
                              </li>
                            </ul>
                            <ul class="nav nav-pills mb-3 pills-tab historycount">
                              <li class="nav-item active dan">
                                <a href="javascript:void(0)" class="nav-link active in" id="pills-home-tab" data-toggle="pill" aria-selected="true">
                                丹數</a>
                              </li>
                              <li class="nav-item">
                                <a href="javascript:void(0)" class="nav-link" id="pills-profile-tab" data-toggle="pill" aria-selected="false">
                                支數</a>
                              </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                              <div class="tab-pane fade show active in" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                <div class="boxline mt--s">
                                  <div id="table">
                                  </div><!--#table-->
                                  <div class="table-responsive" style="display:none;">
                                    <table class="table bg_white table-striped table-bordered table-hover">
                                      <thead class="thead-light">
                                        <tr>
                                          <th scope="col">時間</th>
                                          <th scope="col">單價</th>
                                          <th scope="col">供應商</th>
                                          <th scope="col">進貨批號</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <input type="text" class="form-control" name="" value="">
                                          </td>
                                          <td><input type="text" class="form-control" name="input2" value=""></td>
                                          <td>
                                            <select class="form-control select" style="width: 100%;">
                                              <option selected="selected" disabled="disabled" style="display:none" value=""></option>
                                              <option>海發紡織</option>
                                              <option>伸拓紡織</option>
                                              <option>允良科技紡織</option>
                                            </select>
                                          </td>
                                          <td>
                                            <select class="form-control select" style="width: 100%;">
                                              <option selected="selected" disabled="disabled" style="display:none" value=""></option>
                                              <option>20190512-003</option>

                                            </select>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>2019/05/10</td>
                                          <td class="price">20</td>
                                          <td>新光</td>
                                          <td>20190501-001</td>
                                        </tr>

                                        <tr>
                                          <td>2019/05/12</td>
                                          <td class="price">19.5</td>
                                          <td>三越</td>
                                          <td>20190430-002</td>
                                        </tr>
                                        <tr>
                                          <td>2019/05/24</td>
                                          <td class="price">19.8</td>
                                          <td>新光</td>
                                          <td>20190329-003</td>
                                        </tr>
                                        <tr>
                                          <td>2019/05/26</td>
                                          <td class="price">17</td>
                                          <td>三越</td>
                                          <td>20190328-003</td>
                                        </tr>
                                        <tr>
                                          <td>2019/05/31</td>
                                          <td class="price">18</td>
                                          <td>僑光</td>
                                          <td>20190328-001</td>
                                        </tr>

                                      </tbody>
                                    </table>
                                  </div><!--end table-responsive-->
                                  <%-- <div class="table_pagebar">
                                  <div class="col-xs-12 col-sm-6">	
                                  <a class="inline pbicon pbicon1" href="#"></a>
                                  <a class="inline pbicon pbicon2" href="#"></a>
                                  <p class="inline">1 Page 1 of 1</p>
                                  <a class="inline pbicon pbicon3" href="#"></a>
                                  <a class="inline pbicon pbicon4" href="#"></a>
                                  </div>
                                  <div class="col-xs-12 col-sm-6">
                                  <p class="inline floatright">1-5 of 5 items</p>
                                  </div>
                                  </div> --%>
                                </div><!--boxline-->
                              </div><!--tab-pane-->
                              <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
                              <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
                              <div class="tab-pane fade" id="pills-c" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
                            </div><!--tab-content-->
                          </div><!--col-->
                        </div><!--row-->
                    </div><!--box-body-->
                    <section id="lineChart">
                    </section>
                  </div><!-- box-success-->
                </div><!--col-->
              </div><!--row-->
            </section><!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
    <div class="col-sm-6 col-xs-6">
      <div class="input-group stylish-input-group search">
        <input type="text" class="form-control" placeholder="Search">
        <nav class="clear">&times;</nav>
        <span class="input-group-addon">
          <span class="glyphicon glyphicon-search"></span>
        </span>
      </div>
    </div>
  </div><!--toolbar-->
</body>
</html>
