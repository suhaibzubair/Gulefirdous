import React from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import NotificationPanel from '../notifications/notificationPanel/NotificationsPanel';
import CourseCards from '../../../components/shared/courseCards/courseCards/CourseCards';
import CreateCourse from '../createCourse/createCourse/CreateCourse';
import './Dashboard.scss';
import Content from '../content/Content';

function Dashboard() {
    return (
        <div className="dashboard">
            {/* <Header /> */}
            <div className='d-flex'>
                <div className='teacher-dashboard-sidebar'>
                    <Sidebar />
                </div>
                <div className='teacher-dashboard-content'>
                    <Content />
                    <CourseCards style={{ width: '295px', height: 'auto' }} />
                    {/* <CreateCourse/> */}
                </div>
                <div className='teacher-dashboard-notifications'>
                    <NotificationPanel />
                    
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
