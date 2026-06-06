import React from 'react';
import Button from '../../../../components/shared/button/Button';
import BookIcon from '../../../../assets/images/course.svg';
import {CoursesCountProps} from './CoursesCount.d';
import './CoursesCount.scss';
import CreatedCourses from '../createdCourses/CreatedCourses';

const CoursesCount: React.FC<CoursesCountProps> = ({ onCreateCourseClick }) => {
  return (
    <div className="course-detail">
      <img src={BookIcon} alt="" />
      <div className="no-of-courses">
        <h2>Create Course Again</h2>
        <p>Write something here that’ll make your reader excited! You can write anything in here. Get started.</p>
      </div>
      <Button variant="primary"
        customStyle={{ /* your custom styles */ }}
        childClasses="string" className='btn-icon' onClick={onCreateCourseClick}><span >+</span>Create New Course</Button>
    </div>
  );
}

export default CoursesCount;
