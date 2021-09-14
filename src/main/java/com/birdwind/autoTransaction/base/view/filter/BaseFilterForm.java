package com.birdwind.autoTransaction.base.view.filter;

import com.birdwind.autoTransaction.base.view.BaseForm;
import java.util.List;

public interface BaseFilterForm extends BaseForm {

    Integer getTake();

    void setTake(Integer take);

    Integer getSkip();

    void setSkip(Integer skip);

    Integer getPage();

    void setPage(Integer page);

    Integer getSize();

    void setSize(Integer size);

    Filter getFilter();

    void setFilter(Filter filter);

    List<Sorted> getSort();

    void setSort(List<Sorted> sorts);

}
