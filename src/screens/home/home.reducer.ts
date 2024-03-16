import { createAction, createReducer } from "@reduxjs/toolkit";
import { contact } from "../../types/contact.type";
import { itemHome } from "../../../mocks/home";

export const updateContact = createAction(
  "contact/updateContact",
  function prepare(updatedContact) {
    return { payload: updatedContact };
  }
);

interface contactState {
  contactList: contact[];
}

const initialState: contactState = {
  contactList: itemHome,
};

// Reducer
const contactListReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateContact, (state, action) => {
    const index = state.contactList.findIndex(
      (contact) => contact.id === action.payload.id
    );

    if (index !== -1) {
      state.contactList[index] = {
        ...state.contactList[index],
        ...action.payload,
      };
    }
  });
});

export default contactListReducer;
