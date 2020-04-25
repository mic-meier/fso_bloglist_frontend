import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import {
  initializeBlogs,
  createABlog,
  commentOnABlog,
  likeABlog,
  deleteABlog,
} from "../../redux/reducers/blogReducer";
import { setNotification } from "../../redux/reducers/notificationReducer";
import BlogDetails from "./BlogDetails/BlogDetails";
import BlogForm from "./BlogForm/BlogForm";
import BlogList from "./BlogList/BlogList";
import Notification from "../Notification";
import Toggleable from "./Toggleable/Toggleable";

const BlogContainer = () => {
  const blogs = useSelector((state) => state.blogs);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const matchBlog = useRouteMatch("/blogs/:id");
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

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
        history.push("/blogs");
      } catch (error) {
        dispatch(setNotification(error.message, "error", 2));
      }
    }
  };

  const handleCommenting = (comment, id) => {
    const body = { comment: comment };

    try {
      dispatch(commentOnABlog(body, id));
    } catch (error) {
      dispatch(setNotification(error.message, "error", 2));
    }
  };

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <Notification />
        <BlogDetails
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          handleCommenting={handleCommenting}
        />
      </Route>

      <Route path={match.path}>
        <h2>Blogs</h2>
        <Notification />
        <Toggleable buttonLabel="new note" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Toggleable>
        <BlogList blogs={blogs} loggedInUser={loggedInUser} />
      </Route>
    </Switch>
  );
};

export default BlogContainer;
