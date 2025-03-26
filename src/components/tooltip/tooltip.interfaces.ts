interface ITooltip extends ITooltipStyles {
  children?: React.ReactNode;
  text: string;
  style?: object;
}

interface ITooltipStyles {
  overflowed?: boolean;
  side?: TSide;
}

type TSide = "left" | "right";

export type { ITooltip, ITooltipStyles, TSide };
