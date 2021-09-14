package com.birdwind.autoTransaction.entityFieldFilter;

import com.birdwind.autoTransaction.base.view.filter.EntityFieldFilter;

public enum InvestEarningEntityFieldFilter implements EntityFieldFilter {

    member{
        @Override
        public String getEntityField() {
            return "name";
        }
    },
}
