import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import contactsReducer from "../reducers/contactsReducer";

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
