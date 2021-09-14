package com.birdwind.autoTransaction.view.function;

import com.birdwind.autoTransaction.base.view.BaseView;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FunctionView implements BaseView {

    private static final long serialVersionUID = 1L;

    private Integer functionId;

    private String functionNo;

    private String functionKey;

    private String functionValue;

    private Boolean status;

    private String note;

    private String backUrl;

}
