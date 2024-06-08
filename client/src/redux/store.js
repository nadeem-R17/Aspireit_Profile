import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";  // Update this line
import { profileReducer } from "./reducers/profileReducer";

const rootReducer = combineReducers({
  profile: profileReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
