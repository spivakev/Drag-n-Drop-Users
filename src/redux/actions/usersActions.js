import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_USERS_RESET
} from './types'

export const getUsersStart = () => ({
  type: GET_USERS_START
})

export const getUsersSuccess = (data) => ({
  type: GET_USERS_SUCCESS,
  payload: { data }
})

export const getUsersError = (error) => ({
  type: GET_USERS_ERROR,
  payload: { error }
})

export const getUsersReset = () => ({
  type: GET_USERS_RESET
})
