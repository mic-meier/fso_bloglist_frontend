const initialState = {
  message: "null",
  display: false,
  className: "notification",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        message: action.message,
        display: true,
        className: action.className,
      };
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        display: false,
      };
    default:
      return state;
  }
};

let id;

export const setNotification = (message, className, time) => {
  return async (dispatch) => {
    clearTimeout(id);
    dispatch({
      type: "SHOW_NOTIFICATION",
      message: message,
      className: className,
    });
    id = setTimeout(() => {
      dispatch({
        type: "HIDE_NOTIFICATION",
      });
    }, time * 1000);
  };
};

export default reducer;
