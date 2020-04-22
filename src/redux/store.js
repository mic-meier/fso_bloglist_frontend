import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import loggedInUserReducer from "./reducers/loggedInUserReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  loggedInUser: loggedInUserReducer,
  users: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
