package com.birdwind.autoTransaction.base.enums;

public enum ViewTypeEnum {

    ICON("icon"), BOOLEAN("boolean"), COMMAND("command"), CHECKBOX("checkbox"), DATE("date"), DATE_RANGE(
        "date_range"), DATETIME("datetime"), DATETIME_RANGE("datetime_range"), DEFAULT("default"), FLOAT(
            "float"), HIDDEN("hidden"), LABEL("label"), TEXTAREA_LABEL("textarea_label"), DROP_DOWN(
                "dropDown"), MULTI_SELECT("multiSelect"), MULTI_TEXT("multi_text"), PASSWORD(
                    "password"), TEXT("text"), TEXTAREA("textarea"), UNSIGNED_INTEGER("unsignedInteger");

    private String value;

    ViewTypeEnum(String value) {
        this.value = value;
    }

    public String value() {
        return this.value;
    }

}
