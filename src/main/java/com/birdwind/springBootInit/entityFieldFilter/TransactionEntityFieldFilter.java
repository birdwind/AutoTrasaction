package com.birdwind.springBootInit.entityFieldFilter;

import com.birdwind.springBootInit.base.view.filter.EntityFieldFilter;

public enum TransactionEntityFieldFilter implements EntityFieldFilter {

    member{
        @Override
        public String getEntityField() {
            return "member.name";
        }
    },
}
