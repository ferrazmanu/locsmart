import { Button } from "@/src/components/button/button";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCompany } from "@/src/hooks/useCompany";

import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { queryKey } from "@/src/constants/query-keys";

export const ModalRegisterPayment: React.FC = () => {
  const queryClient = useQueryClient();

  const { currentModal, closeModal } = useModalContext();

  const { updateCompanyPayment } = useCompany();

  const mutation = useMutation({
    mutationFn: async (id: number) => await updateCompanyPayment(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKey.COMPANY_LIST] }),
  });

  return (
    <Modal
      size="md"
      title="Pagamento de Mensalidade"
      handleCloseOnClick={closeModal}
    >
      <S.Text>
        Deseja registrar o pagamento da mensalidade de{" "}
        <b>{currentModal?.data?.nome || currentModal?.data?.razaoSocial}</b>?
      </S.Text>

      <S.ButtonActions>
        <Button type="button" onClick={closeModal}>
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={() => mutation.mutate(currentModal?.data!.id)}
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
