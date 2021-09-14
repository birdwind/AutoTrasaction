package com.birdwind.autoTransaction.base.utils;

import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;
import lombok.NonNull;

public class CounterUtils {

    public static Integer incrementAndGet(@NonNull AtomicInteger counter, Date date) {
        while (true) {
            int existingValue = counter.get();
            int newValue = DateTimeUtils.isCrossDay(date) ? 0 : existingValue + 1;
            if (counter.compareAndSet(existingValue, newValue)) {
                return newValue;
            }
        }
    }

}
