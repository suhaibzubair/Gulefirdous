import React from "react";
import SidebarItems from "./sidebarItems/sidebarItems/SidebarItems";
import './Sidebar.scss';
import UpgradePlan from "../upgradePlan/UpgradePlan";


const Sidebar = ({isSidebarCollapsed,setIsSidebarCollapsed}:any) => {

console.log(isSidebarCollapsed)
const handlesidebarCollapse =()=>{
  setIsSidebarCollapsed(true);
}

  return (
    <div className="student-sidebar-container">
      <div className="student-sidebar-wrapper">
        {!isSidebarCollapsed &&<div className="test" onClick={handlesidebarCollapse}>|||</div>}
        <SidebarItems isSidebarCollapsed={isSidebarCollapsed}/>
       {isSidebarCollapsed&&<UpgradePlan/>}
      </div>
    </div>
  );
};

export default Sidebar;
