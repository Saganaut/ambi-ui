// File upload component with drag-and-drop support and multi-file selection
import { Btn } from "@saganaut/ambi-ui";
import { Image, X } from "lucide-react";
import shared from "../Field.module.css";
import type { FileUploadProps } from "../Field.types";
import styles from "./FileUpload.module.css";
import { useFileUpload } from "./useFileUpload";

const FileUpload = ({
  label,
  accept,
  multiple = true,
  maxBytes,
  errorMessage,
  infoMessage,
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

  return (
    <div className={styles.fileUploadContainer}>
      {label && <label>{label}</label>}
      <div
        className={[styles.dropZone, isDragging && styles.dragging].filter(Boolean).join(" ")}
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
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref != null) ref.current = node;
          }}
          type="file"
          multiple={multiple}
          accept={accept}
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
        {infoMessage != null && <span className={styles.dropZoneHint}>{infoMessage}</span>}
      </div>
      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((file, i) => (
            <li key={`${file.name}-${file.size}-${file.lastModified}`} className={styles.fileItem}>
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
      {(rejection != null || errorMessage != null) && (
        <span
          className={[shared.inputInfoMessage, styles.message, shared.errorMessage]
            .filter(Boolean)
            .join(" ")}
        >
          {rejection ?? errorMessage}
        </span>
      )}
    </div>
  );
};

export { FileUpload };
