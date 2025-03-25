import { forwardRef, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import { Input } from "./input.default";

import { InputProps } from "./input.interfaces";
import { PasswordContainer, PasswordIcon } from "./input.styles";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <PasswordContainer>
        <Input
          {...props}
          type={showPassword ? "text" : "password"}
          ref={ref}
          maxLength={100}
        />
        <PasswordIcon onClick={() => setShowPassword((e) => !e)}>
          {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
        </PasswordIcon>
      </PasswordContainer>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
