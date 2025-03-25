import InputMask from "comigo-tech-react-input-mask";
import { forwardRef } from "react";
import { ErrorMessage } from "../error-message/error-message";
import { IMaskedInput } from "./input.interfaces";
import { MaskedInputStyles } from "./input.styles";

export const MaskedInput: React.ForwardRefExoticComponent<IMaskedInput> =
  forwardRef<InputMask, IMaskedInput>(({ error, style, ...props }, ref) => {
    return (
      <>
        <MaskedInputStyles
          error={error}
          style={style}
          className="input-wrapper"
        >
          <InputMask {...props} ref={ref} type="text" />
        </MaskedInputStyles>
        {error && (
          <ErrorMessage>
            <span>{error}</span>
          </ErrorMessage>
        )}
      </>
    );
  });

MaskedInput.displayName = "MaskedInput";
