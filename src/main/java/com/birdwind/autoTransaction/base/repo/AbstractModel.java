package com.birdwind.autoTransaction.base.repo;

public abstract class AbstractModel implements BaseModel {

    @Override
    public boolean isCreate() {
        return getId() == 0;
    }

}
