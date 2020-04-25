import React from "react";

const BlogDetails = ({ blog, likeBlog, deleteBlog }) => {
  if (!blog) {
    return null;
  }

  return (
    <div>
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
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogDetails;
