package com.birdwind.springBootInit.base.view.converter;


import com.birdwind.springBootInit.base.dto.basic.SimpleConverter;
import com.birdwind.springBootInit.base.repo.BaseModel;
import com.birdwind.springBootInit.base.view.BaseForm;

public abstract class AbstractFormConverter<S extends BaseForm, T extends BaseModel> implements SimpleConverter<S, T> {

}
