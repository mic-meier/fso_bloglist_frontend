import React from "react";
import User from "../User/User";

const UsersList = ({ users }) => {
  if (users) {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <td>User</td>
              <td>Blogs Created</td>
            </tr>
            {users.map((user) => {
              return <User user={user} key={user.id} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};

export default UsersList;
