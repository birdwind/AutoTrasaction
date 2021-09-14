package com.birdwind.autoTransaction.base.view.abstracts;

import com.birdwind.autoTransaction.base.view.BaseForm;
import com.birdwind.autoTransaction.base.view.EntityExclusionStrategy;
import com.birdwind.autoTransaction.base.view.SuperClassExclusionStrategy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public abstract class AbstractForm implements BaseForm {

    public String toJson() {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.setExclusionStrategies(new EntityExclusionStrategy(), new SuperClassExclusionStrategy());
        Gson gson = gsonBuilder.create();
        return gson.toJson(this);
    }

}
