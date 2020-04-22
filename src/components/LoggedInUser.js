import React from "react";

const LoggedInUser = ({ user }) => {
  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  return (
    <div>
      <div>Logged in as: {user.name}</div>
      <button id="logoutbutton" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default LoggedInUser;
