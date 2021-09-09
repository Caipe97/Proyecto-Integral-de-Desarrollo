import {
  LOGOUT,

  LOGIN_OR_REGISTER_PENDING,
  LOGIN_OR_REGISTER_SUCCESS,
  LOGIN_OR_REGISTER_FAILED,

  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,

  ADD_RECORD_PENDING,
  ADD_RECORD_SUCCESS,
  ADD_RECORD_FAILED,

  GET_RECORDS_FROM_USER_PENDING,
  GET_RECORDS_FROM_USER_SUCCESS,
  GET_RECORDS_FROM_USER_FAILED,

  DELETE_RECORD_PENDING,
  DELETE_RECORD_SUCCESS,
  DELETE_RECORD_FAILED
 } from './constants'

export const logout = () => ({ 
  type: LOGOUT
})

export const login = (email, password) => (dispatch) => {
    dispatch({ type: LOGIN_OR_REGISTER_PENDING })
    return(
      fetch(`https://jma-test-app.herokuapp.com/api/users/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
    )
    .then(response => response.json())
    .then(userData => dispatch({ type: LOGIN_OR_REGISTER_SUCCESS, payload: userData }))
    .catch(error => dispatch({ type: LOGIN_OR_REGISTER_FAILED, payload: error }))
}

export const register = (name, surname, email, password, gender, birthday, weight, height) => (dispatch) => {
  dispatch({ type: LOGIN_OR_REGISTER_PENDING });
  fetch(`https://jma-test-app.herokuapp.com/api/users/register`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: name,
      surname: surname,
      email: email,
      password: password,
      gender: gender,
      birthday: birthday,
      weight: weight,
      height: height
    })})
    .then(response => response.json())
    .then(userData => dispatch({ type: LOGIN_OR_REGISTER_SUCCESS, payload: userData }))
    .catch(error => dispatch({ type: LOGIN_OR_REGISTER_FAILED, payload: error }))
}

export const resetPassword = (id, password) => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_PENDING });
  fetch(`https://jma-test-app.herokuapp.com/api/users/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      password: password
    })})
    .then(response => response.json())
    .then(userData => dispatch({ type: RESET_PASSWORD_SUCCESS, payload: userData }))
    .catch(error => dispatch({ type: RESET_PASSWORD_FAILED, payload: error }))
}

export const addRecord = (id, foodName, gramAmount, dateEaten) => (dispatch) => {
  console.log(id, foodName, gramAmount, dateEaten)
  dispatch({ type: ADD_RECORD_PENDING });
  fetch(`https://jma-test-app.herokuapp.com/api/records`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userID: id,
      foodName: foodName,
      gramAmount: gramAmount,
      dateEaten: dateEaten
    })})
    .then(response => response.json())
    .then(recordsData => dispatch({ type: ADD_RECORD_SUCCESS, payload: recordsData }))
    .catch(error => dispatch({ type: ADD_RECORD_FAILED, payload: error }))
}

export const getRecordsFromUser = (id) => (dispatch) => {
  dispatch({ type: GET_RECORDS_FROM_USER_PENDING });
  fetch(`https://jma-test-app.herokuapp.com/api/records?userID=${id}`)
    .then(response => response.json())
    .then(recordsData => dispatch({ type: GET_RECORDS_FROM_USER_SUCCESS, payload: recordsData }))
    .catch(error => dispatch({ type: GET_RECORDS_FROM_USER_FAILED, payload: error }))
}

export const deleteRecord = (id) => (dispatch) => {
  dispatch({ type: DELETE_RECORD_PENDING });
  fetch(`https://jma-test-app.herokuapp.com/api/records`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: id,
    })})
  .then(response => response.json())
  .then(recordsData => dispatch({ type: DELETE_RECORD_SUCCESS, payload: recordsData }))
  .catch(error => dispatch({ type: DELETE_RECORD_FAILED, payload: error }))
}