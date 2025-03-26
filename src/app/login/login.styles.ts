import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.grays._50};
  padding: 15px;
`;

export const Logo = styled.div`
  max-width: 300px;
  min-width: 100px;
  aspect-ratio: 954/229;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  gap: 24px;

  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  border: 1px solid ${({ theme }) => theme.colors.grays._70};

  padding: 36px 24px;

  button {
    align-self: center;
    width: 100%;
  }
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

export const Text = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.sizes._14};
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;

export const Field = styled.fieldset`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;
