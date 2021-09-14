package com.birdwind.autoTransaction.base.view.filter;

import com.birdwind.autoTransaction.base.utils.PageUtils;
import com.google.common.collect.Lists;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public final class FilterForm implements BaseFilterForm {

    private static final long serialVersionUID = 1L;

    @Min(value = 0)
    private Integer take = PageUtils.DEFAULT_SIZE;

    @Min(value = 0)
    private Integer skip = 0;

    @Min(value = 0)
    private Integer page = PageUtils.DEFAULT_PAGE;

    @Min(value = 0)
    private Integer size = PageUtils.DEFAULT_SIZE;

    @Valid
    private Filter filter;

    @Valid
    private List<Sorted> sort = Lists.newArrayList();

}

