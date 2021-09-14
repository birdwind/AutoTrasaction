package com.birdwind.autoTransaction.entityFieldFilter;

import com.birdwind.autoTransaction.base.view.filter.EntityFieldFilter;

public enum InvestDepositEntityFieldFilter implements EntityFieldFilter {

    member{
        @Override
        public String getEntityField() {
            return "investMemberRelates.member.name";
        }
    },
    investNo{
        @Override
        public String getEntityField() {
            return "investNo";
        }
    },
    amount{
        @Override
        public String getEntityField() {
            return "amount";
        }
    },
    amountNote{
        @Override
        public String getEntityField() {
            return "amountNote";
        }
    },
    investTypeUuid{
        @Override
        public String getEntityField() {
            return "investType.investTypeValue";
        }
    },
    investDate{
        @Override
        public String getEntityField() {
            return "investDate";
        }
    },
    createDate{
        @Override
        public String getEntityField() {
            return "createDate";
        }
    },
}
