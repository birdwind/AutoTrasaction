package com.birdwind.springBootInit.base.view.filter;

import com.birdwind.springBootInit.base.enums.FilterOperator;
import com.birdwind.springBootInit.base.repo.BaseModel;
import org.springframework.data.jpa.domain.Specification;

public interface BaseSearchCondition<T extends BaseModel> {

    Specification<T> getSpecification();

    BaseSearchCondition<T> addSpecification(String filterField, FilterOperator operator, Object value);

    BaseSearchCondition<T> addSpecification(String filterField, Object value);

    void clear();

}
