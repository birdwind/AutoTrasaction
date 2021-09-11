//  在input 前方加 icon
var inputIcon = {
  "memberNo": "fa-list-ol",
  "name": "fa-user-circle",
  "username": "fa-address-card",
  "password": "fa-key",
  "confirmPassword": "fa-key",
  "email": "fa-envelope",
  "phone": "fa-phone",
  "mobile": "fa-mobile",
  "fax": "fa-fax",
  "department": "fa-building",
  "subDepartment": "fa-building-o",
  "title": "fa-tag",
  "nation": "fa-globe",
  "address": "fa-location-arrow",
  "contact": "fa-address-book-o",
  "contactPhone": "fa-phone-square",
  "contactMail": "fa-envelope-o",

};

function getTemplate(required, index, value, temp = "") {
  let formControl = (index === "nation" || index === "isPending" || index === "status" || index === "isMember") ? "" : "form-control";
  return `
          <div class="form-group">
              <label class="control-label col-lg-2 col-xs-3" ${required}" for="${index}">${value.title}</label>
              <div class="col-lg-6 col-xs-6">
                  <span class="inputIcon"><i class="fa ${inputIcon[index]}" aria-hidden="true"></i></span>  
                  <input id="${index}" name="${index}" type="text" class="${formControl} k-input" 
                   style="width:100%;" value="${value.value}" ${required} validationMessage="${i18n.ui.message.enter} ${value.title}" >
              </div>
             ${temp}
          </div>
        `;
}

function getEmailTemp() {
  let emailTemp = `
                   <!-- Default checked -->
                   <div class="col-lg-3 col-xs-3">
                        <label class="customcheck">
                            <input id="isVerify" type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label for="isVerify" id="checkboxText">${i18n.ui.btn.letterVerification}</label>
                   </div>
                  `;
  return emailTemp;
}

function getSystemGenerateTemp() {
  let systemGenerateTemp = `
                            <div class="col-lg-2">
                                <label class="switch">
                                    <input class="systemGenerateBtn" type="checkbox">
                                    <span class="slider round">
                                        <span class="slideBtnText">${i18n.ui.btn.systemGenerator}</span>
                                    </span>
                                </label>
                            </div>
                           `;
  return systemGenerateTemp;
}

function getLocationTemp() {
  let locationTemp = ` 
                      <div class="form-group">
                           <label class="control-label col-lg-2 col-xs-3">${i18n.memberAuth.member.location}</label> 
                           <div class="col-lg-6 col-xs-6">
                               <div id="address-form-control" class="input-group form-control">
                                   <span class="input-group-prepend">
                                       <span id="addressBtn" class="btn">
                                       <i class="fa fa-street-view" aria-hidden="true"></i>
                                       </span>
                                   </span>
                                   <span id="locationField" hidden>
                                       <span id="addressLocation"></span>
                                       <span id="locationDeleted" class="k-icon k-i-close"></span>
                                   </span> 
                               </div>
                           </div>
                           <div id ="locationChecked" class="col-lg-2 col-xs-2" hidden>
                               <i class="fa fa-check-circle" style="font-size:30px;color:#02cf32" ></i>
                           </div>
                      </div>
                    `;
  return locationTemp;
}

function getButtonTemp() {
  let buttonTemp = ` 
                    <div class="row">
                      <div class="col-lg-12 col-xs-12">
                        <section style="float:right">
                          <button type="button" class="btn btn-default btn-back">${i18n.ui.btn.back}</button>
                          <button id="save" type="button" class="btn btn-success btn-save">${i18n.ui.btn.save}</button>
                        </section>
                      </div>
                    </div>
                   `
  return buttonTemp;
}

function getErrorTemplate() {
  let errorTemplate = `
                       <div class="errorIcon">
                          <i class="fa fa-warning" style="color: red"></i>
                       </div>
                       <div class="k-widget k-tooltip-validation" >
                          <span class="k-icon k-warning"></span>#=message#
                          <div class="k-callout k-callout-n" ></div>
                       </div>
                       `;
  return errorTemplate;
}

function getErrorTypeTemplate(field, message) {
  let errorTypeTemplate = `
                           <div class="errorIcon k-invalid-msg" data-for=${field} role="alert" style="display: block;">
                              <iclass="fa fa-warning" style="color: red"></i>
                           </div>
                           <div class="k-widget k-tooltip-validation k-invalid-msg" data-for=${field} role="alert" style="display: block;">
                              ${message}
                              <div class="k-callout k-callout-n"></div>
                           </div>
                          `;
  return errorTypeTemplate;
}

function getMarkerMessage(center) {
  let markerMessage = `
                        <span>${i18n.ui.message.latitude}:${center["lat"]}
                              <br>
                              ${i18n.ui.message.longitude}:${center["lng"]}
                        </span><br><br>
                        <button id="confirmLocation" class="btn btn-success btn-xs" onclick="confirmLocation(event)">confirm</button>
                        <button id="cancelLocation" class="btn btn-danger btn-xs" onclick="cancelLocation()">cancel</button>
                      `;
  return markerMessage;
}

function getLatLngHTML(center) {
  let LatLngHTML = `
                     <span>
                        <b>${i18n.ui.message.longitude}</b>:${center["lng"]}
                        <b>${i18n.ui.message.latitude}</b>:${center["lat"]}&ensp;
                     </span>
                    `;
  return LatLngHTML;
}

function getModalHTML(countDown, action) {
  let message = "";
  if (action === "create") {
    message = i18n.ui.message.createSuccessMessage;
  }
  if (action === "update") {
    message = i18n.ui.message.updateSuccessMessage;
  }

  let modalHTML = `
                   <p>${message} 
                     <span id="countDown" class="color-green">${countDown}</span> 
                     ${i18n.ui.message.successMessageEnd}
                   </p>
                   `;
  return modalHTML;
}

/*detail*/
function getCannotModifiedHTML(required, index, value) {
  let CannotModifiedHTML = `
                            <div class="form-group">
                                <label class="control-label col-lg-2 col-xs-3" for="${index}">${value.title}</label>
                                <div class="col-lg-3 col-xs-5 text-nowrap" style="padding-top: 7px">
                                    <span id="${index}" name="${index}" >${value.value}</span>
                                </div>
                            </div>
                           `;
  return CannotModifiedHTML;
}

function getFileuploadHTML() {
  let fileuploadHTML = ` <div class="form-group">
                        <label class="control-label col-lg-2 col-xs-3">File upload<br>(.pdf.jpg)</label>
                        <div class="col-lg-5 col-xs-7">
                          <div class="control-group" id="fields">
                            <section>
                                <ul></ul>
                                <section>
                                  <div>
                                      <button type="button" id="upload" class="btn btn-primary">
                                              @File Upload@&nbsp;<i class='fa fa-upload'></i>
                                      </button>
                                      <input type="file" name='upload' multiple style="display:none;">
                                  </div>
                                  <div class="fileInfo">
                                  </div>
                                  <div id="files" class="attachment">
                                      <span>@File@<br/>(pdf, MAX 1MB)</span>
                                      <ul></ul>
                                  </div>
                                  <div id="images" class="attachment">
                                      <span>@Image@<br/>(MAX 1MB)</span>
                                      <ul></ul>
                                  </div>
                                </section>
                            </section>
                                <div id="uploadTemplate" style="display:none;">
                                 <section class="theprogress">
                                 <div class="fileName"></div>
                                     <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                                      </div> 
                                  </div>
                                 </section>
                                </div>
                                <ul id="fileTemplate" style="display:none;">
                                 <li style="display:none;">
                                  <button>
                                    <span></span>&nbsp;
                                    <i class='fa fa-download'></i>
                                  </button>
                                  <nav class="delete">×</nav>
                                 </li>
                                </ul>
                                <ul id="imgTemplate" style="display:none;">
                                 <li style="display:none;">
                                  <div class="imgThumbnail">
                                  </div>
                                  <nav class="delete">×</nav>
                                 </li>
                                </ul>
                          </div>
                        </div>
                     </div>
                    `;
  return fileuploadHTML;
}

/*detail end*/

/*grid*/
function getMemberToolBarHTML() {
  let getMemberToolBarHTML = `
                               <div><span id="add" class="fa fa-plus k-button-icontext k-grid-add"></span>
                                    <span id="delete" onclick="deleteRow(event)">
                                      <i class="fa fa-trash"></i>
                                  </span>
                                  <span class="search">
                                      <span <i class="fa fa-search"></span>
                                      <input class="form-control" placeholder=${i18n.ui.message.search} type="text"><nav>&times;</nav>
                                  </span>
                               </div>
                              `;
  return getMemberToolBarHTML;
}

/*grid end*/

/* changePassword*/

function getSentPasswordTemp() {
  let sentPasswordTemp = `
                            <div class="col-lg-2">
                                <label class="switch">
                                    <input id="sentPasswordBtn" type="checkbox">
                                    <span class="slider round">
                                        <span class="slideBtnText">${i18n.ui.btn.sentPasswordBtn}</span>
                                    </span>
                                </label>
                            </div>
                           `;
  return sentPasswordTemp;
}

/*changePassword end*/

/* editGroup*/
function getEditGroupTemp() {
  let editGroupTemp = `
                        <div class="demo-section k-content wide">
                            <div class="col-lg-12">
                                <div class="col-lg-6 col-xs-6 listTitle">
                                  <label><span><i class="fa fa-search"></i></span></label>
                                  <input type='text' id='optionalSearchBox' class='k-textbox' placeholder='未加入的群組' />
                                   <br><br>
                                  <select id="optional"></select>
                                </div>
                                <div class="col-lg-6 col-xs-6 listTitle">
                                  <label><span><i class="fa fa-search"></i></span></label>
                                  <input type='text' id='selectedSearchBox' class='k-textbox' placeholder='已加入的群組' />
                                   <br><br>
                                  <select id="selected"></select>
                                </div>
                            </div>
                          </div>
                          `;
  return editGroupTemp;
}

/*changePassword end*/
