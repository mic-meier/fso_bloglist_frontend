import React, { useEffect } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoggedInUser from "./components/LoggedInUser";
import Loginform from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, createABlog } from "./redux/reducers/blogReducer";
import { setNotification } from "./redux/reducers/notificationReducer";
import { getLoggedInUser } from "./redux/reducers/loggedInUserReducer";

const App = () => {
  // Initialize blogs and userin redux store
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
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
  if (user === null) {
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
      <Notification />
      <LoggedInUser user={user.username} />
      <Toggleable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggleable>
      <BlogList />
    </div>
  );
};

export default App;
