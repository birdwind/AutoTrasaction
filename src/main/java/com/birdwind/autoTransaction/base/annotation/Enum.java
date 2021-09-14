package com.birdwind.autoTransaction.base.annotation;

import com.birdwind.autoTransaction.base.constans.BaseErrorConstants;
import com.birdwind.autoTransaction.base.enums.BaseEnum;
import com.birdwind.autoTransaction.base.validator.EnumValidator;
import org.hibernate.validator.constraints.CompositionType;
import org.hibernate.validator.constraints.ConstraintComposition;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.ReportAsSingleViolation;

;

/**
 * 用於 {@link javax.validation.Valid} 檢查，判斷在 EnumClass 中有合法的 key / value
 */
@ConstraintComposition(CompositionType.OR)
@ReportAsSingleViolation
@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {EnumValidator.class})
public @interface Enum {

    /**
     * 顯示的錯誤訊息，預設是 BaseErrorConstants.INVALID_VALUE
     *
     * @return the string
     */
    String message() default BaseErrorConstants.INVALID_VALUE;

    /**
     * 將 validate annotation 進行分類，不同的類 groups 中會執行不同的 validator
     * <br>
     * 沒有群組的話，預設大家都是 javax.validation.groups.Default
     * <br><br>
     * 例： 表單中宣告 @Validated(value = {GET.class}), 只有 groups 有 GET.class 的 annotation 需要被檢查
     *
     * @return the class [ ]
     */
    Class<?>[] groups() default {};

    /**
     * 可用來描述該錯誤的嚴重程度，給予相對應的訊息。
     *
     * <pre>{@code
     * public class Severity {
     *     // 宣告錯誤等級： Info, Error
     *     public static class Info extends Payload {};
     *     public static class Error extends Payload {};
     * }
     * public class ContactDetails {
     *     // name 屬性若發生 NotNull 錯誤，代表 Error 等級的錯誤
     *    {@literal @}NotNull(message="Name is mandatory", payload=Severity.Error.class)
     *     private String name;
     *     // phoneNumber 屬性若發生 NotNull 錯誤，代表 Info 等級的錯誤
     *    {@literal @}NotNull(message="Phone number not specified, but not mandatory", payload=Severity.Info.class)
     *     private String phoneNumber;
     * }
     * }</pre>
     *
     * @return the class [ ]
     */
    Class<? extends Payload>[] payload() default {};

    /**
     * 可否接受 null 值
     *
     * @return the boolean
     */
    boolean nullable() default false;

    /**
     * 要比對的 enum 類別，須實作 {@link BaseEnum}
     *
     * @return the class
     */
    Class<? extends BaseEnum> enumClass();

}
