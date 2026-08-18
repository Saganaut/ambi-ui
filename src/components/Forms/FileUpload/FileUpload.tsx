// File upload component with drag-and-drop support and multi-file selection
import { Image, X } from "lucide-react";
import variantStyles from "../../../styles/variants.module.css";
import { jC } from "../../../utils/utils";
import { Btn } from "../../Buttons/Btn";
import shared from "../Field.module.css";
import type { FileUploadProps } from "../Field.types";
import { useField } from "../useField";
import styles from "./FileUpload.module.css";
import { useFileUpload } from "./useFileUpload";

const FileUpload = ({
  label,
  labelPosition = "top",
  extraLabelInfo,
  accept,
  multiple = true,
  maxBytes,
  errorMessage,
  infoMessage,
  fullWidth = false,
  reserveMessageSpace = true,
  className,
  validationState,
  variant = "primary",
  fill = "default",
  shape = "default",
  fieldSize = "md",
  id,
  onChange,
  ref,
  ...rest
}: FileUploadProps) => {
  const {
    files,
    isDragging,
    rejection,
    inputRef,
    addFiles,
    removeFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    openPicker,
  } = useFileUpload({ onChange, multiple, accept, maxBytes });
  const displayedError = rejection ?? errorMessage;
  const { inputId, messageId, hasMessage, dataStatus, inputVariant, aria } =
    useField({
      id,
      infoMessage,
      errorMessage: displayedError,
      validationState,
      variant,
    });

  return (
    <div
      data-fill={fill === "default" ? undefined : fill}
      className={jC([
        shared.fieldBlock,
        shared[labelPosition],
        fullWidth && shared.fullWidth,
        className,
        variantStyles[inputVariant],
        reserveMessageSpace && shared.reserveMessageSpace,
        shared[fieldSize],
        inputVariant !== "brand" && shared[inputVariant],
      ])}
    >
      {label && (
        <div className={shared.labelWrapper}>
          <label htmlFor={inputId}>{label}</label>
          {extraLabelInfo && (
            <div className={shared.extraLabelInfo}>{extraLabelInfo}</div>
          )}
        </div>
      )}
      <div
        className={jC([
          shared.fieldWrapper,
          fullWidth && shared.fullWidth,
          styles.fileUploadContainer,
          styles[fieldSize],
        ])}
        data-status={dataStatus}
      >
        <div
          className={jC([
            styles.dropZone,
            shape !== "default" && styles[shape],
            isDragging && styles.dragging,
          ])}
          onClick={openPicker}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") openPicker();
          }}
        >
          <input
            {...rest}
            id={inputId}
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref != null) ref.current = node;
            }}
            type="file"
            multiple={multiple}
            accept={accept}
            aria-invalid={aria.invalid}
            aria-busy={aria.busy}
            aria-describedby={aria.describedBy}
            onChange={(e) => {
              addFiles(e.target.files);
            }}
          />
          <Image className={styles.dropZoneIcon} aria-hidden="true" />
          <span className={styles.dropZoneText}>
            {isDragging ? "Drop files here" : "Drag & drop files"}
          </span>
          {!isDragging && (
            <span className={styles.dropZoneBrowse}>
              or <span className={styles.browseLink}>browse files</span>
            </span>
          )}
        </div>
        {files.length > 0 && (
          <ul className={styles.fileList}>
            {files.map((file, i) => (
              <li
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className={styles.fileItem}
              >
                <span className={styles.fileName}>{file.name}</span>

                <Btn
                  fill="ghost"
                  icon={<X />}
                  size="xs"
                  className={styles.removeFile}
                  onClick={() => {
                    removeFile(i);
                  }}
                  aria-label={`Remove ${file.name}`}
                />
              </li>
            ))}
          </ul>
        )}
        {hasMessage && (
          <span
            id={messageId}
            aria-live="polite"
            className={jC([
              shared.inputInfoMessage,
              shared.message,
              displayedError && shared.errorMessage,
            ])}
          >
            {displayedError ?? infoMessage}
          </span>
        )}
        {/* <div className={shared.statusIcon}>
          {dataStatus === "valid" && <Check />}
          {dataStatus === "validating" && <Loader />}
          {dataStatus === "invalid" && <X />}
        </div> */}
      </div>
    </div>
  );
};

export { FileUpload };
