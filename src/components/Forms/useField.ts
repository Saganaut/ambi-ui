import { useId } from "react";
import {
  resolveDataStatus,
  resolveHasError,
  resolveHasMessage,
  resolveVariant,
} from "../../utils/utils";
import type { FieldVariant, ValidationState } from "./Field.types";

interface UseFieldProps {
  id?: string;
  infoMessage?: string | string[];
  errorMessage?: string | string[];
  validationState?: ValidationState;
  variant: FieldVariant;
}

export function useField({
  id,
  infoMessage,
  errorMessage,
  validationState,
  variant,
}: UseFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const hasMessage = resolveHasMessage(errorMessage, infoMessage);
  const hasError = resolveHasError(errorMessage, validationState);
  const dataStatus = resolveDataStatus(hasError, validationState);
  const inputVariant = resolveVariant(hasError, variant);

  const describedBy = hasMessage ? messageId : undefined;
  const busy = validationState === "validating" || undefined;
  const invalid = hasError ?? undefined;

  const aria = {
    describedBy,
    busy,
    invalid,
  };

  return {
    inputId,
    messageId,
    hasMessage,
    hasError,
    dataStatus,
    inputVariant,
    aria,
  };
}
