package com.birdwind.autoTransaction.base.view;

import com.birdwind.autoTransaction.base.repo.AbstractModel;
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
