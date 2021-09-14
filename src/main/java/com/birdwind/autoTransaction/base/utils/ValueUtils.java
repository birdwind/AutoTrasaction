package com.birdwind.autoTransaction.base.utils;

import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import org.apache.commons.lang3.StringUtils;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import javax.annotation.Nullable;

public class ValueUtils {

    public static boolean isBooleanInteger(int i) {
        return i == 0 || i == 1;
    }

    public static List<String> collectionStringToList(String source) {
        if (source == null) {
            return Lists.newArrayList();
        }

        return Lists.newArrayList(Splitter.on(",").trimResults().split(source.substring(1, source.length() - 1)));
    }

    public static Set<String> collectionStringToSet(String source) {
        if (source == null) {
            return Sets.newHashSet();
        }

        return Sets.newHashSet(Splitter.on(",").trimResults().split(source.substring(1, source.length() - 1)));
    }

    public static String trimCollectionString(Collection<String> values) {
        if (values == null) {
            return null;
        }

        return values.isEmpty() ? null : values.stream().map(StringUtils::trim).collect(Collectors.toList()).toString();
    }

    public static BigDecimal castToBigDecimal(@Nullable Object value) throws ClassCastException {
        if (value == null) {
            throw new ClassCastException("null can not cast to BigDecimal.");
        }

        if (value.getClass().isAssignableFrom(String.class)) {
            return new BigDecimal(Objects.toString(value));
        }

        if (value.getClass().isAssignableFrom(Integer.class)) {
            return new BigDecimal((Integer) value);
        }

        if (value.getClass().isAssignableFrom(Double.class)) {
            return new BigDecimal((Double) value);
        }

        throw new ClassCastException(value + " can not cast to BigDecimal.");
    }

    public static Float castToFloat(@Nullable Object value) throws ClassCastException {
        if (value == null) {
            throw new ClassCastException("null can not cast to Float.");
        }

        return Float.parseFloat(Objects.toString(value));
    }

    public static String castToBigDecimalString(int scale, BigDecimal decimal) {
        if (BigDecimal.ZERO.compareTo(decimal) == 0) {
            return "0";
        }
        BigDecimal halfUp = decimal.setScale(scale, RoundingMode.HALF_UP).stripTrailingZeros();
        return halfUp.toString();
    }

    public static BigDecimal stripBigDecimal(int scale, BigDecimal decimal) {
        if (BigDecimal.ZERO.compareTo(decimal) == 0) {
            return BigDecimal.ZERO;
        }
        return decimal.setScale(scale, RoundingMode.HALF_UP).stripTrailingZeros();
    }

    public static String castToBigDecimalString(BigDecimal decimal) {
        if (BigDecimal.ZERO.compareTo(decimal) == 0) {
            return "0";
        }
        return decimal.stripTrailingZeros().toString();
    }

    public static BigDecimal stripBigDecimal(BigDecimal decimal) {
        if (decimal == null) {
            return null;
        }
        if (BigDecimal.ZERO.compareTo(decimal) == 0) {
            return BigDecimal.ZERO;
        }
        return decimal.stripTrailingZeros();
    }

}
