package com.birdwind.springBootInit.base.view.grid;

import com.birdwind.springBootInit.base.view.BaseRow;
import com.birdwind.springBootInit.base.view.BaseView;
import java.util.Collection;

public interface BasePage extends BaseView {

    // 物件集合
    Collection<? extends BaseRow> getContents();

    void setContents(Collection<? extends BaseRow> contents);

    // 現在在第幾頁
    Integer getCurrentPage();

    void setCurrentPage(Integer currentPage);

    // 全部共有多少頁
    Integer getTotalPages();

    void setTotalPages(Integer totalPages);

    // 全部共有多少物件
    Long getTotalElements();

    void setTotalElements(Long totalElements);

    // 一頁最高的容納數量
    Integer getSize();

    void setSize(Integer size);

    // 一頁實際上包含的數量
    Integer getNumberOfElements();

    void setNumberOfElements(Integer numberOfElements);
}
