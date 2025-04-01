type Primitives = string | number | boolean;

type TSelectOptions = {
  name: string;
  value: Primitives | undefined;
  label?: string | JSX.Element;
  id?: number | string;
};

interface ISelect {
  initialOptions: TSelectOptions[];
  title: string;
  disabled?: boolean;
  sorted?: boolean;
  searchInput?: boolean;
  name: string;
  required?: boolean;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  hookForm: any;
  className?: string;
  firstReset?: boolean;
  resetCallback?: () => void;
  error?: string;
  selected?: TSelectOptions["value"];
  onChange?: (item: TSelectOptions) => void;
  onChangeInputSearch?: (value: string) => void;
  loading?: boolean;
  searchPlaceholder?: string;
}

export type { ISelect, Primitives, TSelectOptions };
