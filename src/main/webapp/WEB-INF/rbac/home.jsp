<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<!DOCTYPE html>
<html>

<head>
  <title>SNBDC</title>
  <meta name="_csrf" content="${_csrf.token}" />
  <meta name="_csrf_header" content="${_csrf.headerName}" />

<%--  <link rel="stylesheet" href="${webapps.contextPath}/styles/modules/home.css" />--%>
<%--  <link rel="stylesheet" href="${webapps.contextPath}/styles/lms_workflow.css">--%>
  <script type="text/javascript" src="${webapps.contextPath}/scripts/modules/home.js"></script>
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
              </ol>
            </section>
            <section class="content">
              <div class="row">
                <div class="col-md-12">

                  <div class="box box-success">
                    <div class="box-body">
                      <!--start page content-->
                      <div id="lms_workflow">
                        <div class="container">
                          <!--row_workflow_row1 -->
                          <div class="row_workflow_1">
                            <a functionKey="ClothOrder" href="#" class="btn_workflowNoAcl btn_wf01"><span
                                class="icon_wficon btn_wf01_bg"></span>營業訂單</a>
                            <a functionKey="" href="#" class="btn_workflowNoAcl btn_wf02"><span
                                class="icon_wficon btn_wf02_bg"></span>成本估算</a>
                            <a functionKey="YarnPurchase" href="#" class="btn_workflowNoAcl btn_wf03"><span
                                class="icon_wficon btn_wf03_bg"></span>採購管理</a>
                            <a functionKey="ManufactureWeavingOutsourcingInquiry" href="#"
                              class="btn_workflowNoAcl btn_wf04"><span class="icon_wficon btn_wf04_bg"></span>委外託工</a>
                            <a functionKey="" href="#" class="btn_workflowNoAcl btn_wf05"><span
                                class="icon_wficon btn_wf05_bg"></span>織物設計</a>
                            <a functionKey="Customer" href="#" class="btn_workflowNoAcl btn_wf06"><span
                                class="icon_wficon btn_wf06_bg"></span>客戶管理</a>
                            <a functionKey="Vendor" href="#" class="btn_workflowNoAcl btn_wf07"><span
                                class="icon_wficon btn_wf07_bg"></span>廠商管理</a>

                            <a functionKey="ManufactureOrder" href="#" class="btn_workflowNoAcl btn_wf08"><span
                                class="icon_wficon btn_wf08_bg"></span>工單賦予</a>
                            <a functionKey="" href="#" class="btn_workflowNoAcl btn_wf09"><span
                                class="icon_wficon btn_wf09_bg"></span>交期模擬演算</a>
                            <a functionKey="ClothCoreWeavingSop" href="#" class="btn_workflowNoAcl btn_wf10"><span
                                class="icon_wficon btn_wf10_bg"></span>製造規範</a>
                            <a functionKey="Cloth" href="#" class="btn_workflowNoAcl btn_wf11"><span
                                class="icon_wficon btn_wf11_bg"></span>產品管理</a>

                            <a functionKey="ManufactureScheduleCore" href="#" class="btn_workflowNoAcl btn_wf12"><span
                                class="icon_wficon btn_wf12_bg"></span>生產排程</a>
                            <a functionKey="SiteWarping" href="#" class="btn_workflowNoAcl btn_wf13"><span
                                class="icon_wficon btn_wf13_bg"></span>整經作業</a>
                            <a functionKey="SiteWefting" href="#" class="btn_workflowNoAcl btn_wf14"><span
                                class="icon_wficon btn_wf14_bg"></span>穿綜作業</a>
                            <a functionKey="SiteWeaving" href="#" class="btn_workflowNoAcl btn_wf15"><span
                                class="icon_wficon btn_wf15_bg"></span>織布作業</a>
                            <a functionKey="SiteInspection" href="#" class="btn_workflowNoAcl btn_wf16"><span
                                class="icon_wficon btn_wf16_bg"></span>驗布作業</a>
                            <a functionKey="ClothExport" href="#" class="btn_workflowNoAcl btn_wf17"><span
                                class="icon_wficon btn_wf17_bg"></span>出貨作業</a>

                            <a functionKey="ClothExport" href="#" class="btn_workflowNoAcl btn_wf18"><span
                                class="icon_wficon btn_wf18_bg"></span>出貨管理</a>

                            <a functionKey="ClothExport" href="#" class="btn_workflowNoAcl btn_wf19"><span
                                class="icon_wficon btn_wf19_bg"></span>成品管理</a>
                            <a functionKey="" href="#" class="btn_workflowNoAcl btn_wf20"><span
                                class="icon_wficon btn_wf20_bg"></span>委外加工</a>
                            <a functionKey="" href="#" class="btn_workflowNoAcl btn_wf21"><span
                                class="icon_wficon btn_wf21_bg"></span>成品出貨</a>

                            <a functionKey="ManufactureScheduleDetail" href="#" class="btn_workflowNoAcl btn_wf22"><span
                                class="icon_wficon btn_wf22_bg"></span>生產管理</a>
                            <a functionKey="YarnIngredient" href="#" class="btn_workflowNoAcl btn_wf23"><span
                                class="icon_wficon btn_wf23_bg"></span>原料管理</a>
                            <a functionKey="Beam" href="#" class="btn_workflowNoAcl btn_wf24"><span
                                class="icon_wficon btn_wf24_bg"></span>盤頭管理</a>
                            <a functionKey="Buckle" href="#" class="btn_workflowNoAcl btn_wf25"><span
                                class="icon_wficon btn_wf25_bg"></span>鋼筘管理</a>
                            <a functionKey="" href="#" class="btn_workflowNoAcl btn_wf26"><span
                                class="icon_wficon btn_wf26_bg"></span>設備管理</a>
                            <a functionKey="SMB" href="#" class="btn_workflowNoAcl btn_wf27"><span
                                class="icon_wficon btn_wf27_bg"></span>現場監控</a>
                            <a functionKey="" href="#" class="btn_workflowNoAcl btn_wf28"><span
                                class="icon_wficon btn_wf28_bg"></span>品質管理</a>
                          </div>
                        </div>
                        <!--end container-->
                      </div>
                      <!--end page content-->
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->





    </section>
  </div><!-- box-body-->
  </div><!-- col-->
  </div><!-- row-->
  </section><!-- content-->
  </div><!-- content-wrapper-->
</body>

</html>
