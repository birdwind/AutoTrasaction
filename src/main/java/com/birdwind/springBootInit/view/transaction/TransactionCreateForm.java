package com.birdwind.springBootInit.view.transaction;

import com.birdwind.springBootInit.base.constans.BaseErrorConstants;
import com.birdwind.springBootInit.base.view.abstracts.AbstractForm;
import com.birdwind.springBootInit.entity.model.Currency;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;
import java.util.Date;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionCreateForm extends AbstractForm {

    private static final long serialVersionUID = 1L;

    @NotBlank(message = BaseErrorConstants.NULL)
    @Size(max = 36, message = BaseErrorConstants.INVALID_UUID)
    private String transactionUuid;

    @NotNull(message = BaseErrorConstants.NULL)
    private int type;

    @NotNull(message = BaseErrorConstants.NULL)
    private String currencyName;

    @NotNull(message = BaseErrorConstants.NULL)
    @DecimalMin(value = "0.0", message = BaseErrorConstants.MUST_POSITIVE)
    private BigDecimal price;

    @NotNull(message = BaseErrorConstants.NULL)
    @DecimalMin(value = "0.0", message = BaseErrorConstants.MUST_POSITIVE)
    private BigDecimal quantity;

    @NotNull(message = BaseErrorConstants.NULL)
    private Date transactionDate;

    @JsonIgnore
    private Currency currency;
}
