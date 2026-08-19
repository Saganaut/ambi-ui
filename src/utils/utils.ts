import type { FieldVariant, ValidationState } from "@components/Forms/Field.types";

type jcType = string | boolean | null | undefined;

export const jC = (args: jcType[]): string => {
  return `${args.filter(Boolean).join(" ")}`;
};

// - Validation-state derivation: hasMessage,
//   hasError, dataStatus, and effective variant.

// - A reusable label/message/status renderer.
// - Ref-merging logic used by Dropdown and
//   FileUpload.

export const resolveVariant = (hasError: boolean, variant: FieldVariant): FieldVariant => {
  return hasError ? "error" : variant;
};

export const resolveHasMessage = (
  errorMessage?: string | string[],
  infoMessage?: string | string[],
): boolean => {
  return errorMessage != null || infoMessage != null;
};

export const resolveHasError = (
  errorMessage?: string | string[],
  validationState?: ValidationState,
) => {
  return errorMessage != null || validationState === "invalid";
};

export const resolveDataStatus = (
  hasError: boolean,
  validationState?: ValidationState,
): ValidationState => {
  return hasError ? "invalid" : (validationState ?? "idle");
};
