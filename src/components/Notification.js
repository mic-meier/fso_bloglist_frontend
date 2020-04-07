import React from "react";

const Notification = ({ notificationClass, notificationMessage }) => {
  if (notificationMessage === null) {
    return null;
  }
  return <div className={notificationClass}>{notificationMessage}</div>;
};

export default Notification;
