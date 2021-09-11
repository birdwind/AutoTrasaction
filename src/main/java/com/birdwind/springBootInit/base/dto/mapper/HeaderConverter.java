package com.birdwind.springBootInit.base.dto.mapper;

import com.birdwind.springBootInit.base.annotation.KeyValue;
import com.birdwind.springBootInit.base.annotation.Required;
import com.birdwind.springBootInit.base.annotation.Search;
import com.birdwind.springBootInit.base.annotation.ViewType;
import com.birdwind.springBootInit.base.enums.BaseEnum;
import com.birdwind.springBootInit.base.enums.ViewTypeEnum;
import com.birdwind.springBootInit.base.repo.BaseModel;
import com.birdwind.springBootInit.base.utils.LocaleI18nUtils;
import com.birdwind.springBootInit.base.view.BaseListItem;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;


public interface HeaderConverter {

    String getPrefix();

    ViewTypeEnum getDefaultViewType();

    Boolean getDefaultRequired();

    boolean isCreate();

    default String getTitle(Field field) {
        String capitalizeFieldName = StringUtils.capitalize(field.getName());
        String title = getPrefix() + capitalizeFieldName;

        if (field.isAnnotationPresent(ViewType.class)) {
            ViewType viewType = field.getDeclaredAnnotation(ViewType.class);

            if (StringUtils.isNotBlank(viewType.value())) {
                title = viewType.value();
            } else if (viewType.prefix() != BaseModel.class) {
                title = LocaleI18nUtils.getI18nPrefix(viewType.prefix()) + capitalizeFieldName;
            }
        }

        return LocaleI18nUtils.getString(title);
    }

    default String getType(Field field) {
        ViewTypeEnum viewTypeEnum = getDefaultViewType();

        if (field.isAnnotationPresent(ViewType.class)) {
            ViewType viewType = field.getDeclaredAnnotation(ViewType.class);

            if (ViewTypeEnum.DEFAULT.equals(viewType.both())) {
                viewTypeEnum = isCreate() ? viewType.create() : viewType.update();
            } else {
                viewTypeEnum = viewType.both();
            }
        }

        return viewTypeEnum.value();
    }

    default Boolean getRequired(Field field) {
        Boolean required = getDefaultRequired();

        if (field.isAnnotationPresent(Required.class)) {
            Required r = field.getDeclaredAnnotation(Required.class);
            required = isCreate() ? r.create() : r.update();
        }

        return required;
    }

    default List<? extends BaseListItem> getKeyValue(Field field) {
        return Optional.ofNullable(field).map(f -> f.getDeclaredAnnotation(KeyValue.class)).map(KeyValue::value)
            .map(BaseEnum::getList).orElse(null);
    }

    default String getSearch(Field field) {
        if (field.isAnnotationPresent(Search.class)) {
            Search search = field.getDeclaredAnnotation(Search.class);
            return search.type().valueOf();
        }

        return null;
    }

}
