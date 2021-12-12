import {
  ADD_MEAL_PENDING,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILED,

  GET_MEALS_FROM_USER_PENDING,
  GET_MEALS_FROM_USER_SUCCESS,
  GET_MEALS_FROM_USER_FAILED,

  DELETE_MEAL_PENDING,
  DELETE_MEAL_SUCCESS,
  DELETE_MEAL_FAILED,

  ADD_FOOD_TO_CURRENT_MEAL,
  REMOVE_FOOD_FROM_CURRENT_MEAL,
  RESET_CURRENT_MEAL,

  UPDATE_CURRENT_MEAL_IN_STATE,

  CHANGE_CURRENT_MEAL_NAME_AND_DATE_EATEN,

  UPDATE_CURRENT_MEAL_PENDING,
  UPDATE_CURRENT_MEAL_SUCCESS,
  UPDATE_CURRENT_MEAL_FAILED,

  GET_MEALS_BY_PERIOD_PENDING,
  GET_MEALS_BY_PERIOD_SUCCESS,
  GET_MEALS_BY_PERIOD_FAILED,

  GET_LAST_YEARS_MEALS_PENDING,
  GET_LAST_YEARS_MEALS_SUCCESS,
  GET_LAST_YEARS_MEALS_FAILED
 } from './mealsConstants'

import API_URL from '../../env';

export const addMeal = (userId, meal) => (dispatch) => {
  dispatch({ type: ADD_MEAL_PENDING });
  return(
    fetch(`${API_URL}/api/meals?userId=${userId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        dateEaten: meal.dateEaten,
        name: meal.name,
        FoodList: meal.FoodList
      })
    })
  )
  .then(response => response.json())
  .then(mealsData => dispatch({ type: ADD_MEAL_SUCCESS, payload: mealsData }))
  .catch(error => dispatch({ type: ADD_MEAL_FAILED, payload: error }))
}

export const getMealsFromUser = (userId) => (dispatch) => {
  dispatch({ type: GET_MEALS_FROM_USER_PENDING });
  return(
    fetch(`${API_URL}/api/meals?userId=${userId}`)
  )
  .then(response => response.json())
  .then(mealsData => dispatch({ type: GET_MEALS_FROM_USER_SUCCESS, payload: mealsData }))
  .catch(error => dispatch({ type: GET_MEALS_FROM_USER_FAILED, payload: error }))
}

export const deleteMeal = (mealId, userId) => (dispatch) => {
  dispatch({ type: DELETE_MEAL_PENDING });
  return(
    fetch(`${API_URL}/api/meals?mealId=${mealId}&userId=${userId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
  )
  .then(response => response.json())
  .then(mealsData => dispatch({ type: DELETE_MEAL_SUCCESS, payload: mealsData }))
  .catch(error => dispatch({ type: DELETE_MEAL_FAILED, payload: error }))
}

export const addFoodToCurrentMeal = (food) => ({ 
  type: ADD_FOOD_TO_CURRENT_MEAL,
  payload: food
})

export const removeFoodFromCurrentMeal = (food) => ({ 
  type: REMOVE_FOOD_FROM_CURRENT_MEAL,
  payload: food
})

export const resetCurrentMeal = () => ({ 
  type: RESET_CURRENT_MEAL
})

export const updateCurrentMealInState = (newCurrentMeal) => ({
  type: UPDATE_CURRENT_MEAL_IN_STATE,
  payload: newCurrentMeal
})

export const changeCurrentMealNameAndDateEaten = (newName, newDateEaten) => ({
  type: CHANGE_CURRENT_MEAL_NAME_AND_DATE_EATEN,
  payload: {newName, newDateEaten}
})

export const updateCurrentMeal = (meal) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_MEAL_PENDING });
  return(
    fetch(`${API_URL}/api/meals?mealId=${meal.mealId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        dateEaten: meal.dateEaten,
        name: meal.name,
        FoodList: meal.FoodList
      })
    })
  )
  .then(response => response.json())
  .then(mealsData => dispatch({ type: UPDATE_CURRENT_MEAL_SUCCESS, payload: mealsData }))
  .catch(error => dispatch({ type: UPDATE_CURRENT_MEAL_FAILED, payload: error }))
}

export const getMealsByPeriod = (userId, dateStart, dateEnd) => (dispatch) => {
  dispatch({ type: GET_MEALS_BY_PERIOD_PENDING });
  return(
    fetch(`${API_URL}/api/meals?userId=${userId}&dateStart=${dateStart}&dateEnd=${dateEnd}`)
  )
  .then(response => response.json())
  .then(mealsByPeriodData => dispatch({ type: GET_MEALS_BY_PERIOD_SUCCESS, payload: mealsByPeriodData }))
  .catch(error => dispatch({ type: GET_MEALS_BY_PERIOD_FAILED, payload: error }))
}

export const getLastYearsMeals = (userId) => (dispatch) => {
  dispatch({ type: GET_LAST_YEARS_MEALS_PENDING });
  return(
    fetch(`${API_URL}/api/meals/graphBar?userId=${userId}`)
  )
  .then(response => response.json())
  .then(lastYearsMealsData => dispatch({ type: GET_LAST_YEARS_MEALS_SUCCESS, payload: lastYearsMealsData }))
  .catch(error => dispatch({ type: GET_LAST_YEARS_MEALS_FAILED, payload: error }))
}