let rootApi = "/investors/deposit";

$(async function(){
    await $("#grid").initKendoGrid({
        linkField: "investNo",
        linkUuid: "investUuid",
        url: rootApi,
        toolbar: kgrid_gridTemplate["toolbar-search"],
        advancedSearchWithPanel: false,
        sort:{
            field: "createDate",
            dir: "desc"
        },
        toolbarSearchField:['member', 'investNo'],
    });


    $('body').loading('stop');
});