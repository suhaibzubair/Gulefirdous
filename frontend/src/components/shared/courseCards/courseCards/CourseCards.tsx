import React from 'react';
import Card from '../../card/Card';
import ImgSrc from '../../../../assets/images/Rectangle 1.png';
import './CourseCards.scss';
import {CourseCardsProps} from './CourseCards.d';

const CourseCards: React.FC<CourseCardsProps> = ({ style,simpleCourses }) => {
    const course = ['UI Basic', 'Basic Maths', 'JS Crash Course', 'Figma Course'];
  
    return (
      <div className='course-card-container'>
        <div className='d-flex justify-space-between'>
          <span className='notification-heading'>Top rated Courses</span>
          <span className='view-all-button'>View All</span>
        </div>
        <div className='cards'>
          {course.map((title, index) => (
            <Card
              key={index}
              title={title}
              imageSrc={ImgSrc}
              enrolledCount={500}
              classCount={10}
              lectureCount={30}
              style={style}
              customClassName="cards"
              simpleCourses={simpleCourses}
              review={124}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default CourseCards;
