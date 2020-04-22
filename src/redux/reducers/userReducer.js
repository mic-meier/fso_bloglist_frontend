import blogService from "../../services/blogs";
import loginService from "../../services/login";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "STORE_USER":
      return action.data;
    default:
      return state;
  }
};

export const getLoggedInUser = (/*loggedInUser*/) => {
  return (dispatch) => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);

      blogService.setToken(user.token);

      dispatch({
        type: "STORE_USER",
        data: user,
      });
    }
  };
};

export const signIn = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });
    window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({
      type: "STORE_USER",
      data: user,
    });
  };
};

export default userReducer;
