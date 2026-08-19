/**
 * Owns selection and search state for the controlled Dropdown field.
 *
 * Dismissal belongs to the Floating UI boundary in Dropdown so portalled
 * options count as inside the field.
 */
import type { FloatingContext, UseFloatingReturn, UseInteractionsReturn } from "@floating-ui/react";
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
  useTransitionStyles,
  useTypeahead,
} from "@floating-ui/react";
import { inheritTheme } from "@utils/inheritTheme";
import type { CSSProperties, Dispatch, RefObject, SetStateAction } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
    chipRefs: RefObject<(HTMLButtonElement | null)[]>;
    isTypingRef: RefObject<boolean>;
    portalRoot: HTMLElement | null;
    isOpen: boolean;
    isMounted: boolean;
    transitionStyles: CSSProperties;
    setOpen: (next: boolean) => void;
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    filtered: DropdownOption[];
    toggle: (optValue: string) => void;
    /** Selects the virtually focused option. Returns false when none is active. */
    selectActive: () => boolean;
    removeChip: (value: string) => void;
    selectedValues: string[];
    /** Ids wiring the trigger, its label, its value, and the portalled listbox. */
    listboxId: string;
    labelId: string;
    valueId: string;
    optionId: (index: number) => string;
    activeId: string | undefined;
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const optionRefs = useRef<(HTMLElement | null)[]>([]);
  const optionLabels = useRef<(string | null)[]>([]);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Index of the chip that was just removed, so focus can land on its successor
  // once the shortened list has rendered.
  const removedChipIndex = useRef<number | null>(null);
  // Typeahead owns Space mid-word, so selection keys have to stand down while a
  // label is being typed.
  const isTypingRef = useRef(false);

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

  const listboxId = `${dropdownId}-listbox`;
  const labelId = `${dropdownId}-label`;
  const valueId = `${dropdownId}-value`;
  const optionId = (index: number) => `${listboxId}-option-${index.toString()}`;
  const activeId = activeIndex == null ? undefined : optionId(activeIndex);

  const filtered = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const selectedIndex = filtered.findIndex((option) => selectedValues.includes(option.value));

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

  const selectActive = () => {
    if (activeIndex == null) return false;
    const option = filtered[activeIndex];
    if (!option) return false;
    toggle(option.value);
    return true;
  };

  const removeChip = (value: string) => {
    removedChipIndex.current = selectedValues.indexOf(value);
    onChange?.(selectedValues.filter((x) => x !== value));
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

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 150, close: 100 },
    initial: ({ side }) => ({
      opacity: 0,
      transform: `translateY(${side === "top" ? "4px" : "-4px"}) scale(0.98)`,
    }),
    open: {
      opacity: 1,
      transform: "translateY(0) scale(1)",
    },
    close: ({ side }) => ({
      opacity: 0,
      transform: `translateY(${side === "top" ? "4px" : "-4px"}) scale(0.98)`,
    }),
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {
    listRef: optionRefs,
    activeIndex,
    selectedIndex: selectedIndex < 0 ? null : selectedIndex,
    onNavigate: setActiveIndex,
    focusItemOnOpen: !searchable,
    loop: true,
    // Virtual focus: DOM focus stays on the trigger (or the search box) and the
    // active option is pointed at with aria-activedescendant, so the search box
    // never loses focus to an option while filtering.
    virtual: true,
  });

  const typeahead = useTypeahead(context, {
    listRef: optionLabels,
    activeIndex,
    selectedIndex: selectedIndex < 0 ? null : selectedIndex,
    onMatch: setActiveIndex,
    enabled: !searchable,
    onTypingChange: (typing) => {
      isTypingRef.current = typing;
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    listNavigation,
    typeahead,
  ]);

  const portalRoot = refs.domReference.current?.closest("dialog") as HTMLElement | null;

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(null);
    } else if (activeIndex != null) {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, isOpen]);

  // A removed chip takes its button out of the DOM, so hand focus to the chip
  // that slid into its place — or back to the trigger once none are left.
  useLayoutEffect(() => {
    const index = removedChipIndex.current;
    if (index == null) return;
    removedChipIndex.current = null;

    const next =
      selectedValues.length === 0
        ? null
        : (chipRefs.current[Math.min(index, selectedValues.length - 1)] ?? null);

    (next ?? refs.domReference.current)?.focus();
  }, [refs.domReference, selectedValues.length]);

  useEffect(() => {
    if (disabled && isOpen) {
      setOpen(false);
    }
  }, [disabled, isOpen, setOpen]);

  return {
    refs,
    activeIndex,
    floatingStyles,
    getReferenceProps,
    optionLabels,
    optionRefs,
    chipRefs,
    isTypingRef,
    getFloatingProps,
    getItemProps,
    portalRoot,
    placement,
    isOpen,
    isMounted,
    transitionStyles,
    setOpen,
    context,
    query,
    setQuery,
    filtered,
    toggle,
    selectActive,
    removeChip,
    inputId: dropdownId,
    listboxId,
    labelId,
    valueId,
    optionId,
    activeId,
    messageId,
    hasMessage,
    dataStatus,
    inputVariant,
    aria,
    selectedValues,
  };
};

export { useDropdown };
