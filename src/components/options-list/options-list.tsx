import React, { useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { IOptionsList } from "./options-list.interfaces";
import {
  IconContent,
  StyledOptionsList,
  WrapperIconOptionsListContent,
} from "./options-list.styles";

export const OptionsList: React.FC<IOptionsList> = ({ options, boxSide }) => {
  const [openOptionsList, setOpenOptionsList] = useState(false);

  return (
    <WrapperIconOptionsListContent>
      <IconContent onClick={() => setOpenOptionsList(!openOptionsList)}>
        <IoIosArrowDown size={18} />
      </IconContent>
      <StyledOptionsList
        openOptionsList={openOptionsList}
        setOpenOptionsList={setOpenOptionsList}
        options={options}
        boxSide={boxSide}
      />
    </WrapperIconOptionsListContent>
  );
};
