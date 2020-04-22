import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, likeABlog } from "../redux/reducers/blogReducer";
import { setNotification } from "../redux/reducers/notificationReducer";
import Blog from "./Blog";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

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
            user={user}
          />
        ))}
    </div>
  );
};

export default BlogList;
