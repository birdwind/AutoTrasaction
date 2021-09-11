package com.birdwind.springBootInit.base.view;


import com.birdwind.springBootInit.base.enums.BaseEnum;
import com.birdwind.springBootInit.base.view.abstracts.AbstractListItem;

public final class EnumListItem extends AbstractListItem {

    public EnumListItem(BaseEnum baseEnum) {
        setText(baseEnum.valueOfName());
        setValue(baseEnum.valueOf());
    }

}
