import useBodyOverflowHidden from "@/src/hooks/useBodyOverflowHidden";
import { IoMdClose } from "react-icons/io";

import { IModal } from "./modal.interfaces";

import { AnimatePresence, motion } from "framer-motion";
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

  useBodyOverflowHidden(isOpen);

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
    <AnimatePresence>
      {isOpen && (
        <S.BackgroundOverlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <S.Wrapper
            $size={size}
            as={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.1 }}
            onClick={handleClick}
          >
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
      )}
    </AnimatePresence>
  );
};

export default Modal;
