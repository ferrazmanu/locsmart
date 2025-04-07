import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Button } from "../button/button";
import { IModalDelete } from "./modal-delete.interface";
import * as S from "./modal-delete.styles";

export const ModalDelete: React.FC<IModalDelete> = ({
  message,
  deleteApi,
  callbackFunc,
}) => {
  const { modalState, updateModalState } = useModalContext();
  const modalDelete = modalState;

  const isOpen = modalDelete.isOpen === "delete";

  const modalDeleteRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    updateModalState("isOpen", null);
  };

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
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
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
  }, [isOpen, updateModalState]);

  return (
    <S.Wrapper open={isOpen}>
      <S.Overlay open={isOpen} />
      <S.ModalDeleteWrapper open={isOpen} ref={modalDeleteRef}>
        <S.DeleteMessage>
          Você tem certeza que deseja excluir {message}{" "}
          <b>{modalDelete.data?.nome || modalDelete.data?.razaoSocial}</b>?
        </S.DeleteMessage>

        <S.ButtonActions>
          <Button type="button" onClick={() => handleClose()}>
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={() => deleteMutation.mutate(modalDelete.data!.id)}
            buttonStyle="danger"
            loading={deleteMutation.isPending}
            disabled={deleteMutation.isPending}
          >
            Excluir
          </Button>
        </S.ButtonActions>
      </S.ModalDeleteWrapper>
    </S.Wrapper>
  );
};
