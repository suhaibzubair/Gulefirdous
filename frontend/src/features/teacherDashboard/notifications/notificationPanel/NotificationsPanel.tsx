import React from 'react';
import Notification from '../notification/Notification';
import UserNotification from '../userNotification/UserNotification';
import './NotificationPanel.scss';

export default function NotificationPanel() {
  const notifications = [1, 2, 3, 4];

  return (
    <div className="notification-panel">
      <div className="notifications">
        <span className="notification-heading">Notifications</span>
        {notifications.map((n, i) => (
          <Notification
            key={i}
            title={`New Message ${n}`}
            description="You have a new message from John Doe to test notifications on this page."
            date="2023-09-24"
            time="10:00 AM"
            hideBorder={n === 4}
          />
        ))}
      </div>
      <div className="news">
        <span className="notification-heading">Newly Enrolled Students</span>
        {notifications.map((n, i) => (
          <UserNotification key={i} hideBorder={n === 4} />
        ))}
      </div>
    </div>
  );
}
