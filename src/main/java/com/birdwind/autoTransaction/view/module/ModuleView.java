package com.birdwind.autoTransaction.view.module;

import com.birdwind.autoTransaction.base.view.BaseView;
import com.birdwind.autoTransaction.view.function.FunctionView;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModuleView implements BaseView {

    private static final long serialVersionUID = 1L;

    private Integer moduleId;

    private String moduleNo;

    private String moduleKey;

    private String moduleValue;

    private String moduleIcon;

    private Boolean status;

    private String note;

    private List<FunctionView> function;

}
