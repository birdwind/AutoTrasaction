package com.birdwind.autoTransaction.entityFieldFilter;

import com.birdwind.autoTransaction.base.view.filter.EntityFieldFilter;

public enum MemberEntityFieldFilter  implements EntityFieldFilter {

    memberNo{
        @Override
        public String getEntityField() {
            return "memberNo";
        }
    },
    name{
        @Override
        public String getEntityField() {
            return "name";
        }
    },
    createDate{
        @Override
        public String getEntityField() {
            return "createDate";
        }
    },
}
