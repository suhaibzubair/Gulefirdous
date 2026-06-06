import React from 'react';
import { CardProps } from './Card.d';
import './Card.scss';
import {ReactComponent as Star } from '../../../assets/images/yellowStar.svg';

const Card: React.FC<CardProps> = ({
  title,
  imageSrc,
  enrolledCount,
  classCount,
  lectureCount,
  style,
  customClassName,
  simpleCourses,
  review,
}) => {
  return (
    <div className={`card ${customClassName}`} style={{ ...style, ...(simpleCourses ? { flexDirection: 'row', flexWrap: 'nowrap' } : {}) }}>
      <img src={imageSrc} alt="Card Image" className="card-image" style={{ width: '100%', height: '200px' }} />
      <div className="card-content">
        <div className="d-flex justify-space-between align-start">
          <span style={{ fontSize: '16px' }} className="notification-heading">
            {title}
          </span>
          <span style={{ fontSize: '10px', fontWeight: 400, color: '#218C75' }}>
            {enrolledCount} enrolled
          </span>
        </div>
        <div className="d-flex justify-space-between">
          <span style={{ color: '#818181' }} className="card-stats">
            {classCount} classes
          </span>
          <span style={{ color: '#218C75' }} className="card-stats">
            {lectureCount} lectures
          </span>
        </div>
        <div className="card-reviews">
          <span><Star/>
          <Star/>
          <Star/>
          <Star/>
          <Star/></span>
          <span>({review})</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
