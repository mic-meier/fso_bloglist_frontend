import React, { useEffect } from "react";
import {
  Switch,
  Route,
  /*Link,
  useRouteMatch,
  useHistory,*/
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoggedInUser from "./components/LoggedInUser";
import Loginform from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import UsersList from "./components/UsersList";
import { initializeBlogs, createABlog } from "./redux/reducers/blogReducer";
import { setNotification } from "./redux/reducers/notificationReducer";
import { getLoggedInUser } from "./redux/reducers/loggedInUserReducer";
import { initializeUsers } from "./redux/reducers/userReducer";

const App = () => {
  // Initialize blogs and userin redux store
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch]);

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    try {
      dispatch(createABlog(blogObject));
      dispatch(
        setNotification(
          `A new blog ${blogObject.title} by ${blogObject.author} has been added`,
          "notification",
          2
        )
      );
    } catch (error) {
      dispatch(setNotification("Blog details missing", "error", 2));
    }
  };

  const blogFormRef = React.createRef();

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
          <UsersList users={users} />
        </Route>
        <Route path="/">
          <Notification />
          <Toggleable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Toggleable>
          <BlogList />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
