import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notificationClass, setNotificationClass] = useState("notification");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setNotificationClass("error");
      setNotificationMessage("Incorrect credentials");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 2000);
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
      const returnedBlog = await blogService.createBlog(blogObject);

      setBlogs(blogs.concat(returnedBlog));

      setNotificationMessage(
        `A new blog "${returnedBlog.title} by ${returnedBlog.author} has been added`
      );
      setNotificationClass("notification");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 2000);
    } catch (error) {
      setNotificationClass("error");
      console.log("error", error);
      setNotificationMessage("Blog details missing");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 2000);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );

  const blogFormRef = React.createRef();

  const blogForm = () => (
    <Toggleable buttonLabel="new note" ref={blogFormRef}>
      <h2>Add a Blog</h2>
      <BlogForm createBlog={createBlog} />
    </Toggleable>
  );

  if (user === null) {
    return (
      <div>
        <Notification
          notificationClass={notificationClass}
          notificationMessage={notificationMessage}
        />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        notificationClass={notificationClass}
        notificationMessage={notificationMessage}
      />
      <div>
        Logged in as: {user.username}
        <button onClick={handleLogOut}>Log Out</button>
      </div>
      <br />
      {blogForm()}
      <br />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
