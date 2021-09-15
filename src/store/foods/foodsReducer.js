import {
  GET_ALL_FOODS_PENDING,
  GET_ALL_FOODS_SUCCESS,
  GET_ALL_FOODS_FAILED
 } from './foodsConstants';

const initialStateFoods = {
  foods: [],
  isPending: false
}

export const foodsReducer = (state=initialStateFoods, action={}) => {
  switch (action.type) {
    case GET_ALL_FOODS_PENDING:
      return {
        ...state,
        isPending: true
      }
    case GET_ALL_FOODS_SUCCESS:
      return {
        ...state,
        foods: action.payload,
        isPending: false
      }
    case GET_ALL_FOODS_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    default:
      return state
  }
}