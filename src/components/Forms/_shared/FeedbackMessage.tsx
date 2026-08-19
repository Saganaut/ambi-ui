import { jC } from "@utils/utils";
import shared from "../Field.module.css";

/*  TODO:
- Should handle lists of error messages / info messages instead of just strings

*/

interface FeedbackMessageProps {
  id: string;
  errorMessage?: string | string[];
  infoMessage?: string | string[];
}

const FeedbackMessage = ({ id, errorMessage, infoMessage }: FeedbackMessageProps) => {
  return (
    <span
      id={id}
      aria-live="polite"
      className={jC([shared.inputInfoMessage, shared.message, errorMessage && shared.errorMessage])}
    >
      {errorMessage ?? infoMessage}
    </span>
  );
};

export { FeedbackMessage };
