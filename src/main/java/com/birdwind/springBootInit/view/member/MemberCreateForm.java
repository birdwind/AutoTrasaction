package com.birdwind.springBootInit.view.member;

import com.birdwind.springBootInit.base.annotation.Required;
import com.birdwind.springBootInit.base.constans.BaseErrorConstants;
import com.birdwind.springBootInit.base.view.abstracts.AbstractForm;
import com.birdwind.springBootInit.entity.model.Role;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberCreateForm extends AbstractForm {

    private static final long serialVersionUID = 1L;

    @NotBlank(message = BaseErrorConstants.NULL)
    @Size(max = 36, message = BaseErrorConstants.INVALID_UUID)
    private String memberUuid;

    @Required
    @NotBlank(message = BaseErrorConstants.NULL_OR_NOT_BLANK)
    private String name;

    private String roleUuid;

    private Role role;
}
