import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import loggedInUserReducer from "./reducers/loggedInUserReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: loggedInUserReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
