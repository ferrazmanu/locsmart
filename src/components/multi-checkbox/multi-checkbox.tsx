import { Checkbox } from "@/src/components/checkbox/checkbox";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { useController } from "react-hook-form";

import { Primitives } from "../select/select.interfaces";
import { IMultiCheckboxProps } from "./multi-checkbox.interfaces";
import * as S from "./multi-checkbox.styles";

export const MultiCheckbox: React.FC<IMultiCheckboxProps> = ({
  initialOptions,
  name,
  hookForm,
  format,
  required,
  validate,
  defaultValue,
  ...props
}) => {
  const {
    field: { onChange, value = [] },
  } = useController({
    name,
    control: hookForm.control,
  });

  const handleCheckboxChange = (selectedId?: Primitives) => {
    if (!selectedId) return;

    const exists = value.includes(selectedId);

    if (exists) {
      onChange(value.filter((id: string | number) => id !== selectedId));
    } else {
      onChange([...value, selectedId]);
    }
  };

  return (
    <S.Container>
      <S.SamplesBox error={!!props.error}>
        <S.List>
          <S.ListItem>
            {initialOptions.map((item) => (
              <div key={`${item.value}`}>
                <Checkbox
                  hookForm={hookForm}
                  name={`${name}.${item.value}`}
                  label={`${item.name}`}
                  checked={value.includes(item.value)}
                  onChange={() => handleCheckboxChange(item.value)}
                />
              </div>
            ))}
          </S.ListItem>
        </S.List>
      </S.SamplesBox>

      {!!props.error && <ErrorMessage>{props.error}</ErrorMessage>}
    </S.Container>
  );
};
