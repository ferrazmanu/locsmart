import React, { useEffect, useRef } from "react";
import { IOptionsListMenu } from "../options-list.interfaces";
import { Icon, Label, Line, Wrapper } from "./options-list-menu.styles";

export const OptionsListMenu: React.FC<IOptionsListMenu> = ({
  options,
  openOptionsList,
  setOpenOptionsList,
  ...rest
}) => {
  const handleClickAndClose =
    (func: () => void) =>
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      func();
      setOpenOptionsList(false);
    };

  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setOpenOptionsList(false);
      }
    };

    if (openOptionsList) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openOptionsList, handleClickAndClose]);

  return (
    <Wrapper
      key={`more-info+${options[0].label}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={optionsRef}
      {...rest}
    >
      {options.map((item) => {
        return (
          <Line key={item.label} onClick={handleClickAndClose(item.onClick)}>
            {item.icon && <Icon>{item.icon}</Icon>}
            <Label>{item.label}</Label>
          </Line>
        );
      })}
    </Wrapper>
  );
};
