import { IPageHeader } from "./page-header.interfaces";
import {
  Components,
  ComponentsWrapper,
  Title,
  Wrapper,
} from "./page-header.styles";

export const PageHeader: React.FC<IPageHeader> = (props) => {
  return (
    <Wrapper>
      <Title>{props.title}</Title>

      <ComponentsWrapper>
        <Components>{props.left}</Components>
        <Components>{props.right}</Components>
      </ComponentsWrapper>
    </Wrapper>
  );
};
