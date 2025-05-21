import { useCallback } from "react";
import { useController } from "react-hook-form";

import { Label } from "../label/label";
import { IToggleControlled } from "./toggle.interfaces";
import { ToggleWrapper } from "./toggle.styles";

export const ToggleControlled: React.FC<IToggleControlled> = ({
  hookForm,
  activeLabel = "Ativo",
  inactiveLabel = "Inativo",
  disableLabels,
  mainLabel,
  disabled,
  name,
  size = "regular",
}) => {
  const {
    field: { onChange, value },
  } = useController({
    name: name,
    control: hookForm.control,
  });

  const onChangeToggle = useCallback(() => {
    if (!disabled) {
      onChange(!value);
    }
  }, [disabled, value, onChange]);

  return (
    <ToggleWrapper active={value} disabled={!!disabled} size={size}>
      <div className="button">
        <input
          type="checkbox"
          className="checkbox"
          onChange={onChangeToggle}
          disabled={disabled}
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>

      {!disableLabels ? (
        <span className="label">{value ? activeLabel : inactiveLabel}</span>
      ) : mainLabel ? (
        <Label>{mainLabel}</Label>
      ) : null}
    </ToggleWrapper>
  );
};
