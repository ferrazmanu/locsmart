interface IToggleControlled {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  hookForm: any;
  activeLabel?: string;
  inactiveLabel?: string;
  disableLabels?: boolean;
  disabled?: boolean;
  name: string;
  onChangeCallback?: () => void;
  mainLabel?: string;
  size?: "regular" | "small";
}

interface IToggle {
  size?: "regular" | "small";
  activeLabel?: string;
  inactiveLabel?: string;
  disableLabels?: boolean;
  disabled?: boolean;
  mainLabel?: string;
  onChange: (value: boolean) => void;
  value: boolean;
}

export type { IToggle, IToggleControlled };
