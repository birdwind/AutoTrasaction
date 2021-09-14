package com.birdwind.autoTransaction.base.annotation;

import com.birdwind.autoTransaction.base.view.BaseView;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 指定 {@link com.birdwind.autoTransaction.base.view.abstracts.AbstractTemplate} 的成分是哪個 View
 * <br><br>
 * 例:
 * <pre>
 * // MemberCoreTemplate 有 3 個 View
 * public class MemberCoreTemplate extends AbstractTemplate {
 *
 *     // memberCore 由 MemberCoreView 組成
 *    {@literal @}SubView(view = MemberCoreView.class)
 *     private Serializable memberCore;
 *
 *     // memberDetails 由 MemberDetailView 組成
 *     // singlton 代表是集合形式
 *    {@literal @}SubView(view = MemberDetailView.class, singlton = false)
 *     private Serializable memberDetails;
 *
 *     // attachment 由 AttachmentCoreView 組成
 *    {@literal @}SubView(view = AttachmentCoreView.class)
 *     private Serializable attachment;
 *
 * }
 *
 * // MemberCoreTemplate 輸出結果
 * {
 *   // memberCore 以物件形式呈現
 *   "memberCore": {...},
 *   // memberDetails 以陣列(集合)形式呈現
 *   "memberDetails": [
 *     {
 *       "emailAddition": {
 *         "title": "信箱",
 *         "required": false,
 *         "value": ""
 *       },
 *       "phone": {
 *         "title": "電話",
 *         "required": false,
 *         "value": "02-12345678"
 *       },
 *       "mobile": {
 *         "title": "手機",
 *         "required": false,
 *         "value": "0912-345-678"
 *       }
 *     },
 *     {
 *       "emailAddition": {
 *         "title": "信箱",
 *         "required": false,
 *         "value": "abs@mail.com"
 *       },
 *       "phone": {
 *         "title": "電話",
 *         "required": false,
 *         "value": ""
 *       },
 *       "mobile": {
 *         "title": "手機",
 *         "required": false,
 *         "value": "0987-987-654"
 *       }
 *     }
 *   ],
 *   "attachment": {...}
 * }
 * </pre>
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface SubView {

    /**
     * View class.
     *
     * @return the class
     */
    Class<? extends BaseView> view();

    /**
     * true 代表是陣列形式，false 代表是物件形式
     *
     * @return the boolean
     */
    boolean singlton() default true;

    /**
     * 只映射指定的欄位值名稱，優先權比except()高
     *
     * @return the string [ ]
     */
    String[] field() default {};

    /**
     * 排除指定的欄位值名稱，優先權比較低
     *
     * @return the string [ ]
     */
    String[] except() default {};

}
