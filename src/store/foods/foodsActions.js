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

export const addCustomFood = (name, recommendedServing, caloriesPerServing, foodCategoryId, userId) => (dispatch) => {
  dispatch({ type: ADD_CUSTOM_FOOD_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/foods`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
        name: name,
        recommendedServing: recommendedServing,
        caloriesPerServing: caloriesPerServing,
        foodCategoryId: foodCategoryId
      })
    })
  )
  .then(response => response.json())
  .then(foodsData => dispatch({ type: ADD_CUSTOM_FOOD_SUCCESS, payload: foodsData }))
  .catch(error => dispatch({ type: ADD_CUSTOM_FOOD_FAILED, payload: error }))
}

export const editCustomFood = (foodId, name, recommendedServing, caloriesPerServing, foodCategoryId) => (dispatch) => {
  dispatch({ type: EDIT_CUSTOM_FOOD_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/foods?foodId=${foodId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        recommendedServing: recommendedServing,
        caloriesPerServing: caloriesPerServing,
        foodCategoryId: foodCategoryId
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

export const getFoodCategories = (userId) => (dispatch) => {
  dispatch({ type: GET_FOOD_CATEGORIES_PENDING });
  return(
    fetch(`http://jma-test-app.herokuapp.com/api/foodCategories?userId=${userId}`)
  )
  .then(response => response.json())
  .then(foodCategoriesData => dispatch({ type: GET_FOOD_CATEGORIES_SUCCESS, payload: foodCategoriesData }))
  .catch(error => dispatch({ type: GET_FOOD_CATEGORIES_FAILED, payload: error }))
}

export const createCategory = (name, userId) => (dispatch) => {
  dispatch({ type: CREATE_FOOD_CATEGORY_PENDING });
  return(
    fetch(`http://jma-test-app.herokuapp.com/api/foodCategories`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        userId: userId,
      })
    })
  )
  .then(response => response.json())
  .then(foodCategoriesData => dispatch({ type: CREATE_FOOD_CATEGORY_SUCCESS, payload: foodCategoriesData }))
  .catch(error => dispatch({ type: CREATE_FOOD_CATEGORY_FAILED, payload: error }))
}

export const editCategory = (foodCategoryId, name) => (dispatch) => {
  console.log('ACTION',foodCategoryId, name)
  dispatch({ type: EDIT_FOOD_CATEGORY_PENDING });
  return(
    fetch(`http://jma-test-app.herokuapp.com/api/foodCategories?foodCategoryId=${foodCategoryId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name
      })
    })
  )
  .then(response => response.json())
  .then(foodsData => dispatch({ type: EDIT_FOOD_CATEGORY_SUCCESS, payload: foodsData }))
  .catch(error => dispatch({ type: EDIT_FOOD_CATEGORY_FAILED, payload: error }))
}

export const deleteCategory = (foodCategoryId) => (dispatch) => {
  dispatch({ type: DELETE_FOOD_CATEGORY_PENDING });
  return(
    fetch(`http://jma-test-app.herokuapp.com/api/foodCategories?foodCategoryId=${foodCategoryId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
  )
  .then(response => response.json())
  .then(foodCategoriesData => dispatch({ type: DELETE_FOOD_CATEGORY_SUCCESS, payload: foodCategoriesData }))
  .catch(error => dispatch({ type: DELETE_FOOD_CATEGORY_FAILED, payload: error }))
}