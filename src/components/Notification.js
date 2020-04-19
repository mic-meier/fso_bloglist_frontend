import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return (
    <>
      {notification.display ? (
        <div className={notification.className}>
          {notification.message}Hello
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Notification;
