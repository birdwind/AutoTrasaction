package com.birdwind.springBootInit.controller.system;

import org.apache.commons.lang3.reflect.MethodUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class FileUploadController {

    // @Autowired
    // protected AttachmentCoreAbstractViewConverter attachmentCoreViewConverter;
    //
    // @Autowired
    // private AttachmentService attachmentService;
    //
    // @Autowired
    // private AttachmentCoreFormValidator attachmentCoreFormValidator;
    //
    // @Autowired
    // private AttachmentDetailFormConverter attachmentDetailFormConverter;
    //
    // @Autowired
    // private FileConverter fileConverter;
    //
    // @Autowired
    // private AttachmentCoreFormConverter attachmentCoreFormConverter;
    //
    // @InitBinder(value = "attachmentCoreForm")
    // public void bindAttachmentForm(WebDataBinder binder) {
    // binder.addValidators(attachmentCoreFormValidator);
    // }
    //
    // @ModelAttribute(name = "attachmentCoreForm")
    // public AttachmentCoreForm convertToAttachmentCoreForm(@RequestPart(required = false) MultipartFile[] uploadFiles,
    // @RequestPart(name = "attachment", required = false) AttachmentCoreForm attachmentCoreForm) {
    // if (Optional.ofNullable(uploadFiles).isPresent() && attachmentCoreForm != null) {
    // LinkedHashSet<AttachmentDetailForm> files = Arrays.stream(uploadFiles).map(fileConverter::convert)
    // .collect(Collectors.toCollection(LinkedHashSet::new));
    // attachmentCoreForm.setFiles(files);
    // return attachmentCoreForm;
    // }
    //
    // return new AttachmentCoreForm(true);
    // }
    //
    // // 寫入 attachmentCore 與 attachmentDetail 到資料庫，儲存檔案到伺服器
    // protected <M extends BaseModel> void saveFiles(M model, AttachmentCoreForm attachmentCoreForm) {
    // AttachmentCore attachmentCore =
    // attachmentService.saveAttachmentCore(attachmentCoreFormConverter.convert(attachmentCoreForm));
    //
    // try {
    // LinkedHashSet<AttachmentDetailForm> attachmentDetailForms =
    // attachmentCoreForm.getFiles().stream().map(attachmentDetailForm -> {
    // String fileName = attachmentDetailForm.getEncodeName() + "." + attachmentDetailForm.getExtension();
    // MultipartFile file = attachmentDetailForm.getFile();
    //
    // if (MultipartFileUtils.isPdf(file)) {
    // MultipartFileUtils.saveFile(file, fileName);
    // return attachmentDetailForm;
    // } else if (MultipartFileUtils.isImage(file)) {
    // return fileConverter.convert(attachmentDetailForm,
    // MultipartFileUtils.saveImage(file, fileName));
    // }
    //
    // return null;
    // }).filter(Objects::nonNull).collect(Collectors.toCollection(LinkedHashSet::new));
    //
    // attachmentService
    // .saveAttachmentDetails(attachmentDetailFormConverter.convert(attachmentCore, attachmentDetailForms));
    //
    // if (model != null) {
    // MethodUtils.invokeExactMethod(model, "setAttachmentCore", attachmentCore);
    // }
    // } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
    // throw new DataIntegrityViolationException(BaseErrorConstants.CAN_NOT_SAVE_ATTACHMENT);
    // }
    // }
    //
    // protected void deleteAllFiles(Collection<AttachmentCore> attachmentCores) {
    // if (CollectionUtils.isEmpty(attachmentCores)) {
    // return;
    // }
    //
    // if (!MultipartFileUtils.checkTrashCanIsExist()) {
    // throw new DataIntegrityViolationException(BaseErrorConstants.CAN_NOT_CREATE_TRASH_CAN);
    // }
    //
    // attachmentService.deleteAttachmentCoresAndAllAttachmentDetails(attachmentCores);
    // }
    //
    // protected <M extends BaseModel> void saveAndDeleteFiles(M model, AttachmentCoreForm attachmentCoreForm) {
    // if (attachmentCoreForm.isIgnore()) {
    // return;
    // }
    //
    // if (!MultipartFileUtils.checkTrashCanIsExist()) {
    // throw new DataIntegrityViolationException(BaseErrorConstants.CAN_NOT_CREATE_TRASH_CAN);
    // }
    //
    // attachmentService.deleteAttachmentDetailsByAttachmentDetailUuids(attachmentCoreForm.getDeleteFiles());
    //
    // saveFiles(model, attachmentCoreForm);
    // }

}
