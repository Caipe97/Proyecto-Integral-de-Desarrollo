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
  RESET_CURRENT_MEAL
 } from './mealsConstants'

export const addMeal = (userId, foodName, gramAmount, dateEaten) => (dispatch) => {
  dispatch({ type: ADD_MEAL_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/meals`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
        foodName: foodName,
        gramAmount: gramAmount,
        dateEaten: dateEaten
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
    fetch(`https://jma-test-app.herokuapp.com/api/meals?userId=${userId}`)
  )
  .then(response => response.json())
  .then(mealsData => dispatch({ type: GET_MEALS_FROM_USER_SUCCESS, payload: mealsData }))
  .catch(error => dispatch({ type: GET_MEALS_FROM_USER_FAILED, payload: error }))
}

export const deleteMeal = (mealId) => (dispatch) => {
  dispatch({ type: DELETE_MEAL_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/meals?mealId=${mealId}`, {
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