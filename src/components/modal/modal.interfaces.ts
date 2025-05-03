interface IModal {
  size?: "sm" | "md" | "lg";
  title: string;
  handleCloseOnClick?: () => void;
  children?: React.ReactNode;
  isOpen: boolean;
}

export type { IModal };
