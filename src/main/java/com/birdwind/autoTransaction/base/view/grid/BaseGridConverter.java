package com.birdwind.autoTransaction.base.view.grid;

import com.birdwind.autoTransaction.base.annotation.Ignore;
import com.birdwind.autoTransaction.base.dto.basic.BaseConverter;
import com.birdwind.autoTransaction.base.dto.mapper.HeaderConverter;
import com.birdwind.autoTransaction.base.dto.mapper.column.Header;
import com.birdwind.autoTransaction.base.enums.ViewTypeEnum;
import com.birdwind.autoTransaction.base.repo.BaseModel;
import com.birdwind.autoTransaction.base.view.BaseRow;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;

public interface BaseGridConverter<S extends BaseModel, R extends BaseRow, G extends BaseGrid>
        extends BaseConverter<S, R>, HeaderConverter {

    G getInstance();

    Class<R> getRowClass();

    default G convertToGrid(S source) {
        return convertToGrid(Lists.newArrayList(source));
    }

    default G convertToGrid(Collection<S> sources) {
        G grid = getInstance();

        grid.setContents(convert(sources));
        addProviders();
        grid.setHeader(getHeader());
        getHeaderViewTypeMap().clear();
        getHeaderRequiredMap().clear();

        return grid;
    }

    void addProviders();

    Map<String, ViewTypeEnum> getHeaderViewTypeMap();

    Map<String, Boolean> getHeaderRequiredMap();

    default Map<String, Header> getHeader() {
        Map<String, Header> header = Maps.newLinkedHashMap();
        Arrays.stream(getRowClass().getDeclaredFields())
                .filter(field -> !Modifier.isStatic(field.getModifiers()) && !field.isAnnotationPresent(Ignore.class))
                .forEach(field -> {
                    String n = field.getName();
                    String v = Optional.ofNullable(getHeaderViewTypeMap().get(n)).map(ViewTypeEnum::value).orElse(null);
                    Boolean r = Optional.ofNullable(getHeaderRequiredMap().get(n)).orElse(null);
                    header.put(n, Header.getInstance(getTitle(field), v == null ? getType(field) : v,
                            r == null ? getRequired(field) : r, getKeyValue(field), getSearch(field)));
                });
        return header;
    }

}
