import useBodyOverflowHidden from "@/src/hooks/useBodyOverflowHidden";
import { IoMdClose } from "react-icons/io";

import { useModalContext } from "@/src/contexts/modal/modal.context";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as S from "./modal-image.styles";

export const ModalImage: React.FC = () => {
  const { modals, closeModal } = useModalContext();

  const modalData = modals.find((modal) => modal.type === "image");
  const image = modalData?.data;
  const isOpen = modalData?.type === "image";

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useBodyOverflowHidden(isOpen);

  const modalImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalImageRef.current &&
        !modalImageRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
            ref={modalImageRef}
            as={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.1 }}
            onClick={handleClick}
          >
            <S.Header>
              <S.Title>{image?.title}</S.Title>
              <S.ButtonWrapper onClick={closeModal}>
                <IoMdClose size="24" />
              </S.ButtonWrapper>
            </S.Header>
            <S.WrapperContent>
              {image && (
                <S.StyledImage
                  alt={image.title}
                  src={image.src}
                  width={image.width}
                  height={image.height}
                />
              )}
            </S.WrapperContent>
          </S.Wrapper>
        </S.BackgroundOverlay>
      )}
    </AnimatePresence>
  );
};
