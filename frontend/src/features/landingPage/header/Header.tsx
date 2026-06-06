import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UnorderedListOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import {ReactComponent as Logo} from '../../../assets/images/Logo.svg';
import './Header.scss';

const Header: React.FC = () => {
  const [showCourseList, setShowCourseList] = useState<boolean>(false);
  const [showPagesDropdown, setShowPagesDropdown] = useState<boolean>(false);
  const [showBlogDropdown, setShowBlogDropdown] = useState<boolean>(false);
  const [showNavCourseList, setShowNavCourseList] = useState<boolean>(false);

  const toggleCourseList = () => {
    setShowCourseList(!showCourseList);
  };

  const toggleNavCourseList = () => {
    setShowNavCourseList(!showNavCourseList);
  };

  const togglePagesDropdown = () => {
    setShowPagesDropdown(!showPagesDropdown);
  };

  const toggleBlogDropdown = () => {
    setShowBlogDropdown(!showBlogDropdown);
  };

  const coursesMenu = (
    <Menu>
      <Menu.Item key="1">Course 1</Menu.Item>
      <Menu.Item key="2">Course 2</Menu.Item>
      <Menu.Item key="3">Course 3</Menu.Item>
    </Menu>
  );

  const pagesMenu = (
    <Menu>
      <Menu.Item key="1">Select Page 1</Menu.Item>
      <Menu.Item key="2">Select Page 2</Menu.Item>
      <Menu.Item key="3">Select Page 3</Menu.Item>
    </Menu>
  );

  const blogMenu = (
    <Menu>
      <Menu.Item key="1">Select Blog 1</Menu.Item>
      <Menu.Item key="2">Select Blog 2</Menu.Item>
      <Menu.Item key="3">Select Blog 3</Menu.Item>
    </Menu>
  );

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          {/* <img src={Logo} alt="Logo" /> */}
        </div>
        <h3 className="header__text">SKOLA</h3>
        <div className="header__courses">
          <div className="courses-container">
            <button className="header__button" onClick={toggleCourseList}>
              <UnorderedListOutlined style={{ marginRight: '15px' }} />Courses
            </button>
            {showCourseList && (
              <div className="course-list">
                <ul>
                  <li>Course 1</li>
                  <li>Course 2</li>
                  <li>Course 3</li>
                </ul>
              </div>
            )}
          </div>
          <input
            type="text"
            className="header__search"
            placeholder="What do you want to Learn?"
          />
        </div>
      </div>
      <div className="header__right">
        <nav className="header__nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li className="dropdown-link" onClick={toggleNavCourseList}>
              <Link to="/courses"><span>Courses</span></Link>
            </li>
            <Dropdown overlay={pagesMenu}>
              <li className="dropdown-link" onClick={togglePagesDropdown}>
                <span>Pages <DownOutlined style={{ fontSize: '12px', marginLeft: '5px' }} /></span>
              </li>
            </Dropdown>
            <Dropdown overlay={blogMenu}>
              <li className="dropdown-link" onClick={toggleBlogDropdown}>
                <span>Blog <DownOutlined style={{ fontSize: '12px', marginLeft: '5px' }} /></span>
              </li>
            </Dropdown>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <div className="header__user">
          <UserOutlined />
        </div>
        <div className="header__cart">
          <ShoppingCartOutlined />
        </div>
      </div>
    </header>
  );
};

export default Header;
