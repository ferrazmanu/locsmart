export type ButtonStyles = "primary" | "secondary" | "danger" | "hollow";
interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  maxWidth?: boolean;
  loading?: boolean;
  buttonStyle?: ButtonStyles;
  color?: string;
}

interface StyledButtonProps {
  buttonStyle: string;
  maxWidth?: boolean;
}
export type { IButton, StyledButtonProps };
