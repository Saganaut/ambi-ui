import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import type {
  UseFloatingReturn,
  UseInteractionsReturn,
} from "@floating-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";
import type {
  DropdownOption,
  FieldVariant,
  ValidationState,
} from "../Field.types";
import { useField } from "../useField";

interface UseComboBoxProps {
  options: DropdownOption[];
  value: string;
  id?: string;
  infoMessage?: string | string[];
  errorMessage?: string | string[];
  validationState?: ValidationState;
  variant: FieldVariant;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

interface UseComboBoxReturn
  extends Pick<UseFloatingReturn<HTMLInputElement>, "floatingStyles" | "refs">,
    Pick<UseInteractionsReturn, "getReferenceProps" | "getFloatingProps"> {
  select: (index: number) => void;
  listboxId: string;
  portalRoot: HTMLElement | null;
  inputId: string;
  messageId: string;
  hasMessage: boolean;
  dataStatus: ValidationState;
  inputVariant: FieldVariant;
  aria: {
    describedBy: string | undefined;
    busy: true | undefined;
    invalid: boolean | undefined;
  };
  setOpen: (next: boolean) => void;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  filtered: DropdownOption[];
  isOpen: boolean;
  setInputValue: Dispatch<SetStateAction<string>>;
  activeIndex: number;
  selectedLabel: string;
  inputValue: string;
  optionRefs: RefObject<(HTMLLIElement | null)[]>;
}

export function useComboBox({
  disabled,
  onChange,
  id,
  options,
  value,
  infoMessage,
  errorMessage,
  validationState,
  variant,
}: UseComboBoxProps): UseComboBoxReturn {
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "";
  const [inputValue, setInputValue] = useState(selectedLabel);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const { inputId, messageId, hasMessage, dataStatus, inputVariant, aria } =
    useField({
      id,
      infoMessage,
      errorMessage,
      validationState,
      variant,
    });
  const listboxId = `${id ?? inputId}-listbox`;
  const filtered = useMemo(() => {
    const query = inputValue.trim().toLocaleLowerCase();
    if (!query || inputValue === selectedLabel) return options;
    return options.filter((option) =>
      option.label.toLocaleLowerCase().includes(query)
    );
  }, [inputValue, options, selectedLabel]);

  const setOpen = (next: boolean) => {
    setIsOpen(next);
    if (!next) setActiveIndex(-1);
  };

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    open: isOpen,
    onOpenChange: setOpen,
    placement: "bottom-start",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements }) {
          elements.floating.style.setProperty(
            "--combobox-reference-width",
            `${rects.reference.width.toString()}px`
          );
        },
      }),
    ],
  });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);
  const portalRoot = refs.domReference.current?.closest(
    "dialog"
  ) as HTMLElement | null;

  useEffect(() => setInputValue(selectedLabel), [selectedLabel]);
  useEffect(() => {
    if (activeIndex >= 0)
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);
  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  const select = (index: number) => {
    const option = filtered[index];
    if (!option) return;
    onChange?.(option.value);
    setInputValue(option.label);
    setOpen(false);
    refs.domReference.current?.focus();
  };

  return {
    select,
    listboxId,
    getReferenceProps,
    getFloatingProps,
    portalRoot,
    inputId,
    messageId,
    hasMessage,
    dataStatus,
    inputVariant,
    aria,
    floatingStyles,
    setOpen,
    setActiveIndex,
    filtered,
    isOpen,
    setInputValue,
    activeIndex,
    selectedLabel,
    refs,
    inputValue,
    optionRefs,
  };
}
