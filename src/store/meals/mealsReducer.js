import {
  ADD_MEAL_PENDING,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILED,

  GET_MEALS_FROM_USER_PENDING,
  GET_MEALS_FROM_USER_SUCCESS,
  GET_MEALS_FROM_USER_FAILED,

  DELETE_MEAL_PENDING,
  DELETE_MEAL_SUCCESS,
  DELETE_MEAL_FAILED
 } from './mealsConstants';

const initialStateMeals = {
  meals: [],
  isPending: false
}

export const mealsReducer = (state=initialStateMeals, action={}) => {
  switch (action.type) {
    case ADD_MEAL_PENDING:
      return {
        ...state,
        isPending: true
      }
    case ADD_MEAL_SUCCESS:
      return {
        ...state,
        meals: state.meals.concat(action.payload),
        isPending: false
      }
    case ADD_MEAL_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
      case GET_MEALS_FROM_USER_PENDING:
        return {
          ...state,
          isPending: true
        }
      case GET_MEALS_FROM_USER_SUCCESS:
        console.log(action.payload)
        return {
          ...state,
          meals: action.payload,
          isPending: false
        }
      case GET_MEALS_FROM_USER_FAILED:
        return {
          ...state,
          isPending: false,
          error: action.payload
        }
        case DELETE_MEAL_PENDING:
          return {
            ...state,
            isPending: true
          }
        case DELETE_MEAL_SUCCESS:
          return {
            ...state,
            meals: state.meals.filter((meal) => meal.mealId !== action.payload.deletedMealId),
            isPending: false
          }
        case DELETE_MEAL_FAILED:
          return {
            ...state,
            isPending: false,
            error: action.payload
          }
    default:
      return state
  }
}