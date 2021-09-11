<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="false" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
<style>
.k-grid-content{
  position:initial!important;
}
</style>
<script>
var titles = {}, columnItem=[];
var columnTemplate= {
        "yarnPurchaseNo": function(d) {
              return "<a class='number_a' href='/page/yarn/purchase/form/"+d.yarnPurchaseCoreUuid+"'>"+d.yarnPurchaseNo+"</a>";
        },
        "yarnCores": function(d) {
              return d.yarnCores.join(", ");
        },
        "getInfoStreamLink": function(d) {
              return(d.bargainStatus == 0)?`<a class="infoStream table_btn table_btn_pink" 
                    href='javascript:void(0)' title="已複製連結" data-uid="`+d.yarnPurchaseCoreUuid+`">
                    <i class="fa fa-commenting-o"></i>
                  </a>`:""
        },
        "bargainStatus": function(d) {
              return titles.bargainStatus.keyValue.find(item => item.value == d.bargainStatus).text
        },
        "print": function(d) {
              return `<a class="table_btn table_btn_green" 
                    href='javascript:void(0)' data-uid="`+d.yarnPurchaseCoreUuid+`">
                    <i class="fa fa-print"></i>
                  </a>`
        },
        "yarnImport": function(d) {
          return `<a href="#" class="table_btn_status table_btn_warning">`+titles.yarnImport.title+`</a>`
        },
        "copy": function(d) {
          return `<a class="table_btn table_btn_purple" onclick="copyPurchase('`+d.yarnPurchaseCoreUuid+`')" href='javascript:void(0)' data-uid="`+d.yarnPurchaseCoreUuid+`">
                    <i class="fa fa-files-o"></i>
                  </a>`
        },
}
var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: '/api/yarn/purchase/grid',
      dataType: "json",
      type: "POST",
      processData: false,
      contentType: false
    },parameterMap: function (data) {
      let postData = new FormData();
      postData.append("filter", new Blob([JSON.stringify({
        size: data.pageSize,
        page: data.page -= 1,
        filter: data.filter,
        sort: [
          {
            field: "bargainStatus",
            dir:"asc"
          },
          {
            field: "createDate",
            dir: "desc"
          }
        ]
      })], {
        type: "application/json"
      }));
      return postData;
    }
  },
  serverPaging: true,
  serverFiltering: true,
  schema: {
    model: {
      id: 'yarnPurchaseCoreUuid'
    },
    total : function(data){
      return data.response.totalElements
    },
    data: function (data) {
      titles = data.response.header;
      columnItem = [];
      searchCondition = [];
      
      for(i in titles){
        if (titles[i].search) {
          searchCondition.push({
            field: i,
            operator: 'contains'
          })
        }//if
        if(titles[i].type.search(/(label|command)/) < 0){
          continue;
        }
        var temp={
          field : i,
          title : titles[i].title
        }
        if(columnTemplate[i]){
          temp.template=columnTemplate[i];
        }
        columnItem.push(temp);
      }//loop
      return data.response.contents;
    }
  },
  pageSize: 10,
  page:(sessionStorage.getItem("purchasePage")==null)?1:sessionStorage.getItem("purchasePage")
});
$(async function () {
  await dataSource.fetch();
  var grid = $("#purchase").kendoGrid(
    {
      dataSource : dataSource,
      toolbar : kendo.template($("#toolbar").html()),
      persistSelection : true,
      pageable : {
        input : true,
        numeric : true
      },
      dataBound: function(e) {
        $(window).scrollTop(0);
        sessionStorage.setItem("purchasePage", $("#purchase").data("kendoGrid").dataSource.page());
        for (i in this.columns) {
            this.autoFitColumn(i);
        }
      },
      columns : columnItem
  });
  $('body').on('input keyup', '.search input', function () {
    var key = $(this).val().trim();
    for (i in searchCondition) {
      searchCondition[i].value = key
    }
    sessionStorage.setItem("purchaseSearch", key);
    $(".search > .clear").hide();
    if (key.length) {
      $(".search > .clear").show();
    }
    $('#inquiry').data('kendoGrid').dataSource.filter({
      logic: 'or',
      filters: [
      {
        field : "yarnInquiryCoreNo",
        operator: 'contains',
        value: key
      },{
        field: 'inquiryCompany',
        operator: 'contains',
        value: key
      },{
        field: 'yarnInquirerClosedStatus',
        operator: 'contains',
        value: key
      }]
    });
  });//end of search
  
  $('body').on('click', '.search > .clear', function () {
    sessionStorage.removeItem("purchaseSearch");
    $(".search input").val("").trigger("input");
  })
  if (sessionStorage.getItem("purchaseSearch") != null) {
    var page = $('#inquiry').data('kendoGrid').dataSource.page();
    $(".search input").val(sessionStorage.getItem("purchaseSearch")).trigger("keyup");
    $('#inquiry').data('kendoGrid').dataSource.page(page)
  }
  $('body').on('click', '.infoStream ', function () {
    var btn = $(this);
    var url="/api/yarn/purchase/chat/link/"+$(this).attr("data-uid");
    btn.tooltip({trigger:"click"}).queue(function(){
      $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
          if (!data.status) {
            btn.attr("data-original-title","連結失效");
            if(data.httpStatus==401){
              btn.attr("data-original-title","請登入");
              setTimeout(function () { location="/" }, 1000);
            }
            btn.tooltip("show");
            setTimeout(function () { btn.tooltip("destroy");btn.remove(); }, 800);
          }else{
            btn.closest("td").next().text(data.response.expiredTime);
            btn.tooltip("show");
            $("#chatlink").val(data.response.link) 
            setTimeout(function () { btn.tooltip("destroy") }, 800);
          }
        }
      })//end of ajax
      $(this).dequeue();
    }).delay(500).queue(function(){
      $("#chatlink").show().select();
      document.execCommand("copy");
      $("#chatlink").hide();
      $(this).dequeue();
    });
  })//infoStream

})//$(function ()
function copyPurchase(Uuid){
  $.ajax({
    url: "/api/yarn/purchase/template/"+Uuid,
    method: 'GET',
    success: function (data) {
      if (data.status) {
        sessionStorage.setItem("purchaseCopy", JSON.stringify(data.response));
        location="/page/yarn/purchase/form";
      }
      
    }//end of success
  });//end of ajax
}
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
            <input type="text" id="chatlink" style="display:none;" >
              <ol id="breadcrumb" class="breadcrumb">
                <li><a href="javascript:void(0)"><i class="fa fa-home"></i> Home</a></li>
                <li><a href="javascript:void(0)"></a></li>
                <li class="active"></li>
              </ol>
            </section>
            <section id="purchase">
            </section>
          </div><!-- box-body-->
        </div><!-- col-->
      </div><!-- row-->
    </section><!-- content-->
  </div><!-- content-wrapper-->
  <div id="toolbar" style="display:none;">
      <div class="col-sm-4 col-xs-6 table_bar_box">
        <a href="/page/yarn/purchase/form" class="btn"><i class="fa fa-plus"></i></a>
      </div>
      <div class="col-sm-6 col-xs-6">
        <div class="input-group stylish-input-group search">
          <input type="text" class="form-control" placeholder="關鍵字搜尋" >
          <nav class="clear">&times;</nav>
          <span class="input-group-addon">
            <span class="glyphicon glyphicon-search"></span>
          </span>
        </div>
      </div>
  </div><!--toolbar-->
</body>
</html>
