interface InputProps
  extends React.RefAttributes<HTMLInputElement>,
    React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined;
  sanitize?: boolean;
}

interface NumberInputProps
  extends Omit<
    React.RefAttributes<HTMLInputElement> &
      React.InputHTMLAttributes<HTMLInputElement>,
    "required"
  > {
  error?: string | undefined;
  format?: "decimal" | "percent" | "unit";
  locales?: string | string[];
  currency?: string;
}

interface IInputStyles {
  error?: string | undefined;
  disabled?: boolean;
}

interface IMaskedInput extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined;
  disabled?: boolean;
  placeholder?: string;
  name: string;
  mask: string;
}

interface IControllerInput {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  hookForm: any;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  error?: string | undefined;
  format?: "currency" | "percent" | "integer";
  defaultValue?: string | number;
  required?: boolean;
  validate?: boolean;
  maxLength?: number;
}

interface INumberControllerInput extends IControllerInput {
  onChangeValue?: (value: number) => void;
}

export type {
  IControllerInput,
  IInputStyles,
  IMaskedInput,
  INumberControllerInput,
  InputProps,
  NumberInputProps,
};
