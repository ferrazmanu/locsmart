import React, { useEffect, useRef, useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

import { ERROR_MESSAGE } from "@/src/components/error-message/error-message.constant";
import { ErrorMessage } from "../error-message/error-message";
import { Input } from "../input/input.default";
import { MaskedInput } from "../input/input.masked";
import {
  IMultiSelect,
  Primitives,
  TSelectOptions,
} from "./multi-select.interfaces";
import {
  Field,
  HeaderTitle,
  Icons,
  List,
  ListItem,
  MultiSelectWrapper,
  SelectedBox,
} from "./multi-select.styles";

export const MultiSelect: React.FC<IMultiSelect> = ({
  initialOptions,
  title,
  disabled = false,
  name,
  required = false,
  hookForm,
  className,
  error,
  returnType,
  mask,
}) => {
  const [listOpen, setListOpen] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState<Primitives[]>([]);
  const [allOptions, setAllOptions] =
    useState<TSelectOptions[]>(initialOptions);

  const [newOption, setNewOption] = useState("");
  const [newOptionError, setNewOptionError] = useState<string>("");

  const handleAddOption = () => {
    if (!newOption.trim()) {
      setNewOptionError(ERROR_MESSAGE["empty"]);
      return;
    }

    const isDuplicate = selectedOptions.includes(newOption);

    if (!isDuplicate) {
      const newOptionObj = { value: newOption, name: newOption };

      setAllOptions((prev) => [...prev, newOptionObj]);
      setSelectedOptions((prev) => {
        if (!prev.includes(newOption)) {
          return [...prev, newOption];
        }
        return prev;
      });

      hookForm.setValue(name, [...selectedOptions, newOption]);

      setNewOption("");
      setNewOptionError("");
    } else {
      setNewOptionError(ERROR_MESSAGE["duplicate"]);
    }
  };

  const handleClearField = () => {
    setNewOption("");
    setNewOptionError("");
  };

  const node = useRef<HTMLDivElement>(null);
  const nodeInput = useRef<HTMLInputElement>(null);
  const selectedNode = useRef<HTMLDivElement>(null);
  const closeIconNode = useRef<HTMLDivElement>(null);

  const selectedItems = selectedOptions.map((value) =>
    allOptions.find((option) => option.value === value)
  );

  const toggleList = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      (selectedNode.current &&
        selectedNode.current.contains(e.target as Node)) ||
      (closeIconNode.current &&
        closeIconNode.current.contains(e.target as Node))
    ) {
      return;
    }

    if (!disabled) setListOpen((e) => !e);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (node.current && !node.current.contains(e.target as Node))
      setListOpen(false);
  };

  const toggleSelection = (value: Primitives) => {
    setSelectedOptions((prevSelected) => {
      const newSelection = prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value];
      setListOpen(false);
      return newSelection;
    });
  };

  useEffect(() => {
    if (returnType === "array") {
      hookForm.setValue(name, selectedOptions);
    }

    if (returnType === "string") {
      const stringifiedData = selectedOptions.join(";");
      hookForm.setValue(name, stringifiedData);
    }
  }, [selectedOptions]);

  useEffect(() => {
    hookForm.register(name, {
      required: {
        value: required,
        message: ERROR_MESSAGE["required"],
      },
    });
  }, [hookForm, name, required]);

  useEffect(() => {
    if (selectedOptions && selectedOptions.length > 0) {
      hookForm.clearErrors(name);
    }
  }, [selectedOptions]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    if (nodeInput.current) nodeInput.current.focus();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <MultiSelectWrapper
        {...{ error, disabled, listOpen }}
        className={`select-wrapper ${className}`}
        ref={node}
      >
        <div className="header" aria-hidden="true" onClick={toggleList}>
          <HeaderTitle selected={selectedOptions.length > 0}>
            {selectedItems && selectedItems.length > 0 ? (
              <>
                {selectedItems.map((item, index) => (
                  <SelectedBox key={`option-${index}`} ref={selectedNode}>
                    <span>{item?.name}</span>
                    <button
                      className="close"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleSelection(item?.value || "");
                      }}
                    >
                      <IoClose />
                    </button>
                  </SelectedBox>
                ))}
              </>
            ) : (
              title
            )}
          </HeaderTitle>
          <Icons>
            {selectedOptions && selectedOptions.length > 0 && (
              <div
                onClick={() => setSelectedOptions([])}
                className="clear-button"
                ref={closeIconNode}
              >
                <IoClose size={18} />
              </div>
            )}
            {listOpen ? (
              <div className="expand-icon">
                <MdOutlineExpandLess size={24} />
              </div>
            ) : (
              <div className="expand-icon">
                <MdOutlineExpandMore size={24} />
              </div>
            )}
          </Icons>
        </div>
        {listOpen ? (
          <List className="list" error={!!error} listOpen={listOpen}>
            <ListItem
              className="new-option"
              style={{ position: "sticky", top: -8, background: "white" }}
            >
              <Field>
                {!mask ? (
                  <Input
                    ref={nodeInput}
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Adicionar novo..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddOption();
                      }
                    }}
                    error={newOptionError}
                  />
                ) : (
                  <MaskedInput
                    {...hookForm.register(name, {
                      required: {
                        value: required,
                        message: ERROR_MESSAGE["required"],
                      },
                    })}
                    ref={nodeInput}
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Adicionar novo..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddOption();
                      }
                    }}
                    error={newOptionError}
                    mask={mask}
                  />
                )}
              </Field>

              <button onClick={handleAddOption} type="button">
                <IoCheckmark size={18} />
              </button>
              <button onClick={handleClearField} type="button">
                <IoClose size={18} />
              </button>
            </ListItem>
            {initialOptions && initialOptions.length > 0 ? (
              initialOptions.map(({ value, id, name, label }, index) => (
                <ListItem
                  className="list-item"
                  key={`${id}-${index}`}
                  onClick={() => toggleSelection(value || "")}
                >
                  {label || name}
                </ListItem>
              ))
            ) : (
              <ListItem className="empty">Nenhuma opção</ListItem>
            )}
          </List>
        ) : null}
      </MultiSelectWrapper>
      {error && (
        <ErrorMessage>
          <span>{error}</span>
        </ErrorMessage>
      )}
    </>
  );
};
