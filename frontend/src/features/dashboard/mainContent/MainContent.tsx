import React, { useState } from 'react';
import DashboardTable from '../dashboardTable/DashboardTable';
import Plans from '../plans/Plans';
import NewClient from '../newClient/NewClient';
import { useNavigate } from 'react-router-dom';
import { MainContentProps } from './MainContent.d';
import "./MainContent.scss"
const MainContent: React.FC<MainContentProps> = ({ isExpanded, selectedItem }) => {
  const [selectedDashboardMenuItem, setSelectedDashboardMenuItem] = useState<string>('Dashboard');

  const handleDashboardMenuItemClick = (menuItem: string) => {
    setSelectedDashboardMenuItem(menuItem);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/landingpage');
  };

  const handleTeacherdashboard = () => {
    navigate('/teacher');
  };

  const handlePricingPlans = () => {
    navigate('/pricingPlans');
  };

  let content;

  switch (selectedItem) {
    case 'LMS':
      content = <div>LMS</div>;
      break;
    case 'Quiz':
      content = <div>Quiz</div>;
      break;
    case 'Assignment':
      content = <div>Assignment</div>;
      break;
    case 'Flash Card':
      content = <div>Flash Card</div>;
      break;
    default:
      content = <div>Dashboard Content</div>;
      break;
  }

  let dashboardComponent;

  switch (selectedDashboardMenuItem) {
    case 'Dashboard':
      dashboardComponent = <DashboardTable />;
      break;
    case 'Standard Plan':
      dashboardComponent = <Plans />;
      break;
    case 'New Clients':
      dashboardComponent = <NewClient />;
      break;
    default:
      dashboardComponent = <div>Dashboard Content</div>;
      break;
  }

  return (
    <div className={`main-content ${isExpanded ? 'sidebar-active' : ''}`}>
      <div className="dashboard-header">
        <div className="dashboard-heading">
          <span>PRODUCTS | {selectedItem}</span>
        </div>
      </div>
      <div className="dashboard-header">
        <div className="dashboard-menu">
          <div
            className={`dashboard-menu-item ${selectedDashboardMenuItem === 'Dashboard' ? 'selected' : ''}`}
            onClick={() => handleDashboardMenuItemClick('Dashboard')}
          >
            Dashboard
          </div>
          <div
            className={`dashboard-menu-item ${selectedDashboardMenuItem === 'Standard Plan' ? 'selected' : ''}`}
            onClick={() => handleDashboardMenuItemClick('Standard Plan')}
          >
            Standard Plan
          </div>
          <div
            className={`dashboard-menu-item ${selectedDashboardMenuItem === 'New Clients' ? 'selected' : ''}`}
            onClick={() => handleDashboardMenuItemClick('New Clients')}
          >
            New Clients
          </div>
        </div>
      </div>
      {dashboardComponent}
      <button className='landingpage-btn' onClick={handleClick}>
        Go to Landing Page
      </button>
      <button className='landingpage-btn' onClick={handleTeacherdashboard}>
        Go to Teacher Dashboard
      </button>
      <button className='landingpage-btn' onClick={handlePricingPlans}>
        Go to Pricing Plans
      </button>
      <button className='landingpage-btn' onClick={() => navigate('/quizes')}>
        Go to Quiz Builder
      </button>
    </div>
  );
};

export default MainContent;
