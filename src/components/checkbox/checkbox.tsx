import React, { forwardRef } from "react";
import { Label } from "../label/label";
import { ICheckbox } from "./checkbox.interfaces";
import { Check, CheckBoxStyles, InputCheck } from "./checkbox.styles";

export const Checkbox: React.FC<ICheckbox> = forwardRef<
  HTMLInputElement,
  ICheckbox
>(({ label, name, disabled, checked, onChange }, ref) => {
  return (
    <CheckBoxStyles disabled={disabled}>
      <Check>
        <InputCheck
          ref={ref}
          name={name}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />
        <span className="checkmark" />
      </Check>
      {label && <Label htmlFor={name}>{label}</Label>}
    </CheckBoxStyles>
  );
});

Checkbox.displayName = "Checkbox";
