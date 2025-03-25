import { ChangeEvent, forwardRef } from "react";
import { ErrorMessage } from "../error-message/error-message";
import { InputProps } from "./input.interfaces";
import { InputStyles } from "./input.styles";

export const Input: React.ForwardRefExoticComponent<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ sanitize, ...props }, ref) => {
  const onInput = (eventF: ChangeEvent<HTMLInputElement>) => {
    let inputValue = eventF?.target?.value;
    inputValue = inputValue.replace(/[^\w\sáéíóúâêîôûãõàèìòùäëïöüç-]/g, "");
    eventF.target.value = inputValue;
  };

  return (
    <>
      <InputStyles {...props} className="input-wrapper">
        <input {...(sanitize ? { onInput } : null)} ref={ref} {...props} />
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
