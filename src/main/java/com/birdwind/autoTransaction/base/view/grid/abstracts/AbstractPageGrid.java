package com.birdwind.autoTransaction.base.view.grid.abstracts;

import com.birdwind.autoTransaction.base.dto.mapper.column.Header;
import com.birdwind.autoTransaction.base.view.BaseRow;
import com.birdwind.autoTransaction.base.view.grid.BaseGrid;
import com.birdwind.autoTransaction.base.view.grid.BasePage;
import java.util.Collection;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AbstractPageGrid implements BaseGrid, BasePage {

    private Map<String, Header> header;

    private Collection<? extends BaseRow> contents;

    // 全部共有多少物件
    private Long totalElements;

    // 一頁最高的容納數量
    private Integer size;

    // 一頁實際上包含的數量
    private Integer numberOfElements;

    // 現在在第幾頁
    private Integer currentPage;

    // 全部共有多少頁
    private Integer totalPages;

}
