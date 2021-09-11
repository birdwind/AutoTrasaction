<!--

ProjectName: spring-boot_i

User: BirdW

Date: 4/9/2

Time: 3:04
M
-->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="${webapps.contextPath}/scripts/modules/home.js"></script>
</head>
<body>

<div class="row">
        <div class="col-xl-6 col-lg-12">
            <div class="card">
                <div class="card-header">系統消息</div>
                <div class="card-body">
                    <div id="grid"></div>
                </div>
            </div>
        </div>
        <div class="col-xl-6 col-lg-12">
            <div class="card">
                <div class="card-header">系統功能</div>
                <div class="card-body">
                    <div data-role="grid" class="k-grid k-widget k-display-block k-editable">
                        <div class="k-grid-header" style="padding-right: 17px;">
                            <div class="k-grid-header-wrap k-auto-scrollable">
                                <table role="grid">
                                    <colgroup>
                                        <col style="width:10%">
                                        <col style="width:10%">
                                        <col style="width:10%">
                                        <col style="width:5%">
                                    </colgroup>
                                    <thead role="rowgroup">
                                    <tr role="row">
                                        <th scope="col" role="columnheader" data-field="memberUuid" aria-haspopup="true"
                                            rowspan="1" data-title="權限層級" data-index="0"
                                            id="afe82d27-f190-491c-ae6e-7f1daaa998cc" class="k-header"
                                            data-role="columnsorter"><a class="k-link" href="#">權限層級</a>
                                        </th>
                                        <th scope="col" role="columnheader" data-field="memberNo" aria-haspopup="true"
                                            rowspan="1" data-title="模組" data-index="1" class="k-header"
                                            data-role="columnsorter"><a class="k-link" href="#">模組</a></th>
                                        <th scope="col" role="columnheader" data-field="memberNo" aria-haspopup="true"
                                            rowspan="1" data-title="功能" data-index="1" class="k-header"
                                            data-role="columnsorter"><a class="k-link" href="#">功能</a></th>
                                        <th scope="col" role="columnheader" data-field="name" aria-haspopup="true"
                                            rowspan="1" data-title="啟用" data-index="2" class="k-header"
                                            data-role="columnsorter"><a class="k-link" href="#">啟用</a></th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="k-grid-content k-auto-scrollable">
                            <table role="grid">
                                <colgroup>
                                    <col style="width:10%">
                                    <col style="width:10%">
                                    <col style="width:10%">
                                    <col style="width:5%">
                                </colgroup>
                                <tbody role="rowgroup">
                                <tr role="row">
                                    <td role="gridcell">管理員</td>
                                    <td role="gridcell">會員管理</td>
                                    <td role="gridcell"><a href="/page/member">帳號管理</a></td>
                                    <td role="gridcell" style="text-align: center; color: green;"><i
                                            class="fas fa-check-circle"></i></td>
                                </tr>
                                <tr role="row">
                                    <td role="gridcell">管理員</td>
                                    <td role="gridcell">交易管理</td>
                                    <td role="gridcell"><a href="/page/transaction">交易紀錄</a></td>
                                    <td role="gridcell" style="text-align: center; color: green;"><i
                                            class="fas fa-check-circle"></i></td>
                                </tr>
                                <tr role="row">
                                    <td role="gridcell">管理員</td>
                                    <td role="gridcell">投資管理</td>
                                    <td role="gridcell"><a href="/page/investors/earning">收益紀錄</a></td>
                                    <td role="gridcell" style="text-align: center; color: green;"><i
                                            class="fas fa-check-circle"></i></td>
                                </tr>
                                <tr role="row">
                                    <td role="gridcell">管理員</td>
                                    <td role="gridcell">投資管理</td>
                                    <td role="gridcell"><a href="/page/investors/deposit">出入金紀錄</a></td>
                                    <td role="gridcell" style="text-align: center; color: green;"><i
                                            class="fas fa-check-circle"></i></td>
                                </tr>
                                <tr role="row">
                                    <td role="gridcell">管理員</td>
                                    <td role="gridcell">投資管理</td>
                                    <td role="gridcell">會員出入金審查</td>
                                    <td role="gridcell" style="text-align: center;"><i class="fas fa-check-circle"></i>
                                    </td>
                                </tr>
                                <tr role="row">
                                    <td role="gridcell">管理員</td>
                                    <td role="gridcell">系統管理</td>
                                    <td role="gridcell">最新消息</td>
                                    <td role="gridcell" style="text-align: center;"><i class="fas fa-check-circle"></i>
                                    </td>
                                </tr>
                                <tr role="row">
                                    <td role="gridcell">會員</td>
                                    <td role="gridcell">投資管理</td>
                                    <td role="gridcell">出入金紀錄</td>
                                    <td role="gridcell" style="text-align: center;"><i class="fas fa-check-circle"></i>
                                    </td>
                                </tr>
                                <tr role="row">
                                    <td role="gridcell">會員</td>
                                    <td role="gridcell">投資管理</td>
                                    <td role="gridcell">收益紀錄</td>
                                    <td role="gridcell" style="text-align: center;"><i class="fas fa-check-circle"></i>
                                    </td>
                                </tr>
                                <tr role="row">
                                    <td role="gridcell">會員</td>
                                    <td role="gridcell">個人管理</td>
                                    <td role="gridcell">個人資訊</td>
                                    <td role="gridcell" style="text-align: center;"><i class="fas fa-check-circle"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
