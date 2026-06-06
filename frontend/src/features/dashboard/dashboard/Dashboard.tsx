import React, { useState } from 'react';
import Sidebar from '../../sidebar/sidebar/Sidebar';
import MainContent from '../mainContent/MainContent';
import Header from '../../header/Header';
import Landingheader from '../../landingPage/header/Header';
import './Dashboard.scss';

function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleMouseEnter = () => {
    setIsExpanded(true);
  }

  const handleMouseLeave = () => {
    setIsExpanded(false);
  }

  return (
    <div>
      {/* <Header/> */}
      <Landingheader/>
      <Sidebar
        isExpanded={isExpanded}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        setIsExpanded={setIsExpanded}
        selectedItem={selectedItem} 
        setSelectedItem={setSelectedItem}
      />
      <MainContent isExpanded={isExpanded} selectedItem={selectedItem}/>
    </div>
  );
}

export default Dashboard;
