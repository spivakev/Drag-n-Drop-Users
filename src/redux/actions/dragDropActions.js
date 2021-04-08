import {
  SET_DRAGGING,
  SET_DRAGGING_USER,
  SET_DRAGGING_CARD_SELECTED,
} from "./types";

export const setDragging = (dragging) => ({
  type: SET_DRAGGING,
  payload: { dragging },
});

export const setDraggingUser = (user) => ({
  type: SET_DRAGGING_USER,
  payload: { user },
});

export const setDraggingCardSelected = (selected) => ({
  type: SET_DRAGGING_CARD_SELECTED,
  payload: { selected },
});
