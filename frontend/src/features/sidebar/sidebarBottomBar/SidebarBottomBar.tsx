import React from 'react';
import { FiSettings } from 'react-icons/fi';
import {SidebarBottomProps} from './SidebarBottomBar.d';
import './SidebarBottomBar.scss';


export default function SidebarBottom({ isExpanded, onMouseEnter, onMouseLeave }: SidebarBottomProps) {
    return (
        <div className="sidebar-bottom-bar">
            <div className="sidebar-wrapper">
                <div className="sidebar-bottom-item">
                    <FiSettings className="sidebar-icon" />
                    <span>Settings</span>
                </div>
            </div>
        </div>
    );
}
