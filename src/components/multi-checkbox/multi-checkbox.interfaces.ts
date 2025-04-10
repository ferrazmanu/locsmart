import { TSelectOptions } from "../select/select.interfaces";

interface IMultiCheckboxProps {
  initialOptions: TSelectOptions[];
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
  searchInput?: boolean;
  searchPlaceholder?: string;
  loading?: boolean;
}

export type { IMultiCheckboxProps };
