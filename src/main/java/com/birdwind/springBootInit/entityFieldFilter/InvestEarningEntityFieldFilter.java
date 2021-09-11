package com.birdwind.springBootInit.entityFieldFilter;

import com.birdwind.springBootInit.base.view.filter.EntityFieldFilter;

public enum InvestEarningEntityFieldFilter implements EntityFieldFilter {

    member{
        @Override
        public String getEntityField() {
            return "name";
        }
    },
}
