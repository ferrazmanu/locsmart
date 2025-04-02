import { ITabs } from "./tabs.interfaces";
import * as S from "./tabs.styles";

export const Tabs: React.FC<ITabs> = ({
  tabsOptions,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <S.TabsContainer>
      {tabsOptions.map((tab) => (
        <S.TabButton
          key={tab.id}
          type="button"
          isActive={selectedTab === tab.id}
          onClick={() => setSelectedTab(tab.id)}
        >
          {tab.title}
        </S.TabButton>
      ))}
    </S.TabsContainer>
  );
};
