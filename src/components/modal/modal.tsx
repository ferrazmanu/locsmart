import useBodyOverflowHidden from "@/src/hooks/useBodyOverflowHidden";
import { IoMdClose } from "react-icons/io";

import { IModal } from "./modal.interfaces";

import { useEffect } from "react";
import * as S from "./modal.styles";

const Modal: React.FC<IModal> = ({
  size = "lg",
  title,
  handleCloseOnClick,
  children,
  isOpen,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useBodyOverflowHidden(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && handleCloseOnClick) {
        handleCloseOnClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleCloseOnClick]);

  return (
    <S.BackgroundOverlay isOpen={isOpen}>
      <S.Wrapper $size={size} onClick={handleClick} className="modal-wrapper">
        <S.Header>
          <S.Title>{title}</S.Title>
          {handleCloseOnClick && (
            <S.ButtonWrapper onClick={handleCloseOnClick}>
              <IoMdClose size="24" />
            </S.ButtonWrapper>
          )}
        </S.Header>
        <S.WrapperContent>{children}</S.WrapperContent>
      </S.Wrapper>
    </S.BackgroundOverlay>
  );
};

export default Modal;
