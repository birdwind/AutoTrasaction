let baseUrl = "/investors/deposit"
let backUrl = "/page" + baseUrl;
let rootApi = "/api" + baseUrl;
let formName = "invest";
let investTypeData = getApiDataKendo(rootApi + "/list/");
let memberData = getApiDataKendo(rootApi + "/list/member");
let formData;

$(function (){
    formData = $('#form').formWizard({
        id: "investUuid",
        url: rootApi + "/template/" + uuid,
        mainData: "response.investDeposit",
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
            url: rootApi + uuid,
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

    let investResponse = fw_formData.response.investDeposit;
    let investType = investResponse.investTypeUuid.value ? investResponse.investTypeUuid.value : null;
    if(!uuid.length){
        setDropDownListUI("[name='investTypeUuid']", investTypeData, investType, null);
        setDropDownListUI("[name='memberUuid']", memberData, null, null);
    }

}