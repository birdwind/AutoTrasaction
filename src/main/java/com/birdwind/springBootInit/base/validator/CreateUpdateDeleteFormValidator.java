package com.birdwind.springBootInit.base.validator;


import com.birdwind.springBootInit.base.view.BaseForm;

public abstract class CreateUpdateDeleteFormValidator<C extends BaseForm, U extends BaseForm, D extends BaseForm>
    extends AbstractFormValidator<C, U, D> {

}
