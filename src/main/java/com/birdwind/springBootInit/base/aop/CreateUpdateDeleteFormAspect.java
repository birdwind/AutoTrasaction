package com.birdwind.springBootInit.base.aop;

import com.birdwind.springBootInit.base.view.BaseForm;

public abstract class CreateUpdateDeleteFormAspect<C extends BaseForm, U extends BaseForm, D extends BaseForm>
    extends AbstractAuthFormAspect<C, U, D> {

}
