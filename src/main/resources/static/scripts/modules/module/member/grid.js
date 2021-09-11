let rootApi = "/member";

$(async function(){
    await $("#grid").initKendoGrid({
        linkField: "memberNo",
        linkUuid: "memberUuid",
        url: rootApi,
        toolbar: kgrid_gridTemplate["toolbar-search"],
        advancedSearchWithPanel: false,
        sort:{
            field: "createDate",
            dir: "desc"
        },
        // toolbarSearchField:['currency', 'price', 'quantity', 'type'],
    });


    $('body').loading('stop');
});