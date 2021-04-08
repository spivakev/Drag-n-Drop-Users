import {
  SET_DRAGGING,
  SET_DRAGGING_USER,
  SET_DRAGGING_CARD_SELECTED,
} from "../actions/types";

const initialState = {
  dragging: false,
  draggingUser: null,
  draggingCardSelected: false,
};

export const dragDropReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DRAGGING:
      return {
        ...state,
        dragging: action.payload.dragging,
      };
    case SET_DRAGGING_USER:
      return {
        ...state,
        draggingUser: action.payload.user,
      };
    case SET_DRAGGING_CARD_SELECTED:
      return {
        ...state,
        draggingCardSelected: action.payload.selected,
      };
    default:
      return state;
  }
};
