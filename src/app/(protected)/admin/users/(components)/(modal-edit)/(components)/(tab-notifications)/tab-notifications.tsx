import { Label } from "@/src/components/label/label";
import * as S from "@/src/components/modal/modal.styles";
import { Toggle } from "@/src/components/toggle/toggle";
import { UseFormReturn } from "react-hook-form";
import { FiLayers, FiShield } from "react-icons/fi";
import { IEditForm } from "../../modal-edit.schema";

interface ITabNotifications {
  hookForm: UseFormReturn<IEditForm>;
}

export const TabNotifications: React.FC<ITabNotifications> = ({ hookForm }) => {
  return (
    <>
      <S.Content>
        <S.InlineFieldsWrapper>
          <S.Field>
            <Label style={{ fontSize: "20px", marginBottom: "8px" }}>
              <FiShield size={24} />
              Notificações LPR
            </Label>

            <Toggle
              hookForm={hookForm}
              name="notificacoes.email"
              mainLabel="Receber notificações por e-mail"
              disableLabels
            />

            <Toggle
              hookForm={hookForm}
              name="notificacoes.blackList"
              mainLabel="Black List: Receber notificações"
              disableLabels
            />

            <Toggle
              hookForm={hookForm}
              name="notificacoes.whiteList"
              mainLabel="White List: Receber notificações"
              disableLabels
            />

            <Toggle
              hookForm={hookForm}
              name="notificacoes.camera"
              mainLabel="Câmera: Receber notificações"
              disableLabels
            />

            <Toggle
              hookForm={hookForm}
              name="notificacoes.smartList"
              mainLabel="Smart List: Receber notificações"
              disableLabels
            />

            <Toggle
              hookForm={hookForm}
              name="notificacoes.accessList"
              mainLabel="Access List: Receber notificações"
              disableLabels
            />
          </S.Field>

          <S.Field>
            <Label style={{ fontSize: "20px", margin: "8px 0" }}>
              <FiLayers size={24} />
              Notificações em Pop-Up
            </Label>

            <Toggle
              hookForm={hookForm}
              name="notificacoes.somAlerta"
              mainLabel="Reproduzir som de alerta"
              disableLabels
            />

            <Toggle
              hookForm={hookForm}
              name="notificacoes.popupBlackList"
              mainLabel="Pop-up para black list"
              disableLabels
            />

            <Toggle
              hookForm={hookForm}
              name="notificacoes.popupWhiteList"
              mainLabel="Pop-up para white list"
              disableLabels
            />

            <Toggle
              hookForm={hookForm}
              name="notificacoes.popupSmartList"
              mainLabel="Pop-up para smart list"
              disableLabels
            />

            <Toggle
              hookForm={hookForm}
              name="notificacoes.popupAccessList"
              mainLabel="Pop-up para access list"
              disableLabels
            />
          </S.Field>
        </S.InlineFieldsWrapper>
      </S.Content>
    </>
  );
};
