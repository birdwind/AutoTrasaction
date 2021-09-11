function creatFunctionTree() {
  let treeView = [];
  let currentTreeView = "";
  let currentTreeViewMenu = "";
  let treeViewHTML = "";
  if (sideMenu == null || sideMenu.modules == null) return;
  $.each(sideMenu.modules, function (index, value) {
    currentTreeView = sideMenu.modules[index];
    treeView.push(currentTreeView.moduleValue);
    if (value === null)
      return;
    treeViewHTML += `
                    <li class="treeview">
                      <a href="javascript:void(0)">
                      <nav class="sideMenuIcon" style="background-image: url('` + currentTreeView.moduleIcon + `');"></nav>
                      <span class="treeViewBtn">${treeView[index]}</span>
                      <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                      </span>
                      </a>
                      <ul class="treeview-menu">
                    `;
    $.each(currentTreeView.function, function (index, value) {
      if (value === null)
        return;
      currentTreeViewMenu = currentTreeView.function[index];
      treeViewHTML += `<li class="functionBtn"><a href=${currentTreeViewMenu.backUrl}><i class="fa fa-genderless"></i>${currentTreeViewMenu.functionValue}</a></li>`
    }); // end of each
    treeViewHTML += `</ul></li>`;
    $("#sidemenu-treeview").html(treeViewHTML);
  }); // end of each
  var section = window.location.pathname.split("/");
  section = ($("#sidemenu-treeview").find(`a[href='${section.slice(0, 5).join("/")}']`).length) ? section.slice(0, 5).join("/") : section.slice(0, 4).join("/");
  $("#sidemenu-treeview").find(`a[href='${section}']`).addClass("selectedLink");
  $("#sidemenu-treeview").find(`a[href='${section}']`).closest("ul.treeview-menu").show();
  $("#sidemenu-treeview").find(`a[href='${section}']`).closest("li.treeview").addClass("menu-open");
  $("#breadcrumb > li.active").text($(`ul.treeview-menu a[href='${section}']`).text())
  $("#breadcrumb > li:eq(1) > a").text($(`ul.treeview-menu a[href='${section}']`).closest("li.treeview").find("a > .treeViewBtn").text())
}
