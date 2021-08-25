import {
  LOGIN_OR_REGISTER_PENDING,
  LOGIN_OR_REGISTER_SUCCESS,
  LOGIN_OR_REGISTER_FAILED
 } from './constants';

const initialStateUserData = {
  id: 0,
  name: '',
  surname: '',
  email: '',
  password: '',
  isPending: false
}

export const userDataReducer = (state=initialStateUserData, action={}) => {
  switch (action.type) {
    case LOGIN_OR_REGISTER_PENDING:
      return {
        ...state,
        isPending: true
      }
    case LOGIN_OR_REGISTER_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        surname: action.payload.surname,
        email: action.payload.email,
        password: action.payload.password,
        isPending: false
      }
    case LOGIN_OR_REGISTER_FAILED:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}