/**
 * Owns selection and search state for the controlled Dropdown field.
 *
 * Dismissal belongs to the Floating UI boundary in Dropdown so portalled
 * options count as inside the field.
 */
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useTypeahead,
} from "@floating-ui/react";
import type {
  FloatingContext,
  UseFloatingReturn,
  UseInteractionsReturn,
} from "@floating-ui/react";
import { useEffect, useRef, useState } from "react";
import type {
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  SetStateAction,
} from "react";
import { inheritTheme } from "../../../utils/inheritTheme";
import type { DropdownOption, UseDropdownArgs } from "../Field.types";
import { useField } from "../useField";

type DropdownFloatingReturn = Pick<
  UseFloatingReturn<HTMLElement>,
  "refs" | "floatingStyles" | "placement"
> & {
  context: FloatingContext<HTMLElement>;
};

type UseDropdownReturn = DropdownFloatingReturn &
  UseInteractionsReturn &
  Omit<ReturnType<typeof useField>, "hasError"> & {
    activeIndex: number | null;
    optionLabels: RefObject<(string | null)[]>;
    optionRefs: RefObject<(HTMLElement | null)[]>;
    portalRoot: HTMLElement | null;
    isOpen: boolean;
    setOpen: (next: boolean) => void;
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    filtered: DropdownOption[];
    toggle: (optValue: string) => void;
    removeChip: (event: MouseEvent, value: string) => void;
    removeChipOnKey: (event: KeyboardEvent, value: string) => void;
    selectedValues: string[];
  };

const useDropdown = ({
  options,
  selectedValue,
  multiple,
  searchable,
  onChange,
  disabled,
  useFieldProps,
}: UseDropdownArgs): UseDropdownReturn => {
  const selectedValues = Array.isArray(selectedValue)
    ? selectedValue
    : selectedValue == null
      ? []
      : [selectedValue];

  const {
    inputId: dropdownId,
    messageId,
    hasMessage,
    dataStatus,
    inputVariant,
    aria,
  } = useField({ ...useFieldProps });

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const optionRefs = useRef<(HTMLElement | null)[]>([]);
  const optionLabels = useRef<(string | null)[]>([]);
  const filtered = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const selectedIndex = filtered.findIndex((option) =>
    selectedValues.includes(option.value),
  );

  const setOpen = (next: boolean) => {
    setIsOpen(next);
    if (!next) setQuery("");
  };

  const toggle = (optValue: string) => {
    let next: string[];
    if (multiple) {
      next = selectedValues.includes(optValue)
        ? selectedValues.filter((v) => v !== optValue)
        : [...selectedValues, optValue];
    } else {
      next = [optValue];
      setOpen(false);
    }
    onChange?.(next);
  };

  const removeChip = (e: React.MouseEvent, v: string) => {
    e.stopPropagation();
    onChange?.(selectedValues.filter((x) => x !== v));
  };

  const removeChipOnKey = (e: React.KeyboardEvent, v: string) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      onChange?.(selectedValues.filter((x) => x !== v));
    }
  };

  const { refs, floatingStyles, context, placement } = useFloating<HTMLElement>({
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
          if (elements.reference instanceof Element) {
            inheritTheme(elements.reference, elements.floating);
          }
          elements.floating.style.setProperty(
            "--dropdown-reference-width",
            `${rects.reference.width.toString()}px`,
          );
        },
      }),
    ],
  });
  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(null);
    } else if (!searchable && activeIndex != null) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen, searchable]);
  useEffect(() => {
    if (disabled && isOpen) {
      setOpen(false);
    }
  }, [disabled, isOpen, setOpen]);

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {
    listRef: optionRefs,
    activeIndex,
    selectedIndex: selectedIndex < 0 ? null : selectedIndex,
    onNavigate: setActiveIndex,
    focusItemOnOpen: !searchable,
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: optionLabels,
    activeIndex,
    selectedIndex: selectedIndex < 0 ? null : selectedIndex,
    onMatch: setActiveIndex,
    enabled: !searchable,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, listNavigation, typeahead],
  );
  const portalRoot = refs.domReference.current?.closest(
    "dialog",
  ) as HTMLElement | null;

  return {
    refs,
    activeIndex,
    floatingStyles,
    getReferenceProps,
    optionLabels,
    optionRefs,
    getFloatingProps,
    getItemProps,
    portalRoot,
    placement,
    isOpen,
    setOpen,
    context,
    query,
    setQuery,
    filtered,
    toggle,
    removeChip,
    removeChipOnKey,
    inputId: dropdownId,
    messageId,
    hasMessage,
    dataStatus,
    inputVariant,
    aria,
    selectedValues,
  };
};

export { useDropdown };
