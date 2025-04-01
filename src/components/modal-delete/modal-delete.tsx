import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button/button";
import { IModalDelete } from "./modal-delete.interface";
import * as S from "./modal-delete.styles";

export const ModalDelete: React.FC<IModalDelete> = ({
  message,
  itemName,
  deleteApi,
  callbackFunc,
}) => {
  const { modalState, updateModalDelete } = useModalContext();
  const modalDelete = modalState.modalDelete;

  const modalDeleteRef = useRef<HTMLDivElement>(null);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!modalDelete.data) return;
    try {
      setLoadingDelete(true);
      await deleteApi(modalDelete.data.id);

      updateModalDelete("isOpen", false);
      callbackFunc();
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalDeleteRef.current &&
        !modalDeleteRef.current.contains(event.target as Node)
      ) {
        updateModalDelete("isOpen", false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        updateModalDelete("isOpen", false);
      }
    };

    if (modalDelete.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalDelete.isOpen, updateModalDelete]);

  if (!modalState.modalDelete.isOpen) return;
  return (
    <S.Wrapper open={modalDelete.isOpen}>
      <S.Overlay open={modalDelete.isOpen} />
      <S.ModalDeleteWrapper open={modalDelete.isOpen} ref={modalDeleteRef}>
        <S.DeleteMessage>
          Você tem certeza que deseja excluir {message} <b>{itemName}</b>?
        </S.DeleteMessage>

        <S.ButtonActions>
          <Button
            type="button"
            onClick={() => updateModalDelete("isOpen", false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            buttonStyle="danger"
            loading={loadingDelete}
            disabled={loadingDelete}
          >
            Excluir
          </Button>
        </S.ButtonActions>
      </S.ModalDeleteWrapper>
    </S.Wrapper>
  );
};
