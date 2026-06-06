import React from "react";
import sidebarProfileIcon from "../../../assets/images/sidebarProfileIcon.png";
import School from "../../../assets/images/School(1).png";
import createNewSchool from "../../../assets/images/createNewSchool.png";
import setting from "../../../assets/images/setting.png";
import help from "../../../assets/images/help.png";
import logOut from "../../../assets/images/logOut.png";
import "./Sidebar.scss";
const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar locked">
      <div className="logo_items flex">
        <span className="nav_image">
          <img src={sidebarProfileIcon} alt="sidebarProfileIcon" />
        </span>
        <span className="logo_heading">Ali</span>
        <br />
        <span className="logo_gmail">Abizsol89@gmail.com</span>
      </div>
      <div className="menu_container">
        <div className="menu_items">
          <ul className="menu_item">
            <li className="item">
              <span className="link flex">
                <img src={School} alt="School" />
                <span>MY SCHOOLS</span>
              </span>
            </li>
            <li className="item">
              <span className="link flex">
                <img src={createNewSchool} alt="createNewSchool" />
                <span>Create new school</span>
              </span>
            </li>
            <li className="item">
              <span className="link flex">
                <img src={setting} alt="setting" />
                <span>Settings</span>
              </span>
            </li>
            <li className="item">
              <span className="link flex">
                <img src={help} alt="help" />
                <span>Help</span>
              </span>
            </li>
          </ul>
        </div>
        <ul className="menu_item">
          <li className="item">
            <span
              className="link flex"
              //   onClick={handleLogout}
            >
              <i className="bx bx-log-out"></i>
              <img src={logOut} alt="logOut" />
              <span>Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
