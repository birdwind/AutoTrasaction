package com.birdwind.springBootInit.base.dto.mapper.column;

import lombok.Data;

@Data
final class NumberColumnImpl extends AbstractColumn implements NumberColumn {

    private Number value;

    NumberColumnImpl() {
        super();
    }
}
