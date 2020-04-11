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

  const showMessage = (message, className) => {
    setNotificationMessage(message);
    setNotificationClass(className);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 2000);
  };

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
      showMessage("Incorrect credentials", "error");
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

      showMessage(
        `A new blog "${returnedBlog.title}" by ${returnedBlog.author} has been added`,
        "notifiation"
      );
    } catch (error) {
      showMessage("Blog details missing", "error");
    }
  };

  const likeBlog = async (blogObject) => {
    const id = blogObject.id;
    const user = blogObject.user.id || blogObject.user;

    const blogToUpdate = {
      user: user,
      likes: blogObject.likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
    };

    try {
      const returnedBlog = await blogService.likeBlog(blogToUpdate, id);

      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));

      showMessage(
        `You have liked "${returnedBlog.title}" by ${returnedBlog.author}`,
        "notification"
      );
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const deleteBlog = async (blogObject) => {
    const blogToDelete = blogObject;
    if (
      window.confirm(
        `Remove blog "${blogToDelete.title} by ${blogToDelete.author}"?`
      )
    ) {
      try {
        await blogService.deleteBlog(blogToDelete.id);

        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));

        showMessage(
          `Blog "${blogToDelete.title} by ${blogToDelete.author} removed`,
          "notification"
        );
      } catch (error) {
        showMessage(error.message, "error");
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
