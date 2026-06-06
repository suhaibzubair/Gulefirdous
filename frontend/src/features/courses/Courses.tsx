// Courses.tsx
import React from 'react';
import Button from '../../components/shared/button/Button';
import { Link } from 'react-router-dom';
import './Courses.scss';

export default function Courses() {
  return (
    <div className='courses-container'>
      <div className='d-flex justify-center'>
        <Link to='create-course'>
          <Button
            variant="primary"
            className="custom-button"
            customStyle={{ /* your custom styles here */ }}
            onClick={() => {/* your click handler here */}}
            childClasses=""
          >
            Create Course
          </Button>
        </Link>
      </div>
      <div className='no-courses-text'> No Courses Created</div>
    </div>
  );
}
