let baseUrl = "/transaction";
let backUrl = "/page" + baseUrl;
let rootApi = "/api" + baseUrl;
let formName = "transaction";
let formData;
let transactionTypeDataSource = [{text:"買入",value:0}, {text:"賣出", value: 1}]
let currencyDataSource = getApiDataKendo(rootApi + "/list");

$(function (){
    formData = $('#form').formWizard({
        id: "transactionUuid",
        url: rootApi + "/template/" + uuid,
        mainData: "response.transaction",
        noData: "findnodata(backUrl)",
        customizeForm: "customizeForm",
    });

    $('body').loading('stop');

    $('#save').click(function (){
        if($('body').is(':loading')){
            return;
        }
        $('body').loading('toggle');

        formData = $('#form').formCheck({
            name: formName,
        });
        if(!formData){
            $('body').loading('stop');
            return;
        }
        $.ajax({
            url: rootApi,
            data: formData,
            method: (uuid.length) ? "POST" : "PUT",
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (data) {
                if(data.status){
                    showFormSuccess(backUrl);
                }else{
                    for (i of data.responseFieldError) {
                        $("#form [name='" + i.field + "']").errorMsg({
                            message: i.defaultMessage
                        });
                    }
                }
            } // end of ajax success
        }).then(function () {
            $('body').loading('stop');
        }); //end of ajax
    })
});

function customizeForm(){
    setDropDownListUIByJsonData("[name='type']", transactionTypeDataSource, null, null);
    $("[name='currencyName']").kendoAutoComplete({
        dataSource: currencyDataSource,
        filter: "contains",
        dataTextField: "text",
        // separator: ", "
    });

}