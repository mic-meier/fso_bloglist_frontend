import React from "react";
import { Link } from "react-router-dom";
import LoggedInUser from "../LoggedInUser/LoggedInUser";

const Navbar = ({ user, handleLogOut }) => {
  return (
    <div>
      <Link to="/blogs">Blogs</Link>
      <Link to="/users">Users</Link>
      <LoggedInUser user={user} handleLogOut={handleLogOut} />
    </div>
  );
};

export default Navbar;
