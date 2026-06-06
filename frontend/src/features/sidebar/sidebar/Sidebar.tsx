import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiEdit, FiClipboard, FiFileText, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
// import SidebarBottom from '../sidebarBottomBar/SidebarBottomBar';
import './Sidebar.scss';
import {SidebarProps} from './Sidebar.d';



const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  onMouseEnter,
  onMouseLeave,
  setIsExpanded,
  selectedItem,
  setSelectedItem,
}) => {
  const [isStatic, setIsStatic] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const navigate = useNavigate();

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
    if (itemName === 'Flash Card') {
      navigate('/ui-elements');
    }
  };

  const toggleSidebar = () => {
    if (isExpanded) {
      setIsStatic(true);
      setRotationAngle(0);
    }
    if (isStatic && isExpanded) {
      setIsStatic(false);
      setRotationAngle(180);
    } else {
      setIsExpanded(false);
    }
  };

  const handleMouseLeave = () => {
    if (!isStatic) {
      setIsExpanded(false);
    }
  };

  return (
    <div
      className={`sidebar ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`sidebar-menu ${isExpanded ? 'expanded' : ''}`}>
        {isExpanded && (
          <div>
            <div className="sidebar-header">
              <h2>
                Products
                <span className="toggle-arrow" onClick={toggleSidebar}>
                  {isExpanded || isStatic ? (
                    <FiChevronLeft style={{ transform: `rotate(${rotationAngle}deg)` }} />
                  ) : (
                    <FiChevronRight />
                  )}
                </span>
              </h2>
            </div>
            <div className="sidebar-wrapper">
              <div
                className={`sidebar-item ${selectedItem === 'LMS' ? 'selected' : ''}`}
                onClick={() => handleItemClick('LMS')}
              >
                <FiBook className="sidebar-icon" />
                <span>LMS</span>
              </div>
              <div
                className={`sidebar-item ${selectedItem === 'Quiz' ? 'selected' : ''}`}
                onClick={() => handleItemClick('Quiz')}
              >
                <FiEdit className="sidebar-icon" />
                <span>Quiz</span>
              </div>
              <div
                className={`sidebar-item ${selectedItem === 'Assignment' ? 'selected' : ''}`}
                onClick={() => handleItemClick('Assignment')}
              >
                <FiClipboard className="sidebar-icon" />
                <span>Assignment</span>
              </div>
              <div
                className={`sidebar-item ${selectedItem === 'Flash Card' ? 'selected' : ''}`}
                onClick={() => handleItemClick('Flash Card')}
              >
                <FiFileText className="sidebar-icon" />
                <span>FlashCard</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <SidebarBottom /> */}
    </div>
  );
};

export default Sidebar;
