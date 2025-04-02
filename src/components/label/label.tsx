import { LabelStyles } from "./label.styles";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({
  children,
  ...props
}: LabelProps) => {
  return (
    <LabelStyles {...props} className="label-wrapper">
      {children}
    </LabelStyles>
  );
};
