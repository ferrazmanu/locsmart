type Primitives = string | number | boolean;

type TSelectOptions = {
  value: Primitives | undefined;
  label?: string | JSX.Element;
  name: string;
  id?: number | string;
};

interface IMultiSelect {
  initialOptions: TSelectOptions[];
  title: string;
  disabled?: boolean;
  name: string;
  required?: boolean;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  hookForm: any;
  className?: string;
  error?: string;
  returnType: "array" | "string";
  mask?: string;
}

export type { IMultiSelect, Primitives, TSelectOptions };
