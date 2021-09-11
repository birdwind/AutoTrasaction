<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>

<head>

  <script src="${webapps.contextPath}/scripts/uiTool.js"></script>
  <script>
    var uuid = "${uuid}";

  </script>
  <script src="${webapps.contextPath}/scripts/orderManagement/clothOrderDetail.js"></script>
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
                              </thead>
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
      <th scope="col" width="15%">#=data.greySpecification.title#</th>
      <th scope="col" width="10%">#=data.quantity.title#<span class='color_pink'>*</span></th>
      <th scope="col" width="15%">#=data.deliverDate.title#<span class='color_pink'>*</span></th>
      <th scope="col" width="10%">#=data.price.title#<span class='color_pink'>*</span></th>
      <th scope="col" width="10%">#=data.wage.title#<span class='color_pink'>*</span></th>
      <th scope="col" width="13%">#=data.deliverLocation.title#<span class='color_pink'>*</span></th>
      <th scope="col" width="7%" class="center">#=data.clothOrdrerDetailNote.title#</th>
      <th scope="col" width="5%" class="center">#=data.addDeliver.title#</th>
      <th scope="col" width="5%" class="center">#=data.delDeliver.title#</th>
    </tr>
  </script>

  <script type="text/x-kendo-template" id="tableTbodyTemplate">
    #for(var item in data){#
    #var gridUuid = data[item].clothOrderDetailUuid;#
    <tr>
    <td><span id="clothNo_#=gridUuid#" name="clothNo">#=data[item].clothNo#</span></td>
    <td><span id="greySpecification_#=gridUuid#" name="greySpecification">#=data[item].greySpecification#</span></td>
    <td>
      <div class="form-group">
        <input type="text" id="quantity_#=gridUuid#" name="quantity" class="form-control number" value="#=data[item].quantity#" required>
        <span class="errorMsg color_pink"></span>   
      </div> 
    </td>
    <td>
      <div class="form-group">
        <input type="text" id="deliverDate_#=gridUuid#" name="deliverDate" class="form-control date" value="#=data[item].deliverDate#">
        <span class="errorMsg color_pink"></span>
      </div>
    </td>
    <td>
      <div class="form-group">
        <input type="text" id="price_#=gridUuid#" name="price" class="form-control number" value="#=data[item].price#" required>
        <span class="errorMsg color_pink"></span>
      </div>    
    </td>
    <td>
      <div class="form-group">
        <input type="text" id="wage_#=gridUuid#" name="wage" class="form-control number" value="#=data[item].wage#">
        <span class="errorMsg color_pink"></span>
      </div>    
    </td>
    <td>
      <div class="form-group">
        <input type="text" id="deliverLocation_#=gridUuid#" name="deliverLocation" class="form-control dropdownlist" value="#=data[item].deliverLocation#">
        <span class="errorMsg color_pink"></span>
      </div>    
    </td>
    <td class="center">
      <a id="showDialog_#=gridUuid#" class="table_btn_status btn_upload inline" href="javascript:void(0)" name="showDialog">備註</a>
      <div id="editorDialog_#=gridUuid#" class="editorDialog">
        <textarea id="clothOrdrerDetailNote_#=gridUuid#" class="form-control textareaSize" name="clothOrdrerDetailNote" style="width: 96.5%;"></textarea>
      </div>    
    </td>
    <td class="center">
      <a id="addDeliver_#=gridUuid#" name='addDeliver' href="javascript:void(0)" class="del table_btn table_btn_blue btn_circle" onclick='addDeliver(this.id);'>
        <i class="fa fa-clipboard"></i>
      </a>    
    </td>
    <td class="center">
      <a id="delDeliver_#=gridUuid#" href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle" name="delDeliver"
        onclick='delDeliver(this.id);'>
        <i class="fa fa-times"></i>
      </a>
      <input id="clothOrderDetailUuid_#=gridUuid#" type="hidden" class="form-control pull-right" name="clothOrderDetailUuid" value="#=data[item].clothOrderDetailUuid#">
      <input id="clothOrderDetailDeliverQuantityUuid_#=gridUuid#" type="hidden" class="form-control pull-right" name="clothOrderDetailDeliverQuantityUuid" value="#=data[item].clothOrderDetailDeliverQuantityUuid#">
      <input id="copyFromClothOrderDetailUuid_#=gridUuid#" type="hidden" class="form-control pull-right" name="copyFromClothOrderDetailUuid" value="0">
    </td>
    </tr>
    #}#
  </script>
  <script type="text/x-kendo-template" id="tableTbodyAddTemplate">
    <tr>
    <td><span id="" name="clothNo"></span></td>
    <td><span id="" name="greySpecification"></span></td>
    <td>
      <div class="form-group">
        <input type="text" id="" name="quantity" class="form-control number" value="" required>
        <span class="errorMsg color_pink"></span>   
      </div> 
    </td>
    <td>
      <div class="form-group">
        <input type="text" id="" name="deliverDate" class="form-control date" value="">
        <span class="errorMsg color_pink"></span>
      </div>
    </td>
    <td>
      <div class="form-group">
        <input type="text" id="" name="price" class="form-control number" value="" required>
        <span class="errorMsg color_pink"></span>
      </div>    
    </td>
    <td>
      <div class="form-group">
        <input type="text" id="" name="wage" class="form-control number" value="">
        <span class="errorMsg color_pink"></span>
      </div>    
    </td>
    <td>
      <div class="form-group">
        <input type="text" id="" name="deliverLocation" class="form-control dropdownlist" value="">
        <span class="errorMsg color_pink"></span>
      </div>    
    </td>
    <td class="center">
      <a id="" class="table_btn_status btn_upload inline" href="javascript:void(0)" name="showDialog">備註</a>
      <div id="" class="editorDialog">
        <textarea id="" class="form-control textareaSize" name="clothOrdrerDetailNote" style="width: 96.5%;"></textarea>
      </div>    
    </td>
    <td class="center">    
    </td>
    <td class="center">
      <a id="" href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle" name="delDeliver"
        onclick='delDeliver(this.id);'>
        <i class="fa fa-times"></i>
      </a>
      <input id="" type="hidden" class="form-control pull-right" name="clothOrderDetailUuid" value="">
      <input id="" type="hidden" class="form-control pull-right" name="clothOrderDetailDeliverQuantityUuid" value="">
      <input id="" type="hidden" class="form-control pull-right" name="copyFromClothOrderDetailUuid" value="">
    </td>
    </tr>  
  </script>
</body>

</html>
