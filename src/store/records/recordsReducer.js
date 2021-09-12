import {
  ADD_RECORD_PENDING,
  ADD_RECORD_SUCCESS,
  ADD_RECORD_FAILED,

  GET_RECORDS_FROM_USER_PENDING,
  GET_RECORDS_FROM_USER_SUCCESS,
  GET_RECORDS_FROM_USER_FAILED,

  DELETE_RECORD_PENDING,
  DELETE_RECORD_SUCCESS,
  DELETE_RECORD_FAILED
 } from './recordsConstants';

const initialStateRecords = {
  records: [],
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
        records: state.records.concat(action.payload),
        isPending: false
      }
    case ADD_RECORD_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
      case GET_RECORDS_FROM_USER_PENDING:
        return {
          ...state,
          isPending: true
        }
      case GET_RECORDS_FROM_USER_SUCCESS:
        return {
          ...state,
          records: action.payload,
          isPending: false
        }
      case GET_RECORDS_FROM_USER_FAILED:
        return {
          ...state,
          isPending: false,
          error: action.payload
        }
        case DELETE_RECORD_PENDING:
          return {
            ...state,
            isPending: true
          }
        case DELETE_RECORD_SUCCESS:
          return {
            ...state,
            records: state.records.filter((record) => record.id !== action.payload.deletedRecordID),
            isPending: false
          }
        case DELETE_RECORD_FAILED:
          return {
            ...state,
            isPending: false,
            error: action.payload
          }
    default:
      return state
  }
}