import React from "react";

const LoggedInUser = ({ user, handleLogOut }) => {
  return (
    <>
      Logged in as: {user.name}
      <button id="logoutbutton" onClick={handleLogOut}>
        Log Out
      </button>
    </>
  );
};

export default LoggedInUser;
