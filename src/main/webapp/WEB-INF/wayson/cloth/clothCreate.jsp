<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<style>
table tr:nth-child(odd){
  background-color: #f9f9f9!important;
}
table tr:nth-child(even){
  background-color: #ffffff!important;
}
</style>
<script src="${webapps.contextPath}/scripts/cloth/clothCreate.js"></script>
<script>
var uuid = "${uuid}";
</script>
</head>
<body class="hold-transition skin-green-light sidebar-mini">
  <span id="notification"></span>
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
                    <button type="button" onclick="location='/page/cloth/specification'"class="btn backBtn circleBtn white">
                      <i class="fa fa-reply"></i>
                    </button>
                    <button id="save" type="button" class="btn btn-success circleBtn white"></button>
                    <i class="fa fa-angle-double-right right"></i>
                  </div><!--box_features-->
                  <div class="box box-success" style="padding-bottom:40px">
                  <br>
                    <div id="form" class="box-body">
                    </div><!--#form-->
                    <div id="cloth01" class="box-body">
                    <table class="table bg_white table-striped table-bordered table-hover">
                        <thead class="thead-light">
                          <tr><th scope="col" id="fliedTitle" style="width:15%;text-align:center;" ><span>
                            <th scope="col" style="width:25%;text-align:center;" ><span class="MachineDensityWrap" ></span></th>
                            <th scope="col" style="width:25%;text-align:center;"><span class="GreyClothDensityWrap"></span>
                              <span id="percentageError" class="errorMsg color_pink" style="font-weight:normal"></span></th>
                              <th scope="col" style="width:25%;text-align:center;"><span class="FinishedClothDensityWrap" ></span></th>
                          </tr></thead>
                          <tbody></tbody>
                          </table><!--cloth01-->
                    </div><!--#form-->
                    <div class="box-body">
                        <div class="row" >
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <div class="box box-success">

                            </div><!--table_bar-->
                            <table  class="table bg_white table-striped table-bordered table-hover warp-tag">
                              <thead class="thead-light">
                                <ul class="nav nav-pills mb-3 pills-tab clothTab" >
                                <li class="nav-item active dan">
                                  <a href="javascript:void(0)" class="nav-link active in" id="warp-tab" data-toggle="pill" aria-selected="true">經紗</a>
                                </li>
                                <li class="nav-item">
                                    <a href="javascript:void(0)" class="nav-link" id="weft-tab" data-toggle="pill" aria-selected="false">緯紗</a>
                                </li>
                                </ul>
                              <tr>
                                <th scope="col" style="width:15%">
                                  <div class="col-sm-4 col-xs-6 table_bar_box">	
                                    <a href="javascript:void(0)"  class="btn addItem"style="background-color:#3399ff;color:#ffffff"><i class="fa fa-plus"></i></a>
                                    <span class="yarnNo">紗號</span> 
                                  </div>
                                  
                                </th>
                                <th scope="col" style="width:20%;text-align:center;line-height:40px"><span class="yarnSpec" >規格</span>
                                </th>
                                <th scope="col" style="width:20%;text-align:center;line-height:40px"><span class="yarnColors">顏色</span>
                                </th>
                                <th scope="col" style="text-align:center;line-height:40px"><span class="yarnQuantity">條數</span>
                                </th>
                                <th scope="col" style="text-align:center;line-height:40px" ><span class="yardPerUnit">每碼用紗量</span>
                                </th>
                                <th scope="col"style="text-align:center;line-height:40px;width:8%" >刪除</th>
                              </tr>
                              </thead>
                              <tbody>
                              <td style="text-align:center;line-height:40px;"><input type="text" name="yarnCore" class="form-control yarnCore" value="" style="width:85%"></input></td>
                                <td style="text-align:center;line-height:40px" name="yarnSpec" class="yarnSpec"></td>
                                <td style="text-align:center;line-height:40px"><input type="text" name="yarnColors" class="form-control yarnColors" value="" ></input></td>
                                <td style="text-align:center;line-height:40px"><input type="text" name="yarnQuantity" class="form-control yarnQuantity number interger" value="" ></input></td>
                                <td style="text-align:center;line-height:40px"><input type="text" name="yardPerUnit" class="form-control yardPerUnit number" value="" ></input></td>
                                <td style="text-align:center;line-height:40px;">
                                  <a href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle" style="display:none">
                                    <i class="fa fa-times"></i>
                                  </a>
                                </td>
                              </tbody>
                            </table><!--table-->
                            <table  class="table bg_white table-striped table-bordered table-hover weft-tag" style="display:none">
                              <thead class="thead-light">
                              <tr>
                                <th scope="col" style="width:15%">
                                  <div class="col-sm-4 col-xs-6 table_bar_box">	
                                    <a href="javascript:void(0)" class="btn addItem"style="background-color:#3399ff;color:#ffffff"><i class="fa fa-plus"></i></a>
                                    <span class="yarnNo">紗號</span> 
                                  </div>
                                  
                                </th>
                                <th scope="col" style="width:20%;text-align:center;line-height:40px"><span class="yarnSpec" >規格</span>
                                </th>
                                <th scope="col" style="width:20%;text-align:center;line-height:40px"><span class="yarnColors">顏色</span>
                                </th>
                                <th scope="col" style="text-align:center;line-height:40px"><span class="yarnQuantity">條數</span>
                                </th>
                                <th scope="col" style="text-align:center;line-height:40px" ><span class="yardPerUnit">每碼用紗量</span>
                                </th>
                                <th scope="col"style="text-align:center;line-height:40px;width:8%" >刪除</th>
                              </tr>
                              </thead>
                              <tbody>
                               <td style="text-align:center;line-height:40px;"><input type="text" name="yarnCore" class="form-control yarnCore" value="" style="width:85%"></input></td>
                                <td style="text-align:center;line-height:40px" name="yarnSpec" class="yarnSpec"></td>
                                <td style="text-align:center;line-height:40px"><input type="text" name="yarnColors" class="form-control yarnColors" value="" ></input></td>
                                <td style="text-align:center;line-height:40px"><input type="text" name="yarnQuantity" class="form-control yarnQuantity number interger" value="" ></input></td>
                                <td style="text-align:center;line-height:40px"><input type="text" name="yardPerUnit" class="form-control yardPerUnit number" value="" ></input></td>
                                <td style="text-align:center;line-height:40px;">
                                  <a href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle" style="display:none">
                                    <i class="fa fa-times"></i>
                                  </a>
                                </td>
                              </tbody>
                            </table><!--table-->
                          </div><!--table-responsive-->
                        </div><!--col-->
                      </div><!--row-->
                    </div><!--box-body-->
                  </div><!--box-->
                </div><!--col-->
              </div><!--row-->
            </section><!--content-->
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
<section id="ingriTemplate" style="display:none;">
<table>
<tr>
  <td>
    <input type="text" class="form-control pull-right" name="cellName">
    <span class="errorMsg color_pink"></span>
  </td>
  <td>
    <input type="text" class="form-control number" name="percentage">
    <span class="errorMsg color_pink"></span>
  </td>
  <td class="center">
    <a href="javascript:void(0)" class="del table_btn table_btn_pink btn_circle">
      <i class="fa fa-times"></i>
    </a>
  </td>
</tr>
</table>
</section>
</body>
</html>
