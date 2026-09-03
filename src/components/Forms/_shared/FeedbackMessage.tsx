import { jC } from "@utils/utils";
import shared from "../Field.module.css";

/*  TODO:
- Should handle lists of error messages / info messages instead of just strings

*/

interface FeedbackMessageProps {
  id: string;
  className?: string;
  errorMessage?: string | string[];
  infoMessage?: string | string[];
}

const FeedbackMessage = ({
  id,
  className,
  errorMessage,
  infoMessage,
}: FeedbackMessageProps) => {
  return (
    <span
      id={id}
      aria-live="polite"
      className={jC([
        shared.inputInfoMessage,
        className,
        errorMessage && shared.errorMessage,
      ])}
    >
      {errorMessage ?? infoMessage}
    </span>
  );
};

export { FeedbackMessage };
