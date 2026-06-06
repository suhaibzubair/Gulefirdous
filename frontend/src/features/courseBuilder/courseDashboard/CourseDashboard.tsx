// MyLayoutComponent.tsx

import React,{useEffect, useState} from 'react';
import './CourseDashboard.scss';
import Header from '../../teacherDashboard/header/Header';
import Sidebar from '../../teacherDashboard/sidebar/Sidebar';
import Products , {ProductCard} from '../../teacherDashboard/productDashboard/ProductDashboard';

interface CoursesDashboardProps {
isSidebarCollapsed: boolean;
}
const dummyProducts: ProductCard[] = [
    {
      heading: 'Courses',
      text: 'My Courses',
      imgSrc: 'path-to-react-image',
    },
    {
        heading: 'Quizs',
        text: 'Learn the basics of React.',
        imgSrc: 'path-to-react-image',
      },
    {
      heading: 'JavaScript',
      text: 'Learn the basics of React.',
      imgSrc: 'path-to-quiz-image',
    },
    {
      heading: 'Flashcards',
      text: 'Memorize key concepts',
      imgSrc: 'path-to-flashcard-image',
    },
    {
        heading: 'Fundamentals',
        text: 'Learn the basics of React.',
        imgSrc: 'path-to-react-image',
      },
    {
      heading: 'Masterclass',
      text: 'Test your JavaScript knowledge',
      imgSrc: 'path-to-quiz-image',
    },
    {
      heading: 'Assignment',
      text: 'Memorize key.',
      imgSrc: 'path-to-flashcard-image',
    },
    {
        heading: 'Flashcards',
        text: 'Memorize key concepts',
        imgSrc: 'path-to-flashcard-image',
      },
      {
          heading: 'Fundamentals',
          text: 'Learn the basics of React.',
          imgSrc: 'path-to-react-image',
        },
  ];


const CoursesDashboard: React.FC<CoursesDashboardProps> = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
useEffect(()=>{
console.log('isSidebarCollapsed',isSidebarCollapsed)
},[isSidebarCollapsed])

  return (
    <div className="layout-container">
      <div className="course-header"> <Header setIsSidebarCollapsed={setIsSidebarCollapsed} isSidebarCollapsed={isSidebarCollapsed}/></div>
      <div className="course-main-container">
        <div className={isSidebarCollapsed ? 'course-sidebar': 'sidebar-collapsed' }>
          <Sidebar isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed}/>
        </div>
        <div className={ isSidebarCollapsed?"course-content":"course-width"}><Products products={dummyProducts}/></div>
      </div>
    </div>
  );
};

export default CoursesDashboard;
