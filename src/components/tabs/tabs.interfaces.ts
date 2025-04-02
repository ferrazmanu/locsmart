interface ITab {
  id: number;
  title: string;
  selected?: boolean;
}

interface ITabs {
  tabsOptions: ITab[];
  selectedTab: number;
  setSelectedTab: (id: number) => void;
}

export type { ITabs };
