package com.birdwind.autoTransaction.base.dto.mapper.column.converter;

import com.birdwind.autoTransaction.base.annotation.DateTimeFormatter;
import com.birdwind.autoTransaction.base.dto.mapper.column.DateStringColumn;
import com.birdwind.autoTransaction.base.dto.mapper.provider.DateStringColumnProvider;
import com.birdwind.autoTransaction.base.enums.DateTimeFormatType;
import java.lang.reflect.Field;
import java.util.Optional;

public interface DateStringColumnConverter<S> extends ColumnConverter<S, DateStringColumn> {

    @Override
    DateStringColumnProvider<S> getProvider();

    @Override
    default DateStringColumn apply(S s, Field field){
        DateTimeFormatType dateTimeFormatType =
                Optional.ofNullable(field.getDeclaredAnnotation(DateTimeFormatter.class))
                        .map(DateTimeFormatter::value).orElse(DateTimeFormatType.DEFAULT);

        DateStringColumn dateStringColumn = DateStringColumn.getInstance();
        String format = dateTimeFormatType.format(getProvider().provide(s, field));
        dateStringColumn.setValue(format);

        return dateStringColumn;
    };
}
