package com.birdwind.autoTransaction.base.view.converter;


import com.birdwind.autoTransaction.base.dto.basic.SimpleConverter;
import com.birdwind.autoTransaction.base.repo.BaseModel;
import com.birdwind.autoTransaction.base.view.BaseForm;

public abstract class AbstractFormConverter<S extends BaseForm, T extends BaseModel> implements SimpleConverter<S, T> {

}
