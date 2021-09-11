package com.birdwind.springBootInit.base.view.filter;

import com.birdwind.springBootInit.base.enums.FilterOperator;
import com.birdwind.springBootInit.base.repo.BaseModel;
import com.birdwind.springBootInit.base.utils.DateTimeUtils;
import com.birdwind.springBootInit.base.utils.ValueUtils;
import org.apache.commons.lang3.StringUtils;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.Objects;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.From;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchProperty {

    private FilterOperator operator;

    private Boolean isStringify = false;

    private String propertyName;

    private Object propertyValue;

    public SearchProperty(FilterField filterField) {
        this(filterField.getOperator(), filterField.getField(), filterField.getValue());
    }

    private SearchProperty(FilterOperator operator, String propertyName, Object propertyValue) {
        this.operator = operator;
        this.isStringify = FilterOperator.isStringify(operator);
        this.propertyName = propertyName;
        this.propertyValue = propertyValue;
    }

    @SuppressWarnings("unchecked")
    <X extends Comparable<? super X>> Predicate getPredicate(Root<? extends BaseModel> root,
                                                             CriteriaBuilder criteriaBuilder) {
        Expression<?> expression = null;

        try {
            if (StringUtils.contains(propertyName, "/")) {
                String[] splits = StringUtils.split(propertyName, "/");

                Predicate[] predicates =
                        Arrays.stream(splits).map(split -> new SearchProperty(operator, split, propertyValue))
                                .map(searchProperty -> searchProperty.getPredicate(root, criteriaBuilder))
                                .filter(Objects::nonNull).toArray(Predicate[]::new);

                return criteriaBuilder.or(predicates);
            }

            if (StringUtils.contains(propertyName, ".")) {
                expression = getJoinExpression(root, StringUtils.split(propertyName, "."));
            } else {
                expression = root.get(propertyName);
            }

            Object value;

            if (isStringify) {
                return getStringifyPredicate((Expression<String>) expression, criteriaBuilder, propertyValue);
            }

            if (propertyValue == null) {
                value = null;
            } else if (expression.getJavaType().equals(BigDecimal.class)) {
                value = ValueUtils.castToBigDecimal(propertyValue);
            } else if (expression.getJavaType().equals(Float.class)) {
                value = ValueUtils.castToFloat(propertyValue);
            } else if (expression.getJavaType().equals(Date.class)) {
                value = DateTimeUtils.parseISO8601String(propertyValue.toString());
            } else {
                value = expression.getJavaType().cast(propertyValue);
            }

            return getPredicate((Expression<X>) expression, criteriaBuilder, (X) value);
        } catch (Exception e) {
            return null;
        }
    }

    private Expression<?> getJoinExpression(Root<?> root, String[] propertyNames) {
        return joinRecursive(root, propertyNames, 0);
    }

    private Expression<?> joinRecursive(From<?, ?> join, String[] propertyNames, Integer index) {
        if (index >= propertyNames.length - 1) {
            return join.get(propertyNames[index]);
        }

        return joinRecursive(join.join(propertyNames[index]), propertyNames, index + 1);
    }

    private <X extends Comparable<? super X>> Predicate getPredicate(Expression<? extends X> expression,
                                                                     CriteriaBuilder criteriaBuilder, X propertyValue1, X propertyValue2) {
        return criteriaBuilder.between(expression, propertyValue1, propertyValue2);
    }

    private <X extends Comparable<? super X>> Predicate getPredicate(Expression<? extends X> expression,
                                                                     CriteriaBuilder criteriaBuilder, X propertyValue) {

        if (operator.equals(FilterOperator.eq)) {
            return propertyValue == null ? criteriaBuilder.isNull(expression)
                    : criteriaBuilder.equal(expression, propertyValue);
        } else if (operator.equals(FilterOperator.neq)) {
            return propertyValue == null ? criteriaBuilder.isNotNull(expression)
                    : criteriaBuilder.notEqual(expression, propertyValue);
        } else if (operator.equals(FilterOperator.lte)) {
            return criteriaBuilder.lessThanOrEqualTo(expression, propertyValue);
        } else if (operator.equals(FilterOperator.lt)) {
            return criteriaBuilder.lessThan(expression, propertyValue);
        } else if (operator.equals(FilterOperator.gte)) {
            return criteriaBuilder.greaterThanOrEqualTo(expression, propertyValue);
        } else if (operator.equals(FilterOperator.gt)) {
            return criteriaBuilder.greaterThan(expression, propertyValue);
        }

        return null;
    }

    private Predicate getStringifyPredicate(Expression<String> expression, CriteriaBuilder criteriaBuilder,
                                            Object propertyValue) {
        String pattern = Objects.toString(propertyValue, StringUtils.EMPTY);

        if (operator.equals(FilterOperator.contains)) {
            pattern = "%" + pattern + "%";
        } else if (operator.equals(FilterOperator.startswith)) {
            pattern = "%" + pattern;
        } else if (operator.equals(FilterOperator.endswith)) {
            pattern = pattern + "%";
        }

        return criteriaBuilder.like(expression, pattern);
    }

}
