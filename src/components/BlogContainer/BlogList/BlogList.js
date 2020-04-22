import React from "react";
import Blog from "./Blog/Blog";

const BlogList = ({ blogs }) => {
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
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
