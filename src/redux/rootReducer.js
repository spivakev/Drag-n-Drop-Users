import { combineReducers } from "redux";
import { dragDropReducer } from "./reducers/dragDropReducer";
import { filterReducer } from "./reducers/filterReducer";
import { selectedUsersReducer } from "./reducers/selectedUsersReducer";
import { usersReducer } from "./reducers/usersReducer"

export const rootReducer = combineReducers({
  users: usersReducer,
  selectedUsers: selectedUsersReducer,
  dragDrop: dragDropReducer,
  filter: filterReducer,
})