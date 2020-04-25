import blogService from "../../services/blogs";
import { setNotification } from "../reducers/notificationReducer";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "CREATE": {
      const blog = action.data;
      return [...state, blog];
    }
    case "COMMENT": {
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
    }
    case "LIKE": {
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
    }
    case "DELETE": {
      return state.filter((blog) => blog.id !== action.id);
    }
    default:
      return state;
  }
};

// Action creators
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const createABlog = (data) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createBlog(data);
      dispatch({
        type: "CREATE",
        data: newBlog,
      });
    } catch (error) {
      dispatch(setNotification("Blogdetails missing", "error", 2));
    }
  };
};

export const likeABlog = (data, id) => {
  return async (dispatch) => {
    const likedBlog = await blogService.likeBlog(data, id);
    dispatch({
      type: "LIKE",
      data: likedBlog,
    });
  };
};

export const commentOnABlog = (data, id) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.commentOnBlog(data, id);
    dispatch({
      type: "COMMENT",
      data: returnedBlog,
    });
  };
};

export const deleteABlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch({
      type: "DELETE",
      id,
    });
  };
};

export default blogReducer;
