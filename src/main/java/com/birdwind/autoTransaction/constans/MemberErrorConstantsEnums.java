package com.birdwind.autoTransaction.constans;

import com.birdwind.autoTransaction.base.enums.BaseEnum;
import java.io.Serializable;

public enum MemberErrorConstantsEnums implements BaseEnum {

    MEMBER_LOGIN_NOT_FOUND(0, "Error.Member.LoginNotFound"), MEMBER_SUSPENDED(1,
        "Error.Member.Suspended"), MEMBER_PASSWORD_INVALID(2,
            "Error.Member.Password.InValid"), MEMBER_ORANGEID_DUPLICATE(3,
                "Error.Member.OrangeId.Duplicate"), MEMBER_USERNAME_DUPLICATE(4, "Error.Member.Username.Duplicate");

    MemberErrorConstantsEnums(Integer errorCode, String errorMsg) {
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }

    private Integer errorCode;

    private String errorMsg;

    @Override
    public Serializable valueOf() {
        return this.errorMsg;
    }

    @Override
    public String valueOfName() {
        return this.errorMsg;
    }

    public String valueOfCode() {
        return String.valueOf(this.errorCode);
    }
}
