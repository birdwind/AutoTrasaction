package com.birdwind.autoTransaction.base.view.grid;

import com.birdwind.autoTransaction.base.dto.basic.SimpleConverter;
import com.birdwind.autoTransaction.base.repo.BaseModel;
import com.birdwind.autoTransaction.base.view.BaseRow;
import org.springframework.data.domain.Page;

public interface BasePageConverter<S extends BaseModel, R extends BaseRow, P extends BasePage>
        extends SimpleConverter<S, R> {

    P getInstance();

    default P convertToPage(Page<S> page) {
        P pageView = getInstance();
        pageView.setContents(convert(page.getContent()));
        otherMapping(page, pageView);
        pageView.setCurrentPage(page.getPageable().getPageNumber());
        return pageView;
    }

}
