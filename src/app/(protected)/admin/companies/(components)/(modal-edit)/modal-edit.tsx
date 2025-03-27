import Modal from "@/src/components/modal/modal";
import { useModalContext } from "@/src/contexts/modal/modal.context";

export const ModalEdit: React.FC = () => {
  const { modalState, updateModalEdit } = useModalContext();
  const formData = modalState.modalEdit.data;

  const handleCloseModal = () => {
    updateModalEdit("isOpen", false);
  };

  return (
    <Modal
      size="md"
      title={`${formData ? "Editar" : "Nova"} Empresa`}
      handleCloseOnClick={handleCloseModal}
    >
      Entrei
    </Modal>
  );
};
