/*grid*/
function getMemberGroupToolBarHTML() {
  let getMemberGroupToolBarHTML = `
                               <div><span id="add" class="fa fa-plus k-button-icontext k-grid-add"></span>
                                    <span id="delete" onclick="deleteRow()">
                                      <i class="fa fa-trash"></i>
                                  </span>
                                  <span class="search">
                                      <span <i class="fa fa-search"></span>
                                      <input class="form-control" placeholder=${i18n.ui.message.search} type="text"><nav>&times;</nav>
                                  </span>
                               </div>
                              `;
  return getMemberGroupToolBarHTML;
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
