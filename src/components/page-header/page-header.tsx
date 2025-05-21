import { IPageHeader } from "./page-header.interfaces";
import {
  Components,
  ComponentsWrapper,
  Title,
  TitleWrapper,
  TopWrapper,
  Wrapper,
} from "./page-header.styles";

export const PageHeader: React.FC<IPageHeader> = (props) => {
  return (
    <Wrapper>
      <TopWrapper>
        <TitleWrapper>
          <Title>{props?.title}</Title>
        </TitleWrapper>
        {props?.top && <Components className="top">{props?.top}</Components>}
      </TopWrapper>

      {(props?.left || props?.right) && (
        <ComponentsWrapper>
          {props?.left && (
            <Components className="left">{props?.left}</Components>
          )}
          {props?.right && (
            <Components className="right">{props?.right}</Components>
          )}
        </ComponentsWrapper>
      )}
    </Wrapper>
  );
};
