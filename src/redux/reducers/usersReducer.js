import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_USERS_RESET
} from "../actions/types"

const initialState = {
  data: null,
  loading: false,
  success: false,
  error: ''
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_START:
      return {
        ...state,
        loading: true
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload.data
      }
    case GET_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    case GET_USERS_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        error: ''
      }
    default:
      return state
  }
}