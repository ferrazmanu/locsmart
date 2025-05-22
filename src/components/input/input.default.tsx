import { ChangeEvent, forwardRef } from "react";
import { ErrorMessage } from "../error-message/error-message";
import { InputProps } from "./input.interfaces";
import { InputStyles } from "./input.styles";

export const Input: React.ForwardRefExoticComponent<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ sanitize, noSpaces = false, ...props }, ref) => {
  const onInput = (eventF: ChangeEvent<HTMLInputElement>) => {
    let inputValue = eventF.target.value;

    if (sanitize) {
      inputValue = inputValue.replace(/[^\w\sáéíóúâêîôûãõàèìòùäëïöüç-]/g, "");
    }

    if (noSpaces) {
      inputValue = inputValue.replace(/\s/g, "");
    }

    eventF.target.value = inputValue;
  };

  return (
    <>
      <InputStyles {...props} className="input-wrapper">
        <input
          {...(sanitize || noSpaces ? { onInput } : null)}
          ref={ref}
          {...props}
        />
      </InputStyles>
      {props?.error && (
        <ErrorMessage>
          <span>{props?.error}</span>
        </ErrorMessage>
      )}
    </>
  );
});

Input.displayName = "Input";
