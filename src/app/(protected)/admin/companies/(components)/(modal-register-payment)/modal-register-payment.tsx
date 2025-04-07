import { Button } from "@/src/components/button/button";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useMutation } from "@tanstack/react-query";

import { useCompany } from "@/src/hooks/useCompany";

import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";

export const ModalRegisterPayment: React.FC = () => {
  const { modalState, updateModalState } = useModalContext();

  const { refetch, updateCompanyPayment } = useCompany();

  const handleClose = () => {
    updateModalState("isOpen", null);
  };

  const mutation = useMutation({
    mutationFn: async (id: number) => await updateCompanyPayment(id),
    onSuccess: () => refetch(),
  });

  return (
    <Modal
      size="md"
      title="Pagamento de Mensalidade"
      handleCloseOnClick={handleClose}
    >
      <S.Text>
        Deseja registrar o pagamento da mensalidade de{" "}
        <b>{modalState.data?.nome || modalState.data?.razaoSocial}</b>?
      </S.Text>

      <S.ButtonActions>
        <Button type="button" onClick={() => handleClose()}>
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={() => mutation.mutate(modalState.data!.id)}
          buttonStyle="hollow"
          loading={mutation.isPending}
          disabled={mutation.isPending}
        >
          Registrar
        </Button>
      </S.ButtonActions>
    </Modal>
  );
};
