interface IToggle {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  hookForm: any;
  activeLabel?: string;
  inactiveLabel?: string;
  disableLabels?: boolean;
  disabled?: boolean;
  name: string;
  onChangeCallback?: () => void;
}

export type { IToggle };
