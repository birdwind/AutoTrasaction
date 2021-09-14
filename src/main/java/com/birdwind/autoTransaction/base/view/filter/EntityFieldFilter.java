package com.birdwind.autoTransaction.base.view.filter;

public interface EntityFieldFilter {

    String getEntityField();

    default String getSortEntityField() {
        return getEntityField();
    }

}
