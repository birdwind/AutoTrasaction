package com.birdwind.autoTransaction.base.system;

import com.birdwind.autoTransaction.base.view.BaseView;
import com.birdwind.autoTransaction.view.module.ModuleView;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SideMenuView implements BaseView {

    private static final long serialVersionUID = 1L;

    private String memberNo;

    private String name;

    private String username;

    private List<ModuleView> modules;

}
