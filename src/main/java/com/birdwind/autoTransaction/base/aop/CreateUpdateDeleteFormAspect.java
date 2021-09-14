package com.birdwind.autoTransaction.base.aop;

import com.birdwind.autoTransaction.base.view.BaseForm;

public abstract class CreateUpdateDeleteFormAspect<C extends BaseForm, U extends BaseForm, D extends BaseForm>
    extends AbstractAuthFormAspect<C, U, D> {

}
