package com.birdwind.autoTransaction.entityFieldFilter;

import com.birdwind.autoTransaction.base.view.filter.EntityFieldFilter;

public enum TransactionEntityFieldFilter implements EntityFieldFilter {

    member{
        @Override
        public String getEntityField() {
            return "member.name";
        }
    },
}
