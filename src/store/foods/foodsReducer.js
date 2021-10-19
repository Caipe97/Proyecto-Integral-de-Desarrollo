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
  DELETE_CUSTOM_FOOD_FAILED,

  GET_FOOD_CATEGORIES_PENDING,
  GET_FOOD_CATEGORIES_SUCCESS,
  GET_FOOD_CATEGORIES_FAILED,

  CREATE_FOOD_CATEGORY_PENDING,
  CREATE_FOOD_CATEGORY_SUCCESS,
  CREATE_FOOD_CATEGORY_FAILED,

  EDIT_FOOD_CATEGORY_PENDING,
  EDIT_FOOD_CATEGORY_SUCCESS,
  EDIT_FOOD_CATEGORY_FAILED,

  DELETE_FOOD_CATEGORY_PENDING,
  DELETE_FOOD_CATEGORY_SUCCESS,
  DELETE_FOOD_CATEGORY_FAILED
 } from './foodsConstants';

const initialStateFoods = {
  foods: [],
  foodCategories: [],
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
      //HACK, CAMBIAR LUEGO
      // console.log("HOLAAAA")
      // console.log("ACTION.PAYLOAD",action.payload)
      action.payload.forEach(food => {
        console.log(food.foodCategoryId)
        if(food.foodCategoryId === null){
          food.foodCategoryId = -2
        }

      }
        )
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
      return {
        ...state,
        foods: action.payload,
        isPending: false
      }
    case DELETE_CUSTOM_FOOD_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    case GET_FOOD_CATEGORIES_PENDING:
      return {
        ...state,
        isPending: true
      }
    case GET_FOOD_CATEGORIES_SUCCESS:
      return {
        ...state,
        foodCategories: action.payload,
        isPending: false
      }
    case GET_FOOD_CATEGORIES_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    case CREATE_FOOD_CATEGORY_PENDING:
      return {
        ...state,
        isPending: true
      }
    case CREATE_FOOD_CATEGORY_SUCCESS:
      return {
        ...state,
        foodCategories: action.payload,
        isPending: false
      }
    case CREATE_FOOD_CATEGORY_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    case EDIT_FOOD_CATEGORY_PENDING:
      return {
        ...state,
        isPending: true
      }
    case EDIT_FOOD_CATEGORY_SUCCESS:
      return {
        ...state,
        foodCategories: action.payload,
        isPending: false
      }
    case EDIT_FOOD_CATEGORY_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    case DELETE_FOOD_CATEGORY_PENDING:
      return {
        ...state,
        isPending: true
      }
    case DELETE_FOOD_CATEGORY_SUCCESS:
      return {
        ...state,
        foodCategories: action.payload,
        isPending: false
      }
    case DELETE_FOOD_CATEGORY_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    default:
      return state
  }
}