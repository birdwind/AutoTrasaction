let rootApi = "/investors/earning";

$(async function(){
    await $("#grid").initKendoGrid({
        linkField: "member",
        linkUuid: "memberUuid",
        url: rootApi,
        toolbar: kgrid_gridTemplate["toolbar-search"],
        advancedSearchWithPanel: false,
        sort:{
            field: "createDate",
            dir: "desc"
        },
        toolbarSearchField:['member'],
    });


    $('body').loading('stop');
});