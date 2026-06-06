import React from 'react';
import { ReactComponent as NotificationIcon } from '../../../../assets/images/Frame 632.svg';
import { ReactComponent as CrossIcon } from '../../../../assets/images/cross.svg';
import {NotificationProps} from './Notification.d';
import './Notification.scss';


const Notification: React.FC<NotificationProps> = ({ title, description, date, time, hideBorder }) => {
  const closeNotification = () => {
    // Add your code here to handle closing the notification
  };

  return (
    <div className={`notification ${!hideBorder ? 'notification-border' : ''}`}>
      <div className="close-button" onClick={closeNotification}>
        <CrossIcon />
      </div>
      <div className="icon">
        <NotificationIcon />
      </div>
      <div className="notification-content">
        <span className='notification-title'>{title}</span>
        <p className='notification-description'>{description}</p>
        <div className="datetime notification-description">
          <span>{date}</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default Notification;
