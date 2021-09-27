import {
  GET_ALL_FOODS_PENDING,
  GET_ALL_FOODS_SUCCESS,
  GET_ALL_FOODS_FAILED,

  ADD_CUSTOM_FOOD_PENDING,
  ADD_CUSTOM_FOOD_SUCCESS,
  ADD_CUSTOM_FOOD_FAILED,

  EDIT_CUSTOM_FOOD_PENDING,
  EDIT_CUSTOM_FOOD_SUCCESS,
  EDIT_CUSTOM_FOOD_FAILED,

  DELETE_CUSTOM_FOOD_PENDING,
  DELETE_CUSTOM_FOOD_SUCCESS,
  DELETE_CUSTOM_FOOD_FAILED
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
    case ADD_CUSTOM_FOOD_PENDING:
      return {
        ...state,
        isPending: true
      }
    case ADD_CUSTOM_FOOD_SUCCESS:
      return {
        ...state,
        foods: action.payload,
        isPending: false
      }
    case ADD_CUSTOM_FOOD_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    case EDIT_CUSTOM_FOOD_PENDING:
      return {
        ...state,
        isPending: true
      }
    case EDIT_CUSTOM_FOOD_SUCCESS:
      return {
        ...state,
        foods: action.payload,
        isPending: false
      }
    case EDIT_CUSTOM_FOOD_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    case DELETE_CUSTOM_FOOD_PENDING:
      return {
        ...state,
        isPending: true
      }
    case DELETE_CUSTOM_FOOD_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        // foods: action.payload,
        isPending: false
      }
    case DELETE_CUSTOM_FOOD_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    default:
      return state
  }
}