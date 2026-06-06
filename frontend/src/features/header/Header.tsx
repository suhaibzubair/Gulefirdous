import React from 'react';
import { ReactComponent as Logo } from '../../assets/images/Logo.svg';
import profileImg from '../../assets/images/Rectangle 1.png';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="main-header">
            <div className="header-logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="header-right-side">
                <div className="header-search">
                    <input type="text" placeholder="Search..." />
                </div>
                <div className="header-icons">
                    <span className="notification-icon">&#x1F514;</span>
                    <div className="user-profile">
                        <img src={profileImg} alt="User Profile" />
                        <span className="add-icon">+</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
