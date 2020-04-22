import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoggedInUser from "./components/LoggedInUser";
import Loginform from "./components/LoginForm";
import Notification from "./components/Notification";
import UsersContainer from "./components/UsersContainer/UsersContainer";
import { getLoggedInUser } from "./redux/reducers/loggedInUserReducer";
import BlogContainer from "./components/BlogContainer/BlogContainer";

const App = () => {
  // Initialize blogs and userin redux store
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch]);

  // User not logged in
  if (loggedInUser === null) {
    return (
      <div>
        <Notification />
        <Loginform />
      </div>
    );
  }

  // User logged in
  return (
    <div>
      <h2>blogs</h2>
      <LoggedInUser user={loggedInUser} />
      <Switch>
        <Route path="/users">
          <UsersContainer />
        </Route>
        <Route path="/blogs">
          <BlogContainer />
        </Route>
        <Route path="/">
          <Notification />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
