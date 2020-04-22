import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";

import { useDispatch, useSelector } from "react-redux";
import {
  initializeBlogs,
  createABlog,
  deleteABlog,
  likeABlog,
} from "./redux/reducers/blogReducer";
import { setNotification } from "./redux/reducers/notificationReducer";
import { getLoggedInUser, signIn } from "./redux/reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Initialize blogs and userin redux store
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(signIn(username, password));
      setUsername("");
      setPassword("");
    } catch (error) {
      setNotification("Incorrect credentials", "error", 2);
      setUsername("");
      setPassword("");
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

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

  const likeBlog = (blogObject) => {
    const blogToUpdate = {
      user: blogObject.user.id || blogObject.user,
      likes: blogObject.likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
    };

    try {
      dispatch(likeABlog(blogToUpdate, blogObject.id));

      dispatch(
        setNotification(
          `You have liked "${blogObject.title}" by ${blogObject.author}`,
          "notification",
          2
        )
      );
    } catch (error) {
      dispatch(setNotification(error.message, "error", 2));
    }
  };

  const deleteBlog = (blogObject) => {
    if (
      window.confirm(
        `Remove blog "${blogObject.title} by ${blogObject.author}"?`
      )
    ) {
      try {
        dispatch(deleteABlog(blogObject.id));

        dispatch(
          setNotification(
            `Blog "${blogObject.title} by ${blogObject.author} removed`,
            "notification",
            2
          )
        );
      } catch (error) {
        dispatch(setNotification(error.message, "error", 2));
      }
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );

  const blogFormRef = React.createRef();

  const blogForm = () => (
    <Toggleable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Toggleable>
  );
  if (user === null) {
    return (
      <div>
        <Notification />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        Logged in as: {user.username}
        <button id="logoutbutton" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
      <br />
      {blogForm()}
      <br />
      <div>
        {blogs
          .sort(function (a, b) {
            if (a.likes < b.likes) {
              return 1;
            }
            if (a.likes > b.likes) {
              return -1;
            }
            return 0;
          })
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
