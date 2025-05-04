import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "../button/button";
import { IModalDelete } from "./modal-delete.interface";
import * as S from "./modal-delete.styles";

export const ModalDelete: React.FC<IModalDelete> = ({
  message,
  deleteApi,
  callbackFunc,
}) => {
  const { currentModal, closeModal } = useModalContext();
  const isOpen = currentModal?.type === "delete";

  const modalDeleteRef = useRef<HTMLDivElement>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await deleteApi(id),
    onSuccess: () => callbackFunc(),
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalDeleteRef.current &&
        !modalDeleteRef.current.contains(event.target as Node)
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

  const itemName = currentModal?.data?.nome || currentModal?.data?.razaoSocial;

  return (
    <AnimatePresence>
      {isOpen && (
        <S.BackgroundOverlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          onClick={closeModal}
        >
          <S.Wrapper
            ref={modalDeleteRef}
            className="modal-wrapper"
            as={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.1 }}
          >
            <S.Header>
              <S.Title>Remover - {itemName}</S.Title>
            </S.Header>
            <S.DeleteMessage>
              Você tem certeza que deseja excluir {message} <b>{itemName}</b>?
            </S.DeleteMessage>

            <S.ButtonActions>
              <Button type="button" onClick={() => closeModal()}>
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={() => deleteMutation.mutate(currentModal?.data!.id)}
                buttonStyle="danger"
                loading={deleteMutation.isPending}
                disabled={deleteMutation.isPending}
              >
                Excluir
              </Button>
            </S.ButtonActions>
          </S.Wrapper>
        </S.BackgroundOverlay>
      )}
    </AnimatePresence>
  );
};
