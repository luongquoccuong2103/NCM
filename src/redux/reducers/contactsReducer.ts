import { itemHome } from "../../../mocks/home";
const initialState = {
  contactList: itemHome,
  updatedContact: null,
};

function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_CONTACT":
      return {
        ...state,
        contactList: state.contactList.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        updatedContact: action.payload,
      };
    default:
      return state;
  }
}

export default contactsReducer;
