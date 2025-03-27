interface IModal {
  size?: 'sm' | 'md' | 'lg';
  title: string;
  handleCloseOnClick?: () => void;
  children?: React.ReactNode;
}

export type { IModal };
