import React, { useState } from "react";
import Item from "../item/Item";
import './SidebarItems.scss';
import { ReactComponent as HomeIcon } from "../../../../../assets/images/HomeStudent.svg";
import { sidebarOptions } from "../../SidebarMeta";

const SidebarItems = ({isSidebarCollapsed}:any) => {
  const [selectedOption, setSelectedOption] = useState({
    option: 0,
    subOption: 1,
  });
  console.log(isSidebarCollapsed)
  const setMenuOption = (option: number, subOption: number) => {
    setSelectedOption({ option, subOption });
  };

  return (
    <div className="student-sidebar-items">
        {sidebarOptions.map((sidebarOption, index) => (
          <Item
            key={index}
            optionIndex={index}
            Icon={sidebarOption.icon}
            label={sidebarOption.label}
            options={sidebarOption.options}
            href={sidebarOption.href}
            selectedOption={selectedOption}
            isSidebarCollapsed={isSidebarCollapsed}
            setSelectedOption={setMenuOption}
          />
        ))}
      <div className="logout-item">
        <Item
          Icon={HomeIcon}
          label="Logout"
          href="logout"
          selectedOption={selectedOption}
          setSelectedOption={setMenuOption}
          optionIndex={sidebarOptions.length}
        />
      </div>
    </div>
  );
};

export default SidebarItems;
