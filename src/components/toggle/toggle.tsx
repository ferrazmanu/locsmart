import { useCallback } from "react";
import { useController } from "react-hook-form";

import { IToggle } from "./toggle.interfaces";
import { ToggleWrapper } from "./toggle.styles";

export const Toggle = ({
  hookForm,
  activeLabel = "Ativo",
  inactiveLabel = "Inativo",
  disableLabels,
  disabled,
  name,
}: IToggle) => {
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
    <ToggleWrapper active={value} disabled={!!disabled}>
      <div className="button">
        <input
          checked={value}
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
      ) : null}
    </ToggleWrapper>
  );
};
