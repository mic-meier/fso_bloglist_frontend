import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { initializeUsers } from "../../redux/reducers/userReducer";
import UserDetails from "./UserDetails/UserDetails";
import UsersList from "./UsersList/UsersList";

const UsersContainer = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const matchUser = useRouteMatch("/users/:id");
  const users = useSelector((state) => state.users);
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <UserDetails user={user} />
      </Route>
      <Route path={match.path}>
        <UsersList users={users} />
      </Route>
    </Switch>
  );
};

export default UsersContainer;
