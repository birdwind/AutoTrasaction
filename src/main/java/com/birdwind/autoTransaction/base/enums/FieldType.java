package com.birdwind.autoTransaction.base.enums;

public enum FieldType {

    STRING("string"), NUMBER("number"), DATE("date"), BOOLEAN("boolean");

    private String value;

    FieldType(String value) {
        this.value = value;
    }

    public String valueOf() {
        return this.value;
    }

}
