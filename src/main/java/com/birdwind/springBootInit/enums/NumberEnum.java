package com.birdwind.springBootInit.enums;

public enum NumberEnum {
    MEMBER("mem-"), ROLE("role-"), MODULE("module-"), FUNCTION("fun-"), TEAM("team-"), VOTE("vote-"), INVEST(
        "inv-"), TRANSACTION("tra-");

    private String value;

    NumberEnum(String value) {
        this.value = value;
    }

    public String valueOf() {
        return this.value;
    }
}
