interface IModal {
  size?: "sm" | "md" | "lg";
  title: string;
  handleCloseOnClick?: () => void;
  children?: React.ReactNode;
  zIndex?: number;
}

export type { IModal };
