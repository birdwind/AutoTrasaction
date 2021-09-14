package com.birdwind.autoTransaction.base.system.converter;

import com.birdwind.autoTransaction.base.dto.basic.SimpleConverter;
import com.birdwind.autoTransaction.base.system.SystemFieldError;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MultipartFile;
import java.io.Serializable;

@Component
public class SystemFieldErrorConverter implements SimpleConverter<FieldError, SystemFieldError> {

    @Override
    public SystemFieldError convert(FieldError source) {
        SystemFieldError target = new SystemFieldError();

        target.setField(source.getField());
        target.setCode(source.getCode());
        String message =
            StringUtils.isEmpty(source.getDefaultMessage()) ? source.getCode() : source.getDefaultMessage();
//        target.setDefaultMessage(LocaleI18nUtils.getString(message));
        target.setDefaultMessage(message);
        target.setRejectedValue(getRejectValue(source.getRejectedValue()));

        return target;
    }

    private Serializable getRejectValue(Object obj) {
        if (obj instanceof MultipartFile) {
            MultipartFile file = (MultipartFile) obj;
            return file.getOriginalFilename();
        }
        return (Serializable) obj;
    }

}
