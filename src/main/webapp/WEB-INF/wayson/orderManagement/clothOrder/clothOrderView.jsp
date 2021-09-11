<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>
  <script src="${webapps.contextPath}/scripts/orderManagement/clothOrderView.js"></script>
  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <script>
    var uuid = "${uuid}";
    var status = "${status}";

  </script>
</head>

<body class="hold-transition skin-green-light sidebar-mini">
  <span id="notification"></span>
  <!-- Content Wrapper. Contains page content -->
  <div id="grid"></div>
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
                    <button id="replyPage" type="button" onclick="" class="btn backBtn circleBtn white">
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
                    <%-- <div id="fileupload" class="box-body" style="display:none;">
                      <div class="col-md-12 box_inputdata">
                        <fieldset>
                          <div class="form-group">

                            <a href="javascript:void(0)" class="table_btn_status btn_upload inline">多檔上傳</a>
                            <span class="inline"> 檔案累計勿超過10MB</span>

                            <input type="file" name="" style="display:none;">
                          </div>
                          <!--form-group-->
                        </fieldset>
                      </div>
                    </div> --%>
                    <!--#fileupload-->
                    <%-- <div class="box-body">
                      <div class="row">
                        <div class="col-md-6 box_inputdata">
                          <div class="form-group">
                            <label>檔案上傳</label>
                            <div class="uploadbox">
                              <a class="table_btn_status btn_upload inline" href="javascript:void(0)">多檔案上傳</a><span
                                class="inline"> 檔案累計勿超過10MB</span>
                              <div class="clearfix"></div>
                              <span class="btn_uploadfile divinlineblock">原料紗圖片一(5kb)
                                <a href="javascript:void(0)"><i class="fa fa-times"></i></a>
                              </span>
                              <span class="btn_uploadfile divinlineblock">原料紗圖片二(5kb)
                                <a href="javascript:void(0)"><i class="fa fa-times"></i></a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div> --%>
                    <!--row-->
                    <div class="row">
                      <div class="col-md-12">
                        <div class="box box-success">
                          <div class="table-responsive">
                            <table id="clothOrderDetails"
                              class="table bg_white table-striped table-bordered table-hover">
                              <thead class="thead-light">
                              <tbody>
                              </tbody>
                            </table>
                            <!--table-->

                          </div>
                          <!--table-responsive-->
                        </div>
                      </div>
                      <!--col-->
                    </div>
                    <!--row-->
                  </div>
                  <!--box-body-->
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
  <script type="text/x-kendo-template" id="tableTheadTemplate">
    <tr>
      <th scope="col" width="10%">#=data.clothNo.title#</th>
      <th scope="col" width="14%">#=data.greySpecification.title#</th>
      <th scope="col" width="8%">#=data.quantity.title#</th>
      <th scope="col" width="10%">#=data.deliverDate.title#</th>
      <th scope="col" width="5%">#=data.price.title#</th>
      <th scope="col" width="5%">#=data.wage.title#</th>
      <th scope="col" width="12%">#=data.deliverLocation.title#</th>
      <th scope="col" width="5%">#=data.manufactureStatus.title#</th>
      <th scope="col" width="8%">#=data.clothOrdrerDetailNote.title#</th>
      <th scope="col" width="9%">#=data.orderSchedule.title#</th>
      <th scope="col" width="9%">#=data.orderAnalytics.title#</th>
    </tr>
  </script>

  <script type="text/x-kendo-template" id="tableTbodyTemplate">
    #for(var item in data){#
    <tr>
      <td><span name="clothNo">#=data[item].clothNo#</span></td>
      <td><span name="greySpecification">#=data[item].greySpecification#</span></td>
      <td><span name="quantity">#=data[item].quantity#</span></td>
      <td><span name="deliverDate">#=data[item].deliverDate#</span></td>
      <td><span name="price">#=data[item].price#</span></td>
      <td><span name="wage">#=data[item].wage#</span></td>
      <td><span name="deliverLocation">#=data[item].deliverLocation#</span></td>
      <td><span name="manufactureStatus">#=data[item].manufactureStatus#</span></td>
      <td>
          <a id="showDialog_#=data[item].clothOrderDetailUuid#" class="table_btn_status btn_upload inline" href="javascript:void(0)" name="showDialog">備註</a>
          <div id="editorDialog_#=data[item].clothOrderDetailUuid#" class="editorDialog">
            <textarea id="clothOrdrerDetailNote_#=data[item].clothOrderDetailUuid#" class="form-control textareaSize" name="clothOrdrerDetailNote" style="width: 96.5%;"></textarea>
          </div>
      </td>
      <td class="center">
          <a id="orderSchedule_#=data[item].clothOrderDetailUuid#" href="javascript:void(0)" class="table_btn_status btn_upload inline" name='orderSchedule'
            onclick="orderSchedule(this.id);">
            生產履歷
          </a>      
      </td>
      <td class="center">
          <a id="orderAnalytics_#=data[item].clothOrderDetailUuid#" href="javascript:void(0)" class="table_btn_status btn_upload inline" name="orderAnalytics"
            onclick="orderAnalytics(this.id);">
            成本分析
          </a>
      </td>
    </tr>
    #}#
  </script>

</body>

</html>
