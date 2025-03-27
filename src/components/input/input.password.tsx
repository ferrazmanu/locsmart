import { forwardRef, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import { Input } from "./input.default";

import { ErrorMessage } from "../error-message/error-message";
import { InputProps } from "./input.interfaces";
import { PasswordContainer, PasswordIcon } from "./input.styles";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <>
        <PasswordContainer error={error}>
          <Input
            {...props}
            type={showPassword ? "text" : "password"}
            ref={ref}
            maxLength={100}
          />
          <PasswordIcon
            onClick={() =>
              !props.disabled ? setShowPassword((e) => !e) : null
            }
          >
            {showPassword ? (
              <MdOutlineVisibilityOff />
            ) : (
              <MdOutlineVisibility />
            )}
          </PasswordIcon>
        </PasswordContainer>
        {error && (
          <ErrorMessage>
            <span>{error}</span>
          </ErrorMessage>
        )}
      </>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
