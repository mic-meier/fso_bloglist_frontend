/* eslint-disable linebreak-style */
import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  const standardView = (
    <div style={blogStyle} className="standardview">
      {blog.title} {blog.author} <button onClick={handleClick}>view</button>
    </div>
  );

  const detailedView = (
    <div style={blogStyle} className="detailedView">
      <div>
        {blog.title} by {blog.author}{" "}
        <button onClick={handleClick}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes <button onClick={() => likeBlog(blog)}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <div></div>
      {blog.user.username === user.username ? (
        <button onClick={() => deleteBlog(blog)}>delete</button>
      ) : null}
    </div>
  );

  return <div>{showDetails ? detailedView : standardView}</div>;
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
