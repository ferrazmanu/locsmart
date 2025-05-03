import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import { useDeviceSize } from "@/src/hooks/useDeviceSize";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IItem, IOpenID } from "../drawer-menu.interfaces";
import * as S from "../drawer-menu.styles";
import { SubItem } from "../sub-item/sub-item.drawer-menu";

export const Item: React.FC<IItem> = ({ item, idOpen, setIdOpen }) => {
  const [idSubMenuOpen, setIdSubMenuOpen] = useState<IOpenID>(null);

  const { updateDashboard } = useDashboardContext();
  const windowWidth = useDeviceSize();

  const handleOpen = (id: string) => {
    setIdOpen(idOpen === id ? null : id);
  };

  const hasChildren = item.children?.length > 0;
  const isOpen = idOpen === item.id;

  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname === item.url ||
      item.children?.some((sub) => pathname.includes(sub.url))
    ) {
      setIdOpen(item.id);
    }
  }, [pathname]);

  if (hasChildren)
    return (
      <>
        <S.MenuLine>
          <S.Title
            onClick={() => handleOpen(item.id)}
            selected={pathname.includes(item.url)}
          >
            <div style={{ display: "flex" }}>
              {item.icon && <S.IconItem>{item.icon}</S.IconItem>}

              <span>{item.name}</span>
            </div>

            <S.IconContainer className="arrow-icon">
              {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </S.IconContainer>
          </S.Title>
        </S.MenuLine>

        <S.SubMenu isOpen={isOpen}>
          {item.children.map((subMenuItem) => (
            <SubItem
              key={subMenuItem.id}
              item={subMenuItem}
              idSubMenuOpen={idSubMenuOpen}
              setIdSubMenuOpen={setIdSubMenuOpen}
            />
          ))}
        </S.SubMenu>
      </>
    );
  else {
    return (
      <S.MenuLine
        onClick={() =>
          windowWidth < 993 ? updateDashboard("drawerMenu", false) : null
        }
      >
        <S.StyledLink
          href={item.url}
          prefetch
          selected={pathname.includes(item.url)}
        >
          {item.icon && <S.IconItem>{item.icon}</S.IconItem>}
          <span>{item.name}</span>
        </S.StyledLink>
      </S.MenuLine>
    );
  }
};
