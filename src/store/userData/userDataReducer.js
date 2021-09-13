import {
  LOGOUT,

  LOGIN_OR_REGISTER_PENDING,
  LOGIN_OR_REGISTER_SUCCESS,
  LOGIN_OR_REGISTER_FAILED,

  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
 } from './userDataConstants';

const initialStateUserData = {
  id: 0,
  name: '',
  surname: '',
  email: '',
  password: '',
  gender: '',
  birthday: '',
  weight: '',
  height: '',
  isPending: false
}

export const userDataReducer = (state=initialStateUserData, action={}) => {
  switch (action.type) {
    case LOGOUT:
      return {
        id: 0,
        name: '',
        surname: '',
        email: '',
        password: '',
        gender: '',
        birthday: '',
        weight: '',
        height: '',
        isPending: false
      }
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
        gender: action.payload.gender,
        birthday: action.payload.birthday,
        weight: action.payload.weight,
        height: action.payload.height,
        isPending: false
      }
    case LOGIN_OR_REGISTER_FAILED:
      return {
        ...state,
        error: action.payload,
        isPending: false
      }
    case RESET_PASSWORD_PENDING:
      return {
        ...state,
        isPending: true
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isPending: false
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    default:
      return state
  }
}