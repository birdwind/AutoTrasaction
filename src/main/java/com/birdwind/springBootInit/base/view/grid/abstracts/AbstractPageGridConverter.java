package com.birdwind.springBootInit.base.view.grid.abstracts;

import com.birdwind.springBootInit.base.enums.ViewTypeEnum;
import com.birdwind.springBootInit.base.repo.BaseModel;
import com.birdwind.springBootInit.base.utils.LocaleI18nUtils;
import com.birdwind.springBootInit.base.view.BaseRow;
import com.birdwind.springBootInit.base.view.converter.AbstractViewConverter;
import com.birdwind.springBootInit.base.view.grid.BaseGridConverter;
import com.birdwind.springBootInit.base.view.grid.BasePageConverter;
import com.google.common.collect.Maps;
import org.springframework.data.domain.Page;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AbstractPageGridConverter<S extends BaseModel, R extends BaseRow, PG extends AbstractPageGrid>
        extends AbstractViewConverter<S, R> implements BaseGridConverter<S, R, PG>, BasePageConverter<S, R, PG> {
    private static final ViewTypeEnum DEFAULT_VIEW_TYPE = ViewTypeEnum.LABEL;

    private static final Boolean DEFAULT_REQUIRED = false;

    private Class<S> sourceClass;

    private Class<R> rowClass;

    private Class<PG> pageGridClass;

    @Getter
    @Setter
    private boolean isCreate;

    @Getter
    private String prefix;

    @Getter
    private Map<String, ViewTypeEnum> headerViewTypeMap = Maps.newHashMap();

    @Getter
    private Map<String, Boolean> headerRequiredMap = Maps.newHashMap();

    @SuppressWarnings("unchecked")
    public AbstractPageGridConverter() {
        Type[] types = (((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments());

        this.sourceClass = (Class<S>) types[0];
        this.rowClass = (Class<R>) types[1];
        this.pageGridClass = (Class<PG>) types[2];

        this.prefix = LocaleI18nUtils.getI18nPrefix(sourceClass);
    }

    public PG convertToPageGrid(Page<S> page) {
        PG pageGrid = convertToPage(page);
        pageGrid.setHeader(getHeader());
        return pageGrid;
    }

    @Override
    public PG getInstance() {
        try {
            return pageGridClass.getDeclaredConstructor().newInstance();
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException
                | NoSuchMethodException e) {
            return null;
        }
    }

    @Override
    public Class<R> getRowClass() {
        return this.rowClass;
    }

    @Override
    public ViewTypeEnum getDefaultViewType() {
        return DEFAULT_VIEW_TYPE;
    }

    @Override
    public Boolean getDefaultRequired() {
        return DEFAULT_REQUIRED;
    }

    @Override
    protected void addTypeProvider(String name, ViewTypeEnum viewTypeEnum) {
        headerViewTypeMap.put(name, viewTypeEnum);
    }

    @Override
    protected void addTypeProvider(ViewTypeEnum viewTypeEnum, String... names) {
        for (String n : names) {
            headerViewTypeMap.put(n, viewTypeEnum);
        }
    }

    @Override
    protected void addRequiredProvider(String name, Boolean required) {
        headerRequiredMap.put(name, required);
    }

    @Override
    protected void addRequiredProvider(Boolean required, String... names) {
        for (String n : names) {
            headerRequiredMap.put(n, required);
        }
    }

    @Override
    public void addProviders() {
        // default no providers
    }

}
