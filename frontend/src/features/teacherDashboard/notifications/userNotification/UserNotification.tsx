import React from 'react';
import { ReactComponent as ProfileIcon } from '../../../../assets/images/Rectangle 153.svg';
import { ReactComponent as MessageIcon } from '../../../../assets/images/message-icon.svg';
import {UserNotificationProps} from './UserNotification.d';
import './UserNotification.scss';


const UserNotification: React.FC<UserNotificationProps> = ({ hideBorder }) => {
  return (
    <div className={`user-notification ${!hideBorder && 'notification-border'}`}>
      <div className="profile-icon">
        <ProfileIcon />
      </div>
      <div className='text-container'>
        <span className="username-text">Your Text Here</span>
        <span className='user-handle-text'>@lillyortiz</span>
      </div>
      <div className="message-icon">
        <MessageIcon />
      </div>
    </div>
  );
};

export default UserNotification;
