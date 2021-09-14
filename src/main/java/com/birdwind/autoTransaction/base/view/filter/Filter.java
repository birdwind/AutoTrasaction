package com.birdwind.autoTransaction.base.view.filter;

import com.birdwind.autoTransaction.base.enums.Logic;
import com.birdwind.autoTransaction.base.view.abstracts.AbstractForm;
import java.util.List;
import javax.validation.Valid;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public final class Filter extends AbstractForm {

    private Logic logic;

    @Valid
    private List<FilterField> filters;

}
