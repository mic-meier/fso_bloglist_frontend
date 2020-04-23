import React from "react";
import Navbar from "./Navbar/Navbar";
import { useHistory } from "react-router-dom";

const NavbarContainer = ({ user }) => {
  const history = useHistory();

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInUser");
    history.push("/");
    window.location.reload();
  };

  return (
    <div>
      <Navbar user={user} handleLogOut={handleLogOut} />
    </div>
  );
};

export default NavbarContainer;
