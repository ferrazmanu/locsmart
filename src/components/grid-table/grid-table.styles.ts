import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  gap: 16px;

  background-color: ${({ theme }) => theme.colors.white};
  padding: 16px;

  @media only screen and (max-width: 350px) {
    display: flex;
    flex-direction: column;
  }
`;

export const GridItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grays._70};
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: ${({ theme }) => theme.sizes._14};
  color: ${({ theme }) => theme.colors.primary};
  gap: 4px;
  overflow: hidden;

  .info-container {
    overflow: hidden;
    width: 100%;

    img {
      width: 100%;
      object-fit: contain;
    }
  }
`;
