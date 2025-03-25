import { ptBR } from "date-fns/locale";
import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { BiCalendar } from "react-icons/bi";
import { ErrorMessage } from "../error-message/error-message";
import { IControllerInput } from "./input.interfaces";
import { MaskedInput } from "./input.masked";
import { DateInputStyles } from "./input.styles";

export const DateInput: React.FC<IControllerInput> = forwardRef<
  HTMLInputElement,
  IControllerInput
>(({ hookForm, name, placeholder, disabled, ...props }, _ref) => {
  return (
    <>
      <DateInputStyles className="datepicker-wrapper" {...props}>
        <Controller
          control={hookForm.control}
          name={name}
          render={({ field }) => (
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) => field.onChange(date)}
              dateFormat="dd/MM/yyyy"
              disabled={disabled}
              placeholderText={placeholder}
              locale={ptBR}
              customInput={
                <MaskedInput
                  name={name}
                  mask="99/99/9999"
                  style={{ border: "none" }}
                />
              }
              {...props}
            />
          )}
        />
        <div className="calendar-icon">
          <BiCalendar />
        </div>
      </DateInputStyles>
      {props?.error && (
        <ErrorMessage>
          <span>{props?.error}</span>
        </ErrorMessage>
      )}
    </>
  );
});

DateInput.displayName = "DateInput";
