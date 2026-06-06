import React,{useState} from 'react';
import Logo from '../../../assets/images/urqaalogo.svg';
import Profile from '../../../assets/images/videobg.png';
import Ulogo from '../../../assets/images/Ulogo.svg'
import { SearchOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import './Header.scss';

const Header = ({setIsSidebarCollapsed,isSidebarCollapsed}:any) => {

    const handleToggleSidebar = () => {
        setIsSidebarCollapsed((state:any)=>!state);
    };
    return (
        <div className='teacher-header'>
            <div className="header-left">
                <div className="logo-container">
                    <img src={isSidebarCollapsed?Logo:Ulogo} alt="" />
                    
                </div>
          {isSidebarCollapsed && <div className="toggle-btn" onClick={handleToggleSidebar}>|||</div>}
            </div>
            <div className='header-right'>
                <div className="msgs-notification-bar">
                    <MessageOutlined className='notifi-icon' />
                    <span className='notifi-value'>10</span>
                </div>
                <div className="settings-notifications">
                    <SettingOutlined className='notifi-icon' />
                    <span className='notifi-value'>13</span>
                </div>
                <div className="header-vertical-bar">
                    <span>|</span>
                </div>
                <div className="user-profile">
                    <span className='profile-name'>Hello Nouman</span>
                    <img src={Profile} alt="User Avatar" className='profile-img' />
                </div>
            </div>
        </div>
    );
};

export default Header;
