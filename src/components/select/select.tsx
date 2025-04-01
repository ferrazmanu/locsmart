import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

import { Input } from "../input/input.default";

import { Loading } from "@/src/assets";
import { ErrorMessage } from "../error-message/error-message";
import { ERROR_MESSAGE } from "../error-message/error-message.constant";
import { ISelect, TSelectOptions } from "./select.interfaces";
import {
  HeaderTitle,
  List,
  ListItem,
  NoItems,
  SelectWrapper,
} from "./select.styles";

export const Select: React.FC<ISelect> = ({
  initialOptions,
  title,
  disabled = false,
  sorted = false,
  searchInput = false,
  name,
  required = false,
  hookForm,
  className,
  firstReset,
  resetCallback,
  onChange,
  onChangeInputSearch,
  error,
  selected,
  loading,
  searchPlaceholder,
}) => {
  const [options, setOptions] = useState<TSelectOptions[]>(initialOptions);
  const [listOpen, setListOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  const optionsSorted = sorted ? initialOptions : initialOptions;

  const node = useRef<HTMLDivElement>(null);
  const nodeInput = useRef<HTMLInputElement>(null);

  const itemSelectedValue = hookForm.watch(name);
  const itemSelected = options.find((e) => e.value === itemSelectedValue);
  const itemSelectedLabel = itemSelected
    ? itemSelected.label || itemSelected.name
    : title;

  const toggleList = () => {
    if (!disabled) setListOpen((e) => !e);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
    onChangeInputSearch?.(event.target.value);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (node.current && !node.current.contains(e.target as Node))
      setListOpen(false);
  };

  const selectedItem = useCallback(
    (value: TSelectOptions["value"], index?: number) => {
      hookForm.setValue(name, index === 0 && firstReset ? undefined : value);
      resetCallback?.();
    },
    [options]
  );

  useEffect(() => {
    hookForm.register(name, {
      required: {
        value: required,
        message: ERROR_MESSAGE["required"],
      },
    });
  }, [hookForm, name, required]);

  useEffect(() => {
    if (itemSelected) {
      hookForm.clearErrors(name);
    }
  }, [itemSelected]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    if (nodeInput.current) nodeInput.current.focus();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setOptions(
      optionsSorted.filter(
        (e) => e.name.toUpperCase().indexOf(inputSearch.toUpperCase()) !== -1
      )
    );
  }, [optionsSorted, inputSearch]);

  useEffect(() => {
    if (selected !== undefined || selected !== null) {
      const selectedOption = options.find(
        (option) => option.value === selected
      );
      if (selectedOption) {
        selectedItem(selectedOption.value);
      }
    }
  }, [options, selected, selectedItem]);

  return (
    <>
      <SelectWrapper
        {...{ error, disabled, listOpen }}
        className={`select-wrapper ${className}`}
        ref={node}
      >
        <div className="header" aria-hidden="true" onClick={toggleList}>
          <HeaderTitle selected={!!itemSelected}>
            {itemSelectedLabel}
          </HeaderTitle>
          {listOpen ? (
            <div className="expand-icon">
              <MdOutlineExpandLess size={24} />
            </div>
          ) : (
            <div className="expand-icon">
              <MdOutlineExpandMore size={24} />
            </div>
          )}
        </div>
        {listOpen ? (
          <List className="list" error={!!error} listOpen={listOpen}>
            {searchInput ? (
              <ListItem
                style={{ position: "sticky", top: -8, background: "white" }}
              >
                <Input
                  value={inputSearch}
                  ref={nodeInput}
                  onChange={onChangeInput}
                  placeholder={searchPlaceholder || "Pesquisar"}
                />
              </ListItem>
            ) : null}

            {loading ? (
              <NoItems style={{ display: "flex", justifyContent: "center" }}>
                <Loading size="20" />
              </NoItems>
            ) : (
              <>
                {options instanceof Array &&
                  options.map((item, index) => (
                    <ListItem
                      className="list-item"
                      key={`${item.id}-${index}`}
                      onClick={() => {
                        onChange?.(item);
                        selectedItem(item.value, index);
                        setListOpen(false);
                      }}
                    >
                      {item.name || "Item"}
                    </ListItem>
                  ))}

                {options?.length < 1 && <NoItems>Nenhum item.</NoItems>}
              </>
            )}
          </List>
        ) : null}
      </SelectWrapper>
      {error && (
        <ErrorMessage>
          <span>{error}</span>
        </ErrorMessage>
      )}
    </>
  );
};
