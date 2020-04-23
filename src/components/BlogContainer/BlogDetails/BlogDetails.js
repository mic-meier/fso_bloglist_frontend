import React from "react";

const BlogDetails = ({ blog, likeBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  if (!blog) {
    return null;
  }

  return (
    <div style={blogStyle}>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{" "}
        <button className="likeButton" onClick={() => likeBlog(blog)}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <button onClick={() => deleteBlog(blog)}>delete</button>
    </div>
  );
};

export default BlogDetails;
