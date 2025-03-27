import useBodyOverflowHidden from "@/src/hooks/useBodyOverflowHidden";
import { IoMdClose } from "react-icons/io";

import { IModal } from "./modal.interfaces";

import * as S from "./modal.styles";

const Modal: React.FC<IModal> = ({
  size = "lg",
  title,
  handleCloseOnClick,
  children,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useBodyOverflowHidden(true);

  return (
    <S.BlurredBackground>
      <S.Wrapper $size={size} onClick={handleClick}>
        <S.Header>
          <S.Title>{title}</S.Title>
          {handleCloseOnClick && (
            <S.ButtonWrapper onClick={handleCloseOnClick}>
              <IoMdClose size="14" />
            </S.ButtonWrapper>
          )}
        </S.Header>
        <S.WrapperContent>{children}</S.WrapperContent>
      </S.Wrapper>
    </S.BlurredBackground>
  );
};

export default Modal;
