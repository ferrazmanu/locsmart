import { TGenericObject } from "@/src/contexts/modal/modal.interface";
import React, { useEffect, useRef } from "react";
import { IMoreInfoMenu, IOption } from "../more-info.interfaces";
import { Icon, Label, Line, Wrapper } from "./more-info-menu.styles";

const defaultOptions: IOption[] = [
  {
    icon: <></>,
    label: "Item",
    onClick: () => {},
  },
];

export const MoreInfoMenu: React.FC<IMoreInfoMenu> = ({
  options = defaultOptions,
  item,
  openMoreInfo,
  setOpenMoreInfo,
  ...rest
}) => {
  const handleClickAndClose =
    (func: (item: TGenericObject) => void) =>
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      func(item);
      setOpenMoreInfo(false);
    };

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMoreInfo(false);
      }
    };

    if (openMoreInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMoreInfo, handleClickAndClose]);

  return (
    <>
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
