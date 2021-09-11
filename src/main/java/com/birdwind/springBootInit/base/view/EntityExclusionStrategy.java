package com.birdwind.springBootInit.base.view;

import com.birdwind.springBootInit.base.repo.AbstractModel;
import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

public class EntityExclusionStrategy implements ExclusionStrategy {

    @Override
    public boolean shouldSkipField(FieldAttributes fieldAttributes) {
        return AbstractModel.class.isAssignableFrom(fieldAttributes.getDeclaredClass());
    }

    @Override
    public boolean shouldSkipClass(Class<?> aClass) {
        return false;
    }

}
