package com.birdwind.autoTransaction.base.view;


import com.birdwind.autoTransaction.base.enums.BaseEnum;
import com.birdwind.autoTransaction.base.view.abstracts.AbstractListItem;

public final class EnumListItem extends AbstractListItem {

    public EnumListItem(BaseEnum baseEnum) {
        setText(baseEnum.valueOfName());
        setValue(baseEnum.valueOf());
    }

}
