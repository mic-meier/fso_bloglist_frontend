import React from "react";

const LoggedInUser = (user) => {
  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  return (
    <div>
      Logged in as: {user.username}
      <button id="logoutbutton" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default LoggedInUser;
