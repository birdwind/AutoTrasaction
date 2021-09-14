package com.birdwind.autoTransaction.base.enums;

public enum FilterOperator {

    startswith, endswith, contains, eq, neq, gt, gte, lt, lte;

    public static boolean isStringify(FilterOperator filterOperator) {
        return FilterOperator.startswith.equals(filterOperator) || FilterOperator.endswith.equals(filterOperator)
                || FilterOperator.contains.equals(filterOperator);
    }

}
