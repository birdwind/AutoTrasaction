package com.birdwind.springBootInit.base.view.abstracts;

import com.birdwind.springBootInit.base.view.BaseListItem;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AbstractListItem implements BaseListItem {

    private Serializable text;

    private Serializable value;
}
