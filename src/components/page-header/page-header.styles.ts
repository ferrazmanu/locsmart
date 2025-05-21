import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.grays._900};
  font-size: ${({ theme }) => theme.sizes._24};
  font-weight: 600;

  @media only screen and (max-width: 992px) {
    font-size: ${({ theme }) => theme.sizes._18};
  }
`;

export const ComponentsWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const Components = styled.div`
  display: flex;
  gap: 8px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  svg {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${({ theme }) => theme.sizes._24};
  }
`;

export const TopWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 662px) {
    flex-wrap: wrap;

    .top {
      width: 100%;
    }
  }
`;
