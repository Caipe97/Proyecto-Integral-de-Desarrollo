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
  UPDATE_CURRENT_MEAL_FAILED
 } from './mealsConstants'

export const addMeal = (userId, meal) => (dispatch) => {
  dispatch({ type: ADD_MEAL_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/meals?userId=${userId}`, {
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
    fetch(`https://jma-test-app.herokuapp.com/api/meals?userId=${userId}`)
  )
  .then(response => response.json())
  .then(mealsData => dispatch({ type: GET_MEALS_FROM_USER_SUCCESS, payload: mealsData }))
  .catch(error => dispatch({ type: GET_MEALS_FROM_USER_FAILED, payload: error }))
}

export const deleteMeal = (mealId, userId) => (dispatch) => {
  dispatch({ type: DELETE_MEAL_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/meals?mealId=${mealId}&userId=${userId}`, {
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
  console.log(meal)
  dispatch({ type: UPDATE_CURRENT_MEAL_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/meals?mealId=${meal.mealId}`, {
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