package com.birdwind.autoTransaction.base.dto.mapper.column;

import com.birdwind.autoTransaction.base.view.BaseListItem;
import java.util.List;

public interface Header extends Column {

    static Header getInstance() {
        return new HeaderImpl();
    }

    static Header getInstance(String title, String type, Boolean required, List<? extends BaseListItem> keyValue,
                              String search) {
        return new HeaderImpl(title, type, required, keyValue, search);
    }

}
