package com.birdwind.autoTransaction.base.view.filter;

import com.birdwind.autoTransaction.base.enums.SortedOperator;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public final class Sorted {

    @NotBlank
    private String field;

    @NotNull
    private SortedOperator dir;

}
