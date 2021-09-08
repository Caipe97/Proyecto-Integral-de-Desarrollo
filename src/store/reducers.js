import {
  LOGIN_OR_REGISTER_PENDING,
  LOGIN_OR_REGISTER_SUCCESS,
  LOGIN_OR_REGISTER_FAILED,

  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,

  ADD_RECORD_PENDING,
  ADD_RECORD_SUCCESS,
  ADD_RECORD_FAILED
 } from './constants';

const initialStateUserData = {
  id: 0,
  name: '',
  surname: '',
  email: '',
  password: '',
  gender: '',
  birthday: '',
  weight: 0,
  height: 0,
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
        gender: action.payload.gender,
        birthday: action.payload.birthday,
        weight: action.payload.weight,
        height: action.payload.height,
        isPending: false
      }
    case LOGIN_OR_REGISTER_FAILED:
      return {
        ...state,
        error: action.payload
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
        error: action.payload
      }
    default:
      return state
  }
}

const initialStateRecords = {
  records: [{foodName: 'milanesa', gramAmount: 15, dateEaten: '2021-09-06'}, {foodName: 'pollo', gramAmount: 10, dateEaten: '2021-09-07'}],
  isPending: false
}

export const recordsReducer = (state=initialStateRecords, action={}) => {
  switch (action.type) {
    case ADD_RECORD_PENDING:
      return {
        ...state,
        isPending: true
      }
    case ADD_RECORD_SUCCESS:
      return {
        ...state,
        records: action.payload.records,
        isPending: false
      }
    case ADD_RECORD_FAILED:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}