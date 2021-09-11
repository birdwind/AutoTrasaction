package com.birdwind.springBootInit.base.view.filter;

public interface EntityFieldFilter {

    String getEntityField();

    default String getSortEntityField() {
        return getEntityField();
    }

}
