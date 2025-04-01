import { forwardRef } from "react";
import { ErrorMessage } from "../error-message/error-message";
import { TextareaProps } from "./textarea.interfaces";
import { TextareaStyles } from "./textarea.styles";

export const Textarea: React.ForwardRefExoticComponent<TextareaProps> =
  forwardRef<HTMLTextAreaElement, TextareaProps>(({ error, ...props }, ref) => {
    return (
      <>
        <TextareaStyles error={error} className="textarea-wrapper">
          <textarea ref={ref} {...props} />
        </TextareaStyles>
        {error && (
          <ErrorMessage>
            <span>{error}</span>
          </ErrorMessage>
        )}
      </>
    );
  });

Textarea.displayName = "Textarea";
