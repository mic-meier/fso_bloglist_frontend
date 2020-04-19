import blogService from "../../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "CREATE": {
      const blog = action.data;
      return [...state, blog];
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
    const newBlog = await blogService.createBlog(data);
    dispatch({
      type: "CREATE",
      data: newBlog,
    });
  };
};

export default blogReducer;
