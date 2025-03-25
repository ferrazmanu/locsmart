import { Loading } from "@/src/assets";
import { IButton } from "./button.interfaces";
import { StyledButton } from "./button.styles";

export const Button: React.FC<IButton> = ({
  children,
  buttonStyle = "primary",
  loading,
  ...props
}: IButton) => {
  return (
    <StyledButton
      buttonStyle={buttonStyle}
      {...props}
      className="default-button"
    >
      {loading ? <Loading color="#fff" size="24" /> : children}
    </StyledButton>
  );
};
