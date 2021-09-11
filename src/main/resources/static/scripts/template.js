let timeout = 1000;
let generateNotificationItem = function (title, time, isRead, notificationUuid) {
    let template = kendo.template($("#notification-template").html());
    return template({"title": title, "time": time, "isRead": isRead, "notificationUuid": notificationUuid});
};

$(function () {
    if(investTotal != null){
        $('#investTotal').empty();
        $('#investTotal').text(investTotal);
    }

    if (nickName != null) {
        $('#userNickName').empty();
        $('#userNickName').text(nickName);
    }

    if (sideMenu != null) {
        $("#identityBtn,#leftPanel").text(sideMenu.name);
    }
    // creatFunctionTree();
    initFunctionTree();
    updateTime();

    $(".caret").position({
        my: "left",
        at: "right",
        of: "#time",
        collision: "fit"
    });

    $('#calender').datetimepicker({
        inline: true,
    });

    $('#calenderBtn').on("click", function () {
        $("#calender").position({
            my: "left top ",
            at: "left bottom ",
            of: "#calenderBtn",
            collision: "fit"
        });
        $("#calender").slideToggle(300, function () {
            if ($("#calender").is(":hidden")) {
                $("#calender").css({
                    top: 0,
                    left: 0
                });
            }
        }); // end of slide toggle
    });
});

function updateTime() {
    $("#todayDate").text(getTodayDate(new Date()));
    $("#currentTime").text(getTodayTime(new Date()));
    let ss = new Date().getSeconds();
    //為了不要耗費背景資源，當秒數為整時，將時間調為1分鐘設定一次
    // if (ss === 0) {
    //   timeout = 60000;
    // }
    setTimeout(updateTime, timeout);
}

function getTodayDate(date) {
    let yyyy = date.getFullYear();
    let MM = date.getMonth() + 1;
    let dd = date.getDate();
    return (yyyy + '/' + addZeroBefore(MM) + '/' + addZeroBefore(dd));
}

function getTodayTime(date) {
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    return (addZeroBefore(hh) + ':' + addZeroBefore(mm) + ':' + addZeroBefore(ss));
    // let AMPM = hh >= 12 ? 'PM' : 'AM';
    // hh = hh % 12;
    // hh = hh ? hh : 12;
    //return (addZeroBefore(hh) + ':' + addZeroBefore(mm) + ' ' + AMPM);
}

function addZeroBefore(n) {
    return (n < 10 ? '0' : '') + n;
}

function initFunctionTree() {
    let treeView = [];
    let currentTreeView = "";
    let currentTreeViewMenu = "";
    let treeViewHTML = "";
    if (sideMenu == null || sideMenu.modules == null) return;
    $.each(sideMenu.modules, function (index, module) {
        // currentTreeView = sideMenu.modules[index];
        treeView.push(module.moduleValue);
        if (module === null)
            return;
        treeViewHTML += `
                        <li class="nav-item">
                            <a class="nav-link" style="cursor:pointer;">
                                <i class="nav-icon ` + module.moduleIcon + `"></i>
                                <p>
                                    ${treeView[index]}
                                    <i class="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                        `;
        $.each(module.function, function (index, func) {
            if (func === null)
                return;
            treeViewHTML += `
                            <li class="nav-item">
                                <a href=${func.backUrl} class="nav-link">
                                    <i class="fa fa-genderless"></i>
                                    <p>${func.functionValue}</p>
                                </a>
                            </li>
                            `;
        }); // end of each

        treeViewHTML += `</ul></li>`;
        $("#sidemenu-treeview").html(treeViewHTML);
    });
    let section = window.location.pathname.split("/");
    let treeViewLink = ($("#sidemenu-treeview").find(`a[href='${section.slice(0, 5).join("/")}']`).length) ? section.slice(0, 5).join("/") : section.slice(0, 4).join("/");
    $("#sidemenu-treeview").find(`a[href='${treeViewLink}']`).addClass("active");
    $("#sidemenu-treeview").find(`a[href='${treeViewLink}']`).parents("ul.nav-treeview").last().show();
    $("#sidemenu-treeview").find(`a[href='${treeViewLink}']`).parents("li.nav-item").last().addClass("menu-is-opening menu-open");
    let breadcrumbCount = $("#sidemenu-treeview").find(`a[href='${treeViewLink}']`).parents("li").length;
    for (let i = breadcrumbCount - 1; i >= 0; i--) {
        let item = $("#sidemenu-treeview").find(`a[href='${treeViewLink}']`).parents("li")[i];
        let breadcrumbItem = `
                            <li class="breadcrumb-item">
                                <a></a>
                            </li>`;
        let breadcrumbLink = ($("#sidemenu-treeview").find(`a[href='${section.slice(0, 5).join("/")}']`).length) ? "" : $(item).find('a').first().attr("href");
        breadcrumbItem = $(breadcrumbItem).find('a').attr("href", !($(item).find(`a[href='${section.slice(0, 5).join("/")}']`).length) ? breadcrumbLink : undefined).parents().last();
        $('body').find("ol.breadcrumb").append(breadcrumbItem);
        $('body').find("ol.breadcrumb .breadcrumb-item a").last().text($(item).find("p").first().text());
    }
}

