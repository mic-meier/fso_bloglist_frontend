import React from "react";
import Blog from "../Blog/Blog";

const BlogList = ({ blogs, loggedInUser, likeBlog, deleteBlog }) => {
  return (
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
            user={loggedInUser}
          />
        ))}
    </div>
  );
};

export default BlogList;
