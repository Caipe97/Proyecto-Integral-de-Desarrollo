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
 } from './foodsConstants'

export const getAllFoods = (userId) => (dispatch) => {
  dispatch({ type: GET_ALL_FOODS_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/foods?userId=${userId}`)
  )
  .then(response => response.json())
  .then(foodsData => dispatch({ type: GET_ALL_FOODS_SUCCESS, payload: foodsData }))
  .catch(error => dispatch({ type: GET_ALL_FOODS_FAILED, payload: error }))
}

export const addCustomFood = (name, recommendedServing, caloriesPerServing, userId) => (dispatch) => {
  dispatch({ type: ADD_CUSTOM_FOOD_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/foods`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
        name: name,
        recommendedServing: recommendedServing,
        caloriesPerServing: caloriesPerServing
      })
    })
  )
  .then(response => response.json())
  .then(foodsData => dispatch({ type: ADD_CUSTOM_FOOD_SUCCESS, payload: foodsData }))
  .catch(error => dispatch({ type: ADD_CUSTOM_FOOD_FAILED, payload: error }))
}

export const editCustomFood = (foodId, name, recommendedServing, caloriesPerServing) => (dispatch) => {
  dispatch({ type: EDIT_CUSTOM_FOOD_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/foods?foodId=${foodId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        recommendedServing: recommendedServing,
        caloriesPerServing: caloriesPerServing
      })
    })
  )
  .then(response => response.json())
  .then(foodsData => dispatch({ type: EDIT_CUSTOM_FOOD_SUCCESS, payload: foodsData }))
  .catch(error => dispatch({ type: EDIT_CUSTOM_FOOD_FAILED, payload: error }))
}

export const deleteCustomFood = (foodId) => (dispatch) => {
  dispatch({ type: DELETE_CUSTOM_FOOD_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/foods?foodId=${foodId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
  )
  .then(response => response.json())
  .then(foodsData => dispatch({ type: DELETE_CUSTOM_FOOD_SUCCESS, payload: foodsData }))
  .catch(error => dispatch({ type: DELETE_CUSTOM_FOOD_FAILED, payload: error }))
}