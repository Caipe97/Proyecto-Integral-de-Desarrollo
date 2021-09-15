import {
  GET_ALL_FOODS_PENDING,
  GET_ALL_FOODS_SUCCESS,
  GET_ALL_FOODS_FAILED
 } from './foodsConstants'

export const getAllFoods = () => (dispatch) => {
  dispatch({ type: GET_ALL_FOODS_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/foods`)
  )
  .then(response => response.json())
  .then(foodsData => dispatch({ type: GET_ALL_FOODS_SUCCESS, payload: foodsData }))
  .catch(error => dispatch({ type: GET_ALL_FOODS_FAILED, payload: error }))
}