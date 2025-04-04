import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import { useDeviceSize } from "@/src/hooks/useDeviceSize";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ISubMenu } from "../drawer-menu.interfaces";
import * as S from "../drawer-menu.styles";

export const SubItem: React.FC<ISubMenu> = ({
  item,
  idSubMenuOpen,
  setIdSubMenuOpen,
}) => {
  const { updateDashboard } = useDashboardContext();
  const windowWidth = useDeviceSize();

  const handleSubMenuOpen = (id: string) => {
    if (idSubMenuOpen !== id) setIdSubMenuOpen(id);
    else setIdSubMenuOpen(null);
  };

  const hasChildren = item.children && item.children.length > 0;

  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname === item.url ||
      item.children?.some((sub) => pathname.includes(sub.url))
    ) {
      setIdSubMenuOpen(item.id);
    }
  }, [pathname]);

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
      <li
        onClick={() =>
          windowWidth < 993 ? updateDashboard("drawerMenu", false) : null
        }
      >
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
