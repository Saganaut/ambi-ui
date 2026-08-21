import { jC } from "@utils/utils";
import variants from "../../styles/variants.module.css";
import type { BaseCardProps } from "./Card.types";
import styles from "./Cards.module.css";

/* TODO:  We need to add more control props to onClick here*/
const Card = <T extends HTMLDivElement | HTMLButtonElement>({
  content,
  variant = "primary",
  size = "md",
  shape = "default",
  fill = "default",
  onClick,
  as: Component = "div",
}: BaseCardProps<T>) => {
  const isClickable = onClick != null;

  const className = jC([
    styles.cardRoot,
    variant && variants[variant],
    variants[size],
    variants[shape],
    variants[fill],
    isClickable && styles.isClickable,
  ]);

  if (isClickable) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <Component className={className}>{content}</Component>;
};

export { Card };
