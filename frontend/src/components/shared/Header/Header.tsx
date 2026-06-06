import React, { useState } from "react";
import Logo from "../../../assets/images/urqaalogo.svg";
import { Menu, Dropdown, Button, Select } from "antd";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import "./Header.scss";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const [showCourseList, setShowCourseList] = useState(false);
  const navigate = useNavigate();
  const toggleCourseList = () => {
    setShowCourseList(!showCourseList);
  };
  const hideHeaderForPaths = ["/register", "/login", "/otp","/course-builder","/create-course"];
  const location = useLocation();

  const { t, i18n } = useTranslation();

  const changeLanguage = (language: any) => {
    console.log(language);
    i18n.changeLanguage(language);
  };
  const handleMenuClick = (e: any) => {
    // You can handle menu item clicks here

    console.log(`Clicked on ${e.key}`);
    navigate(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="login">Login</Menu.Item>
      <Menu.Item key="register">Signup</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
    </Menu>
  );
  const coursesMenu = (
    <Menu>
      <Menu.Item key="1">
        {" "}
        <Link to="/lms" className="menu-link">
          LMS{" "}
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/hrm" className="menu-link">
          HRM
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        {" "}
        <Link to="/cms" className="menu-link">
          CMS
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
    {hideHeaderForPaths.includes(location.pathname) ? (
      <></>
    ) : (
    <div className="organization-header">
      <div className="logo-and-name">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="menu-items">
        <ul>
          <li onClick={toggleCourseList} className="menu-link">
            <Dropdown overlay={coursesMenu}>
              <Link to="/products" className="menu-link">
                Products
              </Link>
            </Dropdown>
            <DownOutlined style={{ fontSize: "12px", color: "black" }} />
          </li>
          <li style={{ width: "max-content" }}>
            <Link to="/community" className="menu-link">
              Community
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="menu-link">
              Blogs
            </Link>
          </li>
          <li style={{ width: "max-content" }}>
            <Link to="/contact" className="menu-link">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="user-and-language-selector">
        <div className="user-info">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button icon={<UserOutlined />} style={{ marginLeft: "8px" ,border:'none'}}>
              {/* {              t("User") */}
            </Button>
          </Dropdown>{" "}
        </div>
        <div className="language-selector">
          <Select
            onChange={(e: any) => changeLanguage(e)}
            value={i18n.language}
          >
            <option value="en">English</option>
            <option value="es" selected>
              Spanish
            </option>
            <option value="TUR">Turkish</option>
            <option value="GER">German</option>
          </Select>
        </div>
      </div>
    </div>)}
    </>
  );
};

export default Header;
