import { Checkbox } from "@/src/components/checkbox/checkbox";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { useController } from "react-hook-form";

import { Loading } from "@/src/assets";
import { normalizeString } from "@/src/utils/format";
import { useMemo, useState } from "react";
import { Input } from "../input/input.default";
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
  searchInput = false,
  searchPlaceholder,
  loading,
  ...props
}) => {
  const {
    field: { onChange, value = [] },
  } = useController({
    name,
    control: hookForm.control,
  });

  const [inputSearch, setInputSearch] = useState("");

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };

  const handleCheckboxChange = (selectedId?: Primitives) => {
    if (!selectedId) return;

    const exists = value.includes(selectedId);

    if (exists) {
      onChange(value.filter((id: string | number) => id !== selectedId));
    } else {
      onChange([...value, selectedId]);
    }
  };

  const options = useMemo(() => {
    if (!searchInput) return initialOptions;

    const filteredOptions = initialOptions.filter((item) =>
      normalizeString(item.name).includes(normalizeString(inputSearch))
    );

    return filteredOptions;
  }, [initialOptions, inputSearch]);

  return (
    <S.Container>
      <S.SamplesBox error={!!props.error} disabled={props.disabled}>
        <S.List>
          {loading ? (
            <Loading size="24" />
          ) : (
            <>
              {searchInput ? (
                <S.ListItem
                  style={{ position: "sticky", top: -8, background: "white" }}
                >
                  <Input
                    value={inputSearch}
                    onChange={onChangeInput}
                    placeholder={searchPlaceholder || "Pesquisar"}
                    style={{ height: "36px" }}
                  />
                </S.ListItem>
              ) : null}
              <S.ListItem>
                {options?.length > 0 ? (
                  options.map((item) => (
                    <div key={`${item.value}`}>
                      <Checkbox
                        hookForm={hookForm}
                        name={`${name}.${item.value}`}
                        label={`${item.name}`}
                        checked={value.includes(item.value)}
                        onChange={() => handleCheckboxChange(item.value)}
                        disabled={props.disabled}
                      />
                    </div>
                  ))
                ) : (
                  <span className="empty">Nenhuma opção.</span>
                )}
              </S.ListItem>
            </>
          )}
        </S.List>
      </S.SamplesBox>

      {!!props.error && <ErrorMessage>{props.error}</ErrorMessage>}
    </S.Container>
  );
};
