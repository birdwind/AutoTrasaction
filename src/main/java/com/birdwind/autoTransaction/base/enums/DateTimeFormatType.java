package com.birdwind.autoTransaction.base.enums;

import com.birdwind.autoTransaction.base.utils.DateTimeUtils;
import java.util.Date;

public enum DateTimeFormatType {

    DATE {
        @Override
        public String format(Object date) {
            if (date == null) {
                return "";
            }

            if (date instanceof Date) {
                return DateTimeUtils.dateFormat((Date) date);
            }

            return "";
        }
    },
    MINUTE {
        @Override
        public String format(Object date) {
            if (date == null) {
                return "";
            }

            if (date instanceof Date) {
                return DateTimeUtils.minuteFormat((Date) date);
            }

            return "";
        }
    },
    SECOND {
        @Override
        public String format(Object date) {
            if (date == null) {
                return "";
            }

            if (date instanceof Date) {
                return DateTimeUtils.datetimeFormat((Date) date);
            }

            return "";
        }
    },
    DEFAULT {
        @Override
        public String format(Object date) {
            return MINUTE.format(date);
        }
    },
    SHORT {
        @Override
        public String format(Object date) {
            if (date == null) {
                return "";
            }

            if (date instanceof Date) {
                return DateTimeUtils.shortFormat((Date) date);
            }

            return "";
        }
    };

    public abstract String format(Object date);

}
