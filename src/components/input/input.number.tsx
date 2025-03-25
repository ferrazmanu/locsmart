import {
  formatToBRL,
  formatToInteger,
  formatToPercentage,
} from "@/src/utils/format";
import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { ErrorMessage } from "../error-message/error-message";
import { ERROR_MESSAGE } from "../error-message/error-message.constant";
import { INumberControllerInput } from "./input.interfaces";
import { InputStyles } from "./input.styles";

export const NumberInput: React.FC<INumberControllerInput> = ({
  name,
  hookForm,
  format,
  required,
  validate,
  defaultValue,
  onChangeValue,
  ...props
}) => {
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    control: hookForm.control,
    defaultValue: defaultValue || 0,
    rules: {
      required: required ? ERROR_MESSAGE["required"] : false,
      validate: (value) => {
        if (required && value === 0) {
          return ERROR_MESSAGE["required"];
        }
        if (required && value === 0 && validate) {
          return ERROR_MESSAGE["validate"];
        } else {
          return true;
        }
      },
    },
  });

  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    const formatters: { [key: string]: (value: number) => string } = {
      currency: formatToBRL,
      percent: formatToPercentage,
      integer: formatToInteger,
    };
    const formatter = formatters[format || ""] || ((v: number) => v.toString());
    const formattedValue = formatter(value);

    if (displayValue !== formattedValue) {
      setDisplayValue(formattedValue);
    }
  }, [value, format]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const value = rawValue
      ? format !== "integer"
        ? parseFloat((Number(rawValue) / 100).toFixed(2))
        : parseInt(rawValue)
      : 0;
    onChange(value);

    onChangeValue?.(value);
  };

  return (
    <>
      <InputStyles {...props}>
        <input
          {...props}
          value={displayValue}
          onChange={handleChange}
          required={required}
          onBlur={onBlur}
          maxLength={props.maxLength}
        />
      </InputStyles>
      {props?.error && (
        <ErrorMessage>
          <span>{props?.error}</span>
        </ErrorMessage>
      )}
    </>
  );
};

NumberInput.displayName = "NumberInput";
