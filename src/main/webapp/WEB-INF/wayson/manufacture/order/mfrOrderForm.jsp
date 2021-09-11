<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<link rel="stylesheet" href="/styles/windowUI.css"/>
<script src="${webapps.contextPath}/scripts/manufacture/mfrOrderForm.js"></script>
<style>
.btn-success.circleBtn{
  font-size:15px
}
.table{
  margin: 10px 0;
}
a.color_pink:hover,
a.color_pink:focus{
  color:#ff2b66
}
</style>
<script>
  var uuid = "${uuid}";
</script>
</head>
<body class="hold-transition skin-green-light sidebar-mini">
  <div class="content-wrapper">
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box-body no-padding">
            <section class="content-header">
              <ol id="breadcrumb" class="breadcrumb">
                <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a>製令</li>
                <li class="active">新增製令</li>
              </ol>
            </section><!-- content-header -->
            <section class="content">
              <div class="row">
                <div class="col-md-12">
                  <div class="box_features">
                    <i class="fa fa-angle-double-left left" style="display:none; margin-right: 20px;"></i>
                    <button type="button" onclick="location='/page/manufacture/order/'" class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="temp" type="button" class="btn btn-success circleBtn white">暫存<br>製令</button>
                    <button id="finish" type="button" class="btn btn-success circleBtn white">完成<br>製令</button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                    <div id="form" class="box-body">
                    </div><!--#form-->
                    <div id="ordertable" class="box-body">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="boxline mt--s">
                            <div class="table-responsive">
                            <table class="table bg_white table-striped table-bordered table-hover">
                              <thead class="thead-light">
                                <tr>
                                  <th class="text-center yarnNoTitle"></th>
                                  <th class="text-center deliverDateTitle"></th>
                                  <th class="text-center quantityTitle"></th>
                                </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                            </div>
                        </div><!--boxline-->
                      </div><!--col-->
                    </div><!--row-->
                    </div><!--#ordertable-->
                    <div id="tabMenu" class="box-body">
                      <div class="row">
                      <div class="col-md-12">
                        <ul class="nav nav-pills mb-3" id="order01-tab" role="tablist">
                          <li class="nav-item">
                          <a class="nav-link" id="warp-tab" data-toggle="pill" href="#warp"  aria-selected="false">整經</a>
                          </li>
                          
                          <li class="nav-item">
                          <a class="nav-link" id="weft-tab" data-toggle="pill" href="#weft" aria-selected="false">穿綜</a>
                          </li>
                          
                          <li class="nav-item active">
                          <a class="nav-link" id="weaving-tab" data-toggle="pill" href="#weaving" aria-selected="true">織布</a>
                          </li>
                          
                          <li class="nav-item">
                          <a class="nav-link" id="inspect-tab" data-toggle="pill" href="#inspect" aria-selected="false">驗布</a>
                          </li>
                          
                          <li class="nav-item">
                          <a class="nav-link" id="shipment-tab" data-toggle="pill" href="#shipment" aria-selected="false">出貨</a>
                          </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                          
                          <!--整經-->
                          <div class="tab-pane fade" id="warp">
                          <div class="col-md-12 box_inputdata">
                            <div class="form-group">
                              <label style="vertical-align:top">整經注意事項</label>
                              <textarea class="form-control textareaSize" rows="3" placeholder="請輸入..."></textarea>
                            </div>
                          </div>
                          </div>
                          
                          <!--穿綜-->
                          <div class="tab-pane fade" id="weft">
                          <div class="col-md-12 box_inputdata">
                            <div class="form-group">
                              <label style="vertical-align:top">穿綜注意事項</label>
                              <textarea class="form-control textareaSize" rows="3" placeholder="請輸入..."></textarea>
                            </div>
                          </div>
                          </div>
                          
                          <!--織布-->
                          <div class="tab-pane fade active in" id="weaving">
                          
                            <div class="col-md-12">
                            <div class="boxline mt--s">
                              <div class="table-responsive">
                              <table class="table bg_white table-striped table-bordered table-hover">
                                <thead class="thead-light">
                                <tr>
                                  <th scope="col"></th>
                                  <th scope="col">運轉啟動角</th>
                                  <th scope="col">運轉停止角</th>
                                  <th scope="col">強力啟動時間</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td><p>斷經</p></td>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td><p>斷緯</p></td>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                                <section id ="weavingForm">
                                </section>
                              </div><!--table-responsive-->
                            </div><!--boxline-->
                            </div><!--col-md-12-->
                            <div class="col-md-12">
                              <div class="boxline mt--s">
                                <div class="table-responsive">
                                  <table id="weavingTable" class="table bg_white table-striped table-bordered table-hover">
                                  </table>
                                </div><!--table-responsive-->
                              </div><!--boxline-->
                            </div><!--col-md-12-->
                      
                          
                          </div><!--#weaving-->
                        </div><!--tab-content-->
                        </div><!--col-->
                      </div><!--row-->
                    </div><!--#tabMenu-->
                    </div><!--#ordertable-->
                  </div><!--box-->
                </div><!--col-->
              </div><!--row-->
            </section>
            <!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->

  <section id="orderTemplate" style="display:none;">
    <table>
      <tr>
          <td class="text-center">
            <input type="hidden" name="clothOrderDetailDeliverQuantityUuid">
            <input type="hidden" name="manufactureOrderDetailUuid">
            <input type="hidden" name="clothYarnUuid">
            <span name="yarnNo" ></span>

          </td>
          <td class="text-center">
            <span name="deliverDate"></span>
          </td>
          <td>
            <input type="text" name="clothYarnAmount" class="form-control number" style="width: calc(100% - 90px);">
            <input type="text" name="clothYarnUnit" class="form-control" style="width: 80px;">
          </td>
      </tr>
    </table>
  </section>
</body>
</html>
