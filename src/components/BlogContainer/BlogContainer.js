import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeBlogs,
  createABlog,
  likeABlog,
  deleteABlog,
} from "../../redux/reducers/blogReducer";
import { setNotification } from "../../redux/reducers/notificationReducer";
import BlogForm from "./BlogForm/BlogForm";
import BlogList from "./BlogList/BlogList";
import Toggleable from "./Toggleable/Toggleable";

const BlogContainer = () => {
  const blogs = useSelector((state) => state.blogs);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

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

  const blogFormRef = React.createRef();

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
      <Toggleable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggleable>
      <BlogList
        blogs={blogs}
        loggedInUser={loggedInUser}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
      />
    </div>
  );
};

export default BlogContainer;
