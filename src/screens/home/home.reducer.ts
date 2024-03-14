import { createReducer } from "@reduxjs/toolkit";
import { contact } from "../../types/contact.type";
import { itemHome } from "../../../mocks/home";

interface contactState {
  contactList: contact[];
}
const initialState: contactState = {
  contactList: itemHome,
};
const contactListReducer = createReducer(initialState, (builder) => {});

export default contactListReducer;
