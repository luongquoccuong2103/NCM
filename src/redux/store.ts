import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./reducers/contactsReducer";

export default configureStore({
  reducer: {
    contact: contactsReducer,
  },
});
