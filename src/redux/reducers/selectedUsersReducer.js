import {
  ADD_SELECTED_USER,
  REMOVE_SELECTED_USER,
  SET_SELECTED_USERS,
} from "../actions/types";

const initialState = {
  selectedUsers: [],
};

export const selectedUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SELECTED_USER:
      return {
        ...state,
        selectedUsers: [...state.selectedUsers, action.payload.user],
      };
    case REMOVE_SELECTED_USER:
      return {
        ...state,
        selectedUsers: state.selectedUsers.filter(
          (user) => user.login.uuid !== action.payload.user.login.uuid
        ),
      };
    case SET_SELECTED_USERS:
      return {
        ...state,
        selectedUsers: [...action.payload.users],
      };
    default:
      return state;
  }
};
