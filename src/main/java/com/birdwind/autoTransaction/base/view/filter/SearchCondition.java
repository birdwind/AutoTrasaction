package com.birdwind.autoTransaction.base.view.filter;

import com.birdwind.autoTransaction.base.enums.FilterOperator;
import com.birdwind.autoTransaction.base.enums.Logic;
import com.birdwind.autoTransaction.base.repo.BaseModel;
import com.google.common.collect.Lists;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import java.util.List;
import java.util.Objects;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchCondition<T extends BaseModel> implements BaseSearchCondition<T> {

    private static final long serialVersionUID = 1L;

    private Sort sort;

    private Pageable pageable;

    private Logic logic;

    private List<SearchProperty> searchProperties = Lists.newArrayList();

    private List<SearchProperty> customSearchProperties = Lists.newArrayList();

    @SuppressWarnings("unchecked")
    @Override
    public Specification<T> getSpecification() {
        return (root, query, cb) -> {
            Predicate filters = getPredicate(logic, searchProperties, root, cb);
            Predicate customs = getPredicate(Logic.and, customSearchProperties, root, cb);

            return ((CriteriaQuery<T>) query).select(root).where(mergePredicates(cb, filters, customs)).distinct(true)
                    .getRestriction();
        };
    }

    @Override
    public BaseSearchCondition<T> addSpecification(String filterField, FilterOperator operator, Object value) {
        customSearchProperties.add(new SearchProperty(new FilterField(filterField, operator, value)));
        return this;
    }

    @Override
    public BaseSearchCondition<T> addSpecification(String filterField, Object value) {
        customSearchProperties.add(new SearchProperty(new FilterField(filterField, value)));
        return this;
    }

    @Override
    public void clear() {
        customSearchProperties.clear();
    }

    private Predicate getPredicate(Logic logic, List<SearchProperty> properties, Root<? extends BaseModel> root,
                                   CriteriaBuilder cb) {
        if (properties == null || properties.isEmpty()) {
            return null;
        }

        Predicate[] predicates = properties.stream().map(searchProperty -> searchProperty.getPredicate(root, cb))
                .filter(Objects::nonNull).toArray(Predicate[]::new);

        if (Logic.or.equals(logic)) {
            return cb.or(predicates);
        } else {
            return cb.and(predicates);
        }
    }

    private Predicate mergePredicates(CriteriaBuilder cb, Predicate predicate1, Predicate predicate2) {
        if (predicate1 == null && predicate2 == null) {
            return cb.conjunction();
        }

        if (predicate1 == null) {
            return cb.and(predicate2);
        }

        if (predicate2 == null) {
            return cb.and(predicate1);
        }

        return cb.and(predicate1, predicate2);
    }

}
