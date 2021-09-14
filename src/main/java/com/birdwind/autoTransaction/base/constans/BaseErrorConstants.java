package com.birdwind.autoTransaction.base.constans;

public class BaseErrorConstants {

    public static final String API_VERSION = "0.0.1";

    // 共用錯誤
    public static final String NULL = "Error.Invalid.Null";

    public static final String MUST_NULL = "Error.Invalid.MustNull";

    public static final String NULL_OR_NOT_BLANK = "Error.Invalid.NullOrNotBlank";

    public static final String INVALID_LENGTH = "Error.Invalid.Length";

    public static final String INVALID_VALUE = "Error.Invalid.Value";

    public static final String INVALID_MIN_MAX = "Error.Invalid.MinMax";

    public static final String MUST_POSITIVE = "Error.Invalid.Positive";

    public static final String MUST_POSITIVE_INT = "Error.Invalid.PositiveInt";

    public static final String MUST_INTEGER = "Error.Invalid.Int";

    public static final String INVALID_EMAIL = "Error.Invalid.Email";

    public static final String INVALID_UUID = "Error.Invalid.Uuid";

    public static final String INVALID_DATA_INTEGRITY = "Error.Invalid.DataIntegrity";

    public static final String CRITERIA_UPDATE_NO_ID = "Error.Criteria.UpdateNoId";

    public static final String CAN_NOT_EDIT = "Error.Invalid.CanNotEdit";

    public static final String INVALID_SEARCH = "Error.Search.InvalidField";

    public static final String RELATE_NOT_MATCH = "Error.Invalid.CoreAndDetailNotMatch";

    public static final String START_TIME_IS_TOO_LATE = "Error.Invalid.StartTime.TooLate";

    public static final String END_TIME_IS_TOO_EARLY = "Error.Invalid.EndTime.TooEarly";

    public static final String FIELD_MISS = "Error.Field.MissField";

    // 系統錯誤
    public static final String FORM_ERROR = "Error.System.FormError";

    public static final String NO_PERMISSION = "Error.System.NoPermission";

    public static final String NOT_LOGIN = "Error.System.NotLogin";

    public static final String NOT_GUEST = "Error.System.NotGuest";

    public static final String EXPIRED_SESSION = "Error.System.ExpiredSession";

    public static final String RESOURCE_NOT_FOUND = "Error.System.ResourceNotFound";

    public static final String PAGE_NOT_FOUND = "Error.System.PageNotFound";

    public static final String API_NOT_FOUND = "Error.System.ApiNotFound";

    public static final String BAD_REQUEST = "Error.System.BadRequest";

    public static final String DATA_INCOMPLETE = "Error.System.DataInComplete";

    public static final String SERVER_ERROR = "Error.System.ServerError";

    public static final String SPECIAL_ERROR = "Error.System.SpecialError";

    public static final String FILE_COUNTS_NOT_MATCH = "Error.System.FileCountsNotMatch";

    public static final String METHOD_NOT_SUPPORT = "Error.System.MethodNotSupport";

    public static final String FILE_NOT_FOUND = "Error.System.FileNotFound";

    //登入成功
    public static final String LOGIN_SUCCESS = "登入成功";

    public static final String LOGIN_ERROR = "Error.System.LoginError";
}
