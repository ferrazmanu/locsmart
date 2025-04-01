interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  disabled?: boolean;
  name: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  hookForm: any;
}

interface ICheckboxStyles {
  disabled?: boolean;
}

export type { ICheckbox, ICheckboxStyles };
