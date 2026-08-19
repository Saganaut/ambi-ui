import type { ComponentPropsWithRef, ReactNode } from "react";
import type { Prettify } from "../../utils/utils.types";
import type {
  BaseFills,
  BaseShapes,
  BaseSizes,
  BaseVariants,
} from "../Base.types";
import type { UseFieldProps } from "./useField";

export type FieldFill = BaseFills;
export type FieldShape = BaseShapes;
export type FieldSize = Exclude<BaseSizes, "xl">;
export type FieldVariant = BaseVariants;
export type ValidationState = "validating" | "idle" | "valid" | "invalid";

export interface FieldBase {
  name?: string;
  id?: string;
  required?: boolean;
  label?: string;
  labelPosition?: "top" | "start";
  extraLabelInfo?: ReactNode;
  infoMessage?: string | string[];
  errorMessage?: string | string[];
  validationState?: ValidationState;
  "aria-label"?: string;
  isDisabled?: boolean;
}

export interface FieldStyle {
  fill?: FieldFill;
  shape?: FieldShape;
  fieldSize?: FieldSize;
  variant?: FieldVariant;
  fullWidth?: boolean;
  reserveMessageSpace?: boolean;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export type DropdownProps = FieldBase &
  FieldStyle & {
    options: DropdownOption[];
    placeholder?: string;
    searchable?: boolean;
  } & Omit<ComponentPropsWithRef<"button">, "value" | "onChange"> &
  (
    | { multiple?: false; value?: string; onChange?: (value: string) => void }
    | { multiple: true; value?: string[]; onChange?: (value: string[]) => void }
  );

export type ComboboxProps = FieldBase &
  FieldStyle & {
    options: DropdownOption[];
    value?: string;
    onChange?: (value: string) => void;
    onInputValueChange?: (value: string) => void;
    noOptionsMessage?: string;
  } & Omit<ComponentPropsWithRef<"input">, "value" | "onChange">;

export interface UseDropdownArgs {
  useFieldProps: UseFieldProps;
  options: DropdownOption[];
  selectedValue?: string[] | string;
  searchable: boolean;
  multiple: boolean;
  disabled?: boolean;

  onChange?: (values: string[]) => void;
}

export type CheckboxProps = Omit<FieldBase, "labelPosition"> &
  FieldStyle &
  Omit<ComponentPropsWithRef<"input">, "type"> & {
    labelPosition?: "labelBefore" | "labelAfter";
    spaceBetween?: boolean;
  };

export type FileUploadProps = FieldBase &
  FieldStyle &
  Omit<ComponentPropsWithRef<"input">, "type" | "multiple" | "onChange"> & {
    multiple?: boolean;
    maxBytes?: number;
    onChange?: (files: File[]) => void;
  };

export type InputProps = FieldBase &
  FieldStyle &
  ComponentPropsWithRef<"input">;

export type InputWithButtonProps = FieldBase &
  FieldStyle &
  ComponentPropsWithRef<"input"> & {
    buttonLabel?: ReactNode;
    buttonIcon?: ReactNode;
    buttonIconPosition?: "left" | "right";
    buttonAriaLabel?: string;
    onButtonClick?: () => void;
  };

export type NumberInputProps = FieldBase &
  FieldStyle &
  Omit<ComponentPropsWithRef<"input">, "value" | "onChange"> & {
    value: number;
    onChange: (value: number) => void;
    compact?: boolean;
  };

export type RadioProps = FieldBase &
  FieldStyle &
  Omit<ComponentPropsWithRef<"input">, "type">;

export interface RadioGroupOption {
  value: string;
  label: string;
}

export type RadioGroupProps = FieldBase &
  Omit<ComponentPropsWithRef<"fieldset">, "onChange"> & {
    name: string;
    legend?: string;
    options: RadioGroupOption[];
    value: string;
    onChange: (value: string) => void;
    isDisabled?: boolean;
  };

export type TextAreaProps = FieldBase &
  FieldStyle &
  ComponentPropsWithRef<"textarea">;

export type ToggleProps = FieldBase &
  FieldStyle &
  Omit<ComponentPropsWithRef<"input">, "type">;

export type PrettifiedDropdownProps = Prettify<DropdownProps>;
