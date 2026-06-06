import React, { useState } from "react";
// import Logo from "../../../assets/images/logo_shape.svg";
import quizLOGO from "../../../assets/images/quizLOGO.png"
import { Menu, Dropdown, Button, Select } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import "./PricingHeader.scss";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../components/shared/button/Button";

const PricingHeader: React.FC = () => {
  const [showCourseList, setShowCourseList] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const hideHeaderForPaths = ["/register", "/login", ""];
  const toggleCourseList = () => {
    setShowCourseList(!showCourseList);
  };
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
      <Menu.Item key="1">My Quizzes</Menu.Item>
    </Menu>
  );

  return (
    <>
      {hideHeaderForPaths.includes(location.pathname) ? (
        <></>
      ) : (
        <div className="pricing-header">
          <div className="logo-and-name">
            <img src={quizLOGO} alt="quizLOGO" />
          </div>
          <div className="menu-items">
            <ul>
              <li onClick={toggleCourseList} className="menu-link">
                <Dropdown overlay={coursesMenu}>
                  <Link to="/quizzes" className="menu-link">
                    Quizzes
                  </Link>
                </Dropdown>
                <DownOutlined style={{ fontSize: "12px", color: "black" }} />
              </li>
              <li>
                <Link to="/community" className="menu-link">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/company" className="menu-link">
                  Company
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="menu-link">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="menu-link">
                  <div style={{ width: "max-content" }}> Contact Us</div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="user-and-language-selector">
            <div>
              <CustomButton
                onClick={() => {
                  navigate("/instructor");
                }}
                variant="primary"
              >
                Become Instructor
              </CustomButton>
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
            <div className="user-info">
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button icon={<UserOutlined />} style={{ marginLeft: "8px" }}>
                  {t("User")}
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PricingHeader;
