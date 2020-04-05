import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setblogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

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
    } catch (exception) {
      console.log("exception", exception);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };

    blogService.createBlog(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setBlogTitle("");
      setblogAuthor("");
      setBlogUrl("");
    });
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

  const blogForm = () => (
    <div>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:
          <input
            type="text"
            value={blogTitle}
            name="Blogtitle"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={blogAuthor}
            name="Blogauthor"
            onChange={({ target }) => setblogAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={blogUrl}
            name="Blogurl"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );

  if (user === null) {
    return <div>{loginForm()}</div>;
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        Logged in as: {user.username}
        <button onClick={handleLogOut}>Log Out</button>
      </div>
      <br />
      <h2>Add a Blog</h2>
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
