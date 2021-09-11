package com.birdwind.springBootInit.base.view.filter.converter;

import com.birdwind.springBootInit.base.dto.basic.BaseConverter;
import com.birdwind.springBootInit.base.enums.Logic;
import com.birdwind.springBootInit.base.enums.SortedOperator;
import com.birdwind.springBootInit.base.repo.BaseModel;
import com.birdwind.springBootInit.base.utils.PageUtils;
import com.birdwind.springBootInit.base.view.filter.BaseFilterForm;
import com.birdwind.springBootInit.base.view.filter.EntityFieldFilter;
import com.birdwind.springBootInit.base.view.filter.Filter;
import com.birdwind.springBootInit.base.view.filter.FilterField;
import com.birdwind.springBootInit.base.view.filter.FilterForm;
import com.birdwind.springBootInit.base.view.filter.SearchCondition;
import com.birdwind.springBootInit.base.view.filter.SearchProperty;
import com.birdwind.springBootInit.base.view.filter.Sorted;
import com.google.common.collect.Lists;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

public class FilterFormConverter<T extends BaseModel> implements BaseConverter<FilterForm, SearchCondition<T>> {

    private Class<?> clazz;

    public <F extends Enum<F> & EntityFieldFilter> FilterFormConverter(Class<F> entityFieldFilterClass) {
        this.clazz = entityFieldFilterClass;
    }

    @Override
    public final SearchCondition<T> convert(FilterForm source) {
        SearchCondition<T> target = new SearchCondition<>();

        if (source == null) {
            target.setPageable(PageUtils.getPageable());
            return target;
        }

        target.setLogic(Optional.ofNullable(source.getFilter()).map(Filter::getLogic).orElse(Logic.and));
        Sort sort = convertSort(source);
        target.setSort(sort);
        target.setPageable(convertPageable(source, sort));

        List<SearchProperty> searchProperties =
                Optional.ofNullable(source.getFilter()).map(Filter::getFilters).orElse(Lists.newArrayList()).stream()
                        .map(this::mapping).filter(Objects::nonNull).map(SearchProperty::new).collect(Collectors.toList());

        target.setSearchProperties(searchProperties);

        return target;
    }

    private Sort convertSort(BaseFilterForm source) {
        return Sort.by(Optional.ofNullable(source.getSort()).orElse(Lists.newArrayList()).stream().map(this::mapping)
                .filter(Objects::nonNull).collect(Collectors.toList()));
    }

    private Pageable convertPageable(BaseFilterForm source, Sort sort) {
        return PageUtils.getPageable(source.getPage(), source.getSize(), sort);
    }

    @SuppressWarnings("unchecked")
    private <F extends Enum<F> & EntityFieldFilter> FilterField mapping(FilterField filterField) {
        try {
            F filter = Enum.valueOf((Class<F>) clazz, filterField.getField());
            String entityField = filter.getEntityField();

            if (StringUtils.isBlank(entityField)) {
                return null;
            }

            filterField.setField(entityField);

            return filterField;
        } catch (NullPointerException | IllegalArgumentException e) {
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    private <F extends Enum<F> & EntityFieldFilter> Sort.Order mapping(Sorted sort) {
        try {
            F filter = Enum.valueOf((Class<F>) clazz, sort.getField());
            String sortEntityField = filter.getSortEntityField();

            if (StringUtils.isBlank(sortEntityField)) {
                return null;
            }

            sort.setField(sortEntityField);

            return sort.getDir() == SortedOperator.asc ? new Sort.Order(Sort.Direction.ASC, sort.getField())
                    : new Sort.Order(Sort.Direction.DESC, sort.getField());
        } catch (NullPointerException | IllegalArgumentException e) {
            return null;
        }
    }

}
