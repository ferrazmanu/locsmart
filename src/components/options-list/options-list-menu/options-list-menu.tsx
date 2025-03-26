import React from "react";
import { IOptionsListMenu } from "../options-list.interfaces";
import {
  Background,
  Icon,
  Label,
  Line,
  Wrapper,
} from "./options-list-menu.styles";

export const OptionsListMenu: React.FC<IOptionsListMenu> = ({
  options,
  handleClose,
  ...rest
}) => {
  const handleClickAndClose =
    (func: () => void) =>
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      func();
      handleClose();
    };

  return (
    <>
      <Background onClick={handleClose} />
      <Wrapper
        key={`more-info+${options[0].label}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
    </>
  );
};
