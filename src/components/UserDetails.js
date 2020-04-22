import React from "react";
import { useRouteMatch } from "react-router-dom";

const UserDetails = ({ users }) => {
  const match = useRouteMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default UserDetails;
