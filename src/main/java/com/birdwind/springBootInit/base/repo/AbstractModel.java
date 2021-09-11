package com.birdwind.springBootInit.base.repo;

public abstract class AbstractModel implements BaseModel {

    @Override
    public boolean isCreate() {
        return getId() == 0;
    }

}
