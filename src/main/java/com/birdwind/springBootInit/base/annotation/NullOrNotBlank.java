package com.birdwind.springBootInit.base.annotation;

import com.birdwind.springBootInit.base.constans.BaseErrorConstants;
import org.hibernate.validator.constraints.CompositionType;
import org.hibernate.validator.constraints.ConstraintComposition;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.ReportAsSingleViolation;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

/**
 * 允許 {@code null} 或是字串 trim() 之後長度大於等於1的字串
 * <br><br>
 * 例:
 * <pre>
 *   String s0 = "";       // 空字串，不通過
 *   String s1 = null;     // 通過
 *   String s2 = "123";    // 通過
 *   String s3 = "  123 "; // 通過
 *   String s4 = " ";      // 空白字元，不通過
 *   String s5 = "     ";  // 空白字元，不通過
 * </pre>
 */
@ConstraintComposition(CompositionType.OR)
@Null
@NotBlank
@ReportAsSingleViolation
@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {})
public @interface NullOrNotBlank {

    /**
     * 顯示的錯誤訊息，預設是 BaseErrorConstants.INVALID_VALUE
     *
     * @return the string
     */
    String message() default BaseErrorConstants.NULL_OR_NOT_BLANK;

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
     * <pre>
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
     * }</pre>
     *
     * @return the class [ ]
     */
    Class<? extends Payload>[] payload() default {};

    @Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    public @interface List {
        NotNull[] value();
    }

}
