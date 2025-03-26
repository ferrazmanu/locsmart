import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import { usePathname } from "next/navigation";
import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ISubMenu } from "../drawer-menu.interfaces";
import * as S from "../drawer-menu.styles";

export const SubItem: React.FC<ISubMenu> = ({
  item,
  idSubMenuOpen,
  setIdSubMenuOpen,
}) => {
  const { updateDashboard } = useDashboardContext();

  const handleSubMenuOpen = (id: string) => {
    if (idSubMenuOpen !== id) setIdSubMenuOpen(id);
    else setIdSubMenuOpen(null);
  };

  const hasChildren = item.children && item.children.length > 0;

  const pathname = usePathname();

  if (hasChildren)
    return (
      <>
        <li>
          <S.SubMenuTitle
            onClick={() => handleSubMenuOpen(item.id)}
            selected={pathname === item.url}
          >
            <span>{item.name}</span>

            {hasChildren && (
              <S.IconContainer className="arrow-icon">
                {idSubMenuOpen === item.id ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </S.IconContainer>
            )}
          </S.SubMenuTitle>
        </li>

        {idSubMenuOpen === item.id && (
          <S.SubSubMenu>
            {item.children.map((subMenuItem) => (
              <li key={subMenuItem.id}>
                <S.SubMenuLink
                  href={item.url}
                  selected={pathname === subMenuItem.url}
                >
                  <span>{subMenuItem.name}</span>
                </S.SubMenuLink>
              </li>
            ))}
          </S.SubSubMenu>
        )}
      </>
    );
  else {
    return (
      <li>
        <S.SubMenuLink
          href={item.url}
          prefetch
          selected={pathname === item.url}
        >
          <span>{item.name}</span>
        </S.SubMenuLink>
      </li>
    );
  }
};
