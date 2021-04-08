import {
  ADD_SELECTED_USER,
  REMOVE_SELECTED_USER,
  SET_SELECTED_USERS,
} from "./types";

/*Добавление в конец */
export const addSelectedUser = (user) => ({
  type: ADD_SELECTED_USER,
  payload: { user },
});

export const removeSelectedUser = (user) => ({
  type: REMOVE_SELECTED_USER,
  payload: { user },
});

export const setSelectedUsers = (users) => ({
  type: SET_SELECTED_USERS,
  payload: { users },
});
