let rootApi = "/transaction";

$(async function(){
    await $("#grid").initKendoGrid({
        // linkField: "member",
        // linkUuid: "memberUuid",
        url: rootApi,
        toolbar: kgrid_gridTemplate["toolbar-search"],
        advancedSearchWithPanel: false,
        sort:{
            field: "transactionDate",
            dir: "desc"
        },
        toolbarSearchField:['currency', 'price', 'quantity', 'type'],
    });


    $('body').loading('stop');
});