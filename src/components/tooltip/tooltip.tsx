import React from "react";

import { ITooltip } from "./tooltip.interfaces";
import { TooltipWrapper } from "./tooltip.styles";

export const Tooltip: React.FC<ITooltip> = ({ children, text, ...props }) => {
  return (
    <TooltipWrapper side={props.side} overflowed={props.overflowed}>
      <span className="content">{children}</span>

      <span className="tooltiptext">{text || children}</span>
    </TooltipWrapper>
  );
};
